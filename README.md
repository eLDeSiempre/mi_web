# eLDeSiempre.es 🛡️

**Plataforma web y aplicación móvil enfocada en ciberseguridad, hacking ético y educación.**

eLDeSiempre.es nace con el objetivo de centralizar los mejores recursos, herramientas y guías de ciberseguridad en un solo lugar. Todo ello bajo una estética visual inmersiva inspirada en una Terminal Hacker / Mr. Robot, utilizando tipografía monoespaciada (Fira Code) y una paleta de colores oscura con acentos en verde neón y dorado.

---

### 🚀 Características Principales

*   **Guías Públicas (SEO):** Artículos y tutoriales accesibles para todos, diseñados para aprender desde cero y posicionar en buscadores.
*   **Biblioteca de Recursos (Privada):** Directorio masivo de enlaces clasificados por categorías para usuarios registrados:
    *   Formación y Certificaciones.
    *   Plataformas de Práctica (Hack The Box, TryHackMe, PortSwigger, OverTheWire).
    *   Herramientas Esenciales (Nmap, Wireshark, Burp Suite, Kali Linux).
    *   Comunidades y Noticias (Hackplayers, DragonJAR, INCIBE).
    *   Biblioteca Recomendada (Libros clave de la industria).
    *   Referentes del Hacking (Directorio de hackers destacados).
*   **Laboratorio de Herramientas:** Utilidades funcionales integradas y de uso libre:
    *   OSINT Framework (Iframe interactivo).
    *   Generador de Dorks avanzados.
    *   Analizador EXIF (Metadatos y geolocalización de imágenes).
    *   Generador de Contraseñas seguras.
    *   Analizador de Hashes (MD5, SHA-1, SHA-256).
    *   Buscador de IP / OSINT.
*   **Sistema de Usuarios:** Registro y login con verificación por correo, sesiones protegidas y limitación de intentos.
*   **Comunidad:** Integración directa con un servidor privado de Discord.
*   **Support Me:** Sección transparente para recibir donaciones vía PayPal y criptomonedas.
*   **Diseño Responsive:** Totalmente adaptado para dispositivos móviles y ordenadores.

---

### 🛠️ Arquitectura Técnica

El proyecto está construido priorizando el rendimiento y la seguridad, sin depender de frameworks pesados:

*   **Frontend:** HTML, CSS y JavaScript puro (Vanilla JS). Estructura multipágina alojada en GitHub Pages.
*   **Backend:** API RESTful desarrollada en PHP (Nginx + PHP 8.5-FPM) alojada en un VPS propio.
*   **Base de Datos:** MySQL, utilizando PDO con *Prepared Statements* para prevenir inyecciones SQL.
*   **App Móvil:** WebView nativo de Android (Kotlin) con pantalla completa inmersiva.
*   **Analítica:** Matomo autoalojado en Docker, garantizando la privacidad de los datos.

#### 🔒 Medidas de Seguridad Implementadas
*   Credenciales de base de datos y correo aisladas en un archivo `.env` externo al código público.
*   Hashing de contraseñas mediante `password_hash` (Bcrypt).
*   Protección de rutas privadas mediante validación de sesión tanto en el frontend como en el backend.
*   Carga dinámica de recursos protegidos (los datos sensibles nunca viajan al cliente sin autenticación).
*   Rate Limiting contra ataques de fuerza bruta y protección anti-spam en el registro.

---

### 💰 Apoya el Proyecto

Este es un proyecto 100% gratuito y sin ánimo de lucro. Si te ha sido de ayuda y quieres contribuir a mantener los servidores (VPS, dominio y correos) y el desarrollo continuo, puedes hacerlo a través de:

*   **PayPal:** [Donar con PayPal](https://www.paypal.biz/ldesiem)
*   **Bitcoin (BTC):** `bc1qncwax6ehsrhhphgsvdypy0nhpa2848mjkth320`
*   **Ethereum (ETH):** `0x671233AE15A16ff6424e831504CB6C749345B08D`
*   **Solana (SOL):** `7iVeci47L9mLKouKEQB9siiSdG3QCESDrPnQgrD7xMx`

---

### 🔗 Enlaces Oficiales

*   **Sitio Web:** [https://eldesiempre.es](https://eldesiempre.es)
*   **Discord:** [Únete a la comunidad](https://discord.gg/EakygHQwUu)
*   **Twitter/X:** [@eLDeSiempre_TTV](https://x.com/eLDeSiempre_TTV)
*   **Twitch:** [eldesiempre](https://www.twitch.tv/eldesiempre)
*   **YouTube:** [eLDeSiempreOfficial](https://www.youtube.com/@eLDeSiempreOfficial)
*   **Instagram:** [@__eldesiempre__](https://www.instagram.com/__eldesiempre__/)
*   **TikTok:** [@eldesiempre_ttv](https://www.tiktok.com/@eldesiempre_ttv)

---
*Hecho con 🖤 y mucho ☕ por eLDeSiempre.*
