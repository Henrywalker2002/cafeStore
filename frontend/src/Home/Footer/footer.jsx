import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Cusfooter(props) {
  const [open, setOpen] = useState(false);
  const [mess, setMess] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function editInfor() {
    var phone = document.getElementById('phone').value 
    var email = document.getElementById('email').value 
    var timeOpen = document.getElementById('timeOpen').value 
    var timeClose = document.getElementById('timeClose').value 
    var banner = document.getElementById('banner').value 
    var address = document.getElementById('address').value 
    console.log(timeOpen)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "phone": phone,
      "email": email,
      "timeOpen": timeOpen,
      "timeClose": timeClose,
      "banner": banner,
      "address": address
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const res = await fetch("http://103.77.173.109:9000/index.php/infor", requestOptions)
    const json = await res.json()
    if (json.result === "success") {
      window.location.reload();
    }
    else {
      setMess(json.mess)
    }
    
  }

  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted footer'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
      
    <div>
      {localStorage.getItem('type') === "admin" ?       
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit information
      </Button> : null}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter information which you want to change
          </DialogContentText>
          <TextField autoFocus margin="dense" id="email" label="Email Address" type="email" fullWidth variant="standard" defaultValue={props.email} />
          <TextField autoFocus margin="dense" id="phone" label="Phone Number" type="text" fullWidth variant="standard" defaultValue={props.phone} />
          <TextField autoFocus margin="dense" id="timeOpen" label="Time Open" type="time" fullWidth variant="standard" defaultValue={props.timeOpen} />
          <TextField autoFocus margin="dense" id="timeClose" label="Time Close" type="time" fullWidth variant="standard" defaultValue={props.timeClose} />
          <TextField autoFocus margin="dense" id="banner" label="Slogan" type="text" fullWidth variant="standard" defaultValue={props.banner} />
          <TextField autoFocus margin="dense" id="address" label="Address" type="text" fullWidth variant="standard" defaultValue={props.address} />
          <DialogContentText>
            {mess}
          </DialogContentText>
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

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                Cafe store
              </h6>
              <p>
                {props.banner}
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              {/* <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Laravel
                </a>
              </p> */}
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              {/* <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p> */}
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                {props.address}
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                {props.email}
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> {props.phone}
              </p>

            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright: 
        <a className='text-reset fw-bold' href= '/'>
        cafestore.henrywalker.online
        </a>
      </div>
    </MDBFooter>
  );
}