import delete_btn from "./delete.png"
import "./cartitem.css"
import { useEffect, useState } from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function CartItem(props) {
    const [quantity, setQuantity] = useState(0);
    const [name, setName] = useState("Drink");
    const [image, setImage] = useState("http://103.77.173.109:9000/img/default.png");
    const [price, setPrice] = useState(0.000);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [messageDelete, setMessageDelete] = useState('');

    useEffect(() => {
        async function checkData() {    
            if(props.image) {
                setImage(props.image)
            }
            if(props.name) {
                setName(props.name)
            }
            if(props.price) {
                setPrice(props.price)
            }
        }
        checkData()
    } , [props.image, props.name, props.price])

    function handleChange(e) {
        props.callback(props.subtotal - price*quantity + price*e.target.value)
        setQuantity(e.target.value);
        var lst = props.listdrink
        for(var key in lst) {
            if (key === props.id) {
                lst.key = e.target.value
                props.callbacklist(lst)
                return
            }
        }
        lst[props.id] = e.target.value
        props.callbacklist(lst)
    }

    async function handleDelete() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username" : props.username,
            "drinkId": props.id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const res = await fetch("http://103.77.173.109:9000/index.php/cart", requestOptions);
        const json = await res.json();
        props.refresh(true)
        if (json.result === "ok") {
            setOpenConfirm(false)
            props.callback(props.subtotal - price*quantity)
        }
        else {
            setMessageDelete("something went wrong, please reload page");
        }
    }

    function handleClose() {
        setOpenConfirm(false);
        setMessageDelete('');
    }

    function showdialog() {
        setOpenConfirm(true);
    }

    return (
        <tr className="cart__row table__section">
            <td data-label="Sản phẩm">
                <img src={image} className="img-product" alt="product"/>
            </td>
            <td data-label="Tên sản phẩm">
                <h5>{name}</h5>
            </td>
            <td data-label="Đơn giá">
                <h5>{price}</h5>
            </td>
            <td data-label="Số lượng" data-max="0">
                <input type="number" value={quantity} className="cart-quantity" name="quantity" min="0" onChange={handleChange}/>
            </td>
            <td data-label="Tổng tiền" className="text-right">
                <h5>{parseFloat(price) * quantity}</h5>
            </td>
            <td>
                <button><img src={delete_btn} className="delete-btn" alt="delete button" onClick={showdialog}/></button>
                <Dialog open={openConfirm} onClose={handleClose} aria-labelledby="draggable-dialog-title">
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Subscribe
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Are you sure to delete this drink ? 
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleDelete}>Delete</Button>
                    </DialogActions>
                    <DialogContentText>
                        {messageDelete}
                    </DialogContentText>
                </Dialog>
            </td>
        </tr>
    );
}

export default CartItem;