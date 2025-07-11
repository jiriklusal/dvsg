# CLOUDFLARE NASTAVENÍ PRO DVSG.CZ

## 🚀 KROK ZA KROKEM NÁVOD

### 1. REGISTRACE CLOUDFLARE
- Jděte na: https://www.cloudflare.com
- Klikněte "Sign Up"
- Zaregistrujte se s emailem
- Ověřte email

### 2. PŘIDÁNÍ DOMÉNY
- Po přihlášení: "Add a Site"
- Zadejte: **dvsg.cz**
- Vyberte: **Free plán** (0 USD)
- Pokračujte

### 3. DNS ZÁZNAMY
V Cloudflare nastavte tyto DNS záznamy:

| Typ   | Název | Hodnota        | Proxy Status |
|-------|-------|----------------|--------------|
| A     | @     | 93.91.240.107  | 🟠 Proxied   |
| CNAME | www   | dvsg.cz        | 🟠 Proxied   |

**DŮLEŽITÉ:** Ujistěte se, že je **Proxy Status** nastaveno na **🟠 Proxied** (oranžová ikona)

### 4. ZMĚNA DNS SERVERŮ
Cloudflare vám poskytne nové DNS servery, například:
```
ada.ns.cloudflare.com
carter.ns.cloudflare.com
```

**MUSÍTE JE NASTAVIT U VAŠEHO DOMAIN REGISTRÁTORA!**

#### Kde nastavit DNS servery:
- **Forpsi**: Panel → Domény → dvsg.cz → DNS servery
- **Wedos**: Administrace → Domény → dvsg.cz → DNS
- **ActiveDNS**: Závisí na registrátorovi

### 5. SSL NASTAVENÍ
1. V Cloudflare: **SSL/TLS**
2. **SSL/TLS encryption mode**: **"Flexible"**
3. Aktivujte: **"Always Use HTTPS"**

### 6. ČEKÁNÍ NA AKTIVACI
- DNS změny: **24-48 hodin**
- SSL aktivace: **15 minut - 2 hodiny**

## ✅ KONTROLA FUNKČNOSTI

Po aktivaci zkontrolujte:
- **http://dvsg.cz** → automaticky přesměruje na **https://dvsg.cz**
- **http://www.dvsg.cz** → automaticky přesměruje na **https://www.dvsg.cz**
- V prohlížeči se zobrazí 🔒 zámek
- Žádná varování o zabezpečení

## 🎯 VÝSLEDEK
- ✅ SSL certifikát ZDARMA
- ✅ Rychlejší web (CDN)
- ✅ Ochrana před útoky
- ✅ Žádná varování v Google Chrome

## 📞 POMOC
Pokud potřebujete pomoc, kontaktujte:
- Email: info@dvsg.cz
- Telefon: 776 230 108

---
**Vytvořeno:** Červenec 2025  
**Pro:** DVSG Ostrava-Poruba
