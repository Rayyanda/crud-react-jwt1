import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Api from "../Api";

export default function Register() {

    //definisi state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirPassword, setConfirmPassword] = useState('');

    //definisi untuk validasi
    const [validation, setValidation] = useState([]);

    //definisi navigasi
    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', confirPassword);

        await Api.post('/api/register', formData)
            .then(() => {

                //redirect ke dashboard
                navigate('/');
            })
            .catch((error) => {
                setValidation(error.response.data);
            })
    }

    const handleValidation = (e,target) =>
    {
        setEmail(e.target.value)
        
    }

    

    return (
        <>
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={registerHandler} >
                                                <div className="row mb-3">
                                                    <div className="col-md-12">
                                                        <div className="form-floating mb-3 mb-md-0">
                                                            <input className="form-control" id="inputFirstName" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your first name" />
                                                            <label htmlFor="inputFirstName">Your Name</label>
                                                        </div>
                                                        {
                                                            validation.name && (
                                                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                                    {validation.name[0]}
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className={validation.email ? "form-control is-invalid" : "form-control"} id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" />
                                                    <label htmlFor="inputEmail">Email address</label>
                                                    {
                                                            validation.email && (
                                                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                                     <small> {validation.email[0]}</small>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                                </div>
                                                            )
                                                        }
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <div className="form-floating mb-3 mb-md-0">
                                                            <input className="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Create a password" />
                                                            <label htmlFor="inputPassword">Password</label>
                                                        </div>
                                                        {
                                                            validation.password && (
                                                                <div className="alert alert-danger">
                                                                    {validation.password[0]}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-floating mb-3 mb-md-0">
                                                            <input className="form-control" id="inputPasswordConfirm" value={confirPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" placeholder="Confirm password" />
                                                            <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                                                        </div>
                                                        {
                                                            validation.password_confirmation && (
                                                                <div className="alert alert-danger">
                                                                    {validation.password_confirmation[0]}
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="mt-4 mb-0">
                                                    <div className="d-grid">
                                                        <button type="submit" className="btn btn-primary btn-block" >Create Account</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="small">
                                                <Link to={'/'} >Have an account? Go to login!</Link>
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Your Website 2023</div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}