import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required("You have not provided a name.")
    .min(4, "Name must have at least 4 characters."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("You have not provided an email."),
  username: Yup.string()
    .required("You have not provided a username.")
    .min(4, "Username must have at least 4 characters.")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters and underscores."
    ),
  password: Yup.string()
    .required("You have not provided a password.")
    .min(8, "Password must have at least 8 characters.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export const signInSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .required("You have not provided a username or email.")
    .test(
      "is-valid-username-or-email",
      "Please enter a valid email, or a username with at least 4 characters.",
      function (value) {
        const isUsername = Yup.string()
          .min(4, "Username must have at least 8 characters.")
          .isValidSync(value);
        const isEmail = Yup.string().email().isValidSync(value);

        return value.includes("@") || value.includes(".")
          ? isEmail
          : isUsername;
      }
    ),
  password: Yup.string()
    .required("You have not provided a password.")
    .min(8, "Password must have at least 8 characters.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .required("You have not provided an OTP.")
    .min(6, "OTP must have 6 characters.")
    .matches(/^[0-9]+$/, "OTP can only contain numbers."),
});
