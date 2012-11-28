define([
    'backbone',
    'underscore',
    'views/main'
], function(Backbone, _, MainView) {
    return Backbone.Router.extend({
        routes: {
            '':'index',
            ':server':'server'
        },

        index: function() {
            console.log('index');

            if (!window.ism) {
                window.ism = new MainView();
            }

            window.ism.showSection();

        },

        server: function(s) {
            // SELECT A SERVER TO VIEW DATA ABOUT
            if (!window.ism) {
                window.ism = new MainView();
            }
            window.ism.showSection(s); 
        }
    });
});

