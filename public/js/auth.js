// auth.js

function decodeToken(token) {
    if (!token) return null;
    try {
        return jwt_decode(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

function isTokenExpired(decodedToken) {
    if (!decodedToken) return true;
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime;
}

function clearAuthData() {
    localStorage.removeItem('token');
    window.location.href = '/admin/login.ejs';
}

function checkAuthAndFetchUserData(callback) {
    const token = localStorage.getItem('token');
    const decodedToken = decodeToken(token);

    if (!decodedToken || isTokenExpired(decodedToken)) {
        clearAuthData();
        return;
    }

    const userId = decodedToken.userId;
    

    fetch(`/app/user/read/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Unauthorized');
        }
        return response.json();
    })
    .then(data => {
        callback(null, data);
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
        clearAuthData();
        callback(error);
    });
}

// Export the function if you're using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkAuthAndFetchUserData };
}