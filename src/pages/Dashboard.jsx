import { useState } from 'react';
import { usePoint } from '../context/PointContext';
import { getCurrentMonth, calculateTotalHours, calculateTotalUber, countUberStatus, formatMonth } from '../utils/dateUtils';
import PointCard from '../components/PointCard';
import PDFButton from '../components/PDFButton';
import { Calendar, Clock, DollarSign, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user, records, updateRecord, deleteRecord, getRecordsByMonth } = usePoint();
  const [selectedMonth, setSelectedMonth] = useState(() => getCurrentMonth());

  const monthRecords = getRecordsByMonth(selectedMonth.year, selectedMonth.month);

  const totalHours = calculateTotalHours(monthRecords);
  const totalUber = calculateTotalUber(monthRecords);
  const { paid, unpaid } = countUberStatus(monthRecords);

  const handleMonthChange = (direction) => {
    setSelectedMonth(prev => {
      let newMonth = prev.month + direction;
      let newYear = prev.year;

      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }

      return { year: newYear, month: newMonth };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Olá, {user.name}</p>
        </div>

        <div className="flex items-center justify-between mb-6 bg-white rounded-lg shadow p-4">
          <button
            onClick={() => handleMonthChange(-1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium"
          >
            ←
          </button>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800 capitalize">
              {formatMonth(selectedMonth.year, selectedMonth.month)}
            </div>
          </div>
          <button
            onClick={() => handleMonthChange(1)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium"
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 text-blue-500 mb-2">
              <Calendar size={20} />
              <span className="text-sm font-medium">Dias Trabalhados</span>
            </div>
            <div className="text-2xl font-bold">{monthRecords.length}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 text-green-500 mb-2">
              <Clock size={20} />
              <span className="text-sm font-medium">Total de Horas</span>
            </div>
            <div className="text-2xl font-bold">{totalHours}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 text-purple-500 mb-2">
              <DollarSign size={20} />
              <span className="text-sm font-medium">Total Uber</span>
            </div>
            <div className="text-2xl font-bold">R$ {totalUber.toFixed(2)}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-2 text-orange-500 mb-2">
              <TrendingUp size={20} />
              <span className="text-sm font-medium">Status Uber</span>
            </div>
            <div className="text-sm">
              <span className="text-green-600 font-medium">✓ {paid}</span>
              {' / '}
              <span className="text-red-600 font-medium">✗ {unpaid}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <PDFButton
            userName={user.name}
            records={monthRecords}
            year={selectedMonth.year}
            month={selectedMonth.month}
          />
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Registros do Mês</h2>
        </div>

        {monthRecords.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            Nenhum registro encontrado para este mês
          </div>
        ) : (
          <div className="space-y-3">
            {monthRecords.map((record) => (
              <PointCard
                key={record.id}
                record={record}
                onUpdate={updateRecord}
                onDelete={deleteRecord}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
