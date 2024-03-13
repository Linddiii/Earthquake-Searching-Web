<template>
  <el-container direction="vertical">
    <Header />
    <el-container>
      <el-aside class="side" width="150px">
        <div class="text">
          <el-icon><Notification /></el-icon>
          <p>数</p>
          <p>据</p>
          <p>来</p>
          <p>源</p>
          <p>于</p>
          <p>中</p>
          <p>国</p>
          <p>地</p>
          <p>震</p>
          <p>网</p>
        </div>
      </el-aside>
      <el-main>
        <div class="demo-collapse">
          <el-collapse>
            <el-collapse-item title="根据地震等级筛选" name="1">
              <div>
                <p>最小震级</p>
                <el-input
                  v-model="min"
                  class="w-50 m-2"
                  size="small"
                  placeholder="输入最小震级"
                  style="width: 200px"
                />
              </div>
              <div>
                <p>最大震级</p>
                <el-input
                  v-model="max"
                  class="w-50 m-2"
                  size="small"
                  placeholder="输入最大震级"
                  style="width: 200px"
                />
              </div>
            </el-collapse-item>
            <el-collapse-item title="根据经纬度筛选" name="2">
              <div>
                <p>经度范围</p>
                <el-input
                  v-model="startla"
                  class="w-50 m-2"
                  size="small"
                  placeholder="输入起始经度"
                  style="width: 100px"
                />
                <el-input
                  v-model="endla"
                  class="w-50 m-2"
                  size="small"
                  placeholder="输入终止经度"
                  style="width: 100px"
                />
              </div>
              <div>
                <p>维度范围</p>
                <el-input
                  v-model="startlong"
                  class="w-50 m-2"
                  size="small"
                  placeholder="输入起始维度"
                  style="width: 100px"
                />
                <el-input
                  v-model="endlong"
                  class="w-50 m-2"
                  size="small"
                  placeholder="输入终止范围"
                  style="width: 100px"
                />
              </div>
            </el-collapse-item>
            <el-collapse-item title="根据深度筛选" name="3">
              <div>
                <p>最小深度</p>
                <el-input
                  v-model="depthmin"
                  class="w-50 m-2"
                  size="small"
                  placeholder="输入最小震级"
                  style="width: 200px"
                />
              </div>
              <div>
                <p>最大深度</p>
                <el-input
                  v-model="depthmax"
                  class="w-50 m-2"
                  size="small"
                  placeholder="输入最大震级"
                  style="width: 200px"
                />
              </div>
            </el-collapse-item>
          </el-collapse>
          <div>
            <el-button class="botton" type="primary" @click="handleSearch"
              >确认</el-button
            >
          </div>
          <div>
            <!-- 显示数据项的内容 -->
            <table>
              <thead>
                <tr>
                  <th>震级</th>
                  <th>维度</th>
                  <th>经度</th>
                  <th>深度</th>
                  <th>参考位置</th>
                  <!-- 其他字段... -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in displayedItems" :key="item.id">
                  <td>{{ item.Level }}</td>
                  <td>{{ item.Latitude }}</td>
                  <td>{{ item.Longtitude }}</td>
                  <td>{{ item.Depth }}</td>
                  <td>{{ item.Description }}</td>
                  <!-- 其他字段... -->
                </tr>
              </tbody>
            </table>
          <div class="pagination-container">
            <!-- 分页组件 -->
            <el-pagination
              background
              layout="prev, pager, next"
              :total="totalItems"
              :page-size="itemsPerPage"
              @current-change="handlePageChange"
            />
          </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue";
import { Notification } from "@element-plus/icons-vue";
import { ref, computed } from "vue";
import axios from "axios";

const min = ref("");
const max = ref("");
const startla = ref("");
const endla = ref("");
const endlong = ref("");
const startlong = ref("");
const depthmax = ref("");
const depthmin = ref("");
const totalItems = ref(0);
const currentPage = ref(1);
const itemsPerPage = 50;
const displayedItems = ref([]);

const handleSearch = async () => {
  try {
    // 向后端发送请求以获取总数和数据
    const dataToSend = {
      levelmin: min.value,
      levelmax: max.value,
      latimin: startla.value,
      latimax: endla.value,
      lonmin: startlong.value,
      lonmax: endlong.value,
      depthmax: depthmax.value,
      depthmin: depthmin.value
    };
    console.log("确定",dataToSend)

    const url1 = "http://127.0.0.1:3000/getDataLengthApiEqChn";  // 请填写你的后端接口地址

    const res = await axios.get(url1, {params: dataToSend });
    console.log("确定获取的",res)

    // 更新总数和显示的数据
    totalItems.value = res.data.count;

    // 调用 handleSearch2，将 page 设置为第一页
    await handleSearch2(1); 
  } catch (error) {
    console.error("获取数据时发生错误：", error);
  }
};

const handlePageChange = (page) => {
  // 更新当前页并获取新页的数据
  currentPage.value = page;
  handleSearch2(page);
};

const handleSearch2 = async (page) => {
  try {
    // 向后端发送请求以获取总数和数据
    const dataToSend = {
      levelmin: min.value,
      levelmax: max.value,
      latimin: startla.value,
      latimax: endla.value,
      lonmin: startlong.value,
      lonmax: endlong.value,
      depthmax: depthmax.value,
      depthmin: depthmin.value,
      page: page
    };

    const url2 = "http://127.0.0.1:3000/getDataByPage";  // 请填写你的后端接口地址

    // 发送 GET 请求，直接传递对象作为查询参数
    const res = await axios.get(url2, { params: dataToSend });
    console.log("分页栏获取的",res);
    // 获取显示的数据
    displayedItems.value = res.data.results;
    //console.log(displayedItems);
  } catch (error) {
    console.error("获取数据时发生错误：", error);
  }
}
</script>



<style lang="scss" scoped>
.side {
  min-height: 100vh;
  background: linear-gradient(to bottom, #bae9fc, #d8f7fe);
}
.text {
  color: rgb(6, 105, 158);
  font-size: 16px;
  margin-top: 10px;
  margin-left: 50px;
}
.botton {
  margin-top: 10px;
  left: 1200px;
  position: relative;
}
@media screen and (max-width: 1200px) {
  .botton {
    left: 0;  /* 或者使用 right 属性，根据需要选择 */
  }
}

th {
  padding: 50px; /* 根据需要调整间隔大小 */
}

td{
  padding-left: 50px;
}
.pagination-container {
    position: fixed;
    bottom: 0;
    left: 200px;
    right: 200px;
    width: 50%;
    background-color: white; /* 设置分页组件的背景颜色 */
    padding: 10px; /* 设置分页组件的内边距，根据需要调整 */
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* 可选：添加阴影效果 */
  }

.el-main{
  margin-bottom: 100px;
}
</style>
