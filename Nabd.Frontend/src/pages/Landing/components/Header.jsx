import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Helper function to check if a link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Smooth scroll handler for section links
    const handleSectionClick = (e, sectionId) => {
        e.preventDefault();
        
        // If we're on the landing page, scroll to the section
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // If we're on another page, navigate to landing page with hash
            window.location.href = `/#${sectionId}`;
        }
    };

    // Handle scroll on page load if there's a hash in the URL
    useEffect(() => {
        if (location.hash) {
            const sectionId = location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [location]);

    return (
        <nav className="fixed w-full bg-white/90 backdrop-blur-md border-b border-[#E7ECEF] z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-12 h-12 bg-[#1C8B8F]/10 rounded-full flex items-center justify-center text-[#1C8B8F] overflow-hidden">
                            <svg
                                className="w-full h-full p-2"
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
                        <span className="text-2xl font-black text-[#1F2E3C] tracking-tight">
                            نبض <span className="text-[#1C8B8F]">Nabd</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 whitespace-nowrap">
                        <a 
                            href="/#features" 
                            onClick={(e) => handleSectionClick(e, 'features')}
                            className="text-[#1F2E3C] hover:text-[#1C8B8F] font-medium transition relative pb-1 group cursor-pointer"
                        >
                            المميزات
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1C8B8F] scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
                        </a>
                        <a 
                            href="/#ai-section" 
                            onClick={(e) => handleSectionClick(e, 'ai-section')}
                            className="text-[#1F2E3C] hover:text-[#1C8B8F] font-medium transition relative pb-1 group cursor-pointer"
                        >
                            الذكاء الاصطناعي
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1C8B8F] scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
                        </a>
                        <a 
                            href="/#doctors" 
                            onClick={(e) => handleSectionClick(e, 'doctors')}
                            className="text-[#1F2E3C] hover:text-[#1C8B8F] font-medium transition relative pb-1 group cursor-pointer"
                        >
                            الأطباء
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1C8B8F] scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
                        </a>
                        <a 
                            href="/#how-it-works" 
                            onClick={(e) => handleSectionClick(e, 'how-it-works')}
                            className="text-[#1F2E3C] hover:text-[#1C8B8F] font-medium transition relative pb-1 group cursor-pointer"
                        >
                            كيف يعمل
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1C8B8F] scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
                        </a>
                        <Link 
                            to="/contact" 
                            className={`font-medium transition relative pb-1 ${
                                isActive('/contact') 
                                    ? 'text-[#1C8B8F]' 
                                    : 'text-[#1F2E3C] hover:text-[#1C8B8F]'
                            }`}
                        >
                            اتصل بنا
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1C8B8F] transition-transform origin-right ${
                                isActive('/contact') ? 'scale-x-100' : 'scale-x-0'
                            }`}></span>
                        </Link>

                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link to="/login" className="px-5 py-2.5 rounded-xl border border-[#E7ECEF] text-[#1F2E3C] font-bold hover:bg-[#E7ECEF] transition">
                            دخول
                        </Link>
                        <Link to="/register" className="px-5 py-2.5 rounded-xl bg-[#1C8B8F] text-white font-bold hover:bg-[#14666A] shadow-lg shadow-[#1C8B8F]/20 transition">
                            ابدأ الآن
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-[#1F2E3C] hover:text-[#1C8B8F]">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-[#E7ECEF]">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <a href="/#features" onClick={(e) => handleSectionClick(e, 'features')} className="block px-3 py-2 rounded-md text-base font-medium text-[#1F2E3C] hover:bg-[#E7ECEF] cursor-pointer">المميزات</a>
                        <a href="/#ai-section" onClick={(e) => handleSectionClick(e, 'ai-section')} className="block px-3 py-2 rounded-md text-base font-medium text-[#1F2E3C] hover:bg-[#E7ECEF] cursor-pointer">الذكاء الاصطناعي</a>
                        <a href="/#doctors" onClick={(e) => handleSectionClick(e, 'doctors')} className="block px-3 py-2 rounded-md text-base font-medium text-[#1F2E3C] hover:bg-[#E7ECEF] cursor-pointer">الأطباء</a>
                        <Link 
                            to="/contact" 
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                isActive('/contact') 
                                    ? 'bg-[#1C8B8F]/10 text-[#1C8B8F]' 
                                    : 'text-[#1F2E3C] hover:bg-[#E7ECEF]'
                            }`}
                        >
                            اتصل بنا
                        </Link>

                        <Link to="/login" className="block w-full text-center mt-4 px-5 py-3 rounded-xl border border-[#E7ECEF] text-[#1F2E3C] font-bold">
                            دخول
                        </Link>
                        <Link to="/register" className="block w-full text-center mt-2 px-5 py-3 rounded-xl bg-[#1C8B8F] text-white font-bold">
                            ابدأ الآن
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
