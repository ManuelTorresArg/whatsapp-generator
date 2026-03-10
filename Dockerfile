FROM nginx:alpine

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos del frontend
COPY whatsapp_qr_generator.html /usr/share/nginx/html/index.html
COPY config.js /usr/share/nginx/html/config.js
COPY config.example.js /usr/share/nginx/html/config.example.js
COPY knowhub_logo.jpeg /usr/share/nginx/html/knowhub_logo.jpeg

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
