# Nasazení a hosting

## Doporučené hostingové služby

### 1. Netlify (Doporučeno)
- **Výhody**: Zdarma, automatické nasazení, HTTPS, CDN
- **Postup**:
  1. Registrace na netlify.com
  2. Připojení GitHub repository
  3. Automatické nasazení při push

### 2. Vercel
- **Výhody**: Rychlé, optimalizované pro statické stránky
- **Postup**:
  1. Registrace na vercel.com
  2. Import z GitHub
  3. Automatické nasazení

### 3. GitHub Pages
- **Výhody**: Zdarma, jednoduché nastavení
- **Postup**:
  1. Nahrajte kód na GitHub
  2. Nastavení > Pages > Source: Deploy from branch
  3. Vyberte main branch

### 4. Webzdarma.cz
- **Výhody**: Český hosting, zdarma
- **Nevýhody**: Reklamy, omezená funkcionalita
- **Postup**: Upload přes FTP

## Předprodukční checklist

### Před nasazením zkontrolujte:
- [ ] Všechny obrázky jsou optimalizované
- [ ] Google Drive link je správně nastaven
- [ ] Kontaktní informace jsou aktuální
- [ ] Formulář je funkční
- [ ] Stránky fungují na všech zařízeních
- [ ] SEO meta tagy jsou vyplněné
- [ ] Favicon je na místě
- [ ] Odkazy na privacy a terms fungují

### Performance optimalizace:
- [ ] Komprese obrázků
- [ ] Minifikace CSS/JS
- [ ] Gzip komprese
- [ ] CDN pro assets

## Monitoring a analytics

### Google Analytics
```html
<!-- Přidejte do <head> sekce -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console
1. Přidejte web do Search Console
2. Potvrďte vlastnictví
3. Odešlete sitemap.xml

## Bezpečnost

### HTTPS
- Většina moderních hostingů poskytuje HTTPS zdarma
- Ujistěte se, že je povoleno přesměrování z HTTP na HTTPS

### Cookies
- Implementujte cookie consent banner
- Dokumentujte používané cookies

### Formuláře
- Implementujte captcha proti spamu
- Validujte všechny inputy
- Chraňte proti XSS útokům

## Zálohování

### Automatické zálohy
- Použijte Git pro verzování
- Nastavte automatické backup na cloudu
- Dokumentujte postupy obnovy

### Manuální zálohy
- Pravidelně exportujte databázi (pokud používáte)
- Zálohujte uploaded soubory
- Testujte postupy obnovení

## Monitoring a údržba

### Uptime monitoring
- Doporučené služby: UptimeRobot, Pingdom
- Nastavte alerting při výpadku

### Pravidelné úkoly
- Kontrola funkčnosti (týdně)
- Aktualizace obsahu (dle potřeby)
- Kontrola logů (měsíčně)
- Bezpečnostní audit (čtvrtletně)

## Domény a DNS

### Doména
- Doporučujeme českou doménu (.cz)
- Alternativně .com pro mezinárodní dosah

### DNS nastavení
```
Typ    Název    Hodnota
A      @        IP_adresa_serveru
CNAME  www      domain.com
TXT    @        "v=spf1 include:_spf.google.com ~all"
```

## Kontaktní formulář

### Backend řešení
1. **Formspree** (doporučeno pro jednoduchost)
2. **Netlify Forms** (pokud používáte Netlify)
3. **EmailJS** (clientside řešení)
4. **Vlastní backend** (PHP, Node.js)

### Příklad implementace s Formspree:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
  <!-- vaše formulářové prvky -->
</form>
```

## Troubleshooting

### Časté problémy:
- **Obrázky se nenačítají**: Zkontrolujte cesty k souborům
- **Fonty nefungují**: Zkontrolujte CORS nastavení
- **Formulář neposílá**: Zkontrolujte action URL
- **Stránka se pomalu načítá**: Optimalizujte obrázky

### Logy a debugging:
- Použijte Developer Tools v prohlížeči
- Zkontrolujte Network tab pro chyby
- Kontrolujte Console pro JavaScript chyby

## Podpora

Pro technickou podporu:
- **GitHub Issues**: Pro bug reporty
- **Email**: info@dvsg.cz
- **Telefon**: +420 776 230 108

---

**Poznámka**: Před nasazením do produkce doporučujeme otestovat na staging prostředí.
