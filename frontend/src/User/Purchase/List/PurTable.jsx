import React, { useState, useEffect } from "react";
import "./Table.css";
import PurRow from "./PurRow";

function PurTable({ state }) {
  const [orderList, setOrderList] = useState([]);
  // username
  const [username, setItems] = useState("");

  useEffect(() => {
      const user = JSON.parse(localStorage.getItem('username'));
      if (user) {
          setItems(user);
          console.log(user)
      }
  }, []);

  async function getData() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const res = await fetch(
      "http://103.77.173.109:9000/index.php/order?username=username12",
      requestOptions
    );
    const response = await res.json();
    // filter OrderList by statement, username
    let filteredOrderList = response.message?.filter((order) => {
      if (state === "Processing")
        return order.statement === "created" && order.username === username;
      else if (state === "Shipping")
        return order.statement === "accepted" && order.username === username;
      else if (state === "Success")
        return (
          order.statement === "completed" &&
          order.star === null &&
          order.username === username
        );
      else if (state === "Cancelation")
        return order.statement === "cancel" && order.username === username;
      else if (state === "Rated")
        return order.star !== null && order.username === username;
      else return order.username === username;
    });

    setOrderList(filteredOrderList);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <table className="order-list">
      <thead className="order-list-thead">
        <tr>
          <th className="order-list-th">ORDER NUMBER</th>
          <th className="order-list-th">DATE</th>
          <th className="order-list-th">STATUS</th>
          <th className="order-list-th">TOTAL</th>
          <th className="order-list-th">ACTION</th>
          <th></th>
        </tr>
      </thead>
      {orderList?.map((orderInfo, index) => (
        <PurRow orderInfo={orderInfo} index={index} getData={getData} key={index}/>
      ))}
    </table>
  );
}

export default PurTable;
