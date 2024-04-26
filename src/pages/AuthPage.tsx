/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setError,
  setImageUrl,
  setLoggedIn,
  setPageType,
} from "../state/authSlice";
import { Formik, Form, FormikHelpers } from "formik";
import { MyTextInput } from "../components/FormItems";
import FileUploader from "../components/FileUploader";
import { useCallback } from "react";
import { signInUser, signUpUser } from "../api";
import { useMutation } from "@tanstack/react-query";
import {
  initialSignInValues,
  initialSignUpValues,
} from "../utils/constants/auth.constant";
import {
  signInSchema,
  signUpSchema,
} from "../utils/validations/auth.validation";
import {
  IFormValues,
  ISignInValues,
  ISignUpValues,
} from "../utils/interfaces/auth.interface";

export default function AuthPage() {
  const {
    error: errorState,
    pageType,
    imageUrl,
  } = useAppSelector((state) => state.auth);
  const isSignIn = pageType === "signin";
  const isSignUp = pageType === "signup";
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Use the useMutation hook to register or login the user
  const { mutate } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: ({
      name,
      imageUrl,
      email,
      username,
      usernameOrEmail,
      password,
    }: {
      name: string;
      imageUrl: string;
      email: string;
      username: string;
      usernameOrEmail: string;
      password: string;
    }) => {
      return isSignIn
        ? signInUser(usernameOrEmail, password)
        : signUpUser(name, imageUrl, email, username, password);
    },
  });

  // Upload profile image to Cloudinary on image drop and set the imageUrl in the state with the returned image URL
  const handleImageUpload = useCallback(
    (imageUrl: string) => {
      dispatch(setImageUrl(imageUrl));
    },
    [dispatch]
  );

  const signUp = useCallback(
    (
      { name, email, username, password }: ISignUpValues,
      { resetForm, setSubmitting }: FormikHelpers<ISignUpValues>
    ) => {
      try {
        // Make the API call to register the user
        mutate(
          {
            name,
            imageUrl,
            email,
            username,
            password,
            usernameOrEmail: "",
          },
          {
            onSettled(_, error) {
              if (error) {
                dispatch(setError(error.message));
              }

              setSubmitting(false);
            },
            onSuccess({ data }) {
              // Clear the form
              resetForm();

              // Store the user's email to local storage
              localStorage.setItem("user-email", data.email);

              // Navigate to the OTP page
              navigate("/otp", {
                state: {
                  message: `An OTP has been sent to ${data.email} for verification. Please enter the OTP to verify your email address.`,
                },
              });
            },
          }
        );
      } catch (error) {
        const errorMessage = (error as Error).message;
        dispatch(setError(errorMessage));
      }
    },
    [dispatch, imageUrl, mutate, navigate]
  );

  const signIn = useCallback(
    (
      { usernameOrEmail, password }: ISignInValues,
      { resetForm, setSubmitting }: FormikHelpers<ISignInValues>
    ) => {
      try {
        // Make the API call to register the user
        mutate(
          {
            usernameOrEmail,
            password,
            name: "",
            imageUrl: "",
            email: "",
            username: "",
          },
          {
            onSettled(_, error) {
              if (error) {
                dispatch(setError(error.message || error));
              }

              setSubmitting(false);
            },
            onSuccess() {
              // Clear the form
              resetForm();

              // Set the user as logged in
              localStorage.setItem("isLoggedIn", "true");
              dispatch(setLoggedIn("true"));

              // Redirect the user to the home page or the page they were trying to access
              navigate(location.state?.from || "/", {
                replace: true,
              });
            },
          }
        );
      } catch (error) {
        const errorMessage = (error as Error).message;
        dispatch(setError(errorMessage));
      }
    },
    [dispatch, location.state?.from, mutate, navigate]
  );

  const handleSubmit = useCallback(
    (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
      // Clear the error state
      dispatch(setError(null));

      // Check if the user is signing up or signing in and call the appropriate function
      if (isSignUp) {
        signUp(
          values as ISignUpValues,
          actions as FormikHelpers<ISignUpValues>
        );
      } else {
        signIn(
          values as ISignInValues,
          actions as FormikHelpers<ISignInValues>
        );
      }
    },
    [dispatch, isSignUp, signIn, signUp]
  );

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
          initialValues={isSignUp ? initialSignUpValues : initialSignInValues}
          validationSchema={isSignUp ? signUpSchema : signInSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
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
                  <FileUploader
                    handleImageUpload={(imageUrl: string) =>
                      handleImageUpload(imageUrl)
                    }
                  />
                  <MyTextInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    label="Email"
                  />
                  <MyTextInput
                    name="username"
                    type="text"
                    placeholder="Username"
                    label="Username"
                  />
                </>
              )}
              {isSignIn && (
                <MyTextInput
                  name="usernameOrEmail"
                  type="text"
                  placeholder="Username or Email"
                  label="Username or Email"
                />
              )}
              <MyTextInput
                name="password"
                type="password"
                placeholder="Password"
                label="Password"
              />
              {errorState && (
                <h3 className="text-base text-center text-red-600 font-semibold">
                  {errorState}
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
