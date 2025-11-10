import { useEffect } from 'react';
import { CheckCircle2, Download } from 'lucide-react';

const Toast = ({ message, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-gray-900 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[280px] max-w-[90vw]">
        <div className="flex-shrink-0">
          <CheckCircle2 size={24} className="text-green-400" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm">{message}</div>
          <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <Download size={12} />
            Verifique sua pasta de downloads
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
