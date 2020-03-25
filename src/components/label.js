export class Label {
    constructor() {
        this.name = '';
        this.posX = 0;
        this.posY = 0;
    }

    setLabelName(name) {
        this.name = name;
    }
    setLabelPosition(x,y) {
        this.posX = x;
        this.posY = y;
    }
}
