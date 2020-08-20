/*global SteppedEase */
window.middlemanStarterKit.MotionBackground = function MotionBackground (app, config) {
    'use strict';
    this.app = app;
    this.config = config;
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.elements = [];
    this.init();
    this.setAnimation();
};

window.middlemanStarterKit.MotionBackground.prototype.init = function () {
    'use strict';
    var i = 0,
        sprite,
        graphic,
        length = 100;

    for(i; i < length; i += 1) {
        graphic = new PIXI.Graphics();
        graphic.beginFill(this.config.colors.bars);
        graphic.drawRect(0, 0, this.config.bars.width, this.config.bars.height);
        graphic.endFill();
        sprite = new PIXI.Sprite(this.app.renderer.generateTexture(graphic));
        sprite.anchor.set(0.5, 0.5);
        this.container.addChild(sprite);
        this.elements.push({
            graphic: graphic,
            sprite: sprite
        });
    }
};

window.middlemanStarterKit.MotionBackground.prototype.resize = function (size) {
    'use strict';
    var i = 0,
        single,
        x = 0,
        y = 0,
        delta = 130,
        length = this.elements.length;

    for (i; i < length; i += 1) {
        single = this.elements[i];
        single.sprite.x = x + this.randomDelta();
        single.sprite.y = y + this.randomDelta();
        single.sprite.rotation = this.randomRotation(180);
        
        x += delta;
        if (x > size.width) {
            x = 0;
            y += delta;
        }
    }
};

window.middlemanStarterKit.MotionBackground.prototype.randomDelta = function () {
    'use strict';
    return Math.floor(Math.random() * 40 - 20);
};

window.middlemanStarterKit.MotionBackground.prototype.randomRotation = function (angleMax) {
    'use strict';
    return Math.floor(Math.random() * angleMax);
};

window.middlemanStarterKit.MotionBackground.prototype.setAnimation = function () {
    'use strict';
    var i = 0,
    single,
    sens,
    length = this.elements.length;

    this.timeline = new TimelineMax({ repeat: -1 });
    this.timeline.add('start');
    for (i; i < length; i += 1) {
        single = this.elements[i];
        sens = Math.random() > 0.5 ? '+=' : '-=';
        this.timeline.to(single.sprite, 1, { pixi: { rotation: sens + (this.randomRotation(30) + 5) }, ease: SteppedEase.config(1) }, 'start');
    }
    this.timeline.play();
};

