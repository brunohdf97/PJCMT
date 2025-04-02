import fetchHelper from "@/helpers/es6FetchHelper";

let baseURL = "https://abitus-api.geia.vip/v1/ocorrencias";

async function postOcorrencia(model, onsuccess, onerror, onfinally) {
    let url = baseURL + "/informacoes-desaparecido";
    return await fetchHelper.httpPost(url, model, onsuccess, onerror, onfinally);
}

export default{
    postOcorrencia
}
