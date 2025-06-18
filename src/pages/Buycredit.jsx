import React, { useContext } from 'react'
import {plans , assets} from '../assets/assets'
import {AppContext} from '../context/AppContext'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios, { toFormData } from 'axios'


const Buycredit = () => {

  const {user , backendurl , loadCreditsData , token , setShowLogin} = useContext(AppContext)

  
  const navigate = useNavigate();

  const initpay = async (order) =>{
    console.log("start working")
    toast.success("start working")
    const options = {
      key : import.meta.env.VITE_RAZORPAY_KEY_ID , 
      currency : order.currency,
      amount : order.amount ,
      name : "Credits payments" , 
      description : "Credits Payments",
      order_id  :order.id ,  
      handler : async(responce)=>{
        console.log('he he this is runig')
        try {
          const {data} = await axios.post(backendurl+'/api/user/verifypayment', responce , {headers : {token}} )
          console.log(data)
          if(data.success){
            
            loadCreditsData()
            navigate('/')
            toast.success("Credit Added")
          }
        } catch (error) {
          toast.error("this is working");
          toast.error(error.message)
        }
      }
    }



    toast.success("hello this is runnig")

    
    const rzp = new window.Razorpay(options)
    rzp.open();
  }

  const paymentrazor = async(planId)=>{
    if(!user) {
      setShowLogin("true");
    }
    try {
      const {data} = await axios.post(backendurl+'/api/user/payment' ,{planId} , {headers:{token}} ) // jo ye header dal raha hai na vo authentication karke used_id bana ke dalne ke lie kah daal raha hai 
      console.log(data);
      console.log("-------------------")
      console.log(data.success)
      console.log(data.order)
      if(data.success){
        initpay(data.order)
      }
    } catch (error) {
      toast.error(error.message);

    }
  }
  return (
    <motion.div className="min-h-[80vh] text-center pt-14 mb-10"
    initial={{ opacity: 0.2, y: 75 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">Our Plans</button>
      <h1 className="text-center text-4xl font-medium mb-6 sm:mb-10">Choose your Plan</h1>

      <div className="flex flex-wrap justify-center gap-6 text-left" >
        {plans.map((item , index)=>(
          <div
            key={index}
            className="bg-black/70 drop-shadow-sm border rounded-lg py-12 px-8 text-white hover:scale-105 transition-all duration-500"
          >
            <img width={40} src={assets.logo_icon} />
            <p className="mt-3 mb-1 font-semibold text-center">{item.id}</p>
            <p className="text-sm text-center">{item.desc}</p>
            <p className="mt-3 text-center"> <span className="text-3xl font-medium">Rs. {item.price}</span> /{" "}{item.credits} credits </p>
            <button onClick={()=>paymentrazor(item.id)} className="w-full bg-gray-900 text-white mt-8 text-sm rounded-full py-2.5 min-w-52 border border-white"
            >{user ? "Purchase" : "Get Started"}</button>
          </div>
        ))}
      </div>

    </motion.div>
  )
}

export default Buycredit
