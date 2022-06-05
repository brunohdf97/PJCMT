<template>
  <div>

    <el-row style="background: #545c64 none repeat scroll 0% 0%">
      <el-col :span="24" class="text-center" ><img class="items-center text-center" src="/imgs/pjcmt-logo.png" style="margin: 0 auto"/></el-col>
        <el-col :span="24"> <span class="blue text-white text-center"> Resumo estatístico de Localizados/Desaparecidos:</span></el-col>
        <el-col :span="24"> <span class="blue text-white text-center"> Quantidade Desaparecidos: {{ this.estatisticaModel.quantPessoasDesaparecidas }}</span></el-col>
        <el-col :span="24"> <span class="blue text-white text-center"> Quantidade Encontrados:  {{ this.estatisticaModel.quantPessoasEncontradas }}</span></el-col>
     </el-row>

    <el-row style="background: #545c64 none repeat scroll 0% 0%">
        
    </el-row>

  </div>
</template>
<script>
import ServicePessoa from "@/services/pessoa";

export default {
  name: 'Home',
  data(){
    return {
      estatisticaModel: {
        quantPessoasDesaparecidas: 0,
        quantPessoasEncontradas: 0
      }
    };
  },
  mounted(){
    ServicePessoa.getPessoasEstatistica((data) => {
      this.estatisticaModel = data;
    },(error) => { 
      
      }, () => {

      });
    
  },
}
</script>