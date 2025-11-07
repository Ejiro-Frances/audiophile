# 🎧 Audiophile — Premium E-commerce Experience

Audiophile is a modern, responsive e-commerce web application built with **Next.js**, **Tailwind CSS**, and **Zustand**.  
It allows users to explore high-end audio products, view detailed product pages, and complete secure purchases with order confirmation via email.

---

## 🚀 Features

### 🛍️ Core

- Dynamic product pages with category-based filtering (headphones, speakers, earphones)
- Add to cart, edit quantities, and remove items
- Real-time cart preview and checkout summary
- Order confirmation screen with purchase details

### 💡 Technical

- **Next.js 14 (App Router)** — server components, API routes, and optimized performance
- **Zustand** — lightweight state management for cart and transactions
- **Tailwind CSS + shadcn/ui** — elegant, accessible UI components and theme customization
- **Convex Backend** (in progress) — for storing orders and sending transactional emails
- **Nodemailer** — sends an order confirmation email after purchase
- **Responsive Design** — optimized for mobile, tablet, and desktop

---

## 🧱 Tech Stack

| Category         | Tools                                     |
| ---------------- | ----------------------------------------- |
| Frontend         | Next.js, React, Tailwind CSS, shadcn/ui   |
| State Management | Zustand                                   |
| Email            | Nodemailer (Gmail SMTP with App Password) |
| Backend / API    | Convex                                    |

---

## ⚙️ Installation (Local Development)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Ejiro-Frances/audiophile.git
cd audiophile
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Create a `.env.local` file in the project root:

```bash
# Email configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_gmail_app_password
FROM_EMAIL="Audiophile Store <youremail@gmail.com>"

# Convex / Backend URLs
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url
```

> ⚠️ Use a Gmail **App Password**, not your normal Gmail password.
> You can create one from **Google Account → Security → App Passwords**.

---

### 4️⃣ Run the development server

```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧩 State Management

The cart, order details, and checkout data are managed globally using **Zustand**:

- Add/remove items
- Update quantities
- Persist cart state across sessions

---

## ✉️ Email Confirmation Flow

1. User completes checkout
2. Frontend sends a `POST` request to `/api/send-confirmation`
3. Next.js API route (with **Nodemailer**) sends:
   - Customer name
   - Order details (name, quantity, price, image)
   - Total cost
   - Branded HTML email

> ✅ Uses secure Gmail SMTP with App Password authentication.

---

## 🧾 Troubleshooting (Emails)

| Issue                       | Solution                                                       |
| --------------------------- | -------------------------------------------------------------- |
| `500 Internal Server Error` | Check Gmail App Password is valid and added correctly          |
| `Invalid login`             | Ensure 2-Step Verification is enabled on your Google Account   |
| `ENOTFOUND smtp.gmail.com`  | Try reconnecting to a stable internet connection               |
| `Timeout or ECONNRESET`     | Some hosts block port 465; try port `587` with `secure: false` |

**Example alternative Gmail configuration:**

```js
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

---

## 🛠️ Build for Production

```bash
npm run build
npm start
```

---

## 🧑‍💻 Author

**Ejiro Ejoh**
📧 [francesejiro@yahoo.com](mailto:francesejiro@yahoo.com)
💼 [GitHub](https://github.com/Ejiro-Frances)

---

## 🪪 License

This project is licensed under the **MIT License**.
You’re free to use, modify, and distribute this project with attribution.

---

> 💬 _Audiophile — where great sound meets modern web design._

```

```
