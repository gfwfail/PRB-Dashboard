<template>
     <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Dashboard</h1>
                    </div>
                   
     </div>
               
                <div class="row">
                    <div class="col-md-8">
                          <div class="panel panel-primary">
      <div class="panel-heading">  Survey Received Source</div>
      <div class="panel-body">
          <div id="c1"></div>
      </div>
    </div>
                    </div>
                    <div class="col-md-4">
                          <div class="panel panel-primary">
                                    <div class="panel-heading" style="background:#FAFAFA"> Shortcuts</div>

                               <div class="panel-body">

                        <button v-link="{'path':'/app/survey/create'}" class="btn btn-block btn-success">Create Survey</button>
                 <button class="btn btn-block btn-primary">Add Contact</button>
                 <hr>
                                         <button class="btn btn-block btn-danger">Need Help?</button>

                          </div>
                          </div>
                    </div>
                     
             </div>
             
              
             
</template>
<script>
    export default {
        data() {
            return {
                chartdata: [{
                    genre: 'Email',
                    sold: 275
                }, {
                    genre: 'QRCode',
                    sold: 115
                }, {
                    genre: 'URL',
                    sold: 120
                }, {
                    genre: 'Other',
                    sold: 150
                }, ]
            }
        },
        ready() {
            var chart = new G2.Chart({
                id: 'c1', // 指定图表容器 ID
                width: 600, // 指定图表宽度
                height: 300, // 指定图表高度
                fontFamily: 'Open Sans'
            });
            // Step 2: 载入数据源
            chart.source(this.chartdata, {
                genre: {
                    alias: 'Type' // 列定义，定义该属性显示的别名
                },
                sold: {
                    alias: 'Done'
                }
            });
            // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
            chart.interval().position('genre*sold').color('genre')
                // Step 4: 渲染图表
            chart.render();
        }

    }
</script>