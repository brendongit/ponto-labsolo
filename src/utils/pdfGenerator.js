import React from 'react';
import { pdf } from '@react-pdf/renderer';
import PDFDocument from '../components/PDFDocument';
import { formatMonth, calculateHoursByDayType, calculateUberTotals } from './dateUtils';

export const generatePDF = async (userName, records, year, month) => {
  const monthName = formatMonth(year, month);
  const hoursByDay = calculateHoursByDayType(records);
  const uberTotals = calculateUberTotals(records);

  // Criar o documento PDF usando o componente React
  const blob = await pdf(
    React.createElement(PDFDocument, {
      userName,
      records,
      monthName,
      hoursByDay,
      uberTotals
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
