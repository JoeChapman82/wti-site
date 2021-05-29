module.exports = {
    session: {
        cookieName: 'wti-session',
        cookieLifespan: 36000000,
        httpOnly: true,
        secure: false,
        signed: true
    },
    csrf: {
        lifespan: 36000,
        httpOnly: true,
        secure: false,
        signed: true
    },
    defaultPassword: 'wildlifetrust',
    recordRetrievalLimit: 100,
    updateDashboardDataTimeMs: 600000
};
