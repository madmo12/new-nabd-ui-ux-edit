import React from 'react';
import { Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const AISection = () => {
    return (
        <section id="ai-section" className="py-32 bg-slate-900 relative overflow-hidden">
            {/* Advanced Ambient Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-center">

                    {/* Content Section */}
                    <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-1000">
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 backdrop-blur-md shadow-2xl">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-[0.2em]">الذكاء الاصطناعي التوليدي</span>
                        </div>

                        <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                            تحليل فوري، <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 italic">رؤية طبية أعمق</span>
                        </h2>

                        <p className="text-slate-400 text-xl leading-relaxed font-medium">
                            تتجاوز تقنياتنا مجرد معالجة البيانات؛ فهي تفهم التعقيدات الطبية بصورة لحظية، مما يمنح الفريق الطبي أداة استرشادية تقلل من هامش الخطأ البشري إلى أدنى مستوياته.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                "تحليل حيوي للأعراض",
                                "تنبؤات دقيقة 99%",
                                "كشف التداخلات الدوائية",
                                "متابعة ذكية ومستمرة"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-4 group cursor-default p-4 rounded-2xl transition-all hover:bg-white/5 border border-transparent hover:border-white/5 shadow-sm">
                                    <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 shadow-inner">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <span className="text-slate-300 font-bold group-hover:text-white transition-colors">{item}</span>
                                </div>
                            ))}
                        </div>

                        <button className="group relative px-10 py-5 bg-teal-600 text-white rounded-[1.5rem] font-black transition-all hover:bg-teal-500 shadow-2xl shadow-teal-900/40 hover:-translate-y-1 active:translate-y-0.5 overflow-hidden flex items-center gap-4">
                            <span>استكشف الذكاء الاصطناعي</span>
                            <ArrowRight className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                        </button>
                    </div>

                    {/* Visual Section: Diagnosis Canvas */}
                    <div className="relative animate-in fade-in slide-in-from-left-10 duration-1000">
                        {/* Mesh Decorations */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl"></div>
                        
                        <div className="bg-white/5 backdrop-blur-[40px] border border-white/10 rounded-[3rem] p-10 shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative overflow-hidden group">
                            {/* Card Background Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none"></div>

                            <div className="flex items-center gap-5 mb-10 border-b border-white/5 pb-8 relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-500/20 group-hover:rotate-6 transition-transform">
                                    <Sparkles className="w-9 h-9 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-white font-black text-xl tracking-tight">قراءة العلامات الحيوية</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                                        <span className="text-teal-400 text-xs font-black uppercase tracking-widest">Processing Session...</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="bg-slate-800/50 rounded-3xl p-6 border border-white/5 transition-all hover:bg-slate-800 hover:border-white/10 group/item">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-slate-400 font-bold text-sm">احتمالية التشخيص</span>
                                        <span className="text-teal-400 font-black text-lg">95%</span>
                                    </div>
                                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                                        <div className="h-full bg-gradient-to-r from-teal-600 to-teal-400 w-[95%] shadow-[0_0_15px_rgba(45,212,191,0.5)] transition-all duration-1000 group-hover/item:animate-pulse"></div>
                                    </div>
                                    <p className="text-white font-black text-lg mt-4 tracking-tight">التهاب الشعب الهوائية الحاد</p>
                                </div>

                                <div className="bg-slate-800/30 rounded-3xl p-6 border border-white/5 opacity-80 filter blur-[1px] hover:blur-0 transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-slate-500 font-bold text-sm">احتمالية التشخيص</span>
                                        <span className="text-teal-600 font-black text-lg">82%</span>
                                    </div>
                                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                        <div className="h-full bg-slate-500 w-[82%]"></div>
                                    </div>
                                    <p className="text-slate-400 font-black text-lg mt-4">التهاب رئوي متقدم</p>
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/5 text-center relative z-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                                    <CheckCircle className="w-4 h-4 text-teal-500" />
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider">
                                        Validated by Nabd Global Health Database
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AISection;
