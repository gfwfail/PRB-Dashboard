<template>

 <div class="btn-group" role="group" >
  <button type="button" class="btn btn-xs btn-primary" v-for="chart in allCharts" @click="changeType($index)" :class="{'active':$index==currentType}" track-by="$index">{{chart}}</button>
</div>
<hr>
<div style="padding:10px;background:#fff;max-width:420px;border-radius:10px;margin:20px">

<canvas v-show="currentType==1" v-el:bar-chart width="100" height="100"></canvas>
<canvas v-show="currentType==0" v-el:pie-chart width="100" height="100"></canvas>
<canvas v-show="currentType==2" v-el:radar-chart width="100" height="100"></canvas>
</div>

</template>
<script>
    export default {
        data() {
                return {
                    currentType: 0,
                    allCharts: ['Pie Chart', 'Bar Chart', 'Radar chart'],
                }
            },
            methods: {
                changeType(i) {
                    this.currentType = i
                    if (i == 0) {
                        this.pieChart()
                    }
                    if (i == 1) {
                        this.barChart()
                    }
                    if (i == 2) {
                        this.radarChart()
                    }
                },
                barChart() {
                    this.currentType = 1
                    new Chart(this.$els.barChart, {
                        type: 'bar',
                        data: {
                            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                            datasets: [{
                                label: '# of Votes',
                                data: [12, 10, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
                },
                pieChart() {
                    new Chart(this.$els.pieChart, {
                        type: 'pie',
                        data: {
                            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                            datasets: [{
                                label: '# of Votes',
                                data: [12, 10, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
                },
                radarChart() {
                    new Chart(this.$els.radarChart, {
                        type: 'radar',
                        data: {
                            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                            datasets: [{
                                label: '# of Votes',
                                data: [12, 10, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    });
                }
            },

            ready() {

                this.pieChart()



            }


    }
</script>

<style scoped>
    canvas {
        width: 100% !important;
        max-width: 400px;
        height: auto !important;
    }
</style>