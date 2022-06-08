<template>
  <div>
    <!-- @SEÇÃO DE MODAL/DIALOG  -->
    <el-dialog
      v-model="isToshowDialog"
      :title="
        isToShowDialogInfo
          ? 'Consulta rapída - mais informações'
          : 'Enviar dados/informações'
      "
    >
      <template #default>
        <!-- @SUBSEÇÃO DE CONSULTA RÁPIDA -->
        <el-row :gutter="10" v-show="isToShowDialogInfo">
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

        <!-- @SUBSEÇÃO DE FORMULÁRIO PARA ENVIO DE OCORRÊNCIA -->
        <el-row :gutter="10" v-show="isToShowDialogOcorrenciaForm">
          <el-col :span="24" :xs="24">
            <el-form
              ref="sendInfoDialog"
              :model="ocorrenciaModel"
              label-width="100px"
            >
              <!-- data: null, //data de visualização da pessoa (formato yyyy-MM-dd)
        descricao: null, //descrição do anexo
        file: null, //anexo
        informacao: null, //informação (required)
        ocoId: null, //id da ocorrencia (required)-->

              <el-input
                type="hidden"
                v-model="ocorrenciaModel.ocoId"
              ></el-input>
              <el-form-item
                label="Data visualização"
                prop="data"
                label-width="150px"
              >
                <el-date-picker
                  v-model="ocorrenciaModel.data"
                  type="date"
                  placeholder="Escolha a data"
                  format="DD/MM/YYYY"
                />
              </el-form-item>

              <el-form-item
                label="Descrição Anexo"
                prop="descricao"
                label-width="150px"
              >
                <el-col :span="7">
                  <el-input v-model="ocorrenciaModel.descricao"></el-input>
                </el-col>
              </el-form-item>

              <el-form-item label="Anexo" label-width="150px" prop="file">
                <el-upload
                  ref="file"
                  action=""
                  :auto-upload="false"
                  :limit="1"
                  name="file"
                  v-model="ocorrenciaModel.file"
                  :on-change="fileChange"
                  :on-remove="fileRemove"
                  accept=".jpg,.jpeg,.png"
                >
                  <template #trigger>
                    <el-button type="primary" style="margin-top: 10px"
                      >Selecione o arquivo</el-button
                    >
                  </template>

                  <!--<el-button class="ml-3" type="success" @click="submitUpload">
                    upload to server
                  </el-button>-->

                  <!--<template #tip>
                    <div class="el-upload__tip">
                      Você só pode enviar 1 arquivo...
                    </div>
                  </template>-->
                </el-upload>
              </el-form-item>

              <el-form-item
                label="Informação"
                prop="informacao"
                :rules="[{ required: true, message: 'Campo obrigatório' }]"
                label-width="150px"
              >
                <el-col :span="12">
                  <el-input
                    v-model="ocorrenciaModel.informacao"
                    placeholder="Informações..."
                  />
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitOcorrencia()"
                  >Enviar</el-button
                >
                <el-button @click="resetOcorrencia()">Limpar</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </template>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="default" @click="closeDialog">Fechar</el-button>
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

              <el-table-column label="Opções">
                <template #default="scope">
                  <el-button
                    type="default"
                    @click="openDialog(scope.$index, scope.row)"
                    title="Consulta rápida - mais informações"
                    style="margin-top: 10px; float: left"
                    ><el-icon><InfoFilled /></el-icon
                  ></el-button>

                  <el-button
                    title="Enviar Informações"
                    type="primary"
                    @click="openSendInfoDialog(scope.$index, scope.row)"
                    style="margin-top: 10px; float: left"
                    ><el-icon><Edit /></el-icon>
                  </el-button>

                  <el-button
                    type="primary"
                    @click="openFormDetail(scope.$index, scope.row)"
                    title="Compartilhar"
                    style="margin-top: 10px; float: left"
                    ><el-icon><Share /></el-icon>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="Card">
            <el-row v-loading="grid.loading">
              <el-col
                v-for="(o, index) in grid.data"
                :key="o"
                :lg="4"
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
                        type="default"
                        title="Consulta rápida - mais informações"
                        @click="openDialog(index, o)"
                        ><el-icon><InfoFilled /></el-icon
                      ></el-button>

                      <el-button
                        title="Enviar Informações"
                        type="primary"
                        @click="openSendInfoDialog(index, o)"
                        ><el-icon><Edit /></el-icon>
                      </el-button>

                      <el-button
                        title="Compartilhar"
                        type="primary"
                        @click="openFormDetail(index, o)"
                        ><el-icon><Share /></el-icon>
                      </el-button>
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
    <el-row :gutter="10" style="margin-top: 10px">
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
import { ElNotification } from 'element-plus';
import GridHelper from "@/helpers/gridHelper";
import ServicePessoa from "@/services/pessoa";
import ServiceOcorrencia from "@/services/ocorrencia";

