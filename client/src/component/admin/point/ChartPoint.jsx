import React, { useState } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Radar, Doughnut, PolarArea, Bubble, Pie, Scatter } from 'react-chartjs-2'

const ChartPoint = () => {
    const data = [
        {
            "id": 1,
            "name": 'TvHop',
            "point": 20,
            "date": '02/06'
        },
        {
            "id": 2,
            "name": 'TvHop2',
            "point": 15,
            "date": '03/06'
        },
        {
            "id": 3,
            "name": 'TvHop',
            "point": 20,
            "date": '04/06'
        },
        {
            "id": 4,
            "name": 'TvHop2',
            "point": 15,
            "date": '05/06'
        },
        {
            "id": 5,
            "name": 'TvHop',
            "point": 10,
            "date": '06/06'
        },
        {
            "id": 6,
            "name": 'TvHop2',
            "point": 30,
            "date": '07/06'
        },
        {
            "id": 7,
            "name": 'TvHop',
            "point": 37,
            "date": '08/06'
        },
        {
            "id": 8,
            "name": 'TvHop2',
            "point": 16,
            "date": '09/06'
        },

    ]

    const [chartData, setChartData] = useState({
        labels: data.map(data => data.name),
        datasets: [{
            label: 'point',
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
    return (
        <div style={{ width: 1200 }} className=' mt-5 mx-auto'>
            <Bar data={chartData} />
            <h3 className='text-center mt-5'>Biểu Đồ Điểm Của Các User</h3>
        </div>
    )
}

export default ChartPoint