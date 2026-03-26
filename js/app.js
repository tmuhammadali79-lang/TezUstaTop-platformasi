/* ========================================
   TezUstaTop Platform — Main App (Part 1)
   Landing, Auth, Navbar, Sidebar
   ======================================== */
(function() {
'use strict';

const $ = id => document.getElementById(id);
const navbar = () => $('top-navbar');
const sidebar = () => $('sidebar');
const main = () => $('main-content');

function showToast(msg, type='info') {
    const c = $('toast-container');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `${AppData.icons.check} <span>${msg}</span>`;
    c.appendChild(t);
    setTimeout(() => { t.style.opacity='0'; setTimeout(() => t.remove(), 300); }, 3000);
}

/* ---- NAVBAR ---- */
function renderNavbar() {
    const n = navbar();
    if (!AppData.isLoggedIn) {
        n.innerHTML = `<div class="navbar-inner">
            <a class="navbar-brand" onclick="Router.navigate('')" style="cursor:pointer">
                <svg width="36" height="36" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" fill="url(#ng)"/><path d="M20 38l6-14h4l-3 8h6l-10 16h-2l3-10H20z" fill="white"/><path d="M34 22l6-2 4 10-6 2-4-10z" fill="white" opacity="0.8"/><defs><linearGradient id="ng" x1="0" y1="0" x2="64" y2="64"><stop offset="0%" stop-color="#6366F1"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient></defs></svg>
                <span class="navbar-brand-text">TezUstaTop</span>
            </a>
            <div class="navbar-links">
                <a class="navbar-link" onclick="Router.navigate('')">Bosh sahifa</a>
                <a class="navbar-link" onclick="Router.navigate('services')">Xizmatlar</a>
                <a class="navbar-link" onclick="Router.navigate('masters')">Ustalar</a>
            </div>
            <div class="navbar-actions">
                <button class="btn btn-outline btn-sm" onclick="Router.navigate('login')">Kirish</button>
                <button class="btn btn-primary btn-sm" onclick="Router.navigate('register')">Ro'yxatdan o'tish</button>
            </div>
        </div>`;
    } else {
        const u = AppData.currentUser;
        const roleName = {client:'Mijoz',master:'Usta',admin:'Admin'}[AppData.currentRole];
        n.innerHTML = `<div class="navbar-inner">
            <a class="navbar-brand" style="cursor:pointer" onclick="Router.navigate('${AppData.currentRole}/home')">
                <svg width="36" height="36" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" fill="url(#ng2)"/><path d="M20 38l6-14h4l-3 8h6l-10 16h-2l3-10H20z" fill="white"/><defs><linearGradient id="ng2" x1="0" y1="0" x2="64" y2="64"><stop offset="0%" stop-color="#6366F1"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient></defs></svg>
                <span class="navbar-brand-text">TezUstaTop</span>
            </a>
            <div class="navbar-links">
                <span class="badge badge-primary" style="font-size:0.75rem">${roleName} panel</span>
            </div>
            <div class="navbar-actions">
                <button class="btn btn-ghost btn-icon" onclick="showToast('Bildirishnomalar','info')" style="position:relative">
                    ${AppData.icons.bell}
                    <span style="position:absolute;top:4px;right:4px;width:8px;height:8px;background:var(--danger-500);border-radius:50%;border:2px solid white"></span>
                </button>
                <div class="navbar-user" onclick="Router.navigate('${AppData.currentRole}/profile')">
                    <div class="navbar-avatar">${u.initials}</div>
                    <span class="navbar-username">${u.name}</span>
                </div>
                <button class="btn btn-ghost btn-sm" onclick="doLogout()" style="color:var(--danger-500)">${AppData.icons.logout}</button>
            </div>
        </div>`;
    }
}

/* ---- SIDEBAR ---- */
function renderSidebar(role) {
    const s = sidebar();
    s.classList.remove('hidden');
    main().classList.add('has-sidebar');
    const items = {
        client: [
            {l:'Asosiy',items:[
                {icon:AppData.icons.home,text:'Bosh sahifa',route:'client/home'},
                {icon:AppData.icons.search,text:'Xizmatlar',route:'client/services'},
                {icon:AppData.icons.orders,text:'Buyurtmalarim',route:'client/orders',badge:'2'},
                {icon:AppData.icons.chat,text:'Xabarlar',route:'client/chat'},
            ]},
            {l:'Profil',items:[
                {icon:AppData.icons.profile,text:'Profilim',route:'client/profile'},
                {icon:AppData.icons.settings,text:'Sozlamalar',route:'client/settings'},
            ]},
        ],
        master: [
            {l:'Asosiy',items:[
                {icon:AppData.icons.home,text:'Bosh sahifa',route:'master/home'},
                {icon:AppData.icons.orders,text:'Buyurtmalar',route:'master/orders',badge:'3'},
                {icon:AppData.icons.wallet,text:'Hamyon',route:'master/wallet'},
            ]},
            {l:'Profil',items:[
                {icon:AppData.icons.profile,text:'Profilim',route:'master/profile'},
                {icon:AppData.icons.settings,text:'Sozlamalar',route:'master/settings'},
            ]},
        ],
        admin: [
            {l:'Boshqaruv',items:[
                {icon:AppData.icons.dashboard,text:'Dashboard',route:'admin/home'},
                {icon:AppData.icons.users,text:'Ustalarni tasdiqlash',route:'admin/verify',badge:'3'},
                {icon:AppData.icons.creditCard,text:'Tranzaksiyalar',route:'admin/transactions'},
                {icon:AppData.icons.alertCircle,text:'Nizolar',route:'admin/disputes',badge:'2'},
            ]},
            {l:'Tizim',items:[
                {icon:AppData.icons.settings,text:'Sozlamalar',route:'admin/settings'},
            ]},
        ],
    };
    const sections = items[role] || [];
    let html = '';
    sections.forEach(sec => {
        html += `<div class="sidebar-section"><div class="sidebar-label">${sec.l}</div>`;
        sec.items.forEach(it => {
            const active = Router.getCurrentRoute() === it.route ? 'active' : '';
            html += `<div class="sidebar-item ${active}" onclick="Router.navigate('${it.route}')">
                ${it.icon}<span>${it.text}</span>
                ${it.badge ? `<span class="sidebar-badge">${it.badge}</span>` : ''}
            </div>`;
        });
        html += '</div>';
    });
    html += `<div class="sidebar-divider"></div>
        <div class="sidebar-item" onclick="doLogout()" style="color:var(--danger-500)">
            ${AppData.icons.logout}<span>Chiqish</span>
        </div>`;
    s.innerHTML = html;
}

function hideSidebar() {
    sidebar().classList.add('hidden');
    main().classList.remove('has-sidebar');
}

/* ---- AUTH ---- */
window._authStep = 1;
window._selectedRole = null;
window._authPhone = '';
window._otpTimer = null;
window._otpSeconds = 0;

window.doLogout = function() {
    AppData.isLoggedIn = false;
    AppData.currentUser = null;
    AppData.currentRole = null;
    window._authStep = 1;
    window._selectedRole = null;
    window._authPhone = '';
    hideSidebar();
    renderNavbar();
    Router.navigate('');
};

window.doLogin = function(role) {
    AppData.isLoggedIn = true;
    AppData.currentRole = role;
    const users = {
        client: {name:'Abdulloh Rahimov',initials:'AR',balance:500000},
        master: {name:'Aziz Karimov',initials:'AK',balance:870000},
        admin: {name:'Admin',initials:'AD',balance:0},
    };
    AppData.currentUser = users[role];
    window._authStep = 1;
    window._selectedRole = null;
    window._authPhone = '';
    if (window._otpTimer) clearInterval(window._otpTimer);
    renderNavbar();
    Router.navigate(role === 'admin' ? 'admin/home' : `${role}/home`);
    showToast('Tizimga muvaffaqiyatli kirdingiz!', 'success');
};

window.authGoToPhone = function() {
    if (!window._selectedRole) { showToast('Rolni tanlang','error'); return; }
    window._authStep = 2;
    renderLoginPage();
};

window.authGoToOtp = function() {
    const phoneInput = document.getElementById('auth-phone');
    const phone = phoneInput ? phoneInput.value.replace(/\s/g,'') : '';
    if (phone.length < 9) { showToast('Telefon raqamni to\'liq kiriting','error'); return; }
    window._authPhone = phone;
    window._authStep = 3;
    window._otpSeconds = 60;
    renderLoginPage();
    // Start countdown
    if (window._otpTimer) clearInterval(window._otpTimer);
    window._otpTimer = setInterval(() => {
        window._otpSeconds--;
        const el = document.getElementById('otp-countdown');
        if (el) {
            if (window._otpSeconds > 0) {
                el.innerHTML = `<span style="color:var(--gray-500)">Qayta yuborish: <strong style="color:var(--primary-600)">${window._otpSeconds}s</strong></span>`;
            } else {
                el.innerHTML = `<button class="btn btn-ghost btn-sm" onclick="window.authResendOtp()" style="color:var(--primary-600);font-weight:600">📩 Kodni qayta yuborish</button>`;
                clearInterval(window._otpTimer);
            }
        }
    }, 1000);
    // Auto-focus first OTP input
    setTimeout(() => { const f = document.querySelector('.otp-input'); if(f) f.focus(); }, 100);
};

window.authResendOtp = function() {
    window._otpSeconds = 60;
    showToast('Yangi SMS kod yuborildi!', 'success');
    if (window._otpTimer) clearInterval(window._otpTimer);
    window._otpTimer = setInterval(() => {
        window._otpSeconds--;
        const el = document.getElementById('otp-countdown');
        if (el) {
            if (window._otpSeconds > 0) {
                el.innerHTML = `<span style="color:var(--gray-500)">Qayta yuborish: <strong style="color:var(--primary-600)">${window._otpSeconds}s</strong></span>`;
            } else {
                el.innerHTML = `<button class="btn btn-ghost btn-sm" onclick="window.authResendOtp()" style="color:var(--primary-600);font-weight:600">📩 Kodni qayta yuborish</button>`;
                clearInterval(window._otpTimer);
            }
        }
    }, 1000);
};

window.authVerifyOtp = function() {
    const inputs = document.querySelectorAll('.otp-input');
    let code = '';
    inputs.forEach(inp => code += inp.value);
    if (code.length < 6) { showToast('6 xonali kodni to\'liq kiriting','error'); return; }
    // Show loading state
    const btn = document.getElementById('otp-verify-btn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<div class="spinner-sm"></div> Tekshirilmoqda...'; }
    // Simulate verification delay
    setTimeout(() => {
        if (window._otpTimer) clearInterval(window._otpTimer);
        showToast('Telefon raqam tasdiqlandi! ✅', 'success');
        setTimeout(() => doLogin(window._selectedRole), 400);
    }, 1500);
};

window.handleOtpInput = function(el, index) {
    el.value = el.value.replace(/[^0-9]/g, '');
    if (el.value.length === 1 && index < 5) {
        const next = el.nextElementSibling;
        if (next) next.focus();
    }
    // Check if all filled
    const inputs = document.querySelectorAll('.otp-input');
    let allFilled = true;
    inputs.forEach(inp => { if(!inp.value) allFilled = false; });
    if (allFilled) {
        setTimeout(() => window.authVerifyOtp(), 200);
    }
};

window.handleOtpKeydown = function(e, index) {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
        const prev = e.target.previousElementSibling;
        if (prev) { prev.focus(); prev.value = ''; }
    }
};

window.handleOtpPaste = function(e) {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g,'').slice(0,6);
    const inputs = document.querySelectorAll('.otp-input');
    paste.split('').forEach((ch, i) => { if(inputs[i]) inputs[i].value = ch; });
    if (paste.length === 6) setTimeout(() => window.authVerifyOtp(), 200);
};

