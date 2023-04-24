import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Logout(props) {
    const navigate = useNavigate();
    // const [cookies, setCookie, removeCookie] = useCookies(['username', 'type']);
    localStorage.removeItem('username')
    localStorage.removeItem('type')
    localStorage.removeItem('point')
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