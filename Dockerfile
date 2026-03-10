FROM nginx:alpine

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos del frontend
COPY whatsapp_qr_generator.html /usr/share/nginx/html/index.html
# config.js está en .gitignore; usamos config.example.js como fallback.
# El config.js real se monta como volumen en docker-compose.yml
COPY config.example.js /usr/share/nginx/html/config.js
COPY config.example.js /usr/share/nginx/html/config.example.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
