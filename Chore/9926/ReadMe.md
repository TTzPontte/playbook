# Deploy

Na Pontte o nosso deploy é automático, nada de subir instancias ou fazer build’s manuais, aqui quando o seu PR é aprovado no master nossas ferramentas de CI/CD fazem todo o resto do trabalho.

# Como fazer um deploy ?

1. Loge-se no [github.com](http://github.com) e entre no repositório no qual deseja fazer o deploy.
2. Clique na aba ‘Pull Request’
3. Clique no botão ‘New Pull Request’
4. Em “Compare Change”, no select base: escolha master e no select compare: selecione staging
5. Clique no botão ‘Criar Pull Request’
6. Selecione quem irá rever o Pull Request em Reviewers
7. Compartilhe o link do Pull Request com os revisores
8. Espere o Pull Request ser aprovado pelos revisores
9. Após o passo 8 o botão “Merge Pull Request” ficará habilitado, clique nele.
10. Observe o estado do deploy através do Amazon Pipeline 
11. TESTE: Faça uma simulação no pontte.com.br
12. TESTE: Abra o card da simulação no torre de controle

# O Deploy

O nosso deploy tem basicamente duas fases, a de aprovação e a de implantação. A nossa fase de aprovação começa quando abrimos o Pull Request, nesse momento Github Actions vão rodar nossos testes e outros checks de forma automatizada para verificar se esta tudo ok com nosso código e o botão “Merge Pull Request” ficará desabilitado até algum revisor aprovar o Pull Request, nesta fase os revisores podem fazer comentários e solicitações que devem ser resolvidas antes do Pull Request ser aprovado. Após o Pull Request ser aprovado a nossa segunda fase começa apenas após clicarmos no botão “Merge Pull Request” que disparará uma action informando que um deploy esta sendo feito e também disparará um pipeline na Amazon AWS CodePipeline que irá baixar e buildar nosso projeto e subir toda a infraestrutura necessária (ECS, APIGateway, Lambda, etc...) através do AWS CloudFormation.

# Dicas

## Preparando o PR

Antes de Criar um PR, caso haja mais de três commits, devemos fazer um squash nos commits através do comando 

    git rebase -i

## Vinculando ao Shortcuts

Podemos vincular branchs e commits à tarefas no Shortcut:

**Criando um branch referenciado à StoryID 9729**

    git checkout -b feature/sc-9729

**Fazendo um commit referenciando à StoryID 9729**

    git commit -m ‘A simple commit [sc-9729]’

## Não Esquecer de Mergear

Após abrirmos um Pull Request é comum avisarmos aos membros do time envolvidos na aprovação e esperar que o Pull Request seja aceito e acabar esquecendo ele no estado aprovado mas não mergeado. É importante lembrar que os revisores NÃO VÃO MERGEAR o Pull Request, apenas aprovar e é responsabilidade de quem criou o Pull Request mergea-lo após aprovado.

## Não Esquecer das mensagens

Durante a fase de aprovação do Pull Request é possível que os revisores façam comentários e solicitações de alterações  e todos os comentários devem respondidos e resolvidos, mesmo que tudo já tenha sido esclarecido previamente, antes do Pull Request ser aprovado.