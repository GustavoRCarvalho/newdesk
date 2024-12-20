# New Desk é uma aplicação web de help desk

Acesse: [New Desk](https://newdesk.gustavocarvalho.dev.br/) <br />
Este site está hospedado na plataforma Amazon Amplify.

Bem-vindo ao projeto New Desk, uma aplicação web para criação, organização e compartilhamento de artigos. Feita com o objetivo de ser uma plataforma intuitiva e eficiente, conta com recursos que permitem uma navegabilidade rápida para qualquer usuário.

## Tecnologias Utilizadas

### Base: 

[React](https://github.com/facebook/react) <br />
[Vite](https://github.com/vitejs/vite) <br />

### Estilos:

[styled-components](https://github.com/styled-components/styled-components) <br />
[react-icons](https://github.com/react-icons/react-icons) <br />
[framer-motion](https://github.com/framer/motion) <br />

### Gerenciamento:

[react-redux](https://github.com/reduxjs/redux-toolkit) <br />
[react-router-dom](https://github.com/remix-run/react-router) <br />
[react-scroll](https://github.com/fisshy/react-scroll) <br />
[react-cookie](https://github.com/bendotcodes/cookies/tree/main/packages/react-cookie) <br />

### Editor Textual:

[quill](https://github.com/slab/quill) <br />
[quill-resize-image](https://github.com/hunghg255/quill-resize-image) <br />
[react-quill-new](https://github.com/zenoamaro/react-quill) <br />

### Google One Tap + JWT Decode:

[google-one-tap](https://github.com/BurakGur/google-one-tap) ([Descontinuado pelo Google](https://developers.google.com/identity/one-tap/android/legacy-get-started?hl=pt-br#:~:text=Aten%C3%A7%C3%A3o:%20o%20recurso%20Um%20toque%20para%20Android,recurso%20Fazer%20login%20com%20o%20Google%2C%20mais)) agora usando Gerenciamento de Credenciais) <br /> 
[jwt-decode](https://github.com/auth0/jwt-decode) <br />

### Eslint + Prettier:

[eslint](https://github.com/eslint/eslint) <br />
[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) <br />

## Como Iniciar o Projeto

1. Clone este repositório: `git clone https://github.com/GustavoRCarvalho/newdesk`
2. Instale as dependências: `npm install`
3. Crie uma API Key do Google e um client ID dentro de um projeto no Google Cloud Console, após configurados, adicione em um .env no seu repositório clone usando VITE_GOOGLE_API_KEY e VITE_GOOGLE_CLIENT_ID.
4. Inicie o servidor de desenvolvimento: `npm start`
5. Acesse o aplicativo em seu navegador: `http://localhost:3000`

## Contribuições

Contribuições são bem-vindas! Se você tiver sugestões de melhorias, correções de bugs ou novas funcionalidades, sinta-se à vontade para abrir uma [issue](https://github.com/GustavoRCarvalho/newdesk/issues) ou enviar um [pull request](https://github.com/GustavoRCarvalho/newdesk/pulls).

Desenvolvido por [Gustavo Rafael de Carvalho](https://github.com/GustavoRCarvalho) - [LinkedIn](https://www.linkedin.com/in/gustavo-carvalho-0/) - [Portfólio](https://portfolio.gustavocarvalho.dev.br/)
