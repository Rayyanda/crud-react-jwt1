import { Route, Routes } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";
import SideNav from "../components/SideNav";
import Dashboard from "../views/Dashboard";
import Mahasiswa from "../views/Mahasiswa";
import NewMhs from "../views/mahasiswa/NewMhs";
import UpdateMhs from "../views/mahasiswa/UpdateMhs";

export default function RoutesIndex()
{
    return (
        <Routes>
            <Route path="/login"  element={<Login />}/>

            <Route path="/register" element={<Register/>} />

            <Route path="/"  element={<SideNav content={<Dashboard/>} />}/>

            <Route path="/mahasiswa"  element={<SideNav content={<Mahasiswa/>} />}/>

            <Route path="/mahasiswa/new"  element={<SideNav content={<NewMhs/>} />}/>

            <Route path="/mahasiswa/:uuid"  element={<SideNav content={<UpdateMhs/>} />}/>
        </Routes>
    )
}