import React, { useState } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Radar, Doughnut, PolarArea, Bubble, Pie, Scatter } from 'react-chartjs-2'
const ChartUser = () => {
    const chartData = [
        {
            "id": 1,
            "total": 66,
            "date": '02/06'
        },
        {
            "id": 2,
            "total": 78,
            "date": '03/06'
        },
        {
            "id": 3,
            "total": 15,
            "date": '04/06'
        },
        {
            "id": 4,
            "total": 50,
            "date": '05/06'
        },
        {
            "id": 5,
            "total": 60,
            "date": '06/06'
        },
        {
            "id": 6,
            "total": 90,
            "date": '07/06'
        },
        {
            "id": 7,
            "total": 55,
            "date": '08/06'
        },
        {
            "id": 8,
            "total": 63,
            "date": '09/06'
        },
        {
            "id": 9,
            "total": 57,
            "date": '010/06'
        },
        {
            "id": 10,
            "total": 75,
            "date": '11/06'
        },

    ]
    const [chartData2, setChartData2] = useState({
        labels: chartData.map(data => data.date),
        datasets: [{
            label: 'Số Lượng',
            data: chartData.map(data => data.total),
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


    return (
        <div style={{ width: 1200 }} className=' mt-5 mx-auto'>
            <Bar data={chartData2} />
            <h3 className='text-center mt-5'>Biểu Đồ Mức Độ Tăng Trưởng USER</h3>
        </div>
    )
}

export default ChartUser