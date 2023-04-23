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

import NotFound from './NotFound/NotFound';

import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie] = useCookies(['username', 'type']);

  return (
    <div className="App">
      
      <Router>
            <Routes>

              <Route exact path='/user/purchase' element={< Purchase/>} />
              <Route exact path='/admin/acc-list' element={localStorage.getItem('type') == "admin" ? <Account_list/> : <NotFound/>} />
              <Route path='/admin/acc-list/edit-staff'  element={localStorage.getItem('type') == "admin" ? < Edit_staff/> : <NotFound />} />
              <Route exact path='/staff/order-list' element={localStorage.getItem('type') == "admin" ? < OrderList/>  : <NotFound />} />
              <Route path='/admin/acc-list/addStaff' element={localStorage.getItem('type') == "admin" ? < Add_staff/> : <NotFound />} />
              <Route path='/admin/menu' element={localStorage.getItem('type') == "admin" ? < Menu_management/> : <NotFound />} />
              <Route exact path='/admin/acc-list' element={localStorage.getItem('type') == "admin" ?<Account_list/>  : <NotFound />} />
              <Route exact path='/admin/acc-list/edit-staff' element={localStorage.getItem('type') == "admin"? < Edit_staff/>  : <NotFound />} />
              <Route exact path='/staff/order-list' element={localStorage.getItem('type') == "staff"? < OrderList/>  : <NotFound />} />
              <Route path='/admin/acc-list/addStaff' element={localStorage.getItem('type') == "admin"? < Add_staff/> : <NotFound />} />
              <Route path='/admin/menu' element={localStorage.getItem('type') == "admin"? < Menu_management/> : <NotFound />} />

              <Route path='/client/login' element={< Login/>} />
              <Route path='/client/signup' element={< Signup/>} />

              <Route path='/user/product' element={< Product/> } />
              <Route path='/user/cart' element={localStorage.getItem('type') == "user"? < Cart/> : <NotFound />} />
              <Route path='/user/edit' element={localStorage.getItem('type') == "user"? < EditProfile/> : <NotFound />} />
              <Route path='/user/order' element={localStorage.getItem('type') == "user"? < Order/>: <NotFound />} />
              <Route path='/user/purchase' element={ localStorage.getItem('type') == "user"?< Purchase/>: <NotFound />} />

              <Route path='/' element={< Home/>} />
              <Route path='/user/logout' element={< Logout/>} />
              <Route path='/admin/report' element = {localStorage.getItem('type') == "admin" ? <Report /> : <NotFound />} />

              <Route path='*' element = {<NotFound />} />

            </Routes>
          </Router>
    </div>
  );
}

export default App;
