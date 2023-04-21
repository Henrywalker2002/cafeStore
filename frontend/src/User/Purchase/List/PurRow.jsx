import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ExpandableButton from "./ExpandableButton";
import useOpenController from "./useOpenController";
import "./Table.css";
import axios from "axios";

function PurRow({ orderInfo, index, getData }) {
  const { isOpen, toggle } = useOpenController(false);
  const [status, setStatus] = useState("");
  const [action, setAction] = useState("");
  // disabled Action Button
  const [disabled, setDisabled] = useState(false);
  // handle Feedback/Cancel Dialog
  const [openFb, setOpenFb] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [msg, setMsg] = useState("");
  // star options
  const [rate, setRate] = React.useState("");
  const stars = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
    {
      value: "4",
      label: "4",
    },
    {
      value: "5",
      label: "5",
    },
  ];

  // change status & action following statement
  const renderStatus = () => {
    switch (orderInfo.statement) {
      case "created":
        setStatus("Processing");
        setAction("Cancel");
        break;
      case "accepted":
        setStatus("Shipping");
        setDisabled(true);
        break;
      case "completed":
        setStatus("Success");
        setAction("Feedback");
        break;
      case "cancel":
        setStatus("Cancelation");
        setDisabled(true);
        break;
    }
    if (orderInfo.star !== null) {
      setStatus("Rated");
    }
  };
  useEffect(() => {
    renderStatus();
  }, []);

  function handleOpenDialog() {
    if (action === "Feedback") {
      setOpenFb(true);
    } else if (action === "Cancel") {
      setOpenCancel(true);
    }
  }

  const handleRate = (e) => {
    e.preventDefault();
    setRate(e.target.value);
  };

  const handleAction = async (e) => {
    e.preventDefault();
    if (action === "Feedback") {
      var inputRate = Number(rate);
      var inputCmt = document.getElementById("comment").value;
      const feedback = {
        id: orderInfo.id,
        feedback: inputCmt,
        star: inputRate,
      };
      console.log(feedback);

      try {
        const response = await axios.put(
          "http://103.77.173.109:9000/index.php/feedback",
          feedback
        );
        console.log(response.status, response.data);
        getData();
        setOpenFb(false);
      } catch (err) {
        console.log(err);
        setMsg(err);
      }
    } else if (action === "Cancel") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        id: orderInfo.id,
      });
      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const res = await fetch(
        "http://103.77.173.109:9000/index.php/order",
        requestOptions
      );
      const json = await res.json();
      if (json.result === "success") {
        console.log(res.status);
        getData();
        setOpenCancel(false);
      } else if (json.result === "fail") {
        setMsg(json.message);
      }
    }
  };
  function handleClose() {
    setOpenFb(false);
    setOpenCancel(false);
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
            <button className="action-btn" onClick={handleOpenDialog}>
              {action}
            </button>
          )}
        </td>
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

      {/* Feedback Dialog */}
      <Dialog
        open={openFb}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          My Feedback
        </DialogTitle>
        <DialogContent style={{ width: "300px", height: "270px" }}>
          <DialogContentText>Review stars</DialogContentText>
          <TextField
            id="rate"
            select
            label="Rating"
            defaultValue="5"
            value={rate}
            onChange={handleRate}
            helperText="Please select the number of stars"
            style={{ marginTop: "10px" }}
          >
            {stars.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <DialogContentText style={{ marginTop: "30px" }}>
            Feedback
          </DialogContentText>
          <TextField
            id="comment"
            label="Comment"
            multiline
            maxRows={4}
            style={{ width: "220px", marginTop: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAction}>Save</Button>
        </DialogActions>
        <DialogContentText>{msg}</DialogContentText>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog
        open={openCancel}
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

export default PurRow;
