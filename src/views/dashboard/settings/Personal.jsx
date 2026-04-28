import Textinput from "../../../components/ui/Textinput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// import { updateUserDetails } from "../../../utils/firebase/auth";
import SubmitButton from "../../../components/ui/SubmitButton";
import { handleError } from "../../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../configs/axios.config";
import { setUser } from "../../../store/slice/auth";

const schema = yup.object({
  firstName: yup.string().required("First Name is Required").optional(),
  lastName: yup.string().required("Last Name is Required").optional(),
  email: yup.string().required("Email is Required").optional(),
  phone: yup.string().required("Phone is Required").optional(),
});
const Personal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  useEffect(() => {
    const { firstName, lastName, phone, email } = user;
    reset({ firstName, lastName, phone, email });
  }, []);

  const onSubmit = async (values) => {
    try {
      const { data } = await axiosInstance.post("/user/profile", values);
      if (!data.error) {
        const { data: res } = await axiosInstance.get("/user/profile");
        dispatch(setUser({ user: res?.user }));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-2 md:p-4 ">
        <div className="input-area">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="input-item mb-3 md:mb-5 flex-1 ">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-danger-500 ml-1">*</span>
              </label>
              <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-md focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
              placeholder="Enter Your First Name" register={register} error={errors.firstName} isRequired
              />
              
            </div>
            <div className="input-item mb-3 md:mb-5 flex-1 ">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-danger-500 ml-1">*</span>
              </label>
              <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-md focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
              placeholder="Enter Your Last Name" register={register} error={errors.lastName} isRequired
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <div className="input-item mb-3 md:mb-5 flex-1 ">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-danger-500 ml-1">*</span>
              </label>
              <input
              type="email" name={"email"}
              className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-md focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
              placeholder="Enter Your Email" register={register} error={errors.email} isRequired
              />
            </div>
            <div className="input-item mb-3 md:mb-5 flex-1 ">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-danger-500 ml-1">*</span>
              </label>
              <input
              type="number" name={"phone"}
              className="w-full px-4 py-2.5 border border-gray-300 outline-none rounded-md focus:ring-1 focus:ring-[#4639AA]/50 focus:border-[#4639AA]"
              placeholder="Enter Your Phone" register={register} error={errors.phone} isRequired
              />
              
            </div>
          </div>
          <div className="signin-area mb-3.5">
            <div className="flex justify-end">
              <SubmitButton isSubmitting={isSubmitting} >
                Update
              </SubmitButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Personal;
