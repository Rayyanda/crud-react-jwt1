import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Api from "../Api";

export default function TopNav({handleLogout})
{
    
    const navigate = useNavigate();

    const token = localStorage.getItem("token");  // get the token from local storage if it

    
    

    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            
            <Link to={'/dashboard'} className="navbar-brand ps-3" >Mine</Link>
           
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
           
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" id="searchBar" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                </div>
            </form>
           
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li>
                            <Link className="dropdown-item" to={"/settings"} >Settings</Link>
                        </li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <button className="dropdown-item" onClick={handleLogout} >Logout</button>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        </>
    )
}