const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 768

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);


const image = new Image();
image.src = 'media/map.png';

console.log(PlacementTilesData)
const placementTilesData2d =   []

for(let i=0 ; i< PlacementTilesData.length ; i+= 20){
    placementTilesData2d.push(PlacementTilesData.slice(i, i + 20));
}




const placementTiles = []

console.log(placementTiles)

placementTilesData2d.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 14){
            placementTiles.push(
                new PlacementTile({
                    position: {
                        x: x * 64,
                        y: y * 64
                    }
                })
            )
            }
        }
    )
}
)




const enemies = []
for (let i = 0 ; i <10 ; i++){

    const xOffset = i * 150

    enemies.push(new Enemy ({
        position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
    }))
}

function animate() {
    window.requestAnimationFrame(animate);
    c.drawImage(image, 0, 0);
    enemies.forEach(enemy => {    
        enemy.update();
    })
    placementTiles.forEach(tile  => {
        tile.update(mouse);
    });


}


image.onload = () => {
    animate();
        
}
const mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
    console.log(event)
});