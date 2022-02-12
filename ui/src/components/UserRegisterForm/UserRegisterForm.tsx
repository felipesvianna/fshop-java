import React, { FC, useEffect, useState } from "react";

interface FormErrorsProps {
  firstName?: string;
  address?: string;
  username?: string;
  password?: string;
}

const UserRegisterForm: FC = () => {
  const [formErrors, setFormErrors] = useState<FormErrorsProps>({});

  return (
    <>
      <form>
        <label htmlFor="firstname">First Name: </label>
        <input
          className="block border-solid border-2 border-black"
          type="text"
          id="firstname"
        />

        <label htmlFor="lastname">Last Name: </label>
        <input
          className="block border-solid border-2 border-black"
          type="text"
          id="lastname"
        />

        <label htmlFor="address">Address: </label>
        <input
          className="block border-solid border-2 border-black"
          type="text"
          id="address"
        />

        <label htmlFor="username">Username: </label>
        <input
          className="block border-solid border-2 border-black"
          type="text"
          id="username"
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
          Register
        </button>
      </form>
    </>
  );
};

export default UserRegisterForm;
