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
            var maxram = 32000000
            if (this.model.get('id') == 'web0') {
                maxram = 16000000000
            }
            this.g1 = new JustGage({
                id: this.model.get('id') + '_ram',
                value:0,
                min:0,
                max:maxram,
                title: "Ram",
                titleFontColor:'#4572A7',
                humanFriendly: true,
                humanFriendlyDecimal: 1
            });
            
            this.g2 = new JustGage({
                id:this.model.get('id') + '_cpu',
                value:0,
                min:0,
                max:4,
                title: "CPU Load",
                titleFontColor:'#AA4643'
            });
            
            this.g3 = new JustGage({
                id:this.model.get('id') + '_connections',
                value:0,
                min:0,
                max:200,
                title: "Connections",
                titleFontColor:'#89A54E'
            }); 

            this.dbconns = this.drawMiniLine('dbconn', 'Connections', '#89A54E');
            this.cpuload = this.drawMiniLine('cpuload', 'CPU Load', '#AA4643');
            this.memused = this.drawMiniLine('memused', 'Ram', '#4572A7');

        },

        refreshGraphs: function(d) {
            
            // GUAGES
            this.g1.refresh(this.model.get('memused') * 1000);
            this.g2.refresh(this.model.get('cpuload'));
            this.g3.refresh(this.model.get('dbconn'));
           
            // CHARTS
            var db = this.dbconns.get('dbconn');
            db.addPoint(this.model.get('dbconn'));

            var mem = this.memused.get('memused');
            mem.addPoint(this.model.get('memused'));

            var cpu = this.cpuload.get('cpuload');
            cpu.addPoint(this.model.get('cpuload'));
        },

        drawMiniLine: function(id, name, color) {
        
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo:this.$('#' + this.model.get('id') + '_' + id)[0],
                    type:'line',
                    height:65,
                    backgroundColor:null,
                },
                colors: [color],
                credits: {
                    enabled: false
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
                    enabled: false,
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
                        id:id,
                        name:name,
                        data:[]
                    },
                ]
            });
            return chart;
        }

    });
});

