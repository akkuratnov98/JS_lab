function request(url, options, skipJsonParse) {
    let headers;
    return fetch(url, options)
        .then((response) => {
            if (skipJsonParse) {
                return response.text().then(
                    data => {
                        if (response.ok) {
                            return data;
                        } else {
                            return Promise.reject({ status: response.status, message: response.statusText, data });
                        }
                    }
                );
            } else {
                return response.text()
                    .then(text => text ? JSON.parse(text) : {})
                    .then(data => {
                        if (response.ok) {
                            return data;
                        } else {
                            return Promise.reject({ status: response.status, message: response.statusText, data });
                        }
                    });
            }
        })
        .then((data) => ({ data, headers }))
        .catch((err) => ({
            err
        }));
}

export default request;
