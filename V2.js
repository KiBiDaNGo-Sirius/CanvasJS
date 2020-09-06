//canvas情報取得だニャン
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); //何か描画する際は ctx.　にするにゃん
var Cwidth = 5000; //初期幅ニャン
var Cheight = 1300; //初期高さニャン

//シナリオ図の作成用変数だニャン
var StartAndEndPoint = [[0,650,400,650]]; //[Sx,Sy,Ex,Ey]　線の終始
var EndPoints = [[400,650,0]]; //list of End of Branch　枝の最後
var TextAndPlace = [];
var DiagonalLength = 320; //次の枝と枝の幅の初期値だニャン 200x2
var LineLength = 400; //枝の長さだニャン
var EdittingText = 0;
var ready = false;


//canvas上でのマウス操作時の情報取得だニャン
canvas.addEventListener('click', onClick, false);

//枝編集ボタンを押したときのダイアログなどの変数だニャン
var Bdialog = document.getElementById('BranchDialog');
console.log("Bdialog",Bdialog);
var Branch_close = document.getElementById('Bclose');
Branch_close.addEventListener('click',BDialogClose,false);


//ブランチ編集用

function AddBranch(BranchNum,text){
    var X = EndPoints[BranchNum][0];
    var Y = EndPoints[BranchNum][1];
    var BranchCount = 0;
    console.log("WTF");
    console.log(Math.pow(2,BranchCount),(EndPoints.length));
    while(Math.pow(2,BranchCount)<=(EndPoints.length)){
        BranchCount += 1;
    }
    DChange = DiagonalLength/Math.pow(2,BranchCount-1);
    console.log(X,Y);
    var addPoints = [[X,Y,X+100,Y-DChange],[X+100,Y-DChange,X+LineLength,Y-DChange],[X,Y,X+100,Y+DChange],[X+100,Y+DChange,X+LineLength,Y+DChange]];
    var addEnds = [[addPoints[1][2],addPoints[1][3],0],[addPoints[3][2],addPoints[3][3],0]]; // Each End Points
    console.log(Y+DChange);
    var addTPlace = [[X,Y-30,text]];
    console.log("Branch",BranchCount);
    console.log("Befor",EndPoints);
    console.log("add",addEnds);
    StartAndEndPoint = StartAndEndPoint.concat(addPoints);
    EndPoints = EndPoints.concat(addEnds);
    TextAndPlace = TextAndPlace.concat(addTPlace);
    console.log("added",EndPoints);
    ReWrite();
}

function findChildBranch(Branch){
    var Exist = TwoDindex(StartAndEndPoint,Branch)
    if(Exist != "error"){
        EdittingBranch = TwoDindex(EndPoints,[StartAndEndPoint[Exist+1][2],StartAndEndPoint[Exist+1][3]])
        DelBranch(StartAndEndPoint)
    }

}

function DelBranch(EdittingBranch){
    var OtherEndPoint;
    if(EdittingBranch%2==1){
        OtherEndPoint = [StartAndEndPoint[EdittingBranch*2+2][2],StartAndEndPoint[EdittingBranch*2+2][3]];
        var StartPint =  [StartAndEndPoint[EdittingBranch*2][0],StartAndEndPoint[EdittingBranch*2][1]-10];
        StartAndEndPoint.splice(EdittingBranch*2-1,4); 
    }else{
        console.log(StartAndEndPoint[EdittingBranch*2-2])
        OtherEndPoint = [StartAndEndPoint[EdittingBranch*2-2][2],StartAndEndPoint[EdittingBranch*2-2][3]];
        var StartPint =  [StartAndEndPoint[EdittingBranch*2][0],StartAndEndPoint[EdittingBranch*2][1]-10];
        StartAndEndPoint.splice(EdittingBranch*2-3,4);
    }
    
    var TextIndex = TwoDindex(TextAndPlace,StartPint);
    TextAndPlace.splice(TextIndex-(TextIndex%6),6);
    console.log("textindex",TextIndex,StartPint);
    console.log("TP",TextAndPlace);
    console.log("End",EndPoints);
    findChildBranch(EndPoints[EdittingBranch])
    EndPoints.splice(EdittingBranch,1);
    var OtherEnd = TwoDindex(EndPoints,OtherEndPoint);
    console.log("otherend",OtherEnd)
    EndPoints.splice(OtherEnd,1);
    ReWrite();
    console.log("del");
    console.log("deled",EndPoints);
}

function Addline(EdittingBranch){
    StartAndEndPoint[EdittingBranch+1][2] += 400;
    EndPoints[EdittingBranch][0] += 400;
    ReWrite();
}

