
import React from 'react';
import { Card } from '../components/UI';
import { ExpensePieChart } from '../components/Charts';
import { SmartSpendData } from '../types';

const SummaryCard: React.FC<{ title: string; amount: number; color: string }> = ({ title, amount, color }) => (
  <div className="flex-1">
    <p className="text-sm text-gray-500">{title}</p>
    <p className={`text-2xl font-bold ${color}`}>₹{amount.toLocaleString('en-IN')}</p>
  </div>
);

const BudgetAlert: React.FC<{ expense: number; budget: number }> = ({ expense, budget }) => {
  if (budget === 0) return null;
  const percentage = (expense / budget) * 100;
  
  if (percentage > 80) {
    return (
      <Card className="bg-red-100 border border-red-300">
        <p className="text-red-700 font-medium">
          ⚠️ Warning! You have spent {percentage.toFixed(0)}% of your monthly budget.
        </p>
      </Card>
    );
  } else if (percentage > 50) {
    return (
      <Card className="bg-blue-100 border border-blue-300">
        <p className="text-blue-700 font-medium">
          Heads up! You have spent {percentage.toFixed(0)}% of your budget this month.
        </p>
      </Card>
    );
  }
  return (
    <Card className="bg-green-100 border border-green-300">
        <p className="text-green-700 font-medium">
            You're doing great with your budget this month!
        </p>
    </Card>
  );
};


const HomeScreen: React.FC<SmartSpendData> = ({ user, currentMonthIncome, currentMonthExpense, expenseByCategory }) => {
  const remainingBalance = currentMonthIncome - currentMonthExpense;
  const remainingColor = remainingBalance >= 0 ? 'text-income' : 'text-expense';
  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Hi {user.name},</h1>
        <p className="text-gray-500">Here’s your financial summary for {currentMonthName}.</p>
      </header>

      <Card className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <SummaryCard title="Income" amount={currentMonthIncome} color="text-income" />
        <SummaryCard title="Expenses" amount={currentMonthExpense} color="text-expense" />
        <SummaryCard title="Balance" amount={remainingBalance} color={remainingColor} />
      </Card>

      <BudgetAlert expense={currentMonthExpense} budget={user.monthlyBudget} />

      <Card>
        <h2 className="text-lg font-semibold mb-4">Expense Breakdown</h2>
        <ExpensePieChart data={expenseByCategory} />
      </Card>
    </div>
  );
};

export default HomeScreen;
