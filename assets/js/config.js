/* ---------------------------------------------------------------
   SİTE AYARLARI
   Marka adı, slogan, hero metni, renkler ve istatistikler burada.
   Marka adı: HAN. Değiştirmek isterseniz sadece SITE.name satırı yeter;
   logo, sekme başlığı ve footer otomatik güncellenir.
--------------------------------------------------------------- */

const SITE = {
  // --- Marka ---
  name: 'HAN',                       // marka adı
  tagline: 'Tedarik Ağı',
  metaTitle: 'Doğrulanmış Türk üreticilerden toptan tedarik',
  footerNote: 'örnek demo sitesi',

  // --- Hero (ana sayfa üst bölüm) ---
  heroTitle: 'Türk üreticisinden<br>doğrudan tedarik.<br><em>Aracısız, MOQ net.</em>',
  heroLede: "Bursa'nın örme tesisinden Gaziantep'in halı fabrikasına, Denizli havlusundan Kayseri mobilyasına — tek bir teklif talebiyle onlarca doğrulanmış üreticiye ulaşın.",

  // --- Hero istatistik kutuları (ilk kutu vurgulu renkte) ---
  stats: [
    { v: '14.280', l: 'Kayıtlı üretici' },
    { v: '%68',    l: 'Yerinde denetimli' },
    { v: '36 sa',  l: 'Ortalama teklif dönüşü' },
    { v: '112',    l: 'İhracat yapılan ülke' }
  ],

  // --- Renk kimliği ---
  colors: {
    primary: '#123F63',   // ana kurumsal mavi (logo, başlıklar, butonlar)
    accent:  '#0E9C9C',   // turkuaz vurgu
    price:   '#C0392B'    // fiyat ve birincil eylem rengi
  }
};
