import moment from "moment";

export const localStorageAuthValues = () => {
  return {
    isSignedIn: localStorage.getItem("isSignedIn"),
    accessToken: localStorage.getItem("accessToken"),
    exp: localStorage.getItem("exp"),
  };
};

export const isUserSignedIn = () => {
  const { isSignedIn } = localStorageAuthValues();

  return isSignedIn === "true";
};

export const isTokenExpired = () => {
    const { exp } = localStorageAuthValues();
    
    if (!exp) return true;
    
    const now = moment();
    const expiry = moment.unix(Number(exp));
    
    return now.isAfter(expiry);
};

export const logOut = () => {
  localStorage.removeItem("isSignedIn");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("exp");
};
