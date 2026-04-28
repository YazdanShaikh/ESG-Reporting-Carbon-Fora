import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Textinput from "@/components/ui/Textinput";
import axiosInstance from "../../configs/axios.config";
import { handleError } from "../../utils/functions";
import { setAuth } from "../../store/slice/auth";
import { Icon } from "@iconify/react";
import Val from "../../assets/images/all-img/val.png";
import Logo from "../../assets/images/logo/logo-car.png";
import Shap2 from "../../assets/images/shap/ctag.png";
import Shap1 from "../../assets/images/shap/c.png";
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../configs/firebase.config';
import { toast } from "react-toastify";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const dispatch = useDispatch();
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
      const { data } = await axiosInstance.post("/brand/auth/signIn", values);
      if (data.success) {
        navigate(data.verified ? "/dashboard" : `/verify?token=${data?.token}`);
        if (data.verified) dispatch(setAuth({ token: data?.token, user: data.brand }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      // Send to API
      const { data } = await axiosInstance.post("/brand/auth/googleSignIn", {
        idToken,
        email: user.email,
        name: user.displayName,
        uid: user.uid,
      });
      if (data.success) {
        navigate(data.verified ? "/dashboard" : `/verify?token=${data?.token}`);
        if (data.verified) dispatch(setAuth({ token: data?.token, user: data.brand }));
      } else {
        console.error("API Error Response:", data);
        toast.error(data.message || "Failed to authenticate with backend");
      }
    } catch (error) {
      console.error("Google Sign In Error:", error);
      if (error.code === 'auth/popup-closed-by-user') {
        toast.info("Sign in cancelled");
      } else if (error.code === 'auth/unauthorized-domain') {
        toast.error("Domain not authorized in Firebase Console");
      } else {
        handleError(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4639AA] via-[#5a4fd6] to-[#1893A1] overflow-hidden relative flex items-center justify-center px-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-50">

        {/* LEFT – BRAND */}
        <div className="hidden md:flex flex-col text-white space-y-4">
          <img src={Logo} alt="The CM Stack" className="h-8 w-fit" />

          <h1 className="text-5xl font-bold leading-tight text-white">
            Welcome back to <span className="text-[#cfc9ff]">CarbonFora</span>
          </h1>

          <p className="text-white/80 text-lg">
            Continue your ESG journey and manage growth with confidence.
          </p>

          <div className="flex items-center gap-3">
            <Icon icon="ion:rocket-outline" className="text-2xl" />
            <span className="text-white/80">
              Let’s pick up where you left off
            </span>
          </div>
        </div>

        {/* RIGHT – LOGIN CARD */}
        <div className="bg-white/15 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 md:p-10">

          <div className="flex justify-center mb-6 md:hidden">
            <img src={Logo} alt="The CM Stack" className="h-8" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">
            Sign in to your account
          </h2>

          <p className="text-white/70 mb-6">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <Textinput
              name="email"
              label="Email"
              placeholder="Enter Your Work Email"
              type="email"
              register={register}
              error={errors.email}
            />

            <Textinput
              name="password"
              label="Password"
              placeholder="Enter Your Password"
              type="password"
              register={register}
              error={errors.password}
              hasicon

            />

            <div className="flex items-center justify-between text-sm text-white/70">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-white" />
                Keep me signed in
              </label>
              <Link to="/forgot-password" className="underline">
                Forgot password?
              </Link>
            </div>

            {/* CTA */}
            <button
              disabled={isSubmitting}
              className="w-full mt-4 py-2 rounded-lg bg-white text-[#4639AA] font-semibold text-lg hover:scale-[1.02] transition "
            ><div className="flex items-center justify-center gap-2 text-transparent bg-clip-text bg-gradient-to-br from-[#4834AA] to-[#1893A1]">
                {isSubmitting ? (
                  <>
                    <Icon icon="eos-icons:loading" className="animate-spin text-[#4639AA]" />
                    Signing In...
                  </>
                ) : (
                  "Sign In →"
                )}
              </div>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/30" />
              <span className="text-xs text-white/60">OR</span>
              <div className="flex-1 h-px bg-white/30" />
            </div>

            {/* Social Login */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full mt-2 py-2 rounded-lg bg-white text-2xl flex items-center justify-center"
              >
                <Icon icon="logos:google-icon" />
              </button>
            </div>

            <p className="text-center text-sm text-white mt-4">
              <span className="text-white/70">Don’t have an account?{" "}</span>
              <Link to="/register" className="font-semibold underline">
                Create one
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
      <div className="absolute top-1/4 -left-60 z-10">
        <img src={Shap2} alt="Shape" className="h-full w-full opacity-50" />
      </div>
    </div>
  );
};

export default Login;
