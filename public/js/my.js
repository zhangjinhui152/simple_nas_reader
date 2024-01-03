function handleClick(type, fileName, reallyPath) {
    console.log("Button clicked!", type);
    // 在此处添加您想要执行的操作
    if (type == "dir") {
        console.log("lo :>> ", location.href + "" + fileName);
        let currnetParam = location.search;
        location.href =
            location.href.replace(currnetParam, "") +
            "/" +
            fileName +
            `?s=0&e=5`;
    }
    if (type == "image") {
        console.log("lo image:>> ", reallyPath, fileName);
        var imageElement = document.getElementById("showImage");
        var imageElement2 = document.getElementById("image-show");
        imageElement2.style.display = "block";
        imageElement.src = `/images/${reallyPath}${fileName}`;
    }
}
/**
 *
 * @param {number} start
 * @param {number} end
 */
const next = (startN, endN) => {
    console.log("number :>> ", startN);
    const urlParams = new URLSearchParams(window.location.search);
    const start = urlParams.get("s") ?? 0;
    const end = urlParams.get("e") ?? 5;
    if (Number(start) + startN < 0) {
        return;
    }
    console.log(
        location.href.replace(window.location.search, "") +
            "?s=" +
            (Number(start) + startN) +
            "&e=" +
            (Number(end) + endN)
    );

    location.href =
        location.href.replace(window.location.search, "") +
        "?s=" +
        (Number(start) + startN) +
        "&e=" +
        (Number(end) + endN);
};
const backParentDir = (params) => {
    let currnetParam = location.search;
    let pathArray = location.href.replace(currnetParam, "").split("/");
    pathArray.pop();
    let newPath = pathArray.join("/");
    location.href = newPath + `?s=0&e=5`;
};

function setLineWidth(text, item) {
    const lineWidth = text.offsetWidth + "px";
    item.style.setProperty("--lineWidth", lineWidth);
}

function handleTransition(item, text) {
    item.addEventListener("transitionend", (e) => {
        if (e.propertyName != "flex-grow" || !item.classList.contains("active"))
            return;

        text.classList.add("active");
    });
}
const closeImage = () => {
    console.log("close :>> ");
    var imageElement = document.getElementById("image-show");
    imageElement.style.display = "none";
};
