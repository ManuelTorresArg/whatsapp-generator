/**
 * Archivo de configuración de ejemplo para el Generador de WhatsApp QR
 * 
 * INSTRUCCIONES:
 * 1. Copia este archivo como 'config.js'
 * 2. Personaliza los valores según tus necesidades
 * 3. No subas config.js al repositorio (agrégalo a .gitignore)
 */

// ============================================================================
// CONFIGURACIÓN DE APIS - PERSONALIZA AQUÍ
// ============================================================================

const API_CONFIG = {
    // Configuración de Evolution API (WhatsApp)
    evolution: {
        // URL de tu servidor Evolution API
        baseUrl: '/evo', // Proxy Nginx → Evolution API (Docker)
        
        // Tu API Key de Evolution API
        apiKey: 'tu-api-key-aqui',
        
        // Nombre de instancia (se genera automáticamente)
        instanceName: '',
        
        // Endpoints (normalmente no necesitas cambiar estos)
        endpoints: {
            createInstance: '/instance/create',
            connectInstance: '/instance/connect',
            fetchInstances: '/instance/fetchInstances',
            setWebhook: '/webhook/set',
            deleteInstance: '/instance/delete'
        }
    },
    
    // Configuración de N8N (Automatización)
    n8n: {
        // URL de tu servidor N8N
        baseUrl: '/n8n-api', // Proxy Nginx → N8N (Docker)
        
        // Tu API Key de N8N
        apiKey: 'tu-n8n-api-key-aqui',
        
        // ID del workflow (se genera automáticamente)
        workflowId: '',
        
        // Endpoints (normalmente no necesitas cambiar estos)
        endpoints: {
            workflows: '/api/v1/workflows',
            webhook: '/webhook/whatsapp-webhook'
        }
    }
};

// ============================================================================
// CONFIGURACIONES POR DEFECTO - PERSONALIZA SEGÚN NECESITES
// ============================================================================

const DEFAULT_CONFIG = {
    // Configuración de la instancia
    instance: {
        namePrefix: 'instance_', // Prefijo para nombres de instancia
        nameSuffixLength: 9,     // Longitud del sufijo aleatorio
        qrSize: 300,             // Tamaño del QR en píxeles
        qrFormat: 'png'          // Formato del QR
    },
    
    // Configuración de validación
    validation: {
        minApiKeyLength: 10,     // Longitud mínima de API Key
        phoneRegex: /^\+?[\d\s\-\(\)]+$/, // Regex para validar teléfonos
        urlRegex: /^https?:\/\/.+/,       // Regex para validar URLs
        maxRetries: 3,           // Número máximo de reintentos
        timeout: 30000           // Timeout en milisegundos (30 segundos)
    },
    
    // Configuración de UI
    ui: {
        animationDuration: 300,  // Duración de animaciones en ms
        progressSteps: [
            { id: 'create', name: 'Creando instancia', icon: '🔧' },
            { id: 'connect', name: 'Conectando WhatsApp', icon: '📱' },
            { id: 'qr', name: 'Generando QR', icon: '📋' },
            { id: 'workflow', name: 'Configurando automatización', icon: '⚙️' },
            { id: 'webhook', name: 'Configurando webhook', icon: '🔗' },
            { id: 'complete', name: '¡Configuración completada!', icon: '✅' }
        ]
    }
};

// ============================================================================
// PLANTILLAS DE WORKFLOWS - PERSONALIZA SEGÚN TU NEGOCIO
// ============================================================================

