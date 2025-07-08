# DVSG Ostrava-Poruba - Webové stránky

Moderní responsivní webové stránky pro Družstvo pro výstavbu a správu garáží Ostrava-Poruba.

## 📋 Obsah

- [Funkce](#funkce)
- [Technologie](#technologie)
- [Struktura projektu](#struktura-projektu)
- [Instalace](#instalace)
- [Použití](#použití)
- [Konfigurace](#konfigurace)
- [Editace obsahu](#editace-obsahu)
- [Nasazení](#nasazení)

## ✨ Funkce

### Základní funkce
- **Responsivní design** - funguje na všech zařízeních
- **Světlý/tmavý režim** - automatické přepínání témat
- **Moderní UI/UX** - čistý a profesionální vzhled
- **SEO optimalizace** - pro lepší viditelnost ve vyhledávačích
- **Přístupnost** - splňuje standardy pro handicapované uživatele

### Sekce webu
- **Domovská stránka** - úvodní informace a představení
- **O nás** - informace o družstvu
- **Služby** - přehled poskytovaných služeb
- **Historie** - časová osa vývoje družstva
- **Galerie** - fotografie garáží a zařízení
- **Dokumenty** - propojení s Google Drive
- **Kontakt** - kontaktní informace a formulář

### Právní požadavky
- **GDPR compliance** - ochrana osobních údajů
- **Podmínky užívání** - právní rámec
- **Cookies** - správa cookies
- **Přístupnost** - soulad s legislativou

## 🛠 Technologie

- **HTML5** - struktura stránek
- **CSS3** - styly a animace
- **JavaScript (ES6+)** - interaktivita
- **Bootstrap 5** - responzivní framework
- **Bootstrap Icons** - ikony
- **JSON** - data a konfigurace

## 📁 Struktura projektu

```
dvsg/
├── index.html              # Hlavní stránka
├── privacy.html            # Ochrana osobních údajů
├── terms.html              # Podmínky užívání
├── assets/
│   ├── css/
│   │   └── style.css       # Vlastní styly
│   ├── js/
│   │   └── script.js       # JavaScript funkcionalita
│   └── images/             # Obrázky (placeholder)
│       └── README.md       # Instrukce pro obrázky
├── data/
│   └── content.json        # Editovatelný obsah
├── README.md               # Tento soubor
└── LICENSE                 # Licence
```

## 🚀 Instalace

1. **Stáhněte nebo naklonujte projekt**
   ```bash
   git clone https://github.com/your-username/dvsg-website.git
   cd dvsg-website
   ```

2. **Otevřete v editoru**
   - Doporučujeme VS Code nebo jiný moderní editor

3. **Spusťte lokální server**
   - Použijte Live Server extension ve VS Code
   - Nebo Python: `python -m http.server 8000`
   - Nebo Node.js: `npx serve`

## 💻 Použití

### Lokální vývoj
1. Otevřete `index.html` ve webovém prohlížeči
2. Pro vývoj použijte lokální server kvůli CORS omezením
3. Všechny změny se projeví ihned po obnovení stránky

### Přepínání témat
- Kliknutím na ikonu slunce/měsíce v pravém horním rohu
- Nastavení se automaticky uloží do localStorage

### Formulář
- Kontaktní formulář je připraven pro napojení na backend
- Aktuálně zobrazuje pouze potvrzovací zprávu

## ⚙️ Konfigurace

### Editace obsahu
Většina textů je uložena v `data/content.json`:

```json
{
  "company": {
    "name": "Název družstva",
    "address": "Adresa",
    "email": "email@example.com"
  },
  "hero": {
    "title": "Hlavní nadpis",
    "subtitle": "Podnadpis"
  }
}
```

### Konfigurace Google Drive
V `index.html` změňte URL na řádku:
```html
<a href="https://drive.google.com/drive/folders/YOUR-FOLDER-ID">
```

### Barvy a styly
V `assets/css/style.css` upravte CSS proměnné:
```css
:root {
  --primary-color: #0d6efd;
  --garage-primary: #1a365d;
  --garage-accent: #ed8936;
}
```

## 📝 Editace obsahu

### Pro netechnické uživatele
1. **Texty**: Upravte soubor `data/content.json`
2. **Obrázky**: Nahraďte soubory ve složce `assets/images/`
3. **Kontakty**: Změňte údaje v `data/content.json`

### Pro technické uživatele
1. **HTML**: Upravte strukturu v `index.html`
2. **CSS**: Změňte styly v `assets/css/style.css`
3. **JavaScript**: Upravte funkcionalitu v `assets/js/script.js`

## 🎨 Přizpůsobení

### Změna barev
```css
:root {
  --primary-color: #your-color;
  --garage-primary: #your-color;
  --garage-accent: #your-color;
}
```

### Přidání nových sekcí
1. Přidejte HTML strukturu
2. Vytvořte CSS styly
3. Aktualizujte navigaci
4. Přidejte JavaScript funcionalitu

### Změna fontů
```css
body {
  font-family: 'Your Font', sans-serif;
}
```

## 📱 Responsivní design

Stránky jsou optimalizovány pro:
- **Desktop** - 1200px+
- **Tablet** - 768px-1199px
- **Mobile** - 320px-767px

## 🔧 Údržba

### Pravidelné úkoly
- Aktualizace obsahu v `data/content.json`
- Výměna obrázků v galerii
- Kontrola funkčnosti formuláře
- Aktualizace dokumentů

### Aktualizace knihoven
- Bootstrap - kontrola nových verzí
- Bootstrap Icons - nové ikony
- Bezpečnostní aktualizace

## 🚀 Nasazení

### GitHub Pages
1. Nahrajte na GitHub
2. Povolte GitHub Pages
3. Vyberte branch `main`

### FTP hosting
1. Nahrajte všechny soubory na server
2. Ujistěte se, že `index.html` je v root složce
3. Otestujte funkčnost

### Cloudflare Pages
1. Připojte GitHub repository
2. Nastavte build command: `none`
3. Nastavte output directory: `/`

## 🔍 SEO optimalizace

### Meta tagy
- Aktualizujte title a description
- Přidejte Open Graph tagy
- Nastavte canonical URL

### Structured data
- Implementujte JSON-LD
- Přidejte Organization schema
- Přidejte LocalBusiness schema

## 📧 Kontakt

Pro technickou podporu a dotazy:
- **Email**: info@dvsg.cz
- **Telefon**: +420 776 230 108

## 📄 Licence

Tento projekt je licencován pod MIT licencí. Více informací v souboru `LICENSE`.

---

**Vytvořeno s ❤️ pro Družstvo pro výstavbu a správu garáží Ostrava-Poruba**