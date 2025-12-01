import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PointContext = createContext();

export const usePoint = () => {
  const context = useContext(PointContext);
  if (!context) {
    throw new Error('usePoint must be used within a PointProvider');
  }
  return context;
};

export const PointProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('meuPonto_user');
    return saved ? JSON.parse(saved) : { name: 'Brendon Ribeiro' };
  });

  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem('meuPonto_records');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentEntry, setCurrentEntry] = useState(() => {
    const saved = localStorage.getItem('meuPonto_currentEntry');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('meuPonto_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('meuPonto_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    if (currentEntry) {
      localStorage.setItem('meuPonto_currentEntry', JSON.stringify(currentEntry));
    } else {
      localStorage.removeItem('meuPonto_currentEntry');
    }
  }, [currentEntry]);

  const registerEntry = (location) => {
    const now = new Date();
    // Usar data local ao invés de UTC para evitar problemas de fuso horário
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const localDate = `${year}-${month}-${day}`;

    const entry = {
      id: uuidv4(),
      date: localDate,
      entry: now.toTimeString().slice(0, 5),
      location: location || 'Não especificado'
    };
    setCurrentEntry(entry);
    return entry;
  };

  // Função helper para calcular duração
  const calculateDuration = (entryTime, exitTime) => {
    if (!entryTime || !exitTime) return null;

    const [entryHour, entryMinute] = entryTime.split(':').map(Number);
    const [exitHour, exitMinute] = exitTime.split(':').map(Number);

    const entryDate = new Date();
    entryDate.setHours(entryHour, entryMinute, 0, 0);

    const exitDate = new Date();
    exitDate.setHours(exitHour, exitMinute, 0, 0);

    // Se saída for antes da entrada, assume que passou para o dia seguinte
    if (exitDate < entryDate) {
      exitDate.setDate(exitDate.getDate() + 1);
    }

    const diffMs = exitDate - entryDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours}h ${diffMinutes}m`;
  };

  const registerExit = (uberCost = 0, paid = false) => {
    if (!currentEntry) {
      throw new Error('Nenhuma entrada registrada');
    }

    const now = new Date();
    const exitTime = now.toTimeString().slice(0, 5);
    const duration = calculateDuration(currentEntry.entry, exitTime);

    const newRecord = {
      ...currentEntry,
      exit: exitTime,
      duration,
      uberCost: parseFloat(uberCost) || 0,
      paid
    };

    setRecords(prev => [newRecord, ...prev]);
    setCurrentEntry(null);
    return newRecord;
  };

  const updateRecord = (id, updates) => {
    setRecords(prev =>
      prev.map(record => {
        if (record.id === id) {
          // Primeiro aplicar as atualizações
          const updatedRecord = { ...record, ...updates };

          // SEMPRE recalcular duração se temos entry E exit
          const entry = updatedRecord.entry;
          const exit = updatedRecord.exit;

          if (entry && exit) {
            updatedRecord.duration = calculateDuration(entry, exit);
          }

          return updatedRecord;
        }
        return record;
      })
    );
  };

  const deleteRecord = (id) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const getRecordsByMonth = (year, month) => {
    return records.filter(record => {
      // Parse da data no timezone local para evitar problemas com UTC
      const [recordYear, recordMonth, recordDay] = record.date.split('-').map(Number);
      const recordDate = new Date(recordYear, recordMonth - 1, recordDay);
      return recordDate.getFullYear() === year && recordDate.getMonth() === month;
    });
  };

  const updateUser = (newUserData) => {
    setUser(prev => ({ ...prev, ...newUserData }));
  };

  const value = {
    user,
    updateUser,
    records,
    currentEntry,
    registerEntry,
    registerExit,
    updateRecord,
    deleteRecord,
    getRecordsByMonth
  };

  return (
    <PointContext.Provider value={value}>
      {children}
    </PointContext.Provider>
  );
};
