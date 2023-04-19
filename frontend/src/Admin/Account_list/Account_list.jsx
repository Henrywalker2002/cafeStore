import React, { useState, useEffect, createElement } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Header from "../../Components/Header/Header";
import Title from "../../Components/Title/Title";
import "./Account_list.css";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

var deleteId = 0;

function Account_list() {
  const navigate = useNavigate();
  // mảng danh sách tài khoản staff
  const [staffList, setStaffList] = useState([]);
  // handle delete Dialog
  const [openDel, setOpenDel] = useState(false);
  const [messageDelete, setMessageDelete] = useState("");
  // handle show create-account button
  const [showBtn, setShowBtn] = useState(false);
  const handleShowBtn = (state) => {
    setShowBtn(state);
  };

  // Fetch API
  async function getData() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const res = await fetch(
      "http://103.77.173.109:9000/index.php/staff",
      requestOptions
    );
    const response = await res.json();
    setStaffList(response.message);
  }

  useEffect(() => {
    getData();
  }, []);

  var staffAcc = staffList.map((element) => {
    var td_username = createElement(
      "td",
      { className: "account-list-td" },
      element.username
    );
    var td_fullname = createElement(
      "td",
      { className: "account-list-td" },
      element.name
    );
    var td_phone = createElement(
      "td",
      { className: "account-list-td" },
      element.phone
    );
    var td_address = createElement(
      "td",
      { className: "account-list-td" },
      element.email
    );
    var td_startdate = createElement(
      "td",
      { className: "account-list-td" },
      element.birthday
    );

    var editIcon = createElement("img", {
      className: "icon",
      src: "https://cdn-icons-png.flaticon.com/512/860/860814.png",
      style: { width: 20, height: 20 },
      onClick: handleEdit,
    });
    var delIcon = createElement("img", {
      className: "icon",
      src: "https://cdn-icons-png.flaticon.com/512/3405/3405244.png",
      style: { width: 20, height: 20 },
      onClick: handleDelDialog,
    });
    var actionBtn = createElement(
      "td",
      { className: "account-list-td" },
      editIcon,
      delIcon
    );

    function handleDelDialog() {
      deleteId = element.username;
      setOpenDel(true);
    }

    function handleEdit() {
      console.log(element);
      navigate("/admin/acc-list/edit-staff", { state: element });
    }

    var tr = createElement(
      "tr",
      { className: [element.id, "account-list-tr"] },
      [td_username, td_fullname, td_phone, td_address, td_startdate, actionBtn]
    );
    return tr;
  });

  async function handleDelete() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: deleteId,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const res = await fetch(
      "http://103.77.173.109:9000/index.php/account",
      requestOptions
    );
    const json = await res.json();
    if (json.result === "success") {
      setOpenDel(false);
    } else if (json.result === "fail") {
      setMessageDelete(json.message);
    } else {
      setMessageDelete("something went wrong, please reload page");
    }
    getData();
  }
  function handleClose() {
    setOpenDel(false);
  }

  return (
    <div className="account-list">
      <Header />
      <Title
        title="Account Management"
        icon={<MdOutlineManageAccounts className="title-icon" />}
      />
      <div className="searchBar">
        <input type="text" placeholder="Search" className="search-list-box" />
        <button className="search-btn">
          <FiSearch />
        </button>
        {showBtn && (
          <button
            className="addItem-btn"
            onClick={() => {
              navigate("/admin/acc-list/addStaff");
            }}
          >
            + Create Account
          </button>
        )}
      </div>
      <Navbar className="type-nav" bg="#F6EBDA">
        <Container className="type-nav-container">
          <Nav className="type-list">
            <Nav.Link
              className="type"
              href="#staff"
              onClick={() => handleShowBtn(true)}
            >
              Staff
            </Nav.Link>
            <Nav.Link
              className="type"
              href="#user"
              onClick={() => handleShowBtn(false)}
            >
              User
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <table class="account-table">
        <thead className="account-list-thead">
          <th className="account-list-th">USERNAME</th>
          <th className="account-list-th">FULLNAME</th>
          <th className="account-list-th">PHONE NUMBER</th>
          <th className="account-list-th">ADDRESS</th>
          <th className="account-list-th">START DATE</th>
          <th></th>
        </thead>
        <tbody className="account-list-tbody">{staffAcc}</tbody>
      </table>

      <Dialog
        open={openDel}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this account ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
        <DialogContentText>{messageDelete}</DialogContentText>
      </Dialog>
    </div>
  );
}

export default Account_list;
