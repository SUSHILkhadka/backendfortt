async function highscorepage() {
    let highscore_container = document.createElement('div');


    //show loading screen unless data is fetched from database.
    let loading = document.createElement('p')
    loading.innerHTML = "LOADING..."
    highscore_container.append(loading)
    document.body.append(highscore_container);


    let list = await bringHighscoreList();
    //when data loaded, empty highscore container
    highscore_container.innerHTML = ""


    //then add name and time of players from database one by one
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


    //back button
    let back = new Backbutton(highscore_container, menu, 'back', 'relative');
    let backdiv = back.getDiv();
    highscore_container.append(backdiv)

}



//brings highscore list from databnase and returns sorted list based on "time taken".
async function bringHighscoreList() {
    const response = await fetch("./api/fetch")

    let list = await response.json();
    //sort based on timetaken

    list.sort((a, b) => {
        return a['timetaken'] - b['timetaken'];
    });
    return list;
}



/**
 * 
 * @param {*} finishtime This is time taken by player to win
 * @param {*} name This is name of winner
 * @returns It checks if timetaken is less then any of exisiting list in database and updates it, if current timetaken is less.
 */
async function highscoreHandler(finishtime, name) {
    let list = await bringHighscoreList();

    //If list is not fully filled, add irrespective of timetaken
    if (list.length < maxlength) {
        let body = JSON.stringify({
            "name": `${name}`,
            "timetaken": `${finishtime}`
        });

        let resonse_after_add = await fetch("./api/create", {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return 0;

    }


    //individually check if current timetaken is less than any of exisiting list's timetaken
    for (let i = 0; i < maxlength; i++) {
        if (finishtime < list[i]['timetaken']) {
            //replace last document with present data.

            let body = JSON.stringify({
                "id": `${list[list.length - 1]['id']}`,
                "name": `${name}`,
                "timetaken": `${finishtime}`
            });

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