//クリックによって発生するイベントと関数--------------
//クリック場所の指定　と　ダイアログ表示
function onClick(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    var acceptLength = 7;
    for(let i = 0;i<EndPoints.length;i++){
        let PointX = EndPoints[i][1];
        let PointY = EndPoints[i][0];
        if(PointX-acceptLength < x && x < PointX+acceptLength){
            if(PointY-acceptLength < y && y < PointY+acceptLength){// width and height +- 5 is ok
                if(EndPoints[i][2] == 0){
                    EdittingBranch = i;
                    console.log("clickEndB");
                    ctx.scale(0.3,0.3);
                    ReWrite();
                    
                }
            }
        }
    }
    for(let i = 0;i<TextAndPlace.length;i++){
        let PointX = TextAndPlace[i][1];
        let PointY = TextAndPlace[i][0];
        if(PointX-acceptLength < x && x < PointX+acceptLength){
            if(PointY-acceptLength < y && y < PointY+acceptLength){// width and height +- 5 is ok
                EdittingText = i;
                console.log("clickTextB");
                Tdialog.showModal(); 
            }
        }
    }
    for(let k = 0;k<StartAndEndPoint.length;k++){
        let PointX = StartAndEndPoint[k][3];
        let PointY = StartAndEndPoint[k][2];
        if(k%2==0){
            console.log("even")
            if(PointX-400 < x && x < PointX){
                console.log("Xok")
                if(PointY-acceptLength < y && y < PointY+acceptLength){// width and height +- 5 is ok
                    console.log("Yok")
                    EdittingBranch = TwoDindex(EndPoints,[PointX,PointY]);
                    console.log(EdittingBranch);
                    DelBranch(EdittingBranch);
                    EdittingBranch = 0;
                }
            }
        }
    }
    console.log("click",x,y);
}

//Endボタンを押した際のダイアログ結果とその後の行動
function BDialogClose(){
    var RadioB = document.getElementById( "RadioBs" ) ;
    var WantToDo = document.getElementById("WantToDo").value;
    var B1 = document.getElementById("if1").value;
    var B2 = document.getElementById("if2").value;
    var B3 = document.getElementById("if3").value;
    if(B1 != ""){
        AddBranch(0,B1);
    }else if(B2 != ""){
        AddBranch(1,B2);
    }else if(B3 != ""){
        AddBranch(2,B3);
    }
    ReWrite();
    Bdialog.close();
}

//テキストボタンを押した際のダイアログ結果とその行動
function TDialogClose(){
    console.log("EditingT")
    text = document.getElementById('above').value;
    console.log("ET",EdittingText,text);
    TextAndPlace[EdittingText][2] = text;
    Tdialog.close();
    ReWrite();
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
        ctx.moveTo(StartAndEndPoint[i][1],StartAndEndPoint[i][0]);//start
        ctx.lineTo(StartAndEndPoint[i][3],StartAndEndPoint[i][2]);//end
        ctx.stroke();
    }
}
//
function DrowBox(){
    for(let i = 0;i < EndPoints.length;i++){
        if(EndPoints[i][2] == 0){
            ctx.fillStyle = "rgb(0, 0, 255)"
            ctx.fillRect(EndPoints[i][1]-5,EndPoints[i][0],10,10)
        }  
    }
    for(let j = 0;j < TextAndPlace.length;j++){
        if(j%2 == 0){
            ctx.fillStyle = "rgb(255, 0, 0)"
            ctx.fillRect(TextAndPlace[j][1],TextAndPlace[j][0],10,10)
            console.log(TextAndPlace[j][1])
        }else{
            ctx.fillStyle = "rgb(255, 0, 0)"
            ctx.fillRect(TextAndPlace[j][1],TextAndPlace[j][0],10,10)
        }
        
    }
}
//
function WriteText(){
    ctx.fillStyle = "blue";
    ctx.font = "20px 'ＭＳ ゴシック'";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    for(let i = 0;i<TextAndPlace.length;i++){
        let TextNum = i;
        if(i%6==0){
            ctx.fillText(TextNum+TextAndPlace[i][2],TextAndPlace[i][1],TextAndPlace[i][0],100);
        }else if(i%6==1){
            ctx.fillText(TextNum+TextAndPlace[i][2],TextAndPlace[i][1],TextAndPlace[i][0],100);
        }
        else{
            if(i%2==0){
                ctx.fillText(TextNum+TextAndPlace[i][2],TextAndPlace[i][1],TextAndPlace[i][0],100);
            }else{
                ctx.fillText(TextNum+TextAndPlace[i][2],TextAndPlace[i][1],TextAndPlace[i][0],100);
            }
            
        }
        
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
Bdialog.showModal(); 
console.log(StartAndEndPoint);
