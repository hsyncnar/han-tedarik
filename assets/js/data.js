/* ---------------------------------------------------------------
   KATALOG VERİSİ
   CATS = sektör kategorileri (yapısal, silmeyin)
   P    = ürün kataloğu. Onaylanan tedarikçilerin ürünleri buraya eklenir.
   Yeni kayıt üretmek için admin.html panelini kullanın.
--------------------------------------------------------------- */

const CATS = [
  {id:'tekstil',    name:'Tekstil & Hazır Giyim',      c1:'#123F63', c2:'#0E9C9C'},
  {id:'evtekstil',  name:'Ev Tekstili',                c1:'#0E9C9C', c2:'#123F63'},
  {id:'mobilya',    name:'Mobilya',                    c1:'#7A4A20', c2:'#C0392B'},
  {id:'gida',       name:'Gıda & Tarım',               c1:'#2F6B3A', c2:'#9BBF3A'},
  {id:'insaat',     name:'İnşaat & Yapı',              c1:'#4A5560', c2:'#8B96A1'},
  {id:'otomotiv',   name:'Otomotiv Yan Sanayi',        c1:'#1B2A38', c2:'#C0392B'},
  {id:'mutfak',     name:'Ev & Mutfak',                c1:'#8A5A2B', c2:'#E0A458'},
  {id:'makine',     name:'Makine & Kalıp',             c1:'#2C3E50', c2:'#0E9C9C'},
  {id:'kozmetik',   name:'Kozmetik & Kişisel Bakım',   c1:'#7B3F61', c2:'#D98AB0'},
  {id:'ambalaj',    name:'Ambalaj & Kağıt',            c1:'#6B5B3E', c2:'#C7A46B'},
  {id:'beyazesya',  name:'Beyaz Eşya & Elektrikli',    c1:'#123F63', c2:'#8B96A1'},
  {id:'aydinlatma', name:'Elektrik & Aydınlatma',      c1:'#1B2A38', c2:'#E0A458'}
];

/* Ürün kataloğu — şu an boş. Bir tedarikçiyi onayladığınızda kaydı buraya ekleyin.
   Alan açıklamaları için README.md → "Ürün ekleme örneği" bölümüne bakın. */
const P = [];
