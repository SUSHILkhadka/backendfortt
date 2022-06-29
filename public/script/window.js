
class Scoreboard {
    constructor(player1Name,player2Name) {

        this.scoreboard = document.createElement('div');
        this.name1 = document.createElement('h3')
        this.name1.innerHTML = `${player1Name}`
        this.name2 = document.createElement('h3')
        this.name2.innerHTML = `${player2Name}`
        this.score1 = document.createElement('h2');
        this.score2 = document.createElement('h2');
        this.serveflag = document.createElement('h2');
        this.scoreboard.append(this.name1);
        this.scoreboard.append(this.score1);
        this.scoreboard.append(this.name2);
        this.scoreboard.append(this.score2);
        this.scoreboard.append(this.serveflag);
        this.scoreboard.style.background = 'transparent'
        this.scoreboard.style.position = "absolute";
        this.scoreboard.style.zIndex = "1"
        this.scoreboard.style.top = '0px';
        this.scoreboard.style.left = '0px';

    }
    getDiv() {
        return this.scoreboard
    }
    updateScore(s1,s2){
        this.score1.innerHTML = `${s1}`
        this.score2.innerHTML = `${s2}`
    }
}

class Backbutton{
    constructor(origin,destination,name,pos="absolute",presentinhtml=false){
    this.backbutton = document.createElement('button')
    this.backbutton.innerHTML = `${name}`;
    this.backbutton.style.position = pos;
    this.backbutton.style.top = '0px';
    this.backbutton.style.right = '0px';
    this.backbutton.addEventListener('click', function event(e) {
        if(presentinhtml==true){
        origin.style.display='none';
        }
        else{
            origin.innerHTML = '';
        }
            destination.style.display = 'block';
            return 0;
    })
}

    getDiv(){
        return this.backbutton;
    }





}