// CSS
require('./question-form.scss');

module.exports = {
    // HTML template
    template: require('./question-form.html'),

    replace: true,

    // pass data between parent and child
    props: [ // http://vuejs.org/guide/components.html#Dynamic-Props
        {
            name: 'nspcc-data',
            type: Function,
            required: true
        },

        {
            name: 'local-storage',
            type: Function,
            required: true
        }
    ],

    // Store data for this scope
    data: function () {
        return {
            assessment: {},
            intro: {},
            count: 0,
            noq: 0,
            disableBtn: true
        }
    },

    // init when component is ready
    ready: function() {

        if (this.localStorage().fetch().length < 1) {
            this.getAssessment();
        } else {

            var data = this.localStorage().fetch();
            this.assessment = data[0].assessment;
            this.noq = this.assessment.questions.length;
            this.intro = data[0].intro;
            this.disableBtn = false;
            this.count = this.noq;
        }
    },

    methods: {


        getAssessment: function () {
            var nspcc = this.nspccData(),
                me = this;

            nspcc.homePageContent(function (data) {
                me.assessment = data.assessment;
                me.noq = me.assessment.questions.length;
                me.intro = data.intro;
            });
        },


        selectOption: function (index, string) {

            //console.log('selectOption', index, string);

            if (this.count < index) {
                return;
            }

            if (this.assessment.questions[index].choice === '') {
                this.assessment.questions[index].show = true;
                this.assessment.questions[index].showMouse = false;

                if ((index+1) < this.noq) {
                    this.assessment.questions[index+1].showMouse = true;
                }
                this.count += 1;
            }

            if (this.count >= this.noq) {
                this.disableBtn = false;
            }

            this.assessment.questions[index].choice = string;
        },

        viewResults: function(e) {
            e.preventDefault();

            this.localStorage().save([
                {
                    assessment: this.assessment,
                    intro: this.intro
                }
            ]);
            window.location.href = '/results';
        }
    }
};
