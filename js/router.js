/* ========================================
   TezUstaTop Platform — Router
   ======================================== */
const Router = {
    routes: {},
    currentRoute: null,
    register(path, handler) { this.routes[path] = handler; },
    navigate(path, params = {}) {
        // Auth / Role Security check
        if (path.startsWith('client/') && (!AppData.isLoggedIn || AppData.currentRole !== 'client')) return this.navigate('login');
        if (path.startsWith('master/') && (!AppData.isLoggedIn || AppData.currentRole !== 'master')) return this.navigate('login');
        if (path.startsWith('admin/') && (!AppData.isLoggedIn || AppData.currentRole !== 'admin')) return this.navigate('login');

        this.currentRoute = path;
        window.location.hash = path;
        if (this.routes[path]) {
            this.routes[path](params);
        }
    },
    init() {
        window.addEventListener('hashchange', () => {
            const path = window.location.hash.slice(1) || '';
            
            // Auth / Role Security check on URL change
            if (path.startsWith('client/') && (!AppData.isLoggedIn || AppData.currentRole !== 'client')) { window.location.hash='login'; return; }
            if (path.startsWith('master/') && (!AppData.isLoggedIn || AppData.currentRole !== 'master')) { window.location.hash='login'; return; }
            if (path.startsWith('admin/') && (!AppData.isLoggedIn || AppData.currentRole !== 'admin')) { window.location.hash='login'; return; }

            if (this.routes[path]) {
                this.currentRoute = path;
                this.routes[path]({});
            }
        });
    },
    getCurrentRoute() { return this.currentRoute; }
};
