define([
    'backbone',
    'underscore',
    'text!templates/mini.html',
], function(Backbone, _, MiniTemplate) {
    
    return Backbone.View.extend({
        
        tagName: 'li',

        className: 'box gradient span4',

        template:_.template(MiniTemplate),

        initialize: function() {
            _.bindAll(this, 'refreshGraphs');

            this.model.on('change', this.refreshGraphs, this);

        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            console.log('rendering view');
            return this;
        },

        drawGraphs: function() {
            // This should only be called once after render
            this.g1 = new JustGage({
                id: this.model.get('id') + '_ram',
                value:0,
                min:0,
                max:100,
                title: "Ram",
                humanFriendly: true
            });
            
            this.g2 = new JustGage({
                id:this.model.get('id') + '_cpu',
                value:this.model.get('cpuload'),
                min:0,
                max:100,
                title: "CPU Load"
            });
            
            this.g3 = new JustGage({
                id:this.model.get('id') + '_connections',
                value:this.model.get('dbconn'),
                min:0,
                max:200,
                title: "Connections"
            }); 
        },

        refreshGraphs: function(d) {
            this.g1.refresh(this.model.get('memfree'));
            this.g2.refresh(this.model.get('cpuload'));
            this.g3.refresh(this.model.get('dbconn'));
        }

    });
});

