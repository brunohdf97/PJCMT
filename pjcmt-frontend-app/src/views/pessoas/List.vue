<template>
  <div>
    <!-- @SEÇÃO DE MODAL/DIALOG  -->
    <el-dialog v-model="showMoreInfoDialog" title="Mais informações">
      <template #default>
        <el-row :gutter="10">
          <el-col :span="24" :xs="24">
            <el-card :body-style="{ padding: '0px' }">
              <div
                class="demo-image__lazy demo-image__error demo-image__preview"
              >
                <el-image
                  :src="this.moreInfoDialogModel.urlFoto"
                  :preview-src-list="[this.moreInfoDialogModel.urlFoto]"
                  lazy
                  style="width: 300px; height: 300px"
                  class="image"
                >
                </el-image>
              </div>

              <div style="padding: 14px">
                <span>(Mais informações)</span>
                <div class="text item text-left">
                  <b>Local:</b>
                  {{ this.moreInfoDialogModel.localDesaparecimento }}
                </div>
                <div class="text item text-left">
                  <b>Vestimenta:</b>
                  {{ this.moreInfoDialogModel.vestimentaDesaparecimento }}
                </div>
                <div class="text item text-left">
                  <b>Informações:</b>
                  {{ this.moreInfoDialogModel.informacaoDesaparecimento }}
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="default" @click="closeMoreInfoDialog"
            >Fechar</el-button
          >
        </div>
      </template>
    </el-dialog>

    <!-- @SEÇÃO DE FILTROS -->
    <el-row data-grid-filters="" style="margin-bottom: 10px">
      <el-form-item label="Faixa de Idade Inicial">
        <el-input-number
          v-model="filters['faixaIdadeInicial']"
          :min="1"
          :max="130"
          name="faixaIdadeInicial"
        />
      </el-form-item>

      <el-form-item label="Faixa de Idade Final">
        <el-input-number
          v-model="filters['faixaIdadeFinal']"
          :min="1"
          :max="130"
          name="faixaIdadeFinal"
        />
      </el-form-item>

      <el-form-item label="Nome">
        <el-input
          v-model="filters['nome']"
          placeholder="Informe o nome..."
          name="nome"
        />
      </el-form-item>

      <el-form-item label="Sexo">
        <el-select
          v-model="filters['sexo']"
          class="m-2"
          placeholder="Sexo"
          size="large"
          name="sexo"
        >
          <el-option
            v-for="item in this.sexOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Status">
        <el-select
          v-model="filters['status']"
          class="m-2"
          placeholder="Status"
          size="large"
          name="status"
        >
          <el-option
            v-for="item in this.statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="default">Buscar</el-button>
      </el-form-item>
    </el-row>

    <!-- @SEÇÃO DE TABS COM TABELAS E CARDS -->
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

              <el-table-column
                prop="ultimaOcorrencia.dtDesaparecimento"
                label="Dt Desaparecimento"
                sortable
              >
                <template #default="scope">
                  {{
                    typeof scope.row.ultimaOcorrencia.dtDesaparecimento ==
                    "string"
                      ? new Date(
                          scope.row.ultimaOcorrencia.dtDesaparecimento
                        ).toLocaleDateString()
                      : "-"
                  }}
                </template>
              </el-table-column>

              <el-table-column
                prop="ultimaOcorrencia.dataLocalizacao"
                label="Dt Localização"
                sortable
              >
                <template #default="scope">
                  {{
                    typeof scope.row.ultimaOcorrencia.dataLocalizacao ==
                    "string"
                      ? new Date(
                          scope.row.ultimaOcorrencia.dtDesaparecimento
                        ).toLocaleDateString()
                      : "-"
                  }}
                </template>
              </el-table-column>

              <el-table-column
                prop="ultimaOcorrencia.dataLocalizacao"
                label="Status"
                sortable
              >
                <template #default="scope">
                  {{
                    scope.row.ultimaOcorrencia.dataLocalizacao == null
                      ? "DESAPARECIDO"
                      : "LOCALIZADO"
                  }}
                </template>
              </el-table-column>

              <el-table-column align="right" label="Opções">
                <template #default="scope">
                  <el-button
                    size="small"
                    @click="openMoreInfoDialog(scope.$index, scope.row)"
                    >Mais informações</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="Card">
            <el-row v-loading="grid.loading">
              <el-col
                v-for="(o, index) in grid.data"
                :key="o"
                :lg="3"
                :md="6"
                :xs="24"
                :offset="1"
                style="margin-top: 10px"
              >
                <el-card :body-style="{ padding: '0px' }">
                  <div
                    class="
                      demo-image__lazy demo-image__error demo-image__preview
                    "
                  >
                    <el-image
                      :src="o.urlFoto"
                      :preview-src-list="[o.urlFoto]"
                      style="width: 300px; height: 300px"
                      class="image"
                    >
                    </el-image>
                  </div>

                  <div style="padding: 14px">
                    <div class="text item text-left">
                      <b>Nome:</b>
                      {{ o.nome }}
                    </div>
                    <div class="text item text-left">
                      <b>Idade:</b>
                      {{ o.idade }}
                    </div>
                    <div class="text item text-left">
                      <b>Sexo:</b>
                      {{ o.sexo }}
                    </div>
                    <div class="text item text-left">
                      <b>Data Desaparecimento:</b>
                      {{
                        typeof o.ultimaOcorrencia.dtDesaparecimento == "string"
                          ? new Date(
                              o.ultimaOcorrencia.dtDesaparecimento
                            ).toLocaleDateString()
                          : "-"
                      }}
                    </div>
                    <div class="text item text-left">
                      <b>Data Localização:</b>
                      {{
                        typeof o.ultimaOcorrencia.dataLocalizacao == "string"
                          ? new Date(
                              o.ultimaOcorrencia.dtDesaparecimento
                            ).toLocaleDateString()
                          : "-"
                      }}
                    </div>
                    <div class="text item text-left">
                      <b>Status:</b>
                      {{
                        o.ultimaOcorrencia.dataLocalizacao == null
                          ? "DESAPARECIDO"
                          : "LOCALIZADO"
                      }}
                    </div>
                    <div class="text item text-left">
                      <el-button
                        size="small"
                        @click="openMoreInfoDialog(index, o)"
                        >Mais informações</el-button
                      >
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <!-- @SEÇÃO DE PAGINAÇÃO -->
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

