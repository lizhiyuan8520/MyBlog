<template>
<div id="SourceUpload">
<h1>资源上传</h1>
  <el-form :model="sourceInfo" status-icon 
      :rules="rules" ref="Form" 
      >
     <el-form-item label-width="70px" label="资源标题" prop="title">
         <el-input type="text" 
         maxlength="20"
         show-word-limit
         v-model="sourceInfo.title"
          autocomplete="off"
          style="max-width:800px">
          </el-input>
     </el-form-item>
      <el-form-item label="资源描述" label-width="70px" prop="description">
    <el-input 
    type="textarea"
    style="max-width:800px"
    maxlength="100"
    show-word-limit

     :autosize="{ minRows: 4, maxRows: 7}"
      v-model="sourceInfo.description"
      autocomplete="off"></el-input>
  </el-form-item>
      <el-form-item label="作者/来源" label-width="70px" prop="author">
    <el-input 
    type="text"
    style="max-width:800px"
    maxlength="20"
    show-word-limit
      v-model="sourceInfo.author"
      autocomplete="off"></el-input>
  </el-form-item>



  </el-form>
<span id="sourceImg">资源描述图片</span>
<el-upload
        class="avatar-uploader"
        action="http://localhost:8008/upload/sourceImg"
        :show-file-list="true"
        ref="sourceImg"
        name='sourceImg'
        style="margin-left:90px;border:none;"
        :data="this.sourceId"
        :multiple="false"
        :auto-upload="false"
        :limit="1"
        :on-exceed="handleMax"
        :before-upload="judgeSourceImg"
        list-type="picture"
        >
        <el-button type="primary" size="small">上传</el-button>
         
</el-upload>
<div id="tips">
    <span>Tips~</span>
    <p>*只能上传jpg/png文件，且不超过4M</p>
    <p>*不上传则使用默认图片</p>
    </div>
  <div  class="SourceUpload">
      <el-upload
        action="http://localhost:8008/upload/Source"
        :show-file-list="true"
        ref="Source"
        name='Source'
        drag
        style="margin-top:20px;"
        :file-list="filelist"
        :data="this.sourceInfo"
        :before-upload="judgeSource"
        :multiple="true"
        :auto-upload="true"
        :limit="10"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-exceed="handleMax"
        >
    
  
        <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em style="color:lightblue">点击上传</em></div>
    </el-upload>
    </div>
  
         

 <div id="tips">
     <span >Tips~</span>
     <p >*图片支持上传jpg/png/gif文件，且不超过20M</p>     
     <p >*视频支持上传mp4/avi/wmv文件，且不超过500M</p>     
     <p >*音频支持上传WMA/mp3/MPEG文件，且不超过20M</p>     
     <p >*其他类型文件不限制类型，上传后无法显示的将仅提供下载</p>     
     </div> 

</div>
  
 
</template>

<script >
import dayjs from 'dayjs';
export default {
data() {
    return {
        filelist:[],
        sourceId:{
            sourceId:''
        },
        sourceInfo:{
            title:'',
            description:'',
            author:'',
            uploader:'',
            category:0,
            uploadtime:'',
            size:0,
        },
        rules:{
            title:[
                {
                        required:true,
                        message:"资源题目不能为空",
                        trigger:'blur'
            }],
            description:[
                {
                        required:true,
                        message:"资源描述不能为空",
                        trigger:'blur'
                }
            ]



        }

    }
},
 computed:{
        userInfo(){
            return JSON.parse(sessionStorage.getItem('userInfo'))
        }
    },
methods: {
    //SourceImg钩子处理
    handleMax(files,filelist){//超出最大上传个数的回调
        this.$message.error("上传个数超过上限！");
    },
    judgeSourceImg(file){
         const isJPG = file.type === 'image/jpeg'||file.type==='image/png';
        const isLt4M = file.size / 1024 / 1024 < 4;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt4M) {
          this.$message.error('上传头像图片大小不能超过 4MB!');
        }
        return isJPG && isLt4M;
    },
    //Source钩子处理
    verifyFile(file){
        let after=file.name.substring(file.name.indexOf('.')+1);
        console.log('after',after);
       if(after=='jpg'||after=='png'||after=='gif'){
           if(file.size/1024/1024<20)
           {
               this.sourceInfo.category=1;
               return true
           }
            
            else
            return false
       }
       else if(after=='mp4'||after=='avi'||after=='wmv'){
            if(file.size/1024/1024<500)
           {
               this.sourceInfo.category=2;
               return true
           }
           else
            return false
       }
       else if(after=='WMA'||after=='mp3'||after=='MPEG')
       { 
           if(file.size/1024/1024<20)
           {
               this.sourceInfo.category=3;
               return true
           }
           else
            return false
           
       }
       else
       {
           this.sourceInfo.category=4;
           return true;
       }
       
    },
    // handleChange(file,filelist){
    //     this.filelist=filelist;
    // },
    handleSuccess(res,file,filelist){
            this.filelist=filelist;//用来检验文件是否重复
            this.$message.success("上传成功");
            console.log('@@@',this.$refs.sourceImg);
            if(this.$refs.sourceImg.uploadFiles.length!=0)
            {
                this.sourceId.sourceId=res.sourceId;
                this.$refs.sourceImg.submit();
            }
    },
       handleError(res,file,filelist){
            this.$message.error("上传失败");
    },
    judgeRepeat(file){
        return new Promise((resolve,reject)=>{
            console.log('filelist',this.filelist);
            this.filelist.forEach(element => {
            if(element.name==file.name&&element.size==file.size)
            {
                console.log('重复资源');
                this.$message.error("请勿重复上传！！");
                reject(false);
               
            }
         
        });
        resolve(true);
        })
        
        
    },

    
  async judgeSource(file){
       const formFlag =await  this.$refs.Form.validate();//先校验表单
        const fileFlag=this.verifyFile(file);//再校验文件
        //设置要发送的资源信息
        const repeatFlag=await this.judgeRepeat(file);
        console.log('repeatFlag',repeatFlag);
        this.sourceInfo.uploader=this.userInfo.username;
        this.sourceInfo.uploadtime=dayjs().format("YYYY-MM-DD HH:mm:ss");
        this.sourceInfo.size=file.size;
        return fileFlag&&formFlag&&repeatFlag
    }

},
}
</script>

<style scoped lang="less">
*{
    text-align: left;
}
.SourceUpload{
    border-radius: 6px;
    box-sizing: border-box;
    margin-left: 80px !important;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
#SourceUpload{
    color: #000;
    background-color: #f5f5f5;
    h1{
        background-color: #000;
        color: orange;
        padding: 10px 20px;
        margin-top: 0px;
    }
    #sourceImg{
        float:left;
        vertical-align: middle;
        font-size: 0.186667rem;
        color: #606266;
        line-height: 0.533333rem;
        margin-left: 10px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
   
}
.el-icon-upload{
    margin-top: 40px;
    font-size: 60px;
    color: rgb(10, 196, 243);
}
.el-upload__text{
    margin-top: 40px;
    text-align: center;
    font-size: 25px;
}

 #tips{
        
        font-size: 15px;
        background-color: rgba(0,0,0,0.3);
        color: #ffa500;
        margin-top: 20px;
        span{
            padding-left: 10px;
            font-size: 20px;
            color: #fff;
        }
        p{
            padding: 10px 80px;
        }
    }
</style>