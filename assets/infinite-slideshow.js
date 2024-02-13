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
    const height = container.style.height;

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
        img.style.height = height;
        container.appendChild(img);
        container.items[i] = img;
    }

    marqueeContainers.push(container);
}

function rotateMarquee(containers) {
    if (!containers) return;

    for (let j = containers.length - 1; j > -1; j--) {
        const maxItems = containers[j].items.length;

        for (let i = 0; i < maxItems; i++) {
            const itemStyle = containers[j].items[i].style;
            itemStyle.left = parseInt(itemStyle.left, 10) - 1 + "px";
        }

        const firstItemStyle = containers[j].items[0].style;

        if (parseInt(firstItemStyle.left, 10) + parseInt(firstItemStyle.width, 10) < 0) {
            const shiftedItem = containers[j].items.shift();
            shiftedItem.style.left = parseInt(shiftedItem.style.left) + parseInt(shiftedItem.style.width) * maxItems + "px";
            containers[j].items.push(shiftedItem);
        }
    }

    containers[0].animationID = requestAnimationFrame(() => rotateMarquee(containers));
}