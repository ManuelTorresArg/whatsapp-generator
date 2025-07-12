
# 📘 Evolution API – Create Instance Basic

## 🔸 Endpoint
```
POST /instance/create
```

Crea una nueva instancia de WhatsApp con configuración personalizada.

---

## 🔐 Autenticación
Se requiere API Key en los headers:

```http
apikey: <tu-api-key>
```

---

## 📥 Body (JSON)

```json
{
  "instanceName": "demo-instance",
  "token": "token_unico",
  "qrcode": true,
  "number": "5491123456789",
  "integration": "WHATSAPP-BAILEYS",
  "webhook": "https://tuservidor.com/webhook",
  "webhook_by_events": true,
  "events": ["APPLICATION_STARTUP", "MESSAGE_RECEIVED"],
  "reject_call": false,
  "msg_call": "No puedo atender llamadas",
  "groups_ignore": true,
  "always_online": false,
  "read_messages": false,
  "read_status": false,
  "websocket_enabled": false,
  "websocket_events": [],
  "rabbitmq_enabled": false,
  "rabbitmq_events": [],
  "sqs_enabled": false,
  "sqs_events": [],
  "typebot_url": null,
  "typebot": null,
  "proxy": {
    "host": "",
    "port": "",
    "protocol": "",
    "username": "",
    "password": ""
  },
  "chatwoot_account_id": null,
  "chatwoot_token": null,
  "chatwoot_url": null
}
```

> **Notas:** Todos los campos son opcionales excepto `instanceName`, `token` e `integration`.

---

## ✅ Respuesta Exitosa (HTTP 201)

```json
{
  "instance": {
    "instanceName": "demo-instance",
    "instanceId": "uuid-1234...",
    "status": "created"
  },
  "hash": {
    "apikey": "123456"
  },
  "settings": {
    "reject_call": false,
    "msg_call": "",
    "groups_ignore": true,
    "always_online": false,
    "read_messages": false,
    "read_status": false
  }
}
```

---

## ❌ Errores

| Código | Significado                           |
|--------|----------------------------------------|
| 403    | No autorizado (apikey inválida)        |
| 400    | Parámetros inválidos                   |

---

## 📌 Descripción de Campos

- `instanceName`: Nombre único de la instancia.
- `token`: Token personalizado.
- `integration`: Tipo de integración, ej. `WHATSAPP-BAILEYS`.
- `webhook`, `webhook_by_events`, `events`: Configuración de eventos salientes.
- `read_messages`, `reject_call`, `groups_ignore`, etc.: Comportamientos automáticos.
- `typebot_*`, `chatwoot_*`: Soporte opcional para integraciones.
- `proxy`: Configuración de proxy si aplica.
- `instanceId`: UUID generado.
- `apikey`: Clave para futuras peticiones a esta instancia.

---

## 🧪 Ejemplo cURL

```bash
curl --request POST \
  --url https://{server-url}/instance/create \
  --header 'Content-Type: application/json' \
  --header 'apikey: <tu-api-key>' \
  --data '{
    "instanceName": "demo-instance",
    "token": "token_unico",
    "integration": "WHATSAPP-BAILEYS"
  }'
```

---

## 🧭 Uso Sugerido

Ideal para iniciar una nueva sesión de WhatsApp automatizada y personalizarla desde el principio, incluyendo eventos, conexión a bot, y comportamiento de mensajes.
