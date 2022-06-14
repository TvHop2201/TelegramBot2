import React, { useState, useEffect } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Radar, Doughnut, PolarArea, Bubble, Pie, Scatter } from 'react-chartjs-2'
import axios from 'axios'

const ChartPoint = (props) => {
    const [data, setData] = useState([])
    const url = process.env.REACT_APP_API
    const [chartData, setChartData] = useState({
        labels: data.map(data => data.userName),
        datasets: [{
            label: 'Điểm',
            data: data.map(data => data.point),
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
    const fetchData = async () => {
        const data = await axios.get(`${url}/admin/getChartPoint`)
        setData(data.data.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setChartData({
            labels: data.map(data => data.userName),
            datasets: [{
                label: 'Điểm',
                data: data.map(data => data.point),
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
    }, [data])


    return (
        <div style={{ width: 700 }} className=' mt-5 mx-auto'>
            <Bar data={chartData} />
            <h3 className='text-center mt-5'>Biểu Đồ Điểm Của Các User</h3>
            <h1>{props.month}</h1>
        </div>
    )
}

export default ChartPoint