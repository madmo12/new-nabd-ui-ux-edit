import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#1F2E3C] text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-12 h-12 bg-[#1C8B8F] rounded-full flex items-center justify-center overflow-hidden">
                                <svg
                                    className="w-full h-full p-2 text-white"
                                    viewBox="0 0 200 60"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M 0 30 L 40 30 L 45 20 L 50 40 L 55 10 L 60 50 L 65 30 L 75 30 L 80 25 L 85 35 L 90 30 L 130 30 L 135 20 L 140 40 L 145 10 L 150 50 L 155 30 L 165 30 L 170 25 L 175 35 L 180 30 L 200 30"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="animate-ecg"
                                    />
                                </svg>
                            </div>
                            <span className="text-2xl font-black">نبض</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            نظام رعاية صحية ذكي يجمع بين التكنولوجيا والطب لتقديم أفضل تجربة علاجية.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1C8B8F] transition">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1C8B8F] transition">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1C8B8F] transition">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1C8B8F] transition">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">روابط سريعة</h3>
                        <ul className="space-y-3">
                            <li><a href="#features" className="text-gray-300 hover:text-[#1C8B8F] transition">المميزات</a></li>
                            <li><a href="#ai-section" className="text-gray-300 hover:text-[#1C8B8F] transition">الذكاء الاصطناعي</a></li>
                            <li><a href="#doctors" className="text-gray-300 hover:text-[#1C8B8F] transition">الأطباء</a></li>
                            <li><a href="#how-it-works" className="text-gray-300 hover:text-[#1C8B8F] transition">كيف يعمل</a></li>
                        </ul>
                    </div>

                    {/* For Doctors */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">للأطباء</h3>
                        <ul className="space-y-3">
                            <li><Link to="/register-doctor" className="text-gray-300 hover:text-[#1C8B8F] transition">انضم كطبيب</Link></li>
                            <li><a href="#" className="text-gray-300 hover:text-[#1C8B8F] transition">إدارة العيادة</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-[#1C8B8F] transition">الذكاء الاصطناعي</a></li>
                            <li><a href="#" className="text-gray-300 hover:text-[#1C8B8F] transition">الأسعار</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">تواصل معنا</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-300">
                                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span>info@nabd.health</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span>+20 123 456 7890</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span>القاهرة، مصر</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-300 text-sm">
                            &copy; 2025 نبض - Nabd Health System. جميع الحقوق محفوظة.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-gray-300 hover:text-[#1C8B8F] transition">سياسة الخصوصية</a>
                            <a href="#" className="text-gray-300 hover:text-[#1C8B8F] transition">الشروط والأحكام</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
