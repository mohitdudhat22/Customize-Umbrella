const body = document.body;
const colorCircles = document.querySelectorAll('.color-circle');
const umbrellaImg = document.getElementById('umbrella');
const loaderSvg = document.getElementById('loader-svg');
const fileInput = document.getElementById('logo-upload');
const uploadBtn = document.getElementById('upload-btn');
const loader = document.getElementById('loader');
const logoPlaceholder = document.getElementById('logo-placeholder');
const closeBtn = document.querySelector('.close-btn');
const colorMap = {
    "black": {
        src: "/public/Yellow umbrella.png", border: "#524f44",
        backgroundColor: "#2e2926",
        ScreenBackgroundColor: "#2e29261a",
    },
    "grey": {
        src: "/public/Yellow umbrella.png", border: "#a8a49a",
        backgroundColor: "#727373",
        ScreenBackgroundColor: "#7372722e",
    },
    "midnight-blue": {
        src: "/public/Yellow umbrella.png", border: "#2d5069",
        backgroundColor: "#002f5b",
        ScreenBackgroundColor: "#002f5b2e",
    },
    "pink": {
        src: "/public/Pink umbrella.png", border: "#d94587", ScreenBackgroundColor: "#e11a711a",
        backgroundColor: "#e11a71"
    },
    "blue": {
        src: "/public/Blue umbrella.png", border: "#5ca5be", ScreenBackgroundColor: "#e7f6fc",
        backgroundColor: "#0097e5"
    },
    "yellow": {
        src: "/public/Yellow umbrella.png", border: "#ffe483", ScreenBackgroundColor: "#fdf3e8",
        backgroundColor: "#fed248"
    },
    "orange": {
        src: "/public/Yellow umbrella.png", border: "#ff9e4f", ScreenBackgroundColor: "#f27d1f26",
        backgroundColor: "#f27d1f"
    },
    "red": {
        src: "/public/Yellow umbrella.png", border: "#df766f",
        backgroundColor: "#ff473a",
        ScreenBackgroundColor: "rgb(255 229 227)"
    }
};

colorCircles.forEach((circle) => {
    circle.addEventListener('click', function () {
        colorCircles.forEach(c => {
            c.style.border = 'none';
            c.classList.remove('active');
        });
        loader.style.display = 'block';
        loaderSvg.style.display = 'block';
        umbrellaImg.style.display = 'none';
        logoPlaceholder.style.display = 'none';
        this.classList.add('active');

        const color = this.getAttribute('data-color');
        const colorData = colorMap[color];
        if (colorData) {
            umbrellaImg.src = colorData.src;
            this.style.border = `3px solid ${colorData.border}`;
            loaderSvg.querySelector('path').setAttribute('fill', colorData.border);
            uploadBtn.style.backgroundColor = colorData.backgroundColor;
            uploadBtn.parentElement.style.backgroundColor = colorData.backgroundColor
            body.style.backgroundColor = colorData.ScreenBackgroundColor;
        } else {
            umbrellaImg.src = "/public/Blue umbrella.png";
            body.style.backgroundColor = "#e4f5fd";
            loaderSvg.querySelector('path').setAttribute('fill', '#5ca5be');
        }
        setTimeout(() => {
            loader.style.display = 'none';
            loaderSvg.style.display = 'none';
            umbrellaImg.style.display = 'block';
            logoPlaceholder.style.display = 'block';
        }, 2000);
    })
})


uploadBtn.addEventListener('click', () => {
    fileInput.click()
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File size exceeds 5MB. Please choose a smaller file.');
            fileInput.value = '';
            return;
        }
        loader.style.display = 'block';
        umbrellaImg.style.display = 'none';
        logoPlaceholder.style.display = 'none';
        const btnText = uploadBtn.querySelector('.btn-text');
        const reader = new FileReader();
        reader.onload = function (e) {
            logoPlaceholder.innerHTML = '';
            const img = document.createElement('img');
            img.src = e.target.result;
            logoPlaceholder.appendChild(img);

            setTimeout(() => {
                loader.style.display = 'none';
                umbrellaImg.style.display = 'block';
                logoPlaceholder.style.display = 'block';
            }, 2000);
        };
        if (btnText) {
            const text = file.name
            btnText.textContent = text;
        }
        if (closeBtn) {
            closeBtn.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});

document.addEventListener('click', (e) => {
    if (e.target.closest('.close-btn')) {
        fileInput.value = '';
        logoPlaceholder.innerHTML = '';
        const btnText = uploadBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'UPLOAD LOGO';
        e.target.closest('.close-btn').style.display = 'none';
    }
});
