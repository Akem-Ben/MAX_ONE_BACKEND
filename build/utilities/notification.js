"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordMail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { GMAIL_USER, GMAIL_PASSWORD } = process.env;
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendPasswordMail = async (email, password) => {
    try {
        const response = await exports.transporter.sendMail({
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
    }
    catch (err) {
        console.log(err);
    }
};
exports.sendPasswordMail = sendPasswordMail;
