import React from "react";
import { Image, LogOutIcon, User } from "lucide-react";
import { Link } from "react-router-dom";
import useWeb3Store from "../store/web3Store";

function Navbar() {
    const { selectedAccount, disconnectWallet } = useWeb3Store();

    // Function to shorten Ethereum address (e.g., 0x123...abc)
    const shortenAddress = (address) => {
        return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";
    };

    return (
        <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
                        >
                            <div className="size-9 rounded-lg bg-primary flex items-center justify-center">
                                <Image className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-lg font-bold">Crypt Vault</h1>
                        </Link>
                    </div>

                    {/* Wallet Address & Logout */}
                    <div className="flex items-center gap-4">
                        {selectedAccount && (
                            <div className="flex items-center gap-2 bg-base-200 px-3 py-1.5 rounded-lg">
                                <User className="size-5 text-gray-500" />
                                <span className="font-medium">
                                    {shortenAddress(selectedAccount)}
                                </span>
                            </div>
                        )}

                        {selectedAccount && (
                            <button
                                className="flex gap-2 items-center hover:text-red-500 transition-all"
                                onClick={disconnectWallet}
                            >
                                <LogOutIcon className="size-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
