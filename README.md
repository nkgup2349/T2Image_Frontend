# T2Image - Text to Image Generator

T2Image is a full-stack web application that generates images from text prompts using the **ClipDrop API**. Built with the **MERN stack** and **Vite + React**, it also includes a credit system powered by **Razorpay**, where each image generation costs 1 credit.


## ✨ Features

- 🔤 Generate images from text prompts (ClipDrop API)
- ♻️ Regenerate or download images
- 💳 Razorpay integration to buy credits
- 💰 1 credit deducted per image generation
- 📱 Fully responsive UI with smooth UX

## 🧰 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **API**: ClipDrop Image Generation API
- **Payments**: Razorpay (for credits)

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/nkgup2349/T2Image_Frontend.git
cd T2Image_Frontend

```



### 2. Install Dependencies
```bash
npm install
```
### 3. Add Environment Variables
Create a .env file in the root and add
```
VITE_CLIPDROP_API_KEY=your_clipdrop_api_key
VITE_BACKEND_URL=http://localhost:5000
```
(Also make sure your backend has proper Razorpay and MongoDB setup)

4. Run the App

```
npm run dev

```
