/* Arayüz mantığı — filtre, arama, ürün detayı, teklif sepeti */

/* ============ DURUM ============ */
let rfq = [];   // {id, qty}
let activeCat = '';

/* ============ YARDIMCI ============ */
const catOf = id => CATS.find(c=>c.id===id);
const prod = id => P.find(p=>p.id===id);
const fmt = n => n>=1000 ? n.toLocaleString('tr-TR') : String(n).replace('.',',');
const money = n => '$'+n.toLocaleString('en-US',{minimumFractionDigits:n<100?2:0,maximumFractionDigits:2});

function motif(c,seed){
  const cat = catOf(c);
  const a = cat.c1, b = cat.c2;
  const s = seed%4;
  const pats = [
    `repeating-linear-gradient(45deg, ${a} 0 14px, ${b} 14px 28px)`,
    `repeating-linear-gradient(0deg, ${a} 0 10px, ${b} 10px 20px), radial-gradient(circle at 50% 50%, ${b} 20%, transparent 21%)`,
    `conic-gradient(from 45deg at 50% 50%, ${a} 0 25%, ${b} 25% 50%, ${a} 50% 75%, ${b} 75%)`,
    `linear-gradient(135deg, ${a} 0 50%, ${b} 50% 100%)`
  ];
  const size = ['auto','28px 28px','56px 56px','auto'][s];
  return `background-image:${pats[s]};background-size:${size};`;
}

function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('on');
  clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),2200);
}
function scrollTo2(sel){document.querySelector(sel).scrollIntoView({behavior:'smooth'})}

/* ============ KURULUM ============ */
function applyBrand(){
  document.title = `${SITE.name} — ${SITE.tagline} | ${SITE.metaTitle}`;
  document.querySelectorAll('[data-brand="name"]').forEach(e=>e.textContent=SITE.name);
  document.querySelectorAll('[data-brand="tag"]').forEach(e=>e.textContent=SITE.tagline);
  document.querySelectorAll('[data-brand="footer"]').forEach(e=>e.textContent=`© ${new Date().getFullYear()} ${SITE.name} ${SITE.tagline} — ${SITE.footerNote}`);
  document.querySelectorAll('[data-brand="hero-title"]').forEach(e=>e.innerHTML=SITE.heroTitle);
  document.querySelectorAll('[data-brand="hero-lede"]').forEach(e=>e.textContent=SITE.heroLede);
  const st=document.getElementById('heroStats');
  if(st) st.innerHTML = SITE.stats.map((s,i)=>`<div class="stat${i===0?' turq':''}"><b>${s.v}</b><span>${s.l}</span></div>`).join('');
  document.documentElement.style.setProperty('--tile', SITE.colors.primary);
  document.documentElement.style.setProperty('--turq', SITE.colors.accent);
  document.documentElement.style.setProperty('--bole', SITE.colors.price);
}

