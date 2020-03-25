import {Label} from './label'

// x,y = koordinat pojok kiri atas dari kotak
// startX,startY = koordinat ketika dilakukan klik
// width = lebar (positif)
// height = tinggi (positif)
// id = id selection 
// label = label untuk slection dengan id sekian

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
