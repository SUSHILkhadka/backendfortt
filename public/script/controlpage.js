function controlpage() {
    let page = document.createElement("div")
    page.style.position = 'relative';
    page.style.backgroundColor = 'black';

    let firstplayer = document.createElement("div")
    let name1 = document.createElement("h1")
    name1.innerHTML = "PLAYER1";
    let mouseDescription = document.createElement("p");
    mouseDescription.innerHTML = 'Move mouse for moving bat'
    let cam1Description = document.createElement("p");
    cam1Description.innerHTML = 'WASD to rotate camera';
    firstplayer.append(name1);
    firstplayer.append(mouseDescription);
    firstplayer.append(cam1Description);


    let secondplayer = document.createElement("div")
    let name2 = document.createElement("h1")
    name2.innerHTML = "PLAYER2";
    let keyboardDescription = document.createElement("p");
    keyboardDescription.innerHTML = 'Arrow keys for moving bat'
    let cam2Description = document.createElement("p");
    cam2Description.innerHTML = 'IJKL to rotate camera';
    secondplayer.append(name2);
    secondplayer.append(keyboardDescription);
    secondplayer.append(cam2Description);


    let bothplayer = document.createElement("p");
    bothplayer.innerHTML = "O and P for zooming in and out camera"

    page.append(firstplayer);
    page.append(secondplayer);
    page.append(bothplayer);
    let back=new Backbutton(page,menu,'back');
    let  backdiv=back.getDiv();
    page.append(backdiv)
    document.body.append(page);







}