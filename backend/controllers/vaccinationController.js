import Vaccination from '../models/Vaccination.js';
import cron from 'node-cron';
import transporter from '../config/nodemailer.js';
import mongoose from 'mongoose';

export const createVaccination = async (req, res) => {
  const { 
    petName, 
    vaccinationDate, 
    nextVaccinationDate, 
    nextVaccinationTime, 
    petWeight, 
    petBreed, 
    email,
    userId // Add userId to destructured fields
  } = req.body;

  console.log(req.body);
  
  // Validate required fields
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Combine date and time into a single Date object
    let combinedNextVaccinationDate;
    
    if (nextVaccinationTime) {
      // If time is provided via datetime-local input
      combinedNextVaccinationDate = new Date(nextVaccinationTime);
    } else {
      // Fallback to date only (set default time to 9 AM)
      combinedNextVaccinationDate = new Date(nextVaccinationDate);
      combinedNextVaccinationDate.setHours(9, 0, 0, 0);
    }

    // Validate the date is in the future
    const now = new Date();
    if (combinedNextVaccinationDate <= now) {
      return res.status(400).json({ message: 'Next vaccination date must be in the future' });
    }

    const newVaccination = new Vaccination({
      petName,
      vaccinationDate,
      nextVaccinationDate: combinedNextVaccinationDate,
      petWeight,
      petBreed,
      email,
      user: userId // Store the user reference
    });

    const savedVaccination = await newVaccination.save();

    // Schedule the email using node-cron
    await scheduleVaccinationEmail(email, petName, combinedNextVaccinationDate);

    res.status(201).json({
      ...savedVaccination.toObject(),
      message: `Vaccination scheduled successfully. Reminder will be sent to ${email} at ${combinedNextVaccinationDate.toLocaleString()}`
    });
  } catch (error) {
    console.error('Error creating vaccination:', error);
    res.status(500).json({ 
      message: 'Error creating vaccination record', 
      error: error.message 
    });
  }
};

const scheduleVaccinationEmail = async (email, petName, nextVaccinationDate) => {
  if (!email) {
    throw new Error('Cannot schedule email - no recipient address provided');
  }

  const date = new Date(nextVaccinationDate);
  
  // Convert to UTC for consistent scheduling
  const minute = date.getUTCMinutes();
  const hour = date.getUTCHours();
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are 0-indexed in JS
  
  const cronExpression = `${minute} ${hour} ${day} ${month} *`;
  
  console.log(`Scheduling email for ${date.toString()} with cron: ${cronExpression} to ${email}`);
  
  // Schedule the job
  const job = cron.schedule(cronExpression, async () => {
    try {
      console.log(`Executing reminder for ${petName}'s vaccination`);
      await sendVaccinationEmail(email, petName, date);
      job.stop(); // Stop the job after execution
    } catch (error) {
      console.error('Error in scheduled job:', error);
    }
  }, {
    scheduled: true,
    timezone: 'UTC' // Use UTC for consistency
  });

  return job;
};

const sendVaccinationEmail = async (email, petName, nextVaccinationDate) => {
  try {
    const formattedDate = nextVaccinationDate.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `Vaccination Reminder for ${petName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a5568;">Dear Pet Owner,</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            This is a reminder for your pet <strong>${petName}</strong>'s upcoming vaccination.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            <strong>Scheduled Vaccination Time:</strong> ${formattedDate}
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Please make sure to bring your pet to the veterinary clinic at the scheduled time.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you,<br>
            Your Veterinary Team
          </p>
        </div>
      `,
      text: `Dear Pet Owner,\n\nThis is a reminder for your pet ${petName}'s upcoming vaccination.\n\nScheduled Vaccination Time: ${formattedDate}\n\nPlease make sure to bring your pet to the veterinary clinic at the scheduled time.\n\nThank you,\nYour Veterinary Team`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email} for ${petName}:`, info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Add this to your server startup
export const rescheduleAllVaccinationEmails = async () => {
  try {
    const upcomingVaccinations = await Vaccination.find({
      nextVaccinationDate: { $gt: new Date() },
      email: { $exists: true, $ne: '' } // Only those with valid emails
    });

    console.log(`Rescheduling ${upcomingVaccinations.length} vaccination reminders...`);

    for (const vaccination of upcomingVaccinations) {
      try {
        await scheduleVaccinationEmail(
          vaccination.email,
          vaccination.petName,
          vaccination.nextVaccinationDate
        );
      } catch (error) {
        console.error(`Failed to reschedule for ${vaccination.petName}:`, error);
      }
    }
  } catch (error) {
    console.error('Error rescheduling vaccination emails:', error);
  }
};


// Get all vaccination records
export const getAllVaccinations = async (req, res) => {
  try {
    const vaccinations = await Vaccination.find();
    res.status(200).json(vaccinations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vaccination records', error });
  }
};

// In your vaccination controller file
export const getVaccinationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const vaccinations = await Vaccination.find({ user: userId })
      .sort({ nextVaccinationDate: 1 }); // Sort by next vaccination date

    res.status(200).json(vaccinations);
  } catch (error) {
    console.error('Error fetching vaccinations:', error);
    res.status(500).json({ message: 'Error fetching vaccination records' });
  }
};