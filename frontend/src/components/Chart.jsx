import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

function Chart () {
  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return (
      <>
      
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          // isAnimationActive={true}
          data={data01}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={40}
          fill="#8884d8"
          label={renderCustomizedLabel}
        > 
        {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
        <Tooltip />
      </PieChart>
      </>
  )
}

export default Chart
