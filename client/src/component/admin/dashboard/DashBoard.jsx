import React, { useState } from 'react'
import ChartPoint from './ChartPoint'
import ChartUser from './ChartUser'
import { Link } from 'react-router-dom'

const DashBoard = () => {
    const monthDefaul = new Date().getMonth() + 1
    const [selected, setSelected] = useState(monthDefaul)

    const handleChange = (e) => {
        setSelected(e.target.value)
    }
    return (
        <>
            <div className='text-center'>
                <Link to='user' className='btn btn-outline-success mx-5 px-5'>
                    USER
                </Link>
                <Link to='point' className='btn btn-outline-success mx-5 px-5'>
                    POINT
                </Link>
                <div className='mx-5 px-5 mt-5'>
                    <select className="form-select" value={selected} onChange={(e) => handleChange(e)} aria-label="Default select example">
                        <option selected>Chọn tháng</option>
                        <option value="1">tháng 1</option>
                        <option value="2">Tháng 2</option>
                        <option value="3">Tháng 3</option>
                        <option value="4">Tháng 4</option>
                        <option value="5">Tháng 5</option>
                        <option value="6">Tháng 6</option>
                        <option value="7">Tháng 7</option>
                        <option value="8">Tháng 8</option>
                        <option value="9">Tháng 9</option>
                        <option value="10">Tháng 10</option>
                        <option value="11">Tháng 11</option>
                        <option value="12">Tháng 12</option>
                    </select>
                </div>
            </div>
            <div className='row float-left mt-5 mx-auto'>
                <div className='col-lg-6'>

                    <ChartUser month={selected} />
                </div>
                <div className='col-lg-6'>
                    <ChartPoint />

                </div>

            </div>


        </>
    )
}

export default DashBoard