import * as React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Edit_staff.css";
import Header from "../../Components/Header/Header";

function Edit_staff() {
  const location = useLocation();
  const staff = location.state;
  const navigate = useNavigate();

  // show edit-session
  const [showEdit, setShowEdit] = React.useState(false);
  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  // updated staff obj
  const [updatedInfo, setUpdatedInfo] = React.useState({
    username: staff.username,
    name: staff.name,
    email: staff.email,
    birthday: staff.birthday,
  });

  const handleInput = (e) => {
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
  };
  console.log(updatedInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://103.77.173.109:9000/index.php/account",
        updatedInfo
      );
      console.log(response.status, response.data);
      navigate("/admin/acc-list");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="staff-profile-title">
        <h1 className="staff-profile-content-title">Staff Profile</h1>
        <FaRegUserCircle id="staffInfo-icon" />
      </div>

      <div
        className="detailed-info"
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "50%",
          marginTop: "18px",
          marginBottom: "18px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Avatar
          alt="staff-avatar"
          src={staff.avt}
          sx={{ width: 100, height: 100 }}
        />
        <div>
          <h3>{staff.username}</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "120%",
              marginTop: "20px",
            }}
          >
            <h6>{staff.phone}</h6>
            <h6>{staff.address ? staff.address : "No address"}</h6>
            <h6>{staff.startDate}</h6>
          </div>
          <Button
            variant="outlined"
            sx={{
              marginTop: "20px",
              color: "#a1570d",
              borderColor: "#a1570d",
              "&:hover": {
                backgroundColor: "rgba(255, 211, 145, 0.62)",
                borderColor: "#a1570d",
              },
            }}
            onClick={handleShowEdit}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            sx={{
              marginLeft: "15px",
              marginTop: "20px",
              backgroundColor: "#a1570d",
              "&:hover": {
                backgroundColor: "#e47b11",
              },
            }}
            onClick={() => {
              navigate("/admin/acc-list");
            }}
          >
            Back
          </Button>
        </div>
      </div>
      {showEdit && (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 4, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
          className="staffInfo-form"
        >
          <div className="input-row" id="first-row">
            <TextField
              disabled
              helperText="Admin can't change!"
              label="Username"
              name="username"
              defaultValue={staff.username}
              variant="standard"
            />
            <TextField
              // required
              // id="standard-required"
              label="Full name"
              name="name"
              variant="standard"
              onChange={handleInput}
              defaultValue={staff.name}
            />
          </div>
          <div className="input-row">
            <TextField
              // id="email"
              type="email"
              label="Email"
              name="email"
              variant="standard"
              onChange={handleInput}
              defaultValue={staff.email}
            />
            <TextField
              label="Birthday"
              name="birthday"
              variant="standard"
              onChange={handleInput}
              defaultValue={staff.birthday}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            //   fullWidth="true"
            size="large"
            id="update-btn"
            //   color="success"
            onClick={handleSubmit}
          >
            Update Information
          </Button>
        </Box>
      )}
    </div>
  );
}

export default Edit_staff;
