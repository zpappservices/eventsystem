import { getVendorProfile, updateVendorProfile } from "@/apis/profile_services";
import Layout from "@/components/dashboard/Layout";
import StyledImage from "@/components/StyledImage";
import Button from "@/components/widgets/Button";
import TextArea from "@/components/widgets/TextArea";
import TextField from "@/components/widgets/TextField";
import useAuthToken from "@/hooks/useAuthToken";
import useLoading from "@/hooks/useLoading";
import { uploadFilesToS3 } from "@/utils/s3Upload";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const profile = () => {
  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    organizerName: "",
    phone: "",
    bio: "",
  });
  const [company, setCompany] = useState({
    country: "",
    state: "",
    address: "",
    zipCode: "",
  });
  const [socials, setSocials] = useState({
    facebook: "",
    twitter: "",
    linkedIn: "",
    instagram: "",
  });
  const [image, setImage] = useState();
  const [preImage, setPreImage] = useState("");
  const [profile, setProfile] = useState({});
  const maxSizeMB = 5;

  const { activeUser } = useAuthToken();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const {
    isLoading: isUpdating,
    startLoading: startUpdating,
    stopLoading: stopUpdating,
  } = useLoading();

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonal((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSocialsChange = (e) => {
    const { name, value } = e.target;
    setSocials((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const getProfile = async () => {
    const { data, success, error, message } = await getVendorProfile(
      activeUser,
      startLoading,
      stopLoading
    );

    if (success) {
      setPersonal({
        firstName: data?.firstName ?? "",
        lastName: data?.lastName ?? "",
        organizerName: data?.company ?? "",
        phone: data?.phone ?? "",
        bio: data?.bio ?? "",
      });

      setCompany({
        country: data?.country,
        state: data?.state,
        address: data?.address,
        zipCode: data?.zipcode,
      });

      setSocials({
        facebook: data?.facebook,
        twitter: data?.twitter,
        linkedIn: data?.linkedin,
        instagram: data?.instagram,
      });

      setPreImage(data?.photo);
      setProfile(data);
    } else {
      toast.error(message || "Something went wrong");
    }
  };

  const updateProfile = async () => {
    let imageUrl = preImage;

    try {
      if (image?.file) {
        const uploaded = await uploadFilesToS3([image.file]);
        imageUrl = uploaded?.[0];
      }
    } catch (error) {
      toast.error("Unable to upload images");
      return;
    }

    const payload = {
      userId: activeUser,
      firstName: personal.firstName,
      lastName: personal.lastName,
      phone: personal.phone,
      email: profile?.email,
      company: personal.organizerName,
      jobTitle: profile?.jobTitle,
      website: profile?.website,
      photo: imageUrl,
      bio: personal?.bio,
      address: company?.address,
      state: company?.state,
      zipcode: company?.zipCode,
      country: company.country,
      facebook: socials.facebook,
      twitter: socials.twitter,
      instagram: socials.instagram,
      linkedin: socials.linkedIn,
    };

    const { message, success } = await updateVendorProfile(
      profile?.id,
      payload,
      startUpdating,
      stopUpdating
    );

    if (success) {
      getProfile();
      toast.success("Profile updated");
    } else {
      toast.error("Couldn't update profile");
    }
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const isValidFile =
      ["image/png", "image/jpeg", "image/gif"].includes(file.type) &&
      file.size <= maxSizeMB * 1024 * 1024;

    if (!isValidFile) {
      toast.error(
        `Invalid file. Ensure it's a PNG, JPG, or GIF under ${maxSizeMB}MB.`
      );
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImage({ file, preview: previewUrl });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Layout>
      <div className="w-full max-w-[1190px] space-y-12 py-5">
        <div className="space-y-7">
          <div className="flex items-center gap-3">
            <p className="font-bold text-2xl text-baseBlack">Profile</p>
          </div>
        </div>

        <div className="rounded-[10px] md:border md:bg-baseWhite border-neutrals200 md:p-10 space-y-5">
          <div className="lg:flex gap-10 space-y-10 justify-between">
            <div className="relative w-[135px] h-[135px] aspect-square rounded-full shrink-0 mx-auto">
              {image?.preview ? (
                <StyledImage
                  src={image.preview}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : preImage ? (
                <StyledImage
                  src={preImage}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
                  <FaUser className="text-neutrals600 text-6xl" />
                </div>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                id="fileInput"
                onChange={handleImage}
              />

              <label
                htmlFor="fileInput"
                className="absolute bottom-0 right-2 cursor-pointer"
              >
                <StyledImage src="/img/camera.svg" />
              </label>
            </div>

            <div className="w-full max-w-[888px] space-y-5">
              <div className="w-full grid xl:grid-cols-2 gap-x-10 2xl:gap-x-20 gap-y-5">
                <TextField
                  value={personal.firstName}
                  onChange={handlePersonalChange}
                  label="First Name"
                  style="!rounded-[6px]"
                  name="firstName"
                  placeholder="Enter first name"
                />

                <TextField
                  value={personal.lastName}
                  onChange={handlePersonalChange}
                  label="Last Name"
                  style="!rounded-[6px]"
                  name="lastName"
                  placeholder="Enter last name"
                />
              </div>

              <div className="w-full grid xl:grid-cols-2 gap-x-10 2xl:gap-x-20 gap-y-5">
                <TextField
                  value={personal.organizerName}
                  onChange={handlePersonalChange}
                  label="Company/Organizer Name"
                  style="!rounded-[6px]"
                  name="organizerName"
                  placeholder="Enter organizer name"
                />

                <TextField
                  value={personal.phone}
                  onChange={handlePersonalChange}
                  label="Phone No"
                  style="!rounded-[6px]"
                  name="phone"
                  placeholder="Enter phone number"
                />
              </div>

              <TextArea
                value={personal.bio}
                onChange={handlePersonalChange}
                label="Organizer Bio"
                style="!rounded-[6px]"
                textAreaClassName="bg-white"
                name="bio"
                placeholder="Enter bio"
              />

              <div className="">
                <p className="text-medium text-black text-xl mb-3 mt-10">
                  Company / Organizer’s Address
                </p>
                <div className="w-full max-w-[888px] space-y-5">
                  <div className="w-full grid xl:grid-cols-2 gap-x-10 2xl:gap-x-20 gap-y-5">
                    <TextField
                      value={company.country}
                      onChange={handleCompanyChange}
                      label="Country"
                      style="!rounded-[6px]"
                      name="country"
                      placeholder="Enter Country"
                    />

                    <TextField
                      value={company.state}
                      onChange={handleCompanyChange}
                      label="State"
                      style="!rounded-[6px]"
                      name="state"
                      placeholder="Enter state"
                    />
                  </div>

                  <div className="w-full grid xl:grid-cols-2 gap-x-10 2xl:gap-x-20 gap-y-5">
                    <TextField
                      value={company.address}
                      onChange={handleCompanyChange}
                      label="Address"
                      style="!rounded-[6px]"
                      name="address"
                      placeholder="Enter address"
                    />

                    <TextField
                      value={company.zipCode}
                      onChange={handleCompanyChange}
                      label="Zip code"
                      style="!rounded-[6px]"
                      name="zipCode"
                      placeholder="Enter zip code"
                    />
                  </div>
                </div>
              </div>

              <div className="">
                <p className="text-medium text-black text-xl mb-3 mt-10">
                  Display Your Social Handles
                </p>
                <div className="w-full max-w-[888px] space-y-5">
                  <div className="w-full grid xl:grid-cols-2 gap-x-10 2xl:gap-x-20 gap-y-5">
                    <TextField
                      value={socials.facebook}
                      onChange={handleSocialsChange}
                      label="Facebook"
                      style="!rounded-[6px]"
                      name="facebook"
                      placeholder="Enter facebook link"
                    />

                    <TextField
                      value={socials.twitter}
                      onChange={handleSocialsChange}
                      label="Twitter"
                      style="!rounded-[6px]"
                      name="twitter"
                      placeholder="Enter twitter link"
                    />
                  </div>

                  <div className="w-full grid xl:grid-cols-2 gap-x-10 2xl:gap-x-20 gap-y-5">
                    <TextField
                      value={socials.linkedIn}
                      onChange={handleSocialsChange}
                      label="Linkedln"
                      style="!rounded-[6px]"
                      name="linkedIn"
                      placeholder="Enter linkedIn link"
                    />

                    <TextField
                      value={socials.instagram}
                      onChange={handleSocialsChange}
                      label="Instagram"
                      style="!rounded-[6px]"
                      name="instagram"
                      placeholder="Enter instagram link"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={updateProfile}
                isLoading={isUpdating}
                className="!ms-auto w-full !max-w-[120px] !mt-10"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default profile;
