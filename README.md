# Crypto Dashboard

Aplicação Angular moderna que demonstra autenticação JWT com JWKS e visualização de dados de criptomoedas em tempo real.

## Funcionalidades

- Autenticação segura usando JWT com validação JWKS
- Monitoramento de preços de criptomoedas em tempo real via API CoinGecko
- Visualização interativa do histórico de preços
- Design responsivo
- Arquitetura com componentes standalone

## Pré-requisitos

- Node.js 18+
- Docker e Docker Compose (opcional)
- Angular CLI 19.1.5+

## Tecnologias

- Frontend: Angular 19.1
- Backend: NestJS
- Autenticação: JWT/JWKS
- Gráficos: Chart.js
- API: CoinGecko

## Estrutura do Projeto

```
├── frontend/     # Aplicação Angular
├── backend/      # Servidor NestJS
└── docker/       # Configuração Docker
```

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/IsisFraga/crypto-dashboard
cd crypto-dashboard
```

2. Instale as dependências:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Configure o ambiente:
```bash
# Backend
cp .env
# Por se tratar de um projeto fictício, não utilizei o padrão .env.example,
# o arquivo .env já está configurado.
```

4. Inicie a aplicação:

### Modo desenvolvimento:
```bash
# Backend
cd backend
npm run start:dev

# Frontend
cd frontend
npm start
```

### Modo Docker:
```bash
docker-compose up
```

Acesse a aplicação em `http://localhost:4200`

## Como fazer login
```bash
usuário: admin
senha: admin

# mas experimente errar usuário e/ou senha também!
```

## Arquitetura

- **Frontend**:
  - Arquitetura de componentes standalone
  - Módulo Core para autenticação e serviços compartilhados
  - Módulos de feature para dashboard de criptomoedas e autenticação
  - RxJS para gerenciamento de estado e atualizações em tempo real
  - Rotas com carregamento lazy

- **Backend**:
  - Framework NestJS com arquitetura modular
  - Autenticação JWT com suporte JWKS
  - Endpoints RESTful
  - Configuração baseada em ambiente

## Documentação da API

- Endpoints de autenticação:
  - POST `/auth/login` - Autenticação do usuário
  - GET `/auth/.well-known/jwks.json` - Endpoint JWKS

- Endpoints de criptomoedas:
  - GET `/crypto/prices` - Preços atuais
  - GET `/crypto/history/:id` - Dados históricos


## Build

```bash
# Build de produção frontend
cd frontend
npm run build
```

Os arquivos de build serão armazenados no diretório `dist/`.



