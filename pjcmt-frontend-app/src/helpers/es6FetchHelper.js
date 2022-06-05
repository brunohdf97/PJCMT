async function httpDelete(url, data, onsuccess, onerror, onfinally) {

    const headers = new Headers();

    return await fetch(url, {
        method: 'DELETE',
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: data
    })
        .then(response => response.json())
        .then(data => {

            if (typeof (onsuccess) == "function") {
                onsuccess(data);
            }

        })
        .catch(error => {

            if (typeof (onerror) == "function") {
                onerror(error);
            }

        }).finally(function (e) {

            if (typeof (onfinally) == "function") {
                onfinally(e);
            }

        });
}

async function httpPut(url, data, onsuccess, onerror, onfinally) {

    const headers = new Headers();

    return await fetch(url, {
        method: 'PUT',
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: data
    })
        .then(response => response.json())
        .then(data => {

            if (typeof (onsuccess) == "function") {
                onsuccess(data);
            }
        })
        .catch(error => {

            if (typeof (onerror) == "function") {
                onerror(error);
            }

        }).finally(function (e) {

            if (typeof (onfinally) == "function") {
                onfinally(e);
            }

        });
}

async function httpPatch(url, data, onsuccess, onerror, onfinally) {

    const headers = new Headers();

    return await fetch(url, {
        method: 'PATCH',
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: data
    })
        .then(response => response.json())
        .then(data => {

            if (typeof (onsuccess) == "function") {
                onsuccess(data);
            }
        })
        .catch(error => {

            if (typeof (onerror) == "function") {
                onerror(error);
            }

        }).finally(function (e) {

            if (typeof (onfinally) == "function") {
                onfinally(e);
            }

        });

}

async function httpPost(url, data, onsuccess, onerror, onfinally) {

    const headers = new Headers();

    return await fetch(url, {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: data
    })
        .then(response => response.json())
        .then(data => {

            if (typeof (onsuccess) == "function") {
                onsuccess(data);
            }

        })
        .catch(error => {

            console.error('http-error:', error);
            if (typeof (onerror) == "function") {
                onerror(error);
            }

        })
        .finally(function (e) {

            if (typeof (onfinally) == "function") {
                onfinally(e);
            }
        });
}

export{
    httpDelete,
    httpPut,
    httpPatch,
    httpPost
}