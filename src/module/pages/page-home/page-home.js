// CSS
require('./page-home.scss');

// SVG
require('../../components/svg/svg.js');

// COMPONENTS
// import LocalStorage from '../../components/local-storage/local-storage.js';

// INIT
var localStorage = new LocalStorage(),

    Vue = require('vue'),

    vm = new Vue({

    el: '#vue',

    methods: {
        getData: function() {
            return nspccDataModel;
        },

        getLocalStorage: function() {
            return localStorage;
        }
    },

    ready: function() {
        this.getLocalStorage();
    },

    components: {
        'cookie-component': require('../../components/cookie/cookie.js'),
        'header-component': require('../../components/header/header.js'),
        'hero-component': require('../../components/hero/hero.js'),
        'question-form-component': require('./__include/question-form/question-form.js'),
        'footer-component': require('../../components/footer/footer.js')
    }
});
