import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import vetModel from "../models/vetModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import Product from "../models/Product.js";


import multer from 'multer';
import connectCloudinary from "../config/cloudinary.js";

// Set up Cloudinary
connectCloudinary();


// API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for adding Vet
const addVet = async (req, res) => {

    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        // checking for all data to add vet
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
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

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const vetData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newVet = new vetModel(vetData)
        await newVet.save()
        res.json({ success: true, message: 'Vet Added' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all vets list for admin panel
const allVets = async (req, res) => {
    try {

        const vets = await vetModel.find({}).select('-password')
        res.json({ success: true, vets })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const vets = await vetModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            vets: vets.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

/**
 * Add a new product
 * Handles the product details and uploads the image to Cloudinary
 */
export const addProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    const imageFile = req.file; // The image file uploaded by the user

    // Validation logic
    if (!name || !description || !price || !category || !stock || !imageFile) {
        return res.status(400).json({ error: 'All fields and image are required' });
    }

    try {
        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Create the new product document
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl, // Save the Cloudinary image URL
        });

        await newProduct.save();

        // Respond with success
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
};


// Update product route handler
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const imageFile = req.file; // This should be the uploaded file from the request

    console.log(req.body); // Check if 'name', 'description', etc. are being sent
    console.log(req.params); // Check if 'id' is being passed correctly
    console.log(req.file); // Check if 'imageFile' is being received correctly

    // Find the existing product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imageUrl = product.imageUrl; // Keep the existing image if no new image is uploaded

    // If a new image is uploaded, upload it to Cloudinary
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      imageUrl = imageUpload.secure_url; // Get the URL of the uploaded image
    }

    // Update the product with the new values
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, stock, imageUrl },
      { new: true } // Ensure the updated product is returned
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product update failed" });
    }

    res.json({ message: "Product updated successfully", product: updatedProduct });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

  
  
  // Delete a product by ID
  export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Get all products
  export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Get product details by ID
export const getProductDetails = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

export {
    loginAdmin,
    appointmentsAdmin,
    appointmentCancel,
    addVet,
    allVets,
    adminDashboard
}