export default {
  name: "Pessoas",
  data() {
    return {
      grid: GridHelper.getDefaultConfig(10, ServicePessoa.getBaseURL()+"/aberto"),

      sexOptions: [
        {
          value: "MASCULINO",
          label: "Masculino",
        },
        {
          value: "FEMININO",
          label: "Feminino",
        },
        {
          value: "",
          label: "Todos",
        },
      ],
      statusOptions: [
        {
          value: "DESAPARECIDO",
          label: "Desaparecido",
        },
        {
          value: "LOCALIZADO",
          label: "Localizado",
        },
        {
          value: "",
          label: "Todos",
        },
      ],
      filters: {},

      showMoreInfoDialog: false,
      moreInfoDialogModel: {
        localDesaparecimento: "",
        vestimentaDesaparecimento: "",
        informacaoDesaparecimento: "",
        urlFoto: "",
      },
    };
  },
  mounted() {
    GridHelper.loadGrid(this);
  },
  methods: {
    handleSizeChange: function (event) {
      GridHelper.onTakeChanges(this, event);
    },

    handleCurrentChange: function (event) {
      GridHelper.onPaginationChanges(this, event);
    },
    openMoreInfoDialog: function (index, row) {

      try {
        this.moreInfoDialogModel.localDesaparecimento =
          row.ultimaOcorrencia.localDesaparecimentoConcat ?? "";
      } catch {}
      try {
        this.moreInfoDialogModel.vestimentaDesaparecimento =
          row.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
            .vestimentasDesaparecido ?? "";
      } catch {}
      try {
        this.moreInfoDialogModel.informacaoDesaparecimento =
          row.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao ?? "";
      } catch {}
      try {
        this.moreInfoDialogModel.urlFoto = row.urlFoto;
      } catch {}
      this.showMoreInfoDialog = true;
    },
    closeMoreInfoDialog: function () {
      this.moreInfoDialogModel.localDesaparecimento = "";
      this.moreInfoDialogModel.vestimentaDesaparecimento = "";
      this.moreInfoDialogModel.informacaoDesaparecimento = "";
      this.moreInfoDialogModel.urlFoto = "";
      this.showMoreInfoDialog = false;
    },
  },
};
</script>

<style type="text/css">
.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.el-form-item__label {
  line-height: 57px;
}
.el-form-item {
  margin-right: 10px;
}
</style>