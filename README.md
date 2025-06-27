# 🔐 Crypt Wallet Web3 - Decentralized Image Vault

A full-stack Web3 application that provides secure, encrypted image storage using blockchain technology, IPFS, and MetaMask wallet integration.

![Web3](https://img.shields.io/badge/Web3-Enabled-blue)
![Ethereum](https://img.shields.io/badge/Ethereum-Blockchain-purple)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![IPFS](https://img.shields.io/badge/IPFS-Storage-orange)

## 🌟 Overview

Crypt Wallet Web3 is a decentralized application (dApp) that allows users to securely upload, encrypt, and store images on IPFS while maintaining ownership records on the Ethereum blockchain. The application combines the power of blockchain technology with modern web development to create a trustless, secure image storage solution.

## ✨ Key Features

### 🔗 **Blockchain Integration**

- **MetaMask Wallet Connection**: Seamless integration with MetaMask for user authentication
- **Smart Contract Interaction**: Direct interaction with Ethereum smart contracts for file ownership tracking
- **Wallet-based Authentication**: Signature-based authentication without traditional passwords
- **Multi-account Support**: Automatic handling of account switches and network changes

### 🔒 **Security & Encryption**

- **End-to-End Encryption**: Files are encrypted using AES-256-CBC before storage
- **User-specific Encryption Keys**: Each user gets a unique 256-bit encryption key
- **Secure Key Storage**: Encryption keys are securely stored and managed per user
- **JWT Authentication**: Secure API access using JSON Web Tokens

### 📁 **File Management**

- **IPFS Storage**: Decentralized file storage using InterPlanetary File System
- **Pinata Integration**: Reliable IPFS pinning service for persistent storage
- **Image Upload**: Support for common image formats with drag-and-drop interface
- **Encrypted Upload Process**: All files are encrypted before being uploaded to IPFS

### 🖼️ **Image Gallery**

- **Personal Gallery**: View all your uploaded images in a beautiful grid layout
- **Pagination**: Efficient image browsing with customizable items per page
- **Full-size Preview**: Modal view for detailed image inspection
- **Responsive Design**: Optimized for desktop and mobile devices

### 🎨 **Modern UI/UX**

- **DaisyUI Components**: Beautiful, accessible UI components
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth loading animations and progress indicators
- **Dark/Light Mode**: Automatic theme detection and switching

## 🏗️ Technical Architecture

### **Frontend Stack**

- **React 19**: Latest React with modern hooks and features
- **Vite**: Fast build tool and development server
- **Zustand**: Lightweight state management for Web3 data
- **Ethers.js**: Ethereum blockchain interaction library
- **React Router**: Client-side routing and navigation
- **Axios**: HTTP client for API communications
- **Tailwind CSS + DaisyUI**: Styling and component library

### **Backend Stack**

- **Node.js + Express**: RESTful API server
- **MongoDB + Mongoose**: Database for user and metadata storage
- **JWT**: Secure token-based authentication
- **Multer**: File upload handling middleware
- **Pinata SDK**: IPFS file pinning and management
- **Crypto**: Built-in Node.js encryption utilities

### **Blockchain & Storage**

- **Ethereum**: Smart contract deployment and interaction
- **IPFS**: Decentralized file storage network
- **Pinata**: IPFS pinning service for reliability
- **MetaMask**: Browser wallet for transaction signing

## 🔧 Core Functionality

### **1. Wallet Connection & Authentication**

```javascript
// Connect MetaMask wallet
const connectWallet = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Sign authentication message
  const signature = await signer.signMessage("Welcome to Crypto Vault Website");

  // Get JWT token from backend
  const response = await axios.post(`/api/auth?address=${address}`, {
    signature,
  });
  localStorage.setItem("token", response.data.token);
};
```

### **2. Secure File Upload Process**

1. **File Selection**: User selects image file through intuitive interface
2. **Client Validation**: File type and size validation on frontend
3. **Server Processing**: File received and validated on backend
4. **Encryption**: File encrypted using user-specific AES-256-CBC key
5. **IPFS Upload**: Encrypted data uploaded to IPFS via Pinata
6. **Blockchain Storage**: IPFS hash stored in smart contract
7. **Confirmation**: Transaction confirmation and success notification

### **3. Image Retrieval & Decryption**

1. **Hash Retrieval**: Get IPFS hashes from smart contract
2. **Batch Processing**: Retrieve multiple images with pagination
3. **Decryption**: Decrypt files using user's stored encryption key
4. **Gallery Display**: Present images in responsive grid layout

### **4. Smart Contract Integration**

```solidity
// Smart contract functions
function uploadFile(address _user, string memory _ipfsHash) public;
function viewFiles(address _user) public view returns (string[] memory);
```

## 📁 Project Structure

```
Crypt Wallet Web3/
├── 📂 frontend/                 # React frontend application
│   ├── 📂 src/
│   │   ├── 📂 components/       # Reusable UI components
│   │   │   ├── Wallet.jsx       # MetaMask connection component
│   │   │   ├── UploadImage.jsx  # File upload interface
│   │   │   ├── GetImage.jsx     # Image gallery component
│   │   │   ├── Navbar.jsx       # Navigation component
│   │   │   └── AuthImagePattern.jsx # Auth page design
│   │   ├── 📂 pages/
│   │   │   └── Home.jsx         # Main dashboard page
│   │   ├── 📂 store/
│   │   │   └── web3Store.js     # Zustand state management
│   │   ├── 📂 constants/
│   │   │   └── contractAbi.json # Smart contract ABI
│   │   └── App.jsx              # Main application component
│   └── package.json             # Frontend dependencies
├── 📂 backend/                  # Node.js backend API
│   ├── 📂 controllers/          # Request handlers
│   │   ├── authcontroller.js    # Authentication logic
│   │   ├── uploadController.js  # File upload handling
│   │   └── getImageController.js # Image retrieval logic
│   ├── 📂 middleware/           # Custom middleware
│   │   ├── authentication.js    # JWT verification
│   │   └── multer.js           # File upload configuration
│   ├── 📂 models/              # Database models
│   │   └── user-model.js       # User schema definition
│   ├── 📂 routes/              # API routes
│   │   └── Routes.js           # Route definitions
│   ├── 📂 utils/               # Utility functions
│   │   ├── Database.js         # MongoDB connection
│   │   ├── encryption.js       # File encryption utilities
│   │   ├── decryption.js       # File decryption utilities
│   │   └── generateKey.js      # Encryption key generation
│   └── index.js                # Server entry point
├── 📂 api/                     # Vercel serverless functions
│   └── index.js                # API proxy for deployment
├── vercel.json                 # Vercel deployment configuration
└── README.md                   # Project documentation
```

## 🚀 Getting Started

### **Prerequisites**

- Node.js (v18 or higher)
- MetaMask browser extension
- MongoDB database
- Pinata account (for IPFS)
- Ethereum testnet access

### **Installation**

1. **Clone the repository:**

```bash
git clone <repository-url>
cd "Crypt Wallet Web3"
```

2. **Install dependencies:**

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. **Environment Configuration:**

Create `.env` file in the backend directory:

```env
# Database
MONO_URI=mongodb://localhost:27017/cryptwallet
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/cryptwallet

# JWT Secret
SECRET=your-super-secure-jwt-secret-key

# Pinata IPFS
API_KEY=your-pinata-api-key
API_SECRET=your-pinata-secret-key

# Environment
NODE_ENV=development
```

4. **Smart Contract Setup:**

- Deploy the smart contract to your preferred Ethereum network
- Update the contract address in `frontend/src/store/web3Store.js`
- Ensure the ABI in `frontend/src/constants/contractAbi.json` matches your contract

### **Development**

**Start the backend server:**

```bash
cd backend
npm run dev
# Server runs on http://localhost:3000
```

**Start the frontend development server:**

```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

### **Smart Contract**

Deploy this Solidity contract to your Ethereum network:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    mapping(address => string[]) private userFiles;

    function uploadFile(address _user, string memory _ipfsHash) public {
        userFiles[_user].push(_ipfsHash);
    }

    function viewFiles(address _user) public view returns (string[] memory) {
        return userFiles[_user];
    }
}
```

## 📱 Usage Guide

### **1. Connect Your Wallet**

- Click "Connect Wallet" on the landing page
- Approve MetaMask connection request
- Sign the authentication message
- You'll be redirected to the main dashboard

### **2. Upload Images**

- Select an image file using the file picker
- Click "Upload Image" to start the process
- Confirm the blockchain transaction in MetaMask
- Wait for upload completion and transaction confirmation

### **3. View Your Gallery**

- Click "Get Images" to load your personal gallery
- Browse through your encrypted images
- Use pagination controls to navigate multiple pages
- Click "View Details" for full-size image preview

### **4. Security Features**

- All images are automatically encrypted before upload
- Only you can decrypt and view your images
- Wallet disconnection clears all local data
- JWT tokens expire for enhanced security

## 🛡️ Security Features

### **Encryption Standards**

- **AES-256-CBC**: Industry-standard symmetric encryption
- **Random IV**: Unique initialization vector for each file
- **256-bit Keys**: Cryptographically secure random keys
- **Buffer-level Encryption**: Raw file data encryption

### **Authentication Security**

- **Signature-based Auth**: No password storage required
- **JWT Tokens**: Stateless authentication with expiration
- **Address Verification**: Cryptographic signature verification
- **Middleware Protection**: All API endpoints are JWT-protected

### **Data Privacy**

- **Client-side Wallet**: Private keys never leave your browser
- **Encrypted Storage**: Files encrypted before leaving your device
- **Decentralized IPFS**: No central point of failure
- **User-specific Keys**: Each user has unique encryption keys

## 🌐 Deployment

### **Vercel Deployment (Recommended)**

The project is pre-configured for Vercel deployment with both frontend and backend:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
cd "Crypt Wallet Web3"
vercel

# Set environment variables in Vercel dashboard:
# - MONO_URI
# - SECRET
# - API_KEY
# - API_SECRET
# - NODE_ENV=production
```

### **Manual Deployment**

**Frontend (Static Hosting):**

```bash
cd frontend
npm run build
# Deploy dist/ folder to any static hosting service
```

**Backend (Node.js Hosting):**

```bash
cd backend
# Deploy to Heroku, Railway, or any Node.js hosting service
```

## 🧪 API Endpoints

### **Authentication**

```http
POST /api/auth?address={wallet_address}
Content-Type: application/json

{
  "signature": "0x..."
}
```

### **Upload Image**

```http
POST /api/uploadImage
Headers:
  x-access-token: {jwt_token}
  Content-Type: multipart/form-data

Body: FormData with 'file' field
```

### **Get Images**

```http
POST /api/getImage?page=1&limit=10
Headers:
  x-access-token: {jwt_token}
  Content-Type: application/json

Body: ["ipfsHash1", "ipfsHash2", ...]
```

## 🔧 Configuration

### **Frontend Configuration**

Update API endpoints in components if deploying separately:

```javascript
// Change from localhost to your deployed backend URL
const response = await axios.post("https://your-backend-url.com/api/uploadImage", ...);
```

### **Smart Contract Configuration**

Update contract address and network in `web3Store.js`:

```javascript
const contractAddress = "0xYourContractAddress";
// Ensure MetaMask is connected to the correct network
```

### **IPFS Configuration**

The app uses Pinata for IPFS pinning. Alternative IPFS services can be configured in the upload controller.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please open an issue on GitHub or contact the development team.

## 🙏 Acknowledgments

- **OpenZeppelin** for smart contract standards
- **Pinata** for reliable IPFS infrastructure
- **MetaMask** for Web3 wallet integration
- **Tailwind CSS** and **DaisyUI** for beautiful UI components
- **Ethereum Foundation** for blockchain infrastructure

---

**Built with ❤️ using Web3 technologies**
