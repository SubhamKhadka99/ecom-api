import nodemailer from "nodemailer";
import { ENV_CONFIG } from "./env.config";

const transporter = nodemailer.createTransport({
  host: ENV_CONFIG.smtp_host,
  service: ENV_CONFIG.smtp_service,
  port: Number(ENV_CONFIG.smtp_port) || 587,
  secure: Number(ENV_CONFIG.smtp_port) === 465 ? true : false,
  auth: {
    user: ENV_CONFIG.smtp_user,
    pass: ENV_CONFIG.smtp_pass,
  },
});

export default transporter;
