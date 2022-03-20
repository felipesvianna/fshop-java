import React, { FC, useContext } from "react";
import UserRegisterForm from "../../components/UserRegisterForm/UserRegisterForm";
import AuthenticationContext from "../../context/AuthenticationContext";

const UserRegisterPage: FC = () => {
  const { createAccount } = useContext(AuthenticationContext);

  return (
    <>
      <p className="font-bold my-4">Create Account</p>
      <UserRegisterForm handleSubmit={createAccount} />
    </>
  );
};

export default UserRegisterPage;
