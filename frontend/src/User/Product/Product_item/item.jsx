import cart from "./cart.png"
import "./item.css"
import { useState } from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate } from "react-router-dom";

function ProductItem(props) {
    const navigate = useNavigate()
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const username = props.username

    const handleClose = () => {
        setOpenError(false);
        setOpenSuccess(false);
    };

    async function addCart() {
        if (localStorage.getItem('username') === undefined) {
            navigate('/client/login')
        }

        var body = JSON.stringify({
            "username": username,
            "drinkId": props.id
        });

        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
            redirect: 'follow'
        };

        const res = await fetch("http://103.77.173.109:9000/index.php/cart", requestOptions);
        const json = await res.json()
        console.log(body)
        if (json.result === "fail") {
            setOpenError(true)
            setMessage(json.message)
        }
        else if (json.result === "success") {
            setOpenSuccess(true)
            setMessage("Success add to cart.")
        }
        else if (json.result !== "success") {
            setOpenError(true)
            setMessage("Something went wrong please check again!")
        }
    }

    return (
        <div className="product-item">
            <div>
                <img src={props.image} alt="item" className="item-image"/>
            </div>
            <div name="name" className="text-menu">
                <p>{props.name}</p>
                <p>{props.description}</p>
            </div>
            <div name="price" className="buy-menu">
                <p>{props.price}VND</p>
                <Button bg="white"><img src={cart} className="product-cart" alt="cart" onClick={addCart}/></Button>
            </div>
            <Dialog open={openError} onClose={handleClose}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {message}
                </Alert>
            </Dialog>
            <Dialog open={openSuccess} onClose={handleClose}>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {message}
                </Alert>
            </Dialog>
        </div>
    );
}

export default ProductItem;