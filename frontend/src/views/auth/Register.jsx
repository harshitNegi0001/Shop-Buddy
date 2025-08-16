import '../../stylesheet/register.css';
import userSvg from '../../assets/user-svgrepo-com.svg';
import emailSvg from '../../assets/email-svgrepo-com.svg';
import lockSvg from '../../assets/lock-svgrepo-com.svg';
import keySvg from '../../assets/key-svgrepo-com.svg';
import errorSvg from '../../assets/error-svgrepo-com.svg';
import wrongSvg from '../../assets/wrong-svgrepo-com.svg';
import { useActionState, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import loading from '../../assets/loading3.webp'
import { useSelector } from 'react-redux';



function Register() {
    // const {loader} = useSelector(state=>state.auth)
    function handleInput(pre, curr) {
        const name = curr.get('name').trim();
        const email = curr.get('email').trim();
        const password = curr.get('password').trim();
        const retype = curr.get('retype').trim();

        if (name && email && password && retype) {
            // input validations...
            const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const checkName = /^[A-Za-z\s'-]+$/;
            if (!checkName.test(name)) {
                setErrMessage("Your name cannot contain numbers");
                toast.error("Your name cannot contain numbers");
                return;
            }
            if (!checkEmail.test(email)) {
                setErrMessage("Invalid Email Format");
                toast.error("Invalid Email Format");
                return;
            }
            if (password !== retype) {
                setErrMessage("Password confirmation failed. Please confirm password properly");
                toast.error("Password confirmation failed. \nPlease confirm password properly");
                return;
            }

            try {
                //fetch data
                //submitted then redirect to
                toast.success("Sign up successfully");
            }
            catch (err) {
                setErrMessage(err.message);
            }

            //if all input are okk
            //then submit data

        }
        else {
            setErrMessage("Please enter all inputs");
            return;
        }

    }
    const [data, action, pendding] = useActionState(handleInput)
    const [errMessage, setErrMessage] = useState('')
    return (
        <div className='auth-container' >
            {errMessage && <div className="error-box">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={errorSvg} alt="" />
                    <span>{errMessage}</span>
                </div>

                <img src={wrongSvg} alt="" onClick={() => setErrMessage('')} />
            </div>}
            {pendding && <div className='load-back'>
                <img className='loading' src={loading} alt='loading...' />
            </div>}
            <div className="authContainer" style={{}}>
                <div className="formContainer" style={{}}>
                    <form autoComplete='off' action={action}>
                        <h2>Sign Up</h2>

                        <div className='input-div' style={{ display: "flex" }}>
                            <label htmlFor="name">
                                <img className='svg-icon' src={userSvg} alt="user-svg" />
                            </label>

                            <input className='input-box' type="text" id='name' name='name' autoComplete='new-name' required />
                            <label htmlFor="name" className='label'>Name</label>
                        </div>


                        <div className='input-div' style={{ display: "flex" }}>
                            <label htmlFor="email"><img className='svg-icon' src={emailSvg} alt="email-svg" /></label>

                            <input className='input-box' type="text" id='email' autoComplete='new-email' name='email' required />
                            <label htmlFor="email" className='label'>Email</label>
                        </div>
                        <div className='input-div' style={{ display: "flex" }}>
                            <label htmlFor="password"><img className='svg-icon' src={lockSvg} alt="lock-svg" /></label>

                            <input className='input-box' type="password" autoComplete='new-pass' id='password' name='password' required />
                            <label htmlFor="password" className='label'>Password</label>
                        </div>
                        <div className='input-div' style={{ display: "flex" }}>
                            <label htmlFor="retype"><img className='svg-icon' src={keySvg} alt="key-svg" /></label>

                            <input className='input-box' type="password" autoComplete='new-pass' id='retype' name='retype' required />
                            <label htmlFor="retype" className='label'>Confirm Password</label>
                        </div>
                        <div>

                            <input type="checkbox" style={{ margin: "5px" }} id='confirm' name='confirm' required />
                            <label htmlFor="confirm">Confirm all details</label>
                        </div>
                        <button className='submit-btn'>Register</button>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                            <div style={{ width: "45%", backgroundColor: "var(--text)", height: "1px", marginRight: "2px" }}></div>
                            <span>OR</span>
                            <div style={{ width: "45%", backgroundColor: "var(--text)", height: "1px", marginLeft: "2px" }}></div>
                        </div>
                        <Link to='/login' className='extra-link'>Already have an account</Link>

                    </form>
                </div>
                <div className="sideImgContainer" >

                </div>
            </div>
        </div>
    )
}
export default Register;