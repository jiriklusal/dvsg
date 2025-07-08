# Google Drive Integrace

## Popis
Sekce "Dokumenty" na webu odkazuje na Google Drive, kde jsou uloženy dokumenty pro členy družstva.

## Nastavení Google Drive

### 1. Vytvoření struktury složek
```
DVSG Dokumenty/
├── 📁 Právní dokumenty/
│   ├── Stanovy družstva.pdf
│   ├── Garážní řád.pdf
│   └── Vnitřní předpisy.pdf
├── 📁 Finanční dokumenty/
│   ├── 📁 2024/
│   ├── 📁 2023/
│   └── 📁 Archiv/
├── 📁 Schůze a jednání/
│   ├── 📁 2024/
│   ├── 📁 2023/
│   └── 📁 Archiv/
├── 📁 Technické dokumenty/
│   ├── Plány garáží.pdf
│   ├── Revizní zprávy.pdf
│   └── Dokumentace oprav.pdf
└── 📁 Pro členy/
    ├── 📁 Člen 001/
    ├── 📁 Člen 002/
    └── ...
```

### 2. Nastavení oprávnění

#### Hlavní složka DVSG Dokumenty:
- **Správce**: Úplný přístup pro předsednictvo
- **Čtenář**: Základní přístup pro všechny členy

#### Složka Pro členy:
- **Individuální přístup**: Každý člen má přístup pouze ke své složce
- **Číslování**: Složky pojmenované podle čísla člena nebo garážového stání

### 3. Konfigurace odkazu na webu

V souboru `index.html` najděte řádek:
```html
<a href="https://drive.google.com/drive/folders/your-folder-id" class="btn btn-primary btn-lg" target="_blank">
```

Nahraďte `your-folder-id` za skutečné ID složky z Google Drive.

## Jak získat ID složky Google Drive

1. Otevřete složku v Google Drive
2. Zkopírujte URL adresu
3. ID složky je část za `folders/`

Příklad:
```
https://drive.google.com/drive/folders/1ABCdef123GHijkl456MNopqr789STuvwx
```
ID složky: `1ABCdef123GHijkl456MNopqr789STuvwx`

## Bezpečnostní doporučení

### Přístupová práva
- Nepoužívejte "Kdokoliv s odkazem"
- Přidávejte členy individuálně podle emailových adres
- Pravidelně kontrolujte a aktualizujte oprávnění

### Organizace dokumentů
- Používejte popisné názvy souborů
- Přidávejte datum do názvu (YYYY-MM-DD)
- Archivujte staré dokumenty

### Zálohování
- Pravidelně zálohujte důležité dokumenty
- Udržujte kopie na více místech
- Dokumentujte změny ve verzích

## Automatizace

### Google Apps Script
Pro pokročilejší funkcionalitu můžete použít Google Apps Script:

```javascript
// Příklad: Automatické přidání nového člena
function addNewMember(memberNumber, email) {
  const folderId = 'your-main-folder-id';
  const folder = DriveApp.getFolderById(folderId);
  
  // Vytvoř složku pro nového člena
  const memberFolder = folder.createFolder(`Člen ${memberNumber}`);
  
  // Přidej oprávnění
  memberFolder.addEditor(email);
  
  // Přidej základní dokumenty
  const templateFile = DriveApp.getFileById('template-file-id');
  templateFile.makeCopy(`Smlouva - Člen ${memberNumber}`, memberFolder);
}
```

### Integrace s webem
Pro pokročilejší integraci můžete použít Google Drive API:

```javascript
// Příklad: Načtení seznamu dokumentů
async function loadDocuments() {
  const response = await fetch('https://www.googleapis.com/drive/v3/files?q=parents+in+\'folder-id\'&key=YOUR_API_KEY');
  const data = await response.json();
  return data.files;
}
```

## Údržba

### Pravidelné úkoly
- Kontrola přístupových práv (měsíčně)
- Archivace starých dokumentů (čtvrtletně)
- Zálohování důležitých dat (týdně)
- Kontrola sdílených odkazů (půlročně)

### Roční úkoly
- Aktualizace struktury složek
- Vyčištění nepoužívaných dokumentů
- Aktualizace oprávnění podle změn v členství
- Audit bezpečnosti

## Podpora

Pro technickou podporu s Google Drive:
- **Google Workspace podpora**: https://support.google.com/a
- **Lokální IT podpora**: info@dvsg.cz
- **Dokumentace**: https://developers.google.com/drive

## Záložní řešení

V případě problémů s Google Drive:
1. Dokumenty jsou dostupné také fyzicky v kanceláři
2. Důležité dokumenty mají záložní kopie
3. Kontaktujte správce pro alternativní přístup

---

**Poznámka**: Tato integrace vyžaduje Google Workspace účet nebo osobní Google účet s dostatečným úložištěm.
