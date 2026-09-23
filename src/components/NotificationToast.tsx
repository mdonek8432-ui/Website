import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notification } = useStore();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none transition-all duration-300 transform translate-y-0 opacity-100 max-w-sm w-full px-4">
      <div
        className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-md border ${
          notification.type === 'success'
            ? 'bg-[#131722]/95 border-emerald-500/40 text-emerald-100 shadow-emerald-950/40'
            : notification.type === 'error'
            ? 'bg-[#1a1215]/95 border-rose-500/40 text-rose-100 shadow-rose-950/40'
            : 'bg-[#121620]/95 border-sky-500/40 text-sky-100 shadow-sky-950/40'
        }`}
      >
        <div className="shrink-0">
          {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {notification.type === 'info' && <Info className="w-5 h-5 text-sky-400" />}
        </div>
        <p className="text-sm font-medium leading-snug">{notification.message}</p>
      </div>
    </div>
  );
};
