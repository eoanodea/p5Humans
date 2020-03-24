/**
 * @class Human
 * 
 * Parent class for male and female
 */
class Human {
    constructor(_i) {
        this.radius = random(minRadius,maxRadius);
        this.position = createVector(0,0);
        this.arrayPosition = _i
        this.velocity = createVector(random(minVelocity, maxVelocity), random(minVelocity, maxVelocity));
        this.pulse = floor(random(minPulse, maxPulse))
        this.isGrowing = true
        this.rateOfPulse = 3
        this.intersecting = false
        this.stroke = [0, 0, 255, 30]
        this.bounce = true
        this.left = false
        this.right = false
        this.top = false
        this.bottom = false
    }

    /**
     * @function step():
     * 
     * Adds velocity to the position
     */
    step() {
        this.position.add(this.velocity);
    }

    /**
     * @function pulseHuman():
     * 
     * If the pulse >= maxPulse, decrement the pulse value
     * if it is <= minPulse, increment the value
     * 
     */
    pulseHuman() {
        if(this.isGrowing) (this.pulse+=this.rateOfPulse)
        else this.pulse--

        if (this.pulse > maxPulse) {
            this.isGrowing = false;
        } else if (this.pulse < minPulse) {
            this.isGrowing = true;
        }
    }

    /**
     * @function checkEdges():
     * 
     * Ensures the position of the human is within
     * the canvas
     */
    checkEdges() {
        if(this.position.x < 0 || this.position.x > width){
            this.velocity.x = this.velocity.x * -1
        }
        
        if(this.position.y < 0 || this.position.y > height){
            this.velocity.y = this.velocity.y * -1
        }
    }

    /**
     * @function render():
     * 
     * Runs every frame and draws the Human
     */
    render() {
        
        stroke(this.stroke.map(dat => dat));
        fill(0, 0, 0, 0);
        strokeWeight(5)

        push()
            translate(this.position.x,this.position.y)
            ellipse(0, 0, (this.radius*2 + this.pulse), (this.radius*2  + this.pulse));

            fill(255)
            textSize(30)
            textAlign(CENTER, CENTER)
            text(this.arrayPosition, 0, 0)
        pop();
    }

    /**
     * @function checkIntersecting()
     * 
     * Checks the intersection of the current molecule
     * against another molecule 
     * 
     * Draws a line between the two intersecting molecules
     * 
     * @param {*_indexValue} _indexValue 
     */
    checkIntersecting(_indexValue) {
        let dist = p5.Vector.sub(this.position, humans[_indexValue].position);
        
        if (dist.mag() < this.radius + humans[_indexValue].radius) {
            
            this.intersecting = true;
            humans[_indexValue].intersecting = true;

            stroke(255)
            strokeWeight(3)
            line(
                this.position.x, this.position.y, 
                humans[_indexValue].position.x, humans[_indexValue].position.y)


            if (this.bounce) {

                let dx = this.position.x - humans[_indexValue].position.x;
                let dy = this.position.y - humans[_indexValue].position.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                let normalX = dx / dist;
                let normalY = dy / dist;

                let midpointX = (this.position.x.x + humans[_indexValue].position.x) / 2;
                let midpointY = (this.position.x.y + humans[_indexValue].position.y) / 2;

                let dVector = (this.velocity.x - humans[_indexValue].velocity.x) * normalX;
                dVector += (this.velocity.y - humans[_indexValue].velocity.y) * normalY;

                let dvx = dVector * normalX;
                let dvy = dVector * normalY;

                this.velocity.x -= dvx;
                this.velocity.y -= dvy;
                humans[_indexValue].velocity.x += dvx;
                humans[_indexValue].velocity.y += dvy;

                this.moveBall(_indexValue)
            }

            return true
        }
    }

    /**
     * @function moveBall()
     * 
     * @description ensures two humans will not overlap with eachother
     * Takes a parameter of the ID of the second human
     * 
     * @param _indexValue
     * 
     */
    moveBall(_indexValue) {
        const dist = p5.Vector.sub(this.position, humans[_indexValue].position);

        const heading  = dist.heading()
        const moveDistance  = (abs(dist.mag() - this.radius - humans[_indexValue].radius) / 2)

        const dx = moveDistance * (Math.cos(heading))
        const dy = moveDistance * (Math.sin(heading))

        this.position.x += dx
        this.position.y += dy

        humans[_indexValue].position.x -= dx
        humans[_indexValue].position.y -= dy
    }

    /**
     * @function reset():
     * 
     * Resets the intesection
     */
    reset() {
        this.intersecting = false
        this.left = false
        this.right = false
        this.top = false
        this.bottom = false
    }
}
