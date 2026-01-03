document.addEventListener('DOMContentLoaded', () => {
    // Music Control
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            bgMusic.play().catch(error => console.log("Audio playback failed:", error));
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // Scroll Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    // Falling Elements (Petals/Leaves)
    const container = document.getElementById('falling-container');
    const elementCount = 30;
    const symbols = ['🌸', '🍂', '✨', '🤍'];

    function createFallingElement() {
        const el = document.createElement('div');
        el.classList.add('falling-element');
        
        // Random symbol
        el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Random position
        el.style.left = Math.random() * 100 + 'vw';
        
        // Random animation duration and delay
        const duration = Math.random() * 5 + 5 + 's'; // 5-10s
        const delay = Math.random() * 5 + 's';
        
        el.style.animationDuration = duration;
        el.style.animationDelay = delay;
        
        // Random size
        const size = Math.random() * 20 + 10 + 'px';
        el.style.fontSize = size;

        container.appendChild(el);

        // Remove and recreate after animation ends to prevent DOM overload (simple loop)
        setTimeout(() => {
            el.remove();
            createFallingElement();
        }, parseFloat(duration) * 1000 + parseFloat(delay) * 1000);
    }

    // Initial creation
    for (let i = 0; i < elementCount; i++) {
        setTimeout(createFallingElement, Math.random() * 5000);
    }
});
