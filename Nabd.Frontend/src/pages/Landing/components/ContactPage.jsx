import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, Headphones } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            
            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#FFFFFF] font-sans text-[#1F2E3C]" dir="rtl">
            <Header />
            <main>
                {/* Hero Section with Gradient */}
                <div className="relative bg-gradient-to-br from-[#1C8B8F] via-[#14666A] to-[#1F2E3C] pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1C8B8F]/20 rounded-full blur-3xl"></div>
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                                <MessageCircle className="w-5 h-5 text-white" />
                                <span className="text-white/90 text-sm font-medium">نحن هنا لمساعدتك</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                                تواصل معنا
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                                فريقنا جاهز للإجابة على استفساراتك ومساعدتك في أي وقت
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Cards Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-20">
                    {/* Quick Contact Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#E7ECEF] hover:border-[#1C8B8F]/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#1C8B8F] to-[#14666A] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                                <Phone className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-[#1F2E3C] mb-2">اتصل بنا</h3>
                            <p className="text-gray-600 text-sm mb-3">متاحون على مدار الساعة</p>
                            <p className="text-[#1C8B8F] font-bold text-lg" dir="ltr">+20 111 222 3333</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#E7ECEF] hover:border-[#1C8B8F]/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#1C8B8F] to-[#14666A] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                                <Mail className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-[#1F2E3C] mb-2">راسلنا</h3>
                            <p className="text-gray-600 text-sm mb-3">سنرد خلال 24 ساعة</p>
                            <p className="text-[#1C8B8F] font-bold text-base font-sans">support@nabd.com</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-[#E7ECEF] hover:border-[#1C8B8F]/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-center">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#1C8B8F] to-[#14666A] rounded-2xl flex items-center justify-center mb-4 mx-auto">
                                <Headphones className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-[#1F2E3C] mb-2">الدعم الفني</h3>
                            <p className="text-gray-600 text-sm mb-3">مساعدة فورية</p>
                            <p className="text-[#1C8B8F] font-bold text-base">دردشة مباشرة</p>
                        </div>
                    </div>

                    {/* Main Contact Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Contact Form - Takes 3 columns */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-[#E7ECEF] hover:border-[#1C8B8F]/20 transition-colors duration-300">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-black text-[#1F2E3C] mb-3">أرسل لنا رسالة</h2>
                                    <p className="text-gray-600">املأ النموذج وسنتواصل معك في أقرب وقت</p>
                                </div>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-bold text-[#1F2E3C] mb-2">
                                                الاسم بالكامل <span className="text-[#1C8B8F]">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E7ECEF] hover:border-[#1C8B8F]/30 focus:border-[#1C8B8F] focus:ring-4 focus:ring-[#1C8B8F]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                                                placeholder="أدخل اسمك الكامل"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-bold text-[#1F2E3C] mb-2">
                                                البريد الإلكتروني <span className="text-[#1C8B8F]">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E7ECEF] hover:border-[#1C8B8F]/30 focus:border-[#1C8B8F] focus:ring-4 focus:ring-[#1C8B8F]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                                                placeholder="example@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-bold text-[#1F2E3C] mb-2">
                                            الموضوع <span className="text-[#1C8B8F]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E7ECEF] hover:border-[#1C8B8F]/30 focus:border-[#1C8B8F] focus:ring-4 focus:ring-[#1C8B8F]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                                            placeholder="كيف يمكننا مساعدتك؟"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-bold text-[#1F2E3C] mb-2">
                                            الرسالة <span className="text-[#1C8B8F]">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows="6"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E7ECEF] hover:border-[#1C8B8F]/30 focus:border-[#1C8B8F] focus:ring-4 focus:ring-[#1C8B8F]/10 outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                                            placeholder="اكتب رسالتك هنا..."
                                        ></textarea>
                                    </div>

                                    <div className="flex items-center justify-between pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`
                                                flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all transform
                                                ${isSubmitting 
                                                    ? 'bg-gray-400 cursor-not-allowed' 
                                                    : 'bg-gradient-to-r from-[#1C8B8F] to-[#14666A] hover:from-[#14666A] hover:to-[#1C8B8F] shadow-lg shadow-[#1C8B8F]/30 hover:shadow-xl hover:shadow-[#1C8B8F]/40 hover:-translate-y-0.5'
                                                }
                                            `}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    <span>جاري الإرسال...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>إرسال الرسالة</span>
                                                    <Send className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>

                                        {showSuccess && (
                                            <div className="flex items-center gap-2 text-green-600 font-bold animate-fade-in bg-green-50 px-4 py-2 rounded-xl">
                                                <CheckCircle className="w-5 h-5" />
                                                <span>تم إرسال رسالتك بنجاح!</span>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Contact Info & Map - Takes 2 columns */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Contact Details Card */}
                            <div className="bg-gradient-to-br from-[#1C8B8F] to-[#14666A] rounded-3xl shadow-2xl p-8 text-white">
                                <h2 className="text-2xl font-black mb-6">معلومات التواصل</h2>
                                
                                <div className="space-y-5">
                                    <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-1">العنوان</h3>
                                            <p className="text-white/90 text-sm">القاهرة، مدينة نصر، شارع الطيران</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-1">ساعات العمل</h3>
                                            <p className="text-white/90 text-sm">السبت - الخميس</p>
                                            <p className="text-white/90 text-sm">9:00 ص - 6:00 م</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-[#E7ECEF] hover:border-[#1C8B8F]/30 transition-colors duration-300">
                                <div className="h-80">
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27628.676924040974!2d31.319737449999997!3d30.05948385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e5d7a876775%3A0x6e7220116094726d!2sNasr%20City%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1709647890000!5m2!1sen!2seg" 
                                        width="100%" 
                                        height="100%" 
                                        style={{ border: 0 }} 
                                        allowFullScreen="" 
                                        loading="lazy" 
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Nabd Location"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
