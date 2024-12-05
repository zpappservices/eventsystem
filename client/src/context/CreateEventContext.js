import useAuthToken from "@/hooks/useAuthToken";
import { Description } from "@radix-ui/react-toast";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const CreateEventContext = createContext();

function CreateEventProvider({ children }) {
  const { activeUser } = useAuthToken()
  const [formError, setFormError] = useState({});
  const [fileError, setFileError] = useState("");

  const [formData, setFormData] = useState({
    eventDto: {
      title: "",
      description: "",
      categoryId: "",
      location: "",
      userId: activeUser,
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      currency: "",
      createdBy: "System",
    },
    contactDto: {
      email: "",
      phone: "",
      facebook: "",
    },
    ticketDto: [
    ],
  });
  const [base64Image, setBase64Image] = useState(null);

  const handleImageChange = (base64) => {
    setBase64Image(base64);
    if (base64) {
    } else {
    }
  };

  const handleResetForm = () => {
    setFormData({
      eventDto: {
        title: "",
        description: "",
        categoryId: "",
        location: "",
        userId: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        createdBy: "System",
        currency: ""
      },
      contactDto: {
        email: "",
        phone: "",
        facebook: "",
      },
      ticketDto: [
        {
          type: "free",
          name: "Free",
          price: 0,
          quantity: 10,
        },
        {
          type: "paid",
          name: "Standard",
          price: 1000,
          quantity: 10,
        },
      ],
    });

    setPreview(null);
    setFormError({});
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = ""; 
  };

  {
    /**---------------------------------- NEED TO BE REVIEWED -------------- */
  }
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null); // Ref for file input

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file.size > MAX_FILE_SIZE) {
        setFileError("File size should not exceed 5MB.");
        return;
      }
      setFileError(""); // Clear error if file is valid
      setFormData((prevData) => ({ ...prevData, coverPhoto: file }));
      setPreview(URL.createObjectURL(file));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleDeleteImage = () => {
    setFormData((prevData) => ({ ...prevData, coverPhoto: null }));
    setPreview(null);

    if (fileInputRef.current) fileInputRef.current.value = ""; // Clear the file input value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formDataToSend = new FormData();

      // Append each field to FormData
      formDataToSend.append("eventName", formData.eventName);
      formDataToSend.append("eventCategory", formData.eventCategory);
      formDataToSend.append("eventAddress", formData.eventAddress);
      formDataToSend.append("eventStartDate", formData.eventStartDate);
      formDataToSend.append("eventStartTime", formData.eventStartTime);
      formDataToSend.append("eventEndDate", formData.eventEndDate);
      formDataToSend.append("eventEndTime", formData.eventEndTime);
      formDataToSend.append("ticketType", formData.ticketType);
      formDataToSend.append("acceptTerms", formData.acceptTerms);
      if (formData.coverPhoto) {
        formDataToSend.append("coverPhoto", formData.coverPhoto);
        console.log(formData.coverPhoto);
      }

      try {
        // Send formDataToSend to your server (API endpoint example used)
        const response = await fetch("/api/events", {
          method: "POST",
          body: formDataToSend,
        });

        if (response.ok) {
          console.log("Event created successfully!");
          handleResetForm();
        } else {
          console.error("Failed to create event.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <CreateEventContext.Provider
      value={{
        formData,
        setFormData,
        preview,
        setPreview,
        fileError,
        setFileError,
        formError,
        setFormError,
        fileInputRef,
        handleChange,
        handleSubmit,
        handleDeleteImage,
        handleResetForm,
        base64Image,
        handleImageChange
      }}
    >
      {children}
    </CreateEventContext.Provider>
  );
}

function useCreateEvent() {
  const context = useContext(CreateEventContext);
  if (!context) throw new Error("CreateEventContext was used outside the CreateEventProvider");
  return context;
}

export { CreateEventProvider, useCreateEvent };
