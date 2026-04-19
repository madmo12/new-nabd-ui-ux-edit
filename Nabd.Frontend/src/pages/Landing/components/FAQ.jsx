import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "ما هو نبض؟",
        answer: "نبض هو نظام رعاية صحية ذكي يربط المرضى بالأطباء ويستخدم الذكاء الاصطناعي لدعم التشخيص الطبي وتحسين جودة الرعاية الصحية."
    },
    {
        question: "هل البيانات الطبية آمنة؟",
        answer: "نعم، نستخدم أعلى معايير التشفير والأمان لحماية بياناتك الطبية. جميع المعلومات محمية بتشفير من الدرجة العسكرية ولا يمكن الوصول إليها إلا من قبل الأطباء المصرح لهم."
    },
    {
        question: "كيف يعمل الذكاء الاصطناعي في نبض؟",
        answer: "يستخدم نبض خوارزميات متقدمة لتحليل الأعراض والتاريخ الطبي، ويقدم اقتراحات للأطباء بناءً على ملايين الحالات الطبية، مما يساعد في تحسين دقة التشخيص."
    },
    {
        question: "هل يمكنني استخدام نبض مجاناً؟",
        answer: "نعم، التسجيل وإنشاء الملف الطبي مجاني تماماً. بعض الخدمات المتقدمة قد تتطلب اشتراكاً، لكن الخدمات الأساسية متاحة للجميع."
    },
    {
        question: "كيف أحجز موعد مع طبيب؟",
        answer: "بعد التسجيل، يمكنك البحث عن الأطباء حسب التخصص والموقع، ثم اختيار الموعد المناسب والحجز مباشرة من خلال التطبيق."
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-[#F8FAFC]">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-black text-[#1F2E3C] mb-4">
                        الأسئلة <span className="text-[#1C8B8F]">الشائعة</span>
                    </h2>
                    <p className="text-gray-500 text-lg">
                        إجابات على أكثر الأسئلة شيوعاً حول نبض
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition"
                            >
                                <span className="font-bold text-[#1F2E3C] text-right">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 text-[#1C8B8F] transition-transform ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
