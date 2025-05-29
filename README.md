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

