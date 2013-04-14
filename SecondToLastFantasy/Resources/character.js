function Character() {
    var self =quicktigame2d.createSpriteSheet({
        image: 'assets/knight_m.png',
        width: 32,
        height: 48,
        border: 0,
        margin: 1
    });

    // default direction is "RIGHT"
    self.direction = "RIGHT";
    self.animate(8, 4, 250, -1);

    self.halt = function() {
        Ti.API.debug("Halt facing: " + self.direction);
        switch (self.direction) {
        case "UP":
            self.pauseAt(13);
            break;
        case "DOWN":
            self.pauseAt(0);
            break;
        case "LEFT":
            self.pauseAt(4);
            break;
        case "RIGHT":
            self.pauseAt(8);
            break;
        default:
            self.pauseAt(0);
        }
    };

    self.turnTowards = function(newDirection) {
        Ti.API.debug("Moving towards: " + newDirection);

        if (self.direction !== newDirection) {
            switch (newDirection) {
            case "UP":
                self.animate(13, 4, 250, -1);
                break;
            case "DOWN":
                knight.animate(0, 4, 250, -1);
                break;
            case "LEFT":
                knight.animate(4, 4, 250, -1);
                break;
            case "RIGHT":
                knight.animate(8, 4, 250, -1);
                break;
            default:
                knight.animate(0, 4, 250, -1);
            }
            self.direction = newDirection;
        }

    }

	return self;
}




module.exports = Character;