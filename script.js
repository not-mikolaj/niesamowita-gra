const canvas = document.querySelector("canvas");
const ctx=canvas.getContext('2d');
const StartButton = document.querySelector(".start");
const GameOver = document.querySelector('.gameover');
const timer=document.querySelector('.timer');
const hearts = document.querySelectorAll('img[src="heart.png"]');
const killcount = document.querySelector('.killcount');
const highscore = document.querySelector('.highscorevalue');
let keys={};
let game;
canvas.width=700;
canvas.height=700;
const playerimg = new Image;
const boomerangimg = new Image;
const goblinimg = new Image;
const goblinHitimg = new Image;
goblinHitimg.src='goblinhit.png';
goblinimg.src='goblin.png';
boomerangimg.src ='boomerang.png';
playerimg.src='stickman.png'; 
const Colision = (ent1,ent2)=>{
    if(ent1.x+ent1.hitboxWidth/2>=ent2.x-ent2.hitboxWidth/2&&ent2.x+ent2.hitboxWidth/2>=ent1.x-ent1.hitboxWidth/2
    &&ent1.y+ent1.height/2>=ent2.y+ent2.height/2-ent2.hitboxHeight&&ent2.y+ent2.height/2>=ent1.y+ent1.height/2-ent1.hitboxHeight){
        return true;
    }
    return false;
}


