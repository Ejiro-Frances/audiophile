import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { CartItem as OrderItem } from "@/stores/cartStore";

interface OrderRequest {
  name: string;
  email: string;
  order: OrderItem[];
  total: number;
}

// Define a type for known nodemailer errors
interface MailError extends Error {
  code?: string;
  response?: string;
  command?: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, order, total }: OrderRequest = await req.json();

    if (!email || !Array.isArray(order)) {
      throw new Error("Invalid request body");
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // e.g. smtp.gmail.com
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    // Build HTML
    const orderItemsHtml = order
      .map(
        (item) => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px;">
            <img src=${item.image} alt=${item.name} width="60" height="60" style="border-radius: 8px; object-fit: cover;" />
          </td>
          <td style="padding: 10px;">
            <strong>${item.name}</strong><br/>
            Quantity: ${item.quantity}<br/>
            <span style="color: #000; opacity: 0.5;">$${item.price.toLocaleString()}</span>
          </td>
        </tr>`
      )
      .join("");

    const htmlContent = `
      <div style="font-family: 'Arial', sans-serif; padding: 20px; background: #f9f9f9;">
      <h1 style="color: #000; text-align:center; margin-bottom:20px; font-size:24px;">ORDER CONFIRMATION</h1>
        <h2>Thank you for your order, ${name}</h2>

        <p>We’ve received your purchase and will process it soon.</p>

        <h3 style="margin-top: 20px;">Order Summary:</h3>
        <table width="100%" cellspacing="0" cellpadding="0" style="background: white; border-radius: 8px;">
          <tbody>${orderItemsHtml}</tbody>
        </table>

        <p style="margin-top: 20px; font-size: 16px;">
          <strong>Total:</strong> $${total.toLocaleString()}
        </p>

       
      </div>
    `;

    // Send email
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Your Audiophile Order Confirmation",
      html: htmlContent,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as MailError;

    console.error("❌ Email sending failed:");
    console.error("Message:", err.message);
    if (err.code) console.error("Code:", err.code);
    if (err.response) console.error("Response:", err.response);

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
