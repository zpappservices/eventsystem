import StyledImage from "@/components/StyledImage";
import Button from "@/components/widgets/Button";
import TextField from "@/components/widgets/TextField";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignin = () => {
    if (email !== "admin") {
      toast.error("Invalid Credentials");
      return;
    }

    if (password !== "12345") {
      toast.error("Invalid Credentials");
      return;
    }

    toast.success("Login successful");
    router.push("/admin");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[400px] space-y-5">
        <Link href="/" className="!z-[1400] mx-auto">
          <StyledImage
            src="/img/logo.svg"
            className="w-full sm:min-w-[150px] max-w-[200px] !z-30 mx-auto"
          />
        </Link>
        <div className="space-y-5">
          <div className="flex flex-col">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>

          <div className="flex flex-col">
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              password
            />
          </div>

          <Button onClick={handleSignin} style="w-full" type="submit">
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default signin;
