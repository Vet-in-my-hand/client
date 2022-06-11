import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HospitalRegister from './components/auth/hospitalRegister';
import UserRegister from './components/auth/userRegister';
import Login from './components/auth/login';
import Register from './components/auth/register';
import UserMain from './components/user/userMain';
import HospitalMain from './components/hospital/hospitalMain';
import ReserveList from './components/reserve/reserveList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='hospital/register' element={<HospitalRegister />}></Route>
          <Route path='user/register' element={<UserRegister />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/user/main' element={<UserMain />}></Route>
          <Route path='/hospital/main' element={<HospitalMain />}></Route>
          <Route path='/hospital/reserve' element={<ReserveList />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
