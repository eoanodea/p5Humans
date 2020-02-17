/**
 * @class Human
 * 
 * Parent class for male and female
 */
class Human {
    constructor(_i) {
        this.radius = random(minRadius,maxRadius);
        this.position = createVector(random(this.radius, width - this.radius * 2), random(this.radius, height - this.radius * 2));
        this.arrayPosition = _i
        this.velocity = createVector(random(minVelocity, maxVelocity), random(minVelocity, maxVelocity));
        this.pulse = floor(random(minPulse, maxPulse))
        this.isGrowing = true
        this.rateOfPulse = 5
        this.intersecting = false
        this.stroke = [0, 0, 255, 30]
        this.bounce = false
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
        fill(0);
        strokeWeight(5)

        push()
            translate(this.position.x,this.position.y)
            ellipse(0, 0, (this.radius*2 + this.pulse), (this.radius*2  + this.pulse));
        pop();
    }

    /**
     * @function checkIntersecting()
     * 
     * @param {*_indexValue} _indexValue 
     */
    checkIntersecting(_indexValue) {
        let dist = p5.Vector.sub(this.position, humans[_indexValue].position);
        //console.log(dist)
        if (dist.mag() < this.radius + humans[_indexValue].radius) {
            console.log("changed")
            this.intersecting = true;
            humans[_indexValue].intersecting = true;
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
            }
        }
    }

    /**
     * @function reset():
     * 
     * Resets the intesection
     */
    reset() {
        this.intersecting = false
    }
}
