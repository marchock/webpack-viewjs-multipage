
// CSS
require('./page-results.css');

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
        'cookie-component': require('../../common/cookie/cookie.js'),
        'header-component': require('../../common/header/header.js'),
        'hero-component': require('../../common/hero/hero.js'),
        'slider-component': require('../../global/slider/slider-related-topics.js'),
        'footer-component': require('../../common/footer/footer.js')
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