class Calculator {
    constructor(num) {
        this.num = num
    }
    add = function(a) {
        this.add = a
        this.addStart = this.num
        if (this.add !==null && this.add !==undefined) {
            this.num = this.num + a
            this.addResult = this.num
        }
        return this
    }
    subtract = function(a) {
        this.sub = a
        this.subStart = this.num
        if (this.sub !==null && this.sub !==undefined) {
            this.num = this.num - a
            this.subResult = this.num
        }
        return this
    }
    multiply = function(a) {
        this.mul = a
        this.mulStart = this.num
        if (this.mul !==null && this.mul !==undefined) {
            this.num = this.num * a
            this.mulResult = this.num
        }
        return this
    }
    divide = function(a) {
        this.div = a
        this.divStart = this.num
        if (this.div !==null && this.div !==undefined) {
            this.num = this.num / a
            this.divResult = this.num
        }
        return this
    }
    value = function () {
        if (typeof (this.add) === 'number') {
            console.log(`${this.addStart} + ${this.add} = ${this.addResult}`)
        }
        if (typeof (this.sub) === 'number') {
            console.log(`${this.subStart} - ${this.sub} = ${this.subResult}`)
        }
        if (typeof (this.mul) === 'number') {
            console.log(`${this.mulStart} x ${this.mul} = ${this.mulResult}`)
        }
        if (typeof (this.div) === 'number') {
            console.log(`${this.divStart} ÷ ${this.div} = ${this.divResult}`)
        }
    }
}

const calculator = new Calculator (0)
calculator.add(5).subtract(2).multiply(5).divide(3)
calculator.value()