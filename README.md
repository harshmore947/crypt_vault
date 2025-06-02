# Crypt Wallet Web3 🌐

A modern Web3 cryptocurrency wallet application built with React and Node.js, enabling users to manage their digital assets securely.

## 🚀 Features

- Web3 Integration with Ethereum blockchain
- Secure wallet management
- Real-time cryptocurrency tracking
- User authentication and authorization
- File storage using Pinata IPFS
- Modern and responsive UI with DaisyUI and TailwindCSS

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite 6
- TailwindCSS 4
- DaisyUI
- Ethers.js 6
- React Router DOM 7
- Zustand for state management
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Pinata SDK for IPFS storage
- Ethers.js 5
- CORS enabled
- Environment variables support

## 📦 Installation

### Prerequisites
- Node.js (Latest LTS version)
- MongoDB installed and running
- Git

### Setting up the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_KEY=your_pinata_secret_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Setting up the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🌟 Usage

1. Connect your Web3 wallet (MetaMask recommended)
2. Create or import your wallet
3. Start managing your digital assets
4. Use the IPFS storage features for decentralized file storage

## 🔒 Security

- JWT-based authentication
- Secure wallet management
- Environment variables for sensitive data
- CORS protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📧 Contact

For any queries or support, please open an issue in the repository.

---
Made with ❤️ using React and Node.js
