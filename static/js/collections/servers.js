define([
    'backbone',
    'underscore',
    'models/server'
], function(Backbone, _, ServerModel) {
    
    return Backbone.Collection.extend({
        
        model: ServerModel,

        url: 'servers',

        initialize: function() {
            console.log('the server collection init');
        }

    });
});
