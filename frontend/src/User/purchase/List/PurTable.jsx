import React, { useState, useEffect } from "react";
import "./Table.css";
import PurRow from "./PurRow";

function PurTable({ state }) {
  const [orderList, setOrderList] = useState([]);
  // username
  const username = "username";

  async function getData() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const res = await fetch(
      "http://103.77.173.109:9000/index.php/order",
      requestOptions
    );
    const response = await res.json();
    // filter OrderList by statement, username
    let filteredOrderList = response.message?.filter((order) => {
      if (state === "Processing") return order.statement === "created";
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
      else return order.statement === "created" || order.username === username;
    });

    setOrderList(filteredOrderList);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <table className="order-list">
      <thead className="order-list-thead">
        <th className="order-list-th">ORDER NUMBER</th>
        <th className="order-list-th">DATE</th>
        <th className="order-list-th">STATUS</th>
        <th className="order-list-th">TOTAL</th>
        <th className="order-list-th">ACTION</th>
        <td></td>
      </thead>
      {orderList?.map((orderInfo, index) => (
        <PurRow orderInfo={orderInfo} index={index} getData={getData} />
      ))}
    </table>
  );
}

export default PurTable;
