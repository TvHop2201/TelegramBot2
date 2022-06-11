import Dashboard from './component/dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/login/Login';
import Register from './component/register/Register';
import Admin from './component/admin/Admin';
import ADashboard from './component/admin/dashboard/DashBoard'
import User from './component/admin/user/User';
import Point from './component/admin/point/Point';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='admin' element={<Admin />} >
          <Route path='' element={<ADashboard />} />
          <Route path='user' element={<User />} />
          <Route path='point' element={<Point />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
