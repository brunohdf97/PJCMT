import fetchHelper from "@/helpers/es6FetchHelper";

let baseURL = "https://abitus-api.geia.vip/v1/pessoas";

async function getPessoasEstatistica(onsuccess, onerror, onfinally){
    let url = baseURL+"/aberto/estatistico";
    return await fetchHelper.httpGet(url, onsuccess, onerror, onfinally);
}

async function getPessoasPaginado(onsuccess, onerror, onfinally){
    let url = baseURL+"/aberto";
    return await fetchHelper.httpGet(url, onsuccess, onerror, onfinally);
}

async function getPessoaDetalhes(id, onsuccess, onerror, onfinally){
    let url = baseURL+"/"+id;
    return await fetchHelper.httpGet(url, onsuccess, onerror, onfinally);
}

function getBaseURL(){
    return baseURL;
}

export default{
    getPessoasEstatistica,
    getPessoasPaginado,
    getPessoaDetalhes,
    getBaseURL,
}