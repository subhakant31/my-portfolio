import { NextApiRequest, NextApiResponse } from "next";
const nodemailer = require("nodemailer");

/*
 * Helper function to format the message object into a string
 * This will be used in the email body to display the form data
 */
function formatJsonToString(message: Record<string, string>): string {
  return Object.entries(message)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

/*
 * API route to handle email submission
 * It expects a POST request with the following body:
 * {
 *   to: string, // recipient email address
 *   subject: string, // subject of the email
 *   cc: string, // optional CC email address
 *   message: Record<string, string> // form data to be included in the email body
 * }
 */
export const emailSubmitter = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    return res
      .setHeader("Allow", ["POST"])
      .status(405)
      .end(`Method ${req.method} Not Allowed`);
  }

  const { to, subject, cc, message } = req.body;

  if (!to || !subject || !message) {
    return res
      .status(400)
      .json({ error: "To, subject, and message are required." });
  }

  try {
    console.log("Sending email....");
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to,
      cc: cc || undefined,
      subject,
      text: `Hi, You've received a new contact form submission:\n\n${formatJsonToString(
        message
      )}`,
    };
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Error sending email:", error?.message || error);
    return res.status(500).json({ error: "Failed to send email." });
  }
};

export default emailSubmitter;
