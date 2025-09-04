# EsquiloPix – Integração com Lotuspay

Este projeto está configurado para operar com o gateway de pagamentos Lotuspay.

- Site do gateway: https://lotuspay.me
- API base: https://api.lotuspay.me

O fluxo principal é:
1) Você cria uma conta no Lotuspay e gera um Token API.
2) Cadastra esse token na base de dados (tabela `lotuspay`).
3) Importa o arquivo SQL do projeto para criar todas as tabelas necessárias.
4) Sobe o servidor PHP localmente para testes.

---

## 1) Pré‑requisitos

- PHP 8.1+
- MySQL/MariaDB
- Extensões PHP essenciais (curl, mysqli, json, etc.)
- Acesso ao painel do Lotuspay

---

## 2) Criar conta e gerar o Token API no Lotuspay

1. Acesse o site: https://lotuspay.me
2. Crie sua conta e acesse o painel.
3. Localize a seção de API e gere um token (chave secreta de API).
4. Guarde o token com segurança (ex.: `lp_XXXXXXXXXXXXXXXX`).

Este token será utilizado pelo backend nas chamadas à API do Lotuspay, por exemplo no arquivo `dash/services-gateway/payment_manual.php`, que envia requisições para `https://api.lotuspay.me/api/v1/cashout` usando o header `Lotuspay-Auth`.

---

## 3) Cadastro do token no banco de dados

O projeto lê o token diretamente da tabela `lotuspay` (coluna `token_secreto`).

- Em `dash/services-gateway/payment_manual.php` o token é lido por: `SELECT token_secreto FROM Lotuspay WHERE id = 1 LIMIT 1`.
- Em `lotuspay/webhook.php` o token recebido no header `Authorization: Bearer ...` é comparado com o mesmo valor salvo no banco.

Importante: no arquivo SQL (`banco_para_importar.sql`) a tabela é criada como `lotuspay` (minúsculo). Em sistemas Linux, o MySQL pode diferenciar maiúsculas/minúsculas em nomes de tabelas. Se o seu servidor for sensível a caixa, ajuste as queries do código para `lotuspay` (minúsculo) ou padronize sua configuração. Exemplo de atualização das queries (se necessário):

```sql
-- Se precisar inserir/atualizar o token manualmente:
INSERT INTO `lotuspay` (`id`, `token_secreto`) VALUES (1, 'lp_SEU_TOKEN_AQUI')
ON DUPLICATE KEY UPDATE token_secreto = VALUES(token_secreto);

-- Para atualizar somente:
UPDATE `lotuspay` SET token_secreto = 'lp_SEU_TOKEN_AQUI' WHERE id = 1;
```

---

## 4) Importar o banco de dados

O dump completo está em `banco_para_importar.sql`. Ele cria todas as tabelas necessárias (ex.: `usuarios`, `transacoes`, `afiliados`, `raspadinhas`, `lotuspay`, etc.) e inclui registros básicos de configuração.

Você pode importar de duas formas:

- phpMyAdmin
  1. Crie um banco vazio (ex.: `esquilopix`).
  2. Vá em Importar e selecione `banco_para_importar.sql`.
  3. Execute a importação.

- Linha de comando (MySQL client)
  ```bash
  mysql -u SEU_USUARIO -p -h 127.0.0.1 SEU_BANCO < banco_para_importar.sql
  ```

Após importar, cadastre/atualize o token do Lotuspay conforme descrito na seção anterior.

---

## 5) Configurar conexão com o banco

A conexão MySQL é feita em `dash/services/database.php` (arquivo não versionado). Ajuste host, usuário, senha e nome do banco conforme seu ambiente.

---

## 6) Executar localmente (SOMENTE PARA TESTES)

Para servir localmente via roteador PHP embutido:

```bash
php -S 127.0.0.1:8000 router.php
```

Em seguida acesse `http://127.0.0.1:8000` no navegador.

---

## 8) Dicas e observações

- Segurança do token: mantenha o `token_secreto` seguro. Evite versionar esse valor; prefira armazená-lo somente no banco.
- Case-sensitive (MySQL): se estiver em Linux, padronize o nome da tabela como `lotuspay` (minúsculo) ou ajuste as queries do código para corresponder ao nome criado no SQL.
- Logs/erros: a API `api/v1/api.php` está preparada para registrar erros em `api/v1/error.log` quando necessário.

---

Qualquer dúvida ou necessidade de ajuste adicional, edite estes arquivos para adequar rotas e nomes de tabela ao seu ambiente.