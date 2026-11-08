const API_URL = 'https://api.eldesiempre.es/api';
let usuarioLogueado = null;

function abrirModal(id) { document.getElementById(id).classList.add('active'); }
function cerrarModal(id) { document.getElementById(id).classList.remove('active'); }
function mostrarAvisoLegal(e) { if (e) e.preventDefault(); abrirModal('modal-legal'); }

function mostrarToast(mensaje, tipo = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast ' + tipo;
    toast.innerText = mensaje;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 4000);
}

function aceptarDisclaimer() {
    document.getElementById('disclaimer-modal').style.display = 'none';
    document.body.classList.remove('locked');
    localStorage.setItem('disclaimerAceptado', 'true');
    if (!localStorage.getItem('cookiesAceptadas')) {
        document.getElementById('cookie-banner').style.display = 'flex';
    }
}

function aceptarCookies(aceptadas) {
    localStorage.setItem('cookiesAceptadas', aceptadas ? 'true' : 'false');
    document.getElementById('cookie-banner').style.display = 'none';
    if (!aceptadas && typeof _paq !== 'undefined') {
        _paq.push(['disableCookies']);
        _paq.push(['forgetUser']);
    }
}

function copiarAlPortapapeles(texto, moneda) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto).then(() => {
            mostrarToast('Dirección de ' + moneda + ' copiada al portapapeles', 'success');
        }).catch(err => {
            mostrarToast('No se pudo copiar automáticamente.', 'error');
        });
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = texto;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            mostrarToast('Dirección de ' + moneda + ' copiada al portapapeles', 'success');
        } catch (err) {
            mostrarToast('No se pudo copiar automáticamente.', 'error');
        }
        textArea.remove();
    }
}

