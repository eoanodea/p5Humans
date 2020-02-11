
/**
 * @class Male
 * 
 * Inherits from @class Human
 */
class Male extends Human {
    constructor(_i) {
        super(_i)
        this.stroke = [0, 0, 200, 100]
        this.bounce = true
    }

    render() {
        super.render()

        this.intersecting
        ? this.stroke = [0, 200, 200, 60]
        : this.stroke = [0, 0, 200, 100]
    }
}