function boot(){
  applyBrand();
  // kategori seçicileri
  const opts = CATS.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  document.getElementById('searchCat').insertAdjacentHTML('beforeend',opts);
  document.getElementById('fCat').insertAdjacentHTML('beforeend',opts);
  document.getElementById('s2').innerHTML = opts;

  // şehirler
  const cities=[...new Set(P.map(p=>p.city))].sort((a,b)=>a.localeCompare(b,'tr'));
  document.getElementById('fCity').insertAdjacentHTML('beforeend',cities.map(c=>`<option>${c}</option>`).join(''));

  // üst menü
  document.getElementById('catNav').innerHTML =
    `<button aria-current="true" onclick="pickCat('')">Tümü</button>` +
    CATS.map(c=>`<button onclick="pickCat('${c.id}')">${c.name}</button>`).join('');

  // sektör kemerleri
  document.getElementById('archGrid').innerHTML = CATS.map((c,i)=>`
    <button class="arch" onclick="pickCat('${c.id}')">
      <span class="motif" style="${motif(c.id,i)}"></span>
      <b>${c.name}</b><small>${c.n}</small>
    </button>`).join('');

  // öne çıkan üreticiler
  const sup = ['Uludağ Örme Tekstil','Sultanhan Halı','Fıstıkzade Gıda','Selçuk Değirmen Makine']
    .map(name=>P.find(p=>p.sup===name));
  document.getElementById('suppRow').innerHTML = sup.map(p=>`
    <div class="scard">
      <div class="top">
        <div class="avatar" style="background:${catOf(p.c).c1}">${p.sup.slice(0,2).toUpperCase()}</div>
        <div><h4>${p.sup}</h4><div class="meta">${p.city} · ${p.yr} yıl</div></div>
      </div>
      <div class="chips">${p.cert.map(c=>`<span class="chip">${c}</span>`).join('')}${p.ver?'<span class="chip" style="background:#E6F3EC;border-color:#B6DCC8;color:#1B7F5A">Denetimli</span>':''}</div>
      <div class="stats2">
        <div><b>${p.rt}/5</b>Alıcı puanı</div>
        <div><b>${p.cap.split('/')[0]}</b>Aylık kapasite</div>
        <div><b>${p.lead.split(' ')[0]}</b>Üretim (gün)</div>
      </div>
      <button class="btn btn-ghost" onclick="pickCat('${p.c}')">Ürünlerini gör</button>
    </div>`).join('');

  render();
}

/* ============ LİSTELEME ============ */
function render(){
  const cat = document.getElementById('fCat').value;
  const city = document.getElementById('fCity').value;
  const min = parseFloat(document.getElementById('fMin').value);
  const max = parseFloat(document.getElementById('fMax').value);
  const ver = document.getElementById('fVer').checked;
  const smp = document.getElementById('fSample').checked;
  const oem = document.getElementById('fOem').checked;
  const low = document.getElementById('fLowMoq').checked;
  const q = (window._q||'').toLocaleLowerCase('tr');
  const sort = document.getElementById('sortBy').value;

  let list = P.filter(p=>{
    if(cat && p.c!==cat) return false;
    if(city && p.city!==city) return false;
    if(!isNaN(min) && p.hi<min) return false;
    if(!isNaN(max) && p.lo>max) return false;
    if(ver && !p.ver) return false;
    if(smp && !p.smp) return false;
    if(oem && !p.oem) return false;
    if(low && p.moq>300) return false;
    if(q){
      const hay=(p.n+' '+p.sup+' '+p.city+' '+catOf(p.c).name+' '+p.mat).toLocaleLowerCase('tr');
      if(!hay.includes(q)) return false;
    }
    return true;
  });

  if(sort==='priceAsc') list.sort((a,b)=>a.lo-b.lo);
  if(sort==='priceDesc') list.sort((a,b)=>b.hi-a.hi);
  if(sort==='moq') list.sort((a,b)=>a.moq-b.moq);
  if(sort==='rating') list.sort((a,b)=>b.rt-a.rt);

  document.getElementById('resCount').textContent = list.length;
  document.getElementById('resSupp').textContent = new Set(list.map(p=>p.sup)).size;

  const g = document.getElementById('grid');
  if(!list.length){
    g.innerHTML = `<div class="empty"><h3>Bu kriterlere uyan ürün yok</h3>
      <p>Filtreleri gevşetebilir ya da talebinizi doğrudan üretici ağına açabilirsiniz.</p>
      <button class="btn btn-dark" onclick="openDrawer()">Teklif talebi oluştur</button></div>`;
    return;
  }
  g.innerHTML = list.map(p=>{
    const inCart = rfq.some(r=>r.id===p.id);
    return `<article class="card">
      <div class="thumb" style="${motif(p.c,p.id)}" onclick="openProduct(${p.id})" role="button" tabindex="0" onkeypress="if(event.key==='Enter')openProduct(${p.id})">
        <span class="badge">${catOf(p.c).name}</span>
      </div>
      <div class="body">
        <h3 onclick="openProduct(${p.id})">${p.n}</h3>
        <div class="price">${money(p.lo)} – ${money(p.hi)} <small>/ ${p.u}</small></div>
        <div class="moq">MOQ ${fmt(p.moq)} ${p.u} · ${p.lead}</div>
        <div class="supp">
          <span class="flagchip" title="Türkiye"></span>
          <span class="name">${p.sup}, ${p.city}</span>
          ${p.ver?'<span class="verified" title="Yerinde denetimli">✔ Denetimli</span>':''}
        </div>
      </div>
      <button class="add ${inCart?'in':''}" onclick="toggleRfq(${p.id})">${inCart?'Sepette ✓':'Teklife ekle'}</button>
    </article>`;
  }).join('');
}