const BUSINESS_WORKFLOWS = {
    // Ejemplo para restaurante
    restaurant: {
        name: "Restaurante ChatBot",
        description: "ChatBot para restaurantes con menú y pedidos",
        icon: "🍽️",
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
                        
                        // PERSONALIZA AQUÍ LA LÓGICA DE TU RESTAURANTE
                        let response = "";
                        if (message.toLowerCase().includes("menu")) {
                            response = "🍽️ ¡Hola! Aquí tienes nuestro menú:\\n\\n🍕 Pizzas: $15-25\\n🍔 Hamburguesas: $12-18\\n🥗 Ensaladas: $8-12\\n\\n¿Qué te gustaría ordenar?";
                        } else if (message.toLowerCase().includes("hola")) {
                            response = "¡Hola! 👋 Bienvenido a nuestro restaurante. Escribe 'menu' para ver nuestras opciones.";
                        } else {
                            response = "Gracias por tu mensaje. Un momento, te conectamos con nuestro equipo. 🍽️";
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
    },
    
    // Agrega más tipos de negocio según necesites...
    // Ejemplo:
    // custom: {
    //     name: "Mi Negocio ChatBot",
    //     description: "ChatBot personalizado para mi negocio",
    //     icon: "🏪",
    //     nodes: [...]
    // }
};

// ============================================================================
// MENSAJES - PERSONALIZA LOS TEXTOS
// ============================================================================

const MESSAGES = {
    success: {
        instanceCreated: "✅ Instancia creada exitosamente",
        instanceConnected: "✅ WhatsApp conectado",
        qrGenerated: "✅ Código QR generado",
        workflowCreated: "✅ Automatización configurada",
        webhookSet: "✅ Webhook configurado",
        configComplete: "✅ Configuración completada"
    },
    
    error: {
        requiredFields: "Por favor completa todos los campos requeridos",
        invalidPhone: "Formato de teléfono inválido. Usa: +54 9 11 1234-5678",
        invalidEvolutionUrl: "URL de Evolution API debe comenzar con http:// o https://",
        invalidN8nUrl: "URL de N8N debe comenzar con http:// o https://",
        shortEvolutionKey: "API Key de Evolution API parece ser muy corta",
        shortN8nKey: "API Key de N8N parece ser muy corta",
        connectionFailed: "Error de conexión con Evolution API",
        qrGenerationFailed: "No se pudo generar el código QR",
        workflowCreationFailed: "Error creando automatización",
        webhookSetupFailed: "Error configurando webhook"
    },
    
    info: {
        testingConnection: "🔍 Probando conexión...",
        connectionSuccess: "✅ Conexión exitosa",
        connectionFailed: "❌ Error de conexión",
        scanningQR: "📱 Escanea el código QR con WhatsApp",
        setupComplete: "🎉 ¡Configuración completada! Tu WhatsApp Business está listo."
    }
};

// ============================================================================
// FUNCIONES DE UTILIDAD - NORMALMENTE NO NECESITAS CAMBIAR ESTO
// ============================================================================

const UTILS = {
    generateInstanceName: () => {
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substr(2, DEFAULT_CONFIG.instance.nameSuffixLength);
        return `${DEFAULT_CONFIG.instance.namePrefix}${timestamp}_${randomSuffix}`;
    },
    
    validatePhone: (phone) => {
        return DEFAULT_CONFIG.validation.phoneRegex.test(phone);
    },
    
    validateUrl: (url) => {
        return DEFAULT_CONFIG.validation.urlRegex.test(url);
    },
    
    validateApiKey: (apiKey) => {
        return apiKey && apiKey.length >= DEFAULT_CONFIG.validation.minApiKeyLength;
    },
    
    cleanUrl: (url) => {
        return url.endsWith('/') ? url.slice(0, -1) : url;
    },
    
    generateQRUrl: (instanceName) => {
        return `https://wa.me/${instanceName}`;
    }
};

// ============================================================================
// EXPORTACIÓN
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API_CONFIG,
        DEFAULT_CONFIG,
        BUSINESS_WORKFLOWS,
        MESSAGES,
        UTILS
    };
} else {
    window.WHATSAPP_CONFIG = {
        API_CONFIG,
        DEFAULT_CONFIG,
        BUSINESS_WORKFLOWS,
        MESSAGES,
        UTILS
    };
} 