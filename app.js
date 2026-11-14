const API_URL = 'https://api.eldesiempre.es';

const NAV_ITEMS = [
    { label: 'Inicio', href: 'index.html', key: 'inicio' },
    { label: 'Aprender', href: 'index.html#rutas', key: 'aprender' },
    { label: 'Biblioteca', href: 'biblioteca.html', key: 'biblioteca' },
    { label: 'Mi Perfil', href: 'perfil.html', key: 'perfil', requiresAuth: true },
    { label: 'Contacto', href: 'contacto.html', key: 'contacto' }
];

const SECCIONES_BIBLIOTECA = {
    herramientas: {
        titulo: 'Laboratorio de Herramientas',
        icono: '🛠️',
        descripcion: 'Utilidades interactivas para análisis, pruebas y conversiones en tiempo real.',
        categorias: {
            'red-team': {
                titulo: 'Red Team & Pentesting',
                icono: '⚔️',
                descripcion: 'Simula ataques, encuentra vulnerabilidades y explota sistemas.',
                items: [
                    { id: 'dorks', titulo: 'Generador de Dorks', descripcion: 'Crea consultas avanzadas para Google que revelan archivos ocultos o paneles de administración.', ideal: 'Encontrar documentos filtrados.' },
                    { id: 'payloads', titulo: 'Generador de Payloads', descripcion: 'Genera payloads básicos para probar inyecciones SQL, XSS o LFI.', ideal: 'Pruebas de concepto rápidas.' },
                    { id: 'cve', titulo: 'Buscador de CVEs', descripcion: 'Consulta vulnerabilidades conocidas por nombre de software.', ideal: 'Investigar fallos de seguridad.' }
                ]
            },
            'blue-team': {
                titulo: 'Blue Team & Forense',
                icono: '🛡️',
                descripcion: 'Defensa, análisis de malware y respuesta a incidentes.',
                items: [
                    { id: 'hash', titulo: 'Analizador de Hash', descripcion: 'Identifica el algoritmo de un hash (MD5, SHA-1, SHA-256).', ideal: 'Verificar integridad de archivos.' },
                    { id: 'ssl', titulo: 'Analizador SSL/TLS', descripcion: 'Comprueba el certificado de seguridad de un sitio web.', ideal: 'Auditar servidores.' },
                    { id: 'http-headers', titulo: 'Inspector de Cabeceras HTTP', descripcion: 'Analiza las cabeceras de seguridad de un servidor.', ideal: 'Auditar configuraciones web.' }
                ]
            },
            'osint': {
                titulo: 'OSINT e Inteligencia',
                icono: '🕵️',
                descripcion: 'Recopila información de fuentes abiertas.',
                items: [
                    { id: 'osint', titulo: 'OSINT Framework', descripcion: 'Mapa visual de herramientas y fuentes de información pública.', ideal: 'Saber por dónde empezar.' },
                    { id: 'ip', titulo: 'Buscador de IP', descripcion: 'Descubre ubicación, ISP y organización de una IP.', ideal: 'Rastrear origen de visitas.' },
                    { id: 'domain', titulo: 'Reconocimiento de Dominio', descripcion: 'Obtén IP, registros MX y otra infraestructura de un dominio.', ideal: 'OSINT de infraestructura.' },
                    { id: 'mac', titulo: 'Buscador de Fabricante (MAC)', descripcion: 'Identifica el fabricante de un dispositivo por su MAC.', ideal: 'Análisis de redes locales.' },
                    { id: 'email', titulo: 'Validador de Correo', descripcion: 'Verifica formato y existencia del dominio de un correo.', ideal: 'Limpieza de bases de datos.' }
                ]
            },
            'utilidades': {
                titulo: 'Utilidades y Análisis',
                icono: '🧰',
                descripcion: 'Conversión, criptografía y análisis de datos.',
                items: [
                    { id: 'exif', titulo: 'Analizador EXIF', descripcion: 'Extrae metadatos ocultos de una foto: fecha, cámara, GPS.', ideal: 'Saber si una foto revela tu ubicación.' },
                    { id: 'pass', titulo: 'Generador de Contraseñas', descripcion: 'Crea contraseñas aleatorias y seguras.', ideal: 'Proteger tus cuentas.' },
                    { id: 'pass-strength', titulo: 'Auditor de Contraseñas', descripcion: 'Estima cuánto tardaría un atacante en descifrarla.', ideal: 'Mejorar tu seguridad.' },
                    { id: 'base64', titulo: 'Codificador Base64', descripcion: 'Convierte texto plano a Base64 y viceversa.', ideal: 'Depurar peticiones web.' },
                    { id: 'jwt', titulo: 'Inspector de JWT', descripcion: 'Decodifica un token JWT sin clave secreta.', ideal: 'Entender autenticación moderna.' },
                    { id: 'json', titulo: 'Formateador JSON', descripcion: 'Formatea y valida texto JSON.', ideal: 'Análisis de APIs y logs.' },
                    { id: 'regex', titulo: 'Probador de Regex', descripcion: 'Prueba patrones de expresión regular en tiempo real.', ideal: 'Programación y filtrado.' },
                    { id: 'timestamp', titulo: 'Conversor de Timestamp', descripcion: 'Convierte fechas a Unix y viceversa.', ideal: 'Análisis forense y logs.' },
                    { id: 'uuid', titulo: 'Generador de UUID', descripcion: 'Genera identificadores únicos v4.', ideal: 'Pruebas de APIs.' }
                ]
            },
            'redes': {
                titulo: 'Redes y Comunicaciones',
                icono: '🌐',
                descripcion: 'Analiza la seguridad de tu conexión y protocolos.',
                items: [
                    { id: 'wifi', titulo: 'Analizador de Red Wi-Fi', descripcion: 'Analiza calidad y seguridad de tu conexión Wi-Fi.', ideal: 'Saber si tu red es segura.' },
                    { id: 'dns', titulo: 'Fuga de DNS', descripcion: 'Comprueba si tu VPN filtra tu tráfico real.', ideal: 'Verificar privacidad de VPN.' },
                    { id: 'robots', titulo: 'Analizador de Robots.txt', descripcion: 'Descubre qué oculta un sitio a los buscadores.', ideal: 'Reconocimiento web.' },
                    { id: 'ua', titulo: 'Analizador User-Agent', descripcion: 'Descubre el sistema operativo y navegador que usas.', ideal: 'Pruebas de compatibilidad.' }
                ]
            },
            'iot': {
                titulo: 'IoT y Hardware',
                icono: '🔌',
                descripcion: 'Análisis de dispositivos conectados.',
                items: [
                    { id: 'iot-scan', titulo: 'Escáner de Dispositivos IoT', descripcion: 'Busca dispositivos conectados a tu red local.', ideal: 'Descubrir dispositivos en tu red.' },
                    { id: 'firmware', titulo: 'Analizador de Firmware', descripcion: 'Extrae cadenas de texto de un firmware.', ideal: 'Análisis de seguridad de dispositivos.' }
                ]
            }
        }
    },
    recursos: {
        titulo: 'Directorio de Recursos',
        icono: '📖',
        descripcion: 'Enlaces seleccionados a formación, bibliografía, laboratorios y referentes.',
        categorias: {
            'formacion':     { titulo: 'Formación y Certificaciones', icono: '🎓', descripcion: 'Cursos, plataformas y certificaciones para iniciarte o especializarte.' },
            'red-team-rec':  { titulo: 'Red Team & Pentesting',       icono: '⚔️', descripcion: 'Herramientas y documentación para pruebas de penetración.' },
            'blue-team-rec': { titulo: 'Blue Team & Forense',         icono: '🛡️', descripcion: 'Defensa, análisis forense y respuesta a incidentes.' },
            'osint-rec':     { titulo: 'OSINT e Inteligencia',        icono: '🕵️', descripcion: 'Inteligencia de fuentes abiertas para investigar.' },
            'desarrollo':    { titulo: 'Desarrollo Seguro y APIs',    icono: '💻', descripcion: 'Seguridad en aplicaciones web, APIs y bases de datos.' },
            'sistemas':      { titulo: 'Sistemas Operativos',         icono: '🐧', descripcion: 'Distribuciones Linux y entornos de seguridad.' },
            'comunidad':     { titulo: 'Comunidad y Noticias',        icono: '📰', descripcion: 'Blogs, foros y medios de referencia en ciberseguridad hispana.' },
            'referentes':    { titulo: 'Referentes Hispanos',         icono: '⭐', descripcion: 'Profesionales destacados de la ciberseguridad en español.' },
            'bibliografia':  { titulo: 'Bibliografía en Español',     icono: '📚', descripcion: 'Libros imprescindibles de 0xWord y otros autores.' }
        }
    }
};

