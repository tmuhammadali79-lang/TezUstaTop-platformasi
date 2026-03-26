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
                {icon:AppData.icons.users,text:'Ustalarni boshqarish',route:'admin/masters',badge:String(AppData.pendingVerifications.length)},
                {icon:AppData.icons.profile,text:'Mijozlarni boshqarish',route:'admin/clients'},
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
    // Master approval gate
    if (role === 'master' && window._authMode === 'register' && !window._masterApproved) {
        window._authStep = 4; // Go to document upload
        renderLoginPage();
        return;
    }
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
    window._masterApproved = false;
    window._masterWorkPhotos = 0;
    window._masterPassport = false;
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

window.authGoToOtpBypass = function() {
    window._authStep = 3;
    window._otpSeconds = 60;
    renderLoginPage();
    if (window._otpTimer) clearInterval(window._otpTimer);
    window._otpTimer = setInterval(otpCounterTick, 1000);
    setTimeout(() => { const f = document.querySelector('.otp-input'); if(f) f.focus(); }, 100);
};

window.authGoToOtp = function() {
    const phoneInput = document.getElementById('auth-phone');
    const phone = phoneInput ? phoneInput.value.replace(/\s/g,'') : '';
    if (phone.length < 9) { showToast('Telefon raqamni to\'liq kiriting','error'); return; }
    
    if (window._authMode === 'register' && AppData.registeredUsers[phone]) {
        window._authPhone = phone;
        window._authStep = 'already_registered';
        renderLoginPage();
        return;
    }
    
    if (window._authMode === 'login') {
        if (!AppData.registeredUsers[phone]) {
            showToast('Bunday raqam ro\'yxatdan o\'tmagan! Avval ro\'yxatdan o\'ting.', 'error');
            return;
        }
        window._selectedRole = AppData.registeredUsers[phone];
    }

    window._authPhone = phone;
    window.authGoToOtpBypass();
};

function otpCounterTick() {
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
}

window.authResendOtp = function() {
    window._otpSeconds = 60;
    showToast('Yangi SMS kod yuborildi!', 'success');
    if (window._otpTimer) clearInterval(window._otpTimer);
    window._otpTimer = setInterval(otpCounterTick, 1000);
};

