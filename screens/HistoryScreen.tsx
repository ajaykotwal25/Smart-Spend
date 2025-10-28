
import React, { useState, useMemo } from 'react';
import { Card, Button } from '../components/UI';
import { SmartSpendData, Transaction, TransactionType, ExpenseCategory } from '../types';
import { EXPENSE_CATEGORIES } from '../constants';
import { GetCategoryIcon } from '../components/Icons';

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const isExpense = transaction.type === TransactionType.EXPENSE;
    return (
        <div className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
            <div className={`p-2 rounded-full ${isExpense ? 'bg-red-100 text-expense' : 'bg-green-100 text-income'}`}>
                {isExpense && <GetCategoryIcon category={transaction.category as ExpenseCategory} />}
            </div>
            <div className="flex-grow">
                <p className="font-semibold">{transaction.category}</p>
                <p className="text-sm text-gray-500">{transaction.note || new Date(transaction.date).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
                <p className={`font-bold ${isExpense ? 'text-expense' : 'text-income'}`}>
                    {isExpense ? '-' : '+'}₹{transaction.amount.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

const HistoryScreen: React.FC<SmartSpendData> = ({ transactions }) => {
    const [selectedMonth, setSelectedMonth] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`);
    const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | 'all'>('all');

    const monthOptions = useMemo(() => {
        const months = new Set<string>();
        transactions.forEach(t => {
            const date = new Date(t.date);
            months.add(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
        });
        return Array.from(months).sort().reverse();
    }, [transactions]);
    
    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const tDate = new Date(t.date);
            const tMonthKey = `${tDate.getFullYear()}-${String(tDate.getMonth() + 1).padStart(2, '0')}`;
            
            const monthMatch = tMonthKey === selectedMonth;
            const categoryMatch = selectedCategory === 'all' || t.category === selectedCategory;
            
            return t.type === TransactionType.EXPENSE && monthMatch && categoryMatch;
        }).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [transactions, selectedMonth, selectedCategory]);

    const totalMonthExpenses = useMemo(() => {
        return filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
    }, [filteredTransactions]);

    const exportToCSV = () => {
        const headers = ['Date', 'Category', 'Amount', 'Note'];
        const rows = filteredTransactions.map(t => 
            [
                new Date(t.date).toLocaleDateString(),
                t.category,
                t.amount,
                t.note || ''
            ].join(',')
        );
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `smartspend_export_${selectedMonth}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-800">Expense History</h1>
                <p className="text-gray-500">Review your past expenses.</p>
            </header>

            <Card className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="w-full sm:w-1/2 p-2 border rounded-lg bg-white">
                    {monthOptions.map(month => (
                        <option key={month} value={month}>{new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}</option>
                    ))}
                </select>
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value as ExpenseCategory | 'all')} className="w-full sm:w-1/2 p-2 border rounded-lg bg-white">
                    <option value="all">All Categories</option>
                    {EXPENSE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Total Expenses</h2>
                    <p className="text-xl font-bold text-expense">₹{totalMonthExpenses.toLocaleString('en-IN')}</p>
                </div>
                <div>
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map(t => <TransactionItem key={t.id} transaction={t} />)
                    ) : (
                        <p className="text-center text-gray-500 py-8">No expenses found for this period.</p>
                    )}
                </div>
            </Card>

            {filteredTransactions.length > 0 &&
                <Button onClick={exportToCSV} variant="secondary">
                    Export Monthly Data as CSV
                </Button>
            }
        </div>
    );
};

export default HistoryScreen;
