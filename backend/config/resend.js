import { Resend } from "resend";
import "dotenv/config";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export default resend;
