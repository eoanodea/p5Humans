/**
 * @class Human
 * 
 * Parent class for male and female
 */
class Human {
    constructor() {
        this.radius = random(minRadius,maxRadius);
        this.position = createVector(random(this.radius, width - this.radius * 2), random(this.radius, height - this.radius * 2));
        this.velocity = createVector(random(minVelocity, maxVelocity), random(minVelocity, maxVelocity));
        this.pulse = floor(random(minPulse, maxPulse))
        this.isGrowing = true
        this.stroke = [0, 0, 255, 30]

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
        if(this.isGrowing) this.pulse++
        else this.pulse--

        if (this.pulse > 200) {
            this.isGrowing = false;
        } else if (this.pulse < 100) {
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
        strokeWeight(5)

        push()
            translate(this.position.x,this.position.y)
            ellipse(0, 0, (this.radius*2 + this.pulse), (this.radius*2  + this.pulse));
        pop();
    }
}