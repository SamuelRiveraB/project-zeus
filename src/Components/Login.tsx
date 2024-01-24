import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { BE_signIn, BE_signUp } from "../Backend/Queries";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);

  const handleSignup = () => {
    const data = { email, password, confirmPW };
    BE_signUp(data, setSignupLoading, reset);
  };

  function handleSignin() {
    const data = { email, password };
    BE_signIn(data, setSignupLoading, reset);
  }

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
