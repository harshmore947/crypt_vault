import React, { useState } from "react";
import axios from "axios";
import useWeb3Store from "../store/web3Store";
import toast from "react-hot-toast";

function UploadImage() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { selectedAccount, contractInstance } = useWeb3Store();

    const uploadImageHash = async (IpfsHash) => {
        try {
            const tx = await contractInstance.uploadFile(selectedAccount, IpfsHash);
            // console.log(tx);
            // toast.success("Image hash stored on blockchain");

            await toast.promise(tx.wait(), {
                loading: 'transaction is pending',
                success: "transaction is success",
                error: "transaction failed"
            }).then(() => {
                setFile(null);
            })
        } catch (error) {
            console.error("Error storing image hash:", error);
            toast.error("Failed to store hash on blockchain");
        }
    };

    const handleImageUpload = async () => {
        if (!file) {
            toast.error("Please select a file to upload");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "x-access-token":token
                }
            }
            const response = await axios.post("http://localhost:3000/api/uploadImage", formData, config);
            console.log(response.data.ipfsHash);

            await uploadImageHash(response.data.ipfsHash);
            // toast.success("Image uploaded successfully");
        } catch (error) {
            console.error(error);
            toast.error("Image upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 rounded-2xl">
            <div className="card w-96 bg-base-100 shadow-xl p-6">
                <h2 className="text-xl font-bold text-center mb-4">Upload Image</h2>

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="file-input file-input-bordered w-full"
                    disabled={loading}
                />

                <button 
                    onClick={handleImageUpload} 
                    className="btn btn-primary w-full mt-4"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        "Upload Image"
                    )}
                </button>
            </div>
        </div>
    );
}

export default UploadImage;
