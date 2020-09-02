//canvas情報取得だニャン
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); //何か描画する際は ctx.　にするにゃん
var Cwidth = 1800; //初期幅ニャン
var Cheight = 600; //初期高さニャン

//シナリオ図の作成用変数だニャン
var StartAndEndPoint = [[0,300,400,300]]; //[Sx,Sy,Ex,Ey]　線の終始
var EndPoints = [[400,300]]; //list of End of Branch　枝の最後
var TextAndPlace = [];
var DiagonalLength = 200; //次の枝と枝の幅の初期値だニャン 200x2
var LineLength = 400; //枝の長さだニャン
var EdittingBranch = 0; //編集する枝のindex保管用変数だニャン
var EdittingText = 0;
var ready = false;


//canvas上でのマウス操作時の情報取得だニャン
canvas.addEventListener('click', onClick, false);

//枝編集ボタンを押したときのダイアログなどの変数だニャン
var Bdialog = document.getElementById('BranchDialog');
console.log("Bdialog",Bdialog);
var Branch_close = document.getElementById('Bclose');
Branch_close.addEventListener('click',BDialogClose,false);

//TextEdit
var Tdialog = document.getElementById('TextDialog');
console.log("Tdialog",Bdialog);
var EditButton = document.getElementById('TextEdit');
EditButton.addEventListener('click',TEdit,false);
var EditButton = document.getElementById('Tclose');
EditButton.addEventListener('click',TDialogClose,false);

//ブランチ編集用

function AddBranch(BranchNum){
    var X = EndPoints[BranchNum][0];
    var Y = EndPoints[BranchNum][1];
    var BranchCount = 0;
    console.log("WTF");
    console.log(Math.pow(2,BranchCount),(EndPoints.length-1));
    while(Math.pow(2,BranchCount)-1<=(EndPoints.length)){
        BranchCount += 1;
    }
    DChange = DiagonalLength/Math.pow(2,BranchCount-1);
    console.log(X,Y);
    var addPoints = [[X,Y,X+100,Y-DChange],[X+100,Y-DChange,X+LineLength,Y-DChange],[X,Y,X+100,Y+DChange],[X+100,Y+DChange,X+LineLength,Y+DChange]];
    var addEnds = [[addPoints[1][2],addPoints[1][3]],[addPoints[3][2],addPoints[3][3]]]; // Each End Points
    var addTPlace = [[X,Y,0,"",""],[X+100,Y-DChange,1,"",""],[X+100,Y+DChange,1,"",""]];
    console.log("Branch",BranchCount);
    console.log("Befor",EndPoints);
    console.log("add",addEnds);
    StartAndEndPoint = StartAndEndPoint.concat(addPoints);
    EndPoints = EndPoints.concat(addEnds);
    TextAndPlace = TextAndPlace.concat(addTPlace);
    console.log("added",EndPoints);
    BranchCount += 1;
    ReWrite();
}

function DelBranch(EdittingBranch){
    var OtherEndPoint;
    if(EdittingBranch%2==1){
        OtherEndPoint = [StartAndEndPoint[EdittingBranch*2+2][2],StartAndEndPoint[EdittingBranch*2+2][3]];
        var StartPint =  [StartAndEndPoint[EdittingBranch*2][0],StartAndEndPoint[EdittingBranch*2][1]];
        StartAndEndPoint.splice(EdittingBranch*2-1,4); 
    }else{
        OtherEndPoint = [StartAndEndPoint[EdittingBranch*2-2][2],StartAndEndPoint[EdittingBranch*2-2][3]];
        var StartPint =  [StartAndEndPoint[EdittingBranch*2][0],StartAndEndPoint[EdittingBranch*2][1]];
        StartAndEndPoint.splice(EdittingBranch*2-3,4);
    }
    
    var TextIndex = TwoDindex(TextAndPlace,StartPint);
    TextAndPlace.splice(TextIndex-(TextIndex%3),3);
    console.log("textindex",TextIndex,StartPint);
    console.log("TP",TextAndPlace);
    console.log("End",EndPoints);
    EndPoints.splice(EdittingBranch,1);
    var OtherEnd = TwoDindex(EndPoints,OtherEndPoint);
    console.log("otherend",OtherEnd)
    EndPoints.splice(OtherEnd,1);
    ReWrite();
    console.log("del");
    console.log("deled",EndPoints);
}

//クリックによって発生するイベントと関数--------------
//クリック場所の指定
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
//エンドボタンを押した際の行動
function OnClickEndPoint(){
    console.log("clickEndPoint");
    Bdialog.showModal(); 
}

//Endボタンを押した際のダイアログ結果とその後の行動
function BDialogClose(){
    var RadioB = document.getElementById( "RadioBs" ) ;
    var RadioCondition = RadioB.condition ;
    var RValue = RadioCondition.value ;
    console.log(RValue)
    if(RValue == "add"){
        AddBranch(EdittingBranch);
    }
    else if(RValue == "del"){
        DelBranch(EdittingBranch);
    }
    EdittingBranch = 0;
    Bdialog.close();
}

//テキストボタンを押した際の行動
function TEdit(){
    ready = true;
    for(let i = 0;i<TextAndPlace.length;i++){
        EdittingText = i;
        while(true){
            if(ready){
                console.log("BE",EdittingText)
                Tdialog.showModal();
                ready = false;
                break
            }
        }
        
    }
} 
//テキストボタンを押した際のダイアログ結果とその行動
function TDialogClose(){
    console.log("Editing")
    console.log("ET",EdittingText);
    UpperText = document.getElementById('above');
    LowerText = document.getElementById('below');
    TextAndPlace[EdittingText][3] = UpperText;
    TextAndPlace[EdittingText][4] = LowerText;
    Tdialog.close();
    ReWrite();
    ready = true;
}

//描画用-----------------------------------------------
//
function ReWrite(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    FirstDrow();
    DrowBox();
    WriteText();
}
//
function FirstDrow(){
    for(let i = 0;i<StartAndEndPoint.length;i++){
        ctx.beginPath();
        ctx.moveTo(StartAndEndPoint[i][0],StartAndEndPoint[i][1]);//start
        ctx.lineTo(StartAndEndPoint[i][2],StartAndEndPoint[i][3]);//end
        ctx.stroke();
    }
}
//
function DrowBox(){
    for(let i = 0;i < EndPoints.length;i++){
        ctx.fillStyle = "rgb(0, 0, 255)"
        ctx.fillRect(EndPoints[i][0]-5,EndPoints[i][1]-5,10,10)
    }
}
//
function WriteText(){
    for(let i = 0;i<TextAndPlace.length;i++){
        let TextNum = i*2;
        ctx.fillText(TextNum+TextAndPlace[i][3],TextAndPlace[i][0],TextNum+TextAndPlace[i][1]-20,100);
        TextNum = i*2 + 1;
        ctx.fillText(TextNum+TextAndPlace[i][4],TextAndPlace[i][0],TextNum+TextAndPlace[i][1]+20,100);
    }
    
}
//

//
//
function ChangeCanvasSize(){
    canvas.width = Cwidth;
    canvas.height = Cheight;
}

function TwoDindex(List,Elments){
    for(let i = 0;i<List.length;i++){
        if(Elments[0]==List[i][0] && Elments[1]==List[i][1]){
            return i
        }
    }
    return "error"
}
ChangeCanvasSize();
AddBranch(0);
console.log(StartAndEndPoint);
