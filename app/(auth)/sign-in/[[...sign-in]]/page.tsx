import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flashy Learners | Sign Up",
  description: "Sign in to access Flashy Learners.",
};


export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}