let usuarioLogueado = null;
let temp2FAMetodo = null;

function inicializarTema() {
    const guardado = localStorage.getItem('tema');
    const btn = document.getElementById('theme-toggle');
    if (guardado === 'light') document.body.classList.add('light-mode');
    if (!btn) return;
    btn.innerText = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    btn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const light = document.body.classList.contains('light-mode');
        localStorage.setItem('tema', light ? 'light' : 'dark');
        btn.innerText = light ? '☀️' : '🌙';
    });
}

function renderHeader(activeKey = '') {
    const header = document.querySelector('header');
    if (!header) return;
    const items = NAV_ITEMS.filter(i => !i.requiresAuth || usuarioLogueado);
    header.innerHTML = `
        <button class="logo-container" onclick="window.location.href='index.html'">
            <img src="assets/logo.png" alt="" class="logo-img" onerror="this.style.display='none'">
            <div class="logo-text">eLDeSiempre<span>.es</span></div>
        </button>
        <nav>
            ${items.map(i => `<button class="nav-btn ${i.key === activeKey ? 'active' : ''}" onclick="window.location.href='${i.href}'">${i.label}</button>`).join('')}
            ${usuarioLogueado
                ? `<button class="nav-btn" style="color:var(--danger);border-color:var(--danger);" onclick="cerrarSesion()">Salir</button>`
                : `<button class="nav-btn btn-login" onclick="window.location.href='login.html'">Acceder</button>`}
            <button class="theme-toggle" id="theme-toggle" aria-label="Cambiar tema">🌙</button>
        </nav>
    `;
    inicializarTema();
}

function mostrarToast(mensaje, tipo = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast ' + tipo;
    toast.innerText = mensaje;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

function abrirModal(id) { document.getElementById(id)?.classList.add('active'); }
function cerrarModal(id) { document.getElementById(id)?.classList.remove('active'); }
function mostrarAvisoLegal(e) { e?.preventDefault(); abrirModal('modal-legal'); }

function comprobarDisclaimer() {
    const modal = document.getElementById('disclaimer-modal');
    if (!modal) return;
    if (localStorage.getItem('disclaimerAceptado') === 'true') {
        modal.style.display = 'none';
        document.body.classList.remove('locked');
        if (!localStorage.getItem('cookiesAceptadas')) {
            document.getElementById('cookie-banner')?.style.setProperty('display', 'flex');
        }
    } else {
        modal.style.display = 'flex';
        document.body.classList.add('locked');
    }
}

function aceptarDisclaimer() {
    document.getElementById('disclaimer-modal')?.style.setProperty('display', 'none');
    document.body.classList.remove('locked');
    localStorage.setItem('disclaimerAceptado', 'true');
    if (!localStorage.getItem('cookiesAceptadas')) {
        document.getElementById('cookie-banner')?.style.setProperty('display', 'flex');
    }
}

function aceptarCookies(aceptadas) {
    localStorage.setItem('cookiesAceptadas', aceptadas ? 'true' : 'false');
    document.getElementById('cookie-banner')?.style.setProperty('display', 'none');
    if (!aceptadas && typeof _paq !== 'undefined') {
        _paq.push(['disableCookies']);
        _paq.push(['forgetUser']);
    }
}

function copiarAlPortapapeles(texto, moneda) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto)
            .then(() => mostrarToast(`Dirección de ${moneda} copiada`, 'success'))
            .catch(() => mostrarToast('No se pudo copiar.', 'error'));
        return;
    }
    const ta = document.createElement('textarea');
    ta.value = texto;
    ta.style.position = 'fixed';
    ta.style.left = '-999999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); mostrarToast('Copiado', 'success'); }
    catch { mostrarToast('Error al copiar', 'error'); }
    ta.remove();
}

function logHerramienta(herramienta, accion, input = '', output = '') {
    fetch(`${API_URL}/herramientas.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ herramienta, accion, input, output }),
        credentials: 'include'
    }).catch(err => console.warn('logHerramienta falló:', err));
}

async function comprobarSesion() {
    try {
        const res = await fetch(`${API_URL}/comprobar_sesion.php`, { credentials: 'include' });
        const result = await res.json();
        if (result.logueado) usuarioLogueado = result;
    } catch {}
}

async function cerrarSesion() {
    try { await fetch(`${API_URL}/logout.php`, { credentials: 'include' }); } catch {}
    window.location.href = 'index.html';
}

function comprobarAcceso(url) {
    if (usuarioLogueado) window.location.href = url;
    else {
        mostrarToast('Debes iniciar sesión para acceder.', 'error');
        setTimeout(() => window.location.href = 'login.html', 1500);
    }
}

function protegerContenidoPrivado() {
    const path = window.location.pathname;
    if (!['biblioteca.html', 'perfil.html'].some(p => path.includes(p))) return;
    if (window.location.search.includes('cat=')) return;
    const main = document.querySelector('main.container');
    if (!main) return;
    main.style.display = 'none';
    setTimeout(() => {
        if (usuarioLogueado) main.style.display = 'block';
        else {
            mostrarToast('Acceso denegado.', 'error');
            setTimeout(() => window.location.href = 'login.html', 1000);
        }
    }, 300);
}

function getBadgeClass(tipo) {
    if (!tipo) return 'badge-default';
    const t = tipo.toLowerCase();
    if (t.includes('curso')) return 'badge-curso';
    if (t.includes('herramienta')) return 'badge-herramienta';
    if (t.includes('libro')) return 'badge-libro';
    if (t.includes('hacker')) return 'badge-hacker';
    if (t.includes('sistema')) return 'badge-sistema';
    if (t.includes('noticia') || t.includes('comunidad') || t.includes('blog')) return 'badge-noticia';
    if (t.includes('documentación')) return 'badge-doc';
    if (t.includes('laboratorio')) return 'badge-lab';
    return 'badge-default';
}

async function votarRecurso(id, btn) {
    if (!usuarioLogueado) {
        mostrarToast('Inicia sesión para votar.', 'error');
        setTimeout(() => window.location.href = 'login.html', 1200);
        return;
    }
    try {
        const res = await fetch(`${API_URL}/votar.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recurso_id: id }),
            credentials: 'include'
        });
        const result = await res.json();
        if (result.success) {
            btn.classList.toggle('votado', result.votado);
            btn.querySelector('span').innerText = result.votos;
        } else {
            mostrarToast(result.message || 'No se pudo votar.', 'error');
        }
    } catch (err) {
        console.error('Error al votar:', err);
        mostrarToast('Error al votar.', 'error');
    }
}

function breadcrumb(items) {
    return `<nav class="breadcrumb">${items.map((it, i) =>
        i === items.length - 1
            ? `<span>${it.label}</span>`
            : `<a href="${it.href}">${it.label}</a> / `
    ).join('')}</nav>`;
}

async function cargarBiblioteca() {
    const contenedor = document.getElementById('contenedor-biblioteca');
    if (!contenedor) return;

    const params = new URLSearchParams(window.location.search);
    const seccion = params.get('seccion');
    const categoria = params.get('cat');

    if (!seccion) return renderIndiceBiblioteca(contenedor);
    if (!SECCIONES_BIBLIOTECA[seccion]) {
        contenedor.innerHTML = '<p>Sección no encontrada.</p>';
        return;
    }
    if (!categoria) return renderCategoriasSeccion(contenedor, seccion);
    return renderDetalleCategoria(contenedor, seccion, categoria);
}

function renderIndiceBiblioteca(contenedor) {
    const cards = Object.entries(SECCIONES_BIBLIOTECA).map(([slug, s]) => `
        <a href="biblioteca.html?seccion=${slug}" class="folder" style="border-color: var(--neon-blue);">
            <div class="folder-icon" style="font-size: 3rem;">${s.icono}</div>
            <h3>${s.titulo}</h3>
            <p>${s.descripcion}</p>
            <span class="folder-badge">Entrar →</span>
        </a>
    `).join('');
    contenedor.innerHTML = `
        ${breadcrumb([{ label: 'Inicio', href: 'index.html' }, { label: 'Biblioteca' }])}
        <h2>Biblioteca de Ciberseguridad</h2>
        <p style="margin-bottom: 30px; color: var(--text-muted);">Elige qué quieres explorar hoy.</p>
        <div class="folder-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">${cards}</div>
    `;
}

function renderCategoriasSeccion(contenedor, seccion) {
    const data = SECCIONES_BIBLIOTECA[seccion];
    const cards = Object.entries(data.categorias).map(([slug, c]) => {
        const count = c.items ? c.items.length : null;
        return `
            <a href="biblioteca.html?seccion=${seccion}&cat=${slug}" class="folder">
                <div class="folder-icon">${c.icono}</div>
                <h3>${c.titulo}</h3>
                <p>${c.descripcion}</p>
                ${count ? `<span class="folder-badge">${count} herramientas</span>` : ''}
            </a>
        `;
    }).join('');
    contenedor.innerHTML = `
        ${breadcrumb([
            { label: 'Inicio', href: 'index.html' },
            { label: 'Biblioteca', href: 'biblioteca.html' },
            { label: data.titulo }
        ])}
        <h2>${data.icono} ${data.titulo}</h2>
        <p style="margin-bottom: 20px; color: var(--text-muted);">${data.descripcion}</p>
        <div class="folder-grid">${cards}</div>
    `;
}

