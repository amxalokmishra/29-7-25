import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { fetchAnalytics } from './api';
import { Typography, Box } from '@mui/material';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c'];

const Dashboard = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    fetchAnalytics().then(res => {
      const chartData = res.data.map((item: {category: string, total: number}) => ({
        name: item.category,
        value: Number(item.total),
      }));
      setData(chartData);
    });
  }, []);

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h5" mb={2}>Expense Analytics</Typography>
      {data.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <Typography>No analytics data yet</Typography>
      )}
    </Box>
  );
};

export default Dashboard;