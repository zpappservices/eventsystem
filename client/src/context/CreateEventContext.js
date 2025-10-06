import { createEvent } from "@/apis/eventsServices";
import useAuthToken from "@/hooks/useAuthToken";
import { uploadFilesToS3 } from "@/utils/s3Upload";
import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CreateEventContext = createContext();

function CreateEventProvider({ children }) {
  const { activeUser } = useAuthToken();
  const [formError, setFormError] = useState({});
  const [fileError, setFileError] = useState("");
  const [ticket, setTicket] = useState([]);
  const [location, setLocation] = useState({
    location: "",
    venue: "",
  });
  const [extras, setExtras] = useState({
    restrictions: "",
    venueImages: [],
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    location: "",
    locationType: "",
    userId: activeUser,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    currency: "",
    createdBy: "System",
    eventType: "",
  });
  const [banner, setBanner] = useState(null);
  const [images, setImages] = useState([null, null, null]);

  const router = useRouter();

  const handleImageChange = (image) => {
    setBanner(image);
  };

  const handleResetForm = () => {
    setTicket({
      type: "Free",
      name: "",
      quantity: "",
      price: "",
      description: "",
      min: "",
      max: "",
    });

    setLocation({
      location: "",
      venue: "",
    });

    setExtras({
      restrictions: "",
      venueImages: [],
    });

    setFormData({
      title: "",
      description: "",
      categoryId: "",
      location: "",
      locationType: "",
      userId: activeUser,
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      currency: "NGN",
      createdBy: "System",
      eventType: "",
      eventDuration: "",
    });

    setFormError({});
    setFileError("");
  };

  const handleSubmit = async (startLoading, stopLoading) => {
    startLoading();

    try {
      const { image_banner, venueImage } = await fetchImage();

      if (image_banner.length < 1) {
        return;
      }

      const payload = {
        eventDto: {
          userId: activeUser || "",
          categoryId: formData.categoryId,
          title: formData.title,
          description: formData.description,
          eventType: formData.eventDuration,
          startDate: formData.startDate,
          endDate: formData.endDate,
          startTime: formData.startTime,
          endTime: formData.endTime,
          AllDay: false,
          image_banner: image_banner,
          venueImage: venueImage,
          image_tile: "",
          restrictionLevel: extras.restrictions,
          createdBy: "",
        },
        locationDto: {
          locationType: "PHYSICAL",
          location: location.location,
          venueName: location.venue,
          latlong: "",
        },
        ticketDto: ticket?.map((item) => ({
          type: item.type,
          name: item.name,
          description: item.description,
          quantity: Number(item.quantity),
          currency: "NGN",
          price: item.price || "0",
          minOrder: Number(item.min),
          maxOrder: Number(item.max),
        })),
      };

      const { data, message, success } = await createEvent(
        payload,
        startLoading,
        stopLoading
      );

      if (success) {
        toast.success("Event created successfully");
        handleResetForm();
        router.reload();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    } finally {
      stopLoading();
    }
  };

  const fetchImage = async () => {
    const bannerFile = banner?.file || null;
    const imageFiles = images.map((img) => img?.file || null).filter(Boolean);
    const venueImageFiles = extras.venueImages
      .map((img) => img?.file || null)
      .filter(Boolean);

    const allFiles = [bannerFile, ...imageFiles, ...venueImageFiles].filter(
      Boolean
    );

    try {
      const uploaded = await uploadFilesToS3(allFiles);

      let image_banner = [];
      let venueImage = [];

      if (bannerFile) {
        image_banner = [
          uploaded[0],
          ...uploaded.slice(1, 1 + imageFiles.length),
        ];
        venueImage = uploaded.slice(1 + imageFiles.length);
      } else {
        image_banner = uploaded.slice(0, imageFiles.length);
        venueImage = uploaded.slice(imageFiles.length);
      }

      return { image_banner, venueImage };
    } catch (error) {
      return { image_banner: [], venueImage: [] };
    }
  };

  return (
    <CreateEventContext.Provider
      value={{
        formData,
        setFormData,
        fileError,
        setFileError,
        formError,
        setFormError,
        handleSubmit,
        handleResetForm,
        banner,
        handleImageChange,
        setTicket,
        ticket,
        location,
        setLocation,
        extras,
        setExtras,
        images,
        setImages,
      }}
    >
      {children}
    </CreateEventContext.Provider>
  );
}

function useCreateEvent() {
  const context = useContext(CreateEventContext);
  if (!context)
    throw new Error(
      "CreateEventContext was used outside the CreateEventProvider"
    );
  return context;
}

export { CreateEventProvider, useCreateEvent };
