function getUserToken() {
    const localToken = localStorage.getItem('token');
    return localToken;
}

function setUserToken(token) {
    localStorage.setItem('token', token);
}

function clearUserToken() {
    localStorage.setItem('token', null);
}

export {
    getUserToken,
    setUserToken,
    clearUserToken
}