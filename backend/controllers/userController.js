import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import vetModel from "../models/vetModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary'
import transporter from '../config/nodemailer.js'

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const bookAppointment = async (req, res) => {
    try {
        const { userId, vetId, slotDate, slotTime } = req.body;

        console.log("Received Booking Request:", { userId, vetId, slotDate, slotTime });

        const vetData = await vetModel.findById(vetId).select("-password");
        console.log("Fetched Vet Data:", vetData);

        if (!vetData) {
            return res.json({ success: false, message: 'Vet not found' });
        }

        if (!vetData.available) {
            return res.json({ success: false, message: 'Vet Not Available' });
        }

        let slots_booked = vetData.slots_booked || {};
        console.log("Vet's Current Slots Booked:", slots_booked);

        // Checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                console.log("Slot Already Booked:", slotDate, slotTime);
                return res.json({ success: false, message: 'Slot Not Available' });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        console.log("Updated Slots Booked:", slots_booked);

        const userData = await userModel.findById(userId).select("-password");
        console.log("Fetched User Data:", userData);

        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        delete vetData.slots_booked; // Avoid saving booked slots in appointment data

        const appointmentData = {
            userId,
            vetId,
            userData,
            vetData,
            amount: vetData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        };

        console.log("Final Appointment Data:", appointmentData);

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Save updated slots data in vet model
        await vetModel.findByIdAndUpdate(vetId, { slots_booked });

        console.log("Appointment successfully booked!");

        // ✅ Email Notification to Vet
        const vetMailOptions = {
            from: `Pets Khana<${process.env.SENDER_EMAIL}>`,
            to: vetData.email,
            subject: "New Appointment Booking Notification",
            html: `
                <h3>Dear Dr. ${vetData.name},</h3>
                <p>You have a new appointment scheduled.</p>
                <ul>
                    <li><strong>Date:</strong> ${slotDate.replace(/_/g, '/')}</li>
                    <li><strong>Time:</strong> ${slotTime}</li>
                    <li><strong>Patient:</strong> ${userData.name}</li>
                    <li><strong>Contact:</strong> ${userData.phone}</li>
                    <li><strong>Email:</strong> ${userData.email}</li>
                    <li><strong>Address:</strong> ${userData.address.line1}, ${userData.address.line2}</li>
                </ul>
                <p>Please be prepared for the appointment.</p>
                <p>Best Regards,<br/>Your Pet Care System</p>
            `,
        };

        // ✅ Email Notification to User
        const userMailOptions = {
            from: `Pets Khana<${process.env.SENDER_EMAIL}>`,
            to: userData.email,
            subject: "Appointment Confirmation",
            html: `
                <h3>Dear ${userData.name},</h3>
                <p>Your appointment has been successfully booked.</p>
                <ul>
                    <li><strong>Date:</strong> ${slotDate.replace(/_/g, '/')}</li>
                    <li><strong>Time:</strong> ${slotTime}</li>
                    <li><strong>Vet:</strong> Dr. ${vetData.name}</li>
                    <li><strong>Speciality:</strong> ${vetData.speciality}</li>
                    <li><strong>Fees:</strong> $ ${vetData.fees}</li>
                </ul>
                <p>For any inquiries, contact us at ${process.env.SENDER_EMAIL}.</p>
                <p>Best Regards,<br/>Your Pet Care System</p>
            `,
        };

        // Send emails
        transporter.sendMail(vetMailOptions, (error, info) => {
            if (error) {
                console.error("❌ Error sending email to Vet:", error);
            } else {
                console.log("✅ Email sent to Vet:", info.response);
            }
        });

        transporter.sendMail(userMailOptions, (error, info) => {
            if (error) {
                console.error("❌ Error sending email to User:", error);
            } else {
                console.log("✅ Email sent to User:", info.response);
            }
        });

        res.json({ success: true, message: 'Appointment Booked & Emails Sent' });

    } catch (error) {
        console.error("❌ Error Booking Appointment:", error);
        res.json({ success: false, message: error.message });
    }
};


// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {

        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user 
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing vet slot 
        const { vetId, slotDate, slotTime } = appointmentData

        const vetData = await vetModel.findById(vetId)

        let slots_booked = vetData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await vetModel.findByIdAndUpdate(vetId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
}