import { createElement, useEffect, useState } from "react"
import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {MdRestaurantMenu} from 'react-icons/md'
import './Menu_management.css'
import Header from '../../Components/Header/Header'
import Title from '../../Components/Title/Title'
import {BiImageAdd} from 'react-icons/bi'
import TypeNav from "./TypeNav";
import title from "./purchase_title.png"


var elementEdit = {};
var deleteId = 0;

function Purchase() {
    const [open, setOpen] = useState(false);
    const [testList, setTestList] = useState([]);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [messageDelete, setMessageDelete] = useState('');
    // decl for add new drink
    const [addMessage, setAddMessage] = useState('');
    const [failMessage, setFailMessage] = useState(false);
    // show Form to add New Product
    const [showForm, setShowForm] = useState(false);
    const handleAddForm = () => {
        setShowForm(!showForm);
      }

    async function getData() { 
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        const res = await fetch("http://103.77.173.109:9000/index.php/drink", requestOptions);
        const response = await res.json()
        setTestList(response.message)
    }

    useEffect(() => {
        getData()
    } , [])


    var trls = testList.map(element => {
        var thname = createElement("td", {className: "menu-list-td"}, element.name);
        var thprice = createElement("td", {className: "menu-list-td"}, element.price);
        var image = createElement("img", {className : "image", "src" : element.image}, );
        var thimage = createElement("td", {className: "menu-list-td"}, image);
        
        var editIcon = createElement("img",{className:"icon", src: 'https://cdn-icons-png.flaticon.com/512/860/860814.png', style: {width: 20, height:20}, onClick : handleEdit });
        var delIcon = createElement("img",{className:"icon", src: 'https://cdn-icons-png.flaticon.com/512/3405/3405244.png', style: {width: 20, height:20}, onClick : showdialog });
        var delBtn = createElement("td", {className: "menu-list-td"},editIcon, delIcon);

        function showdialog () {
            deleteId = element.id
            setOpenConfirm(true);
        }

        function handleEdit() {
            elementEdit = element;
            console.log(elementEdit.name);
            setOpen(true);
            setName(element.name);
            setPrice(element.price);
        }

        var tr = createElement("tr" , {className : [element.id, "menu-list-tr"]}, [thimage, thname, thprice, delBtn]);
        return tr;
    });

    async function handleDelete() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": deleteId
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const res = await fetch("http://103.77.173.109:9000/index.php/drink", requestOptions);
        const json = await res.json();
        if (json.result === "success") {
            setOpenConfirm(false)
        }
        else if (json.result  === "fail") {
            setMessageDelete(json.message);
        }
        else {
            setMessageDelete("something went wrong, please reload page");
        }
        getData();
    }

    function handleClose() {
        setOpen(false);
        setMessage('');
        setOpenConfirm(false);
        setFailMessage(false);
        setMessageDelete('');
        setMessage('');
    }

    async function handleSubmit() {
        var inputFile = document.getElementById('file').files;
        var id = elementEdit.id;

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        if ( inputFile.length === 1) {
            inputFile = inputFile[0];
            var reader = new FileReader();

            reader.onload = async function () {

                var raw = JSON.stringify({
                    "name": name,
                    "price": price,
                    "description": "no description",
                    "id": id,
                    "image": reader.result
                });

                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
        
                const res = await fetch("http://103.77.173.109:9000/index.php/drink", requestOptions)
                const json = await res.json();
                if (json.result === 'success') {
                    handleClose()
                } 
                else {
                    setMessage(json.message)
                }

            }
            reader.readAsDataURL(inputFile);
        }
        else {
            var raw = JSON.stringify({
                "name": name,
                "price": price,
                "description": "no description",
                "id": id,
                "image": ''
            });

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            const res = await fetch("http://103.77.173.109:9000/index.php/drink", requestOptions)
            const json = await res.json();
            if (json.result === 'success') {
                handleClose()
            } 
            else {
                setMessage(json.message)
            }
        }
        getData();
    }

    async function addDrink() {
        var inputFile = document.getElementById('newDrink').files;
        var name = document.getElementById('name').value
        var price = Number(document.getElementById('price').value)
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        if (inputFile.length === 1) {
            inputFile = inputFile[0];
            var reader = new FileReader();

            reader.onload = async () => {
                var raw = JSON.stringify({
                    "name": name,
                    "price": price,
                    "description": "no description",
                    "image": reader.result
                });

        
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                const res = await fetch("http://103.77.173.109:9000/index.php/drink", requestOptions);
                const json = await res.json()
                if (json.result === "success") {
                    getData();
                }
                else {
                    setFailMessage(true)
                    if (json.result === "fail") {
                        setAddMessage(json.message)
                    }
                    else {
                        setAddMessage("something went wrong, please reload page")
                    }
                }
            }

            reader.readAsDataURL(inputFile);
        }
        else {
            inputFile = inputFile[0];
            var reader = new FileReader();
            var raw = JSON.stringify({
                "name": name,
                "price": price,
                "description": "no description",
                "image": ""
            });
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const res = await fetch("http://103.77.173.109:9000/index.php/drink", requestOptions);
            const json = await res.json()
            if (json.result === "success") {
                getData();
            }
            else {
                setFailMessage(true)
                if (json.result === "fail") {
                    setAddMessage(json.message)
                }
                else {
                    setAddMessage("something went wrong, please reload page")
                }
            }
        }
    }

    return (
        <div className="menu-list">
            <Header/>
            <img src={title} alt="purchase-title"></img>
            <TypeNav/>
            <table class="menu-table">
                <thead className='menu-list-thead'>
                    <th className='menu-list-th'>ORDER NUMBER</th>
                    <th className='menu-list-th'>DATE</th>
                    <th className='menu-list-th'>STATUS</th>
                    <th className='menu-list-th'>TOTAL</th>
                    <th className='menu-list-th'>ACTION</th>
                    <th></th>
                </thead>
                <tbody className="menu-list-tbody">
                    {trls}
                    {showForm && (
                        <tr className="menu-list-tr add-form">
                            {/* <td className="menu-list-td"><input type="file" name="newDrink" id="newDrink" /></td> */}
                            <td className="menu-list-td"><label class="custom-file-upload">
                                <input type="file" name="newDrink" id="newDrink" />
                                <BiImageAdd/> Upload Product Image
                            </label></td>
                            <td className="menu-list-td"><input type="text" name="name" id="name" placeholder="Drink name"  /></td>
                            <td className="menu-list-td"><input type="number" name="price" id="price" placeholder="price" /></td>
                            <td className="menu-list-td"><button type="submit" className="addBtn" onClick={addDrink}>Add</button></td>
                        </tr>
                    )}
                </tbody>
            </table>  

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill information change
                    </DialogContentText>

                    <TextField
                        autoFocus margin="dense" id="name" label="Name" type="text"
                        fullWidth variant="standard" defaultValue = {elementEdit.name} onInput = {e => setName(e.target.value)}
                    />

                    <TextField
                        autoFocus margin="dense" id="price" label="Price" type="number"
                        fullWidth variant="standard" defaultValue = {elementEdit.price} onInput = {e => setPrice(e.target.value)}
                    />
                    <label htmlFor="file"> Image</label>
                    <div>
                        <input type="file" name="file" id="file" />
                    </div>

                    <DialogContentText>
                        {message}
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openConfirm} onClose={handleClose} aria-labelledby="draggable-dialog-title">
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Subscribe
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Are you sure to delete this drink ? 
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
                <DialogContentText>
                    {messageDelete}
                </DialogContentText>
            </Dialog>

            <Dialog
                open={failMessage}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Error: "}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {addMessage}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Purchase;