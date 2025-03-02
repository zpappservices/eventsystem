import Layout from "@/components/dashboard/Layout";
import { FaTrash } from "react-icons/fa6";
import Image from "next/image";
import EventStepper from "@/components/createevent/EventStepper";

const CreateEvent = () => {
  const ticketTypes = [
    { value: "Free", label: "Free" },
    { value: "Paid", label: "Paid" },
    { value: "VIP", label: "VIP" },
  ];

  return (
    <Layout>
      <div className="rounded bg-white border-b-2 border-[#FF7F50] shadow-sm shadow-slate-400 pt-4 pl-7 text-2xl font-bold">
        <h1 className="w-full">Post a New Event</h1>
      </div>

      <div className="rounded bg-white border-b-2 py-4 px-7 border-slate-400 shadow-sm shadow-slate-400">
        <EventStepper />
      </div>
    </Layout>
  );
};

export default CreateEvent;

// {/* Cover Photo */}
// <div className="col-span-full p-4">
// <p className="block text-sm font-semibold text-gray-900">Cover photo</p>
// <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//   <div className="text-center">
//     {preview ? (
//       <div className="relative w-24 h-24 mx-auto mb-4 rounded-md overflow-hidden">
//         <Image
//           src={preview}
//           alt="Cover photo preview"
//           width={100}
//           height={100}
//           className="object-cover"
//         />
//       </div>
//     ) : (
//       <div className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
//     )}

//     <div className="mt-4 flex text-sm text-gray-600">
//       <label
//         htmlFor="file-upload"
//         className="relative cursor-pointer rounded-md bg-white font-semibold text-[#FF7F50] focus-within:outline-none hover:text-[#FF7F50]"
//       >
//         <span>Upload a file</span>
//         <input
//           id="file-upload"
//           name="coverPhoto"
//           type="file"
//           accept="image/png, image/jpeg, image/gif"
//           className="sr-only"
//           onChange={handleChange}
//           ref={fileInputRef} // Attach ref to file input
//         />
//       </label>
//       <p className="pl-1">or drag and drop</p>
//     </div>
//     <p className="text-xs text-gray-600">PNG, JPG, GIF up to 5MB</p>

//     {preview && (
//       <div className="w-full flex justify-center">
//         <button
//           type="button"
//           onClick={handleDeleteImage}
//           className="flex gap-1 items-center mt-2 text-[#FF7F50] text-sm"
//         >
//           Delete Image
//           <FaTrash />
//         </button>
//       </div>
//     )}
//   </div>
// </div>
// </div>
// {/* Display file upload error */}
// {fileError && <p className="text-red-500 text-sm">{error}</p>}

// {/* Ticket Type */}
// <div className="p-4">
// <h2 className="font-semibold pb-2">Ticket Type</h2>
// <TextField
//   fullWidth
//   id="ticket-type"
//   select
//   label="Select ticket type"
//   name="ticketType"
//   value={formData.ticketType}
//   onChange={handleChange}
//   color="warning"
//   error={!!formError.ticketType}
//   helperText={formError.ticketType || ""}
// >
//   {ticketTypes.map((option) => (
//     <MenuItem key={option.value} value={option.value}>
//       {option.label}
//     </MenuItem>
//   ))}
// </TextField>
// </div>

// {/* Terms and Conditions */}
// <div className="p-4">
// <label className="inline-flex items-center space-x-2">
//   <input
//     type="checkbox"
//     name="acceptTerms"
//     checked={formData.acceptTerms}
//     onChange={handleChange}
//     className="form-checkbox text-[#FF7F50]"
//   />
//   <span className="text-sm">
//     I accept the
//     <a href="#" className="text-[#FF7F50] underline">
//       Terms and Conditions
//     </a>
//   </span>
// </label>
// </div>

// {/* Submit Button */}
// <div className="p-4 flex justify-center">
// <button
//   type="submit"
//   className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-md focus:outline-none transition-all duration-300 ease-in-out ${
//     formData.acceptTerms
//       ? "bg-[#FF7F50] text-white hover:bg-[#e66a43] active:scale-95"
//       : "bg-gray-200 text-gray-600 cursor-not-allowed"
//   }`}
//   disabled={!formData.acceptTerms}
// >
//   Submit Event
// </button>
// </div>
