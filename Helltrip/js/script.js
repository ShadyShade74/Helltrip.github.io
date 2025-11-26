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

placementTilesData2d.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 14) {
            placementTiles.push(
                new PlacementTile({
                    position: { x: x * 64, y: y * 64 },
                    xIndex: x,
                    yIndex: y
                })
            );
        }
    });
});
function block2x2Exists(x, y) {
    return (
        placementTilesData2d[y] &&
        placementTilesData2d[y][x] === 14 &&
        placementTilesData2d[y][x + 1] === 14 &&
        placementTilesData2d[y + 1] &&
        placementTilesData2d[y + 1][x] === 14 &&
        placementTilesData2d[y + 1][x + 1] === 14
    );
}



const enemies = []
for (let i = 0 ; i <10 ; i++){

    const xOffset = i * 150

    enemies.push(new Enemy ({
        position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
    }))
}

function animate() {
    requestAnimationFrame(animate);
    c.drawImage(image, 0, 0);

    enemies.forEach(e => e.update());

    let hovered = null;

    // znajdowanie kafelka pod myszą
    placementTiles.forEach(tile => {
        if (tile.isHovered(mouse)) hovered = tile;
    });

    placementTiles.forEach(tile => {
        let highlight = false;

        if (hovered) {
            const hx = hovered.gridX;
            const hy = hovered.gridY;

            if (block2x2Exists(hx, hy)) {
                const x = tile.gridX;
                const y = tile.gridY;

                if (
                    (x === hx     && y === hy) ||
                    (x === hx + 1 && y === hy) ||
                    (x === hx     && y === hy + 1) ||
                    (x === hx + 1 && y === hy + 1)
                ) {
                    highlight = true;
                }
            }
        }

        tile.update(highlight);
    });
}
const tilesPerRow = 20;


image.onload = () => {
    animate();
        
}
const mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect()

    mouse.x = event.clientX - rect.left
    mouse.y = event.clientY - rect.top
})