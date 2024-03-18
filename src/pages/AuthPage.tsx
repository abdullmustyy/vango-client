import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

const authSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address.").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const authValues = {
  email: "",
  password: "",
};

export default function AuthPage() {
  const { error, pageType } = useSelector((state) => state.auth);
  const isSignIn = pageType === "signin";
  const isSignUp = pageType === "signup";
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  async function signUp({ email, password }, resetForm) {
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
      const errorMessage = error.message;
      dispatch(setError(errorMessage));
    }
  }

  async function signIn({ email, password }, resetForm) {
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
      const errorMessage = error.message;
      dispatch(setError(errorMessage));
    }
  }

  async function handleSubmit(values, { resetForm, isSubmitting }) {
    console.log(isSubmitting);
    dispatch(setError(null));
    // isSignIn
    //   ? await signIn(values, resetForm)
    //   : await signUp(values, resetForm);
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
          onSubmit={async ({ email, password }, { resetForm }) => {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            console.log(userCredential.user);
          }}
        >
          {({ isSubmitting, resetForm }) => (
            <Form className="grid gap-4">
              <MyTextInput
                name="email"
                type="email"
                placeholder="Email address"
              />
              <MyTextInput
                name="password"
                type="password"
                placeholder="Password"
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