window.formatPhoneInput = function(el) {
    let v = el.value.replace(/[^0-9]/g, '').slice(0, 9);
    if (v.length > 2) v = v.slice(0,2) + ' ' + v.slice(2);
    if (v.length > 6) v = v.slice(0,6) + ' ' + v.slice(6);
    if (v.length > 9) v = v.slice(0,9) + ' ' + v.slice(9);
    el.value = v;
};

function renderLoginPage() {
    hideSidebar();
    renderNavbar();
    const step = window._authStep || 1;
    const roleName = {client:'Mijoz',master:'Usta',admin:'Admin'}[window._selectedRole] || '';

    // Step indicators
    const stepsHtml = `<div class="auth-steps">
        <div class="auth-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}">
            <div class="auth-step-dot">${step > 1 ? '✓' : '1'}</div>
            <span>Rol</span>
        </div>
        <div class="auth-step-line ${step > 1 ? 'active' : ''}"></div>
        <div class="auth-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}">
            <div class="auth-step-dot">${step > 2 ? '✓' : '2'}</div>
            <span>Telefon</span>
        </div>
        <div class="auth-step-line ${step > 2 ? 'active' : ''}"></div>
        <div class="auth-step ${step >= 3 ? 'active' : ''}">
            <div class="auth-step-dot">3</div>
            <span>Tasdiqlash</span>
        </div>
    </div>`;

    let bodyHtml = '';

    if (step === 1) {
        bodyHtml = `
            <h1>👋 Xush kelibsiz!</h1>
            <p class="auth-subtitle">Kim sifatida kirmoqchisiz?</p>
            <div class="role-cards">
                <div class="role-card ${window._selectedRole==='client'?'selected':''}" onclick="this.parentElement.querySelectorAll('.role-card').forEach(c=>c.classList.remove('selected'));this.classList.add('selected');window._selectedRole='client'">
                    <div class="role-icon" style="background:var(--primary-50);color:var(--primary-600)">👤</div>
                    <div><div class="role-title">Mijoz</div><div class="role-desc">Usta toping va xizmat buyurtma qiling</div></div>
                </div>
                <div class="role-card ${window._selectedRole==='master'?'selected':''}" onclick="this.parentElement.querySelectorAll('.role-card').forEach(c=>c.classList.remove('selected'));this.classList.add('selected');window._selectedRole='master'">
                    <div class="role-icon" style="background:var(--accent-50);color:var(--accent-600)">🔧</div>
                    <div><div class="role-title">Usta</div><div class="role-desc">Buyurtmalar qabul qilib, daromad oling</div></div>
                </div>
                <div class="role-card ${window._selectedRole==='admin'?'selected':''}" onclick="this.parentElement.querySelectorAll('.role-card').forEach(c=>c.classList.remove('selected'));this.classList.add('selected');window._selectedRole='admin'">
                    <div class="role-icon" style="background:var(--danger-50);color:var(--danger-600)">🛡️</div>
                    <div><div class="role-title">Admin</div><div class="role-desc">Tizimni boshqaring va nazorat qiling</div></div>
                </div>
            </div>
            <button class="btn btn-primary btn-lg btn-block" onclick="authGoToPhone()">Davom etish →</button>`;
    } else if (step === 2) {
        bodyHtml = `
            <div style="text-align:center;margin-bottom:8px">
                <div style="width:80px;height:80px;border-radius:50%;background:var(--primary-50);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:2.5rem">📱</div>
                <h1 style="font-size:1.75rem">Telefon raqamingiz</h1>
                <p class="auth-subtitle">${roleName} sifatida kirish uchun telefon raqamingizni kiriting</p>
            </div>
            <div class="phone-input-group">
                <div class="phone-prefix">
                    <span style="font-size:1.25rem">🇺🇿</span>
                    <span style="font-weight:700;color:var(--gray-800)">+998</span>
                </div>
                <input type="tel" id="auth-phone" class="form-input phone-number-input" placeholder="90 123 45 67" maxlength="12" oninput="formatPhoneInput(this)" autofocus>
            </div>
            <p style="font-size:0.75rem;color:var(--gray-500);margin:12px 0 20px;text-align:center">SMS orqali tasdiqlash kodi yuboriladi</p>
            <button class="btn btn-primary btn-lg btn-block" onclick="authGoToOtp()">📩 SMS kod yuborish</button>
            <button class="btn btn-ghost btn-block" onclick="window._authStep=1;renderLoginPage()" style="margin-top:8px;color:var(--gray-500)">← Orqaga qaytish</button>`;
    } else if (step === 3) {
        bodyHtml = `
            <div style="text-align:center;margin-bottom:8px">
                <div style="width:80px;height:80px;border-radius:50%;background:var(--success-50);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:2.5rem">🔐</div>
                <h1 style="font-size:1.75rem">Kodni kiriting</h1>
                <p class="auth-subtitle">+998 ${window._authPhone} raqamiga yuborilgan 6 xonali kodni kiriting</p>
            </div>
            <div class="otp-container">
                <input type="text" class="otp-input" maxlength="1" inputmode="numeric" oninput="handleOtpInput(this,0)" onkeydown="handleOtpKeydown(event,0)" onpaste="handleOtpPaste(event)">
                <input type="text" class="otp-input" maxlength="1" inputmode="numeric" oninput="handleOtpInput(this,1)" onkeydown="handleOtpKeydown(event,1)">
                <input type="text" class="otp-input" maxlength="1" inputmode="numeric" oninput="handleOtpInput(this,2)" onkeydown="handleOtpKeydown(event,2)">
                <div class="otp-separator">—</div>
                <input type="text" class="otp-input" maxlength="1" inputmode="numeric" oninput="handleOtpInput(this,3)" onkeydown="handleOtpKeydown(event,3)">
                <input type="text" class="otp-input" maxlength="1" inputmode="numeric" oninput="handleOtpInput(this,4)" onkeydown="handleOtpKeydown(event,4)">
                <input type="text" class="otp-input" maxlength="1" inputmode="numeric" oninput="handleOtpInput(this,5)" onkeydown="handleOtpKeydown(event,5)">
            </div>
            <div id="otp-countdown" style="text-align:center;margin:16px 0">
                <span style="color:var(--gray-500)">Qayta yuborish: <strong style="color:var(--primary-600)">${window._otpSeconds}s</strong></span>
            </div>
            <button id="otp-verify-btn" class="btn btn-primary btn-lg btn-block" onclick="authVerifyOtp()">✅ Tasdiqlash</button>
            <button class="btn btn-ghost btn-block" onclick="window._authStep=2;if(window._otpTimer)clearInterval(window._otpTimer);renderLoginPage()" style="margin-top:8px;color:var(--gray-500)">← Raqamni o'zgartirish</button>`;
    }

    main().innerHTML = `<div class="auth-container page-enter">
        <div class="auth-card">
            ${stepsHtml}
            ${bodyHtml}
            <p style="text-align:center;margin-top:20px;color:var(--gray-500);font-size:0.8125rem">
                <a onclick="window._authStep=1;Router.navigate('')" style="color:var(--primary-600);cursor:pointer;font-weight:600">← Bosh sahifaga qaytish</a>
            </p>
        </div>
    </div>`;
}

