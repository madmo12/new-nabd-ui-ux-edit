import React, { useEffect, useRef, useState } from 'react';

const doctorsData = [
    {
        name: 'د. يوسف حمدي',
        specialty: 'طبيب عام',
        rating: 4.9,
        reviews: 120,
        bio: "طبيب عام بخبرة واسعة في تشخيص وعلاج الحالات الطارئة والمزمنة، يهتم بتقديم رعاية صحية متكاملة.",
        experience: '12+ سنة خبرة',
        location: 'الجيزة - المهندسين',
        imageSrc: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop'
    },
    {
        name: 'د. علياء المصري',
        specialty: 'طبيبة أطفال',
        rating: 4.8,
        reviews: 95,
        bio: 'متخصصة في طب الأطفال وحديثي الولادة، تقدم متابعة شاملة لنمو الطفل وصحته.',
        experience: '10+ سنوات خبرة',
        location: 'القاهرة - مدينة نصر',
        imageSrc: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop'
    },
    {
        name: 'د. أحمد الشريف',
        specialty: 'جراح عظام',
        rating: 4.9,
        reviews: 210,
        bio: 'استشاري جراحة العظام متخصص في الإصابات الرياضية وتغيير المفاصل.',
        experience: '18+ سنة خبرة',
        location: 'الإسكندرية - سموحة',
        imageSrc: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop'
    },
    {
        name: 'د. نورهان السيد',
        specialty: 'طبيبة نساء وتوليد',
        rating: 4.7,
        reviews: 88,
        bio: 'تقدم رعاية متكاملة لصحة المرأة، ومتابعة الحمل والولادة بأحدث التقنيات.',
        experience: '9+ سنوات خبرة',
        location: 'القاهرة - التجمع الخامس',
        imageSrc: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop'
    },
    {
        name: 'د. سارة إبراهيم',
        specialty: 'طبيبة جلدية',
        rating: 4.8,
        reviews: 150,
        bio: 'متخصصة في علاج الأمراض الجلدية والتجميل والليزر، عضو الجمعية المصرية للأمراض الجلدية.',
        experience: '11+ سنة خبرة',
        location: 'الجيزة - الشيخ زايد',
        imageSrc: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=500&fit=crop'
    },
    {
        name: 'د. كريم عبد العزيز',
        specialty: 'طبيب قلب وأوعية دموية',
        rating: 5.0,
        reviews: 300,
        bio: 'استشاري أمراض القلب والقسطرة العلاجية، حاصل على الزمالة البريطانية لأمراض القلب.',
        experience: '20+ سنة خبرة',
        location: 'القاهرة - المعادي',
        imageSrc: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=500&fit=crop'
    }
];

const config = {
    colors: {
        primary: '#1C8B8F', // Nabd Primary
        secondary: '#1F2E3C', // Nabd Secondary
        white: '#FFFFFF',
        lightBg: '#F0FDFA', // Very light teal for text area
        darkText: '#1F2E3C',
        lightText: '#4A5568',
        star: '#F59E0B',
        shadow: 'rgba(0, 0, 0, 0.08)',
        icon: '#1C8B8F',
        separator: '#CBD5E0',
    },
    padding: 40,
    borderRadius: 24
};

const icons = {
    briefcase: 'M7.5 7.5C7.5 5.843 8.843 4.5 10.5 4.5h3C15.157 4.5 16.5 5.843 16.5 7.5v.75H18.75c1.243 0 2.25 1.007 2.25 2.25v6c0 1.243-1.007 2.25-2.25 2.25H5.25c-1.243 0-2.25-1.007-2.25-2.25v-6c0-1.243 1.007 2.25 2.25-2.25H7.5V7.5zM9 8.25V7.5c0-.828.672-1.5 1.5-1.5h3c.828 0 1.5.672 1.5 1.5v.75H9z',
    location: 'M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z'
};

