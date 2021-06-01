# Configurando o ambiente
- yarn add express
- yarn add body-parser

# Instalando mongodb
- Criando pasta dabase no src
- instalando mongodb 
 - https://docs.mongodb.com/manual/installation/
- 1 Verifique se o MongoDB foi iniciado com sucesso. 
sudo systemctl status mongod

Você pode opcionalmente garantir que o MongoDB iniciará após uma reinicialização do sistema, emitindo o seguinte comando:

sudo systemctl enable mongod

- 3
Pare o MongoDB. 
Conforme necessário, você pode interromper o mongodprocesso emitindo o seguinte comando:

sudo systemctl stop mongod

- 4
Reinicie o MongoDB. 
Você pode reiniciar o mongodprocesso emitindo o seguinte comando:

sudo systemctl restart mongod

# Instalando mongoose para o node se conectar com o mongo
- yarn add mongoose

# Criando tabela de Usuarios na pasta models/user.js