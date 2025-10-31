        const form = document.getElementById('qrForm');
        const dataInput = document.getElementById('data');
        const dataError = document.getElementById('dataError');
        const qrcodeContainer = document.getElementById('qrcodeContainer');
        const qrcodeImage = document.getElementById('qrcodeImage');
        const downloadBtn = document.getElementById('downloadBtn');
        const generateBtn = document.getElementById('generateBtn');
        const loading = document.getElementById('loading');
        const fgColorSelect = document.getElementById('fgColor');
        const bgColorSelect = document.getElementById('bgColor');
        const fgPreview = document.getElementById('fgPreview');
        const bgPreview = document.getElementById('bgPreview');

        function rgbToHex(rgb) {
            const parts = rgb.split('-').map(n => parseInt(n));
            return '#' + parts.map(x => x.toString(16).padStart(2, '0')).join('');
        }

        function updateColorPreviews() {
            fgPreview.style.backgroundColor = rgbToHex(fgColorSelect.value);
            bgPreview.style.backgroundColor = rgbToHex(bgColorSelect.value);
        }

        updateColorPreviews();

        fgColorSelect.addEventListener('change', updateColorPreviews);
        bgColorSelect.addEventListener('change', updateColorPreviews);

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const data = dataInput.value.trim();
            if (!data) {
                dataError.style.display = 'block';
                dataInput.style.borderColor = '#ff4444';
                return;
            } else {
                dataError.style.display = 'none';
                dataInput.style.borderColor = '#ff8c00';
            }

            const size = document.getElementById('size').value;
            const fgColor = fgColorSelect.value;
            const bgColor = bgColorSelect.value;
            const charset = document.getElementById('charset').value;

            const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=${size}x${size}&color=${fgColor}&bgcolor=${bgColor}&charset-source=${charset}&charset-target=${charset}`;

            loading.style.display = 'block';
            generateBtn.disabled = true;
            qrcodeContainer.style.display = 'none';
            downloadBtn.style.display = 'none';

            qrcodeImage.onload = function() {
                loading.style.display = 'none';
                qrcodeContainer.style.display = 'block';
                downloadBtn.style.display = 'block';
                generateBtn.disabled = false;
            };

            qrcodeImage.onerror = function() {
                loading.style.display = 'none';
                alert('Erro ao gerar QR Code. Tente novamente.');
                generateBtn.disabled = false;
            };

            qrcodeImage.src = apiUrl;
        });

        downloadBtn.addEventListener('click', function() {
            const link = document.createElement('a');
            link.download = 'qrcode-basquete-BR@1@N.png';
            link.href = qrcodeImage.src;
            link.target = '_blank';
            link.click();
        });

        dataInput.addEventListener('input', function() {
            if (this.value.trim()) {
                dataError.style.display = 'none';
                this.style.borderColor = '#ff8c00';
            }
        });
