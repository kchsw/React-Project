import React from 'react';
import {
    PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip
  } from 'recharts';
import { Colors } from '../utility'
const ColorsArr =  Object.values(Colors)

const CustomPieChart = ({title, categoryData}) => {
    if(categoryData.length === 0){
        return (<h5 className="text-center mx-3">{title} 还没有任何数据</h5>)
    }
    return (
        <div className="pie-chart-component mt-3">
            <h5 className="text-center">{title}</h5>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                    cx="50%" cy="50%"
                    data={categoryData}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                    >
                    {
                        categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={ColorsArr[index % ColorsArr.length]} />)
                    }
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomPieChart