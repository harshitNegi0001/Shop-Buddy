import '../../stylesheet/register.css';
import emailSvg from '../../assets/email-svgrepo-com.svg';
import keySvg from '../../assets/key-svgrepo-com.svg';
import errorSvg from '../../assets/error-svgrepo-com.svg';
import wrongSvg from '../../assets/wrong-svgrepo-com.svg';
import loading from '../../assets/loading3.webp'
import { useActionState,useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/role_management';
import { jwtDecode } from "jwt-decode";

function AdminLogin() {
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();
    const Backend_Port = import.meta.env.VITE_BACKEND_PORT;
    async function handleInput(pre, curr) {
        const email = curr.get('email').trim();
        const password = curr.get('password').trim();


        if (email && password) {
            // input validations...
            const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!checkEmail.test(email)) {
                setErrMessage("Invalid Email Format");
                toast.error("Invalid Email Format");
                return;
            }

            //if all input are okk
            //then submit data
            try {
                const response = await fetch(`${Backend_Port}/api/admin-login`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                    credentials: "include"
                });
                const result = await response.json();
                
                if (!response.ok) {
                    toast.error(result.message);
                }
                else {
                    toast.success(result.message);
                    const decodeToken = jwtDecode(result.token);
                    login(result.token,decodeToken.role,decodeToken.id);
                    // navigate('/');
                }

            }
            catch (err) {
                setErrMessage(err.message);
                toast.error(err.message);
            }
        }
        else {
            setErrMessage("Please enter all inputs");
            return;
        }

    }
    const [data, action, pendding] = useActionState(handleInput);
    const [errMessage, setErrMessage] = useState('')
    return (
        <div className='auth-container'>
            {errMessage && <div className="error-box">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={errorSvg} alt="" />
                    <span>{errMessage}</span>
                </div>

                <img src={wrongSvg} alt="" onClick={() => setErrMessage('')} />
            </div>}
            {pendding&&<div className='load-back'>
                <img className='loading' src={loading} alt='loading...' />
            </div>}

            <div className="authContainer" style={{}}>
                <div className="sideImgContainer" >
                    {/* Image here */}
                </div>
                <div className="formContainer" style={{}}>
                    <form action={action}>

                        <h2>Admin Login</h2>
                        <br /><br />
                        <div className='input-div' style={{ display: "flex" }}>
                            <label htmlFor="email"><img className='svg-icon' src={emailSvg} alt="email-svg" /></label>

                            <input className='input-box' type="text" id='email' autoComplete='new-email' name='email' required />
                            <label htmlFor="email" className='label'>Email</label>
                        </div>
                        <div className='input-div' style={{ display: "flex" }}>
                            <label htmlFor="password"><img className='svg-icon' src={keySvg} alt="lock-svg" /></label>

                            <input className='input-box' type="password" autoComplete='new-pass' id='password' name='password' required />
                            <label htmlFor="password" className='label'>Password</label>
                        </div><br /><br />
                        <button className='submit-btn'>Login</button>

                    </form>

                </div>

            </div>
        </div>
    )
}
export default AdminLogin;