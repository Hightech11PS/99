// Register Service Worker & Handle Cache
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(() => updateStatus('تم تحميل الملفات في الكاش بنجاح (جاهز Offline)'))
            .catch((err) => console.log('SW Registration Failed:', err));
    });
}

function updateStatus(message, progressPercent = null) {
    const statusText = document.getElementById('status-text');
    const progressFill = document.getElementById('progress-fill');
    
    if (statusText) statusText.innerText = message;
    if (progressPercent !== null && progressFill) {
        progressFill.style.width = progressPercent + '%';
    }
}

// Unified Execution Sequence
function initExploitSequence() {
    const btn = document.getElementById('btn-autolaunch');
    btn.disabled = true;
    btn.style.opacity = '0.6';

    updateStatus('جاري تشغيل ثغرة WebKit...', 20);

    setTimeout(() => {
        try {
            if (typeof runWebKit === 'function') {
                runWebKit();
            }
            updateStatus('جاري تشغيل PSFree...', 50);
            
            setTimeout(() => {
                if (typeof runPSFree === 'function') {
                    runPSFree();
                }
                updateStatus('جاري حقن GoldHEN Payload...', 80);

                setTimeout(() => {
                    if (typeof loadGoldHen === 'function') {
                        loadGoldHen();
                    }
                    updateStatus('تم تفعيل GoldHEN بنجاح! تمتع بالتعديل.', 100);
                }, 1500);

            }, 1500);

        } catch (error) {
            updateStatus('حدث خطأ أثناء التفعيل: ' + error.message, 0);
            btn.disabled = false;
            btn.style.opacity = '1';
        }
    }, 1000);
}
