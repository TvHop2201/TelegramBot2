import React, { useState, useEffect } from 'react'
import Deatail from './Deatail'
import axios from 'axios'
import Pagination from '../layout/Pagination'
const TablePoint = () => {
    const [deatailShow, setDeatailShow] = useState(false)
    const [idDeatail, setIdDeatail] = useState()
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    const handleDetail = (e) => {
        setIdDeatail(e.target.value);
        setDeatailShow(true)
    }

    const url = process.env.REACT_APP_API

    const fetchData = async () => {
        console.log(url);
        const data = await axios.get(`${url}/admin/getPointMessage/${page}/3`)
        setData(data.data.data)
        setTotal(Math.ceil(data.data.total / 3))
    }

    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        fetchData()
    }, [page])


    return (
        <>
            <div className='container mt-5'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>UserReceive</th>
                            <th scope='col'>UserSend</th>
                            <th scope='col'>pointChange</th>
                            <th scope='col'>message</th>
                            <th scope='col'>create_at</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(index => (
                                <tr key={index.data._id}>
                                    <td>{index.data._id}</td>
                                    <td>{index.userReceive.userName ? index.userReceive.userName : index.userReceive.firstName}</td>
                                    <td>{index.userSend.userName ? index.userSend.userName : index.userSend.firstName}</td>
                                    <td> + {index.data.pointChange}</td>
                                    <td>{index.data.message}</td>
                                    <td>{index.data.Date ? new Date(index.data.Date).toDateString() : null}</td>
                                    <td>
                                        <button className='btn btn-outline-success' value={index.data._id} onClick={(e) => handleDetail(e)}>Chi Tiết</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                <div className=' text-center '>
                    <div className='btn-group'>
                        <button className='btn btn-outline-primary' onClick={() => setPage(page > 1 ? page - 1 : page)}>&lt;&lt;</button>
                        <Pagination total={total} callback={(data) => setPage(data)} />
                        <button className='btn btn-outline-primary' onClick={() => setPage(page + 1)}>&gt;&gt;</button>
                    </div>
                </div>
                {
                    deatailShow ? <Deatail id={idDeatail} callback={() => setDeatailShow(false)} /> : null
                }
            </div>
        </>
    )
}

export default TablePoint