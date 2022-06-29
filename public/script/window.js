class gamewindow {
    constructor(width, height,angx,angy,angy2,ang2) {
        this.width = width;
        this.height = height;

        this.angy = angy;
        this.angx = angx;
        this.angy2=angy2;
        this.angx2=angx2;

    }
    createCanvas() {


    }

    createEverything() {
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d');

        document.body.append(canvas);

        var world = new World();
        var table = new Table()

        var centre = new Point3D(0.2, STARTING_BALL_POSITION_Y, 2.09)
        var vel = new Point3D(STARTING_BALL_VELOCITY_X, STARTING_BALL_VELOCITY_Y, -0.01);
        var ball = new Ball(centre, 0.01, vel)

        var bat = new Bat();
        var bat_far = new Bat();

 

        bat.addMouseController();
        bat_far.addKeyboardController();

        this.addWASD_AsCamera()
        function play() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.translate(translateX, translateY);

            world.drawWorld(ctx, this.angy, this.angx);
            // if (this.angy < 15) {
            //     world.drawWallRight(ctx);
            // }
            // if (this.angy > -13) {
            //     world.drawWallLeft(ctx);
            // }
        
            table.drawAll(ctx, this.angy, this.angx);
            ball.drawAll(ctx, this.angy, this.angx);
        
            ball.collisionTable(bat, bat_far);
            if(freeze==0)
            {
                ball.collisionBat2(this.angy,this.angy2, bat, bat_far);
            }
            ball.collisionWorld();
            ball.updatePosition();
            // ball.dontGoOutside();
            bat.drawBat3D(ctx, this.angy, this.angx);
            bat.updateAngle(this.angy);
            bat_far.updateAngle(this.angy2);
        
            if(freeze==0){
            bat.updatePosition();
            bat_far.updatePosition();
            }
        
            let bat_farMirror = new Bat();
            bat_farMirror.new(bat_far.topLeft, bat_far.topRight, bat_far.bottomLeft, bat_far.bottomRight)
            bat_farMirror.reflection();
            bat_farMirror.drawBat3D(ctx, this.angy, this.angx);

            if(freeze==0){
                updateScore2(ball, bat, bat_far);
                }
            
                ball.serverid = serveDeterminer(bat.score, bat_far.score, ball.serverid);
                // ball.serverid =2;
            
                ctx.translate(-translateX, -translateY);
                requestAnimationFrame(play);
        }.bind(this);
        play();
    }

    addWASD_AsCamera() {
        window.addEventListener('keypress', function event(e) {

            if (e.code == 'KeyA') {
                if (this.angy < RESTRICTION_ANGLE_Y) {
                    this.angy += increment;
                }
            }
            if (e.code == 'KeyD') {

                if (this.angy > - RESTRICTION_ANGLE_Y) {
                    this.angy -= increment;
                }
            }
            if (e.code == 'KeyW') {

                if (this.angx > 0) {
                    this.angx -= increment;
                }

            } if (e.code == 'KeyS') {
                // viewpointY+=5;
                if (this.angx < RESTRICTION_ANGLE_X) {
                    this.angx += increment;
                }
            }


        });
    }


    addIJKL_asCamera() {
        window.addEventListener('keypress', function event(e) {
            if (e.code == 'KeyL') {
                if (this.angy2 < RESTRICTION_ANGLE_Y) {
                    this.angy2 += increment;
                }
            }

            if (e.code == 'KeyJ') {
                if (this.angy2 > - RESTRICTION_ANGLE_Y) {
                    this.angy2 -= increment;
                }
            }

            if (e.code == 'KeyI') {
                if (this.angx2 > 0) {
                    this.angx2 -= increment;
                }

            } if (e.code == 'KeyK') {
                if (this.angx2 < RESTRICTION_ANGLE_X) {
                    this.angx2 += increment;
                }
            }
        });
    }
}




class Scoreboard {
    constructor() {

    }
    create() {

    }
}