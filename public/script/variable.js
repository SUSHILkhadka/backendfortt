//global variables for gamemode

var canvasWidthDividerForMultiplayer=1;
var canvasHeightDividerForMultiplayer=1;

WIDTH_SCALE_FOR_PROJECTION=1
HEIGHT_SCALE_FOR_PROJECTION=1

ballradiusfactor=1.7
shadowradiusfactor=10000

START_ZPLANE=2

var timeScale=localStorage.getItem('timescale_TableTennis') ? localStorage.getItem('timescale_TableTennis') : 0.7;


// global variables for audio
let ambientsound = new Audio('asset/ambient.mp3');
let bounche = new Audio('asset/bounche.m4a');
let batsound = new Audio('asset/bat.m4a');
let wallsound = new Audio('asset/wallbounce.mp3');
let batsound2 = new Audio('asset/balls.wav');
let refreesound=new Audio('asset/refree.m4a');
let soundflag=1

let batimage=new Image();
var imageObj2 = new Image();
var netpattern=null;
freeze=0;

