import React, { FC } from "react";
import UserRegisterForm from "../../components/UserRegisterForm/UserRegisterForm";

const UserRegisterPage: FC = () => {
  return (
    <>
      <p className="font-bold my-4">Create Account</p>
      <UserRegisterForm />
    </>
  );
};

export default UserRegisterPage;
