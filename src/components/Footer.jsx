import React from 'react'
import { assets } from '../assets/assets'
import { redirect } from 'react-router-dom'

const Footer = () => {

  // const instagram = ()=>{
  //   window.location.href = "https://www.instagram.com/nikhil_gupta002/";
  // }
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20 '>
      <img width={150} src={assets.logo} className='mb-6' />
      <p className='flex-1 border-l-2 border-white pl-4 text-sm text-gray-400 max-sm:hidden'>Copyright @T2Image | All right reserved.</p>
      <div className='flex gap-2.5'>

        <a target='_blank' href="https://www.instagram.com/nikhil_gupta002/">
             <img className='cursor-pointer border rounded-full border-white' src={assets.facebook_icon} width={35} />
        </a>
       
        
        <a target='_blank' href="https://www.instagram.com/nikhil_gupta002/">
            <img className='cursor-pointer border rounded-full border-white' src={assets.instagram_icon} width={35} />
        </a>
        
        <a target='_blank' href="https://github.com/nkgup2349/">
            <img className='cursor-pointer border rounded-full border-white' src={assets.twitter_icon} width={35} />
        </a>
        
      </div>
    </div>
  )
}

export default Footer
