import React, { useContext } from 'react'
import Home from './pages/Home'
import Buycredit from './pages/Buycredit'
import Result from './pages/Result'
import {Route , Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import {AppContext} from './context/AppContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

const App = () => {

  const {showLogin} = useContext(AppContext)

  return (
    <div  className='px-4 overflow-x-hidden sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-black via-gray-500 to-black text-white'>
      <ToastContainer position="bottom-right"/>
      <Navbar/>
      {showLogin==='true' && <Login/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<Buycredit/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
