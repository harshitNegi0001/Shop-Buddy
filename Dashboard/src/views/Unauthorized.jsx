import '../stylesheet/unauthorized.css';

// import unauth from '../assets/unauthorized_dark.png';
import unauth from '../assets/unauthorized_light.png';
import { Link } from 'react-router-dom';
function Unauthorized() {
    return (
        <div className='unauth'>
            
            <div className="unauth_img">
            </div>
            <div className="unauth_msg">
                <h1>You are not allowed here</h1>
                <span>Go back <Link to={'/'} style={{color:"blue"}}>Home</Link></span>
            </div>

        </div>
    )
}
export default Unauthorized;