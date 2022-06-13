import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './deatail.css'
const Deatail = (props) => {
    const [formData, setFormData] = useState()

    const url = process.env.REACT_APP_API

    const fetchData = async () => {
        const data = await axios.get(`${url}/admin/getOnePointMessage/${props.id}`)
        setFormData(data.data.data)
    }
    console.log(formData);
    useEffect(() => {
        fetchData()
    }, [])

    if (!formData) {
        return (
            <><h1></h1></>
        )
    }

    return (
        <div className='popup'>
            < div className='popup_inner' >
                <button className='btn btn-outline-danger float-right mt-3 mx-3' onClick={() => props.callback()}>X</button>
                <div className='container'>
                    <h1 className='mt-4'>{formData.userName ? formData.userName : 'Edit'}</h1>
                    <form className='mx-5'>
                        <div class="form-group m-2">
                            <label>idUserReceive : </label>
                            <input class="form-control" placeholder="First Name" value={formData.idUserReceive ? formData.idUserReceive : null} />
                        </div>
                        <div class="form-group m-2">
                            <label>LastName : </label>
                            <input class="form-control" placeholder="Last Name" value={formData.idUserSendGift ? formData.idUserSendGift : null} />
                        </div>
                        <div class="form-group m-2">
                            <label>Point : </label>
                            <input class="form-control" placeholder="point" value={formData.pointChange ? formData.pointChange : null} />
                        </div>
                        <div class="form-group m-2">
                            <label>Create_At : </label>
                            <input class="form-control" placeholder="Create_At" value={formData.Date ? new Date(formData.Date).getDate() : null} />
                        </div>
                        <div className='mx-auto col text-center mt-5'>
                            <button type="button" className='btn btn-outline-success mx-5 px-5'>Cập Nhật</button>
                            <button type="button" className='btn btn-outline-warning mx-5 px-5'>Xóa</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >

    )
}

export default Deatail