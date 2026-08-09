## Deploy no Railway

Para fazer o deploy do seu bot no Railway:

1. **Conecte seu repositório**: No painel do Railway, selecione "New Project" > "GitHub Repo" e escolha o repositório do seu bot.
2. **Configuração de Variáveis**: Vá em "Variables" no painel do Railway e adicione todas as variáveis de ambiente necessárias (como `TOKEN` do bot).
3. **Build e Deploy**: O Railway detectará automaticamente o `package.json` e fará o build. Certifique-se de que o comando de inicialização (`start`) esteja configurado no seu `package.json` como `"start": "node index.js"`.
4. **Persistência**: O bot estará rodando continuamente no servidor.

## Configuração de CronJob

Caso precise agendar tarefas (como backups ou limpezas automáticas), você pode usar o [Cron-job.org](https://cron-job.org/) ou o serviço nativo de Cron do Railway se necessário:

1. **Crie a rota no seu código**: Certifique-se de que seu bot tenha um endpoint (ex: `/keep-alive` ou `/cron`) que execute a função desejada.
2. **Configure no Cron-job.org**:
* Crie uma conta gratuita no [Cron-job.org](https://cron-job.org/).
* Clique em "Create Cronjob".
* Adicione a URL do seu serviço (a URL fornecida pelo Railway após o deploy).
* Configure a frequência desejada (ex: a cada 5 minutos).
* Salve a tarefa.
  """