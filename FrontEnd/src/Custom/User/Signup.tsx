import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import api from "../../axiosConfig";
import useStore from "../../store";
function Signup() {
  const nav = useNavigate();
  const [userData, setUserData] = useState({});
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    acceptTerms: false,
    avatar: null,
  };
  const [visibility, setVisibility] = useState(true);
  const [errMessage, setErrorMessage] = useState("");
  interface InitialValues {
    fname: string;
    lname: string;
    email: string;
    password: string;
    acceptTerms: boolean;
    avatar: any;
  }
  const handleChange = () => {};
  function register(values: InitialValues) {
    const formData = new FormData();
    formData.set("fname", values.fname);
    formData.set("lname", values.lname);
    formData.set("password", values.password);
    formData.set("email", values.email);
    formData.set("avatar", values.avatar);
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    api
      .post("api/v1/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        const userData = result.data.data.user;
        const user = result.data.data.user;
        login(
          user.email,
          "dummy token",
          user.fname + " " + user.lname,
          user.avatar
        );
        nav("/chat");
        setUserData(userData);
        nav("/chat");
      })
      .catch((err) => {
        console.log(err);
        // setErrorMessage(err.response.data);
      });
  }
  const SignupSchema = Yup.object().shape({
    fname: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("First Name is required"),
    lname: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const { login } = useStore();
  return (
    <div className="min-w-full flex justify-center flex-wrap items-center w-full py-10 max-w-full bg-black text-white">
      <div className="bg-[#363638] w-1/3 p-10 rounded">
        <p className="text-3xl text-center ">Create An Account</p>
        <p className="text-sm  text-center py-3">
          Already have an account?
          <NavLink to="/login" className="text-purple-500 underline">
            &nbsp;Log in
          </NavLink>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            register(values);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="max-w-md w-full flex flex-wrap justify-between mx-auto p-4  shadow-md rounded ">
              <div className="mb-4 w-[48%]">
                <Field
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  className="mt-1 p-2 bg-[#363638] w-full border focus:bg-[#363638] border-purple-400 outline outline-purple-950 rounded"
                />
                <ErrorMessage
                  name="fname"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4 w-[48%] ">
                <Field
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  className="mt-1 p-2 bg-[#363638] w-full border focus:bg-[#363638] border-purple-400 outline outline-purple-950 rounded"
                />
                <ErrorMessage
                  name="lname"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4 w-full">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="mt-1 p-2 bg-[#363638] w-full border focus:bg-[#363638] border-purple-400 outline outline-purple-950 rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4 w-full">
                <Field
                  type={visibility ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="mt-1 p-2 bg-[#363638] w-full border focus:bg-[#363638] border-purple-400 outline outline-purple-950 rounded"
                />
                {visibility && (
                  <VisibilityIcon
                    onClick={() => setVisibility(false)}
                    className="text-purple-950 cursor-pointer absolute -translate-x-8 translate-y-3"
                  />
                )}
                {!visibility && (
                  <VisibilityOffIcon
                    onClick={() => setVisibility(true)}
                    className="text-purple-950 cursor-pointer absolute -translate-x-8 translate-y-3"
                  />
                )}
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="avatar-input"
                  className="cursor-pointer text-center bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-500 w-full"
                >
                  Add Avatar
                </label>
                <input
                  id="avatar-input"
                  type="file"
                  name="avatar"
                  onChange={(e) => {
                    setFieldValue("avatar", e.target.files![0]);
                  }}
                  className="hidden mt-1 p-2 bg-[#363638] w-full border focus:bg-[#363638] border-purple-400 outline outline-purple-950 rounded"
                  accept="image/*"
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <Field
                    type="checkbox"
                    name="acceptTerms"
                    className="mr-2 text-white"
                  />
                  I accept the{" "}
                  <NavLink to="/termsnconditions">
                    &nbsp; terms and conditions
                  </NavLink>
                </label>
                <ErrorMessage
                  name="acceptTerms"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {errMessage && (
                <p className="text-red-500 text-sm">{errMessage}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-500 w-full"
              >
                Create Account
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex w-full items-center justify-center my-5">
          <div className="mx-auto w-1/3">
            <hr />
          </div>
          <div>or register with</div>
          <div className="mx-auto w-1/3">
            <hr />
          </div>
        </div>
        <div className="flex flex-wrap w-full items-center justify-evenly">
          <button className="bg-[#363638] px-2 py-1 rounded outline outline-purple-300 flex items-center justify-center w-[45%]">
            <GoogleIcon /> Google
          </button>
          <button className="bg-[#363638] px-2 py-1 rounded outline outline-purple-300 flex items-center justify-center w-[45%]">
            <AppleIcon /> Apple
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
