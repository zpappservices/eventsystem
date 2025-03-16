import { TextField } from "@mui/material";
import { useState } from "react";

const Card = () => {
   const [form, setForm] = useState({
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prevData) => ({
         ...prevData,
         [name]: value,
      }));

      console.log(form);
   };

   return (
      <form className="w-full flex flex-col gap-6">
         <TextField
            label="Name on card"
            name="cardName"
            value={form.cardName}
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
            label="Card Number"
            name="cardNumber"
            value={form.cardNumber}
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
               label="Expiry Date"
               name="expiryDate"
               value={form.expiryDate}
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
               label="CVV"
               name="cvv"
               value={form.cvv}
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
      </form>
   );
};

export default Card;
