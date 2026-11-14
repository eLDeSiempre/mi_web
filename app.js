const API_URL = 'https://api.eldesiempre.es';
let usuarioLogueado = null;
let temp2FAMetodo = null;

function inicializarTema() {
    const temaGuardado = localStorage.getItem('tema');
    const body = document.body;
    const btnToggle = document.getElementById('theme-toggle');
    if (temaGuardado === 'light') body.classList.add('light-mode');
    if (btnToggle) {
        btnToggle.innerText = body.classList.contains('light-mode') ? '☀️' : '🌙';
        btnToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                localStorage.setItem('tema', 'light');
                btnToggle.innerText = '☀️';
            } else {
                localStorage.setItem('tema', 'dark');
                btnToggle.innerText = '🌙';
            }
        });
    }
}

function comprobarDisclaimer() {
    const modal = document.getElementById('disclaimer-modal');
    if (!modal) return;
    if (localStorage.getItem('disclaimerAceptado') === 'true') {
        modal.style.display = 'none';
        document.body.classList.remove('locked');
        if (!localStorage.getItem('cookiesAceptadas')) {
            const banner = document.getElementById('cookie-banner');
            if(banner) banner.style.display = 'flex';
        }
    } else {
        modal.style.display = 'flex';
        document.body.classList.add('locked');
    }
}

function abrirModal(id) { const modal = document.getElementById(id); if(modal) modal.classList.add('active'); }
function cerrarModal(id) { const modal = document.getElementById(id); if(modal) modal.classList.remove('active'); }
function mostrarAvisoLegal(e) { if (e) e.preventDefault(); abrirModal('modal-legal'); }

function mostrarToast(mensaje, tipo = 'success') {
    const container = document.getElementById('toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast ' + tipo;
    toast.innerText = mensaje;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 4000);
}

function aceptarDisclaimer() {
    const modal = document.getElementById('disclaimer-modal');
    if(modal) modal.style.display = 'none';
    document.body.classList.remove('locked');
    localStorage.setItem('disclaimerAceptado', 'true');
    if (!localStorage.getItem('cookiesAceptadas')) {
        const banner = document.getElementById('cookie-banner');
        if(banner) banner.style.display = 'flex';
    }
}

function aceptarCookies(aceptadas) {
    localStorage.setItem('cookiesAceptadas', aceptadas ? 'true' : 'false');
    const banner = document.getElementById('cookie-banner');
    if(banner) banner.style.display = 'none';
    if (!aceptadas && typeof _paq !== 'undefined') {
        _paq.push(['disableCookies']);
        _paq.push(['forgetUser']);
    }
}

function copiarAlPortapapeles(texto, moneda) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto).then(() => mostrarToast('Dirección de ' + moneda + ' copiada', 'success')).catch(err => mostrarToast('No se pudo copiar.', 'error'));
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = texto;
        textArea.style.position = "fixed"; textArea.style.left = "-999999px";
        document.body.appendChild(textArea); textArea.focus(); textArea.select();
        try { document.execCommand('copy'); mostrarToast('Copiado', 'success'); } 
        catch (err) { mostrarToast('Error al copiar', 'error'); }
        textArea.remove();
    }
}

