import "./cartcost.css"
import { useEffect, useState } from "react"

function CartCost(props) {
    async function getCode(e) {
        //const [code, setCode] = useState({});
    
        alert("Hello");
    }

    return (
        <div className="cart-cost">
            <h1>Cart totals</h1>
            <div className="subtotal">
                <span>SUBTOTAL</span><p id="subtotal">{props.subtotal}</p>
            </div>
            <div className="shipping">
                <span>SHIPPING</span><p id="address">{props.address}</p>
                <p id="shipping">$10.00</p>
            </div>
            <div className="subtotal">
                <span>USE POINT</span><input type="checkbox" id="usepoint-checkbox"/>
            </div>
            <form className="coupon-code">
                <span>COUPON CODE</span>
                <input type="text" id="coupon-code" placeholder="If you have a coupon code, please apply it below." />
                <button id="apply-button" onClick={getCode}>Apply</button>
            </form>
            <div className="total">
                <span>TOTAL</span><p id="total-payment">$22.00</p>
            </div>
            <button id="checkout-button" onClick={getCode}>PROCEED TO CHECKOUT</button>
        </div>
    );
}

export default CartCost;