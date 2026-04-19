import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, User, Stethoscope, Shield, Activity, Clock, Heart } from 'lucide-react';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#F8FAFC]">
            {/* Professional Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none"
                style={{ backgroundImage: 'radial-gradient(#0D9488 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>
            
            {/* Sophisticated Glows */}
            <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <div className="text-center lg:text-right space-y-10">
                    <div className="flex justify-center lg:justify-start">
                        <span className="bg-teal-500/10 text-teal-800 border border-teal-500/20 px-6 py-2 rounded-full text-xs font-black inline-flex items-center gap-2 uppercase tracking-widest shadow-sm">
                            <Sparkles className="w-4 h-4 text-teal-600" />
                            مستقبل الرعاية الصحية الذكية
                        </span>
                    </div>

                    <h1 className="text-6xl lg:text-8xl font-black leading-[1.1] text-slate-900 tracking-tighter">
                        صحتك في <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600">
                             مدار الأمان
                        </span>
                    </h1>

                    <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                        نبض ليس مجرد تطبيق، بل رفيقك الصحي الذكي الذي يربطك بالعالم الطبي المتطور، مع سجل مرصود بدقة وحلول استباقية.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6">
                        <button className="group relative px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black transition-all hover:bg-teal-900 shadow-2xl shadow-slate-900/20 hover:-translate-y-1 active:translate-y-0.5 overflow-hidden"
                            onClick={() => navigate('/register')}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <div className="flex items-center justify-center gap-3">
                                <User className="w-5 h-5 text-teal-400" />
                                <span>ابدأ كـ مريض</span>
                            </div>
                        </button>
                        
                        <button className="px-10 py-5 bg-white text-teal-700 border-2 border-teal-100 rounded-[1.5rem] font-black transition-all hover:bg-teal-50 hover:border-teal-200 flex items-center justify-center gap-3 shadow-xl shadow-teal-900/5 hover:-translate-y-1"
                            onClick={() => navigate('/register')}
                        >
                            <Stethoscope className="w-5 h-5" />
                            <span>انضم كـ طبيب</span>
                        </button>
                    </div>

                    <div className="pt-10 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-xs text-slate-400 font-black tracking-widest uppercase">
                        <span className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100"><Shield className="w-4 h-4 text-teal-500" /> تشفير كامل</span>
                        <span className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100"><Activity className="w-4 h-4 text-emerald-500" /> تشخيص AI</span>
                        <span className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100"><Clock className="w-4 h-4 text-blue-500" /> متاح 24/7</span>
                    </div>
                </div>

                {/* Visual Content */}
                <div className="relative hidden lg:block perspective-1000">
                    {/* Main Decorative Card */}
                    <div className="relative bg-white border border-slate-100 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] p-12 transition-all duration-700 hover:rotate-0 rotate-3 hover:scale-105 group">
                        
                        {/* Status Dots */}
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-100"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-100"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-100"></div>
                            </div>
                            <div className="flex items-center gap-2 bg-teal-50 px-3 py-1 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div>
                                <span className="text-[10px] font-black text-teal-700 tracking-wider">LIVE ANALYSIS</span>
                            </div>
                        </div>

                        {/* Analysis Content */}
                        <div className="flex gap-6 mb-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-teal-500/20 group-hover:rotate-12 transition-transform duration-500">
                                <Activity className="w-10 h-10" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="h-4 w-1/3 bg-slate-100 rounded-full"></div>
                                <div className="h-2 w-full bg-slate-50 rounded-full"></div>
                                <div className="h-2 w-5/6 bg-slate-50 rounded-full"></div>
                            </div>
                        </div>

                        {/* AI Insight Overlay */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[2rem] shadow-2xl text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
                            <div className="flex items-center gap-3 mb-4">
                                <Sparkles className="w-5 h-5 text-teal-400" />
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-teal-100">AI PROGNOSIS</span>
                            </div>
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                     <div className="h-full w-[85%] bg-teal-400 rounded-full animate-pulse"></div>
                                </div>
                                <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Health Metric */}
                    <div className="absolute -top-10 -left-10 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-50 animate-bounce-slow">
                        <Heart className="w-10 h-10 text-rose-500 fill-current" />
                        <div className="mt-2 h-1 w-8 bg-rose-100 rounded-full"></div>
                    </div>

                    {/* Stats Bubble */}
                    <div className="absolute -bottom-10 -right-10 bg-teal-600 p-8 rounded-[2.5rem] shadow-2xl text-white border-4 border-white">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">PATIENTS SERVED</div>
                        <div className="text-4xl font-black mt-1">12K+</div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
