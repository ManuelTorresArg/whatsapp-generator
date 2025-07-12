# 📋 Guía de Configuración - Generador WhatsApp QR

## 🎯 Descripción

Este proyecto incluye un sistema de configuración centralizada que permite personalizar todos los parámetros del generador de WhatsApp QR sin modificar el código principal.

## 📁 Archivos de Configuración

### `config.js` (Principal)
- **Propósito**: Configuración activa del sistema
- **Estado**: No incluido en el repositorio (agregado a .gitignore)
- **Uso**: Contiene tus configuraciones reales

### `config.example.js` (Plantilla)
- **Propósito**: Plantilla de configuración
- **Estado**: Incluido en el repositorio
- **Uso**: Copiar y personalizar para crear tu `config.js`

## 🚀 Configuración Inicial

### Paso 1: Crear tu archivo de configuración

```bash
# Copiar la plantilla
cp config.example.js config.js
```

### Paso 2: Personalizar la configuración

Edita `config.js` y modifica los valores según tus necesidades:

```javascript
const API_CONFIG = {
    evolution: {
        baseUrl: 'https://tu-evolution-api.com',  // ← Tu URL
        apiKey: 'tu-api-key-aqui',               // ← Tu API Key
        // ...
    },
    n8n: {
        baseUrl: 'https://tu-n8n-server.com',     // ← Tu URL
        apiKey: 'tu-n8n-api-key-aqui',           // ← Tu API Key
        // ...
    }
};
```

### Paso 3: Incluir en tu HTML

Agrega la referencia al archivo de configuración en tu HTML:

```html
<script src="config.js"></script>
<script src="whatsapp_qr_generator.html"></script>
```

## ⚙️ Secciones de Configuración

### 1. API_CONFIG
Configuración de las APIs externas:

```javascript
const API_CONFIG = {
    evolution: {
        baseUrl: 'https://tu-evolution-api.com',
        apiKey: 'tu-api-key-aqui',
        endpoints: {
            createInstance: '/instance/create',
            connectInstance: '/instance/connect',
            // ...
        }
    },
    n8n: {
        baseUrl: 'https://tu-n8n-server.com',
        apiKey: 'tu-n8n-api-key-aqui',
        endpoints: {
            workflows: '/api/v1/workflows',
            webhook: '/webhook/whatsapp-webhook'
        }
    }
};
```

### 2. DEFAULT_CONFIG
Configuraciones por defecto del sistema:

```javascript
const DEFAULT_CONFIG = {
    instance: {
        namePrefix: 'instance_',     // Prefijo para nombres
        nameSuffixLength: 9,         // Longitud del sufijo
        qrSize: 300,                 // Tamaño del QR
        qrFormat: 'png'              // Formato del QR
    },
    validation: {
        minApiKeyLength: 10,         // Longitud mínima API Key
        maxRetries: 3,               // Reintentos máximos
        timeout: 30000               // Timeout en ms
    }
};
```

### 3. BUSINESS_WORKFLOWS
Plantillas de automatización por tipo de negocio:

```javascript
const BUSINESS_WORKFLOWS = {
    restaurant: {
        name: "Restaurante ChatBot",
        description: "ChatBot para restaurantes",
        icon: "🍽️",
        nodes: [
            // Configuración de nodos N8N
        ]
    },
    // Agregar más tipos de negocio...
};
```

### 4. MESSAGES
Mensajes personalizables del sistema:

```javascript
const MESSAGES = {
    success: {
        instanceCreated: "✅ Instancia creada exitosamente",
        // ...
    },
    error: {
        requiredFields: "Por favor completa todos los campos",
        // ...
    },
    info: {
        testingConnection: "🔍 Probando conexión...",
        // ...
    }
};
```

## 🛠️ Personalización Avanzada

### Agregar Nuevo Tipo de Negocio

1. **Editar `config.js`**:
```javascript
const BUSINESS_WORKFLOWS = {
    // ... otros tipos existentes ...
    
    miNegocio: {
        name: "Mi Negocio ChatBot",
        description: "ChatBot personalizado para mi negocio",
        icon: "🏪",
        nodes: [
            {
                type: "webhook",
                name: "WhatsApp Webhook",
                parameters: {
                    path: "/whatsapp-webhook",
                    method: "POST"
                }
            },
            {
                type: "function",
                name: "Procesar Mensaje",
                parameters: {
                    functionCode: `
                        const message = items[0].json.body;
                        const phone = items[0].json.from;
                        
                        // TU LÓGICA PERSONALIZADA AQUÍ
                        let response = "";
                        if (message.toLowerCase().includes("producto")) {
                            response = "🏪 Aquí tienes nuestros productos...";
                        } else if (message.toLowerCase().includes("precio")) {
                            response = "💰 Nuestros precios...";
                        } else {
                            response = "Gracias por contactarnos. Te conectamos con ventas.";
                        }
                        
                        return [{
                            json: {
                                to: phone,
                                message: response
                            }
                        }];
                    `
                }
            }
        ]
    }
};
```

