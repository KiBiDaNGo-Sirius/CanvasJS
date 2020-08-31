var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var StartAndEndPoint = [[0,300,400,300]];//[Sx,Sy,Ex,Ey]
var Cwidth = 1200;
var Cheight = 600;
var DiagonalLength = 100;
var BranchCount = 2;

function MakeBranch(BranchNum){
    var X = StartAndEndPoint[BranchNum][2];
    var Y = StartAndEndPoint[BranchNum][3];
    
    console.log(BranchCount);
    DChange = DiagonalLength*Math.E/BranchCount
    console.log(X,Y)
    var addPoints = [[X,Y,X+DChange,Y+DChange],[X,Y,X+DChange,Y-DChange],[X+DChange,Y+DChange,X+400,Y+DChange],[X+DChange,Y-DChange,X+400,Y-DChange]];
    console.log(addPoints);
    console.log(StartAndEndPoint);
    StartAndEndPoint = StartAndEndPoint.concat(addPoints);
    BranchCount += 1;
}

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
MakeBranch(0)
MakeBranch(4)
MakeBranch(3)
FirstDrow()
console.log(StartAndEndPoint);
