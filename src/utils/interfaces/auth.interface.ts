export interface ISignUpValues {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface ISignInValues {
  usernameOrEmail: string;
  password: string;
}

export type IFormValues = ISignUpValues | ISignInValues;
