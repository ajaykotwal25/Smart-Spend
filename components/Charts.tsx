
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { CATEGORY_COLORS } from '../constants';
import { ExpenseCategory } from '../types';

interface ExpensePieChartProps {
  data: { name: string; value: number }[];
}

export const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ data }) => {
  if (data.length === 0) {
    return <div className="text-center text-gray-500 py-10">No expense data for this month.</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name as ExpenseCategory] || '#8884d8'} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

interface AnalyticsChartProps {
    data: {
        month: string;
        income: number;
        expense: number;
        savings: number;
    }[];
}

export const MonthlyBarChart: React.FC<AnalyticsChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
                <Legend />
                <Bar dataKey="income" fill="#43A047" name="Income" />
                <Bar dataKey="expense" fill="#E53935" name="Expense" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export const SavingsLineChart: React.FC<AnalyticsChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
                <Legend />
                <Line type="monotone" dataKey="savings" stroke="#1E88E5" strokeWidth={2} name="Savings" />
            </LineChart>
        </ResponsiveContainer>
    );
};
