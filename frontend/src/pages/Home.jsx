import React from "react";
import useWeb3Store from "../store/web3Store";
import UploadImage from "../components/UploadImage";
import GetImage from "../components/GetImage";

function Home() {
  const { selectedAccount } = useWeb3Store();

  return (
    <div className="mt-12 p-10 flex flex-col md:flex-row gap-10">
      {/* Upload Image on the Left */}
      <div className="w-full md:w-1/2">
        <UploadImage />
      </div>

      {/* Get Image on the Right */}
      <div className="w-full md:w-1/2">
        <GetImage />
      </div>
    </div>
  );
}

export default Home;