import "./cartcost.css"
import { useState } from "react"
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";
import { format } from 'react-string-format';

function CartCost(props) {
    const [code, setCode] = useState("");
    const [percent, setPercent] = useState(0);
    const [address, setAddress] = useState("");
    const [point, setPoint] = useState(false);
    const [shipping, setShippng] = useState(0);
    const [total, setTotal] = useState(0);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [changepage, setChangepage] = useState(false)
    const [orderId, setOrderId] = useState(0)

    const handleClose = () => {
        setOpen(false);
        setOpenConfirm(false);
    };

    function openDialog() {
        setOpenConfirm(true)
    }

    function handleChangePoint(e) {
        setPoint(e.target.checked);
    }

    function handleChangeCode(e) {
        setCode(e.target.value);
    }

    function handleChangeAddress(e) {
        setAddress(e.target.value);
    }

    async function getCode() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            headers: myHeaders,
            redirect: 'follow'
        };

        var url = "http://103.77.173.109:9000/index.php/voucher?code=" + String(code)

        const res = await fetch(url, requestOptions);
        const json = await res.json();
        if (json.result === "success") {
            if (json.message === null) {
                setMessage("Coupon code is not correct, please try again")
            }
            else {
                setMessage("This code sale " + String(json.message.percent) + "%")
                setPercent(parseInt(json.message.percent))
            }
        }
        else {
            setMessage("Something went wrong, please reload page");
        }
        setOpen(true)
    }

    async function createOrder() {
        if (address === "") {
            setOpen(true)
            setMessage("You have to fill your address in SHIPPING !!")
            return
        }

        var drink = []
        var lst = props.listdrink
        for(var key in lst) {
            var value = {"id": String(key), "number": parseInt(lst[key])}
            drink.push(value)
        }
        var body = JSON.stringify({
            "username" : props.username,
            "drink" : drink,
            "voucher" : code ,
            "address" : address,
            "isUsePoint" : point
        });
        
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,
            redirect: 'follow'
        };

        const res = await fetch("http://103.77.173.109:9000/index.php/order", requestOptions);
        const json = await res.json()
        console.log(json)
        if (json.result === "success") {
            setOpen(true)
            setTotal(json.message.totalfee)
            setShippng( parseFloat(json.message.totalfee)*100/(100-percent) - props.subtotal)
            setMessage("success")
            setOrderId(json.message.orderId)
            setChangepage(true)
        }
        else if (json.result === "fail") {
            setOpen(true)
            setMessage("Fail to checkout")
        }
        else {
            setOpen(true)
            setMessage("Something went wrong please reload page!")
        }
    }

    return (
        <div className="cart-cost">
            <h1>Cart totals</h1>
            <div className="subtotal">
                <span>SUBTOTAL</span><p id="subtotal">{props.subtotal}</p>
            </div>
            <div className="shipping">
                <span>SHIPPING</span>
                <textarea id="address" name="address" placeholder="Input your address" onChange={handleChangeAddress}/>
                <p id="shipping">{shipping}</p>
            </div>
            <div className="subtotal">
                <span>USE POINT</span><input type="checkbox" id="usepoint-checkbox" onChange={handleChangePoint}/>
            </div>
            <div className="coupon-code">
                <span>COUPON CODE</span>
                <input type="text" id="coupon-code" name="couponCode" placeholder="If you have a coupon code, please apply it below." onChange={handleChangeCode}/>
                <button id="apply-button" onClick={getCode}>Apply</button>
                <Dialog open={open} onClose={handleClose}>
                    <Alert severity="info">
                        {message}
                    </Alert>
                </Dialog>
                <Dialog open={openConfirm} onClose={handleClose}>
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Subscribe
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Do you want to procceed checkout ? 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={createOrder}>Yes</Button>
                    </DialogActions>
                </Dialog>
                <Dialog  open={changepage}>
                    <Navigate to={format('/user/order?id={0}', orderId)}/>
                </Dialog>
            </div>
            <div className="total">
                <span>TOTAL</span><p id="total-payment">{total}</p>
            </div>
            <button id="checkout-button" onClick={openDialog}>PROCEED TO CHECKOUT</button>
        </div>
    );
}

export default CartCost;