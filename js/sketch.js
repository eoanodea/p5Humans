let humans = [], humanKey = []
const numOfHumans = 20, gridRows = 10, gridCols = 10
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

    smooth()
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

    make2dArray()
    // drawGrid()
    splitIntoGrids()
    checkIntersections()
    mapHumans()
}

/**
 * @function make2dArray():
 * 
 * @todo function description
 */
function make2dArray() {
    humanKey = [];

    for (let i = 0; i < gridRows; i++) {
        humanKey.push([])
        for (let j = 0; j < gridCols; j++) {
            humanKey[i].push([])
        }
    }
}

/**
 * @function splitIntoGrids():
 * 
 * Efficiently checks for intersections 
 * when applicable 
 */
function splitIntoGrids() {

    humans.forEach(function (human) {
        let iNum = floor(human.position.y / canvasHeight);
        let jNum = floor(human.position.x / canvasWidth);
        
        if(iNum<0){iNum=0}
        if(iNum>gridRows-1){iNum=gridRows-1}
        if(jNum<0){jNum=0}
        if(jNum>gridCols-1){jNum=gridCols-1}
        
        humanKey[iNum][jNum].push(human.arrayPosition);

        if (human.position.x % canvasWidth < human.radius && human.position.x > canvasWidth) {    
            humanKey[iNum][jNum - 1].push(human.arrayPosition);
        }
        
        if (human.position.x % canvasWidth > canvasWidth - human.radius && human.position.x < width - canvasWidth) {
            humanKey[iNum][jNum + 1].push(human.arrayPosition);
        }
        
        if (human.position.y % canvasHeight < human.radius && human.position.y > canvasHeight) {   
            humanKey[iNum-1][jNum].push(human.arrayPosition);
        }
        
        if (human.position.y % canvasHeight > canvasHeight - human.radius && human.position.y < height -canvasWidth) {
            humanKey[iNum+1][jNum].push(human.arrayPosition);
        }
    });
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
 * @function checkIntersections()
 * 
 * Checks intersections
 * @todo improve desc
 */
function checkIntersections() {
    for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
            let tempArray = humanKey[i][j];
            let numInArray = tempArray.length
            if (numInArray > 1) {
                for (let z = 0; z < numInArray; z++) {
                    for (let w = z + 1; w < numInArray; w++) {
                        let indexValue01 = tempArray[z];
                        let indexValue02 = tempArray[w];
                        humans[indexValue01].checkIntersecting(indexValue02)
                    }
                }
            }
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
        human.reset()
    });
}

// /**
//  * @function resetHumans()
//  * 
//  * 
//  */
// function resetHumans() {
//     for (let i = 0; i < numOfHumans; i++) {
//         humans[i].reset()
//     }
// }