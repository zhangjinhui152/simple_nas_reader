function handleClick(type, fileName) {
    console.log("Button clicked!", type);
    // 在此处添加您想要执行的操作
    if (type == "dir") {
        console.log("lo :>> ", location.href + "" + fileName);
        let currnetParam = location.search
        location.href = location.href.replace(currnetParam,"")+"/" + fileName+currnetParam;
    }
}
/**
 *
 * @param {number} start
 * @param {number} end
 */
const next = (startN,endN) => {

    console.log("number :>> ", startN);
    const urlParams = new URLSearchParams(window.location.search);
    const start = urlParams.get("s")??0;
    const end = urlParams.get("e")??5;
    if ((Number(start)+startN) < 0 ) {
        return   
    }
    console.log(location.href.replace(window.location.search,"")+"?s="+(Number(start)+startN)+"&e="+(Number(end)+endN));
    
    location.href = location.href.replace(window.location.search,"")+"?s="+(Number(start)+startN)+"&e="+(Number(end)+endN)



};
const backParentDir = (params) => {
    let currnetParam = location.search
    let pathArray = location.href.replace(currnetParam,"").split("/");
    pathArray.pop();
    let newPath = pathArray.join("/");
    location.href = newPath+currnetParam;
}