function logHerramienta(herramienta, accion, input = "", output = "") {
    fetch(`${API_URL}/herramientas.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ herramienta, accion, input, output }),
        credentials: 'include'
    }).catch(err => console.log("Error log"));
}

function comprobarAcceso(url) {
    if (usuarioLogueado) window.location.href = url;
    else {
        mostrarToast("Debes iniciar sesión para acceder.", "error");
        setTimeout(() => window.location.href = 'login.html', 1500);
    }
}

async function comprobarSesion() {
    try {
        const response = await fetch(`${API_URL}/comprobar_sesion.php`, { method: 'GET', credentials: 'include' });
        const result = await response.json();
        if (result.logueado) {
            usuarioLogueado = result;
            const btnLogin = document.getElementById('nav-login-btn');
            const btnLogout = document.getElementById('nav-logout-btn');
            const btnPerfil = document.getElementById('nav-perfil-btn');
            if(btnLogin) btnLogin.style.display = 'none';
            if(btnLogout) btnLogout.style.display = 'block';
            if(btnPerfil) btnPerfil.style.display = 'block';
        }
    } catch (error) {}
}

async function cerrarSesion() { 
    try { await fetch(`${API_URL}/logout.php`, { credentials: 'include' }); } catch (error) {}
    window.location.href = 'index.html';
}

function protegerContenidoPrivado() {
    const path = window.location.pathname;
    if (path.includes('biblioteca.html') || path.includes('perfil.html')) {
        const mainContent = document.querySelector('main.container');
        if (mainContent && !window.location.search.includes('cat=')) { 
            mainContent.style.display = 'none';
            setTimeout(() => {
                if (usuarioLogueado) mainContent.style.display = 'block';
                else {
                    mostrarToast("Acceso denegado.", "error");
                    setTimeout(() => window.location.href = 'login.html', 1000);
                }
            }, 500);
        } else if (mainContent) {
             mainContent.style.display = 'block';
        }
    }
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
    if(!usuarioLogueado) { mostrarToast("Inicia sesión para votar.", "error"); return; }
    try {
        const response = await fetch(`${API_URL}/votar.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recurso_id: id }),
            credentials: 'include'
        });
        const result = await response.json();
        if (result.success) {
            btn.classList.toggle('votado');
            const span = btn.querySelector('span');
            span.innerText = result.votos;
        } else {
            mostrarToast(result.message, "error");
        }
    } catch (error) { mostrarToast("Error al votar.", "error"); }
}

document.getElementById('form-login')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { correo: document.getElementById('login-correo').value, contrasena: document.getElementById('login-contrasena').value };
    try {
        const response = await fetch(`${API_URL}/login.php`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data), credentials: 'include' });
        const result = await response.json();
        if (result.success) {
            if (result.requiere_2fa) {
                temp2FAMetodo = result.requiere_2fa;
                mostrarToast(result.message, 'success');
                abrirModal('modal-2fa');
            } else {
                mostrarToast('Bienvenido ' + result.nombre, 'success');
                setTimeout(() => window.location.href = 'biblioteca.html', 1000);
            }
        } else { mostrarToast('Error: ' + result.message, 'error'); }
    } catch (error) { mostrarToast('Error de conexión.', 'error'); }
});

async function verificar2FALogin() {
    const codigo = document.getElementById('2fa-codigo').value;
    if (!codigo) { mostrarToast("Introduce el código.", "error"); return; }
    try {
        const response = await fetch(`${API_URL}/verificar_2fa_login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo: codigo, metodo: temp2FAMetodo }),
            credentials: 'include'
        });
        const result = await response.json();
        if (result.success) {
            mostrarToast('Login exitoso.', 'success');
            setTimeout(() => window.location.href = 'biblioteca.html', 1000);
        } else {
            mostrarToast(result.message, 'error');
        }
    } catch (error) { mostrarToast("Error de conexión.", "error"); }
}

document.getElementById('form-registro')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { nombre_completo: document.getElementById('reg-nombre').value, usuario: document.getElementById('reg-usuario').value, correo: document.getElementById('reg-correo').value, contrasena: document.getElementById('reg-contrasena').value };
    try {
        const response = await fetch(`${API_URL}/registro.php`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data), credentials: 'include' });
        const result = await response.json();
        if (result.success) {
            mostrarToast('Registro exitoso.', 'success');
            document.getElementById('form-registro').reset();
            document.getElementById('form-login').style.display = 'block';
            document.getElementById('form-registro').style.display = 'none';
        } else { mostrarToast('Error: ' + result.message, 'error'); }
    } catch (error) { mostrarToast('Error de conexión.', 'error'); }
});

function toggleAuthForms(event) {
    if(event) event.preventDefault();
    const formLogin = document.getElementById('form-login');
    const formRegistro = document.getElementById('form-registro');
    if (formLogin.style.display === 'none') { formLogin.style.display = 'block'; formRegistro.style.display = 'none'; } 
    else { formLogin.style.display = 'none'; formRegistro.style.display = 'block'; }
}

async function cargarPerfil() {
    const userSpan = document.getElementById('perfil-usuario');
    const nameSpan = document.getElementById('perfil-nombre');
    const bioInput = document.getElementById('perfil-bio');
    const habInput = document.getElementById('perfil-habilidades');
    const gitInput = document.getElementById('perfil-github');
    const btn2FAEmail = document.getElementById('btn-2fa-email');
    const btn2FATOTP = document.getElementById('btn-2fa-totp');

    if (!userSpan || !usuarioLogueado) return;
    userSpan.innerText = usuarioLogueado.usuario;
    nameSpan.innerText = usuarioLogueado.nombre;
    
    try {
        const response = await fetch(`${API_URL}/obtener_perfil.php`, { method: 'GET', credentials: 'include' });
        const result = await response.json();
        if (result.success) {
            if(bioInput) bioInput.value = result.data.bio || '';
            if(habInput) habInput.value = result.data.habilidades || '';
            if(gitInput) gitInput.value = result.data.github || '';
            
            if (btn2FAEmail) {
                if (result.data.twofa_email_activo) {
                    btn2FAEmail.innerText = 'Contactar Soporte';
                    btn2FAEmail.onclick = () => window.location.href = 'contacto.html';
                } else {
                    btn2FAEmail.innerText = 'Activar';
                    btn2FAEmail.onclick = toggle2FAEmail;
                }
            }

            if (btn2FATOTP && result.data.twofa_totp_activo) {
                btn2FATOTP.innerText = 'Contactar Soporte';
                btn2FATOTP.onclick = () => window.location.href = 'contacto.html';
            }
        }
    } catch(e) {}
}

document.getElementById('form-perfil')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bio = document.getElementById('perfil-bio').value;
    const habilidades = document.getElementById('perfil-habilidades').value;
    const github = document.getElementById('perfil-github').value;
    try {
        const response = await fetch(`${API_URL}/actualizar_perfil.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bio, habilidades, github }),
            credentials: 'include'
        });
        const result = await response.json();
        if(result.success) mostrarToast('Perfil actualizado.', 'success');
        else mostrarToast('Error al actualizar.', 'error');
    } catch(e) { mostrarToast('Error de conexión.', 'error'); }
});

