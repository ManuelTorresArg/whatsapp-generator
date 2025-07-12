# 🔧 Troubleshooting: Problemas con Generación de QR

## 🚨 Problema: "No es posible generar el QR"

### 🔍 Diagnóstico Rápido

1. **Abre la consola del navegador** (F12 → Console)
2. **Ejecuta el generador** y observa los mensajes de error
3. **Usa el botón "🔍 Probar"** para verificar la conexión con Evolution API

### 📋 Checklist de Verificación

#### ✅ Configuración Básica
- [ ] URL de Evolution API es correcta (https://tu-dominio.com)
- [ ] API Key tiene al menos 10 caracteres
- [ ] Número de teléfono tiene formato correcto (+54 9 11 1234-5678)
- [ ] Todas las URLs comienzan con http:// o https://

#### ✅ Conectividad
- [ ] Evolution API está funcionando (botón "Probar" funciona)
- [ ] No hay errores de CORS en la consola
- [ ] La API Key tiene permisos para crear instancias
- [ ] El servidor Evolution API permite peticiones desde tu dominio

#### ✅ Instancia
- [ ] La instancia se crea correctamente (Paso 1 completado)
- [ ] El nombre de instancia es único
- [ ] No hay instancias duplicadas

### 🐛 Errores Comunes y Soluciones

#### Error 401: "Unauthorized"
```
Causa: API Key inválida o expirada
Solución:
1. Verificar que la API Key sea correcta
2. Regenerar la API Key en Evolution API
3. Verificar permisos del token
```

#### Error 404: "Not Found"
```
Causa: URL incorrecta o instancia no existe
Solución:
1. Verificar URL de Evolution API
2. Asegurar que la instancia se creó correctamente
3. Verificar que el endpoint sea correcto
```

#### Error de CORS
```
Causa: Evolution API no permite peticiones desde tu dominio
Solución:
1. Configurar CORS en Evolution API
2. Agregar tu dominio a la lista blanca
3. Usar un proxy CORS temporal
```

#### Error de Red
```
Causa: Problemas de conectividad
Solución:
1. Verificar conexión a internet
2. Verificar que Evolution API esté online
3. Verificar firewall/proxy
```

### 🔧 Soluciones Avanzadas

#### 1. Verificar Logs de Evolution API
```bash
# En el servidor de Evolution API
docker logs evolution-api-container
# o
tail -f /var/log/evolution-api.log
```

#### 2. Probar API Manualmente
```bash
# Crear instancia
curl -X POST "https://tu-evolution-api.com/instance/create" \
  -H "Authorization: Bearer TU_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "instanceName": "test_instance",
    "phone": "+5491112345678"
  }'

# Generar QR
curl -X GET "https://tu-evolution-api.com/instance/connect/test_instance" \
  -H "Authorization: Bearer TU_API_KEY"
```

#### 3. Configurar CORS en Evolution API
```javascript
// En la configuración de Evolution API
app.use(cors({
  origin: ['https://tu-dominio.com', 'http://localhost:3000'],
  credentials: true
}));
```

#### 4. Usar Proxy CORS Temporal
```javascript
// Agregar antes de las peticiones fetch
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

async function generateQRCode() {
    const response = await fetch(CORS_PROXY + `${API_CONFIG.evolution.baseUrl}/instance/connect/${API_CONFIG.evolution.instanceName}`, {
        headers: {
            'Authorization': `Bearer ${API_CONFIG.evolution.apiKey}`
        }
    });
    // ... resto del código
}
```

### 📱 Verificación del QR Generado

#### Formato Correcto del QR
El QR debe ser una de estas opciones:
- **Base64**: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...`
- **URL**: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=...`
- **Texto**: Contenido del QR para escanear

#### Probar el QR
1. **WhatsApp Web**: Abrir WhatsApp Web y escanear
2. **WhatsApp Mobile**: Configuración → Dispositivos vinculados → Vincular dispositivo
3. **Verificar**: El QR debe mostrar un código legible

### 🆘 Si Nada Funciona

#### Opción 1: Usar Modo Demo
```javascript
// En la función generateQRCode, agregar:
if (error) {
    console.log('Usando QR de demo...');
    return 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=WhatsApp%20Demo%20QR%20Code';
}
```

#### Opción 2: Generar QR Localmente
```javascript
// Usar librería QR local
import QRCode from 'qrcode';

async function generateLocalQR(data) {
    try {
        const qrDataURL = await QRCode.toDataURL(data);
        return qrDataURL;
    } catch (error) {
        console.error('Error generando QR local:', error);
        return null;
    }
}
```

#### Opción 3: Contactar Soporte
- **Email**: soporte@tudominio.com
- **GitHub Issues**: Crear issue con logs completos
- **Documentación**: Revisar docs.evolution-api.com

### 📊 Información de Debug

#### Datos a Recolectar
```javascript
// Agregar esta función para debug
function collectDebugInfo() {
    return {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        evolutionUrl: API_CONFIG.evolution.baseUrl,
        instanceName: API_CONFIG.evolution.instanceName,
        phone: document.getElementById('phone').value,
        business: document.getElementById('business').value,
        console: console.logs // Últimos logs
    };
}
```

#### Enviar a Soporte
```javascript
// Función para enviar debug info
async function sendDebugInfo() {
    const debugInfo = collectDebugInfo();
    
    try {
        await fetch('/api/debug', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(debugInfo)
        });
        alert('Información de debug enviada');
    } catch (error) {
        console.error('Error enviando debug info:', error);
    }
}
```

---

## 🎯 Resumen de Soluciones

1. **Primero**: Usar el botón "🔍 Probar" para verificar conectividad
2. **Segundo**: Revisar la consola del navegador para errores específicos
3. **Tercero**: Verificar configuración de Evolution API
4. **Cuarto**: Probar con curl/Postman
5. **Quinto**: Contactar soporte con logs completos

**¡La mayoría de problemas se resuelven verificando la conectividad y configuración de Evolution API!** 🚀 