// x,y = koordinat pojok kiri atas dari kotak
// startX,startY = koordinat ketika dilakukan klik
// width = lebar (positif)
// height = tinggi (positif)
// id = id selection 
// label = label untuk slection dengan id sekian

 class Selection{
    constructor(id) {
        
        this.id = id;
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;
        this.label = '';
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

    setLabel(label) {
        this.label = label;
    }

    getX() {
        return this.x;        
    }

    getY() {
        return this.y;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getId() {
        return this.id;
    }

    getLabel() {
        return this.label;
    }
    
    empty(){
        // return isNaN(this.height) && isNaN(this.width);
        return this.height === 0 && this.width === 0;
    }
}

export default Selection
