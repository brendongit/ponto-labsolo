import { FileDown } from 'lucide-react';
import { useState } from 'react';
import { generatePDF } from '../utils/pdfGenerator';

const PDFButton = ({ userName, records, year, month }) => {
  const [loading, setLoading] = useState(false);

  const handleGeneratePDF = async () => {
    if (records.length === 0) {
      alert('Não há registros para gerar o PDF');
      return;
    }

    try {
      setLoading(true);
      await generatePDF(userName, records, year, month);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGeneratePDF}
      disabled={loading}
      className={`w-full md:w-auto flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <FileDown size={20} />
      {loading ? 'Gerando PDF...' : 'Gerar Relatório PDF'}
    </button>
  );
};

export default PDFButton;
