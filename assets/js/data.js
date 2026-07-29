/* Katalog verisi — ürün ve kategori eklemek için bu dosyayı düzenleyin */

/* ============ VERİ ============ */
const CATS = [
  {id:'tekstil', name:'Tekstil & Hazır Giyim', c1:'#123F63', c2:'#0E9C9C', n:'2.140 üretici'},
  {id:'evtekstil', name:'Ev Tekstili', c1:'#0E9C9C', c2:'#123F63', n:'1.310 üretici'},
  {id:'mobilya', name:'Mobilya', c1:'#7A4A20', c2:'#C0392B', n:'980 üretici'},
  {id:'gida', name:'Gıda & Tarım', c1:'#2F6B3A', c2:'#9BBF3A', n:'1.760 üretici'},
  {id:'insaat', name:'İnşaat & Yapı', c1:'#4A5560', c2:'#8B96A1', n:'1.420 üretici'},
  {id:'otomotiv', name:'Otomotiv Yan Sanayi', c1:'#1B2A38', c2:'#C0392B', n:'860 üretici'},
  {id:'mutfak', name:'Ev & Mutfak', c1:'#8A5A2B', c2:'#E0A458', n:'740 üretici'},
  {id:'makine', name:'Makine & Kalıp', c1:'#2C3E50', c2:'#0E9C9C', n:'1.050 üretici'},
  {id:'kozmetik', name:'Kozmetik & Kişisel Bakım', c1:'#7B3F61', c2:'#D98AB0', n:'610 üretici'},
  {id:'ambalaj', name:'Ambalaj & Kağıt', c1:'#6B5B3E', c2:'#C7A46B', n:'520 üretici'},
  {id:'beyazesya', name:'Beyaz Eşya & Elektrikli', c1:'#123F63', c2:'#8B96A1', n:'340 üretici'},
  {id:'aydinlatma', name:'Elektrik & Aydınlatma', c1:'#1B2A38', c2:'#E0A458', n:'450 üretici'}
];

