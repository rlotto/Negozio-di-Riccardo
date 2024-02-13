function initializeMarquee() {
    const container = document.getElementById('logos-marquee');
    const images = Array.from(container.getElementsByTagName("img"));
    const imagesLoaded = images.map(img => new Promise(resolve => img.onload = resolve));
    Promise.all(imagesLoaded).then(() => {
        createMarqueeContainer('logos-marquee');
        rotateMarquee(marqueeContainers);
    });
}

window.onload = initializeMarquee;

function getObjectWidth(obj) {
    if (obj.naturalWidth) return obj.naturalWidth;
    if (obj.clip) return obj.clip.width;
    return 0;
}

const marqueeContainers = [];

function createMarqueeContainer(id) {
    const container = document.getElementById(id);
    const images = Array.from(container.getElementsByTagName("img")).map(img => img.cloneNode()); // Clone images
    const itemWidth = images[0].offsetWidth;
    const fullWidth = container.offsetWidth;

    // Clear the container
    container.innerHTML = "";

    container.items = [];
    const maxItems = Math.ceil(fullWidth / itemWidth) * 2; // Double the items for seamless animation

    for (let i = 0; i < maxItems; i++) {
        const img = images[i % images.length].cloneNode(); // Clone the image
        img.style.position = "absolute";
        img.style.left = (itemWidth * i) + "px";
        container.appendChild(img);
        container.items[i] = img;
    }

    return container;
}

function rotateMarquee(container) {
    const speed = 2; // Adjust speed as needed
    const itemWidth = container.items[0].offsetWidth;
    container.items.forEach((img, i) => {
        const left = img.offsetLeft - speed;
        if (left + itemWidth < 0) {
            img.style.left = (itemWidth * (container.items.length - 1)) + "px";
            container.appendChild(img); // Move the image to the end
        } else {
            img.style.left = left + "px";
        }
    });

    requestAnimationFrame(() => rotateMarquee(container));
}

window.onload = function() {
    const container = createMarqueeContainer('logos-marquee');
    rotateMarquee(container);
};