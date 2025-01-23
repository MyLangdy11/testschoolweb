const slides = document.querySelector(".slides");
        const slideElements = document.querySelectorAll(".slide");
        const totalSlides = slideElements.length;

        let currentSlideIndex = 0;
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;

        // Auto-slide every 3 seconds
        function autoSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
            updateSlidePosition();
        }
        let autoSlideInterval = setInterval(autoSlide, 3000);

        // Function to update the position of the slides
        function updateSlidePosition() {
            currentTranslate = -currentSlideIndex * 100;
            slides.style.transform = `translateX(${currentTranslate}%)`;
        }

        // Touch events for swipe gestures
        slides.addEventListener("touchstart", touchStart);
        slides.addEventListener("touchend", touchEnd);
        slides.addEventListener("touchmove", touchMove);

        function touchStart(event) {
            isDragging = true;
            startX = event.touches[0].clientX;
            cancelAnimationFrame(animationID);
            clearInterval(autoSlideInterval); // Pause auto-slide on touch
        }

        function touchMove(event) {
            if (!isDragging) return;
            const currentX = event.touches[0].clientX;
            const diff = currentX - startX;
            currentTranslate = prevTranslate + diff / window.innerWidth * 100;
            slides.style.transform = `translateX(${currentTranslate}%)`;
        }

        function touchEnd() {
            isDragging = false;
            const movedBy = currentTranslate - prevTranslate;

            // If moved enough, change the slide
            if (movedBy < -25) {
                currentSlideIndex = Math.min(currentSlideIndex + 1, totalSlides - 1);
            }
            if (movedBy > 25) {
                currentSlideIndex = Math.max(currentSlideIndex - 1, 0);
            }

            updateSlidePosition();
            prevTranslate = currentTranslate;

            // Restart auto-slide
            autoSlideInterval = setInterval(autoSlide, 8000);
        }