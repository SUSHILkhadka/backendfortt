var assetpreload=0;
imageObj.onload = function () {
    assetpreload++;
    removeLoading(assetpreload);

};
texture.onload = function () {
    assetpreload++;
    removeLoading(assetpreload);

};

imageObj2.onload = function () {
    assetpreload++;
    removeLoading(assetpreload);

};
    imageObj3.onload = function () {
    assetpreload++;
    removeLoading(assetpreload);

};

batimage.src = "./asset/bat.png";
texture.src = "./asset/walltexture1.png";
imageObj.src = "asset/wall.png";
imageObj2.src = "./asset/net.png";
imageObj3.src = "asset/floor.jpg";

function removeLoading(assetpreload){
    if(assetpreload==4){
    let loading=document.querySelector('.loading');
        let menu=document.querySelector(".menu");
        loading.style.display="none"
        menu.style.display="block";
    }

}