import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import api from "../../axiosConfig";
function Login() {
  const nav = useNavigate();
  const [visibility, setVisibility] = useState(true);
  const [errMessage, setErrorMessage] = useState("");
  interface Values {
    fname: string;
    lname: string;
    email: string;
    password: string;
    avatar: string;
  }
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    avatar: "",
  };
  function login(values: Values) {
    const formData: FormData = new FormData();
    formData.set("fname", values.fname),
      formData.set("lname", values.lname),
      formData.set("email", values.email),
      formData.set("password", values.password),
      formData.set("avatar", values.avatar),
      api
        .post("api/v3/user/login", formData)
        .then((result) => {
          nav("/chat");
        })
        .catch((err) => {
          // setErrorMessage(err.response.data);
        });
  }

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="min-w-full flex justify-center flex-wrap items-center min-h-[75vh] w-full py-10 max-w-full bg-black text-white">
      <div className="bg-[#363638] w-1/3 p-10 rounded">
        <p className="text-3xl text-center ">Access Your Account</p>
        <p className="text-sm  text-center py-3">
          Don't have an account?
          <NavLink to="/signup" className="text-purple-500 underline">
            &nbsp;Sign Up
          </NavLink>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            login(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="max-w-md w-full flex flex-wrap justify-between mx-auto p-4  shadow-md rounded ">
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
              {errMessage && (
                <p className="text-red-500 text-sm">{errMessage}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-500 w-full"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
