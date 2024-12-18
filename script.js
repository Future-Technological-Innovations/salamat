// المنيو

document.addEventListener("DOMContentLoaded", function () {
    // تحديد زر التبديل (الهامبرغر)
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    // إضافة حدث النقر على الزر
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // إخفاء القائمة عند الضغط على رابط (للأجهزة الصغيرة)
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            navMenu.classList.remove("active");
        });
    });

    // إدارة القوائم الفرعية
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        const link = dropdown.querySelector("a");
        link.addEventListener("click", (event) => {
            event.preventDefault();

            // إغلاق القوائم الأخرى
            dropdowns.forEach((item) => {
                if (item !== dropdown) {
                    item.classList.remove("active");
                }
            });

            // تبديل القائمة الحالية
            dropdown.classList.toggle("active");
        });
    });

    // إغلاق القوائم عند النقر خارجها
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".dropdown")) {
            dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
        }
    });
});




// الرسالة والرؤية والأهداف
document.addEventListener("DOMContentLoaded", function () {
    const carouselItems = document.querySelectorAll(".carousel-item");
    const dots = document.querySelectorAll(".carousel-dots .dot");
    let currentIndex = 0; // المؤشر الحالي للعناصر

    // وظيفة لتحديث حالة العنصر الحالي
    function updateCarousel(index) {
        // إزالة الحالة النشطة عن جميع العناصر
        carouselItems.forEach((item) => item.classList.remove("active"));
        dots.forEach((dot) => dot.classList.remove("active"));

        // إضافة الحالة النشطة إلى العنصر والنقطة الحالية
        carouselItems[index].classList.add("active");
        dots[index].classList.add("active");
    }

    // التنقل التلقائي في الكاروسيل كل 3 ثوانٍ
    function autoSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel(currentIndex);
    }

    // عند النقر على النقاط (dots)
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });

    // بدء التنقل التلقائي
    setInterval(autoSlide, 3000);
});

// document.addEventListener("DOMContentLoaded", function () {
//     const projectsWrapper = document.querySelector(".projects-wrapper");
//     const projectCards = document.querySelectorAll(".project-card");
//     const prevBtn = document.querySelector(".prev-btn");
//     const nextBtn = document.querySelector(".next-btn");

//     let currentScrollPosition = 0;
//     const cardWidth = projectCards[0].offsetWidth + 20; // عرض البطاقة مع المسافة بين البطاقات
//     const visibleCards = Math.floor(projectsWrapper.offsetWidth / cardWidth);

//     // تحديث حالة الأزرار
//     function updateButtonState() {
//         if (currentScrollPosition <= 0) {
//             prevBtn.disabled = true;
//         } else {
//             prevBtn.disabled = false;
//         }

//         if (
//             currentScrollPosition >=
//             (projectCards.length - visibleCards) * cardWidth
//         ) {
//             nextBtn.disabled = true;
//         } else {
//             nextBtn.disabled = false;
//         }
//     }

//     // وظيفة التنقل للخلف
//     prevBtn.addEventListener("click", () => {
//         currentScrollPosition -= cardWidth;
//         if (currentScrollPosition < 0) {
//             currentScrollPosition = 0;
//         }
//         projectsWrapper.scrollTo({
//             left: currentScrollPosition,
//             behavior: "smooth",
//         });
//         updateButtonState();
//     });

//     // وظيفة التنقل للأمام
//     nextBtn.addEventListener("click", () => {
//         currentScrollPosition += cardWidth;
//         if (
//             currentScrollPosition >
//             (projectCards.length - visibleCards) * cardWidth
//         ) {
//             currentScrollPosition =
//                 (projectCards.length - visibleCards) * cardWidth;
//         }
//         projectsWrapper.scrollTo({
//             left: currentScrollPosition,
//             behavior: "smooth",
//         });
//         updateButtonState();
//     });

//     // تحديث حالة الأزرار عند التحميل
//     updateButtonState();
// });


const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const projectsWrapper = document.querySelector('.projects-wrapper');
const projectCards = document.querySelectorAll('.project-card');

let currentScrollPosition = 0;
let cardWidth = 0;
let visibleCards = 0;

function updateCarouselMetrics() {
    cardWidth = projectCards[0].offsetWidth + parseInt(getComputedStyle(projectCards[0]).marginRight);
    visibleCards = Math.floor(projectsWrapper.offsetWidth / cardWidth);

    // إعادة ضبط موضع التمرير للبدء من البداية
    currentScrollPosition = 0;
    projectsWrapper.scrollLeft = -currentScrollPosition;

    console.log('Card Width:', cardWidth, 'Visible Cards:', visibleCards);
    updateButtonState();
}

