



/**
 * 
 * @param {*} point This is the 3D point to be projected.
 * @param {*} angley Rotation in y axis
 * @param {*} anglex Rotation in x acis
 * @returns "Point" object, which is 2D projection of 3D coordinate
 */
function project(point,angley,anglex)
{
    //translate "table midpoint" to "origin"
    let dest=new Point3D(-(START_BOARD_x+BOARD_WIDTH/2),-START_BOARD_y,-(START_BOARD_z+BOARD_LENGTH/2))
    let temp=translate(point,dest)

    //rotate by desired angle
    let roty=rotateY(temp,angley);
    let rot=rotateX(roty,anglex);

    //translate world by "START_ZPLANE"
    let destmid=new Point3D(0,0,START_ZPLANE)
    let tempmid=translate(rot,destmid)
    point=Object.assign(tempmid);

    //finally project
    let proj=new Point3D(0,0,0)
    proj.x=(aspect*f*point.x)/point.z;
    proj.y=(f*point.y)/point.z;

    //retranslate "origin" back to "table midpoint"
    let dest1=new Point3D((START_BOARD_x+BOARD_WIDTH/2),START_BOARD_y,(START_BOARD_z+BOARD_LENGTH/2))
    let temp1=translate(proj,dest1)

    //since world coordinate system is unit system, scale it back to viewport
    temp1.x*=CANVAS_WIDTH/WIDTH_SCALE_FOR_PROJECTION
    temp1.y*=CANVAS_HEIGHT/HEIGHT_SCALE_FOR_PROJECTION

    return temp1;
}


/**
 * 
 * @param {*} point 3D point to be translated
 * @param {*} dest 3D destination point 
 * @returns 
 */
function translate(point,dest){
    let temp=new Point3D(0,0,0)
    temp.x=point.x+dest.x
    temp.y=point.y+dest.y
    temp.z=point.z+dest.z
    return temp;

}

function translateByReference(temp,dest){
    temp.x=temp.x+dest.x
    temp.y=temp.y+dest.y
    temp.z=temp.z+dest.z
}


/**
 * 
 * @param {*} point 3D point to be rotated around y-axis
 * @param {*} ang angle around y axis
 * @returns 3D point after rotation
 */
function rotateY(point,ang){
    let temp=new Point3D()
    temp.x=point.z*Math.sin(ang*Math.PI/180)+point.x*Math.cos(ang*Math.PI/180)
    temp.y=point.y;
    temp.z=point.z*Math.cos(ang*Math.PI/180)-point.x*Math.sin(ang*Math.PI/180)
    return temp;
}

/**
 * 
 * @param {*} point 3D point to be rotated around x-axis
 * @param {*} ang angle around x axis
 * @returns 3D point after rotation
 */
function rotateX(point,ang){
    let temp=new Point3D()
    temp.x=point.x;
    temp.y=point.y*Math.cos(ang*Math.PI/180)-point.z*Math.sin(ang*Math.PI/180)
    temp.z=point.y*Math.sin(ang*Math.PI/180)+point.z*Math.cos(ang*Math.PI/180)
    return temp;
}