import React, { useEffect } from "react";
import LoginForm from "../components/login/LoginForm";
import { Cookie } from "../utils/tools";
import { useNavigate } from "react-router-dom";

const cookie = new Cookie();
const Login: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = cookie.auth();
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/');
    }
  },[])

  return (
    <section className="px-2 h-screen flex justify-center items-center">
      <div className="container relative py-8 px-4 flex flex-col shadow-lg border border-slate-200 dark:border-none dark:bg-slate-800 rounded-3xl min-h-[35em] md:w-[34em]">
        <div className="flex-grow flex flex-col justify-center gap-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-gray-700 dark:text-white text-4xl font-bold">
            <span>{'Frontend V4'}</span>
          </h1>
          <span className="text-slate-400 text-sm">* Ingresar a la aplicación mediante login</span>
        </div>
        <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default Login;
