import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import { toast } from 'react-toastify';
import axios from 'axios';


const Login = () => {

    const [state, setState] = useState("login"); 
    const { setShowLogin, backendurl, setToken, setUser } = useContext(AppContext)

    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onsubmithandler = async (e) => {
    e.preventDefault(); // prevent the webpage from reloading after submitting the form
    try {
      if (state === "login") {
        const { data } = await axios.post(backendurl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);// browser ke local storage me daal do ki ha next baar login kare to baar baar login na karna pade jab tak cache hai 
          setShowLogin(false);// login band karne ke lie
        } else {  
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendurl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

    useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

    const showloading = () => {
    if (state === 'login') {
      toast.success("Logging in, please wait...");
    }  else {
      toast.success("Signing up, please wait...");
    }
  };
    
  return (
    <div className="fixed left-0 top-0 bottom-0 right-0 z-10 backdrop-blur-sm bg-black/45 flex justify-center items-center">
      <motion.form onSubmit={onsubmithandler} className="relative bg-gray-800 p-10 rounded-xl text-slate-500"
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration:0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
        <h1 className="text-center text-white text-2xl font-medium">{state}</h1>
        <p className="text-sm text-gray-400">Welcome back! Please sign up to continue</p>

        { state !== "login" && <div className="border-2 px-5 py-2 flex items-center gap-1 rounded-full mt-5">
            <img className="w-5" src={assets.profile_icon} />
            <input onChange={(e) => setName(e.target.value)} value={name} required type="text" placeholder="Full Name" className="outline-none text-sm rounded-xl p-1 bg-gray-800 text-white" />
        </div>}

        <div className="border-2 px-5 py-2 flex items-center gap-1 rounded-full mt-3">
            <img className="w-5" src={assets.email_icon} />
            <input onChange={(e) => setEmail(e.target.value)} value={email} required type="email" placeholder="Email" className="outline-none text-sm rounded-xl p-1 bg-gray-800 text-white" />
        </div>

        <div className="border-2 px-5 py-2 flex items-center gap-1 rounded-full mt-3">
            <img className="w-5" src={assets.lock_icon} />
            <input onChange={(e) => setPassword(e.target.value)} value={password} required type="password" placeholder="Password" className="outline-none text-sm rounded-xl p-1 bg-gray-800 text-white" />
        </div>
        <p className="text-sm text-green-600 my-4 cursor-pointer">
          Forgot password?
        </p>
        <button onClick={()=>{showloading()}} className="bg-green-600 w-full text-white py-2 rounded-full">
          {state === "login" ? "Login" : "Create Account"}
        </button>

       {state ==="login" ? <p className="mt-5 text-center text-white"> Don't have an account?{" "} <span className="text-green-600 cursor-pointer" onClick={() => setState("sign up")}>Sign up</span></p>
        :
        <p className="mt-5 text-center text-white"> Already have an account?{" "} <span className="text-green-600 cursor-pointer" onClick={() => setState("login")}>Login</span></p>
        }
        <img className="absolute top-5 right-5 cursor-pointer" onClick={()=>{
            setShowLogin('false')
        }} src={assets.cross_icon}/> 
      </motion.form>
    </div>
  )
}

export default Login
