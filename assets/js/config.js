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

  // --- Hero istatistik kutuları ---
  // v: 'auto:...' yazarsanız değer katalogdan otomatik hesaplanır.
  // auto:uretici = kayıtlı üretici sayısı, auto:urun = ürün sayısı,
  // auto:sehir = şehir sayısı, auto:sektor = kategori sayısı
  stats: [
    { v: 'auto:uretici', l: 'Kayıtlı üretici' },
    { v: 'auto:urun',    l: 'Listelenen ürün' },
    { v: 'auto:sektor',  l: 'Sektör' },
    { v: '36 sa',        l: 'Hedeflenen teklif dönüşü' }
  ],

  // --- Tedarikçi başvuru formu ---
  // Statik sitede form verisini saklayacak sunucu yoktur. Başvuruların size
  // ulaşması için ücretsiz bir form servisi adresi girin (kurulum: README).
  // Boş bırakılırsa form, hazır bir e-posta taslağı açar.
  formEndpoint: '',                       // örn. 'https://formspree.io/f/xxxxxxx'
  basvuruEposta: 'basvuru@han.com.tr',    // endpoint boşken kullanılacak e-posta

  // --- Renk kimliği ---
  colors: {
    primary: '#123F63',   // ana kurumsal mavi (logo, başlıklar, butonlar)
    accent:  '#0E9C9C',   // turkuaz vurgu
    price:   '#C0392B'    // fiyat ve birincil eylem rengi
  }
};
