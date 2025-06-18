import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';



const Result = () => {

  const [image, setImage] = useState(assets.profile_img_11);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [promt_text, setpromt_text] = useState('');

  const {generateImage } = useContext(AppContext)

  const onsubmithandler = async(e) => {
    e.preventDefault()
    setLoading(true)
    if (input) {
      const image = await generateImage(input);
      if (image) {
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }

  return (
    <motion.form className="flex flex-col min-h-[90vh] justify-center items-center" onSubmit={onsubmithandler} 
    initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>

  { isImageLoaded && 
  <div className= "flex flex-col lg:flex-row w-full justify-center items-center max-w-6xl gap-8 px-4">
    <div className='flex w-full justify-center'>
      <img className="max-w-sm rounded" src={image} />
    </div>
    <div className="flex w-full flex-col justify-evenly items-center ml-15 lg:ml-0 sm:ml-0 text-white text-sm p-0.5">
      <div className=' w-full text-lg py-5 text-center'>
        <span className='text-black shadow-sm not-italic text-center'> Prompts </span>
        <div  className='h-28 sm:h-16 scrollbar-hide overflow-y-auto text-sm italic text-gray-300 px-4 py-2 rounded-md whitespace-pre-wrap break-words'> {promt_text} </div>
      </div>
      
      <a download className="bg-green-600 px-40 py-3 text-black rounded-full border-2 border-black cursor-pointer whitespace-nowrap transform transition-transform duration-300 hover:scale-105" href={image}>Download Image</a>
      <p onClick={()=>{
        setIsImageLoaded(false)
        setImage(assets.profile_img_11)
        setInput("");
      }} className=" border-black mt-10 border-2 text-white px-40 py-3 rounded-full cursor-pointer bg-black whitespace-nowrap transform transition-transform duration-300 hover:scale-105">Generate Another</p>
     
    </div>
     
  </div>
  
  }

    { !isImageLoaded &&
    <div className='w-full max-w-xl mt-2'>
      <div className='flex justify-center'>
      <div className='relative'>
        <img className="max-w-sm rounded" src={image} />
        <span className={`absolute bottom-0 left-0 h-1 bg-green-500 ${loading ? "w-full transition-all duration-[10s]" :"w-0"}`}/>
        <p className={!loading ? "invisible text-black" : "text-black"}>Generating Image...</p>
      </div>
    </div>
    <div className=" w-full h-32 bg-black text-white text-center text-sm p-4 mt-4 rounded-3xl">
      <textarea onChange={e=> {
        setInput(e.target.value)
        setpromt_text(e.target.value)
      } }
      value={input}
      type = "text"
      className="text-wrap w-full h-full bg-transparent outline-none  max-sm:w-20 placeholder-color resize-none overflow-auto scrollbar-hide" placeholder='Describe what you want to generate' />
      
    </div>
    <div className='w-full flex justify-center mt-2'>
    <button type='submit' className="bg-green-600 text-black px-10 sm:px-16 py-3 rounded-full border-2 border-black transform transition-transform duration-300 hover:scale-105" 
      > Generate </button>
      </div>
    </div> 
}
    </motion.form>
  )
}

export default Result
