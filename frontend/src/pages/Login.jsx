import '../stylesheet/authPages.css';
import emailSvg from '../assets/email-svgrepo-com.svg';
import keySvg from '../assets/key-svgrepo-com.svg';
import { Link } from 'react-router-dom';
import loading from '../assets/loading3.webp';
import { useActionState, useState } from 'react';
import toast from 'react-hot-toast';
import { jwtDecode } from "jwt-decode";

function Login() {
    
    async function handleInput(pre, curr) {
        const email = curr.get('email').trim();
        const password = curr.get('password').trim();

        if (email && password) {
            
            const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!checkEmail.test(email)) {
                setErrMessage("Invalid Email Format");
                toast.error("Invalid Email Format");
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/customer-login', {
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
                    // login(result.token, decodeToken.role, decodeToken.id);
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
            
            {pendding && <div className='load-back'>
                <img className='loading' src={loading} alt='loading...' />
            </div>}
            <div className="authContainer" style={{}}>
                <div className="sideImgContainer" >
                    {/* Image here */}
                </div>
                <div className="formContainer" style={{}}>
                    <form action={action}>

                        <h2>Login</h2>

                        <div className='input-div' style={{ display: "flex" }}>
                            <label htmlFor="email"><img className='svg-icon' src={emailSvg} alt="email-svg" /></label>

                            <input className='input-box' type="text" id='email' autoComplete='new-email' name='email' required />
                            <label htmlFor="email" className='label'>Email</label>
                        </div>
                        <div className='input-div' style={{ display: "flex" }}>
                            <label htmlFor="password"><img className='svg-icon' src={keySvg} alt="lock-svg" /></label>

                            <input className='input-box' type="password" autoComplete='new-pass' id='password' name='password' required />
                            <label htmlFor="password" className='label'>Password</label>
                        </div>
                        <button className='submit-btn'>Login</button>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                            <div style={{ width: "45%", backgroundColor: "var(--text)", height: "1px", marginRight: "2px" }}></div>
                            <span>OR</span>
                            <div style={{ width: "45%", backgroundColor: "var(--text)", height: "1px", marginLeft: "2px" }}></div>
                        </div>
                        <div>
                            <Link to='/register' className='extra-link' >Create an account</Link></div>
                    </form>

                </div>

            </div>
        </div>
    )
}
export default Login;