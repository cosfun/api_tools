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
      <el-input v-model="inputid" style="width: 60px"></el-input>
      <el-tooltip content="获取最近的10个接口,填入编号时获取指定接口,接口编号显示在右上角" placement="top">
          <el-button @click="changeType(1)">GET</el-button>
      </el-tooltip>
      <el-tooltip content="获取指定编号接口的最近30个请求" placement="top">
      <el-button @click="changeType(2)">历史</el-button>
      </el-tooltip>
      <el-tooltip content="获取所有异常接口" placement="top">
      <el-button @click="changeType(3)">BUG</el-button>
      </el-tooltip>
      <el-input v-model="host" style="width: 160px;margin-left: 80px"></el-input>
      <el-input v-model="uri"  style="width: 250px;margin-left: 5px"></el-input>
      <el-tooltip content="根据参数请求接口(功能存在BUG)" placement="top">
      <el-button @click="postAgain()">请求</el-button>
      </el-tooltip>
      <el-radio-group v-model="radio" style="margin-left: 20px" @change="change">
        <el-radio :label="1">默认</el-radio>
        <el-radio :label="2">本地</el-radio>
        <el-radio :label="3">服务</el-radio>
      </el-radio-group>
      <el-switch
        style="margin-left: 20px;width: 100px"
        v-model="jsonSwitch"
        on-text="json"
        off-text="sql"
        @change="switchJson"
        on-color="#58B7FF"
        off-color="#13ce66">
      </el-switch>
      {{id}}
    </div>
    <el-row  >
      <el-col :span="8"> <el-table
        :data="postList"
        border
        style="width: 480px;margin-top:10px;height: 100%"
        @row-click='handleRowHandle'
      >
        <el-table-column
          prop="id"
          label=" "
          width="70px">
        </el-table-column>
        <el-table-column
          prop="uri"
          label="请求列表"
          width="320px">
        </el-table-column>
        <el-table-column
          label="状态"
          width="89px"
        >
          <template scope="scope"  >
            <span  v-if="scope.row.state==='true'" style="display:block;color: #FFFFFF;background-color: #13CE66;width: 100%;height: 100%">{{scope.row.state}}</span>
            <span v-if="scope.row.state==='false'" style="display:block;color: #FFFFFF;background-color: #13CE66;width: 100%;height: 100%" >{{scope.row.state}}</span>
            <span v-if="scope.row.state==='warn'" style="display:block;color: #FFFFFF;background-color: #F7BA2A;width: 100%;height: 100%">{{scope.row.state}}</span>
            <span v-if="scope.row.state==='bug'"style="display:block;color: #FFFFFF;background-color: #FF4949;width: 100%;height: 100%">{{scope.row.state}}</span>
            <span v-if="scope.row.state==='buged'"style="display:block;color: #FFFFFF;background-color: #FF4949;width: 100%;height: 100%">{{scope.row.state}}</span>
            <span v-if="scope.row.state==='wait'"style="display:block;color: #FFFFFF;background-color: #20A0FF;width: 100%;height: 100%">{{scope.row.state}}</span>
          </template>
        </el-table-column>
      </el-table>



      </el-col>
      <el-col :span="9">
        <el-table
          ref="table"
          @selection-change="handleSelectionChange"
          :data="params"
          border
          style="width: 576px;margin-top: 10px;">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="key"
            width="230">
            <template scope="scope">
              <el-input v-model="scope.row.name"  size="small"> </el-input>
            </template>
          </el-table-column>
          <el-table-column
          label="value"
          width="290">
            <template scope="scope">
              <el-input v-model="scope.row.arg"  size="small"> </el-input>
            </template>
        </el-table-column>
        </el-table>

        <el-input
          type="textarea"
          :autosize="{ minRows: 2 }"
          placeholder="请输入BUG描述"
          style="width: 576px;margin-top: 10px;"
          v-model="des" >
        </el-input>
        <el-steps :space="150" :active="step"   style="margin-top: 10px">
          <el-step title="正常" description="状态正常的接口"></el-step>
          <el-step  title="BUGING" description="等待处理的BUG"></el-step>
          <el-step title="BUGED" description="等待构建,接口不能使用"></el-step>
          <el-step title="待验证" description="将BUG调整至正常状态"></el-step>
        </el-steps>
        <div style="margin-top: 10px;text-align: center">
          <el-button-group>
            <el-button type="primary" @click="stepSub" icon="arrow-left"></el-button>
            <el-tooltip content="保存BUG描述，将BUG状态切换至选中" placement="top">
            <el-button type="primary" @click="putBug" icon="check"></el-button>
            </el-tooltip>
            <el-button type="primary" @click="stepAdd" icon="arrow-right"></el-button>
          </el-button-group>
        </div>
      </el-col>

      <el-col :span="7">
        <div   style="margin-top: 10px;margin-left: 20px">
          <!--<el-input
            type="textarea"
            autosize
            placeholder="jsonData"
            v-model="result">
          </el-input>-->
         <!-- <pre>
             {{result }}
          </pre>-->
          <pre class="jsonclass">

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
       result:"",  //请求结果
       host:"",   //host
       urlDefault:"", //默认host
       uri:"",    //url
       id:"",       //id
       result:"",     //result
       fresult:"",
       sqlstr:"",
       jsonSwitch:true, //true json false sql
       selectParams:"",  //选中参数
       des:"",
       step:1,
       inputid:"",
       type:"1"
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
     changeType(value){
       console.log("tt="+value)
       this.type=value
       if(value==1){
         this.getData()
       }else if(value==2){
         this.getHistory()
       }else if(value==3){
         this.getBug()
       }
     },
     getApp:function(){
       console.log("getapp")
       this.$http.get(this.baseUrl+"/app")
         .then((reponse)=>{
           if(reponse.data.success){
             this.appTableData=reponse.data.list
             this.messageSystem(0)
           }
           console.log(this.appTableData)
         })
         .catch((err)=>{
           this.messageSystem(1)
         })
     },
     handleSelectionChange:function (value) {

       let params=new Array();
       for(let i=0;i<value.length;i++) {
         params.push(value[i].name)
       }
       console.log(params)
       this.selectParams=params;
     },//参数选中除法
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
       this.result=value.result
       this.fresult =this.syntaxHighlight(JSON.parse(value.result))
       this.sqlStr=value.sqlstr
       if(this.jsonSwitch) {
         document.getElementsByClassName('jsonclass')[0].innerHTML = this.fresult;
       }else{
         let sqlStr=this.sqlStr.replace(/\?/g,"      \r\n")
         document.getElementsByClassName('jsonclass')[0].innerHTML =sqlStr+"      "
       }
       //des
       this.des=value.des
       //step
       this.step=parseInt(value.step)
     },//列表点击事件除法
     getData(){
       let params=new URLSearchParams();
       params.append("appCode",this.selectApp)
       params.append("id",this.inputid)
       this.$http.post(this.baseUrl+"/urlHistory",params)
         .then((response)=>{

           if(response.data.success){
              this.postList=response.data.list;
              this.messageSystem(1)
           }
         })
         .catch((err)=>{

         })
     },//获取最新路径
     getBug(){
       let params=new URLSearchParams();
       params.append("appCode",this.selectApp)
       params.append("bug","1")
       this.$http.post(this.baseUrl+"/urlHistory",params)
         .then((response)=>{
           if(response.data.success){
             this.postList=response.data.list;
             this.messageSystem(1)
           }
         })
         .catch((err)=>{

         })
     },//获取BUG列表
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
     },//格式化json
     syntaxHighlight:function (json) {
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  },
     switchJson:function(value){
       if(value) {
         document.getElementsByClassName('jsonclass')[0].innerHTML = this.result;
       }else{
         let sqlStr=this.sqlStr.replace(/\?/g,"      \r\n")
         document.getElementsByClassName('jsonclass')[0].innerHTML =sqlStr+"      "
       }
     },//切换SQL JSON
     postAgain:function(){
         let params=new URLSearchParams();
         for(let i=0;i<this.selectParams.length;i++) {
           for(let j=0;j<this.params.length;j++){
             if(this.selectParams[i]==this.params[j].name){
               console.log(this.selectParams[i]+"="+this.params[j].name)
               params.append(this.selectParams[i],this.params[j].arg);
               break;
             }
           }
         }
        console.log(params)
       this.$http.post(this.host+this.uri,params)
         .then((response)=>{
             this.result=response.data
             this.fresult =this.syntaxHighlight(this.result)
             if(this.jsonSwitch) {
               document.getElementsByClassName('jsonclass')[0].innerHTML = this.fresult;
             }
             this.messageSystem(1);
         })
         .catch((err)=>{
           this.messageSystem(2);
         })
     },
     messageSystem(value){
       if(value==1){
         this.$message('请求成功');
       }else if(value==2){
         this.$message.error('请求错误,请联系管理员');
       }else{
         this.$message.error(value)
       }
     },
     putBug:function(){
       let userid=localStorage.getItem("userId")
        if(userid==0){
          this.messageSystem("认证用户才能反馈BUG")
          return;
        }
       let params=new URLSearchParams();
       params.append("des",this.des)
       params.append("userid",userid)
       params.append("id",this.id)
       params.append("step",this.step)
       this.$http.post(this.baseUrl+"/putBug",params)
         .then((response)=>{
           if(response.data.success){
              this.messageSystem(1)

             if(this.type==1) {
               this.getData()
             }else if(this.type==2){
                this.getHistory()
             }else if(this.type==3){
               this.getBug()
             }
           }else{
             this.messageSystem(response.data.info)
           }
         })
         .catch((err)=>{
            this.messageSystem(err)
         })
     },//修改bug状态
     stepSub:function() {
       if (this.step > 1) {
       this.step--
       }
     },
     stepAdd:function(){
       if (this.step <4 ) {
         this.step++
       }
     },
     getHistory:function(){
       let params=new URLSearchParams();
       params.append("appCode",this.selectApp)
       params.append("id",this.inputid)
       this.$http.post(this.baseUrl+"/urlNameHistory",params)
         .then((response)=>{
           if(response.data.success){
             this.postList=response.data.list;
             this.messageSystem(1)
           }
         })
         .catch((err)=>{

         })
     }
   }
 }
</script>
<style>
  .content{
    margin-left: 10px;
    margin-top: 10px;
  }
  pre {  padding: 5px; margin: 5px; }
  .string { color: blue; }
  .number { color: darkorange; }
  .boolean { color: blue; }
  .null { color: magenta; }
  .key { color: black; }

</style>
