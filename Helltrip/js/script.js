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
          position: {
            x: x * 64,
            y: y * 64
          }
        })
      )
    }
  })
})




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

    enemies.forEach(enemy => enemy.update());

    const tilesPerRow = 20;
    let hoveredIndex = -1;

    // 1. znajdź kafelek pod myszką
    placementTiles.forEach((tile, i) => {
        if (tile.isHovered(mouse)) hoveredIndex = i;
    });

    placementTiles.forEach((tile, i) => {
        let highlight = false;

        if (hoveredIndex !== -1) {

            // Indeksy dla 2×2
            const A = hoveredIndex;
            const B = hoveredIndex + 1;
            const C = hoveredIndex + tilesPerRow;
            const D = hoveredIndex + tilesPerRow + 1;

            // 2. sprawdź, czy A,B,C,D są w jednym bloku (nie przechodzą do następnego wiersza)
            const sameRow = Math.floor(A / tilesPerRow) === Math.floor(B / tilesPerRow);
            const sameRowBelow = Math.floor(C / tilesPerRow) === Math.floor(D / tilesPerRow);

            // 3. sprawdź, czy wszystkie index-y istnieją
            const exists =
                placementTiles[A] &&
                placementTiles[B] &&
                placementTiles[C] &&
                placementTiles[D];

            // 4. jeśli wszystko OK → podświetl 2×2
            if (sameRow && sameRowBelow && exists) {
                if (i === A || i === B || i === C || i === D) {
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