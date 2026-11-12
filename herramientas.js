function generarDork() {
    const dominio = document.getElementById('dork-input').value.trim();
    const tipoArchivo = document.getElementById('dork-type').value;
    const filtroExtra = document.getElementById('dork-extra').value;
    if (!dominio) { mostrarToast("Introduce un dominio.", "error"); return; }
    
    let query = `site:${dominio}`;
    if (filtroExtra) { query += ` ${filtroExtra}`; }
    query += ` filetype:${tipoArchivo}`;
    
    logHerramienta("Dorks", "Generar", dominio, query);

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

document.getElementById('exif-input')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const resultado = document.getElementById('exif-result');
    if (!file) return;
    resultado.innerHTML = "Analizando...";
    EXIF.getData(file, function() {
        const allTags = EXIF.getAllTags(this);
        if (Object.keys(allTags).length === 0) { 
            resultado.innerHTML = "Sin metadatos."; 
            logHerramienta("EXIF", "Analizar", file.name, "Sin metadatos");
            return; 
        }
        let html = "<ul style='list-style: none; padding: 0;'>";
        let logData = "";
        for (let tag in allTags) {
            if (allTags[tag] !== "" && tag !== "MakerNote") {
                html += `<li style="padding: 4px 0; border-bottom: 1px solid var(--border);"><strong>${tag}:</strong> ${allTags[tag]}</li>`;
                logData += `${tag}: ${allTags[tag]} | `;
            }
        }
        resultado.innerHTML = html;
        logHerramienta("EXIF", "Analizar", file.name, logData.substring(0, 500));
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
    logHerramienta("Generador Pass", "Generar");
}

function limpiarPassword() { 
    document.getElementById('resultado-password').innerText = ''; 
    logHerramienta("Generador Pass", "Limpiar"); 
}

function analizarHash() {
    const hash = document.getElementById('input-hash').value.trim();
    const res = document.getElementById('resultado-hash');
    if (!hash) { res.innerText = "Introduce un hash."; return; }
    
    let tipo = "Desconocido";
    if (/^[a-f0-9]{32}$/i.test(hash)) tipo = "MD5";
    else if (/^[a-f0-9]{40}$/i.test(hash)) tipo = "SHA-1";
    else if (/^[a-f0-9]{64}$/i.test(hash)) tipo = "SHA-256";
    
    logHerramienta("Hash", "Analizar", hash, tipo);

    res.innerHTML = `Tipo detectado: <strong style="color: var(--neon-green);">${tipo}</strong><br><br><a href="https://crackstation.net/" target="_blank" class="btn-secondary" style="text-decoration: none; padding: 10px; display: inline-block;">Buscar en CrackStation</a>`;
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
    
    res.innerHTML = "Buscando datos...";
    try {
        const response = await fetch(`https://ipwho.is/${ip}`);
        const data = await response.json();
        if (!data.success) { 
            res.innerHTML = `<span style="color: var(--danger);">Error: ${data.message}</span>`; 
            logHerramienta("Buscador IP", "Error", ip, data.message);
            return; 
        }
        
        const resultadoTexto = `País: ${data.country} | ISP: ${data.connection.isp} | Org: ${data.connection.org}`;
        logHerramienta("Buscador IP", "Consultar", ip, resultadoTexto);

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
    } catch (error) { res.innerHTML = "Error al conectar."; }
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
    
    let output = "";
    try {
        if (accion === 'codificar') output = btoa(input);
        else output = atob(input);
        res.innerText = output;
        logHerramienta("Base64", accion, input, output);
    } catch (e) {
        res.innerText = "Error: Texto no válido.";
    }
}

function analizarJWT() {
    const token = document.getElementById('jwt-input').value.trim();
    const res = document.getElementById('jwt-result');
    if (!token) { res.innerText = "Introduce un token."; return; }
    
    const partes = token.split('.');
    if (partes.length !== 3) {
        res.innerHTML = "<span style='color: var(--danger);'>Formato JWT inválido.</span>";
        return;
    }
    try {
        const header = JSON.stringify(JSON.parse(atob(partes[0])), null, 2);
        const payload = JSON.stringify(JSON.parse(atob(partes[1])), null, 2);
        
        logHerramienta("JWT", "Analizar", token, "Token decodificado correctamente");

        res.innerHTML = `<strong>Header:</strong><br><pre style="color:var(--text-bright); margin-bottom:10px;">${header}</pre>`;
        res.innerHTML += `<strong>Payload:</strong><br><pre style="color:var(--text-bright); margin-bottom:10px;">${payload}</pre>`;
    } catch (e) {
        res.innerHTML = "<span style='color: var(--danger);'>Error al decodificar.</span>";
    }
}

function convertirFechaATimestamp() {
    const dateInput = document.getElementById('ts-date-input').value;
    const res = document.getElementById('ts-result');
    if (!dateInput) { res.innerText = "Selecciona una fecha."; return; }
    const date = new Date(dateInput);
    const ts = Math.floor(date.getTime() / 1000);
    res.innerHTML = `Timestamp: <strong>${ts}</strong>`;
    logHerramienta("Timestamp", "Fecha a TS", dateInput, ts);
}

function convertirTimestampAFecha() {
    const tsInput = document.getElementById('ts-input').value;
    const res = document.getElementById('ts-result');
    if (!tsInput) { res.innerText = "Introduce un timestamp."; return; }
    const date = new Date(tsInput * 1000);
    const fechaStr = date.toLocaleString();
    res.innerHTML = `Fecha: <strong>${fechaStr}</strong>`;
    logHerramienta("Timestamp", "TS a Fecha", tsInput, fechaStr);
}

const originalAbrirModal = abrirModal;
abrirModal = function(id) {
    if (id === 'modal-ua') {
        const ua = navigator.userAgent;
        const res = document.getElementById('ua-result');
        let info = `<p><strong>User-Agent:</strong> <br><span style="color:var(--text-muted); font-size:0.85rem;">${ua}</span></p><br>`;
        let so = "Desconocido";
        let nav = "Desconocido";
        
        if (ua.includes('Windows')) so = "Windows";
        else if (ua.includes('Mac')) so = "macOS";
        else if (ua.includes('Linux')) so = "Linux";
        else if (ua.includes('Android')) so = "Android";
        else if (ua.includes('iPhone') || ua.includes('iPad')) so = "iOS";
        
        if (ua.includes('Firefox')) nav = "Firefox";
        else if (ua.includes('Edg/')) nav = "Edge";
        else if (ua.includes('Chrome')) nav = "Chrome";
        else if (ua.includes('Safari')) nav = "Safari";

        info += `<p><strong>Sistema Operativo:</strong> ${so}</p>`;
        info += `<p><strong>Navegador:</strong> ${nav}</p>`;
        
        res.innerHTML = info;
        logHerramienta("User-Agent", "Analizar", "Navegador", `SO: ${so} | Nav: ${nav}`);
    }
    originalAbrirModal(id);
};

async function analizarRobots() {
    let url = document.getElementById('robots-url').value.trim();
    const res = document.getElementById('robots-result');
    if (!url) { res.innerText = "Introduce una URL."; return; }
    if (!url.startsWith('http')) url = 'https://' + url;
    
    const robotsUrl = new URL('/robots.txt', url).href;
    res.innerText = "Cargando...";
    try {
        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(robotsUrl)}`);
        const text = await response.text();
        const resultado = text ? text.substring(0, 100) + "..." : "Archivo vacío.";
        
        logHerramienta("Robots.txt", "Analizar", url, resultado);
        res.innerText = text || "Archivo vacío.";
    } catch (e) {
        res.innerHTML = `<span style="color: var(--danger);">Error al cargar.</span>`;
    }
}

async function analizarHeaders() {
    let url = document.getElementById('header-url').value.trim();
    const res = document.getElementById('header-result');
    if (!url) { res.innerText = "Introduce una URL."; return; }
    if (!url.startsWith('http')) url = 'https://' + url;
    logHerramienta("HTTP Headers", "Analizar", url, "Redirigido a SecurityHeaders");
    res.innerHTML = `<p style="color: var(--text-main); margin-bottom: 15px;">Para analizar las cabeceras HTTP y SSL de forma segura y pública, te recomendamos la herramienta oficial:</p><a href="https://securityheaders.com/?q=${encodeURIComponent(url)}" target="_blank" class="btn-primary" style="text-decoration: none; display: inline-block;">Ir a SecurityHeaders.com</a>`;
}

async function analizarSSL() {
    let url = document.getElementById('ssl-url').value.trim();
    const res = document.getElementById('ssl-result');
    if (!url) { res.innerText = "Introduce una URL."; return; }
    if (!url.startsWith('https://')) url = 'https://' + url.replace(/^https?:\/\//, '');
    res.innerText = "Comprobando conexión...";
    try {
        await fetch(url, { method: 'HEAD', mode: 'no-cors' });
        logHerramienta("SSL", "Analizar", url, "Conexión HTTPS activa");
        res.innerHTML = `<p style="color: var(--neon-green);">✓ El sitio responde y tiene una conexión HTTPS activa.</p><p style="margin-top: 10px; color: var(--text-muted);">Para ver los detalles exactos del certificado (fecha de expiración, emisor), por favor usa SSL Labs:</p><a href="https://www.ssllabs.com/ssltest/analyze.html?d=${url.replace('https://', '')}" target="_blank" class="btn-secondary" style="text-decoration: none; display: inline-block; margin-top: 10px;">Analizar en SSL Labs</a>`;
    } catch (e) {
        res.innerHTML = `<span style="color: var(--danger);">Error de conexión o certificado no válido.</span>`;
    }
}

function generarUUID() {
    const uuid = crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    document.getElementById('uuid-result').innerText = uuid;
    logHerramienta("UUID", "Generar", "", uuid);
}

function probarRegex() {
    const patron = document.getElementById('regex-pattern').value;
    const texto = document.getElementById('regex-text').value;
    const res = document.getElementById('regex-result');
    if (!patron || !texto) { res.innerText = ""; return; }
    try {
        const regex = new RegExp(patron);
        const match = regex.test(texto);
        res.innerHTML = match ? `<span style="color: var(--neon-green);">✓ Coincidencia</span>` : `<span style="color: var(--danger);">✗ Sin coincidencia</span>`;
        logHerramienta("Regex", "Probar", `Patrón: ${patron} | Texto: ${texto}`, match ? "Coincidencia" : "Sin coincidencia");
    } catch (e) {
        res.innerHTML = `<span style="color: var(--danger);">Error en el patrón.</span>`;
    }
}

function formatearJSON() {
    const input = document.getElementById('json-input').value;
    const res = document.getElementById('json-result');
    if (!input) { res.innerText = "Introduce JSON."; return; }
    try {
        const obj = JSON.parse(input);
        res.innerHTML = `<pre style="color: var(--neon-green);">${JSON.stringify(obj, null, 4)}</pre>`;
        logHerramienta("JSON", "Formatear", input.substring(0, 50), "JSON Válido");
    } catch (e) {
        res.innerHTML = `<span style="color: var(--danger);">JSON Inválido.</span>`;
        logHerramienta("JSON", "Formatear", input.substring(0, 50), "JSON Inválido");
    }
}

async function analizarWifi() {
    const res = document.getElementById('wifi-result');
    res.innerHTML = "Analizando...";
    let info = "<ul style='list-style: none; padding: 0; line-height: 1.8;'>";
    let logStr = "";
    
    if (navigator.connection) {
        const conn = navigator.connection;
        info += `<li><strong>Tipo de conexión:</strong> ${conn.effectiveType || 'Desconocido'}</li>`;
        info += `<li><strong>Velocidad estimada:</strong> ${conn.downlink ? conn.downlink + ' Mbps' : 'Desconocida'}</li>`;
        info += `<li><strong>Latencia (RTT):</strong> ${conn.rtt ? conn.rtt + ' ms' : 'Desconocida'}</li>`;
        logStr = `Tipo: ${conn.effectiveType} | Vel: ${conn.downlink} | RTT: ${conn.rtt}`;
    } else {
        info += `<li>Tu navegador no soporta la API de Network Information.</li>`;
    }
    
    info += `<li><strong>Estado de red:</strong> ${navigator.onLine ? 'Conectado' : 'Desconectado'}</li>`;
    info += `<li><strong>Protocolo seguro:</strong> ${window.isSecureContext ? 'Sí (HTTPS)' : 'No (HTTP)'}</li>`;
    
    try {
        const start = performance.now();
        await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' });
        const end = performance.now();
        info += `<li><strong>Ping al servidor:</strong> ${Math.round(end - start)} ms</li>`;
    } catch (e) {}
    
    info += "</ul>";
    res.innerHTML = info;
    logHerramienta("Wi-Fi", "Analizar", "", logStr);
}

async function analizarDNS() {
    const res = document.getElementById('dns-result');
    res.innerHTML = "Comprobando...";
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        res.innerHTML = `<p>Tu IP pública es: <strong>${data.ip}</strong></p><p style="margin-top:10px; color: var(--text-muted);">Para una comprobación exhaustiva de fugas de DNS, te recomendamos usar <a href="https://dnsleaktest.com/" target="_blank" style="color:var(--neon-blue);">DNSLeakTest</a>.</p>`;
        logHerramienta("DNS", "Comprobar", "", `IP Pública: ${data.ip}`);
    } catch (e) {
        res.innerText = "Error al comprobar la IP.";
    }
}

function auditarPassword() {
    const pass = document.getElementById('pass-audit-input').value;
    const res = document.getElementById('pass-audit-result');
    if (!pass) { res.innerHTML = ""; return; }

    let score = 0;
    if (pass.length > 8) score++;
    if (pass.length > 12) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    let timeToCrack = "";
    let color = "var(--danger)";
    let message = "";

    if (score <= 2) { timeToCrack = "Instantáneo"; message = "Muy débil."; }
    else if (score <= 4) { timeToCrack = "Horas o días"; color = "var(--neon-gold)"; message = "Débil."; }
    else if (score === 5) { timeToCrack = "Años"; color = "var(--neon-green)"; message = "Buena."; }
    else { timeToCrack = "Siglos"; color = "var(--neon-green)"; message = "Excelente."; }

    res.innerHTML = `<p><strong>Tiempo estimado de descifrado:</strong> <span style="color: ${color}; font-weight: bold;">${timeToCrack}</span></p><p style="margin-top: 10px;">${message}</p>`;
    logHerramienta("Auditor Pass", "Analizar");
}

async function analizarDominio() {
    let domain = document.getElementById('domain-input').value.trim();
    const res = document.getElementById('domain-result');
    if (!domain) { res.innerText = "Introduce un dominio."; return; }
    domain = domain.replace(/^https?:\/\//, '').split('/')[0];

    res.innerHTML = "Analizando...";
    try {
        const response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
        const data = await response.json();
        
        let ips = [];
        let html = `<p><strong>Dominio:</strong> ${domain}</p>`;
        if (data.Answer) {
            html += `<p><strong>Direcciones IP:</strong></p><ul style="margin-left: 20px;">`;
            data.Answer.forEach(ans => { 
                if (ans.type === 1) { 
                    html += `<li>${ans.data}</li>`; 
                    ips.push(ans.data);
                } 
            });
            html += `</ul>`;
        } else {
            html += `<p style="color: var(--danger);">No se encontraron registros IP.</p>`;
        }

        const mxRes = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
        const mxData = await mxRes.json();
        let mxList = [];
        if (mxData.Answer) {
            html += `<p style="margin-top:10px;"><strong>Servidores de Correo (MX):</strong></p><ul style="margin-left: 20px;">`;
            mxData.Answer.forEach(ans => { 
                html += `<li>${ans.data}</li>`; 
                mxList.push(ans.data);
            });
            html += `</ul>`;
        }
        
        logHerramienta("Dominio", "Analizar", domain, `IPs: ${ips.join(', ')} | MX: ${mxList.join(', ')}`);
        res.innerHTML = html;
    } catch (e) {
        res.innerHTML = `<span style="color: var(--danger);">Error al analizar el dominio.</span>`;
    }
}

function validarEmail() {
    const email = document.getElementById('email-input').value.trim();
    const res = document.getElementById('email-result');
    if (!email) { res.innerText = "Introduce un correo."; return; }
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
        res.innerHTML = `<p style="color: var(--neon-green);">✓ El formato es correcto.</p><p style="margin-top:10px; color: var(--text-muted);">Para verificar si el correo existe realmente sin enviar un email, se requieren servicios de validación profunda.</p>`;
        logHerramienta("Email", "Validar", email, "Formato Válido");
    } else {
        res.innerHTML = `<p style="color: var(--danger);">✗ El formato del correo es inválido.</p>`;
        logHerramienta("Email", "Validar", email, "Formato Inválido");
    }
}

async function analizarMAC() {
    const mac = document.getElementById('mac-input').value.trim();
    const res = document.getElementById('mac-result');
    if (!mac) { res.innerText = "Introduce una MAC."; return; }
    
    const cleanMac = mac.replace(/[^a-fA-F0-9]/g, '').substring(0, 6);
    if (cleanMac.length !== 6) {
        res.innerHTML = `<span style="color: var(--danger);">Formato de MAC inválido.</span>`;
        return;
    }

    res.innerHTML = "Buscando fabricante...";
    try {
        const response = await fetch(`https://api.macvendors.com/${cleanMac}`);
        if (response.ok) {
            const vendor = await response.text();
            logHerramienta("MAC", "Analizar", mac, vendor);
            res.innerHTML = `<p><strong>MAC:</strong> ${mac}</p><p><strong>Fabricante:</strong> <span style="color: var(--neon-green);">${vendor}</span></p>`;
        } else {
            res.innerHTML = `<span style="color: var(--danger);">Fabricante no encontrado en la base de datos.</span>`;
        }
    } catch (e) {
        res.innerHTML = `<span style="color: var(--danger);">Error de conexión con el servicio.</span>`;
    }
}