async function renderDetalleCategoria(contenedor, seccion, categoria) {
    const data = SECCIONES_BIBLIOTECA[seccion].categorias[categoria];
    if (!data) {
        contenedor.innerHTML = '<p>Categoría no encontrada.</p>';
        return;
    }
    if (seccion === 'herramientas') return renderHerramientas(contenedor, data, categoria);

    try {
        const res = await fetch(`${API_URL}/obtener_recursos.php`, { credentials: 'include' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const result = await res.json();
        if (!result.success) throw new Error(result.message || 'API error');

        const recursos = result.data.find(c => c.slug === categoria)?.recursos ?? [];

        const items = recursos.map(r => {
            const badge = r.tipo ? `<span class="badge ${getBadgeClass(r.tipo)}">${r.tipo}</span>` : '';
            const votado = result.votos.includes(Number(r.id)) ? 'votado' : '';
            const botonVoto = usuarioLogueado
                ? `<button class="btn-voto ${votado}" onclick="votarRecurso(${r.id}, this)">⭐ <span>${r.votos || 0}</span></button>`
                : `<a href="login.html" class="btn-voto" style="text-decoration:none;">⭐ <span>${r.votos || 0}</span></a>`;
            return `
                <li class="resource-item" data-titulo="${r.titulo.toLowerCase()}">
                    <div class="resource-header">
                        <span class="resource-title">${r.titulo}</span>
                        ${badge}
                    </div>
                    <div class="resource-desc">${r.descripcion}</div>
                    <div class="resource-meta">
                        <span class="resource-ideal">Ideal para: ${r.ideal_para || 'Aprender y practicar'}</span>
                    </div>
                    <div class="resource-actions">
                        <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn-link">[Ir al recurso]</a>
                        ${botonVoto}
                    </div>
                </li>
            `;
        }).join('');

        contenedor.innerHTML = `
            ${breadcrumb([
                { label: 'Inicio', href: 'index.html' },
                { label: 'Biblioteca', href: 'biblioteca.html' },
                { label: SECCIONES_BIBLIOTECA[seccion].titulo, href: `biblioteca.html?seccion=${seccion}` },
                { label: data.titulo }
            ])}
            <div class="category-header">
                <h2>${data.icono} ${data.titulo}</h2>
                <p>${data.descripcion}</p>
                <input type="text" id="buscador-recursos" class="tool-input" placeholder="🔍 Buscar en esta categoría..." oninput="filtrarRecursos()">
            </div>
            <ul class="resource-list" id="lista-recursos">
                ${items || `<li style="text-align:center;padding:20px;color:var(--text-muted);">No hay recursos en esta categoría todavía.</li>`}
            </ul>
        `;
    } catch (err) {
        console.error('Error cargando recursos:', err);
        contenedor.innerHTML = `
            <p style="color: var(--danger);">Error al cargar los recursos.</p>
            <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 10px;">
                Comprueba que has iniciado sesión y que el servidor responde.
            </p>
        `;
    }
}

function renderHerramientas(contenedor, data, categoria) {
    const items = data.items.map(h => `
        <div class="card" data-titulo="${h.titulo.toLowerCase()}" onclick="abrirModal('modal-${h.id}')">
            <h3>${h.titulo}</h3>
            <p>${h.descripcion}</p>
            <p style="color: var(--neon-gold); font-size: 0.85rem; font-weight: bold; margin-top: auto;">Ideal para: ${h.ideal}</p>
        </div>
    `).join('');

    contenedor.innerHTML = `
        ${breadcrumb([
            { label: 'Inicio', href: 'index.html' },
            { label: 'Biblioteca', href: 'biblioteca.html' },
            { label: 'Herramientas', href: 'biblioteca.html?seccion=herramientas' },
            { label: data.titulo }
        ])}
        <div class="category-header">
            <h2>${data.icono} ${data.titulo}</h2>
            <p>${data.descripcion}</p>
            <input type="text" id="buscador-herramientas" class="tool-input" placeholder="🔍 Buscar herramienta..." oninput="filtrarHerramientas()">
        </div>
        <div class="grid-cards" id="lista-herramientas">${items}</div>
    `;
}

function filtrarHerramientas() {
    const q = document.getElementById('buscador-herramientas').value.toLowerCase();
    document.querySelectorAll('#lista-herramientas .card').forEach(el => {
        el.style.display = el.dataset.titulo.includes(q) ? 'flex' : 'none';
    });
}

function filtrarRecursos() {
    const q = document.getElementById('buscador-recursos').value.toLowerCase();
    document.querySelectorAll('#lista-recursos .resource-item').forEach(el => {
        el.style.display = el.dataset.titulo.includes(q) ? 'flex' : 'none';
    });
}

function toggleAuthForms(e) {
    e?.preventDefault();
    const login = document.getElementById('form-login');
    const reg = document.getElementById('form-registro');
    if (!login || !reg) return;
    const showLogin = login.style.display === 'none';
    login.style.display = showLogin ? 'block' : 'none';
    reg.style.display = showLogin ? 'none' : 'block';
}

async function cargarPerfil() {
    if (!usuarioLogueado) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    set('perfil-usuario', usuarioLogueado.usuario);
    set('perfil-nombre', usuarioLogueado.nombre);

    try {
        const res = await fetch(`${API_URL}/obtener_perfil.php`, { credentials: 'include' });
        const result = await res.json();
        if (!result.success) return;

        const bio = document.getElementById('perfil-bio');
        const hab = document.getElementById('perfil-habilidades');
        const git = document.getElementById('perfil-github');
        if (bio) bio.value = result.data.bio || '';
        if (hab) hab.value = result.data.habilidades || '';
        if (git) git.value = result.data.github || '';

        ['email', 'totp'].forEach(tipo => {
            const btn = document.getElementById(`btn-2fa-${tipo}`);
            if (!btn) return;
            if (result.data[`twofa_${tipo}_activo`]) {
                btn.innerText = 'Contactar Soporte';
                btn.onclick = () => window.location.href = 'contacto.html';
            }
        });
    } catch {}
}

async function solicitarReset(email = null) {
    if (!email) {
        email = prompt('Confirma tu correo electrónico:');
        if (!email) return;
    }
    try {
        const res = await fetch(`${API_URL}/solicitar_reset.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const result = await res.json();
        mostrarToast(result.message, result.success ? 'success' : 'error');
        if (result.success && document.getElementById('modal-forgot')) {
            cerrarModal('modal-forgot');
        }
    } catch { mostrarToast('Error de conexión.', 'error'); }
}

async function enviarReset() {
    const email = document.getElementById('forgot-email')?.value;
    if (!email) { mostrarToast('Introduce tu correo.', 'error'); return; }
    await solicitarReset(email);
}

async function toggle2FAEmail() {
    try {
        const res = await fetch(`${API_URL}/activar_2fa_email.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ activo: true }),
            credentials: 'include'
        });
        const result = await res.json();
        mostrarToast(result.message, result.success ? 'success' : 'error');
        if (result.success) {
            const btn = document.getElementById('btn-2fa-email');
            btn.innerText = 'Contactar Soporte';
            btn.onclick = () => window.location.href = 'contacto.html';
        }
    } catch { mostrarToast('Error de conexión.', 'error'); }
}

