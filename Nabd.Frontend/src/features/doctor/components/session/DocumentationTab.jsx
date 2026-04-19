import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaSave, FaNotesMedical, FaHistory, FaUserMd, FaClipboardCheck, FaTasks, FaTerminal } from 'react-icons/fa';

/**
 * DocumentationTab - Clinical Notes Module
 * Tactical input area for rapid medical documentation.
 */
const DocumentationTab = ({ docForm, onDocFormChange, autoSaveStatus }) => {
  const fields = [
    {
      key: 'chiefComplaint',
      label: 'الشكوى الرئيسية',
      icon: FaNotesMedical,
      placeholder: 'الإبلاغ عن درجة الحرارة وصداع...',
      rows: 2,
    },
    {
      key: 'historyOfPresentIllness',
      label: 'تاريخ المرض الحالي',
      icon: FaHistory,
      placeholder: 'بدأت الأعراض منذ يومين، مع تفاقم تدريجي للشدة...',
      rows: 2,
    },
    {
      key: 'physicalExamination',
      label: 'الفحص السريري',
      icon: FaUserMd,
      placeholder: 'احتقان في الحلق، صوت صفير خفيف في الصدر...',
      rows: 2,
    },
    {
      key: 'diagnosis',
      label: 'التقييم والتشخيص',
      icon: FaClipboardCheck,
      placeholder: 'وصف الحالة المرضية الحالية...',
      rows: 2,
    },
    {
      key: 'managementPlan',
      label: 'الخطة العلاجية والدوائية',
      icon: FaTasks,
      placeholder: 'وصف دواء علاج موسع للشعب الهوائية، متابعة بعد 3 أيام...',
      rows: 3,
      fullWidth: true
    }
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Tactical Status Readout */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0070CD]/5 flex items-center justify-center text-[#0070CD]">
               <FaTerminal className="text-xs" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Documentation System v1.0</span>
         </div>

         <AnimatePresence>
           {autoSaveStatus && (
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all animate-in fade-in slide-in-from-right-2">
                {autoSaveStatus === 'saving' ? (
                  <div className="flex items-center gap-2 text-[#0070CD]">
                     <div className="animate-spin rounded-full h-2 w-2 border border-[#0070CD] border-t-transparent"></div>
                     <span>Syncing with server</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-600">
                     <FaSave className="text-xs" />
                     <span>Cloud Persisted</span>
                  </div>
                )}
             </div>
           )}
         </AnimatePresence>
      </div>

      {/* High-Density Note Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div
              key={field.key}
              className={`flex flex-col group ${field.fullWidth ? 'md:col-span-2' : ''}`}
            >
              <label className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                   <Icon className="text-xs text-slate-300 group-focus-within:text-[#0070CD] transition-colors" />
                   <span className="text-xs font-black text-slate-700 uppercase tracking-tight">{field.label}</span>
                </div>
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest opacity-0 group-focus-within:opacity-100 transition-opacity">Active Entry</span>
              </label>
              
              <div className="relative">
                 <textarea
                   value={docForm[field.key]}
                   onChange={(e) => onDocFormChange(field.key, e.target.value)}
                   rows={field.rows}
                   className="w-full bg-white border border-slate-100 rounded-3xl px-6 py-5 text-sm font-bold text-slate-800 focus:border-[#0070CD]/30 focus:ring-4 focus:ring-[#0070CD]/5 transition-all resize-none placeholder:text-slate-300 leading-relaxed shadow-sm hover:border-slate-200"
                   placeholder={field.placeholder}
                 />
                 <div className="absolute bottom-4 left-6 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-100 group-focus-within:bg-[#0070CD] transition-colors shadow-[0_0_8px_rgba(0,112,205,0)] group-focus-within:shadow-[0_0_8px_rgba(0,112,205,0.4)]"></div>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentationTab;
