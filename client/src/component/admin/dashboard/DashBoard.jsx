import React, { useState, useEffect } from 'react'
import ChartPoint from './ChartPoint'
import ChartUser from './ChartUser'
import { Link } from 'react-router-dom'

const DashBoard = () => {
    const monthDefaul = new Date().getMonth() + 1
    const [firstDay, setFirstDay] = useState(1)
    const [firstMonth, setFirstMonth] = useState(monthDefaul - 1)

    const [lastDay, setLastDay] = useState(1)
    const [lastMonth, setlastMonth] = useState(monthDefaul)

    const [time, setTime] = useState(`${firstDay}-${firstMonth}-${lastDay}-${lastMonth}`)

    useEffect(() => {
        setTime(`${firstDay}-${firstMonth}-${lastDay}-${lastMonth}`)
    }, [firstDay, lastDay, firstMonth, lastMonth])


    return (
        <>
            <div className='text-center'>
                <Link to='user' className='btn btn-outline-success mx-5 px-5'>
                    USER
                </Link>
                <Link to='point' className='btn btn-outline-success mx-5 px-5'>
                    POINT
                </Link>
            </div>
            <div className='row'>
                <div className='m-5 col-lg-5'>
                    <div className='col-md-3 mx-auto float-left'>
                        <div>
                            <select className="form-select" value={firstDay} onChange={(e) => setFirstDay(e.target.value)}>
                                <option selected>Chọn ngày</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <div>
                                <select className="form-select" value={firstMonth} onChange={(e) => setFirstMonth(e.target.value)}>
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
                    </div>
                </div>
                <div className='m-5 col-lg-5'>
                    <div className='col-md-3 mx-auto float-left'>
                        <div>
                            <select className="form-select" value={lastDay} onChange={(e) => setLastDay(e.target.value)}>
                                <option selected>Chọn ngày</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <div>
                                <select className="form-select" value={lastMonth} onChange={(e) => setlastMonth(e.target.value)}>
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
                    </div>
                </div>
            </div>
            <div className='row float-left mt-5 mx-auto'>
                <div className='col-lg-6'>

                    <ChartUser time={time} />
                </div>
                <div className='col-lg-6'>
                    <ChartPoint />

                </div>

            </div>


        </>
    )
}

export default DashBoard