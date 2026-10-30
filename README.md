# Vodovod Novak – demo spletna stran

Statična demo stran (HTML + CSS + vanilla JS) za izmišljeno vodoinštalatersko podjetje.
Vsi podatki (telefon, e-pošta, naslov, cene, mnenja) so izmišljeni primeri.

## Uporaba
Naložite vsebino mape na katerokoli gostovanje (ali odprite `index.html` v brskalniku). Build korak ni potreben.

## Pred objavo za pravo stranko
- Zamenjajte ime, telefon (`tel:+38641000000`), e-pošto, naslov in JSON-LD podatke v `index.html`.
- Odstranite `<meta name="robots" content="noindex, nofollow">` in demo pasico (`.demo-bar`).
- Ilustracije v `images/` (lastne SVG, brez licenčnih omejitev) zamenjajte s fotografijami resničnih projektov.
- Zemljevid: element `.map` zamenjajte z Google Maps `<iframe>`.
- Obrazec deluje samo na strani brskalnika. Za pošiljanje ga povežite z zaledjem ali npr. Formspree
  (glej komentar `TODO` v `js/main.js`).
