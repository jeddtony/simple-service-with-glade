const keyWord = 'BOOKING_SYSTEM';
export const getLoginEmail = () => {
    return localStorage.getItem(keyWord+'_LOGIN_EMAIL');
}

export const setLoginEmail = (email) => {
    return localStorage.setItem(keyWord+'_LOGIN_EMAIL', email);
}

export const setLoginPassword = (password) => {
    return localStorage.setItem(keyWord+'_LOGIN_PASSWORD', password);
}

export const getLoginPassword = () => {
    return localStorage.getItem(keyWord+'_LOGIN_PASSWORD');
}

export const setToken = (token) => {
    localStorage.setItem(keyWord+'_TOKEN', token);
}

export const getToken = () => {
    return localStorage.getItem(keyWord+'_TOKEN');
}

export const setEmail = (email) => {
    localStorage.setItem(keyWord+'_EMAIL', email);
}

export const getEmail = () => {
    return localStorage.getItem(keyWord+'_EMAIL');
}

export const setName = (name) => {
    localStorage.setItem(keyWord+'_NAME', name);
}

export const getName = ()=> {
    return localStorage.getItem(keyWord + '_NAME');
}

export const setUserId = (id) => {
    localStorage.setItem(keyWord + '_USER_ID', id);
}

export const getUserId = ()=> {
    return localStorage.getItem(keyWord + '_USER_ID');
}

export const setRole = (id) => {
    localStorage.setItem(keyWord + '_ROLE_ID', id);
}

export const getRole = ()=> {
    return localStorage.getItem(keyWord + '_ROLE_ID');
}