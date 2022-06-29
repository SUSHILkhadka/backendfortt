function settingpage() {
    let settingpage = document.querySelector('.settingpage');
    settingpage.style.display = 'block';

    let back=new Backbutton(settingpage,menu,'back',"absolute",true);
   let  backdiv=back.getDiv();
    settingpage.append(backdiv)


    document.querySelector("#firstplayername").value= localStorage.getItem('player1Name_TableTennis') ? localStorage.getItem('player1Name_TableTennis') : "Player1";
    document.querySelector("#secondplayername").value= localStorage.getItem('player2Name_TableTennis') ? localStorage.getItem('player2Name_TableTennis') : "Player2";
    document.querySelector("#towinscore").value= localStorage.getItem('toWinScore_TableTennis') ? localStorage.getItem('toWinScore_TableTennis') : 11;
    document.querySelector("#changeserveon").value= localStorage.getItem('changeServeOn') ? localStorage.getItem('changeServeOn') : 2;
    document.querySelector("#timescale").value= localStorage.getItem('timescale_TableTennis') ? localStorage.getItem('timescale_TableTennis') : 0.7;
    document.querySelector("#tablecolor").value= localStorage.getItem('tablecolor_TableTennis') ? localStorage.getItem('tablecolor_TableTennis') : TABLE_COLOR[3];
    document.querySelector("#ballcolor").value= localStorage.getItem('ballcolor_TableTennis') ? localStorage.getItem('ballcolor_TableTennis') : BALL_COLOR[1];

    let reset = document.querySelector('#reset');
    reset.addEventListener('click',function event(e) {

        document.querySelector("#firstplayername").value="Player1";
        document.querySelector("#secondplayername").value= "Player2";
        document.querySelector("#towinscore").value=11;
        document.querySelector("#changeserveon").value=2;
        document.querySelector("#timescale").value=0.7;
        document.querySelector("#tablecolor").value= TABLE_COLOR[3];
        document.querySelector("#ballcolor").value= BALL_COLOR[1];

        localStorage.setItem('player1Name_TableTennis', "Player1")
        localStorage.setItem('player2Name_TableTennis', "Player2")
        localStorage.setItem('toWinScore_TableTennis', 11)
        localStorage.setItem('changeServeOn', 2)
        localStorage.setItem('timescale_TableTennis', 0.7)
        localStorage.setItem('tablecolor_TableTennis', TABLE_COLOR[3])

        localStorage.setItem('ballcolor_TableTennis', BALL_COLOR[1])

    })

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
    let ee=document.querySelector("#tablecolor").value
    let f=document.querySelector("#ballcolor").value

        localStorage.setItem('player1Name_TableTennis', a)
        localStorage.setItem('player2Name_TableTennis', b)
        localStorage.setItem('toWinScore_TableTennis', c)
        localStorage.setItem('changeServeOn', d)
        localStorage.setItem('timescale_TableTennis', timeScale)
        localStorage.setItem('tablecolor_TableTennis', ee)
        localStorage.setItem('ballcolor_TableTennis', f)
    })

    // settingpage.append(backbutton);
}