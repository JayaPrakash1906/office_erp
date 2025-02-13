const Booking = require("../models/BookingModel");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email confirmation
const sendConfirmationEmail = async (booking) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.email,
    subject: "Meeting Confirmation",
    text: `Your meeting "${booking.meetingName}" has been booked.\nStart Time: ${booking.startTime}\nEnd Time: ${booking.endTime}\nPurpose: ${booking.meetingPurpose}\nContact: ${booking.contactNumber}\nTeam: ${booking.team}`,
  };

  await transporter.sendMail(mailOptions);
};

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    await sendConfirmationEmail(booking);
    res.status(201).json({ message: "Booking created!", booking });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookings" });
  }
};
