import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const Login = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="w-full md:w-[450px]">
      <h1 className="text-white text-center font-bold text-4xl md:text-6xl mb-10">
        {login ? "Login" : "Register"}
      </h1>
      <div className="bg-white p-6 min-h-[150px] flex flex-col gap-3 w-full rounded-xl drop-shadow-xl">
        <Input name="email" type="email" />
        <Input name="password" type="password" />
        {!login && <Input name="password again" type="password" />}
        {login ? (
          <>
            <Button text="Login" />
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
            <Button text="Register" />
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
