# Discord Alt Voice Keep-Alive

Um script leve em Node.js utilizando `discord.js-selfbot-v13` e `@discordjs/voice` para manter uma conta secundária (*alt*) do Discord conectada a um canal de voz de forma automatizada e contínua 24/7.

## ⚠️ Aviso Importante
O uso de *self-bots* (automação em contas de usuário comuns) viola os Termos de Serviço (ToS) oficiais do Discord. Utilize esta ferramenta por sua própria conta e risco.

---

## Como Usar

### 1. Pré-requisitos
* Ter o **Node.js** instalado na sua máquina ou ambiente de execução.

### 2. Estrutura do Projeto
Crie uma pasta e adicione os seguintes arquivos:

#### `package.json`
```json
{
  "name": "discord-voice-alt",
  "version": "1.0.0",
  "description": "Self-bot para manter alt em call",
  "main": "index.js",
  "dependencies": {
    "discord.js-selfbot-v13": "^14.3.0"
  }
}

```

---

### 3. Como Obter o Token de Acesso (User Token) da Conta Alt

Para conseguir o token da conta secundária que ficará na chamada:

1. Abra o navegador e acesse a versão web do Discord (`discord.com/app`) fazendo login na conta *alt*.
2. Abra as **Ferramentas de Desenvolvedor** do navegador pressionando **`F12`** (ou `Ctrl + Shift + I`).
3. Vá para a aba **Network** (Rede) e filtre por **`api`**.
4. Interaja com a interface do Discord (mude de canal ou recarregue a página com `F5`).
5. Clique em qualquer uma das requisições geradas e acesse a aba **Headers** (Cabeçalhos).
6. Na seção **Request Headers**, localize o campo **`authorization`** e copie o texto correspondente (este é o seu token).

---

### 4. Configurando as Variáveis de Ambiente

O script utiliza variáveis de ambiente para manter suas credenciais seguras. Defina as seguintes variáveis antes de rodar o código:

* `ACCESS_TOKEN`: O token de acesso da sua conta alt do Discord.
* `GUILD_ID`: O ID numérico do servidor (guild) do Discord.
* `VOICE_CHANNEL_ID`: O ID numérico do canal de voz onde o bot deve entrar.

#### Exemplos de configuração por sistema operacional:

* **No Linux / macOS (Terminal):**
```bash
export ACCESS_TOKEN="seu_token_aqui"
export GUILD_ID="seu_guild_id_aqui"
export VOICE_CHANNEL_ID="seu_canal_id_aqui"
```

* **No Windows (PowerShell):**
```powershell
$env:ACCESS_TOKEN="seu_token_aqui"
$env:GUILD_ID="seu_guild_id_aqui"
$env:VOICE_CHANNEL_ID="seu_canal_id_aqui"
```

* **No Windows (CMD):**
```cmd
set ACCESS_TOKEN=seu_token_aqui
set GUILD_ID=seu_guild_id_aqui
set VOICE_CHANNEL_ID=seu_canal_id_aqui
```

* **No Windows (Variáveis de Ambiente do Sistema via Interface Gráfica):**
1. Pressione a tecla **Windows**, digite **"Variáveis de ambiente"** e clique em **"Editar as variáveis de ambiente do sistema"**.
2. Clique no botão **Variáveis de Ambiente...** no canto inferior direito.
3. Na seção superior (**Variáveis de usuário**), clique em **Nova...** e adicione cada uma das chaves (`ACCESS_TOKEN`, `GUILD_ID`, `VOICE_CHANNEL_ID`) com seus respectivos valores.
4. Clique em **OK** para salvar.

---

### 5. Instalação e Execução

1. Abra o terminal na pasta do projeto e instale as dependências:
```bash
npm install
```

2. Inicie a aplicação:
```bash
npm run start
```