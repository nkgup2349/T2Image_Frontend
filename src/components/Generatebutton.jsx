import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';

const Generatebutton = () => {
  const navigate = useNavigate();
  const {user , setShowLogin } = useContext(AppContext);
  const onclickhandler = () =>{
    if(user){
      navigate('/result');
    }
    else{
      setShowLogin('true')
    }
  }
  return (
    <motion.div className='text-center'>
       <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-green-600 py-6">
        See the magic. Try now
      </h1>
      <button onClick={onclickhandler} className="inline-flex items-center gap-2 px-12 py-3  bg-black text-white m-auto hover:scale-105 transition-all duration-50 rounded-full border border-white">
        Generate Images
        <img className="h-6" src={assets.star_group} />
      </button>
    </motion.div>
  )
}

export default Generatebutton
