import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-24 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="relative bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 rounded-[3rem] p-12 lg:p-20 overflow-hidden shadow-[0_50px_100px_rgba(13,148,136,0.1)] group">
                    {/* Decorative Ambient Glows */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>
                    
                    <div className="relative z-10 text-center space-y-8">
                        <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter">
                            ابدأ رحلتك الصحية <span className="text-teal-400 italic">اليوم</span>
                        </h2>

                        <p className="text-teal-100/60 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                            انضم لآلاف المبتكرين في الرعاية الصحية الذين يثقون في "نبض" لإدارة أدق ملفاتهم الطبية بأمان وكفاءة مطلقة.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                            <Link to="/register" className="relative group px-12 py-6 bg-teal-500 text-white rounded-[1.5rem] font-black tracking-tight transition-all hover:bg-teal-400 overflow-hidden shadow-2xl shadow-teal-500/20 hover:-translate-y-1 active:translate-y-0.5">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                <div className="flex items-center justify-center gap-3">
                                    <span>سجل مجاناً الآن</span>
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                                </div>
                            </Link>
                            
                            <Link to="/contact" className="px-12 py-6 bg-white/10 backdrop-blur-md text-white border-2 border-white/10 rounded-[1.5rem] font-black transition-all hover:bg-white/20 hover:border-white/20 flex items-center justify-center gap-3 shadow-xl">
                                تواصل معنا
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
