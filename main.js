/*

280/4=70;
strokeweight = 2 -> rect


0  1  2  3
4  5  6  7
8  9  10 11
12 13 14 15

*/

let ans_place = [
    [0,0],[70,0],[140,0],[210,0],
    [0,70],[70,70],[140,70],[210,70],
    [0,140],[70,140],[140,140],[210,140],
    [0,210],[70,210],[140,210],[210,210]
]

//16番目の要素はからのところ
//これと隣り合っていると移動可能なことになる。（からのところと動かすところの座標が入れ替わる）

let place = [
    [0,0],[70,0],[140,0],[210,0],
    [0,70],[70,70],[140,70],[210,70],
    [0,140],[70,140],[140,140],[210,140],
    [0,210],[70,210],[140,210],[210,210]
]

let pos = [
    1,2,3,4,
    5,6,7,8,
    9,10,11,12,
    13,14,15,-1
]

let touchX,touchY;

let moveNum = 0;

function setup(){
    createCanvas(280,280);
    randomize();
}

function draw(){
    //draw background
    
    background(255,200,200);

    // draw rect
    

    for(var i=0;i <15; i++){
        strokeWeight(1);
        stroke(0);
        fill(175,223,228);
        rect(place[i][0],place[i][1],70,70);
        
        fill(0);
        textAlign(CENTER);
        textSize(36);
        text(i+1,place[i][0]+70/2,place[i][1]+70/2+14);

    }
}

function mousePressed(){
    
    print(mouseX);
    print(mouseY);

    print(floor(mouseX/70));
    print(floor(mouseY/70));

    let xi = floor(mouseX/70);
    let yi = 4*floor(mouseY/70);

    let index = xi+yi;

    if(index >= 16 || index < 0 || pos[index] === -1) return;

    if((abs(place[15][0]-place[pos[index]-1][0]) === 70 && abs(place[15][1]-place[pos[index]-1][1]) === 0) || (abs(place[15][0]-place[pos[index]-1][0]) === 0 && abs(place[15][1]-place[pos[index]-1][1]) === 70)){
        let memox = place[pos[index]-1][0];
        let memoy = place[pos[index]-1][1];
        let nulli = floor(place[15][0]/70)+4*floor(place[15][1]/70);

        place[pos[index]-1][0] = place[15][0];
        place[pos[index]-1][1] = place[15][1];

        place[15][0] = memox;
        place[15][1] = memoy;
        moveNum++;

        
        pos[nulli] = pos[index];
        
        pos[index] = -1;
    }


    let gameOver = true;
    for(let i=0; i<16; i++){
        if(place[i][0] != ans_place[i][0] || place[i][1] != ans_place[i][1]){
            gameOver = false;
        }
    }

    if(gameOver){
        document.getElementById("game_over_text").innerText = `揃いました!${moveNum}回動かしました。`
    }else document.getElementById("game_over_text").innerText = `揃っていません。${moveNum}回動かしました。`
}

function shuffleArray(inputArray){
    inputArray.sort(()=> Math.random() - 0.5);
}

function randomize(){
    moveNum = 0;
    shuffleArray(pos);

    for(let i=0; i<16; i++){
        
        let y = 70*(floor(i / 4));
        let x = 70*(i % 4);

        let num = 0;

        // 空
        if(pos[i] == -1) num = 16;
        else num = pos[i];

        place[num-1][0] = x;
        place[num-1][1] = y;

    }

    let gameOver = true;
    for(let i=0; i<16; i++){
        if(place[i][0] != ans_place[i][0] || place[i][1] != ans_place[i][1]){
            gameOver = false;
        }
    }

    if(gameOver){
        //シャッフルしたにもかかわらず揃った場合
        document.getElementById("game_over_text").innerText = `揃いました!偶然ですね。${moveNum}回動かしました。`
    }else document.getElementById("game_over_text").innerText = `揃っていません。${moveNum}回動かしました。`
}

// function touchStarted(){
//     console.log("touch!");
//     console.log(touchX);
//     console.log(touchY);
// }