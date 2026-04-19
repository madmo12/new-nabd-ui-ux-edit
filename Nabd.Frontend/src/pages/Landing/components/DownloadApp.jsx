import React from 'react';
import { Smartphone, Download } from 'lucide-react';
import NabdAppScreen from '@/assets/NabdAppScreen.png';

const DownloadApp = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-br from-[#1C8B8F] to-[#14666A] rounded-3xl overflow-hidden relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                    </div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center p-12 lg:p-16">

                        {/* Content */}
                        <div className="text-white space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                                <Smartphone className="w-4 h-4" />
                                <span className="text-sm font-bold">متاح الآن</span>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                                حمّل تطبيق نبض<br />
                                على هاتفك الآن
                            </h2>

                            <p className="text-white/90 text-lg leading-relaxed">
                                احصل على رعاية صحية متكاملة في جيبك. احجز مواعيد، تابع صحتك، واحتفظ بملفك الطبي من أي مكان.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button className="px-6 py-4 bg-white text-[#1C8B8F] rounded-xl font-bold hover:bg-gray-100 transition flex items-center justify-center gap-3 shadow-lg">
                                    <Download className="w-5 h-5" />
                                    تحميل للأندرويد
                                </button>
                                <button className="px-6 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/20 transition flex items-center justify-center gap-3">
                                    <Download className="w-5 h-5" />
                                    تحميل للآيفون
                                </button>
                            </div>

                            <div className="flex items-center gap-8 pt-6">
                                <div>
                                    <div className="text-3xl font-black">+10K</div>
                                    <div className="text-white/70 text-sm">تحميل</div>
                                </div>
                                <div className="w-px h-12 bg-white/20"></div>
                                <div>
                                    <div className="text-3xl font-black">4.8★</div>
                                    <div className="text-white/70 text-sm">تقييم المستخدمين</div>
                                </div>
                            </div>
                        </div>

                        {/* Phone Mockup */}
                        <div className="relative hidden lg:block">
                            <div className="relative mx-auto w-64 h-[500px] bg-white rounded-[3rem] shadow-2xl p-3 border-8 border-gray-800">
                                <div className="w-full h-full bg-gradient-to-br from-[#1C8B8F]/10 to-[#14666A]/10 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden">
                                    <img 
                                        src={NabdAppScreen} 
                                        alt="Nabd App Screen" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce">
                                <div className="text-2xl">📱</div>
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce delay-500">
                                <div className="text-2xl">💊</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadApp;
