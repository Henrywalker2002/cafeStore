import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ExpandableButton from "./ExpandableButton";
import useOpenController from "./useOpenController";
import "./Table.css";
import axios from "axios";

function TableRow({ orderInfo, index, getData }) {
  const { isOpen, toggle } = useOpenController(false);
  const [status, setStatus] = useState("");
  const [action, setAction] = useState("");
  // disabled Action Button
  const [disabled, setDisabled] = useState(false);
  // handle Accept Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState("");
  // change status & action following statement
  const renderStatus = () => {
    switch (orderInfo.statement) {
      case "created":
        setStatus("Processing");
        setAction("Accept");
        break;
      case "accepted":
        setStatus("Shipping");
        setAction("Complete");
        break;
      case "completed":
        setStatus("Success");
        setDisabled(true);
    }
  };
  useEffect(() => {
    renderStatus();
  }, []);

  function handleDialog() {
    setOpenDialog(true);
  }
  const handleAction = async (e) => {
    e.preventDefault();
    if (action === "Accept") {
      const processingInfo = {
        id: orderInfo.id,
        staffUsername: "staff2",
      };

      try {
        const response = await axios.put(
          "http://103.77.173.109:9000/index.php/acceptOrder",
          processingInfo
        );
        console.log(response.status, response.data);
        getData();
        setOpenDialog(false);
      } catch (err) {
        console.log(err);
      }
    } else if (action === "Complete") {
      const shippingInfo = {
        id: orderInfo.id,
      };

      try {
        const response = await axios.put(
          "http://103.77.173.109:9000/index.php/completeOrder",
          shippingInfo
        );
        console.log(response.status, response.data);
        getData();
        setOpenDialog(false);
      } catch (err) {
        console.log(err);
        setMsg(err);
      }
    }
  };
  function handleClose() {
    setOpenDialog(false);
  }

  return (
    <tbody className="order-list-body">
      <tr className="order-list-tr" key={index}>
        <td className="order-list-td">{orderInfo.id}</td>
        <td className="order-list-td">{orderInfo.timeStart}</td>
        <td className="order-list-td">{status}</td>
        <td className="order-list-td">{orderInfo.totalFee}</td>
        <td className="order-list-td">
          {!disabled && (
            <button className="action-btn" onClick={handleDialog}>
              {action}
            </button>
          )}
        </td>
        <td className="order-list-td">{orderInfo.staffUsername}</td>
        <td className="button-td">
          <ExpandableButton isOpen={isOpen} toggle={toggle} />
        </td>
      </tr>
      {isOpen && (
        <table className="order-detail">
          <thead className="order-detail-thead">
            <th className="order-items-th">Items</th>
            <th className="order-quantity-th">Quantity</th>
          </thead>
          <tbody className="order-detail-tbody">
            {orderInfo.drink.map((item, index) => {
              return (
                <tr className="order-detail-tr" key={index}>
                  <td className="order-detail-td">
                    {item.name ? item.name : "no name"}
                  </td>
                  <td className="order-detail-td">{item.number}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Action
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure to ${action} this order ?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAction}>{action}</Button>
        </DialogActions>
        <DialogContentText>{msg}</DialogContentText>
      </Dialog>
    </tbody>
  );
}

export default TableRow;
