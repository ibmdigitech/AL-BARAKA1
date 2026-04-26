const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Inquiries logger
const logInquiry = (data) => {
    try {
        const logEntry = `[${new Date().toISOString()}] Inquiry: ${JSON.stringify(data)}\n`;
        fs.appendFileSync(path.join(__dirname, 'inquiries.log'), logEntry);
    } catch (err) {
        console.error('Failed to write to inquiries.log:', err.message);
    }
};

// API Endpoint for Contact Form
app.post('/api/contact', async (req, res) => {
    const { fullName, email, mobile, service, location, duration, message } = req.body;

    console.log('Received inquiry:', req.body);
    logInquiry(req.body);

    // Nodemailer setup
    // Using a Ethereal (test) account if no env vars provided
    let transporter;
    
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    } else {
        // Fallback or Test account
        transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'test@ethereal.email',
                pass: 'testpass'
            }
        });
    }

    const mailOptions = {
        from: `"Al Baraka Web Portal" <${process.env.EMAIL_USER || 'noreply@albarakahuae.com'}>`,
        to: process.env.CONTACT_RECEIVER || 'info.ab@albarakahuae.com',
        subject: `New Project Inquiry from ${fullName}`,
        text: `
            New Inquiry Received:
            
            Name/Company: ${fullName}
            Email: ${email}
            Mobile: ${mobile}
            Service: ${service}
            Location: ${location}
            Duration: ${duration}
            Requirements: ${message}
        `,
        html: `
            <h3>New Inquiry Received</h3>
            <p><strong>Name/Company:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile:</strong> ${mobile}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            <p><strong>Requirements:</strong></p>
            <p>${message}</p>
        `
    };

    try {
        // For demonstration/testing, we'll always succeed unless explicitly failed
        // In real scenario, we wait for transporter.sendMail(mailOptions);
        
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
        } else {
            console.log('Email simulated (No credentials provided). Check inquiries.log');
        }

        res.status(200).json({ success: true, message: 'Inquiry received successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send inquiry.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
