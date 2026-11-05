# eLDeSiempre.es 🛡️

Plataforma web y aplicación móvil (APK) enfocada en ciberseguridad, hacking ético y educación.

La estética visual está inspirada en una Terminal Hacker / Mr. Robot, con un diseño inmersivo, tipografía monoespaciada (Fira Code) y una paleta de colores oscura con acentos dorados.

## 🚀 Características Principales

*   **Biblioteca de Recursos (Privada):** Directorio masivo de enlaces clasificados por categorías:
    *   Formación y Certificaciones.
    *   Plataformas de Práctica (Hack The Box, TryHackMe, PortSwigger, OverTheWire).
    *   Herramientas Esenciales (Nmap, Wireshark, Burp Suite, Kali Linux).
    *   Comunidades y Noticias (Hackplayers, DragonJAR, INCIBE).
    *   Biblioteca Recomendada (Libros clave de la industria).
    *   Referentes del Hacking (Directorio de hackers destacados de España y del mundo con biografía y foto).
*   **Laboratorio de Herramientas:** Utilidades funcionales integradas en la web:
    *   **OSINT Framework:** Iframe interactivo con el mapa visual.
    *   **Generador de Dorks:** Búsquedas avanzadas en Google (filtrando por extensiones y operadores como `inurl:`, `intext:`).
    *   **Analizador EXIF:** Extrae metadatos y geolocalización de imágenes.
    *   **Generador de Contraseñas:** Contraseñas criptográficamente seguras y personalizables.
    *   **Analizador de Hashes:** Identifica algoritmos (MD5, SHA-1, SHA-256).
    *   **Buscador de IP / OSINT:** Geolocalización y datos de ISP de cualquier IP o dominio.
*   **Sistema de Usuarios:** Registro y login con verificación de correo electrónico (API propia en PHP/MySQL), sesiones protegidas y Rate Limiting contra fuerza bruta.
*   **Comunidad en Discord:** Derivación de la interacción social a un servidor de Discord privado con roles automáticos.
*   **Support Me (Apoya el Proyecto):** Sección transparente para recibir donaciones vía PayPal y criptomonedas (BTC, ETH, SOL) con botones de copiado rápido.
*   **Diseño Responsive:** Totalmente adaptado para móviles y ordenadores.

## 🛠️ Arquitectura Técnica

*   **Frontend:** HTML, CSS y JavaScript puro (Vanilla JS). Alojado en GitHub Pages con HTTPS y dominio personalizado.
*   **Backend:** API PHP alojada en un VPS propio con base de datos MySQL y envío de correos SMTP (DonDominio).
*   **App Móvil:** WebView nativo de Android (Kotlin) con pantalla completa inmersiva.
*   **Analítica:** Matomo autoalojado en Docker (privacidad garantizada).
*   **Seguridad:**
    *   Las rutas privadas del frontend (Recursos, Perfil) están protegidas y requieren sesión activa.
    *   Prevención de inyecciones SQL mediante PDO y `prepared statements`.
    *   Hashing de contraseñas con `password_hash` (Bcrypt).
    *   Uso de tokens CSRF y validación de datos.

## 💰 Apoya el Proyecto (Support Me)

Este es un proyecto 100% gratuito y sin ánimo de lucro. Si te ha sido de ayuda y quieres contribuir a mantener los servidores (VPS, dominio y correos) y el desarrollo continuo, puedes hacerlo a través de:

*   **PayPal:** [Donar con PayPal](https://www.paypal.biz/ldesiem)
*   **Bitcoin (BTC):** `bc1qncwax6ehsrhhphgsvdypy0nhpa2848mjkth320`
*   **Ethereum (ETH):** `0x671233AE15A16ff6424e831504CB6C749345B08D`
*   **Solana (SOL):** `7iVeci47L9mLKouKEQB9siiSdG3QCESDrPnQgrD7xMx`

## 📥 Descarga la App

(Próximamente disponible en la web y en breves en Google Play)

## 🔗 Enlaces

*   **Sitio Web:** [https://eldesiempre.es](https://eldesiempre.es)
*   **Discord:** [Únete a la comunidad](https://discord.gg/EakygHQwUu)
*   **Twitter/X:** [@eLDeSiempre_TTV](https://x.com/eLDeSiempre_TTV)
*   **Twitch:** [eldesiempre](https://www.twitch.tv/eldesiempre)
*   **YouTube:** [eLDeSiempreOfficial](https://www.youtube.com/@eLDeSiempreOfficial)
*   **Instagram:** [@__eldesiempre__](https://www.instagram.com/__eldesiempre__/)
*   **TikTok:** [@eldesiempre_ttv](https://www.tiktok.com/@eldesiempre_ttv)
*   **LinkedIn:** Daniel J.

Hecho con 🖤 y mucho ☕ por eLDeSiempre.
