<!--  -->
<template>
  <div class="">
    <el-table style="width: 100%" border="" :data="records">
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="250">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="300">
      </el-table-column>
      <el-table-column label="默认图片" width="80">
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="height: 50px; width: 50px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="80">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="120">
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="success"
            icon="el-icon-circle-check"
            size="mini"
            v-if="row.isSale == 0"
            @click="onSale(row)"
            title="上架"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-circle-close"
            v-else
            size="mini"
            title="下架"
            @click="cancelSale(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            title="修改"
            @click="$message('功能开发中。。。')"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-picture-outline"
            size="mini"
            title="详情"
            @click="getSkuById(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            title="删除"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 50]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total"
    >
    </el-pagination>
    <el-drawer
      direction="ltr"
      size="50%"
      :visible.sync="drawer"
      :with-header="false"
    >
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">名称</div></el-col
        >
        <el-col :span="18"
          ><div class="grid-content bg-purple-light">
            {{ skuifo.skuName }}
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">描述</div></el-col
        >
        <el-col :span="18"
          ><div class="grid-content bg-purple-light">
            {{ skuifo.skuDesc }}
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">价格</div></el-col
        >
        <el-col :span="18"
          ><div class="grid-content bg-purple-light">
            {{ skuifo.price }}
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">平台属性</div></el-col
        >
        <el-col :span="18"
          ><div class="grid-content bg-purple-light">
            <template>
              <el-tag
                type="danger"
                v-for="item in skuifo.skuAttrValueList"
                :key="item.id"
                style="margin-left: 2px"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">商品图片</div></el-col
        >
        <el-col :span="18"
          ><div class="grid-content bg-purple-light">
            <template>
              <div class="block">
                <el-carousel height="400px">
                  <el-carousel-item v-for="item1 in skuifo. skuImageList" :key="item1.id">
                   <img :src="item1.imgUrl" alt="" style="width:100%">
                  </el-carousel-item>
                </el-carousel>
              </div>
            </template>
          </div></el-col
        >
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "sku",
  data() {
    return {
      page: 1, //当前第几页
      limit: 10,
      total: 0, //总共页数
      records: [], //返回的数据
      skuifo: {},
      drawer: false, //抽屉显示
    };
  },
  methods: {
    handleSizeChange(value) {
      this.limit = value;
      this.getdata();
    },
    handleCurrentChange(value) {
      this.page = value;
      this.getdata();
    },
    async getdata() {
      let res = await this.$API.sku.reqpage(this.page, this.limit);
      if (res.code == 200) {
        this.total = res.data.total;
        this.records = res.data.records;
      }
    },
    async onSale(row) {
      let res = await this.$API.sku.reqonSale(row.id);
      if (res.code == 200) {
        row.isSale = 1;
        this.$message({
          message: "恭喜你，上架成功",
          type: "success",
        });
      }
    },
    async cancelSale(row) {
      let res = await this.$API.sku.reqcancelSale(row.id);
      if (res.code == 200) {
        row.isSale = 0;
        this.$message({
          message: "恭喜你，下架成功",
          type: "warning",
        });
      }
    },
    async getSkuById(row) {
      this.drawer = true;
      let res = await this.$API.sku.reqgetSkuById(row.id);
      if (res.code == 200) {
        this.skuifo = res.data;
        this.drawer = true;
      }
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getdata();
  },
};
</script>
<style>

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.el-row {
  margin: 50px 20px -40px;
  .bg-purple {
    text-align: right;
    margin-right: 20px;
    font-weight: 700;
  }
}
</style>