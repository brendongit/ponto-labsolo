import { useState } from 'react';
import { usePoint } from '../context/PointContext';
import { DollarSign, Clock, Save } from 'lucide-react';
import Toast from '../components/Toast';

const Settings = () => {
  const { salaryConfig, updateSalaryConfig } = usePoint();
  const [salary, setSalary] = useState(salaryConfig?.salary || '');
  const [totalHoursMonth, setTotalHoursMonth] = useState(salaryConfig?.totalHoursMonth || '');
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    const salaryValue = parseFloat(salary);
    const hoursValue = parseFloat(totalHoursMonth);

    if (!salaryValue || salaryValue <= 0) {
      alert('Por favor, informe um salário válido');
      return;
    }

    if (!hoursValue || hoursValue <= 0) {
      alert('Por favor, informe um total de horas válido');
      return;
    }

    updateSalaryConfig({
      salary: salaryValue,
      totalHoursMonth: hoursValue
    });

    setShowToast(true);
  };

  const hourValue = salary && totalHoursMonth ? (parseFloat(salary) / parseFloat(totalHoursMonth)).toFixed(2) : '0.00';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Configurações</h1>
          <p className="text-gray-600">Configure o preço das horas trabalhadas</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Configuração Salarial</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salário Mensal (R$)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  step="0.01"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total de Horas no Mês
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  step="0.01"
                  value={totalHoursMonth}
                  onChange={(e) => setTotalHoursMonth(e.target.value)}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Informe quantas horas você trabalha por mês</p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all"
          >
            <Save size={20} />
            <span>Salvar Configurações</span>
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-md font-semibold text-blue-900 mb-3">Valor da Hora</h3>
          <div className="text-3xl font-bold text-blue-600 mb-4">
            R$ {hourValue}/hora
          </div>

          <div className="space-y-2 text-sm text-blue-800">
            <div className="flex justify-between py-2 border-b border-blue-200">
              <span>Dia de semana (normal):</span>
              <span className="font-semibold">R$ {hourValue}/h</span>
            </div>
            <div className="flex justify-between py-2 border-b border-blue-200">
              <span>Sábado (+70%):</span>
              <span className="font-semibold">R$ {(parseFloat(hourValue) * 1.7).toFixed(2)}/h</span>
            </div>
            <div className="flex justify-between py-2 border-b border-blue-200">
              <span>Domingo (+100%):</span>
              <span className="font-semibold">R$ {(parseFloat(hourValue) * 2).toFixed(2)}/h</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Feriado (+100%):</span>
              <span className="font-semibold">R$ {(parseFloat(hourValue) * 2).toFixed(2)}/h</span>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Informações</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Configure seu salário mensal e total de horas para calcular o valor da hora</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Dias de semana normais são pagos com o valor base da hora</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Sábados têm adicional de 70% sobre o valor da hora</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Domingos e Feriados têm adicional de 100% sobre o valor da hora</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Esses valores serão refletidos no relatório PDF com o card de Pagamento</span>
            </li>
          </ul>
        </div>
      </div>

      {showToast && (
        <Toast
          message="Configurações salvas com sucesso!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Settings;
