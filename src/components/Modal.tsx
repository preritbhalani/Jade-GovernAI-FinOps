import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && (
          <div className="flex items-center justify-end p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl space-x-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