window.authVerifyOtp = function() {
    const inputs = document.querySelectorAll('.otp-input');
    let code = '';
    inputs.forEach(inp => code += inp.value);
    if (code.length < 6) { showToast('6 xonali kodni toliq kiriting','error'); return; }
    const btn = document.getElementById('otp-verify-btn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<div class="spinner-sm"></div> Tekshirilmoqda...'; }
    setTimeout(() => {
        if (window._otpTimer) clearInterval(window._otpTimer);
        showToast('Telefon raqam tasdiqlandi! ✅', 'success');
        if (window._authMode === 'register') {
            AppData.registeredUsers[window._authPhone] = window._selectedRole;
            if (window._selectedRole === 'master') {
                // Masters go to document upload ONLY if registering
                window._authStep = 4;
                setTimeout(() => renderLoginPage(), 400);
                return;
            }
        }
        // Login bypasses document upload for existing masters
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
    if (!window._authMode) window._authMode = 'login';
    const step = window._authStep || 1;
    const isMaster = window._selectedRole === 'master';
    const roleName = {client:'Mijoz',master:'Usta',admin:'Admin'}[window._selectedRole] || '';

    // Step indicators
    let stepsHtml = '';
    if (typeof step === 'number') {
        if (isMaster && window._authMode === 'register') {
            const stepNames = ['Rol','Telefon','OTP','Hujjatlar','Kutish'];
            stepsHtml = `<div class="auth-steps" style="margin-top:16px">${stepNames.map((name, i) => {
                const n = i + 1;
                return `${i > 0 ? `<div class="auth-step-line ${step > n-1 ? 'active' : ''}"></div>` : ''}
                <div class="auth-step ${step >= n ? 'active' : ''} ${step > n ? 'done' : ''}">
                    <div class="auth-step-dot">${step > n ? '\u2713' : n}</div>
                    <span>${name}</span>
                </div>`;
            }).join('')}</div>`;
        } else {
            stepsHtml = `<div class="auth-steps" style="margin-top:16px">
                <div class="auth-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}"><div class="auth-step-dot">${step > 1 ? '\u2713' : '1'}</div><span>Rol</span></div>
                <div class="auth-step-line ${step > 1 ? 'active' : ''}"></div>
                <div class="auth-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}"><div class="auth-step-dot">${step > 2 ? '\u2713' : '2'}</div><span>Telefon</span></div>
                <div class="auth-step-line ${step > 2 ? 'active' : ''}"></div>
                <div class="auth-step ${step >= 3 ? 'active' : ''}"><div class="auth-step-dot">3</div><span>Tasdiqlash</span></div>
            </div>`;
        }
    }

    const tabsHtml = `
        <div style="display:flex;margin-bottom:24px;border-bottom:2px solid var(--gray-200)">
            <div style="flex:1;text-align:center;padding:12px;cursor:pointer;font-weight:600;transition:all 0.2s;${window._authMode==='login'?'border-bottom:2px solid var(--primary-600);color:var(--primary-600);margin-bottom:-2px':'color:var(--gray-500)'}" onclick="window._authMode='login';window._authStep=2;window._selectedRole=null;renderLoginPage()">Kirish</div>
            <div style="flex:1;text-align:center;padding:12px;cursor:pointer;font-weight:600;transition:all 0.2s;${window._authMode==='register'?'border-bottom:2px solid var(--primary-600);color:var(--primary-600);margin-bottom:-2px':'color:var(--gray-500)'}" onclick="window._authMode='register';window._authStep=1;window._selectedRole=null;renderLoginPage()">Ro'yxatdan o'tish</div>
        </div>
    `;

    let bodyHtml = '';

    if (step === 'already_registered') {
        bodyHtml = `
            <div style="text-align:center;padding:20px">
                <div style="font-size:4rem;margin-bottom:16px">⚠️</div>
                <h2 style="margin-bottom:12px;font-size:1.5rem">Siz avval ro'yxatdan o'tgansiz</h2>
                <p style="color:var(--gray-600);margin-bottom:24px;line-height:1.5"><strong>+998 ${window._authPhone}</strong> raqami tizimda mavjud. Yangitdan ro'yxatdan o'tish o'rniga, eski profilingizga kirishingiz mumkin.</p>
                <button class="btn btn-primary btn-lg btn-block" onclick="window._authMode='login';window.authGoToOtpBypass()">Eski profilga kirish</button>
                <button class="btn btn-ghost btn-block" style="margin-top:12px" onclick="window._authStep=2;renderLoginPage()">Boshqa raqam kiritish</button>
            </div>
        `;
    } else if (step === 1) {
        bodyHtml = `
            <div style="text-align:center;margin-bottom:24px">
                <h1 style="font-size:1.75rem">\ud83d\udc4b Xush kelibsiz!</h1>
                <p class="auth-subtitle">${window._authMode === 'login' ? 'Tizimga kirish uchun rolingizni tanlang' : 'Ro\'yxatdan o\'tish uchun rolingizni tanlang'}</p>
            </div>
            <div class="role-cards">
                <div class="role-card ${window._selectedRole==='client'?'selected':''}" onclick="this.parentElement.querySelectorAll('.role-card').forEach(c=>c.classList.remove('selected'));this.classList.add('selected');window._selectedRole='client'">
                    <div class="role-icon" style="background:var(--primary-50);color:var(--primary-600)">\ud83d\udc64</div>
                    <div><div class="role-title">Mijoz</div><div class="role-desc">Usta toping va xizmat buyurtma qiling</div></div>
                </div>
                <div class="role-card ${window._selectedRole==='master'?'selected':''}" onclick="this.parentElement.querySelectorAll('.role-card').forEach(c=>c.classList.remove('selected'));this.classList.add('selected');window._selectedRole='master'">
                    <div class="role-icon" style="background:var(--accent-50);color:var(--accent-600)">\ud83d\udd27</div>
                    <div><div class="role-title">Usta</div><div class="role-desc">Buyurtmalar qabul qilib, daromad oling</div></div>
                </div>
                <div class="role-card ${window._selectedRole==='admin'?'selected':''}" onclick="this.parentElement.querySelectorAll('.role-card').forEach(c=>c.classList.remove('selected'));this.classList.add('selected');window._selectedRole='admin'">
                    <div class="role-icon" style="background:var(--danger-50);color:var(--danger-600)">\ud83d\udee1\ufe0f</div>
                    <div><div class="role-title">Admin</div><div class="role-desc">Tizimni boshqaring va nazorat qiling</div></div>
                </div>
            </div>
            <button class="btn btn-primary btn-lg btn-block" onclick="authGoToPhone()">Davom etish \u2192</button>`;
    } else if (step === 2) {
        bodyHtml = `
            <div style="text-align:center;margin-bottom:8px">
                <div style="width:80px;height:80px;border-radius:50%;background:var(--primary-50);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:2.5rem">\ud83d\udcf1</div>
                <h1 style="font-size:1.75rem">Telefon raqamingiz</h1>
                <p class="auth-subtitle">${window._authMode === 'login' ? 'Tizimga kirish uchun telefon raqamingizni kiriting' : (window._selectedRole === 'master' ? 'Usta sifatida tizimga kirish uchun telefon raqamingizni kiriting' : 'Mijoz sifatida tizimga kirish uchun telefon raqamingizni kiriting')}</p>
            </div>
            <div class="phone-input-group">
                <div class="phone-prefix">
                    <span style="font-size:1.25rem">\ud83c\uddfa\ud83c\uddff</span>
                    <span style="font-weight:700;color:var(--gray-800)">+998</span>
                </div>
                <input type="tel" id="auth-phone" class="form-input phone-number-input" placeholder="90 123 45 67" maxlength="12" oninput="formatPhoneInput(this)" onkeydown="if(event.key==='Enter')authGoToOtp()" value="${window._authPhone||''}" autofocus>
            </div>
            <p style="font-size:0.75rem;color:var(--gray-500);margin:12px 0 20px;text-align:center">SMS orqali tasdiqlash kodi yuboriladi</p>
            <button class="btn btn-primary btn-lg btn-block" onclick="authGoToOtp()">\ud83d\udce9 SMS kod yuborish</button>
            ${window._authMode === 'register' ? `<button class="btn btn-ghost btn-block" onclick="window._authStep=1;renderLoginPage()" style="margin-top:8px;color:var(--gray-500)">\u2190 Orqaga qaytish</button>` : `<button class="btn btn-ghost btn-block" onclick="Router.navigate('')" style="margin-top:8px;color:var(--primary-600)">\u2190 Bosh sahifaga qaytish</button>`}`;
    } else if (step === 3) {
        bodyHtml = `
            <div style="text-align:center;margin-bottom:8px">
                <div style="width:80px;height:80px;border-radius:50%;background:var(--success-50);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:2.5rem">\ud83d\udd10</div>
                <h1 style="font-size:1.75rem">Kodni kiriting</h1>
                <p class="auth-subtitle">+998 ${window._authPhone} raqamiga yuborilgan 6 xonali kodni kiriting</p>
            </div>
            <div class="otp-container">
                <input type="text" class="otp-input" maxlength="1" inputmode="numeric" oninput="handleOtpInput(this,0)" onkeydown="handleOtpKeydown(event,0)" onpaste="handleOtpPaste(event)">
                <input type="text" class="otp-input" maxlength="1" inputmode="numeric" oninput="handleOtpInput(this,1)" onkeydown="handleOtpKeydown(event,1)">
                <input type="text" class="otp-input" maxlength="1" inputmode="numeric" oninput="handleOtpInput(this,2)" onkeydown="handleOtpKeydown(event,2)">
                <div class="otp-separator">\u2014</div>
                <input type="text" class="otp-input" maxlength="1" inputmode="numeric" oninput="handleOtpInput(this,3)" onkeydown="handleOtpKeydown(event,3)">
                <input type="text" class="otp-input" maxlength="1" inputmode="numeric" oninput="handleOtpInput(this,4)" onkeydown="handleOtpKeydown(event,4)">
                <input type="text" class="otp-input" maxlength="1" inputmode="numeric" oninput="handleOtpInput(this,5)" onkeydown="handleOtpKeydown(event,5)">
            </div>
            <div id="otp-countdown" style="text-align:center;margin:16px 0">
                <span style="color:var(--gray-500)">Qayta yuborish: <strong style="color:var(--primary-600)">${window._otpSeconds}s</strong></span>
            </div>
            <button id="otp-verify-btn" class="btn btn-primary btn-lg btn-block" onclick="authVerifyOtp()">\u2705 Tasdiqlash</button>
            <button class="btn btn-ghost btn-block" onclick="window._authStep=2;if(window._otpTimer)clearInterval(window._otpTimer);renderLoginPage()" style="margin-top:8px;color:var(--gray-500)">\u2190 Raqamni o'zgartirish</button>`;
    } else if (step === 4) {
        // Master document upload step
        if (!window._masterWorkPhotos) window._masterWorkPhotos = 0;
        if (!window._masterPassport) window._masterPassport = false;
        const photosOk = window._masterWorkPhotos >= 3;
        const passportOk = window._masterPassport;
        const allOk = photosOk && passportOk;
        bodyHtml = `
            <div style="text-align:center;margin-bottom:16px">
                <div style="width:80px;height:80px;border-radius:50%;background:var(--accent-50);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:2.5rem">\ud83d\udcc4</div>
                <h1 style="font-size:1.75rem">Hujjatlarni yuklash</h1>
                <p class="auth-subtitle">Usta sifatida tasdiqlash uchun quyidagi hujjatlarni yuklab bering</p>
            </div>
            <!-- Work photos upload -->
            <div class="card" style="margin-bottom:16px;border:2px ${photosOk ? 'solid var(--success-400)' : 'dashed var(--gray-200)'}">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
                    <div style="width:48px;height:48px;border-radius:12px;background:${photosOk?'var(--success-50)':'var(--gray-50)'};display:flex;align-items:center;justify-content:center;font-size:1.5rem">${photosOk ? '\u2705' : '\ud83d\udcf8'}</div>
                    <div style="flex:1">
                        <div style="font-weight:700;font-size:0.9375rem">Ish rasmlari <span style="color:var(--danger-500)">*</span></div>
                        <div style="font-size:0.75rem;color:var(--gray-500)">Oldin qilgan ishlaringizning rasmlari (kamida 3 ta)</div>
                    </div>
                    <span class="badge badge-${photosOk?'success':'warning'}">${window._masterWorkPhotos}/3</span>
                </div>
                <div id="work-photos-preview" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
                    ${Array.from({length: window._masterWorkPhotos}, (_, i) => `<div style="width:80px;height:80px;border-radius:var(--radius-md);background:var(--gray-100);display:flex;align-items:center;justify-content:center;font-size:1.5rem;position:relative">
                        \ud83d\uddbc\ufe0f
                        <div style="position:absolute;top:-4px;right:-4px;width:18px;height:18px;background:var(--success-500);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.5rem;color:white">\u2713</div>
                    </div>`).join('')}
                </div>
                <label class="btn btn-outline btn-sm btn-block" style="cursor:pointer;position:relative">
                    \ud83d\udcf7 Rasm yuklash
                    <input type="file" accept="image/*" multiple style="position:absolute;opacity:0;width:100%;height:100%;top:0;left:0;cursor:pointer" onchange="window.handleWorkPhotos(this)">
                </label>
            </div>
            <!-- Passport upload -->
            <div class="card" style="margin-bottom:20px;border:2px ${passportOk ? 'solid var(--success-400)' : 'dashed var(--gray-200)'}">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
                    <div style="width:48px;height:48px;border-radius:12px;background:${passportOk?'var(--success-50)':'var(--gray-50)'};display:flex;align-items:center;justify-content:center;font-size:1.5rem">${passportOk ? '\u2705' : '\ud83e\udead'}</div>
                    <div style="flex:1">
                        <div style="font-weight:700;font-size:0.9375rem">Pasport nusxasi <span style="color:var(--danger-500)">*</span></div>
                        <div style="font-size:0.75rem;color:var(--gray-500)">Shaxsingizni tasdiqlash uchun pasport surati</div>
                    </div>
                    ${passportOk ? '<span class="badge badge-success">Yuklangan</span>' : '<span class="badge badge-danger">Yuklanmagan</span>'}
                </div>
                ${passportOk ? `<div style="display:flex;align-items:center;gap:8px;padding:10px;background:var(--success-50);border-radius:var(--radius-sm)">
                    <span style="font-size:1.25rem">\ud83d\udcc4</span>
                    <span style="font-size:0.8125rem;font-weight:600;color:var(--success-700)">passport_nusxa.jpg - Yuklangan \u2705</span>
                </div>` : `<label class="btn btn-outline btn-sm btn-block" style="cursor:pointer;position:relative">
                    \ud83d\udcc1 Pasport suratini yuklash
                    <input type="file" accept="image/*" style="position:absolute;opacity:0;width:100%;height:100%;top:0;left:0;cursor:pointer" onchange="window.handlePassport(this)">
                </label>`}
            </div>
            ${!allOk ? '<p style="text-align:center;font-size:0.75rem;color:var(--danger-500);margin-bottom:12px">\u26a0\ufe0f Barcha hujjatlarni yuklash majburiy</p>' : ''}
            <button class="btn btn-primary btn-lg btn-block ${allOk?'':'btn-disabled'}" ${allOk?'':'disabled'} onclick="window.submitMasterDocs()">\ud83d\udce8 Arizani yuborish</button>
            <button class="btn btn-ghost btn-block" onclick="window._authStep=1;window._selectedRole=null;renderLoginPage()" style="margin-top:8px;color:var(--gray-500)">\u2190 Bekor qilish</button>`;
    } else if (step === 5) {
        // Waiting for admin approval
        bodyHtml = `
            <div style="text-align:center;padding:20px 0">
                <div style="width:100px;height:100px;border-radius:50%;background:var(--warning-50);display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:3rem">\u23f3</div>
                <h1 style="font-size:1.75rem;margin-bottom:8px">Ariza yuborildi!</h1>
                <p class="auth-subtitle" style="margin-bottom:24px">Arizangiz admin tomonidan ko'rib chiqilmoqda. Tasdiqlangandan so'ng tizimga kira olasiz.</p>
                <div class="card" style="text-align:left;margin-bottom:20px">
                    <div style="font-weight:600;font-size:0.875rem;color:var(--gray-700);margin-bottom:12px">\ud83d\udccb Ariza holati:</div>
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                        <span style="font-size:1.25rem">\u2705</span>
                        <span style="font-size:0.875rem;color:var(--gray-700)">Telefon raqam tasdiqlandi</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                        <span style="font-size:1.25rem">\u2705</span>
                        <span style="font-size:0.875rem;color:var(--gray-700)">Ish rasmlari yuklandi (${window._masterWorkPhotos} ta)</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                        <span style="font-size:1.25rem">\u2705</span>
                        <span style="font-size:0.875rem;color:var(--gray-700)">Pasport nusxasi yuklandi</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;padding-top:8px;border-top:1px solid var(--gray-100)">
                        <span style="font-size:1.25rem">\u23f3</span>
                        <span style="font-size:0.875rem;font-weight:600;color:var(--warning-600)">Admin tasdiqlashi kutilmoqda...</span>
                    </div>
                </div>
                <div style="background:var(--primary-50);padding:14px;border-radius:var(--radius-md);margin-bottom:20px">
                    <p style="font-size:0.8125rem;color:var(--primary-700)">\ud83d\udcde Savollar bo'lsa: <strong>+998 71 200 00 01</strong> raqamiga qo'ng'iroq qiling</p>
                </div>
                <button class="btn btn-outline btn-lg btn-block" onclick="window._authStep=1;window._selectedRole=null;window._masterWorkPhotos=0;window._masterPassport=false;Router.navigate('')">\u2190 Bosh sahifaga qaytish</button>
                <button class="btn btn-ghost btn-sm" onclick="window._masterApproved=true;doLogin('master')" style="margin-top:12px;color:var(--gray-400);font-size:0.75rem">[Demo: admin tasdiqladi]</button>
            </div>`;
    }

    const showTabs = (step === 1 || step === 2) && typeof step === 'number';

    main().innerHTML = `<div class="auth-container page-enter">
        <div class="auth-card" ${step === 4 ? 'style="max-width:520px"' : ''}>
            ${showTabs ? tabsHtml : ''}
            ${stepsHtml}
            ${bodyHtml}
            ${typeof step === 'number' && step < 4 ? '<p style="text-align:center;margin-top:20px;color:var(--gray-500);font-size:0.8125rem"><a onclick="window._authStep=1;window._authMode=\'login\';Router.navigate(\'\')" style="color:var(--primary-600);cursor:pointer;font-weight:600">\u2190 Bosh sahifaga qaytish</a></p>' : ''}
        </div>
    </div>`;
}

// Master document upload handlers
window.handleWorkPhotos = function(input) {
    const files = input.files;
    if (files && files.length > 0) {
        window._masterWorkPhotos = (window._masterWorkPhotos || 0) + files.length;
        showToast(files.length + ' ta rasm yuklandi', 'success');
        renderLoginPage();
    }
};
window.handlePassport = function(input) {
    if (input.files && input.files.length > 0) {
        window._masterPassport = true;
        showToast('Pasport nusxasi yuklandi', 'success');
        renderLoginPage();
    }
};
window.submitMasterDocs = function() {
    if (window._masterWorkPhotos < 3 || !window._masterPassport) {
        showToast('Barcha hujjatlarni yuklash majburiy!', 'error');
        return;
    }
    // Add to pending verifications
    const newId = AppData.pendingVerifications.length + 10;
    AppData.pendingVerifications.push({
        id: newId,
        name: 'Yangi usta',
        initials: 'YU',
        specialty: 'Umumiy',
        district: 'Toshkent',
        phone: '+998 ' + window._authPhone,
        bio: 'Yangi ariza yuborildi',
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'pending'
    });
    showToast('Arizangiz muvaffaqiyatli yuborildi!', 'success');
    window._authStep = 5;
    renderLoginPage();
};

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
Router.register('login', () => { window._authMode='login'; window._authStep=2; window._selectedRole=null; window._authPhone=''; renderLoginPage(); });
Router.register('register', () => { window._authMode='register'; window._authStep=1; window._selectedRole=null; window._authPhone=''; renderLoginPage(); });

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

/* ---------- CLIENT SERVICES ---------- */
Router.register('client/services', () => {
    renderNavbar(); renderSidebar('client');
    main().innerHTML = `<div class="page-container page-enter">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
            <h2>Xizmatlar</h2>
            <div style="position:relative;width:300px">
                <input class="form-input" placeholder="Xizmat qidirish..." style="padding-left:40px" id="svc-search" oninput="window.filterServices(this.value)">
                <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--gray-400)">${AppData.icons.search}</span>
            </div>
        </div>
        <div class="services-direct-grid" id="services-list">
            ${AppData.categories.map(c => {
                const svc = c.subServices[0];
                const master = AppData.masters.find(m => m.categoryId === c.id);
                const masterCount = AppData.masters.filter(m => m.categoryId === c.id).length;
                return `<div class="card service-direct-card" id="cat-${c.id}" onclick="window.openNewOrder(${c.id})" style="cursor:pointer;transition:var(--transition-base);overflow:hidden">
                    <div style="background:${c.bgColor};padding:24px;text-align:center;margin:-20px -20px 16px">
                        <div style="font-size:2.5rem;margin-bottom:8px">${c.icon}</div>
                        <div style="font-family:var(--font-display);font-weight:700;font-size:1.125rem;color:var(--gray-900)">${c.name}</div>
                    </div>
                    <div style="font-weight:600;font-size:0.9375rem;color:var(--gray-800);margin-bottom:8px">${svc}</div>
                    ${master ? `<div style="display:flex;align-items:center;gap:8px;padding:8px;background:var(--gray-50);border-radius:var(--radius-sm);margin-bottom:12px">
                        <div class="avatar avatar-sm">${master.initials}</div>
                        <div style="flex:1;min-width:0">
                            <div style="font-weight:600;font-size:0.75rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${master.name} ${master.verified?'✅':''}</div>
                            <div style="font-size:0.6875rem;color:var(--gray-500)">⭐${master.rating} • ${master.completedJobs} ish</div>
                        </div>
                    </div>` : ''}
                    <div style="display:flex;align-items:center;justify-content:space-between">
                        <span style="font-size:0.75rem;color:var(--gray-500)">${masterCount} ta usta</span>
                        <span class="badge badge-primary" style="font-size:0.6875rem">Buyurtma berish →</span>
                    </div>
                </div>`;
            }).join('')}
        </div>
    </div>`;
});
window.filterServices = function(q) {
    q = q.toLowerCase();
    AppData.categories.forEach(c => {
        const el = document.getElementById('cat-' + c.id);
        const match = c.name.toLowerCase().includes(q) || c.subServices.some(s => s.toLowerCase().includes(q));
        if (el) el.style.display = match ? '' : 'none';
    });
};
window.openNewOrder = function(catId) {
    const cat = AppData.categories.find(c => c.id === catId);
    const service = cat ? cat.subServices[0] : '';
    const masters = AppData.masters.filter(m => m.categoryId === catId);
    window._newOrderDraft = { catId: catId, service: service, time: 'Hozir', masterId: null };
    
    window._setOrderTime = function(btn, time) {
        btn.parentElement.querySelectorAll('.btn').forEach(b => b.className = 'btn btn-outline btn-sm');
        btn.className = 'btn btn-primary btn-sm';
        window._newOrderDraft.time = time;
    };
    window._setOrderMaster = function(card, mid) {
        card.parentElement.querySelectorAll('.card').forEach(c => c.style.borderColor = 'var(--gray-200)');
        card.style.borderColor = 'var(--primary-500)';
        window._newOrderDraft.masterId = mid;
    };
    window.submitNewOrder = function() {
        const desc = document.getElementById('new-order-desc').value.trim();
        const addr = document.getElementById('new-order-address').value.trim();
        if (!desc || !addr) { showToast('Tavsif va manzilni kiriting','error'); return; }
        
        const newId = 2000 + AppData.orders.length;
        const o = {
            id: newId,
            clientId: 'u1', // Fixed for mock client
            masterId: window._newOrderDraft.masterId,
            categoryId: window._newOrderDraft.catId,
            service: window._newOrderDraft.service,
            description: desc,
            status: window._newOrderDraft.masterId ? 'pending' : 'pending',
            price: null, // to be agreed
            address: addr,
            scheduledTime: window._newOrderDraft.time,
            createdAt: new Date().toISOString()
        };
        AppData.orders.unshift(o);
        showToast('Buyurtma yaratildi! ✅', 'success');
        setTimeout(() => Router.navigate('client/orders'), 1000);
    };

    main().querySelector('.page-container').innerHTML = `
        <div style="margin-bottom:24px"><button class="btn btn-ghost btn-sm" onclick="Router.navigate('client/services')">\u2190 Orqaga</button></div>
        <div class="card" style="max-width:700px">
            <h2 style="margin-bottom:4px">${cat ? cat.icon : ''} ${service}</h2>
            <p style="color:var(--gray-500);margin-bottom:24px">${cat ? cat.name : ''} xizmati</p>
            <div class="form-group"><label class="form-label">Tavsif <span style="color:red">*</span></label><textarea id="new-order-desc" class="form-input form-textarea" placeholder="Muammoni batafsil yozing..."></textarea></div>
            <div class="form-group"><label class="form-label">Manzil <span style="color:red">*</span></label><input id="new-order-address" class="form-input" placeholder="Tuman, ko'cha, uy raqami"></div>
            <div class="form-group"><label class="form-label">Qachon kerak?</label>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                    <button class="btn btn-primary btn-sm" onclick="window._setOrderTime(this, 'Hozir')" style="flex:1">Hozir</button>
                    <button class="btn btn-outline btn-sm" onclick="window._setOrderTime(this, 'Bugun 14:00')" style="flex:1">Bugun</button>
                    <button class="btn btn-outline btn-sm" onclick="window._setOrderTime(this, 'Ertaga')" style="flex:1">Ertaga</button>
                </div>
            </div>
            ${masters.length ? `<div class="form-group"><label class="form-label">Usta tanlash (ixtiyoriy)</label>
                <div style="display:grid;gap:8px">${masters.map(m => `<div class="card" style="padding:12px;cursor:pointer;border:2px solid var(--gray-200);transition:0.2s" onclick="window._setOrderMaster(this, ${m.id})">
                    <div style="display:flex;align-items:center;gap:12px">
                        <div class="avatar avatar-sm">${m.initials}</div>
                        <div style="flex:1"><div style="font-weight:600;font-size:0.875rem">${m.name} ${m.verified?'\u2705':''}</div><div style="font-size:0.75rem;color:var(--gray-500)">\u2b50${m.rating} \u2022 ${m.completedJobs} ish \u2022 ${m.distance}km</div></div>
                    </div>
                </div>`).join('')}</div>
            </div>` : ''}
            <button class="btn btn-primary btn-lg btn-block" onclick="window.submitNewOrder()">\ud83d\udce9 Buyurtma yuborish</button>
        </div>`;
};

/* ---------- CLIENT ORDERS ---------- */
Router.register('client/orders', () => {
    renderNavbar(); renderSidebar('client');
    const tabs = [{id:'all',t:'Barchasi'},{id:'active',t:'Faol'},{id:'completed',t:'Bajarilgan'},{id:'cancelled',t:'Bekor'}];
    main().innerHTML = `<div class="page-container page-enter">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
            <h2>Buyurtmalarim</h2>
            <button class="btn btn-primary btn-sm" onclick="Router.navigate('client/services')">+ Yangi buyurtma</button>
        </div>
        <div class="tabs" style="margin-bottom:24px" id="order-tabs">
            ${tabs.map((t,i) => `<div class="tab ${i===0?'active':''}" onclick="window.filterOrders('${t.id}');this.parentElement.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));this.classList.add('active')">${t.t}</div>`).join('')}
        </div>
        <div id="orders-container">${renderOrdersList('all')}</div>
    </div>`;
});

window.clientAcceptPrice = function(id) {
    const o = AppData.orders.find(x => x.id === id);
    if (o) {
        o.status = 'active';
        o.price = parseInt(o.proposedPrice) || 0;
        showToast('Taklif qabul qilindi, ish boshlandi! ✅', 'success');
        Router.navigate('client/orders');
    }
};
window.clientRejectPrice = function(id) {
    const o = AppData.orders.find(x => x.id === id);
    if (o) {
        o.status = 'pending';
        o.masterId = null;
        o.proposedPrice = null;
        showToast('Taklif rad etildi, boshqa ustalar qidirilmoqda.', 'info');
        Router.navigate('client/orders');
    }
};

function renderOrdersList(filter) {
    let orders = AppData.orders;
    if (filter === 'active') orders = orders.filter(o => ['active','pending','in_progress','price_proposed'].includes(o.status));
    else if (filter === 'completed') orders = orders.filter(o => o.status === 'completed');
    else if (filter === 'cancelled') orders = orders.filter(o => o.status === 'cancelled');
    if (!orders.length) return `<div class="empty-state"><div class="empty-icon">📭</div><h3>Buyurtmalar topilmadi</h3><p>Hozircha bu filtrda buyurtmalar yo'q</p></div>`;
    return `<div class="orders-grid">${orders.map(o => {
        const cat = AppData.categories.find(c => c.id === o.categoryId);
        const master = AppData.masters.find(m => m.id === o.masterId);
        const isProposed = o.status === 'price_proposed';
        
        return `<div class="order-card" onclick="window.showOrderDetail(${o.id})">
            <div class="order-card-header">
                <div class="order-card-service">${cat?cat.icon:''} ${o.service}</div>
                <span class="badge badge-${getStatusClass(o.status)}">${getStatusText(o.status)}</span>
            </div>
            <div class="order-card-body">${o.description}</div>
            ${master ? `<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;padding:8px;background:var(--gray-50);border-radius:var(--radius-sm)">
                <div class="avatar avatar-sm">${master.initials}</div>
                <div><div style="font-weight:600;font-size:0.8125rem">${master.name}</div><div style="font-size:0.75rem;color:var(--gray-500)">${master.specialty}</div></div>
            </div>` : ''}
            ${isProposed ? `
                <div style="background:var(--primary-50);padding:12px;border-radius:var(--radius-sm);margin-top:12px">
                    <div style="font-weight:600;margin-bottom:8px;font-size:0.875rem">Usta taklif qilgan narx: <span style="color:var(--primary-600)">${formatPrice(o.proposedPrice)}</span></div>
                    <div style="display:flex;gap:8px">
                        <button class="btn btn-primary btn-sm" style="flex:1" onclick="event.stopPropagation();window.clientAcceptPrice(${o.id})">Qabul qilish</button>
                        <button class="btn btn-outline btn-sm" style="flex:1;color:var(--danger-600);border-color:var(--danger-600)" onclick="event.stopPropagation();window.clientRejectPrice(${o.id})">Rad qilish</button>
                    </div>
                </div>
            ` : `<div class="order-card-footer">
                <span style="color:var(--gray-500);display:flex;align-items:center;gap:4px">${AppData.icons.location} ${o.address}</span>
                <span class="order-price">${o.price ? formatPrice(o.price) : 'Kelishilgan'}</span>
            </div>`}
            ${o.rating ? `<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--gray-100);display:flex;align-items:center;gap:4px">${generateStars(o.rating)} <span style="font-size:0.75rem;color:var(--gray-500)">Sizning bahoyingiz</span></div>` : ''}
        </div>`;
    }).join('')}</div>`;
}
window.filterOrders = function(filter) {
    document.getElementById('orders-container').innerHTML = renderOrdersList(filter);
};
window.showOrderDetail = function(id) {
    const o = AppData.orders.find(x => x.id === id);
    if (!o) return;
    const cat = AppData.categories.find(c => c.id === o.categoryId);
    const master = AppData.masters.find(m => m.id === o.masterId);
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = function(e) { if(e.target===this) this.remove(); };
    overlay.innerHTML = `<div class="modal-content">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
            <h2 style="font-size:1.25rem">Buyurtma #${o.id}</h2>
            <button class="btn btn-ghost btn-icon" onclick="this.closest('.modal-overlay').remove()">${AppData.icons.x}</button>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
            <span style="font-size:1.5rem">${cat?cat.icon:''}</span>
            <div><div style="font-weight:700">${o.service}</div><span class="badge badge-${getStatusClass(o.status)}">${getStatusText(o.status)}</span></div>
        </div>
        <div class="card" style="margin-bottom:16px;padding:16px">
            <div style="font-weight:600;font-size:0.8125rem;color:var(--gray-500);margin-bottom:4px">Tavsif</div>
            <div style="color:var(--gray-800)">${o.description}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
            <div class="card" style="padding:14px;text-align:center"><div style="font-size:0.75rem;color:var(--gray-500)">Narx</div><div style="font-weight:700;color:var(--primary-700);font-size:1.125rem">${o.status === 'price_proposed' ? formatPrice(o.proposedPrice) : (o.price ? formatPrice(o.price) : 'Kelishiladi')}</div></div>
            <div class="card" style="padding:14px;text-align:center"><div style="font-size:0.75rem;color:var(--gray-500)">Vaqt</div><div style="font-weight:700;color:var(--gray-800)">${o.scheduledTime}</div></div>
        </div>
        <div class="card" style="padding:14px;margin-bottom:16px"><div style="font-size:0.75rem;color:var(--gray-500);margin-bottom:4px">📍 Manzil</div><div style="font-weight:600">${o.address}</div></div>
        ${master ? `<div class="card" style="padding:14px;margin-bottom:16px">
            <div style="font-size:0.75rem;color:var(--gray-500);margin-bottom:8px">Usta</div>
            <div style="display:flex;align-items:center;gap:12px">
                <div class="avatar">${master.initials}</div>
                <div style="flex:1"><div style="font-weight:700">${master.name} ${master.verified?'✅':''}</div><div style="font-size:0.8125rem;color:var(--gray-500)">${master.specialty} • ⭐${master.rating}</div></div>
                <button class="btn btn-outline btn-sm" onclick="showToast('Ustaga qo\\'ng\\'iroq qilinyapti...','info')">📞</button>
            </div>
        </div>` : ''}
        <div style="display:flex;gap:8px">
            ${o.status==='active' ? `<button class="btn btn-danger btn-sm" style="flex:1" onclick="showToast('Buyurtma bekor qilindi','error');this.closest('.modal-overlay').remove()">Bekor qilish</button>
            <button class="btn btn-primary btn-sm" style="flex:1" onclick="showToast('Usta bilan chat ochildi','success');this.closest('.modal-overlay').remove()">💬 Yozish</button>` : ''}
            ${o.status==='completed'&&!o.rating ? `<button class="btn btn-primary btn-block" onclick="showToast('Baho berildi ⭐','success');this.closest('.modal-overlay').remove()">⭐ Baho berish</button>` : ''}
            ${o.status==='pending' ? `<button class="btn btn-danger btn-sm" style="flex:1" onclick="showToast('Buyurtma bekor qilindi','error');this.closest('.modal-overlay').remove()">Bekor qilish</button>` : ''}
            ${o.status==='price_proposed' && AppData.currentRole === 'client' ? `
                <button class="btn btn-primary btn-sm" style="flex:1" onclick="window.clientAcceptPrice(${o.id});this.closest('.modal-overlay').remove()">Qabul qilish</button>
                <button class="btn btn-outline btn-sm" style="flex:1;color:var(--danger-600);border-color:var(--danger-600)" onclick="window.clientRejectPrice(${o.id});this.closest('.modal-overlay').remove()">Rad qilish</button>
            ` : ''}
        </div>
    </div>`;
    document.body.appendChild(overlay);
};

/* ---------- CLIENT CHAT ---------- */
Router.register('client/chat', () => {
    renderNavbar(); renderSidebar('client');
    const chats = [
        {id:1,name:'Aziz Karimov',initials:'AK',spec:'Santexnik',lastMsg:'Yaxshi, soat 14:00 da kelaman','time':'12:30',unread:2,online:true},
        {id:2,name:'Bobur Toshmatov',initials:'BT',spec:'Elektrik',lastMsg:'Ish bajarildi, rahmat!','time':'Kecha',unread:0,online:false},
        {id:3,name:'Rustam Qodirov',initials:'RQ',spec:'Mebel ustasi',lastMsg:'Foto yuboring, narxini aytaman','time':'22.03',unread:1,online:true},
    ];
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Xabarlar</h2>
        <div style="display:grid;grid-template-columns:340px 1fr;gap:0;border:1px solid var(--gray-200);border-radius:var(--radius-xl);overflow:hidden;min-height:520px;background:white">
            <!-- Chat List -->
            <div style="border-right:1px solid var(--gray-200);display:flex;flex-direction:column">
                <div style="padding:16px;border-bottom:1px solid var(--gray-100)">
                    <input class="form-input" placeholder="Chat qidirish..." style="font-size:0.8125rem;min-height:38px">
                </div>
                <div style="flex:1;overflow-y:auto" id="chat-list">
                    ${chats.map((c,i) => `<div class="chat-list-item ${i===0?'active':''}" onclick="window.openChat(${c.id})" id="chat-item-${c.id}" style="display:flex;align-items:center;gap:12px;padding:14px 16px;cursor:pointer;transition:var(--transition-fast);border-bottom:1px solid var(--gray-50);${i===0?'background:var(--primary-50)':''}">
                        <div style="position:relative">
                            <div class="avatar avatar-sm" style="background:${i%2===0?'var(--gradient-primary)':'var(--gradient-accent)'}">${c.initials}</div>
                            ${c.online ? '<div style="position:absolute;bottom:0;right:0;width:10px;height:10px;background:var(--success-400);border-radius:50%;border:2px solid white"></div>':''}
                        </div>
                        <div style="flex:1;min-width:0">
                            <div style="display:flex;justify-content:space-between;align-items:center">
                                <span style="font-weight:600;font-size:0.875rem;color:var(--gray-900)">${c.name}</span>
                                <span style="font-size:0.6875rem;color:var(--gray-400)">${c.time}</span>
                            </div>
                            <div style="font-size:0.75rem;color:var(--gray-500);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.lastMsg}</div>
                        </div>
                        ${c.unread ? `<span style="background:var(--primary-500);color:white;font-size:0.625rem;font-weight:700;padding:2px 6px;border-radius:var(--radius-full);min-width:18px;text-align:center">${c.unread}</span>` : ''}
                    </div>`).join('')}
                </div>
            </div>
            <!-- Chat Window -->
            <div style="display:flex;flex-direction:column" id="chat-window">
                <div style="padding:14px 20px;border-bottom:1px solid var(--gray-100);display:flex;align-items:center;gap:12px">
                    <div class="avatar avatar-sm">${chats[0].initials}</div>
                    <div style="flex:1"><div style="font-weight:700;font-size:0.9375rem">${chats[0].name}</div><div style="font-size:0.6875rem;color:var(--success-500)">● Online</div></div>
                    <button class="btn btn-ghost btn-icon btn-sm" onclick="showToast('Qo\\'ng\\'iroq qilinyapti...','info')">📞</button>
                </div>
                <div style="flex:1;padding:20px;overflow-y:auto;background:var(--gray-50);display:flex;flex-direction:column;gap:12px" id="chat-messages">
                    <div style="align-self:flex-start;max-width:70%;background:white;padding:10px 14px;border-radius:16px 16px 16px 4px;box-shadow:var(--shadow-xs)">
                        <div style="font-size:0.875rem;color:var(--gray-800)">Assalomu alaykum! Kran muammosi bormi?</div>
                        <div style="font-size:0.625rem;color:var(--gray-400);text-align:right;margin-top:4px">12:15</div>
                    </div>
                    <div style="align-self:flex-end;max-width:70%;background:var(--primary-500);color:white;padding:10px 14px;border-radius:16px 16px 4px 16px;box-shadow:var(--shadow-xs)">
                        <div style="font-size:0.875rem">Ha, oshxonadagi kran oqyapti, tezda kerakku</div>
                        <div style="font-size:0.625rem;opacity:0.7;text-align:right;margin-top:4px">12:20 ✓✓</div>
                    </div>
                    <div style="align-self:flex-start;max-width:70%;background:white;padding:10px 14px;border-radius:16px 16px 16px 4px;box-shadow:var(--shadow-xs)">
                        <div style="font-size:0.875rem;color:var(--gray-800)">Yaxshi, bugun kelamanmi? Soat 14:00 bo'ladimi?</div>
                        <div style="font-size:0.625rem;color:var(--gray-400);text-align:right;margin-top:4px">12:25</div>
                    </div>
                    <div style="align-self:flex-end;max-width:70%;background:var(--primary-500);color:white;padding:10px 14px;border-radius:16px 16px 4px 16px;box-shadow:var(--shadow-xs)">
                        <div style="font-size:0.875rem">Ha, bo'ladi 👍</div>
                        <div style="font-size:0.625rem;opacity:0.7;text-align:right;margin-top:4px">12:28 ✓✓</div>
                    </div>
                    <div style="align-self:flex-start;max-width:70%;background:white;padding:10px 14px;border-radius:16px 16px 16px 4px;box-shadow:var(--shadow-xs)">
                        <div style="font-size:0.875rem;color:var(--gray-800)">Yaxshi, soat 14:00 da kelaman</div>
                        <div style="font-size:0.625rem;color:var(--gray-400);text-align:right;margin-top:4px">12:30</div>
                    </div>
                </div>
                <div style="padding:12px 16px;border-top:1px solid var(--gray-100);display:flex;gap:8px;align-items:center;background:white">
                    <button class="btn btn-ghost btn-icon btn-sm">📎</button>
                    <input class="form-input" placeholder="Xabar yozing..." style="min-height:40px;font-size:0.875rem" id="chat-input" onkeydown="if(event.key==='Enter')window.sendChatMsg()">
                    <button class="btn btn-primary btn-sm" style="padding:8px 16px" onclick="window.sendChatMsg()">📩</button>
                </div>
            </div>
        </div>
    </div>`;
});
window.openChat = function(id) {
    document.querySelectorAll('#chat-list > div').forEach(el => { el.style.background = ''; });
    const item = document.getElementById('chat-item-' + id);
    if (item) item.style.background = 'var(--primary-50)';
};
window.sendChatMsg = function() {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;
    const msgs = document.getElementById('chat-messages');
    const now = new Date();
    const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    msgs.innerHTML += `<div style="align-self:flex-end;max-width:70%;background:var(--primary-500);color:white;padding:10px 14px;border-radius:16px 16px 4px 16px;box-shadow:var(--shadow-xs);animation:fadeInUp 0.2s ease-out">
        <div style="font-size:0.875rem">${input.value}</div>
        <div style="font-size:0.625rem;opacity:0.7;text-align:right;margin-top:4px">${time} ✓</div>
    </div>`;
    input.value = '';
    msgs.scrollTop = msgs.scrollHeight;
    // Simulate reply
    setTimeout(() => {
        const replies = ['Yaxshi!','Tushundim 👍','OK, kelishildi','Ha, albatta','Bir ozdan keyin javob beraman'];
        msgs.innerHTML += `<div style="align-self:flex-start;max-width:70%;background:white;padding:10px 14px;border-radius:16px 16px 16px 4px;box-shadow:var(--shadow-xs);animation:fadeInUp 0.2s ease-out">
            <div style="font-size:0.875rem;color:var(--gray-800)">${replies[Math.floor(Math.random()*replies.length)]}</div>
            <div style="font-size:0.625rem;color:var(--gray-400);text-align:right;margin-top:4px">${time}</div>
        </div>`;
        msgs.scrollTop = msgs.scrollHeight;
    }, 1500);
};

/* ---------- CLIENT PROFILE ---------- */
Router.register('client/profile', () => {
    renderNavbar(); renderSidebar('client');
    const u = AppData.currentUser;
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Profilim</h2>
        <!-- Profile Header -->
        <div class="card" style="margin-bottom:20px;overflow:hidden">
            <div style="background:var(--gradient-hero);padding:32px;display:flex;align-items:center;gap:20px;margin:-20px -20px 20px;border-radius:var(--radius-lg) var(--radius-lg) 0 0">
                <div class="avatar avatar-xl" style="border:3px solid white;font-size:1.75rem">${u.initials}</div>
                <div style="color:white">
                    <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:800">${u.name}</div>
                    <div style="opacity:0.85;font-size:0.875rem">Mijoz • Ro'yxatdan o'tgan: Mart 2026</div>
                    <div style="display:flex;gap:16px;margin-top:8px">
                        <span style="font-size:0.8125rem">📦 ${AppData.orders.length} buyurtma</span>
                        <span style="font-size:0.8125rem">⭐ 4.9 baho</span>
                    </div>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div><label class="form-label">Ism</label><input class="form-input" value="${u.name}"></div>
                <div><label class="form-label">Telefon</label><input class="form-input" value="+998 90 123 45 67"></div>
                <div><label class="form-label">Email</label><input class="form-input" value="abdulloh@email.com" placeholder="Email"></div>
                <div><label class="form-label">Tug'ilgan sana</label><input class="form-input" type="date" value="1995-06-15"></div>
            </div>
            <button class="btn btn-primary btn-sm" style="margin-top:16px" onclick="showToast('Profil saqlandi ✅','success')">💾 Saqlash</button>
        </div>
        <!-- Payment Methods -->
        <div class="card" style="margin-bottom:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
                <h3 style="font-size:1rem">💳 To'lov usullari</h3>
                <button class="btn btn-ghost btn-sm" onclick="showToast('Yangi karta qo\\'shildi','success')">+ Qo'shish</button>
            </div>
            <div style="display:grid;gap:12px">
                <div class="card" style="padding:14px;background:linear-gradient(135deg,#1E293B,#334155);color:white;border:none">
                    <div style="display:flex;justify-content:space-between;align-items:center">
                        <div style="font-family:var(--font-display);font-size:1rem;letter-spacing:2px">•••• •••• •••• 4532</div>
                        <div style="font-weight:700;font-size:0.875rem">HUMO</div>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:12px;font-size:0.75rem;opacity:0.7">
                        <span>${u.name}</span><span>09/28</span>
                    </div>
                </div>
                <div class="card" style="padding:14px;background:linear-gradient(135deg,#6366F1,#8B5CF6);color:white;border:none">
                    <div style="display:flex;justify-content:space-between;align-items:center">
                        <div style="font-family:var(--font-display);font-size:1rem;letter-spacing:2px">•••• •••• •••• 8910</div>
                        <div style="font-weight:700;font-size:0.875rem">UzCard</div>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:12px;font-size:0.75rem;opacity:0.7">
                        <span>${u.name}</span><span>12/27</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Addresses -->
        <div class="card" style="margin-bottom:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
                <h3 style="font-size:1rem">📍 Saqlangan manzillar</h3>
                <button class="btn btn-ghost btn-sm" onclick="showToast('Yangi manzil saqlandi','success')">+ Qo'shish</button>
            </div>
            <div style="display:grid;gap:10px">
                <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--gray-50);border-radius:var(--radius-md)">
                    <span style="font-size:1.25rem">🏠</span>
                    <div style="flex:1"><div style="font-weight:600;font-size:0.875rem">Uyim</div><div style="font-size:0.75rem;color:var(--gray-500)">Mirzo Ulug'bek tumani, Buyuk Ipak Yo'li 45</div></div>
                    <span class="badge badge-primary">Asosiy</span>
                </div>
                <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--gray-50);border-radius:var(--radius-md)">
                    <span style="font-size:1.25rem">🏢</span>
                    <div style="flex:1"><div style="font-weight:600;font-size:0.875rem">Ish joyim</div><div style="font-size:0.75rem;color:var(--gray-500)">Yunusobod tumani, Amir Temur shox ko'chasi 108</div></div>
                </div>
            </div>
        </div>
        <!-- Danger Zone -->
        <div class="card" style="border-color:var(--danger-200)">
            <h3 style="font-size:1rem;color:var(--danger-600);margin-bottom:12px">⚠️ Xavfli zona</h3>
            <div style="display:flex;gap:12px">
                <button class="btn btn-outline btn-sm" style="border-color:var(--danger-200);color:var(--danger-600)" onclick="showToast('Qo\\'llab-quvvatlash bilan bog\\'laning','info')">Hisobni muzlatish</button>
                <button class="btn btn-danger btn-sm" onclick="showToast('Ishonchingiz komilmi? Bu amalni ortga qaytarib bo\\'lmaydi','error')">Hisobni o'chirish</button>
            </div>
        </div>
    </div>`;
});

/* ---------- CLIENT SETTINGS ---------- */
Router.register('client/settings', () => {
    renderNavbar(); renderSidebar('client');
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Sozlamalar</h2>
        <!-- Notifications -->
        <div class="card" style="margin-bottom:20px">
            <h3 style="font-size:1rem;margin-bottom:16px">🔔 Bildirishnomalar</h3>
            <div style="display:flex;flex-direction:column;gap:4px">
                ${[{t:'Yangi buyurtma xabarlari',d:'Yangi buyurtmalar haqida bildirishnoma',on:true},
                   {t:'SMS bildirishnomalar',d:'Muhim yangiliklar SMS orqali',on:true},
                   {t:'Email bildirishnomalar',d:'Haftalik hisobot email orqali',on:false},
                   {t:'Reklama xabarlari',d:'Chegirmalar va aksiyalar haqida',on:false}].map(n => `
                <div class="profile-menu-item" style="padding:12px 0">
                    <div class="menu-text" style="flex:1"><div class="menu-label">${n.t}</div><div class="menu-sublabel">${n.d}</div></div>
                    <div class="toggle ${n.on?'active':''}" onclick="this.classList.toggle('active');showToast('Sozlama yangilandi','success')"></div>
                </div>`).join('')}
            </div>
        </div>
        <!-- Appearance -->
        <div class="card" style="margin-bottom:20px">
            <h3 style="font-size:1rem;margin-bottom:16px">🎨 Ko'rinish</h3>
            <div class="profile-menu-item" style="padding:12px 0">
                <div class="menu-text" style="flex:1"><div class="menu-label">Qorong'i rejim</div><div class="menu-sublabel">Tungi rejimni yoqish</div></div>
                <div class="toggle" onclick="this.classList.toggle('active');showToast('Tez orada qo\\'shiladi','info')"></div>
            </div>
        </div>
        <!-- Language -->
        <div class="card" style="margin-bottom:20px">
            <h3 style="font-size:1rem;margin-bottom:16px">🌐 Til</h3>
            <div style="display:flex;gap:8px">
                <button class="btn btn-primary btn-sm">🇺🇿 O'zbek</button>
                <button class="btn btn-outline btn-sm" onclick="showToast('Til o\\'zgartirildi','success')">🇷🇺 Русский</button>
                <button class="btn btn-outline btn-sm" onclick="showToast('Til o\\'zgartirildi','success')">🇬🇧 English</button>
            </div>
        </div>
        <!-- Privacy -->
        <div class="card" style="margin-bottom:20px">
            <h3 style="font-size:1rem;margin-bottom:16px">🔒 Xavfsizlik</h3>
            <div style="display:flex;flex-direction:column;gap:4px">
                <div class="profile-menu-item" onclick="showToast('Parol o\\'zgartirish oynasi ochildi','info')" style="padding:12px 0">
                    <div class="menu-icon" style="background:var(--primary-50);color:var(--primary-600)">🔑</div>
                    <div class="menu-text"><div class="menu-label">Parolni o'zgartirish</div><div class="menu-sublabel">Oxirgi o'zgartirilgan: 30 kun oldin</div></div>
                    <span style="color:var(--gray-400)">${AppData.icons.arrowRight}</span>
                </div>
                <div class="profile-menu-item" onclick="showToast('2FA yoqildi ✅','success')" style="padding:12px 0">
                    <div class="menu-icon" style="background:var(--success-50);color:var(--success-600)">🛡️</div>
                    <div class="menu-text"><div class="menu-label">Ikki bosqichli tasdiqlash</div><div class="menu-sublabel">SMS orqali qo'shimcha himoya</div></div>
                    <div class="toggle active" onclick="event.stopPropagation();this.classList.toggle('active')"></div>
                </div>
                <div class="profile-menu-item" onclick="showToast('Faol seanslar ko\\'rsatildi','info')" style="padding:12px 0">
                    <div class="menu-icon" style="background:var(--warm-50);color:var(--warm-600)">📱</div>
                    <div class="menu-text"><div class="menu-label">Faol seanslar</div><div class="menu-sublabel">2 ta qurilmada faol</div></div>
                    <span style="color:var(--gray-400)">${AppData.icons.arrowRight}</span>
                </div>
            </div>
        </div>
        <!-- About -->
        <div class="card">
            <h3 style="font-size:1rem;margin-bottom:16px">ℹ️ Ilova haqida</h3>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:0.875rem">
                <div><span style="color:var(--gray-500)">Versiya:</span> <strong>2.1.0</strong></div>
                <div><span style="color:var(--gray-500)">Yangilangan:</span> <strong>26.03.2026</strong></div>
            </div>
            <div style="margin-top:16px;display:flex;gap:8px">
                <button class="btn btn-outline btn-sm" onclick="showToast('FAQ ochildi','info')">❓ FAQ</button>
                <button class="btn btn-outline btn-sm" onclick="showToast('Qo\\'llab-quvvatlash bilan bog\\'landingiz','info')">💬 Yordam</button>
                <button class="btn btn-outline btn-sm" onclick="showToast('Foydalanish shartlari','info')">📄 Shartlar</button>
            </div>
        </div>
    </div>`;
});

/* ---- MASTER PAGES ---- */
window.manageActiveOrder = function(id) {
    const o = AppData.orders.find(x => x.id === id);
    if(!o) return;
    const isStarted = o.status === 'in_progress';
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = function(e) { if(e.target===this) this.remove(); };
    overlay.innerHTML = `<div class="modal-content" style="max-width:400px;text-align:center;animation: modal-enter 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)">
        <div style="font-size:3rem;margin-bottom:16px">${isStarted ? '\ud83d\udea7' : '\ud83d\udee0\ufe0f'}</div>
        <h2 style="margin-bottom:8px;font-size:1.5rem">Ishni boshqarish</h2>
        <p style="color:var(--gray-500);margin-bottom:24px;font-size:0.875rem"><strong>${o.service}</strong> bo'yicha harakatni tanlang</p>
        
        <div style="display:flex;flex-direction:column;gap:12px">
            ${!isStarted ? `<button class="btn btn-primary btn-block btn-lg" onclick="window.updateOrderStatus(${o.id}, 'in_progress'); this.closest('.modal-overlay').remove()">Ishni boshlash</button>` : ''}
            <button class="btn btn-success btn-block btn-lg" onclick="window.updateOrderStatus(${o.id}, 'completed'); this.closest('.modal-overlay').remove()">Ishni tugatdim</button>
            <button class="btn btn-outline btn-block" onclick="this.closest('.modal-overlay').remove()">Yopish</button>
        </div>
    </div>`;
    document.body.appendChild(overlay);
};

window.updateOrderStatus = function(id, st) {
    const o = AppData.orders.find(x => x.id === id);
    if(!o) return;
    o.status = st;
    showToast(st === 'completed' ? 'Ish muvaffaqiyatli tugatildi! ✅' : 'Ish boshlandi! 🚀', 'success');
    Router.navigate(Router.getCurrentRoute());
};

Router.register('master/home', () => {
    renderNavbar(); renderSidebar('master');
    const u = AppData.currentUser;
    const masterData = AppData.masters.find(m => m.initials === u.initials) || AppData.masters[0];
    
    const pendingOrders = AppData.orders.filter(o => o.status === 'pending' && o.categoryId === masterData.categoryId && (!o.masterId || o.masterId === masterData.id));
    const activeOrders = AppData.orders.filter(o => ['active','in_progress'].includes(o.status) && o.masterId === masterData.id);
    
    window.openProposePriceModal = function(id) {
        const o = AppData.orders.find(x => x.id === id);
        if(!o) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.onclick = function(e) { if(e.target===this) this.remove(); };
        overlay.innerHTML = `<div class="modal-content" style="max-width:400px;text-align:center">
            <div style="font-size:3rem;margin-bottom:16px">\ud83d\udcb0</div>
            <h2 style="margin-bottom:8px">Narx taklif qilish</h2>
            <p style="color:var(--gray-500);margin-bottom:20px;font-size:0.875rem">Ushbu ish uchun qancha narx so'raysiz?</p>
            <div class="form-group" style="text-align:left">
                <div style="position:relative">
                    <input type="number" id="proposed-price-input" class="form-input" placeholder="Masalan: 150000" style="padding-right:48px;font-size:1.25rem;font-weight:700">
                    <span style="position:absolute;right:16px;top:50%;transform:translateY(-50%);color:var(--gray-500);font-weight:600">so'm</span>
                </div>
            </div>
            <div style="display:flex;gap:8px;margin-top:24px">
                <button class="btn btn-outline btn-block" onclick="this.closest('.modal-overlay').remove()">Bekor qilish</button>
                <button class="btn btn-primary btn-block" id="confirm-price-btn">Yuborish</button>
            </div>
        </div>`;
        document.body.appendChild(overlay);
        
        const input = document.getElementById('proposed-price-input');
        input.focus();
        
        document.getElementById('confirm-price-btn').onclick = function() {
            const price = input.value;
            if (price && price.trim() !== "") {
                o.status = 'price_proposed';
                o.proposedPrice = parseInt(price.trim().replace(/\D/g, ''), 10) || 0;
                o.masterId = masterData.id;
                showToast('Taklifingiz mijozga yuborildi!', 'success');
                overlay.remove();
                Router.navigate('master/home');
            } else {
                showToast('Iltimos, narxni kiriting', 'error');
            }
        };
    };



    main().innerHTML = `<div class="page-container page-enter">
        <div class="dash-welcome" style="background:linear-gradient(160deg,#14B8A6 0%,#06B6D4 50%,#0EA5E9 100%)">
            <h2>Xush kelibsiz, ${u.name} 🔧</h2>
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
                    <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:800">${formatPrice(u.balance).replace(" so'm",'')}</div>
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
                        <button class="btn btn-primary btn-sm" style="flex:1" onclick="window.openProposePriceModal(${o.id})">Taklif berish</button>
                    </div>
                </div>`;
            }).join('')}</div>
        </div>` : ''}
        ${activeOrders.length ? `<div class="section"><div class="section-header"><div class="section-title">Faol ishlar</div></div>
            ${activeOrders.map(o => `<div class="card" style="border-left:4px solid var(--accent-500)">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <div><strong>${o.service}</strong><div style="font-size:0.8125rem;color:var(--gray-500)">${o.address}</div></div>
                    <button class="btn btn-accent btn-sm" onclick="window.manageActiveOrder(${o.id})">Boshqarish</button>
                </div>
            </div>`).join('')}
        </div>` : ''}
        ${!pendingOrders.length && !activeOrders.length ? `<div style="text-align:center;padding:40px;color:var(--gray-500)">Hozircha buyurtmalar yo'q</div>` : ''}
    </div>`;
});

Router.register('master/orders', () => {
    renderNavbar(); renderSidebar('master');
    const u = AppData.currentUser;
    const masterData = AppData.masters.find(m => m.initials === u.initials) || AppData.masters[0];
    const myOrders = AppData.orders.filter(o => o.masterId === masterData.id);

    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Mening buyurtmalarim</h2>
        ${myOrders.length ? `<div class="orders-grid">${myOrders.map(o => {
            const cat = AppData.categories.find(c => c.id === o.categoryId);
            return `<div class="order-card">
                <div class="order-card-header"><div class="order-card-service">${cat?cat.icon:''} ${o.service}</div><span class="badge badge-${getStatusClass(o.status)}">${getStatusText(o.status)}</span></div>
                <div class="order-card-body">${o.description}</div>
                <div class="order-card-footer"><span style="color:var(--gray-500)">${o.address}</span><span class="order-price">${o.price ? formatPrice(o.price) : 'Kelishilgan'}</span></div>
                ${['active','in_progress'].includes(o.status) ? `<div style="margin-top:12px"><button class="btn btn-accent btn-sm btn-block" onclick="window.manageActiveOrder(${o.id})">Boshqarish</button></div>` : ''}
            </div>`;
        }).join('')}</div>` : `<div style="text-align:center;padding:40px;color:var(--gray-500)">Sizda hali ishlar yo'q</div>`}
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

/* ---------- MASTER PROFILE ---------- */
Router.register('master/profile', () => {
    renderNavbar(); renderSidebar('master');
    const u = AppData.currentUser;
    const masterData = AppData.masters.find(m => m.initials === u.initials) || AppData.masters[0];
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Profilim</h2>
        <!-- Profile Header -->
        <div class="card" style="margin-bottom:20px;overflow:hidden">
            <div style="background:linear-gradient(160deg,#14B8A6 0%,#06B6D4 50%,#0EA5E9 100%);padding:32px;display:flex;align-items:center;gap:20px;margin:-20px -20px 20px;border-radius:var(--radius-lg) var(--radius-lg) 0 0">
                <div class="avatar avatar-xl" style="border:3px solid white;font-size:1.75rem">${u.initials}</div>
                <div style="color:white;flex:1">
                    <div style="display:flex;align-items:center;gap:8px">
                        <span style="font-family:var(--font-display);font-size:1.5rem;font-weight:800">${u.name}</span>
                        <span style="background:rgba(255,255,255,0.2);padding:2px 8px;border-radius:var(--radius-full);font-size:0.6875rem;font-weight:600">✅ Tasdiqlangan</span>
                    </div>
                    <div style="opacity:0.85;font-size:0.875rem">${masterData.specialty} • ${masterData.district}</div>
                    <div style="display:flex;gap:20px;margin-top:12px;flex-wrap:wrap">
                        <div style="text-align:center"><div style="font-family:var(--font-display);font-size:1.25rem;font-weight:800">${masterData.completedJobs}</div><div style="font-size:0.6875rem;opacity:0.8">Bajarilgan ish</div></div>
                        <div style="text-align:center"><div style="font-family:var(--font-display);font-size:1.25rem;font-weight:800">⭐ ${masterData.rating}</div><div style="font-size:0.6875rem;opacity:0.8">Reyting</div></div>
                        <div style="text-align:center"><div style="font-family:var(--font-display);font-size:1.25rem;font-weight:800">${masterData.reviewCount}</div><div style="font-size:0.6875rem;opacity:0.8">Sharhlar</div></div>
                        <div style="text-align:center"><div style="font-family:var(--font-display);font-size:1.25rem;font-weight:800">${formatPrice(u.balance)}</div><div style="font-size:0.6875rem;opacity:0.8">Balans</div></div>
                    </div>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div><label class="form-label">Ism</label><input class="form-input" value="${u.name}"></div>
                <div><label class="form-label">Telefon</label><input class="form-input" value="+998 93 777 88 99"></div>
                <div><label class="form-label">Mutaxassislik</label><input class="form-input" value="${masterData.specialty}"></div>
                <div><label class="form-label">Tuman</label><input class="form-input" value="${masterData.district}"></div>
                <div style="grid-column:1/3"><label class="form-label">Bio</label><textarea class="form-input form-textarea" rows="3">${masterData.bio}</textarea></div>
            </div>
            <button class="btn btn-primary btn-sm" style="margin-top:16px" onclick="showToast('Profil saqlandi ✅','success')">💾 Saqlash</button>
        </div>
        <!-- Skills & Certificates -->
        <div class="card" style="margin-bottom:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
                <h3 style="font-size:1rem">🛠 Ko'nikmalar va sertifikatlar</h3>
                <button class="btn btn-ghost btn-sm" onclick="showToast('Yangi konima qoshildi','success')">+ Qo'shish</button>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
                ${['Kran tamirlash','Truba almashtirish','Kanalizatsiya','Dush kabina','Suvni isitgich'].map(s => `<span class="badge badge-primary" style="padding:6px 12px;font-size:0.8125rem">${s}</span>`).join('')}
            </div>
            <div style="display:grid;gap:10px">
                <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--gray-50);border-radius:var(--radius-md)">
                    <span style="font-size:1.25rem">📜</span>
                    <div style="flex:1"><div style="font-weight:600;font-size:0.875rem">Professional santexnik sertifikati</div><div style="font-size:0.75rem;color:var(--gray-500)">Berilgan: 2020-yil • Amal qiladi</div></div>
                    <span class="badge badge-success">Tasdiqlangan</span>
                </div>
                <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--gray-50);border-radius:var(--radius-md)">
                    <span style="font-size:1.25rem">🆔</span>
                    <div style="flex:1"><div style="font-weight:600;font-size:0.875rem">Shaxsni tasdiqlovchi hujjat</div><div style="font-size:0.75rem;color:var(--gray-500)">Passport • Yuklangan</div></div>
                    <span class="badge badge-success">Tasdiqlangan</span>
                </div>
            </div>
        </div>
        <!-- Reviews -->
        <div class="card" style="margin-bottom:20px">
            <h3 style="font-size:1rem;margin-bottom:16px">⭐ Oxirgi sharhlar</h3>
            <div style="display:grid;gap:12px">
                ${[
                    {name:'Abdulloh R.',rating:5,text:'Ajoyib usta! Krani 30 daqiqada tuzatdi. Tavsiya qilaman.',date:'2 kun oldin'},
                    {name:'Sardor M.',rating:5,text:'Juda tez va professional ishladi. Narxi ham arzon.',date:'5 kun oldin'},
                    {name:'Nodira K.',rating:4,text:'Yaxshi ishladi, lekin biroz kech keldi.',date:'1 hafta oldin'},
                ].map(r => `<div style="padding:14px;background:var(--gray-50);border-radius:var(--radius-md)">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
                        <div style="display:flex;align-items:center;gap:8px">
                            <div class="avatar avatar-sm" style="width:28px;height:28px;font-size:0.625rem">${r.name.split(' ').map(w=>w[0]).join('')}</div>
                            <span style="font-weight:600;font-size:0.875rem">${r.name}</span>
                        </div>
                        <span style="font-size:0.6875rem;color:var(--gray-400)">${r.date}</span>
                    </div>
                    <div style="margin-bottom:6px">${generateStars(r.rating)}</div>
                    <div style="font-size:0.8125rem;color:var(--gray-700)">${r.text}</div>
                </div>`).join('')}
            </div>
        </div>
        <!-- Pricing -->
        <div class="card">
            <h3 style="font-size:1rem;margin-bottom:16px">💰 Narxlar</h3>
            <div style="display:grid;gap:10px">
                ${[
                    {s:'Kran tamirlash',p:'50 000 - 150 000'},
                    {s:'Truba almashtirish',p:'100 000 - 300 000'},
                    {s:'Kanalizatsiya tozalash',p:'80 000 - 200 000'},
                ].map(item => `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--gray-100)">
                    <span style="font-size:0.875rem;font-weight:500">${item.s}</span>
                    <span style="font-weight:700;color:var(--primary-600);font-size:0.875rem">${item.p} so'm</span>
                </div>`).join('')}
            </div>
            <button class="btn btn-ghost btn-sm" style="margin-top:12px" onclick="showToast('Narxlar tahrirlash ochildi','info')">✏️ Narxlarni tahrirlash</button>
        </div>
    </div>`;
});

/* ---------- MASTER SETTINGS ---------- */
Router.register('master/settings', () => {
    renderNavbar(); renderSidebar('master');
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Sozlamalar</h2>
        <!-- Availability -->
        <div class="card" style="margin-bottom:20px">
            <h3 style="font-size:1rem;margin-bottom:16px">🟢 Mavjudlik</h3>
            <div class="profile-menu-item" style="padding:12px 0">
                <div class="menu-text" style="flex:1"><div class="menu-label">Online holat</div><div class="menu-sublabel">Yangi buyurtmalar qabul qilish uchun online bo'ling</div></div>
                <div class="toggle active" onclick="this.classList.toggle('active');showToast(this.classList.contains('active')?'Online holat yoqildi ✅':'Offline holatga otdingiz','success')"></div>
            </div>
            <div class="profile-menu-item" style="padding:12px 0">
                <div class="menu-text" style="flex:1"><div class="menu-label">Avtomatik qabul qilish</div><div class="menu-sublabel">Yangi buyurtmalarni avtomatik qabul qilish</div></div>
                <div class="toggle" onclick="this.classList.toggle('active');showToast('Sozlama yangilandi','success')"></div>
            </div>
        </div>
        <!-- Work Schedule -->
        <div class="card" style="margin-bottom:20px">
            <h3 style="font-size:1rem;margin-bottom:16px">📅 Ish jadvali</h3>
            <div style="display:grid;gap:8px">
                ${[
                    {d:'Dushanba',from:'09:00',to:'18:00',on:true},
                    {d:'Seshanba',from:'09:00',to:'18:00',on:true},
                    {d:'Chorshanba',from:'09:00',to:'18:00',on:true},
                    {d:'Payshanba',from:'09:00',to:'18:00',on:true},
                    {d:'Juma',from:'09:00',to:'18:00',on:true},
                    {d:'Shanba',from:'10:00',to:'15:00',on:true},
                    {d:'Yakshanba',from:'',to:'',on:false},
                ].map(day => `<div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--gray-50)">
                    <div class="toggle ${day.on?'active':''}" onclick="this.classList.toggle('active')" style="transform:scale(0.8)"></div>
                    <span style="font-weight:600;font-size:0.875rem;width:100px">${day.d}</span>
                    ${day.on ? `<input class="form-input" type="time" value="${day.from}" style="width:110px;min-height:36px;font-size:0.8125rem;padding:4px 8px"> 
                    <span style="color:var(--gray-400)">—</span>
                    <input class="form-input" type="time" value="${day.to}" style="width:110px;min-height:36px;font-size:0.8125rem;padding:4px 8px">` 
                    : `<span style="font-size:0.8125rem;color:var(--gray-400)">Dam olish kuni</span>`}
                </div>`).join('')}
            </div>
            <button class="btn btn-primary btn-sm" style="margin-top:16px" onclick="showToast('Jadval saqlandi ✅','success')">💾 Saqlash</button>
        </div>
        <!-- Notifications -->
        <div class="card" style="margin-bottom:20px">
            <h3 style="font-size:1rem;margin-bottom:16px">🔔 Bildirishnomalar</h3>
            <div style="display:flex;flex-direction:column;gap:4px">
                ${[{t:'Yangi buyurtma xabarlari',d:'Yangi buyurtmalar haqida darhol xabar',on:true},
                   {t:'SMS bildirishnomalar',d:'Muhim yangiliklar SMS orqali',on:true},
                   {t:'Mijoz xabarlari',d:'Chat xabarlari kelganda bildirishnoma',on:true},
                   {t:'Tolov xabarlari',d:'Pul tushganda bildirishnoma',on:true},
                   {t:'Reklama xabarlari',d:'Chegirmalar va aksiyalar haqida',on:false}].map(n => `
                <div class="profile-menu-item" style="padding:12px 0">
                    <div class="menu-text" style="flex:1"><div class="menu-label">${n.t}</div><div class="menu-sublabel">${n.d}</div></div>
                    <div class="toggle ${n.on?'active':''}" onclick="this.classList.toggle('active');showToast('Sozlama yangilandi','success')"></div>
                </div>`).join('')}
            </div>
        </div>
        <!-- Payment -->
        <div class="card" style="margin-bottom:20px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
                <h3 style="font-size:1rem">💳 To'lov ma'lumotlari</h3>
                <button class="btn btn-ghost btn-sm" onclick="showToast('Yangi karta qoshildi','success')">+ Qo'shish</button>
            </div>
            <div style="display:grid;gap:12px">
                <div class="card" style="padding:14px;background:linear-gradient(135deg,#14B8A6,#06B6D4);color:white;border:none">
                    <div style="display:flex;justify-content:space-between;align-items:center">
                        <div style="font-family:var(--font-display);font-size:1rem;letter-spacing:2px">•••• •••• •••• 7845</div>
                        <div style="font-weight:700;font-size:0.875rem">HUMO</div>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:12px;font-size:0.75rem;opacity:0.7">
                        <span>Aziz Karimov</span><span>05/29</span>
                    </div>
                </div>
            </div>
            <p style="font-size:0.75rem;color:var(--gray-500);margin-top:8px">Daromad shu kartaga tushadi</p>
        </div>
        <!-- Service Area -->
        <div class="card" style="margin-bottom:20px">
            <h3 style="font-size:1rem;margin-bottom:16px">📍 Xizmat hududlari</h3>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
                ${['Mirzo Ulugbek','Yunusobod','Chilonzor','Sergeli','Yakkasaroy'].map(d => `<span class="badge badge-accent" style="padding:6px 12px;font-size:0.8125rem">${d} ✕</span>`).join('')}
            </div>
            <button class="btn btn-ghost btn-sm" onclick="showToast('Yangi tuman qoshildi','success')">+ Tuman qo'shish</button>
        </div>
        <!-- Security -->
        <div class="card" style="margin-bottom:20px">
            <h3 style="font-size:1rem;margin-bottom:16px">🔒 Xavfsizlik</h3>
            <div style="display:flex;flex-direction:column;gap:4px">
                <div class="profile-menu-item" onclick="showToast('Parol ozgartirish oynasi ochildi','info')" style="padding:12px 0">
                    <div class="menu-icon" style="background:var(--primary-50);color:var(--primary-600)">🔑</div>
                    <div class="menu-text"><div class="menu-label">Parolni o'zgartirish</div><div class="menu-sublabel">Oxirgi o'zgartirilgan: 15 kun oldin</div></div>
                    <span style="color:var(--gray-400)">${AppData.icons.arrowRight}</span>
                </div>
                <div class="profile-menu-item" style="padding:12px 0">
                    <div class="menu-icon" style="background:var(--success-50);color:var(--success-600)">🛡️</div>
                    <div class="menu-text"><div class="menu-label">Ikki bosqichli tasdiqlash</div><div class="menu-sublabel">SMS orqali qo'shimcha himoya</div></div>
                    <div class="toggle active" onclick="event.stopPropagation();this.classList.toggle('active');showToast('2FA sozlamasi yangilandi','success')"></div>
                </div>
            </div>
        </div>
        <!-- Language -->
        <div class="card">
            <h3 style="font-size:1rem;margin-bottom:16px">🌐 Til</h3>
            <div style="display:flex;gap:8px">
                <button class="btn btn-primary btn-sm">🇺🇿 O'zbek</button>
                <button class="btn btn-outline btn-sm" onclick="showToast('Til ozgartirildi','success')">🇷🇺 Русский</button>
                <button class="btn btn-outline btn-sm" onclick="showToast('Til ozgartirildi','success')">🇬🇧 English</button>
            </div>
        </div>
    </div>`;
});

