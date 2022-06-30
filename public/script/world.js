class World{
    constructor(){

    }

    drawWorld(ctx,angley,anglex){
    this.drawGround(ctx,angley,anglex);
    this.drawWallFar(ctx,angley,anglex);
    // this.drawRoof(ctx,angley,anglex);
    this.drawFloorDecoration(ctx,angley,anglex)
    }

    //draws grond floor as polygon surface
    drawGround(ctx,angley,anglex){
        this.point=new Point3D(GROUND_START_x,GROUND_START_y,GROUND_START_z)
        let b=new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y,GROUND_START_z);
        let c=new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y,GROUND_START_z+GROUND_LENGTH);
        let d=new Point3D(GROUND_START_x,GROUND_START_y,GROUND_START_z+GROUND_LENGTH);

        let ap=project(this.point,angley,anglex);
        let bp=project(b,angley,anglex);
        let cp=project(c,angley,anglex);
        let dp=project(d,angley,anglex);

        drawPolygon(ctx,'grey',"transparent",ap,bp,cp,dp);
        // drawCube(ctx,this.point,GROUND_WIDTH,1,GROUND_LENGTH);
    }
    drawRoof(ctx,angley,anglex){
        let a=new Point3D(GROUND_START_x,GROUND_START_y-WALL_HEIGHT,GROUND_START_z)
        let b=new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y-WALL_HEIGHT,GROUND_START_z);
        let c=new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y-WALL_HEIGHT,GROUND_START_z+GROUND_LENGTH);
        let d=new Point3D(GROUND_START_x,GROUND_START_y-WALL_HEIGHT,GROUND_START_z+GROUND_LENGTH);

        let ap=project(a,angley,anglex);
        let bp=project(b,angley,anglex);
        let cp=project(c,angley,anglex);
        let dp=project(d,angley,anglex);

        drawPolygon(ctx,'yellow',"black",ap,bp,cp,dp);
        // drawCube(ctx,this.point,GROUND_WIDTH,1,GROUND_LENGTH);
    }


    //draws front wall as polygon surface
    drawWallFar(ctx,angley,anglex){
        let a=new Point3D(GROUND_START_x,GROUND_START_y,GROUND_START_z+GROUND_LENGTH);
        let b=new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y,GROUND_START_z+GROUND_LENGTH);
        let c= new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y-WALL_HEIGHT,GROUND_START_z+GROUND_LENGTH);
        let d= new Point3D(GROUND_START_x,GROUND_START_y-WALL_HEIGHT,GROUND_START_z+GROUND_LENGTH);
        let ap=project(a,angley,anglex);
        let bp=project(b,angley,anglex);
        let cp=project(c,angley,anglex);
        let dp=project(d,angley,anglex);

        drawPolygon(ctx,"#71797E","black",ap,bp,cp,dp);
    }

    //draws Left wall as polygon surface
    drawWallLeft(ctx,angley,anglex){
        let a=new Point3D(GROUND_START_x,GROUND_START_y,GROUND_START_z+GROUND_LENGTH);
        let b= new Point3D(GROUND_START_x,GROUND_START_y-WALL_HEIGHT,GROUND_START_z+GROUND_LENGTH);
        let c=new Point3D(GROUND_START_x,GROUND_START_y-WALL_HEIGHT,GROUND_START_z);
        let d= new Point3D(GROUND_START_x,GROUND_START_y,GROUND_START_z);
        let ap=project(a,angley,anglex);
        let bp=project(b,angley,anglex);
        let cp=project(c,angley,anglex);
        let dp=project(d,angley,anglex);
        drawPolygon(ctx,'#315399',"black",ap,bp,cp,dp);
    }

    //draws Right wall as polygon surface
    drawWallRight(ctx,angley,anglex){
        let a=new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y,GROUND_START_z+GROUND_LENGTH);
        let b= new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y-WALL_HEIGHT,GROUND_START_z+GROUND_LENGTH);
        let c=new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y-WALL_HEIGHT,GROUND_START_z);
        let d= new Point3D(GROUND_START_x+GROUND_WIDTH,GROUND_START_y,GROUND_START_z);
        let ap=project(a,angley,anglex);
        let bp=project(b,angley,anglex);
        let cp=project(c,angley,anglex);
        let dp=project(d,angley,anglex);
        drawPolygon(ctx,"green","black",ap,bp,cp,dp);

    }
    drawFloorDecoration(ctx,angley,anglex){
        let lightWidth=0.3
        let a=new Point3D(START_BOARD_x+BOARD_WIDTH/2-lightWidth/2,GROUND_START_y-WALL_HEIGHT,START_BOARD_z+BOARD_LENGTH/2);
        drawCube(ctx,LIGHT_COLOR,"black",a,lightWidth,0.1,0.1,angley,anglex);
    }
}