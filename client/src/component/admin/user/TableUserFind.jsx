import React, { useState, useEffect } from 'react'
import './deatail.css'
import Deatail from './Deatail'
import axios from 'axios'

const TableUserFind = (props) => {
    const [deatailShow, setDeatailShow] = useState(false)
    const [idDeatail, setIdDeatail] = useState(0)
    const handleDetail = (e) => {
        console.log(e.target.value);
        setIdDeatail(e.target.value);
        setDeatailShow(true)
    }

    const [data, setData] = useState([])
    const [formData, setFormData] = useState('')

    const url = process.env.REACT_APP_API

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchData()
        }

    }
    const fetchData = async () => {
        console.log('chạy');
        const data = await axios.get(`${url}/admin/findModeTableUser/${props.mode}/${formData}`)
        console.log(data);
        if (data.data.success) {
            setData(data.data.data[0])
            setFormData('')
        } else {
            alert('Không tìm thấy kết quả !!!')
        }
    }


    return (
        <div className='popup'>
            < div className='popup_inner' >
                <button className='btn btn-outline-danger float-right mt-3 mx-3' onClick={() => props.callback()}>X</button>
                <div className='container'>
                    <h1 className='mt-4'>Find in {props.mode}</h1>
                    <div className='form-group mx-5 mt-3'>
                        <input className='form-control' type="text" value={formData} onChange={(e) => setFormData(e.target.value)} onKeyPress={(e) => handleKeyPress(e)} />
                        <div className='text-center mt-3'>
                            <button className='btn btn-outline-success' onClick={() => fetchData()}>Tìm Kiếm</button>
                        </div>
                    </div>
                    <table className='table mt-5'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>UserName</th>
                                <th scope='col'>FirstName</th>
                                <th scope='col'>LastName</th>
                                <th scope='col'>Point</th>
                                <th scope='col'>create_at</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data ?

                                <tr>
                                    <td>{data._id}</td>
                                    <td>{data.userName}</td>
                                    <td>{data.firstName}</td>
                                    <td>{data.lastName}</td>
                                    <td>{data.point}</td>
                                    <td>{data.create_at}</td>
                                    <td>
                                        <button className='btn btn-outline-success' value={data._id} onClick={(e) => handleDetail(e)}>Chi Tiết</button>
                                    </td>
                                </tr>

                                : null
                            }

                        </tbody>
                    </table>
                    {
                        deatailShow ? <Deatail id={idDeatail} callback={() => setDeatailShow(false)} /> : null
                    }
                </div>
            </div >
        </div >
    )
}

export default TableUserFind