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
    const images = Array.from(container.getElementsByTagName("img"));
    const itemWidth = getObjectWidth(images[0]) + 5;
    const fullWidth = getObjectWidth(container);
    const height = container.offsetHeight; // Use offsetHeight instead of style.height

    container.onmouseout = () => rotateMarquee(marqueeContainers);
    container.onmouseover = () => cancelAnimationFrame(marqueeContainers[0].animationID);

    container.items = [];
    const maxItems = Math.ceil(fullWidth / itemWidth) + 1;

    container.innerHTML = ""; // Clear the container after we've got the images

    for (let i = 0; i < maxItems; i++) {
        const img = images[i % images.length].cloneNode(); // Clone the image
        img.style.position = "absolute";
        img.style.left = itemWidth * i + "px";
        img.style.width = itemWidth + "px";
        img.style.height = height + "px"; // Make sure to append "px"
        container.appendChild(img);
        container.items[i] = img;
    }

    marqueeContainers.push(container);
}

function rotateMarquee(containers) {
    for (let j = 0; j < containers.length; j++) {
        const container = containers[j];
        const firstImg = container.items[0];
        const speed = 1; // You can adjust this value to change the speed of the marquee

        for (let i = 0; i < container.items.length; i++) {
            const img = container.items[i];
            img.style.left = (parseInt(img.style.left, 10) - speed) + "px";
        }

        if (parseInt(firstImg.style.left, 10) + firstImg.offsetWidth < 0) {
            const lastImg = container.items[container.items.length - 1];
            firstImg.style.left = (parseInt(lastImg.style.left, 10) + lastImg.offsetWidth) + "px";
            container.items.push(container.items.shift());
        }
    }

    