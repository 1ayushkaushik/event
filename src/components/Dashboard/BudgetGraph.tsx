// src/components/Budget/BudgetGraph.tsx

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  location: string;
}

const BudgetGraph: React.FC<Props> = ({ location }) => {
  const data = [
    { x: 92633, y: 5 },
    { x: 100000, y: 15 },
    { x: 115791, y: 25 },
    { x: 125000, y: 15 },
    { x: 138949, y: 5 },
  ];

  return (
    <div className="bg-white shadow p-4 rounded w-full">
      <h3 className="text-lg font-semibold mb-2">
        Budget trends for {location}
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="x" tickFormatter={(v) => `$${v.toLocaleString()}`} />
          <YAxis hide />
          <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
          <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetGraph;
