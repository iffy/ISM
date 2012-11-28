define([
    'backbone',
    'underscore',
    'views/mini-server'
], function(Backbone, _, MiniView) {
    
    return Backbone.View.extend({

        el:'#mini-container',

        initialize: function() {
            this.collection.bind('reset', this.render, this);
            this.render();
        },
       

        render: function() {
            $(this.el).html('');
            _.each(this.collection.models, function(m) {
                var mini = new MiniView({model:m}).render();
                $(this.el).append(mini.el);
                mini.drawGraphs();
            }, this);
            return this;
        },

    });
});

