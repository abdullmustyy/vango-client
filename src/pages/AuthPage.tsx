/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setError, setPageType } from "../state/authSlice";
// Formik and Yup imports
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { MyTextInput } from "../components/FormItems";
// Firebase imports
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import FileUploader from "../components/FileUploader";

const authSchema = Yup.object().shape({
  name: Yup.string()
    .required("You have not provided a name.")
    .min(4, "Name must have at least 4 characters."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("You have not provided an email."),
  username: Yup.string()
    .required("You have not provided a username.")
    .min(4, "Username must have at least 4 characters."),
  password: Yup.string()
    .required("You have not provided a password.")
    .min(8, "Password must have at least 4 characters.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const authValues = {
  name: "",
  email: "",
  username: "",
  password: "",
};

export default function AuthPage() {
  const { error, pageType } = useAppSelector((state) => state.auth);
  const isSignIn = pageType === "signin";
  const isSignUp = pageType === "signup";
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  async function signUp(
    { email, password }: { email: string; password: string },
    resetForm: () => void
  ) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
      resetForm();
      dispatch(setPageType("signin"));
    } catch (error) {
      console.log("Error", error);
      const errorMessage = (error as Error).message;
      dispatch(setError(errorMessage));
    }
  }

  async function signIn(
    { email, password }: { email: string; password: string },
    resetForm: () => void
  ) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
      resetForm();
      navigate(location.state?.from || "/", {
        replace: true,
      });
    } catch (error) {
      console.log("Error", error);
      const errorMessage = (error as Error).message;
      dispatch(setError(errorMessage));
    }
  }

  async function handleSubmit(
    values: { email: string; password: string },
    {
      resetForm,
      isSubmitting,
    }: { resetForm: () => void; isSubmitting: boolean }
  ) {
    console.log(isSubmitting);
    dispatch(setError(null));
    await signIn(values, resetForm);
  }

  return (
    <section className="container mx-auto md:grid place-content-center py-36 md:px-0 px-4 text-[#161616] select-text">
      <div className="md:w-[40rem] space-y-6">
        {location.state?.message && (
          <h3 className="text-base text-center text-red-600 font-semibold">
            {location.state?.message}
          </h3>
        )}
        <h1 className="md:text-4xl text-2xl font-bold text-center">
          {isSignIn ? "Sign in to your account" : "Create an account"}
        </h1>
        <Formik
          initialValues={authValues}
          validationSchema={authSchema}
          onSubmit={async ({ name, email, username, password }) => {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              username,
              password
            );
            console.log(userCredential.user);
          }}
        >
          {({ isSubmitting, resetForm }) => (
            <Form className="grid gap-4">
              {isSignUp && (
                <>
                  <MyTextInput
                    name="name"
                    type="text"
                    placeholder="Name"
                    label="Name"
                  />
                  <FileUploader />
                  <MyTextInput
                    name="email"
                    type="text"
                    placeholder="Email"
                    label="Email"
                  />
                </>
              )}
              <MyTextInput
                name="username"
                type="text"
                placeholder="Username"
                label="Username"
              />
              <MyTextInput
                name="password"
                type="password"
                placeholder="Password"
                label="Password"
              />
              {error && (
                <h3 className="text-base text-center text-red-600 font-semibold">
                  {error}
                </h3>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting ? "opacity-80 cursor-not-allowed" : null
                } bg-[#FF8C38] w-full rounded-md py-3 text-base font-bold text-white place-self-center hover:outline outline-2 outline-[#FF8C38] transition`}
              >
                {isSubmitting ? "Signing" : "Sign"} {isSignIn ? "In" : "Up"}
              </button>
              <p
                className="text-base font-semibold cursor-pointer text-center"
                onClick={() => {
                  dispatch(setError(null));
                  resetForm();
                  dispatch(setPageType(isSignIn ? "signup" : "signin"));
                }}
              >
                {isSignIn && (
                  <span>
                    Don&apos;t have an account?{" "}
                    <span className="text-[#FF8C38] font-bold">
                      Sign Up here
                    </span>
                  </span>
                )}
                {isSignUp && (
                  <span>
                    Already have an account?{" "}
                    <span className="text-[#FF8C38] font-bold">
                      Sign In here
                    </span>
                  </span>
                )}
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
