import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { GMAIL_USER, GMAIL_PASSWORD } = process.env;


//Setup for the nodemailer transporter for sending mails to users
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER!,
    pass: GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


//Function to mail password to the user and also agent when their acounts are created
export const sendPasswordMail = async (email: string, password: string) => {
  try {
    const response = await transporter.sendMail({
      from: "abn4reel@gmail.com",
      to: email,
      subject: "Welcome to Max",
      html: `<div width="50%" style="text-align: center; padding: 10px; border-radius: 5px; border: 2px solid gold;">
            <h1>Welcome to Max<h1>
            <h3 style="font-size: 20px">Here are your login details</h3>
            <p style="font-size: 20px">You email: ${email}</p>
            <p style="font-size: 20px">Your Password: <span style="color: red;">${password}</span></p>
            <p style="font-size: 20px">Thank You</p>
            </div>`,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
