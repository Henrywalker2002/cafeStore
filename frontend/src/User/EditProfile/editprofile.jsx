import './editprofile.css'
import title from './edit_logo.png'
import { useEffect, useState } from "react"
import Header from "../../Components/Header/Header";
import Table from 'react-bootstrap/Table';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";

function EditProfile(props) {
    const [userInfo, setUserInfo] = useState({});
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [address, setAddress] = useState("");
    const [errorMessages, setErrorMessages] = useState("");
    const [renderErrorMessage, setRenderErrorMessage] = useState(<div></div>);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [changepage, setChangepage] = useState(false)
    
    const [username, setItems] = useState("");

    useEffect(() => {
        const user = localStorage.getItem('username');
        if (user) {
            setItems(user);
            console.log(user)
        }
    }, []);

    // User Login info
    const handleChangeFull = event => {
        setFullname(event.target.value);
    }

    const handleChangeEmail = event => {
        setEmail(event.target.value);
    }

    const handleChangePhone = event => {
        setPhone(event.target.value);
    }

    const handleChangeBirthday = event => {
        setBirthday(event.target.value);
    }

    const handleChangeAddress = event => {
        setAddress(event.target.value);
    }

    function handleClose() {
        setOpenConfirm(false);
        setErrorMessages('');
    }

    function showdialog() {
        setOpenConfirm(true);
    }

    async function handleSubmit(event) {
        //Prevent page reload
        event.preventDefault();
        var raw = JSON.stringify({
            "username": username,
            "email" : email,
            "birthday" : birthday,
            "name" : fullname,
            "phone" : phone,
            "address" : address,
        });

        var requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: raw,
            redirect: 'follow'
        };

        console.log(requestOptions)

        const res = await fetch("http://103.77.173.109:9000/index.php/account", requestOptions);
        const json = await res.json()
        console.log(raw)
        console.log(json)
        if (json.result === "success") {
            setErrorMessages("success!!")
            setChangepage(true)
        }
        else {
            setErrorMessages(json.message)
        }
        setOpenConfirm(false)
    };

    useEffect(() => {
        if (errorMessages !== "") {
            setRenderErrorMessage(<div className='errormessage'>{errorMessages}</div>)
        }
        else {
            setRenderErrorMessage(<div></div>)
        }
    } , [errorMessages, setRenderErrorMessage])

    useEffect(() => {
        async function getUser() {
            var url = "http://103.77.173.109:9000/index.php/account?username=" + String(username)
    
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            const res = await fetch(url, requestOptions);
            const response = await res.json()

            setUserInfo(response.message)        
        }
        getUser()
    } , [userInfo, username])

    return (
        <div>
            <Header />
            <div className='editprofile' >
                <img src={title} alt="Edit logo"></img>
                <form onSubmit={handleSubmit}>
                    <Table className="editprofile-table" style={{textAlign: "left"}}>
                        <tbody>
                            <tr>
                                <td>
                                    <label>Username</label><br/>
                                    <input type="text" id="fname" name="fname" value={username} disabled/>
                                </td>
                                <td>
                                    <label>Last name</label><br/>
                                    <input type="text" id="fullname" name="fullname" defaultValue={userInfo.name} required onChange={handleChangeFull}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Email</label><br/>
                                    <input type="text" id="email" name="email" defaultValue={userInfo.email} required placeholder="abc@gmail.com" onChange={handleChangeEmail}/>
                                </td>
                                <td>
                                    <label>Phone number</label><br/>
                                    <input type="text" id="phone" name="phone" defaultValue={userInfo.phone} required placeholder="0123456789" onChange={handleChangePhone}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Birthday</label><br/>
                                    <input type="text" id="birthday" name="birthday" defaultValue={userInfo.birthday} required placeholder="2000/01/01" onChange={handleChangeBirthday}/>
                                </td>
                                <td>
                                    <label>Address</label><br/>
                                    <input type="text" id="address" name="address" defaultValue={userInfo.address} required onChange={handleChangeAddress}/>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    
                    {renderErrorMessage}
                    <Dialog open={openConfirm} onClose={handleClose} aria-labelledby="draggable-dialog-title">
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                            Subscribe
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Are you sure to change your profile ? 
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                No
                            </Button>
                            <Button onClick={handleSubmit}>Yes</Button>
                        </DialogActions>
                        <DialogContentText>
                            {errorMessages}
                        </DialogContentText>
                    </Dialog>
                </form>
                <button className='editprofile-button' onClick={showdialog}>Change</button>
            </div>
            <Dialog  open={changepage}>
                <Navigate to='/user/product'/>
            </Dialog>
        </div>
    );
}

export default EditProfile;