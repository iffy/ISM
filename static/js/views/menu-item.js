define([
    'backbone',
    'underscore',
    'text!templates/menu.html'
], function(Backbone, _, MenuTemplate) {
    
    return Backbone.View.extend({
        
        tagName: 'li',

        className: 'accordion-group',

        template:_.template(MenuTemplate),

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },

    });
});

