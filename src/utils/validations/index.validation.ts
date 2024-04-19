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
    .min(4, "Username must have at least 4 characters."),
  password: Yup.string()
    .required("You have not provided a password.")
    .min(8, "Password must have at least 8 characters.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export const signInSchema = Yup.object().shape({
  username: Yup.string()
    .required("You have not provided a username.")
    .min(4, "Username must have at least 4 characters."),
  password: Yup.string()
    .required("You have not provided a password.")
    .min(8, "Password must have at least 8 characters.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});
