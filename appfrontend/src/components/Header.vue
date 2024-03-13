<template>
    <el-header>
      <div class="left">
        <el-icon><Menu /></el-icon>
        <span style="margin-left: 10px">地震查询系统</span>
      </div>
      <div class="right">
        <span>你好</span>
        <el-dropdown>
          <el-button type="primary">
              <el-icon color:white><User /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click = logout>退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
  </template>
  
  <script setup>
  import { Menu } from "@element-plus/icons-vue";
  import { User } from "@element-plus/icons-vue";
  import {useRouter} from "vue-router"
  const router = useRouter()

  const logout = ()=>{
      localStorage.removeItem("token")
      router.push("/login")
  }
  </script>
  
  <style lang="scss" scoped>
  .el-header {
    background: linear-gradient(to right, #6693c8,#b5d5f3);
    color: white;
    width: 100%;
    height: 80px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left,.right{
      display: flex;
  }
  .left{
      i{
          margin: auto;
      }
  }
  .right{
      .el-dropdown{
          margin-left: 20px;
          margin-top: 10px;
      }
  }
  </style>
  