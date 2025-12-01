import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (dateString) => {
  try {
    // Parse a data no timezone local para evitar problemas com UTC
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  } catch {
    return dateString;
  }
};

// Retorna o tipo de dia (weekday, saturday, sunday) baseado na data
export const getDayType = (dateString) => {
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

    if (dayOfWeek === 0) return 'sunday';
    if (dayOfWeek === 6) return 'saturday';
    return 'weekday';
  } catch {
    return 'weekday';
  }
};

export const formatMonth = (year, month) => {
  const date = new Date(year, month, 1);
  return format(date, 'MMMM yyyy', { locale: ptBR });
};

export const getCurrentMonth = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth()
  };
};

export const calculateTotalHours = (records) => {
  let totalMinutes = 0;

  records.forEach(record => {
    if (record.duration) {
      const [hours, minutes] = record.duration.split('h ').map(part =>
        parseInt(part.replace('m', '')) || 0
      );
      totalMinutes += hours * 60 + minutes;
    }
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

export const calculateTotalUber = (records) => {
  return records.reduce((sum, record) => sum + (record.uberCost || 0), 0);
};

export const countUberStatus = (records) => {
  const paid = records.filter(r => r.uberCost > 0 && r.paid).length;
  const unpaid = records.filter(r => r.uberCost > 0 && !r.paid).length;

  return { paid, unpaid };
};

export const calculateHoursByDayType = (records) => {
  let saturdayMinutes = 0;
  let sundayMinutes = 0;
  let weekdayMinutes = 0;
  let holidayMinutes = 0;

  records.forEach(record => {
    if (record.duration) {
      const [hours, minutes] = record.duration.split('h ').map(part =>
        parseInt(part.replace('m', '')) || 0
      );
      const totalMinutes = hours * 60 + minutes;

      // Verificar se está marcado como feriado primeiro
      if (record.isHoliday) {
        holidayMinutes += totalMinutes;
      } else {
        // Garantir que a data seja interpretada no timezone local
        const [year, month, day] = record.date.split('-').map(Number);
        const date = new Date(year, month - 1, day); // month é 0-indexed
        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

        if (dayOfWeek === 0) {
          sundayMinutes += totalMinutes;
        } else if (dayOfWeek === 6) {
          saturdayMinutes += totalMinutes;
        } else {
          weekdayMinutes += totalMinutes;
        }
      }
    }
  });

  const formatMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return {
    saturday: formatMinutes(saturdayMinutes),
    sunday: formatMinutes(sundayMinutes),
    weekday: formatMinutes(weekdayMinutes),
    holiday: formatMinutes(holidayMinutes)
  };
};

export const calculateUberTotals = (records) => {
  const paidTotal = records
    .filter(r => r.uberCost > 0 && r.paid)
    .reduce((sum, r) => sum + r.uberCost, 0);

  const unpaidTotal = records
    .filter(r => r.uberCost > 0 && !r.paid)
    .reduce((sum, r) => sum + r.uberCost, 0);

  const total = paidTotal + unpaidTotal;

  return { total, paid: paidTotal, unpaid: unpaidTotal };
};

// Converte horas no formato "Xh Ym" para minutos
const parseHoursToMinutes = (hoursString) => {
  if (!hoursString) return 0;
  const [hours, minutes] = hoursString.split('h ').map(part =>
    parseInt(part.replace('m', '')) || 0
  );
  return hours * 60 + minutes;
};

// Calcula o pagamento baseado nas horas trabalhadas e configuração salarial
export const calculatePayment = (records, salaryConfig) => {
  if (!salaryConfig || !salaryConfig.salary || !salaryConfig.totalHoursMonth) {
    return {
      total: 0,
      weekday: 0,
      saturday: 0,
      sunday: 0,
      holiday: 0,
      hourValue: 0
    };
  }

  const hourValue = salaryConfig.salary / salaryConfig.totalHoursMonth;

  let weekdayMinutes = 0;
  let saturdayMinutes = 0;
  let sundayMinutes = 0;
  let holidayMinutes = 0;

  records.forEach(record => {
    if (record.duration) {
      const totalMinutes = parseHoursToMinutes(record.duration);

      // Verificar se está marcado como feriado primeiro
      if (record.isHoliday) {
        holidayMinutes += totalMinutes;
      } else {
        // Garantir que a data seja interpretada no timezone local
        const [year, month, day] = record.date.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

        if (dayOfWeek === 0) {
          sundayMinutes += totalMinutes;
        } else if (dayOfWeek === 6) {
          saturdayMinutes += totalMinutes;
        } else {
          weekdayMinutes += totalMinutes;
        }
      }
    }
  });

  // Converter minutos para horas decimais
  const weekdayHours = weekdayMinutes / 60;
  const saturdayHours = saturdayMinutes / 60;
  const sundayHours = sundayMinutes / 60;
  const holidayHours = holidayMinutes / 60;

  // Calcular pagamento
  // Dia de semana: valor base
  // Sábado: valor base + 70%
  // Domingo: valor base + 100%
  // Feriado: valor base + 100%
  const weekdayPayment = weekdayHours * hourValue;
  const saturdayPayment = saturdayHours * hourValue * 1.7;
  const sundayPayment = sundayHours * hourValue * 2;
  const holidayPayment = holidayHours * hourValue * 2;

  const total = weekdayPayment + saturdayPayment + sundayPayment + holidayPayment;

  return {
    total,
    weekday: weekdayPayment,
    saturday: saturdayPayment,
    sunday: sundayPayment,
    holiday: holidayPayment,
    hourValue
  };
};