export default {
  name: "Pessoas",
  data() {
    return {
      grid: GridHelper.getDefaultConfig(
        10,
        ServicePessoa.getBaseURL() + "/aberto"
      ),

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

      isToshowDialog: false,
      isToShowDialogInfo: false,
      isToShowDialogOcorrenciaForm: false,
      moreInfoDialogModel: {
        localDesaparecimento: "",
        vestimentaDesaparecimento: "",
        informacaoDesaparecimento: "",
        urlFoto: "",
      },
      ocorrenciaModel: {
        data: null, //data de visualização da pessoa (formato yyyy-MM-dd)
        descricao: null, //descrição do anexo
        file: null, //anexo
        informacao: null, //informação (required)
        ocoId: null, //id da ocorrencia (required)
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
    openFormDetail: function (index, row) {
      console.log("row: ", row);
      let id = row.id;
      this.$router.push({
        name: "PessoasDetalhe",
        params: { id: id, action: "detail" },
      });
    },
    openSendInfoDialog: function (index, row) {
      console.log('row: ',row);
      try{
        this.ocorrenciaModel.ocoId = row.ultimaOcorrencia.ocoId;
      }catch{}
      this.isToshowDialog = true;
      this.isToShowDialogInfo = false;
      this.isToShowDialogOcorrenciaForm = true;
    },
    openDialog: function (index, row) {
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

      this.isToshowDialog = true;
      this.isToShowDialogInfo = true;
      this.isToShowDialogOcorrenciaForm = false;
    },
    closeDialog: function () {
      this.moreInfoDialogModel.localDesaparecimento = "";
      this.moreInfoDialogModel.vestimentaDesaparecimento = "";
      this.moreInfoDialogModel.informacaoDesaparecimento = "";
      this.moreInfoDialogModel.urlFoto = "";

      this.ocorrenciaModel.data = null;
      this.ocorrenciaModel.descricao = null;
      this.ocorrenciaModel.file = null;
      this.ocorrenciaModel.informacao = null;
      this.ocorrenciaModel.ocoId = null;

      this.isToshowDialog = false;
      this.isToShowDialogInfo = false;
      this.isToShowDialogOcorrenciaForm = false;
    },
    submitOcorrencia: function (formRef) {
      
      let date = '';
      if(this.ocorrenciaModel.data != null)
        date = this.ocorrenciaModel.data.toISOString();

      const formData = new FormData();
      formData.append("data", date);
      formData.append("descricao", this.ocorrenciaModel.descricao ?? '');
      formData.append("file", this.ocorrenciaModel.file);
      formData.append("informacao", this.ocorrenciaModel.informacao ?? '');
      formData.append("ocoId", this.ocorrenciaModel.ocoId ?? '');

      this.$refs.sendInfoDialog.validate((valid) => {
        if (valid) {
          ServiceOcorrencia.postOcorrencia(
            formData,
            (data) => {
              console.log('data: ',data);
              if(data.detail){
                //POR QUESTÕES DE SEGURANÇA: É SEMPRE BOM EVITAR EXCEPTION DA APLICAÇÃO BACK-END NO FRONT-END (CUSTOMIZAR OS ERROS DE EXCPETION PARA UM TEXTO GENÉRICO);
                ElNotification({
                  title: 'Erro',
                  message: data.detail,
                  type: 'error',
                });
              }
              else if(typeof(data) == "object"){
                ElNotification({
                  title: 'Sucesso',
                  message: "Ocorrência registrada com sucesso. Agradecemos a sua colaboração.",
                  type: 'success',
                });
                this.closeDialog();
              }
            });
        } else {
          return false;
        }
      });
    },
    resetOcorrencia: function () {
      this.ocorrenciaModel.data = null;
      this.ocorrenciaModel.descricao = null;
      this.ocorrenciaModel.file = null;
      this.ocorrenciaModel.informacao = null;
      this.ocorrenciaModel.ocoId = null;
      this.$refs.sendInfoDialog.resetFields();
    },
    fileChange: function (file) {
      this.ocorrenciaModel.file = file;
    },
    fileRemove: function () {
      this.ocorrenciaModel.file = null;
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
[data-grid-filters] .el-form-item__label {
  line-height: 57px;
}
.el-form-item {
  margin-right: 10px;
}
</style>