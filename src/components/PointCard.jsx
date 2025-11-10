import { Pencil, Trash2, Check, X } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { useState } from 'react';

const PointCard = ({ record, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...record });

  const handleSave = () => {
    onUpdate(record.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...record });
    setIsEditing(false);
  };

  const togglePaid = () => {
    onUpdate(record.id, { paid: !record.paid });
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-3">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Entrada</label>
            <input
              type="time"
              value={editData.entry}
              onChange={(e) => setEditData({ ...editData, entry: e.target.value })}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Saída</label>
            <input
              type="time"
              value={editData.exit}
              onChange={(e) => setEditData({ ...editData, exit: e.target.value })}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Uber (R$)</label>
            <input
              type="number"
              step="0.01"
              value={editData.uberCost}
              onChange={(e) => setEditData({ ...editData, uberCost: parseFloat(e.target.value) || 0 })}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Local</label>
            <input
              type="text"
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm flex items-center gap-1"
          >
            <X size={16} />
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm flex items-center gap-1"
          >
            <Check size={16} />
            Salvar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-800">{formatDate(record.date)}</div>
          <div className="text-xs text-gray-500 mt-1">{record.location}</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(record.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-2">
        <div>
          <div className="text-xs text-gray-500">Entrada</div>
          <div className="text-sm font-medium">{record.entry}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Saída</div>
          <div className="text-sm font-medium">{record.exit}</div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t">
        <div>
          <div className="text-xs text-gray-500">Duração</div>
          <div className="text-sm font-medium">{record.duration}</div>
        </div>

        {record.uberCost > 0 && (
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-xs text-gray-500">Uber</div>
              <div className="text-sm font-medium">R$ {record.uberCost.toFixed(2)}</div>
            </div>
            <button
              onClick={togglePaid}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                record.paid
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {record.paid ? 'Pago' : 'Não pago'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PointCard;
