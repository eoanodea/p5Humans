
let humans = [], humanKey = []
const numOfHumans = 50, gridRows = 10, gridCols = 10
let gridWidth, gridHeight, intersectCount = 0;
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

    createCanvas(windowWidth, windowHeight)
    background(0)

    gridWidth = width / gridCols
    gridHeight = height / gridRows

    for (let i = 0; i < numOfHumans; i++) {
        if(i >= numOfHumans/2) humans.push(new Female(i));
        else humans.push(new Male(i));
    }

    gridify()

    // noLoop()

    smooth()
}

/**
 * @function gridify()
 * 
 * Spawns the molecules evenly within
 * the canvas
 * 
 */
function gridify() {
    const iNum = ceil(sqrt(numOfHumans))
    const jNum = iNum

    const gridX = width / iNum + 1
    const gridY = height / jNum + 1

    humans.map((dat, i) => {
        let iPos = i%iNum
        let jPos = floor(i/jNum)

        dat.position.x = iPos * gridX + 50
        dat.position.y = jPos * gridY + 50
    })

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
    background(0)
    make2dArray()
    splitIntoGrids()
    drawGrid()
    mapHumans()
    checkIntersections()
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
        let iNum = floor(human.position.y / gridHeight);
        let jNum = floor(human.position.x / gridWidth);
        
        if(iNum<0){iNum=0}
        if(iNum>gridRows-1){iNum=gridRows-1}
        if(jNum<0){jNum=0}
        if(jNum>gridCols-1){jNum=gridCols-1}
        
        humanKey[iNum][jNum].push(human.arrayPosition);

        //Left
        if (human.position.x % width < human.radius && human.position.x > width) {    
            humanKey[iNum][jNum - 1].push(human.arrayPosition);
            human.left = true
        }
        
        //Right
        if (human.position.x % width > width - human.radius && human.position.x < width - width) {
            humanKey[iNum][jNum + 1].push(human.arrayPosition);
            human.right = true
        }
        
        //Bottom
        if (human.position.y % height < human.radius && human.position.y > height) {   
            humanKey[iNum-1][jNum].push(human.arrayPosition);
            human.bottom = true
        }
        
        //Top
        if (human.position.y % height > height - human.radius && human.position.y < height -width) {
            humanKey[iNum+1][jNum].push(human.arrayPosition);
            human.top = true
        }

        //top left +1 -1
        if(human.top && human.left) humanKey[iNum+1][jNum-1].push(human.arrayPosition);

        //top right +1 + 1
        if(human.top && human.right) humanKey[iNum+1][jNum+1].push(human.arrayPosition);

        //bottom left -1 -1
        if(human.bottom && human.left) humanKey[iNum-1][jNum-1].push(human.arrayPosition);

        //bottom right -1 +1
        if(human.bottom && human.right) humanKey[iNum-1][jNum+1].push(human.arrayPosition);
    });
}

/**
 * @function drawGrid():
 * 
 * Draws the grid depending on gridRows and gridCols
 */
function drawGrid() {
    for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
            noFill();
            strokeWeight(1)
            stroke(0, 244, 0, 50);
            rect(j * gridWidth, i * gridHeight, gridWidth, gridHeight);

            let intersectCount = 0;

            let tempArray = humanKey[i][j];
            let numArray = tempArray.length;

            tempArray.forEach(function (indexValue) {

                if (humans[indexValue].intersecting == true) {
                    intersectCount++
                }
            })

            // if (numArray == 0) {
            //     numArray = ""
            // }

            noStroke();
            fill(200, 200, 200, 200);
            textSize(16);
            textAlign(RIGHT);
            text(numArray, j * gridWidth + gridWidth - 5, i * gridHeight + 20);

            fill(200, 200, 200, 200);
            text(intersectCount, j * gridWidth + gridWidth - 5, i * gridHeight + gridHeight - 5);

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

        human.step();
        human.checkEdges();
        human.pulseHuman()
        human.render();
        human.reset()
    });
}
