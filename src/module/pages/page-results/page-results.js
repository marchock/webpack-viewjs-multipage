
// CSS
require('./page-results.scss');

// COMPONENTS
//import LocalStorage from '../../components/local-storage/local-storage.js';

// INIT
var localStorage = new LocalStorage(),

    Vue = require('vue'),

    vm = new Vue({

    el: '#vue',

    methods: {
        getData: function() {
            return nspccDataModel;
        },

        restartAssessment: function (e) {
            e.preventDefault();
            localStorage.save([]);
            window.location.href = '/';
        },

        getNumberOfQuestionsCompleted: function () {
            this.noq = localStorage.getNoq();
        }
    },

    data: function () {
        return {
            nspccModel: {},
            intro: {},
            results: {},
            noq: 0
        }
    },

    components: {
        'cookie-component': require('../../components/cookie/cookie.js'),
        'header-component': require('../../components/header/header.js'),
        'hero-component': require('../../components/hero/hero.js'),
        'slider-component': require('../../components/slider/slider-related-topics.js'),
        'footer-component': require('../../components/footer/footer.js')
    },

    ready: function() {
        var me = this;

        this.getNumberOfQuestionsCompleted();

        nspccDataModel.resultsPageContent(function (data) {
            me.intro = data.intro;
            me.results = data.results;
        });
    }

});