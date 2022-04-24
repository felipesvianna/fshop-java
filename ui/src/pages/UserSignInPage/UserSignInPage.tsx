import React, { FC, useContext } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import AuthenticationContext from "../../context/AuthenticationContext";

const UserSignInPage: FC = () => {
  const { loginUser } = useContext(AuthenticationContext);
  return (
    <>
      <p className="font-bold my-4">Sign in</p>
      <LoginForm handleSubmit={loginUser} />
    </>
  );
};

export default UserSignInPage;
