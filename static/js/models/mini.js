define([
    'backbone',
    'underscore',
    'sockjs'
], function(Backbone, _, SockJS) {
    return Backbone.Model.extend({

        initialize:function() {
            _.bindAll(this, 'handleSockData');

            var url = 'http://enthusia.sm:8099/' + this.get('id');
            this.sock = new SockJS(url);
            this.sock.onmessage = this.handleSockData;
        },

        handleSockData: function(d) {
           this.set(JSON.parse(d['data'])[0]);
        },

    });
});
