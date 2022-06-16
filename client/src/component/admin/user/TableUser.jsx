import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Deatail from './Deatail'
import TableUserFind from './TableUserFind'
import Pagination from '../layout/Pagination'

const TableUser = () => {
    const [deatailShow, setDeatailShow] = useState(false)
    const [idDeatail, setIdDeatail] = useState()
    const [tableUserFindShow, setTableUserFindShow] = useState(false)
    const [findMode, setFindMode] = useState('')
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [lastNameFilter, setLastNameFilter] = useState('LastName')
    const [firstNameFilter, setFirstNameFilter] = useState('firstName')
    const [userNameFilter, setUserNameFilter] = useState('userName')

    const url = process.env.REACT_APP_API

    const fecthData = async () => {
        const data = await axios.get(`${url}/admin/getUser/?page=${page}&limit=3`)
        setData(data.data.data)
        setTotal(Math.ceil(data.data.total / 3))
    }
    const handleDetail = (e) => {
        setIdDeatail(e.target.value);
        setDeatailShow(true)
    }

    const fetchDataFilter = async (filter) => {
        const data = await axios.get(`${url}/admin/findModeTableUser/${filter}`)
        if (data.data.success) {
            setData(data.data.data)
        } else {
            alert('Không tìm thấy kết quả !!!')
        }
    }

    const handleFindUserName = (e) => {
        if (e.key === 'Enter') {
            fetchDataFilter(userNameFilter)
        }
    }

    const handleFindFirstName = (e) => {
        if (e.key === 'Enter') {
            fetchDataFilter(firstNameFilter)
        }
    }
    const handleFindLastName = (e) => {
        if (e.key === 'Enter') {
            fetchDataFilter(lastNameFilter)
        }
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
                        <th scope='col'>
                            <input type='text' className='border-0'
                                value={userNameFilter}
                                onChange={(e) => setUserNameFilter(e.target.value)}
                                onKeyDown={(e) => handleFindUserName(e)}
                            />
                        </th>
                        <th scope='col'>
                            <input type='text' className='border-0'
                                value={firstNameFilter}
                                onChange={(e) => setFirstNameFilter(e.target.value)}
                                onKeyDown={(e) => handleFindFirstName(e)}
                            />
                        </th>
                        <th scope='col'>
                            <input type='text' className='border-0'
                                value={lastNameFilter}
                                onChange={(e) => setLastNameFilter(e.target.value)}
                                onKeyDown={(e) => handleFindLastName(e)}
                            />
                        </th>
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
                    <Pagination total={total} page={page} callback={(data) => setPage(data)} />
                    <button className='btn btn-outline-primary' onClick={() => setPage(page + 1)}>&gt;&gt;</button>
                </div>
            </div>
            {deatailShow ? <Deatail id={idDeatail} callback={() => setDeatailShow(false)} /> : null}
            {tableUserFindShow ? < TableUserFind mode={findMode} callback={() => setTableUserFindShow(false)} /> : null}
        </div >
    )
}

export default TableUser