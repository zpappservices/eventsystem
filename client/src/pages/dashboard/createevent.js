import Layout from "@/components/dashboard/Layout";
import EventStepper from "@/components/createevent/EventStepper";

const CreateEvent = () => {
  const ticketTypes = [
    { value: "Free", label: "Free" },
    { value: "Paid", label: "Paid" },
    { value: "VIP", label: "VIP" },
  ];

  return (
    <Layout>
      <div className="w-full max-w-[1190px] pt-8">
        <EventStepper />
      </div>
    </Layout>
  );
};

export default CreateEvent;
