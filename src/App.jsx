import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PointProvider } from './context/PointContext';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import PointRegister from './pages/PointRegister';

function App() {
  return (
    <PointProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
          <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">MeuPonto</h1>
                  <p className="text-xs text-gray-500">Sistema de Registro de Ponto</p>
                </div>
              </div>
            </div>
            <Navigation />
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ponto" element={<PointRegister />} />
            </Routes>
          </main>
        </div>
      </Router>
    </PointProvider>
  );
}

export default App;
