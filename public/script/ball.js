class Ball {

    /**
     * 
     * @param {*} centre 3D centre point of ball
     * @param {*} rad radius of ball
     * @param {*} velocity velocity vector as 3D Point object
     * 2 flags for score update
     */
    constructor(centre, rad, velocity) {
        this.centre = centre;
        this.rad = rad;
        this.velocity = velocity;

        this.outOfBoard=0;
        this.upside_collision_flag = 0;
        this.downside_collision_flag = 0;
        this.lastCollidedBat=0;

        //serve flag for disableing updateposition on ball
        this.serveflag = 1;
        //id for where to position ball for serve
        this.serverid = 1;
    }

    drawAll(ctx, angley, anglex) {
        this.drawShadow(ctx, angley, anglex)
        this.drawBall(ctx, angley, anglex)
    }


    //copying ball object by value.
    new(centre, rad, velocity, upsideflag, downsideflag, serveflag,lastCollidedBat) {
        this.centre = Object.create(centre);
        this.rad = rad;
        this.velocity = Object.create(velocity)
        
        this.upside_collision_flag = upsideflag;
        this.downside_collision_flag = downsideflag;
        this.serveflag = serveflag;
        this.lastCollidedBat = lastCollidedBat;

    }

    //updates position of ball based on velocity vector and gravity.
    //timescale for testing purpose
    updatePosition() {

        if (this.serveflag == 0) {
            this.velocity.y += GRAVITY*timeScale
            this.centre.x += this.velocity.x * timeScale
            this.centre.y += this.velocity.y * timeScale
            this.centre.z += this.velocity.z * timeScale
        }

        else {
            if (this.serverid == 1) {
                this.serveDown();
                // this.server=0;

            }
            if (this.serverid == 2) {
                this.serveUp(); 
                // this.serve=0;
            }
        }
    }
    serveDown() {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.velocity.z = 0;
        this.centre.x = SERVEDOWN_X;
        this.centre.y = SERVEDOWN_y;
        this.centre.z = SERVEDOWN_z;
    }

    serveUp() {
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.velocity.z = 0;
        this.centre.x = SERVEUP_X;
        this.centre.y = SERVEUP_y;
        this.centre.z = SERVEUP_z;

    }
    startServe(){
            freeze=1;
            refreesound.play();
            setTimeout(function(){
            this.serveflag=1;
            this.upside_collision_flag=0;
            this.downside_collision_flag=0;
            this.outOfBoard=0;
                freeze=0;
            }.bind(this),3000);

    }


    //draws ball as circle
    drawBall(ctx, angley, anglex) {
        let c = project(this.centre, angley, anglex)
        let guessRadius = BALL_RADIUS_2D;
        guessRadius /= ballradiusfactor * (this.centre.z - 1 + START_ZPLANE);
        //draw circle
        drawCircle(ctx, c, guessRadius);
    }

    //draws shadow as circle
    drawShadow(ctx, angley, anglex) {
        let temp = new Point3D(this.centre.x, START_BOARD_y, this.centre.z);
        if(this.centre.x<START_BOARD_x || this.centre.x>START_BOARD_x+BOARD_WIDTH || this.centre.z<START_BOARD_z|| this.centre.z>START_BOARD_z+BOARD_LENGTH ){
            temp.y=GROUND_START_y;
        }

        let centre2D = project(temp, angley, anglex);

        let radiusShadow = this.rad * (-this.centre.y) * shadowradiusfactor/(this.centre.z - 1 + START_ZPLANE);
        if(this.centre.x<START_BOARD_x || this.centre.x>START_BOARD_x+BOARD_WIDTH || this.centre.z<START_BOARD_z|| this.centre.z>START_BOARD_z+BOARD_LENGTH ){
            radiusShadow=this.rad * (-this.centre.y+GROUND_START_y) * 0.4*shadowradiusfactor/(this.centre.z - 1 + START_ZPLANE)
            if(this.centre.z<START_BOARD_z+BOARD_LENGTH+0.8){
                radiusShadow=0;
            }
        }

        if (radiusShadow < 0) {
            radiusShadow = 0
        }
        shadowCircle(ctx, centre2D, radiusShadow)
    }

    //Detects collision between ball and table.
collisionTable( ) {

        //collision detected if ball is with in "x range of table" and "z range of table" and "y value of ball is greater than y value of table when radius compensated"
        if (this.centre.x >= START_BOARD_x && this.centre.x < START_BOARD_x + BOARD_WIDTH && this.centre.z >= START_BOARD_z && this.centre.z < START_BOARD_z + BOARD_LENGTH) {
            if (START_BOARD_y - this.centre.y <= this.rad) {


                //this is for determining which side up or down side ball collide to for updating score
                //upside
                if (this.centre.z > (START_BOARD_z + BOARD_LENGTH / 2)) {
                    this.upside_collision_flag++;
                    // this.downside_collision_flag = 0;
                }
                //downside
                if (this.centre.z < (START_BOARD_z + BOARD_LENGTH / 2)) {
                    this.downside_collision_flag++;
                    // this.upside_collision_flag = 0;

                }


                //after collision reverse velocity vector adding some loss
                this.velocity.y = -Math.abs(this.velocity.y) + LOSS_TABLE;
                bounche.play();//play sound
                if (this.centre.y > START_BOARD_y) {
                    this.respawn();
                }
            }
        }
    }


    //this function is used to testing. This bounds ball within table. Used to fine tuning collision response.

    dontGoOutside() {
        if (this.centre.z > START_BOARD_z + BOARD_LENGTH) {
            // console.log('wallhit')
            this.velocity.z = -Math.abs(this.velocity.z);
            // this.velocity.z = -0.03;
            wallsound.play();

            //add power by adding -LOSS
            // this.velocity.y = STABLE_Y_VELOCITY;
        }

        if (this.centre.z < START_BOARD_z) {
            // console.log('wallhit')
            wallsound.play();
            this.velocity.z = Math.abs(this.velocity.z);
            //add power by adding -LOSS
        }

        if (this.centre.x < START_BOARD_x) {
            // console.log('wallhit')
            this.velocity.x = Math.abs(this.velocity.x);
            //add power by adding -LOSS
        }

        if (this.centre.x > START_BOARD_x + BOARD_WIDTH) {
            // console.log('wallhit')
            this.velocity.x = -Math.abs(this.velocity.x);
            //add power by adding -LOSS
        }
    }


    //detects collision with world
    collisionWorld() {
        if (GROUND_START_y - this.centre.y <= this.rad) {
            this.velocity.y = -Math.abs(this.velocity.y) + LOSS_GROUND;
            this.outOfBoard=1;
            wallsound.play();
            // this.respawn();
        }

        if ((GROUND_START_y - WALL_HEIGHT) > this.centre.y) {
            this.velocity.y = Math.abs(this.velocity.y);
            this.outOfBoard=1;
            wallsound.play();


        }

        if ((GROUND_START_z + GROUND_LENGTH) <= this.centre.z) {
            this.velocity.z = -this.velocity.z;
            this.outOfBoard=1;
            wallsound.play();
        }
        if ((GROUND_START_x + GROUND_WIDTH) <= this.centre.x) {
            this.velocity.x = -this.velocity.x;
            this.outOfBoard=1;
            wallsound.play();


        }
        if ((GROUND_START_x) >= this.centre.x) {
            this.velocity.x = -this.velocity.x;
            this.outOfBoard=1;
            wallsound.play();
        }
    }

    //ball respawn logic
    respawn() {
        if (this.centre.y > START_BOARD_y) {
            this.centre.y = 0;
        }
    }


    // Mathematical collision detection of bat and ball.

    // collisionBat(bat, speedx = 0, speedy = 0, bat_far) {
    //     if (ball.centre.x >= bat.topLeft.x - this.rad && ball.centre.x <= bat.topRight.x + this.rad) {
    //         let dx = ((bat.topRight.x - ball.centre.x) - (bat.topLeft.x - ball.centre.x));
    //         let dz = ((bat.topRight.z - ball.centre.z) - (bat.topLeft.z - ball.centre.z));
    //         let dr = Math.sqrt(dx * dx + dz * dz);
    //         let D = (bat.topLeft.x - ball.centre.x) * (bat.topRight.z - ball.centre.z) - (bat.topRight.x - ball.centre.x) * (bat.topRight.z - ball.centre.z);
    //         let delta = (this.rad * this.rad * dr * dr) - (D * D);

    //         if (delta >= 0) {
    //             bat.collision_flag++;
    //             bat_far.collision_flag = 0;

    //             this.velocity.x += -RESPONSE_SCALE_ZtoX * Math.tan(rotation_angle * Math.PI / 180) * Math.abs(this.velocity.z);
    //             this.velocity.z = -this.velocity.z - RESPONSE_SCALE_Z * speedy;
    //             // this.velocity.y -= RESPONSE_SCALE_Y*speedy;
    //             this.velocity.x += RESPONSE_SCALE_X * speedx;
    //             this.velocity.y = STABLE_Y_VELOCITY;
    //         }
    //     }
    // }


    // Simulated collision between bat and ball with bat having increased thickness

    collisionBat2(angley,angley2, bat, bat_far, near = true) {
        let a = rotateY(this.centre, angley);
        let b = rotateY(bat.topLeft, angley);
        let c = rotateY(bat.topRight, angley);

        //downside bat
        if (b.x <= a.x && c.x >= a.x) {
            if (near == true) {

                if (((b.z - a.z) >= 0) && ((b.z - a.z) < BAT_LENGTHINZAXIS_FOR_SHOT)) {
                    let extendCollisionDelayForServer = this.serveflag;
                    if (soundflag == 1) {
                        //play sound
                        batsound.play();
                        soundflag = 0;

                        //collision response
                        this.centre.y = SHOT_POSITION_Y;
                        this.velocity.y = STABLE_Y_VELOCITY;

                        this.velocity.x+=-angley*0.001*Math.abs(this.velocity.z);
                        this.velocity.x += RESPONSE_SCALE_X * bat.speedX;

                        this.velocity.z = Math.abs(this.velocity.z) * 0.8 - RESPONSE_SCALE_Z * bat.speedY - 0.001;
                        if (this.serveflag != 0) {
                            this.velocity.z = 0.025 //this is good one
                            this.serveflag = 0;

                        }
                        this.lastCollidedBat=1;
                    }
                    //for rejecting multiple collision detection under limit
                    setTimeout(function () {
                        soundflag = 1;

                    }, COLLISION_DETECTION_LIMIT  + extendCollisionDelayForServer * 100)
                }
            }
            //upside bat
            else {
                if (a.z <= b.z && (b.z - a.z) < BAT_LENGTHINZAXIS_FOR_SHOT) {
                    if (soundflag == 1) {
                        batsound2.play();
                        soundflag = 0;

                        this.centre.y = SHOT_POSITION_Y
                        this.velocity.y = STABLE_Y_VELOCITY;

                        this.velocity.x+=angley2*0.001*Math.abs(this.velocity.z);
                        this.velocity.x += RESPONSE_SCALE_X * bat.speedX;

                        this.velocity.z = -Math.abs(this.velocity.z) - RESPONSE_SCALE_Z * bat.speedY;
                        this.velocity.x += RESPONSE_SCALE_X * bat.speedX;
                        if (this.serveflag != 0) {
                            this.velocity.z = -0.03
                            this.serveflag = 0;
                        }
                        else {
                            this.velocity.z = -0.08
                        }
                        this.lastCollidedBat=2;
                        // this.velocity.z=-0.1
                    }
                    setTimeout(function () {
                        soundflag = 1;

                    }, COLLISION_DETECTION_LIMIT)
                }
            }
        }
    }
    //reflects ball about midpoint of table. Used for multiplayer mode
    reflection() {
        //first translate world to allign such that point of reflection align with z plane
        let dest = new Point3D(-START_BOARD_x - (BOARD_WIDTH / 2), -START_BOARD_y, -(START_BOARD_z + (BOARD_LENGTH / 2)));
        translateByReference(this.centre, dest);

        //then reflect about xy plane
        this.centre.z = -this.centre.z
        this.centre.x = -this.centre.x;

        //then undo translation
        let dest1 = new Point3D(START_BOARD_x + (BOARD_WIDTH / 2), START_BOARD_y, START_BOARD_z + (BOARD_LENGTH / 2));
        translateByReference(this.centre, dest1);
    }

}