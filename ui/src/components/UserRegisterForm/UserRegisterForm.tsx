import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { UserProps } from "../../interfaces";
import validateUserRegisterForm from "./validateUserRegisterForm";

interface FormErrorsProps {
  firstName?: string;
  address?: string;
  username?: string;
  password?: string;
}

interface UserRegisterFormProps {
  handleSubmit?: (e: React.SyntheticEvent) => void;
}

const UserRegisterForm: FC<UserRegisterFormProps> = ({ handleSubmit }) => {
  const initialState = {
    firstName: "",
    lastName: "",
    address: "",
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState<UserProps>(initialState);
  const [formErrors, setFormErrors] = useState<FormErrorsProps>({});

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateUserRegisterForm(formData);
    if (typeof handleSubmit === "function" && !errors) {
      handleSubmit(e);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="firstname">First Name:</label>
        <input
          className="block border-solid border-2 border-black"
          type="text"
          id="firstname"
          name="firstName"
          onChange={onChangeForm}
          value={formData.firstName}
        />

        <label htmlFor="lastname">Last Name:</label>
        <input
          className="block border-solid border-2 border-black"
          type="text"
          id="lastname"
          name="lastName"
          onChange={onChangeForm}
          value={formData.lastName}
        />

        <label htmlFor="address">Address:</label>
        <input
          className="block border-solid border-2 border-black"
          type="text"
          id="address"
          name="address"
          onChange={onChangeForm}
          value={formData.address}
        />

        <label htmlFor="username">Username:</label>
        <input
          className="block border-solid border-2 border-black"
          type="text"
          id="username"
          name="username"
          onChange={onChangeForm}
          value={formData.username}
        />

        <label htmlFor="password">Password:</label>
        <input
          className="block border-solid border-2 border-black"
          type="password"
          id="password"
          name="password"
          onChange={onChangeForm}
          value={formData.password}
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
