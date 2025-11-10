import { useState } from 'react';
import { usePoint } from '../context/PointContext';
import { LogIn, LogOut, MapPin, DollarSign, X } from 'lucide-react';
import { getCurrentLocation } from '../utils/geolocation';

const PointRegister = () => {
  const { currentEntry, registerEntry, registerExit } = usePoint();
  const [loading, setLoading] = useState(false);
  const [showUberModal, setShowUberModal] = useState(false);
  const [uberCost, setUberCost] = useState('');
  const [location, setLocation] = useState('');
  const [manualLocation, setManualLocation] = useState(false);

  const handleEntry = async () => {
    setLoading(true);
    try {
      let detectedLocation = 'Não especificado';

      try {
        detectedLocation = await getCurrentLocation();
      } catch (error) {
        console.error('Erro ao obter localização:', error);
        detectedLocation = 'Localização não disponível';
      }

      setLocation(detectedLocation);
      registerEntry(detectedLocation);
      alert(`Entrada registrada às ${new Date().toTimeString().slice(0, 5)}\nLocal: ${detectedLocation}`);
    } catch (error) {
      alert('Erro ao registrar entrada: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExit = () => {
    setShowUberModal(true);
  };

  const confirmExit = (withUber) => {
    try {
      if (withUber) {
        const cost = parseFloat(uberCost) || 0;
        if (cost <= 0) {
          alert('Por favor, informe um valor válido para o Uber');
          return;
        }
        registerExit(cost, false);
      } else {
        registerExit(0, false);
      }

      setShowUberModal(false);
      setUberCost('');
      alert('Saída registrada com sucesso!');
    } catch (error) {
      alert('Erro ao registrar saída: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Registrar Ponto</h1>
          <p className="text-gray-600">Registre sua entrada e saída diária</p>
        </div>

        {currentEntry && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <LogIn className="text-blue-500 mt-1" size={20} />
              <div className="flex-1">
                <div className="font-semibold text-blue-900 mb-1">Entrada Registrada</div>
                <div className="text-sm text-blue-700">
                  <div>Horário: <span className="font-medium">{currentEntry.entry}</span></div>
                  <div>Data: <span className="font-medium">{new Date(currentEntry.date).toLocaleDateString('pt-BR')}</span></div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={14} />
                    <span>{currentEntry.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {!currentEntry ? (
            <button
              onClick={handleEntry}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <LogIn size={28} />
              <span className="text-xl">{loading ? 'Registrando...' : 'Bater Ponto de Entrada'}</span>
            </button>
          ) : (
            <button
              onClick={handleExit}
              className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white font-bold py-6 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              <LogOut size={28} />
              <span className="text-xl">Bater Ponto de Saída</span>
            </button>
          )}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Informações</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Registre sua entrada ao chegar no trabalho</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Ao registrar a saída, você pode adicionar custos de transporte (Uber)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>A localização é detectada automaticamente</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Você pode editar todos os registros posteriormente no Dashboard</span>
            </li>
          </ul>
        </div>
      </div>

      {showUberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Adicionar custo de transporte?</h3>
              <button
                onClick={() => setShowUberModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-gray-600 mb-6">Deseja adicionar um custo extra de Uber/transporte?</p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor do transporte (R$)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="number"
                  step="0.01"
                  value={uberCost}
                  onChange={(e) => setUberCost(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => confirmExit(false)}
                className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Não, sem custo
              </button>
              <button
                onClick={() => confirmExit(true)}
                className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
              >
                Sim, adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointRegister;
