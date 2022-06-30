function gameloop(gamemode = 1, training = 0) {


    let gamebox = document.createElement("div")
    gamebox.style.position = 'relative';
    gamebox.style.backgroundColor = 'black'

    document.body.append(gamebox)
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext('2d');
    gamebox.append(canvas)

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    canvas.style.cursor = 'none'
    let adjustXdependingOnGameMode = -100
    let adjustYdependingOnGameMode = 200;

    let canvas2 = document.createElement("canvas")
    let ctx2 = canvas2.getContext('2d');

    //local storage access
    let player1Name = localStorage.getItem('player1Name_TableTennis') ? localStorage.getItem('player1Name_TableTennis') : "Player1";
    let player2Name = localStorage.getItem('player2Name_TableTennis') ? localStorage.getItem('player2Name_TableTennis') : "Player2";
    let toWinScore = localStorage.getItem('toWinScore_TableTennis') ? localStorage.getItem('toWinScore_TableTennis') : 11;
    let changeServeOn = localStorage.getItem('changeServeOn') ? localStorage.getItem('changeServeOn') : 2;
    timeScale = localStorage.getItem('timescale_TableTennis') ? localStorage.getItem('timescale_TableTennis') : 0.7;

    let alpha1=0.8
    let alpha2=0.7
    let alpha3=1

    pattern = ctx.createPattern(imageObj, 'repeat');
texturepattern = ctx.createPattern(texture, 'repeat');
netpattern = ctx.createPattern(imageObj2, 'repeat');
floorpattern = ctx.createPattern(imageObj3, 'repeat');
    if (gamemode == 2) {
        adjustXdependingOnGameMode = 0
        adjustYdependingOnGameMode = 0;
        canvasWidthDividerForMultiplayer = 1
        canvasHeightDividerForMultiplayer = 2

        WIDTH_SCALE_FOR_PROJECTION = 2;
        HEIGHT_SCALE_FOR_PROJECTION = 2;

        ballradiusfactor = 2.5
        shadowradiusfactor = 6000

        START_ZPLANE = 1.5

         alpha1=0.8
         alpha2=0.9
         alpha3=1

        canvas.width = CANVAS_WIDTH / canvasWidthDividerForMultiplayer;
        canvas.height = CANVAS_HEIGHT / canvasHeightDividerForMultiplayer;

        gamebox.append(canvas2)
        canvas2.width = CANVAS_WIDTH / canvasWidthDividerForMultiplayer;
        canvas2.height = CANVAS_HEIGHT / canvasHeightDividerForMultiplayer;
        canvas2.style.cursor = 'none'

    }

    let world = new World();
    let table = new Table()

    let centre = new Point3D(0.2, STARTING_BALL_POSITION_Y, 2.09)
    let vel = new Point3D(STARTING_BALL_VELOCITY_X, STARTING_BALL_VELOCITY_Y, -0.01);
    let ball = new Ball(centre, 0.01, vel)

    let bat = new Bat();
    let bat_far = new Bat();

    let angy = 0;
    let angx = 25;
    let angy2 = 0;
    let angx2 = 25;
    let gameoverflag = 0;

    //backbutton
    let backbutton = document.createElement('button')
    backbutton.innerHTML = 'quit';
    backbutton.style.position = 'absolute';
    backbutton.style.top = '0px';
    backbutton.style.right = '0px';
    backbutton.addEventListener('click', function event(e) {
        if (gameoverflag == 0) {
            ambientsound.pause();
            ambientsound.currentTime = 0;
            gameoverflag = 1;
            gamebox.innerHTML = '';
            menu.style.display = 'block';
            world = null;
            ball = null;
            bat = null;
            bat_far = null;
            return 0;
        }
    })
    gamebox.append(backbutton);
    ambientsound.play();
    ambientsound.loop = true;


    //scoreboard
    let scoreboard = new Scoreboard(player1Name, player2Name);
    gamebox.append(scoreboard.getDiv());

    bat.addMouseController();
    if (training == 1) {
        bat.addKeyboardController();
    }
    if (gamemode == 2) {
        bat_far.addKeyboardController();
    }
    window.addEventListener('keydown', function event(e) {
        if (e.code == 'KeyP') {
            if (START_ZPLANE > RESTRICTION_START_ZPLANE_min) {
                START_ZPLANE -= incrementDistance;
            }
        }
        if (e.code == 'KeyO') {
            if (START_ZPLANE < RESTRICTION_START_ZPLANE_max) {
                START_ZPLANE += incrementDistance;
            }
        }
        if (e.code == 'KeyA') {
            if (angy < RESTRICTION_ANGLE_Y) {
                angy += increment;
            }
        }
        if (e.code == 'KeyD') {
            if (angy > - RESTRICTION_ANGLE_Y) {
                angy -= increment;
            }
        }
        if (e.code == 'KeyW') {

            if (angx > 0) {
                angx -= increment;
            }

        } if (e.code == 'KeyS') {
            // viewpointY+=5;
            if (angx < RESTRICTION_ANGLE_X) {
                angx += increment;
            }
        }

        if (e.code == 'KeyL') {
            if (angy2 < RESTRICTION_ANGLE_Y) {
                angy2 += increment;
            }
        }

        if (e.code == 'KeyJ') {
            if (angy2 > - RESTRICTION_ANGLE_Y) {
                angy2 -= increment;
            }
        }

        if (e.code == 'KeyI') {
            if (angx2 > 0) {
                angx2 -= increment;
            }

        } if (e.code == 'KeyK') {
            if (angx2 < RESTRICTION_ANGLE_X) {
                angx2 += increment;
            }
        }
    });


    let startime = Date.now();

    function play() {

        if (gameoverflag == 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#87ceeb'
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            if (bat.score >= toWinScore || bat_far.score >= toWinScore) {
                if (gameoverflag == 0) {
                    gameoverflag = 1;
                    let winner = player1Name;

                    let finishtime = Date.now();
                    let timetaken = Math.floor((finishtime - startime) / 1000);
                    if (bat.score >= toWinScore) {
                        winner = player1Name;
                        highscoreHandler(timetaken, player1Name)
                    }
                    else {
                        winner = player2Name;
                        highscoreHandler(timetaken, player2Name)
                    }

                    let winnerbox = document.createElement('div');
                    winnerbox.style.position = 'absolute';
                    winnerbox.style.top = toPx(CANVAS_HEIGHT / 2);
                    winnerbox.style.left = toPx(CANVAS_WIDTH / 2.2);
                    let greet = document.createElement('p');
                    greet.innerHTML = `${winner}  WON!!!!`;
                    winnerbox.append(greet);
                    gamebox.append(winnerbox);

                    setTimeout(function () {
                        ambientsound.pause();
                        ambientsound.currentTime = 0;
                        gamebox.innerHTML = '';
                        menu.style.display = 'block';
                        world = null;
                        ball = null;
                        bat = null;
                        bat_far = null;
                        return 0;
                    }, 2000)
                }

            }


            bat.updateAngle(angy);
            bat_far.updateAngle(angy2);
            let bat_farMirror = new Bat();
            bat_farMirror.new(bat_far.topLeft, bat_far.topRight, bat_far.bottomLeft, bat_far.bottomRight)
            bat_farMirror.reflection();
            ball.collisionWorld();
            ball.updatePosition();
            ball.collisionTable(bat, bat_far);
            if (training == 0) {
                ball.collisionNet(ctx, angy, angx);
            }
            if (training == 1) {
                ball.dontGoOutside();
            }

            if (freeze == 0) {
                ball.collisionBat2(angy, angy2, bat, bat_far);
                bat.updatePosition();
                bat_far.updatePosition();
            }
            //bot tracking movements both x and y:
            if (gamemode == 1 && freeze == 0 && training == 0) {
                bat_far.trackBall(ball);
                bat_far.adjustRange(ball);
            }

            ctx.translate(translateX + adjustXdependingOnGameMode, translateY + adjustYdependingOnGameMode);
            ctx.globalAlpha = alpha1;
            if (angy < 14) {
                world.drawWallRight(ctx, angy, angx);
            }
            if (angy > -14) {
                world.drawWallLeft(ctx, angy, angx);
            }
            world.drawWorld(ctx, angy, angx);
            table.drawAll(ctx, angy, angx);

            ctx.globalAlpha = alpha2;
            if (training == 0) {
                bat_farMirror.drawBat3D(ctx, angy, angx);
            }
            table.drawNet(ctx, angy, angx)
            bat.drawBat3D(ctx, angy, angx);
            ctx.globalAlpha = alpha3;
            ball.drawAll(ctx, angy, angx);



            //score
            scoreboard.updateScore(bat.score, bat_far.score);

            if (freeze == 0 && training == 0) {
                updateScore2(ball, bat, bat_far);
            }
            ball.serverid = serveDeterminer(bat.score, bat_far.score, ball.serverid, changeServeOn);
            if (gamemode == 1) {
                ball.serverid = 1
            }
            ctx.translate(-translateX - adjustXdependingOnGameMode, -translateY - adjustYdependingOnGameMode);


            //next bat calculation
            let ballMirror = new Ball();
            ballMirror.new(ball.centre, ball.rad, ball.velocity, ball.upside_collision_flag, ball.downside_collision_flag, ball.serveflag, ball.lastCollidedBat)
            ballMirror.reflection();
            let batMirror = new Bat();
            batMirror.new(bat.topLeft, bat.topRight, bat.bottomLeft, bat.bottomRight)
            batMirror.reflection();
            if (freeze == 0) {
                ballMirror.collisionBat2(angy, angy2, bat_far, bat, false);
                ball.velocity = ballMirror.velocity;
                ball.centre.y = ballMirror.centre.y
                ball.serveflag = ballMirror.serveflag;
                bat_far.updateAngle(angy2);
                bat_far.updatePosition();
            }


            ctx2.clearRect(0, 0, canvas.width, canvas.height);
            //next bat draw
            if (gamemode == 2) {
                ctx2.strokeRect(0, 0, canvas.width, canvas.height);
                ctx2.translate(translateX, translateY);
                let world2 = new World();
                ctx2.globalAlpha = alpha1;
                if (angy2 < 15) {
                    world2.drawWallRight(ctx2, angy2, angx2);
                }
                if (angy2 > -14) {
                    world2.drawWallLeft(ctx2, angy2, angx2);
                }
                world2.drawWorld(ctx2, angy2, angx2);
                table.drawAll(ctx2, angy2, angx2);

                ctx2.globalAlpha=alpha2;
                batMirror.drawBat3D(ctx2, angy2, angx2);
                table.drawNet(ctx2, angy2, angx2);
                bat_far.drawBat3D(ctx2, angy2, angx2);

                ctx2.globalAlpha = alpha3;
                ballMirror.drawAll(ctx2, angy2, angx2);

                ctx2.translate(-translateX, -translateY);
            }


            requestAnimationFrame(play);
        }


    }
    play();

}




