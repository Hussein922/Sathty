// js/script.js - الإصدار 3.3 (تحديث مع منطق إظهار معلومات الاتصال البديلة)

// انتظر حتى يتم تحميل محتوى الصفحة (DOM) بالكامل قبل تشغيل السكريبتات
document.addEventListener('DOMContentLoaded', function() {

    // --- دوال مساعدة (Helper Functions) ---

    // دالة Debounce لتحسين أداء مستمعي الأحداث التي تتكرر بسرعة مثل scroll أو resize
    // تضمن أن الدالة المرفقة لن يتم تنفيذها إلا بعد فترة زمنية معينة من توقف الحدث
    function debounce(func, wait) {
        let timeout;
        return function executed(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // --- منطق زر "الرجوع للأعلى" (Scroll-to-Top Button Logic) ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // دالة لتحديث عرض زر الرجوع للأعلى بناءً على موضع التمرير
    const toggleScrollToTopButton = () => {
        // إظهار الزر إذا تجاوزنا 200 بكسل من الأعلى
        if (window.scrollY > 200) {
             scrollToTopBtn.style.display = 'block';
        } else {
             scrollToTopBtn.style.display = 'none';
        }
    };

    // استخدام Debounce لتحسين أداء مستمع التمرير لزر الرجوع للأعلى
    // فحص كل 50 ميلي ثانية بعد التوقف عن التمرير
    window.addEventListener('scroll', debounce(toggleScrollToTopButton, 50));

    // عند النقر على الزر، قم بالتمرير بسلاسة إلى أعلى الصفحة
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // التمرير السلس
        });
    });


    // --- منطق التمرير السلس لروابط الـ Anchor (Smooth Scrolling for Anchor Links) ---
    // البحث عن جميع روابط الـ anchor التي تبدأ بـ "#"
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            const href = this.getAttribute('href');

            // تجاهل الروابط التي هي مجرد "#" أو التي لا تشير إلى قسم معين
            if (href === '#' || href === '' || href.length < 2) {
                return; // لا تفعل شيئاً لهذه الروابط
            }

            try {
                const targetId = href.substring(1); // الحصول على الـ ID المستهدف (إزالة علامة #)
                const targetElement = document.getElementById(targetId); // الحصول على العنصر المستهدف

                if (targetElement) {
                    event.preventDefault(); // منع السلوك الافتراضي للرابط (القفز المباشر)

                    // التمرير السلس إلى العنصر المستهدف باستخدام scrollIntoView
                    targetElement.scrollIntoView({
                        behavior: 'smooth' // التمرير السلس
                    });
                } else {
                    console.warn(`Target element with ID ${targetId} not found for smooth scroll.`);
                }
            } catch (e) {
                console.error('Error with smooth scrolling for anchor link:', e);
            }
        });
    });


    // --- منطق التحميل الكسول (Lazy Loading) باستخدام IntersectionObserver ---
    // هذا يغطي الصور باستخدام data-src وعناصر الخلفية باستخدام data-bg.
    // يستخدم كبديل أو توسيع لسمة loading="lazy" في HTML.

    // اختيار العناصر المراد تحميلها كسولياً
    const lazyLoadElements = document.querySelectorAll('img[data-src], [data-bg]');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // إذا أصبح العنصر مرئياً أو قريباً من الرؤية
                const element = entry.target;

                // تحميل مصدر الصورة
                if (element.dataset.src) {
                    element.src = element.dataset.src;
                }

                // تحميل صورة الخلفية
                if (element.dataset.bg) {
                    element.style.backgroundImage = `url('${element.dataset.bg}')`;
                }

                observer.unobserve(element); // توقف عن مراقبة هذا العنصر بعد تحميله
            }
        });
    }, {
        // خيارات المراقِب (Observer Options)
        rootMargin: '0px 0px 100px 0px', // تحميل العناصر عندما تكون على بعد 100 بكسل من أسفل مجال الرؤية
        threshold: 0.01 // بدء المراقبة عندما يكون 1% من العنصر مرئياً
    });

    // ابدأ مراقبة جميع عناصر التحميل الكسول
    lazyLoadElements.forEach(element => observer.observe(element));


    // --- منطق إظهار معلومات الاتصال البديلة عند فشل الأزرار (إضافة جديدة) ---
    const callButton = document.querySelector('.fab-call');
    const whatsappButton = document.querySelector('.fab-whatsapp');
    const fallbackContact = document.getElementById('fallbackContact');

    // دالة لإظهار معلومات الاتصال البديلة
    function showFallbackContact() {
        if (fallbackContact && !fallbackContact.classList.contains('is-visible')) {
            fallbackContact.classList.add('is-visible');
        }
    }

    // دالة للتحقق من فتح التطبيق (تقنية تقريبية)
    function checkAppOpened(originalHref) {
        let appOpened = false;
        const timeout = setTimeout(() => {
            if (!appOpened && document.visibilityState === 'visible') {
                // إذا لم يتم تغيير حالة الرؤية (لم يتم الانتقال لتطبيق آخر) وظلت الصفحة مرئية،
                // فمن المرجح أن التطبيق لم يفتح.
                console.warn('App did not open, showing fallback contact.');
                showFallbackContact();
            }
        }, 1500); // انتظر 1.5 ثانية (يمكن تعديل المدة حسب الرغبة)

        // إذا حدث تغيير في حالة الرؤية (مثل الانتقال إلى تطبيق آخر)، يعني أن التطبيق قد فُتح
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                appOpened = true; // تم فتح تطبيق آخر (قد يكون الهاتف/الواتساب)
                clearTimeout(timeout);
                document.removeEventListener('visibilitychange', handleVisibilityChange);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // محاولة فتح الرابط
        window.location.href = originalHref;

        // إذا لم يتم الكشف عن تغيير في الرؤية خلال فترة زمنية معينة، يتم تشغيل التايم آوت
    }

    // إضافة مستمعين للنقر على الأزرار
    if (callButton) {
        callButton.addEventListener('click', function(event) {
            event.preventDefault(); // منع السلوك الافتراضي لكي نتحكم فيه بأنفسنا
            checkAppOpened(this.href);
        });
    }

    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(event) {
            event.preventDefault(); // منع السلوك الافتراضي
            checkAppOpened(this.href);
        });
    }


    // --- منطق الحماية الأساسية (Client-side Protection) ---
    // !!! ملاحظة هامة: هذه الإجراءات ليست نهائية ويمكن تجاوزها بسهولة بتعطيل JavaScript !!!
    // (كما تم الاتفاق، لا يوجد رسائل تنبيه هنا)

    // منع النقر بزر الفأرة الأيمن (Context Menu)
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    // منع تحديد النص (Select Start) - (مكمل لـ user-select: none; في CSS)
    document.addEventListener('selectstart', function(event) {
        event.preventDefault();
    });

    // منع نسخ المحتوى (Copy)
    document.addEventListener('copy', function(event) {
        event.preventDefault();
    });

    // محاولة منع فتح أدوات المطور (F12, Ctrl+Shift+I, إلخ) - !!! هذه المحاولة ليست نهائية !!!
    document.addEventListener('keydown', function(event) {
        // منع F12
        if (event.key === 'F12' || event.keyCode === 123) {
            event.preventDefault();
        }

        // منع Ctrl+Shift+I (ويندوز/لينكس) أو Cmd+Option+I (ماك)
        if ((event.ctrlKey && event.shiftKey && (event.key === 'I' || event.keyCode === 73)) || // Ctrl+Shift+I
            (event.metaKey && event.altKey && (event.key === 'I' || event.keyCode === 73))) { // Cmd+Option+I (لأجهزة ماك)
             event.preventDefault();
        }
    });


    console.log('script.js loaded and enhanced features are active (non-permanent)');
});
