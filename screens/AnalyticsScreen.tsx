
import React, { useState, useMemo } from 'react';
import { Card, Button } from '../components/UI';
import { MonthlyBarChart, SavingsLineChart } from '../components/Charts';
import { SmartSpendData } from '../types';
import { generateInsights } from '../services/geminiService';

const AnalyticsScreen: React.FC<SmartSpendData> = (props) => {
    const { analyticsData, expenseByCategory, currentMonthExpense } = props;
    const [insights, setInsights] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const biggestSpendingCategory = useMemo(() => {
        if (expenseByCategory.length === 0) return null;
        return expenseByCategory.reduce((max, cat) => cat.value > max.value ? cat : max);
    }, [expenseByCategory]);

    const savingsTrend = useMemo(() => {
        if (analyticsData.length < 2) return null;
        const lastMonth = analyticsData[analyticsData.length - 1];
        const secondLastMonth = analyticsData[analyticsData.length - 2];
        if (lastMonth.savings > secondLastMonth.savings) return "Your savings are increasing compared to last month. Keep it up!";
        if (lastMonth.savings < secondLastMonth.savings) return "Your savings have decreased compared to last month. Let's get back on track!";
        return "Your savings are stable compared to last month.";
    }, [analyticsData]);
    
    const handleGetInsights = async () => {
        setIsLoading(true);
        setInsights('');
        const result = await generateInsights(props);
        setInsights(result);
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
                <p className="text-gray-500">Visualize your financial habits.</p>
            </header>

            <Card>
                <h2 className="text-lg font-semibold mb-4">Monthly Income vs. Expense</h2>
                <MonthlyBarChart data={analyticsData} />
            </Card>

            <Card>
                <h2 className="text-lg font-semibold mb-4">Savings Trend</h2>
                <SavingsLineChart data={analyticsData} />
            </Card>

            <Card>
                <h2 className="text-lg font-semibold mb-2">Key Insights</h2>
                <div className="space-y-2 text-gray-600">
                    {biggestSpendingCategory && <p>💡 Your biggest spending this month is on <span className="font-bold">{biggestSpendingCategory.name}</span>.</p>}
                    {savingsTrend && <p>📈 {savingsTrend}</p>}
                </div>
            </Card>
            
            <Card>
                <h2 className="text-lg font-semibold mb-2">AI-Powered Saving Tips</h2>
                {insights && <div className="p-4 bg-blue-50 rounded-lg text-blue-800 whitespace-pre-wrap">{insights}</div>}
                <Button onClick={handleGetInsights} disabled={isLoading} className="mt-4">
                    {isLoading ? 'Generating...' : 'Get AI Insights'}
                </Button>
            </Card>
        </div>
    );
};

export default AnalyticsScreen;
