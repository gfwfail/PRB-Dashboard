<template>
       <div id="loader-wrapper" v-show="loading">
          <div class="loader">
            
               <div class="la-square-jelly-box la-2x" style="height:60px;width:60px;">
                                    <div></div>
                                    <div></div>
                                    
                                                 
        </div>
          </div>
                             <div style="color:#fff;top:50%;padding-top:20px;position:absolute;text-align:center;width:100%;">{{msg}}<span id="loading-dot"></span>
                             </div>

          </div>
     
</template>
<script>
    export default {
        ready() {
                var dots = window.setInterval(function() {
                    var wait = document.getElementById("loading-dot");
                    if (wait.innerHTML.length >= 3)
                        wait.innerHTML = "";
                    else
                        wait.innerHTML += ".";
                }, 1000);
            },
            props: {
                loading: {
                    default: false
                },
                msg: {
                    default: 'loading'
                }
            }

    }
</script>