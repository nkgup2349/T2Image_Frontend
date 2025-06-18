import {createContext, useEffect, useState} from "react"
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()


const AppContextProvider = (props) =>{
    const [user , setUser] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [credit, setCredit] = useState(false);

     
    const backendurl = import.meta.env.VITE_BACKEND_URL; 
    const navigate = useNavigate();

    const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/user/credit" , {
        headers: { token },
      });
      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const generateImage = async (prompt) => {
    try {
    const {data} =  await axios.post(backendurl + "/api/image/generate-image", {prompt}, {headers: {token}})
    if (data.success) {
      loadCreditsData()
      return data.resultImage
    }
    else {
      toast.error(data.message)
      if (data.creditBalance === 0) {
        navigate("/buy")
      }
    }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const logout = () =>{
    localStorage.removeItem('token')
    setToken('')
    setUser(null)
  }


    const value = {
        user,setUser,showLogin,setShowLogin , backendurl ,token, setToken , credit, setCredit ,loadCreditsData , logout , generateImage, 
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider