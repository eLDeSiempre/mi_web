const API_URL = 'https://api.eldesiempre.es';
let usuarioLogueado = null;

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
            if(btnLogin) btnLogin.style.display = 'none';
            if(btnLogout) btnLogout.style.display = 'block';
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
    if (t.includes('curso') || t.includes('formación')) return 'badge-curso';
    if (t.includes('herramienta') || t.includes('laboratorio')) return 'badge-herramienta';
    if (t.includes('libro') || t.includes('documentación')) return 'badge-libro';
    if (t.includes('hacker') || t.includes('referente')) return 'badge-hacker';
    if (t.includes('sistema')) return 'badge-sistema';
    if (t.includes('noticia') || t.includes('comunidad')) return 'badge-noticia';
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
            const categorias = {
                1: "01. Formación y Certificaciones",
                2: "02. Red Team, Pentesting y Explotación",
                3: "03. Blue Team, Forense y Respuesta",
                4: "04. OSINT e Inteligencia",
                5: "05. Desarrollo Seguro",
                6: "06. Sistemas Operativos",
                7: "07. Noticias y Comunidades",
                8: "08. Referentes Hispanos",
                9: "09. Libros en Español"
            };

            let html = `<h2>Directorio de Recursos</h2><p style="margin-bottom: 20px; color: var(--text-muted);">Selecciona una categoría para desplegar los enlaces.</p>`;
            
            for (const [id, nombre] of Object.entries(categorias)) {
                const recursosCat = result.data.filter(r => r.categoria_id == id);
                if (recursosCat.length > 0) {
                    html += `
                        <div class="node">
                            <div class="node-header-flex" onclick="toggleNode('rec${id}')">
                                <h3>${nombre}</h3>
                                <button class="btn-like" onclick="event.stopPropagation(); darLike('rec${id}', this)">⭐ <span>0</span></button>
                            </div>
                        </div>
                        <div id="rec${id}" class="node-content">
                            <ul>
                    `;
                    recursosCat.forEach(r => {
                        const badgeClass = getBadgeClass(r.tipo);
                        const badge = r.tipo ? `<span class="badge ${badgeClass}">${r.tipo}</span>` : '';
                        html += `<li><strong>${r.titulo}:</strong> ${r.descripcion} ${badge} <a href="${r.url}" target="_blank" rel="noopener noreferrer">[Ir]</a></li>`;
                    });
                    html += `</ul></div>`;
                }
            }
            contenedor.innerHTML = html;
            contenedor.style.display = 'block';
        }
    } catch (error) {
        contenedor.innerHTML = "<p style='color: var(--danger);'>Error al cargar los recursos.</p>";
        contenedor.style.display = 'block';
    }
}

function toggleNode(nodeId) { const content = document.getElementById(nodeId); if(content) content.classList.toggle('open'); }
function darLike(nodeId, btn) { mostrarToast("¡Gracias por votar!", "success"); }

document.getElementById('form-login')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = { correo: document.getElementById('login-correo').value, contrasena: document.getElementById('login-contrasena').value };
    try {
        const response = await fetch(`${API_URL}/login.php`, {
            method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data), credentials: 'include'
        });
        const result = await response.json();
        if (result.success) {
            mostrarToast('Bienvenido ' + result.nombre, 'success');
            setTimeout(() => window.location.href = 'recursos.html', 1000);
        } else { mostrarToast('Error: ' + result.message, 'error'); }
    } catch (error) { mostrarToast('Error de conexión.', 'error'); }
});

document.getElementById('form-registro')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        nombre_completo: document.getElementById('reg-nombre').value,
        usuario: document.getElementById('reg-usuario').value,
        correo: document.getElementById('reg-correo').value,
        contrasena: document.getElementById('reg-contrasena').value
    };
    try {
        const response = await fetch(`${API_URL}/registro.php`, {
            method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data), credentials: 'include'
        });
        const result = await response.json();
        if (result.success) {
            mostrarToast('Registro exitoso. Revisa tu correo.', 'success');
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
    if (formLogin.style.display === 'none') {
        formLogin.style.display = 'block'; formRegistro.style.display = 'none';
    } else {
        formLogin.style.display = 'none'; formRegistro.style.display = 'block';
    }
}

window.onload = async () => {
    await comprobarSesion();
    protegerContenidoPrivado();
    
    if (window.location.pathname.includes('recursos.html')) {
        cargarRecursosDesdeVPS();
    }

    if (localStorage.getItem('disclaimerAceptado') === 'true') {
        const modal = document.getElementById('disclaimer-modal');
        if(modal) modal.style.display = 'none';
        document.body.classList.remove('locked');
        if (!localStorage.getItem('cookiesAceptadas')) {
            const banner = document.getElementById('cookie-banner');
            if(banner) banner.style.display = 'flex';
        }
    }

    if (!sessionStorage.getItem('visita_alertada')) {
        fetch(`${API_URL}/visita.php`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: window.location.href })
        }).catch(err => console.log("Error"));
        sessionStorage.setItem('visita_alertada', 'true');
    }
};
