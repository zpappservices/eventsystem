import { Checkbox, TextField } from "@mui/material";
import { useState } from "react";

const Contact = () => {
   const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
   });
   const [isBuyingForSomeone, setIsBuyingForSomeone] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prevData) => ({
         ...prevData,
         [name]: value,
      }));

      console.log(`${name}: ${value}`);
   };

   const handleCheckboxChange = (e) => {
      setIsBuyingForSomeone(e.target.checked);
   };
   return (
      <form className="w-full flex flex-col gap-6">
         <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            variant="outlined"
            className="focus:outline-[#FF7F50] border-[#FF7F50] ring-[#FF7F50]"
            sx={{
               "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                     borderColor: "#FF7F50", // Outline color when focused
                  },
               "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FF7F50", // Label color when focused
               },
            }}
         />
         <TextField
            label="Phone number"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            variant="outlined"
            className="focus:outline-[#FF7F50] border-[#FF7F50] ring-[#FF7F50]"
            sx={{
               "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                     borderColor: "#FF7F50", // Outline color when focused
                  },
               "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FF7F50", // Label color when focused
               },
            }}
         />
         <div className="flex items-center gap-3 justify-between">
            <TextField
               label="First Name"
               name="firstName"
               value={form.firstName}
               onChange={handleChange}
               variant="outlined"
               className="focus:outline-[#FF7F50] border-[#FF7F50] ring-[#FF7F50]"
               sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                     {
                        borderColor: "#FF7F50", // Outline color when focused
                     },
                  "& .MuiInputLabel-root.Mui-focused": {
                     color: "#FF7F50", // Label color when focused
                  },
               }}
            />
            <TextField
               label="Last Name"
               name="lastName"
               value={form.lastName}
               onChange={handleChange}
               variant="outlined"
               className="focus:outline-[#FF7F50] border-[#FF7F50] ring-[#FF7F50]"
               sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                     {
                        borderColor: "#FF7F50", // Outline color when focused
                     },
                  "& .MuiInputLabel-root.Mui-focused": {
                     color: "#FF7F50", // Label color when focused
                  },
               }}
            />
         </div>
         <div className="flex items-start gap-2">
            <Checkbox
               checked={isBuyingForSomeone}
               onChange={handleCheckboxChange}
               inputProps={{ "aria-label": "controlled" }}
               sx={{
                  "&.Mui-checked": {
                     color: "#FF7F50", // Checked color
                  },
               }}
            />
            <div>
               <p className="text-[16px] leading-snug">
                  Buying tickets for someone
               </p>
               <p className="text-[12px] leading-snug ">
                  (if yes, kindly input the information of who the ticket who be
                  for)
               </p>
            </div>
         </div>
      </form>
   );
};

export default Contact;
