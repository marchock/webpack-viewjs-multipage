// CSS
require('./hero.scss');

module.exports = {
    template: require('./hero.html'),
    replace: true,
    props: [ // http://vuejs.org/guide/components.html#Dynamic-Props
        {
            name: 'nspcc-data',
            type: Function,
            required: true
        }
    ],
    data: function () {
        return {
            hero: { imgSrc: {x3: ''}}
        }
    },
    ready: function() {

        var nspcc = this.nspccData(),
            me = this;

        nspcc.pageHero(function (data) {
            me.hero = data;
        });
    }
};