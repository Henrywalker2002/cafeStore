import delete_btn from "./delete.png"
import "./cartitem.css"
import { useEffect, useState } from "react"

function CartItem(props) {
    const [quantity, setQuantity] = useState(0);
    const [name, setName] = useState("Drink");
    const [image, setImage] = useState("http://103.77.173.109:9000/img/default.png");
    const [price, setPrice] = useState(0.000);

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
        if (e.target.value > quantity) {
            props.callback(props.subtotal + price)
        }
        else {
            props.callback(props.subtotal - price)
        }
        setQuantity(e.target.value);
    }

    /*async function handleDelete() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": deleteId
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const res = await fetch("http://103.77.173.109/index.php/drink", requestOptions);
        const json = await res.json();
        if (json.result === "success") {
            setOpenConfirm(false)
        }
        else if (json.result  === "fail") {
            setMessageDelete(json.message);
        }
        else {
            setMessageDelete("something went wrong, please reload page");
        }
        getData();
    }*/

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
            <td><button><img src={delete_btn} className="delete-btn" alt="delete button"/></button></td>
        </tr>
    );
}

export default CartItem;