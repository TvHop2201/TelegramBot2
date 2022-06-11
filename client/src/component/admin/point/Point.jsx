import React, { useState } from 'react'
import ChartPoint from './ChartPoint'

const Point = () => {
    const [chartPointShow, setChartPointShow] = useState(true)


    return (
        <>

            {chartPointShow ? <ChartPoint /> : null}
        </>
    )

}

export default Point