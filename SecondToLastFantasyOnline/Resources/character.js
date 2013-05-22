function Character(scene, spriteSheet) {

    var self = quicktigame2d.createSpriteSheet({
        image: 'assets/' + spriteSheet,
        width: 32,
        height: 48,
        border: 0,
        margin: 1
    });

    var textsprite = quicktigame2d.createTextSprite({
        text: 'Lorem ipsum dolor sit amet', 
        fontFamily: 'Verdana',
        fontSize: 14, 
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        z: 2
    });
    
    textsprite.color(0, 0, 1);
    textsprite.hide();
    
    self.halt = function() {
        // Ti.API.debug("Halt facing: " + self.direction);
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
        // Ti.API.debug("Moving towards: " + newDirection);

        if (self.direction !== newDirection) {
            switch (newDirection) {
            case "UP":
                self.animate(13, 4, 250, -1);
                break;
            case "DOWN":
                self.animate(0, 4, 250, -1);
                break;
            case "LEFT":
                self.animate(4, 4, 250, -1);
                break;
            case "RIGHT":
                self.animate(8, 4, 250, -1);
                break;
            default:
                self.animate(0, 4, 250, -1);
            }
            self.direction = newDirection;
        }
    }

    self.say = function(caption) {
        textsprite.text = caption;
        
        textsprite.x = self.x -(textsprite.width * 0.5);
        textsprite.y = self.y - textsprite.height - 15;
        
        textsprite.show();
        
        setTimeout(function() { textsprite.hide() }, 5000);
    }

    scene.add(self);
    scene.add(textsprite);
    
	return self;
}

module.exports = Character;