/**
 * 
 * @param {*} ball used for upside collision count, downside collision count, and other flags
 * @param {*} bat for updating score of player first
 * @param {*} bat_far for updating score of player second 
 */

function updateScore2(ball, bat, bat_far) {
    if (freeze == 0) {
        if (ball.outOfBoard == 1) {
            if (ball.serverid == 1) {

                if (ball.downside_collision_flag - ball.upside_collision_flag == 0) {
                    bat.score++;
                    ball.startServe();
                }
                else if (ball.downside_collision_flag > ball.upside_collision_flag) {
                    bat_far.score++
                    ball.startServe();
                }
            }
            else {
                if (ball.upside_collision_flag - ball.downside_collision_flag == 0) {
                    bat_far.score++;
                    ball.startServe();
                }
                else if (ball.upside_collision_flag > ball.downside_collision_flag) {
                    bat.score++;
                    ball.startServe();
                }
            }

        }

        else if (ball.serverid == 1) {
            if (ball.upside_collision_flag == 1 && ball.downside_collision_flag == 0) {
                //invalid serve
                bat_far.score++;
                ball.startServe();
            }
            else if (ball.downside_collision_flag - ball.upside_collision_flag >= 2) {
                bat_far.score++;
                ball.startServe();
            }

            else if (ball.upside_collision_flag - ball.downside_collision_flag >= 1) {
                bat.score++;
                ball.startServe();
            }
        }
        else if (ball.serverid == 2) {
            if (ball.downside_collision_flag == 1 && ball.upside_collision_flag == 0) {
                //invalid serve
                bat.score++;
                ball.startServe();
            }
            else if (ball.upside_collision_flag - ball.downside_collision_flag >= 2) {
                bat.score++;
                ball.startServe();
            }
            else if (ball.downside_collision_flag - ball.upside_collision_flag >= 1) {
                bat_far.score++;
                ball.startServe();
            }
        }

    }
}