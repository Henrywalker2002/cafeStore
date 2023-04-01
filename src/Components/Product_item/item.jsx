import item from "./img-product.png"
import cart from "./cart.png"
import "./item.css"

function ProductItem(props) {
    return (
        <div className="product-item">
            <img src={item} alt="item" />
            <div name="name" className="text-menu">
                <p>Name</p>
                <p>Description</p>
            </div>
            <div name="price" className="buy-menu">
                <p>12k</p>
                <img src={cart} className="product-cart" alt="cart" />
            </div>
        </div>
    );
}

export default ProductItem;