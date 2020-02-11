
/**
 * @class Female
 * 
 * Inherits from @class Human
 */
class Female extends Human {
    constructor(_i) {
        super(_i)
        this.stroke = [250, 0, 0, 100]
        this.rateOfPulse = 0.1
        this.bounce = true
    }

    render() {
        super.render()

        this.intersecting
        ? this.stroke = [200, 200, 0, 100]
        : this.stroke = [250, 0, 0, 100]
    }
}