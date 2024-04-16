import React, { useEffect, useState } from "react";
import Image from "next/image";
import ButtonDefault from "@/lib/common/button/ButtonDefault";
import PopupDefault from "@/lib/common/popup/PopupWelcome";
import Form from "@/lib/common/form";
import Input from "../../input";
import { verifyLogin } from "@/api/auth";
import { getListQuizz } from "@/api/quizz";
import { useForm } from "react-hook-form";
import { User } from "@/lib/modal/user";
// import WelcomeImage from "/images/welcome-popup/welcome-1.png";

interface PropSubmit {
  email: string;
  password: string;
}

interface PropData {
  accessToken: string;
  userFilter: User;
}

const Login = () => {
  const [data, setData] = useState<PropData>();

  const handleSubmitForm = async (
    data: PropSubmit,
    setError: any,
    reset: any
  ) => {
    try {
      const result = await verifyLogin(data);
      setData(result);
    } catch (error: any) {
      if (error?.response?.data) {
        setError("errorSubmit", {
          type: "manual",
          message: `${error?.response?.data}`,
        });
        setTimeout(() => {
          reset();
        }, 1500);
      }
    }
  };

  return (
    <PopupDefault>
      <h3 className="text-[30px] font-bold">Hello there 👋</h3>
      <Form
        classForm="space-y-4 md:space-y-6 mt-6"
        onSubmitForm={handleSubmitForm}
      >
        {(props: any) => (
          <>
            {/* Email */}
            <div className="relative">
              <Input
                label="Email"
                name="email"
                type="text"
                register={props.registers}
                errors={props.error}
                placeholder="name@company.com"
                errorsOption={{
                  required: { value: true, message: "Email is empty" },
                  maxLength: {
                    value: 50,
                    message: "Email cannot exceed 50 characters",
                  },
                  minLength: {
                    value: 5,
                    message: "Email must not be less than 6 characters",
                  },
                }}
                classLabel="absolute text-sm pl-4 pt-1 text-[#c9c7d3] top-0"
                classInput="bg-[#f6f5fa] w-full px-4 pb-4 pt-6 rounded-[13px]"
              />
            </div>
            {/* Password */}
            <div className="relative">
              <Input
                label="Password"
                name="password"
                type="password"
                register={props.registers}
                errors={props.error}
                placeholder="••••••••"
                errorsOption={{
                  required: { value: true, message: "Password is empty" },
                  maxLength: {
                    value: 50,
                    message: "Password cannot exceed 50 characters",
                  },
                  minLength: {
                    value: 5,
                    message: "Password must not be less than 6 characters",
                  },
                }}
                classLabel="absolute text-sm pl-4 pt-1 text-[#c9c7d3] top-0"
                classInput="bg-[#f6f5fa] w-full px-4 pb-4 pt-6 rounded-[13px]"
              />
            </div>
            <div className="flex items-center justify-between mx-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-5 h-5 border border-gray-300 rounded bg-gray-50"
                  />
                </div>
                <div className="ml-3 text-sm font-medium">
                  <label htmlFor="remember" className="text-black ">
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-[#66a6ef] hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a>
            </div>
            <ButtonDefault
              className={`w-full p-5 rounded-full text-white border-b-[5px] border-r-[4px] font-medium text-base hover:font-medium ease-in-out duration-300 ${
                data?.accessToken != undefined
                  ? "bg-[#3ed684] p-5"
                  : props?.error?.errorSubmit?.message
                  ? `bg-red-600 p-5 border-red-800`
                  : `bg-[#000000] p-5 border-[#6d5ff6]`
              }`}
              content={
                data?.accessToken != undefined
                  ? "Successfully !"
                  : props?.error?.errorSubmit?.message
                  ? `${props?.error?.errorSubmit?.message}`
                  : "Sign in"
              }
              // onClick={}
            />
          </>
        )}
      </Form>
    </PopupDefault>
  );
};
export default Login;