import React, { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import AuthenticationContext from "../../context/AuthenticationContext";
import { UserProps } from "../../interfaces";
import validateUserRegisterForm from "./validateUserRegisterForm";

interface FormErrorsProps {
  firstName?: string;
  address?: string;
  email?: string;
  password?: string;
}

interface UserRegisterFormProps {
  handleSubmit?: Function;
}

const UserRegisterForm: FC<UserRegisterFormProps> = ({ handleSubmit }) => {
  const initialState = {
    id: 0,
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState<UserProps>(initialState);
  const [formErrors, setFormErrors] = useState<FormErrorsProps>({});
  const [alertMessage, setAlertMessage] = useState<String>("");

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errors = validateUserRegisterForm(formData);

    if (typeof handleSubmit === "function" && !errors) {
      const response = await handleSubmit(formData);

      if (response?.status === 409) {
        errors = { ...errors, email: response?.errors[0] };
      } else {
        setAlertMessage("User registered successfully!");
      }
    }

    setFormErrors(errors);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="block my-4">
          <label htmlFor="firstname">First Name:</label>
          <input
            className="block border-solid border-2 border-black"
            type="text"
            id="firstname"
            name="firstName"
            onChange={onChangeForm}
            value={formData.firstName}
          />
          <strong className="text-red-500">
            {formErrors.firstName ? formErrors.firstName : null}
          </strong>
        </div>

        <div className="block my-4">
          <label htmlFor="lastname">Last Name:</label>
          <input
            className="block border-solid border-2 border-black"
            type="text"
            id="lastname"
            name="lastName"
            onChange={onChangeForm}
            value={formData.lastName}
          />
        </div>

        <div className="block my-4">
          <label htmlFor="address">Address:</label>
          <input
            className="block border-solid border-2 border-black"
            type="text"
            id="address"
            name="address"
            onChange={onChangeForm}
            value={formData.address}
          />
          <strong className="text-red-500">
            {formErrors.address ? formErrors.address : null}
          </strong>
        </div>

        <div className="block my-4">
          <label htmlFor="email">Email:</label>
          <input
            className="block border-solid border-2 border-black"
            type="text"
            id="email"
            name="email"
            onChange={onChangeForm}
            value={formData.email}
          />
          <strong className="text-red-500">
            {formErrors.email ? formErrors.email : null}
          </strong>
        </div>

        <div className="block my-4">
          <label htmlFor="password">Password:</label>
          <input
            className="block border-solid border-2 border-black"
            type="password"
            id="password"
            name="password"
            onChange={onChangeForm}
            value={formData.password}
          />
          <strong className="text-red-500">
            {formErrors.password ? formErrors.password : null}
          </strong>
        </div>

        <button
          className="block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Register
        </button>
        <strong className="text-green-500 mt-4">
          {alertMessage ? alertMessage : null}
        </strong>
      </form>
    </>
  );
};

export default UserRegisterForm;
