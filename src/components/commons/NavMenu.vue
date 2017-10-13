<template>
  <el-menu default-active="1" id="nav-menu" mode="horizontal" >
    <el-menu-item index="1" >
      <router-link to="/index" class="nav-link"><i class="el-icon-document"></i>首页</router-link>
    </el-menu-item>
    <el-menu-item index="2"><router-link to="/point" class="nav-link"><i class="el-icon-star-off"></i>积分</router-link></el-menu-item>
    <el-menu-item index="3"><router-link to="/workplace" class="nav-link"><i class="el-icon-menu"></i>项目</router-link></el-menu-item>
    <el-submenu index="4">
      <template slot="title"><i class="el-icon-setting"></i>设置</template>
      <el-menu-item index="4-1"><router-link to="/set" class="nav-link"><i class="el-icon-edit"></i>我的信息</router-link></el-menu-item>
      <el-menu-item index="4-2"><router-link to="/project" class="nav-link"><i class="el-icon-upload"></i>项目配置</router-link></el-menu-item>
    </el-submenu>
  </el-menu>
</template>
