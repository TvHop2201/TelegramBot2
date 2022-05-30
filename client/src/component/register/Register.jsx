import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

const Register = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
    })
    const [password2, setpassword2] = useState('')
    const [check, setCheck] = useState(false)


    const handleFrom = (e) => {
        e.persist();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    const handleValidate = () => {
        if (form.username == "" || form.email == "" || form.phone == "" || form.password == "") {
            alert('Vui Lòng Nhập Tất Cả Thông Tin !!!')
            setCheck(false)
        }
        else if (form.password != password2) {
            alert("Mật Khẩu Không Trùng Khớp !!!")
            setpassword2('')
            setCheck(false)
        }
        else
            setCheck(true)

    }
    const handleSubmit = () => {
        handleValidate()
    }

    const hanleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }


    useEffect(() => {
        if (check) {
            fetch(`${process.env.REACT_APP_API}/account/register`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
                .then(data => data.json())
                .then(data => {
                    alert(data)
                    setForm({
                        username: '',
                        email: '',
                        phone: '',
                        password: '',
                    })
                    setpassword2('')
                    setCheck(false)

                })
                .catch(err => console.log(err))
        }



    }, [check])






    return (
        <div className='full'>
            <div className="container">
                <div className="row justify-content-center py-5 headT">
                    <div className="col-md-7 shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="card border border-success border-radius">
                            <div className="card-header text-center m-3 h2 fw-bold">Đăng Ký</div>
                            <div className="card-body">
                                <div>
                                    <div className="row mb-3">
                                        <label className="col-md-4 col-form-label text-md-end">Tên Đăng Nhập</label>
                                        <div className="col-md-6">
                                            <input id="name" type="text" className="form-control " name="username" value={form.username} onChange={handleFrom} onKeyDown={hanleKeyDown} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-md-4 col-form-label text-md-end">Địa chỉ Email</label>
                                        <div className="col-md-6">
                                            <input id="email" type="email" className="form-control" name="email" value={form.email} onChange={handleFrom} onKeyDown={hanleKeyDown} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-md-4 col-form-label text-md-end">Số điện thoại</label>
                                        <div className="col-md-6">
                                            <input id="phone" type="text" className="form-control" name="phone" value={form.phone} onChange={handleFrom} onKeyDown={hanleKeyDown} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-md-4 col-form-label text-md-end">Mật Khẩu</label>
                                        <div className="col-md-6">
                                            <input id="password" type="password" className="form-control" name="password" value={form.password} onChange={handleFrom} onKeyDown={hanleKeyDown} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-md-4 col-form-label text-md-end">Nhập Lại Mật Khẩu</label>
                                        <div className="col-md-6">
                                            <input id="password-confirm" type="password" className="form-control" name="password2" value={password2} onChange={e => setpassword2(e.target.value)} onKeyDown={hanleKeyDown} />
                                        </div>
                                    </div>
                                    <div className="row mb-0">
                                        <div className="col-md-6 offset-md-4">
                                            <button className="btn btn-outline-success" onClick={handleSubmit} onKeyDown={hanleKeyDown}>
                                                Đăng Ký
                                            </button>
                                        </div>
                                    </div>
                                    <div className='mt-5 col-md-6 offset-md-4'>
                                        <p>Đã có tài khoản <Link className="btn btn-link" to={'/login'}>
                                            Đăng Nhập
                                        </Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register 