/* ---- LANDING PAGE ---- */
function renderLandingPage() {
    hideSidebar();
    renderNavbar();
    const cats = AppData.categories.slice(0, 8);
    const topMasters = AppData.masters.filter(m => m.verified).slice(0, 4);
    main().innerHTML = `
    <!-- HERO -->
    <section class="landing-hero">
        <div class="hero-inner">
            <div class="hero-text" style="animation:fadeInUp 0.6s ease-out">
                <h1>Ishonchli ustalarni <span>tez toping!</span></h1>
                <p>O'zbekiston bo'ylab minglab professional ustalar bir platformada. Santexnik, elektrik, konditsioner va boshqa xizmatlarni buyurtma qiling.</p>
                <div class="hero-actions">
                    <button class="hero-btn hero-btn-primary" onclick="Router.navigate('login')">🚀 Boshlash</button>
                    <button class="hero-btn hero-btn-outline" onclick="Router.navigate('services')">Xizmatlarni ko'rish</button>
                </div>
                <div class="hero-stats-row">
                    <div class="hero-stat-item"><div class="hero-stat-val">1,200+</div><div class="hero-stat-lbl">Ustalar</div></div>
                    <div class="hero-stat-item"><div class="hero-stat-val">5,000+</div><div class="hero-stat-lbl">Buyurtmalar</div></div>
                    <div class="hero-stat-item"><div class="hero-stat-val">4.8 ⭐</div><div class="hero-stat-lbl">O'rtacha baho</div></div>
                </div>
            </div>
            <div class="hero-visual" style="animation:fadeInUp 0.8s ease-out">
                <div class="hero-phone-mockup">
                    <div class="hero-phone-screen">
                        <div class="phone-header-mock">
                            <div class="phm-greeting">Assalomu alaykum 👋</div>
                            <div class="phm-name">Abdulloh</div>
                        </div>
                        <div class="phone-body-mock">
                            <div class="phone-cats-grid">
                                ${cats.slice(0,4).map(c=>`<div class="phone-cat-item"><div class="pci-icon" style="background:${c.bgColor}">${c.icon}</div><div class="pci-name">${c.name}</div></div>`).join('')}
                            </div>
                            ${topMasters.slice(0,3).map(m=>`<div class="phone-master-card"><div class="pmc-avatar">${m.initials}</div><div><div class="pmc-name">${m.name}</div><div class="pmc-spec">${m.specialty} ⭐${m.rating}</div></div></div>`).join('')}
                        </div>
                    </div>
                    <div class="phone-floating-badge">✅ 342 ta ish</div>
                </div>
            </div>
        </div>
    </section>

    <!-- CATEGORIES -->
    <section class="landing-section bg-white">
        <div class="landing-section-inner">
            <div class="landing-section-header">
                <h2>Xizmat turlari</h2>
                <p>Barcha turdagi uy xizmatlari bir joyda</p>
            </div>
            <div class="categories-grid">
                ${cats.map(c => `<div class="category-card" onclick="Router.navigate('services')">
                    <div class="category-icon" style="background:${c.bgColor}">${c.icon}</div>
                    <div class="category-name">${c.name}</div>
                </div>`).join('')}
            </div>
        </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="landing-section">
        <div class="landing-section-inner">
            <div class="landing-section-header">
                <h2>Qanday ishlaydi?</h2>
                <p>3 oddiy qadamda kerakli ustani toping</p>
            </div>
            <div class="how-it-works-grid">
                <div class="how-step">
                    <div class="how-step-num">1</div>
                    <h3>Xizmatni tanlang</h3>
                    <p>Sizga kerakli xizmat turini tanlang va buyurtma yarating</p>
                </div>
                <div class="how-step">
                    <div class="how-step-num">2</div>
                    <h3>Usta tanlang</h3>
                    <p>Eng yaqin va eng yaxshi ustalardan birini tanlang</p>
                </div>
                <div class="how-step">
                    <div class="how-step-num">3</div>
                    <h3>Ish bajarilsin</h3>
                    <p>Usta keladi, ishni bajaradi, siz baholaysiz</p>
                </div>
            </div>
        </div>
    </section>

    <!-- TOP MASTERS -->
    <section class="landing-section bg-white">
        <div class="landing-section-inner">
            <div class="landing-section-header">
                <h2>Eng yaxshi ustalar ⭐</h2>
                <p>Mijozlar tomonidan yuqori baholangan ustalar</p>
            </div>
            <div class="masters-grid">
                ${topMasters.map(m => `<div class="master-card" onclick="Router.navigate('login')">
                    <div class="avatar">${m.initials}</div>
                    <div class="master-info">
                        <div class="master-name">${m.name} ${m.verified ? AppData.icons.verified : ''}</div>
                        <div class="master-specialty">${m.specialty}</div>
                        <div class="master-meta">
                            <span style="display:flex;align-items:center;gap:2px">${generateStars(m.rating)} <strong style="color:var(--gray-800);margin-left:4px">${m.rating}</strong></span>
                            <span>${AppData.icons.location} ${m.district}</span>
                        </div>
                    </div>
                </div>`).join('')}
            </div>
        </div>
    </section>

    <!-- FEATURES -->
    <section class="landing-section">
        <div class="landing-section-inner">
            <div class="landing-section-header">
                <h2>Nega aynan TezUstaTop?</h2>
                <p>Bizning afzalliklarimiz</p>
            </div>
            <div class="features-grid">
                <div class="feature-card"><div class="feature-icon" style="background:var(--primary-50)">🛡️</div><h3>Xavfsiz to'lov</h3><p>Escrow tizimi orqali pulingiz himoyalangan</p></div>
                <div class="feature-card"><div class="feature-icon" style="background:var(--accent-50)">⚡</div><h3>Tez xizmat</h3><p>O'rtacha 30 daqiqada usta topiladi</p></div>
                <div class="feature-card"><div class="feature-icon" style="background:var(--warm-50)">⭐</div><h3>Tasdiqlangan ustalar</h3><p>Barcha ustalar tekshirilgan va sertifikatlangan</p></div>
                <div class="feature-card"><div class="feature-icon" style="background:var(--success-50)">💬</div><h3>Real vaqt chat</h3><p>Usta bilan to'g'ridan-to'g'ri aloqa qiling</p></div>
                <div class="feature-card"><div class="feature-icon" style="background:var(--danger-50)">📍</div><h3>GPS kuzatish</h3><p>Ustaning real vaqtdagi joylashuvini kuzating</p></div>
                <div class="feature-card"><div class="feature-icon" style="background:#F5F3FF">📊</div><h3>Shaffof narxlar</h3><p>Oldindan narx bilib, taqqoslang</p></div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
        <div class="cta-inner">
            <h2>Hoziroq boshlang!</h2>
            <p>Minglab foydalanuvchilar allaqachon TezUstaTop'dan foydalanmoqda</p>
            <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
                <button class="hero-btn hero-btn-primary" onclick="Router.navigate('login')">Mijoz sifatida kirish</button>
                <button class="hero-btn hero-btn-outline" onclick="Router.navigate('login')">Usta sifatida kirish</button>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="site-footer">
        <div class="footer-inner">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div style="display:flex;align-items:center;gap:10px">
                        <svg width="32" height="32" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="30" fill="url(#fg)"/><path d="M20 38l6-14h4l-3 8h6l-10 16h-2l3-10H20z" fill="white"/><defs><linearGradient id="fg" x1="0" y1="0" x2="64" y2="64"><stop offset="0%" stop-color="#6366F1"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient></defs></svg>
                        <span style="color:white;font-family:var(--font-display);font-size:1.25rem;font-weight:800">TezUstaTop</span>
                    </div>
                    <p>O'zbekistondagi eng ishonchli usta topish platformasi. Tez, sifatli va xavfsiz xizmat.</p>
                </div>
                <div class="footer-col"><h4>Xizmatlar</h4><a href="#">Santexnika</a><a href="#">Elektrika</a><a href="#">Konditsioner</a><a href="#">Uy ta'miri</a></div>
                <div class="footer-col"><h4>Kompaniya</h4><a href="#">Biz haqimizda</a><a href="#">Bog'lanish</a><a href="#">Foydalanish shartlari</a></div>
                <div class="footer-col"><h4>Yordam</h4><a href="#">FAQ</a><a href="#">Qo'llab-quvvatlash</a><a href="#">Shikoyat yuborish</a></div>
            </div>
            <div class="footer-bottom">
                <span>© 2026 TezUstaTop. Barcha huquqlar himoyalangan.</span>
                <span>O'zbekiston 🇺🇿</span>
            </div>
        </div>
    </footer>`;
}

