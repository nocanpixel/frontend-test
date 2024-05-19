import React, { useEffect, useRef, useState } from "react";
import { firstUpperCase, mockingUser } from "../../utils/shortCuts";
import { useNavigate } from "react-router-dom";
import { loginForm as data } from "../../utils/forms";
import { Auth } from "../../types/interfaces";
import { LoginState } from "../../enums/LoginState";
import { Cookie } from "../../utils/tools";

const cookie = new Cookie();

const LoginForm: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState<LoginState>(LoginState.Idle);
  const [formData, setFormData] = useState<Auth>({
    email: "",
    password: "",
  });

  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(loginState===LoginState.Error)return setLoginState(LoginState.Idle);
    const { name, value } = e.target;
    setFormData(prev=> ({...prev,[name]:value}) )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        setLoginState(LoginState.Pending);
        const response = await mockingUser(formData);
        if(response){
            setLoginState(LoginState.Success);
            cookie.setUser(response)
        }
        navigate('/')
      } catch (_) {
        setLoginState(LoginState.Error)
      }
  }


  const renderInputFields = () => {
    return data.map((ele, index) => (
      <div key={index} className="flex flex-col gap-2">
        <label className="font-bold text-sm dark:text-white" htmlFor={ele.name}>
          {firstUpperCase(ele.name)}
        </label>
        <input
          ref={index === 0 ? inputRef : undefined}
          required
          onChange={handleOnChange}
          name={ele.name}
          placeholder={ele.name}
          className="block w-full rounded-md border-0 py-2 px-4 pr-20 text-black dark:text-white placeholder:text-gray-400 bg-slate-100 dark:bg-slate-600 focus:ring-2 focus:ring-sky-400 outline-none"
          type={ele.type}
          id={ele.name}
        />
      </div>
    ));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
      <div className="relative flex flex-col gap-4">
        {renderInputFields()}
      {loginState===LoginState.Error&&(<span className="absolute -bottom-8 text-rose-600">{'Username or password are incorrect.'}</span>)}
      </div>
      <div className="flex flex-col gap-2 text-center">
        <button
          type="submit"
          disabled={loginState===LoginState.Pending?true:false}
          className={` ${loginState===LoginState.Pending?'bg-indigo-300 opacity-50 ':'bg-indigo-600 opacity-1 '} py-1 rounded-full text-white text-lg font-bold`}
        >
          {loginState===LoginState.Pending?'Loading...':'Login'}
        </button>
        <span className="text-slate-400 text-sm">
          {"If you don't have an account"}{" "}
          <span
            onClick={() => navigate("/")}
            className="text-indigo-600 cursor-pointer"
          >
            {"SignUp"}
          </span>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
