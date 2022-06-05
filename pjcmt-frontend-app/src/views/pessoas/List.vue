<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24" :xs="24"> </el-col>
    </el-row>

    <!-- @SEÇÃO DE FILTROS -->
    <el-row :gutter="10" data-grid-filters="">

    </el-row>

    <el-row :gutter="10">

      <el-col :span="24" :xs="24">

        <el-tabs type="border-card">

          <el-tab-pane label="Tabela">
            <el-table
              :data="grid.data"
              v-loading="grid.loading"
              tooltip-effect="light"
            >
            
    <!--   :summary-method="getSummaries"
          :show-summary="showSummaries"
          :row-class-name="selectRowClassName"
          -->

              <el-table-column prop="nome" label="Nome" sortable>
              </el-table-column>

              <el-table-column prop="idade" label="Idade" sortable>
              </el-table-column>

              <el-table-column prop="sexo" label="Sexo" sortable>
              </el-table-column>

               <el-table-column prop="vivo" label="Vivo" sortable>
                 <template #default="scope">
                    {{ scope.row.vivo == true ? "SIM" : "NÃO"}}
                </template>
              </el-table-column>

              <el-table-column prop="ultimaOcorrencia.dtDesaparecimento" label="Dt Desaparecimento" sortable>
                <template #default="scope">
                    {{ new Date(scope.row.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString() }}
                </template>
              </el-table-column>

              <!--<el-table-column label="Opções" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  class="btn-grid"
                  v-if="scope.row.PodeBaixar"
                  size="mini"
                  type="success"
                  @*icon="el - icon - edit"
                  *@
                  title="Pagar"
                  v-on:click="down(scope.row)"
                  >Baixar</el-button
                >
                
              </el-button-group>
            </template>
          </el-table-column> -->
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="Card">Card</el-tab-pane>

        </el-tabs>

      </el-col>

    </el-row>

    <el-row :gutter="10">
      <el-col :span="24" :xs="24">
        <el-pagination
          :disabled="grid.paginationDisabled"
          :page-size="grid.take"
          :current-page="grid.paginationCurrentpage"
          :page-sizes="grid.pagesizes"
          layout="total, sizes, prev, pager, next, jumper"
          :total="grid.total"
          style="float: right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GridHelper from "@/helpers/gridHelper";
import ServicePessoa from "@/services/pessoa";

console.log("GridHelper: ", GridHelper);
//console.log("ServicePessoa: ", ServicePessoa);

export default {
  name: "Pessoas",
  data() {
    return {
      grid: GridHelper.getDefaultConfig(10, ServicePessoa.getBaseURL()),
      showAsGrid: true,
    };
  },
  mounted() {
    //console.log("this.grid: ", this.grid);
    //console.log("this: ", this);
    GridHelper.loadGrid(this);
  },
  methods: {
    handleSizeChange: function (event) {
      GridHelper.onTakeChanges(this, event);
      //console.log("handleSizeChange-event:", event);
    },

    handleCurrentChange: function (event) {
      GridHelper.onPaginationChanges(this, event);
      //console.log("handleCurrentChange-event:", event);
    },
  },
};
</script>