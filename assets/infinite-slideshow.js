document.addEventListener('DOMContentLoaded', (event) => {
    const marqueeContainer = document.getElementById('marqueeContainer');

    // Calculate the width of the original content
    const originalContentWidth = marqueeContainer.scrollWidth;

    // Clone the marquee content to create a continuous loop
    const marqueeItems = marqueeContainer.innerHTML;
    for(let i = 0; i < 10; i++) { // Increase the number as needed
        marqueeContainer.innerHTML += marqueeItems;
    }

    // Set up animation
    let scrollLeft = 0;
    const scrollSpeed = 50; // Adjust the scroll speed as needed

    let lastTimestamp = null;
    let animationId = null;

    function animateMarquee(timestamp) {
        if (!lastTimestamp) {
            lastTimestamp = timestamp;
        }

        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        scrollLeft += scrollSpeed * deltaTime / 60; // Normalize speed
        if (scrollLeft >= originalContentWidth) { // Reset when scrollLeft is greater or equal to the width of the original content
            scrollLeft = 0;
        }
        marqueeContainer.style.transform = `translateX(-${scrollLeft}px)`;

        animationId = requestAnimationFrame(animateMarquee);
    }

    function stopAnimation() {
        cancelAnimationFrame(animationId);
    }

    function startAnimation() {
        lastTimestamp = null;
        animationId = requestAnimationFrame(animateMarquee);
    }

    marqueeContainer.addEventListener('mouseenter', stopAnimation);
    marqueeContainer.addEventListener('mouseleave', startAnimation);

    startAnimation();
});