import {Label} from './label'
 class Selection{
    constructor(id,startX,startY) {
        
        this.id = id;
        this.startX = startX;
        this.startY = startY;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.label = new Label()
    }

    setCoordinates(x,y) {
        this.x = x;
        this.y = y;
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    getStartX() {
        return this.startX;
    }

    getStartY() {
        return this.startY;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}

export default Selection
