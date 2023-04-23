import { useEffect, useState } from "react"
import title from "./text-title.png";
import "./product.css";
import Header from "../../Components/Header/Header";
import ProductItem from "./Product_item/item";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Product(props) {
    const [items, setItems] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('username'));
        if (user) {
            setItems(user);
        }
    }, []);


    const [itemList, setItemList] = useState([]);

    async function getData() { 
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        const res = await fetch("http://103.77.173.109:9000/index.php/drink", requestOptions);
        const response = await res.json()
        setItemList(response.message)
    }

    useEffect(() => {
        getData()
    } , [])

    var trls = itemList.map(element => {
        return <ProductItem name={element.name} description={element.description} price={element.price} image={element.image} key={element.id} id={element.id} username={items}/>
    });

    return (
        <div className="product">
            <Header/>
            <div><img className="title-product" src={title} alt="title"/></div>
            <div className="product-menu">
                <Container>
                    <Nav className="state-list">
                        <Nav.Link className='state' href="#all">All</Nav.Link>
                        <Nav.Link className='state' href="#coffee">Coffee</Nav.Link>
                        <Nav.Link className='state' href="#desert">Desert</Nav.Link>
                    </Nav>
                </Container>
                {trls}
            </div>
        </div>
    );
}

export default Product;