const { PORT, r2BucketName } = require('../config/env');
const { isR2Configured } = require('../config/s3Client');

function renderAdminDashboardHtml() {
  const r2StatusText = isR2Configured ? 'Cloudflare R2 Aktif' : 'Local Storage Mode';
  const r2StatusBg = isR2Configured ? '#065f46' : '#854d0e';
  const r2StatusColor = isR2Configured ? '#34d399' : '#fde047';

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Strapi Headless CMS - Desa Plantungan (Cloudflare R2)</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #4f46e5;
      --primary-hover: #4338ca;
      --bg-dark: #0f172a;
      --sidebar-bg: #1e293b;
      --card-bg: #1e293b;
      --card-border: #334155;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --accent-green: #10b981;
      --accent-amber: #f59e0b;
      --accent-rose: #f43f5e;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: var(--bg-dark);
      color: var(--text-main);
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    .sidebar {
      width: 280px;
      background-color: var(--sidebar-bg);
      border-right: 1px solid var(--card-border);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    .brand {
      padding: 24px;
      border-bottom: 1px solid var(--card-border);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: linear-gradient(135deg, #6366f1, #4338ca);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 18px;
      color: white;
    }
    .brand-text h2 { font-size: 15px; font-weight: 800; letter-spacing: -0.5px; }
    .brand-text p { font-size: 11px; color: var(--text-muted); }
    .nav-sections {
      flex: 1;
      overflow-y: auto;
      padding: 20px 16px;
    }
    .nav-label {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
      margin: 16px 8px 8px;
    }
    .nav-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-radius: 8px;
      color: var(--text-muted);
      cursor: pointer;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 4px;
      transition: all 0.15s ease;
    }
    .nav-item:hover {
      background-color: rgba(255,255,255,0.05);
      color: #fff;
    }
    .nav-item.active {
      background-color: var(--primary);
      color: #fff;
    }
    .badge {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 9999px;
      background-color: rgba(255,255,255,0.1);
      font-weight: 700;
    }
    .sidebar-footer {
      padding: 16px;
      border-top: 1px solid var(--card-border);
      font-size: 12px;
      color: var(--text-muted);
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background-color: #0b1120;
    }
    .topbar {
      height: 70px;
      border-bottom: 1px solid var(--card-border);
      background-color: var(--sidebar-bg);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
    }
    .topbar h1 { font-size: 20px; font-weight: 800; }
    .btn {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s;
    }
    .btn-primary { background-color: var(--primary); color: white; }
    .btn-primary:hover { background-color: var(--primary-hover); }
    .btn-success { background-color: var(--accent-green); color: white; }
    .btn-danger { background-color: var(--accent-rose); color: white; }
    .btn-danger:hover { background-color: #e11d48; }
    .btn-secondary { background-color: #334155; color: white; }
    .btn-secondary:hover { background-color: #475569; }
    .btn-outline { background: transparent; border: 1px solid var(--card-border); color: var(--text-main); }
    .content-body {
      flex: 1;
      overflow-y: auto;
      padding: 32px;
    }
    .panel {
      background-color: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);
    }
    table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
    th { padding: 12px 16px; background-color: #0f172a; color: var(--text-muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--card-border); }
    td { padding: 14px 16px; border-bottom: 1px solid rgba(51, 65, 85, 0.4); vertical-align: middle; }
    tr:hover td { background-color: rgba(255,255,255,0.02); }
    .thumb-img { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; border: 1px solid var(--card-border); }
    .form-group { margin-bottom: 20px; }
    label { display: block; font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; }
    input[type="text"], input[type="email"], input[type="number"], select, textarea {
      width: 100%;
      padding: 10px 14px;
      border-radius: 8px;
      border: 1px solid var(--card-border);
      background-color: #0f172a;
      color: #fff;
      font-size: 14px;
      font-family: inherit;
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
    }
    .dropzone {
      border: 2px dashed var(--card-border);
      border-radius: 12px;
      padding: 32px;
      text-align: center;
      background: rgba(15, 23, 42, 0.6);
      cursor: pointer;
      transition: all 0.2s;
    }
    .dropzone:hover {
      border-color: var(--primary);
      background: rgba(79, 70, 229, 0.05);
    }
    .media-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
      gap: 16px;
      margin-top: 24px;
    }
    .media-card {
      background: #0f172a;
      border: 1px solid var(--card-border);
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .media-preview {
      height: 130px;
      background: #1e293b;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .media-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .media-info {
      padding: 12px;
      font-size: 11px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 6px;
    }
    #toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      padding: 12px 24px;
      border-radius: 8px;
      background-color: #10b981;
      color: white;
      font-weight: 700;
      font-size: 13px;
      display: none;
      box-shadow: 0 10px 15px rgba(0,0,0,0.3);
      z-index: 9999;
    }
    .modal {
      position: fixed;
      inset: 0;
      background-color: rgba(0,0,0,0.7);
      backdrop-filter: blur(4px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
    .modal-content {
      background-color: var(--sidebar-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      width: 680px;
      max-width: 90vw;
      max-height: 85vh;
      overflow-y: auto;
      padding: 28px;
    }
    .upload-inline-btn {
      padding: 6px 12px;
      background: #334155;
      color: #fff;
      border-radius: 6px;
      font-size: 11px;
      cursor: pointer;
      font-weight: 700;
      display: inline-block;
      margin-top: 4px;
    }
  </style>
</head>
<body>

  <!-- Sidebar Navigation -->
  <aside class="sidebar">
    <div class="brand">
      
      <div class="brand-text">
        <h2>Strapi Headless CMS</h2>
        <p>Desa Plantungan + Cloudflare R2</p>
      </div>
    </div>

    <div class="nav-sections">
      <div class="nav-label">Media & Storage</div>
      <div class="nav-item" onclick="switchView('mediaLibrary', this)">
        <span>Media Library</span>
        <span class="badge" id="badge-media">0</span>
      </div>

      <div class="nav-label">Single Types</div>
      <div class="nav-item active" onclick="switchView('profilDesa', this)">
        <span>Profil Desa</span>
      </div>
      <div class="nav-item" onclick="switchView('dataKependudukan', this)">
        <span>Data Kependudukan</span>
      </div>

      <div class="nav-label">Collection Types</div>
      <div class="nav-item" onclick="switchView('infrastrukturDesa', this)">
        <span>Infrastruktur Desa</span>
        <span class="badge" id="badge-infrastruktur">0</span>
      </div>
      <div class="nav-item" onclick="switchView('potensiDesa', this)">
        <span>Potensi Desa</span>
        <span class="badge" id="badge-potensi">0</span>
      </div>
      <div class="nav-item" onclick="switchView('programKKN', this)">
        <span>Program KKN 2025</span>
        <span class="badge" id="badge-kkn">0</span>
      </div>
      <div class="nav-item" onclick="switchView('berita', this)">
        <span>Berita & Warta</span>
        <span class="badge" id="badge-berita">0</span>
      </div>
      <div class="nav-item" onclick="switchView('apbdes', this)">
        <span>APBDes Transparansi</span>
        <span class="badge" id="badge-apbdes">0</span>
      </div>

      <div class="nav-label">Management</div>
      <div class="nav-item" onclick="switchView('pesan', this)">
        <span>Kotak Aspirasi Warga</span>
        <span class="badge" id="badge-pesan" style="background:#f43f5e; color:white;">0</span>
      </div>
    </div>

    <div class="sidebar-footer">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:11px; padding:2px 8px; border-radius:4px; background:${r2StatusBg}; color:${r2StatusColor}; font-weight:700;">
          ${r2StatusText}
        </span>
        <a href="/" target="_blank" style="color:#38bdf8; text-decoration:none; font-weight:700;">Lihat Web</a>
      </div>
      <span style="font-size:10px; color:#64748b;">Bucket: ${r2BucketName}</span>
    </div>
  </aside>

  <!-- Main Work Area -->
  <main class="main">
    <header class="topbar">
      <h1 id="view-title">Profil Desa</h1>
      <div id="top-actions"></div>
    </header>

    <div class="content-body" id="content-area"></div>
  </main>

  <!-- Modal for Creating / Editing Collection Items -->
  <div class="modal" id="crud-modal">
    <div class="modal-content">
      <h2 id="modal-title" style="margin-bottom: 20px;">Edit Data</h2>
      <form id="modal-form" onsubmit="saveModalData(event)">
        <div id="modal-fields"></div>
        <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:24px;">
          <button type="button" class="btn btn-secondary" onclick="closeModal()">Batal</button>
          <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
        </div>
      </form>
    </div>
  </div>

  <div id="toast">Data berhasil disimpan!</div>

  <script>
    let currentView = 'profilDesa';
    let dbState = {};

    async function loadData() {
      try {
        const res = await fetch('/api/cms-data');
        dbState = await res.json();
        updateBadges();
        renderCurrentView();
      } catch (err) {
        console.error('Error loading data:', err);
      }
    }

    function updateBadges() {
      const setBadge = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.innerText = val || 0;
      };
      setBadge('badge-media', dbState.mediaLibrary?.length);
      setBadge('badge-infrastruktur', dbState.infrastrukturDesa?.length);
      setBadge('badge-potensi', dbState.potensiDesa?.length);
      setBadge('badge-kkn', dbState.programKKN?.length);
      setBadge('badge-berita', dbState.berita?.length);
      setBadge('badge-apbdes', dbState.apbdes?.length);
      setBadge('badge-pesan', dbState.pesanMasyarakat?.length);
    }

    function showToast(msg = 'Data berhasil disimpan!') {
      const t = document.getElementById('toast');
      if (!t) return;
      t.innerText = msg;
      t.style.display = 'block';
      setTimeout(() => { t.style.display = 'none'; }, 3000);
    }

    function switchView(viewName, el) {
      currentView = viewName;
      document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
      const target = el || (window.event ? (window.event.currentTarget || window.event.target.closest('.nav-item')) : null);
      if (target) target.classList.add('active');
      renderCurrentView();
    }

    // Direct upload handler helper
    async function handleFileUpload(file, targetInputId = null) {
      if (!file) return;
      showToast('Mengunggah file ke Cloudflare R2...');
      const reader = new FileReader();
      reader.onload = async function() {
        const base64Data = reader.result;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            mimeType: file.type || 'application/octet-stream',
            base64: base64Data
          })
        });
        const uploaded = await res.json();
        if (uploaded.url) {
          showToast('Berhasil diunggah ke Cloudflare R2!');
          
          if (targetInputId) {
            const inputEl = document.getElementById(targetInputId);
            if (inputEl) inputEl.value = uploaded.url;
            const preview = document.getElementById(targetInputId + '-preview');
            if (preview) preview.src = uploaded.url;

            // Auto save if profile field
            if (targetInputId === 'p-logo') {
              await setProfilePhoto('logo', uploaded.url, 'Logo Resmi Desa');
            } else if (targetInputId === 'p-foto-desa') {
              await setProfilePhoto('foto_desa', uploaded.url, 'Foto Wilayah Desa');
            } else if (targetInputId === 'p-foto-kades') {
              await setProfilePhoto('foto_kades', uploaded.url, 'Foto Kepala Desa');
            } else if (targetInputId === 'p-foto-kantor') {
              await setProfilePhoto('foto_kantor', uploaded.url, 'Foto Kantor Balai Desa');
            }
          }
          await loadData();
        } else {
          showToast('Gagal upload: ' + (uploaded.error || 'Terjadi kesalahan'));
        }
      };
      reader.readAsDataURL(file);
    }

    async function setProfilePhoto(field, url, label) {
      await fetch('/api/set-profile-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, url })
      });
      showToast('' + (label || field) + ' Berhasil Ditetapkan!');
      await loadData();
    }

    async function setAsLogo(url) {
      await setProfilePhoto('logo', url, 'Logo Resmi Desa');
    }

    async function setAsFotoKades(url) {
      await setProfilePhoto('foto_kades', url, 'Foto Kepala Desa');
    }

    async function deleteMediaItem(encodedKey, encodedName) {
      const key = decodeURIComponent(encodedKey || '');
      const name = decodeURIComponent(encodedName || key);
      if (!confirm('Apakah Anda yakin ingin menghapus file "' + name + '" dari Cloudflare R2 dan database?')) {
        return;
      }
      showToast('Menghapus file dari Cloudflare R2...');
      try {
        const res = await fetch('/api/media-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key })
        });
        const result = await res.json();
        if (result.success) {
          showToast('File berhasil dihapus dari Cloudflare R2!');
          await loadData();
        } else {
          showToast('Gagal menghapus: ' + (result.error || 'Terjadi kesalahan'));
        }
      } catch (err) {
        showToast('Error jaringan: ' + err.message);
      }
    }

    async function syncCloudflareR2() {
      showToast('Menyinkronkan daftar file dari Cloudflare R2...');
      try {
        const res = await fetch('/api/media-sync');
        const result = await res.json();
        if (result.success) {
          showToast('Berhasil menyinkronkan ' + result.count + ' file dari Cloudflare R2!');
          await loadData();
        } else {
          showToast('Gagal sync: ' + (result.error || 'Gagal terhubung'));
        }
      } catch (err) {
        showToast('Error sync: ' + err.message);
      }
    }

    function renderCurrentView() {
      const titleEl = document.getElementById('view-title');
      const actionEl = document.getElementById('top-actions');
      const contentEl = document.getElementById('content-area');

      if (currentView === 'mediaLibrary') {
        titleEl.innerText = 'Media Library';
        actionEl.innerHTML = '<button class="btn btn-secondary" onclick="syncCloudflareR2()">Sinkronkan R2</button>';
        const list = dbState.mediaLibrary || [];
        let cardsHtml = '';
        if (list.length === 0) {
          cardsHtml = '<p style="color:var(--text-muted); text-align:center; padding:30px;">Belum ada media yang diunggah.</p>';
          cardsHtml = '<div class="media-grid">' + list.map(function(m) {
            var isImg = (m.mimeType && m.mimeType.indexOf('image') !== -1) || (m.name && /\\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(m.name));
            var sizeKb = m.size ? (m.size / 1024).toFixed(1) + ' KB' : 'R2 Object';
            var safeKey = encodeURIComponent(m.key || '');
            var safeName = encodeURIComponent(m.name || '');
            var proxyUrl = '/api/media-file?key=' + safeKey;
            var targetUrl = (m.url && !m.url.includes('r2.dev') && !m.url.includes('r2.cloudflarestorage.com')) ? m.url : proxyUrl;
            var safeUrl = encodeURIComponent(targetUrl);
            var previewHtml = isImg ? '<img src="' + proxyUrl + '" onerror="this.src=\\\'https://placehold.co/200x200/1e293b/94a3b8?text=Image\\\'">' : '<span style="font-size:28px;">File</span>';
            var btnImgHtml = isImg ? (
              '<button class="btn btn-primary" style="padding:4px 6px; font-size:10px; width:100%; justify-content:center; background:#047857;" onclick="setAsLogo(decodeURIComponent(\\'' + safeUrl + '\\'))">Jadikan Logo Desa</button>' +
              '<button class="btn btn-primary" style="padding:4px 6px; font-size:10px; width:100%; justify-content:center; background:#0284c7; margin-top:3px;" onclick="setAsFotoKades(decodeURIComponent(\\'' + safeUrl + '\\'))">Jadikan Foto Kepala Desa</button>'
            ) : '';
            return '<div class="media-card">' +
              '<div class="media-preview">' + previewHtml + '</div>' +
              '<div class="media-info">' +
                '<strong style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="' + m.name + '">' + m.name + '</strong>' +
                '<span style="color:var(--text-muted); font-size:10px;">' + sizeKb + ' - ' + (m.storage || 'Cloudflare R2') + '</span>' +
                '<div style="display:flex; flex-direction:column; gap:4px; margin-top:6px;">' +
                  '<div style="display:flex; gap:4px;">' +
                    '<button class="btn btn-outline" style="padding:4px 6px; font-size:10px; flex:1; justify-content:center;" onclick="navigator.clipboard.writeText(decodeURIComponent(\\'' + safeUrl + '\\')); showToast(\\'URL Berhasil Disalin!\\')">Salin URL</button>' +
                    '<button class="btn btn-danger" style="padding:4px 6px; font-size:10px; justify-content:center;" title="Hapus file dari Cloudflare R2" onclick="deleteMediaItem(\\'' + safeKey + '\\', \\'' + safeName + '\\')">Hapus</button>' +
                  '</div>' +
                  btnImgHtml +
                '</div>' +
              '</div>' +
            '</div>';
          }).join('') + '</div>';
        }

        contentEl.innerHTML = '<div class="panel" style="margin-bottom: 24px;">' +
          '<div class="dropzone" onclick="document.getElementById(\\'file-upload-input\\').click()">' +
            '<input type="file" id="file-upload-input" style="display:none;" onchange="handleFileUpload(this.files[0])">' +
            '<h3 style="font-size:15px; font-weight:700;">Unggah Media Baru ke Cloudflare R2</h3>' +
            '<p style="font-size:12px; color:var(--text-muted); margin-top:4px;">Klik untuk memilih file logo, foto berita, foto potensi desa, atau dokumen PDF.</p>' +
          '</div>' +
        '</div>' +
        '<div class="panel">' +
          '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">' +
            '<h3 style="font-size:15px; font-weight:700;">Daftar File Tersimpan (' + list.length + ')</h3>' +
            '<button class="btn btn-outline" style="font-size:11px; padding:6px 12px;" onclick="syncCloudflareR2()">Sync dari Cloudflare R2</button>' +
          '</div>' +
          cardsHtml +
        '</div>';
      } else if (currentView === 'profilDesa') {
        titleEl.innerText = 'Profil & Informasi Desa';
        actionEl.innerHTML = '<button class="btn btn-success" onclick="saveProfilDesa()">Simpan Perubahan Profil</button>';
        const p = dbState.profilDesa || {};
        contentEl.innerHTML = \`
          <div class="panel">
            <!-- Informasi Kontak & Lokasi Kantor Desa -->
            <div style="background:#0f172a; padding:16px; border-radius:12px; border:1px solid var(--card-border); margin-bottom:20px;">
              <h3 style="font-size:14px; font-weight:700; color:#38bdf8; margin:0 0 12px 0;">Informasi Lokasi & Kontak Desa</h3>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:12px;">
                <div>
                  <label style="font-size:12px; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">Nama Desa</label>
                  <input type="text" id="p-nama-desa" value="\${p.nama_desa || 'Desa Plantungan'}" style="width:100%;">
                </div>
                <div>
                  <label style="font-size:12px; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">Nama Kepala Desa</label>
                  <input type="text" id="p-nama-kades" value="\${p.nama_kades || 'Endang Susana'}" style="width:100%;">
                </div>
              </div>

              <div style="margin-bottom:12px;">
                <label style="font-size:12px; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">Alamat Kantor Balai Desa (Tampil di Website & Footer)</label>
                <textarea id="p-alamat" rows="2" style="width:100%; font-size:13px;" placeholder="contoh: Plantungan, Kec. Blora, Kabupaten Blora, Jawa Tengah 58219, Indonesia">\${p.alamat || ''}</textarea>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
                <div>
                  <label style="font-size:12px; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">Email Resmi Desa</label>
                  <input type="email" id="p-email" value="\${p.email || 'desaplantungan@gmail.com'}" style="width:100%;">
                </div>
                <div>
                  <label style="font-size:12px; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">No. Telepon / WhatsApp Desa</label>
                  <input type="text" id="p-telepon" value="\${p.telepon || '+62 895-3927-48251'}" style="width:100%;">
                </div>
              </div>
            </div>

            <!-- 1. Logo Desa -->
            <div style="display:flex; gap:20px; align-items:center; margin-bottom:20px; padding-bottom:20px; border-bottom:1px solid var(--card-border);">
              <img id="p-logo-preview" src="\${p.logo || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop'}" onerror="this.src='https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop'" style="width:72px; height:72px; border-radius:12px; object-fit:contain; border:2px solid var(--primary); background:#0f172a; padding:4px;">
              <div style="flex:1;">
                <label style="font-size:13px; font-weight:700; color:var(--text-main);">Logo Resmi Desa</label>
                <div style="display:flex; gap:8px; margin-top:6px;">
                  <input type="text" id="p-logo" value="\${p.logo || ''}" placeholder="/api/media-file?key=..." oninput="document.getElementById('p-logo-preview').src = this.value || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop'">
                  <label class="upload-inline-btn" style="margin:0; display:flex; align-items:center; white-space:nowrap;">
                    Upload Foto
                    <input type="file" style="display:none;" onchange="handleFileUpload(this.files[0], 'p-logo')">
                  </label>
                </div>
                <p style="font-size:11px; color:var(--text-muted); margin-top:4px;">Tampil di Header, Navbar, dan Footer website desa.</p>
              </div>
            </div>

            <!-- 2. Foto Kepala Desa -->
            <div style="display:flex; gap:20px; align-items:center; margin-bottom:20px; padding-bottom:20px; border-bottom:1px solid var(--card-border);">
              <img id="p-foto-kades-preview" src="\${p.foto_kades || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'}" onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'" style="width:72px; height:72px; border-radius:12px; object-fit:cover; border:2px solid #0284c7; background:#0f172a;">
              <div style="flex:1;">
                <label style="font-size:13px; font-weight:700; color:var(--text-main);">Foto Kepala Desa</label>
                <div style="display:flex; gap:8px; margin-top:6px;">
                  <input type="text" id="p-foto-kades" value="\${p.foto_kades || ''}" placeholder="URL Foto Kepala Desa" oninput="document.getElementById('p-foto-kades-preview').src = this.value || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'">
                  <label class="upload-inline-btn" style="margin:0; display:flex; align-items:center; white-space:nowrap;">
                    Upload Foto
                    <input type="file" style="display:none;" onchange="handleFileUpload(this.files[0], 'p-foto-kades')">
                  </label>
                </div>
                <p style="font-size:11px; color:var(--text-muted); margin-top:4px;">Tampil di Sambutan Kepala Desa di Beranda dan Struktur Organisasi Desa.</p>
              </div>
            </div>

            <!-- 3. Foto 1 & Foto 2 -->
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; padding-bottom:10px;">
              <!-- Foto 1 -->
              <div style="background:#0f172a; padding:16px; border-radius:12px; border:1px solid var(--card-border);">
                <div style="display:flex; gap:14px; align-items:center; margin-bottom:10px;">
                  <img id="p-foto-desa-preview" src="\${p.foto_desa || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&h=200&fit=crop'}" onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&h=200&fit=crop'" style="width:60px; height:60px; border-radius:8px; object-fit:cover; border:1px solid var(--card-border);">
                  <div style="flex:1;">
                    <label style="font-size:13px; font-weight:700; color:var(--text-main);">Foto 1</label>
                    <p style="font-size:11px; color:var(--text-muted);">Foto dokumentasi wilayah / landscape desa.</p>
                  </div>
                </div>
                <div style="display:flex; gap:8px;">
                  <input type="text" id="p-foto-desa" value="\${p.foto_desa || ''}" placeholder="URL Foto 1" oninput="document.getElementById('p-foto-desa-preview').src = this.value || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&h=200&fit=crop'">
                  <label class="upload-inline-btn" style="margin:0; display:flex; align-items:center; white-space:nowrap;">
                    Upload Foto
                    <input type="file" style="display:none;" onchange="handleFileUpload(this.files[0], 'p-foto-desa')">
                  </label>
                </div>
              </div>

              <!-- Foto 2 -->
              <div style="background:#0f172a; padding:16px; border-radius:12px; border:1px solid var(--card-border);">
                <div style="display:flex; gap:14px; align-items:center; margin-bottom:10px;">
                  <img id="p-foto-kantor-preview" src="\${p.foto_kantor || 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=200&h=200&fit=crop'}" onerror="this.src='https://images.unsplash.com/photo-1577495508048-b635879837f1?w=200&h=200&fit=crop'" style="width:60px; height:60px; border-radius:8px; object-fit:cover; border:1px solid var(--card-border);">
                  <div style="flex:1;">
                    <label style="font-size:13px; font-weight:700; color:var(--text-main);">Foto 2</label>
                    <p style="font-size:11px; color:var(--text-muted);">Foto kantor balai desa / fasilitas desa.</p>
                  </div>
                </div>
                <div style="display:flex; gap:8px;">
                  <input type="text" id="p-foto-kantor" value="\${p.foto_kantor || ''}" placeholder="URL Foto 2" oninput="document.getElementById('p-foto-kantor-preview').src = this.value || 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=200&h=200&fit=crop'">
                  <label class="upload-inline-btn" style="margin:0; display:flex; align-items:center; white-space:nowrap;">
                    Upload Foto
                    <input type="file" style="display:none;" onchange="handleFileUpload(this.files[0], 'p-foto-kantor')">
                  </label>
                </div>
              </div>
            </div>
          </div>
        \`;
      } else if (currentView === 'infrastrukturDesa') {
        titleEl.innerText = 'Infrastruktur & Fasilitas Desa (Collection Type)';
        actionEl.innerHTML = '<button class="btn btn-primary" onclick="openCreateModal(\\'infrastrukturDesa\\')">+ Tambah Fasilitas Baru</button>';
        const list = dbState.infrastrukturDesa || [];
        contentEl.innerHTML = \`
          <div class="panel">
            <table>
              <thead>
                <tr>
                  <th>Nama Sarana / Fasilitas</th>
                  <th>Kategori</th>
                  <th>Ikon Feather</th>
                  <th>Kondisi</th>
                  <th>Lokasi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                \${list.map((item) => {
                  const ik = item.ikon || 'home';
                  let badgeKondisiBg = '#065f46';
                  let badgeKondisiColor = '#34d399';
                  if (item.kondisi === 'Perlu Perbaikan') {
                    badgeKondisiBg = '#451a03';
                    badgeKondisiColor = '#fbbf24';
                  }
                  return \`
                  <tr>
                    <td><strong>\${item.nama}</strong><br><span style="font-size:11px; color:var(--text-muted);">\${item.deskripsi || '-'}</span></td>
                    <td><span class="badge" style="background:#1e3a8a; color:#93c5fd;">\${item.kategori || '-'}</span></td>
                    <td><span class="badge" style="background:#0f172a; color:#38bdf8; border:1px solid #0284c7; font-family:monospace;">\${ik}</span></td>
                    <td><span class="badge" style="background:\${badgeKondisiBg}; color:\${badgeKondisiColor}; font-weight:600;">\${item.kondisi || 'Baik'}</span></td>
                    <td><span style="font-size:12px; color:#cbd5e1;">\${item.lokasi || '-'}</span></td>
                    <td>
                      <button class="btn btn-outline" style="padding:4px 8px; font-size:11px;" onclick="openEditModal('infrastrukturDesa', \${item.id})">Edit</button>
                      <button class="btn btn-danger" style="padding:4px 8px; font-size:11px;" onclick="deleteItem('infrastrukturDesa', \${item.id})">Hapus</button>
                    </td>
                  </tr>
                  \`;
                }).join('')}
              </tbody>
            </table>
          </div>
        \`;
      } else if (currentView === 'potensiDesa') {
        titleEl.innerText = 'Potensi Desa (Collection Type)';
        actionEl.innerHTML = '<button class="btn btn-primary" onclick="openCreateModal(\\'potensiDesa\\')">+ Tambah Potensi Baru</button>';
        const list = dbState.potensiDesa || [];
        contentEl.innerHTML = \`
          <div class="panel">
            <table>
              <thead>
                <tr>
                  <th>Judul Potensi</th>
                  <th>Komoditas Utama</th>
                  <th>Lokasi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                \${list.map((item) => \`
                  <tr>
                    <td><strong>\${item.judul}</strong></td>
                    <td>\${item.komoditas_utama || '-'}</td>
                    <td>\${item.lokasi || 'Desa Plantungan'}</td>
                    <td>
                      <button class="btn btn-outline" style="padding:4px 8px; font-size:11px;" onclick="openEditModal('potensiDesa', \${item.id})">Edit</button>
                      <button class="btn btn-danger" style="padding:4px 8px; font-size:11px;" onclick="deleteItem('potensiDesa', \${item.id})">Hapus</button>
                    </td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>
        \`;
      } else if (currentView === 'berita') {
        titleEl.innerText = 'Berita & Warta Desa (Collection Type)';
        actionEl.innerHTML = '<button class="btn btn-primary" onclick="openCreateModal(\\'berita\\')">+ Tulis Berita Baru</button>';
        const list = dbState.berita || [];
        contentEl.innerHTML = \`
          <div class="panel">
            <table>
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Judul Artikel</th>
                  <th>Kategori</th>
                  <th>Tanggal</th>
                  <th>Penulis</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                \${list.map((item) => \`
                  <tr>
                    <td><img src="\${item.thumbnail}" class="thumb-img"></td>
                    <td><strong>\${item.judul}</strong></td>
                    <td><span class="badge">\${item.kategori}</span></td>
                    <td>\${item.tanggal_publikasi}</td>
                    <td>\${item.penulis || 'Admin'}</td>
                    <td>
                      <button class="btn btn-outline" style="padding:4px 8px; font-size:11px;" onclick="openEditModal('berita', \${item.id})">Edit</button>
                      <button class="btn btn-danger" style="padding:4px 8px; font-size:11px;" onclick="deleteItem('berita', \${item.id})">Hapus</button>
                    </td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>
        \`;
      } else if (currentView === 'programKKN') {
        titleEl.innerText = 'Program KKN Mahasiswa 2025 (Collection Type)';
        actionEl.innerHTML = '<button class="btn btn-primary" onclick="openCreateModal(\\'programKKN\\')">+ Tambah Kegiatan KKN</button>';
        const list = dbState.programKKN || [];
        contentEl.innerHTML = \`
          <div class="panel">
            <table>
              <thead>
                <tr>
                  <th>Dokumentasi</th>
                  <th>Judul Program Kerja</th>
                  <th>Divisi</th>
                  <th>Jumlah Anggota</th>
                  <th>Rentang Tanggal Pelaksanaan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                \${list.map((item) => {
                  const st = item.status || 'Selesai';
                  let stBg = '#065f46';
                  let stColor = '#34d399';
                  if (st === 'Sedang Berjalan') {
                    stBg = '#0c4a6e';
                    stColor = '#38bdf8';
                  } else if (st === 'Rencana') {
                    stBg = '#451a03';
                    stColor = '#fbbf24';
                  }
                  const galeri = Array.isArray(item.galeri) && item.galeri.length > 0 ? item.galeri : (item.dokumentasi ? [item.dokumentasi] : []);
                  const mainPhoto = galeri[0] || item.dokumentasi || '';
                  const photoBadge = galeri.length > 1 ? ('<span style="position:absolute; bottom:2px; right:2px; background:rgba(0,0,0,0.8); color:#34d399; font-size:10px; padding:1px 5px; border-radius:4px; font-weight:700; border:1px solid #059669;">' + galeri.length + '</span>') : '';
                  
                  let dateDisplay = item.tanggal_pelaksanaan || '-';
                  if (item.tanggal_mulai && item.tanggal_selesai) {
                    dateDisplay = item.tanggal_mulai + ' s/d ' + item.tanggal_selesai;
                  } else if (item.tanggal_mulai) {
                    dateDisplay = item.tanggal_mulai;
                  }

                  return \`
                  <tr>
                    <td style="position:relative; width:65px;">
                      \${mainPhoto ? ('<img src="' + mainPhoto + '" class="thumb-img">' + photoBadge) : '<span style="font-size:11px; color:var(--text-muted);">-</span>'}
                    </td>
                    <td><strong>\${item.judul}</strong></td>
                    <td><span class="badge" style="background:#1e3a8a; color:#93c5fd;">\${item.divisi}</span></td>
                    <td><span class="badge" style="background:#0f172a; color:#38bdf8; border:1px solid #0284c7; font-weight:600;">\${item.jumlah_anggota || '-'}</span></td>
                    <td><span style="font-size:12px; color:#cbd5e1; font-weight:500;">\${dateDisplay}</span></td>
                    <td><span class="badge" style="background:\${stBg}; color:\${stColor}; font-weight:600;">\${st}</span></td>
                    <td>
                      <button class="btn btn-outline" style="padding:4px 8px; font-size:11px;" onclick="openEditModal('programKKN', \${item.id})">Edit</button>
                      <button class="btn btn-danger" style="padding:4px 8px; font-size:11px;" onclick="deleteItem('programKKN', \${item.id})">Hapus</button>
                    </td>
                  </tr>
                  \`;
                }).join('')}
              </tbody>
            </table>
          </div>
        \`;
      } else if (currentView === 'apbdes') {
        titleEl.innerText = 'Transparansi APBDes (Collection Type)';
        actionEl.innerHTML = '<button class="btn btn-primary" onclick="openCreateModal(\\'apbdes\\')">+ Tambah Tahun Anggaran</button>';
        const list = [...(dbState.apbdes || [])].sort((a, b) => {
          const diffYear = (Number(b.tahun) || 0) - (Number(a.tahun) || 0);
          if (diffYear !== 0) return diffYear;
          return (Number(b.id) || 0) - (Number(a.id) || 0);
        });
        contentEl.innerHTML = \`
          <div class="panel">
            <table>
              <thead>
                <tr>
                  <th>Tahun Anggaran</th>
                  <th>Total Pendapatan</th>
                  <th>Total Belanja (Pengeluaran)</th>
                  <th>Surplus / (Defisit)</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                \${list.map((item) => \`
                  <tr>
                    <td>
                      <strong>\${item.tahun}</strong>
                      \${item.keterangan ? \`<div style="font-size:11px; color:var(--text-muted); max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="\${item.keterangan}">\${item.keterangan}</div>\` : ''}
                    </td>
                    <td style="color:#34d399; font-weight:700;">Rp \${Number(item.pendapatan || 0).toLocaleString('id-ID')}</td>
                    <td style="color:#f87171; font-weight:700;">Rp \${Number(item.belanja || 0).toLocaleString('id-ID')}</td>
                    <td style="color:#60a5fa; font-weight:600;">Rp \${Number(item.surplus_defisit ?? ((item.pendapatan || 0) - (item.belanja || 0))).toLocaleString('id-ID')}</td>
                    <td><span class="badge">\${item.status_publikasi || 'Ditetapkan'}</span></td>
                    <td>
                      <button class="btn btn-outline" style="padding:4px 8px; font-size:11px;" onclick="openEditModal('apbdes', \${item.id})">Edit</button>
                      <button class="btn btn-danger" style="padding:4px 8px; font-size:11px;" onclick="deleteItem('apbdes', \${item.id})">Hapus</button>
                    </td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>
        \`;
      } else if (currentView === 'dataKependudukan') {
        titleEl.innerText = 'Data Kependudukan (Single Type)';
        actionEl.innerHTML = '<button class="btn btn-success" onclick="saveDataKependudukan()">Simpan Data Kependudukan</button>';
        const d = dbState.dataKependudukan || {};
        
        const listDusun = Array.isArray(d.distribusi_dusun) ? d.distribusi_dusun : [];
        const listUsia = Array.isArray(d.kelompok_usia) ? d.kelompok_usia : [];
        const listPendidikan = Array.isArray(d.tingkat_pendidikan) ? d.tingkat_pendidikan : [];
        const listPekerjaan = Array.isArray(d.mata_pencaharian) ? d.mata_pencaharian : [];

        // 1. Dusun Rows HTML (Tanpa KK)
        const rowsDusunHtml = listDusun.map(function(item) {
          const l = item.laki_laki !== undefined ? item.laki_laki : 0;
          const p = item.perempuan !== undefined ? item.perempuan : 0;
          const jiwa = item.jumlah_jiwa !== undefined ? item.jumlah_jiwa : (l + p);
          return '<div class="dusun-item-row" style="display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;">' +
            '<div style="flex:3;">' +
              '<input type="text" class="row-dusun-nama" value="' + (item.dusun || '') + '" placeholder="Nama Dusun..." style="width:100%; font-size:12px;" required>' +
            '</div>' +
            '<div style="flex:2;">' +
              '<input type="number" class="row-dusun-l" value="' + l + '" placeholder="Laki-Laki" style="width:100%; font-size:12px;" oninput="updateDusunRowAndTotals(this)" required>' +
            '</div>' +
            '<div style="flex:2;">' +
              '<input type="number" class="row-dusun-p" value="' + p + '" placeholder="Perempuan" style="width:100%; font-size:12px;" oninput="updateDusunRowAndTotals(this)" required>' +
            '</div>' +
            '<div style="flex:2;">' +
              '<input type="number" class="row-dusun-jiwa" value="' + jiwa + '" placeholder="Total Jiwa" style="width:100%; font-size:12px; background:#022c22; border:1px solid #059669; color:#34d399; font-weight:700;" readonly>' +
            '</div>' +
            '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.dusun-item-row\\x27).remove(); updateDusunTotals();" title="Hapus Dusun">Hapus</button>' +
          '</div>';
        }).join('');

        // 2. Usia Rows HTML (Hanya Rentang Usia & Total Jiwa)
        const rowsUsiaHtml = listUsia.map(function(item) {
          const total = item.jumlah !== undefined ? item.jumlah : ((item.laki_laki || 0) + (item.perempuan || 0));
          return '<div class="usia-item-row" style="display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;">' +
            '<div style="flex:3;">' +
              '<input type="text" class="row-usia-rentang" value="' + (item.rentang || '') + '" placeholder="Rentang Usia (misal: 0 - 5 Th)" style="width:100%; font-size:12px;" required>' +
            '</div>' +
            '<div style="flex:2;">' +
              '<input type="number" class="row-usia-jumlah" value="' + total + '" placeholder="Total Jiwa" style="width:100%; font-size:12px;" oninput="updateUsiaTotals()" required>' +
            '</div>' +
            '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.usia-item-row\\x27).remove(); updateUsiaTotals();" title="Hapus Usia">Hapus</button>' +
          '</div>';
        }).join('');

        // 3. Pendidikan Rows HTML
        const rowsPendidikanHtml = listPendidikan.map(function(item) {
          return '<div class="pendidikan-item-row" style="display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;">' +
            '<div style="flex:3;">' +
              '<input type="text" class="row-pendidikan-tingkat" value="' + (item.tingkat || '') + '" placeholder="Tingkat Pendidikan..." style="width:100%; font-size:12px;" required>' +
            '</div>' +
            '<div style="flex:2;">' +
              '<input type="number" class="row-pendidikan-jumlah" value="' + (item.jumlah || 0) + '" placeholder="Jumlah Warga" style="width:100%; font-size:12px;" oninput="updatePendidikanTotals()" required>' +
            '</div>' +
            '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.pendidikan-item-row\\x27).remove(); updatePendidikanTotals();" title="Hapus Pendidikan">Hapus</button>' +
          '</div>';
        }).join('');

        // 4. Pekerjaan Rows HTML
        const rowsPekerjaanHtml = listPekerjaan.map(function(item) {
          return '<div class="pekerjaan-item-row" style="display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;">' +
            '<div style="flex:3;">' +
              '<input type="text" class="row-pekerjaan-sektor" value="' + (item.sektor || '') + '" placeholder="Sektor Pekerjaan..." style="width:100%; font-size:12px;" required>' +
            '</div>' +
            '<div style="flex:2;">' +
              '<input type="number" class="row-pekerjaan-jumlah" value="' + (item.jumlah || 0) + '" placeholder="Jumlah Pekerja" style="width:100%; font-size:12px;" oninput="updatePekerjaanTotals()" required>' +
            '</div>' +
            '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.pekerjaan-item-row\\x27).remove(); updatePekerjaanTotals();" title="Hapus Pekerjaan">Hapus</button>' +
          '</div>';
        }).join('');

        contentEl.innerHTML = \`
          <!-- 1. Statistik Umum (Locked / Non-Editable) -->
          <div class="panel" style="margin-bottom: 20px; border: 1px solid #1e293b;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
              <h3 style="font-size:15px; font-weight:700; margin:0; color:var(--text-main);">Statistik Umum Kependudukan</h3>
              <span style="font-size:11px; color:#38bdf8; background:#0c4a6e; padding:3px 10px; border-radius:6px; border:1px solid #0284c7; font-weight:600;">Tidak Bisa Diedit (Tersinkron Otomatis dari Rincian Dusun)</span>
            </div>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:14px;">
              <div class="form-group" style="margin:0;">
                <label style="color:#34d399; font-weight:700; font-size:12px;">Total Penduduk (Jiwa)</label>
                <input type="number" id="dk-total" value="\${d.total_penduduk || 0}" readonly style="background:#022c22; border:1px solid #059669; color:#34d399; font-weight:700; cursor:not-allowed;">
              </div>
              <div class="form-group" style="margin:0;">
                <label style="color:#38bdf8; font-weight:700; font-size:12px;">Laki-Laki (Jiwa)</label>
                <input type="number" id="dk-l" value="\${d.laki_laki || 0}" readonly style="background:#082f49; border:1px solid #0284c7; color:#38bdf8; font-weight:700; cursor:not-allowed;">
              </div>
              <div class="form-group" style="margin:0;">
                <label style="color:#f43f5e; font-weight:700; font-size:12px;">Perempuan (Jiwa)</label>
                <input type="number" id="dk-p" value="\${d.perempuan || 0}" readonly style="background:#4c0519; border:1px solid #e11d48; color:#f43f5e; font-weight:700; cursor:not-allowed;">
              </div>
            </div>
          </div>

          <!-- 2. Rincian Dusun -->
          <div class="panel" style="margin-bottom: 20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div>
                <h3 style="font-size:15px; font-weight:700; margin:0; color:var(--text-main);">Rincian Distribusi Per Dusun</h3>
                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Daftar dusun, jumlah laki-laki, perempuan, dan total jiwa.</p>
              </div>
              <button type="button" class="btn btn-outline" style="font-size:11px; padding:5px 12px;" onclick="addDusunRow()">+ Tambah Dusun</button>
            </div>

            <div style="display:flex; gap:8px; padding:0 10px 6px 10px; font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">
              <div style="flex:3;">Nama Dusun</div>
              <div style="flex:2;">Laki-Laki</div>
              <div style="flex:2;">Perempuan</div>
              <div style="flex:2;">Total Jiwa</div>
              <div style="width:38px;"></div>
            </div>

            <div id="dk-dusun-rows">
              \${rowsDusunHtml}
            </div>

            <div style="margin-top:10px; padding:8px 12px; background:#0f172a; border:1px dashed var(--card-border); border-radius:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
              <span style="font-size:11px; color:var(--text-muted);">Akumulasi Dusun:</span>
              <div style="display:flex; gap:12px; font-size:11px;">
                <span style="color:#cbd5e1;">L: <strong id="calc-dusun-total-l" style="color:#38bdf8;">0</strong></span>
                <span style="color:#cbd5e1;">P: <strong id="calc-dusun-total-p" style="color:#f43f5e;">0</strong></span>
                <span style="color:#cbd5e1;">Jiwa: <strong id="calc-dusun-total-jiwa" style="color:#34d399;">0</strong></span>
              </div>
            </div>
          </div>

          <!-- 3. Rincian Kelompok Usia -->
          <div class="panel" style="margin-bottom: 20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div>
                <h3 style="font-size:15px; font-weight:700; margin:0; color:var(--text-main);">Rincian Kelompok Usia</h3>
                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Distribusi rentang usia dan total jiwa penduduk.</p>
              </div>
              <button type="button" class="btn btn-outline" style="font-size:11px; padding:5px 12px;" onclick="addUsiaRow()">+ Tambah Kelompok Usia</button>
            </div>

            <div style="display:flex; gap:8px; padding:0 10px 6px 10px; font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">
              <div style="flex:3;">Rentang Usia</div>
              <div style="flex:2;">Total Jiwa</div>
              <div style="width:38px;"></div>
            </div>

            <div id="dk-usia-rows">
              \${rowsUsiaHtml}
            </div>

            <div style="margin-top:10px; padding:8px 12px; background:#0f172a; border:1px dashed var(--card-border); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:11px; color:var(--text-muted);">Total Jiwa Kelompok Usia:</span>
              <strong id="calc-usia-total" style="font-size:12px; color:#38bdf8;">0 Jiwa</strong>
            </div>
          </div>

          <!-- Grid 2 Kolom: Pendidikan & Sektor Mata Pencaharian -->
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
            
            <!-- 4. Rincian Tingkat Pendidikan -->
            <div class="panel">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                <div>
                  <h3 style="font-size:14px; font-weight:700; margin:0; color:var(--text-main);">Rincian Tingkat Pendidikan</h3>
                  <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Jenjang pendidikan warga desa.</p>
                </div>
                <button type="button" class="btn btn-outline" style="font-size:11px; padding:4px 10px;" onclick="addPendidikanRow()">+ Tambah</button>
              </div>

              <div style="display:flex; gap:8px; padding:0 10px 6px 10px; font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">
                <div style="flex:3;">Tingkat Pendidikan</div>
                <div style="flex:2;">Jumlah (Jiwa)</div>
                <div style="width:38px;"></div>
              </div>

              <div id="dk-pendidikan-rows">
                \${rowsPendidikanHtml}
              </div>

              <div style="margin-top:10px; padding:8px 12px; background:#0f172a; border:1px dashed var(--card-border); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:11px; color:var(--text-muted);">Total Terdata Pendidikan:</span>
                <strong id="calc-pendidikan-total" style="font-size:12px; color:#fbbf24;">0 Warga</strong>
              </div>
            </div>

            <!-- 5. Rincian Sektor Mata Pencaharian -->
            <div class="panel">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                <div>
                  <h3 style="font-size:14px; font-weight:700; margin:0; color:var(--text-main);">Sektor Mata Pencaharian Penduduk</h3>
                  <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Sektor profesi & lapangan kerja warga.</p>
                </div>
                <button type="button" class="btn btn-outline" style="font-size:11px; padding:4px 10px;" onclick="addPekerjaanRow()">+ Tambah</button>
              </div>

              <div style="display:flex; gap:8px; padding:0 10px 6px 10px; font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">
                <div style="flex:3;">Sektor Pekerjaan</div>
                <div style="flex:2;">Jumlah (Jiwa)</div>
                <div style="width:38px;"></div>
              </div>

              <div id="dk-pekerjaan-rows">
                \${rowsPekerjaanHtml}
              </div>

              <div style="margin-top:10px; padding:8px 12px; background:#0f172a; border:1px dashed var(--card-border); border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:11px; color:var(--text-muted);">Total Tenaga Kerja:</span>
                <strong id="calc-pekerjaan-total" style="font-size:12px; color:#34d399;">0 Pekerja</strong>
              </div>
            </div>

          </div>
        \`;
        setTimeout(() => {
          updateDusunTotals();
          updateUsiaTotals();
          updatePendidikanTotals();
          updatePekerjaanTotals();
        }, 50);
      } else if (currentView === 'pesan') {
        titleEl.innerText = 'Kotak Aspirasi & Pesan Warga';
        actionEl.innerHTML = '';
        const list = dbState.pesanMasyarakat || [];
        contentEl.innerHTML = \`
          <div class="panel">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:8px;">
              <div>
                <h3 style="font-size:15px; font-weight:700; margin:0; color:var(--text-main);">Daftar Aspirasi & Pesan Warga (\${list.length})</h3>
                <p style="font-size:11px; color:var(--text-muted); margin-top:2px;">Aspirasi, pengaduan, dan saran yang dikirim masyarakat secara online.</p>
              </div>
            </div>
            \${list.length === 0 ? '<p style="color:var(--text-muted); text-align:center; padding:40px;">Belum ada pesan dari warga.</p>' : \`
              <table>
                <thead>
                  <tr>
                    <th>Pengirim</th>
                    <th>Kontak</th>
                    <th>Kategori</th>
                    <th>Isi Pesan</th>
                    <th>Tanggal Masuk</th>
                    <th style="width:140px;">Status</th>
                    <th style="width:80px; text-align:center;">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  \${list.map((m) => {
                    const st = m.status || 'Baru';
                    let selectStyle = 'background:#451a03; color:#fbbf24; border:1px solid #d97706;';
                    if (st === 'Diproses') {
                      selectStyle = 'background:#0c4a6e; color:#38bdf8; border:1px solid #0284c7;';
                    } else if (st === 'Selesai') {
                      selectStyle = 'background:#022c22; color:#34d399; border:1px solid #059669;';
                    }
                    return \`
                    <tr>
                      <td><strong>\${m.nama}</strong></td>
                      <td>
                        <div style="font-size:12px;">\${m.telepon || ''}</div>
                        <div style="font-size:11px; color:var(--text-muted); font-family:monospace;">\${m.email || '-'}</div>
                      </td>
                      <td><span class="badge" style="background:#1e1b4b; color:#a5b4fc; border:1px solid #4338ca;">\${m.subjek}</span></td>
                      <td style="max-width:320px; font-size:12px; line-height:1.4;">\${m.pesan}</td>
                      <td style="font-size:11px; color:var(--text-muted); white-space:nowrap;">\${new Date(m.createdAt).toLocaleString('id-ID')}</td>
                      <td>
                        <select onchange="updatePesanStatus(\${m.id}, this.value)" style="width:100%; font-size:11px; padding:5px 8px; border-radius:6px; font-weight:700; cursor:pointer; \${selectStyle}">
                          <option value="Baru" \${st === 'Baru' ? 'selected' : ''} style="background:#0f172a; color:#fbbf24;">Baru</option>
                          <option value="Diproses" \${st === 'Diproses' ? 'selected' : ''} style="background:#0f172a; color:#38bdf8;">Diproses</option>
                          <option value="Selesai" \${st === 'Selesai' ? 'selected' : ''} style="background:#0f172a; color:#34d399;">Selesai</option>
                        </select>
                      </td>
                      <td style="text-align:center;">
                        <button class="btn btn-danger" style="padding:4px 8px; font-size:11px;" onclick="deletePesan(\${m.id})" title="Hapus Pesan">Hapus</button>
                      </td>
                    </tr>
                    \`;
                  }).join('')}
                </tbody>
              </table>
            \`}
          </div>
        \`;
      }
    }

    function updateDusunRowAndTotals(inputEl) {
      const row = inputEl.closest('.dusun-item-row');
      if (row) {
        const l = parseInt(row.querySelector('.row-dusun-l')?.value) || 0;
        const p = parseInt(row.querySelector('.row-dusun-p')?.value) || 0;
        const jiwaEl = row.querySelector('.row-dusun-jiwa');
        if (jiwaEl) jiwaEl.value = l + p;
      }
      updateDusunTotals();
    }

    function updateDusunTotals() {
      let sumL = 0;
      let sumP = 0;
      let sumJiwa = 0;
      let sumKK = 0;
      document.querySelectorAll('#dk-dusun-rows .dusun-item-row').forEach(row => {
        const l = parseInt(row.querySelector('.row-dusun-l')?.value) || 0;
        const p = parseInt(row.querySelector('.row-dusun-p')?.value) || 0;
        let j = parseInt(row.querySelector('.row-dusun-jiwa')?.value) || 0;
        if (l + p > 0 || (l === 0 && p === 0 && j === 0)) {
          j = l + p;
          const jEl = row.querySelector('.row-dusun-jiwa');
          if (jEl) jEl.value = j;
        }
        sumL += l;
        sumP += p;
        sumJiwa += j;
      });

      // Update non-editable Statistik Umum inputs
      const totalInput = document.getElementById('dk-total');
      if (totalInput) totalInput.value = sumJiwa;

      const lInput = document.getElementById('dk-l');
      if (lInput) lInput.value = sumL;

      const pInput = document.getElementById('dk-p');
      if (pInput) pInput.value = sumP;

      // Update Dusun indicator badge
      const lEl = document.getElementById('calc-dusun-total-l');
      if (lEl) lEl.innerText = sumL.toLocaleString('id-ID') + ' L';
      const pEl = document.getElementById('calc-dusun-total-p');
      if (pEl) pEl.innerText = sumP.toLocaleString('id-ID') + ' P';
      const jiwaEl = document.getElementById('calc-dusun-total-jiwa');
      if (jiwaEl) jiwaEl.innerText = sumJiwa.toLocaleString('id-ID') + ' Jiwa';
    }

    function addDusunRow(dusun, laki, perem, jiwa) {
      const container = document.getElementById('dk-dusun-rows');
      if (!container) return;
      dusun = dusun || '';
      laki = laki !== undefined ? laki : 0;
      perem = perem !== undefined ? perem : 0;
      jiwa = jiwa !== undefined ? jiwa : (laki + perem);
      const div = document.createElement('div');
      div.className = 'dusun-item-row';
      div.style.cssText = 'display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;';
      div.innerHTML = '<div style="flex:3;">' +
          '<input type="text" class="row-dusun-nama" value="' + dusun + '" placeholder="Nama Dusun..." style="width:100%; font-size:12px;" required>' +
        '</div>' +
        '<div style="flex:2;">' +
          '<input type="number" class="row-dusun-l" value="' + laki + '" placeholder="Laki-Laki" style="width:100%; font-size:12px;" oninput="updateDusunRowAndTotals(this)" required>' +
        '</div>' +
        '<div style="flex:2;">' +
          '<input type="number" class="row-dusun-p" value="' + perem + '" placeholder="Perempuan" style="width:100%; font-size:12px;" oninput="updateDusunRowAndTotals(this)" required>' +
        '</div>' +
        '<div style="flex:2;">' +
          '<input type="number" class="row-dusun-jiwa" value="' + jiwa + '" placeholder="Total Jiwa" style="width:100%; font-size:12px; background:#022c22; border:1px solid #059669; color:#34d399; font-weight:700;" readonly>' +
        '</div>' +
        '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.dusun-item-row\\x27).remove(); updateDusunTotals();" title="Hapus Dusun">Hapus</button>';
      container.appendChild(div);
      updateDusunTotals();
    }

    function updateUsiaTotals() {
      let sumUsia = 0;
      document.querySelectorAll('#dk-usia-rows .row-usia-jumlah').forEach(el => {
        sumUsia += parseInt(el.value) || 0;
      });
      const el = document.getElementById('calc-usia-total');
      if (el) el.innerText = sumUsia.toLocaleString('id-ID') + ' Jiwa';
    }

    function addUsiaRow(rentang, jumlah) {
      const container = document.getElementById('dk-usia-rows');
      if (!container) return;
      rentang = rentang || '';
      jumlah = jumlah !== undefined ? jumlah : 0;
      const div = document.createElement('div');
      div.className = 'usia-item-row';
      div.style.cssText = 'display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;';
      div.innerHTML = '<div style="flex:3;">' +
          '<input type="text" class="row-usia-rentang" value="' + rentang + '" placeholder="Rentang Usia (misal: 0 - 5 Th)" style="width:100%; font-size:12px;" required>' +
        '</div>' +
        '<div style="flex:2;">' +
          '<input type="number" class="row-usia-jumlah" value="' + jumlah + '" placeholder="Total Jiwa" style="width:100%; font-size:12px;" oninput="updateUsiaTotals()" required>' +
        '</div>' +
        '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.usia-item-row\\x27).remove(); updateUsiaTotals();" title="Hapus Usia">Hapus</button>';
      container.appendChild(div);
      updateUsiaTotals();
    }

    function updatePendidikanTotals() {
      let sumPnd = 0;
      document.querySelectorAll('#dk-pendidikan-rows .row-pendidikan-jumlah').forEach(el => {
        sumPnd += parseInt(el.value) || 0;
      });
      const el = document.getElementById('calc-pendidikan-total');
      if (el) el.innerText = sumPnd.toLocaleString('id-ID') + ' Warga';
    }

    function addPendidikanRow(tingkat, jumlah) {
      const container = document.getElementById('dk-pendidikan-rows');
      if (!container) return;
      tingkat = tingkat || '';
      jumlah = jumlah !== undefined ? jumlah : 0;
      const div = document.createElement('div');
      div.className = 'pendidikan-item-row';
      div.style.cssText = 'display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;';
      div.innerHTML = '<div style="flex:3;">' +
          '<input type="text" class="row-pendidikan-tingkat" value="' + tingkat + '" placeholder="Tingkat Pendidikan..." style="width:100%; font-size:12px;" required>' +
        '</div>' +
        '<div style="flex:2;">' +
          '<input type="number" class="row-pendidikan-jumlah" value="' + jumlah + '" placeholder="Jumlah Warga" style="width:100%; font-size:12px;" oninput="updatePendidikanTotals()" required>' +
        '</div>' +
        '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.pendidikan-item-row\\x27).remove(); updatePendidikanTotals();" title="Hapus Pendidikan">Hapus</button>';
      container.appendChild(div);
      updatePendidikanTotals();
    }

    function updatePekerjaanTotals() {
      let sumPkr = 0;
      document.querySelectorAll('#dk-pekerjaan-rows .row-pekerjaan-jumlah').forEach(el => {
        sumPkr += parseInt(el.value) || 0;
      });
      const el = document.getElementById('calc-pekerjaan-total');
      if (el) el.innerText = sumPkr.toLocaleString('id-ID') + ' Pekerja';
    }

    function addPekerjaanRow(sektor, jumlah) {
      const container = document.getElementById('dk-pekerjaan-rows');
      if (!container) return;
      sektor = sektor || '';
      jumlah = jumlah !== undefined ? jumlah : 0;
      const div = document.createElement('div');
      div.className = 'pekerjaan-item-row';
      div.style.cssText = 'display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;';
      div.innerHTML = '<div style="flex:3;">' +
          '<input type="text" class="row-pekerjaan-sektor" value="' + sektor + '" placeholder="Sektor Pekerjaan..." style="width:100%; font-size:12px;" required>' +
        '</div>' +
        '<div style="flex:2;">' +
          '<input type="number" class="row-pekerjaan-jumlah" value="' + jumlah + '" placeholder="Jumlah Pekerja" style="width:100%; font-size:12px;" oninput="updatePekerjaanTotals()" required>' +
        '</div>' +
        '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.pekerjaan-item-row\\x27).remove(); updatePekerjaanTotals();" title="Hapus Sektor">Hapus</button>';
      container.appendChild(div);
      updatePekerjaanTotals();
    }

    async function saveProfilDesa() {
      if (!dbState.profilDesa) dbState.profilDesa = {};
      if (document.getElementById('p-nama-desa')) dbState.profilDesa.nama_desa = document.getElementById('p-nama-desa').value.trim();
      if (document.getElementById('p-nama-kades')) dbState.profilDesa.nama_kades = document.getElementById('p-nama-kades').value.trim();
      if (document.getElementById('p-alamat')) dbState.profilDesa.alamat = document.getElementById('p-alamat').value.trim();
      if (document.getElementById('p-email')) dbState.profilDesa.email = document.getElementById('p-email').value.trim();
      if (document.getElementById('p-telepon')) dbState.profilDesa.telepon = document.getElementById('p-telepon').value.trim();
      if (document.getElementById('p-logo')) dbState.profilDesa.logo = document.getElementById('p-logo').value.trim();
      if (document.getElementById('p-foto-kades')) dbState.profilDesa.foto_kades = document.getElementById('p-foto-kades').value.trim();
      if (document.getElementById('p-foto-desa')) dbState.profilDesa.foto_desa = document.getElementById('p-foto-desa').value.trim();
      if (document.getElementById('p-foto-kantor')) dbState.profilDesa.foto_kantor = document.getElementById('p-foto-kantor').value.trim();

      await fetch('/api/cms-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profilDesa: dbState.profilDesa })
      });
      showToast('Profil & Kontak Desa Berhasil Disimpan!');
      await loadData();
    }

    async function saveDataKependudukan() {
      if (!dbState.dataKependudukan) dbState.dataKependudukan = {};

      // 1. Dusun
      const dusunRows = document.querySelectorAll('#dk-dusun-rows .dusun-item-row');
      const distribusi_dusun = [];
      let sumL = 0, sumP = 0, sumJiwa = 0;
      dusunRows.forEach(r => {
        const nama = r.querySelector('.row-dusun-nama')?.value?.trim();
        const l = parseInt(r.querySelector('.row-dusun-l')?.value) || 0;
        const p = parseInt(r.querySelector('.row-dusun-p')?.value) || 0;
        const j = (l + p > 0) ? (l + p) : (parseInt(r.querySelector('.row-dusun-jiwa')?.value) || 0);
        if (nama) {
          distribusi_dusun.push({ dusun: nama, laki_laki: l, perempuan: p, jumlah_jiwa: j });
          sumL += l;
          sumP += p;
          sumJiwa += j;
        }
      });
      dbState.dataKependudukan.distribusi_dusun = distribusi_dusun;
      dbState.dataKependudukan.total_penduduk = sumJiwa;
      dbState.dataKependudukan.laki_laki = sumL;
      dbState.dataKependudukan.perempuan = sumP;

      // 2. Usia (Hanya Rentang & Jumlah)
      const usiaRows = document.querySelectorAll('#dk-usia-rows .usia-item-row');
      const kelompok_usia = [];
      usiaRows.forEach(r => {
        const rentang = r.querySelector('.row-usia-rentang')?.value?.trim();
        const j = parseInt(r.querySelector('.row-usia-jumlah')?.value) || 0;
        if (rentang) {
          kelompok_usia.push({ rentang: rentang, jumlah: j });
        }
      });
      dbState.dataKependudukan.kelompok_usia = kelompok_usia;

      // 3. Pendidikan
      const pndRows = document.querySelectorAll('#dk-pendidikan-rows .pendidikan-item-row');
      const tingkat_pendidikan = [];
      let sumPnd = 0;
      pndRows.forEach(r => {
        const t = r.querySelector('.row-pendidikan-tingkat')?.value?.trim();
        const j = parseInt(r.querySelector('.row-pendidikan-jumlah')?.value) || 0;
        if (t) {
          tingkat_pendidikan.push({ tingkat: t, jumlah: j });
          sumPnd += j;
        }
      });
      tingkat_pendidikan.forEach(item => {
        item.persentase = sumPnd > 0 ? Number(((item.jumlah / sumPnd) * 100).toFixed(1)) : 0;
      });
      dbState.dataKependudukan.tingkat_pendidikan = tingkat_pendidikan;

      // 4. Mata Pencaharian
      const pkrRows = document.querySelectorAll('#dk-pekerjaan-rows .pekerjaan-item-row');
      const mata_pencaharian = [];
      let sumPkr = 0;
      pkrRows.forEach(r => {
        const s = r.querySelector('.row-pekerjaan-sektor')?.value?.trim();
        const j = parseInt(r.querySelector('.row-pekerjaan-jumlah')?.value) || 0;
        if (s) {
          mata_pencaharian.push({ sektor: s, jumlah: j });
          sumPkr += j;
        }
      });
      mata_pencaharian.forEach(item => {
        item.persentase = sumPkr > 0 ? Number(((item.jumlah / sumPkr) * 100).toFixed(1)) : 0;
      });
      dbState.dataKependudukan.mata_pencaharian = mata_pencaharian;

      await fetch('/api/cms-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataKependudukan: dbState.dataKependudukan })
      });
      showToast('Data kependudukan & statistik berhasil disimpan!');
      await loadData();
    }

    let editingCollection = null;
    let editingId = null;

    function openCreateModal(collection) {
      editingCollection = collection;
      editingId = null;
      document.getElementById('modal-title').innerText = 'Tambah Data Baru';
      const fields = getFieldsForCollection(collection, {});
      document.getElementById('modal-fields').innerHTML = fields;
      document.getElementById('crud-modal').style.display = 'flex';
      if (collection === 'apbdes') updateApbCalculations();
    }

    function openEditModal(collection, id) {
      editingCollection = collection;
      editingId = id;
      document.getElementById('modal-title').innerText = 'Edit Data #' + id;
      const item = dbState[collection].find(x => x.id === id);
      const fields = getFieldsForCollection(collection, item || {});
      document.getElementById('modal-fields').innerHTML = fields;
      document.getElementById('crud-modal').style.display = 'flex';
      if (collection === 'apbdes') updateApbCalculations();
    }

    function closeModal() {
      document.getElementById('crud-modal').style.display = 'none';
    }

    function getFieldsForCollection(col, data) {
      if (col === 'potensiDesa') {
        return \`
          <div class="form-group"><label>Judul Potensi</label><input type="text" name="judul" value="\${data.judul || ''}" required></div>
          
          <div class="form-group"><label>Komoditas / Produk Utama</label><input type="text" name="komoditas_utama" value="\${data.komoditas_utama || ''}" placeholder="contoh: Tebu, Padi, Jagung / Minyak Atsiri"></div>
          <div class="form-group"><label>Pengelola / Lembaga Terkait</label><input type="text" name="kontak_pengelola" value="\${data.kontak_pengelola || ''}" placeholder="contoh: Kelompok Tani / BUMDes Plantungan SA3"></div>
          <div class="form-group"><label>Lokasi Wilayah</label><input type="text" name="lokasi" value="\${data.lokasi || ''}" placeholder="contoh: Wilayah Persawahan / Desa Plantungan"></div>
          <div class="form-group"><label>Deskripsi & Ulasan Potensi</label><textarea name="deskripsi" rows="5" placeholder="Penjelasan mengenai potensi dan keterkaitannya dengan perekonomian warga desa...">\${data.deskripsi || ''}</textarea></div>
        \`;
      } else if (col === 'infrastrukturDesa') {
        const ik = data.ikon || 'home';
        const kd = data.kondisi || 'Baik';
        return \`
          <div class="form-group"><label>Nama Sarana / Fasilitas / Infrastruktur</label><input type="text" name="nama" value="\${data.nama || ''}" placeholder="contoh: Balai Desa / SDN Plantungan / Masjid" required></div>
          <div class="form-group"><label>Kategori</label><input type="text" name="kategori" value="\${data.kategori || ''}" placeholder="contoh: Pemerintahan / Pendidikan / Keagamaan / Kesehatan / Fasilitas Umum" required></div>
          <div class="form-group">
            <label>Ikon Feather (Pilih Ikon Sesuai Jenis Fasilitas)</label>
            <select name="ikon" style="width:100%; font-size:13px; padding:8px 12px; border-radius:8px; background:#0f172a; color:#38bdf8; border:1px solid #334155; font-weight:600;">
              <option value="home" \${ik==='home'?'selected':''}>home (Gedung / Balai Desa / Kantor)</option>
              <option value="book-open" \${ik==='book-open'?'selected':''}>book-open (Pendidikan / Sekolah / Perpustakaan)</option>
              <option value="moon" \${ik==='moon'?'selected':''}>moon (Keagamaan / Masjid / Musholla)</option>
              <option value="activity" \${ik==='activity'?'selected':''}>activity (Kesehatan / Posyandu / Polindes)</option>
              <option value="tool" \${ik==='tool'?'selected':''}>tool (Jalan / Jembatan / Irigasi / Fisik)</option>
              <option value="layers" \${ik==='layers'?'selected':''}>layers (Sarana Umum / Lapangan / Balai Warga)</option>
              <option value="map-pin" \${ik==='map-pin'?'selected':''}>map-pin (Lokasi Wisata / Titik Khusus)</option>
              <option value="shield" \${ik==='shield'?'selected':''}>shield (Keamanan / Pos Kamling)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Kondisi Fasilitas</label>
            <select name="kondisi" style="width:100%; font-size:13px; padding:8px 12px; border-radius:8px; background:#0f172a; color:#34d399; border:1px solid #059669; font-weight:600;">
              <option value="Sangat Baik" \${kd==='Sangat Baik'?'selected':''}>Sangat Baik</option>
              <option value="Baik" \${kd==='Baik'?'selected':''}>Baik</option>
              <option value="Perlu Perbaikan" \${kd==='Perlu Perbaikan'?'selected':''}>Perlu Perbaikan</option>
            </select>
          </div>
          <div class="form-group"><label>Lokasi Fasilitas</label><input type="text" name="lokasi" value="\${data.lokasi || ''}" placeholder="contoh: Dusun Krajan / Kompleks Balai Desa"></div>
          <div class="form-group"><label>Deskripsi Sarana / Fasilitas</label><textarea name="deskripsi" rows="3" placeholder="Jelaskan fungsi atau peranan fasilitas ini...">\${data.deskripsi || ''}</textarea></div>
        \`;
      } else if (col === 'berita') {
        const standardCats = ['Pemerintahan', 'Kegiatan Warga', 'Pengumuman', 'Kesehatan & Posyandu'];
        const currentCat = data.kategori || 'Pemerintahan';
        const isCustom = Boolean(currentCat && !standardCats.includes(currentCat));
        return \`
          <div class="form-group"><label>Judul Berita</label><input type="text" name="judul" value="\${data.judul || ''}" required></div>
          <div class="form-group"><label>Slug URL</label><input type="text" name="slug" value="\${data.slug || ''}" required></div>
          <div class="form-group">
            <label>Kategori Berita</label>
            <select name="kategori_select" id="m-berita-kat-select" onchange="toggleBeritaKategoriCustom(this.value)" style="width:100%; font-size:13px; padding:8px 12px; border-radius:8px; background:#0f172a; color:#f8fafc; border:1px solid #334155;">
              <option value="Pemerintahan" \${!isCustom && currentCat==='Pemerintahan'?'selected':''}>Pemerintahan</option>
              <option value="Kegiatan Warga" \${!isCustom && currentCat==='Kegiatan Warga'?'selected':''}>Kegiatan Warga</option>
              <option value="Pengumuman" \${!isCustom && currentCat==='Pengumuman'?'selected':''}>Pengumuman</option>
              <option value="Kesehatan & Posyandu" \${!isCustom && currentCat==='Kesehatan & Posyandu'?'selected':''}>Kesehatan & Posyandu</option>
              <option value="Lainnya" \${isCustom?'selected':''}>+ Lainnya (Ketik Sendiri...)</option>
            </select>
          </div>
          <div class="form-group" id="m-berita-kat-custom-box" style="display:\${isCustom ? 'block' : 'none'}; background:#0b1329; padding:10px 12px; border-radius:8px; border:1px solid #1e293b; margin-top:-6px; margin-bottom:12px;">
            <label style="color:#38bdf8; font-size:12px; margin-bottom:4px; display:block; font-weight:600;">Ketik Kategori Kustom Anda:</label>
            <input type="text" name="kategori_custom" id="m-berita-kat-custom" value="\${isCustom ? currentCat : ''}" placeholder="contoh: Pertanian / Inovasi Desa / UMKM / Olahraga" style="width:100%; font-size:13px;">
          </div>
          <div class="form-group"><label>Tanggal Publikasi</label><input type="date" name="tanggal_publikasi" value="\${data.tanggal_publikasi || new Date().toISOString().split('T')[0]}"></div>
          <div class="form-group">
            <label>Thumbnail Foto</label>
            <div style="display:flex; gap:8px;">
              <input type="text" id="m-berita-thumb" name="thumbnail" value="\${data.thumbnail || ''}">
              <label class="upload-inline-btn" style="margin:0; display:flex; align-items:center;">
                Upload Foto
                <input type="file" style="display:none;" onchange="handleFileUpload(this.files[0], 'm-berita-thumb')">
              </label>
            </div>
          </div>
          <div class="form-group"><label>Ringkasan</label><textarea name="ringkasan" rows="2">\${data.ringkasan || ''}</textarea></div>
          <div class="form-group"><label>Konten Lengkap</label><textarea name="konten" rows="5">\${data.konten || ''}</textarea></div>
        \`;
      } else if (col === 'programKKN') {
        const st = data.status || 'Selesai';
        let badgeStyle = 'background:#065f46; color:#34d399; border:1px solid #059669;';
        let selectStyle = 'background:#065f46; color:#34d399; border:1px solid #059669;';
        if (st === 'Sedang Berjalan') {
          badgeStyle = 'background:#0c4a6e; color:#38bdf8; border:1px solid #0284c7;';
          selectStyle = 'background:#0c4a6e; color:#38bdf8; border:1px solid #0284c7;';
        } else if (st === 'Rencana') {
          badgeStyle = 'background:#451a03; color:#fbbf24; border:1px solid #d97706;';
          selectStyle = 'background:#451a03; color:#fbbf24; border:1px solid #d97706;';
        }

        const galeri = Array.isArray(data.galeri) && data.galeri.length > 0
          ? data.galeri
          : (data.dokumentasi ? [data.dokumentasi] : []);

        const photoRowsHtml = galeri.map(function(url, idx) {
          const uid = 'kkn-photo-' + Date.now() + '-' + idx;
          return '<div class="kkn-photo-item" style="display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;">' +
            '<img src="' + url + '" id="' + uid + '-preview" style="width:42px; height:42px; border-radius:6px; object-fit:cover; border:1px solid #334155; flex-shrink:0;">' +
            '<input type="text" class="row-kkn-photo" id="' + uid + '" value="' + url + '" placeholder="URL Foto Dokumentasi..." style="flex:1; font-size:12px;" required oninput="document.getElementById(\\x27' + uid + '-preview\\x27).src = this.value">' +
            '<label class="upload-inline-btn" style="margin:0; font-size:11px; padding:5px 8px; white-space:nowrap; cursor:pointer;">' +
              'Ganti' +
              '<input type="file" style="display:none;" onchange="handleFileUpload(this.files[0], \\x27' + uid + '\\x27)">' +
            '</label>' +
            '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.kkn-photo-item\\x27).remove()" title="Hapus Foto">Hapus</button>' +
          '</div>';
        }).join('');

        return \`
          <div class="form-group"><label>Judul Program KKN</label><input type="text" name="judul" value="\${data.judul || ''}" required></div>
          <div class="form-group"><label>Divisi</label><input type="text" name="divisi" value="\${data.divisi || ''}" required></div>
          <div class="form-group">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <label style="margin:0;">Status Kegiatan</label>
              <span id="kkn-status-preview-badge" style="padding:2px 10px; border-radius:9999px; font-size:11px; font-weight:700; \${badgeStyle}">\${st}</span>
            </div>
            <select name="status" id="m-kkn-status" onchange="updateKknStatusBadgePreview(this.value)" style="width:100%; font-size:13px; padding:8px 12px; border-radius:8px; font-weight:700; cursor:pointer; \${selectStyle}">
              <option value="Selesai" \${st==='Selesai'?'selected':''} style="background:#0f172a; color:#34d399;">Selesai (Hijau)</option>
              <option value="Sedang Berjalan" \${st==='Sedang Berjalan'?'selected':''} style="background:#0f172a; color:#38bdf8;">Sedang Berjalan (Biru)</option>
              <option value="Rencana" \${st==='Rencana'?'selected':''} style="background:#0f172a; color:#fbbf24;">Rencana (Kuning/Amber)</option>
            </select>
          </div>

          <!-- Tanggal Pelaksanaan (Dari tanggal sekian ke sekian) -->
          <div class="form-group" style="background:#0b1329; padding:12px; border-radius:10px; border:1px solid #1e293b; margin-bottom:14px;">
            <label style="color:#38bdf8; font-weight:700; margin-bottom:8px; display:block;">Rentang Tanggal Pelaksanaan Kegiatan</label>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div>
                <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:4px;">Dari Tanggal (Mulai):</label>
                <input type="date" name="tanggal_mulai" id="m-kkn-tgl-mulai" value="\${data.tanggal_mulai || data.tanggal_pelaksanaan || ''}" style="width:100%;">
              </div>
              <div>
                <label style="font-size:11px; color:#94a3b8; display:block; margin-bottom:4px;">Sampai Tanggal (Selesai):</label>
                <input type="date" name="tanggal_selesai" id="m-kkn-tgl-selesai" value="\${data.tanggal_selesai || ''}" style="width:100%;">
              </div>
            </div>
          </div>

          <div class="form-group"><label>Lokasi Kegiatan</label><input type="text" name="lokasi_kegiatan" value="\${data.lokasi_kegiatan || ''}" placeholder="contoh: Balai Desa Plantungan / Dusun Krajan"></div>
          <div class="form-group"><label>Penanggung Jawab / Sasaran</label><input type="text" name="penanggung_jawab" value="\${data.penanggung_jawab || ''}" placeholder="contoh: Tim KKN Divisi IT / Warga Dusun Krajan"></div>

          <!-- Galeri Foto Dokumentasi (Bisa upload lebih dari 1 foto) -->
          <div class="form-group" style="background:#0b1329; padding:12px; border-radius:10px; border:1px solid #1e293b; margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
              <div>
                <label style="color:#34d399; font-weight:700; margin:0;">Galeri Foto Dokumentasi (Bisa Lebih Dari 1 Foto)</label>
                <p style="font-size:11px; color:var(--text-muted); margin:2px 0 0 0;">Upload beberapa foto kegiatan sekaligus untuk ditampilkan sebagai pop-up slider di website.</p>
              </div>
              <div style="display:flex; gap:6px;">
                <label class="upload-inline-btn" style="margin:0; font-size:11px; padding:5px 12px; cursor:pointer;">
                  Upload Banyak Foto Sekaligus
                  <input type="file" multiple accept="image/*" style="display:none;" onchange="handleMultipleKknUpload(this.files)">
                </label>
                <button type="button" class="btn btn-outline" style="font-size:11px; padding:4px 10px;" onclick="addKknPhotoRow()">+ Tambah URL</button>
              </div>
            </div>

            <div id="kkn-photos-container">
              \${photoRowsHtml}
            </div>
          </div>

          <div class="form-group"><label>Jumlah / Keterangan Anggota (Bisa teks/angka bebas)</label><input type="text" name="jumlah_anggota" value="\${data.jumlah_anggota || ''}" placeholder="contoh: 11 Orang / 10 Mahasiswa & 1 DPL"></div>
          <div class="form-group"><label>Deskripsi Program</label><textarea name="deskripsi" rows="3">\${data.deskripsi || ''}</textarea></div>
        \`;
      } else if (col === 'apbdes') {
        const isEdit = Boolean(data && (data.id || data.tahun));
        const listPendapatan = (isEdit && Array.isArray(data.rincian_pendapatan)) ? data.rincian_pendapatan : [];
        const listBelanja = (isEdit && Array.isArray(data.rincian_belanja)) ? data.rincian_belanja : [];

        const rowsPendapatanHtml = listPendapatan.map(function(item) {
          const formattedNom = item.nominal ? formatRupiahValue(item.nominal) : '';
          return '<div class="apb-item-row" style="display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;">' +
            '<input type="text" class="row-pendapatan-kategori" value="' + (item.kategori || '') + '" placeholder="Nama Sumber Pendapatan..." style="flex:3; font-size:12px;" required>' +
            '<input type="text" class="row-pendapatan-nominal" value="' + formattedNom + '" placeholder="Rp 0" style="flex:2; font-size:12px; font-weight:600; color:#34d399;" oninput="handleRupiahInput(this)" required>' +
            '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.apb-item-row\\x27).remove(); updateApbCalculations();" title="Hapus Pos">Hapus</button>' +
          '</div>';
        }).join('');

        const rowsBelanjaHtml = listBelanja.map(function(item) {
          const formattedNom = item.nominal ? formatRupiahValue(item.nominal) : '';
          return '<div class="apb-item-row" style="display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;">' +
            '<input type="text" class="row-belanja-kategori" value="' + (item.kategori || '') + '" placeholder="Nama Bidang Pengeluaran..." style="flex:3; font-size:12px;" required>' +
            '<input type="text" class="row-belanja-nominal" value="' + formattedNom + '" placeholder="Rp 0" style="flex:2; font-size:12px; font-weight:600; color:#f87171;" oninput="handleRupiahInput(this)" required>' +
            '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.apb-item-row\\x27).remove(); updateApbCalculations();" title="Hapus Pos">Hapus</button>' +
          '</div>';
        }).join('');

        const tahunVal = isEdit ? (data.tahun || '') : new Date().getFullYear();
        const statusVal = isEdit ? (data.status_publikasi || '') : '';
        const formattedPend = (isEdit && data.pendapatan) ? formatRupiahValue(data.pendapatan) : '';
        const formattedBel = (isEdit && data.belanja) ? formatRupiahValue(data.belanja) : '';

        return \`
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:12px;">
            <div class="form-group"><label>Tahun Anggaran</label><input type="number" name="tahun" value="\${tahunVal}" placeholder="contoh: 2025" required></div>
            <div class="form-group"><label>Status Publikasi</label><input type="text" name="status_publikasi" value="\${statusVal}" placeholder="contoh: Ditetapkan (Perdes No. 04/2025)"></div>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:16px;">
            <div class="form-group">
              <label style="color:#34d399; font-weight:700;">Total Pendapatan</label>
              <input type="text" name="pendapatan_formatted" id="apb-input-pendapatan" value="\${formattedPend}" placeholder="Rp 0" style="font-weight:700; color:#34d399;" oninput="handleRupiahInput(this)" required>
            </div>
            <div class="form-group">
              <label style="color:#f87171; font-weight:700;">Total Belanja / Pengeluaran</label>
              <input type="text" name="belanja_formatted" id="apb-input-belanja" value="\${formattedBel}" placeholder="Rp 0" style="font-weight:700; color:#f87171;" oninput="handleRupiahInput(this)" required>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:16px; background:#041410; padding:12px; border-radius:10px; border:1px solid #065f46;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <label style="color:#34d399; font-weight:700; margin:0;">Rincian Sumber Pendapatan (Daftar Pos)</label>
              <button type="button" class="btn btn-outline" style="font-size:11px; padding:4px 10px;" onclick="addPendapatanRow()">+ Tambah Pos Pendapatan</button>
            </div>
            <div id="apb-pendapatan-rows">
              \${rowsPendapatanHtml}
            </div>
            <!-- Non-editable Difference Indicator (Pendapatan) -->
            <div style="margin-top:10px; padding:8px 12px; background:#0f291e; border:1px dashed #10b981; border-radius:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
              <span style="font-size:11px; color:#a7f3d0;">Total Rincian: <strong id="calc-sum-pendapatan" style="color:#ffffff;">Rp 0</strong></span>
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="font-size:11px; color:#cbd5e1; font-style:italic;">Selisih dana yang belum tercatat (tidak bisa diedit):</span>
                <strong id="calc-diff-pendapatan" style="font-size:12px; font-weight:700; color:#34d399; font-family:monospace; background:#022c22; padding:2px 8px; border-radius:4px; border:1px solid #059669;">Rp 0</strong>
              </div>
            </div>
          </div>

          <div class="form-group" style="margin-bottom:16px; background:#1c0a0a; padding:12px; border-radius:10px; border:1px solid #7f1d1d;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <label style="color:#f87171; font-weight:700; margin:0;">Rincian Pos Belanja / Pengeluaran (Daftar Pos)</label>
              <button type="button" class="btn btn-outline" style="font-size:11px; padding:4px 10px;" onclick="addBelanjaRow()">+ Tambah Pos Belanja</button>
            </div>
            <div id="apb-belanja-rows">
              \${rowsBelanjaHtml}
            </div>
            <!-- Non-editable Difference Indicator (Belanja) -->
            <div style="margin-top:10px; padding:8px 12px; background:#2e1010; border:1px dashed #ef4444; border-radius:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
              <span style="font-size:11px; color:#fca5a5;">Total Rincian: <strong id="calc-sum-belanja" style="color:#ffffff;">Rp 0</strong></span>
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="font-size:11px; color:#cbd5e1; font-style:italic;">Selisih dana yang belum tercatat (tidak bisa diedit):</span>
                <strong id="calc-diff-belanja" style="font-size:12px; font-weight:700; color:#f87171; font-family:monospace; background:#450a0a; padding:2px 8px; border-radius:4px; border:1px solid #b91c1c;">Rp 0</strong>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>File Laporan PDF (URL / Upload ke R2)</label>
            <div style="display:flex; gap:8px;">
              <input type="text" id="m-apbdes-pdf" name="file_pdf" value="\${data.file_pdf || ''}" placeholder="URL File PDF">
              <label class="upload-inline-btn" style="margin:0; display:flex; align-items:center;">
                Upload PDF R2
                <input type="file" style="display:none;" onchange="handleFileUpload(this.files[0], 'm-apbdes-pdf')">
              </label>
            </div>
          </div>
          <div class="form-group"><label>Keterangan / Catatan</label><input type="text" name="keterangan" value="\${data.keterangan || ''}" placeholder="contoh: Realisasi APBDes telah disahkan"></div>
        \`;
      }
      return '';
    }

    function formatRupiahValue(value) {
      if (!value && value !== 0) return '';
      const numberString = String(value).replace(/[^0-9]/g, '');
      if (!numberString) return '';
      return 'Rp ' + Number(numberString).toLocaleString('id-ID');
    }

    function parseRupiahValue(str) {
      if (!str) return 0;
      const clean = String(str).replace(/[^0-9]/g, '');
      return clean ? Number(clean) : 0;
    }

    function handleRupiahInput(el) {
      const rawVal = parseRupiahValue(el.value);
      if (rawVal === 0 && !el.value.replace(/[^0-9]/g, '')) {
        el.value = '';
      } else {
        el.value = formatRupiahValue(rawVal);
      }
      updateApbCalculations();
    }

    function addPendapatanRow(kategori, nominal) {
      const container = document.getElementById('apb-pendapatan-rows');
      if (!container) return;
      kategori = kategori || '';
      const formattedNom = nominal ? formatRupiahValue(nominal) : '';
      const div = document.createElement('div');
      div.className = 'apb-item-row';
      div.style.cssText = 'display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;';
      div.innerHTML = '<input type="text" class="row-pendapatan-kategori" value="' + kategori + '" placeholder="Nama Sumber Pendapatan..." style="flex:3; font-size:12px;" required>' +
        '<input type="text" class="row-pendapatan-nominal" value="' + formattedNom + '" placeholder="Rp 0" style="flex:2; font-size:12px; font-weight:600; color:#34d399;" oninput="handleRupiahInput(this)" required>' +
        '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.apb-item-row\\x27).remove(); updateApbCalculations();" title="Hapus Pos">Hapus</button>';
      container.appendChild(div);
      updateApbCalculations();
    }

    function addBelanjaRow(kategori, nominal) {
      const container = document.getElementById('apb-belanja-rows');
      if (!container) return;
      kategori = kategori || '';
      const formattedNom = nominal ? formatRupiahValue(nominal) : '';
      const div = document.createElement('div');
      div.className = 'apb-item-row';
      div.style.cssText = 'display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;';
      div.innerHTML = '<input type="text" class="row-belanja-kategori" value="' + kategori + '" placeholder="Nama Bidang Pengeluaran..." style="flex:3; font-size:12px;" required>' +
        '<input type="text" class="row-belanja-nominal" value="' + formattedNom + '" placeholder="Rp 0" style="flex:2; font-size:12px; font-weight:600; color:#f87171;" oninput="handleRupiahInput(this)" required>' +
        '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.apb-item-row\\x27).remove(); updateApbCalculations();" title="Hapus Pos">Hapus</button>';
      container.appendChild(div);
      updateApbCalculations();
    }

    function updateApbCalculations() {
      const formatRp = (num) => 'Rp ' + Number(num || 0).toLocaleString('id-ID');

      // 1. Hitung Pendapatan
      const totalPendTarget = parseRupiahValue(document.querySelector('input[name="pendapatan_formatted"]')?.value);
      let sumPend = 0;
      document.querySelectorAll('#apb-pendapatan-rows .row-pendapatan-nominal').forEach(el => {
        sumPend += parseRupiahValue(el.value);
      });
      const diffPend = sumPend - totalPendTarget;

      const sumPendEl = document.getElementById('calc-sum-pendapatan');
      if (sumPendEl) sumPendEl.innerText = formatRp(sumPend);

      const diffPendEl = document.getElementById('calc-diff-pendapatan');
      if (diffPendEl) {
        diffPendEl.innerText = formatRp(Math.abs(diffPend));
        if (diffPend === 0) {
          diffPendEl.style.color = '#34d399';
          diffPendEl.style.borderColor = '#059669';
        } else if (diffPend > 0) {
          diffPendEl.style.color = '#38bdf8';
          diffPendEl.style.borderColor = '#0284c7';
        } else {
          diffPendEl.style.color = '#f87171';
          diffPendEl.style.borderColor = '#b91c1c';
        }
      }

      // 2. Hitung Belanja
      const totalBelTarget = parseRupiahValue(document.querySelector('input[name="belanja_formatted"]')?.value);
      let sumBel = 0;
      document.querySelectorAll('#apb-belanja-rows .row-belanja-nominal').forEach(el => {
        sumBel += parseRupiahValue(el.value);
      });
      const diffBel = sumBel - totalBelTarget;

      const sumBelEl = document.getElementById('calc-sum-belanja');
      if (sumBelEl) sumBelEl.innerText = formatRp(sumBel);

      const diffBelEl = document.getElementById('calc-diff-belanja');
      if (diffBelEl) {
        diffBelEl.innerText = formatRp(Math.abs(diffBel));
        if (diffBel === 0) {
          diffBelEl.style.color = '#34d399';
          diffBelEl.style.borderColor = '#059669';
        } else if (diffBel > 0) {
          diffBelEl.style.color = '#38bdf8';
          diffBelEl.style.borderColor = '#0284c7';
        } else {
          diffBelEl.style.color = '#f87171';
          diffBelEl.style.borderColor = '#b91c1c';
        }
      }
    }

    async function handleMultipleKknUpload(files) {
      if (!files || files.length === 0) return;
      showToast('Mengunggah ' + files.length + ' foto ke Cloudflare R2...');
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = async function() {
            try {
              const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  fileName: file.name,
                  mimeType: file.type || 'application/octet-stream',
                  base64: reader.result
                })
              });
              const uploaded = await res.json();
              if (uploaded.url) {
                addKknPhotoRow(uploaded.url);
              }
            } catch(err) {
              console.error('Upload error:', err);
            }
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
      showToast('Semua foto berhasil diunggah!');
      await loadData();
    }

    function addKknPhotoRow(url = '') {
      const container = document.getElementById('kkn-photos-container');
      if (!container) return;
      const uid = 'kkn-photo-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      const div = document.createElement('div');
      div.className = 'kkn-photo-item';
      div.style.cssText = 'display:flex; gap:8px; align-items:center; background:#0f172a; padding:8px 10px; border-radius:8px; border:1px solid var(--card-border); margin-bottom:6px;';
      div.innerHTML = '<img src="' + (url || 'https://via.placeholder.com/60?text=No+Img') + '" id="' + uid + '-preview" style="width:42px; height:42px; border-radius:6px; object-fit:cover; border:1px solid #334155; flex-shrink:0;">' +
        '<input type="text" class="row-kkn-photo" id="' + uid + '" value="' + url + '" placeholder="URL Foto Dokumentasi..." style="flex:1; font-size:12px;" required oninput="document.getElementById(\\x27' + uid + '-preview\\x27).src = this.value">' +
        '<label class="upload-inline-btn" style="margin:0; font-size:11px; padding:5px 8px; white-space:nowrap; cursor:pointer;">' +
          'Ganti' +
          '<input type="file" style="display:none;" onchange="handleFileUpload(this.files[0], \\x27' + uid + '\\x27)">' +
        '</label>' +
        '<button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:12px;" onclick="this.closest(\\x27.kkn-photo-item\\x27).remove()" title="Hapus Foto">Hapus</button>';
      container.appendChild(div);
    }

    async function saveModalData(e) {
      e.preventDefault();
      const form = document.getElementById('modal-form');
      const formData = new FormData(form);
      const values = {};
      formData.forEach((val, key) => { values[key] = val; });

      if (editingCollection === 'berita') {
        if (values.kategori_select === 'Lainnya') {
          values.kategori = (values.kategori_custom || '').trim() || 'Lainnya';
        } else {
          values.kategori = values.kategori_select || values.kategori || 'Pemerintahan';
        }
        delete values.kategori_select;
        delete values.kategori_custom;
      }

      if (editingCollection === 'programKKN') {
        const photoInputs = document.querySelectorAll('#kkn-photos-container .row-kkn-photo');
        const galeri = [];
        photoInputs.forEach(input => {
          const v = input.value?.trim();
          if (v) galeri.push(v);
        });
        values.galeri = galeri;
        values.dokumentasi = galeri.length > 0 ? galeri[0] : (values.dokumentasi || '');

        const tglMulai = values.tanggal_mulai;
        const tglSelesai = values.tanggal_selesai;
        if (tglMulai && tglSelesai) {
          values.tanggal_pelaksanaan = tglMulai + ' s/d ' + tglSelesai;
        } else if (tglMulai) {
          values.tanggal_pelaksanaan = tglMulai;
        }

        if (values.jumlah_anggota !== undefined) {
          values.jumlah_anggota = String(values.jumlah_anggota).trim();
        }
        delete values.capaian;
      }

      if (editingCollection === 'apbdes') {
        values.pendapatan = parseRupiahValue(values.pendapatan_formatted || values.pendapatan);
        values.belanja = parseRupiahValue(values.belanja_formatted || values.belanja);
        if (values.tahun !== undefined) values.tahun = Number(values.tahun) || new Date().getFullYear();
        delete values.pembiayaan;
        delete values.pendapatan_formatted;
        delete values.belanja_formatted;
        values.surplus_defisit = (values.pendapatan || 0) - (values.belanja || 0);

        // Collect field array rows for rincian_pendapatan (with parsed numeric rupiah)
        const pendRows = document.querySelectorAll('#apb-pendapatan-rows .apb-item-row');
        const rincian_pendapatan = [];
        pendRows.forEach(r => {
          const kat = r.querySelector('.row-pendapatan-kategori')?.value?.trim();
          const nom = parseRupiahValue(r.querySelector('.row-pendapatan-nominal')?.value);
          if (kat) {
            rincian_pendapatan.push({ kategori: kat, nominal: nom });
          }
        });
        values.rincian_pendapatan = rincian_pendapatan;

        // Collect field array rows for rincian_belanja (with parsed numeric rupiah)
        const belRows = document.querySelectorAll('#apb-belanja-rows .apb-item-row');
        const rincian_belanja = [];
        belRows.forEach(r => {
          const kat = r.querySelector('.row-belanja-kategori')?.value?.trim();
          const nom = parseRupiahValue(r.querySelector('.row-belanja-nominal')?.value);
          if (kat) {
            rincian_belanja.push({ kategori: kat, nominal: nom });
          }
        });
        values.rincian_belanja = rincian_belanja;
      }

      if (editingId) {
        const idx = dbState[editingCollection].findIndex(x => x.id === editingId);
        if (idx !== -1) {
          dbState[editingCollection][idx] = { ...dbState[editingCollection][idx], ...values };
        }
      } else {
        const newId = (dbState[editingCollection].length > 0 ? Math.max(...dbState[editingCollection].map(x=>x.id||0)) : 0) + 1;
        dbState[editingCollection].push({ id: newId, ...values });
      }

      await fetch('/api/cms-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [editingCollection]: dbState[editingCollection] })
      });

      closeModal();
      updateBadges();
      renderCurrentView();
      showToast('Perubahan berhasil disimpan!');
    }

    async function deleteItem(collection, id) {
      if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
      dbState[collection] = dbState[collection].filter(x => x.id !== id);
      await fetch('/api/cms-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [collection]: dbState[collection] })
      });
      updateBadges();
      renderCurrentView();
      showToast('Data telah dihapus!');
    }

    function toggleBeritaKategoriCustom(val) {
      const box = document.getElementById('m-berita-kat-custom-box');
      const input = document.getElementById('m-berita-kat-custom');
      if (box) {
        if (val === 'Lainnya') {
          box.style.display = 'block';
          if (input) input.focus();
        } else {
          box.style.display = 'none';
        }
      }
    }

    function updateKknStatusBadgePreview(val) {
      const badgeEl = document.getElementById('kkn-status-preview-badge');
      const selectEl = document.getElementById('m-kkn-status');
      if (badgeEl) badgeEl.innerText = val;
      if (val === 'Sedang Berjalan') {
        if (badgeEl) badgeEl.style.cssText = 'padding:2px 10px; border-radius:9999px; font-size:11px; font-weight:700; background:#0c4a6e; color:#38bdf8; border:1px solid #0284c7;';
        if (selectEl) selectEl.style.cssText = 'width:100%; font-size:13px; padding:8px 12px; border-radius:8px; font-weight:700; cursor:pointer; background:#0c4a6e; color:#38bdf8; border:1px solid #0284c7;';
      } else if (val === 'Rencana') {
        if (badgeEl) badgeEl.style.cssText = 'padding:2px 10px; border-radius:9999px; font-size:11px; font-weight:700; background:#451a03; color:#fbbf24; border:1px solid #d97706;';
        if (selectEl) selectEl.style.cssText = 'width:100%; font-size:13px; padding:8px 12px; border-radius:8px; font-weight:700; cursor:pointer; background:#451a03; color:#fbbf24; border:1px solid #d97706;';
      } else {
        if (badgeEl) badgeEl.style.cssText = 'padding:2px 10px; border-radius:9999px; font-size:11px; font-weight:700; background:#065f46; color:#34d399; border:1px solid #059669;';
        if (selectEl) selectEl.style.cssText = 'width:100%; font-size:13px; padding:8px 12px; border-radius:8px; font-weight:700; cursor:pointer; background:#065f46; color:#34d399; border:1px solid #059669;';
      }
    }

    async function updatePesanStatus(id, newStatus) {
      const msg = (dbState.pesanMasyarakat || []).find(x => x.id === id);
      if (msg) {
        msg.status = newStatus;
        await fetch('/api/cms-save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pesanMasyarakat: dbState.pesanMasyarakat })
        });
        updateBadges();
        renderCurrentView();
        showToast('Status aspirasi diubah menjadi "' + newStatus + '"');
      }
    }

    async function deletePesan(id) {
      if (!confirm('Apakah Anda yakin ingin menghapus pesan aspirasi ini?')) return;
      dbState.pesanMasyarakat = (dbState.pesanMasyarakat || []).filter(x => x.id !== id);
      await fetch('/api/cms-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pesanMasyarakat: dbState.pesanMasyarakat })
      });
      updateBadges();
      renderCurrentView();
      showToast('Pesan aspirasi telah dihapus!');
    }

    loadData();
  </script>
</body>
</html>`;
}

module.exports = {
  renderAdminDashboardHtml
};
