<template>
  <div>
    <el-row style="background: #545c64 none repeat scroll 0% 0%">
      <el-col :span="24" class="text-center"
        ><img
          class="items-center text-center"
          src="/imgs/pjcmt-logo.png"
          style="margin: 0 auto"
      /></el-col>
      <el-col :span="24">
        <span class="blue text-white text-center">
          Resumo estatístico de localizados/desaparecidos:</span
        ></el-col
      >
      <el-col :span="24">
        <span class="blue text-white text-center">
          Quantidade de desaparecidos:
          {{ this.estatisticaModel.quantPessoasDesaparecidas }}</span
        ></el-col
      >
      <el-col :span="24">
        <span class="blue text-white text-center">
          Quantidade de encontrados:
          {{ this.estatisticaModel.quantPessoasEncontradas }}</span
        ></el-col
      >
    </el-row>
    <el-row style="background: #545c64 none repeat scroll 0% 0%">
      <el-col :span="24">
        <el-divider></el-divider>
      </el-col>
      <el-col :span="24">
        <span class="blue text-white text-center">
          Denuncie: 197/181 | 3613-6981</span
        >
      </el-col>
      <el-col :span="24">
        <el-divider></el-divider>
      </el-col>
      <el-col :span="24">
        <span class="blue text-white text-center">
          <a href="https://www.pjc.mt.gov.br/" target="_blank"
            >(Clique aqui para acessar o site da PJCMT)</a
          ></span
        >
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ServicePessoa from "@/services/pessoa";

export default {
  name: "Home",
  data() {
    return {
      estatisticaModel: {
        quantPessoasDesaparecidas: 0,
        quantPessoasEncontradas: 0,
      },
    };
  },
  mounted() {
    ServicePessoa.getPessoasEstatistica(
      (data) => {
        this.estatisticaModel = data;
      },
      (error) => {},
      () => {}
    );
  },
};
</script>
