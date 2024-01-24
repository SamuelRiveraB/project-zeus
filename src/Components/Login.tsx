import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { BE_signIn, BE_signUp } from "../Backend/Queries";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { authDataType } from "../Types";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const goTo = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignup = () => {
    const data = { email, password, confirmPW };
    auth(data, BE_signUp, setSignupLoading);
  };

  function handleSignin() {
    const data = { email, password };
    auth(data, BE_signIn, setSignupLoading);
  }

  const auth = (
    data: authDataType,
    func: any,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    func(data, setLoading, reset, goTo, dispatch);
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setConfirmPW("");
  };

  return (
    <div className="w-full md:w-[450px]">
      <h1 className="text-white text-center font-bold text-4xl md:text-6xl mb-10">
        {login ? "Login" : "Register"}
      </h1>
      <div className="bg-white p-6 min-h-[150px] flex flex-col gap-3 w-full rounded-xl drop-shadow-xl">
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {!login && (
          <Input
            name="password again"
            type="password"
            value={confirmPW}
            onChange={(e) => {
              setConfirmPW(e.target.value);
            }}
          />
        )}
        {login ? (
          <>
            <Button
              text="Login"
              onClick={handleSignin}
              loading={signupLoading}
            />
            <Button
              text="Register"
              secondary
              onClick={() => {
                setLogin(!login);
              }}
            />
          </>
        ) : (
          <>
            <Button
              text="Register"
              onClick={handleSignup}
              loading={signupLoading}
            />
            <Button
              text="Login"
              secondary
              onClick={() => {
                setLogin(!login);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
