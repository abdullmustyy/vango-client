import moment from "moment";

export const localStorageAuthValues = () => {
  return {
    userId: localStorage.getItem("userId"),
    isSignedIn: localStorage.getItem("isSignedIn"),
    accessToken: localStorage.getItem("accessToken"),
    exp: localStorage.getItem("exp"),
  };
};

export const isUserSignedIn = () => {
  const { isSignedIn } = localStorageAuthValues();

  return isSignedIn === "true";
};

export const storeLocals = (
  accessToken: string,
  exp: string,
  userId: string
) => {
  const expiry = moment().add(Number.parseInt(exp), "d").unix();

  localStorage.setItem("userId", userId);
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("exp", expiry.toString());
};

export const isTokenExpired = () => {
  const { exp } = localStorageAuthValues();

  if (!exp) return true;

  const now = moment();
  const expiry = moment.unix(Number(exp));

  return now.isAfter(expiry);
};

export const isUserAuthorized = () => {
  return isUserSignedIn() && !isTokenExpired();
};

export const logOut = () => {
  localStorage.clear();
};
