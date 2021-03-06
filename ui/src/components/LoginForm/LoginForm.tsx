import React, { FC } from "react";

type LoginFormProps = {
  handleSubmit?: (e: React.SyntheticEvent) => void;
};

const LoginForm: FC<LoginFormProps> = ({ handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          className="block border-solid border-2 border-black"
          type="text"
          id="email"
        />

        <label htmlFor="password">Password: </label>
        <input
          className="block border-solid border-2 border-black"
          type="password"
          id="password"
        />

        <button
          className="block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </>
  );
};

export default LoginForm;
