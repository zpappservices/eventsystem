import React, { useState, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

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

  useEffect(() => {
    setPreview(file);
  }, [file]);

  return (
    <div className="">
      <p className="block text-md font-semibold text-gray-900">Banner Image</p>
      <div className="mt-2 flex">
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
          }}>
          {!preview && (
            <div className="text-gray-400 flex flex-col items-center">
              <FiUpload size={80} color="#4b5563" />
              <p className="text-sm text-[#FF8000]">Upload a file</p>
              <p className="text-xs text-gray-600">
                PNG, JPG, GIF up to {maxSizeMB}MB
              </p>
            </div>
          )}

          <label
            htmlFor="file-upload"
            className="absolute inset-0 cursor-pointer">
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
                className="text-white text-lg p-2 bg-black/70 rounded-full hover:bg-red-500">
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      </div>
      {fileError && (
        <p className="text-red-600 text-xs ms-2 mt-1">{fileError}</p>
      )}
    </div>
  );
};

export default PhotoUpload;
