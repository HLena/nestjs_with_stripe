# instala stripe
npm install stripe @nestjs/config
npm install --save-dev @types/stripe

# Crea una cuenta en stripe
https://dashboard.stripe.com/register
1. Una vex que estes en el dashboard de stripe ve al menu lateral izquierdo y selecciona "Developers"
2. Se mostrara un menu desplegable y seleccionas claves de API
3. Se mostrara dos claves la publica es para el fronted y la privada es para el backend que empiezas sk_test_XXXXXXXXXX

# crea un archivo .env
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXX


## Comando para exponer tu app local con ngrok
Si tu servicio local corre en el puerto 3000 y quieres que este sea accesible desde el exterior, puedes usar el comando ngrok para exponer tu app local.

1. Instala ngrok
npm install -g ngrok

2. Ejecuta el comando ngrok http 3000
ngrok http 3000

3. Copia la url que aparece en la terminal y la pega en el navegador
https://c2b4-1234-1234-abcd.ngrok.io

4. Abre el archivo .env y agrega la url que aparece en la terminal  
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXX

