import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import cookies from 'universal-cookie'
import './Login.css'


const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const [check, setCheck] = useState(false)

    const handleFrom = (e) => {
        e.persist();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleValidate = () => {
        if (form.username == "" || form.password == "") {
            alert('Vui Lòng Nhập Tất Cả Thông Tin !!!')
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
            fetch(`${process.env.REACT_APP_API}/account/login`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
                .then(data => data.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status === true) {
                        alert("Đăng Nhập Thành Công !!!")
                        const cookie = new cookies
                        cookie.set('token', data.token)
                        window.location.href = '/'
                    } else
                        alert("Sai Tài Khoản Hoặc Mật Khẩu !!!")
                    setForm({
                        username: '',
                        password: '',
                    })
                    setCheck(false)

                })
                .catch(err => console.log(err))
        }

    }, [check])

    return (
        <div className='full py-5'>
            <div className="container">
                <div className="row gy-5 justify-content-center py-5 headT ">
                    <div className="col-md-7 shadow p-3 mb-5 bg-white rounded">
                        <div className="card border border-success border-radius">
                            <div className="card-header text-center m-3 h2 fw-bold">ĐĂNG NHẬP</div>
                            <div className="card-body p-5">
                                <div>
                                    <div className="row mb-3">
                                        <label className="col-md-4 col-form-label text-md-end">Name</label>
                                        <div className="col-md-6">
                                            <input id="name" type="name" className="form-control" name="username" value={form.username} onChange={handleFrom} onKeyDown={hanleKeyDown} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-md-4 col-form-label text-md-end">Pass</label>
                                        <div className="col-md-6">
                                            <input id="password" type="password" className="form-control" name="password" value={form.password} onChange={handleFrom} onKeyDown={hanleKeyDown} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6 offset-md-4">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" name="remember" id="remember" />
                                                <label className="form-check-label">
                                                    Remember Me
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-outline-success" onClick={handleSubmit}>
                                                Đăng Nhập
                                            </button>

                                            <div className='pt-3'>
                                                <p>Chưa có tài khoản <Link className="btn btn-link" to={'/register'}>
                                                    Đăng Ký
                                                </Link></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div>

    )
}

export default Login