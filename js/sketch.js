let humans = [], humanKey = []
const numOfHumans = 20
let canvasWidth = 600, canvasHeight = 600, colWidth, rowHeight
const minRadius = 20, maxRadius = 25, minVelocity = -4, maxVelocity = 4, minPulse = 5, maxPulse = 30

/**
 * @function setup():
 * Sets the canvas width & height to that of the window.
 * 
 * Creates a canvas with that width and height.
 * 
 * Sets the background to black
 * 
 * Creates a number of Humans depending on the 
 * numOfHumans variable
 */
function setup() {
    canvasWidth = windowWidth
    canvasHeight = windowHeight

    createCanvas(canvasWidth, canvasHeight)
    background(0)

    for (let i = 0; i < numOfHumans; i++) {
        if(i >= numOfHumans/2) humans.push(new Female(i));
        else humans.push(new Male(i));
    }
}

/**
 * @function draw():
 * Runs every frame
 * 
 * Sets the canvas background to black
 * 
 * Runs the drawGrid function
 * 
 * Runs the mapHumans function
 */
function draw() {
    background(255)
    drawGrid()
    mapHumans()
}

/**
 * @function drawGrid():
 * 
 * @todo find out what the hell this does
 */
function drawGrid() {
    for(let x = 0; x < canvasWidth; x+=colWidth) {
        for(let y = 0; y < canvasHeight; y+=rowHeight) {
            strokeWeight(1)
            line(x, 0, x, height);
            line(0, y, width, y)
        }
    }
}

/**
 * @function mapHumans():
 * 
 * @description
 * For each human run the following functions:
 * @function render()
 * @function checkEdges()
 * @function pulseHuman()
 * @function step()
 */
function mapHumans() {
    humans.forEach(human => {

        human.render();
        human.checkEdges();
        human.pulseHuman()
        human.step();
    });
}