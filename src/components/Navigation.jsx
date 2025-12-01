import { NavLink } from 'react-router-dom';
import { Home, Clock, Settings } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:static md:shadow-none z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-around md:justify-start md:gap-4 py-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Home size={20} />
            <span className="hidden md:inline">Dashboard</span>
          </NavLink>

          <NavLink
            to="/ponto"
            className={({ isActive }) =>
              `flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Clock size={20} />
            <span className="hidden md:inline">Bater Ponto</span>
          </NavLink>

          <NavLink
            to="/configuracoes"
            className={({ isActive }) =>
              `flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <Settings size={20} />
            <span className="hidden md:inline">Configurações</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
