import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import ProductMockUp from "../components/ProductMockUp";
import { VALIDATION_RULES } from "../constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signInApi, userProfileApi } from "../api";
import { setToken, setUser } from "../store/authSlice";
import { setKeyToLocalStorage } from "../api/LocalStorage";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
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
      const data = await signInApi(form);
      console.log("🚀 ~ handleSubmit ~ data:", data);
      if (data.success) {
        dispatch(setToken(data.data.token));
        setKeyToLocalStorage("access_token", data.data.token);
        const profile = await userProfileApi();
        dispatch(setUser(profile.data));
        navigate("/dashboard");
      }
      // const data = await signIn(email, password);
      // console.log("🚀 ~ handleSubmit ~ data:", data);
      // if (data) {
      //   dispatch(setSession(data?.session));
      //   dispatch(setUser(data?.user?.user_metadata));
      //   navigate("/dashboard");
      // }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center px-10 py-5 gap-5">
      <div className="h-full w-1/2 flex flex-col items-center justify-center">
        <div className="w-[80%] px-10 py-6">
          <div className="text-5xl mb-10">
            Login to{" "}
            <span className="font-bold text-indigo-600">Organizer</span>
          </div>
          <div className="flex flex-col gap-y-5">
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
            <a href="#">Forgot Password?</a>
          </div>
          <Button
            // disabled={error["email"] !== null || error["password"] !== null}
            onClick={handleSubmit}
            title="Sign In"
            btnStyle="mt-6"
          />
        </div>
        <div className="text-sm font-medium text-slate-400 hover:underline hover:text-slate-500">
          <a href="/auth/signup">Create a new Organizer account</a>
        </div>
      </div>
      <div className="h-full w-1/2 flex items-center justify-center">
        <ProductMockUp />
      </div>
    </div>
  );
};

export default SignIn;
