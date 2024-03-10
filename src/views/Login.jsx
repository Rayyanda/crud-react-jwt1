import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../Api";
import Loading from "../components/Loading";

export default function Login() {

    //define  state variables for username and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //define loading view
    const [loading, setLoading] = useState(false);

    //define a validation
    const [validation, setValidation] = useState([]);

    //define  the navigate hook to redirect after login
    const navigate = useNavigate();

    //handle input email
    // const handleInputChange = (e) =>
    // {
    //     const newValue = e.target.value;
    //     setEmail(newValue);
    //     console.log(email);
    //     setValidation(newValue.trim() !== '')
    // }


    //make login handler
    const loginHandler = async (e) => {
        e.preventDefault();

        setLoading(true)

        //define form
        const formData = new FormData();

        //add data form
        formData.append('email', email);
        formData.append('password', password);

        //console.log(formData);
        //sending data
        await Api.post('/api/login', formData)
            .then((response) => {

                console.log(response)
                //set token if  response is ok
                localStorage.setItem("token", response.data.token);
                
                //redirect user in home page
                navigate('/');

            })
            .catch((error) => {

                //assign error information
                setValidation(error.response.data)
            })
            setLoading(false)
    }

    useEffect(() => {

        if (localStorage.getItem("token")) {
            navigate('/');
        }

    }, [])

    return (
        <>
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header">
                                            <h3 className="text-center font-weight-light my-4">Login</h3>
                                        </div>
                                        <div className="card-body">
                                            {
                                                validation.message && (
                                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                                        {validation.message}
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>
                                                )
                                            }
                                            <form onSubmit={loginHandler} >
                                                <div className="form-floating mb-3">
                                                    <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="inputEmail" type="email" placeholder="name@example.com" />
                                                    <label htmlFor="inputEmail">Email address</label>
                                                    {
                                                        validation.email && (
                                                            <small className="text-danger" >{validation.email[0]}</small>
                                                        )
                                                    }
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="inputPassword" type="password" placeholder="Password" />
                                                    <label htmlFor="inputPassword">Password</label>
                                                    {
                                                        validation.password && (
                                                            <small className="text-danger" >{validation.password[0]}</small>
                                                        )
                                                    }
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <a className="small" href="password.html">Forgot Password?</a>
                                                    <button type="submit" className="btn btn-primary" >
                                                        {
                                                            loading ? <Loading /> : 'Login' 
                                                        }
                                                        
                                                    </button>
                                                    
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="small">
                                                <Link to={'/register'} >Need  an account? Sign up!</Link>

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