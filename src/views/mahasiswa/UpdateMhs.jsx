import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

export default function UpdateMhs() {

    //define  state for form input values and parameter id
    const [name, setName] = useState('');
    const [nim, setNim] = useState('');
    const [ttl, setTtl] = useState('');
    const [prodi_id, setProdiId] = useState(1);
    const [fakultas_id, setFakultasID] = useState(1);
    const [alamat, setAlamat] = useState('');
    const [email, setEmail] = useState('');
    const [jk, setJk] = useState('Laki-laki');

    //define params
    const { uuid } = useParams();

    //define state list  fakultas dan prodi
    const [listFakultas, setListFakultas] = useState([]);
    const [listProdi, setListProdi] = useState([]);

    //define validation
    const [validation, setValidation] = useState({});

    //
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    //fetch data program studi
    const fetchProdi = async () => {

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        if (fakultas_id === 0) {
            await axios.get('http://localhost:8000/api/jurusan')
                .then((response) => {

                    //set list jurusan
                    setListProdi(response.data.data);
                })

        } else {
            await axios.get(`http://localhost:8000/api/jurusan/${fakultas_id}`)
                .then((response) => {

                    //set list jurusan
                    setListProdi(response.data.data);
                })
        }
    }

    //fetch data fakultas
    const fetchFakultas = async () => {

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.get('http://localhost:8000/api/fakultas')

            .then((response) => {
                setListFakultas(response.data.data);
            });
    }

    //fecth data mahasiswa
    const fetchMhs = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.get(`http://localhost:8000/api/mhs/${uuid}`)
            .then((response) => {

                //console.log(response.data.data);
                //set the value to state
                setNim(response.data.data.nim);
                setName(response.data.data.nama);
                setEmail(response.data.data.email);
                setTtl(response.data.data.tanggal_lahir);
                setProdiId(response.data.data.prodi_id)
                setFakultasID(response.data.data.fakultas_id);
                setAlamat(response.data.data.alamat)
                setJk(response.data.data.jenis_kelamin);
                

            })
    }

    //handle update
    const handleUpdate = async (e) =>
    {
        e.preventDefault();
        setLoading(true)
        const formData =  new FormData();

        formData.append('nim', nim)
        formData.append('nama', name)
        formData.append('email', email)
        formData.append('tanggal_lahir', ttl)
        formData.append('prodi_id', prodi_id)
        formData.append('fakultas_id', fakultas_id)
        formData.append('alamat', alamat)
        formData.append('jenis_kelamin', jk)

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await  axios.put(`http://localhost:8000/api/mhs/${uuid}`,formData)
            .then((response)=>{
                navigate('/mahasiswa')
            })
            .catch((error)=>{
                setValidation(error.response.data)
            })
        setLoading(false)
    }


    //use effect
    useEffect(() => {

        if (localStorage.getItem('token')) {
            setLoading(true)
            fetchMhs();
            fetchFakultas();
            fetchProdi();
            setLoading(false)
        }
    }, [fakultas_id])
    return (
        <>
            <h1 className="mt-4">Update Mahasiswa</h1>
            <ol className="breadcrumb mb-4">
                <Link to={'/mahasiswa'} className="breadcrumb-item" >Mahasiswa</Link>
                <li className="breadcrumb-item active">Update Mahasiswa</li>
            </ol>
            {loading && <Loading />}
            <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">Update Data</h3></div>
                <div className="card-body">
                    
                    <form onSubmit={handleUpdate} >
                        <div className="row mb-3">
                            <div className="col-md-12">
                                {
                                    validation.message && (
                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            {validation.message}
                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>
                                    )
                                }
                                <div className="form-floating mb-3 mb-md-0">
                                    <input className="form-control" id="inputFirstName" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your first name" />
                                    <label htmlFor="inputFirstName">Your Name</label>
                                </div>
                                {
                                    validation.name && (
                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            {validation.name[0]}
                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="inputNim" value={nim} onChange={(e) => setNim(e.target.value)} type="text" placeholder="202224000" />
                            <label htmlFor="inputNim">NIM</label>
                            {
                                validation.nim && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <small> {validation.nim[0]}</small>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                )
                            }
                        </div>
                        <div className="form-floating mb-3">
                            <select className="form-select" value={fakultas_id} onChange={(e) => setFakultasID(e.target.value)} id="floatingSelect1" aria-label="Floating label select example">
                                
                                {
                                    listFakultas.map((item) => (
                                        <option key={item.id} value={item.id}  >{item.nama_fakultas}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="floatingSelect1">Fakultas</label>
                            {
                                validation.fakultas_id && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <small> {validation.fakultas_id[0]}</small>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                )
                            }
                        </div>
                        <div className="form-floating mb-3">
                            <select className="form-select"  value={prodi_id} onChange={(e) => setProdiId(e.target.value)} id="floatingSelect2" aria-label="Floating label select example">
                                
                                {
                                    listProdi.map((item) => (
                                        <option key={item.id} value={item.id}>{item.nama_jurusan}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="floatingSelect2">Program Studi</label>
                            {
                                validation.prodi_id && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <small> {validation.prodi_id[0]}</small>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                )
                            }
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="inputTtl" value={ttl} onChange={(e) => setTtl(e.target.value)} type="date" />
                            <label htmlFor="inputTtl">Tanggal Lahir</label>
                            {
                                validation.tanggal_lahir && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <small> {validation.tanggal_lahir[0]}</small>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                )
                            }
                        </div>
                        <div className="form-floating mb-3">
                            <select className="form-select" value={jk} onChange={(e) => setJk(e.target.value)} id="floatingSelect3" aria-label="Floating label select example">
                                <option value="Laki-laki">Laki-laki</option>
                                <option  value="Perempuan">Perempuan</option>
                            </select>
                            <label htmlFor="floatingSelect3">Jenis Kelamin</label>
                            {
                                validation.jenis_kelamin && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <small> {validation.jenis_kelamin[0]}</small>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                )
                            }
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="inputAlamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} type="text" placeholder="202224000" />
                            <label htmlFor="inputAlamat">Alamat</label>
                            {
                                validation.alamat && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <small> {validation.alamat[0]}</small>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                )
                            }
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" />
                            <label htmlFor="inputEmail">Email address</label>
                            {
                                validation.email && (
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <small> {validation.email[0]}</small>
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                )
                            }
                        </div>

                        <div className="mt-4 mb-0">
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary btn-block" >
                                    {
                                        loading ? <Loading /> : "Update  "
                                    }
                                    <i className="bi-floppy"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}