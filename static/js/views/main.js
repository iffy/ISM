define([
    'backbone',
    'underscore',
    'collections/servers',
    'views/menu-container',
    'views/mini-collection',
    'views/latency'
], function(Backbone, _, ServerCollection, MenuView, MiniCollectionView, LatencyView) {
    // MAIN VIEW
    return Backbone.View.extend({

        el:'#ism-container',

        initialize: function() {

            // THE SERVERS WE ARE GOING TO SHOW DATA ABOUT
            this.ServerCollection = new ServerCollection();
            this.ServerCollection.fetch();  

            // CREATE THE MENU VIEW
            this.MenuView = new MenuView({
                'collection':this.ServerCollection
            });
        },

        showSection: function(section) {
            console.log(section);

            // DASHBOARD VIEW
            if (!section || section == '') {
                section = 'dashboard'
                

                this.MiniCollectionView = new MiniCollectionView({
                    'collection':this.ServerCollection
                });

                // LATENCY
                this.LatencyView = new LatencyView();
                $('#main-container').append(this.LatencyView.render().el);
                this.LatencyView.getGraphData();

            } else {
            // SERVER VIEW

                //REMOVE DASHBOARD STUFF
                this.LatencyView ? this.LatencyView.remove() : false;
                this.MiniCollectionView ? this.MiniCollectionView.remove() : false;
            }

            this.MenuView.trigger('tab:select', section);
        }

    });
});
