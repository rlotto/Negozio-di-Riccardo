function initializeMarquee() {
    createMarqueeContainer('logos-marquee');
    rotateMarquee(marqueeContainers);
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
    const itemWidth = getObjectWidth(container.getElementsByTagName("img")[0]) + 5;
    const fullWidth = getObjectWidth(container);
    const imageSrc = container.getElementsByTagName("img")[0].src;
    container.innerHTML = "";
    const height = container.style.height;

    container.onmouseout = () => rotateMarquee(marqueeContainers);

    container.onmouseover = () => cancelAnimationFrame(marqueeContainers[0].animationID);

    container.items = [];
    const maxItems = Math.ceil(fullWidth / itemWidth) + 1;

    for (let i = 0; i < maxItems; i++) {
        container.items[i] = document.createElement("img");
        container.items[i].src = imageSrc;
        container.items[i].style.position = "absolute";
        container.items[i].style.left = itemWidth * i + "px";
        container.items[i].style.width = itemWidth + "px";
        container.items[i].style.height = height;
        container.appendChild(container.items[i]);
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