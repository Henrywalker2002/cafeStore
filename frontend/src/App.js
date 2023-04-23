import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import OrderList from './Staff/OrderList/OrderList'
import Menu_management from './Admin/Menu_management/Menu_management';
import Account_list from './Admin/Account_list/Account_list';
import Edit_staff from './Admin/Account_list/Edit_staff';
import Add_staff from './Admin/Account_list/Add_staff';
import Purchase from './User/purchase/Purchase';

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
            </Routes>
          </Router>
    </div>
  );
}

export default App;
