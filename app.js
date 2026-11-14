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
            'formacion':      { titulo: 'Formación y Certificaciones', icono: '🎓', descripcion: 'Cursos, plataformas y certificaciones para iniciarte o especializarte.' },
            'red-team-rec':   { titulo: 'Red Team & Pentesting',       icono: '⚔️', descripcion: 'Herramientas y documentación para pruebas de penetración.' },
            'blue-team-rec':  { titulo: 'Blue Team & Forense',         icono: '🛡️', descripcion: 'Defensa, análisis forense y respuesta a incidentes.' },
            'osint-rec':      { titulo: 'OSINT e Inteligencia',        icono: '🕵️', descripcion: 'Inteligencia de fuentes abiertas para investigar.' },
            'sistemas':       { titulo: 'Sistemas Operativos',         icono: '💻', descripcion: 'Distribuciones Linux y entornos de seguridad.' },
            'libros':         { titulo: 'Referentes y Libros',         icono: '📚', descripcion: 'Hackers destacados y bibliografía en español.' },
            'metodos':        { titulo: 'Métodos y Metodologías',      icono: '📋', descripcion: 'Metodologías de auditoría y pentesting.' },
            'iot':            { titulo: 'IoT y Hardware',              icono: '🔌', descripcion: 'Internet de las Cosas y hacking de hardware.' },
            'redes-rec':      { titulo: 'Redes y Protocolos',          icono: '🌐', descripcion: 'Protocolos, análisis de tráfico y arquitecturas.' },
            'wifi-rec':       { titulo: 'Wi-Fi y Radiofrecuencia',     icono: '📡', descripcion: 'Hacking inalámbrico, SDR y radiofrecuencia.' },
            'programacion':   { titulo: 'Programación y Desarrollo',   icono: '💻', descripcion: 'Lenguajes, scripts y desarrollo de herramientas.' }
        }
    },
    cve: {
        titulo: 'CVE en Tiempo Real',
        icono: '🚨',
        descripcion: 'Últimas vulnerabilidades publicadas oficialmente.'
    }
};

let usuarioLogueado = null;
let temp2FAMetodo = null;

function inicializarTema() {
    const guardado = localStorage.getItem('tema');
    const btn = document.getElementById('theme-toggle');
    if (guardado === 'light') document.body.classList.add('light-mode');
    if (btn) {
        btn.innerText = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
        btn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const light = document.body.classList.contains('light-mode');
            localStorage.setItem('tema', light ? 'light' : 'dark');
            btn.innerText = light ? '☀️' : '🌙';
        });
    }
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
    }).catch(() => {});
}

async function comprobarSesion() {
    try {
        const res = await fetch(`${API_URL}/comprobar_sesion.php`, { credentials: 'include' });
        const result = await res.json();
        if (result.logueado) usuarioLogueado = result;
    } catch { /* offline */ }
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
    const privadas = ['biblioteca.html', 'perfil.html'];
    if (!privadas.some(p => path.includes(p))) return;
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
    if (t.includes('noticia') || t.includes('comunidad')) return 'badge-noticia';
    if (t.includes('documentación')) return 'badge-doc';
    if (t.includes('laboratorio')) return 'badge-lab';
    return 'badge-default';
}

