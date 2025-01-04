"use client";

import AppLoader from "@/components/AppLoader";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useGlobally } from "@/context/protected.context";
import SignInDTO from "@/dtos/SignInDTO";
import { useUserLoginMutation } from "@/redux/features/auth/auth.api";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { login, handleLoadingFalse, handleLoadingTrue, loading, redirectFun } =
    useGlobally();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [userLogin] = useUserLoginMutation();

  const onSubmit = async (data: any) => {
    handleLoadingTrue?.();
    try {
      const signInData = SignInDTO.fromJSON(data);
      if (signInData) {
        const response = await userLogin({
          email: signInData.email,
          password: signInData.password,
        }).unwrap();
        login && login([`${response.body.role}`]);
        redirectFun?.(`/${response.body.role}`);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      handleLoadingFalse?.();
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-black to-transparent">
      <div className="w-full h-screen bg-custom-image bg-cover bg-center flex lg:justify-end justify-center items-center lg:pr-8">
        {/* Loader */}
        {loading && <AppLoader />}
        <div className="w-[450px] h-[450px] bg-[#ece8e8] rounded-xl relative">
          {/* TITLE */}
          <div className="w-full h-[100px] flex justify-center items-center">
            <Image src={"/applogon.svg"} alt="Logo" width={150} height={150} />
          </div>
          {/* Input Container */}
          <form className="p-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mt-5">
              <InputField
                id={"email"}
                label={"Email"}
                type={"text"}
                register={register}
                error={errors.email}
                required={true}
              />
            </div>
            <div className="w-full mt-5">
              <InputField
                id={"password"}
                label={"Password"}
                type={"password"}
                register={register}
                error={errors.password}
                required={true}
              />
            </div>
            <div className="p-4 absolute bottom-0 left-0 right-0">
              <Button loading={loading} text={"Sign In"} type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
