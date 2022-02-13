import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { UserProps } from "../../interfaces";
import validateUserRegisterForm from "./validateUserRegisterForm";

interface FormErrorsProps {
  firstName?: string;
  address?: string;
  email?: string;
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
    email: "",
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
      </form>
    </>
  );
};

export default UserRegisterForm;
