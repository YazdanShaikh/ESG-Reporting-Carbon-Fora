import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Textinput from "@/components/ui/Textinput";
import axiosInstance from "../../configs/axios.config";
import { handleError } from "../../utils/functions";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import Logo from "../../assets/images/logo/logo-car.png";
import Shap1 from "../../assets/images/shap/c.png";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is Required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (values) => {
    try {
      // Send request
      const { data } = await axiosInstance.post("/brand/auth/forgot-password", values);
      if (data.success) {
        navigate(`/verify?token=${data?.token}`, { state: { forgot: true } });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4639AA] via-[#5a4fd6] to-[#1893A1] overflow-hidden relative flex items-center justify-center px-6">
      <div className="w-full  items-center space-y-8 relative z-50">

        {/* LEFT – BRAND */}
        <div className="hidden md:flex flex-col justify-center text-center text-white space-y-3 ">
          <img src={Logo} alt="The CM Stack" className="h-8 w-fit mx-auto" />


          <p className="text-white/80 text-lg">
            We’ll send you a secure recovery link to get back on track.
          </p>

          <div className="flex justify-center items-center gap-3">
            <Icon icon="mdi:lock-reset" className="text-2xl" />
            <span className="text-white/80">
              Safe, fast, and secure recovery
            </span>
          </div>
        </div>

        {/* RIGHT – FORM CARD */}
        <div className="bg-white/15 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg mx-auto">

          {/* Mobile Logo */}
          <div className="flex justify-center mb-6 md:hidden">
            <img src={Logo} alt="The CM Stack" className="h-8" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            Forgot your password?
          </h2>

          <p className="text-white/70 mb-6">
            Enter your email and we’ll send you a recovery code.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="">

            <Textinput
              name="email"
              label="Work Email"
              placeholder="Enter Your Work Email"
              type="email"
              register={register}
              error={errors.email}
             
            />

            {/* CTA */}
            <button
              disabled={isSubmitting}
              className="w-full mt-6 py-2 rounded-lg bg-white text-[#4639AA] font-semibold text-lg hover:scale-[1.02] transition flex items-center justify-center gap-2"
            ><div className="flex items-center justify-center gap-2 text-transparent bg-clip-text bg-gradient-to-br from-[#4834AA] to-[#1893A1]">
              {isSubmitting ? (
                <>
                  <Icon icon="eos-icons:loading" className="animate-spin text-[#4639AA]" />
                  Sending...
                </>
              ) : (
                "Send Recovery Code →"
              )}
              </div>
            </button>

            <p className="text-center text-sm text-white/70 mt-4">
              Remember your password?{" "}
              <Link to="/login" className="font-semibold underline">
                Back to Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
       <div className="absolute -bottom-40 -right-60 z-10">
        <img src={Shap1} alt="Shape" className="h-full w-[500px] opacity-10" />
      </div>
      <div className="absolute -top-40 -left-60 z-10">
        <img src={Shap1} alt="Shape" className="h-full w-[500px] opacity-10" />
      </div>
    </div>
  );
};

export default ForgotPassword;
