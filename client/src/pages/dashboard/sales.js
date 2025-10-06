import Layout from "@/components/dashboard/Layout";
import Sales from "@/components/dashboard/Sales";
import SalesEvents from "@/components/dashboard/SalesEvents";
import React, { useState } from "react";

const TicketSales = () => {
  const [data, setData] = useState("");
  const [step, setStep] = useState(0);
  const [id, setId] = useState("");

  const next = () => {
    setStep(1);
  };

  const back = () => {
    setStep(0);
  };

  if (step === 1) {
    return <Sales id={id} back={back} />;
  }
  return (
    <Layout>
      <SalesEvents next={next} setId={setId} />
    </Layout>
  );
};

export default TicketSales;
