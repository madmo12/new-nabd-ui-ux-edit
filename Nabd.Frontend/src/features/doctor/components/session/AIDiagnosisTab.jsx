import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaPaperPlane, FaLightbulb, FaExclamationTriangle, FaStethoscope, FaHeart, FaTerminal, FaShieldAlt } from 'react-icons/fa';
import diagnosisService from '../../../../api/services/diagnosis.service';

/**
 * AIDiagnosisTab - Clinical Intelligence Hub
 * Advanced AI-assisted diagnosis with high-density output.
 */
const AIDiagnosisTab = ({ patientInfo, patientMedicalRecord }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            content: 'مرحباً دكتور! أنا مساعد التشخيص الذكي الخاص بك. يمكنني مساعدتك في تحليل الأعراض وربطها بالتاريخ المرضي للمريض لتقديم أدق النتائج المحتملة. كيف يمكنني مساعدتك اليوم؟',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleQuickSymptom = (text) => {
        setInputValue(text);
        handleSendMessage(text);
    };

    const quickSymptoms = [
        { text: 'صداع مزمن', icon: '🤕' },
        { text: 'ارتفاع حرارة', icon: '🌡️' },
        { text: 'ضيق تنفس', icon: '😷' },
        { text: 'ألم بالصدر', icon: '💔' },
        { text: 'إرهاق شديد', icon: '😫' },
    ];

    const handleSendMessage = async (message = inputValue) => {
        if (!message.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: message,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            let ageValue = patientInfo?.patientAge;
            if (!ageValue && patientInfo?.dateOfBirth) {
                const birthDate = new Date(patientInfo.dateOfBirth);
                const today = new Date();
                ageValue = today.getFullYear() - birthDate.getFullYear();
                if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
                    ageValue--;
                }
            }

            const response = await diagnosisService.getDiagnosis(
                patientInfo?.patientId || 'unknown',
                message,
                ageValue,
                patientInfo?.gender === 'Male' ? 'M' : 'F'
            );

            const dto = response?.data ?? response;

            const aiResponse = {
                id: Date.now() + 1,
                type: 'ai',
                content: dto.suggestedDiagnosis,
                timestamp: new Date(),
                suggestions: ['طلب تحاليل دم كاملة', 'فحص الضغط والسكر'],
                rawData: {
                    normalizedSymptoms: dto.normalizedSymptoms,
                    topResults: dto.topResults?.map(r => ({
                        disease: r.disease,
                        confidence: r.confidence,
                        nameAr: r.nameAr,
                        descriptionAr: r.descriptionAr,
                        precautionsAr: r.precautionsAr,
                    })),
                },
            };

            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'ai',
                content: `⚠️ حدث خطأ في التشخيص. يرجى المحاولة لاحقاً.`,
                timestamp: new Date(),
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const translateSymptom = (symptom) => {
        const translations = {
            'fever': 'حمى', 'cough': 'سعال', 'headache': 'صداع',
            'nausea': 'غثيان', 'vomiting': 'قيء', 'diarrhea': 'إسهال'
        };
        return translations[symptom.toLowerCase()] || symptom;
    };

    return (
        <div className="h-[calc(100vh-200px)] flex flex-col bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden overflow-y-auto no-scrollbar">
            {/* AI Console Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0070CD] text-white flex items-center justify-center shadow-lg shadow-[#0070CD]/20">
                     <FaRobot className="text-lg" />
                  </div>
                  <div>
                     <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Nabd Intelligence</h4>
                     <span className="text-[9px] font-black text-[#0070CD] uppercase tracking-widest">Diagnostic Assistant v2.0</span>
                  </div>
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-100 rounded-full">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Model Online</span>
               </div>
            </div>

            {/* Terminal Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar bg-white">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
                    >
                        {message.type === 'user' ? (
                            <div className="max-w-[80%] bg-slate-900 text-white px-6 py-4 rounded-[1.5rem] rounded-tr-none shadow-xl shadow-slate-900/10">
                                <p className="font-bold text-sm leading-relaxed">{message.content}</p>
                                <span className="text-[8px] mt-2 font-black opacity-40 uppercase tracking-widest block text-right">User Prompt</span>
                            </div>
                        ) : (
                            <div className="w-full space-y-4">
                                <div className="max-w-[90%] bg-slate-50 border border-slate-100 rounded-[2rem] rounded-tl-none p-6 relative">
                                    <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#0070CD] text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-md">
                                        Assistant Output
                                    </div>
                                    
                                    {!message.rawData ? (
                                        <p className="text-slate-800 font-bold text-sm leading-relaxed">{message.content}</p>
                                    ) : (
                                        <div className="space-y-8">
                                            {/* Symptoms Chip Bay */}
                                            <div>
                                                <div className="flex items-center gap-2 mb-3">
                                                    <FaTerminal className="text-[#0070CD] text-[10px]" />
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Normalized Symptoms</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {message.rawData.normalizedSymptoms?.map((s, i) => (
                                                        <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-[#0070CD] rounded-lg text-[10px] font-black uppercase tracking-tight shadow-sm">
                                                            {translateSymptom(s)}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Tactical Results Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {message.rawData.topResults?.map((r, i) => (
                                                    <div key={i} className={`p-5 rounded-2xl border transition-all ${i === 0 ? 'bg-white border-[#0070CD]/20 shadow-lg shadow-[#0070CD]/5 ring-1 ring-[#0070CD]/10' : 'bg-white border-slate-100'}`}>
                                                        <div className="flex justify-between items-center mb-4">
                                                            <h5 className={`font-black text-sm ${i === 0 ? 'text-[#0070CD]' : 'text-slate-700'}`}>
                                                                {r.nameAr || r.disease}
                                                            </h5>
                                                            <div className={`text-[9px] font-black px-2 py-0.5 rounded-md ${i === 0 ? 'bg-[#0070CD] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                                {r.confidence}%
                                                            </div>
                                                        </div>
                                                        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mb-4">
                                                            <div 
                                                                className={`h-full rounded-full transition-all duration-1000 ${i === 0 ? 'bg-[#0070CD]' : 'bg-slate-300'}`}
                                                                style={{ width: `${r.confidence}%` }}
                                                            ></div>
                                                        </div>
                                                        {r.descriptionAr && (
                                                            <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{r.descriptionAr}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* AI Disclaimer */}
                                            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex items-start gap-3">
                                                <FaExclamationTriangle className="text-amber-500 text-sm mt-0.5" />
                                                <p className="text-[9px] text-amber-900 font-bold leading-relaxed uppercase tracking-tight">
                                                   Clinical Alert: AI outputs are advisory. Professional clinical judgement is required for final diagnosis.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-6 w-fit animate-pulse">
                        <FaRobot className="text-[#0070CD] animate-spin text-lg" />
                        <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Synthesizing clinical data...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-6 bg-slate-50 border-t border-slate-100">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="اوصف الحالة الطبية أو ادخل الأعراض الرئيسية هنا..."
                            className="w-full bg-white border border-slate-200 rounded-[1.5rem] px-6 py-4 text-sm font-bold text-slate-800 focus:border-[#0070CD] focus:ring-4 focus:ring-[#0070CD]/5 transition-all outline-none"
                        />
                    </div>
                    <button
                        onClick={() => handleSendMessage()}
                        disabled={!inputValue.trim() || isLoading}
                        className="w-14 h-14 bg-[#0070CD] text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#0070CD]/20 disabled:opacity-20"
                    >
                        <FaPaperPlane />
                    </button>
                </div>
                
                {messages.length === 1 && (
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {quickSymptoms.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleQuickSymptom(q.text)}
                                className="px-4 py-2 bg-white border border-slate-100 text-slate-500 hover:text-[#0070CD] hover:border-[#0070CD]/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                            >
                                {q.text}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIDiagnosisTab;
