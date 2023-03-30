import logo from "./logo.png"
import user from "./user.png"
import cart from "./cart.png"
import './Header.css'

function Header(props) {
    return (
        <div className="head">
            <img className="img-left" src={logo} alt="logo"/>
            
            <div className="head-middle">
                <span>About us</span>
                <span>Our Product</span>
                <span>Delivery</span>
            </div>

            <img className="img-right" src={user} alt="user"/>
            <img className="img-right" src={cart} alt="cart"/>
            <input type="text" className="search-box img-right"></input>
        </div>
    );
}

export default Header;