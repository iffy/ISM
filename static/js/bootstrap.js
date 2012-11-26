require.config({
    // THIS IS TO MAKE SURE NOTHING IS CACHED FOR TESTING
    urlArgs: "bust=" +  (new Date()).getTime(),
    paths:{ 
        jquery:'lib/jquery-1.8.2.min', 
        text:'lib/text',
        backbone:'lib/backbone-min', 
        underscore:'lib/underscore-min',
        highcharts:'lib/highcharts',
        datepicker:'lib/bootstrap-datepicker',
        sockjs:'lib/sockjs-0.3.min'

    }, 

    // SINCE BACKBONE AND UNDERSCORE ARE NOT AMD COMPATIBLE WE HAVE TO EXPORT THEM
    shim:{ 
        backbone: { 
            deps:['underscore', 'jquery'], 
            exports:'Backbone' 
        }, 

        underscore:{ 
            exports:'_' 
        },
        highcharts: {
            exports:'Highcharts'
        },

        datepicker: {
            deps:['jquery'],
            exports:'Datepicker'
        },

        sockjs: {
            exports:'SockJS'
        }
    } 
}); 

require([
    'router'
], function(Router) {
    $(function() {
        window.router = new Router();
        Backbone.history.start();
    });
});

