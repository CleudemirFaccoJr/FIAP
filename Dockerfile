# Use a imagem oficial do Node.js LTS
FROM node:20-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie package.json e package-lock.json (se disponível)
COPY package.json .
COPY package-lock.json .

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Compile a aplicação Next.js
RUN npm run build

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Inicie a aplicação Next.js
CMD ["npm", "start"]
