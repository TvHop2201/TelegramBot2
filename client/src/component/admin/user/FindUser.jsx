import axios from 'axios'
import React, { useState } from 'react'
import Deatail from './Deatail'
const Find = () => {
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
        const data = await axios.get(`${url}/admin/getOneUserByUserName/${formData}`)
        if (data.data.success) {
            setData(data.data.data)
            setFormData('')
        } else {
            alert('Không tìm thấy kết quả !!!')
        }
    }


    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-md-3'></div>
                <div className='form-group col-md-6'>
                    <h4 className='text-center'>Tìm Kiếm User</h4>
                    <input className='form-control' type="text" value={formData} onChange={(e) => setFormData(e.target.value)} onKeyPress={(e) => handleKeyPress(e)} />
                    <div className='text-center mt-3'>
                        <button className='btn btn-outline-success' onClick={() => fetchData()}>Tìm Kiếm</button>
                    </div>
                </div>
                <div className='col-md-3'></div>
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
    )
}

export default Find