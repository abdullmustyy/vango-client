import * as Yup from "yup";

export const createVanSchema = Yup.object().shape({
  name: Yup.string()
    .required("You have not provided a name.")
    .min(4, "Name must have at least 4 characters."),
  description: Yup.string()
    .required("You have not provided a description.")
    .min(4, "Description must have at least 4 characters."),
  price: Yup.number()
    .required("You have not provided a price.")
    .min(0, "Price must be at least 0."),
  type: Yup.string()
    .required("You have not provided a type.")
    .min(4, "Type must have at least 4 characters."),
});
