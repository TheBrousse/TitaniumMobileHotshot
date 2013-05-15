function ChatView() {
    var self = Ti.UI.createView({
        backgroundColor: 'black',
        opacity: 0.9,
        height: '30%',
        zIndex: 100,
        visible: false
    });

    var title = Ti.UI.createLabel({
        text: 'You hero will speak!',
        top: 0,
        width: '100%',
        height: Ti.UI.SIZE,
        backgroundColor: '#4B0082',
        color: 'white',
        font: {
            fontSize: '25sp',
            fontWeight: 'bold'
        }
    });

    self.add(title);

    var txtSay = Ti.UI.createTextArea({
        top: 37,
        width: '90%',
        height: 75,
        borderWidth: 3,
        borderRadius: 4,
        borderColor: '#fff',
        color: '#fff',
        backgroundColor: '#000',
        maxLength: 45,
        hintText: 'Enter caption here',
        font: {
            fontSize: '22sp'
        }
    });

    self.add(txtSay);

    var btnSay = Ti.UI.createButton({
        title: 'Say It!',
        bottom: 7
    });

    self.add(btnSay);

    btnSay.addEventListener('click', function(e) {
       self.hide();
    });

    return self;
}

module.exports = ChatView;