async function iniciar2FATOTP() {
    try {
        const res = await fetch(`${API_URL}/generar_2fa_totp.php`, { credentials: 'include' });
        const result = await res.json();
        if (result.success) {
            document.getElementById('qr-container').innerHTML =
                `<img src="${result.qr_svg}" alt="QR" style="width:100%;max-width:200px;">`;
            document.getElementById('secret-text').innerText = result.secret;
            abrirModal('modal-totp');
        } else mostrarToast(result.message, 'error');
    } catch { mostrarToast('Error al generar QR.', 'error'); }
}

async function confirmar2FATOTP() {
    const codigo = document.getElementById('totp-codigo')?.value;
    try {
        const res = await fetch(`${API_URL}/confirmar_2fa_totp.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo }),
            credentials: 'include'
        });
        const result = await res.json();
        mostrarToast(result.message, result.success ? 'success' : 'error');
        if (result.success) {
            cerrarModal('modal-totp');
            const btn = document.getElementById('btn-2fa-totp');
            btn.innerText = 'Contactar Soporte';
            btn.onclick = () => window.location.href = 'contacto.html';
        }
    } catch { mostrarToast('Error', 'error'); }
}

document.getElementById('form-login')?.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
        correo: document.getElementById('login-correo').value,
        contrasena: document.getElementById('login-contrasena').value
    };
    try {
        const res = await fetch(`${API_URL}/login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        const result = await res.json();
        if (result.success) {
            if (result.requiere_2fa) {
                temp2FAMetodo = result.requiere_2fa;
                mostrarToast(result.message, 'success');
                abrirModal('modal-2fa');
            } else {
                mostrarToast('Bienvenido ' + result.nombre, 'success');
                setTimeout(() => window.location.href = 'biblioteca.html', 1000);
            }
        } else mostrarToast('Error: ' + result.message, 'error');
    } catch { mostrarToast('Error de conexión.', 'error'); }
});

async function verificar2FALogin() {
    const codigo = document.getElementById('2fa-codigo')?.value;
    if (!codigo) { mostrarToast('Introduce el código.', 'error'); return; }
    try {
        const res = await fetch(`${API_URL}/verificar_2fa_login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo, metodo: temp2FAMetodo }),
            credentials: 'include'
        });
        const result = await res.json();
        if (result.success) {
            mostrarToast('Login exitoso.', 'success');
            setTimeout(() => window.location.href = 'biblioteca.html', 1000);
        } else mostrarToast(result.message, 'error');
    } catch { mostrarToast('Error de conexión.', 'error'); }
}

document.getElementById('form-registro')?.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
        nombre_completo: document.getElementById('reg-nombre').value,
        usuario: document.getElementById('reg-usuario').value,
        correo: document.getElementById('reg-correo').value,
        contrasena: document.getElementById('reg-contrasena').value
    };
    try {
        const res = await fetch(`${API_URL}/registro.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        const result = await res.json();
        if (result.success) {
            mostrarToast('Registro exitoso.', 'success');
            document.getElementById('form-registro').reset();
            toggleAuthForms();
        } else mostrarToast('Error: ' + result.message, 'error');
    } catch { mostrarToast('Error de conexión.', 'error'); }
});

document.getElementById('form-perfil')?.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
        bio: document.getElementById('perfil-bio').value,
        habilidades: document.getElementById('perfil-habilidades').value,
        github: document.getElementById('perfil-github').value
    };
    try {
        const res = await fetch(`${API_URL}/actualizar_perfil.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        const result = await res.json();
        mostrarToast(result.success ? 'Perfil actualizado.' : 'Error al actualizar.', result.success ? 'success' : 'error');
    } catch { mostrarToast('Error de conexión.', 'error'); }
});

function generarDork() {
    const dominio = document.getElementById('dork-input').value.trim();
    const tipo = document.getElementById('dork-type').value;
    const extra = document.getElementById('dork-extra').value;
    if (!dominio) { mostrarToast('Introduce un dominio.', 'error'); return; }
    let dork = `site:${dominio} filetype:${tipo}`;
    if (extra) dork += ` ${extra}`;
    document.getElementById('dork-result').innerText = dork;
    logHerramienta('Generador de Dorks', 'Generar', dominio, dork);
}

function limpiarDorks() {
    document.getElementById('dork-input').value = '';
    document.getElementById('dork-result').innerText = '';
}

document.getElementById('exif-input')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const result = document.getElementById('exif-result');
    result.innerHTML = 'Leyendo metadatos...';
    EXIF.getData(file, function() {
        const tags = EXIF.getAllTags(this);
        if (Object.keys(tags).length === 0) {
            result.innerHTML = 'No se encontraron metadatos EXIF.';
            return;
        }
        let html = '<ul style="list-style:none;padding:0;">';
        for (const [k, v] of Object.entries(tags)) {
            html += `<li><strong>${k}:</strong> ${v}</li>`;
        }
        html += '</ul>';
        result.innerHTML = html;
        logHerramienta('Analizador EXIF', 'Analizar', file.name, 'metadatos extraídos');
    });
});

function generarPassword() {
    const mayus = document.getElementById('chk-mayus').checked;
    const minus = document.getElementById('chk-minus').checked;
    const nums = document.getElementById('chk-nums').checked;
    const syms = document.getElementById('chk-symbols').checked;
    const longitud = parseInt(document.getElementById('slider-longitud').value, 10);

    let chars = '';
    if (mayus) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (minus) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (nums) chars += '0123456789';
    if (syms) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) { mostrarToast('Selecciona al menos un tipo de carácter.', 'error'); return; }

    let pass = '';
    const arr = new Uint32Array(longitud);
    crypto.getRandomValues(arr);
    for (let i = 0; i < longitud; i++) pass += chars[arr[i] % chars.length];

    document.getElementById('resultado-password').innerText = pass;
    logHerramienta('Generador de Contraseñas', 'Generar', longitud + ' chars', pass);
}

function limpiarPassword() {
    document.getElementById('resultado-password').innerText = '';
}

function analizarHash() {
    const hash = document.getElementById('input-hash').value.trim();
    const result = document.getElementById('resultado-hash');
    if (!hash) { result.innerText = 'Introduce un hash.'; return; }
    let tipo = 'Desconocido';
    if (/^[a-f0-9]{32}$/i.test(hash)) tipo = 'MD5';
    else if (/^[a-f0-9]{40}$/i.test(hash)) tipo = 'SHA-1';
    else if (/^[a-f0-9]{64}$/i.test(hash)) tipo = 'SHA-256';
    else if (/^[a-f0-9]{128}$/i.test(hash)) tipo = 'SHA-512';
    else if (/^\$2[ayb]\$.{56}$/.test(hash)) tipo = 'Bcrypt';
    result.innerText = `Algoritmo probable: ${tipo}`;
    logHerramienta('Analizador de Hash', 'Analizar', hash.substring(0, 20), tipo);
}

function limpiarHash() {
    document.getElementById('input-hash').value = '';
    document.getElementById('resultado-hash').innerText = '';
}

async function buscarIP() {
    const ip = document.getElementById('ip-input').value.trim();
    const result = document.getElementById('resultado-ip');
    if (!ip) { result.innerText = 'Introduce una IP.'; return; }
    result.innerText = 'Consultando...';
    try {
        const res = await fetch(`https://ipwho.is/${ip}`);
        const data = await res.json();
        if (!data.success) { result.innerText = 'No se encontró información.'; return; }
        result.innerHTML = `
            <p><strong>IP:</strong> ${data.ip}</p>
            <p><strong>País:</strong> ${data.country} (${data.country_code})</p>
            <p><strong>Región:</strong> ${data.region}</p>
            <p><strong>Ciudad:</strong> ${data.city}</p>
            <p><strong>ISP:</strong> ${data.connection?.isp || 'N/A'}</p>
            <p><strong>Organización:</strong> ${data.connection?.org || 'N/A'}</p>
            <p><strong>Zona horaria:</strong> ${data.timezone?.id || 'N/A'}</p>
        `;
        logHerramienta('Buscador de IP', 'Consultar', ip, data.country);
    } catch {
        result.innerText = 'Error de conexión.';
    }
}

