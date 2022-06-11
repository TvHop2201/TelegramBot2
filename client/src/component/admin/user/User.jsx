import React from 'react'
import { useState } from 'react'
import ChartUser from './ChartUser'
import FindUser from './FindUser'
import TableUser from './TableUser'


const User = () => {
    const [chartUserShow, setChartUserShow] = useState(true)
    const [tableShow, setTableShow] = useState(false)
    const [FindUserShow, setFindUserShow] = useState(false)


    const HandleFindShow = () => {
        setChartUserShow(false)
        setTableShow(false)
        setFindUserShow(true)
    }
    const HandleChartShow = () => {
        setTableShow(false)
        setFindUserShow(false)
        setChartUserShow(true)
    }
    const handleTableShow = () => {
        setFindUserShow(false)
        setChartUserShow(false)
        setTableShow(true)
    }





    return (
        <>
            <div className='text-center'>
                <button className='btn btn-outline-success mx-5 px-5' onClick={() => HandleChartShow()}>
                    Chart
                </button>
                <button className='btn btn-outline-success mx-5 px-5' onClick={() => handleTableShow()}>
                    Table
                </button>
                <button className='btn btn-outline-success mx-5 px-5' onClick={() => HandleFindShow()}>
                    Find
                </button>
            </div>
            {chartUserShow ? <ChartUser /> : null}
            {FindUserShow ? <FindUser /> : null}
            {tableShow ? <TableUser /> : null}
        </>
    )
}

export default User