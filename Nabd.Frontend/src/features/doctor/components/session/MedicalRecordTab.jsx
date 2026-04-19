import React from 'react';
import { FaNotesMedical, FaPrescriptionBottleAlt, FaCalendarAlt, FaAllergies, FaHeartbeat, FaProcedures, FaTerminal, FaHistory } from 'react-icons/fa';

/**
 * MedicalRecordTab - High-Density History Matrix
 * Tactical review of patient medical background.
 */
const MedicalRecordTab = ({ patientMedicalRecord, loading, onFetchMedicalRecord }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] bg-white border border-slate-100 rounded-[2.5rem]">
        <div className="w-12 h-12 border-4 border-[#0070CD] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#0070CD]/60">Accessing Cloud Records...</p>
      </div>
    );
  }

  if (!patientMedicalRecord) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] bg-white border border-slate-100 rounded-[2.5rem] p-12 text-center">
        <FaNotesMedical className="text-4xl text-slate-100 mb-4" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">No historical records synchronized</p>
        <button
          onClick={onFetchMedicalRecord}
          className="px-8 py-3 bg-[#0070CD] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:shadow-xl hover:scale-105 transition-all shadow-[#0070CD]/20"
        >
          Initialize Sync
        </button>
      </div>
    );
  }

  const sections = [
    {
      title: 'الحساسية الدوائية',
      data: patientMedicalRecord.drugAllergies,
      icon: FaAllergies,
      badge: 'Critical High',
      badgeColor: 'text-rose-500 bg-rose-50',
      renderItem: (allergy) => (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-slate-900 mb-1">{allergy.drugName}</p>
            <p className="text-[10px] font-black text-rose-600/70 uppercase tracking-tight">{allergy.reaction}</p>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
        </div>
      ),
    },
    {
      title: 'الأمراض المزمنة',
      data: patientMedicalRecord.chronicDiseases,
      icon: FaHeartbeat,
      badge: 'Long-term',
      badgeColor: 'text-amber-500 bg-amber-50',
      renderItem: (disease) => (
        <div>
          <p className="text-xs font-black text-slate-900 mb-1">{disease.diseaseName}</p>
          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <FaCalendarAlt className="text-[8px]" />
            <span>Active Since: {disease.createdAt ? new Date(disease.createdAt).toLocaleDateString('ar-EG') : '--'}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'الأدوية النشطة',
      data: patientMedicalRecord.currentMedications,
      icon: FaPrescriptionBottleAlt,
      badge: 'Active Regimen',
      badgeColor: 'text-[#0070CD] bg-blue-50',
      renderItem: (medication) => (
        <div>
          <p className="text-xs font-black text-slate-900 mb-1">{medication.medicationName}</p>
          {medication.reason && (
            <span className="text-[10px] font-black text-[#0070CD] opacity-60 bg-[#0070CD]/5 px-2 py-0.5 rounded-md uppercase tracking-tight">
              {medication.reason}
            </span>
          )}
        </div>
      ),
    },
    {
      title: 'التاريخ الجراحي',
      data: patientMedicalRecord.previousSurgeries,
      icon: FaProcedures,
      badge: 'Past Procedures',
      badgeColor: 'text-slate-500 bg-slate-50',
      renderItem: (surgery) => (
        <div className="flex items-center justify-between">
           <div>
              <p className="text-xs font-black text-slate-900 mb-1">{surgery.surgeryName}</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Performed {surgery.surgeryDate ? new Date(surgery.surgeryDate).toLocaleDateString('ar-EG') : '--'}</p>
           </div>
           <FaHistory className="text-[10px] text-slate-200" />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 px-2">
         <div className="w-8 h-8 rounded-lg bg-[#0070CD]/5 flex items-center justify-center text-[#0070CD]">
            <FaTerminal className="text-xs" />
         </div>
         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Archived Clinical History</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden flex flex-col shadow-sm group hover:border-[#0070CD]/20 transition-all">
              <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-[#0070CD] group-hover:text-white transition-all shadow-sm">
                    <Icon className="text-sm" />
                  </div>
                  <h4 className="text-xs font-black tracking-tight text-slate-800 uppercase">{section.title}</h4>
                </div>
                <span className={`text-[8px] font-black ${section.badgeColor} px-2 py-1 rounded-md uppercase tracking-widest`}>
                   {section.badge} ({section.data?.length || 0})
                </span>
              </div>

              <div className="p-6 space-y-3 max-h-[250px] overflow-y-auto no-scrollbar">
                {section.data && section.data.length > 0 ? (
                  section.data.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="bg-slate-50/50 border border-slate-100/50 rounded-2xl p-4 hover:bg-white hover:border-slate-100 transition-all"
                    >
                      {section.renderItem(item)}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 opacity-20">
                    <Icon className="text-2xl mb-2" />
                    <p className="text-[9px] font-black uppercase tracking-widest">No Record Data</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MedicalRecordTab;
