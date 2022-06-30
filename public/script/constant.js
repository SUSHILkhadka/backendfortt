const CANVAS_WIDTH=1400;
const CANVAS_HEIGHT=650;

//projection constants
const degrees=90
const aspect=1
const zfar=10
const znear=1
const q=zfar/(zfar-znear);
const f=1/Math.tan((degrees/2) * Math.PI / 180) 

const translateX=550;
const translateY=150;    
const nomouse=9000;

//camera capped at in degree with Y , X and near and far distance capped by min and max.
const RESTRICTION_START_ZPLANE_min= 1
const RESTRICTION_START_ZPLANE_max= 4
const RESTRICTION_ANGLE_Y= 50

const RESTRICTION_ANGLE_X= 55



//camera 
const KeyboardMovement=10;
const increment=0.5
const incrementDistance=0.02

//world and wall constants
const GROUND_START_x=-1.4
const GROUND_START_y=0.29
const GROUND_START_z=1

const GROUND_WIDTH=3
const GROUND_LENGTH=5
const WALL_HEIGHT=1.2;

//actual table constants
const BOARD_WIDTH=0.4
const BOARD_HEIGHT=0.02
const BOARD_LENGTH=1.5

const START_BOARD_x=0;
const START_BOARD_y=0;
const START_BOARD_z=1 ;

//far width=0, right=1,left=1,near width=4,top=3
const TABLE_COLOR=["rgba(31, 199, 31, 01)","rgb(0, 0, 102)","rgba(124, 69, 73, 0.8)","#0000FF",'black']

const LEG_COLOR=["rgba(31, 199, 31, 01)","rgb(153, 51, 0)","rgba(124, 69, 73, 0.8)","rgb(153, 51, 0)",'rgb(153, 51, 0)']

// const LIGHT_COLOR=["rgba(31, 199, 31, 01)","rgb(0, 0, 102)","rgba(124, 69, 73, 0.8)","white",'black']
const LIGHT_COLOR=["white","white","white","white","white","white","white"]
//leg
const LEG_WIDTH_OFFSET=0.08
const LEG_HEIGHT=GROUND_START_y-(START_BOARD_y+BOARD_HEIGHT)
const LEG_LENGTH_OFFSET=0.3;

const START_LEG_x=START_BOARD_x+LEG_WIDTH_OFFSET
const START_LEG_y=START_BOARD_y+BOARD_HEIGHT
const START_LEG_z=START_BOARD_z+LEG_LENGTH_OFFSET

const LEG_WIDTH=BOARD_WIDTH-2*LEG_WIDTH_OFFSET;
const LEG_LENGTH=BOARD_LENGTH-2*LEG_LENGTH_OFFSET;

//net
const MID_LINE_WIDTH=0.01

const NET_WIDHT=BOARD_WIDTH+0.05
const NET_HEIGHT=0.06
// const NET_HEIGHT=0.1



const START_NET_x=START_BOARD_x-(NET_WIDHT-BOARD_WIDTH)/2
const START_NET_y=START_BOARD_y-NET_HEIGHT
const START_NET_z=START_BOARD_z+(BOARD_LENGTH/2)
const START_LEG_xr=START_BOARD_x+BOARD_WIDTH-10

// const NET_COLLISION_THRESHOLD_Z=0.02
const NET_COLLISION_THRESHOLD_Y=NET_HEIGHT/1.3
const NET_COLLISION_LOSS=0.7
const NET_COLLISION_Y_JUMP=0.0005

//bat
//for actual 3d 
const BAT_WIDTH=0.06
const BAT_HEIGHT=0.2
const BAT_LENGTH=1

//for static 2d bat image
const BAT_WIDTH_2d=58*2
const BAT_HEIGHT_2d=80*2
const BAT_LENGTH_2d=1


//ball
const BALL_RADIUS_2D=20
const BALL_RADIUS=5

const BALL_COLOR=["rgba(255, 177, 0, 0.1)","#E68A00","rgb(255,255,255,1)"]
const BALL_STROKE_COLOR=['rgb(255, 0, 0,1)']
const SHADOW_COLOR=["rgba(0, 0, 0, 0.8)"]

const STARTING_BALL_POSITION_Y=-0.1
const STARTING_BALL_VELOCITY_Y=0.001
const STARTING_BALL_VELOCITY_X=-0.0


const SERVEUP_X=START_BOARD_x+BOARD_WIDTH/2
const SERVEUP_y=STARTING_BALL_POSITION_Y
const SERVEUP_z=START_BOARD_z+BOARD_LENGTH-BOARD_LENGTH/10
const SERVEDOWN_X=START_BOARD_x+BOARD_WIDTH/2
const SERVEDOWN_y=STARTING_BALL_POSITION_Y
const SERVEDOWN_z=START_BOARD_z+BOARD_LENGTH/10



//physics constant
const GRAVITY=0.00128


// const FLOORSTART_Y=800
const LOSS_TABLE=0.00
const LOSS_GROUND=0.0007

const thresholdVelocityY=0.00000001

const thresholdX=0.04;
const thresholdY=0.01;
const thresholdZ=0.3;
const COLLISION_DETECTION_LIMIT=400

//strike back or collision response constants
const RESPONSE_SCALE_Z=0.0002;
const RESPONSE_SCALE_X=0.00003;

const STABLE_Y_VELOCITY=0.00019;
const SHOT_POSITION_Y=-0.17
const BAT_LENGTHINZAXIS_FOR_SHOT=0.4




//database 
const maxlength = 5;
