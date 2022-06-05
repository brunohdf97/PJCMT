import FetchHelper from "@/helpers/es6FetchHelper";

let GridHelper = new function () {

    let takeQueryParamName = "porPagina";
    let skipQueryParamName = "pagina";
    let skipModePerPage = true;

    let _filters = {};
    let _currentPage = 1;

    let getGrid = function (appinstance, callbackOnsuccess) {
        
        if (!appinstance.grid.loading) {

            appinstance.grid.loading = true;
            appinstance.grid.paginationDisabled = true;

            let url = appinstance.grid.urlGrid;
            if (appinstance.grid.take > 0) {
                url += "?" + takeQueryParamName + "=" + appinstance.grid.take;
            }

            if (skipModePerPage) {
                if (appinstance.grid.paginationCurrentpage > 1) {
                    url += "&" + skipQueryParamName + "=" + (appinstance.grid.paginationCurrentpage - 1) * appinstance.grid.take;
                }
            }
            else {
                if (appinstance.grid.paginationCurrentpage > 1) {
                    url += "&" + skipQueryParamName + "=" + (appinstance.grid.paginationCurrentpage);
                }
            }

            if (_filters != {}) {
                for (let key in _filters) {
                    let value = _filters[key];
                    url += "&" + key + "=" + value;
                }
            }

            FetchHelper.httpGet(url, (data) => {
                
                console.log('data: ',data);
                if (data.totalElements != appinstance.grid.total) {
                    appinstance.grid.total = data.totalElements;
                }

                appinstance.grid.data = data.content;

                if (typeof callbackOnsuccess == "function")
                    callbackOnsuccess(data);

                appinstance.grid.loading = false;
                appinstance.grid.paginationDisabled = false;
                return;

            }, () => {

                appinstance.grid.loading = false;
                console.error('erro ao montar grid: não foi possível obter a contagem total');
                return;

            },
                () => {
                    appinstance.grid.loading = false;
                });
        }

        return;
    };

    let getPageSize = function (take) {

        let pagesizes = [];

        pagesizes.push(take);

        let first = take * take;
        if (first <= 1000) {
            pagesizes.push(first);
        }

        let second = take * take * take;
        if (second <= 1000) {
            pagesizes.push(second);
        }

        let third = take * take * take * take;
        if (third <= 1000) {
            pagesizes.push(third);
        }

        return pagesizes;

    };

    let registerFilterEvents = function () {

        _filters = {};
        function filterReload(e) {

            let appinstance = window.mainapp;

            let filters = document.querySelectorAll("[data-grid-filters] input:not(.no-filter),select:not(.no-filter),textarea:not(.no-filter)");
            for (let obj of filters) {

                let name = obj.name;
                let value = obj.value;

                if (value.length > 0) {
                    _filters[name] = value;
                }
                else
                    _filters[name] = "";
            }

            if (_filters != {}) {
                getGrid(appinstance);
            }

        };

        let grid_filters = document.querySelectorAll("[data-grid-filters] button");
        if (grid_filters.length > 0) {
            grid_filters[0].removeEventListener("click", filterReload, false);
            grid_filters[0].addEventListener("click", filterReload, false);
        }

    };

    this.getDefaultConfig = function (take, urlGrid) {

        return {

            loading: false,

            total: 0,
            data: [],
            take: take,
            pagesizes: getPageSize(take),

            urlGrid: urlGrid,

            paginationInterval: null,
            paginationDisabled: true,
            paginationCurrentpage: 1,



        };
    };

    this.loadGrid = function (appinstance, callback) {

        if (typeof (appinstance) == "undefined") {

            console.error("você deve criar uma propriedade chamada grid recebendo o método 'getDefaultConfig' antes de construir seu Grid");
            throw new error("você deve criar uma propriedade chamada grid recebendo o método 'getDefaultConfig' antes de construir seu Grid");
        }

        getGrid(appinstance, function () {

            setTimeout(function () {
                registerFilterEvents();
            }, 500);

            if (typeof (callback) == "function")
                callback();

        });


    };

    this.reloadGrid = function (appinstance, callback) {

        if (typeof (appinstance) == "undefined") {

            console.error("você deve criar uma propriedade chamada grid recebendo o método 'getDefaultConfig' antes de construir seu Grid");
            throw new error("você deve criar uma propriedade chamada grid recebendo o método 'getDefaultConfig' antes de construir seu Grid");
        }

        getGrid(appinstance, function () {

            if (typeof (callback) == "function")
                callback();

        });
    };

    this.onTakeChanges = function(appinstance, event){

        appinstance.grid.take = event;
        this.reloadGrid(appinstance);

    };

    this.onPaginationChanges = function(appinstance, event){

        appinstance.grid.paginationCurrentpage = event;
        this.reloadGrid(appinstance);

    };


};

export default GridHelper;
