# eLDeSiempre.es 🛡️

**Donde la seguridad y el conocimiento se encuentran.**

eLDeSiempre.es es una plataforma web educativa enfocada en ciberseguridad y hacking ético. Su objetivo es centralizar los mejores recursos gratuitos, herramientas y guías de aprendizaje en español, estructurados como un recorrido desde cero hasta nivel experto. Todo bajo una estética de terminal inmersiva, un rendimiento excepcional y un fuerte enfoque en la seguridad y la privacidad.

---

### 🚀 Características Principales

*   **Rutas de Aprendizaje (SEO):** Guías públicas estructuradas por niveles (Principiante, Fácil, Medio, Difícil, Experto). Los usuarios pueden empezar desde lo más básico (¿Qué es internet?) hasta técnicas avanzadas (Red Team). Algunas guías avanzadas requieren estar registrado.
*   **Biblioteca de Recursos (Privada):** Directorio masivo y jerárquico (tipo árbol) de enlaces clasificados en 9 categorías. Incluye:
    *   Formación y Certificaciones.
    *   Plataformas de Práctica (Hack The Box, TryHackMe).
    *   Red Team y Pentesting.
    *   Blue Team y Forense.
    *   Herramientas OSINT.
    *   Desarrollo Seguro.
    *   Sistemas Operativos (Kali, Parrot, Tails).
    *   Referentes Hispanos (Chema Alonso, DragonJAR, etc.).
    *   Bibliografía en Español (0xWord).
    *   *Sistema de votaciones integrado para destacar los mejores recursos.*
*   **Laboratorio de Herramientas (Público):** Más de 20 utilidades funcionales, 100% seguras y sin vulnerar la privacidad de terceros:
    *   OSINT: OSINT Framework, Generador de Dorks, Reconocimiento de Dominio, Analizador de MAC.
    *   Redes: Analizador Wi-Fi, Fuga de DNS, Buscador de IP.
    *   Utilidades: Analizador EXIF, Generador de Hash, Generador de Contraseñas, Auditor de Contraseñas, Inspector JWT, Base64, Formateador JSON, Conversor Timestamp, User-Agent, Regex, UUID.
    *   *Todas las acciones se registran de forma anónima en Discord para auditoría de seguridad.*
*   **Sistema de Usuarios:** Registro y login con verificación por correo, sesiones protegidas, perfiles personalizables (bio, habilidades, GitHub) y limitación de intentos.
*   **Diseño Adaptable:** Interfaz responsive con **Modo Oscuro (terminal) y Modo Claro (limpio)**. El usuario puede alternar y guardar su preferencia.
*   **Comunidad:** Integración directa con un servidor privado de Discord.

---

### 🛠️ Arquitectura Técnica

El proyecto está construido priorizando el rendimiento, la seguridad y la simplicidad, sin depender de frameworks pesados:

*   **Frontend:** HTML, CSS y JavaScript puro (Vanilla JS). Estructura multipágina alojada en GitHub Pages.
*   **Backend:** API RESTful desarrollada en PHP (Nginx + PHP 8.5-FPM) alojada en un VPS propio.
*   **Base de Datos:** MySQL, utilizando PDO con *Prepared Statements* para prevenir inyecciones SQL.
*   **App Móvil:** WebView nativo de Android (Kotlin) con pantalla completa inmersiva (En desarrollo).
*   **Analítica:** Matomo autoalojado en Docker, garantizando el 100% de privacidad.
*   **Control:** Alertas y notificaciones centralizadas en un canal privado de Discord mediante Webhooks.

#### 🔒 Medidas de Seguridad Implementadas
*   Credenciales de base de datos y correo aisladas en un archivo `.env` externo (bloqueado por Nginx).
*   Control estricto de CORS y sesiones (HttpOnly, Secure, SameSite=Strict) desde PHP.
*   Hashing de contraseñas mediante `password_hash` (Bcrypt) y `session_regenerate_id`.
*   Protección de rutas privadas en el frontend (cortina JS) y validación obligatoria en el backend (PHP).
*   Carga dinámica de recursos protegidos: el contenido solo viaja al cliente si hay una sesión válida.
*   Rate Limiting contra ataques de fuerza bruta en login y anti-spam (Honeypot) en el formulario de contacto.

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
*Hecho con 🖤, mucho ☕ y código por eLDeSiempre.*
