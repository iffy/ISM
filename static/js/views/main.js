define([
    'backbone',
    'underscore',
    'collections/menu',
    'collections/minis',
    'views/menu-container',
    'views/mini-collection',
    'views/latency'
], function(Backbone, _, MenuCollection, MiniCollection, MenuView, MiniCollectionView, LatencyView) {
    // MAIN VIEW
    return Backbone.View.extend({

        initialize: function() {


            // CREATE THE MENU VIEW
            this.MenuCollection = new MenuCollection();
            this.MenuView = new MenuView({
                'collection':this.MenuCollection
            });

            // MINI APPS ON THE DASHBOARD
            this.MiniCollection = new MiniCollection();
            this.MiniCollectionView = new MiniCollectionView({
                'collection':this.MiniCollection
            });

            // LATENCY
            this.LatencyView = new LatencyView();
            $('#main-container').append(this.LatencyView.render().el);
            this.LatencyView.getGraphData();

        },

    });
});
