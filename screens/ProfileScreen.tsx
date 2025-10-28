
import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../components/UI';
import { SmartSpendData } from '../types';

const ProfileScreen: React.FC<SmartSpendData> = ({ user, updateUser, resetData }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [budget, setBudget] = useState(user.monthlyBudget.toString());

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setBudget(user.monthlyBudget.toString());
    }, [user]);

    const handleSave = () => {
        if (!name || !email || isNaN(parseFloat(budget))) {
            alert('Please fill all fields with valid data.');
            return;
        }
        updateUser({
            name,
            email,
            monthlyBudget: parseFloat(budget),
        });
        alert('Profile updated successfully!');
    };
    
    const handleReset = () => {
        if (confirm('Are you sure you want to reset all your data? This action cannot be undone.')) {
            resetData();
            alert('Data has been reset to default.');
        }
    }

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-800">Profile & Settings</h1>
                <p className="text-gray-500">Manage your account and preferences.</p>
            </header>

            <Card>
                <div className="space-y-4">
                    <Input 
                        label="Name"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input 
                        label="Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                     <Input 
                        label="Monthly Budget Goal (₹)"
                        id="budget"
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                    />
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>
            </Card>

            <Card>
                <h2 className="text-lg font-semibold mb-4">Data Management</h2>
                <div className="space-y-4">
                    <Button onClick={handleReset} variant="danger">
                        Reset All Data
                    </Button>
                    <Button onClick={() => alert('Logged out successfully!')} variant="secondary">
                        Logout
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ProfileScreen;
