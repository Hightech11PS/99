function loadPayload(type) {
    const statusBox = document.getElementById('status');
    statusBox.innerText = 'جاري تحميل: ' + type + '...';
    console.log('Loading payload: ' + type);

    // المسار الخاص بالملف المراد تحميله من مجلد assets
    const scriptPath = `assets/${type}.js`;

    // إنشاء عنصر script وحقنه داخل الصفحة
    const script = document.createElement('script');
    script.src = scriptPath;
    
    script.onload = function() {
        statusBox.innerText = 'تم تحميل ' + type + ' بنجاح!';
    };
    
    script.onerror = function() {
        statusBox.innerText = 'خطأ: تعذر تحميل الملف ' + scriptPath;
    };

    document.body.appendChild(script);
}