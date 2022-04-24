import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginCredentialsProps } from "../../interfaces";

type LoginFormProps = {
  handleSubmit?: Function;
};

const LoginForm: FC<LoginFormProps> = ({ handleSubmit }) => {
  const initialState = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginCredentialsProps>(initialState);
  const [alertMessage, setAlertMessage] = useState<String>("");

  const onChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (typeof handleSubmit === "function") {
      const response = await handleSubmit(formData);

      if (response?.status === 200) {
        return navigate("/");
      }

      setAlertMessage(response?.errors[0]);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          className="block border-solid border-2 border-black"
          type="text"
          id="email"
          name="email"
          onChange={onChangeForm}
          value={formData.email}
        />

        <label htmlFor="password">Password: </label>
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
          Sign In
        </button>
        <strong className="text-red-500 mt-4">
          {alertMessage ? alertMessage : null}
        </strong>
      </form>
    </>
  );
};

export default LoginForm;
