<template>
  <div class="content">
    <div>
    <el-dropdown @command="choose" trigger="click">
      <el-button  >
        {{selectName}}<i class="el-icon-caret-bottom el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  v-for="item in appTableData" :command="item.name">{{item.name}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      编号
      <el-input v-model="id" style="width: 60px"></el-input>
    <el-button @click="getData()">GET</el-button>
      <el-input v-model="host" style="width: 160px;margin-left: 70px"></el-input>
      <el-input v-model="uri"  style="width: 250px;margin-left: 5px"></el-input>
      <el-button>请求</el-button>
      <el-radio-group v-model="radio" style="margin-left: 20px" @change="change">
        <el-radio :label="1">默认</el-radio>
        <el-radio :label="2">本地</el-radio>
        <el-radio :label="3">服务</el-radio>
      </el-radio-group>
    </div>
    <el-row  >
      <el-col :span="7"> <el-table
        :data="postList"
        border
        style="width: 440px;margin-top:10px;height: 100%"
        @row-click='handleRowHandle'
      >
        <el-table-column
          prop="id"
          label=" "
          width="40px">
        </el-table-column>
        <el-table-column
          prop="uri"
          label="请求列表"
          width="320px">
        </el-table-column>
        <el-table-column
          label="状态"
          width="79px"
        >
          <template scope="scope"  >
            <span  v-if="scope.row.state==='true'" style="display:block;color: #FFFFFF;background-color: #20A0FF;width: 100%;height: 100%">{{scope.row.state}}</span>
            <span v-if="scope.row.state==='false'" style="display:block;color: #FFFFFF;background-color: #13CE66;width: 100%;height: 100%" >{{scope.row.state}}</span>
            <span v-if="scope.row.state==='warn'" style="display:block;color: #FFFFFF;background-color: #F7BA2A;width: 100%;height: 100%">{{scope.row.state}}</span>
            <span v-if="scope.row.state==='error'"style="display:block;color: #FFFFFF;background-color: #FF4949;width: 100%;height: 100%">{{scope.row.state}}</span>
          </template>
        </el-table-column>
      </el-table></el-col>
      <el-col :span="10">
        <el-table
          ref="table"
          @selection-change="handleSelectionChange"
          :data="params"
          border
          style="width: 100%;margin-top: 10px;">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="key"
            width="300">
            <template scope="scope">
              <el-input v-model="scope.row.name"  size="small"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
          label="value"
          width="300">
            <template scope="scope">
              <el-input v-model="scope.row.arg"  size="small"> </el-input>
            </template>
        </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="7" >
        <div style="margin-top: 10px">
          <!--<el-input
            type="textarea"
            autosize
            placeholder="jsonData"
            v-model="result">
          </el-input>-->
          <pre>
            {{result|json}}
          </pre>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {formatXml} from '../js/FormatJson'
 export default {
   data:function(){
     return{
       appTableData:[],   //APP
       selectName:"",     //选择的APP名字
       selectApp:"",      //选择的APP ID
       postList:[],       //请求列表
       radio: '1',        //单选
       params:[],         //请求参数
       result:"dfdsfdsf\nsdfdsfds\ndsfdsf",  //请求结果
       host:"",   //host
       urlDefault:"", //默认host
       uri:"",    //url
       id:"",       //id
       result:""     //result
     }
   },
   mounted(){
     if(localStorage.getItem("applist")==null) {
       console.log("null")
       this.getApp()
     }else{
       console.log(JSON.parse(localStorage.getItem("applist")))
       this.appTableData=JSON.parse(localStorage.getItem("applist"))
       console.log(this.appTableData)
     }
     if(localStorage.getItem("selectName")==null) {
       this.selectName = this.appTableData[0].name
       this.selectApp=this.appTableData[0].id
     }else{
       this.selectName=localStorage.getItem("selectName")
       this.selectApp=localStorage.getItem("selectApp")
     }
   },
   methods:{
     getApp:function(){
       this.$http.get(this.baseUrl+"/app")
         .then((reponse)=>{
           if(reponse.data.success){
             this.appTableData=reponse.data.list
           }
           console.log(this.appTableData)
         })
         .catch((err)=>{

         })
     },
     handleSelectionChange:function (value) {
       //console.log(value)
     },
     choose:function(value){
       this.selectName=value
       for(let i=0;i<this.appTableData.length;i++){
         if(this.appTableData[i].name==value){
           this.selectApp=this.appTableData[i].id
         }
       }
       localStorage.setItem("selectName",this.selectName)
       localStorage.setItem("selectApp",this.selectApp)
     },
     handleRowHandle:function(value){
       //列表点击事件除法

       //参数
       let args=value.paramArgs.split(",")
       let names=value.paramNames.split(",")
       let parmas=new Array();
       for(let i=0;i<args.length;i++){
         parmas.push({"arg":args[i],"name":names[i]})
       }
       this.params=parmas;
       this.$nextTick(function(){
         this.checked();//每次更新了数据，触发这个函数即可。
       })

       //host
       this.urlDefault="http://"+value.host;
       this.host=this.urlDefault;
       //uri
       this.uri=value.uri;
       //id
       this.id=value.id;
       //result
       this.result= value.result  ;
       alert(this.result)
     },
     getData(){//获取路径
       this.$http.get(this.baseUrl+"/url?appCode="+this.selectApp)
         .then((response)=>{

           if(response.data.success){
              this.postList=response.data.list;

           }
         })
         .catch((err)=>{

         })
     },
     checked(){//选中参数
       for(let i=0;i<this.params.length;i++) {
         this.$refs.table.toggleRowSelection(this.params[i], true);
       }
     },
     change(val){
       let data=this.getAppInfo(this.selectApp)
       if(val==3) {
         this.host=data.webUrl
       }else if(val==2){
         this.host=data.appUrl
       }else{
         this.host=this.urlDefault
       }
       //console.log("data="+this.host)
     },//切换host选中
     getAppInfo(select){
       for(let i=0;i<this.appTableData.length;i++){
          if(this.appTableData[i].id==select){
            return this.appTableData[i];
          }
       }
     },
     formatJson(json){
        return formatXml(json)
     }//格式化json
   }
 }
</script>
<style>
  .content{
    margin-left: 10px;
    margin-top: 10px;
  }

</style>
