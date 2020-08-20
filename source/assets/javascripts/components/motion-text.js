window.middlemanStarterKit.MotionText = function MotionText (text, config, height) {
    'use strict';
    this.config = config;
    this.textArray = text.split('');
    this.texts = [];
    this.container = new PIXI.Container();
    this.container.y = height;
    this.initText();
};

window.middlemanStarterKit.MotionText.prototype.initText = function () {
    'use strict';
    var i = 0,
        space = 0,
        single,
        length = this.textArray.length;

    for (i; i < length;  i += 1) {
        single = {};
        single.container = new PIXI.Container(); 
        single.shadow = new PIXI.Text(this.textArray[i],{fontFamily : this.config.font.fontFamily, fontSize: this.config.font.size, fill : this.config.colors.bars, align : 'center'});
        single.current = new PIXI.Text(this.textArray[i],{fontFamily : this.config.font.fontFamily, fontSize: this.config.font.size, fill : this.config.colors.text, align : 'center'});
        single.container.x = space;
        // single.shadow.alpha = 0;
        single.container.addChild(single.shadow);
        single.container.addChild(single.current);
        this.container.addChild(single.container);
        this.texts.push(single);
        space += single.shadow.width + this.config.font.letterSpacing;
    }
};

window.middlemanStarterKit.MotionText.prototype.resize = function (size) {
    'use strict';
    this.container.x = size.width / 2;
    this.container.pivot.x = this.container.width / 2;
};
