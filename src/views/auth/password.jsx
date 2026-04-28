import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Textinput from "@/components/ui/Textinput";
import { handleError } from "../../utils/functions";
import SubmitButton from "../../components/ui/SubmitButton";
import { Icon } from "@iconify/react";
import Logo from "../../assets/images/logo/logo-car.png";
import Shap1 from "../../assets/images/shap/c.png";
import axiosInstance from "../../configs/axios.config";
import { toast } from "react-toastify";

const schema = yup.object({
  password: yup.string().required("New password is Required"),
  cpassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});
const Password = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = async (values) => {
    try {
      // Send request
      const { data } = await axiosInstance.post("/brand/auth/reset-password", values);
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#4639AA] via-[#5a4fd6] to-[#1893A1] overflow-hidden relative flex items-center justify-center px-6">
        <div className=" bg-white/15 backdrop-blur-2xl min-w-full md:min-w-[500px] px-6 py-8 rounded-3xl shadow-2xl relative z-50">
          <div className="flex justify-center items-center gap-2 mb-6">
                    <img src={Logo} alt="The CM Stack" className="h-8 w-fit mx-auto" />
        </div>
          <h2 className="text-xl font-semibold text-white flex items-start justify-start gap-2">
            Create Password
          </h2>
          <p className="text-white/80 text-sm mb-6 ">Enter new password to access your Account</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <Textinput
              placeholder="Enter Your Password"
              label="New Password"
              type="password"
              name={"password"}
              register={register}
              error={errors.password}
              hasicon
              isRequired
            />
            <Textinput
              placeholder="Confirm Your Password"
              label="Confirm Passoword"
              type="password"
              name={"cpassword"}
              register={register}
              error={errors.cpassword}
              hasicon
              isRequired
            />
            <div className="flex justify-between">
              <Link to="/login" className="text-sm text-slate-100  leading-6 font-medium">
                Back To Login?{" "}
              </Link>
            </div>

            <div className="flex flex-col">
              <button 
                className="w-full mt-3 py-2 rounded-lg bg-white text-[#4639AA] font-semibold text-lg hover:scale-[1.02] transition " 
                disabled={isSubmitting}
              ><div className="flex items-center justify-center gap-2 text-transparent bg-clip-text bg-gradient-to-br from-[#4834AA] to-[#1893A1]">
                {isSubmitting ? (
                  <>
                    <Icon icon="eos-icons:loading" className="animate-spin text-[#4639AA]" />
                    Updating...
                  </>
                ) : (
                  "Update Password →"
                )}</div>
              </button>
            </div>
          </form>
        </div>
        <div className="absolute -bottom-40 -right-60 z-10">
                <img src={Shap1} alt="Shape" className="h-full w-[500px] opacity-10" />
              </div>
              <div className="absolute -top-40 -left-60 z-10">
                <img src={Shap1} alt="Shape" className="h-full w-[500px] opacity-10" />
              </div>
      </div>
    </>
  );
};

export default Password;
