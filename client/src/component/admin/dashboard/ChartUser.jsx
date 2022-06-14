import React, { useState, useEffect } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Radar, Doughnut, PolarArea, Bubble, Pie, Scatter } from 'react-chartjs-2'
import axios from 'axios'
const ChartUser = (props) => {
    const [chartData, setChartData] = useState([])
    const [chartData2, setChartData2] = useState({
        labels: chartData.map(data => data._id),
        datasets: [{
            label: 'Số Lượng',
            data: chartData.map(data => data.count),
            backgroundColor: [
                "#bef264",
                '#86efac',
                "#fcd34d",
                "#fca5a5",
                "#d4d4d4",
                "#a5b4fc",
                "#fda4af",
                "#fdba74"
            ],
            borderColor: 'black'
        }]
    })
    const url = process.env.REACT_APP_API

    const fecthData = async () => {
        const data = await axios.get(`${url}/admin/getChartUserWithMonth/${props.month}`)
        setChartData(data.data.data)
    }
    useEffect(() => {
        fecthData()
    }, [props.month])

    useEffect(() => {
        setChartData2({
            labels: chartData.map(data => data._id),
            datasets: [{
                label: 'Số Lượng',
                data: chartData.map(data => data.count),
                backgroundColor: [
                    "#bef264",
                    '#86efac',
                    "#fcd34d",
                    "#fca5a5",
                    "#d4d4d4",
                    "#a5b4fc",
                    "#fda4af",
                    "#fdba74"
                ],
                borderColor: 'black'
            }]
        })
    }, [chartData])

    console.log(chartData);


    return (
        <div style={{ width: 700 }} className=' mt-5 mx-auto'>
            <Bar data={chartData2} />
            <h3 className='text-center mt-5'>Biểu Đồ Mức Độ Tăng Trưởng USER</h3>
        </div>
    )
}

export default ChartUser