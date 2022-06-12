import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HospitalRegister from './components/auth/hospitalRegister';
import UserRegister from './components/auth/userRegister';
import Login from './components/auth/login';
import Register from './components/auth/register';
import UserMain from './components/user/userMain';
import HospitalMain from './components/hospital/hospitalMain';
import ReserveList from './components/reserve/reserveList';
import CareList from './components/care/careList';
import MainCover from './components/cover/mainCover';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainCover />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/hospital/register' element={<HospitalRegister />}></Route>
          <Route path='/hospital/main' element={<HospitalMain />}></Route>
          <Route path='/hospital/reserve' element={<ReserveList />}></Route>
          <Route path='/hospital/care' element={<CareList />}></Route>
          <Route path='/user/register' element={<UserRegister />}></Route>
          <Route path='/user/main' element={<UserMain />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
