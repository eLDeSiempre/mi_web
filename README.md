eLDeSiempre.es 🛡️
Plataforma web y aplicación móvil (APK) enfocada en ciberseguridad, hacking ético y educación.

La estética visual está inspirada en una Terminal Hacker / Mr. Robot, con un diseño inmersivo, tipografía monoespaciada (Fira Code) y una paleta de colores oscura con acentos dorados y verdes neón.

🚀 Características Principales
* **Guías Públicas (SEO):** Artículos sobre ciberseguridad accesibles para todos, diseñados para posicionar en Google.
* **Biblioteca de Recursos (Privada):** Directorio masivo de enlaces clasificados por categorías:
  * Formación y Certificaciones.
  * Plataformas de Práctica (Hack The Box, TryHackMe, PortSwigger, OverTheWire).
  * Herramientas Esenciales (Nmap, Wireshark, Burp Suite, Kali Linux).
  * Comunidades y Noticias (Hackplayers, DragonJAR, INCIBE).
  * Biblioteca Recomendada (Libros clave de la industria).
  * Referentes del Hacking (Directorio de hackers destacados).
* **Laboratorio de Herramientas:** Utilidades funcionales integradas:
  * OSINT Framework (Iframe interactivo).
  * Generador de Dorks avanzados.
  * Analizador EXIF (Metadatos y geolocalización).
  * Generador de Contraseñas seguras.
  * Analizador de Hashes (MD5, SHA-1, SHA-256).
  * Buscador de IP / OSINT.
* **Sistema de Usuarios:** Registro y login con verificación por correo (API PHP/MySQL), sesiones protegidas, Rate Limiting y protección anti-spam.
* **Comunidad en Discord:** Derivación de la interacción social a un servidor privado.
* **Support Me:** Sección para recibir donaciones vía PayPal y criptomonedas.
* **Diseño Responsive:** Totalmente adaptado para móviles y ordenadores.

🛠️ Arquitectura Técnica
* **Frontend:** HTML, CSS y JavaScript puro (Vanilla JS). Estructura multipágina (`index.html`, `herramientas.html`, `recursos.html`, `login.html`, `perfil.html`, `contacto.html`, `guia.html`).
* **Backend:** API PHP alojada en un VPS propio (Nginx + PHP 8.5-FPM) con base de datos MySQL y envío de correos SMTP (DonDominio).
* **App Móvil:** WebView nativo de Android (Kotlin) con pantalla completa inmersiva.
* **Analítica:** Matomo autoalojado en Docker.
* **Seguridad:**
  * Rutas privadas protegidas por JavaScript y validación de sesión.
  * Prevención de inyecciones SQL mediante PDO.
  * Hashing de contraseñas con `password_hash` (Bcrypt).
  * Credenciales de base de datos aisladas en archivo `.env`.
  * CORS configurado estrictamente en Nginx para permitir solo el dominio principal.
  * Protección contra spam en el registro (límite de IPs).

💰 Apoya el Proyecto
Este es un proyecto 100% gratuito y sin ánimo de lucro. Si te ha sido de ayuda y quieres contribuir a mantener los servidores y el desarrollo continuo:

* **PayPal:** [Donar con PayPal](https://www.paypal.biz/ldesiem)
* **Bitcoin (BTC):** `bc1qncwax6ehsrhhphgsvdypy0nhpa2848mjkth320`
* **Ethereum (ETH):** `0x671233AE15A16ff6424e831504CB6C749345B08D`
* **Solana (SOL):** `7iVeci47L9mLKouKEQB9siiSdG3QCESDrPnQgrD7xMx`

🔗 Enlaces
* **Sitio Web:** [https://eldesiempre.es](https://eldesiempre.es)
* **Discord:** [Únete a la comunidad](https://discord.gg/EakygHQwUu)
* **Twitter/X:** [@eLDeSiempre_TTV](https://x.com/eLDeSiempre_TTV)
* **Twitch:** [eldesiempre](https://www.twitch.tv/eldesiempre)
* **YouTube:** [eLDeSiempreOfficial](https://www.youtube.com/@eLDeSiempreOfficial)
* **Instagram:** [@__eldesiempre__](https://www.instagram.com/__eldesiempre__/)
* **TikTok:** [@eldesiempre_ttv](https://www.tiktok.com/@eldesiempre_ttv)

Hecho con 🖤 y mucho ☕ por eLDeSiempre.
