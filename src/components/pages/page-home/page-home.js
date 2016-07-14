
// COMPONENTS
// import LocalStorage from '../../components/local-storage/local-storage.js';

// INIT
var Vue = require('vue');

new Vue({

    el: '#vue',

    methods: {
        getData: function() {
            return {};
        },

        getLocalStorage: function() {
            return {};
        }
    },

    ready: function() {
        // this.getLocalStorage();

        console.log('THIS IS WORKING')
    },

    components: {
        'cookie-component': require('../../common/cookie/cookie.js'),
        'header-component': require('../../common/header/header.js'),
        'hero-component': require('../../common/hero/hero.js'),
        'question-form-component': require('./__include/question-form/question-form.js'),
        'footer-component': require('../../common/footer/footer.js')
    }
});

// CSS ------------------------------------------------
require('../../../assets/css/style.css');
require('../../common/cookie/cookie.css');
require('../../common/header/header.css');
require('../../common/hero/hero.css');
require('./page-home.css');
require('./__include/question-form/question-form.css');
require('../../common/footer/footer.css');



// SVG ------------------------------------------------
require('../../common/svg/svg.js');
