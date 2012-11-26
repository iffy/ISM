define([
    'backbone',
    'underscore',
    'sockjs',
    'text!templates/mini.html',
], function(Backbone, _, SockJS, MiniTemplate) {
    
    return Backbone.View.extend({
        
        tagName: 'li',

        className: 'box gradient span4',

        template:_.template(MiniTemplate),

        initialize: function() {
            _.bindAll(this, 'refreshGraphs');

            this.model.on('change', this.refreshGraphs, this);
            var sock = new SockJS('http://enthusia.sm:8099');
            sock.onopen = function() {
                console.log('open');
            }

            sock.onmessage = this.refreshGraphs;


        },


        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },

        drawGraphs: function() {
            // This should only be called once after render
            this.g1 = new JustGage({
                id:this.model.get('title') + '_ram',
                value:this.model.get('ram'),
                min:0,
                max:this.model.get('ram_max'),
                title: "Ram",
                humanFriendly: true
            });
            
            this.g2 = new JustGage({
                id:this.model.get('title') + '_cpu',
                value:this.model.get('cpu'),
                min:0,
                max:100,
                title: "CPU Load"
            });
            
            this.g3 = new JustGage({
                id:this.model.get('title') + '_connections',
                value:this.model.get('connections'),
                min:0,
                max:2000,
                title: "Connections"
            });
        },

        refreshGraphs: function(d) {
            this.g1.refresh(this.model.get('ram'));
            this.g2.refresh(this.model.get('cpu'));
            this.g3.refresh(this.model.get('connections'));
        }

    });
});

