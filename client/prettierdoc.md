# Prettier documentation with eslint

Paso 1: Instalar las dependencias necesarias
Primero, necesitas instalar ESLint y Prettier junto con algunos plugins y configuraciones para que trabajen juntos.

# Instalar ESLint y Prettier

npm install --save-dev eslint prettier

# Instalar los plugins necesarios para integrar Prettier con ESLint

npm install --save-dev eslint-config-prettier eslint-plugin-prettier

eslint-plugin-prettier: Este plugin permite ejecutar Prettier como parte del proceso de linting.

eslint-config-prettier: Desactiva reglas de ESLint que puedan entrar en conflicto con Prettier (por ejemplo, reglas sobre el uso de comillas o puntos y coma).

Paso 2: Configurar ESLint
Ahora debes configurar ESLint para que use los plugins mencionados y asegúrate de que ESLint no tenga reglas en conflicto con Prettier. Crea un archivo .eslintrc.json en la raíz de tu proyecto con la siguiente configuración:

{
"extends": [
"eslint:recommended", // Reglas recomendadas de ESLint
"plugin:prettier/recommended" // Activar el plugin de Prettier para ESLint
],
"plugins": [
"prettier" // Agregar el plugin Prettier
],
"env": {
"browser": true,
"node": true
},
"rules": {
"prettier/prettier": ["error"] // Configura que Prettier se ejecute como error si no se cumple
}
}

"plugin:prettier/recommended": Esto incluye la configuración que desactiva todas las reglas de ESLint que podrían entrar en conflicto con Prettier.

"prettier/prettier": Esta regla asegura que ESLint marque como error cualquier código que no esté correctamente formateado según Prettier.

Paso 3: Configurar Prettier
Ahora, crea un archivo .prettierrc para configurar Prettier. Aquí hay un ejemplo básico de cómo configurarlo:

{
"singleQuote": true,
"tabWidth": 2,
"semi": false
}

Configuración en un archivo: Prettier puede configurarse mediante un archivo de configuración (.prettierrc, prettier.config.js, etc.). Algunas de las configuraciones comunes son:

tabWidth: Cantidad de espacios por cada nivel de indentación.

singleQuote: Si usar comillas simples en lugar de dobles.

semi: Si se deben agregar o no puntos y coma al final de las líneas.

trailingComma: Controla si debe haber comas al final de listas o objetos.

printWidth: Número máximo de caracteres por línea antes de hacer un salto de línea.

Paso 4: Ejecutar ESLint
Para ejecutar ESLint con Prettier, puedes correr el siguiente comando:

npx eslint --fix .

El --fix intentará corregir automáticamente los problemas de estilo de código, lo cual incluye la ejecución de Prettier en los archivos.

Paso 5: (Opcional) Configurar pre-commit hooks con Husky y lint-staged
Para asegurarte de que todos los archivos se formateen antes de hacer commit, puedes integrar Husky y lint-staged. Aquí te dejo cómo hacerlo:

Instala Husky y lint-staged:

npm install --save-dev husky lint-staged
