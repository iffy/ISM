define([
    'backbone',
    'underscore',
    'models/mini'
], function(Backbone, _, MiniModel) {
    
    return Backbone.Collection.extend({
        
        model: MiniModel,

        url: 'minis',

        initialize: function() {
            console.log('the mini collection init');
        }

    });
});
