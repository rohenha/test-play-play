/* global PIXI */
//= require_self
//= require pixi.js/dist/pixi.min
//= require gsap/dist/PixiPlugin.min
//= require gsap/dist/EasePack.min
//= require gsap/dist/gsap.min
//= require_tree ./pages
//= require_tree ./components
//= require _app

window.middlemanStarterKit = {};
window.middlemanStarterKit.pages = {};
document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    gsap.registerPlugin(PixiPlugin);
    PIXI.utils.skipHello();
    window.middlemanStarterKit.app.init();
});