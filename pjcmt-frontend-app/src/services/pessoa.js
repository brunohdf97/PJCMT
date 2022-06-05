import "@/helpers/es6FetchHelper";
import { httpGet } from "@/helpers/es6FetchHelper";

let baseURL = "https://dev.pjc.mt.gov.br/api-desaparecidos/v1/pessoas/aberto";

/*async function getPessoasEstatistica(onsuccess, onerror, onfinally){
    return await httpGet()
}*/

async function getPessoasPaginado(param, onsuccess, onerror, onfinally){


    return await httpGet(baseURL, onsuccess, onerror, onfinally);
}

function getBaseURL(){
    return baseURL;
}

export default{
    getPessoasPaginado,
    getBaseURL,
}