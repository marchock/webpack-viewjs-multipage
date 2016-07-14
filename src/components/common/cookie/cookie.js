
// CSS
//require('./cookie.css');

module.exports = {
    template: require('./cookie.html'),

    replace: true,

    data: function () {
        return {
            showNetworks: false,
            counter: 0
        }
    },

    methods: {
        setupEvent: function(ele, evnt, func) {
            ele.addEventListener(evnt, func, false);
        },

        hasClass: function(ele, cls) {
            return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        },

        addClass: function(ele, cls) {
            if (!this.hasClass(ele, cls)) {
                ele.className += " " + cls;
            }
        },

        removeClass: function(ele, cls) {
            if (this.hasClass(ele, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                ele.className = ele.className.replace(reg, ' ');
            }
        }
    },

    ready: function() {

        var $body = document.querySelector('body'),
            $cookieMessage = $body.querySelector('.cookie-message'),
            $btnClose =  $body.querySelector('.close-cookie-message'),
            $btnAccept =  $body.querySelector('.accept-cookies'),
            cookieName = "jsCookie------0001",
            cookieNameNo = "jsNoCookie-------0001",
            classname = "display-cookie-message",
            me = this; // classname applied to the body


        // Close cookie message
        this.setupEvent($btnClose, "click", function (e) {
            e.preventDefault();
            cookieMessage.doNotAccept();
        });

        // Except cookie message
        this.setupEvent($btnAccept, "click", function (e) {
            e.preventDefault();
            cookieMessage.doAccept();
        });

        var cookieMessage = {

            getCookie: function (c_name) {
                var i,x,y,ARRcookies=document.cookie.split(";");
                for (i=0;i<ARRcookies.length;i++) {
                    x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g,"");
                    if (x === c_name) {
                        return unescape(y);
                    }
                }
            },

            displayNotification: function (c_action) {
                console.log('displayNotification')
                console.log(c_action)
                console.log($body)
                me.addClass($body, classname);
            },

            doAccept: function () {
                this.setCookie(cookieName, null, 365);
                me.addClass($body, "hide-cookie-message");
            },

            doNotAccept: function () {
                this.setCookie(cookieNameNo, null, 365);
                me.addClass($body, "hide-cookie-message");
            },

            setCookie: function (c_name,value,exdays) {
                var exdate=new Date();
                exdate.setDate(exdate.getDate() + exdays);
                var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
                document.cookie=c_name + "=" + c_value;

            // set cookiewarning to hidden.
            // var cw = document.getElementById("cookiewarning");
            // cw.innerHTML = "";
            },

            checkCookie: function (c_action) {

                var cookieChk = this.getCookie(cookieName),
                    cookieChkNo = this.getCookie(cookieNameNo);

                if (cookieChk != null && cookieChk != "") {
                    // the jsCookieCheck cookie exists so we can assume the person has read the notification
                    // within the last year and has accepted the use of cookies

                    this.setCookie(cookieName, cookieChk, 365); // set the cookie to expire in a year.
                }
                else if (cookieChkNo != null && cookieChkNo != "") {
                    // the jsNoCookieCheck cookie exists so we can assume the person has read the notification
                    // within the last year and has declined the use of cookies

                    this.setCookie(cookieNameNo, cookieChkNo, 365); // set the cookie to expire in a year.
                }
                else {
                    // No cookie exists, so display the lightbox effect notification.
                    this.displayNotification(c_action);
                }
            }
        };


        // blockOrCarryOn - 1 = Carry on, store a do not store cookies cookie and carry on
        //                  0 = Block, redirect the user to a different website (google for example)
        var blockOrCarryOn = 1;
        cookieMessage.checkCookie(blockOrCarryOn);
    }
};
