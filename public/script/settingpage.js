function settingpage() {
    let settingpage = document.querySelector('.settingpage');
    settingpage.style.display = 'block';

    let backbutton = document.createElement('button')
    backbutton.innerHTML = 'back';
    backbutton.style.position = 'absolute';
    backbutton.style.top = '0px';
    backbutton.style.right = '0px';
    backbutton.addEventListener('click', function event(e) {
        settingpage.style.display = 'none';
        menu.style.display = 'block';

        return 0;
    })
    settingpage.append(backbutton);
    document.querySelector("#firstplayername").value= localStorage.getItem('player1Name_TableTennis') ? localStorage.getItem('player1Name_TableTennis') : "Player123";
    document.querySelector("#secondplayername").value= localStorage.getItem('player2Name_TableTennis') ? localStorage.getItem('player2Name_TableTennis') : "Player2";
    document.querySelector("#towinscore").value= localStorage.getItem('toWinScore_TableTennis') ? localStorage.getItem('toWinScore_TableTennis') : 11;
    document.querySelector("#changeserveon").value= localStorage.getItem('changeServeOn') ? localStorage.getItem('changeServeOn') : 2;
    document.querySelector("#timescale").value= localStorage.getItem('timescale_TableTennis') ? localStorage.getItem('timescale_TableTennis') : 0.7;

    let save = document.querySelector('#save');
    save.addEventListener('click',function event(e) {

        let a=document.querySelector("#firstplayername").value
        let b=document.querySelector("#secondplayername").value
        let c=document.querySelector("#towinscore").value
        let d=document.querySelector("#changeserveon").value
        timeScale=document.querySelector("#timescale").value
        if(timeScale>2){
            timeScale=2;
        }
    if(timeScale<=0){
        timeScale=0;
    }

        localStorage.setItem('player1Name_TableTennis', a)
        localStorage.setItem('player2Name_TableTennis', b)
        localStorage.setItem('toWinScore_TableTennis', c)
        localStorage.setItem('changeServeOn', d)
        localStorage.setItem('timescale_TableTennis', timeScale)


        // localStorage.setItem('player1Name_TableTennis', "Ram")



    })

    settingpage.append(backbutton);
}