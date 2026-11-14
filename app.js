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
                { id: 'dorks', titulo: 'Generador de Dorks', desc: 'Crea consultas avanzadas para Google que revelan archivos ocultos, paneles de administración o contraseñas expuestas en un dominio.', ideal: 'Encontrar documentos filtrados.' },
                { id: 'payloads', titulo: 'Generador de Payloads', desc: 'Genera código malicioso básico para probar si tu aplicación web es vulnerable a inyecciones SQL o scripts cruzados (XSS).', ideal: 'Pruebas de concepto rápidas.' },
                { id: 'cve', titulo: 'Buscador de CVEs', desc: 'Consulta la base de datos oficial de vulnerabilidades conocidas. Introduce el nombre de un software para ver sus fallos de seguridad.', ideal: 'Investigar fallos de seguridad.' }
            ]
        },
        "blue-team": {
            titulo: "Blue Team & Forense",
            icon: "🛡️",
            desc: "Herramientas para defensa, análisis de malware y respuesta a incidentes.",
            herramientas: [
                { id: 'hash', titulo: 'Analizador de Hash', desc: 'Pega un hash para identificar qué algoritmo se usó (MD5, SHA-1, SHA-256). Útil para verificar la integridad de archivos descargados.', ideal: 'Análisis de integridad.' },
                { id: 'ssl', titulo: 'Analizador SSL/TLS', desc: 'Comprueba si el certificado de seguridad de un sitio web es válido y está correctamente configurado.', ideal: 'Auditar seguridad de servidores.' },
                { id: 'http-headers', titulo: 'Inspector de Cabeceras HTTP', desc: 'Analiza las cabeceras de seguridad que envía un servidor web. Detecta si faltan protecciones contra ataques comunes.', ideal: 'Auditar configuraciones web.' }
            ]
        },
        "osint": {
            titulo: "OSINT e Inteligencia",
            icon: "🕵️",
            desc: "Recopila información de fuentes abiertas para investigaciones.",
            herramientas: [
                { id: 'osint', titulo: 'OSINT Framework', desc: 'Un mapa visual de herramientas y fuentes de información pública. Ideal para saber por dónde empezar una investigación.', ideal: 'Investigar antecedentes.' },
                { id: 'ip', titulo: 'Buscador de IP / OSINT', desc: 'Introduce una dirección IP para descubrir su ubicación geográfica aproximada, el proveedor de internet y la organización a la que pertenece.', ideal: 'Rastrear origen de una visita.' },
                { id: 'domain', titulo: 'Reconocimiento de Dominio', desc: 'Analiza un dominio para obtener su dirección IP, los servidores de correo (MX) y otra información de infraestructura.', ideal: 'OSINT de infraestructura.' },
                { id: 'mac', titulo: 'Buscador de Fabricante (MAC)', desc: 'Introduce una dirección MAC para saber qué empresa fabricó el dispositivo (Apple, Samsung, Intel, etc.).', ideal: 'Análisis de redes locales.' },
                { id: 'email', titulo: 'Validador de Correo', desc: 'Verifica si una dirección de correo tiene un formato válido y si el dominio al que pertenece existe realmente.', ideal: 'Limpieza de bases de datos.' }
            ]
        },
        "utilidades": {
            titulo: "Utilidades y Análisis",
            icon: "🧰",
            desc: "Herramientas para análisis de datos, criptografía y conversión.",
            herramientas: [
                { id: 'exif', titulo: 'Analizador EXIF', desc: 'Sube una foto para extraer los metadatos ocultos: fecha, modelo de cámara, y coordenadas GPS de donde se tomó.', ideal: 'Saber si una foto revela tu ubicación.' },
                { id: 'pass', titulo: 'Generador de Contraseñas', desc: 'Crea contraseñas aleatorias y seguras con la longitud y los caracteres que elijas.', ideal: 'Proteger tus cuentas.' },
                { id: 'pass-strength', titulo: 'Auditor de Contraseñas', desc: 'Escribe una contraseña para saber cuánto tiempo tardaría un atacante en descifrarla mediante fuerza bruta.', ideal: 'Mejorar tu seguridad personal.' },
                { id: 'base64', titulo: 'Codificador Base64', desc: 'Convierte texto plano a Base64 y viceversa. Es un formato común para transmitir datos en la web.', ideal: 'Depurar peticiones web.' },
                { id: 'jwt', titulo: 'Inspector de JWT', desc: 'Pega un token JWT para ver su contenido decodificado (cabecera y payload) sin necesidad de una clave secreta.', ideal: 'Entender autenticación moderna.' },
                { id: 'json', titulo: 'Formateador JSON', desc: 'Pega un texto JSON desordenado para que se muestre con formato legible y validar si tiene errores de sintaxis.', ideal: 'Análisis de APIs y logs.' },
                { id: 'regex', titulo: 'Probador de Regex', desc: 'Escribe un patrón de expresión regular y un texto para ver si coinciden en tiempo real.', ideal: 'Programación y filtrado de datos.' },
                { id: 'timestamp', titulo: 'Conversor de Timestamp', desc: 'Convierte fechas normales a formato Unix (segundos desde 1970) y viceversa.', ideal: 'Análisis forense y logs.' },
                { id: 'uuid', titulo: 'Generador de UUID', desc: 'Genera identificadores únicos universales (v4) para tus pruebas de APIs.', ideal: 'Desarrollo de software seguro.' }
            ]
        },
        "redes": {
            titulo: "Redes y Comunicaciones",
            icon: "🌐",
            desc: "Analiza la seguridad de tu conexión y protocolos de red.",
            herramientas: [
                { id: 'wifi', titulo: 'Analizador de Red Wi-Fi', desc: 'Analiza la calidad y seguridad de tu conexión actual, detecta si usas WPA2 o WPA3 y comprueba tu velocidad.', ideal: 'Saber si tu red doméstica es segura.' },
                { id: 'dns', titulo: 'Fuga de DNS (DNS Leak)', desc: 'Comprueba si tu proveedor de internet está filtrando tu tráfico real o si tu VPN está funcionando correctamente.', ideal: 'Verificar privacidad de VPN.' },
                { id: 'robots', titulo: 'Analizador de Robots.txt', desc: 'Descubre qué directorios y archivos está intentando ocultar un sitio web a los motores de búsqueda.', ideal: 'Reconocimiento web (OSINT).' },
                { id: 'ua', titulo: 'Analizador User-Agent', desc: 'Descubre qué sistema operativo, navegador y motor está usando tu dispositivo.', ideal: 'Pruebas de compatibilidad web.' }
            ]
        },
        "iot": {
            titulo: "IoT y Hardware",
            icon: "🔌",
            desc: "Herramientas para el análisis de dispositivos conectados y hardware.",
            herramientas: [
                { id: 'iot-scan', titulo: 'Escáner de Dispositivos IoT', desc: 'Busca dispositivos conectados a tu red local y muestra su IP, MAC y fabricante.', ideal: 'Descubrir dispositivos en tu red.' },
                { id: 'firmware', titulo: 'Analizador de Firmware', desc: 'Sube un archivo de firmware para extraer cadenas de texto y buscar credenciales o URLs ocultas.', ideal: 'Análisis de seguridad de dispositivos.' }
            ]
        }
    };

    const estructuraRecursos = {
        "formacion": { titulo: "Formación y Certificaciones", icon: "🎓", desc: "Cursos, plataformas y certificaciones para iniciarte o especializarte.", ids: [1, 12, 13, 14, 15, 4, 5, 6, 7, 19, 20, 21] },
        "red-team-rec": { titulo: "Red Team & Pentesting", icon: "⚔️", desc: "Herramientas y documentación para pruebas de penetración y explotación.", ids: [2, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34] },
        "blue-team-rec": { titulo: "Blue Team & Forense", icon: "🛡️", desc: "Defensa, análisis forense y respuesta a incidentes.", ids: [3, 35, 36, 37, 38, 39, 40] },
        "osint-rec": { titulo: "OSINT e Inteligencia", icon: "🕵️", desc: "Inteligencia de fuentes abiertas para investigar y recopilar información.", ids: [41, 42, 44, 45, 46, 47, 48, 49, 50] },
        "sistemas": { titulo: "Sistemas Operativos", icon: "💻", desc: "Distribuciones Linux y entornos de trabajo para seguridad.", ids: [58, 59, 60, 61, 62, 63, 64, 65] },
        "libros": { titulo: "Referentes y Libros", icon: "📚", desc: "Hackers destacados y bibliografía esencial en español.", ids: [71, 72, 73, 74, 75, 76, 84, 85, 86, 9, 77, 78, 79, 80, 81, 82, 83, 87, 88] },
        "metodos": { titulo: "Métodos y Metodologías", icon: "📋", desc: "Metodologías de auditoría, pentesting y marcos de trabajo.", ids: [101, 102, 103] },
        "iot": { titulo: "IoT y Hardware", icon: "🔌", desc: "Internet de las Cosas, dispositivos embebidos y hacking de hardware.", ids: [104, 105, 106] },
        "redes-rec": { titulo: "Redes y Protocolos", icon: "🌐", desc: "Protocolos, análisis de tráfico y arquitecturas de red.", ids: [107, 108, 109] },
        "wifi-rec": { titulo: "Wi-Fi y Radiofrecuencia", icon: "📡", desc: "Hacking de redes inalámbricas, SDR y radiofrecuencia.", ids: [110, 111, 112] },
        "programacion": { titulo: "Programación y Desarrollo", icon: "💻", desc: "Lenguajes, scripts y desarrollo de herramientas propias.", ids: [113, 114, 115] }
    };

    if (!tipo && !categoriaActual) {
        let html = `<h2>Biblioteca de Ciberseguridad</h2><p style="margin-bottom: 30px; color: var(--text-muted);">Elige qué quieres explorar hoy.</p>`;
        html += `
        <div class="folder-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
            <a href="biblioteca.html?tipo=herramientas" class="folder" style="border-color: var(--neon-blue);">
                <div class="folder-icon" style="font-size: 3rem;">🛠️</div>
                <h3>Laboratorio de Herramientas</h3>
                <p>Utilidades interactivas y generadores para realizar análisis, pruebas y conversiones en tiempo real.</p>
                <span class="folder-badge" style="background: var(--neon-blue); color: var(--bg-color);">Abrir Laboratorio</span>
            </a>
            <a href="biblioteca.html?tipo=recursos" class="folder" style="border-color: var(--neon-green);">
                <div class="folder-icon" style="font-size: 3rem;">📚</div>
                <h3>Directorio de Recursos</h3>
                <p>Enlaces seleccionados a plataformas de formación, bibliografía, laboratorios y referentes del sector.</p>
                <span class="folder-badge" style="background: var(--neon-green); color: var(--bg-color);">Ver Directorio</span>
            </a>
            <a href="biblioteca.html?tipo=cve" class="folder" style="border-color: var(--neon-gold);">
                <div class="folder-icon" style="font-size: 3rem;">🚨</div>
                <h3>CVE en Tiempo Real</h3>
                <p>Últimas vulnerabilidades y publicaciones oficiales de seguridad actualizadas automáticamente.</p>
                <span class="folder-badge" style="background: var(--neon-gold); color: var(--bg-color);">Ver Alertas</span>
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
                const recursosCat = result.data.filter(r => dataCat.ids.includes(r.id) || (categoriaActual === "formacion" && r.categoria_id == 1) || (categoriaActual === "red-team-rec" && r.categoria_id == 2) || (categoriaActual === "blue-team-rec" && r.categoria_id == 3) || (categoriaActual === "osint-rec" && r.categoria_id == 4) || (categoriaActual === "sistemas" && r.categoria_id == 6) || (categoriaActual === "libros" && (r.categoria_id == 8 || r.categoria_id == 9)) || (categoriaActual === "metodos" && r.categoria_id == 10) || (categoriaActual === "iot" && r.categoria_id == 11) || (categoriaActual === "redes-rec" && r.categoria_id == 12) || (categoriaActual === "wifi-rec" && r.categoria_id == 13) || (categoriaActual === "programacion" && r.categoria_id == 14));

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

    if (tipo === 'cve') {
        let html = `
            <div class="breadcrumb">
                <a href="biblioteca.html">Biblioteca</a> / <span>CVE en Tiempo Real</span>
            </div>
            <div class="category-header">
                <h2>🚨 Alertas de Vulnerabilidad</h2>
                <p>Últimas publicaciones oficiales de CVE (Common Vulnerabilities and Exposures).</p>
            </div>
            <div id="cve-lista" style="display: flex; flex-direction: column; gap: 15px;">
                <p style="text-align: center; color: var(--text-muted);">Cargando alertas...</p>
            </div>
        `;
        contenedor.innerHTML = html;
        cargarCVEEnTiempoReal();
        return;
    }
}

async function cargarCVEEnTiempoReal() {
    const lista = document.getElementById('cve-lista');
    if (!lista) return;

    try {
        const response = await fetch('https://cve.circl.lu/api/last/20');
        const data = await response.json();

        if (data && data.length > 0) {
            let html = '';
            data.forEach(cve => {
                const desc = cve.summary ? cve.summary.substring(0, 200) + '...' : 'Sin descripción disponible.';
                const fecha = cve.Published ? new Date(cve.Published).toLocaleDateString() : 'Fecha desconocida';
                html += `
                    <div class="resource-item" style="border-left: 4px solid var(--danger);">
                        <div class="resource-header">
                            <span class="resource-title" style="color: var(--danger);">${cve.id}</span>
                            <span class="badge badge-sistema">${fecha}</span>
                        </div>
                        <div class="resource-desc">${desc}</div>
                        <div class="resource-actions">
                            <a href="https://nvd.nist.gov/vuln/detail/${cve.id}" target="_blank" rel="noopener noreferrer" class="btn-link">[Ver detalles en NVD]</a>
                        </div>
                    </div>
                `;
            });
            lista.innerHTML = html;
        } else {
            lista.innerHTML = `<p style="text-align: center; color: var(--text-muted);">No hay alertas disponibles en este momento.</p>`;
        }
    } catch (error) {
        lista.innerHTML = `<p style="text-align: center; color: var(--danger);">Error al cargar las alertas. Inténtalo más tarde.</p>`;
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
