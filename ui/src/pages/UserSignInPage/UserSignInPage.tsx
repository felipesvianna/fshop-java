import React, { FC } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

const UserSignInPage: FC = () => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit sign in form");
  };
  return (
    <>
      <p className="font-bold my-4">Sign in</p>
      <LoginForm handleSubmit={handleSubmit} />
    </>
  );
};

export default UserSignInPage;
