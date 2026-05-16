# 🏨 Smart Hotel Manager

Sistema de gerenciamento de hotel com controle de reservas, quartos, hóspedes e pagamentos.

---

## 📋 Requisitos

- **Node.js** (v14+)
- **npm** (v6+)
- **MongoDB** (local ou cloud)

---

## 🚀 Instalação

### 1️⃣ Clone o repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd "SmartHotel Manager"
```

### 2️⃣ Instale as dependências do Backend
```bash
cd backend
npm install
```

### 3️⃣ Instale as dependências do Frontend
```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuração

### Variáveis de Ambiente (Backend)

Crie um arquivo `.env` na pasta `backend/` com as seguintes variáveis:

```env
# Banco de Dados
MONGODB_URI=mongodb://localhost:27017/smart-hotel

# Servidor
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

**Nota:** Se estiver usando MongoDB Atlas (cloud), ajuste a `MONGODB_URI` com suas credenciais.

---

## 🎯 Como Executar

### Backend (Terminal 1)

```bash
cd backend
npm run dev
```

O servidor iniciará em `http://localhost:3000`

### Frontend (Terminal 2)

```bash
cd frontend
npm start
```

A aplicação abrirá em `http://localhost:3000` (React Dev Server)

---

## 📚 Estrutura do Projeto

```
SmartHotel Manager/
├── backend/
│   ├── config/
│   │   └── database.js          # Conexão MongoDB
│   ├── middleware/
│   │   └── errorHandler.js      # Tratamento de erros
│   ├── models/                  # Modelos Mongoose
│   │   ├── Hospede.js
│   │   ├── Pagamento.js
│   │   ├── Quarto.js
│   │   └── Reserva.js
│   ├── routes/                  # Rotas da API
│   │   ├── hospedes.js
│   │   ├── pagamentos.js
│   │   ├── quartos.js
│   │   └── reservas.js
│   ├── server.js                # Servidor principal
│   └── package.json
│
└── frontend/
    ├── public/
    │   ├── index.html
    │   └── IMG/                 # Imagens
    ├── src/
    │   ├── pages/               # Páginas React
    │   │   ├── Login.js
    │   │   ├── Dashboard.js
    │   │   └── Reservas.js
    │   ├── api.js               # Configuração Axios
    │   ├── App.js               # Componente principal
    │   ├── index.js
    │   └── App.css
    └── package.json
```

---

## 🔌 API Endpoints

### Hóspedes
- `GET /hospedes` - Listar todos os hóspedes
- `POST /hospedes` - Criar novo hóspede
- `GET /hospedes/:id` - Obter hóspede por ID
- `PUT /hospedes/:id` - Atualizar hóspede
- `DELETE /hospedes/:id` - Deletar hóspede

### Quartos
- `GET /quartos` - Listar todos os quartos
- `POST /quartos` - Criar novo quarto
- `GET /quartos/:id` - Obter quarto por ID
- `PUT /quartos/:id` - Atualizar quarto
- `DELETE /quartos/:id` - Deletar quarto

### Reservas
- `GET /reservas` - Listar todas as reservas
- `POST /reservas` - Criar nova reserva
- `GET /reservas/:id` - Obter reserva por ID
- `PUT /reservas/:id` - Atualizar reserva
- `DELETE /reservas/:id` - Deletar reserva

### Pagamentos
- `GET /pagamentos` - Listar todos os pagamentos
- `POST /pagamentos` - Registrar novo pagamento
- `GET /pagamentos/:id` - Obter pagamento por ID
- `PUT /pagamentos/:id` - Atualizar pagamento
- `DELETE /pagamentos/:id` - Deletar pagamento

---

## 🧪 Testes

### Frontend (React Testing Library)
```bash
cd frontend
npm test
```

### Usar Postman/Insomnia para testar API

1. Importe os endpoints listados acima
2. Configure a base URL: `http://localhost:3000`
3. Teste cada rota (GET, POST, PUT, DELETE)

---

## 🐛 Troubleshooting

### Erro de conexão com MongoDB
- Verifique se MongoDB está rodando
- Confirme a `MONGODB_URI` no `.env`

### Porta 3000 já em uso
```bash
# Mude a PORT no .env ou execute:
lsof -i :3000  # Listar processo
kill -9 <PID>  # Matar processo
```

### CORS erro
- Verifique se `CORS_ORIGIN` está correto
- Certifique-se de que backend e frontend estão em portas diferentes

---

## 👥 Informações para Testes

**Arquivos importantes para revisar:**
- Backend: `backend/server.js` - configuração principal
- Frontend: `frontend/src/App.js` - lógica de roteamento
- API: `frontend/src/api.js` - configuração das requisições

**Fluxo da Aplicação:**
1. Login → Dashboard → Gerenciar (Reservas/Quartos/Hóspedes)
2. Todas as operações conectam com a API backend

---

## 📝 Licença

ISC

---

