class Table{
    constructor(){
    this.bPoint=new Point3D(START_BOARD_x,START_BOARD_y,START_BOARD_z)
    this.llPoint=new Point3D(START_LEG_x,START_LEG_y,START_LEG_z)
    this.lrPoint=new Point3D(START_LEG_xr,START_LEG_y,START_LEG_z)
    this.nPoint=new Point3D(START_NET_x,START_NET_y,START_NET_z)
    // this.drawLegs();
    // this.drawTable();
    // this.drawNet();
    }

    drawAll(ctx,angley,anglex){

    this.drawLegs(ctx,angley,anglex)
    this.drawTable(ctx,angley,anglex)
    this.drawMidline(ctx,angley,anglex)
    }

    //draws actual table as cube
    drawTable(ctx,angley,anglex){
        drawCube(ctx,TABLE_COLOR,"white",this.bPoint,BOARD_WIDTH,BOARD_HEIGHT,BOARD_LENGTH,angley,anglex)
    }

    //draws white midline as polygon surface
    drawMidline(ctx,angley,anglex){
        let a=new Point3D(START_BOARD_x+(BOARD_WIDTH/2)-(MID_LINE_WIDTH/2),START_BOARD_y,START_BOARD_z+BOARD_LENGTH)
        let b=new Point3D(START_BOARD_x+(BOARD_WIDTH/2)+(MID_LINE_WIDTH/2),START_BOARD_y,START_BOARD_z+BOARD_LENGTH)
        let c=new Point3D(START_BOARD_x+(BOARD_WIDTH/2)+(MID_LINE_WIDTH/2),START_BOARD_y,START_BOARD_z)
        let d=new Point3D(START_BOARD_x+(BOARD_WIDTH/2)-(MID_LINE_WIDTH/2),START_BOARD_y,START_BOARD_z)
        let ap=project(a,angley,anglex);
        let bp=project(b,angley,anglex);
        let cp=project(c,angley,anglex);
        let dp=project(d,angley,anglex);
        drawPolygon(ctx,'rgba(255, 255, 255, 1)',"black",ap,bp,cp,dp);
    }

    //draws legs as cube
    drawLegs(ctx,angley,anglex){
        let a=new Point3D(START_LEG_x,START_LEG_y,START_LEG_z)
        // let b
        drawCube(ctx,LEG_COLOR,"black",a,LEG_WIDTH,LEG_HEIGHT,LEG_LENGTH,angley,anglex);
    }

    //draws net as polygon surface filled with netpattern image
    drawNet(ctx,angley,anglex){
        let topLeft=new Point3D(this.nPoint.x,this.nPoint.y,this.nPoint.z);
        let topRight=new Point3D(this.nPoint.x+NET_WIDHT,this.nPoint.y,this.nPoint.z);
        let bottomRight=new Point3D(this.nPoint.x+NET_WIDHT,this.nPoint.y+NET_HEIGHT,this.nPoint.z);
        let bottomLeft=new Point3D(this.nPoint.x,this.nPoint.y+NET_HEIGHT,this.nPoint.z);

        let a_proj=project(topLeft,angley,anglex);
        let b_proj=project(topRight,angley,anglex);
        let c_proj=project(bottomRight,angley,anglex);
        let d_proj=project(bottomLeft,angley,anglex);
        drawPolygon(ctx,netpattern,"white",a_proj,b_proj,c_proj,d_proj);
    }
}