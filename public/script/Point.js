
//2d point 
class Point{
    constructor(x=0,y=0){
        this.x=x;
        this.y=y;
    }
    show(){
        console.log(this.x,this.y)
    }
}


//3d point
class Point3D{
    constructor(x=0,y=0,z=0){
        this.x=x;
        this.y=y;
        this.z=z;
    }
    show(){
        console.log(this.x,this.y,this.z)
    }
}

//3d plane equation
class Plane3D{
    constructor(x,y,z,c){
        this.x=x;
        this.y=y;
        this.z=z;
        this.c=c;
    }
    show(){
        console.log(this.x,this.y,this.z,this.c)
    }
}

