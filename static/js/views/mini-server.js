define([
    'backbone',
    'underscore',
    'highcharts',
    'text!templates/mini.html',
], function(Backbone, _, Highcharts, MiniTemplate) {
    
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
                value:0,
                min:0,
                max:100,
                title: "CPU Load"
            });
            
            this.g3 = new JustGage({
                id:this.model.get('id') + '_connections',
                value:0,
                min:0,
                max:200,
                title: "Connections"
            }); 

            this.chart = new Highcharts.Chart({
                chart: {
                    renderTo:this.$('#' + this.model.get('id') + '_minigraph')[0],
                    type:'line',
                    width:300,
                    height:100,
                    backgroundColor:null
                },
                title: {
                    text: null
                },
                xAxis: {
                    gridLineWidth:0,
                    minorGridLineWidth:0,
                    minorTickLength:0,
                    tickLength:0,
                    lineColor: 'transparent',

                    labels: {
                        enabled: false
                    }
                },
                yAxis: {
                    gridLineWidth:0,
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    }
                },

                legend: {
                    enabled: true,
                    borderColor:'transparent'
                },

                exporting: {
                    enabled: false
                },

                plotOptions: {
                    line: {
                        lineWidth:1,
                        marker: {
                            enabled: false,
                        }
                    }
                },

                series: [
                    {
                        id:'memfree',
                        name:'Ram',
                        data:[]
                    },
                    {
                        id:'cpuload',
                        name:'CPU',
                        data:[]
                    },
                    {
                        id:'dbconn',
                        name:'DB',
                        data:[]
                    }
                ]
            });
        },

        refreshGraphs: function(d) {
            
            // GUAGES
            this.g1.refresh(this.model.get('memfree'));
            this.g2.refresh(this.model.get('cpuload'));
            this.g3.refresh(this.model.get('dbconn'));
           
            // CHARTS
            var db = this.chart.get('dbconn');
            db.addPoint(this.model.get('dbconn'));

            var mem = this.chart.get('memfree');
            mem.addPoint(this.model.get('memfree'));

            var cpu = this.chart.get('cpuload');
            cpu.addPoint(this.model.get('cpuload'));
        }

    });
});