/* ---- SERVICES PAGE ---- */
function renderServicesPage() {
    hideSidebar(); renderNavbar();
    main().innerHTML = `<div class="page-container page-enter">
        <div class="section-header"><h1 style="font-size:2rem">Xizmat turlari</h1></div>
        <div class="categories-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">
            ${AppData.categories.map(c => `<div class="category-card" onclick="Router.navigate('login')">
                <div class="category-icon" style="background:${c.bgColor};width:64px;height:64px;font-size:2rem">${c.icon}</div>
                <div class="category-name" style="font-size:1rem">${c.name}</div>
                <div style="font-size:0.75rem;color:var(--gray-500)">${c.subServices.length} xizmat</div>
            </div>`).join('')}
        </div>
        <div style="text-align:center;margin-top:40px">
            <button class="btn btn-primary btn-lg" onclick="Router.navigate('login')">Buyurtma berish uchun kiring</button>
        </div>
    </div>`;
}

function renderMastersPage() {
    hideSidebar(); renderNavbar();
    main().innerHTML = `<div class="page-container page-enter">
        <div class="section-header"><h1 style="font-size:2rem">Barcha ustalar</h1></div>
        <div class="masters-grid">
            ${AppData.masters.map(m => `<div class="master-card" onclick="Router.navigate('login')">
                <div class="avatar avatar-lg">${m.initials}</div>
                <div class="master-info">
                    <div class="master-name">${m.name} ${m.verified ? AppData.icons.verified : ''}</div>
                    <div class="master-specialty">${m.specialty}</div>
                    <div class="master-meta">
                        <span style="display:flex;align-items:center;gap:2px">${generateStars(m.rating)} <strong style="color:var(--gray-800)">${m.rating}</strong></span>
                        <span>${m.completedJobs} ta ish</span>
                        <span>${AppData.icons.location} ${m.district}</span>
                    </div>
                </div>
            </div>`).join('')}
        </div>
    </div>`;
}

