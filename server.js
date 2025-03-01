const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "askasknkl1206@gmail.com",
        pass: "grlsytqoklqkdzjj" // Use an App Password, NOT your real password
    }
});

app.post("/send-email", (req, res) => {
    const { name, email, phone, address, course } = req.body;

    const mailOptions = {
        from: email,
        to: "info@rsquareeducation.in",
        subject: "New Registration Form Submission",
        html: `
            <h2>New Registration Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Course Interested:</strong> ${course}</p>
            <br>
            <p>Sent securely via Node.js</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: "Email not sent", error });
        }
        res.json({ message: "Email sent successfully", info });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
