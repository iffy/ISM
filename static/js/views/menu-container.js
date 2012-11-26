define([
    'backbone',
    'underscore',
    'views/menu-item'
], function(Backbone, _, MenuItem) {
    
    return Backbone.View.extend({

        el:'#sidebar_menu',

        initialize: function() {
            this.collection.bind('reset', this.render, this);
            this.on('tab:select', this.tabSelect, this);
        },
        
        render: function() {
            _.each(this.collection.models, function(m) {
                var x = new MenuItem({model:m, container:this}).render().el;
                $(this.el).append(x);
            }, this);
        },

        tabSelect: function() {
            // When ever a tab is selected, remove the active class
            this.$('.active').removeClass('active');
        }
    });
});

