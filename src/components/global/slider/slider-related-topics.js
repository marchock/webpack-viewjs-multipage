
// CSS
//require('./slider-related-topics.scss');

module.exports = {

    template: require('./slider-related-topics.html'),

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
            carousel: {},

            slider: null,

            slickParam: {
                speed: 400,
                arrows: false,
                infinite: true,
                centerMode: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                centerPadding: '90px',
                // prevArrow: $('.slider__prev'),
                // nextArrow: $('.slider__next'),
                responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 2,
                        centerPadding: '90px',
                      }
                    },
                    {
                      breakpoint: 768,
                      settings: {
                        centerPadding: '60px',
                        slidesToShow: 1
                      }
                    },
                    {
                      breakpoint: 481,
                      settings: {
                        centerPadding: '30px',
                        slidesToShow: 1
                      }
                    }
                ]
            }
        }
    },

    methods: {

        initSlick: function () {
            var me = this;

            // https://vuejs.org/api/#vm-nextTick
            this.$nextTick(function () {
                me.slider = $(this.$el).find('.slider-related-topics');
                me.slider.slick(me.slickParam);
            });
        },

        nextSlide: function () {
            this.slider.slick('slickNext');
        },

        prevSlide: function () {
            this.slider.slick('slickPrev');
        }
    },

    ready: function () {

        var nspcc = this.nspccData(),
            me = this;

        nspcc.resultsPageContent(function (data) {
            me.carousel = data.carousel;
            me.initSlick();
        });
    }
};
