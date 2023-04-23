import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { Dialog } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

function Logout(props) {
    const navigate = useNavigate();
    const [changepage, setChangepage] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['username', 'type']);
    localStorage.removeItem('username')
    localStorage.removeItem('type')
    // setCookie('username', '', {path : '/'})
    // setCookie('type', '', {path : '/'})
    console.log(localStorage)
    
    useEffect(() => {
        // console.log(cookies)
        navigate('/client/login')
    }, []);

    return (
        <div>

        </div>
    );
}

export default Logout;