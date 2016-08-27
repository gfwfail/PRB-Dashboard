<template>
     <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Survey
<button class="pull-right btn btn-success"  data-balloon="Click here to create a survey" data-balloon-pos="left"><i class="fa fa-plus"></i> Create a Survey</button>

                        </h1>

                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-hover table-striped">
    <thead>
      <tr>
        <th width="10%">ID #</th>
        <th width="30%">Name</th>
                <th width="10%">Done</th>
        <th>Created at</th>
<th width="30%" class="text-right">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in 10">
        <td>{{i+1}}</td>
        <td>Doe</td>
        <td>{{parseInt(Math.random()*100)}}</td>
        <td> {{new Date()| moment "from" "now" true}}</td>
        <td align="right"> 

            <button class="btn btn-sm btn-primary" >Share</button>
                        <button class="btn btn-sm btn-primary">Report</button>

            <button class="btn btn-sm btn-danger"  data-balloon="This action is unrecoverable!!" data-balloon-pos="down" >Delete</button>
            
        </td>
        
      </tr>
      
    </tbody>
  </table>
                    </div>
                </div>
</template>
<script>
    export default {

    }
</script>