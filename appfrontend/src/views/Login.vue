<template>
  <div style="background-color: rgb(46, 45, 45); min-height: 100vh;">
    <p class="title">地震查询系统</p>
    <div class="center-container">
      <div id="main">
        <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="75px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        
        <el-button type="primary" @click="submitForm()">登录</el-button>
      
      </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import axios from 'axios';
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";


const ruleForm = reactive({
  pass: '',
  text: '',
})

const ruleFormRef = ref();
const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});

const router = useRouter();
const url = "http://127.0.0.1:3000/login"
const submitForm = () => {
  ruleFormRef.value.validate((valid) => {
    const params = {
      username: ruleForm.username,
      password: ruleForm.password
    };
    if (valid) {
      console.log("成功获取到表单内容:", { params: params })
      /*localStorage.setItem("token","aaa")
      router.push("/home")*/
      
      axios.post(url,null,{ params: params}).then((res) => {
        console.log("查看", res);
        // 登录校验
        if (res.data.message === "Matched") {
          localStorage.setItem("token","aaa")
          router.push("/home"); //路由跳转
        } else {
          console.log(res.data.message);
          ElMessage.error("用户名和密码不匹配");
        }
      });
    }
  });
};

</script>


<style lang="scss" scoped>
body {
  margin: 0; /* 重置 body 的默认 margin */
  padding: 0;
  background-color: rgb(46, 45, 45);
}

.title{
  padding-top: 150px;
  padding-left: 620px;
  font-size: 40px;
  color: rgb(189, 188, 188);
}

.center-container {
  width: 500px;
  height: 250px;
  position: absolute;
  left: 57%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: rgb(112, 112, 112);
  text-align: center;
  padding-top: 150px;
  padding-right: 50px;
  
}

#main {
  background-color: rgb(202, 202, 202); /* 设置 main 元素的背景为白色 */
  padding: 30px; /* 添加一些内边距 */
  width: 300px;
  height: 150px;
}

.form-item {
  display: flex; /* 使用 Flexbox */
  align-items: center; /* 垂直居中对齐 */
  margin-bottom: 20px; /* 添加一些底部外边距 */
}

.el-form-item {
  margin-bottom: 30px; /* 输入框之间的间距 */
}

.el-button {
  align-self: center; /* 按钮居中 */
  margin-top: 20px; /* 按钮与上方元素的间距 */
}
</style>
