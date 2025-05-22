<script>
// منع النقر بزر الفأرة الأيمن
document.addEventListener('contextmenu', e => {
    e.preventDefault();
    console.log('تم تعطيل النقر بزر الفأرة الأيمن.');
});

// منع بعض اختصارات أدوات المطور والنسخ
document.addEventListener('keydown', e => {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        console.log('تم تعطيل F12.');
    }

    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        console.log('تم تعطيل Ctrl+Shift+I.');
    }

    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        console.log('تم تعطيل Ctrl+Shift+J.');
    }

    // Ctrl+U
    if (e.ctrlKey && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        console.log('تم تعطيل Ctrl+U.');
    }

    // Ctrl+S / Ctrl+Shift+S (حفظ الصفحة)
    if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        console.log('تم تعطيل حفظ الصفحة.');
    }

    // Ctrl+C / Ctrl+X (نسخ وقص)
    if (e.ctrlKey && ['c', 'x'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        console.log('تم تعطيل النسخ والقص.');
    }
});

console.log('تم تحميل سكربت الحماية بنجاح.');
</script>
