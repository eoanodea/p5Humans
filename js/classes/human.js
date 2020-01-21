class Human {
    constructor() {
        this.radius = random(minRadius,maxRadius);
        this.position = createVector(random(this.radius, width - this.radius * 2), random(this.radius, height - this.radius * 2));
        this.velocity = createVector(random(minVelocity, maxVelocity), random(minVelocity, maxVelocity));
        this.pulse = floor(random(minPulse, maxPulse))
        this.stroke = [0, 0, 255, 30]
    }

    step() {
        this.position.add(this.velocity);
    }

    pulseHuman() {
        if(this.pulse >= maxPulse) this.pulse--
        else if(this.pulse <= minPulse ) this.pulse++
    }

    checkEdges() {
        if(this.position.x < 0 || this.position.x > width){
            this.velocity.x = this.velocity.x * -1
        }
        
        if(this.position.y < 0 || this.position.y > height){
            this.velocity.y = this.velocity.y * -1
        }
    }

    render() {
        stroke(this.stroke.map(dat => dat));
        strokeWeight(5)

        push()
            translate(this.position.x,this.position.y)
            ellipse(0, 0, (this.radius*2 + this.pulse), (this.radius*2  + this.pulse));
        pop();
        
    }
}