//elementos del dom
const canvas = document.querySelector('canvas');

//variables
const pi = Math.PI;
const interactionSize = 70;
let circleArray = [];
const maxCircle = 250;
const maxRadius = 60;
const colorArray = [
    '#0B2B40',
    '#30A5BF',
    '#185359',
    '#F2BE22',
    '#A6874E'    
];


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

//objeto mouse
let mouse = {
    x: undefined,
    y: undefined
}
//ubicacion del mouse en la pantalla
window.addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
})

//resize de la ventana
window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

//construcctor del circulo
function Circle(x,y,radius,dx,dy,color){
    x;
    y;
    dx;
    dy;
    radius;
    minRadius = radius;
    color;
    this.draw = function(){
        c.beginPath();
        c.arc(x,y,radius,0,pi*2,false);
        c.strokeStyle = 'black';
        c.stroke();
        c.fillStyle = color; 
        c.fill();
    }
    this.update = function(){
        if(x + radius > innerWidth || x - radius < 0){
            dx = -dx;
        }
        if(y + radius > innerHeight || y - radius < 0){
            dy = -dy;
        }
        x+=dx;
        y+=dy;
        //interactividad con el mouse
        if((mouse.x - x) < interactionSize && mouse.x - x > -interactionSize
        && (mouse.y-y) < interactionSize && (mouse.y - y) > -interactionSize
        && radius < maxRadius){
            radius++;
        }else if(radius > minRadius){
            radius --;
        }
        this.draw();
    }
}

function init(){
     circleArray = [];
    //creacion de los circulos con parametros random
    for(let i = 0; i < maxCircle ; i ++){
        let radius = Math.random() * 20 +1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 4;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dy = (Math.random() -0.5) * 4;
        let color = colorArray[Math.floor(Math.random() * colorArray.length)];
        circleArray.push(new Circle(x,y,radius,dx,dy,color));
    }
}
//animacion de los circulos
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth,innerHeight);

    for(let i = 0; i < circleArray.length ; i++){
        circleArray[i].update();    
    }
}

//llamadas a funciones
init();
animate();