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

const AddEmailAppPasswordModal = ({ handleClose, active }) => {
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
      <div class="bg-card text-card-foreground flex flex-col w-full">
        <div class="flex flex-col space-y-1.5 p-0 undefined"></div>
        <div class="pt-0 undefined">
          <div class="flex flex-col gap-5">
            <div class="flex w-full">
              <div class="flex w-full flex-col gap-5">
                <div class="flex gap-1">
                  <p class="text-base font-semibold font-sans">Google app password</p>
                </div>
                <div class="flex flex-col gap-5 text-sm">
                  <p>We require you to create an APP Password on Google so we can securely access your inbox.</p>
                </div>
                <div class="shrink-0 bg-border h-[1px] w-full"></div>
                <div class="flex flex-col text-sm">
                  <ul class="list-decimal space-y-5 ml-5">
                    <li>
                      Go to your Google Account’s{" "}
                      <strong class="text-primary border-primary">
                        <a href="https://myaccount.google.com/security" target="_blank">
                          Security Settings
                        </a>
                      </strong>
                    </li>
                    <li>Ensure IMAP is enabled in Gmail settings</li>
                    <li>
                      Enable{" "}
                      <strong class="text-primary  border-primary">
                        <a href="https://myaccount.google.com/signinoptions/two-step-verification" target="_blank">
                          2 step verification
                        </a>
                      </strong>
                    </li>
                    <div>
                      <li>
                        Generate an{" "}
                        <strong class="text-primary border-primary">
                          <a href="https://myaccount.google.com/apppasswords" target="_blank">
                            App password
                          </a>
                        </strong>{" "}
                        through Google's security settings
                      </li>
                    </div>
                  </ul>
                </div>
                <div class="flex w-full justify-center items-center text-primary font-semibold my-2">
                  <a class="border-primary flex gap-2" target="_blank">
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
                <div>
                  <form class="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <div class="grid grid-cols-2 gap-2">
                      <Textinput
                        name="firstName"
                        label="First Name"
                        placeholder="Enter Your First Name"
                        type="text"
                        register={register}
                        error={errors.firstName}
                        className="h-[48px]"
                        onChange={(e) => setValue("firstName", e.target.value)}
                      />
                      <Textinput
                        name="lastName"
                        label="Last Name"
                        placeholder="Enter Your Last Name"
                        type="text"
                        register={register}
                        error={errors.lastName}
                        className="h-[48px]"
                        onChange={(e) => setValue("lastName", e.target.value)}
                      />
                    </div>
                    <Textinput
                      name="email"
                      label="Email"
                      placeholder="Enter Your Email"
                      type="email"
                      register={register}
                      error={errors.email}
                      className="h-[48px]"
                      onChange={(e) => setValue("email", e.target.value)}
                    />
                    <Textinput
                      name="appPassword"
                      label="Password"
                      type={"password"}
                      placeholder="Enter Your Password"
                      register={register}
                      error={errors.appPassword}
                      hasicon={true}
                      className="h-[48px]"
                      onChange={(e) => setValue("appPassword", e.target.value)}
                    />
                    <div class="flex w-full justify-end gap-5 mt-5">
                      <SubmitButton isSubmitting={isSubmitting}>Connect</SubmitButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddEmailAppPasswordModal;
AddEmailAppPasswordModal.propTypes = {
  active: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