async function votarRecurso(id, btn) {
    if (!usuarioLogueado) { mostrarToast('Inicia sesión para votar.', 'error'); return; }
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
        } else mostrarToast(result.message, 'error');
    } catch { mostrarToast('Error al votar.', 'error'); }
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

    if (seccion === 'cve') return renderCVE(contenedor);
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
        if (!res.ok) throw new Error('red');
        const result = await res.json();
        if (!result.success) throw new Error('api');

        const recursos = result.data.find(c => c.slug === categoria)?.recursos ?? [];

        const items = recursos.map(r => {
            const badge = r.tipo ? `<span class="badge ${getBadgeClass(r.tipo)}">${r.tipo}</span>` : '';
            const votado = result.votos.includes(Number(r.id)) ? 'votado' : '';
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
                        <button class="btn-voto ${votado}" onclick="votarRecurso(${r.id}, this)">⭐ <span>${r.votos || 0}</span></button>
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
                ${items || '<li style="text-align:center;padding:20px;">No hay recursos en esta categoría.</li>'}
            </ul>
        `;
    } catch {
        contenedor.innerHTML = '<p style="color: var(--danger);">Error al cargar los recursos.</p>';
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

async function renderCVE(contenedor) {
    contenedor.innerHTML = `
        ${breadcrumb([
            { label: 'Inicio', href: 'index.html' },
            { label: 'Biblioteca', href: 'biblioteca.html' },
            { label: 'CVE en Tiempo Real' }
        ])}
        <div class="category-header">
            <h2>🚨 Alertas de Vulnerabilidad</h2>
            <p>Últimas publicaciones oficiales de CVE (Common Vulnerabilities and Exposures).</p>
        </div>
        <div id="cve-lista" style="display: flex; flex-direction: column; gap: 15px;">
            <p style="text-align: center; color: var(--text-muted);">Cargando alertas...</p>
        </div>
    `;

    try {
        const res = await fetch('https://cve.circl.lu/api/last/20');
        const data = await res.json();
        const lista = document.getElementById('cve-lista');
        if (!Array.isArray(data) || !data.length) {
            lista.innerHTML = '<p style="text-align:center;color:var(--text-muted);">No hay alertas disponibles.</p>';
            return;
        }
        lista.innerHTML = data.map(cve => {
            const desc = cve.summary ? cve.summary.substring(0, 200) + '…' : 'Sin descripción.';
            const fecha = cve.Published ? new Date(cve.Published).toLocaleDateString('es-ES') : 'Fecha desconocida';
            return `
                <div class="resource-item" style="border-left: 4px solid var(--danger);">
                    <div class="resource-header">
                        <span class="resource-title" style="color: var(--danger);">${cve.id}</span>
                        <span class="badge badge-sistema">${fecha}</span>
                    </div>
                    <div class="resource-desc">${desc}</div>
                    <div class="resource-actions">
                        <a href="https://nvd.nist.gov/vuln/detail/${cve.id}" target="_blank" rel="noopener noreferrer" class="btn-link">[Ver en NVD]</a>
                    </div>
                </div>
            `;
        }).join('');
    } catch {
        document.getElementById('cve-lista').innerHTML = '<p style="text-align:center;color:var(--danger);">Error al cargar las alertas.</p>';
    }
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

async function solicitarReset() {
    const email = prompt('Confirma tu correo electrónico:');
    if (!email) return;
    try {
        const res = await fetch(`${API_URL}/solicitar_reset.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const result = await res.json();
        mostrarToast(result.message, result.success ? 'success' : 'error');
    } catch { mostrarToast('Error de conexión.', 'error'); }
}

async function enviarReset() {
    const email = document.getElementById('forgot-email')?.value;
    if (!email) { mostrarToast('Introduce tu correo.', 'error'); return; }
    try {
        const res = await fetch(`${API_URL}/solicitar_reset.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        const result = await res.json();
        mostrarToast(result.message, result.success ? 'success' : 'error');
        if (result.success) cerrarModal('modal-forgot');
    } catch { mostrarToast('Error de conexión.', 'error'); }
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

window.addEventListener('load', async () => {
    await comprobarSesion();
    const activeKey = document.body.dataset.nav || '';
    renderHeader(activeKey);
    comprobarDisclaimer();
    protegerContenidoPrivado();

    if (window.location.pathname.includes('biblioteca.html')) cargarBiblioteca();
    if (window.location.pathname.includes('perfil.html')) cargarPerfil();

    if (!sessionStorage.getItem('visita_alertada')) {
        fetch(`${API_URL}/visita.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: window.location.href })
        }).catch(() => {});
        sessionStorage.setItem('visita_alertada', 'true');
    }
});
