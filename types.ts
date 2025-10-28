
export enum TransactionType {
  INCOME = 'Income',
  EXPENSE = 'Expense',
}

export enum ExpenseCategory {
  FOOD = 'Food',
  TRAVEL = 'Travel',
  SHOPPING = 'Shopping',
  BILLS = 'Bills',
  OTHERS = 'Others',
}

export enum IncomeSource {
  SALARY = 'Salary',
  FREELANCE = 'Freelance',
  BUSINESS = 'Business',
  INVESTMENT = 'Investment',
  OTHER = 'Other',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: ExpenseCategory | IncomeSource;
  date: string; // ISO string
  note?: string;
}

export interface User {
  name: string;
  email: string;
  monthlyBudget: number;
}

export type Screen = 'home' | 'history' | 'add' | 'analytics' | 'profile';

export interface SmartSpendData {
    user: User;
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    updateUser: (user: User) => void;
    resetData: () => void;
    currentMonthTransactions: Transaction[];
    currentMonthIncome: number;
    currentMonthExpense: number;
    expenseByCategory: { name: string; value: number }[];
    analyticsData: {
        month: string;
        income: number;
        expense: number;
        savings: number;
    }[];
}
