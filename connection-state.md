
# 📘 Evolution API – Connection State

## 🔸 Endpoint
```
GET /instance/connectionState/{instance}
```

Obtiene el estado actual de conexión de una instancia de WhatsApp.

---

## 🔐 Autenticación
Incluye en las cabeceras:
```http
apikey: <tu-api-key>
```

---

## 🔣 Parámetros

- **Path**  
  `instance` (string, obligatorio): ID de la instancia a consultar.

---

## 🛠️ Ejemplo de solicitud cURL

```bash
curl --request GET \
  --url https://{server-url}/instance/connectionState/123e4567-e89b-12d3-a456-426614174000 \
  --header "apikey: <tu-api-key>"
```

---

## ✅ Respuesta Exitosa (HTTP 200)

```json
{
  "instance": {
    "instanceName": "teste-docs",
    "state": "open"
  }
}
```

---

## 📌 Campos de respuesta

- `instance.instanceName`: Nombre asignado a la instancia.
- `instance.state`: Estado actual de la conexión (ej. `"open"`, `"close"`, etc.).

---

## ❌ Errores

| Código | Significado                                  |
|--------|-----------------------------------------------|
| 404    | Instancia no encontrada                       |
| 403    | API Key inválida o sin permisos               |

---

## 🧭 Uso recomendado

Utilizá este endpoint para monitorear si tu instancia está conectada (`open`) o desconectada (`close`). Ideal para validaciones antes de enviar mensajes o reconectar instancias.
