import React, { useEffect, useState } from "react";
import FormButton from "./FormButton";
import { useCreateEvent } from "@/context/CreateEventContext";
import TextField from "../widgets/TextField";
import Button from "../widgets/Button";
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io";
import { FiUpload, FiX } from "react-icons/fi";

const TicketDto = ({ handleBack, handleReset }) => {
  const [error, setError] = useState({
    venueImages: "",
    restrictions: "",
  });
  const [images, setImages] = useState([null, null, null]);

  const { extras, setExtras } = useCreateEvent();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExtras((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };
      return updatedForm;
    });
  };

  const handleRadio = (value) => {
    setExtras((prevForm) => {
      return { ...prevForm, restrictions: value };
    });
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

  const handleSubmit = () => {};

  return (
    <div className="space-y-10">
      <div className="rounded-[20px] md:border border-neutrals200 md:p-10 md:py-12 space-y-5">
        <div className="flex items-center justify-center flex-wrap gap-5 font-bold mb-5">
          <div className="bg-sec100 text-baseBlack h-[30px] w-[30px] rounded-full flex items-center justify-center">
            <p>6</p>
          </div>
          <p>Do you have any restriction in regards to your audience?</p>
        </div>

        <p className="text-base font-medium">Select any restriction</p>
        <div className="flex flex-wrap gap-5">
          {[
            "None",
            "Children only",
            "Women only",
            "No children",
            "Event 18+",
            "Senior citizen",
          ]?.map((item, index) => {
            const isSelected = extras.restrictions === item;
            return (
              <div className="" key={index}>
                <div className="flex items-start gap-2">
                  {isSelected ? (
                    <IoIosRadioButtonOn
                      className="text-xl mt-0.5 cursor-pointer text-sec"
                      onClick={() => handleRadio(item)}
                    />
                  ) : (
                    <IoIosRadioButtonOff
                      className="text-xl mt-0.5 cursor-pointer"
                      onClick={() => handleRadio(item)}
                    />
                  )}
                  <p className="text-baseBlack">{item}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-[20px] md:border border-neutrals200 md:p-10 md:py-12 space-y-5">
        <div className="flex items-center justify-center flex-wrap gap-5 font-bold mb-5">
          <div className="bg-sec100 text-baseBlack h-[30px] w-[30px] rounded-full flex items-center justify-center">
            <p>7</p>
          </div>
          <p>Do you have pictures of the event hall</p>
        </div>

        <div>
          <p className="text-base font-medium">Additional photos</p>
          <p className="text-base text-neutrals500">
            Upload additional photos to help attendances imagine what the event
            would look like
          </p>
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
                    className="absolute top-2 right-2 bg-error400 text-white p-0.5 rounded-full"
                  >
                    <FiX className="text-[20px]" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 p-10">
                  <label
                    key={index}
                    className="relative max-w-[100px] px-5 py-3 bg-sec100 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, index)}
                    />
                    <FiUpload className="text-[20px] text-sec" />
                  </label>

                  <label className="text-center text-base">
                    <span className="text-sec cursor-pointer">Click here</span>{" "}
                    to upload event banner here
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, index)}
                    />
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between ">
        <div className="p-4 flex justify-center">
          <Button
            onClick={handleBack}
            outline
            text="text-primary hover:text-white"
          >
            Back
          </Button>
        </div>

        <FormButton
          handleAction={handleSubmit}
          position={"justify-end"}
          direction={"Next"}
        />
      </div>
    </div>
  );
};

export default TicketDto;
