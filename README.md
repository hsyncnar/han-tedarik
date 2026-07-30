# Türk Tedarikçili B2B Pazaryeri — Ön Yüz Prototipi

Türkiye'de üretim yapan firmaları yurt dışı ve yurt içi toptan alıcılarla buluşturan B2B tedarik pazaryerinin çalışan ön yüz prototipi. Kurulum gerektirmez, tarayıcıda çalışır.

> **Durum:** Prototip. Veriler `assets/js/data.js` içinde sabittir, formlar sunucuya veri göndermez. Backend eklenene kadar demo amaçlıdır.

---

## Canlıya alma (GitHub Pages)

1. GitHub'da yeni bir repo aç (örn. `tedarik-pazaryeri`), **Public** seç.
2. Bu klasördeki dosyaları repoya yükle.
3. Repo → **Settings** → **Pages** → Source: `Deploy from a branch`, Branch: `main` / `(root)` → Save.
4. 1–2 dakika içinde adres yayına girer:
   `https://KULLANICI-ADIN.github.io/tedarik-pazaryeri/`

Terminalden yüklemek isterseniz:

```bash
cd tedarik-pazaryeri
git init
git add .
git commit -m "İlk sürüm: katalog, filtreler ve RFQ akışı"
git branch -M main
git remote add origin https://github.com/KULLANICI-ADIN/tedarik-pazaryeri.git
git push -u origin main
```

Sonraki her `git push` sonrası site otomatik güncellenir.

---

## Yerelde çalıştırma

`index.html` dosyasına çift tıklamak yeterli. Tarayıcı önbelleği sorun çıkarırsa basit bir sunucu ile açın:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

---

## Dosya yapısı

```
tedarik-pazaryeri/
├── index.html              Sayfa iskeleti — bölümler, formlar, statik metinler
├── admin.html              Yönetim paneli — onaylanan tedarikçiyi katalog koduna çevirir
├── assets/
│   ├── css/styles.css      Tüm görsel tasarım. Renkler en üstteki :root bloğunda
│   └── js/
│       ├── config.js       Marka adı, hero metni, istatistikler, renkler
│       ├── data.js         Kategoriler (CATS) ve ürün kataloğu (P — başlangıçta boş)
│       └── app.js          Filtre, arama, ürün detayı, teklif sepeti mantığı
└── docs/                   Notlar ve planlama dosyaları
```

**Neyi nerede değiştirirsiniz:**

| Ne yapmak istiyorsunuz | Hangi dosya |
|---|---|
| Marka adını, sloganı, hero başlığını değiştirmek | `assets/js/config.js` |
| Renk kimliğini değiştirmek | `config.js` içindeki `colors`, detaylı ayar için `styles.css` → `:root` |
| Ürün eklemek / çıkarmak | `assets/js/data.js` → `P` dizisi |
| Yeni sektör kategorisi eklemek | `assets/js/data.js` → `CATS` dizisi |
| Menü, footer, tedarikçi kayıt formu metinleri | `index.html` |
| Filtre veya sıralama mantığı | `assets/js/app.js` → `render()` |

### Ürün ekleme örneği

`data.js` içindeki `P` dizisine yeni bir satır ekleyin. `c` alanı `CATS` içindeki bir `id` ile eşleşmelidir:

```js
{id:29, n:'Ürün adı · kısa teknik özet', c:'tekstil',
 lo:2.40, hi:3.80, u:'adet', moq:500,
 sup:'Üretici firma', city:'Bursa',
 ver:1, yr:18, rt:4.8, oem:1, smp:1,
 cert:['OEKO-TEX','ISO 9001'],
 lead:'25-35 gün', cap:'450.000 adet/ay',
 mat:'Malzeme bilgisi', pack:'Ambalaj bilgisi'}
```

| Alan | Anlamı |
|---|---|
| `lo` / `hi` | En düşük ve en yüksek birim fiyat (USD). Kademeli fiyat tablosu bunlardan üretilir |
| `u` | Birim: adet, set, kg, m², litre, ton, hat… |
| `moq` | Minimum sipariş miktarı |
| `ver` | 1 = yerinde denetimli üretici rozeti |
| `smp` | 1 = numune gönderiyor |
| `oem` | 1 = özel üretim / fason kabul ediyor |
| `rt` | Alıcı puanı (5 üzerinden) |

