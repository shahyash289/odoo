import React, { useState, useEffect } from 'react';
import { Calendar, Filter, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Salary {
  _id: string;
  basicSalary: number;
  allowances: {
    hra: number;
    da: number;
    medical: number;
    ta: number;
    total: number;
  };
  deductions: {
    pf: number;
    tax: number;
    insurance: number;
    total: number;
  };
  netSalary: number;
  paymentDate: string;
  status: 'pending' | 'paid' | 'cancelled';
  month: number;
  year: number;
}

const ViewSalary = () => {
  const navigate = useNavigate();
  // Static salary data for demo
  const [salaries] = useState<Salary[]>([
    {
      _id: '1',
      basicSalary: 30000,
      allowances: {
        hra: 8000,
        da: 4000,
        medical: 2000,
        ta: 1000,
        total: 15000
      },
      deductions: {
        pf: 1800,
        tax: 2500,
        insurance: 500,
        total: 4800
      },
      netSalary: 40200,
      paymentDate: '2025-08-31',
      status: 'pending',
      month: 8,
      year: 2025
    },
    {
      _id: '2',
      basicSalary: 30000,
      allowances: {
        hra: 8000,
        da: 4000,
        medical: 2000,
        ta: 1000,
        total: 15000
      },
      deductions: {
        pf: 1800,
        tax: 2500,
        insurance: 500,
        total: 4800
      },
      netSalary: 40200,
      paymentDate: '2025-07-31',
      status: 'paid',
      month: 7,
      year: 2025
    },
    {
      _id: '3',
      basicSalary: 30000,
      allowances: {
        hra: 8000,
        da: 4000,
        medical: 2000,
        ta: 1000,
        total: 15000
      },
      deductions: {
        pf: 1800,
        tax: 2500,
        insurance: 500,
        total: 4800
      },
      netSalary: 40200,
      paymentDate: '2025-06-30',
      status: 'paid',
      month: 6,
      year: 2025
    }
  ]);
  const [filter, setFilter] = useState('all');
  const [loading] = useState(false);
  const [error] = useState('');

  const getMonthName = (month: number) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1];
  };

  const filteredSalaries = filter === 'all' 
    ? salaries 
    : salaries.filter(salary => salary.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Salary History</h2>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid gap-4">
        {filteredSalaries.map((salary) => (
          <div key={salary._id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <Calendar size={18} className="text-gray-500" />
                  <span className="font-medium">
                    {salary.month && salary.year ? 
                      `${getMonthName(salary.month)} ${salary.year}` : 
                      new Date(salary.paymentDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-gray-600">
                  <p className="flex items-center">
                    <IndianRupee size={16} className="mr-1" />
                    Basic: {formatCurrency(salary.basicSalary)}
                  </p>
                  <p>Allowances: {formatCurrency(salary.allowances.total)}</p>
                  <p>Deductions: {formatCurrency(salary.deductions.total)}</p>
                  <p className="font-semibold">Net Salary: {formatCurrency(salary.netSalary)}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(salary.status)}`}>
                  {salary.status.charAt(0).toUpperCase() + salary.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && filteredSalaries.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No salary records found</p>
      )}
    </div>
  );
};

export default ViewSalary;
