
# 📘 Evolution API – Instance Connect

## 🔸 Endpoint
```
GET /instance/connect/{instance}
```

Realiza la generación del código QR para vincular una sesión de WhatsApp.

---

## 🔐 Autenticación
Header requerido:
```http
apikey: <tu-api-key>
```

---

## 🔣 Parámetros

- **Path**  
  `instance` (string, obligatorio): ID de la instancia.

- **Query**  
  `number` (string, opcional): número de teléfono con código de país.

---

## 🛠️ Ejemplo de solicitud cURL

```bash
curl --request GET \
  --url "https://{server-url}/instance/connect/123e4567-e89b-12d3-a456-426614174000?number=5491123456789" \
  --header "apikey: <tu-api-key>"
```

---

## ✅ Respuesta Exitosa (HTTP 200)

```json
{
  "pairingCode": "WZYEH1YY",
  "code": "2@y8eK+bjtEjUWy9/FOM...",
  "count": 1
}
```

---

## 📌 Campos de respuesta

- `pairingCode`: código alfanumérico corto para emparejamiento.
- `code`: cadena (posiblemente base64) usada para generar el QR.
- `count`: número de veces que se generó o renovó el código.

---

## ❌ Errores

| Código | Significado                             |
|--------|-----------------------------------------|
| 404    | Instancia no encontrada o ya está conectada |
| 403    | API Key inválida                        |

---

## 🧭 Uso recomendado

Después de crear una instancia con `POST /instance/create`, usá este endpoint para obtener el QR. Escanealo desde WhatsApp para completar el emparejamiento. Si el QR ya expiró, el mismo endpoint lo renueva incrementando `count`.
