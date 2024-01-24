import { toastErr } from "./toast";

const CatchErr = (err: { code?: string }) => {
  const { code } = err;
  if (code === "auth/invalid-email") toastErr("Invalid email");
  else if (code === "auth/weak-password")
    toastErr("Password should be at least 6 characters");
  else if (code === "auth/user-not-found") toastErr("User not found");
  else if (code === "auth/email-already-in-use")
    toastErr("Email already in use");
  else if (code === "auth/wrong-password") toastErr("Wrong password");
  else if (code === "auth/requires-recent-login")
    toastErr("Logout and Login before updating your profile");
  else if (code === "auth/invalid-credential") toastErr("Invalid credentials");
  else if (code === "auth/invalid-login-credentials")
    toastErr("Invalid login credentials");
  else toastErr("An error occured");
  console.log(err);
};

export default CatchErr;
