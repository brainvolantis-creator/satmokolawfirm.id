var L='en';
function setL(l){L=l;document.documentElement.lang=l;try{localStorage.setItem('slf-lang',l)}catch(e){}if(document.getElementById('cx').className=='o')start();rp()}
(function(){var s=null;try{s=localStorage.getItem('slf-lang')}catch(e){}
var q=(location.search.match(/lang=(id|en)/)||[])[1];
var b=(navigator.languages||[navigator.language||'en']).some(function(x){return /^id/i.test(x)});
setL(q||s||(b?'id':'en'));document.getElementById('lg').onclick=function(){setL(L=='id'?'en':'id')}})();
var T=function(a){return L=='id'?a[0]:a[1]};
var M={
tax:[['Pajak/Kepabeanan','Tax/Customs'],[['Pengumpulan dokumen dan penilaian batas waktu','Document collection and deadline assessment'],['Penyusunan keberatan/banding atau permohonan pengembalian','Drafting of objection/appeal or refund request'],['Pendampingan proses dan persidangan','Process and hearing representation']]],
corp:[['Investasi/Korporasi','Investment/Corporate'],[['Pemetaan struktur dan izin (PMA/PMDN, OSS-RBA)','Structure and licence mapping (PMA/PMDN, OSS-RBA)'],['Penyusunan dokumen korporasi dan due diligence','Corporate documents and due diligence'],['Pengurusan dan serah terima','Filing and handover']]],
lit:[['Litigasi/Arbitrase','Litigation/Arbitration'],[['Penilaian posisi hukum dan bukti','Assessment of legal position and evidence'],['Strategi dan pengajuan perkara/jawaban','Strategy and filing/response'],['Persidangan dan laporan berkala','Hearings and periodic reports']]],
tok:[['Tokenisasi/RWA','Tokenization/RWA'],[['Analisis jalur regulasi (domestik/Sandbox OJK atau zona PFII)','Regulatory pathway analysis (domestic/OJK Sandbox or PFII zone)'],['Opini hukum dan struktur SPV/TSPV','Legal opinion and SPV/TSPV structure'],['Dokumentasi, audit trail, dan sign-off hukum (audit kode oleh pihak ketiga)','Documentation, audit trail, and legal sign-off (code audit by third party)']]],
pri:[['Private Client','Private Client'],[['Wawancara awal dan inventarisasi aset','Initial interview and asset inventory'],['Penyusunan perjanjian atau wasiat','Drafting of agreement or will'],['Penandatanganan dan pencatatan','Execution and registration']]]};
function start(){var m=document.getElementById('cm');
m.innerHTML='<div class="m">'+T(['Saya menyusun draf rencana bertahap. Ini bukan nasihat hukum dan tidak menimbulkan hubungan advokat-klien. Jangan tulis data rahasia di sini. Jenis perkara Anda?','I draft a staged plan outline. This is not legal advice and creates no advocate-client relationship. Please do not enter confidential details here. What type of matter?'])+'</div>';
Object.keys(M).forEach(function(k){var b=document.createElement('button');b.textContent=T(M[k][0]);b.onclick=function(){plan(k)};m.appendChild(b)})}
function plan(k){var m=document.getElementById('cm'),n=T(M[k][0]),h='<div class="m"><b>'+n+'</b><ol><li>Gate 0: '+T(['verifikasi dan cek konflik','verification and conflict check'])+'</li><li>'+T(['Surat penugasan (ruang lingkup, honor Rupiah)','Engagement letter (scope, Rupiah fee)'])+'</li>';
M[k][1].forEach(function(s,i){h+='<li>'+T(['Tahap ','Stage '])+(i+1)+': '+T(s)+' <i>('+T(['honor dan titik keputusan sendiri','own fee and decision point'])+')</i></li>'});
h+='<li>'+T(['Tinjau; lanjut hanya dengan persetujuan Anda','Review; proceed only with your approval'])+'</li></ol>'+T(['Besaran honor ditentukan dalam surat penugasan setelah Gate 0; tidak ada token atau ekuitas.','Fee amounts are set in the engagement letter after Gate 0; no tokens or equity.'])+'</div>';
var sub=encodeURIComponent('Pay-per-case plan: '+n),body=encodeURIComponent(T(['Saya ingin menjadwalkan Gate 0 untuk: ','I would like to schedule Gate 0 for: '])+n);
m.innerHTML+=h+'<a class="b" href="mailto:satmoko@satmokolawfirm.id?subject='+sub+'&body='+body+'">✉ '+T(['Kirim email ke firma','Email the firm'])+'</a><a class="b" target="_blank" rel="noopener" href="https://mail.google.com/mail/?view=cm&to=satmoko@satmokolawfirm.id&su='+sub+'&body='+body+'">Gmail</a><a class="b" href="https://wa.me/6285692904399?text='+body+'">WhatsApp</a><button onclick="start()">↺ '+T(['Mulai ulang','Start over'])+'</button>';m.scrollTop=m.scrollHeight}
function openChat(){var c=document.getElementById('cx');if(c.className=='o'){c.className=''}else{c.className='o';start()}}

function rp(){var P=((window.SLF||{}).partners||[]).filter(function(p){return p.show!==false});document.querySelectorAll('[data-partners]').forEach(function(e){e.textContent=P.map(function(p){return p.name+' ('+(L=='id'?p.id:p.en)+')'}).join(', ');e.hidden=!P.length;if(e.previousElementSibling)e.previousElementSibling.hidden=!P.length})}