---

## Tedarikçi başvuru ve onay akışı

1. Üretici, ana sayfadaki **Üretici başvurusu** formunu doldurur
2. Başvuru size ulaşır (aşağıdaki form servisi kurulumu gerekir)
3. Belgeleri inceleyip onaylarsınız
4. `admin.html` panelinde firmanın bilgilerini girip katalog kodunu üretirsiniz
5. Kodu `assets/js/data.js` içine yapıştırıp commit edersiniz — firma sitede yayına girer

Yayınlama yetkisi yalnızca sizdedir: paneli herkes açabilir ama hiçbir şeyi yayınlayamaz,
çünkü yayın için depoya commit atmak gerekir.

### Başvuru formunu çalışır hale getirme

Statik sitede form verisini saklayacak sunucu yoktur. Başvuruların e-postanıza düşmesi için:

1. [formspree.io](https://formspree.io) adresinde ücretsiz hesap açın (aylık 50 başvuru)
2. Yeni bir form oluşturup size verilen adresi kopyalayın (`https://formspree.io/f/xxxxxxx` biçiminde)
3. `assets/js/config.js` içindeki `formEndpoint` satırına yapıştırın
4. Commit edin — başvurular artık e-postanıza gelir

Bu adım yapılmazsa form çalışmaya devam eder, ancak başvuruyu gönderene hazır bir
e-posta taslağı açar. `config.js` içindeki `basvuruEposta` adresini kendi adresinizle
değiştirmeyi unutmayın.

---

## Mevcut özellikler

- 12 sektör kategorisi (katalog başlangıçta boş, kayıtlar onayla eklenir)
- Tedarikçi başvuru formu ve `admin.html` onay/yayın paneli
- Kategori, şehir, fiyat aralığı ve tedarikçi niteliği (denetimli / numune / OEM / düşük MOQ) filtreleri
- Ürün adı, üretici, şehir ve malzeme üzerinden arama
- Ürün detay penceresi: kademeli fiyat tablosu, MOQ, üretim süresi, aylık kapasite, sertifikalar
- Çoklu teklif sepeti (RFQ): birden fazla üreticiye tek talep, adet düzenleme, MOQ altı uyarısı
- Teklif formu ve RFQ numarası üreten onay ekranı
- Tedarikçi kayıt formu
- Mobil uyumlu, klavye ile gezilebilir, `prefers-reduced-motion` desteği

## Henüz yok (yol haritası)

- [ ] Backend ve veritabanı (ürün, tedarikçi, RFQ tabloları)
- [ ] Üyelik: ayrı alıcı ve tedarikçi panelleri
- [ ] Şifre korumalı gerçek yönetim paneli (backend gerektirir)
- [ ] Belge yükleme (vergi levhası, kapasite raporu, imza sirküleri)
- [ ] Platform içi mesajlaşma — alıcı ile üretici yazışması
- [ ] Ürün görselleri (şu an CSS ile üretilen geometrik desenler kullanılıyor)
- [ ] Çoklu dil: İngilizce ve Arapça
- [ ] Arama altyapısı (Meilisearch / Algolia veya Postgres full-text)
- [ ] KVKK aydınlatma metni, mesafeli aracılık sözleşmesi, ETBİS kaydı

---

## Yasal notlar

- Repodaki firma isimleri, fiyatlar ve kapasite bilgileri **kurgusaldır**, örnek veridir.
- Marka adı: **HAN**. Tescil öncesi [TÜRKPATENT](https://www.turkpatent.gov.tr) üzerinden 35. sınıf (pazaryeri / aracılık hizmetleri) araştırması yapılması önerilir.
- Yayına alındığında ETBİS kaydı, KVKK aydınlatma metni ve aracılık sözleşmesi zorunludur.

## Lisans

MIT — `LICENSE` dosyasına bakın.
