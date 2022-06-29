const canvas=document.querySelector(".canvas")
const ctx=canvas.getContext('2d');
canvas.style.position='relative';
canvas.height=CANVAS_WIDTH;
canvas.width=CANVAS_WIDTH;


ctx.beginPath();
ctx.lineTo(20, 20);
ctx.lineTo(40, 30);
ctx.stroke();
const canvas1=document.querySelector(".canvas1")
const ctx1=canvas.getContext('2d');
canvas1.style.position='relative';
canvas1.height=CANVAS_WIDTH;
canvas1.width=CANVAS_WIDTH;


ctx1.beginPath();
ctx1.lineTo(20, 20);
ctx1.lineTo(90, 30);
ctx1.stroke();







