define([
    'backbone',
    'underscore',
    'models/menu'
], function(Backbone, _, MenuModel) {
    
    return Backbone.Collection.extend({
        
        model: MenuModel,

        url: 'menu',

        initialize: function() {
            console.log('collection');
        }

    });
});
