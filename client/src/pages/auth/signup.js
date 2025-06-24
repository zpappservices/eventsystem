import Layout from "@/components/auth/Layout";
import React from "react";
import SignUp from "./vendor/signup";

const signup = () => {
  return (
    <Layout>
      <div className="w-full max-w-[462px]">
        <SignUp />
      </div>
    </Layout>
  );
};

export default signup;
