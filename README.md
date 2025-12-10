# NestJS gRPC Proof of Concept

Prueba de concepto implementando **NestJS con gRPC (Unary RPC)**, similar a un endpoint REST tradicional. Incluye generación automática de tipos y configuración lista para Docker.

## 📋 Requisitos

- **Node.js** >= 18
- **npm** >= 9
- **Docker** y **Docker Compose** (opcional)

## 🚀 Instalación y Uso

```bash
# 1. Instalar dependencias
npm install

# 2. Generar tipos TypeScript (Ejecutar siempre tras editar .proto)
npm run proto:generate

# 3. Compilar
npm run build

# 4. Iniciar servicios
npm run start:server      # Servidor en localhost:5001
npm run start:client      # Ejecuta llamadas de prueba
```

## 🛠️ Cómo agregar nuevos endpoints

Para extender el servicio (ej. agregar un método `NuevoMetodo`):

1.  **Definir en Proto**: Edita `proto/demo.proto` agregando el RPC y los mensajes Request/Response.
    ```protobuf
    rpc NuevoMetodo (NuevoRequest) returns (NuevoResponse) {}
    ```

2.  **Generar Tipos**: Ejecuta `npm run proto:generate`. Esto actualizará las interfaces TypeScript.

3.  **Implementar en Servidor**:
    - En `demo.service.ts`: Agrega la lógica del método.
    - En `demo.controller.ts`: Implementa el método usando el decorador `@DemoServiceControllerMethods()`.

4.  **Usar en Cliente**:
    - Agrega el método en `client.service.ts` usando `this.demoService.nuevoMetodo(...)`.

## 🔧 Configuración

El proyecto usa variables de entorno (`.env`).
Copia el ejemplo: `cp .env.example .env`.

| Variable | Descripción | Default |
|----------|-------------|---------|
| `GRPC_URL` | Host y puerto del servicio | `localhost:5001` |

## 🏗️ Estructura

- `proto/`: Definiciones gRPC (.proto).
- `src/common/proto/`: **[GENERADO]** Interfaces TS. No editar.
- `src/server/`: Microservicio NestJS.
- `src/client/`: Cliente NestJS de prueba.

## ▶️ Ejecución con Docker

```bash
docker-compose up --build
```
La configuración inyecta automáticamente la variable `GRPC_URL` correcta para la red interna de Docker.

## � Dependencias Clave

- `@nestjs/microservices`: Soporte gRPC.
- `@nestjs/config`: Variables de entorno.
- `ts-proto`: Generación de tipos TypeScript a partir de definiciones Protobuf.