function scrollCarousel(direction) {
    const wrapperWidth = projectsWrapper.clientWidth;
    const totalContentWidth = projectCards.length * cardWidth;
    const maxScrollPosition = totalContentWidth - wrapperWidth;

    if (direction === 'next') {
        currentScrollPosition -= cardWidth; // عكس الاتجاه للتوافق مع RTL
        if (Math.abs(currentScrollPosition) > maxScrollPosition) {
            currentScrollPosition = -maxScrollPosition;
        }
    } else if (direction === 'prev') {
        currentScrollPosition += cardWidth; // عكس الاتجاه للتوافق مع RTL
        if (currentScrollPosition > 0) {
            currentScrollPosition = 0;
        }
    }

    // تطبيق التمرير
    projectsWrapper.scrollLeft = -currentScrollPosition; // عكس القيمة للتوافق مع RTL

    console.log("Current Scroll Position After Scroll:", projectsWrapper.scrollLeft);

    // تحديث حالة الأزرار بعد التمرير
    updateButtonState();
}

function updateButtonState() {
    const maxScrollPosition =
        projectCards.length * cardWidth - projectsWrapper.clientWidth;

    // تحديث حالة زر "Prev"
    prevBtn.disabled = currentScrollPosition >= 0;

    // تحديث حالة زر "Next"
    nextBtn.disabled = Math.abs(currentScrollPosition) >= maxScrollPosition;

    console.log("Button State Updated: Prev", prevBtn.disabled, "Next", nextBtn.disabled);
}

// إخفاء تأثير التمرير اليدوي عند التحميل
function resetScrollPosition() {
    projectsWrapper.scrollLeft = -currentScrollPosition; // ضبط الموضع عند التحميل
    updateButtonState();
}

// إضافة الأحداث
nextBtn.addEventListener('click', () => scrollCarousel('next'));
prevBtn.addEventListener('click', () => scrollCarousel('prev'));
window.addEventListener('resize', updateCarouselMetrics);
window.addEventListener('load', () => {
    updateCarouselMetrics();
    resetScrollPosition(); // التأكد من ضبط الموضع عند التحميل
});

// قسم الأخبار

// إعداد الكاروسيل
const newsCards = document.querySelector('.news-cards');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const newsCardWidth = 270; // عرض البطاقة + المسافة بينها
let currentIndex = 0;

function updateCarouselNews() {
    newsCards.style.transform = `translateX(-${currentIndex * newsCardWidth}px)`;
    rightArrow.disabled = currentIndex === 0;
    leftArrow.disabled = currentIndex >= newsCards.children.length - 3;
}

rightArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarouselNews();
    }
});

leftArrow.addEventListener('click', () => {
    if (currentIndex < newsCards.children.length - 3) {
        currentIndex++;
        updateCarouselNews();
    }
});

// السحب بالماوس
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

newsCards.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPosition = e.pageX;
    newsCards.style.transition = 'none';
});

newsCards.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentPosition = e.pageX;
    const movedBy = currentPosition - startPosition;
    newsCards.style.transform = `translateX(${prevTranslate + movedBy}px)`;
});

newsCards.addEventListener('mouseup', () => {
    isDragging = false;
    newsCards.style.transition = 'transform 0.5s ease-in-out';
    prevTranslate = currentTranslate;
});

newsCards.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        newsCards.style.transition = 'transform 0.5s ease-in-out';
        prevTranslate = currentTranslate;
    }
});

updateCarouselNews();

// قسم الاحصائيات
// إذا أردت إضافة حركة عداد (Counter Animation) للأرقام
document.querySelectorAll('.stat-item h1').forEach((stat) => {
    let count = 0;
    const target = +stat.textContent;
    const increment = target / 50;

    function updateCount() {
        count += increment;
        if (count < target) {
            stat.textContent = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            stat.textContent = target;
        }
    }
    updateCount();
});

// تواصل معنا ******************************************

function validateForm() {
    const fullname = document.getElementById("fullname").value.trim();
    const jobField = document.getElementById("job_field").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
  
    if (!fullname || !jobField || !phone || !message) {
      alert("الرجاء تعبئة جميع الحقول قبل الإرسال.");
      return false;
    }
  
    // تحقق من أن رقم الهاتف يحتوي على أرقام فقط
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phone)) {
      alert("الرجاء إدخال رقم هاتف صحيح يحتوي على أرقام فقط.");
      return false;
    }
  
    alert("تم إرسال النموذج بنجاح!");
    return true;
  }
  


