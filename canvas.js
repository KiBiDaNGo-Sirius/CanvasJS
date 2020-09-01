var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var StartAndEndPoint = [[0,300,400,300],[400,300,500,200],[400,300,500,400],[500,200,700,200],[500,400,700,400]];//[Sx,Sy,Ex,Ey]

var Cwidth = 1200;
var Cheight = 600;

function FirstDrow(){
    for(let i = 0;i<StartAndEndPoint.length;i++){
        ctx.beginPath();
        ctx.moveTo(StartAndEndPoint[i][0],StartAndEndPoint[i][1]);//start
        ctx.lineTo(StartAndEndPoint[i][2],StartAndEndPoint[i][3]);//end
        ctx.stroke();
    }
}

function ChangeCanvasSize(){
    canvas.width = Cwidth;
    canvas.height = Cheight;
}
  
function onClick(e) {
    console.log("click");
    
}
  

canvas.addEventListener('click', onClick, false);
ChangeCanvasSize()
FirstDrow()
