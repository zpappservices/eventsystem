import React, { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FiUpload, FiX } from "react-icons/fi";

const PhotoUpload = ({
  onImageChange,
  maxSizeMB = 5,
  fileError,
  setFileError,
  file,
  disabled,
  ...props
}) => {
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([null, null, null]);

  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const isValidFile =
      ["image/png", "image/jpeg", "image/gif"].includes(file.type) &&
      file.size <= maxSizeMB * 1024 * 1024;

    if (!isValidFile) {
      setFileError(
        `Invalid file. Ensure it's a PNG, JPG, or GIF under ${maxSizeMB}MB.`
      );
      return;
    }

    setFileError("");
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setPreview(base64);
      onImageChange && onImageChange(base64); // Pass Base64 to parent
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setPreview(null);
    fileInputRef.current.value = "";
    onImageChange && onImageChange(null); // Notify parent about deletion
  };


  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    const updatedImages = [...images];
    updatedImages[index] = { file, preview: previewUrl };
    setImages(updatedImages);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  useEffect(() => {
    setPreview(file);
  }, [file]);

  return (
    <div className="space-y-10">
      <div className="mt-2 flex relative">
        <div
          className={`relative h-[200px] rounded-lg border border-dashed border-gray-900/25 ${
            preview
              ? "overflow-hidden w-[300px]"
              : "w-full flex items-center justify-center"
          }`}
          style={{
            backgroundImage: preview ? `url(${preview})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!preview && (
            <div className="text-gray-400 flex flex-col gap-4 items-center p-5">
              <div className="w-full max-w-[100px] bg-sec100 flex items-center justify-center px-5 py-3 rounded-full">
                <FiUpload className="text-[20px] text-sec" />
              </div>
              <p className="text-sm text-[#FF8000] text-center">
                Click here to upload banner here{" "}
                <span className="text-xs text-gray-600">
                  (PNG, JPG, GIF up to {maxSizeMB}MB)
                </span>
              </p>
            </div>
          )}

          <label
            htmlFor="file-upload"
            className="absolute inset-0 cursor-pointer"
          >
            <input
              id="file-upload"
              name="coverPhoto"
              type="file"
              accept="image/png, image/jpeg, image/gif"
              className="sr-only"
              onChange={handleChange}
              ref={fileInputRef}
              disabled={disabled}
              {...props}
            />
          </label>

          {preview && (
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center">
              <button
                type="button"
                onClick={!disabled ? handleDeleteImage : undefined}
                className="text-white text-lg p-2 bg-black/70 rounded-full hover:bg-red-500"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        {fileError && (
          <p className="text-red-600 text-xs ms-2 mt-1 absolute -bottom-4 left-0">
            {fileError}
          </p>
        )}
      </div>

      <div className="flex gap-10 items-center flex-wrap">
        {images.map((img, index) => (
          <div className="w-full max-w-[300px] overflow-hidden flex items-center justify-center border border-neutrals200 rounded-[10px] h-[180px] mx-auto">
            {img ? (
              <div className="w-full h-full relative">
                <img
                  src={img.preview}
                  alt={`upload-${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-error text-white p-0.5 rounded-full"
                >
                  <FiX className="text-[14px]" />
                </button>
              </div>
            ) : (
              <div
                key={index}
                className="relative max-w-[100px] px-5 py-3 bg-sec100 flex items-center justify-center rounded-xl overflow-hidden"
              >
                <label className="cursor-pointer w-full h-full flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, index)}
                  />
                  <FiUpload className="text-[20px] text-sec" />
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoUpload;
