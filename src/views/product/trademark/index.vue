<!-- 品牌管理 -->
<template>
  <div class="">
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="showbiaodan"
      >添加</el-button
    >
    <!-- 表格组件 -->
    <el-table style="width: 100%" border="" :data="records">
      <el-table-column
        type="index"
        prop="prop"
        label="序号"
        width="80px"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 50px; height: 50px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row}">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="xiugai(row)"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            @click="deletebut(row)">删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin-top: 20px; textAlign: center"
      prev-text="上一页"
      next-text="下一页"
      popper-class
      background
      :page-size="limit"
      :page-sizes="[5, 10, 20]"
      :current-page="page"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :total="total"
      layout="prev, pager, next, jumper, slot, ->,sizes, total "
    >
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog :title="tmfrom.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <el-form :model="tmfrom" :rules="rules" ref="rules" >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input autocomplete="off" style="width:80%" v-model="tmfrom.tmName" ></el-input> 
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl">
            <!-- 这里收集图片不能使用v-model  -->
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
           >
            <img v-if="tmfrom.logoUrl" :src="tmfrom.logoUrl" class="avatar" />
            
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addorupdelt">确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "trademark",
  data() {
    return {
      //当前第几页
      page: 1,
      //当前页数展示数据条数
      limit: 5,
      //总共数据条数
      total: 0,
      //列表展示的数据
      records: [],
      //对话框显示和隐藏的效果
      dialogFormVisible: false,
      //收集表单信息
      tmfrom:{
        tmName:"",//对象身上的属性不要瞎写
        logoUrl:"",
      },
      rules:{
         tmName:[
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "change" },
        ],
        logoUrl: [
          { required: true, message: "请上传品牌图片", trigger: "change" },
        ],
      },
      yanze:false
    }
  },
  computed:{
    //表格验证
    // ttt(){
    //   return '请输入活动名称11'
    // }
  },
  methods: {
    // yanzheng(){
    //   if (this.tmfrom.tmName.length < 2 || this.tmfrom.tmName.length > 10 ) {
    //        this.$message('请输入2-10位字符')
    //        this.yanze=true
    //   }else{
    //        this.yanze=false
    //   }
    // },
    //请求数据
    async getdata(a) {
      const { page, limit } = this;
      let res = await this.$API.tradeMark.reqbasetrademark(a||page, limit);
      if (res.code == 200) {
        const { total, records } = res.data;
        (this.total = total), (this.records = records);
      }
    },
    //增加按钮
    showbiaodan() {
      this.dialogFormVisible = true;
      //每次点击添加的时候，清空
      this.tmfrom={tmName:'',logoUrl:''}
    },
    //修改按钮
    xiugai(value) {
      this.dialogFormVisible = true;
      this.tmfrom={...value}
      
    },
    //删除按钮
    deletebut(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res =await this.$API.tradeMark.reqremovetrademark(row.id)
          if (res.code==200) {
            this.$message({
            type: 'success',
            message: '删除成功!'
             });
             this.getdata(this.records.length>1 ? this.page:this.page-1)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //分页器
    handleCurrentChange(value) {
      this.page = value;
      this.getdata();
    },
    handleSizeChange(value) {
      this.limit = value;
      this.getdata();
    },
    //提交按钮(添加品牌｜｜修改品牌)
     addorupdelt(){
        this.$refs.rules.validate(async (valid)=>{
          if(valid){
            this.dialogFormVisible=false
            let res=await this.$API.tradeMark.reqbaseTrademarksave(this.tmfrom)
            if (res.code==200) {
              this.$message({message:this.tmfrom.id ?'恭喜你修改成功':'恭喜你添加成功',type:'success'})
              this.getdata()
    }
   
          }
        })
        
        
    },
    //上传图片相关的回调
    //图片上传成功
    handleAvatarSuccess(res, file) {
        //res是上传成功后，返回给前端的数据
        //file上传成功后，也是返回前端的数据
        //原数据：this.tmfrom.logoUrl= URL.createObjectURL(file.raw)这个是返回本地的，
        this.tmfrom.logoUrl=res.data;
      },
      //图片上传之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getdata();
  },
};
</script>
<style lang="less">
/* @import url(); 引入css类 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload__tip{
    margin-left: 60px;
}
</style>