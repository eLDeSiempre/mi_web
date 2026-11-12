function generarDork() {
    const dominio = document.getElementById('dork-input').value.trim();
    const tipoArchivo = document.getElementById('dork-type').value;
    const filtroExtra = document.getElementById('dork-extra').value;
    if (!dominio) { mostrarToast("Introduce un dominio.", "error"); return; }
    logHerramienta("Dorks", "Generar", dominio);
    let query = `site:${dominio}`;
    if (filtroExtra) { query += ` ${filtroExtra}`; }
    query += ` filetype:${tipoArchivo}`;
    document.getElementById('dork-result').innerHTML = `
        <div style="background: var(--bg-color); padding: 15px; border-radius: 6px; border: 1px solid var(--border); margin-top: 15px;">
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
    logHerramienta("Dorks", "Limpiar"); 
}

document.getElementById('exif-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const resultado = document.getElementById('exif-result');
    if (!file) return;
    logHerramienta("EXIF", "Analizar", file.name);
    resultado.innerHTML = "Analizando...";
    EXIF.getData(file, function() {
        const allTags = EXIF.getAllTags(this);
        if (Object.keys(allTags).length === 0) { resultado.innerHTML = "Sin metadatos."; return; }
        let html = "<ul style='list-style: none; padding: 0;'>";
        for (let tag in allTags) {
            if (allTags[tag] !== "" && tag !== "MakerNote") html += `<li style="padding: 4px 0; border-bottom: 1px solid var(--border);"><strong>${tag}:</strong> ${allTags[tag]}</li>`;
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
    logHerramienta("Hash", "Analizar", hash);
    let tipo = "Desconocido";
    if (/^[a-f0-9]{32}$/i.test(hash)) tipo = "MD5";
    else if (/^[a-f0-9]{40}$/i.test(hash)) tipo = "SHA-1";
    else if (/^[a-f0-9]{64}$/i.test(hash)) tipo = "SHA-256";
    res.innerHTML = `Tipo: <strong style="color: var(--neon-green);">${tipo}</strong>`;
}

function limpiarHash() { 
    document.getElementById('input-hash').value = ''; 
    document.getElementById('resultado-hash').innerHTML = ''; 
    logHerramienta("Hash", "Limpiar"); 
}

async function buscarIP() {
    const ip = document.getElementById('ip-input').value.trim();
    const res = document.getElementById('resultado-ip');
    if (!ip) { res.innerText = "Introduce una IP o dominio."; return; }
    logHerramienta("Buscador IP", "Consultar", ip);
    res.innerHTML = "Buscando datos...";
    try {
        const response = await fetch(`https://ipwho.is/${ip}`);
        const data = await response.json();
        if (!data.success) { res.innerHTML = `<span style="color: var(--danger);">Error: ${data.message}</span>`; return; }
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
    } catch (error) { res.innerHTML = "Error al conectar con el servicio."; }
}

function limpiarIP() { 
    document.getElementById('ip-input').value = ''; 
    document.getElementById('resultado-ip').innerHTML = ''; 
    logHerramienta("Buscador IP", "Limpiar"); 
}

function procesarBase64(accion) {
    const input = document.getElementById('base64-input').value;
    const res = document.getElementById('base64-result');
    if (!input) { res.innerText = "Introduce texto."; return; }
    try {
        if (accion === 'codificar') {
            res.innerText = btoa(input);
        } else {
            res.innerText = atob(input);
        }
    } catch (e) {
        res.innerText = "Error: El texto no es válido para Base64.";
    }
}

function analizarJWT() {
    const token = document.getElementById('jwt-input').value.trim();
    const res = document.getElementById('jwt-result');
    if (!token) { res.innerText = "Introduce un token."; return; }
    
    const partes = token.split('.');
    if (partes.length !== 3) {
        res.innerHTML = "<span style='color: var(--danger);'>El token no tiene el formato JWT válido (debe tener 3 partes separadas por puntos).</span>";
        return;
    }
    
    try {
        const payload = JSON.parse(atob(partes[1]));
        res.innerHTML = `<strong>Header:</strong><br><pre style="color:var(--text-bright); margin-bottom:10px;">${JSON.stringify(JSON.parse(atob(partes[0])), null, 2)}</pre>`;
        res.innerHTML += `<strong>Payload:</strong><br><pre style="color:var(--text-bright); margin-bottom:10px;">${JSON.stringify(payload, null, 2)}</pre>`;
        res.innerHTML += `<strong>Firma:</strong><br><span style="color:var(--text-muted);">${partes[2]}</span>`;
    } catch (e) {
        res.innerHTML = "<span style='color: var(--danger);'>Error al decodificar el token. Asegúrate de que es un JWT válido.</span>";
    }
}

function convertirFechaATimestamp() {
    const dateInput = document.getElementById('ts-date-input').value;
    const res = document.getElementById('ts-result');
    if (!dateInput) { res.innerText = "Selecciona una fecha."; return; }
    const date = new Date(dateInput);
    res.innerHTML = `Timestamp: <strong>${Math.floor(date.getTime() / 1000)}</strong>`;
}

function convertirTimestampAFecha() {
    const tsInput = document.getElementById('ts-input').value;
    const res = document.getElementById('ts-result');
    if (!tsInput) { res.innerText = "Introduce un timestamp."; return; }
    const date = new Date(tsInput * 1000);
    res.innerHTML = `Fecha: <strong>${date.toLocaleString()}</strong>`;
}

const originalAbrirModal = abrirModal;
abrirModal = function(id) {
    if (id === 'modal-ua') {
        const ua = navigator.userAgent;
        const res = document.getElementById('ua-result');
        let info = `<p><strong>User-Agent:</strong> <br><span style="color:var(--text-muted); font-size:0.85rem;">${ua}</span></p><br>`;
        if (ua.includes('Windows')) info += "<p><strong>Sistema Operativo:</strong> Windows</p>";
        else if (ua.includes('Mac')) info += "<p><strong>Sistema Operativo:</strong> macOS</p>";
        else if (ua.includes('Linux')) info += "<p><strong>Sistema Operativo:</strong> Linux</p>";
        else if (ua.includes('Android')) info += "<p><strong>Sistema Operativo:</strong> Android</p>";
        else if (ua.includes('iPhone') || ua.includes('iPad')) info += "<p><strong>Sistema Operativo:</strong> iOS</p>";
        
        if (ua.includes('Firefox')) info += "<p><strong>Navegador:</strong> Mozilla Firefox</p>";
        else if (ua.includes('Edg/')) info += "<p><strong>Navegador:</strong> Microsoft Edge</p>";
        else if (ua.includes('Chrome')) info += "<p><strong>Navegador:</strong> Google Chrome</p>";
        else if (ua.includes('Safari')) info += "<p><strong>Navegador:</strong> Apple Safari</p>";
        
        res.innerHTML = info;
    }
    originalAbrirModal(id);
};
