import React, { useState, useEffect } from "react";
import "./Table.css";
import TableRow from "./TableRow";

function Table({ state }) {
  const [orderList, setOrderList] = useState([]);
  // staff username
  const staffUsername = "staff2";

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
    // filter OrderList by statement, staffUsername
    let filteredOrderList = response.message?.filter((order) => {
      if (state === "Processing") return order.statement === "created";
      else if (state === "Shipping")
        return (
          order.statement === "accepted" &&
          order.staffUsername === staffUsername
        );
      else if (state === "Success")
        return (
          order.statement === "completed" &&
          order.staffUsername === staffUsername
        );
      else
        return (
          order.statement === "created" || order.staffUsername === staffUsername
        );
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
        <th className="order-list-th">STAFF</th>
        <td></td>
      </thead>
      {orderList?.map((orderInfo, index) => (
        <TableRow orderInfo={orderInfo} index={index} getData={getData} />
      ))}
    </table>
  );
}

export default Table;
