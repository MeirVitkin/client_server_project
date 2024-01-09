import { useForm } from "react-hook-form";
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({isLog, setIsLog}) => {
  
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState()
  
  const navigate = useNavigate();

  const onSubmit = async (detailes) => {
    try {
      const  {data}  = await axios.get(
        "http://localhost:8000/login",
        {
          headers:{
              Authorization:`${detailes.UserName}:${detailes.password}`   
          }
       }
        );
        console.log(data);
        localStorage.setItem('currentUser',JSON.stringify(data) )
        setError(null)
        setIsLog(!isLog);
        navigate(`/home/${data.username}`) 
    } catch (err) {
      const {response} = err;
      setError(response.statusText );
    }
  }
  return (
    <div className="logContainer">
      <form className="logInput" onSubmit={handleSubmit(onSubmit)}>
       <div> <input className="Input" type="text" placeholder="User name.." {...register("UserName")} /></div>
       <div><input className="Input" type="text" placeholder="password.." {...register("password")} /></div>
       <div><input className="myInput" type="submit" /></div>
       <div> {error && <p className="error">{error}</p>}</div>
      </form>
    </div>
  )
}

export default Login