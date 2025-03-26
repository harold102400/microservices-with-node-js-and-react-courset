# 📌 Flujo de Microservicios en el Proyecto

Este sistema utiliza un **Event Bus** para coordinar la comunicación entre servicios desacoplados. A continuación, se detalla cómo los eventos viajan entre los microservicios.

## 🛠 Servicios Principales

### Post Service (4000)
- Permite la creación de publicaciones (posts).
- Cuando se crea un post, se genera un evento **PostCreated** que se envía al **Event Bus** (4005).

### Comment Service (4001)
- Maneja los comentarios asociados a los posts.
- Cuando se crea un comentario, se genera un evento **CommentCreated** que también se envía al **Event Bus** (4005).

### Event Bus (4005)
- Actúa como intermediario, recibiendo eventos y reenviándolos a todos los microservicios interesados.

### Query Service (4002)
- Recibe eventos **PostCreated** y **CommentCreated** para mantener una estructura de datos optimizada para consultas.
- Relaciona posts con sus comentarios, evitando la necesidad de múltiples llamadas entre microservicios.
- Expone un endpoint que permite a los clientes obtener posts junto con sus comentarios.

### Moderation Service (4003)
- Recibe el evento **CommentCreated** para moderar el contenido.
- Si un comentario es aprobado o rechazado, genera un evento **CommentModerated** que se reenvía al **Event Bus**.
- El **Comment Service** recibe **CommentModerated** y actualiza el estado del comentario.
- Finalmente, se emite **CommentUpdated**, que se propaga a todos los servicios.

## 🔄 Flujo de Datos y Eventos

### Creación de un Post
1. **Post Service** crea un post.
2. Se envía el evento **PostCreated** al **Event Bus**.
3. **Query Service** recibe el evento y almacena la información del post.

### Creación de un Comentario
1. **Comment Service** crea un comentario y emite **CommentCreated**.
2. El **Event Bus** reenvía **CommentCreated** a todos los servicios.
3. **Query Service** recibe el comentario y lo asocia con el post correspondiente.
4. **Moderation Service** recibe el evento y analiza el comentario.
5. Si el comentario necesita moderación, **Moderation Service** emite **CommentModerated**.
6. **Comment Service** recibe **CommentModerated** y actualiza el estado del comentario.
7. **Comment Service** emite **CommentUpdated**, lo que propaga el estado final a todos los servicios.

### Consulta de Posts y Comentarios
- El cliente consulta el **Query Service**, que devuelve posts junto con sus comentarios en un solo request.

## 🎯 Beneficios de esta Arquitectura

- ✅ **Desacoplamiento**: Los servicios no se comunican directamente, sino a través del **Event Bus**.
- ✅ **Escalabilidad**: Se pueden agregar nuevos servicios sin modificar los existentes.
- ✅ **Eficiencia**: **Query Service** optimiza la recuperación de datos sin necesidad de múltiples consultas a los microservicios.
- ✅ **Moderación Automatizada**: Se pueden aplicar reglas de validación sin interrumpir el flujo normal del sistema.
