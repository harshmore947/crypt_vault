import React, { useEffect } from "react";
import useWeb3Store from "../store/web3Store";
import { useNavigate } from "react-router-dom";
import AuthImagePattern from '../components/AuthImagePattern'

function Wallet() {
  const {
    selectedAccount,
    provider,
    connectWallet,
    disconnectWallet,
    updateAccount,
  } = useWeb3Store();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedAccount) {
      navigate("/home");
    }
  }, [selectedAccount, navigate]);

  useEffect(() => {
    if (provider) {
      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          updateAccount(accounts[0]);
        }
      });

      // Listen for chain changes
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, [provider, disconnectWallet, updateAccount]);

  return (
    <div className="mt-8 h-screen grid lg:grid-cols-2 p-6">
      {/* left side  */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        {selectedAccount ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm">
              Connected Account: {selectedAccount.slice(0, 6)}...
              {selectedAccount.slice(-4)}
            </p>
            <button onClick={disconnectWallet} className="btn btn-error">
              Disconnect Wallet
            </button>
          </div>
        ) : (
            <div className="w-full flex flex-col gap-4 items-center justify-center">
              <label className="label">
                <span className="label- text font-medium">Please Connect Your MetaMask Account</span>
              </label>
            <button
              onClick={connectWallet}
              className="btn btn-wide btn-primary "
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
      {/* right side */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Connect To Your Vault Semlessly"}
      />
    </div>
  );
}

export default Wallet;

{
  /* <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      {selectedAccount ? (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm">
            Connected Account: {selectedAccount.slice(0, 6)}...
            {selectedAccount.slice(-4)}
          </p>
          <button onClick={disconnectWallet} className="btn btn-error">
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button onClick={connectWallet} className="btn btn-primary">
          Connect Wallet
        </button>
      )}
    </div> */
}
