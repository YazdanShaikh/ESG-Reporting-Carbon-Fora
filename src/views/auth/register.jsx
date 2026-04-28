import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axiosInstance from "../../configs/axios.config";
import { toast } from "react-toastify";
import { handleError } from "../../utils/functions";
import { clearAuth } from "../../store/slice/auth";
import { Icon } from "@iconify/react";
import Textinput from "@/components/ui/Textinput";
import Logo from "../../assets/images/logo/logo-car.png";
import Shap1 from "../../assets/images/shap/c.png";
import Shap2 from "../../assets/images/shap/ctag.png";
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../configs/firebase.config';


/* ---------------- Schema ---------------- */

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  password: yup.string().required("Password is required"),
  bio: yup.string().required("Bio is required"),
  category: yup.string().required("Category is required"),
  subCategory: yup.string().required("Sub Category is required"),
});

/* ---------------- Mock Categories ---------------- */


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(null);
  const [logo, setLogo] = useState(null);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      bio: "",
      category: "",
      subCategory: "",
    },
  });

 
  useEffect(() => {
    dispatch(clearAuth());
    const getData = async () => {
      try {
        const { data } = await axiosInstance.get("/common", {
          params: { category: true },
        });
        if (!data.error) {
          setCategories(data?.data?.categories || []); // expecting grouped format from backend
        }
      } catch (error) {
        handleError(error);
      }
    };
    getData();
  }, [dispatch]);

  const onSubmit = async (values) => {
    try {
      // Validate logo before proceeding
      if (!logo) {
        toast.warn("Brand Logo is Required");
        return;
      }
      // Construct FormData
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("bio", values.bio);
      formData.append("category", values.category);
      formData.append("subCategory", values.subCategory);
      formData.append("companyLogo", logo);

      // Debug: log FormData entries to confirm what's being sent
      for (const pair of formData.entries()) {
        console.log("formData:", pair[0], pair[1]);
      }

      // Send request — let browser set Content-Type boundary. Skip automatic 401 redirect via config flag.
      const { data } = await axiosInstance.post("/brand/auth/signUp", formData, {
        skipRedirect: true,
      });

      // More robust condition check - ensure data exists, no error, and token exists
      if (data && !data.error && data.token) {
        navigate(`/verify?token=${data.token}`);
      } else {
        toast.error(data?.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-up error response:", error.response ? error.response.data : error);
      handleError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();
      // Send to API for Google register
      const { data } = await axiosInstance.post("/brand/auth/googleSignUp", {
        idToken,
        email: user.email,
        name: user.displayName,
        uid: user.uid,
      });
      if (data && !data.error && data.token) {
        navigate(`/verify?token=${data.token}`);
      } else {
        toast.error(data?.message || "Google registration failed. Please try again.");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4639AA] via-[#5a4fd6] to-[#1893A1] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-50">

        {/* LEFT */}
        <div className="hidden lg:flex flex-col text-white space-y-6">
          <img src={Logo} alt="The CM Stack" className="h-8 w-fit" />
          <h1 className="text-5xl font-bold leading-tight text-white">
            Build your ESG future with
            <span className="text-[#cfc9ff]"> CarbonFora</span> </h1>
          <p className="text-white/80 text-lg">
            Join founders & leaders using CarbonFora to measure, manage, and improve ESG performance. </p>
          <div className="flex items-center gap-3">
            <Icon icon="ion:rocket-outline" className="text-2xl" />
            <span className="text-white/80"> I’ll guide you step-by-step </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white/15 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">
          <div className="h-[80vh] overflow-y-auto scroll-hide rounded">
            <h2 className="text-2xl font-bold text-white mb-6">
              Create your account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              <Textinput
                name="name"
                label="Brand Name"
                placeholder="Enter Your Brand Name"
                register={register}
                error={errors.name}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <Textinput
                  name="email"
                  label="Email"
                  placeholder="Enter Your Email"
                  type="email"
                  register={register}
                  error={errors.email}
                />
                <Textinput name="phone" placeholder="Enter Your Phone Number" label="Phone" register={register} error={errors.phone} />
              </div>

              <Textinput
                name="password"
                label="Password"
                placeholder="Enter Your Password"
                type="password"
                register={register}
                error={errors.password}
                 hasicon
              />

              {/* Bio */}
              <div>
                <label className="text-white text-sm">Short Brand Bio</label>
                <textarea
                  {...register("bio")}
                  rows="3"
                  placeholder="Add a description"
                  className="w-full mt-1 rounded-lg p-3 bg-white outline-none "
                />
                <p className="text-red-400 text-sm">{errors.bio?.message}</p>
              </div>

              {/* Categories */}
              <div>
                <label className="text-white">Category</label>
                <div className="flex gap-2 flex-wrap mt-2">
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat);
                        setValue("category", cat._id);
                        setValue("subCategory", "");
                      }}
                      className={`px-4 py-2 rounded-full text-sm ${activeCategory?._id === cat._id
                        ? "bg-white text-[#4639AA]"
                        : "bg-white/10 text-white"
                        }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              {activeCategory && (
                <div>
                  <label className="text-white">Subcategory</label>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {activeCategory.subcategories.map((sub) => (
                      <button
                        key={sub._id}
                        type="button"
                        onClick={() => setValue("subCategory", sub._id)}
                        className={`px-4 py-2 rounded-full text-sm ${watch("subCategory") === sub._id
                          ? "bg-white text-[#4639AA]"
                          : "bg-white/10 text-white"
                          }`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Logo Upload */}
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Company Logo <span className="text-red-300">*</span>
                </label>

                <label className="relative flex flex-col items-center justify-center w-full h-24 rounded-xl
                  border-2 border-dashed border-white/30
                  bg-white/10 backdrop-blur
                  cursor-pointer hover:bg-white/20 transition group">

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setLogo(e.target.files[0])}
                  />

                  {/* Icon */}
                  <div className="flex items-center justify-center 
                      text-white/30 ">
                    <Icon icon="mdi:cloud-upload-outline" className="text-4xl" />
                  </div>

                  {/* Text */}
                  <p className="text-sm text-white/70 font-medium">
                    Click to upload logo
                  </p>

                </label>

                {/* Selected file name */}
                {logo && (
                  <p className="text-xs text-white/80 mt-2 truncate">
                    Selected file: <span className="font-medium">{logo.name}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-white text-[#4639AA] rounded-lg font-semibold flex items-center justify-center gap-2"
              ><div className="flex items-center justify-center gap-2 text-transparent bg-clip-text bg-gradient-to-br from-[#4834AA] to-[#1893A1]">
                {isSubmitting ? (
                  <>
                    <Icon icon="eos-icons:loading" className="animate-spin text-[#4639AA]" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account →"
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

              <p className="text-center text-white/70 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline font-semibold">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute -bottom-40 -right-60 z-10">
        <img src={Shap1} alt="Shape" className="h-full w-[500px] opacity-5" />
      </div>
      <div className="absolute -top-40 -left-60 z-10 ">
        <img src={Shap1} alt="Shape" className="h-full w-[500px] opacity-5" />
      </div>
      <div className="absolute top-1/4 -left-60 z-10">
        <img src={Shap2} alt="Shape" className="h-full w-full opacity-50" />
      </div>
    </div>
  );
};

export default Register;
