document.addEventListener('DOMContentLoaded', (event) => {
    const marqueeContainer = document.getElementById('marqueeContainer');

    // Clone the marquee content to create a continuous loop
    const marqueeItems = marqueeContainer.innerHTML;
    marqueeContainer.innerHTML += marqueeItems;

    // Set up animation
    let scrollLeft = 0;
    const scrollSpeed = 4; // Adjust the scroll speed as needed

    let lastTimestamp = null;

    function animateMarquee(timestamp) {
        if (!lastTimestamp) {
            lastTimestamp = timestamp;
        }

        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        scrollLeft += scrollSpeed * deltaTime / 60; // Normalize speed
        if (scrollLeft >= marqueeContainer.scrollWidth / 2) {
            scrollLeft = 0;
        }
        marqueeContainer.style.transform = `translateX(-${scrollLeft}px)`;

        requestAnimationFrame(animateMarquee);
    }

    requestAnimationFrame(animateMarquee);
});