function openTab(tabId) {
    if ((tabId === 'recursos' || tabId === 'perfil') && !usuarioLogueado) {
        mostrarToast("Inicia sesión para acceder.", "error");
        openTab('login');
        return;
    }
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    const activeBtn = document.querySelector(`.nav-btn[onclick="openTab('${tabId}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
}

function comprobarAcceso(tabId) {
    if (usuarioLogueado) openTab(tabId);
    else { mostrarToast("Crea una cuenta para entrar.", "error"); openTab('login'); }
}

function toggleNode(nodeId) {
    const content = document.getElementById(nodeId);
    content.classList.toggle('open');
}

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

function filtrarRecursos() {
    const input = document.getElementById('buscador-recursos').value.toLowerCase();
    const nodos = document.querySelectorAll('#lista-recursos .node');
    
    nodos.forEach(nodo => {
        const searchData = nodo.getAttribute('data-search');
        if (searchData.includes(input)) {
            nodo.style.display = 'block';
        } else {
            nodo.style.display = 'none';
            const content = nodo.nextElementSibling;
            if (content && content.classList.contains('node-content')) {
                content.classList.remove('open');
            }
        }
    });
}

function darLike(nodeId, btn) {
    if (!usuarioLogueado) {
        mostrarToast("Inicia sesión para votar por los recursos.", "error");
        return;
    }

    let likes = JSON.parse(localStorage.getItem('likes_recursos')) || {};
    const span = btn.querySelector('span');
    let currentLikes = parseInt(span.innerText);

    if (likes[nodeId]) {
        delete likes[nodeId];
        btn.classList.remove('liked');
        span.innerText = currentLikes - 1;
        mostrarToast("Voto retirado", "success");
    } else {
        likes[nodeId] = true;
        btn.classList.add('liked');
        span.innerText = currentLikes + 1;
        mostrarToast("¡Gracias por votar!", "success");
    }
    
    localStorage.setItem('likes_recursos', JSON.stringify(likes));
}

function cargarLikes() {
    let likes = JSON.parse(localStorage.getItem('likes_recursos')) || {};
    document.querySelectorAll('.btn-like').forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        const match = onclickAttr.match(/darLike\('([^']+)'/);
        if (match && likes[match[1]]) {
            btn.classList.add('liked');
            btn.querySelector('span').innerText = "1";
        }
    });
}

async function comprobarSesion() {
    try {
        const response = await fetch(`${API_URL}/comprobar_sesion.php`, {
            method: 'GET',
            credentials: 'include'
        });
        const result = await response.json();
        if (result.logueado) {
            usuarioLogueado = result;
            document.getElementById('nav-login-btn').style.display = 'none';
            document.getElementById('nav-recursos-btn').style.display = 'block';
            document.getElementById('nav-perfil-btn').style.display = 'block';
            document.getElementById('nav-logout-btn').style.display = 'block';
            document.getElementById('perfil-usuario').innerText = usuarioLogueado.usuario;
            document.getElementById('perfil-nombre').innerText = usuarioLogueado.nombre;
            if (typeof _paq !== 'undefined') _paq.push(['setUserId', usuarioLogueado.usuario]);
        }
    } catch (error) {
        console.error("Error comprobando sesión", error);
    }
}

async function cerrarSesion() { 
    try {
        await fetch(`${API_URL}/logout.php`, { credentials: 'include' });
    } catch (error) {}
    window.location.reload(); 
}

document.getElementById('form-registro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        nombre_completo: document.getElementById('reg-nombre').value,
        usuario: document.getElementById('reg-usuario').value,
        correo: document.getElementById('reg-correo').value,
        contrasena: document.getElementById('reg-contrasena').value
    };
    try {
        const response = await fetch(`${API_URL}/registro.php`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(data),
            credentials: 'include'
        });
        const result = await response.json();
        if (result.success) {
            mostrarToast('Registro exitoso. Revisa tu correo.', 'success');
            document.getElementById('form-registro').reset();
            toggleAuthForms();
        } else { mostrarToast('Error: ' + result.message, 'error'); }
    } catch (error) { mostrarToast('Error de conexión.', 'error'); }
});

document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        correo: document.getElementById('login-correo').value,
        contrasena: document.getElementById('login-contrasena').value
    };
    try {
        const response = await fetch(`${API_URL}/login.php`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(data),
            credentials: 'include'
        });
        const result = await response.json();
        if (result.success) {
            mostrarToast('Bienvenido ' + result.nombre, 'success');
            setTimeout(() => window.location.reload(), 1000);
        } else { mostrarToast('Error: ' + result.message, 'error'); }
    } catch (error) { mostrarToast('Error de conexión.', 'error'); }
});

document.getElementById('form-contacto').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('contact-nombre').value,
        email: document.getElementById('contact-email').value,
        asunto: document.getElementById('contact-asunto').value,
        mensaje: document.getElementById('contact-mensaje').value
    };
    try {
        const response = await fetch(`${API_URL}/contacto.php`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            mostrarToast('Mensaje enviado con éxito.', 'success');
            document.getElementById('form-contacto').reset();
        } else { mostrarToast('Error al enviar: ' + result.message, 'error'); }
    } catch (error) { 
        mostrarToast('Error de conexión. Inténtalo más tarde.', 'error'); 
    }
});

document.getElementById('form-perfil').addEventListener('submit', (e) => {
    e.preventDefault();
    mostrarToast('Perfil actualizado.', 'success');
});

function generarDork() {
    const dominio = document.getElementById('dork-input').value.trim();
    const tipoArchivo = document.getElementById('dork-type').value;
    const filtroExtra = document.getElementById('dork-extra').value;
    if (!dominio) { mostrarToast("Introduce un dominio.", "error"); return; }
    let query = `site:${dominio}`;
    if (filtroExtra) { query += ` ${filtroExtra}`; }
    query += ` filetype:${tipoArchivo}`;
    document.getElementById('dork-result').innerHTML = `
        <div style="background: #000; padding: 15px; border-radius: 8px; border: 1px solid var(--border); margin-top: 15px;">
            <p style="color: var(--text-main); font-size: 0.9rem; margin-bottom: 10px;">Dork generado:</p>
            <code style="color: var(--neon-green); font-size: 1.1rem; word-break: break-all; display: block; margin-bottom: 15px;">${query}</code>
            <div style="display: flex; gap: 10px;">
                <a href="https://www.google.com/search?q=${encodeURIComponent(query)}" target="_blank" class="btn-secondary" style="padding: 10px 15px; font-size: 0.9rem; text-decoration: none; text-align: center; flex: 1;">Buscar en Google</a>
                <button class="btn-primary" style="padding: 10px 15px; font-size: 0.9rem; flex: 1;" onclick="copiarAlPortapapeles('${query}', 'Dork')">Copiar Dork</button>
            </div>
        </div>
    `;
}

function limpiarDorks() {
    document.getElementById('dork-input').value = '';
    document.getElementById('dork-result').innerHTML = '';
}

document.getElementById('exif-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const resultado = document.getElementById('exif-result');
    if (!file) return;
    resultado.innerHTML = "Analizando...";
    EXIF.getData(file, function() {
        const allTags = EXIF.getAllTags(this);
        if (Object.keys(allTags).length === 0) { resultado.innerHTML = "Sin metadatos."; return; }
        let html = "<ul style='list-style: none; padding: 0;'>";
        for (let tag in allTags) {
            if (allTags[tag] !== "" && tag !== "MakerNote") html += `<li><strong>${tag}:</strong> ${allTags[tag]}</li>`;
        }
        resultado.innerHTML = html;
    });
});

function generarPassword() {
    const longitud = parseInt(document.getElementById('slider-longitud').value);
    const useMayus = document.getElementById('chk-mayus').checked;
    const useMinus = document.getElementById('chk-minus').checked;
    const useNums = document.getElementById('chk-nums').checked;
    const useSymbols = document.getElementById('chk-symbols').checked;
    if (!useMayus && !useMinus && !useNums && !useSymbols) { mostrarToast("Selecciona una opción.", "error"); return; }
    let charset = "";
    if (useMayus) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useMinus) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNums) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+{}[]";
    let password = "";
    for (let i = 0; i < longitud; i++) password += charset.charAt(Math.floor(Math.random() * charset.length));
    document.getElementById('resultado-password').innerText = password;
}

function limpiarPassword() {
    document.getElementById('resultado-password').innerText = '';
}

function analizarHash() {
    const hash = document.getElementById('input-hash').value.trim();
    const res = document.getElementById('resultado-hash');
    if (!hash) { res.innerText = "Introduce un hash."; return; }
    let tipo = "Desconocido";
    if (/^[a-f0-9]{32}$/i.test(hash)) tipo = "MD5";
    else if (/^[a-f0-9]{40}$/i.test(hash)) tipo = "SHA-1";
    else if (/^[a-f0-9]{64}$/i.test(hash)) tipo = "SHA-256";
    res.innerHTML = `Tipo: <strong style="color: var(--neon-green);">${tipo}</strong>`;
}

function limpiarHash() {
    document.getElementById('input-hash').value = '';
    document.getElementById('resultado-hash').innerHTML = '';
}

async function buscarIP() {
    const ip = document.getElementById('ip-input').value.trim();
    const res = document.getElementById('resultado-ip');
    if (!ip) { res.innerText = "Introduce una IP o dominio."; return; }
    
    res.innerHTML = "Buscando datos...";
    try {
        const response = await fetch(`https://ipwho.is/${ip}`);
        const data = await response.json();
        
        if (!data.success) {
            res.innerHTML = `<span style="color: #ff3333;">Error: ${data.message}</span>`;
            return;
        }
        
        res.innerHTML = `
            <ul style="list-style: none; padding: 0; line-height: 1.8;">
                <li><strong>IP/Dominio:</strong> ${data.ip}</li>
                <li><strong>País:</strong> ${data.country}</li>
                <li><strong>Región:</strong> ${data.region}</li>
                <li><strong>Ciudad:</strong> ${data.city}</li>
                <li><strong>Proveedor (ISP):</strong> ${data.connection.isp}</li>
                <li><strong>Organización:</strong> ${data.connection.org}</li>
            </ul>
        `;
    } catch (error) {
        res.innerHTML = "Error al conectar con el servicio. Inténtalo de nuevo.";
    }
}

function limpiarIP() {
    document.getElementById('ip-input').value = '';
    document.getElementById('resultado-ip').innerHTML = '';
}

window.onload = () => {
    comprobarSesion();
    cargarLikes();

    if (localStorage.getItem('disclaimerAceptado') === 'true') {
        document.getElementById('disclaimer-modal').style.display = 'none';
        document.body.classList.remove('locked');
        if (!localStorage.getItem('cookiesAceptadas')) {
            document.getElementById('cookie-banner').style.display = 'flex';
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('verificado')) {
        mostrarToast('¡Cuenta verificada con éxito! Ya tienes la sesión iniciada.', 'success');
        window.history.replaceState({}, document.title, window.location.pathname);
    }
};
