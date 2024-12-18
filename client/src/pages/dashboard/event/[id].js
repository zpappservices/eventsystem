import Layout from "@/components/dashboard/Layout";
import useApiRequest from "@/hooks/useApiRequest";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import UpdateEvent from "@/components/event/UpdateEvent";
import UpdateContact from "@/components/event/UpdateContact";
import UpdateTicket from "@/components/event/UpdateTicket";

function CustomTabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && <Box className=" py-5 sm:px-3">{children}</Box>}
      </div>
   );
}

CustomTabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
};

function a11yProps(index) {
   return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
   };
};

const event = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id && router.isReady) router.push("/dashboard");
  }, [id]);

  const { data, error, loading, request } = useApiRequest({
    method: "get",
    url: `event/getoneevent/${id}`,
    data: null,
    headers: null,
    useToken: true,
  });

  const getEvent = async () => {
    await request();
  };

  useEffect(() => {
    getEvent();
  }, [router]);

  const { data: event = {} } = data || {};

  console.log(event);

  return (
    <Layout>
      <div className="bg-white px-5 py-10 sm:p-10">
        <div className="w-full flex flex-col gap-2">
          <p className="text-[20px] font-bold leading-[24px]">Update Event</p>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: "none",
              }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="provider portfolio tabs"
                variant="fullWidth"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#FF875B",
                  },
                }}>
                {["Update Event", "Update Contact", "Update Ticket"].map((label, index) => (
                  <Tab
                    key={label}
                    label={label}
                    {...a11yProps(index)}
                    sx={{
                      width: "100%",
                      paddingY: "11px",
                      paddingX: "10px",
                      fontSize: "15px",
                      fontWeight: "600",
                      lineHeight: "22.62px",
                      fontFamily: "Inter",
                      textTransform: "capitalize",
                      color: value === index ? "#1E944D" : "inherit",
                      borderRadius: value === index ? 0 : "",
                      "&.Mui-selected": {
                        color: "#FF875B",
                      },
                      "&:hover": {
                        color: "#FF875B",
                      },
                        }}
                        className="text-[14px] sm:text-[15px] leading-[20px]"
                  />
                ))}
              </Tabs>
            </Box>
            <div className="w-full overflow-x-auto pt-3">
              <CustomTabPanel value={value} index={0}>
                <UpdateEvent event={event}/>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <UpdateContact event={event}/>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <UpdateTicket event={event}/>
              </CustomTabPanel>
            </div>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default event;
