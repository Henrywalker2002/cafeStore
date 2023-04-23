import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { Dialog } from '@mui/material';

function Logout(props) {
    const [changepage, setChangepage] = useState(false)
    
    useEffect(() => {
        var item = localStorage.getItem("username");
        if (item) {
            localStorage.removeItem("username");
            setChangepage(true)
        }
    }, []);

    return (
        <div>
            <Dialog  open={changepage}>
                <Navigate to='/client/login'/>
            </Dialog>
        </div>
    );
}

export default Logout;