/* Register Landing/Auth routes */
Router.register('', () => renderLandingPage());
Router.register('services', () => renderServicesPage());
Router.register('masters', () => renderMastersPage());
Router.register('login', () => renderLoginPage());
Router.register('register', () => renderLoginPage());

window.showToast = showToast;
window.renderNavbar = renderNavbar;
window.renderSidebar = renderSidebar;
window.hideSidebar = hideSidebar;

/* ---- CLIENT PAGES ---- */
Router.register('client/home', () => {
    renderNavbar(); renderSidebar('client');
    const activeOrders = AppData.orders.filter(o => o.status === 'active');
    const cats = AppData.categories.slice(0, 8);
    const topMasters = AppData.masters.filter(m => m.verified).slice(0, 4);
    main().innerHTML = `<div class="page-container page-enter">
        <div class="dash-welcome">
            <h2>Assalomu alaykum, ${AppData.currentUser.name} 👋</h2>
            <p>Qanday xizmat kerak?</p>
            <div style="margin-top:16px;position:relative;max-width:500px">
                <input class="form-input" placeholder="Xizmat qidirish..." style="padding-left:44px;background:rgba(255,255,255,0.15);border:none;color:white;backdrop-filter:blur(8px)">
                <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:rgba(255,255,255,0.6)">${AppData.icons.search}</span>
            </div>
        </div>
        ${activeOrders.length ? `<div class="section"><div class="section-header"><div class="section-title">Faol buyurtma</div></div>
            ${activeOrders.map(o => {
                const m = AppData.masters.find(x => x.id === o.masterId);
                return `<div class="card" style="border-left:4px solid var(--accent-500);cursor:pointer">
                    <div style="display:flex;align-items:center;justify-content:space-between">
                        <div><strong>${o.service}</strong><div style="font-size:0.8125rem;color:var(--gray-500)">${m ? m.name : ''} — Jarayonda</div></div>
                        <span class="badge badge-accent">● Faol</span>
                    </div>
                </div>`;
            }).join('')}
        </div>` : ''}
        <div class="section">
            <div class="section-header"><div class="section-title">Xizmat turlari</div><a class="section-link" onclick="Router.navigate('client/services')">Barchasi →</a></div>
            <div class="categories-grid">${cats.map(c => `<div class="category-card" onclick="Router.navigate('client/services')">
                <div class="category-icon" style="background:${c.bgColor}">${c.icon}</div>
                <div class="category-name">${c.name}</div>
            </div>`).join('')}</div>
        </div>
        <div class="section">
            <div class="section-header"><div class="section-title">Eng yaxshi ustalar ⭐</div></div>
            <div class="masters-grid">${topMasters.map(m => `<div class="master-card">
                <div class="avatar">${m.initials}</div>
                <div class="master-info">
                    <div class="master-name">${m.name} ${m.verified ? AppData.icons.verified : ''}</div>
                    <div class="master-specialty">${m.specialty}</div>
                    <div class="master-meta"><span>${generateStars(m.rating)} <strong style="color:var(--gray-800)">${m.rating}</strong></span><span>${m.distance} km</span></div>
                </div>
            </div>`).join('')}</div>
        </div>
    </div>`;
});

