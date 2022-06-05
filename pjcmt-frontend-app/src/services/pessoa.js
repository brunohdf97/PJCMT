import fetchHelper from "@/helpers/es6FetchHelper";

let baseURL = "https://dev.pjc.mt.gov.br/api-desaparecidos/v1/pessoas";

async function getPessoasEstatistica(onsuccess, onerror, onfinally){
    let url = baseURL+"/aberto/estatistico";
    console.log('url: ',url);
    console.log('fetchHelper: ',fetchHelper);
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