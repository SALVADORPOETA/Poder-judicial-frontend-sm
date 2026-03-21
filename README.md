# Poder Judicial - Scraping & Mensajería

**Poder Judicial - Scraping & Mensajería** es una plataforma avanzada de automatización y gestión de datos diseñada específicamente para el ecosistema del **Poder Judicial de la Federación**. Este proyecto frontend, construido desde cero con **React 18** y **TailwindCSS**, permite a los usuarios realizar scrapings profundos de perfiles judiciales, procesar bases de datos con inteligencia de género y gestionar campañas de mensajería personalizada a través de Email y WhatsApp.

La aplicación es **completamente interactiva**: puedes cargar archivos JSON, editar plantillas en tiempo real con detección de variables y gestionar candidatos mediante una interfaz táctil y moderna que prioriza la eficiencia operativa.

---

## ✨ Overview

Este no es un proyecto de tutorial ni una plantilla genérica. Es una **herramienta de ingeniería de datos** personalizada que combina:

* **Extracción de Datos en Dos Etapas:** Interfaz para scraping de enlaces y recolección de detalles profundos.
* **Procesamiento Inteligente:** Algoritmos de limpieza de nombres y detección automática de género para personalización.
* **Editor de Mensajería Omnicanal:** Switch dinámico entre modos de Email (púrpura) y WhatsApp (verde) con cambio de contexto visual.
* **Arquitectura de Datos Robusta:** Manejo de Blobs para exportación a Excel y JSON sin pérdida de integridad.
* **UI/UX de Alta Precisión:** Diseño en modo oscuro inspirado en herramientas de desarrollo, optimizado para largas jornadas de trabajo.

---

## 🚀 Features

* ✨ **Dashboard Interactivo:** Gestión centralizada de todas las fases del proyecto.
* 🔍 **Scrapers Integrados:** Interfaz para disparar búsquedas de ministros, magistrados y jueces.
* 📊 **Generador de Reportes:** Conversión dinámica de resultados JSON a archivos Excel (.xlsx).
* 📥 **Data Dropzone:** Área de carga de archivos con feedback visual de estado y validación de tipos.
* ✍️ **Personalización Granular:** Modales específicos para editar mensajes individuales antes del envío.
* 🏷️ **Sistema de Tags Dinámicos:** Uso de variables como `[nombre]`, `{o|a}`, y `{El|La}` para una comunicación humana.
* 📱 **Diseño Responsive:** Optimizado para escritorio y tablets con TailwindCSS.
* 🎨 **Feedback de Estado:** Spinners de carga, indicadores de éxito y alertas de error animadas.

---

## 🛠️ Tech Stack

| Categoría | Tecnología |
| :--- | :--- |
| **Framework** | React 18 (Vite) |
| **Styling** | TailwindCSS |
| **Iconografía** | Lucide React |
| **HTTP Client** | Fetch API |
| **Animaciones** | Tailwind Animate |
| **Estado** | React Hooks (useState, useEffect, useMemo) |
| **Deployment** | Vercel / Netlify |

---

## 💻 Getting Started

### Prerequisites

* Node.js 18+
* npm o yarn
* Backend API activa (ver repositorio de backend)

### Installation

```bash
# Clonar el repositorio
git clone https://github.com/SALVADORPOETA/Poder-judicial-frontend-sm.git

# Navegar al directorio
cd poder-judicial-frontend-sm

# Instalar dependencias
npm install
```

### Environment Variables

Crea un archivo `.env` en la raíz con la URL de tu API:
```env
VITE_API_URL=https://tu-api-backend.com
```

### Development Server

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## ⚙️ Usage

1.  **Extraer:** Selecciona una lista del PJF (ej. Magistrados de Circuito) y descarga los enlaces encontrados.
2.  **Procesar:** Sube el JSON de enlaces al "Detail Scraper" para obtener perfiles completos con correo y teléfono.
3.  **Configurar:** En el Servicio de Mensajería, define tu plantilla usando los tags de género y nombre.
4.  **Revisar:** Haz clic en cualquier candidato de la tabla para abrir el modal de personalización final.
5.  **Enviar:** Alterna entre modo WhatsApp o Email y dispara la comunicación masiva.



---

## 📂 Project Structure

```text
frontend/
├─ src/
│  ├─ components/
│  │  ├─ LinkScraper.jsx      # Fase 1: Extracción de URLs
│  │  ├─ DetailScraper.jsx    # Fase 2: Scraping Profundo
│  │  ├─ DataDropzone.jsx     # Ingesta de archivos
│  │  ├─ TemplateEditor.jsx   # Editor de plantillas dinámicas
│  │  ├─ CandidatesTable.jsx  # Gestión de base de datos
│  │  ├─ MessageModal.jsx     # Edición fina de Email
│  │  └─ WhatsAppModal.jsx    # Edición fina de WhatsApp
│  ├─ apiConfig.js            # Configuración de endpoints
│  ├─ App.jsx                 # Enrutador y Layout principal
│  └─ main.jsx
├─ public/
├─ tailwind.config.js
└─ package.json
```

---

## 🎨 UI & UX Design

* **Identidad Visual por Canal:** El sistema cambia automáticamente a verde para WhatsApp y púrpura para Email para prevenir errores humanos.
* **Modales de Edición:** Diseño limpio con tipografía `monospace` para facilitar la revisión de textos técnicos.
* **Interactividad Táctil:** Botones con estados de *hover* mejorados y transiciones suaves.
* **Accesibilidad:** Uso de labels semánticos y contrastes altos para entornos profesionales.

---

## 📌 Originality Statement

Este proyecto es **100% original**.
* No se usaron plantillas de administración pre-hechas.
* La lógica de procesamiento de nombres y género fue desarrollada de forma independiente.
* Toda la arquitectura de componentes y el flujo de scraping-a-mensajería fue diseñado para resolver una necesidad real del sector legal.

---

## 👨🏽‍💻 Author

**Salvador Martínez**
*Full-Stack Developer*

* **GitHub:** [SALVADORPOETA](https://github.com/SALVADORPOETA)
* **LinkedIn:** [Salvador Martínez](https://www.linkedin.com/in/salvador-martinez-sm/)

---

## ⚖️ License

Este es un proyecto de portafolio creado por **Salvador Martínez**.
Uso comercial no autorizado sin consentimiento previo.
Todos los derechos reservados.

---

## 💡 Notes

* Diseñado para optimizar flujos de trabajo en el Poder Judicial.
* El frontend demuestra habilidades avanzadas en manejo de estados complejos y diseño de UI para herramientas de productividad.
