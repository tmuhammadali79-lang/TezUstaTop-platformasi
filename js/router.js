/* ========================================
   TezUstaTop Platform — Router
   ======================================== */
const Router = {
    routes: {},
    currentRoute: null,
    register(path, handler) { this.routes[path] = handler; },
    navigate(path, params = {}) {
        this.currentRoute = path;
        window.location.hash = path;
        if (this.routes[path]) {
            this.routes[path](params);
        }
    },
    init() {
        window.addEventListener('hashchange', () => {
            const path = window.location.hash.slice(1) || '';
            if (this.routes[path]) {
                this.currentRoute = path;
                this.routes[path]({});
            }
        });
    },
    getCurrentRoute() { return this.currentRoute; }
};
