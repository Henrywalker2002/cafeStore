import { useEffect, useState } from "react";
import title from "./text-title.png";
import "./product.css";
import Header from "../../Components/Header/Header";
import ProductItem from "./Product_item/item";

function Product(props) {
  const [items, setItems] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) {
      setItems(user);
      console.log(user);
    }
  }, []);

  const [itemList, setItemList] = useState([]);

  async function getData() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const res = await fetch(
      "http://103.77.173.109:9000/index.php/drink",
      requestOptions
    );
    const response = await res.json();
    setItemList(response.message);
  }

  useEffect(() => {
    getData();
  }, []);

  var trls = itemList.map((element) => {
    return (
      <ProductItem
        name={element.name}
        description={""}
        price={element.price}
        image={element.image}
        key={element.id}
        id={element.id}
        username={items}
      />
    );
  });

  return (
    <div className="product">
      <Header />
      <div>
        <img className="title-product" src={title} alt="title" />
      </div>
      <div className="product-menu">{trls}</div>
    </div>
  );
}

export default Product;
