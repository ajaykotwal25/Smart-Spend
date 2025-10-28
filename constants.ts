
import { ExpenseCategory, IncomeSource } from './types';

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  ExpenseCategory.FOOD,
  ExpenseCategory.TRAVEL,
  ExpenseCategory.SHOPPING,
  ExpenseCategory.BILLS,
  ExpenseCategory.OTHERS,
];

export const INCOME_SOURCES: IncomeSource[] = [
  IncomeSource.SALARY,
  IncomeSource.FREELANCE,
  IncomeSource.BUSINESS,
  IncomeSource.INVESTMENT,
  IncomeSource.OTHER,
];

export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  [ExpenseCategory.FOOD]: '#4CAF50',
  [ExpenseCategory.TRAVEL]: '#2196F3',
  [ExpenseCategory.SHOPPING]: '#9C27B0',
  [ExpenseCategory.BILLS]: '#FF9800',
  [ExpenseCategory.OTHERS]: '#9E9E9E',
};
