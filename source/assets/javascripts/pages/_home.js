window.middlemanStarterKit.pages.home = {
    init: function () {
        'use strict';
        var container = document.querySelector('#page__home');
        console.log('home init');
        this.motion =  new window.middlemanStarterKit.Motion(container, {
            text: "Creative developer||at Play Play",
            colors: {
                background: "0x153b6e",
                bars: "0x7cc4b3",
                text: "0xFFFFFF"
            },
            font: {
                fontFamily: 'Arial',
                letterSpacing: 0,
                lineHeight: -10,
                size: 50
            },
            bars: {
                height: 30,
                width: 4
            }
        });
    },

    invoke: function () {
        'use strict';
        return {
            init: this.init.bind(this)
        };
    }

}.invoke();
