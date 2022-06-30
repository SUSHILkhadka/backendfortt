// import {pattern} from "./game.js";

/**
 * 
 * @param {*} value number which is to be converted to as string with "px" added
 * @returns string with px added to number
 */

function toPx(value){
    return `${value}px`
}

/**
 * 
 * @param {*} p1 3D point first
 * @param {*} p2 3D point second
 * @returns shortest distance between p1 and p2
 */
function distance(p1,p2){
    return (Math.sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y)+(p2.z-p1.z)*(p2.z-p1.z)))
}

/**
 * 
 * @param {*} p1 2D point first
 * @param {*} p2 2D point second
 * @returns shortest distance between p1 and p2
 */
function distance2D(p1,p2){
    return (Math.sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y)))
}





// var viewPoint = new Point3D(700, -2000, 10);
// var viewPlane = new Plane3D(0, 0, 1, 20);

/**
 * 
 * @param {*} obj1 3D point first
 * @param {*} obj2 3D point second
 * @returns "direction vector" from first to second as 3D point object.
 */
function getDirectionVector(obj1, obj2) {
    let a = new Point3D(0, 0, 0);
    a.x = obj2.x - obj1.x;
    a.y = obj2.y - obj1.y;
    a.z = obj2.z - obj1.z;
    return a;
}


/**
 * 
 * @param {*} n normal vector as 3D point
 * @param {*} point 3D point
 * @returns 3D plane object with surface vector as "n" and "point" as a point on that plane
 */
function getPlane(n, point) {
    let a = new Plane3D(0, 0, 0);
    a.x = n.x;
    a.y = n.y;
    a.z = n.z;
    a.c = n.x * point.x + n.y * point.y + n.z * point.z;
    return a;
}

/**
 * 
 * @param {*} point1 3D coordinate point
 * @param {*} point2 3D view point
 * @param {*} plane plane of view
 * @returns 3D point that direction vector from "point1" to "point2" would intersect viewplane given by "plane"
 */
function getPointOnPlane(point1, point2 = viewPoint, plane = viewPlane) {

    let dir = getDirectionVector(point1, point2);
    let t_numerator = (plane.c - (plane.x * point1.x + plane.y * point1.y + plane.z * point1.z));
    let t_denomenator = (plane.x * dir.x + plane.y * dir.y + plane.z * dir.z);
    let t = t_numerator / t_denomenator;

    let a = new Point3D(0, 0, 0);
    a.x = Math.round(point1.x + dir.x * t);
    a.y = Math.round(point1.y + dir.y * t);
    a.z = point1.z + dir.z * t;
    return a;
}


/**
 * 
 * @param {*} ctx canvas context
 * @param {*} color color to fill that polygon
 * @param  {...any} obj array of points that make up polygon
 */
function drawPolygon(ctx, color,strokecolor, ...obj) {
    ctx.beginPath();
    obj.forEach((value, index) => {
        if (index == 0) {
            ctx.moveTo(value.x, value.y);
        }
        else {
            ctx.lineTo(value.x, value.y);
        }
    });
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle=strokecolor;
    ctx.stroke();
}



function drawPolygonImage(ctx, color, ...obj) {

};


/**
 * 
 * @param {*} ctx canvas context
 * @param {*} centre 3D centre point 
 * @param {*} rad radius of circle
 */
function drawCircle(ctx, centre, rad) {
    ctx.beginPath();

    if(rad<0)
    {
        rad=0;
    }
    ctx.arc(centre.x, centre.y, rad, 0, 2 * Math.PI);
    ctx.fillStyle=BALL_COLOR[1]

    ballcolor= localStorage.getItem('ballcolor_TableTennis') ? localStorage.getItem('ballcolor_TableTennis') : BALL_COLOR[1];
    ctx.fillStyle=ballcolor
    ctx.fill();
    ctx.lineWidth=1
    ctx.strokeStyle=BALL_STROKE_COLOR[0];
    ctx.strokeStyle='black';
    ctx.stroke();
}


function shadowCircle(ctx, centre2D, rad) {

    ctx.beginPath();
    ctx.arc(centre2D.x, centre2D.y, rad, 0, 2 * Math.PI);
    ctx.fillStyle = SHADOW_COLOR[0]
    ctx.fill();
    // ctx.stroke();
}



/**
 * 
 * @param {*} ctx canvas context
 * @param {*} point 3D coordinate of Top left corner of cube
 * @param {*} width 
 * @param {*} height 
 * @param {*} length 
 */
function drawCube(ctx,array,strokecolor, point, width, height, length,angley,anglex) {
    //get 8 point coordinates
    let pointa = Object.assign(point);

    let pointb = new Point3D(pointa.x + width, pointa.y, pointa.z)
    let pointc = new Point3D(pointa.x + width, pointa.y + height, pointa.z)
    let pointd = new Point3D(pointa.x, pointa.y + height, pointa.z)

    let pointa_be = new Point3D(pointa.x, pointb.y, pointc.z + length);
    let pointb_be = new Point3D(pointa.x + width, pointa.y, pointa.z + length)
    let pointc_be = new Point3D(pointa.x + width, pointa.y + height, pointa.z + length)
    let pointd_be = new Point3D(pointa.x, pointa.y + height, pointa.z + length)

    pointa = project(pointa,angley,anglex);
    pointb = project(pointb,angley,anglex);
    pointc = project(pointc,angley,anglex);
    pointd = project(pointd,angley,anglex);

    pointa_be = project(pointa_be,angley,anglex);
    pointb_be = project(pointb_be,angley,anglex);
    pointc_be = project(pointc_be,angley,anglex);
    pointd_be = project(pointd_be,angley,anglex);

    //draw 6 faces
    drawPolygon(ctx, array[0],strokecolor, pointa_be, pointb_be, pointc_be, pointd_be)
    drawPolygon(ctx, array[1],strokecolor, pointa, pointd, pointd_be, pointa_be)
    drawPolygon(ctx, array[1],strokecolor, pointb, pointc, pointc_be, pointb_be)
    drawPolygon(ctx, array[4],strokecolor, pointa, pointb, pointc, pointd)
    tablecolor= localStorage.getItem('tablecolor_TableTennis') ? localStorage.getItem('tablecolor_TableTennis') : TABLE_COLOR[3];
    drawPolygon(ctx, tablecolor,strokecolor, pointa, pointb, pointb_be, pointa_be);
}

/**
 * 
 * @param {*} firstscore score of first player
 * @param {*} secondscore score of second player
 * @param {*} currentid which player is serving right now
 * @returns which player should be serving right now.
 */

function serveDeterminer(firstscore,secondscore,currentid,changeServeOn){
    if(Math.floor((firstscore+secondscore)/changeServeOn)%2==0){
        return 1;
    }
    else {return 2} ;
}