function pickCat(id){
  activeCat=id;
  document.getElementById('fCat').value=id;
  [...document.querySelectorAll('#catNav button')].forEach((b,i)=>
    b.setAttribute('aria-current', String((i===0&&!id) || CATS[i-1]?.id===id)));
  render();
  scrollTo2('#katalog');
}
function doSearch(e){
  e.preventDefault();
  const v = (document.getElementById('heroInput').value || document.getElementById('searchInput').value || '').trim();
  window._q = v;
  const sc = document.getElementById('searchCat').value;
  if(sc) document.getElementById('fCat').value = sc;
  render(); scrollTo2('#katalog');
  if(v) toast(`"${v}" için ${document.getElementById('resCount').textContent} sonuç`);
}
function quick(t){
  window._q=t;
  document.getElementById('searchInput').value=t;
  document.getElementById('heroInput').value=t;
  render(); scrollTo2('#katalog');
}
function resetFilters(){
  ['fCat','fCity','fMin','fMax'].forEach(i=>document.getElementById(i).value='');
  ['fVer','fSample','fOem','fLowMoq'].forEach(i=>document.getElementById(i).checked=false);
  window._q=''; document.getElementById('searchInput').value=''; document.getElementById('heroInput').value='';
  render();
}

/* ============ ÜRÜN DETAY ============ */
function openProduct(id){
  const p = prod(id);
  const t1=p.moq, t2=p.moq*5, t3=p.moq*20;
  const mid=(p.lo+p.hi)/2;
  const box = document.getElementById('modalBox');
  box.innerHTML = `
    <button class="mclose" onclick="closeAll()" aria-label="Kapat">×</button>
    <div class="mtop">
      <div class="mimg" style="${motif(p.c,p.id)}"></div>
      <div class="minfo">
        <div class="eyebrow" style="color:var(--tile)">${catOf(p.c).name}</div>
        <h2>${p.n}</h2>
        <div class="price" style="font-size:22px">${money(p.lo)} – ${money(p.hi)} <small>/ ${p.u} · FOB</small></div>
        <table class="tier">
          <tr><th>Adet aralığı</th><th>Birim fiyat</th></tr>
          <tr><td>${fmt(t1)} – ${fmt(t2-1)} ${p.u}</td><td>${money(p.hi)}</td></tr>
          <tr><td>${fmt(t2)} – ${fmt(t3-1)} ${p.u}</td><td>${money(+mid.toFixed(2))}</td></tr>
          <tr><td>${fmt(t3)}+ ${p.u}</td><td>${money(p.lo)}</td></tr>
        </table>
        <div class="mbtns">
          <button class="btn btn-bole" onclick="toggleRfq(${p.id},1);openDrawer()">Teklif iste</button>
          ${p.smp?`<button class="btn btn-ghost" onclick="toast('Numune talebi üreticiye iletildi')">Numune iste</button>`:''}
        </div>
      </div>
    </div>
    <div class="mbottom">
      <h3 style="font-size:17px;margin-bottom:12px">Ürün ve üretim bilgileri</h3>
      <div class="specs">
        <div><span>Minimum sipariş</span>${fmt(p.moq)} ${p.u}</div>
        <div><span>Üretim süresi</span>${p.lead}</div>
        <div><span>Aylık kapasite</span>${p.cap}</div>
        <div><span>Malzeme</span>${p.mat}</div>
        <div><span>Ambalaj</span>${p.pack}</div>
        <div><span>Özel üretim (OEM)</span>${p.oem?'Var — logo, etiket, ambalaj':'Yok'}</div>
        <div><span>Üretici</span>${p.sup} · ${p.city}</div>
        <div><span>Sektör deneyimi</span>${p.yr} yıl · alıcı puanı ${p.rt}/5</div>
      </div>
      <div class="chips">${p.cert.map(c=>`<span class="chip">${c}</span>`).join('')}
        ${p.ver?'<span class="chip" style="background:#E6F3EC;border-color:#B6DCC8;color:#1B7F5A">✔ Yerinde denetimli</span>':'<span class="chip">Belge doğrulaması bekleniyor</span>'}</div>
    </div>`;
  document.getElementById('modal').classList.add('on');
  document.getElementById('scrim').classList.add('on');
  document.body.style.overflow='hidden';
}

