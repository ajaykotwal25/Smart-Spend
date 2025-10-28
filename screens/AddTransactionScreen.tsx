
import React, { useState } from 'react';
import { Button, Input, Select } from '../components/UI';
import { TransactionType, ExpenseCategory, IncomeSource, SmartSpendData } from '../types';
import { EXPENSE_CATEGORIES, INCOME_SOURCES } from '../constants';

const AddTransactionScreen: React.FC<SmartSpendData> = ({ addTransaction }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory | IncomeSource>(ExpenseCategory.FOOD);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(parseFloat(amount))) {
      alert('Please enter a valid amount.');
      return;
    }
    addTransaction({
      type,
      amount: parseFloat(amount),
      category,
      date: new Date(date).toISOString(),
      note,
    });
    // Reset form
    setAmount('');
    setNote('');
    alert(`${type} added successfully!`);
  };

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    if (newType === TransactionType.EXPENSE) {
        setCategory(ExpenseCategory.FOOD);
    } else {
        setCategory(IncomeSource.SALARY);
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Add Transaction</h1>
        <p className="text-gray-500">Log your income or expense.</p>
      </header>
      
      <div className="flex bg-gray-200 rounded-xl p-1">
          <button 
            onClick={() => handleTypeChange(TransactionType.EXPENSE)}
            className={`w-1/2 py-2 rounded-lg font-semibold transition-colors ${type === TransactionType.EXPENSE ? 'bg-white text-primary shadow' : 'text-gray-600'}`}>
            Expense
          </button>
          <button 
            onClick={() => handleTypeChange(TransactionType.INCOME)}
            className={`w-1/2 py-2 rounded-lg font-semibold transition-colors ${type === TransactionType.INCOME ? 'bg-white text-primary shadow' : 'text-gray-600'}`}>
            Income
          </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Amount (₹)" 
          id="amount" 
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <Select 
          label={type === TransactionType.EXPENSE ? "Category" : "Source"} 
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory | IncomeSource)}
          required
        >
          {type === TransactionType.EXPENSE ? (
            EXPENSE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)
          ) : (
            INCOME_SOURCES.map(src => <option key={src} value={src}>{src}</option>)
          )}
        </Select>
        <Input 
          label="Date" 
          id="date" 
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Input 
          label="Note (Optional)" 
          id="note" 
          type="text"
          placeholder={`e.g., Lunch with friends`}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button type="submit">
          Save {type}
        </Button>
      </form>
    </div>
  );
};

export default AddTransactionScreen;
