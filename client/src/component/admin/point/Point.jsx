import React, { useState } from 'react'
import ChartPoint from './ChartPoint'
import TablePoint from './TablePoint'
import FindPoint from './FindPoint'

const Point = () => {
    const [chartPointShow, setChartPointShow] = useState(true)
    const [tablePointShow, setTablePointShow] = useState(false)
    const [findPointShow, setFindPointShow] = useState(false)

    const HandleFindShow = () => {
        setFindPointShow(true)
        setChartPointShow(false)
        setTablePointShow(false)
    }
    const HandleChartShow = () => {
        setChartPointShow(true)
        setFindPointShow(false)
        setTablePointShow(false)
    }
    const handleTableShow = () => {
        setTablePointShow(true)
        setFindPointShow(false)
        setChartPointShow(false)
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
            {chartPointShow ? <ChartPoint /> : null}
            {tablePointShow ? <TablePoint /> : null}
            {findPointShow ? <FindPoint /> : null}
        </>
    )

}

export default Point