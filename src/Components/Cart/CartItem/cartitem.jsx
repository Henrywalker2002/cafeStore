import product from "./img-product.png"
import delete_btn from "./delete.png"
import "./cartitem.css"

function CartItem(props) {
    return (
        <tr className="cart__row table__section">
            <td data-label="Sản phẩm">
                <img src={product} className="img-product" alt="product"/>
            </td>
            <td data-label="Tên sản phẩm">
                <h5>Bánh tart</h5>
            </td>
            <td data-label="Đơn giá">
                <h5>22.00$</h5>
            </td>
            <td data-label="Số lượng" data-max="0">
                <input type="number" className="cart-quantity" name="quantity" min="1"/>
            </td>
            <td data-label="Tổng tiền" className="text-right">
                <h5>22.00$</h5>
            </td>
            <td><button><img src={delete_btn} className="delete-btn" alt="delete button"/></button></td>
        </tr>
    );
}

export default CartItem;