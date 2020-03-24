
/**
 * @class Male
 * 
 * Inherits from @class Human
 */
class Male extends Human {
    constructor(_i) {
        super(_i)
        this.stroke = [0, 0, 200, 100]
        this.health = 0;
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
        if(otherMolecule.constructor.name == "Female") {
            const randomNum = random()
            //25% chance of this happening
            if(randomNum < 0.25) {
                console.log('infecting', otherMolecule.arrayPosition)
                humans[otherMolecule.arrayPosition] = new Male(otherMolecule.arrayPosition)
                humans[otherMolecule.arrayPosition].position = otherMolecule.position
                humans[otherMolecule.arrayPosition].velocity = otherMolecule.velocity
                humans[otherMolecule.arrayPosition].radius = otherMolecule.radius
            }
        }
    }

    render() {
        super.render()

        this.intersecting
        ? this.stroke = [0, 200, 200, 200]
        : this.stroke = [0, 0, 200, 200]
    }
}