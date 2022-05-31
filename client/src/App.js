import Dashboard from './component/dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/login/Login';
import Register from './component/register/Register';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
