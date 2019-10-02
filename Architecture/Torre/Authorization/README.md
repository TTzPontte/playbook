
# Authorization

## User
O `User`, que será o usuário logado, poderá possuir uma ou várias roles.

##### TorreControle-users.${env}
```json
[
    {
        "uid": "1",
        "name": "John Doe",
        "roles": ["FINANCEIRO", "ATENDIMENTO"]
    }
]
```

## Roles
`Roles` será o grupo de `policies` que o `User` poderá assumir.
Possuirá uma ou várias `policies`

##### TorreControle-users-roles.${env}
```json
[
    {
        "id": "1",
        "name": "FINANCEIRO",
        "policies": [
            "contract:*", 
            "simulations:*"
        ]
    }
]
```
## Policies
`Policies` serão as permissões que cada rota terá, sem exceção.

##### TorreControle-users-policies.${env}
```json
[
    { "policy": "contract:*" },
    { "policy": "contract:all:read" }
]
```
## Regras
As `policies` seguirão padrões de `domain`:`function`:`operation`

#### Exemplo
| Domain | Function | Operation | Fields | Description |
|---|---|---|---|---|
| contract | all | read | | contracts:all:read - Permissão para acessar a função getAll dos contratos
| contract | one | read | | contracts:one:read - Permissão para acessar a função especifica dos contratos
    .
    ├── ...
    ├── contract        # Domain = Contract
    │   ├── getAll.js   # Function = getAll + descrição = all
    │   ├── get.js      # Function = get + descrição = one
    └── ...

#### Wildcard
**`domain:*`** Wildcard será uma permisão para acessar qualquer página daquele `domain`
- Ex.: `contracts:*` poderá acessar qualquer função definida no domain de `contracts`
- Ex.: `simulations:*` poderá acessar qualquer função definida no domain de `simulations`


# Front-end
Após o usuário efetuar o login no `front-end`, ele retonará para o usuário suas permissões.

Cada setor do front-end vai ter um `Check Permissions`, passando o tipo de permissão do `contracts:all:read` baseado nas policies que foram descritas acima. Caso o usuário não possuir a permissão necessária, não exibirá o componente associado à permissão.

# Back-end
Ao acessar o back-end, um middleware irá buscar os dados do usuário que efetuou o request.

A cada request, ele vai verificar no `back-end` (caso o usuário consiga acessar uma url que o front-end não permite).

Através de um middleware, ele verificará se a `policy` é válida para acessar a rota. Caso não seja, irá retornar o verbo HTTP 403.

- Todas as rotas deverão ter uma verificação de policy.

### Middleware
Para efetuar as ações de middleware, iremos usar o [Middy](https://github.com/middyjs/middy).


# Sugestões
### Filtro de **fields** dados baseado em permissões
- Ex.: `contracts:one:read::!{user.cpf,mother}`

Após os `::` será definido quais os campos que serão retornados.

Caso tenha uma negação `(!)`, será os campos que não poderão ser exibidos para o usuário que solicitou a requisição.

***contract.json*** 
```json
{
    "id": "123-456",
    "contractOwner": "pENMUbmPT_qUusgv2Q4vlg",
    "source": "adwords",
    "user": {
        "name": "Usuário",
        "cpf": "000.000.370.00",
        "rendaMensal": 15000
    },
    "mother": {
        "name": "Mãe",
        "cpf": "000.000.370.00",
        "rendaMensal": 15000
    }
}
```

Iremos passar o tipo de permissão para o middleware
```js
const permission = 'contracts:one:read::!{user.cpf,mother}'
exports.handler = middy(handler)
                .use(setPolicies(permission));
```

e após o tratamento baseado nas permissões o response deverá ser: 

***contract.json*** 
```json
{
    "id": "123-456",
    "contractOwner": "pENMUbmPT_qUusgv2Q4vlg",
    "source": "adwords",
    "user": {
        "name": "Usuário",
        "rendaMensal": 15000
    }
}
```
