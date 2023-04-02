import title from "./text-title.png";
import "./product.css";
import Header from "../Components/Header/Header";
import ProductItem from "../Components/Product_item/item";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Product(props) {
    return (
        <div className="product">
            <Header/>
            <img className="title-product" src={title} alt="title"/>
            <div className="product-menu">
                <Container>
                    <Nav className="state-list">
                        <Nav.Link className='state' href="#all">All</Nav.Link>
                        <Nav.Link className='state' href="#coffee">Coffee</Nav.Link>
                        <Nav.Link className='state' href="#desert">Desert</Nav.Link>
                    </Nav>
                </Container>
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </div>
    );
}

export default Product;