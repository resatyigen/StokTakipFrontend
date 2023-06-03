function getUserToken() {
    const localToken = localStorage.getItem('token');
    return localToken;
}

function setUserToken(token) {
    localStorage.setItem('token', token);
}

export {
    getUserToken,
    setUserToken
}