/* ---- ADMIN PAGES ---- */
Router.register('admin/home', () => {
    renderNavbar(); renderSidebar('admin');
    const pendingCount = AppData.pendingVerifications.filter(v => v.status === 'pending').length;
    const approvedCount = AppData.masters.length;
    const blockedMasters = (AppData.blockedMasters || []).length;
    const blockedClients = (AppData.blockedClients || []).length;
    main().innerHTML = `<div class="page-container page-enter">
        <div class="dash-welcome" style="background:var(--gradient-dark)">
            <h2>Admin Panel</h2>
            <p>Ustalar va mijozlarni boshqarish</p>
        </div>
        <div class="stats-grid">
            <div class="stat-card" style="background:linear-gradient(135deg,#F59E0B,#F97316)">
                <div class="stat-icon">${AppData.icons.users}</div>
                <div class="stat-value">${pendingCount}</div>
                <div class="stat-label">Kutilayotgan ustalar</div>
            </div>
            <div class="stat-card" style="background:linear-gradient(135deg,#22C55E,#16A34A)">
                <div class="stat-icon">${AppData.icons.check}</div>
                <div class="stat-value">${approvedCount}</div>
                <div class="stat-label">Tasdiqlangan ustalar</div>
            </div>
            <div class="stat-card" style="background:linear-gradient(135deg,#EF4444,#DC2626)">
                <div class="stat-icon">${AppData.icons.x}</div>
                <div class="stat-value">${blockedMasters}</div>
                <div class="stat-label">Bloklangan ustalar</div>
            </div>
            <div class="stat-card" style="background:linear-gradient(135deg,#6366F1,#8B5CF6)">
                <div class="stat-icon">${AppData.icons.profile}</div>
                <div class="stat-value">${blockedClients}</div>
                <div class="stat-label">Bloklangan mijozlar</div>
            </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px">
            <div class="card" style="cursor:pointer" onclick="Router.navigate('admin/masters')">
                <h3 style="margin-bottom:16px">Kutilayotgan ustalar</h3>
                ${AppData.pendingVerifications.filter(v=>v.status==='pending').slice(0,3).map(v => `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--gray-100)">
                    <div><strong style="font-size:0.875rem">${v.name}</strong><div style="font-size:0.75rem;color:var(--gray-500)">${v.specialty} - ${v.district}</div></div>
                    <span class="badge badge-warning">Kutilmoqda</span>
                </div>`).join('') || '<p style="color:var(--gray-400);text-align:center;padding:20px">Kutilayotgan ustalar yoq</p>'}
                <button class="btn btn-outline btn-sm btn-block" style="margin-top:12px">Barchasini korish →</button>
            </div>
            <div class="card" style="cursor:pointer" onclick="Router.navigate('admin/clients')">
                <h3 style="margin-bottom:16px">Faol mijozlar</h3>
                ${[{name:'Abdulloh Rahimov',phone:'+998901234567'},{name:'Sardor Mirzayev',phone:'+998937778899'},{name:'Nodira Karimova',phone:'+998944445566'}].map(c => `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--gray-100)">
                    <div><strong style="font-size:0.875rem">${c.name}</strong><div style="font-size:0.75rem;color:var(--gray-500)">${c.phone}</div></div>
                    <span class="badge badge-success">Faol</span>
                </div>`).join('')}
                <button class="btn btn-outline btn-sm btn-block" style="margin-top:12px">Barchasini korish →</button>
            </div>
        </div>
    </div>`;
});

