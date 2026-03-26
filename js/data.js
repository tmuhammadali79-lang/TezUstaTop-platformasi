/* ========================================
   TezUstaTop Platform — Data & Helpers
   ======================================== */
const AppData = {
    currentUser: null,
    currentRole: null,
    isLoggedIn: false,

    icons: {
        home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
        search: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
        orders: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
        chat: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
        profile: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
        wallet: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`,
        star: `<svg width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
        starEmpty: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E2E8F0" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
        location: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
        check: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
        x: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
        bell: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
        settings: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
        logout: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`,
        verified: `<svg width="16" height="16" viewBox="0 0 24 24" fill="#6366F1" stroke="white" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
        shield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
        trendUp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
        users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
        tool: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
        creditCard: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`,
        alertCircle: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
        eye: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
        menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
        dashboard: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
        clock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    },

    categories: [
        { id: 1, name: 'Santexnika', icon: '🔧', color: '#3B82F6', bgColor: '#EFF6FF', subServices: ['Kran ta\'mirlash','Truba almashtirish','Kanalizatsiya tozalash','Dush kabina o\'rnatish','Suvni isitgich ta\'mirlash'] },
        { id: 2, name: 'Elektrika', icon: '⚡', color: '#F59E0B', bgColor: '#FFFBEB', subServices: ['Rozetka o\'rnatish','Simlarni almashtirish','Avtomat o\'rnatish','Lyustra o\'rnatish','Elektr panelini ta\'mirlash'] },
        { id: 3, name: 'Konditsioner', icon: '❄️', color: '#06B6D4', bgColor: '#ECFEFF', subServices: ['Konditsioner o\'rnatish','Tozalash va texnik xizmat','Freon to\'ldirish','Ta\'mirlash'] },
        { id: 4, name: 'Uy ta\'miri', icon: '🏠', color: '#8B5CF6', bgColor: '#F5F3FF', subServices: ['Devor suvash','Bo\'yash','Laminat yotqizish','Plitka yopishtirish','Ship o\'rnatish'] },
        { id: 5, name: 'Mebel', icon: '🪑', color: '#EC4899', bgColor: '#FDF2F8', subServices: ['Mebel yig\'ish','Mebel ta\'mirlash','Ko\'chirish'] },
        { id: 6, name: 'Texnika', icon: '📱', color: '#10B981', bgColor: '#ECFDF5', subServices: ['Kir yuvish mashinasi','Muzlatgich ta\'mirlash','Televizor ta\'mirlash','Kompyuter ta\'mirlash'] },
        { id: 7, name: 'Tozalash', icon: '🧹', color: '#6366F1', bgColor: '#EEF2FF', subServices: ['Uy tozalash','Ofis tozalash','Oyna yuvish','Gilam tozalash'] },
        { id: 8, name: 'Boshqalar', icon: '🔨', color: '#64748B', bgColor: '#F8FAFC', subServices: ['Eshik o\'rnatish','Qulf almashtirish','Deraza o\'rnatish','Boshqa xizmatlar'] },
    ],

    masters: [
        { id: 1, name: 'Aziz Karimov', initials: 'AK', specialty: 'Santexnik', categoryId: 1, rating: 4.9, reviewCount: 156, completedJobs: 342, verified: true, online: true, district: 'Mirzo Ulug\'bek', distance: 1.2, bio: '10 yillik tajriba. Barcha turdagi santexnika ishlari.', price: '50 000' },
        { id: 2, name: 'Bobur Toshmatov', initials: 'BT', specialty: 'Elektrik', categoryId: 2, rating: 4.8, reviewCount: 98, completedJobs: 215, verified: true, online: true, district: 'Yunusobod', distance: 2.8, bio: 'Professional elektrik. Barcha turdagi elektr ishlari.', price: '60 000' },
        { id: 3, name: 'Sardor Aliyev', initials: 'SA', specialty: 'Konditsioner ustasi', categoryId: 3, rating: 4.7, reviewCount: 67, completedJobs: 189, verified: true, online: false, district: 'Chilonzor', distance: 3.5, bio: 'Konditsionerlar bo\'yicha mutaxassis.', price: '80 000' },
        { id: 4, name: 'Javohir Umarov', initials: 'JU', specialty: 'Uy ta\'miri', categoryId: 4, rating: 4.6, reviewCount: 45, completedJobs: 120, verified: false, online: true, district: 'Sergeli', distance: 5.1, bio: 'Evro ta\'mir ishlari. Dizayn va loyiha.', price: '70 000' },
        { id: 5, name: 'Rustam Qodirov', initials: 'RQ', specialty: 'Mebel ustasi', categoryId: 5, rating: 4.9, reviewCount: 203, completedJobs: 450, verified: true, online: true, district: 'Yakkasaroy', distance: 1.8, bio: 'Mebel yig\'ish va ta\'mirlash 15 yil tajriba.', price: '45 000' },
        { id: 6, name: 'Farhod Nurmatov', initials: 'FN', specialty: 'Texnika ustasi', categoryId: 6, rating: 4.5, reviewCount: 34, completedJobs: 87, verified: true, online: true, district: 'Bektemir', distance: 4.2, bio: 'Maishiy texnika ta\'mirlash.', price: '55 000' },
        { id: 7, name: 'Akmal Tursunov', initials: 'AT', specialty: 'Tozalash xizmati', categoryId: 7, rating: 4.8, reviewCount: 112, completedJobs: 280, verified: true, online: false, district: 'Uchtepa', distance: 3.0, bio: 'Professional tozalash xizmati.', price: '40 000' },
        { id: 8, name: 'Nodir Xolmatov', initials: 'NX', specialty: 'Umumiy usta', categoryId: 8, rating: 4.4, reviewCount: 28, completedJobs: 65, verified: true, online: true, district: 'Olmazor', distance: 2.5, bio: 'Eshik, deraza, qulf — barcha uy ishlari.', price: '35 000' },
    ],

    orders: [
        { id: 1001, clientId: 'u1', masterId: 1, categoryId: 1, service: 'Kran ta\'mirlash', description: 'Oshxonadagi kran oqyapti, tezda ta\'mirlash kerak.', status: 'active', price: 120000, address: 'Mirzo Ulug\'bek tumani', scheduledTime: 'Hozir', createdAt: '2026-03-16T08:30:00' },
        { id: 1002, clientId: 'u1', masterId: 2, categoryId: 2, service: 'Rozetka o\'rnatish', description: '3 ta yangi rozetka o\'rnatish kerak.', status: 'completed', price: 180000, address: 'Yunusobod tumani', scheduledTime: '14:00', createdAt: '2026-03-15T10:00:00', rating: 5 },
        { id: 1003, clientId: 'u2', masterId: null, categoryId: 3, service: 'Konditsioner tozalash', description: 'Samsung konditsionerni tozalash va freon tekshirish.', status: 'pending', price: null, address: 'Chilonzor tumani', scheduledTime: 'Ertaga 10:00', createdAt: '2026-03-16T09:00:00' },
        { id: 1004, clientId: 'u3', masterId: 5, categoryId: 5, service: 'Mebel yig\'ish', description: 'Yangi oshxona mebelini yig\'ish kerak.', status: 'completed', price: 250000, address: 'Yakkasaroy tumani', scheduledTime: '09:00', createdAt: '2026-03-14T07:00:00', rating: 5 },
        { id: 1005, clientId: 'u3', masterId: 8, categoryId: 8, service: 'Eshik o\'rnatish', description: 'Yangi kirish eshigini o\'rnatish.', status: 'cancelled', price: 350000, address: 'Shayxontohur tumani', scheduledTime: '11:00', createdAt: '2026-03-13T08:00:00' },
    ],

    transactions: [
        { id: 1, orderId: 1002, masterId: 2, masterName: 'Bobur Toshmatov', service: 'Rozetka o\'rnatish', amount: 162000, commission: 18000, total: 180000, status: 'completed', type: 'payout', date: '2026-03-15' },
        { id: 2, orderId: 1001, masterId: 1, masterName: 'Aziz Karimov', service: 'Kran ta\'mirlash', amount: 108000, commission: 12000, total: 120000, status: 'held', type: 'hold', date: '2026-03-16' },
        { id: 3, orderId: 1004, masterId: 5, masterName: 'Rustam Qodirov', service: 'Mebel yig\'ish', amount: 225000, commission: 25000, total: 250000, status: 'completed', type: 'payout', date: '2026-03-14' },
        { id: 4, orderId: 1005, masterId: 8, masterName: 'Nodir Xolmatov', service: 'Eshik o\'rnatish', amount: 315000, commission: 35000, total: 350000, status: 'completed', type: 'refund', date: '2026-03-13' },
        { id: 5, orderId: 1003, masterId: null, masterName: '—', service: 'Konditsioner tozalash', amount: 135000, commission: 15000, total: 150000, status: 'held', type: 'hold', date: '2026-03-16' },
    ],

    walletTransactions: [
        { id: 1, type: 'income', title: 'Rozetka o\'rnatish', amount: 162000, date: '2026-03-15 15:30' },
        { id: 2, type: 'income', title: 'Kran ta\'mirlash', amount: 108000, date: '2026-03-14 12:00' },
        { id: 3, type: 'withdrawal', title: 'Kartaga yechish', amount: -200000, date: '2026-03-13 18:00' },
        { id: 4, type: 'income', title: 'Truba almashtirish', amount: 250000, date: '2026-03-12 14:00' },
    ],

    pendingVerifications: [
        { id: 1, name: 'Kamol Yusupov', specialty: 'Elektrik', phone: '+998901112233', district: 'Shayxontohur', appliedDate: '2026-03-14', status: 'pending', bio: '5 yillik tajriba.' },
        { id: 2, name: 'Otabek Mirzayev', specialty: 'Santexnik', phone: '+998937778899', district: 'Olmazor', appliedDate: '2026-03-15', status: 'pending', bio: '3 yillik tajriba.' },
        { id: 3, name: 'Sherzod Abdullayev', specialty: 'Konditsioner', phone: '+998944445566', district: 'Yunusobod', appliedDate: '2026-03-16', status: 'pending', bio: 'Samsung va LG sertifikati mavjud.' },
    ],

    disputes: [
        { id: 1, orderId: 1005, clientName: 'Dilshod Rahimov', masterName: 'Anvar Toshpo\'latov', reason: 'Usta ishni tugatmay ketdi.', amount: 150000, status: 'open', date: '2026-03-15' },
        { id: 2, orderId: 1006, clientName: 'Nodira Karimova', masterName: 'Bobur Toshmatov', reason: 'Narx kelishilganidan ko\'p so\'radi.', amount: 200000, status: 'open', date: '2026-03-14' },
        { id: 3, orderId: 1007, clientName: 'Sarvar Umarov', masterName: 'Farhod Nurmatov', reason: 'Ish sifati pastligi.', amount: 180000, status: 'resolved', resolvedDate: '2026-03-14', resolution: 'Pulning 50% mijozga qaytarildi', date: '2026-03-12' },
    ],

    adminStats: {
        totalOrders: 1247, totalRevenue: 45600000, activeMasters: 89, commission: 4560000,
        totalClients: 2340, avgRating: 4.7, pendingOrders: 23, activeOrders: 45,
    },

    notifications: [
        { id: 1, type: 'order', title: 'Yangi buyurtma', message: 'Santexnika xizmati - Kran ta\'mirlash', time: '5 daqiqa oldin', read: false },
        { id: 2, type: 'payment', title: 'To\'lov qabul qilindi', message: '162 000 so\'m hisobingizga tushdi', time: '1 soat oldin', read: false },
        { id: 3, type: 'review', title: 'Yangi baho', message: 'Aziz Karimov sizga 5 yulduz berdi', time: '3 soat oldin', read: true },
    ],
};

function formatPrice(price) {
    if (!price && price !== 0) return 'Kelishiladi';
    return Math.abs(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' so\'m';
}
function getStatusText(s) {
    const m = { pending:'Kutilmoqda', accepted:'Qabul qilindi', active:'Jarayonda', in_progress:'Jarayonda', completed:'Bajarildi', cancelled:'Bekor qilindi', held:'Muzlatilgan', hold:'Muzlatilgan', open:'Ochiq', resolved:'Hal qilindi', approved:'Tasdiqlangan', rejected:'Rad etilgan', payout:'To\'langan', refund:'Qaytarilgan' };
    return m[s] || s;
}
function getStatusClass(s) {
    const m = { pending:'warning', accepted:'primary', active:'accent', in_progress:'accent', completed:'success', cancelled:'danger', held:'warning', hold:'warning', open:'danger', resolved:'success', approved:'success', rejected:'danger', payout:'success', refund:'primary' };
    return m[s] || 'gray';
}
function generateStars(rating) {
    let h = '';
    for (let i = 1; i <= 5; i++) {
        h += i <= Math.floor(rating)
            ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24" stroke="#FBBF24" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
            : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E2E8F0" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }
    return h;
}
