# Data Structure Documentation

Tento adresář obsahuje JSON soubory s obsahem pro všechny stránky webu. Obsah je oddělen od HTML kódu pro snadnou editaci.

## Struktura souborů:

### `content.json`
Hlavní obsah webu včetně:
- Informace o společnosti
- Navigace
- Hero sekce
- O nás sekce
- Služby
- Historie
- Dokumenty a právní informace
- Kontakt
- Footer

### `gdpr-content.json`
Obsah stránky "Ochrana osobních údajů":
- Informace o správci údajů
- Účel zpracování
- Právní základ
- Kategorie údajů
- Doba uchovávání
- Práva subjektů údajů
- Kontaktní informace

### `legal-info-content.json`
Obsah stránky "Právní informace":
- Identifikační údaje družstva
- Kontaktní údaje
- Předmět činnosti
- Právní předpisy
- Veřejně dostupné dokumenty
- Informace pro členy

### `terms-content.json`
Obsah stránky "Podmínky užívání webu":
- Obecná ustanovení
- Provozovatel webu
- Účel webu
- Pravidla užívání
- Odpovědnost
- Ochrana osobních údajů
- Cookies
- Změny podmínek
- Kontakt
- Platnost

### `additional-info.json`
Doplňkové informace a metadata pro web.

## Editace obsahu:

1. **Pro změnu textu** - editujte příslušný JSON soubor
2. **Pro přidání nové sekce** - přidejte nový objekt do příslušného JSON
3. **Pro přidání nové stránky** - vytvořte nový JSON soubor podle vzoru

## Formát JSON:

```json
{
  "page": {
    "title": "Název stránky",
    "subtitle": "Podtitul"
  },
  "sections": {
    "section_name": {
      "title": "Název sekce",
      "content": "Obsah sekce"
    }
  }
}
```

## Poznámky:

- Všechny texty jsou v češtině
- Datum platnosti: 8. července 2025
- Kontaktní údaje jsou konzistentní napříč všemi soubory
- JSON soubory jsou validní a správně strukturované