Router.register('client/services', () => {
    renderNavbar(); renderSidebar('client');
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Xizmatlar</h2>
        <div class="categories-grid" style="grid-template-columns:repeat(auto-fill,minmax(160px,1fr))">
            ${AppData.categories.map(c => `<div class="category-card">
                <div class="category-icon" style="background:${c.bgColor};width:64px;height:64px;font-size:2rem">${c.icon}</div>
                <div class="category-name">${c.name}</div>
                <div style="font-size:0.75rem;color:var(--gray-500)">${c.subServices.length} xizmat</div>
            </div>`).join('')}
        </div>
    </div>`;
});

Router.register('client/orders', () => {
    renderNavbar(); renderSidebar('client');
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Buyurtmalarim</h2>
        <div class="orders-grid">${AppData.orders.map(o => {
            const cat = AppData.categories.find(c => c.id === o.categoryId);
            return `<div class="order-card">
                <div class="order-card-header">
                    <div class="order-card-service">${cat ? cat.icon : ''} ${o.service}</div>
                    <span class="badge badge-${getStatusClass(o.status)}">${getStatusText(o.status)}</span>
                </div>
                <div class="order-card-body">${o.description}</div>
                <div class="order-card-footer"><span style="color:var(--gray-500)">${o.address}</span><span class="order-price">${formatPrice(o.price)}</span></div>
            </div>`;
        }).join('')}</div>
    </div>`;
});

['client/chat','client/profile','client/settings'].forEach(route => {
    const titles = {'client/chat':'Xabarlar','client/profile':'Profilim','client/settings':'Sozlamalar'};
    Router.register(route, () => {
        renderNavbar(); renderSidebar('client');
        main().innerHTML = `<div class="page-container page-enter">
            <h2 style="margin-bottom:24px">${titles[route]}</h2>
            <div class="card" style="padding:40px;text-align:center">
                <div style="font-size:3rem;margin-bottom:16px">🚧</div>
                <h3 style="color:var(--gray-700)">Tez orada</h3>
                <p style="color:var(--gray-500);margin-top:8px">Bu bo'lim hozirda ishlab chiqilmoqda</p>
            </div>
        </div>`;
    });
});