/* ---------- ADMIN: MASTERS MANAGEMENT ---------- */
Router.register('admin/masters', () => {
    renderNavbar(); renderSidebar('admin');
    if (!AppData.blockedMasters) AppData.blockedMasters = [];
    if (!AppData.approvedMasters) AppData.approvedMasters = AppData.masters.map(m => ({...m}));
    const tabs = [{id:'pending',t:'Kutilayotgan',icon:'⏳'},{id:'approved',t:'Tasdiqlangan',icon:'✅'},{id:'blocked',t:'Bloklangan',icon:'🚫'}];
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Ustalarni boshqarish</h2>
        <div class="tabs" style="margin-bottom:24px" id="master-tabs">
            ${tabs.map((t,i) => `<div class="tab ${i===0?'active':''}" onclick="window.showMasterTab('${t.id}');this.parentElement.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));this.classList.add('active')">${t.icon} ${t.t}</div>`).join('')}
        </div>
        <div id="master-tab-content">${renderMasterTab('pending')}</div>
    </div>`;
});

function renderMasterTab(tab) {
    if (tab === 'pending') {
        const pending = AppData.pendingVerifications.filter(v => v.status === 'pending');
        if (!pending.length) return '<div style="text-align:center;padding:40px"><div style="font-size:3rem;margin-bottom:12px">✅</div><h3 style="color:var(--gray-700)">Kutilayotgan ustalar yoq</h3><p style="color:var(--gray-500)">Barcha arizalar korib chiqilgan</p></div>';
        return pending.map(v => `<div class="card" style="margin-bottom:16px" id="master-card-${v.id}">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
                <div style="display:flex;align-items:center;gap:14px">
                    <div class="avatar avatar-lg">${v.name.split(' ').map(w=>w[0]).join('')}</div>
                    <div>
                        <div style="font-weight:700;font-size:1.0625rem">${v.name}</div>
                        <div style="font-size:0.8125rem;color:var(--gray-500)">${v.specialty} - ${v.district}</div>
                        <div style="font-size:0.75rem;color:var(--gray-400)">${v.phone} - Ariza: ${v.appliedDate}</div>
                    </div>
                </div>
                <span class="badge badge-warning" style="font-size:0.8125rem">Kutilmoqda</span>
            </div>
            <div style="background:var(--gray-50);padding:14px;border-radius:var(--radius-md);margin-bottom:12px">
                <div style="font-weight:600;font-size:0.8125rem;color:var(--gray-600);margin-bottom:4px">Bio:</div>
                <div style="font-size:0.875rem;color:var(--gray-800)">${v.bio}</div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
                <div style="padding:12px;background:var(--gray-50);border-radius:var(--radius-md);text-align:center">
                    <div style="font-size:1.5rem;margin-bottom:4px">📸</div>
                    <div style="font-weight:600;font-size:0.8125rem">Ish rasmlari</div>
                    <div style="font-size:0.75rem;color:var(--success-600)">3 ta rasm yuklangan</div>
                </div>
                <div style="padding:12px;background:var(--gray-50);border-radius:var(--radius-md);text-align:center">
                    <div style="font-size:1.5rem;margin-bottom:4px">🪪</div>
                    <div style="font-weight:600;font-size:0.8125rem">Pasport nusxasi</div>
                    <div style="font-size:0.75rem;color:var(--success-600)">Yuklangan</div>
                </div>
            </div>
            <div style="display:flex;gap:8px">
                <button class="btn btn-success" style="flex:1" onclick="window.adminApproveMaster(${v.id})">✅ Tasdiqlash</button>
                <button class="btn btn-danger" style="flex:1" onclick="window.adminRejectMaster(${v.id})">❌ Rad etish</button>
            </div>
        </div>`).join('');
    } else if (tab === 'approved') {
        const approved = AppData.approvedMasters || AppData.masters;
        if (!approved.length) return '<div style="text-align:center;padding:40px"><p style="color:var(--gray-400)">Tasdiqlangan ustalar yoq</p></div>';
        return `<div style="display:grid;gap:12px">${approved.map(m => `<div class="card" style="padding:16px;display:flex;align-items:center;gap:14px">
            <div class="avatar">${m.initials || m.name.split(' ').map(w=>w[0]).join('')}</div>
            <div style="flex:1">
                <div style="font-weight:700">${m.name} ${m.verified?'✅':''}</div>
                <div style="font-size:0.8125rem;color:var(--gray-500)">${m.specialty} - ${m.district || ''}</div>
                <div style="font-size:0.75rem;color:var(--gray-400)">⭐${m.rating} - ${m.completedJobs} ta ish</div>
            </div>
            <div style="display:flex;align-items:center;gap:4px"><span class="status-dot online"></span><span style="font-size:0.75rem;color:var(--success-600)">Faol</span></div>
            <button class="btn btn-outline btn-sm" style="border-color:var(--danger-200);color:var(--danger-600)" onclick="window.adminBlockMaster(${m.id},'${m.name}')">🚫 Bloklash</button>
        </div>`).join('')}</div>`;
    } else {
        const blocked = AppData.blockedMasters || [];
        if (!blocked.length) return '<div style="text-align:center;padding:40px"><div style="font-size:3rem;margin-bottom:12px">👍</div><h3 style="color:var(--gray-700)">Bloklangan ustalar yoq</h3></div>';
        return `<div style="display:grid;gap:12px">${blocked.map(m => `<div class="card" style="padding:16px;display:flex;align-items:center;gap:14px;opacity:0.7">
            <div class="avatar" style="background:var(--gray-300)">${m.initials || m.name.split(' ').map(w=>w[0]).join('')}</div>
            <div style="flex:1">
                <div style="font-weight:700">${m.name}</div>
                <div style="font-size:0.8125rem;color:var(--gray-500)">${m.specialty || ''}</div>
            </div>
            <span class="badge badge-danger">Bloklangan</span>
            <button class="btn btn-outline btn-sm" onclick="window.adminUnblockMaster(${m.id},'${m.name}')">Blokdan chiqarish</button>
        </div>`).join('')}</div>`;
    }
}
window.showMasterTab = function(tab) {
    document.getElementById('master-tab-content').innerHTML = renderMasterTab(tab);
};
window.adminApproveMaster = function(id) {
    const v = AppData.pendingVerifications.find(x => x.id === id);
    if (v) {
        v.status = 'approved';
        if (!AppData.approvedMasters) AppData.approvedMasters = [...AppData.masters];
        AppData.approvedMasters.push({id: 100+id, name: v.name, initials: v.name.split(' ').map(w=>w[0]).join(''), specialty: v.specialty, district: v.district, rating: 0, reviewCount: 0, completedJobs: 0, verified: true, online: false, categoryId: 1, distance: 0, bio: v.bio, price: '0'});
        showToast(v.name + ' tasdiqlandi!', 'success');
        document.getElementById('master-tab-content').innerHTML = renderMasterTab('pending');
    }
};
window.adminRejectMaster = function(id) {
    const v = AppData.pendingVerifications.find(x => x.id === id);
    if (v) {
        v.status = 'rejected';
        showToast(v.name + ' rad etildi', 'error');
        document.getElementById('master-tab-content').innerHTML = renderMasterTab('pending');
    }
};
window.adminBlockMaster = function(id, name) {
    if (!AppData.blockedMasters) AppData.blockedMasters = [];
    const idx = (AppData.approvedMasters||AppData.masters).findIndex(m => m.id === id);
    if (idx > -1) {
        const m = (AppData.approvedMasters||AppData.masters).splice(idx, 1)[0];
        AppData.blockedMasters.push(m);
        showToast(name + ' bloklandi', 'error');
        document.getElementById('master-tab-content').innerHTML = renderMasterTab('approved');
    }
};
window.adminUnblockMaster = function(id, name) {
    const idx = AppData.blockedMasters.findIndex(m => m.id === id);
    if (idx > -1) {
        const m = AppData.blockedMasters.splice(idx, 1)[0];
        if (!AppData.approvedMasters) AppData.approvedMasters = [...AppData.masters];
        AppData.approvedMasters.push(m);
        showToast(name + ' blokdan chiqarildi', 'success');
        document.getElementById('master-tab-content').innerHTML = renderMasterTab('blocked');
    }
};

/* ---------- ADMIN: CLIENTS MANAGEMENT ---------- */
Router.register('admin/clients', () => {
    renderNavbar(); renderSidebar('admin');
    if (!AppData.blockedClients) AppData.blockedClients = [];
    if (!AppData.activeClients) AppData.activeClients = [
        {id:1,name:'Abdulloh Rahimov',phone:'+998 90 123 45 67',orders:5,since:'2026-01'},
        {id:2,name:'Sardor Mirzayev',phone:'+998 93 777 88 99',orders:3,since:'2026-02'},
        {id:3,name:'Nodira Karimova',phone:'+998 94 444 55 66',orders:7,since:'2025-12'},
        {id:4,name:'Dilshod Rahimov',phone:'+998 91 222 33 44',orders:2,since:'2026-03'},
    ];
    const tabs = [{id:'active',t:'Faol',icon:'✅'},{id:'blocked',t:'Bloklangan',icon:'🚫'}];
    main().innerHTML = `<div class="page-container page-enter">
        <h2 style="margin-bottom:24px">Mijozlarni boshqarish</h2>
        <div class="tabs" style="margin-bottom:24px">
            ${tabs.map((t,i) => `<div class="tab ${i===0?'active':''}" onclick="window.showClientTab('${t.id}');this.parentElement.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));this.classList.add('active')">${t.icon} ${t.t}</div>`).join('')}
        </div>
        <div id="client-tab-content">${renderClientTab('active')}</div>
    </div>`;
});

function renderClientTab(tab) {
    if (tab === 'active') {
        const clients = AppData.activeClients || [];
        return `<div style="display:grid;gap:12px">${clients.map(c => `<div class="card" style="padding:16px;display:flex;align-items:center;gap:14px">
            <div class="avatar">${c.name.split(' ').map(w=>w[0]).join('')}</div>
            <div style="flex:1">
                <div style="font-weight:700">${c.name}</div>
                <div style="font-size:0.8125rem;color:var(--gray-500)">${c.phone}</div>
                <div style="font-size:0.75rem;color:var(--gray-400)">${c.orders} ta buyurtma - ${c.since} dan beri</div>
            </div>
            <span class="badge badge-success">Faol</span>
            <button class="btn btn-outline btn-sm" style="border-color:var(--danger-200);color:var(--danger-600)" onclick="window.adminBlockClient(${c.id},'${c.name}')">🚫 Bloklash</button>
        </div>`).join('')}</div>`;
    } else {
        const blocked = AppData.blockedClients || [];
        if (!blocked.length) return '<div style="text-align:center;padding:40px"><div style="font-size:3rem;margin-bottom:12px">👍</div><h3 style="color:var(--gray-700)">Bloklangan mijozlar yoq</h3></div>';
        return `<div style="display:grid;gap:12px">${blocked.map(c => `<div class="card" style="padding:16px;display:flex;align-items:center;gap:14px;opacity:0.7">
            <div class="avatar" style="background:var(--gray-300)">${c.name.split(' ').map(w=>w[0]).join('')}</div>
            <div style="flex:1"><div style="font-weight:700">${c.name}</div><div style="font-size:0.8125rem;color:var(--gray-500)">${c.phone}</div></div>
            <span class="badge badge-danger">Bloklangan</span>
            <button class="btn btn-outline btn-sm" onclick="window.adminUnblockClient(${c.id},'${c.name}')">Blokdan chiqarish</button>
        </div>`).join('')}</div>`;
    }
}
window.showClientTab = function(tab) {
    document.getElementById('client-tab-content').innerHTML = renderClientTab(tab);
};
window.adminBlockClient = function(id, name) {
    if (!AppData.blockedClients) AppData.blockedClients = [];
    const idx = AppData.activeClients.findIndex(c => c.id === id);
    if (idx > -1) {
        const c = AppData.activeClients.splice(idx, 1)[0];
        AppData.blockedClients.push(c);
        showToast(name + ' bloklandi', 'error');
        document.getElementById('client-tab-content').innerHTML = renderClientTab('active');
    }
};
window.adminUnblockClient = function(id, name) {
    const idx = AppData.blockedClients.findIndex(c => c.id === id);
    if (idx > -1) {
        const c = AppData.blockedClients.splice(idx, 1)[0];
        AppData.activeClients.push(c);
        showToast(name + ' blokdan chiqarildi', 'success');
        document.getElementById('client-tab-content').innerHTML = renderClientTab('blocked');
    }
};

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
