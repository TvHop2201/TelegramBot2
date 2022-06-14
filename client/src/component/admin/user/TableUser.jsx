import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Deatail from './Deatail'
import TableUserFind from './TableUserFind'

const TableUser = () => {
    const [deatailShow, setDeatailShow] = useState(false)
    const [idDeatail, setIdDeatail] = useState()
    const [tableUserFindShow, setTableUserFindShow] = useState(false)
    const [findMode, setFindMode] = useState('')
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)

    const url = process.env.REACT_APP_API

    const fecthData = async () => {
        const data = await axios.get(`${url}/admin/getUser/${page}`)
        setData(data.data.data)
    }
    const handleDetail = (e) => {
        setIdDeatail(e.target.value);
        setDeatailShow(true)
    }
    const handleFindUserName = () => {
        setTableUserFindShow(true)
        setFindMode('userName')
    }
    const handleFindFirstName = () => {
        setTableUserFindShow(true)
        setFindMode('firsName')
    }
    const handleFindLastName = () => {
        setTableUserFindShow(true)
        setFindMode('lastName')
    }

    useEffect(() => {
        fecthData()
    }, [])
    useEffect(() => {
        fecthData()
    }, [page])



    return (
        <div className='container mt-5'>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col' onClick={() => handleFindUserName()}>UserName</th>
                        <th scope='col' onClick={() => handleFindFirstName()}>FirstName</th>
                        <th scope='col' onClick={() => handleFindLastName()}>LastName</th>
                        <th scope='col'>Point</th>
                        <th scope='col'>create_at</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(index => (
                            <tr key={index._id}>
                                <td>{index._id}</td>
                                <td>{index.userName}</td>
                                <td>{index.firstName}</td>
                                <td>{index.lastName}</td>
                                <td>{index.point}</td>
                                <td>{index.create_at ? new Date(index.create_at).toDateString() : null}</td>
                                <td>
                                    <button className='btn btn-outline-success' value={index._id} onClick={(e) => handleDetail(e)}>Chi Tiết</button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            <div className=' text-center '>
                <div className='btn-group'>
                    <button className='btn btn-outline-primary' onClick={() => setPage(page > 1 ? page - 1 : page)}>&lt;&lt;</button>
                    <span className='btn btn-outline-success'>{page}</span>
                    <button className='btn btn-outline-primary' onClick={() => setPage(page + 1)}>&gt;&gt;</button>
                </div>
            </div>
            {deatailShow ? <Deatail id={idDeatail} callback={() => setDeatailShow(false)} /> : null}
            {tableUserFindShow ? < TableUserFind mode={findMode} callback={() => setTableUserFindShow(false)} /> : null}
        </div>
    )
}

export default TableUser