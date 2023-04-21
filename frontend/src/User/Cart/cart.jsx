import title from "./cart-title.png"
import Header from "../../Components/Header/Header"
import "./cart.css"
import CartCost from "./Cart/CartCost/cartcost"
import CartItem from "./Cart/CartItem/cartitem"
import CartHeader from "./Cart/CartItemHeader/cartiheader"
import { useEffect, useState } from "react"
import { format } from 'react-string-format';

function Cart(props) {
    const [listItem, setListItem] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [subtotal, setSubtotal] = useState(0);
    const [listDrink, setListDrink] = useState({});
    const [orderId, setOrderId] = useState(0);
    
    const [items, setItems] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('username'));
        if (user) {
            setItems(user);
            console.log(user)
        }
    }, []);
    const username = items

    useEffect(() => {
        async function getData() {    
            var url = "http://103.77.173.109:9000/index.php/cart?username=" + String(username)
    
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            const res = await fetch(url, requestOptions);
            const response = await res.json()
            setListItem(response.message)
        }
        getData()
    } , [listItem, username])

    useEffect(() => {
        async function getUser() {
            var url = "http://103.77.173.109:9000/index.php/account?username=" + String(username)
    
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            const res = await fetch(url, requestOptions);
            const response = await res.json()

            setUserInfo(response.message)        
        }
        getUser()
    } , [userInfo, username])

    var trls = listItem.map((element, index) => {
        if (!element.id) return <tr key={index} hidden></tr>
        else {
            return <CartItem id={element.id} image={element.image} key={element.id} name={element.name} price={element.price} description={element.description} username={username} callback={setSubtotal} subtotal={subtotal} callbacklist={setListDrink} listdrink={listDrink}/>
        }
    })
    return (
        <div className="cart">
            <Header />
            <div className="title-cart"><img src={title}  alt="title" /></div>
            <div className="cart-content">
                <div className="cart-itemlist">
                <table className="cart-table">
                    <CartHeader />
                    <tbody>
                        {trls}
                    </tbody>
                </table>
                </div>
                <CartCost subtotal={subtotal} username={username} listdrink={listDrink} getID={setOrderId}/>
            </div>
            <div className="view-order">
                <a href="/user/purchase">Go to your purchase</a>
                <a href={format('/user/order?id={0}', orderId)}>Go to your order</a>
            </div>
            <div className="view-order"></div>
        </div>
    );
}

export default Cart;