/* ============ RFQ SEPETİ ============ */
function toggleRfq(id, forceAdd){
  const i = rfq.findIndex(r=>r.id===id);
  if(i>-1 && !forceAdd){ rfq.splice(i,1); toast('Sepetten çıkarıldı'); }
  else if(i===-1){ rfq.push({id, qty: prod(id).moq}); toast('Teklif sepetine eklendi'); }
  syncCount(); render(); drawFill();
}
function syncCount(){ document.getElementById('rfqCount').textContent = rfq.length; }
function setQty(id,v){ const r=rfq.find(x=>x.id===id); if(r) r.qty=Math.max(1,parseInt(v)||1); drawFill(); }

function drawFill(){
  const body = document.getElementById('drawerBody');
  const foot = document.getElementById('drawerFoot');
  if(!rfq.length){
    body.innerHTML = `<div style="text-align:center;padding:44px 16px">
      <h3 style="font-size:18px;margin-bottom:8px">Sepetiniz boş</h3>
      <p style="color:var(--muted);font-size:14.5px">Katalogdan ürün ekleyin ya da aradığınızı bulamadıysanız talebinizi serbest metin olarak açın — uygun üreticiler size döner.</p>
      <button class="btn btn-ghost" style="margin-top:14px" onclick="closeAll();scrollTo2('#katalog')">Kataloğa git</button></div>`;
    foot.innerHTML = `<button class="btn btn-dark" onclick="openForm()">Serbest teklif talebi aç</button>`;
    return;
  }
  body.innerHTML = rfq.map(r=>{
    const p=prod(r.id);
    return `<div class="ditem">
      <div class="th" style="${motif(p.c,p.id)}"></div>
      <div style="flex:1;min-width:0">
        <div class="n">${p.n}</div>
        <div class="s">${p.sup} · ${p.city}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:7px">
          <input type="number" min="1" value="${r.qty}" onchange="setQty(${p.id},this.value)" aria-label="Adet">
          <span class="s">${p.u} · min ${fmt(p.moq)}</span>
          <button class="rm" onclick="toggleRfq(${p.id})">Kaldır</button>
        </div>
        ${r.qty<p.moq?`<div style="color:var(--bole);font-size:12.5px;margin-top:5px">MOQ altında — üretici yine de değerlendirebilir</div>`:''}
      </div>
    </div>`;
  }).join('');
  const supN = new Set(rfq.map(r=>prod(r.id).sup)).size;
  foot.innerHTML = `<button class="btn btn-bole" onclick="openForm()">${supN} üreticiye teklif gönder</button>
    <p class="note">Talebiniz üreticilere aynı anda iletilir, fiyatınız gizli kalır.</p>`;
}

function openDrawer(){
  drawFill();
  document.getElementById('drawer').classList.add('on');
  document.getElementById('scrim').classList.add('on');
}

