import React from 'react';
import { UserPlus, Search, CalendarCheck, FileText } from 'lucide-react';

const steps = [
    {
        icon: <UserPlus className="w-6 h-6" />,
        title: "أنشئ حسابك",
        description: "سجل كطبيب أو مريض في خطوات بسيطة وابدأ رحلتك الصحية."
    },
    {
        icon: <Search className="w-6 h-6" />,
        title: "ابحث عن طبيب",
        description: "تصفح قائمة الأطباء حسب التخصص، الموقع، والتقييمات."
    },
    {
        icon: <CalendarCheck className="w-6 h-6" />,
        title: "احجز موعدك",
        description: "اختر الموعد المناسب لك واحجز فوراً دون انتظار."
    },
    {
        icon: <FileText className="w-6 h-6" />,
        title: "احصل على الرعاية",
        description: "زر الطبيب واحتفظ بملفك الطبي ووصفاتك إلكترونياً."
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-20 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-[#1F2E3C] mb-4">كيف يعمل <span className="text-[#1C8B8F]">نبض</span>؟</h2>
                    <p className="text-gray-500">رحلة علاجك أصبحت أسهل وأسرع من أي وقت مضى</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>

                    <div className="grid md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 text-center relative group">
                                <div className="w-12 h-12 bg-[#1C8B8F] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-lg shadow-[#1C8B8F]/30">
                                    {index + 1}
                                </div>
                                <h3 className="text-lg font-bold text-[#1F2E3C] mb-2">{step.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