const DoctorsSlider = () => {
    const canvasRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const doctorImagesRef = useRef([]);

    useEffect(() => {
        let loadedCount = 0;
        const totalImages = doctorsData.length;

        if (totalImages === 0) {
            setImagesLoaded(true);
            return;
        }

        doctorsData.forEach((doctor, index) => {
            if (!doctor.imageSrc) {
                loadedCount++;
                doctorImagesRef.current[index] = null;
                if (loadedCount === totalImages) setImagesLoaded(true);
                return;
            }

            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = doctor.imageSrc;
            doctorImagesRef.current[index] = img;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalImages) setImagesLoaded(true);
            };

            img.onerror = () => {
                loadedCount++;
                console.error(`Failed to load image for ${doctor.name}`);
                doctorImagesRef.current[index] = null;
                if (loadedCount === totalImages) setImagesLoaded(true);
            };
        });
    }, []);

    useEffect(() => {
        if (imagesLoaded) {
            drawCard(currentIndex);
        }
    }, [currentIndex, imagesLoaded]);

    useEffect(() => {
        const handleResize = () => {
            if (imagesLoaded) {
                drawCard(currentIndex);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [currentIndex, imagesLoaded]);

    const drawRoundedRect = (ctx, x, y, width, height, radius) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.arcTo(x + width, y, x + width, y + radius, radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        ctx.lineTo(x + radius, y + height);
        ctx.arcTo(x, y + height, x, y + height - radius, radius);
        ctx.lineTo(x, y + radius);
        ctx.arcTo(x, y, x + radius, y, radius);
        ctx.closePath();
    };

    const drawCardBackground = (ctx, w, h) => {
        ctx.save();
        // Main Card Shadow
        ctx.shadowColor = config.colors.shadow;
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 20;

        drawRoundedRect(ctx, 0, 0, w, h, config.borderRadius);
        ctx.fillStyle = config.colors.white;
        ctx.fill();

        // Right side background (Text Area)
        ctx.clip(); // Clip to rounded rect
        ctx.fillStyle = config.colors.lightBg;
        // Fill the right half (RTL perspective: visually right side)
        // Since we draw image on left (0 to w*0.45), text is on right.
        ctx.fillRect(w * 0.45, 0, w * 0.55, h);

        ctx.restore();
    };

    const drawDoctorImage = (ctx, w, h, image) => {
        const imgWidth = w * 0.45; // Image takes 45% width
        const imgHeight = h;

        if (!image || !image.complete || image.naturalHeight === 0) {
            ctx.save();
            ctx.fillStyle = '#E2E8F0';
            ctx.fillRect(0, 0, imgWidth, imgHeight);
            ctx.font = '16px Cairo';
            ctx.fillStyle = config.colors.lightText;
            ctx.textAlign = 'center';
            ctx.fillText('جاري تحميل الصورة', imgWidth / 2, h / 2);
            ctx.restore();
            return;
        }

        const imageAspectRatio = image.naturalWidth / image.naturalHeight;
        const containerAspectRatio = imgWidth / imgHeight;
        let sx, sy, sWidth, sHeight;

        if (imageAspectRatio > containerAspectRatio) {
            sHeight = image.naturalHeight;
            sWidth = sHeight * containerAspectRatio;
            sx = (image.naturalWidth - sWidth) / 2;
            sy = 0;
        } else {
            sWidth = image.naturalWidth;
            sHeight = sWidth / containerAspectRatio;
            sy = (image.naturalHeight - sHeight) / 2;
            sx = 0;
        }

        ctx.save();
        // Create a path for the left side of the card with rounded corners
        ctx.beginPath();
        ctx.moveTo(config.borderRadius, 0);
        ctx.lineTo(imgWidth, 0);
        ctx.lineTo(imgWidth, h);
        ctx.lineTo(config.borderRadius, h);
        ctx.arcTo(0, h, 0, h - config.borderRadius, config.borderRadius);
        ctx.lineTo(0, config.borderRadius);
        ctx.arcTo(0, 0, config.borderRadius, 0, config.borderRadius);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, imgWidth, imgHeight);
        ctx.restore();
    };

    const drawStar = (ctx, cx, cy, spikes, outerRadius, innerRadius) => {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }

        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
    };

    const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
        const words = text.split(' ');
        let line = '';
        let lineCount = 0;

        for (let n = 0; n < words.length; n++) {
            if (lineCount >= 3) break; // Allow 3 lines

            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
                lineCount++;
            } else {
                line = testLine;
            }
        }

        if (lineCount < 3) {
            ctx.fillText(line.trim(), x, y);
        }
    };

    const drawIcon = (ctx, path, x, y, size) => {
        ctx.save();
        const p = new Path2D(path);
        const scale = size / 24;
        ctx.translate(x, y);
        ctx.scale(scale, scale);
        ctx.fillStyle = config.colors.icon;
        ctx.fill(p);
        ctx.restore();
    };

    const drawRatingStars = (ctx, x, y, rating, starSize, ratingText) => {
        const starSpacing = starSize * 1.3;

        ctx.font = `600 ${Math.max(14, starSize * 0.8)}px Cairo`;
        ctx.fillStyle = config.colors.lightText;
        ctx.textAlign = 'right';
        ctx.fillText(ratingText, x, y + 6);

        const textWidth = ctx.measureText(ratingText).width;
        const starBlockRightEdge = x - textWidth - 15;

        ctx.save();
        for (let i = 0; i < 5; i++) {
            const currentStarX = starBlockRightEdge - (i * starSpacing) - (starSize / 2);
            ctx.fillStyle = i < Math.floor(rating) ? config.colors.star : config.colors.separator;
            drawStar(ctx, currentStarX, y, 5, starSize / 2, starSize / 4);
            ctx.fill();
        }
        ctx.restore();
    };

    const drawActions = (ctx, w, h, x, contentAreaWidth) => {
        const actionHeight = 50;
        const buttonWidth = Math.min(160, contentAreaWidth / 2 - 10);
        const buttonGap = 20;
        const buttonFontSize = Math.max(15, w * 0.018);
        const buttonsY = h - actionHeight - config.padding;
        const rightEdge = x + contentAreaWidth;

        // زر "احجز الآن" - Solid Primary
        const bookButtonX = rightEdge - buttonWidth;

        ctx.shadowColor = 'rgba(28, 139, 143, 0.3)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 4;

        drawRoundedRect(ctx, bookButtonX, buttonsY, buttonWidth, actionHeight, 14);
        ctx.fillStyle = config.colors.primary;
        ctx.fill();

        ctx.shadowColor = 'transparent'; // Reset shadow for text

        ctx.font = `bold ${buttonFontSize}px Cairo`;
        ctx.fillStyle = config.colors.white;
        ctx.textAlign = 'center';
        ctx.fillText('احجز الآن', bookButtonX + buttonWidth / 2, buttonsY + actionHeight / 2 + 6);

        // زر "الملف الشخصي" - Outlined or Secondary
        const profileButtonX = bookButtonX - buttonGap - buttonWidth;

        // Draw border for profile button
        ctx.lineWidth = 2;
        ctx.strokeStyle = config.colors.primary;
        drawRoundedRect(ctx, profileButtonX, buttonsY, buttonWidth, actionHeight, 14);
        ctx.stroke();

        ctx.fillStyle = config.colors.primary;
        ctx.fillText('الملف الشخصي', profileButtonX + buttonWidth / 2, buttonsY + actionHeight / 2 + 6);

        ctx.textAlign = 'right';
    };

    const drawDoctorInfo = (ctx, w, h, doctor) => {
        ctx.save();
        ctx.direction = 'rtl';

        const imgWidth = w * 0.45;
        const contentStartX = imgWidth + config.padding;
        const contentAreaX = w - config.padding;
        const contentAreaWidth = contentAreaX - contentStartX;

        const actionHeight = 50;
        const contentTopY = config.padding;
        const contentBottomY = h - config.padding - actionHeight;
        const availableHeight = contentBottomY - contentTopY;

        let currentY;

        // اسم الطبيب
        currentY = contentTopY + (availableHeight * 0.1);
        const nameFontSize = Math.max(26, w * 0.035);
        ctx.font = `800 ${nameFontSize}px Cairo`;
        ctx.fillStyle = config.colors.darkText;
        ctx.textAlign = 'right';
        ctx.fillText(doctor.name, contentAreaX, currentY);
        currentY += nameFontSize * 1.3;

        // التخصص
        const specialtyFontSize = Math.max(18, w * 0.022);
        ctx.font = `600 ${specialtyFontSize}px Cairo`;
        ctx.fillStyle = config.colors.primary;
        ctx.fillText(doctor.specialty, contentAreaX, currentY);

        // التقييم
        currentY = contentTopY + (availableHeight * 0.35);
        drawRatingStars(ctx, contentAreaX, currentY, doctor.rating, 20, `${doctor.rating} (${doctor.reviews} تقييم)`);

        // الوصف
        currentY = contentTopY + (availableHeight * 0.52);
        const bioFontSize = Math.max(15, w * 0.019);
        ctx.font = `500 ${bioFontSize}px Cairo`;
        ctx.fillStyle = config.colors.lightText;
        wrapText(ctx, doctor.bio, contentAreaX, currentY, contentAreaWidth, bioFontSize * 1.6);

        // الخبرة والموقع
        currentY = contentTopY + (availableHeight * 0.85);
        const metaFontSize = Math.max(15, w * 0.019);
        ctx.font = `600 ${metaFontSize}px Cairo`;
        ctx.fillStyle = config.colors.darkText;

        // Location
        const locationTextWidth = ctx.measureText(doctor.location).width;
        ctx.fillText(doctor.location, contentAreaX - 25, currentY + 5);
        drawIcon(ctx, icons.location, contentAreaX, currentY - 10, 22);

        // Experience
        const experienceX = contentAreaX - locationTextWidth - 60;
        ctx.fillText(doctor.experience, experienceX - 25, currentY + 5);
        drawIcon(ctx, icons.briefcase, experienceX, currentY - 10, 22);

        drawActions(ctx, w, h, contentStartX, contentAreaWidth);
        ctx.restore();
    };

    const drawCard = (index) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const doctor = doctorsData[index];
        const doctorImage = doctorImagesRef.current[index];
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = (rect.width * 0.55) * dpr; // Slightly taller
        if (canvas.height > 520 * dpr) canvas.height = 520 * dpr;

        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${canvas.height / dpr}px`;

        ctx.scale(dpr, dpr);

        const canvasW = canvas.width / dpr;
        const canvasH = canvas.height / dpr;

        ctx.clearRect(0, 0, canvasW, canvasH);

        drawCardBackground(ctx, canvasW, canvasH);
        drawDoctorImage(ctx, canvasW, canvasH, doctorImage);
        drawDoctorInfo(ctx, canvasW, canvasH, doctor);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % doctorsData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + doctorsData.length) % doctorsData.length);
    };

    return (
        <section id="doctors" className="flex flex-col items-center justify-center w-full max-w-6xl py-10 mx-auto my-10 px-4">
            <h2 className="text-4xl font-bold text-[#1F2E3C] mb-4 text-center">تعرف على نخبة من أطبائنا</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 text-center">
                اختر من بين أفضل الأطباء والمتخصصين في مصر لبدء رحلتك الصحية.
            </p>

            <div className="relative w-full max-w-4xl">
                <canvas ref={canvasRef} id="doctorCardCanvas" className="cursor-pointer w-full"></canvas>

                {/* Navigation Arrows - Positioned outside */}
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 -translate-y-1/2 right-[-60px] hidden md:flex bg-white hover:bg-[#F0FDFA] text-[#1C8B8F] border border-[#1C8B8F]/20 rounded-full p-4 shadow-lg transition-all transform hover:scale-110 z-20"
                    aria-label="Next Doctor"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 -translate-y-1/2 left-[-60px] hidden md:flex bg-white hover:bg-[#F0FDFA] text-[#1C8B8F] border border-[#1C8B8F]/20 rounded-full p-4 shadow-lg transition-all transform hover:scale-110 z-20"
                    aria-label="Previous Doctor"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>

                {/* Mobile Navigation Arrows (Inside but styled) */}
                <div className="flex md:hidden justify-between absolute top-1/2 -translate-y-1/2 w-full px-2 pointer-events-none">
                    <button
                        onClick={prevSlide}
                        className="pointer-events-auto bg-white/80 backdrop-blur text-[#1C8B8F] rounded-full p-2 shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="pointer-events-auto bg-white/80 backdrop-blur text-[#1C8B8F] rounded-full p-2 shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                </div>
            </div>

            {/* Pagination Dots */}
            <div id="pagination-dots" className="flex justify-center space-x-2 mt-8 gap-3">
                {doctorsData.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex ? 'bg-[#1C8B8F] w-8' : 'bg-gray-400 hover:bg-[#1C8B8F]/60'}`}
                    ></div>
                ))}
            </div>
        </section>
    );
};

export default DoctorsSlider;
