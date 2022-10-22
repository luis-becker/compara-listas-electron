export class TwoListsComparator {
    #listA = []
    #listB = []
    #isEqual

    constructor(listA, listB, isEqual) {

        if (!(listA instanceof Array) || !(listB instanceof Array)) {
            throw new Error("Invalid parameter in the TwoListComparator contructor");
        }

        this.#listA = listA;
        this.#listB = listB;
        this.#isEqual = isEqual;
    }

    get a() {
        return this.#listA;
    }

    get b() {
        return this.#listB;
    }

    get isEqual() {
        return this.#isEqual;
    }

    set a(list) {
        if (!(list instanceof Array)) {
            throw new Error("Trying to list A with an invalid object");
        }
        this.#listA = list;
    }

    set b(list) {
        if (!(list instanceof Array)) {
            throw new Error("Trying to list B with an invalid object");
        }
        this.#listB = list;
    }

    set isEqual(func) {
        if (!(func instanceof Function)) {
            throw new Error("Trying to set isEqual with an invalid object");
        }
        this.#isEqual = func;
    }

    duplicated() {
        if(!this.#isEqual){
            return this.#listA.filter(e => this.#listB.includes(e));
        }
        return this.#listA.filter(eA => {
            for (let i = 0; i < this.#listB.length; i++) {
                const eB = this.#listB[i];
                if(this.#isEqual(eA, eB)){
                    return true;
                }
            }
            return false;
        }).sort();
    }

    exclusivesA() {
        if(!this.#isEqual){
            return this.#listA.filter(e => !this.#listB.includes(e));
        }
        return this.#listA.filter(eA => {
            for (let i = 0; i < this.#listB.length; i++) {
                const eB = this.#listB[i];
                if(this.#isEqual(eA, eB)){
                    return false;
                }
            }
            return true;
        }).sort();
    }

    exclusivesB() {
        if(!this.#isEqual){
            return this.#listB.filter(e => !this.#listA.includes(e));
        }
        return this.#listB.filter(eB => {
            for (let i = 0; i < this.#listA.length; i++) {
                const eA = this.#listA[i];
                if(this.#isEqual(eB, eA)){
                    return false;
                }
            }
            return true;
        }).sort();
    }

    union() {
        let result = [];
        result = result.concat(this.duplicated());
        result = result.concat(this.exclusivesA());
        result = result.concat(this.exclusivesB());
        return result.sort();
    }

}