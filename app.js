const API_URL = 'https://api.eldesiempre.es';
let usuarioLogueado = null;

function inicializarTema() {
    const temaGuardado = localStorage.getItem('tema');
    const body = document.body;
    const btnToggle = document.getElementById('theme-toggle');
    
    if (temaGuardado === 'light') {
        body.classList.add('light-mode');
    }
    
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

function logHerramienta(herramienta, accion, detalle = "") {
    fetch(`${API_URL}/herramientas.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ herramienta, accion, detalle })
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
    if (path.includes('recursos.html') || path.includes('perfil.html')) {
        const mainContent = document.querySelector('main.container');
        if (mainContent) {
            mainContent.style.display = 'none';
            setTimeout(() => {
                if (usuarioLogueado) mainContent.style.display = 'block';
                else {
                    mostrarToast("Acceso denegado.", "error");
                    setTimeout(() => window.location.href = 'login.html', 1000);
                }
            }, 500);
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

async function cargarRecursosDesdeVPS() {
    const contenedor = document.getElementById('contenedor-recursos');
    if (!contenedor) return;

    try {
        const response = await fetch(`${API_URL}/obtener_recursos.php`, { method: 'GET', credentials: 'include' });
        if (!response.ok) throw new Error("Error de red");
        const result = await response.json();

        if (result.success) {
            const estructura = {
                "01. Formación": {
                    "Cursos y Certificaciones": [1, 12, 13, 14, 15],
                    "Plataformas de Práctica": [4, 5, 6, 7, 19, 20, 21]
                },
                "02. Red Team & Pentesting": {
                    "Herramientas y Documentación": [2, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
                    "Explotación Web": [51, 56, 57, 55]
                },
                "03. Blue Team & Forense": {
                    "Herramientas de Defensa": [3, 35, 36, 37, 38, 39, 40]
                },
                "04. OSINT": {
                    "Inteligencia de Fuentes Abiertas": [41, 42, 44, 45, 46, 47, 48, 49, 50]
                },
                "05. Sistemas Operativos": {
                    "Distribuciones y Entornos": [58, 59, 60, 61, 62, 63, 64, 65]
                },
                "06. Referentes y Libros": {
                    "Hackers Hispanos": [71, 72, 73, 74, 75, 76, 84, 85, 86],
                    "Bibliografía en Español": [9, 77, 78, 79, 80, 81, 82, 83, 87, 88]
                }
            };

            let html = `<h2>Directorio de Recursos</h2><p style="margin-bottom: 20px; color: var(--text-muted);">Explora el conocimiento estructurado por áreas.</p>`;
            
            let globalIndex = 0;
            for (const [seccion, categorias] of Object.entries(estructura)) {
                html += `<div class="arbol-seccion"><h3 onclick="toggleNode('sec${globalIndex}')">> ${seccion}</h3><div id="sec${globalIndex}" class="arbol-contenido">`;
                for (const [subcat, ids] of Object.entries(categorias)) {
                    globalIndex++;
                    html += `<div class="arbol-subseccion"><h4 onclick="toggleNode('sub${globalIndex}')">+ ${subcat}</h4><div id="sub${globalIndex}" class="arbol-subcontenido"><ul>`;
                    const recursosCat = result.data.filter(r => ids.includes(r.id) || (subcat === "Cursos y Certificaciones" && r.categoria_id == 1) || (subcat === "Herramientas y Documentación" && r.categoria_id == 2));
                    recursosCat.forEach(r => {
                        const badgeClass = getBadgeClass(r.tipo);
                        const badge = r.tipo ? `<span class="badge ${badgeClass}">${r.tipo}</span>` : '';
                        const userVoted = result.votos && result.votos.includes(r.id) ? 'votado' : '';
                        html += `<li><strong>${r.titulo}:</strong> ${r.descripcion} ${badge} <a href="${r.url}" target="_blank" rel="noopener noreferrer">[Ir]</a> <button class="btn-voto ${userVoted}" onclick="votarRecurso(${r.id}, this)">⭐ <span>${r.votos || 0}</span></button></li>`;
                    });
                    html += `</ul></div></div>`;
                }
                html += `</div></div>`;
                globalIndex++;
            }
            contenedor.innerHTML = html;
            contenedor.style.display = 'block';
        }
    } catch (error) {
        contenedor.innerHTML = "<p style='color: var(--danger);'>Error al cargar los recursos.</p>";
        contenedor.style.display = 'block';
    }
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

function toggleNode(nodeId) { const content = document.getElementById(nodeId); if(content) content.style.display = content.style.display === 'block' ? 'none' : 'block'; }

document.getElementById('form-login')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { correo: document.getElementById('login-correo').value, contrasena: document.getElementById('login-contrasena').value };
    try {
        const response = await fetch(`${API_URL}/login.php`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data), credentials: 'include' });
        const result = await response.json();
        if (result.success) {
            mostrarToast('Bienvenido ' + result.nombre, 'success');
            setTimeout(() => window.location.href = 'recursos.html', 1000);
        } else { mostrarToast('Error: ' + result.message, 'error'); }
    } catch (error) { mostrarToast('Error de conexión.', 'error'); }
});

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

window.onload = async () => {
    inicializarTema();
    await comprobarSesion();
    protegerContenidoPrivado();
    
    if (window.location.pathname.includes('recursos.html')) cargarRecursosDesdeVPS();
    if (window.location.pathname.includes('perfil.html')) cargarPerfil();

    if (localStorage.getItem('disclaimerAceptado') === 'true') {
        const modal = document.getElementById('disclaimer-modal');
        if(modal) modal.style.display = 'none';
        document.body.classList.remove('locked');
        if (!localStorage.getItem('cookiesAceptadas')) { const banner = document.getElementById('cookie-banner'); if(banner) banner.style.display = 'flex'; }
    }

    if (!sessionStorage.getItem('visita_alertada')) {
        fetch(`${API_URL}/visita.php`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: window.location.href }) }).catch(err => console.log("Error"));
        sessionStorage.setItem('visita_alertada', 'true');
    }
};
