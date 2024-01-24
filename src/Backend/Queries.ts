import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./Firebase";
import { toastErr } from "../utils/toast";
import CatchErr from "../utils/catchErr";
import { authDataType, setLoadingType } from "../Types";

export const BE_signUp = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void
) => {
  const { email, password, confirmPW } = data;
  setLoading(true);
  if (email && password && confirmPW) {
    if (password === confirmPW) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          console.log(user);
          setLoading(false);
          reset();
        })
        .catch((err) => {
          CatchErr(err);
          setLoading(false);
        });
    } else {
      toastErr("Passwords must match");
      setLoading(false);
    }
  } else {
    toastErr("Fields shouldn't be left empty!");
    setLoading(false);
  }
};

export const BE_signIn = (
  data: authDataType,
  setLoading: setLoadingType,
  reset: () => void
) => {
  const { email, password } = data;
  setLoading(true);
  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      console.log(user);
      setLoading(false);
      reset();
    })
    .catch((err) => {
      CatchErr(err);
      setLoading(false);
    });
};
