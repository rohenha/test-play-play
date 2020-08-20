/* global PIXI */
window.middlemanStarterKit.Motion = function Motion (container, config) {
    'use strict';
    this.container = container;
    this.config = config;
    this.easing = {
        easing: 0.55 + Math.random() * 0.065,
        friction: 0.09 + Math.random() * 0.05
    };
    this.init();
};

window.middlemanStarterKit.Motion.prototype.init = function () {
    'use strict';
    this.canvas = this.container.querySelector('#canvas');
    this.resize();
    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;
    this.app = new PIXI.Application({
        antialias: true,
        autoResize: true,
        autoStart: true,
        backgroundColor: this.config.colors.background,
        height: this.size.height,
        resolution: window.devicePixelRatio,
        transparent: false,
        view: this.canvas,
        width: this.size.width
    });
    window.addEventListener('resize', this.resize.bind(this));
    this.app.ticker.add(this.animate.bind(this));
    this.setElements();
};

window.middlemanStarterKit.Motion.prototype.setElements = function () {
    'use strict';
    this.background = new window.middlemanStarterKit.MotionBackground(this.app, this.config);
    this.textContainer = new window.middlemanStarterKit.MotionTextContainer(this.container, this.app, this.config);
    this.resizeElements();
};

window.middlemanStarterKit.Motion.prototype.resizeElements = function () {
    'use strict';
    var i = 0,
        length = this.textContainer.texts.length;

    for (i; i < length; i += 1) {
        this.textContainer.resize(this.size);
    }
    this.background.resize(this.size);
};

window.middlemanStarterKit.Motion.prototype.resize = function () {
    'use strict';
    this.size = {
        height: window.innerHeight,
        width: window.innerWidth
    };

    if (this.app) {
        this.app.renderer.resize(this.size.width, this.size.height);
        this.resizeElements();
    }
};

window.middlemanStarterKit.Motion.prototype.animate = function () {
    'use strict';
    this.textContainer.animate();
    // if (this.image && this.image.loaded) {
    //     this.image.animate();
    // }
};