/* ---- MASTER PAGES ---- */
Router.register('master/home', () => {
    renderNavbar(); renderSidebar('master');
    const pendingOrders = AppData.orders.filter(o => o.status === 'pending');
    const activeOrders = AppData.orders.filter(o => o.status === 'active');
    main().innerHTML = `<div class="page-container page-enter">
        <div class="dash-welcome" style="background:linear-gradient(160deg,#14B8A6 0%,#06B6D4 50%,#0EA5E9 100%)">
            <h2>Xush kelibsiz, ${AppData.currentUser.name} 🔧</h2>
            <p>Bugungi statistika</p>
            <div style="display:flex;gap:16px;margin-top:16px;flex-wrap:wrap">
                <div style="background:rgba(255,255,255,0.15);padding:12px 20px;border-radius:var(--radius-md);backdrop-filter:blur(8px);text-align:center;min-width:100px">
                    <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:800">${pendingOrders.length}</div>
                    <div style="font-size:0.75rem;opacity:0.85">Yangi buyurtma</div>
                </div>
                <div style="background:rgba(255,255,255,0.15);padding:12px 20px;border-radius:var(--radius-md);backdrop-filter:blur(8px);text-align:center;min-width:100px">
                    <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:800">${activeOrders.length}</div>
                    <div style="font-size:0.75rem;opacity:0.85">Faol ish</div>
                </div>
                <div style="background:rgba(255,255,255,0.15);padding:12px 20px;border-radius:var(--radius-md);backdrop-filter:blur(8px);text-align:center;min-width:100px">
                    <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:800">${formatPrice(AppData.currentUser.balance).replace(" so'm",'')}</div>
                    <div style="font-size:0.75rem;opacity:0.85">Bugungi</div>
                </div>
            </div>
        </div>
        ${pendingOrders.length ? `<div class="section"><div class="section-header"><div class="section-title">Yangi buyurtmalar 🔔</div><span class="badge badge-warning">${pendingOrders.length} ta</span></div>
            <div class="orders-grid">${pendingOrders.map(o => {
                const cat = AppData.categories.find(c => c.id === o.categoryId);
                return `<div class="card" style="border-left:4px solid var(--warm-400)">
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                        <strong>${cat ? cat.icon : ''} ${o.service}</strong>
                        <span class="badge badge-warning">Yangi</span>
                    </div>
                    <p style="font-size:0.875rem;color:var(--gray-600);margin-bottom:12px">${o.description}</p>
                    <div style="font-size:0.8125rem;color:var(--gray-500);display:flex;gap:16px;margin-bottom:12px">
                        <span>${AppData.icons.location} ${o.address}</span>
                        <span>${AppData.icons.clock} ${o.scheduledTime}</span>
                    </div>
                    <div style="display:flex;gap:8px">
                        <button class="btn btn-outline btn-sm" style="flex:1">${AppData.icons.eye} Ko'rish</button>
                        <button class="btn btn-primary btn-sm" style="flex:1" onclick="showToast('Taklif yuborildi!','success')">Taklif berish</button>
                    </div>
                </div>`;
            }).join('')}</div>
        </div>` : ''}
        ${activeOrders.length ? `<div class="section"><div class="section-header"><div class="section-title">Faol ishlar</div></div>
            ${activeOrders.map(o => `<div class="card" style="border-left:4px solid var(--accent-500)">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <div><strong>${o.service}</strong><div style="font-size:0.8125rem;color:var(--gray-500)">${o.address}</div></div>
                    <button class="btn btn-accent btn-sm">Boshqarish</button>
                </div>
            </div>`).join('')}
        </div>` : ''}
    </div>`;
});

Router.register('master/orders', () => {
    renderNavbar(); renderSidebar('master');
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Buyurtmalar</h2>
        <div class="orders-grid">${AppData.orders.map(o => {
            const cat = AppData.categories.find(c => c.id === o.categoryId);
            return `<div class="order-card">
                <div class="order-card-header"><div class="order-card-service">${cat?cat.icon:''} ${o.service}</div><span class="badge badge-${getStatusClass(o.status)}">${getStatusText(o.status)}</span></div>
                <div class="order-card-body">${o.description}</div>
                <div class="order-card-footer"><span style="color:var(--gray-500)">${o.address}</span><span class="order-price">${formatPrice(o.price)}</span></div>
            </div>`;
        }).join('')}</div>
    </div>`;
});

Router.register('master/wallet', () => {
    renderNavbar(); renderSidebar('master');
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Hamyon</h2>
        <div class="card card-gradient" style="margin-bottom:24px;padding:32px">
            <div style="font-size:0.875rem;opacity:0.85">Joriy balans</div>
            <div style="font-family:var(--font-display);font-size:2.5rem;font-weight:800;margin:8px 0">${formatPrice(870000)}</div>
            <div style="display:flex;gap:12px;margin-top:16px">
                <button class="btn btn-sm" style="background:rgba(255,255,255,0.2);color:white;backdrop-filter:blur(8px)">Yechish</button>
                <button class="btn btn-sm" style="background:rgba(255,255,255,0.2);color:white;backdrop-filter:blur(8px)">Tarix</button>
            </div>
        </div>
        <div class="card"><h3 style="margin-bottom:16px">Oxirgi operatsiyalar</h3>
            ${AppData.walletTransactions.map(t => `<div class="transaction-item">
                <div class="transaction-icon" style="background:${t.type==='income'?'var(--success-50)':'var(--danger-50)'};color:${t.type==='income'?'var(--success-600)':'var(--danger-500)'}">
                    ${t.type==='income'?'↓':'↑'}
                </div>
                <div class="transaction-info"><div class="transaction-title">${t.title}</div><div class="transaction-date">${t.date}</div></div>
                <div class="transaction-amount ${t.type==='income'?'income':'expense'}">${t.amount>0?'+':''}${formatPrice(t.amount)}</div>
            </div>`).join('')}
        </div>
    </div>`;
});

['master/profile','master/settings'].forEach(route => {
    const titles = {'master/profile':'Profilim','master/settings':'Sozlamalar'};
    Router.register(route, () => {
        renderNavbar(); renderSidebar('master');
        main().innerHTML = `<div class="page-container page-enter"><h2 style="margin-bottom:24px">${titles[route]}</h2>
            <div class="card" style="padding:40px;text-align:center"><div style="font-size:3rem;margin-bottom:16px">🚧</div><h3 style="color:var(--gray-700)">Tez orada</h3><p style="color:var(--gray-500);margin-top:8px">Bu bo'lim ishlab chiqilmoqda</p></div></div>`;
    });
});

