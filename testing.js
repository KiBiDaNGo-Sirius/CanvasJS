var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var StartAndEndPoint = [[0,300,400,300]];//[Sx,Sy,Ex,Ey]
var EndPoints = [[400,300]];//list of End of Branch
var Cwidth = 1200;
var Cheight = 600;
var DiagonalLength = 100;

function MakeBranch(BranchNum){
    var X = StartAndEndPoint[BranchNum][2];
    var Y = StartAndEndPoint[BranchNum][3];
    var BranchCount = 0;
    console.log("WTF")
    console.log(Math.pow(2,BranchCount),(EndPoints.length-1));
    while(Math.pow(2,BranchCount)-1<=(EndPoints.length)){
        BranchCount += 1;
    }
    DChange = DiagonalLength/BranchCount
    console.log(X,Y)
    var addPoints = [[X,Y,X+DChange,Y+DChange],[X,Y,X+DChange,Y-DChange],[X+DChange,Y+DChange,X+400,Y+DChange],[X+DChange,Y-DChange,X+400,Y-DChange]];
    var addEnds = [[addPoints[2][2],addPoints[2][3]],[addPoints[3][2],addPoints[3][3]]]; // Each End Points
    console.log("Branch",BranchCount)
    console.log("Befor",EndPoints)
    console.log("add",addEnds)
    StartAndEndPoint = StartAndEndPoint.concat(addPoints);
    EndPoints = EndPoints.concat(addEnds);
    console.log("added",EndPoints)
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
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    for(let i = 0;i<EndPoints.length;i++){
        var PointX = EndPoints[i][0];
        var PointY = EndPoints[i][1];
        if(PointX-5 < x && x < PointX+5){
            if(PointY-5 < y && y < PointY+5){// width and height +- 5 is ok
                OnClickEndPoint()
            }
        }
    }
    console.log("click");
    
}

function OnClickEndPoint(){
    console.log("clickEndPoint")
    var objDlg = new Window("dialog", "ダイアログのタイトル", [0,0,400,250]);
    //　固定テキスト
    var objStText01 = objDlg.add("statictext", [20,20,380,40], "固定テキスト");
    //　テキストボックス
    var objTxtbox01= objDlg.add("edittext", [20, 70, 315, 90], "入力してください。");
    //　チェックボックス
    var objChkbox01= objDlg.add("checkbox", [30, 120, 140, 140], "チェック項目");
    //　ラジオボタン
    var objBtn01= objDlg.add("radiobutton", [30, 150, 140, 170], "ボタン1");
    var objBtn02= objDlg.add("radiobutton", [130, 150, 240, 170], "ボタン2");
    
}

function DrowBox(){
    for(let i = 0;i < EndPoints.length;i++){
        ctx.fillStyle = "rgb(0, 0, 255)"
        ctx.fillRect(EndPoints[i][0]-5,EndPoints[i][1]-5,10,10)
    }
}

canvas.addEventListener('click', onClick, false);

ChangeCanvasSize()
MakeBranch(0)
MakeBranch(4)
MakeBranch(3)
FirstDrow()
DrowBox()
console.log(StartAndEndPoint);
