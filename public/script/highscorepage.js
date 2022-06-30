async function highscorepage() {
    console.log('gg');
    let highscore_container = document.createElement('div');
    highscore_container.innerHTML="LOADING"
    document.body.append(highscore_container);

    
    let list = await bringHighscoreList();
    highscore_container.innerHTML=""


    for (let i = 0; i < list.length; i++) {
        let scorediv = document.createElement('div');

        let namediv = document.createElement('h2');
        let timediv = document.createElement('p');
        namediv.innerHTML = `${list[i]['name']}`;
        timediv.innerHTML = `${list[i]['timetaken']} seconds`;

        scorediv.append(namediv);
        scorediv.append(timediv);

        highscore_container.append(scorediv);

    }

    let back=new Backbutton(highscore_container,menu,'back','relative');
    let  backdiv=back.getDiv();
    highscore_container.append(backdiv)

}

async function bringHighscoreList() {
    const response = await fetch("./api/fetch")

    let list = await response.json();
    //sort based on timetaken

    list.sort((a, b) => {
        return a['timetaken'] - b['timetaken'];
    });

    return list;
}


const maxlength = 5;
async function highscoreHandler(finishtime, name) {
    let list = await bringHighscoreList();

    if (list.length < maxlength) {
        let body = JSON.stringify({
            "name": `${name}`,
            "timetaken": `${finishtime}`
        });
        console.log("body=", body)

        let resonse_after_add = await fetch("./api/create", {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return 0;

    }

    for (let i = 0; i < maxlength; i++) {

        if (finishtime < list[i]['timetaken']) {
            //add to firestore
            //delete last document using ith id

            let body = JSON.stringify({
                "id": `${list[list.length - 1]['id']}`,
                "name": `${name}`,
                "timetaken": `${finishtime}`
            });
            console.log("body=", body)

            let resonse_after_update = await fetch("./api/update", {
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json'
                }
            });



            return 0;
        }
    }

}


