import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

function handleClick(event) {
   event.preventDefault();
   console.info("You clicked a breadcrumb.");
}

const BreadCrumb = ({ id }) => {
   const router = useRouter();
   const pathname = usePathname();
   console.log(pathname);
   return (
      <div
         role="presentation"
         className="border-b-2 border-black pb-2"
         onClick={handleClick}
      >
         <Breadcrumbs
            aria-label="breadcrumb"
            separator={
               <NavigateNextIcon fontSize="small" className="text-black" />
            }
         >
            <Link href="/">
               <p className="cursor-pointer text-[20px] leading-snug font-semibold text-black">
                  HOME
               </p>
            </Link>
            <p
               className={`cursor-pointer text-[20px] leading-snug font-semibold ${
                  pathname === `/${id}` ? "text-[#FF7F50]" : "text-black"
               }`}
               onClick={() => router.back()} 
            >
               EVENT
            </p>
            {pathname === "/payment" && (
               <p
                  className={`cursor-pointer text-[20px] leading-snug font-semibold ${
                     pathname === "/payment" ? "text-[#FF7F50]" : "text-black"
                  }`}
               >
                  PAYMENT
               </p>
            )}
         </Breadcrumbs>
      </div>
   );
};

export default BreadCrumb;
