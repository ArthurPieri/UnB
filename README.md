
# Smartclass

## Introdução
O App Smartclass tem como objetivo oferecer uma melhor experiência  na interação  entre alunos, professores e Monitores durante o tempo da disciplina e facilitar, de uma maneira segura, como são feitas as confirmações de presença em sala de aula.

Smartclass é um projeto da Disciplina de Sistemas de Informação da Universidade de Brasília desenvolvida durante o semestre 1-2019

## Setup
1. Antes de usar, você precisa ter o **Node** e o **NPM** instalados: [link para download](https://nodejs.org/en/download/).

    Você precisa ter também o **Yarn** instalado, pois usaremos ele para gerenciar nossos pacotes, por apresentar um melhor desempenho. Instale-o [aqui](https://yarnpkg.com/lang/en/docs/install).


    **Recomenda-se o uso de um editor de texto adequado para desenvolvimento**: [VSCode](https://code.visualstudio.com/docs/setup/setup-overview), [Atom](https://flight-manual.atom.io/getting-started/sections/installing-atom/)...

## Estrutura
**smartclassAPI**: API do projeto. Nela estará o backend, e todos os handlers das requests que iremos fazer. É ele o responsável por fazer as comunicações com o BD.

**smartclassGUI**: GUI (guest user interface) do projeto. É ela que vai ser a interface gráfica pro usuário trabalhar e manusear os dados. Ela é feita usando como base o material-design.

## Fluxo de Trabalho

Todas as mudanças feitas devem ser implementadas a partir de uma branch com o nome que descreve, de forma simples, o que a implementação representa.

#### Exemplo:

Vamos criar uma feature para adicionar o login de usuário

1. Vamos atualizar nossas mudanças de acordo com o que está na branch principal, no caso, a **master**.
    ```bash
    $ git checkout origin/master
    ```
    Esse comando faz com que nossa árvore de commits esteja de acordo com a branch principal.

2. Vamos criar uma nova branch para implementar as features de login
    ```bash
    # Comando: git checkout -b <nome_da_branch>

    $ git checkout -b login
    ```

3. Vamos alterar nosso código
    > suponha que tenha alguma alteração de código feita
    ```md
    Revise os códigos enviados!!!
    ```
4. Depois de alterar o código, precisamos commitar nossas mudanças:
    
    Para commitar, você deve seguir os passos a seguir:

    **4.1.** Add:
    ```bash
    # Comando: git add <caminho_para_o_arquivo>
    
    $ git add src/components/Login.vue
    ```

    > Aqui recomenda-se o uso de algum editor de texto ou alguma interface para verificar de forma correta os arquivos que estão sendo enviados.

    **4.2.** Commit:
    ```bash
    # Comando: git commit -m "<mensagem_de_commit>"

    $ git commit -m "Feature: login page"
    ```

    **4.3.** Push:
    ```bash
    # Comando: git push <upstream> <branch>

    $ git push origin login
    ```

    Por padrão, iremos usar o **origin** como upstream principal, pois ele já vem configurado no momento em que você realiza o `git clone`.

    **4.4.** Pull Request:
    
    No momento em que o seu commit for pushado, você verá um link para criar uma pull-request. Vá até esse link e crie a sua pull-request para a branch **master**.

    Essa pull request deverá ser revisada antes de aprovada.

