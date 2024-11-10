"use client";

import AppLoader from "@/components/AppLoader";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useGlobally } from "@/context/protected.context";
import SignInDTO from "@/dtos/SignInDTO";
import { RoleTitle } from "@/enums/RoleTitle";
import Image from "next/image";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { login, handleLoadingFalse, handleLoadingTrue, loading, redirectFun } =
    useGlobally();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    handleLoadingTrue && handleLoadingTrue();
    // Simulate an API call
    setTimeout(() => {
      const signInData = SignInDTO.fromJSON(data);
      console.log("Submitted data:", signInData);
      if (login) {
        login([`${RoleTitle.ADMIN}`]);
      }
      handleLoadingFalse && handleLoadingFalse();
      redirectFun && redirectFun(`/${RoleTitle.ADMIN}`);
    }, 2000);
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
            <div className="w-full">
              <InputField
                id={"username"}
                label={"UserName"}
                type={"text"}
                register={register}
                error={errors.username}
                required={true}
              />
            </div>
            <div className="w-full">
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
