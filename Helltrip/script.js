const waypoints = [{ x: 400, y: 400 }];
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 768
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height,)
const image = new Image()
image.onload = () => {
	animate()
}
image.src = 'media/map.png'

class Enemy {
	constructor({ position }) {
		this.position = position
		this.width = 100
		this.height = 100
	}

	draw() {
		c.fillStyle = 'red'
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
	update() {
		this.draw()

		const waypoint = waypoints[0]
		const xDistance = waypoint.x - this.position.x
		const yDistance = waypoint.y - this.position.y
		const angle = Math.atan2(yDistance, xDistance)
		this.position.x += Math.cos(angle)
		this.position.y += Math.sin(angle)
	}
}

const enemy = new Enemy({ position: { x: 200, y: 400 } })
const enemy2 = new Enemy({ position: { x: 0, y: 400 } })

function animate() {
	window.requestAnimationFrame(animate)

	c.drawImage(image, 0, 0)
	enemy.update()
}

