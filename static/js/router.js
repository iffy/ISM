define([
    'backbone',
    'underscore',
    'views/main'
], function(Backbone, _, MainView) {
    return Backbone.Router.extend({
        routes: {
            '':'index'
        },

        index: function() {
            window.ism = new MainView();

            window.ism.MenuCollection.fetch();

        }
    });
});

