<template>
    <div id="{{'cloud-'+id}}" style="min-width:700px;min-height:500px"></div>
</template>
<script>
    export default {
        data() {
            return {
                id: -1
            }
        },
        props: {
            'cloudText': 'Array',

        },
        ready() {
            this.id = this._uid

            var d3 = require("d3")

            var cloud = require("d3-cloud");

            var fill = d3.scaleOrdinal(d3.schemeCategory20);
            var self = this
            console.log(this.cloudText.map(function(d) {
                return {
                    text: d.text,
                    size: 10 + Math.random() * 90,
                    test: "haha",
                    id: self.id
                };
            }))

            var layout = cloud()
                .size([700, 500])
                .words(this.cloudText.map(function(d) {
                    return {
                        text: d.text,
                        size: 10 + (1 + Math.random() * 0.01) * d.count * 300,
                        test: "haha",
                        id: self.id
                    };
                }))
                .padding(5)
                .rotate(function() {
                    return ~~(Math.random() * 2) * 90;
                })
                .font("Impact")
                .fontSize(function(d) {
                    return d.size;
                })
                .on("end", draw);

            this.$nextTick(() => {
                layout.start();

            })

            function draw(words) {
                console.log(d3.select('#cloud-' + words[0].id))
                console.log(d3.select('body'))

                d3.select('#cloud-' + words[0].id).append("svg")
                    .attr("width", layout.size()[0])
                    .attr("height", layout.size()[1])
                    .append("g")
                    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                    .selectAll("text")
                    .data(words)
                    .enter().append("text")
                    .style("font-size", function(d) {
                        return d.size + "px";
                    })
                    .style("font-family", "Impact")
                    .style("fill", function(d, i) {
                        return fill(i);
                    })
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function(d) {
                        return d.text;
                    });
            }
        }
    }
</script>