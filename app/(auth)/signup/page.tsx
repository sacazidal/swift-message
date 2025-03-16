import AuthForm from "@/components/AuthForm";
import SignUpForm from "@/components/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация",
};

const SignUpPage = () => {
  return (
    <AuthForm>
      <SignUpForm />
    </AuthForm>
  );
};
export default SignUpPage;
