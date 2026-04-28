import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import React, { useState } from "react";
import { handleError } from "../../utils/functions";
import axiosInstance from "../../configs/axios.config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slice/auth";
import { Icon } from "@iconify/react";
import OTPInput from "react-otp-input";
import Logo from "../../assets/images/logo/logo-car.png";
import Shap1 from "../../assets/images/shap/c.png";

function Register() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { state } = useLocation();
  console.log(state?.forgot);

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = searchParams.get("token");

  // Social Media Input Watcher

  const onSubmit = async (e) => {
    e.preventDefault();

    // Manual validation
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      // Send request
      const { data } = await axiosInstance.post("/brand/auth/verified", { otp }, {
        headers: {
          Authorization: token,
        },
      });

      if (data.success) {
        dispatch(setAuth({ token: data.token, user: data.brand }));
        navigate(state?.forgot ? `/update-password?token=${token}` : `/boarding`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const [otp, setOtp] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4639AA] via-[#5a4fd6] to-[#1893A1] overflow-hidden relative flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/15 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 md:p-12 relative z-50">

        {/* Logo */}
        <div className="flex justify-start mb-6">
          <img src={Logo} alt="The CM Stack" className="h-8" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Verify your account
        </h2>

        <p className="text-white/70 mb-8">
          Enter the 6-digit code sent to your email
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={onSubmit}>
          {/* Name */}
          <div className="flex justify-start">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputType="tel"
              renderSeparator={<span className="w-2 lg:w-3" />}
              renderInput={(props) => <input {...props} />}
              inputStyle="form-control dark:bg-gray !w-[2em] sm:!w-[2.5em] md:!w-[2.6em] !h-[2em] sm:!h-[2.5em] md:h-12 p-0 text-lg dark:text-secondary-500 rounded-md"

            />
          </div>


          {/* Resend */}
          <div className=" text-sm text-white/70 hover:underline cursor-pointer">
            Resend OTP
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-lg w-full text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Icon icon="eos-icons:loading" className="animate-spin" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#4834AA] to-[#1893A1]">
                    Verifying...
                  </span>
                </>
              ) : (
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#4834AA] to-[#1893A1]">
                  Continue →
                </span>
              )}
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
  );
}

export default Register;
