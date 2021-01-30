const axios = require('axios');

const BASE_API_URL = 'http://localhost:8080/manager/services';

export const get = async (path, dispatch, successCallback, errorCallback, getState) => {
    try {
        const authorizationHeader = buildAuthorizationToken(getState);

        const config = {
            method: 'get',
            url: `${BASE_API_URL}${path}`,
            headers: {...authorizationHeader}
        };

        console.log('GET: ', path, `Token -> ${authorizationHeader}`);
        const response = await axios(config);
        dispatch(successCallback(processResponse(response)));
    } catch (e) {
        processError(e, dispatch, errorCallback);
    }
};

export const post = async (path, body, dispatch, successCallback, errorCallback, getState) => {
    try {
        const authorizationHeader = buildAuthorizationToken(getState);

        const config = {
            method: 'post',
            url: `${BASE_API_URL}${path}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...body.getHeaders,
                ...authorizationHeader,
            },
            data: body
        };

        console.log('POST: ', path, `Token -> ${authorizationHeader}`);
        const response = await axios(config);
        dispatch(successCallback(processResponse(response)));
    } catch (e) {
        processError(e, dispatch, errorCallback);
    }
};

export const put = async (path, body, dispatch, successCallback, errorCallback, getState) => {
    try {
        const authorizationHeader = buildAuthorizationToken(getState);
        console.log(authorizationHeader);

        const config = {
            method: 'put',
            url: `${BASE_API_URL}${path}`,
            headers: {
                'Content-Type': 'application/json',
                ...body.getHeaders,
                ...authorizationHeader
            },
            data: body
        };

        console.log('PUT: ', path, `Token -> ${authorizationHeader}`);
        const response = await axios(config);
        dispatch(successCallback(processResponse(response)));
    } catch (e) {
        processError(e, dispatch, errorCallback);
    }
};

function buildAuthorizationToken(getState) {
    const state = getState();
    let authorizationHeader = '';
    if (state.user.logged) {
        authorizationHeader = {'Authorization': 'Bearer ' + state.user.userData.token.accessToken};
    }
    return authorizationHeader;
}

function processResponse(response) {
    return JSON.parse(JSON.stringify(response.data));
}

function processError(e, dispatch, errorCallback) {
    let data = e.response.data;
    const responseError = data.description;
    dispatch(errorCallback(responseError));
    console.log(responseError);
}
