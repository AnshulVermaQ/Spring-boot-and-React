import React, { useContext, useState } from 'react'
import './Login.css'
import toast from 'react-hot-toast';
import { login } from '../../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Login = () => {

    const {setAuthData} = useContext(AppContext);

    const navigate = useNavigate();

    const[loading,setLoading] = useState(false);

    const[data,setData] = useState({
        email:"",
        password:""
    })

    const onChangeHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setData((data) => ({...data,[name]:value}));

    }

    const onSubmitHandler = async(e) =>{
        e.preventDefault();

        setLoading(true);

        try {

            const response = await login(data);

            if(response.status === 200){

                toast.success("Login Successfull");
                localStorage.setItem("token",response.data.token);
                localStorage.setItem("role",response.data.role);
                setAuthData(response.data.token,response.data.role);
                navigate("/");
            }

        }catch(error){
            console.log(error);
            toast.error("Email or password is incorrect");
        }
        
    }


  return (
    <div>
      <div className="bg-light d-flex align-items-center justify-content-center vh-100 login-background">

        <div className="card shadow-lg w-100" style={{maxWidth:'480px'}}>
            <div className='card-body'>
                <div className='text-center'>
                    <h1 className='card-title h3' > Sign in</h1>
                    <p className='card-text text-muted'>
                        Sign in below to access your account
                    </p>
                </div>
                <div className='mt-4'>
                    <form onSubmit={onSubmitHandler}>

                        <div className="mb-4">
                            <label htmlFor='email' className='form-label'>
                                Email Address
                            </label>
                            <input name='email'  type='text' id='email' placeholder='yourname@gmail.com'
                            className='form-control' onChange={onChangeHandler} value={data.email}>
                                </input> 
                        </div>

                        <div className="mb-4">
                            <label htmlFor='password' className='form-label'>
                                Password
                            </label>
                            <input  name='password' type='password' id='password' placeholder='*********'
                            className='form-control' onChange={onChangeHandler} value={data.password}>
                                </input> 
                        </div>

                        <div className="d-grid">
                            <button type='submit' className='btn btn-dark btn-lg'>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
