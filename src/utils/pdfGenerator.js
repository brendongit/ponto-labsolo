import React from 'react';
import { pdf } from '@react-pdf/renderer';
import PDFDocument from '../components/PDFDocument';
import { formatMonth, calculateHoursByDayType, calculateUberTotals, calculateTotalHours, calculatePayment } from './dateUtils';

export const generatePDF = async (userName, records, year, month, salaryConfig) => {
  const monthName = formatMonth(year, month);
  const hoursByDay = calculateHoursByDayType(records);
  const uberTotals = calculateUberTotals(records);
  const totalHours = calculateTotalHours(records);
  const payment = calculatePayment(records, salaryConfig);

  // Criar o documento PDF usando o componente React
  const blob = await pdf(
    React.createElement(PDFDocument, {
      userName,
      records,
      monthName,
      hoursByDay,
      uberTotals,
      totalHours,
      payment
    })
  ).toBlob();

  // Criar URL e fazer download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `relatorio_${monthName.replace(/\s+/g, '_').toLowerCase()}.pdf`;
  link.click();

  // Limpar
  URL.revokeObjectURL(url);
};