function limpiarIP() {
    document.getElementById('ip-input').value = '';
    document.getElementById('resultado-ip').innerHTML = '';
}

function procesarBase64(accion) {
    const input = document.getElementById('base64-input').value;
    const result = document.getElementById('base64-result');
    if (!input) { result.innerText = 'Introduce texto.'; return; }
    try {
        if (accion === 'codificar') {
            result.innerText = btoa(unescape(encodeURIComponent(input)));
        } else {
            result.innerText = decodeURIComponent(escape(atob(input)));
        }
        logHerramienta('Codificador Base64', accion, input.substring(0, 30), 'ok');
    } catch {
        result.innerText = 'Error al procesar.';
    }
}

function analizarJWT() {
    const token = document.getElementById('jwt-input').value.trim();
    const result = document.getElementById('jwt-result');
    if (!token) { result.innerText = 'Introduce un token.'; return; }
    const partes = token.split('.');
    if (partes.length !== 3) { result.innerText = 'JWT inválido (debe tener 3 partes).'; return; }
    try {
        const header = JSON.parse(atob(partes[0].replace(/-/g, '+').replace(/_/g, '/')));
        const payload = JSON.parse(atob(partes[1].replace(/-/g, '+').replace(/_/g, '/')));
        result.innerHTML = `
            <p><strong>Header:</strong></p>
            <pre>${JSON.stringify(header, null, 2)}</pre>
            <p><strong>Payload:</strong></p>
            <pre>${JSON.stringify(payload, null, 2)}</pre>
        `;
        logHerramienta('Inspector de JWT', 'Analizar', 'token', 'ok');
    } catch {
        result.innerText = 'Error al decodificar el JWT.';
    }
}

function convertirFechaATimestamp() {
    const fecha = document.getElementById('ts-date-input').value;
    if (!fecha) return;
    const ts = Math.floor(new Date(fecha).getTime() / 1000);
    document.getElementById('ts-result').innerText = `Timestamp: ${ts}`;
    logHerramienta('Conversor de Timestamp', 'Fecha a Timestamp', fecha, ts);
}

function convertirTimestampAFecha() {
    const ts = parseInt(document.getElementById('ts-input').value, 10);
    if (isNaN(ts)) return;
    const fecha = new Date(ts * 1000).toISOString();
    document.getElementById('ts-result').innerText = `Fecha: ${fecha}`;
    logHerramienta('Conversor de Timestamp', 'Timestamp a Fecha', ts, fecha);
}

document.getElementById('modal-ua')?.addEventListener('click', () => {
    const result = document.getElementById('ua-result');
    if (result && !result.innerHTML) {
        result.innerHTML = `
            <p><strong>User-Agent:</strong> ${navigator.userAgent}</p>
            <p><strong>Plataforma:</strong> ${navigator.platform}</p>
            <p><strong>Idioma:</strong> ${navigator.language}</p>
            <p><strong>Pantalla:</strong> ${screen.width}x${screen.height}</p>
        `;
        logHerramienta('Analizador User-Agent', 'Consultar', '', navigator.platform);
    }
});