async function solicitarReset() {
    const email = prompt("Confirma tu correo electrónico para recibir el enlace:");
    if (!email) return;
    try {
        const response = await fetch(`${API_URL}/solicitar_reset.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });
        const result = await response.json();
        mostrarToast(result.message, result.success ? 'success' : 'error');
    } catch (e) { mostrarToast("Error de conexión.", "error"); }
}

async function enviarReset() {
    const email = document.getElementById('forgot-email').value;
    if (!email) {
        mostrarToast("Introduce tu correo electrónico.", "error");
        return;
    }
    try {
        const response = await fetch(`${API_URL}/solicitar_reset.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });
        const result = await response.json();
        mostrarToast(result.message, result.success ? 'success' : 'error');
        if (result.success) {
            cerrarModal('modal-forgot');
        }
    } catch (e) { 
        mostrarToast("Error de conexión.", "error"); 
    }
}

async function toggle2FAEmail() {
    try {
        const response = await fetch(`${API_URL}/activar_2fa_email.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ activo: true }),
            credentials: 'include'
        });
        const result = await response.json();
        mostrarToast(result.message, result.success ? 'success' : 'error');
        if (result.success) {
            const btn = document.getElementById('btn-2fa-email');
            btn.innerText = 'Contactar Soporte';
            btn.onclick = () => window.location.href = 'contacto.html';
        }
    } catch (e) { 
        mostrarToast("Error de conexión.", "error"); 
    }
}

async function iniciar2FATOTP() {
    try {
        const response = await fetch(`${API_URL}/generar_2fa_totp.php`, { credentials: 'include' });
        const result = await response.json();
        if (result.success) {
            document.getElementById('qr-container').innerHTML = `<img src="${result.qr_svg}" alt="Código QR" style="width: 100%; max-width: 200px; height: auto;">`;
            document.getElementById('secret-text').innerText = result.secret;
            abrirModal('modal-totp');
        } else {
            mostrarToast(result.message, "error");
        }
    } catch (e) { mostrarToast("Error al generar QR.", "error"); }
}

async function confirmar2FATOTP() {
    const codigo = document.getElementById('totp-codigo').value;
    try {
        const response = await fetch(`${API_URL}/confirmar_2fa_totp.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo: codigo }),
            credentials: 'include'
        });
        const result = await response.json();
        mostrarToast(result.message, result.success ? 'success' : 'error');
        if (result.success) {
            cerrarModal('modal-totp');
            const btn = document.getElementById('btn-2fa-totp');
            btn.innerText = 'Contactar Soporte';
            btn.onclick = () => window.location.href = 'contacto.html';
        }
    } catch (e) { mostrarToast("Error", "error"); }
}

