
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
    }

    /**
     * @function checkHealth()
     * 
     * Replaces the opposite class with this class
     * 
     * @param {*} _indexValue 
     */
    checkHealth(_indexValue) {
        let otherMolecule = humans[_indexValue]
        if(otherMolecule.constructor.name == "Male") {
            const randomNum = random()
            //25% chance of this happening
            if(randomNum < 0.25) {
                console.log('infecting', this.arrayPosition)
                humans[this.arrayPosition] = new Male(this.arrayPosition)
                humans[this.arrayPosition].position = this.position
                humans[this.arrayPosition].velocity = this.velocity
                humans[this.arrayPosition].radius = this.radius
            }
        }
    }

    render() {
        super.render()

        this.intersecting
        ? this.stroke = [200, 200, 0, 100]
        : this.stroke = [250, 0, 0, 100]
    }
}