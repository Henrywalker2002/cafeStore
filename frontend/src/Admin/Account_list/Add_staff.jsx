import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../../Components/Header/Header";

function Add_staff() {
  const navigate = useNavigate();
  // updated staff obj
  const [staffInfo, setStaffInfo] = React.useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    birthday: "",
    address: "",
  });
  const handleInput = (e) => {
    setStaffInfo({ ...staffInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://103.77.173.109:9000/index.php/staff",
        staffInfo
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
            required
            label="Username"
            name="username"
            // defaultValue={staff.username}
            variant="standard"
            onChange={handleInput}
          />
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            // autoComplete="current-password"
            variant="standard"
            onChange={handleInput}
          />
        </div>
        <div className="input-row">
          <TextField
            required
            label="Full name"
            name="name"
            // defaultValue={fullname}
            variant="standard"
            onChange={handleInput}
          />
          <TextField
            type="email"
            label="Email"
            name="email"
            // defaultValue={email}
            variant="standard"
            onChange={handleInput}
          />
        </div>
        <div className="input-row">
          <TextField
            required
            label="Phone number"
            name="phone"
            // defaultValue={phone}
            variant="standard"
            onChange={handleInput}
          />
          <TextField
            label="Birthday"
            name="birthday"
            // defaultValue={birthday}
            variant="standard"
            onChange={handleInput}
          />
        </div>
        <div className="input-row">
          <TextField
            label="Address"
            name="address"
            variant="standard"
            onChange={handleInput}
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
          Create Account
        </Button>
      </Box>
    </div>
  );
}

export default Add_staff;
