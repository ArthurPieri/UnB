# Smart Class

## Setup
1. Antes de usar, você precisa ter o **Node** e o **NPM** instalados: [link para download](https://nodejs.org/en/download/).

    Você precisa ter também o **Yarn** instalado, pois usaremos ele para gerenciar nossos pacotes, por apresentar um melhor desempenho. Instale-o [aqui](https://yarnpkg.com/lang/en/docs/install).

2. Entre na pasta do repositório e digite:
    ```
    $ npm install
    ```
   Este comando irá instalar todas as dependências necessárias para começar o desenvolvimento

3. Depois de instalar as dependências, rode o seguinte comando para iniciar o [Quasar](https://v1.quasar-framework.org/):
    ```
    yarn start
    ```

4. Será aberta uma página no seu navegador, com o serviço rodando, por padrão em `http://localhost:8080/#/`.
    
5. Agora é só mexer e subir as mudanças que você fizer

## Linter

Esse projeto usa o ESLint para melhorar a formatação do código. Basicamente, ele é o responsável por deixar o código de acordo com um determinado padrão.

Toda vez que algum código estiver mal-formatado, o linter irá acusar, e não deixará você rodar o código até resolver os problemas apontados por ele.

**Recomenda-se o uso de um editor de texto que tenha os plugins para verificar o Lint**: [VSCode](https://code.visualstudio.com/docs/setup/setup-overview), [Atom](https://flight-manual.atom.io/getting-started/sections/installing-atom/)...