const P = [
 {id:1,n:'Örme Pamuklu T-Shirt · 180 gsm, %100 penye',c:'tekstil',lo:2.40,hi:3.80,u:'adet',moq:500,sup:'Uludağ Örme Tekstil',city:'Bursa',ver:1,yr:18,rt:4.8,oem:1,smp:1,cert:['OEKO-TEX','BSCI','GOTS'],lead:'25-35 gün',cap:'450.000 adet/ay',mat:'%100 pamuk penye',pack:'40 adet/koli, polybag'},
 {id:2,n:'Denim Pantolon · %98 pamuk %2 elastan',c:'tekstil',lo:8.50,hi:12.00,u:'adet',moq:300,sup:'Marmara Denim',city:'İstanbul',ver:1,yr:22,rt:4.6,oem:1,smp:1,cert:['BSCI','ISO 9001'],lead:'35-45 gün',cap:'180.000 adet/ay',mat:'12 oz denim',pack:'25 adet/koli'},
 {id:3,n:'Bebek Body · organik pamuk, GOTS sertifikalı',c:'tekstil',lo:1.90,hi:3.10,u:'adet',moq:1000,sup:'Minik Pamuk Tekstil',city:'Bursa',ver:1,yr:11,rt:4.9,oem:1,smp:1,cert:['GOTS','OEKO-TEX'],lead:'20-30 gün',cap:'600.000 adet/ay',mat:'Organik ribana',pack:'50 adet/koli'},
 {id:4,n:'Bukle Havlu Seti · 500 gsm, 3 parça',c:'evtekstil',lo:4.20,hi:6.10,u:'set',moq:1000,sup:'Ege Havlu Dokuma',city:'Denizli',ver:1,yr:26,rt:4.7,oem:1,smp:1,cert:['OEKO-TEX','ISO 9001'],lead:'25-40 gün',cap:'320 ton/ay',mat:'Çift kat bukle pamuk',pack:'20 set/koli'},
 {id:5,n:'Pamuklu Nevresim Takımı · ranforce, çift kişilik',c:'evtekstil',lo:9.90,hi:15.40,u:'takım',moq:400,sup:'Anadolu Ev Tekstil',city:'Denizli',ver:1,yr:14,rt:4.5,oem:1,smp:1,cert:['OEKO-TEX'],lead:'30-40 gün',cap:'90.000 takım/ay',mat:'Ranforce 57 tel',pack:'12 takım/koli'},
 {id:6,n:'Makine Halısı · polipropilen, ısı-set BCF',c:'evtekstil',lo:6.80,hi:14.50,u:'m²',moq:200,sup:'Sultanhan Halı',city:'Gaziantep',ver:1,yr:31,rt:4.7,oem:1,smp:1,cert:['ISO 9001','CE'],lead:'20-30 gün',cap:'1,2 mn m²/ay',mat:'BCF polipropilen',pack:'Rulo, streç'},
 {id:7,n:'Battaniye · çift kişilik, akrilik jakarlı',c:'evtekstil',lo:7.40,hi:11.80,u:'adet',moq:500,sup:'Uşak Yün İplik',city:'Uşak',ver:0,yr:9,rt:4.3,oem:1,smp:0,cert:['ISO 9001'],lead:'25-35 gün',cap:'140.000 adet/ay',mat:'Akrilik jakar',pack:'10 adet/koli'},
 {id:8,n:'Modüler Ofis Masası · melamin kaplı, 160 cm',c:'mobilya',lo:110,hi:180,u:'adet',moq:20,sup:'Erciyes Ofis Mobilya',city:'Kayseri',ver:1,yr:19,rt:4.6,oem:1,smp:0,cert:['TSE','ISO 14001'],lead:'30-45 gün',cap:'6.000 adet/ay',mat:'18 mm melamin, metal ayak',pack:'Demonte, karton'},
 {id:9,n:'Kumaş Kaplı 3+3+1 Koltuk Takımı',c:'mobilya',lo:320,hi:480,u:'takım',moq:10,sup:'İnegöl Koltuk Sanayi',city:'Bursa / İnegöl',ver:1,yr:24,rt:4.8,oem:1,smp:0,cert:['TSE'],lead:'35-50 gün',cap:'1.800 takım/ay',mat:'Kayın iskelet, keten kumaş',pack:'Streç + karton köşe'},
 {id:10,n:'Antep Fıstığı · iç, 1. kalite, 26-28 kalibre',c:'gida',lo:9.80,hi:12.40,u:'kg',moq:500,sup:'Fıstıkzade Gıda',city:'Gaziantep',ver:1,yr:16,rt:4.9,oem:0,smp:1,cert:['ISO 22000','HACCP','BRC'],lead:'10-15 gün',cap:'80 ton/ay',mat:'Siirt & Antep çeşidi',pack:'10 kg vakumlu'},
 {id:11,n:'Kuru Kayısı · kükürtsüz, doğal, no.3',c:'gida',lo:4.60,hi:6.20,u:'kg',moq:1000,sup:'Kayısıdiyarı Gıda',city:'Malatya',ver:1,yr:13,rt:4.7,oem:0,smp:1,cert:['ISO 22000','Organik (AB)'],lead:'10-20 gün',cap:'250 ton/ay',mat:'Hacıhaliloğlu çeşidi',pack:'12,5 kg koli'},
 {id:12,n:'Sızma Zeytinyağı · asit ≤ %0,3, hasat 2025',c:'gida',lo:6.40,hi:8.90,u:'litre',moq:2000,sup:'Zeytindalı Yağ',city:'Balıkesir / Ayvalık',ver:1,yr:28,rt:4.8,oem:1,smp:1,cert:['ISO 22000','HACCP'],lead:'15-25 gün',cap:'400 ton/ay',mat:'Ayvalık zeytini, soğuk sıkım',pack:'5 L teneke / 1 L cam'},
 {id:13,n:'Kuru İncir · Lerida, natürel, protokollü',c:'gida',lo:5.10,hi:7.30,u:'kg',moq:1000,sup:'Efes İncir Kooperatifi',city:'Aydın',ver:1,yr:21,rt:4.6,oem:0,smp:1,cert:['ISO 22000','BRC'],lead:'15-25 gün',cap:'180 ton/ay',mat:'Sarılop çeşidi',pack:'10 kg karton'},
 {id:14,n:'Seramik Yer Karosu · 60x60, rektifiyeli',c:'insaat',lo:6.20,hi:9.40,u:'m²',moq:500,sup:'Bozüyük Seramik',city:'Bilecik',ver:1,yr:34,rt:4.5,oem:1,smp:1,cert:['CE','TSE','ISO 9001'],lead:'20-30 gün',cap:'900.000 m²/ay',mat:'Granit seramik',pack:'Palet, 48 kutu'},
 {id:15,n:'PVC Pencere Profili · 70 mm, 5 odacıklı',c:'insaat',lo:2.90,hi:4.10,u:'metre',moq:3000,sup:'Profilsan Yapı',city:'İstanbul',ver:1,yr:17,rt:4.4,oem:1,smp:1,cert:['CE','RAL'],lead:'25-35 gün',cap:'2.400 ton/ay',mat:'Bakalit içermeyen PVC',pack:'6,5 m boy, streç'},
 {id:16,n:'Traverten Blok · klasik bej, ebatlanabilir',c:'insaat',lo:180,hi:260,u:'ton',moq:25,sup:'Menderes Mermer',city:'Denizli',ver:0,yr:12,rt:4.2,oem:0,smp:1,cert:['CE'],lead:'20-30 gün',cap:'3.000 ton/ay',mat:'Doğal traverten',pack:'Ahşap kasa'},
 {id:17,n:'Fren Balatası Seti · ön aks, binek',c:'otomotiv',lo:7.40,hi:11.20,u:'set',moq:200,sup:'Balatapar Otomotiv',city:'Bursa',ver:1,yr:23,rt:4.6,oem:1,smp:1,cert:['ECE R90','IATF 16949'],lead:'30-40 gün',cap:'220.000 set/ay',mat:'Asbestsiz seramik',pack:'Kutulu, barkodlu'},
 {id:18,n:'Otomotiv Kablo Demeti · özel proje üretimi',c:'otomotiv',lo:12.00,hi:19.00,u:'adet',moq:500,sup:'Kablosan Elektrik',city:'Kocaeli',ver:1,yr:15,rt:4.7,oem:1,smp:0,cert:['IATF 16949','ISO 14001'],lead:'40-55 gün',cap:'160.000 adet/ay',mat:'Bakır, PVC izole',pack:'Özel raf, antistatik'},
 {id:19,n:'Çelik Tencere Seti · 9 parça, indüksiyon uyumlu',c:'mutfak',lo:18.50,hi:26.00,u:'set',moq:300,sup:'Çelikev Mutfak',city:'İstanbul',ver:1,yr:20,rt:4.5,oem:1,smp:1,cert:['LFGB','CE'],lead:'30-40 gün',cap:'60.000 set/ay',mat:'18/10 paslanmaz çelik',pack:'Renkli kutu'},
 {id:20,n:'Borosilikat Cam Fırın Kabı · 2,5 L',c:'mutfak',lo:2.10,hi:3.40,u:'adet',moq:1000,sup:'Camteks Cam',city:'Kırklareli',ver:1,yr:9,rt:4.4,oem:1,smp:1,cert:['LFGB','CE'],lead:'25-35 gün',cap:'400.000 adet/ay',mat:'Borosilikat 3.3',pack:'6 adet/koli'},
 {id:21,n:'Un Değirmeni Hattı · 500 kg/saat, anahtar teslim',c:'makine',lo:14500,hi:22000,u:'hat',moq:1,sup:'Selçuk Değirmen Makine',city:'Konya',ver:1,yr:29,rt:4.8,oem:1,smp:0,cert:['CE','ISO 9001'],lead:'60-90 gün',cap:'8 hat/ay',mat:'Çelik konstrüksiyon',pack:'Konteyner, montaj dahil'},
 {id:22,n:'Plastik Enjeksiyon Kalıbı · özel tasarım',c:'makine',lo:3200,hi:9500,u:'kalıp',moq:1,sup:'Ege Kalıp Teknik',city:'İzmir',ver:1,yr:18,rt:4.7,oem:1,smp:0,cert:['ISO 9001'],lead:'45-70 gün',cap:'22 kalıp/ay',mat:'1.2738 / 2316 çelik',pack:'Ahşap sandık'},
 {id:23,n:'Yüz Serumu · hyaluronik asit, özel etiket',c:'kozmetik',lo:1.80,hi:2.90,u:'adet',moq:3000,sup:'Dermakoz Laboratuvar',city:'İstanbul',ver:1,yr:10,rt:4.6,oem:1,smp:1,cert:['GMP','ISO 22716'],lead:'35-45 gün',cap:'900.000 adet/ay',mat:'30 ml damlalıklı cam',pack:'Kutulu, seri no.'},
 {id:24,n:'Zeytinyağlı Sabun · el yapımı, 150 g',c:'kozmetik',lo:0.55,hi:0.95,u:'adet',moq:5000,sup:'Defne Sabun',city:'Hatay',ver:0,yr:7,rt:4.5,oem:1,smp:1,cert:['ISO 22716'],lead:'20-30 gün',cap:'700.000 adet/ay',mat:'Zeytinyağı, defne yağı',pack:'Kraft bandrol'},
 {id:25,n:'Oluklu Mukavva Koli · 5 katlı, baskılı',c:'ambalaj',lo:0.28,hi:0.46,u:'adet',moq:10000,sup:'Çukurova Ambalaj',city:'Adana',ver:1,yr:16,rt:4.4,oem:1,smp:1,cert:['FSC','ISO 9001'],lead:'15-25 gün',cap:'6 mn adet/ay',mat:'5 kat oluklu, flexo baskı',pack:'Palet'},
 {id:26,n:'Ankastre Fırın · 60 cm, A sınıfı',c:'beyazesya',lo:145,hi:210,u:'adet',moq:50,sup:'Spil Ev Aletleri',city:'Manisa',ver:1,yr:25,rt:4.7,oem:1,smp:0,cert:['CE','ERP','TSE'],lead:'40-55 gün',cap:'45.000 adet/ay',mat:'Emaye iç hazne',pack:'Köpük + karton'},
 {id:27,n:'LED Panel Armatür · 40W, 60x60, IP20',c:'aydinlatma',lo:6.90,hi:9.80,u:'adet',moq:500,sup:'Anıt Aydınlatma',city:'Ankara',ver:1,yr:12,rt:4.5,oem:1,smp:1,cert:['CE','RoHS','TSE'],lead:'20-30 gün',cap:'250.000 adet/ay',mat:'Alüminyum kasa, SMD 2835',pack:'2 adet/koli'},
 {id:28,n:'Elektrikli Su Isıtıcısı · 1,7 L, cam gövde',c:'beyazesya',lo:6.20,hi:9.40,u:'adet',moq:500,sup:'Spil Ev Aletleri',city:'Manisa',ver:1,yr:25,rt:4.7,oem:1,smp:1,cert:['CE','RoHS'],lead:'30-40 gün',cap:'120.000 adet/ay',mat:'Borosilikat + inox taban',pack:'Renkli kutu'}
];