const removeHp=(attacker,defender)=>{
    if(Colision(attacker,defender)&&!defender.invincible&&attacker.alive&&defender.alive){
        defender.hp-=1;
        defender.invincible=true;
        setTimeout(() => {
            defender.invincible=false;                
        }, 1500);
    }
}
const positionChecker= (ent)=>{
    if(ent.x<canvas.width/2&&ent.y<canvas.height/2){
        return 1;
        // upperleft
    }
    if(ent.x>=canvas.width/2&&ent.y<canvas.height/2){
        return 2;
        // upperright
    }
    if(ent.x<canvas.width/2&&ent.y>=canvas.height/2){
        return 3;
        // lowerleft
    }
    if(ent.x>=canvas.width/2&&ent.y>=canvas.height/2){
        return 4;
        // lowerright
    }
}
class Entity {
    constructor(x,y,width,height,hp){
        this.hp=hp;
        this.originalhp=hp;
        this.x = x+width/2;
        this.originalX=x+width/2;
        this.y = y+height;
        this.originalY=y+height/2;
        this.height=height;
        this.hitboxHeight=height;
        this.width=width;
        this.hitboxWidth=width;
        this.alive=true;
        this.invincible=false;
    }
    moveX(distance){
        this.x=this.x+distance;
    }
    moveY(distance){
        this.y=this.y+distance;
    }
    Die(){
        this.alive=false;
    }
}
class Enemy extends Entity{
    constructor(x,y,width,height,hp){
        super(x,y,width,height,hp);
        this.hitboxWidth=width*.55;
        this.hitboxHeight=height*.75;
    }
    Draw(image){
        if(this.alive){
            ctx.drawImage(image,this.x-this.width/2,this.y-this.height/2,this.width,this.height);
        }
    }
    Follow(){
        if(this.alive){            
            if((player.x-this.x)!=0){
                let a=(player.y-this.y)/Math.abs(player.x-this.x);
                this.y += 1.5/Math.sqrt(1+(a*a))*a;
                this.x += (player.x-this.x)>0 ? 1.5/Math.sqrt(1+(a*a)) : -1.5/Math.sqrt(1+(a*a));
            }
            else{ 
                this.y+=(player.y-this.y)>0 ? 2 : -2;
            }                   
        }
    }
    Die(){
        this.alive=false;
        this.hp=this.originalhp;
        killcount.innerHTML=parseInt(killcount.innerHTML)+1;
        if(parseInt(killcount.innerHTML)>parseInt(highscore.innerHTML)){
            highscore.innerHTML=killcount.innerHTML;
        }
        setTimeout(()=>{
            switch(positionChecker(player)){
                case 1:
                    this.x=canvas.width*Math.floor(Math.random()*2);
                    this.y=this.x>0?canvas.height*Math.floor(Math.random()*2):canvas.height;
                    break;
                case 2:
                    this.x=canvas.width*Math.floor(Math.random()*2);
                    this.y=this.x<canvas.width?canvas.height*Math.floor(Math.random()*2):canvas.height;
                    break;
                case 3:
                    this.x=canvas.width*Math.floor(Math.random()*2);
                    this.y=this.x>0?canvas.height*Math.floor(Math.random()*2):0;
                    break;
                case 4:
                    this.x=canvas.width*Math.floor(Math.random()*2);
                    this.y=this.x<canvas.width?canvas.height*Math.floor(Math.random()*2):0;
            }
            this.alive=true;
        },Math.floor(Math.random()*3000)+1000);
        
        
    }
}
class Projectile extends Entity {
    constructor(x,y,width,height){
        super(x,y,width,height);
        this.shot=false;
    }
    Draw(){
        ctx.drawImage(boomerangimg,this.x-this.width/2,this.y-this.height/2,this.width,this.height)
    }
}
let boomerangspeed=1;
class Player extends Entity {
    constructor(x,y,width,height,hp){
        super(x,y,width,height,hp);
    }
    Draw(){
        if(this.alive){
            ctx.drawImage(playerimg,this.x-this.width/2,this.y-this.height/2,this.width,this.height)
        }
    }
    BoomerangBack(){
        const back = setInterval(()=>{
            if((this.x - boomerang.x) != 0) {
                let a = (player.y - boomerang.y) / Math.abs(this.x - boomerang.x);
                boomerang.y += boomerangspeed  / Math.sqrt(1 + (a * a)) * a;
                boomerang.x += (this.x - boomerang.x) > 0 ? boomerangspeed  / Math.sqrt(1 + (a * a)) : -boomerangspeed  / Math.sqrt(1 + (a * a));
            } else { 
                boomerang.y += (player.y - boomerang.y) > 0 ? boomerangspeed : -boomerangspeed ;
            }
                             
            if(Math.abs(this.x-boomerang.x)<this.width/2&&Math.abs(this.y-boomerang.y)<this.height/2){
                boomerang.x=this.x;
                boomerang.y=this.y;
                boomerang.shot=false;
                boomerangspeed=1;
                clearInterval(back);
            }
            boomerangspeed++;
        },30)
    }
    Shoot(direction){
        if(this.alive){
            switch(direction){
                //up
                case 1:
                    if(!boomerang.shot){
                        boomerang.shot=true;
                        boomerang.x=this.x;
                        boomerang.y=this.y;
                        let i=0;
                        const shoot = setInterval(() => {
                            boomerang.y-=6;
                            if(i>40){
                                this.BoomerangBack();
                                clearInterval(shoot);
                            }
                            i++; 
                        }, 15);
                    }
                    break;
                    //down
                    case 2:
                        if(!boomerang.shot){
                            boomerang.shot=true;
                        boomerang.x=this.x;
                        boomerang.y=this.y+(this.height/2);
                        let i=0;
                        const shoot = setInterval(() => {
                            boomerang.y+=6;
                            if(i>40){
                                this.BoomerangBack();
                                clearInterval(shoot);
                            }
                            i++; 
                        }, 15);
                    }
                    break;
                    //left
                    case 3:
                        if(!boomerang.shot){
                            boomerang.shot=true;
                            boomerang.x=this.x;
                            boomerang.y=this.y;
                            let i=0;
                            const shoot = setInterval(() => {
                                boomerang.x-=6;
                                if(i>40){
                                    this.BoomerangBack();
                                    clearInterval(shoot);
                                }
                                i++; 
                            }, 15);
                    }
                    break;
                    //right
                    case 4:
                        if(!boomerang.shot){
                            boomerang.shot=true;
                            boomerang.x=this.x+(this.width/2);
                            boomerang.y=this.y;
                            let i=0;
                            const shoot = setInterval(() => {
                                boomerang.x+=6;
                                if(i>40){
                                    this.BoomerangBack();
                                    clearInterval(shoot);
                                }
                                i++; 
                            }, 15);
                    }
                }
            }
        }
    }
    let randomCorner=()=>{
        let x;
        let y;
        switch(Math.floor(Math.random()*4)+1){
            case 1:
                x=canvas.width*Math.floor(Math.random()*2);
                y=this.x>0?canvas.height*Math.floor(Math.random()*2):canvas.height;
                break;
            case 2:
                x=canvas.width*Math.floor(Math.random()*2);
                y=this.x<canvas.width?canvas.height*Math.floor(Math.random()*2):canvas.height;
                break;
            case 3:
                x=canvas.width*Math.floor(Math.random()*2);
                y=this.x>0?canvas.height*Math.floor(Math.random()*2):0;
                break;
            case 4:
                x=canvas.width*Math.floor(Math.random()*2);
                y=this.x<canvas.width?canvas.height*Math.floor(Math.random()*2):0;
        }
        return [x,y];
    };
    const player = new Player(canvas.width/2-5,canvas.height/2-5,50,50,3);
    const boomerang = new Projectile(player.x,player.y,30,30);
    let enemyList = [];
    let aliveList = [player].concat(enemyList);
    let entityList = [player,boomerang].concat(enemyList);
    const AddEnemy=()=>{
        const corner = randomCorner();
        enemyList.push(new Enemy(corner[0],corner[1],150,150,2));
        aliveList = [player].concat(enemyList);
        entityList = [player,boomerang].concat(enemyList);
    }
    AddEnemy();
    AddEnemy();
    const Heart=()=>{
        switch(player.hp){
            case 3:
                hearts.forEach(e => {
                    e.style.opacity='1';
                });
                break;
            case 2:
                hearts[2].style.opacity='0';
                break;
            case 1:
                hearts[1].style.opacity='0';
                break;
            case 0:
                hearts[0].style.opacity='0';
        }
    }  
    let playerInvisible = 0;
