function Star() {
	this.x = random(-width, width)/2;
	this.y = random(-height, height)/2;
	this.z = random(width);
	this.pz = this.z;

	this.update = function() {
		this.z = this.z - speed
        
		if(this.z < 1){
            this.z = width;
            this.x = random(-width, width) / 2;
            this.y = random(-height, height) / 2;
            this.pz = this.z;
		}
	}

    this.show = function() {

        fill(255);

        var sx = map(this.x / this.z, 0, 1, 0, width) / 2;
        var sy = map(this.y / this.z, 0, 1, 0, height) / 2;

        var px =map(this.x / this.pz, 0, 1, 0, width) / 2;
        var py =map(this.y / this.pz, 0, 1, 0, height) / 2;

        this.pz = this.z;

        stroke(255)
        line(px, py, sx, sy);


    }

}