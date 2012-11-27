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

            if (!window.ism) {
                window.ism = new MainView();

                window.ism.MenuCollection.fetch();
                window.ism.MiniCollection.fetch(); 
            }

        },

        server: function(s) {
            console.log('server');
            console.log(s);
            
        }
    });
});