const update = () =>{
        Heart();
        if(!player.alive){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        GameOver.style.display='block';
        StartButton.style.display='block';
        enemyList=[];
        AddEnemy();
        AddEnemy();
        cancelAnimationFrame(game);
        return;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    enemyList.forEach(e=>{
        removeHp(e,player);
        if(boomerang.shot){
            removeHp(boomerang,e);
        }
        if(e.invincible==false){
            e.Draw(goblinimg);
        }
        else{
            e.Draw(goblinHitimg);
        }
    })
    aliveList.forEach(e => {
        if(e.hp<1){
            if((parseInt(killcount.innerHTML)+1)%5==0){
                AddEnemy();
            }
            e.Die();
        }
    });

    if(boomerang.shot==1){
        boomerang.Draw();
    }
    if(playerInvisible%5==0){
        player.Draw();
    }
    if(player.invincible){
        playerInvisible+=1;
    }else{
        playerInvisible=0;
    }
    game=requestAnimationFrame(update);
    
}
const Movement=()=>{
    MovementInterval = setInterval(()=>{
        if(keys["a"] && player.x>player.width/2){
            player.moveX(-5);
        }
        if(keys["d"] && player.x<(canvas.width-player.width/2)){
            player.moveX(5);
        }
        if(keys["w"]&& player.y>player.height/2){
            player.moveY(-5);
        }
        if(keys["s"] && player.y<(canvas.height-player.height/2)){
            player.moveY(5);
        }
        enemyList.forEach(e=>{
            e.Follow();
        })
        if(!player.alive){
            clearInterval(MovementInterval);
        }
    },15);
}
addEventListener('keydown',(e)=>{
    keys[e.key.toLowerCase()]=true;
    if(e.code=="ArrowUp"){
        player.Shoot(1);
    }
    if(e.code=="ArrowDown"){
        player.Shoot(2);
    }
    if(e.code=="ArrowLeft"){
        player.Shoot(3);
    }
    if(e.code=="ArrowRight"){
        player.Shoot(4);
    }
})
addEventListener('keyup', (e)=>{
    keys[e.key.toLowerCase()]=false;
})

StartButton.addEventListener('click', ()=>{
    entityList.forEach(e=>{
        e.x=e.originalX;
        e.y=e.originalY;
        e.hp=e.originalhp;
        e.alive=true;
    });
    timer.style.display='block';
    StartButton.style.display='none';
    killcount.innerHTML=0;
    let i=3;
    timer.innerHTML=i;
    GameOver.style.display='none';
    const interval=setInterval(()=>{
        i--;
        if(i<1){
            timer.style.display='none';
            clearInterval(interval);
            timer.innerHTML='';
            update();
            Movement();
        }
        timer.innerHTML=i;
    },1000)
})
