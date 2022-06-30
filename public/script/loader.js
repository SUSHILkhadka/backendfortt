var assetpreload=0;
batimage.onload = function () {
    assetpreload++;
    removeLoading(assetpreload);

};

imageObj2.onload = function () {
    assetpreload++;
    removeLoading(assetpreload);
};

batimage.src = "./asset/bat.png";
imageObj2.src = "./asset/net.png";

/**
 * 
 * @param {*} assetpreload This is assetpreload counter
 */
function removeLoading(assetpreload){
    if(assetpreload==2){
    let loading=document.querySelector('.loading');
        let menu=document.querySelector(".menu");
        loading.style.display="none"
        menu.style.display="block";
    }
}