import Textinput from "../../../components/ui/Textinput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { handleError } from "../../../utils/functions";
import { toast } from "react-toastify";
import SubmitButton from "../../../components/ui/SubmitButton";
import axiosInstance from "../../../configs/axios.config";

const schema = yup.object({
  password: yup.string().required("Current password is Required"),
  newPassword: yup.string().required("New password is Required"),
  cpassword: yup.string().oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});
const Password = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const onSubmit = async (values) => {
    try {
      const { data } = await axiosInstance.post("/user/profile/change-password", values);
      if (!data.error) {
        toast.success(data.message);
        reset()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-2 md:p-4 ">
      <div className="input-area">
        <div className="input-item mb-3 md:mb-5 flex-1 ">
          <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password <span className="text-danger-500 ml-1">*</span>
              </label>
              <input
              type="password" name={"password"}  hasicon
              className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-md focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
              placeholder="Enter Your Current Password" register={register} error={errors.password} isRequired
              />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="input-item mb-3 md:mb-5 flex-1 ">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password <span className="text-danger-500 ml-1">*</span>
              </label>
              <input
              type="password" name={"newPassword"}  hasicon
              className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-md focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
              placeholder="Enter Your Password" register={register} error={errors.newPassword} isRequired
              />
            
          </div>
          <div className="input-item mb-3 md:mb-5 flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Passoword <span className="text-danger-500 ml-1">*</span>
              </label>
              <input
              type="password" name={"cpassword"}  hasicon
              className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-md focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
              placeholder="Confirm Your Password" register={register} error={errors.cpassword} isRequired
              />
            
          </div>
        </div>

        <div className="signin-area mb-3.5">
          <div className="flex justify-end">
            <SubmitButton isSubmitting={isSubmitting} >Update</SubmitButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Password;