async function analizarHeaders() {
    const url = document.getElementById('header-url').value.trim();
    const result = document.getElementById('header-result');
    if (!url) { result.innerText = 'Introduce una URL.'; return; }
    result.innerText = 'Analizando...';
    try {
        const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`, { method: 'HEAD' });
        let html = '<ul>';
        res.headers.forEach((v, k) => { html += `<li><strong>${k}:</strong> ${v}</li>`; });
        html += '</ul>';
        result.innerHTML = html;
        logHerramienta('Inspector de Cabeceras HTTP', 'Analizar', url, 'ok');
    } catch {
        result.innerText = 'Error al analizar.';
    }
}

function analizarSSL() {
    const url = document.getElementById('ssl-url').value.trim();
    const result = document.getElementById('ssl-result');
    if (!url) { result.innerText = 'Introduce una URL.'; return; }
    result.innerText = url.startsWith('https://') ? '✓ URL usa HTTPS.' : '✗ URL no usa HTTPS.';
    logHerramienta('Analizador SSL/TLS', 'Analizar', url, result.innerText);
}

function generarUUID() {
    const uuid = crypto.randomUUID();
    document.getElementById('uuid-result').innerText = uuid;
    logHerramienta('Generador de UUID', 'Generar', '', uuid);
}

function probarRegex() {
    const patron = document.getElementById('regex-pattern').value;
    const texto = document.getElementById('regex-text').value;
    const result = document.getElementById('regex-result');
    if (!patron) { result.innerText = ''; return; }
    try {
        const re = new RegExp(patron);
        const match = re.test(texto);
        result.innerText = match ? '✓ Coincide' : '✗ No coincide';
        result.style.color = match ? 'var(--neon-green)' : 'var(--danger)';
    } catch {
        result.innerText = 'Patrón inválido.';
    }
}

function formatearJSON() {
    const input = document.getElementById('json-input').value;
    const result = document.getElementById('json-result');
    try {
        const obj = JSON.parse(input);
        result.innerHTML = `<pre>${JSON.stringify(obj, null, 2)}</pre>`;
        logHerramienta('Formateador JSON', 'Formatear', input.substring(0, 30), 'ok');
    } catch {
        result.innerText = 'JSON inválido.';
    }
}

async function analizarRobots() {
    const url = document.getElementById('robots-url').value.trim();
    const result = document.getElementById('robots-result');
    if (!url) { result.innerText = 'Introduce una URL.'; return; }
    result.innerText = 'Cargando...';
    try {
        const full = url.replace(/\/$/, '') + '/robots.txt';
        const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(full)}`);
        result.innerText = await res.text();
        logHerramienta('Analizador de Robots.txt', 'Analizar', url, 'ok');
    } catch {
        result.innerText = 'Error al cargar robots.txt.';
    }
}

async function analizarWifi() {
    const result = document.getElementById('wifi-result');
    result.innerText = 'Analizando...';
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    let html = `<p><strong>Online:</strong> ${navigator.onLine ? 'Sí' : 'No'}</p>`;
    if (conn) {
        html += `<p><strong>Tipo efectivo:</strong> ${conn.effectiveType || 'N/A'}</p>`;
        html += `<p><strong>Downlink:</strong> ${conn.downlink || 'N/A'} Mbps</p>`;
        html += `<p><strong>RTT:</strong> ${conn.rtt || 'N/A'} ms</p>`;
    } else {
        html += '<p>Tu navegador no soporta la API Network Information.</p>';
    }
    html += `<p><strong>Protocolo:</strong> ${location.protocol}</p>`;
    result.innerHTML = html;
    logHerramienta('Analizador de Red Wi-Fi', 'Analizar', '', 'ok');
}

async function analizarDNS() {
    const result = document.getElementById('dns-result');
    result.innerText = 'Comprobando...';
    try {
        const res = await fetch('https://dns.google/resolve?name=example.com&type=A');
        const data = await res.json();
        result.innerHTML = `<p><strong>DNS de Google accesible:</strong> Sí</p><p><strong>Respuesta:</strong> ${JSON.stringify(data.Answer || [])}</p>`;
        logHerramienta('Fuga de DNS', 'Comprobar', '', 'ok');
    } catch {
        result.innerText = 'Error al comprobar DNS.';
    }
}

function auditarPassword() {
    const pass = document.getElementById('pass-audit-input').value;
    const result = document.getElementById('pass-audit-result');
    if (!pass) { result.innerText = ''; return; }
    let score = 0;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (pass.length >= 16) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    let nivel = 'Muy débil';
    let color = 'var(--danger)';
    if (score >= 6) { nivel = 'Muy fuerte'; color = 'var(--neon-green)'; }
    else if (score >= 5) { nivel = 'Fuerte'; color = 'var(--neon-green)'; }
    else if (score >= 4) { nivel = 'Media'; color = 'var(--neon-gold)'; }
    else if (score >= 2) { nivel = 'Débil'; color = 'var(--neon-gold)'; }

    result.innerHTML = `<p style="color:${color};"><strong>Fortaleza:</strong> ${nivel} (${score}/7)</p>`;
    logHerramienta('Auditor de Contraseñas', 'Auditar', pass.length + ' chars', nivel);
}

async function analizarDominio() {
    const dominio = document.getElementById('domain-input').value.trim();
    const result = document.getElementById('domain-result');
    if (!dominio) { result.innerText = 'Introduce un dominio.'; return; }
    result.innerText = 'Analizando...';
    try {
        const res = await fetch(`https://dns.google/resolve?name=${dominio}&type=A`);
        const data = await res.json();
        let html = `<p><strong>Dominio:</strong> ${dominio}</p>`;
        if (data.Answer) {
            html += '<p><strong>Registros A:</strong></p><ul>';
            data.Answer.forEach(a => { html += `<li>${a.data}</li>`; });
            html += '</ul>';
        } else {
            html += '<p>No se encontraron registros A.</p>';
        }
        result.innerHTML = html;
        logHerramienta('Reconocimiento de Dominio', 'Analizar', dominio, 'ok');
    } catch {
        result.innerText = 'Error al analizar.';
    }
}

function validarEmail() {
    const email = document.getElementById('email-input').value.trim();
    const result = document.getElementById('email-result');
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) { result.innerText = 'Introduce un correo.'; return; }
    if (re.test(email)) {
        result.innerHTML = `<p style="color: var(--neon-green);">✓ Formato válido</p>`;
    } else {
        result.innerHTML = `<p style="color: var(--danger);">✗ Formato inválido</p>`;
    }
    logHerramienta('Validador de Correo', 'Validar', email, re.test(email) ? 'válido' : 'inválido');
}

async function analizarMAC() {
    const mac = document.getElementById('mac-input').value.trim();
    const result = document.getElementById('mac-result');
    if (!mac) { result.innerText = 'Introduce una MAC.'; return; }
    result.innerText = 'Buscando...';
    try {
        const res = await fetch(`https://api.macvendors.com/${encodeURIComponent(mac)}`);
        if (!res.ok) throw new Error();
        const fabricante = await res.text();
        result.innerHTML = `<p><strong>Fabricante:</strong> ${fabricante}</p>`;
        logHerramienta('Buscador de Fabricante (MAC)', 'Buscar', mac, fabricante);
    } catch {
        result.innerText = 'Fabricante no encontrado.';
    }
}

