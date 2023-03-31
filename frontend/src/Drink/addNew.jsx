import { createElement, useEffect, useState } from "react"
import './drink.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

var elementEdit = {};
var deleteId = 0;

function DrinkList() {
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

    async function getData() { 
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        const res = await fetch("http://103.77.173.109/index.php/drink", requestOptions);
        const response = await res.json()
        setTestList(response.message)
    }

    useEffect(() => {
        getData()
    } , [])

    var trls = testList.map(element => {
        var thname = createElement("td", null, element.name);
        var thprice = createElement("td", null, element.price);
        var image = createElement("img", {className : "image", "src" : element.image}, );
        var thimage = createElement("td", null, image);
        
        var btn = createElement("button", {onClick : handleEdit }, "edit");
        var btnDel = createElement("button", {onClick : showdialog }, "delete");

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

        var tr = createElement("tr" , {className : [element.id, "infor-row"]}, [thimage, thname, thprice, btn, btnDel]);
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

        const res = await fetch("http://103.77.173.109/index.php/drink", requestOptions);
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

    async function handdleSubmit() {
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
        
                const res = await fetch("http://103.77.173.109/index.php/drink", requestOptions)
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
    
            const res = await fetch("http://103.77.173.109/index.php/drink", requestOptions)
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

                const res = await fetch("http://103.77.173.109/index.php/drink", requestOptions);
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

            const res = await fetch("http://103.77.173.109/index.php/drink", requestOptions);
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
        <div>
            <table class="drink-list">
                <thead className='order-list-thead'>
                <th className='order-list-th'>IMAGE</th>
                <th className='order-list-th'>NAME</th>
                <th className='order-list-th'>PRICE</th>
                <th></th>
                <th></th>
            </thead>
            <tbody>
                {trls}
                <tr>
                    <td><input type="file" name="newDrink" id="newDrink" /></td>
                    <td><input type="text" name="name" id="name" placeholder="Drink name"  /></td>
                    <td><input type="number" name="price" id="price" placeholder="price" /></td>
                    <button type="submit" onClick={addDrink}>add</button>
                </tr>
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
                    <Button onClick={handdleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openConfirm}
                onClose={handleClose}

                aria-labelledby="draggable-dialog-title"
            >
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

export default DrinkList;