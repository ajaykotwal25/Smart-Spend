
import React from 'react';
import { ExpenseCategory } from '../types';

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-6 h-6">{children}</div>
);

export const HomeIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  </IconWrapper>
);

export const HistoryIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
    </svg>
  </IconWrapper>
);

export const PlusIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </IconWrapper>
);

export const AnalyticsIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 1.085-1.085-1.085m1.085 1.085V18m-1.085-1.085l-1.085 1.085m0 0L6 18m2.25-2.25h4.5m-7.5 0h7.5" />
    </svg>
  </IconWrapper>
);

export const ProfileIcon: React.FC = () => (
  <IconWrapper>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </IconWrapper>
);

const CategoryIconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-5 h-5">{children}</div>
);

export const FoodIcon = () => <CategoryIconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1a.75.75 0 0 1 .75.75v2.382a2.978 2.978 0 0 1 2.365 2.868c0 1.637-1.325 2.971-2.972 2.971s-2.972-1.334-2.972-2.971A2.978 2.978 0 0 1 9.25 4.132V1.75A.75.75 0 0 1 10 1ZM3.25 6.132a3.001 3.001 0 0 0 4.316 2.366A3.001 3.001 0 0 0 9.8 6.132V3.75a.75.75 0 0 0-1.5 0v2.382a1.478 1.478 0 0 1-1.182 1.434A1.501 1.501 0 0 1 6 6.132V3.75a.75.75 0 0 0-1.5 0v2.382c0 .63.262 1.206.69 1.624a.75.75 0 0 0 1.12-1.004A.25.25 0 0 1 4.75 6.132V3.75a.75.75 0 0 0-1.5 0v2.382Z" /><path d="M10 12.5a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75Z" /><path d="M12.44 9.19a.75.75 0 0 0-1.06-1.06L10 9.56l-1.38-1.43a.75.75 0 0 0-1.06 1.06l1.44 1.5a.75.75 0 0 0 1.06 0l1.44-1.5Z" /></svg></CategoryIconWrapper>
export const TravelIcon = () => <CategoryIconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.624 3.376a.75.75 0 0 1 1.06.04l3.5 3.25a.75.75 0 0 1 0 1.01l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.22-2.05H3.75a.75.75 0 0 1 0-1.5h10.094l-2.22-2.05a.75.75 0 0 1-.04-1.06ZM3.25 8.75a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /><path d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-2 0a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" /></svg></CategoryIconWrapper>
export const ShoppingIcon = () => <CategoryIconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.505 2.374A4.5 4.5 0 0 1 7.643 1h4.714a4.5 4.5 0 0 1 4.138 1.374l1.373 2.126A4.5 4.5 0 0 1 19 8.25v5.5a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 1 13.75v-5.5a4.5 4.5 0 0 1 1.13-2.75l1.374-2.126ZM4.553 3.874A3 3 0 0 1 7.643 2.5h4.714a3 3 0 0 1 3.09 1.374l.732 1.126H3.82l.732-1.126Z" clipRule="evenodd" /></svg></CategoryIconWrapper>
export const BillsIcon = () => <CategoryIconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M3.505 3.117A3.001 3.001 0 0 1 5.998 2h8.004a3.001 3.001 0 0 1 2.493 1.117l.013.024c.488.803.743 1.71.743 2.659v3.2c0 1.439-.933 2.703-2.223 3.117A3.001 3.001 0 0 1 14.002 16h-8.004a3.001 3.001 0 0 1-2.493-1.117l-.013-.024A3.001 3.001 0 0 1 3.505 11.883v-3.2c0-1.439.933-2.703 2.223-3.117A3.001 3.001 0 0 1 5.998 4h8.004a3.001 3.001 0 0 1 2.493 1.117l.013.024c.488.803.743 1.71.743 2.659v.55a.75.75 0 0 1-1.5 0v-.55c0-.688-.172-1.326-.484-1.893l-.01-.016a1.5 1.5 0 0 0-1.246-.557H5.998a1.5 1.5 0 0 0-1.246.557l-.01.016c-.312.567-.484 1.205-.484 1.893v3.2c0 .688.172 1.326.484 1.893l.01.016a1.5 1.5 0 0 0 1.246.557h8.004a1.5 1.5 0 0 0 1.246-.557l.01-.016c.312-.567.484-1.205.484-1.893v-.55a.75.75 0 0 1 1.5 0v.55c0 .949-.255 1.856-.743 2.659l-.013.024A3.001 3.001 0 0 1 14.002 18h-8.004a3.001 3.001 0 0 1-2.493-1.117l-.013-.024A3.001 3.001 0 0 1 3.505 14.883v-3.2c0-.949.255-1.856.743-2.659l.013-.024Z" /><path d="M10 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" /></svg></CategoryIconWrapper>
export const OthersIcon = () => <CategoryIconWrapper><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" /></svg></CategoryIconWrapper>

export const GetCategoryIcon = ({ category }: { category: ExpenseCategory }) => {
    switch(category) {
        case ExpenseCategory.FOOD: return <FoodIcon />;
        case ExpenseCategory.TRAVEL: return <TravelIcon />;
        case ExpenseCategory.SHOPPING: return <ShoppingIcon />;
        case ExpenseCategory.BILLS: return <BillsIcon />;
        case ExpenseCategory.OTHERS: return <OthersIcon />;
        default: return <OthersIcon />;
    }
}
