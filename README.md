# AcePay - Rest API

#### Instruções de uso - Rest API

Camada backend do projeto AcePay desenvolvida com NodeJS e Express.

Implantada em: https://radiant-scrubland-86194.herokuapp.com/<br/>
Acesse: https://radiant-scrubland-86194.herokuapp.com/users para exemplo da operação GET em ação.

#### Instruções de uso - CRUD HTML

A aplicação NodeJS está hospedada no **Heroku** e o banco de dados **MongoDB** está hospedado no [MLab](mlab.com/databases/acepaydb") e pode ser acessada conforme instruções a seguir. Acesse:<br/>

1. https://radiant-scrubland-86194.herokuapp.com/ para **Listar todos os documentos**.
2. https://radiant-scrubland-86194.herokuapp.com/new para **Inserir um novo documento** ou clique no botão **Novo** (insert).
3. Clique em **Alterar** para abrir o formulário com dados para alteração (update) do documento selecionado.
4. Clique em **Excluir** para excluir o documento selecionado (delete).

O arquivo [db.js](db.js) contém o código com as rotinas de acesso ao MongoDB e as consultas solicitadas.<br/>
O arquivo [usuarioController.js](/controllers/usuarioController.js) contém o código que aciona as rotinas implementadas no arquivo [db.js](db.js).<br/>
O arquivo [index.js](/routes/index.js) contém os pontos de entrada das operações do CRUD.<br/>

Carlos Adriano Beserra da Silva
