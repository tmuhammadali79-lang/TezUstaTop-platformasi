# 🔧 TezUstaTop — Ishonchli Ustalar Platformasi

O'zbekistondagi eng yaxshi ustalarni toping. Santexnik, elektrik, konditsioner va boshqa xizmatlar bir joyda.

![TezUstaTop Landing Page](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📋 Loyiha haqida

**TezUstaTop** — bu O'zbekiston bo'ylab professional ustalarni topish va xizmat buyurtma qilish uchun veb-platforma. Platforma 3 ta foydalanuvchi turi uchun mo'ljallangan:

- **👤 Mijoz** — Usta toping, xizmat buyurtma qiling va jarayonni kuzating
- **🔧 Usta** — Buyurtmalar qabul qilib, daromad oling, hamyoningizni boshqaring
- **🛡️ Admin** — Tizimni boshqaring, ustalarni tasdiqlang, tranzaksiyalarni nazorat qiling

## ✨ Xususiyatlar

- 🎨 Premium dizayn — gradient ranglar, glassmorphism, micro-animatsiyalar
- 📱 Responsive — desktop, tablet va mobil qurilmalarda ishlaydi
- ⚡ SPA (Single Page Application) — tezkor sahifa o'tishlari
- 🔐 3 rol — Mijoz, Usta, Admin panellari
- 📊 Admin dashboard — statistika, tranzaksiyalar, nizolar
- 💰 Usta hamyoni — daromad kuzatish, yechish tarixi
- 🔔 Bildirishnomalar tizimi (toast notifications)

## 🚀 Ishga tushirish

### 1-usul: Python bilan
```bash
cd TezUstaTop-platformasi
python -m http.server 8080
```
Brauzerda oching: `http://localhost:8080`

### 2-usul: Node.js bilan
```bash
npx -y serve . -l 8080
```

### 3-usul: Live Server (VS Code)
VS Code'da `index.html` faylini ochib, **Live Server** extension bilan ishga tushiring.

## 📁 Loyiha tuzilishi

```
TezUstaTop-platformasi/
├── index.html          # Asosiy HTML fayl
├── css/
│   └── styles.css      # Barcha stillar (design system, components, pages)
├── js/
│   ├── data.js         # Mock ma'lumotlar va helper funksiyalar
│   ├── router.js       # SPA router (hash-based)
│   └── app.js          # Asosiy ilova — barcha sahifalar va logika
└── README.md           # Shu fayl
```

## 🎨 Dizayn tizimi

| Element | Qiymat |
|---------|--------|
| Asosiy rang | `#6366F1` (Indigo) |
| Accent rang | `#14B8A6` (Teal) |
| Shrift (sarlavha) | Outfit |
| Shrift (matn) | Inter |
| Border radius | 8px — 24px |
| Gradient | 135deg, #6366F1 → #8B5CF6 → #A78BFA |

## 📸 Sahifalar

| Sahifa | Tavsif |
|--------|--------|
| Landing Page | Hero section, xizmatlar, ustalar, CTA |
| Rol tanlash | Mijoz / Usta / Admin |
| Mijoz paneli | Buyurtmalar, xizmatlar, ustalar ro'yxati |
| Usta paneli | Yangi buyurtmalar, faol ishlar, hamyon |
| Admin paneli | Statistika, tasdiqlash, tranzaksiyalar, nizolar |

## 🛠 Texnologiyalar

- **HTML5** — semantik tuzilma
- **CSS3** — custom properties, flexbox, grid, animations
- **Vanilla JavaScript** — framework'siz, toza JS
- **Google Fonts** — Inter, Outfit

## 📄 Litsenziya

MIT License

## 👤 Muallif

TezUstaTop jamoasi — O'zbekiston 🇺🇿
