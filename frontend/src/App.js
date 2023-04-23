import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import OrderList from './Staff/OrderList/OrderList'
import Menu_management from './Admin/Menu_management/Menu_management';
import Account_list from './Admin/Account_list/Account_list';
import Edit_staff from './Admin/Account_list/Edit_staff';
import Add_staff from './Admin/Account_list/Add_staff';
import Purchase from './User/Purchase/Purchase';

import Login from './Client/Login/login';
import Signup from './Client/SignUp/signup';

import Product from './User/Product/product';
import Cart from './User/Cart/cart';
import EditProfile from './User/EditProfile/editprofile';
import Order from './User/Order/order';

import Home from './Home/index';
import Logout from './User/Logout/logout';
import Report from './Admin/Report/Report'

function App() {

  return (
    <div className="App">
      <Router>
            <Routes>
              <Route exact path='/user/purchase' element={< Purchase/>} />
              <Route exact path='/admin/acc-list' element={ <Account_list/>} />
              <Route path='/admin/acc-list/edit-staff' element={< Edit_staff/>} />
              <Route exact path='/staff/order-list' element={< OrderList/>} />
              <Route path='/admin/acc-list/addStaff' element={< Add_staff/>} />
              <Route path='/admin/menu' element={< Menu_management/>} />
              <Route exact path='/admin/acc-list' element={ <Account_list/>} />
              <Route exact path='/admin/acc-list/edit-staff' element={< Edit_staff/>} />
              <Route exact path='/staff/order-list' element={< OrderList/>} />
              <Route path='/admin/acc-list/addStaff' element={< Add_staff/>} />
              <Route path='/admin/menu' element={< Menu_management/>} />

              <Route path='/client/login' element={< Login/>} />
              <Route path='/client/signup' element={< Signup/>} />

              <Route path='/user/product' element={< Product/>} />
              <Route path='/user/cart' element={< Cart/>} />
              <Route path='/user/edit' element={< EditProfile/>} />
              <Route path='/user/order' element={< Order/>} />
              <Route path='/user/purchase' element={< Purchase/>} />

              <Route path='/' element={< Home/>} />
              <Route path='/user/logout' element={< Logout/>} />
              <Route path='/admin/report' element = {<Report />} />
            </Routes>
          </Router>
    </div>
  );
}

export default App;