function generarPayload() {
    const tipo = document.getElementById('payload-tipo').value;
    const input = document.getElementById('payload-input').value.trim();
    const result = document.getElementById('payload-result');
    if (!input) { result.innerText = 'Introduce un texto o URL.'; return; }
    let payload = '';
    if (tipo === 'xss') payload = `<script>alert('XSS')</script>`;
    else if (tipo === 'sqli') payload = `' OR '1'='1`;
    else if (tipo === 'lfi') payload = `../../../../etc/passwd`;
    result.innerText = payload;
    logHerramienta('Generador de Payloads', tipo, input, payload);
}

async function buscarCVE() {
    const query = document.getElementById('cve-input').value.trim();
    const result = document.getElementById('cve-result');
    if (!query) { result.innerText = 'Introduce un término de búsqueda.'; return; }
    result.innerText = 'Buscando...';
    try {
        const res = await fetch(`https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${encodeURIComponent(query)}&resultsPerPage=5`);
        const data = await res.json();
        if (!data.vulnerabilities || !data.vulnerabilities.length) {
            result.innerText = 'No se encontraron CVEs.';
            return;
        }
        let html = '<ul style="list-style:none;padding:0;">';
        data.vulnerabilities.forEach(v => {
            const cve = v.cve;
            const desc = cve.descriptions?.find(d => d.lang === 'en')?.value || 'Sin descripción.';
            html += `
                <li style="margin-bottom:15px;padding:10px;border-left:3px solid var(--danger);">
                    <strong>${cve.id}</strong><br>
                    <span style="font-size:0.9rem;">${desc.substring(0, 200)}...</span>
                </li>
            `;
        });
        html += '</ul>';
        result.innerHTML = html;
        logHerramienta('Buscador de CVEs', 'Buscar', query, 'ok');
    } catch {
        result.innerText = 'Error al buscar CVEs.';
    }
}

function abrirCanarytoken(tipo, descripcion) {
    window.open('https://canarytokens.org/generate', '_blank', 'noopener');
    logHerramienta('Canarytokens', tipo, descripcion, 'abierto');
}

function inicializarBurbujaCVE() {
    if (document.getElementById('cve-bubble')) return;

    const bubble = document.createElement('button');
    bubble.id = 'cve-bubble';
    bubble.className = 'cve-bubble';
    bubble.setAttribute('aria-label', 'Alertas CVE');
    bubble.innerHTML = `🚨<span class="cve-bubble-count" id="cve-bubble-count" style="display:none;">0</span>`;
    document.body.appendChild(bubble);

    const panel = document.createElement('div');
    panel.id = 'cve-panel';
    panel.className = 'cve-panel';
    panel.innerHTML = `
        <div class="cve-panel-header">
            <h3>🚨 Alertas CVE</h3>
            <button type="button" onclick="cerrarPanelCVE()" aria-label="Cerrar">×</button>
        </div>
        <div class="cve-panel-body" id="cve-panel-body">
            <p style="text-align:center;color:var(--text-muted);font-size:0.85rem;">Cargando...</p>
        </div>
        <div class="cve-panel-footer">
            Últimas 20 · Fuente: <a href="https://cve.circl.lu" target="_blank" rel="noopener noreferrer" style="color:var(--neon-blue);">CIRCL</a>
        </div>
    `;
    document.body.appendChild(panel);

    bubble.addEventListener('click', togglePanelCVE);
    cargarCVE();
}

function togglePanelCVE() {
    const panel = document.getElementById('cve-panel');
    const bubble = document.getElementById('cve-bubble');
    if (!panel || !bubble) return;
    const abierto = panel.classList.toggle('open');
    if (abierto) {
        bubble.classList.remove('pulse');
        localStorage.setItem('cve_vistos', JSON.stringify([]));
        actualizarContadorCVE(0);
    }
}

function cerrarPanelCVE() {
    document.getElementById('cve-panel')?.classList.remove('open');
}

function actualizarContadorCVE(n) {
    const count = document.getElementById('cve-bubble-count');
    if (!count) return;
    if (n > 0) {
        count.innerText = n > 99 ? '99+' : n;
        count.style.display = 'flex';
    } else {
        count.style.display = 'none';
    }
}

async function cargarCVE() {
    const body = document.getElementById('cve-panel-body');
    if (!body) return;
    try {
        const res = await fetch('https://cve.circl.lu/api/last/20');
        const data = await res.json();
        if (!Array.isArray(data) || !data.length) {
            body.innerHTML = '<p style="text-align:center;color:var(--text-muted);font-size:0.85rem;">No hay alertas disponibles.</p>';
            return;
        }

        const vistos = JSON.parse(localStorage.getItem('cve_vistos') || '[]');
        const nuevos = data.map(c => c.id).filter(id => !vistos.includes(id));
        if (nuevos.length > 0) {
            actualizarContadorCVE(nuevos.length);
            document.getElementById('cve-bubble')?.classList.add('pulse');
            localStorage.setItem('cve_vistos', JSON.stringify(data.map(c => c.id)));
        }

        body.innerHTML = data.map(cve => {
            const desc = cve.summary ? cve.summary.substring(0, 160) + '…' : 'Sin descripción.';
            const fecha = cve.Published ? new Date(cve.Published).toLocaleDateString('es-ES') : '—';
            return `
                <div class="cve-item">
                    <div class="cve-item-header">
                        <span class="cve-item-id">${cve.id}</span>
                        <span class="cve-item-date">${fecha}</span>
                    </div>
                    <div class="cve-item-desc">${desc}</div>
                    <a href="https://nvd.nist.gov/vuln/detail/${cve.id}" target="_blank" rel="noopener noreferrer" class="cve-item-link">Ver en NVD →</a>
                </div>
            `;
        }).join('');
    } catch {
        body.innerHTML = '<p style="text-align:center;color:var(--danger);font-size:0.85rem;">Error al cargar alertas.</p>';
    }
}

window.addEventListener('load', async () => {
    await comprobarSesion();
    const activeKey = document.body.dataset.nav || '';
    renderHeader(activeKey);
    comprobarDisclaimer();
    protegerContenidoPrivado();

    if (window.location.pathname.includes('biblioteca.html')) cargarBiblioteca();
    if (window.location.pathname.includes('perfil.html')) cargarPerfil();

    inicializarBurbujaCVE();

    if (!sessionStorage.getItem('visita_alertada')) {
        fetch(`${API_URL}/visita.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: window.location.href })
        }).catch(() => {});
        sessionStorage.setItem('visita_alertada', 'true');
    }
});