function openForm(){
  const box=document.getElementById('modalBox');
  const items = rfq.map(r=>`${prod(r.id).n} — ${fmt(r.qty)} ${prod(r.id).u}`);
  box.innerHTML = `
    <button class="mclose" onclick="closeAll()" aria-label="Kapat">×</button>
    <div style="padding:32px;max-width:640px">
      <div class="eyebrow" style="color:var(--tile)">Teklif talebi · RFQ</div>
      <h2 style="font-size:26px;font-weight:800;margin-bottom:8px">Talebinizi üreticilere açın</h2>
      <p style="color:var(--muted);margin:0 0 22px">Formu doldurun; eşleşen üreticiler ortalama 36 saat içinde proforma ile döner.</p>
      ${items.length?`<div style="background:var(--stone);border:1px solid var(--line);border-radius:8px;padding:14px;margin-bottom:20px">
        <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-family:'IBM Plex Mono',monospace;margin-bottom:8px">Sepetteki kalemler</div>
        ${items.map(i=>`<div style="font-size:14px">• ${i}</div>`).join('')}</div>`:''}
      <form onsubmit="sendRfq(event)">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div class="field"><label>Firma adı</label><input required placeholder="Alıcı firma"></div>
          <div class="field"><label>Yetkili kişi</label><input required placeholder="Ad soyad"></div>
          <div class="field"><label>E-posta</label><input type="email" required placeholder="satinalma@firma.com"></div>
          <div class="field"><label>Telefon / WhatsApp</label><input required placeholder="+90 ..."></div>
          <div class="field"><label>Teslim ülkesi</label><input required placeholder="Almanya"></div>
          <div class="field"><label>Teslim şekli</label><select><option>FOB</option><option>EXW</option><option>CIF</option><option>DAP</option></select></div>
        </div>
        ${items.length?'':`<div class="field"><label>Ne tedarik etmek istiyorsunuz?</label><input required placeholder="Örn. 5.000 adet pamuklu polo yaka"></div>`}
        <div class="field"><label>Hedef birim fiyat (opsiyonel)</label><input placeholder="$ / birim"></div>
        <div class="field"><label>Teknik detay, sertifika ve termin beklentiniz</label><textarea placeholder="Renk, ölçü, ambalaj, etiket, sertifika, istenen teslim tarihi..."></textarea></div>
        <button class="btn btn-bole" style="width:100%;margin-top:6px">Teklif talebini gönder</button>
        <p class="note">Gönderdiğiniz bilgiler yalnızca eşleşen üreticilerle paylaşılır.</p>
      </form>
    </div>`;
  document.getElementById('drawer').classList.remove('on');
  document.getElementById('modal').classList.add('on');
  document.getElementById('scrim').classList.add('on');
  document.body.style.overflow='hidden';
}

function sendRfq(e){
  e.preventDefault();
  const no = 'RFQ-' + new Date().getFullYear() + '-' + Math.floor(100000+Math.random()*899999);
  const supN = rfq.length ? new Set(rfq.map(r=>prod(r.id).sup)).size : 6;
  document.getElementById('modalBox').innerHTML = `
    <button class="mclose" onclick="closeAll()" aria-label="Kapat">×</button>
    <div class="success">
      <div class="tick">✓</div>
      <h3>Teklif talebiniz ${supN} üreticiye iletildi</h3>
      <p>Yanıtlar e-postanıza ve alıcı panelinize düşecek.</p>
      <p>Ortalama ilk dönüş süresi: 36 saat</p>
      <div class="rfqno">${no}</div>
      <div style="margin-top:22px"><button class="btn btn-dark" onclick="closeAll()">Kataloğa dön</button></div>
    </div>`;
  rfq=[];syncCount();render();
}

function supplierSubmit(e){
  e.preventDefault();
  e.target.reset();
  toast('Kayıt talebiniz alındı — doğrulama ekibi 1 iş günü içinde arayacak');
}

function closeAll(){
  document.getElementById('modal').classList.remove('on');
  document.getElementById('drawer').classList.remove('on');
  document.getElementById('scrim').classList.remove('on');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});

boot();
