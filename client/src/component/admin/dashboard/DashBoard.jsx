import React, { useState } from 'react'
import ChartPoint from '../point/ChartPoint'
import ChartUser from '../user/ChartUser'
import { Link } from 'react-router-dom'

const DashBoard = () => {
    const [chartUserShow, setChartUserShow] = useState(true)
    const [chartPointShow, setChartPointShow] = useState(false)

    const handleUserShow = () => {
        setChartUserShow(true)
        setChartPointShow(false)
    }
    const handlePointShow = () => {
        setChartUserShow(false)
        setChartPointShow(true)
    }
    return (
        <>
            <div className='text-center'>
                <button className='btn btn-outline-success mx-5 px-5' onClick={() => handleUserShow()} >
                    ChartUser
                </button>
                <button className='btn btn-outline-success mx-5 px-5' onClick={() => handlePointShow()}>
                    ChartPoint
                </button>
                <Link to='user' className='btn btn-outline-success mx-5 px-5'>
                    USER
                </Link>
                <Link to='point' className='btn btn-outline-success mx-5 px-5'>
                    POINT
                </Link>

            </div>
            {chartUserShow ? <ChartUser /> : null}
            <br /><br />
            {chartPointShow ? <ChartPoint /> : null}


        </>
    )
}

export default DashBoard