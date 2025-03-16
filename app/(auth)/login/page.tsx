import AuthForm from "@/components/AuthForm";
import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход",
};

const LoginPage = () => {
  return (
    <AuthForm>
      <LoginForm />
    </AuthForm>
  );
};
export default LoginPage;
