import React, { useState } from 'react'
import Deatail from './Deatail'

const TableUser = () => {
    const [deatailShow, setDeatailShow] = useState(false)
    const [idDeatail, setIdDeatail] = useState(0)
    const data = [
        {
            id: 1,
            UserName: "tvHop",
            FirstName: 'muc',
            LastName: 'okok',
            point: 500,
            create_at: '5/5'
        },
        {
            id: 2,
            UserName: "tvHop2",
            FirstName: 'muc2',
            LastName: 'okok2',
            point: 500,
            create_at: '5/5'
        },
        {
            id: 3,
            UserName: "tvHop3",
            FirstName: 'muc3',
            LastName: 'okok3',
            point: 500,
            create_at: '5/5'
        },
        {
            id: 4,
            UserName: "tvHop4",
            FirstName: 'muc4',
            LastName: 'okok4',
            point: 500,
            create_at: '5/5'
        },
        {
            id: 5,
            UserName: "tvHop5",
            FirstName: 'muc5',
            LastName: 'okok5',
            point: 500,
            create_at: '5/5'
        },
    ]

    const handleDetail = (e) => {
        console.log(e.target.value);
        setIdDeatail(e.target.value);
        setDeatailShow(true)
    }

    return (
        <div className='container mt-5'>
            <table className='table'>
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
                    {
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
                    }

                </tbody>
            </table>
            {
                deatailShow ? <Deatail id={idDeatail} callback={() => setDeatailShow(false)} /> : null
            }
        </div>
    )
}

export default TableUser