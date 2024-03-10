import axios from "axios";
import { useEffect, useState } from "react"
import Api from "../Api";
import { Link } from "react-router-dom";

export default function Mahasiswa()
{
    //define state mahasiswa
    const [mahasiswa, setMahasiswa] = useState([]);

    //define token
    const token = localStorage.getItem("token");

    //make  a request to get data mahasiswa
    const fetchDataMhs = async () =>
    {
        axios.defaults.headers.common['Accept'] =  'application/json' ;
        axios.defaults.headers.common["Content-Type"]= 'application/json';
        axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${token}`;

        await axios.get("http://localhost:8000/api/mhs")
            .then((response)=>{

                //console.log(response.data.data);
                //set data mahasiswa
                setMahasiswa(response.data.data);
            })
    }

    const handleDelete = async (uuid) =>
    {
        if(window.confirm('Apakah Anda yakin ingin menghapus data ini?'))
        {
            axios.defaults.headers.common['Accept'] =  'application/json' ;
            axios.defaults.headers.common["Content-Type"]= 'application/json';
            axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${token}`;

            await axios.delete(`http://localhost:8000/api/mhs/${uuid}`)
                .then(()=>{
                    alert("Hapus Data Berhasil!");
                })
        }
    }
  
    useEffect(()=>{

        fetchDataMhs();

    },[mahasiswa])
    


    return (
        <>
            <h1 className="mt-4">Mahasiswa</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Mahasiswa</li>
            </ol>
            <div className="mb-2">
                <Link to={'/mahasiswa/new'} className="btn btn-primary" >Tambah Data <i className="bi-pencil-square"></i></Link>
            </div>
            <div className="card">
                <div className="card-header">
                    <h3>Data Mahasiswa</h3>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>NIM</th>
                                    <th>Nama</th>
                                    <th>Jenis Kelamin</th>
                                    <th>Alamat</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Program Studi</th>
                                    <th>Fakultas</th>
                                    <th>Email</th>
                                    <th>Aksi <i className="bi-gear"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    mahasiswa.map((item, index)=>(
                                        <tr key={index}>
                                            <td>{index+=1}</td>
                                            <td>{item.nim}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.jenis_kelamin}</td>
                                            <td>{item.tanggal_lahir}</td>
                                            <td>{item.alamat}</td>
                                            <td>{item.nama_jurusan}</td>
                                            <td>{item.nama_fakultas}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                {/* <button onClick={()=>showModalUbah(item)} type="button" class="btn btn-warning me-1"></button> */}
                                                <button className="btn btn-sm btn-danger m-1" onClick={()=>handleDelete(item.mhs_id)} ><i className="bi-trash"></i></button>
                                                <Link to={`/mahasiswa/${item.mhs_id}`} className="btn btn-sm btn-success" ><i className="bi-pencil-square"></i></Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}