async function cargarBiblioteca() {
    const contenedor = document.getElementById('contenedor-biblioteca');
    if (!contenedor) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo');
    const categoriaActual = urlParams.get('cat');

    const estructuraHerramientas = {
        "red-team": {
            titulo: "Red Team & Pentesting",
            icon: "⚔️",
            desc: "Herramientas para simular ataques, encontrar vulnerabilidades y explotar sistemas.",
            herramientas: [
                { id: 'dorks', titulo: 'Generador de Dorks', desc: 'Trucos de búsqueda avanzada en Google para encontrar archivos expuestos.', ideal: 'Encontrar documentos filtrados.' },
                { id: 'payloads', titulo: 'Generador de Payloads', desc: 'Crea payloads básicos para pruebas de inyección (XSS, SQLi).', ideal: 'Pruebas de concepto rápidas.' },
                { id: 'cve', titulo: 'Buscador de CVEs', desc: 'Consulta la base de datos de vulnerabilidades conocidas.', ideal: 'Investigar fallos de seguridad.' }
            ]
        },
        "blue-team": {
            titulo: "Blue Team & Forense",
            icon: "🛡️",
            desc: "Herramientas para defensa, análisis de malware y respuesta a incidentes.",
            herramientas: [
                { id: 'hash', titulo: 'Analizador de Hash', desc: 'Identifica el tipo de hash (MD5, SHA-1, SHA-256) y busca su origen.', ideal: 'Análisis de integridad.' },
                { id: 'ssl', titulo: 'Analizador SSL/TLS', desc: 'Comprueba la validez del certificado SSL de un dominio.', ideal: 'Auditar seguridad de servidores.' },
                { id: 'http-headers', titulo: 'Inspector de Cabeceras HTTP', desc: 'Analiza las cabeceras de seguridad de cualquier sitio web.', ideal: 'Auditar configuraciones web.' }
            ]
        },
        "osint": {
            titulo: "OSINT e Inteligencia",
            icon: "🕵️",
            desc: "Recopila información de fuentes abiertas para investigaciones.",
            herramientas: [
                { id: 'osint', titulo: 'OSINT Framework', desc: 'Árbol genealógico de internet. Muestra dónde buscar información pública.', ideal: 'Investigar antecedentes.' },
                { id: 'ip', titulo: 'Buscador de IP / OSINT', desc: 'Descubre el país, ciudad y proveedor de una dirección IP o dominio.', ideal: 'Rastrear origen de una visita.' },
                { id: 'domain', titulo: 'Reconocimiento de Dominio', desc: 'Descubre la IP, hosting y servidores de correo (MX) de un dominio.', ideal: 'OSINT de infraestructura.' },
                { id: 'mac', titulo: 'Buscador de Fabricante (MAC)', desc: 'Introduce una MAC y descubre a qué fabricante pertenece.', ideal: 'Análisis de redes locales.' },
                { id: 'email', titulo: 'Validador de Correo', desc: 'Verifica si un correo tiene formato válido y si el dominio existe.', ideal: 'Limpieza de bases de datos.' }
            ]
        },
        "utilidades": {
            titulo: "Utilidades y Análisis",
            icon: "🧰",
            desc: "Herramientas para análisis de datos, criptografía y conversión.",
            herramientas: [
                { id: 'exif', titulo: 'Analizador EXIF', desc: 'Extrae datos ocultos de imágenes (hora, modelo del móvil, GPS).', ideal: 'Saber si una foto revela tu ubicación.' },
                { id: 'pass', titulo: 'Generador de Contraseñas', desc: 'Crea contraseñas súper seguras y aleatorias.', ideal: 'Proteger tus cuentas.' },
                { id: 'pass-strength', titulo: 'Auditor de Contraseñas', desc: 'Comprueba cuánto tardaría un hacker en descifrar tu contraseña.', ideal: 'Mejorar tu seguridad personal.' },
                { id: 'base64', titulo: 'Codificador Base64', desc: 'Convierte texto a Base64 o viceversa.', ideal: 'Depurar peticiones web.' },
                { id: 'jwt', titulo: 'Inspector de JWT', desc: 'Pega un token JWT y descubre qué información oculta.', ideal: 'Entender autenticación moderna.' },
                { id: 'json', titulo: 'Formateador JSON', desc: 'Valida y formatea documentos JSON para que sean legibles.', ideal: 'Análisis de APIs y logs.' },
                { id: 'regex', titulo: 'Probador de Regex', desc: 'Prueba patrones de búsqueda (Regex) en tiempo real.', ideal: 'Programación y filtrado de datos.' },
                { id: 'timestamp', titulo: 'Conversor de Timestamp', desc: 'Convierte fechas normales a formato Unix y viceversa.', ideal: 'Análisis forense y logs.' },
                { id: 'uuid', titulo: 'Generador de UUID', desc: 'Crea identificadores únicos universales (v4).', ideal: 'Desarrollo de software seguro.' }
            ]
        },
        "redes": {
            titulo: "Redes y Comunicaciones",
            icon: "🌐",
            desc: "Analiza la seguridad de tu conexión y protocolos de red.",
            herramientas: [
                { id: 'wifi', titulo: 'Analizador de Red Wi-Fi', desc: 'Analiza la calidad y seguridad de tu conexión actual.', ideal: 'Saber si tu red doméstica es segura.' },
                { id: 'dns', titulo: 'Fuga de DNS (DNS Leak)', desc: 'Comprueba si tu proveedor filtra tu tráfico real.', ideal: 'Verificar privacidad de VPN.' },
                { id: 'robots', titulo: 'Analizador de Robots.txt', desc: 'Descubre qué directorios intenta ocultar un sitio web.', ideal: 'Reconocimiento web (OSINT).' },
                { id: 'ua', titulo: 'Analizador User-Agent', desc: 'Descubre qué sistema operativo y navegador usas.', ideal: 'Pruebas de compatibilidad web.' }
            ]
        },
        "senuelos": {
            titulo: "Canarytokens (Señuelos)",
            icon: "🪤",
            desc: "Genera trampas invisibles. Si un atacante interactúa, recibirás una alerta.",
            herramientas: [
                { id: 'web-bug', titulo: 'Web bug', desc: 'Alerta cuando un atacante visita tu URL.', ideal: 'Detectar escaneos web.' },
                { id: 'dns-token', titulo: 'DNS Token', desc: 'Alerta cuando alguien resuelve tu nombre DNS.', ideal: 'Detectar reconocimiento de dominio.' },
                { id: 'aws-token', titulo: 'Claves de AWS', desc: 'Alerta si usan tu clave API de AWS falsa.', ideal: 'Detectar accesos a la nube.' },
                { id: 'word-token', titulo: 'Documento Word', desc: 'Alerta si abren un documento Word señuelo.', ideal: 'Detectar phishing interno.' },
                { id: 'qr-token', titulo: 'Código QR', desc: 'Alerta si alguien escanea tu código QR.', ideal: 'Campañas de concienciación.' }
            ]
        }
    };

    const estructuraRecursos = {
        "formacion": { titulo: "Formación y Certificaciones", icon: "🎓", desc: "Cursos, plataformas y certificaciones para iniciarte o especializarte.", ids: [1, 12, 13, 14, 15, 4, 5, 6, 7, 19, 20, 21] },
        "red-team-rec": { titulo: "Red Team & Pentesting", icon: "⚔️", desc: "Herramientas y documentación para pruebas de penetración y explotación.", ids: [2, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34] },
        "blue-team-rec": { titulo: "Blue Team & Forense", icon: "🛡️", desc: "Defensa, análisis forense y respuesta a incidentes.", ids: [3, 35, 36, 37, 38, 39, 40] },
        "osint-rec": { titulo: "OSINT e Inteligencia", icon: "🕵️", desc: "Inteligencia de fuentes abiertas para investigar y recopilar información.", ids: [41, 42, 44, 45, 46, 47, 48, 49, 50] },
        "sistemas": { titulo: "Sistemas Operativos", icon: "💻", desc: "Distribuciones Linux y entornos de trabajo para seguridad.", ids: [58, 59, 60, 61, 62, 63, 64, 65] },
        "libros": { titulo: "Referentes y Libros", icon: "📚", desc: "Hackers destacados y bibliografía esencial en español.", ids: [71, 72, 73, 74, 75, 76, 84, 85, 86, 9, 77, 78, 79, 80, 81, 82, 83, 87, 88] }
    };

    if (!tipo && !categoriaActual) {
        let html = `<h2>Biblioteca de Ciberseguridad</h2><p style="margin-bottom: 30px; color: var(--text-muted);">Elige qué quieres explorar hoy.</p>`;
        html += `
        <div class="folder-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
            <a href="biblioteca.html?tipo=herramientas" class="folder" style="border-color: var(--neon-blue);">
                <div class="folder-icon" style="font-size: 3rem;">🛠️</div>
                <h3>Laboratorio de Herramientas</h3>
                <p>Utilidades interactivas para OSINT, Redes, Pentesting y análisis.</p>
                <span class="folder-badge" style="background: var(--neon-blue); color: var(--bg-color);">Explorar Herramientas</span>
            </a>
            <a href="biblioteca.html?tipo=recursos" class="folder" style="border-color: var(--neon-green);">
                <div class="folder-icon" style="font-size: 3rem;">📚</div>
                <h3>Directorio de Recursos</h3>
                <p>Cursos, libros, plataformas y referentes del hacking ético en español.</p>
                <span class="folder-badge" style="background: var(--neon-green); color: var(--bg-color);">Explorar Recursos</span>
            </a>
        </div>`;
        contenedor.innerHTML = html;
        return;
    }

    if (tipo === 'herramientas' && !categoriaActual) {
        let html = `<div class="breadcrumb"><a href="biblioteca.html">Biblioteca</a> / <span>Herramientas</span></div><h2>Laboratorio de Herramientas</h2><p style="margin-bottom: 20px; color: var(--text-muted);">Selecciona una categoría para explorar.</p><div class="folder-grid">`;
        for (const [slug, data] of Object.entries(estructuraHerramientas)) {
            html += `
                <a href="biblioteca.html?tipo=herramientas&cat=${slug}" class="folder">
                    <div class="folder-icon">${data.icon}</div>
                    <h3>${data.titulo}</h3>
                    <p>${data.desc}</p>
                    <span class="folder-badge">${data.herramientas.length} herramientas</span>
                </a>
            `;
        }
        html += `</div>`;
        contenedor.innerHTML = html;
        return;
    }

    if (tipo === 'herramientas' && categoriaActual) {
        const dataCat = estructuraHerramientas[categoriaActual];
        if (!dataCat) { contenedor.innerHTML = "<p>Categoría no encontrada.</p>"; return; }

        let html = `
            <div class="breadcrumb">
                <a href="biblioteca.html">Biblioteca</a> / <a href="biblioteca.html?tipo=herramientas">Herramientas</a> / <span>${dataCat.titulo}</span>
            </div>
            <div class="category-header">
                <h2>${dataCat.icon} ${dataCat.titulo}</h2>
                <p>${dataCat.desc}</p>
                <input type="text" id="buscador-herramientas" class="tool-input" placeholder="🔍 Buscar herramienta..." oninput="filtrarHerramientas()">
            </div>
            <div class="grid-cards" id="lista-herramientas">
        `;

        dataCat.herramientas.forEach(h => {
            html += `
                <div class="card" data-titulo="${h.titulo.toLowerCase()}" onclick="abrirModal('modal-${h.id}')">
                    <h3>${h.titulo}</h3>
                    <p>${h.desc}</p>
                    <p style="color: var(--neon-gold); font-size: 0.85rem; font-weight: bold; margin-top: auto;">Ideal para: ${h.ideal}</p>
                </div>
            `;
        });

        html += `</div>`;
        contenedor.innerHTML = html;
        return;
    }

    if (tipo === 'recursos' && !categoriaActual) {
        let html = `<div class="breadcrumb"><a href="biblioteca.html">Biblioteca</a> / <span>Recursos</span></div><h2>Directorio de Recursos</h2><p style="margin-bottom: 20px; color: var(--text-muted);">Selecciona una categoría para explorar.</p><div class="folder-grid">`;
        for (const [slug, data] of Object.entries(estructuraRecursos)) {
            html += `
                <a href="biblioteca.html?tipo=recursos&cat=${slug}" class="folder">
                    <div class="folder-icon">${data.icon}</div>
                    <h3>${data.titulo}</h3>
                    <p>${data.desc}</p>
                    <span class="folder-badge">${data.ids.length} enlaces</span>
                </a>
            `;
        }
        html += `</div>`;
        contenedor.innerHTML = html;
        return;
    }

    if (tipo === 'recursos' && categoriaActual) {
        const dataCat = estructuraRecursos[categoriaActual];
        if (!dataCat) { contenedor.innerHTML = "<p>Categoría no encontrada.</p>"; return; }

        try {
            const response = await fetch(`${API_URL}/obtener_recursos.php`, { method: 'GET', credentials: 'include' });
            if (!response.ok) throw new Error("Error de red");
            const result = await response.json();

            if (result.success) {
                const recursosCat = result.data.filter(r => dataCat.ids.includes(r.id) || (categoriaActual === "formacion" && r.categoria_id == 1) || (categoriaActual === "red-team-rec" && r.categoria_id == 2) || (categoriaActual === "blue-team-rec" && r.categoria_id == 3) || (categoriaActual === "osint-rec" && r.categoria_id == 4) || (categoriaActual === "sistemas" && r.categoria_id == 6) || (categoriaActual === "libros" && (r.categoria_id == 8 || r.categoria_id == 9)));

                let html = `
                    <div class="breadcrumb">
                        <a href="biblioteca.html">Biblioteca</a> / <a href="biblioteca.html?tipo=recursos">Recursos</a> / <span>${dataCat.titulo}</span>
                    </div>
                    <div class="category-header">
                        <h2>${dataCat.icon} ${dataCat.titulo}</h2>
                        <p>${dataCat.desc}</p>
                        <input type="text" id="buscador-recursos" class="tool-input" placeholder="🔍 Buscar en esta categoría..." oninput="filtrarRecursos()">
                    </div>
                    <ul class="resource-list" id="lista-recursos">
                `;

                recursosCat.forEach(r => {
                    const badgeClass = getBadgeClass(r.tipo);
                    const badge = r.tipo ? `<span class="badge ${badgeClass}">${r.tipo}</span>` : '';
                    const userVoted = result.votos && result.votos.includes(r.id) ? 'votado' : '';
                    html += `
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
                                <button class="btn-voto ${userVoted}" onclick="votarRecurso(${r.id}, this)">⭐ <span>${r.votos || 0}</span></button>
                            </div>
                        </li>
                    `;
                });

                if (recursosCat.length === 0) {
                    html += `<li style="text-align:center; padding: 20px;">No hay recursos disponibles en esta categoría.</li>`;
                }

                html += `</ul>`;
                contenedor.innerHTML = html;
            }
        } catch (error) {
            contenedor.innerHTML = "<p style='color: var(--danger);'>Error al cargar los recursos.</p>";
        }
        return;
    }
}

function filtrarHerramientas() {
    const input = document.getElementById('buscador-herramientas').value.toLowerCase();
    const items = document.querySelectorAll('#lista-herramientas .card');
    items.forEach(item => {
        const titulo = item.getAttribute('data-titulo');
        item.style.display = titulo.includes(input) ? 'flex' : 'none';
    });
}

function filtrarRecursos() {
    const input = document.getElementById('buscador-recursos').value.toLowerCase();
    const items = document.querySelectorAll('#lista-recursos .resource-item');
    items.forEach(item => {
        const titulo = item.getAttribute('data-titulo');
        item.style.display = titulo.includes(input) ? 'flex' : 'none';
    });
}

window.onload = async () => {
    inicializarTema();
    comprobarDisclaimer();
    await comprobarSesion();
    protegerContenidoPrivado();
    if (window.location.pathname.includes('biblioteca.html')) cargarBiblioteca();
    if (window.location.pathname.includes('perfil.html')) cargarPerfil();
    if (!sessionStorage.getItem('visita_alertada')) {
        fetch(`${API_URL}/visita.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: window.location.href }) }).catch(err => console.log("Error"));
        sessionStorage.setItem('visita_alertada', 'true');
    }
};
