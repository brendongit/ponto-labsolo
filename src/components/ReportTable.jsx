import { formatDate } from '../utils/dateUtils';
import { Pencil, Trash2 } from 'lucide-react';

const ReportTable = ({ records, onEdit, onDelete, onTogglePaid }) => {
  if (records.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        Nenhum registro encontrado para este período
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">Data</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">Entrada</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">Saída</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">Duração</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">Uber</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase">Local</th>
            <th className="px-4 py-3 text-center text-xs font-medium uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{formatDate(record.date)}</td>
              <td className="px-4 py-3 text-sm">{record.entry}</td>
              <td className="px-4 py-3 text-sm">{record.exit}</td>
              <td className="px-4 py-3 text-sm font-medium">{record.duration}</td>
              <td className="px-4 py-3 text-sm">
                {record.uberCost > 0 ? `R$ ${record.uberCost.toFixed(2)}` : '-'}
              </td>
              <td className="px-4 py-3 text-sm">
                {record.uberCost > 0 ? (
                  <button
                    onClick={() => onTogglePaid(record.id, !record.paid)}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.paid
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {record.paid ? 'Pago' : 'Não pago'}
                  </button>
                ) : (
                  '-'
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{record.location}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(record)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(record.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