2. **Actualizar el HTML** para incluir la nueva opción:
```html
<select id="business" required>
    <option value="">Selecciona tu tipo de negocio</option>
    <option value="restaurant">🍽️ Restaurante</option>
    <option value="retail">🛍️ Tienda</option>
    <option value="services">🛠️ Servicios</option>
    <option value="miNegocio">🏪 Mi Negocio</option>  <!-- ← Nueva opción -->
</select>
```

### Personalizar Validaciones

```javascript
const DEFAULT_CONFIG = {
    validation: {
        minApiKeyLength: 15,        // Cambiar longitud mínima
        phoneRegex: /^\+?[\d\s\-\(\)]+$/,  // Cambiar regex de teléfono
        urlRegex: /^https?:\/\/.+/,        // Cambiar regex de URL
        maxRetries: 5,              // Cambiar número de reintentos
        timeout: 45000              // Cambiar timeout a 45 segundos
    }
};
```

### Personalizar Mensajes

```javascript
const MESSAGES = {
    success: {
        instanceCreated: "🎉 ¡Instancia creada con éxito!",
        instanceConnected: "📱 ¡WhatsApp conectado perfectamente!",
        // ...
    },
    error: {
        requiredFields: "⚠️ Por favor, completa todos los campos obligatorios",
        invalidPhone: "📞 Formato de teléfono incorrecto. Usa: +54 9 11 1234-5678",
        // ...
    }
};
```

## 🔒 Seguridad

### Variables Sensibles
- **API Keys**: Nunca subas tu `config.js` al repositorio
- **URLs**: Usa HTTPS en producción
- **Validación**: Siempre valida las entradas del usuario

### Archivo .gitignore
Asegúrate de que tu `.gitignore` incluya:

```gitignore
# Configuración local
config.js
config.local.js

# Logs
*.log

# Archivos temporales
*.tmp
*.temp
```

## 🧪 Testing

### Probar Configuración
```javascript
// En la consola del navegador
console.log('Configuración cargada:', window.WHATSAPP_CONFIG);

// Probar validaciones
console.log('Validación teléfono:', UTILS.validatePhone('+54 9 11 1234-5678'));
console.log('Validación URL:', UTILS.validateUrl('https://example.com'));
```

### Verificar Conexiones
```javascript
// Probar conexión a Evolution API
fetch(`${API_CONFIG.evolution.baseUrl}/instance/fetchInstances`, {
    headers: {
        'Authorization': `Bearer ${API_CONFIG.evolution.apiKey}`
    }
}).then(response => {
    console.log('Conexión Evolution API:', response.ok);
});

// Probar conexión a N8N
fetch(`${API_CONFIG.n8n.baseUrl}/api/v1/workflows`, {
    headers: {
        'Authorization': `Bearer ${API_CONFIG.n8n.apiKey}`
    }
}).then(response => {
    console.log('Conexión N8N:', response.ok);
});
```

## 📚 Referencias

### Estructura de Configuración
```
config.js
├── API_CONFIG
│   ├── evolution (WhatsApp API)
│   └── n8n (Automatización)
├── DEFAULT_CONFIG
│   ├── instance (Configuración de instancia)
│   ├── validation (Validaciones)
│   └── ui (Interfaz de usuario)
├── BUSINESS_WORKFLOWS
│   ├── restaurant
│   ├── retail
│   ├── services
│   └── [personalizados...]
├── MESSAGES
│   ├── success
│   ├── error
│   └── info
└── UTILS
    ├── generateInstanceName()
    ├── validatePhone()
    ├── validateUrl()
    └── [otras utilidades...]
```

### Endpoints Disponibles
- **Evolution API**: `/instance/create`, `/instance/connect`, `/webhook/set`
- **N8N**: `/api/v1/workflows`, `/webhook/whatsapp-webhook`

## 🆘 Soporte

### Problemas Comunes

1. **Configuración no se carga**:
   - Verificar que `config.js` esté incluido antes del HTML principal
   - Revisar la consola del navegador para errores

2. **APIs no conectan**:
   - Verificar URLs y API Keys en `config.js`
   - Probar conexiones manualmente con curl/Postman

3. **Validaciones fallan**:
   - Revisar regex en `DEFAULT_CONFIG.validation`
   - Verificar formatos de entrada

### Contacto
- **Documentación**: Revisar `whatsapp_documentation.md`
- **Troubleshooting**: Ver `troubleshooting_qr.md`
- **Issues**: Crear issue en el repositorio

---

**¡Con esta configuración centralizada, puedes personalizar completamente el generador sin tocar el código principal!** 🚀 