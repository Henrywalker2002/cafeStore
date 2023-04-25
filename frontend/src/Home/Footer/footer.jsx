import React from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./footer.css";

export default function Cusfooter(props) {
  const [open, setOpen] = useState(false);
  const [mess, setMess] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function editInfor() {
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var timeOpen = document.getElementById("timeOpen").value;
    var timeClose = document.getElementById("timeClose").value;
    var banner = document.getElementById("banner").value;
    var address = document.getElementById("address").value;
    console.log(timeOpen);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      phone: phone,
      email: email,
      timeOpen: timeOpen,
      timeClose: timeClose,
      banner: banner,
      address: address,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const res = await fetch(
      "http://103.77.173.109:9000/index.php/infor",
      requestOptions
    );
    const json = await res.json();
    if (json.result === "success") {
      window.location.reload();
    } else {
      setMess(json.mess);
    }
  }

  return (
    <MDBFooter
      bgColor="light"
      className="text-center text-lg-start text-muted footer"
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div>
          {localStorage.getItem("type") === "admin" ? (
            <Button variant="outlined" onClick={handleClickOpen}>
              Edit information
            </Button>
          ) : null}

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Change information</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter information which you want to change
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                defaultValue={props.email}
              />
              <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Phone Number"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={props.phone}
              />
              <TextField
                autoFocus
                margin="dense"
                id="timeOpen"
                label="Time Open"
                type="time"
                fullWidth
                variant="standard"
                defaultValue={props.timeOpen}
              />
              <TextField
                autoFocus
                margin="dense"
                id="timeClose"
                label="Time Close"
                type="time"
                fullWidth
                variant="standard"
                defaultValue={props.timeClose}
              />
              <TextField
                autoFocus
                margin="dense"
                id="banner"
                label="Slogan"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={props.banner}
              />
              <TextField
                autoFocus
                margin="dense"
                id="address"
                label="Address"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={props.address}
              />
              <DialogContentText>{mess}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={editInfor}>Subscribe</Button>
            </DialogActions>
          </Dialog>
        </div>

        {/* <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div> */}

        {/* <div>
          <a href='/' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div> */}
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <div className="footer-info">
          <h5>Cafe Street</h5>
          <p>{props.banner}</p>
          <div className="footer-contact">
            <p>
              <BsTelephoneFill
                style={{ marginRight: "5px", width: "13px", height: "13px" }}
              />
              {props.phone}
            </p>
            <p>
              <MdEmail
                style={{ marginRight: "5px", width: "17px", height: "17px" }}
              />
              {props.email}
            </p>
            <p>
              <AiFillHome
                style={{
                  marginRight: "5px",
                  width: "17px",
                  height: "17px",
                  verticalAlign: "text-top",
                }}
              />
              {props.address}
            </p>
          </div>
        </div>
        © 2023 Copyright:
        <a className="text-reset fw-bold" href="/">
          cafestore.henrywalker.online
        </a>
      </div>
    </MDBFooter>
  );
}
