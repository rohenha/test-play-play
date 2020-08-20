window.middlemanStarterKit.MotionTextContainer = function MotionTextContainer (container, app, config) {
    'use strict';
    this.texture = container.querySelector('.js-clouds').src;
    this.app = app;
    this.config = config;
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.parts = this.config.text.split('||');
    this.texts = [];
    this.setFilter();
    this.initText();
    this.timeline = new TimelineMax({ delay: 2, paused: true });
    this.setArray();
    this.setAnimation('shadow', { pixi:{ alpha: 0 } }, { pixi:{ alpha: 0.7 } });
    this.setAnimation('current', { pixi:{ alpha: 0 } }, { pixi:{ alpha: 1 } });
    this.timeline.play();
};

window.middlemanStarterKit.MotionTextContainer.prototype.setFilter = function () {
    this.filterSprite = new PIXI.Sprite.from(this.texture);
    this.filterSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this.filter = new PIXI.filters.DisplacementFilter(this.filterSprite);
    this.filter.autoFit = true;
    this.container.filters = [];
    this.app.stage.addChild(this.filterSprite);
    this.container.filters.push(this.filter);
    this.filter.scale.x = 10;
    this.filter.scale.y = 10;
};

window.middlemanStarterKit.MotionTextContainer.prototype.initText = function () {
    'use strict';
    var i = 0,
        single,
        height = 0,
        length = this.parts.length;
    for (i; i < length; i += 1) {
        single = new window.middlemanStarterKit.MotionText(this.parts[i], this.config, height);
        this.texts.push(single);
        this.container.addChild(single.container);
        height += single.texts[i].shadow.height + this.config.font.lineHeight;
    }
};

window.middlemanStarterKit.MotionTextContainer.prototype.resize = function (size) {
    'use strict';
    var i = 0,
        length = this.texts.length;
    this.container.y = size.height / 2;
    this.container.pivot.y = this.container.height / 2;
    for (i; i < length; i += 1) {
        this.texts[i].resize(size);
    }
};

window.middlemanStarterKit.MotionTextContainer.prototype.animate = function () {
    'use strict';
    this.filterSprite.x += 1;
    this.filterSprite.y += 1;
};

window.middlemanStarterKit.MotionTextContainer.prototype.setArray = function (state) {
    'use strict';
    var i = 0,
        length = this.texts.length;
    this.allCharacters = [];
    for (i; i < length; i += 1) {
        this.allCharacters = this.allCharacters.concat(this.texts[i].texts);
    }
};

window.middlemanStarterKit.MotionTextContainer.prototype.setAnimation = function (state, from, to) {
    'use strict';
    var i = 0,
        array = this.allCharacters.slice(0),
        element,
        delay,
        index,
        time = 0.1,
        length = array.length;

    for (i; i < length; i += 1) {
        index = Math.floor(Math.random() * array.length);
        element = array[index];
        delay = Math.random() * i * time;
        this.timeline.fromTo(element[state], time, from, to, delay);
        array.splice(index, 1);
    }
};


