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
    const data = [
        {
            id: 1,
            UserName: "tvHop",
            FirstName: 'muc',
            LastName: 'okok',
            point: 500,
            create_at: '5/5'
        },
    ]
    return (
        <div className='container'>
            <form className='row mt-5'>
                <div className='col-md-3'></div>
                <div className='form-group col-md-6'>
                    <h4 className='text-center'>Tìm Kiếm User</h4>
                    <input className='form-control' type="text" />
                </div>
                <div className='col-md-3'></div>
            </form>
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
                        data.map(index => (
                            <tr key={index.id}>
                                <td>{index.id}</td>
                                <td>{index.UserName}</td>
                                <td>{index.FirstName}</td>
                                <td>{index.LastName}</td>
                                <td>{index.point}</td>
                                <td>{index.create_at}</td>
                                <td>
                                    <button className='btn btn-outline-success' value={index.id} onClick={(e) => handleDetail(e)}>Chi Tiết</button>
                                </td>
                            </tr>
                        ))
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