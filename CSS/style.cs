/* إعدادات أساسية */
:root {
  --color-primary: #001f3f; /* أزرق داكن */
  --color-secondary: #00b050; /* أخضر */
  --color-bg-light: #f0f4f8;
  --color-bg-dark: #001f3f;
  --color-text-light: #333;
  --color-text-dark: #c0ffc0;
  --transition-speed: 0.3s;
}

/* تعيين الخطوط */
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: var(--color-bg-light);
  color: var(--color-text-light);
  margin: 0;
  padding: 20px;
  line-height: 1.6;
  transition: background var(--transition-speed), color var(--transition-speed);
}

/* الوضع الليلي */
body.night {
  background: var(--color-bg-dark);
  color: var(--color-text-dark);
}

/* وضع توفير الطاقة - إيقاف الحركات */
body.low-power * {
  transition: none !important;
  animation: none !important;
}

/* الهيدر */
header {
  text-align: center;
  margin-bottom: 30px;
}

header h1 {
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 5px;
}

header .subtitle {
  font-size: 1.1rem;
  color: var(--color-secondary);
}

.greeting {
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--color-primary);
}

/* خدمات */
.services {
  max-width: 600px;
  margin: 0 auto 40px;
  padding: 0 10px;
}

.services h2 {
  color: var(--color-primary);
  margin-bottom: 15px;
  font-size: 1.8rem;
  text-align: center;
}

.services ul {
  list-style: none;
  padding: 0;
}

.services ul li {
  background: var(--color-secondary);
  color: white;
  margin: 8px 0;
  padding: 12px 15px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
  font-size: 1rem;
}

/* تأثير ظهور تدريجي */
.fade-in {
  animation: fadeIn 1s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* الأزرار العائمة */
.floating-buttons {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;
}

.floating-buttons a {
  display: inline-block;
  padding: 14px 20px;
  font-size: 1.1rem;
  color: white;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 3px 6px rgb(0 0 0 / 0.2);
  transition: background-color 0.3s ease;
  text-align: center;
}

.call-btn {
  background: #004080;
}

.call-btn:hover {
  background: #0059b3;
}

.whatsapp-btn {
  background: #25d366;
}

.whatsapp-btn:hover {
  background: #1ebe56;
}

/* زر العودة للأعلى */
#topBtn {
  display: none;
  position: fixed;
  bottom: 90px;
  left: 20px;
  z-index: 1001;
  font-size: 1rem;
  padding: 10px 16px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
  transition: background-color 0.3s ease;
}

#topBtn:hover {
  background-color: #003366;
}

/* صور lazy loading (تأكد تستخدم class="lazy" وعند تحميلها تعطي src من data-src) */
img.lazy {
  opacity: 0;
  transition: opacity 0.4s ease;
}

img.lazy:not([src]) {
  visibility: hidden;
}

img.lazy[src] {
  opacity: 1;
  visibility: visible;
}

/* تجاوب */
@media (max-width: 600px) {
  body {
    padding: 15px 10px;
  }
  .floating-buttons {
    left: 10px;
    bottom: 15px;
  }
  #topBtn {
    left: 10px;
    bottom: 70px;
    padding: 8px 12px;
    font-size: 0.9rem;
  }
  header h1 {
    font-size: 2rem;
  }
}

/* تحسينات إضافية */
a:focus, button:focus {
  outline: 2px solid var(--color-secondary);
  outline-offset: 3px;
}
