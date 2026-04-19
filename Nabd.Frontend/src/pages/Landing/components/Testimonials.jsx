import React, { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        name: "أحمد علي",
        role: "مريض",
        rating: 5,
        text: "تجربة رائعة! تمكنت من حجز موعد مع طبيب القلب في دقائق، والذكاء الاصطناعي ساعد الطبيب في تشخيص حالتي بدقة.",
        image: "https://ui-avatars.com/api/?name=Ahmed+Ali&background=1C8B8F&color=fff&size=100"
    },
    {
        name: "د. منى إبراهيم",
        role: "طبيبة أطفال",
        rating: 5,
        text: "نظام نبض وفر علي الكثير من الوقت في إدارة العيادة، والمساعد الذكي يساعدني في مراجعة التشخيصات والتفاعلات الدوائية.",
        image: "https://ui-avatars.com/api/?name=Mona+Ibrahim&background=14666A&color=fff&size=100"
    },
    {
        name: "فاطمة محمد",
        role: "مريضة",
        rating: 5,
        text: "أخيراً أصبح لدي ملف طبي موحد يحتوي على كل تاريخي المرضي ووصفاتي. سهل جداً ومريح!",
        image: "https://ui-avatars.com/api/?name=Fatma+Mohamed&background=1F2E3C&color=fff&size=100"
    },
    {
        name: "د. خالد عمر",
        role: "استشاري قلب",
        rating: 5,
        text: "المنصة توفر تواصلاً ممتازاً مع المرضى ومتابعة دقيقة لحالتهم الصحية عن بعد. أنصح بها بشدة.",
        image: "https://ui-avatars.com/api/?name=Khaled+Omar&background=0F766E&color=fff&size=100"
    },
    {
        name: "سارة محمود",
        role: "صيدلانية",
        rating: 5,
        text: "سهولة التعامل مع الوصفات الإلكترونية وتقليل الأخطاء الطبية هو أكثر ما يميز نظام نبض.",
        image: "https://ui-avatars.com/api/?name=Sarah+Mahmoud&background=BE185D&color=fff&size=100"
    },
    {
        name: "محمود حسن",
        role: "مريض",
        rating: 4,
        text: "التطبيق سهل الاستخدام جداً، وخدمة العملاء متعاونة وسريعة الاستجابة في حال واجهت أي مشكلة.",
        image: "https://ui-avatars.com/api/?name=Mahmoud+Hassan&background=4338CA&color=fff&size=100"
    }
];

const Testimonials = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage((prev) => (prev + 1) % totalPages);
        }, 3500);
        return () => clearInterval(interval);
    }, [totalPages, currentPage]);

    const slides = Array.from({ length: totalPages }, (_, i) => 
        testimonials.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
    );

    return (
        <section className="py-20 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-black text-[#1F2E3C] mb-4">
                        ماذا يقول <span className="text-[#1C8B8F]">مستخدمونا</span>؟
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        آراء حقيقية من أطباء ومرضى يستخدمون نبض يومياً
                    </p>
                </div>

                <div className="overflow-hidden py-10 -my-10">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(${currentPage * 100}%)` }}
                    >
                        {slides.map((slide, slideIndex) => (
                            <div key={slideIndex} className="w-full flex-shrink-0">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {slide.map((testimonial, index) => (
                                        <div key={index} className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 relative group">
                                            <Quote className="absolute top-6 left-6 w-12 h-12 text-[#1C8B8F]/10" />

                                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                                <img
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    className="w-16 h-16 rounded-full border-2 border-[#1C8B8F]"
                                                />
                                                <div>
                                                    <h4 className="font-bold text-[#1F2E3C]">{testimonial.name}</h4>
                                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-1 mb-4">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                                                ))}
                                            </div>

                                            <p className="text-gray-600 leading-relaxed">
                                                "{testimonial.text}"
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-4 mt-12">
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                idx === currentPage 
                                    ? 'bg-[#1C8B8F] scale-125' 
                                    : 'bg-[#D1D5DB]'
                            }`}
                            aria-label={`Page ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
