import React, { useState, useEffect } from 'react'
import useWeb3Store from '../store/web3Store'
import axios from 'axios';

function GetImage() {
  const { selectedAccount, contractInstance } = useWeb3Store();
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePerPage, setImagePerPage] = useState(2);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const getImageHashes = async () => {
    const ipfsHashes = await contractInstance.viewFiles(selectedAccount);
    return ipfsHashes
  }

  const getImage = async () => {
    try {
      setLoading(true);
      const ipfsHashes = await getImageHashes();
      const ipfsHashArray = Object.values(ipfsHashes);
      console.log(ipfsHashArray);

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          'x-access-token': token
        }
      }

      const response = await axios.post(
        `http://localhost:3000/api/getImage?page=${currentPage}&limit=${imagePerPage}`,
        ipfsHashArray,
        config
      );
      const imagesData = response.data.depcryptedImageArr
      setImages(imagesData);
      setHasLoaded(true);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (hasLoaded) {
      getImage();
    }
  }, [currentPage, imagePerPage]);

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="space-y-4">
      <div className={`${hasLoaded ? 'text-center' : 'flex justify-center items-center min-h-[60vh]'}`}>
        <button
          className='btn btn-primary p-4'
          onClick={getImage}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Image'}
        </button>
      </div>

      {hasLoaded && (
        <>
          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {images.map((image, index) => (
              <div key={index} className="card bg-base-200 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <figure className="relative aspect-square">
                  <img
                    src={`data:image/jpeg;base64,${image}`}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-lg">Image {index + 1}</h2>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedImage(image)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              className="btn btn-sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-sm"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={images.length < imagePerPage}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Image Modal */}
      <dialog
        className={`modal ${selectedImage ? 'modal-open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeModal();
          }
        }}
      >
        <div className="modal-box max-w-4xl p-0">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>
          {selectedImage && (
            <div className="relative w-full h-[80vh]">
              <img
                src={`data:image/jpeg;base64,${selectedImage}`}
                alt="Full size image"
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </dialog>
    </div>
  )
}

export default GetImage