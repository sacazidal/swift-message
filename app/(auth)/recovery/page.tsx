import AuthForm from "@/components/AuthForm";
import RecoveryForm from "@/components/RecoveryForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Восстановление пароля",
};

const Recovery = () => {
  return (
    <AuthForm>
      <RecoveryForm />
    </AuthForm>
  );
};
export default Recovery;
