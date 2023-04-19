import logo from "./logo.png";
import user from "./user.png";
import cart from "./cart.png";
import "./Header.css";

function Header(props) {
  return (
    <div className="head">
      <img className="img-left" src={logo} alt="logo" />

      <div className="head-middle">
        <span className="page">About us</span>
        <span className="page">Our Product</span>
        <span className="page">Delivery</span>
      </div>

      <img className="img-right" src={user} alt="user" />
      <img className="img-right" src={cart} alt="cart" />
      <input type="text" className="search-box img-right"></input>
    </div>
  );
}

export default Header;
