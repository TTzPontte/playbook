
# Fluxo de uma Tarefa

Na Pontte nós acompanhamos o fluxo de vida de nossas tarefas através de um quadro Kanban que possui 9 colunas, sendo elas Backlog, Ready for Refining, Refined, Ready for Development, In Development, Blocked, Ready for Review, Ready for Deploy e Completed.

## Backlog

É no backlog que ficam todas as tarefas solicitadas, que poderão fazer parte da solução de dores de alguma equipe da empresa, uma nova funcionalidade ou qualquer outro tipo de tarefa que precisemos atacar dentro do planejamento da empresa. Esta coluna não é populada diretamente pelos desenvolvedores e você poderá estar se informando melhor com o seu líder a respeito de como a coluna backlog é alimentada.

## Ready for Refining

Na Pontte antes de atacar uma tarefa nós primeiro a refinamos em uma Reunião de Refinamento com todos os membros da squad. Nosso objetivo é que todas as duvidas e questionamentos sobre a tarefa sejam levantados, que impeditivos e relacionamentos sejam encontrados e que tenhamos um entendimento claro sobre o que é solicitado e o que precisa ser feito em cada tarefa. Esta coluna pode ser alimentada com tarefas que vem do backlog por um líder da equipe.

## Refined

Aqui são as tarefas que já foram refinadas e estão pronto para desenvolvimento. Você pode se perguntar “Depois que refinamos uma tarefa porque não colocamos logo em Ready for Development ?” e esta pergunta responde as responsabilidades desta coluna, a primeira é a de organização pois podemos saber quais tarefas já foram refinadas e quais não foram, como por exemplo um bugfix que precisou ser lançada diretamente em Ready for Development. Uma outra responsabilidade da coluna e ‘guardar’ as tarefas que já foram refinadas mas que por algum motivo não puderam ser incluídas na Sprint. Esta coluna é alimentada durante uma Reunião de Refinamento movendo as tarefas que foram refinadas da coluna Ready for Refining.

## Ready for Develoment

Nesta coluna temos as tarefas da Sprint atual, esta coluna é alimentada durante uma Reunião de Planejamento e deve ser alimentada com tarefas da coluna Refined, tarefas do tipo bugfix que podem não ter passado por refinamento e intruders (tarefas que não foram adicionadas na coluna durante a Reunião de Planejamento). Durante a Reunião de Planejamento a equipe em acordo mutuo decidem quais tarefas entrarão na Sprint e estarão na coluna Ready for Development e quais não entrarão.

## In Development

Aqui estão as tarefas atualmente em desenvolvimento, essa coluna é alimentada pela coluna Ready for Development e é responsabilidade de cada membro da Squad deixar esta coluna atualizada com a tarefa na qual se esta trabalhando atualmente, sempre lembrando de trabalhar em apenas uma tarefa por vez.

## Blocked

Por algum motivo uma tarefa pode ser bloqueada, seja pela espera de uma informação de terceiros, seja pela dependência de uma outra tarefa, seja por outro motivo. Esta coluna pode ser alimentada por tarefas vindo de In Development ou Ready for Development e o motivo do bloqueio deve estar claro na tarefa.

## Ready for Review

Após uma tarefa ter sido concluída ela precisa ser mergeada no branch staging, para isto abrimos um Pull Request e é neste momento que as tarefas transitam de In Development para Ready for Review. Quando terminamos de codificar a solução da tarefa nos abrimos um Pull Request do nosso branch para staging, marcamos os revisores, esperamos os checks passarem e passamos a aguardar a aprovação do PR pelos revisores para poder mergea-lo, é neste momento que movemos a tarefa de In Development para Ready for Review, quando o PR esta apenas esperando aprovação dos revisores para poder ficar habilitado para ser mergeado pois todos os checks já passaram.

## Ready for Deploy

Após uma tarefa ter sido mergeada em staging com sucesso ela deve ser movida para Ready for Deploy. Isto ocorre após o PR ter sido aprovado e o branch ter sido mergeado em staging, o desenvolvedor é responsavel por mover a tarefa de Ready for Review para Ready for Deploy após ter mergiado o branch em staging

## Completed

A ultima fase do cliclo de vida de uma tarefa é a conclusão com sucesso do Deploy que fazemos de forma automática mergeando o branch staging no branch master, aqui estão todas as tarefas que passaram com sucesso em todas as fases do Deploy. Esta coluna é alimentada pelas tarefas que estão em Ready for Deploy e passaram por todas as fazes do AWS Pipeline, normalmente a pessoa que fez o deploy é responsável por atualizar esta coluna porem não há impedimento para outro desenvolvedor atualizar de acordo com o status do AWS Pipeline. Para mais informação sobre como o nosso deploy ocorre consulte nossa documentação sobre Deploy.