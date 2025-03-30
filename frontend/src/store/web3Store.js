import { create } from "zustand";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import contractAbi from "../constants/contractAbi.json";
import axios from "axios";

const useWeb3Store = create((set, get) => ({
    // State
    contractInstance: null,
    selectedAccount: null,
    provider: null,
    signer: null,

    // Actions
    connectWallet: async () => {
        try {
            if (!window.ethereum) {
                throw new Error("MetaMask Not Installed");
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            const selectedAccount = accounts[0];
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const message = "Welcome to Crypto Vault Website";

            const signature = await signer.signMessage(message);

            const dataSignature = {
                signature,
            };

            const res = await axios.post(
                `http://localhost:3000/api/auth?address=${selectedAccount}`,
                dataSignature
            );
            console.log(res.data.token);

            localStorage.setItem("token",res.data.token)
            const contractAddress = "0xf895639870A20E189b281E198631BB682acB77CA";
            const contractInstance = new ethers.Contract(
                contractAddress,
                contractAbi,
                signer
            );

            toast.success("Wallet Connected");
            set({
                contractInstance,
                selectedAccount,
                provider,
                signer,
            });
            return true;
        } catch (error) {
            toast.error(error.message || "Wallet connection failed");
            console.error("Wallet connection error:", error);
            return false;
        }
    },

    disconnectWallet: () => {
        set({
            contractInstance: null,
            selectedAccount: null,
            provider: null,
            signer: null,
        });
        localStorage.removeItem("token");
    },

    updateAccount: (account) => {
        set({ selectedAccount: account });
    },
}));

export default useWeb3Store;
