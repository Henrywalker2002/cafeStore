import "./cartcost.css"

function sayHello() {
    alert("Hello");
}

function CartCost(props) {
    return (
        <div className="cart-cost">
            <h1>Cart totals</h1>
            <div className="subtotal">
                <span>SUBTOTAL</span><p id="subtotal">$12.00</p>
            </div>
            <div className="shipping">
                <span>SHIPPING</span><p id="address">Espresso Street, No 20 Gotham, Middle Earth 15289</p>
                <p id="shipping">$10.00</p>
            </div>
            <div className="subtotal">
                <span>USE POINT</span><input type="checkbox" id="usepoint-checkbox"/>
            </div>
            <form className="coupon-code">
                <span>COUPON CODE</span>
                <input type="text" id="coupon-code" placeholder="If you have a coupon code, please apply it below." />
                <button id="apply-button" onClick={sayHello}>Apply</button>
            </form>
            <div className="total">
                <span>TOTAL</span><p id="total-payment">$22.00</p>
            </div>
            <button id="checkout-button" onClick={sayHello}>PROCEED TO CHECKOUT</button>
        </div>
    );
}

export default CartCost;