
import { useState, useEffect, useMemo, useCallback } from 'react';
import { User, Transaction, TransactionType, ExpenseCategory, IncomeSource, SmartSpendData } from '../types';

const getInitialUser = (): User => ({
  name: 'Ajay',
  email: 'ajay@example.com',
  monthlyBudget: 50000,
});

const getInitialTransactions = (): Transaction[] => ([
    { id: '1', type: TransactionType.INCOME, amount: 60000, category: IncomeSource.SALARY, date: new Date().toISOString() },
    { id: '2', type: TransactionType.EXPENSE, amount: 1200, category: ExpenseCategory.FOOD, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), note: 'Groceries' },
    { id: '3', type: TransactionType.EXPENSE, amount: 350, category: ExpenseCategory.TRAVEL, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), note: 'Bus fare' },
    { id: '4', type: TransactionType.EXPENSE, amount: 5000, category: ExpenseCategory.BILLS, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), note: 'Rent' },
    { id: '5', type: TransactionType.EXPENSE, amount: 2500, category: ExpenseCategory.SHOPPING, date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), note: 'New shoes' },
    // Previous month's data for analytics
    { id: '6', type: TransactionType.INCOME, amount: 58000, category: IncomeSource.SALARY, date: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString() },
    { id: '7', type: TransactionType.EXPENSE, amount: 25000, category: ExpenseCategory.BILLS, date: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(), note: 'Previous month total' },
]);

export const useSmartSpend = (): SmartSpendData => {
  const [user, setUser] = useState<User>(getInitialUser);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('smartspend_user');
      const storedTransactions = localStorage.getItem('smartspend_transactions');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        localStorage.setItem('smartspend_user', JSON.stringify(getInitialUser()));
      }
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      } else {
        const initialTransactions = getInitialTransactions();
        setTransactions(initialTransactions);
        localStorage.setItem('smartspend_transactions', JSON.stringify(initialTransactions));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      localStorage.setItem('smartspend_user', JSON.stringify(getInitialUser()));
      localStorage.setItem('smartspend_transactions', JSON.stringify(getInitialTransactions()));
    }
  }, []);

  const saveData = useCallback((newUser: User, newTransactions: Transaction[]) => {
    try {
      localStorage.setItem('smartspend_user', JSON.stringify(newUser));
      localStorage.setItem('smartspend_transactions', JSON.stringify(newTransactions));
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
    }
  }, []);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: new Date().getTime().toString(),
    };
    setTransactions(prev => {
        const newTransactions = [...prev, newTransaction];
        saveData(user, newTransactions);
        return newTransactions;
    });
  }, [user, saveData]);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    saveData(updatedUser, transactions);
  }, [transactions, saveData]);
  
  const resetData = useCallback(() => {
    const initialUser = getInitialUser();
    const initialTransactions = getInitialTransactions();
    setUser(initialUser);
    setTransactions(initialTransactions);
    saveData(initialUser, initialTransactions);
  }, [saveData]);

  const currentMonthTransactions = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return transactions.filter(t => {
      const tDate = new Date(t.date);
      return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
    });
  }, [transactions]);

  const currentMonthIncome = useMemo(() => {
    return currentMonthTransactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [currentMonthTransactions]);

  const currentMonthExpense = useMemo(() => {
    return currentMonthTransactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [currentMonthTransactions]);

  const expenseByCategory = useMemo(() => {
    const categoryMap = new Map<string, number>();
    currentMonthTransactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .forEach(t => {
        const currentAmount = categoryMap.get(t.category) || 0;
        categoryMap.set(t.category, currentAmount + t.amount);
      });
    return Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }));
  }, [currentMonthTransactions]);

  const analyticsData = useMemo(() => {
    const dataByMonth: Record<string, { income: number, expense: number }> = {};
    
    transactions.forEach(t => {
        const date = new Date(t.date);
        const monthKey = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
        
        if (!dataByMonth[monthKey]) {
            dataByMonth[monthKey] = { income: 0, expense: 0 };
        }

        if (t.type === TransactionType.INCOME) {
            dataByMonth[monthKey].income += t.amount;
        } else {
            dataByMonth[monthKey].expense += t.amount;
        }
    });

    return Object.entries(dataByMonth).map(([month, data]) => ({
        month,
        ...data,
        savings: data.income - data.expense,
    })).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  }, [transactions]);

  return {
    user,
    transactions,
    addTransaction,
    updateUser,
    resetData,
    currentMonthTransactions,
    currentMonthIncome,
    currentMonthExpense,
    expenseByCategory,
    analyticsData
  };
};
