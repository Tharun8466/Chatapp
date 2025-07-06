import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const navigate =useNavigate();
    const [inputData,setInputData] =useState({});
    const [loading, setLoading] =useState(false);
 
    const handleInput=(e)=>{
        setInputData({
                    ...inputData,[e.target.id]:e.target.value
                })
    }
    console.log(inputData)
    const selectGender=(selectgender)=>{
        setInputData((prev)=>({
            ...prev,gender:selectgender ===inputData.gender? '':selectgender
        }))
    }
    const handleSubmit=async(e)=>{
       e.preventDefault();
        setLoading(true);
       if(inputData.password !==inputData.confirmpassword){
          setLoading(false);
         return toast.error("Password Does not match");
       }
    try {
      const register= await axios.post('/api/auth/register', inputData);
      const data = register.data;
      if (data.success == false) {
        setLoading(false);
        console.log(data.message);
        toast.error(data.message);
      }
      toast.success(data.message);
      localStorage.setItem('chatapp',JSON.stringify(data));
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    }

  return (
    <div className="flex flex-col items-center justify-center mix-w-full mx-auto">
      <div className="w-full p-6 rounded-lg shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-3xl font-bold text-center text-gray-300">
                Register 
               <span className="text-gray-950"> Chatters </span>
             </h1>
           <form onSubmit={handleSubmit} className="flex flex-col text-black">
                <div>
                    <label className="label p-2">
                        <span className="font-bold text-gray-950 text-xl label-text ">
                            Fullname: 
                        </span>
                    </label>
                    <input
                        id="fullname"
                        type="text"
                        onChange={handleInput}
                        placeholder=" Enter Full Name"
                        required
                        className="w-full input input-bordered h-10"
                    />
                </div>
                 <div>
                    <label className="label p-2">
                        <span className="font-bold text-gray-950 text-xl label-text ">
                            Username: 
                        </span>
                    </label>
                    <input
                        id="username"
                        type="text"
                        onChange={handleInput}
                        placeholder=" Enter User Name"
                        required
                        className="w-full input input-bordered h-10"
                    />
                </div>
                <div>
                    <label className="label p-2">
                        <span className="font-bold text-gray-950 text-xl label-text ">
                            Email :
                        </span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        onChange={handleInput}
                        placeholder=" Enter your email"
                        required
                        className="w-full input input-bordered h-10"
                    />
                </div>
                <div>
                    <label className="label p-2">
                        <span className="font-bold text-gray-950 text-xl label-text ">
                            Password:
                        </span>
                    </label>
                    <input
                        id="password"
                        type="password"
                        onChange={handleInput}
                        placeholder=" Enter  password"
                        required
                        className="w-full input input-bordered h-10"
                    />
                </div>
                <div>
                    <label className="label p-2">
                        <span className="font-bold text-gray-950 text-xl label-text ">
                           Confirm Password:
                        </span>
                    </label>
                    <input
                        id="confirmpassword"
                        type="text"
                        onChange={handleInput}
                        placeholder=" Enter Confirm password"
                        required
                        className="w-full input input-bordered h-10"
                    />
                </div>
                <div id='gender' className="mt-1 flex gap-2">
                    <label className="cursor-pointer label flex gap-2">
                         <span className="label-text font-semibold text-gray-950">male</span>
                         <input 
                            onChange={()=>selectGender('male')}
                            checked={inputData.gender==='male'}
                             type='checkbox' className="checkbox checkbox-info"/>
                    </label>
                     <label className="cursor-pointer label flex gap-2">
                         <span className="label-text font-semibold text-gray-950">female</span>
                         <input 
                            onChange={()=>selectGender('female')}
                            checked={inputData.gender==='female'}
                            type='checkbox' className="checkbox checkbox-info"/>
                     </label>
                </div>
                <button
                    type="submit"
                    className="mt-4 self-center 
                                    w-auto px-2 py-1 bg-gray-950 
                                    text-lg hover:bg-gray-900 
                                    text-white rounded-lg hover: scale-105"
                >
                    {loading?"loading..":"Register"}
                </button>
            </form>
            <div className="pt-2">
                <p className="text-sm font-semibold
                                text-gray-800">
                    Do you an Acount ?
                    <Link to={"/login"}>
                        <span className="text-gray-950 
                                        font-bold underline cursor-pointer
                                        hover:text-green-950">
                            Login Now!!
                        </span>
                    </Link>
                </p>
            </div>
      </div>
    </div>
  );
};

export default Register;