/* ---- ADMIN PAGES ---- */
Router.register('admin/home', () => {
    renderNavbar(); renderSidebar('admin');
    const s = AppData.adminStats;
    main().innerHTML = `<div class="page-container page-enter">
        <div class="dash-welcome" style="background:var(--gradient-dark)">
            <h2>Admin Panel 🛡️</h2>
            <p>Tizim holati va statistika</p>
        </div>
        <div class="stats-grid">
            <div class="stat-card" style="background:linear-gradient(135deg,#6366F1,#8B5CF6)">
                <div class="stat-icon">${AppData.icons.orders}</div>
                <div class="stat-value">${s.totalOrders.toLocaleString()}</div>
                <div class="stat-label">Jami buyurtmalar</div>
            </div>
            <div class="stat-card" style="background:linear-gradient(135deg,#14B8A6,#06B6D4)">
                <div class="stat-icon">${AppData.icons.creditCard}</div>
                <div class="stat-value">${(s.totalRevenue/1000000).toFixed(1)}M</div>
                <div class="stat-label">Jami daromad</div>
            </div>
            <div class="stat-card" style="background:linear-gradient(135deg,#F59E0B,#F97316)">
                <div class="stat-icon">${AppData.icons.users}</div>
                <div class="stat-value">${s.activeMasters}</div>
                <div class="stat-label">Faol ustalar</div>
            </div>
            <div class="stat-card" style="background:linear-gradient(135deg,#22C55E,#16A34A)">
                <div class="stat-icon">${AppData.icons.trendUp}</div>
                <div class="stat-value">${(s.commission/1000000).toFixed(1)}M</div>
                <div class="stat-label">Komissiya</div>
            </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px">
            <div class="card"><h3 style="margin-bottom:16px">Oxirgi buyurtmalar</h3>
                ${AppData.orders.slice(0,3).map(o => `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--gray-100)">
                    <div><strong style="font-size:0.875rem">#${o.id} ${o.service}</strong><div style="font-size:0.75rem;color:var(--gray-500)">${o.address}</div></div>
                    <span class="badge badge-${getStatusClass(o.status)}">${getStatusText(o.status)}</span>
                </div>`).join('')}
            </div>
            <div class="card"><h3 style="margin-bottom:16px">Kutilayotgan tasdiqlar</h3>
                ${AppData.pendingVerifications.slice(0,3).map(v => `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--gray-100)">
                    <div><strong style="font-size:0.875rem">${v.name}</strong><div style="font-size:0.75rem;color:var(--gray-500)">${v.specialty} • ${v.district}</div></div>
                    <span class="badge badge-warning">Kutilmoqda</span>
                </div>`).join('')}
            </div>
        </div>
    </div>`;
});

Router.register('admin/verify', () => {
    renderNavbar(); renderSidebar('admin');
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Ustalarni tasdiqlash</h2>
        ${AppData.pendingVerifications.map(v => `<div class="verify-card">
            <div class="verify-card-header">
                <div style="display:flex;align-items:center;gap:12px">
                    <div class="avatar">${v.name.split(' ').map(w=>w[0]).join('')}</div>
                    <div><strong>${v.name}</strong><div style="font-size:0.8125rem;color:var(--gray-500)">${v.specialty} • ${v.district}</div></div>
                </div>
                <span class="badge badge-warning">Kutilmoqda</span>
            </div>
            <div class="verify-card-body"><strong>Bio:</strong> ${v.bio}<br><strong>Telefon:</strong> ${v.phone}<br><strong>Ariza sanasi:</strong> ${v.appliedDate}</div>
            <div class="verify-card-actions">
                <button class="btn btn-success btn-sm" onclick="showToast('${v.name} tasdiqlandi!','success');this.closest('.verify-card').style.opacity='0.5'">${AppData.icons.check} Tasdiqlash</button>
                <button class="btn btn-danger btn-sm" onclick="showToast('${v.name} rad etildi','error');this.closest('.verify-card').style.opacity='0.5'">${AppData.icons.x} Rad etish</button>
            </div>
        </div>`).join('')}
    </div>`;
});

Router.register('admin/transactions', () => {
    renderNavbar(); renderSidebar('admin');
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Tranzaksiyalar</h2>
        <div class="card" style="overflow-x:auto">
            <table class="data-table">
                <thead><tr><th>ID</th><th>Xizmat</th><th>Usta</th><th>Summa</th><th>Komissiya</th><th>Holat</th><th>Sana</th></tr></thead>
                <tbody>${AppData.transactions.map(t => `<tr>
                    <td>#${t.orderId}</td>
                    <td>${t.service}</td>
                    <td>${t.masterName}</td>
                    <td><strong>${formatPrice(t.total)}</strong></td>
                    <td style="color:var(--success-600)">${formatPrice(t.commission)}</td>
                    <td><span class="badge badge-${getStatusClass(t.status)}">${getStatusText(t.status)}</span></td>
                    <td style="color:var(--gray-500)">${t.date}</td>
                </tr>`).join('')}</tbody>
            </table>
        </div>
    </div>`;
});

Router.register('admin/disputes', () => {
    renderNavbar(); renderSidebar('admin');
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Nizolar</h2>
        ${AppData.disputes.map(d => `<div class="dispute-card">
            <div style="display:flex;justify-content:space-between;align-items:center">
                <div><strong>Buyurtma #${d.orderId}</strong><div style="font-size:0.8125rem;color:var(--gray-500)">${d.clientName} → ${d.masterName}</div></div>
                <span class="badge badge-${getStatusClass(d.status)}">${getStatusText(d.status)}</span>
            </div>
            <div class="dispute-reason">${d.reason}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.875rem">
                <span style="color:var(--gray-500)">${d.date} • ${formatPrice(d.amount)}</span>
                ${d.status === 'open' ? `<div style="display:flex;gap:8px"><button class="btn btn-success btn-sm" onclick="showToast('Nizo hal qilindi','success')">Hal qilish</button></div>` : `<span style="color:var(--success-600)">${d.resolution || ''}</span>`}
            </div>
        </div>`).join('')}
    </div>`;
});

Router.register('admin/settings', () => {
    renderNavbar(); renderSidebar('admin');
    main().innerHTML = `<div class="page-container page-enter"><h2 style="margin-bottom:24px">Sozlamalar</h2>
        <div class="card" style="padding:40px;text-align:center"><div style="font-size:3rem;margin-bottom:16px">⚙️</div><h3 style="color:var(--gray-700)">Admin sozlamalari</h3><p style="color:var(--gray-500);margin-top:8px">Tez orada yangilanadi</p></div></div>`;
});

/* ---- INIT ---- */
function init() {
    Router.init();
    const preloader = $('preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
            const hash = window.location.hash.slice(1);
            if (hash && Router.routes[hash]) {
                Router.navigate(hash);
            } else {
                Router.navigate('');
            }
        }, 600);
    }, 1800);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
})();
