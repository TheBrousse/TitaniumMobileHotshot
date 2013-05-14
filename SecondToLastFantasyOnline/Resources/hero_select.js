var heroes = [
    "archer_m_preview.png",
    "dancer_preview.png",
    "dragoon_m_preview.png",
    "knight_f_preview.png",
    "knight_m_preview.png",
    "mediator_f_preview.png",
    "onionknight_m_preview.png",
    "pirate_f_preview.png",
    "redmage_m_preview.png",
    "squire_f_preview.png",
    "squire_m_preview.png",
    "summoner_f_preview.png"
];

function HeroSelectionView() {
    var self = Ti.UI.createView({
        backgroundColor: 'black',
        opacity: 0.9,
        height: '80%'
    });

    var title = Ti.UI.createLabel({
        text: 'Select Player',
        top: 0,
        width: '100%',
        height: Ti.UI.SIZE,
        backgroundColor: 'blue',
        color: 'white',
        font: {
            fontSize: '25sp',
            fontWeight: 'bold'
        }
    });

    self.add(title);

    // Fill all the images of the Scolling view
    var heroImages = [];

    for (var i in heroes) {
        var img = Ti.UI.createImageView({
            image: 'assets/' + heroes[i],
            height: 250,
            width: 168,
            backgroundColor: 'blue'
        });

        heroImages.push(img);
    }

    scrollableHeroes = Ti.UI.createScrollableView({
        top: 40,
        height: '75%',
        showPagingControl: true,
        views: heroImages
    });

    self.add(scrollableHeroes);

    var btn = Ti.UI.createButton({
        title: 'Start Game',
        bottom: 20
    });

    self.add(btn);

    btn.addEventListener('click', function(e) {
        self.hide();
    });

    return self;
}

module.exports = HeroSelectionView;
