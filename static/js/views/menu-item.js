define([
    'backbone',
    'underscore',
    'text!templates/menu.html'
], function(Backbone, _, MenuTemplate) {
    
    return Backbone.View.extend({
        
        tagName: 'li',

        className: 'accordion-group',

        template:_.template(MenuTemplate),

        events: {
            'click .menu-item':'selectTab'
        },

        initialize: function() {
            //
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },

        selectTab: function() {
            // tab:select removes the active class from all of the containers li's
            this.options.container.trigger('tab:select');
            $(this.el).addClass('active');
        }
    });
});

