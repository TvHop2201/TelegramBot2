import React from 'react'
import './deatail.css'
const Deatail = (props) => {
    return (
        <div className='popup'>
            <div className='popup_inner'>
                <button className='btn btn-outline-danger float-right mt-3 mx-3' onClick={() => props.callback()}>X</button>
                <div className='container'>
                    <h1 className='mt-4'>UserName</h1>
                    <form className='mx-5'>
                        <div class="form-group m-2">
                            <label>FirstName : </label>
                            <input class="form-control" placeholder="First Name" />
                        </div>
                        <div class="form-group m-2">
                            <label>LastName : </label>
                            <input class="form-control" placeholder="Last Name" />
                        </div>
                        <div class="form-group m-2">
                            <label>Point : </label>
                            <input class="form-control" placeholder="point" />
                        </div>
                        <div class="form-group m-2">
                            <label>Create_At : </label>
                            <input class="form-control" placeholder="Create_At" />
                        </div>
                        <div className='mx-auto col text-center mt-5'>
                            <button type="button" className='btn btn-outline-success mx-5 px-5'>Cập Nhật</button>
                            <button type="button" className='btn btn-outline-warning mx-5 px-5'>Xóa</button>
                        </div>
                    </form>
                    <h1>{props.id}</h1>

                </div>

            </div>
        </div >

    )
}

export default Deatail