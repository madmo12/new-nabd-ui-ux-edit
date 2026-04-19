import React from 'react';
import { Brain, FileText, Calendar, ShieldCheck, Smartphone, Users } from 'lucide-react';

const features = [
    {
        icon: <Brain className="w-9 h-9" />,
        title: "مساعد ذكي للأطباء",
        description: "تقليل أخطاء التشخيص باستخدام موديلات AI مدربة تقترح الاحتمالات وتراجع التفاعلات الدوائية.",
        color: "text-teal-600",
        bg: "bg-teal-500/10"
    },
    {
        icon: <FileText className="w-9 h-9" />,
        title: "سجل طبي موحد",
        description: "تاريخك المرضي، روشتاتك، وتحاليلك في مكان واحد. لا مزيد من الأوراق الضائعة.",
        color: "text-blue-600",
        bg: "bg-blue-500/10"
    },
    {
        icon: <Calendar className="w-9 h-9" />,
        title: "إدارة عيادة متكاملة",
        description: "نظام حجز ذكي، إدارة مواعيد، ومتابعة للمرضى توفر وقت الطبيب والمريض.",
        color: "text-emerald-600",
        bg: "bg-emerald-500/10"
    },
    {
        icon: <ShieldCheck className="w-9 h-9" />,
        title: "أمان وخصوصية",
        description: "تشفير كامل للبيانات الطبية لضمان خصوصية المرضى والأطباء.",
        color: "text-indigo-600",
        bg: "bg-indigo-500/10"
    },
    {
        icon: <Smartphone className="w-9 h-9" />,
        title: "تطبيق للمرضى",
        description: "حجز مواعيد، متابعة الأدوية، والتواصل مع الطبيب من هاتفك مباشرة.",
        color: "text-cyan-600",
        bg: "bg-cyan-500/10"
    },
    {
        icon: <Users className="w-9 h-9" />,
        title: "مجتمع طبي",
        description: "تواصل مع نخبة من الأطباء وتبادل الخبرات والاستشارات الطبية.",
        color: "text-slate-600",
        bg: "bg-slate-500/10"
    }
];

const Features = () => {
    return (
        <section id="features" className="py-32 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <span className="text-teal-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block">لماذا نبض؟</span>
                    <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
                        تجربة طبية <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">متكاملة</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                        نحن ندمج أحدث تقنيات الذكاء الاصطناعي مع الواجهات البديهية لتقديم رعاية صحية تليق بك.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-500 group border border-slate-100 hover:border-teal-500/20 hover:-translate-y-2">
                            <div className={`w-20 h-20 ${feature.bg} rounded-3xl flex items-center justify-center ${feature.color} mb-8 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-inner`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
