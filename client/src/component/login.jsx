import { useForm } from "react-hook-form";
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState()
  
  const navigate = useNavigate();

  const onSubmit = async (detailes) => {
    console.log(detailes);
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
        navigate(`/home/${data.username}`) 
    } catch (err) {
      console.log(err);
      const {response} = err;
      setError(response.statusText );
    }
  }
  return (
    <form className="logInput" onSubmit={handleSubmit(onSubmit)}>
      <input className="Input" type="text" placeholder="User name.." {...register("UserName")} />
      <input className="Input" type="text" placeholder="password.." {...register("password")} />
      <input className="myInput" type="submit" />
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default Login