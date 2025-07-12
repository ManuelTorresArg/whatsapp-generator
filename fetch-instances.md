
# 📘 Evolution API – Fetch Instances

## 🔸 Endpoint
```
GET /instance/fetchInstances
```

Recupera el listado de instancias creadas en tu servidor Evolution API.

---

## 🔐 Autenticación
Incluye en el header:
```http
apikey: <tu-api-key>
```

---

## 🛠️ Ejemplo de solicitud cURL

```bash
curl --request GET \
  --url https://{server-url}/instance/fetchInstances \
  --header "apikey: <tu-api-key>"
```

---

## ✅ Respuesta Exitosa (HTTP 200)

```json
[
  {
    "instanceId": "uuid-1234",
    "instanceName": "demo-instance",
    "status": "open"
  },
  {
    "instanceId": "uuid-5678",
    "instanceName": "otro-demo",
    "status": "close"
  }
]
```

---

## 📌 Campos de respuesta

- `instanceId`: Identificador único de la instancia.
- `instanceName`: Nombre asignado a la instancia.
- `status`: Estado actual de la instancia (`open`, `close`, etc.).

---

## ❌ Errores

| Código | Significado                             |
|--------|------------------------------------------|
| 403    | API Key inválida o sin permiso          |

---

## 🧭 Uso recomendado

Ideal para listar todas las instancias disponibles, verificar sus estados y obtener IDs para operaciones posteriores (connect, send message, eliminar, etc.).
