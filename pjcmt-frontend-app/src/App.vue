
<template>
  <div>
    <div class="common-layout">
      <el-container>

        <el-header>
          <el-menu
            class="el-menu"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            default-active="1"
          >
            <el-menu-item index="1">
               <router-link to="/">PJCMT - Polícia Cívil de Mato Grosso</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/pessoas">Localizados/Desaparecidos</router-link>
              </el-menu-item>
            <el-menu-item index="3" disabled>Relatórios</el-menu-item>
            <el-menu-item index="4" disabled class="menu-user"
              >Usuário</el-menu-item
            >
          </el-menu>
        </el-header>

        <el-main>
            <router-view/>
        </el-main>

        <el-footer></el-footer>

      </el-container>
    </div>
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.menu-user
{
  text-align: right;
}
.el-header, .el-container{
  margin: 0px !important;
padding: 0px !important;
}
body{
  margin: 0px !important;
  padding: 0px !important;
}
</style>
