import Layout from "@/components/dashboard/Layout";
import StyledImage from "@/components/StyledImage";
import Button from "@/components/widgets/Button";
import TextArea from "@/components/widgets/TextArea";
import TextField from "@/components/widgets/TextField";
import React, { useState } from "react";

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

  return (
    <Layout>
      <div className="w-full max-w-[1190px] space-y-12 py-5">
        <div className="space-y-7">
          <div className="flex items-center gap-3">
            <p className="font-bold text-2xl text-baseBlack">Profile</p>
          </div>
        </div>

        <div className="rounded-[10px] md:border md:bg-baseWhite border-neutrals400 md:p-10 space-y-5">
          <div className="flex gap-10 justify-between">
            <div className="relative w-[135px] h-[135px] aspect-square rounded-full shrink-0">
              <StyledImage src="/img/profile.png" className="w-full h-full" />
              <StyledImage
                src="/img/camera.svg"
                className="absolute bottom-0 right-2 cursor-pointer"
              />
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
                      onChange={handleCompanyChange}
                      label="Instagram"
                      style="!rounded-[6px]"
                      name="instagram"
                      placeholder="Enter instagram link"
                    />
                  </div>
                </div>
              </div>

              <Button className="!ms-auto w-full !max-w-[120px] !mt-10">Save</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default profile;
