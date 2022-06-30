const menu=document.querySelector('.menu')
const singleplayer=document.querySelector('.singleplayer')
const multiplayer=document.querySelector('.multiplayer')
const training=document.querySelector('.training')
const setting=document.querySelector('.setting')
const control=document.querySelector('.control')
const highscore=document.querySelector('.highscore')


singleplayer.addEventListener('click',function event(e){
    menu.style.display='none';
    gameloop(1);
})
multiplayer.addEventListener('click',function event(e){
    menu.style.display='none';
    gameloop(2);
})
training.addEventListener('click',function event(e){
    menu.style.display='none';
    gameloop(1,1);
})
setting.addEventListener('click',function event(e){
    menu.style.display='none';
    settingpage();
})

control.addEventListener('click',function event(e){
    menu.style.display='none';
    controlpage();
})

highscore.addEventListener('click',function event(e){
    menu.style.display='none';
    highscorepage();
})
