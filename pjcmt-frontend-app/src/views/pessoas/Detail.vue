<template>
  <div>
    <el-row v-loading="pessoaModel == null">
      <el-col
        :lg="24"
        :md="24"
        :xs="24"
        style="margin-top: 10px"
        v-if="pessoaModel != null"
      >
        <el-card :body-style="{ padding: '0px' }">

            <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in pessoaModel.carousel" :key="item">
                    <h3 text="2xl" justify="center">{{ item.label }}</h3>
                    <div class="demo-image__lazy demo-image__error demo-image__preview">
                        <el-image
                        :src="item.src"
                        :preview-src-list="[item.src]"
                        style="width: 300px; height: 300px"
                        class="image"
                        >
                        </el-image>
                    </div>
                </el-carousel-item>
            </el-carousel>


          <div style="padding: 14px">
            <div class="text item text-left">
              <b>Nome:</b>
              {{ pessoaModel.nome }}
            </div>
            <div class="text item text-left">
              <b>Idade:</b>
              {{ pessoaModel.idade }}
            </div>
            <div class="text item text-left">
              <b>Sexo:</b>
              {{ pessoaModel.sexo }}
            </div>
            <div class="text item text-left">
              <b>Data Desaparecimento:</b>
              {{
                typeof pessoaModel.ultimaOcorrencia.dtDesaparecimento ==
                "string"
                  ? new Date(
                      pessoaModel.ultimaOcorrencia.dtDesaparecimento
                    ).toLocaleDateString()
                  : "-"
              }}
            </div>
            <div class="text item text-left">
              <b>Data Localização:</b>
              {{
                typeof pessoaModel.ultimaOcorrencia.dataLocalizacao == "string"
                  ? new Date(
                      pessoaModel.ultimaOcorrencia.dtDesaparecimento
                    ).toLocaleDateString()
                  : "-"
              }}
            </div>
            <div class="text item text-left">
              <b>Status:</b>
              {{
                pessoaModel.ultimaOcorrencia.dataLocalizacao == null
                  ? "DESAPARECIDO"
                  : "LOCALIZADO"
              }}
            </div>
            <div class="text item text-left">
              <b>Local:</b>
              <span v-if="pessoaModel.ultimaOcorrencia.localDesaparecimentoConcat != null">
              {{ pessoaModel.ultimaOcorrencia.localDesaparecimentoConcat }}
              </span>
            </div>
            <div class="text item text-left">
              <b>Vestimenta:</b>
              <span v-if="pessoaModel.ultimaOcorrencia.ocorrenciaEntrevDesapDTO != null">
              {{
                pessoaModel.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                  .vestimentasDesaparecido
              }}
              </span>
            </div>
            <div class="text item text-left">
              <b>Informações:</b>
              <span v-if="pessoaModel.ultimaOcorrencia.ocorrenciaEntrevDesapDTO != null">
              {{
                pessoaModel.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao
              }}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :lg="24" :md="24" :xs="24" style="margin-top: 10px">
        <el-button @click="getBack()" style="float: right">Voltar</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ServicePessoa from "@/services/pessoa";

export default {
  name: "PessoasDetalhe",
  data() {
    return {
      pessoaModel: null,
    };
  },
  mounted() {
    const { id, action } = this.$route.params;
    ServicePessoa.getPessoaDetalhes(id, (data) => {

      this.pessoaModel = data;

      let carousel = [];
      if (typeof this.pessoaModel == "object") {
        if (
          typeof this.pessoaModel.urlFoto == "string" &&
          this.pessoaModel.urlFoto.length > 0
        )
          carousel.push({
            label: "Foto principal",
            src: this.pessoaModel.urlFoto,
          });

        if (
          typeof this.pessoaModel.ultimaOcorrencia == "object" &&
          Array.isArray(this.pessoaModel.ultimaOcorrencia.listaCartaz)
        ) {
          for (let cartaz of this.pessoaModel.ultimaOcorrencia.listaCartaz) {
            carousel.push({ label: cartaz.tipoCartaz, src: cartaz.urlCartaz });
          }
        }
      }
      this.pessoaModel.carousel = carousel;

    });
  },
  methods: {
    getBack: function () {
      this.$router.push({
        name: "Pessoas",
      });
    },
  },
};
</script>
