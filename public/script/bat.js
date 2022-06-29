class Bat {
    constructor() {
        this.x = START_BOARD_x;
        this.y = START_BOARD_y;
        this.point3D = new Point3D();
        this.tilt_angle = 20;

        this.topLeft = new Point(0.1706666666666667, -0.1, 1);
        this.topRight = 0;
        this.bottomRight = 0;
        this.bottomLeft = 0;

        //score update
        this.score = 0;
        this.collision_flag = 0;

        //for controllers
        //mouse
        this.timestamp = 0;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.speedX = 0;
        this.speedY = 0;
        //keyboard
        this.keyboardClientX = 600;
        this.keyboardClientY = 300;
    }



    //draws as per accurate cursor position
    // drawBat(ctx) {
    //     let topLeft1 = new Point3D(this.x, this.y, this.z);
    //     let topRight1 = new Point3D(this.x + BAT_WIDTH_2d, this.y, this.z);
    //     let bottomRight1 = new Point3D(this.x + BAT_WIDTH_2d, this.y + BAT_HEIGHT_2d, this.z);
    //     let bottomLeft1 = new Point3D(this.x, this.y + BAT_HEIGHT_2d, this.z);
    //     let a_proj = project(topLeft1);
    //     let b_proj = project(topRight1);
    //     let c_proj = project(bottomRight1);
    //     let d_proj = project(bottomLeft1);
    //     // drawPolygon(ctx,'white',a_proj,b_proj,c_proj,d_proj);
    //     drawPolygon(ctx, 'white', topLeft1, topRight1, bottomRight1, bottomLeft1);
    // }



    //draws bat as mouse in (x,y) is projected to (x,z) for 3D.
    drawBat3D(ctx, angley, anglex) {
        let a_proj = project(this.topLeft, angley, anglex);
        let b_proj = project(this.topRight, angley, anglex);
        let c_proj = project(this.bottomRight, angley, anglex);
        let d_proj = project(this.bottomLeft, angley, anglex);


        if(this.topLeft.z<(START_BOARD_z+BOARD_LENGTH/2)){
        ctx.drawImage(batimage, a_proj.x, a_proj.y, BAT_WIDTH_2d /(this.topLeft.z*START_ZPLANE*WIDTH_SCALE_FOR_PROJECTION), BAT_HEIGHT_2d /(this.topLeft.z*START_ZPLANE*HEIGHT_SCALE_FOR_PROJECTION));
        }
        else{
        ctx.drawImage(batimage, b_proj.x, b_proj.y, BAT_WIDTH_2d /(1.2*this.topLeft.z*START_ZPLANE*WIDTH_SCALE_FOR_PROJECTION), BAT_HEIGHT_2d /(1.2*this.topLeft.z*START_ZPLANE*HEIGHT_SCALE_FOR_PROJECTION));

        }

        // drawPolygon(ctx, 'rgba(15, 11, 13, 0.4)', "black",a_proj, b_proj, c_proj, d_proj);
    }


    new(a, b, c, d) {
        this.topLeft = Object.create(a);
        this.topRight = Object.create(b);
        this.bottomLeft = Object.create(c);
        this.bottomRight = Object.create(d);
    }

    addMouseController() {
        window.addEventListener('mousemove', function event(e) {
            if (this.timestamp === null) {
                this.timestamp = Date.now();
                this.lastMouseX = e.screenX;
                this.lastMouseY = e.screenY;
                return;
            }
            var now = Date.now();
            var dt = now - this.timestamp;
            var dx = e.screenX - this.lastMouseX;
            var dy = e.screenY - this.lastMouseY;
            this.speedX = Math.round(dx / dt * 100);
            this.speedY = Math.round(dy / dt * 100);

            this.timestamp = now;
            this.lastMouseX = e.screenX;
            this.lastMouseY = e.screenY;
            this.updatePosition(e.clientX - translateX, e.clientY);

        }.bind(this));

    }
    addKeyboardController() {
        window.addEventListener('keydown', function event(e) {
            if (e.key == 'ArrowUp') {
                this.keyboardClientY -= KeyboardMovement

            }
            if (e.key == 'ArrowDown') {
                this.keyboardClientY += KeyboardMovement

            }
            if (e.code == 'ArrowLeft') {
                this.keyboardClientX -= KeyboardMovement

            }
            if (e.code == 'ArrowRight') {
                this.keyboardClientX += KeyboardMovement

            }
            this.updatePosition(this.keyboardClientX - translateX, this.keyboardClientY);
        }.bind(this));

    }
    //update position of bat in 3D coordinate system as per mouse movement or keyboard event.
    updatePosition(x = nomouse, y = nomouse, tilt_angle = 0) {
        if (x == nomouse && y == nomouse) {
        }
        else {
            this.x = x;
            this.y = y;

            // this.point3D.z = ((this.y) * (-(START_BOARD_z + BOARD_LENGTH) + 0.5) / (CANVAS_WIDTH - 0)) + 1.6;
            this.point3D.z = ((this.y) * (-(START_BOARD_z + BOARD_LENGTH) + 0.5) / (CANVAS_WIDTH - 0)) + (START_BOARD_z+BOARD_LENGTH/2);

            if (this.point3D.z > (START_BOARD_z + BOARD_LENGTH / 2)) {
                this.point3D.z = START_BOARD_z + BOARD_LENGTH / 2
            }
            this.point3D.x = ((this.x) * (1.6) / (CANVAS_WIDTH - 0)) + 0;
            this.point3D.y = -NET_HEIGHT * 2.5;
        }
    }

    //rotating bat as per angle in yaxis
    updateAngle(angley) {
        this.topLeft = new Point3D(this.point3D.x, this.point3D.y, this.point3D.z);
        this.topRight = new Point3D(this.point3D.x + BAT_WIDTH, this.point3D.y, this.point3D.z);
        this.bottomRight = new Point3D(this.point3D.x + BAT_WIDTH, this.point3D.y + BAT_HEIGHT, this.point3D.z);
        this.bottomLeft = new Point3D(this.point3D.x, this.point3D.y + BAT_HEIGHT, this.point3D.z);

        let dest = new Point3D(-0.15, 0, -1.3)
        let temp1 = translate(this.topLeft, dest)
        let temp2 = translate(this.topRight, dest)
        let temp3 = translate(this.bottomRight, dest)
        let temp4 = translate(this.bottomLeft, dest)

        let roty1 = rotateY(temp1, -1 * angley);
        let roty2 = rotateY(temp2, -1 * angley);
        let roty3 = rotateY(temp3, -1 * angley);
        let roty4 = rotateY(temp4, -1 * angley);

        let dest1 = new Point3D(0.15, 0, +1.3)

        let temp11 = translate(roty1, dest1)
        let temp21 = translate(roty2, dest1)
        let temp31 = translate(roty3, dest1)
        let temp41 = translate(roty4, dest1)

        this.topLeft = temp11;
        this.topRight = temp21;
        this.bottomRight = temp31;
        this.bottomLeft = temp41;
    }

    //reflection is for multiplayer mode.
    reflection() {
        //first translate world to allign such that point of reflection align with z plane
        let dest = new Point3D(-START_BOARD_x - (BOARD_WIDTH / 2), -START_BOARD_y, -(START_BOARD_z + (BOARD_LENGTH / 2)));
        translateByReference(this.topLeft, dest);
        translateByReference(this.topRight, dest);
        translateByReference(this.bottomLeft, dest);
        translateByReference(this.bottomRight, dest);

        //then reflect about xy plane
        this.topLeft.z = -this.topLeft.z
        this.topRight.z = -this.topRight.z
        this.bottomLeft.z = -this.bottomLeft.z
        this.bottomRight.z = -this.bottomRight.z

        this.topLeft.x = -this.topLeft.x
        this.topRight.x = -this.topRight.x
        this.bottomLeft.x = -this.bottomLeft.x
        this.bottomRight.x = -this.bottomRight.x

        //then undo translation
        let dest1 = new Point3D(START_BOARD_x + (BOARD_WIDTH / 2), START_BOARD_y, START_BOARD_z + (BOARD_LENGTH / 2));
        translateByReference(this.topLeft, dest1);
        translateByReference(this.topRight, dest1);
        translateByReference(this.bottomLeft, dest1);
        translateByReference(this.bottomRight, dest1);
    }

    //for copying bat by value
    copy(anotherbat) {
        this.topLeft = anotherbat.topLeft;
        this.topRight = anotherbat.topRight;
        this.bottomLeft = anotherbat.bottomLeft;
        this.bottomRight = anotherbat.bottomRight;

    }
    //for bot tracking ball in x axis
    trackBall(ball) {
        this.point3D.x =(START_BOARD_x+BOARD_WIDTH) -(ball.centre.x + BAT_WIDTH / 2);
        this.point3D.y=STARTING_BALL_POSITION_Y;

    }
    //for bot maintaining distance in z axis
    adjustRange(ball) {
        if(ball.centre.z<START_BOARD_z+BOARD_LENGTH/2){
        this.point3D.z = START_BOARD_z-0.1;
        }
        if(ball.centre.z>START_BOARD_z+BOARD_LENGTH/2){
        this.point3D.z +=0.1/60



        }
    }
}
