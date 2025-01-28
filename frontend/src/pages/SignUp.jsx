import { useState } from "react";
import { VALIDATION_RULES } from "../constants";
import Input from "../components/Input";
import Button from "../components/Button";
import ProductMockUp from "../components/ProductMockUp";
import { signUpApi } from "../api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setToken } from "../store/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: null,
    email: null,
    password: null,
  });

  const handleChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleValidate = (key, value) => {
    const rule = VALIDATION_RULES[key];

    if (!rule) {
      console.warn(`No validation rule found for key: ${key}`);
      return;
    }

    setError((prevErrors) => ({
      ...prevErrors,
      [key]: rule.validate(value) ? null : rule.errorMessage,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (error["email"] !== null || error["password"] !== null) {
        alert("Please check the forms");
        return;
      }
      const data = await signUpApi(form);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center px-10 py-5 gap-5">
      <div className="h-full w-1/2 flex flex-col items-center justify-center">
        <div className="w-[80%] px-10 py-6">
          <div className="text-5xl">
            Get started with{" "}
            <span className="font-bold text-indigo-600">Organizer</span>
          </div>
          <div className="mb-8 mt-2">
            <span className="text-sm text-slate-300">Create a new account</span>
          </div>
          <div className="flex flex-col gap-y-5">
            <Input
              label={"Full Name"}
              type="text"
              placeholder={"John Doe"}
              id="name"
              onChange={(e) => handleChange("name", e.target.value)}
              // onBlur={(e) => handleValidate("name", e.target.value)}
              // error={error["name"]}
            />
            <Input
              label={"Email Address"}
              type="email"
              placeholder={"example@email.com"}
              id="email"
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={(e) => handleValidate("email", e.target.value)}
              error={error["email"]}
            />
            <Input
              label={"Password"}
              type="password"
              placeholder={"********"}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={(e) => handleValidate("password", e.target.value)}
              id="password"
              error={error["password"]}
            />
          </div>
          <div className="my-3 text-sm font-medium text-slate-400 float-right hover:underline hover:text-slate-500">
            <a href="/auth/signin">Have an account? Login</a>
          </div>
          <Button
            // disabled={
            //   error["name"] !== null ||
            //   error["email"] !== null ||
            //   error["password"] !== null
            // }
            onClick={handleSubmit}
            title="Create Account"
            btnStyle="mt-10"
          />
        </div>
      </div>
      <div className="h-full w-1/2 flex items-center justify-center">
        <ProductMockUp />
      </div>
    </div>
  );
};

export default SignUp;
