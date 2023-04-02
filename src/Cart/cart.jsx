import title from "./cart-title.png"
import Header from "../Components/Header/Header"
import "./cart.css"
import CartCost from "../Components/Cart/CartCost/cartcost"
import CartItem from "../Components/Cart/CartItem/cartitem"
import CartHeader from "../Components/Cart/CartItemHeader/cartiheader"

function Cart(props) {
    return (
        <div className="cart">
            <Header />
            <div className="title-cart"><img src={title}  alt="title" /></div>
            <div className="cart-content">
                <div className="cart-itemlist">
                <table className="cart-table">
                    <CartHeader />
                    <tbody>
                        <CartItem />
                        <CartItem />
                    </tbody>
                </table>
                </div>
                <CartCost />
            </div>
        </div>
    );
}

export default Cart;