// عناصر DOM
const greeting = document.getElementById("greeting");
const topBtn = document.getElementById("topBtn");

// الوقت الحالي
const hour = new Date().getHours();

// --- تحية ذكية ---
if (greeting) {
  greeting.textContent =
    hour < 12 ? "صباح الخير!" :
    hour < 18 ? "مساء الخير!" :
    "مرحباً بك!";
}

// --- وضع الليل التلقائي مع تبديل يدوي ---
function applyNightMode(enable) {
  if (enable) {
    document.body.classList.add("night");
    localStorage.setItem("nightMode", "enabled");
  } else {
    document.body.classList.remove("night");
    localStorage.setItem("nightMode", "disabled");
  }
}

// تفعيل الوضع حسب التخزين أو الوقت
const nightPref = localStorage.getItem("nightMode");
if (nightPref === "enabled") {
  applyNightMode(true);
} else if (nightPref === "disabled") {
  applyNightMode(false);
} else {
  // تفعيل تلقائي بين 6 مساءً و 6 صباحاً
  applyNightMode(hour >= 18 || hour < 6);
}

// يمكن إضافة زر لتبديل الليل (مثال)
// document.getElementById("toggleNightBtn").onclick = () => {
//   applyNightMode(!document.body.classList.contains("night"));
// };

// --- وضع توفير الطاقة الذكي ---
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.body.classList.add("low-power");
}

// --- زر العودة للأعلى ---
window.onscroll = () => {
  topBtn.style.display = (document.documentElement.scrollTop > 100) ? "block" : "none";
};

topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// --- منع النسخ وأدوات الفحص ---
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
  if (
    e.keyCode === 123 || // F12
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase()))
  ) {
    e.preventDefault();
  }
});

// --- تحميل الصور بتقنية lazy loading ---
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          lazyImageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => lazyImageObserver.observe(img));
  } else {
    // Fallback: تحميل كل الصور
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
    });
  }
});

// --- تحديث المحتوى الذكي (محاكاة JSON جلب بيانات) ---
async function fetchServices() {
  try {
    const response = await fetch('data/services.json'); // ملف JSON خارجي
    if (!response.ok) throw new Error("خطأ في تحميل البيانات");
    const data = await response.json();
    const servicesList = document.getElementById("services-list");
    if (servicesList) {
      servicesList.innerHTML = data.services.map(item => `<li>${item}</li>`).join("");
    }
  } catch (error) {
    console.error("تعذر جلب الخدمات:", error);
  }
}
fetchServices();

// --- إشعارات ذكية (تفعيل اختياري) ---
function notifyUser(title, options) {
  if (!("Notification" in window)) return;
  if (Notification.permission === "granted") {
    new Notification(title, options);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(title, options);
      }
    });
  }
}
// مثال إرسال إشعار بعد 5 ثوانٍ
setTimeout(() => {
  notifyUser("مرحباً بك في سطحة هيدروليك", {
    body: "خدمة نقل السيارات بأمان وسرعة!",
    icon: "favicon.ico"
  });
}, 5000);

// --- تسجيل الأخطاء وإرسالها (محاكاة) ---
window.onerror = function(message, source, lineno, colno, error) {
  // هنا يمكن إرسال الخطأ للسيرفر
  console.log("تم تسجيل خطأ:", message, "في", source, lineno, colno);
  // مثال: إرسال عبر fetch إلى API تسجيل الأخطاء
  /*
  fetch('/log-error', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message, source, lineno, colno, error: error?.stack})
  });
};
*/

// --- دعم العمل بلا اتصال (أساسي) ---
// التسجيل الأساسي لخدمة العمل بدون اتصال (Service Worker)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(registration => {
      console.log('ServiceWorker مسجل بنجاح:', registration.scope);
    }).catch(err => {
      console.log('فشل تسجيل ServiceWorker:', err);
    });
  });
}
