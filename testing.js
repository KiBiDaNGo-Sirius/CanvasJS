var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var StartAndEndPoint = [[0,300,400,300]];//[Sx,Sy,Ex,Ey]
var EndPoints = [[400,300]];//list of End of Branch
var Cwidth = 1800;
var Cheight = 600;
var DiagonalLength = 100;

var EdittingBranch = 0;

function MakeBranch(BranchNum){
    var X = EndPoints[BranchNum][0];
    var Y = EndPoints[BranchNum][1];
    var BranchCount = 0;
    console.log("WTF");
    console.log(Math.pow(2,BranchCount),(EndPoints.length-1));
    while(Math.pow(2,BranchCount)-1<=(EndPoints.length)){
        BranchCount += 1;
    }
    DChange = DiagonalLength/BranchCount;
    console.log(X,Y);
    var addPoints = [[X,Y,X+DChange,Y+DChange],[X,Y,X+DChange,Y-DChange],[X+DChange,Y+DChange,X+400,Y+DChange],[X+DChange,Y-DChange,X+400,Y-DChange]];
    var addEnds = [[addPoints[2][2],addPoints[2][3]],[addPoints[3][2],addPoints[3][3]]]; // Each End Points
    console.log("Branch",BranchCount);
    console.log("Befor",EndPoints);
    console.log("add",addEnds);
    StartAndEndPoint = StartAndEndPoint.concat(addPoints);
    EndPoints = EndPoints.concat(addEnds);
    console.log("added",EndPoints);
    BranchCount += 1;
}

function DelBranch(){
    console.log("del")
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
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    for(let i = 0;i<EndPoints.length;i++){
        var PointX = EndPoints[i][0];
        var PointY = EndPoints[i][1];
        if(PointX-5 < x && x < PointX+5){
            if(PointY-5 < y && y < PointY+5){// width and height +- 5 is ok
                EdittingBranch = i;
                OnClickEndPoint()
            }
        }
    }
    console.log("click");
    
}

function OnClickEndPoint(){
    console.log("clickEndPoint")
    dialog.showModal()
    
}

function DrowBox(){
    for(let i = 0;i < EndPoints.length;i++){
        ctx.fillStyle = "rgb(0, 0, 255)"
        ctx.fillRect(EndPoints[i][0]-5,EndPoints[i][1]-5,10,10)
    }
}

function DialogClose(){
    var RadioB = document.getElementById( "RadioBs" ) ;
    var RadioCondition = RadioB.condition ;
    var RValue = RadioCondition.value ;
    console.log(RValue)
    if(RValue = "add"){
        MakeBranch(EdittingBranch);
        FirstDrow()
        DrowBox()
    }
    else if(RValue = "del"){
        DelBranch(EdittingBranch);
    }
    EdittingBranch = 0;
    dialog.close();
}


canvas.addEventListener('click', onClick, false);
dialog = document.querySelector('dialog');
btn_close = document.getElementById('close');
btn_close.addEventListener('click',DialogClose,false);

ChangeCanvasSize()
MakeBranch(0)
MakeBranch(1)
MakeBranch(2)
FirstDrow()
DrowBox()
console.log(StartAndEndPoint);
