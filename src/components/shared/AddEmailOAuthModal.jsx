import PropTypes from "prop-types";
import Modal from "../ui/Modal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Textinput from "../ui/Textinput";
import SubmitButton from "../ui/SubmitButton";
import { handleError } from "../../utils/functions";
import axiosInstance from "../../configs/axios.config";
import { toast } from "react-toastify";

const schema = yup
  .object({
    firstName: yup.string().required("First Name is Required"),
    lastName: yup.string().required("Last Name is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    appPassword: yup.string().required("App Password is Required"),
    provider: yup.string().default("GMAIL"),
  })
  .required();

const AddEmailOAuthModal = ({ handleClose, active }) => {
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
      const { data } = await axiosInstance.post("/user/email", values);
      if (!data.error) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      handleClose();
    }
  };

  return (
    <Modal
      title="Message"
      label=""
      labelClass="btn-outline-dark"
      activeModal={active}
      onClose={handleClose}
      themeClass="bg-blue-500"
      centered={true}
      noFade={false}
    >
      <div class="bg-card text-card-foreground flex flex-col w-full ">
        <div class="flex flex-col space-y-1.5 p-0 undefined"></div>
        <div class="pt-0 undefined">
          <div class="flex flex-col gap-5">
            <div class="flex w-full">
              <div class="flex w-full flex-col gap-5">
                <div class="flex gap-1">
                  <p class="text-base font-semibold font-sans">Google OAuth (one click login)</p>
                </div>
                <div class="flex flex-col gap-5 text-sm">
                  <p>These instructions just need to be followed once for your Google Workspace admin.</p>
                </div>
                <div data-orientation="horizontal" role="none" class="shrink-0 bg-border h-[1px] w-full"></div>
                <div class="flex-col text-sm">
                  <ul class="list-decimal space-y-5 ml-5">
                    <li>
                      Go to your{" "}
                      <strong class="text-primary border-primary">
                        <a href="https://admin.google.com/u/1/ac/owl/list?tab=configuredApps" target="_blank">
                          Google Admin Console
                        </a>
                      </strong>
                    </li>
                    <li>
                      Click <strong>”Add App”</strong> and then select <strong>“OAuth App Name or Client ID”</strong>
                    </li>
                    <div>
                      <li>Use following client Id to search for ReachInbox:</li>
                      <div class="flex w-full gap-2 border rounded-lg mt-2 justify-between items-center p-2 px-4">
                        <p class="text-[10px] bg-card rounded break-words">
                          549360251880-maeh4okn7btu9cjtf0l2bt1t5b22sbf8.apps.googleusercontent.com
                        </p>
                        <div class="cursor-pointer">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <li>Select and approve ReachInbox to access your Google Workspace</li>
                  </ul>
                </div>
                <div class="flex w-full items-center justify-center gap-3 text-primary font-semibold my-2">
                  <a
                    class="border-primary flex gap-2"
                    target="_blank"
                    href="https://www.youtube.com/watch?v=zw7NxOu9YFM"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 256 256"
                      class="text-2xl"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M168,224a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,224ZM232,64V176a24,24,0,0,1-24,24H48a24,24,0,0,1-24-24V64A24,24,0,0,1,48,40H208A24,24,0,0,1,232,64Zm-68,56a8,8,0,0,0-3.41-6.55l-40-28A8,8,0,0,0,108,92v56a8,8,0,0,0,12.59,6.55l40-28A8,8,0,0,0,164,120Z"></path>
                    </svg>
                    See Tutorial Video
                  </a>
                </div>
                <div class="flex w-full justify-end gap-5 mt-5">
                  <SubmitButton onClick={handleClose}>
                    <div className="flex items-center gap-2">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 48 48"
                        enable-background="new 0 0 48 48"
                        class="mr-2 text-lg"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                        <path
                          fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        ></path>
                        <path
                          fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        ></path>
                        <path
                          fill="#1976D2"
                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                      </svg>{" "}
                      Login with google
                    </div>
                  </SubmitButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddEmailOAuthModal;
AddEmailOAuthModal.propTypes = {
  active: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
