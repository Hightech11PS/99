// تسجيل Service Worker للتخزين أوفلاين
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(() => {
                const statusBox = document.getElementById('status');
                if (statusBox) statusBox.innerText = "تم حفظ الموقع في الكاش بنجاح (Offline Ready)!";
            })
            .catch((err) => {
                console.error('Service Worker Registration Failed:', err);
            });
    });
}

function loadPayload(type) {
    const statusBox = document.getElementById('status');
    if (statusBox) statusBox.innerText = 'جاري تحميل: ' + type + '...';

    const scriptPath = `assets/${type}.js`;
    const script = document.createElement('script');
    script.src = scriptPath;
    
    script.onload = function() {
        if (statusBox) statusBox.innerText = 'تم تحميل ' + type + ' بنجاح!';
    };
    
    script.onerror = function() {
        if (statusBox) statusBox.innerText = 'خطأ: تعذر تحميل الملف ' + scriptPath;
    };

    document.body.appendChild(script);
}