# Mapeamento de todas as funções lamdas e tabelas do DynamoDB da torre de controle e do site

# Table of Contents

1. [Torre de Controle](#torredecontrole)
   - [Lambdas](#lambdastc)
     - [Audit](#audit)
     - [Cognito](#cognito)
     - [Contracts](#contracts)
     - [Simulations](#simulations)
     - [Upload](#upload)
     - [Users](#users)
   - [Tables](#tdtables)
     - [Contracts](#contractsdb)
     - [Simulations](#simulationsdb)
     - [People](#peopledb)
     - [Property](#propertydb)
     - [users-policies](#user-policiesdb)
     - [user-roles](#user-rolesdb)
     - [users](#usersdb)
     - [Upload](#uploadb)
     - [SimulationsReport](#simulationsReportdb)
     - [ContractReport](#contractReportdb)
     - [Statuscontract](#statuscontractdb)
     - [ContractContactType](#contractContactTypedb)
     - [ContractComment](#contractCommentdb)
     - [AuditLog](#auditLogdb)
2. [Site](#site)
   - [Lambdas](#lambdas-site)
     - [Cep](#cep)
     - [Cognito](#cognito-site)
     - [Newsletter](#newsletter)
     - [Registration](#registration)
     - [Registry](#registry)
     - [Simulator](#simulator)
     - [Tracking](#tracking)
     - [Upload](#upload-site)
   - [Tables](#tables-site)
     - [CepCache](#cep-cachedb)
     - [PreRegister](#preRegisterdb)
     - [User](#Userdb)
     - [Company](#companydb)
     - [Process](#processdb)
     - [Proposal](#proposaldb)
     - [Registries](#registriesdb)
     - [SimulationsSelection](#simulationsSelectiondb)
     - [Tracking](#trackingdb)

# Torre de Controle {#torredecontrole}

# Lambdas {#lambdastc}

---

## Audit {#audit}

---

#### Receiver

- **Nome**: ReceiverAuditLog-{Environment}
- **Descrição**: Função que coleta todas os dados no SQS e salva no banco de dados
- **Handler:** receiver
- **Tabelas**: AuditLog

---

## Cognito {#cognito}

---

#### PreRegister

- **Nome**: PreRegister-{Project}-{Environment}
- **Descrição**: Valida os campos enviados para o cadastro
- **Handler**: preRegister

#### PosRegister

- **Nome**: PosRegister-{Project}-{Environment}
- **Descrição**: Responsavel por criar um novo usuário no dynamodb e atualizar o usuário no cognito com o uid
- **Handler**: preRegister
- **Tables**: users

#### PosLogin

- **Nome**: PosLogin-{Project}-{Environment}
- **Descrição**: Valida os campos enviados para o login
- **Handler**: posLogin

---

## Contracts {#contracts}

---

### ContractGetAll

- **Nome**: ContractGetAll-{Environment}
- **Descrição**: Listagem de todos os contratos
- **Handler**: getAll
- **tables**: ContractsReport, People, users, users-roles
- **endPoint**: `/v1`
- **Method**: GET

### ContractGet

- **Nome**: ContractGet-{Environment}
- **Descrição**: Recuperar dados de um contrato pelo id
- **Handler**: get
- **tables**: Contract, People, Property, Upload, Simulations, ContractsReport, users, users-roles
- **endPoint**: `/v1/{id}`
- **Method**: GET

### UploadFileContract

- **Nome**: UploadFileContract-{Environment}
- **Descripion**: Responsável por fazer o upload de arquivos
- **Handler**: uploads/upload
- **tables**: Contract, Property, ContractsReport, Upload, User, People, users, users-roles
- **lambdas**: Pontte-PropertiesPhotosInsert, Pontte-PropertiesDocumentsInsert, Pontte-PeopleDocumentsInsert
- **endPoint**: `/v1/{id}/upload`
- **Method**: POST

### DeleteUploadFileContract

- **Nome**: DeleteUploadFileContract-{Environment}
- **Descripion**: Deleta arquivos do contrato
- **Handler**: uploads/delete
- **tables**: Contract, Property, ContractsReport, Upload, User, People, users, users-roles
- **lambdas**: Pontte-PropertiesPhotosInsert, Pontte-PropertiesDocumentsInsert, Pontte-PeopleDocumentsInsert
- **endPoint**: `/v1/{id}/upload`
- **Method**: DELETE

### DownloadFileContract

- **Nome**: DownloadFileContractFn-{Environment}
- **Descripion**: baixa todos os arquivos do contrato
- **Handler**: download
- **tables**: Contract, Property, ContractsReport, Upload, People, users, users-roles
- **lambdas**: Pontte-PropertiesPhotosInsert, Pontte-PropertiesDocumentsInsert, Pontte-PeopleDocumentsInsert
- **endPoint**: `/v1/{id}/download`
- **Method**: GET

### ContractCommentGet

- **Nome**: ContractCommentGetFn-{Environment}
- **Descripion**: Responsável por acessar os comentários de um contrato
- **Handler**: comments/get
- **tables**: ContractComments, Contract, users, users-roles
- **endPoint**: `/v1/{id}/comments`
- **Method**: GET

### ContractCommentSave

- **Nome**: ContractCommentSave-{Environment}
- **Descripion**: Responsável por salvar os comentários de um contrato
- **Handler**: comments/save
- **tables**: ContractComments, Contract, users, users-roles
- **endPoint**: `/v1/{id}/comment`
- **Method**: POST

### ContractOperationSaveFn

- **Nome**: ContractCommentSave-{Environment}
- **Descripion**: Responsável por salvar as operações de um contrato
- **Handler**: operations/save
- **tables**: ContractsReport, Contract, users, users-roles
- **endPoint**: `/v1/{id}/operation`
- **Method**: POST

### StatusContractUpdate

- **Nome**: StatusContractUpdateFn-{Environment}
- **Descripion**: Responsável por salvar as operações de um contrato
- **Handler**: status/update
- **tables**: StatusContract, ContractsReport, Contract, People, Upload, users, users-roles
- **endPoint**: `/v1/{id}/status`
- **Method**: POST

### StatusLabelGetAll

- **Nome**: StatusLabelGetAllFn-{Environment}
- **Descripion**: Listagem de todos os status de contrato
- **Handler**: getAllStatusLabel
- **tables**: StatusContract, users, users-roles
- **endPoint**: `/v1/{id}/status`
- **Method**: POST

### ActiveContract

- **Nome**: ActiveContractFn-{Environment}
- **Descripion**: Responsável por marcar o contrato como em espera ou ativo
- **Handler**: activeContract
- **tables**: ContractsReport, users, users-roles
- **endPoint**: `/v1/{id}/active`
- **Method**: POST

### ContractContactTypeGet

- **Nome**: ContractContactTypeGetFn-{Environment}
- **Descripion**: Acessa todos os tipos de contatos em contratos
- **Handler**: getAllContactTypes
- **tables**: ContractsReport, users, users-roles
- **endPoint**: `/v1/contact/types`
- **Method**: GET

### ContractContactTypeUpdate

- **Nome**: ContractContactTypeUpdateFn-{Environment}
- **Descripion**: Atualiza o tipo de contratos
- **Handler**: getAllContactTypes
- **tables**: ContractsReport, users, users-roles
- **endPoint**: `/v1/contact/types`
- **Method**: POST

### ContractStatusReport

- **Nome**: ContractStatusReportFn-{Environment}
- **Descripion**: Mostra uma lista com todos os status de contratos e a quantidade de cada etapa
- **Handler**: reports/statusReport
- **tables**: ContractsReport,StatusContract, users, users-roles
- **endPoint**: `/v1/reports/statusContract`
- **Method**: GET

### DBContractStream

- **Nome**: DBContractStream-{Environment}
- **Descripion**: Coletar todos os dados inseridos na table de contrato
- **Handler**: stream
- **tables**: ContractsReport

### DBContractReportStream

- **Nome**: DBContractReportStream-{Environment}
- **Descripion**: Coletar todos os dados inseridos no elastsearch
- **Handler**: es_stream

---

## Simulations {#simulations}

---

### SimulationGetAll

- **Nome**: SimulationGetAll-{Environment}
- **Descripion**: Listagem de todos as simulações
- **Handler**: getAll
- **tables**: Simulations, users, users-role
- **endPoint**: `/v1`
- **Method**: GET

### SimulationSource

- **Nome**: e-{Environment}
- **Descripion**: Mostra uma lista com todas os parceiros e quantidades
- **Handler**: source
- **tables**: Simulations, users, users-role
- **endPoint**: `/v1/source`
- **Method**: GET

### GetAllSources

- **Nome**: GetAllSources-{Environment}
- **Descripion**: Mostra uma lista com todas os parceiros
- **Handler**: getAllSources
- **tables**: users, users-role
- **endPoint**: `/v1/allsources`
- **Method**: GET

### SimulationAttendents

- **Nome**: SimulationAttendentsFn-{Environment}
- **Descripion**: Salva o atendende da simulação
- **Handler**: saveAttendant
- **tables**: Simulations, SimulationsReport, users, users-role
- **endPoint**: `/v1/{trackCode}/attendant`
- **Method**: POST

## SimulationReportStream

- **Nome**: SimulationReportStreamFn-{Environment}
- **Descripion**: Recebe dados do SimulationsReport e envia para o elastisearch
- **Handler**: stream

---

## Upload {#upload}

---

### UploadsGet

- **Nome**: UploadsGet-{Environment}
- **Descripion**: Permissão para fazer uploads
- **Handler**: get
- **tables**: Upload, users, users-role
- **endPoint**: `/v1`
- **Method**: POST

---

## Users {#users}

---

### TorreUsersGetPolicies

- **Nome**: TorreUsersGetPolicies-{Environment}
- **Descripion**: Recebe uma lista com as permissões do usuário logado
- **Handler**: getPolicies
- **tables**: users, users-role
- **endPoint**: `/v1/policies`
- **Method**: GET

### TorreUsersGetRoles

- **Nome**: TorreUsersGetRoles-{Environment}
- **Descripion**: Recebe uma lista com todas as posições com as permissões do usuário logado
- **Handler**: getRoles
- **tables**: users, users-role
- **endPoint**: `/v1/roles`
- **Method**: GET

---

# Dynamo Tables

### Contracts {#contractsdb}

- **Nome**: Contract.{Environment}
- **Atributos**:

|       Name       |  Type  |
| :--------------: | :----: |
|  contractOwner   | String |
|    createdAt     | String |
|        id        | String |
|  lastSimulation  |  Map   |
|   makeUpIncome   |  Map   |
|    pendencies    |  Map   |
|    propertyId    | String |
| whoIsSecondPayer | String |

### Simulations {#simulationsdb}

- **Nome**: Simulations.{Environment}
- **Atributos**:

|          Name          |  Type  |
| :--------------------: | :----: |
|        accepted        |  Map   |
|          cep           | String |
|          cet           |  List  |
|       createdAt        | String |
|          date          | String |
|           id           | String |
|         idade          | Number |
|     listaParcelas      |  List  |
|          ltv           |  List  |
|         ltvMax         |  List  |
|       parametros       |  Map   |
|        parcelas        |  List  |
|         prazos         |  List  |
|       selecionar       | Number |
|         status         | String |
| valoresEmprestimeBruto |  List  |
|   valoresEmprestimo    |  List  |
|      valorImovel       | Number |

### People {#peopledb}

- **Nome**: People.{Environment}
- **Atributos**:

|     Name      |  Type  |
| :-----------: | :----: |
|   accepted    |  Map   |
|   accounts    |  List  |
|    address    |  Map   |
| averageIncome | Number |
|     birth     | String |
|      cpf      | String |
|   createdAt   | String |
|   documents   |  Map   |
|    father     |  Map   |
|      id       | String |
| incomeSource  | String |
|    mother     |  Map   |
|     name      | String |
|   registry    |  List  |
|    sibling    |  Map   |
|    spouse     |  Map   |
|   updatedAt   | String |

### Property {#propertydb}

- **Nome**: Property.{Environment}
- **Atributos**

|   Name    |  Type  |
| :-------: | :----: |
|  address  |  Map   |
| createdAt | String |
| documents |  Map   |
|    id     | String |
|  owners   |  List  |
|  photos   |  Map   |

### user-policies {#user-policiesdb}

- **Nome**: {Project}-users-policies.{Environment}
- **Atributos**:

|   Name   |  Type  |
| :------: | :----: |
| policies | String |

### user-roles {#user-rolesdb}

- **Nome**: {Project}-users-roles.\${Environment}
- **Atributos**:

|   Name   |  Type  |
| :------: | :----: |
| policies | String |

#### users {#usersdb}

- **Nome**: {Project}-users-{Environment}
- **Atributos**

|    Name    |  Type  |
| :--------: | :----: |
| createdAt  | String |
|   email    | String |
| familyName | String |
| givenName  | String |
|    name    | String |
|  picture   | String |
|   roles    | String |
|    sub     | String |
|    uid     | String |
| updatedAt  | String |
|  userName  | String |

### Upload {#uploaddb}

- **Nome**: Upload.{Environment}
- **Atributos**:

|   Name   |  Type  |
| :------: | :----: |
| fileName | String |
|    id    | String |
|   time   | String |
|  userId  | String |

### SimulationsReport {#simulationsReportdb}

- **Nome**: SimulationsReport.{Environment}
- **Atributos**:

|    Name    |  Type  |
| :--------: | :----: |
| contractId | String |
| createdAt  | String |
|   status   | String |
| trackCode  | String |

#### ContractReport {#contractReportdb}

- **Nome**: ContractsReport.{Environment}
- **Atributos**

|      Name      |   Type   |
| :------------: | :------: |
|     active     | Boolean  |
| contractOwner  |  String  |
|   createdAt    |  String  |
|       id       |  String  |
| lastSimulation | Map (10) |
|   propertyId   |  String  |
|     status     |  String  |
| statusContract | Map (4)  |
|   updatedAt    |  String  |

### StatusContract {#statuscontractdb}

- **Nome**: StatusContract.{Environment}
- **Atributos**

|  Name  |  Type  |
| :----: | :----: |
| color  | String |
|   id   | String |
| label  | String |
| nextId |  List  |
| owner  |  List  |

### ContractContactType {#contractContactTypedb}

- **Nome**: ContractContactType.{Environment}
- **Atributos**

| Name  |  Type  |
| :---: | :----: |
| color | String |
|  id   | String |
| label | String |

### ContractComment {#contractCommentdb}

- **Nome**: ContractComment.{Environment}
- **Atributos**

|    Name    |  Type  |
| :--------: | :----: |
| contractId | String |
| createdAt  | String |
|     id     | String |
|  message   | String |
| updatedAt  | String |
|    user    | String |

#### AuditLog {#auditLogodb}

- **Nome**: {Project}-AuditLog-{Environment}
- **Atributos**

|   Name    |  Type  |
| :-------: | :----: |
| createdAt | String |
|   data    | String |
| document  | String |
|   email   | String |
|    id     | String |
|    ip     | String |
| operation | String |
|    ts     | String |
|    uid    | String |
| updatedAt | String |
|   user    | String |

# Site {#site}

## Lambdas {#lambdas-site}

---

## CEP {#cep}

---

### CepGet

- **Descripion**: Consulta cep de imoveis e usuarios do sistema.
- **Handler**: api_get
- **tables**: CepCache
- **endPoint**: `/v1/{cep}`
- **Method**: GET

---

## Cognito {#cognito-site}

---

### PreRegister

- **Nome**: PreLogin-{Environment}
- **Descripion**: Valida os campos enviados para o cadastro
- **Handler**: preregister_insert
- **tables**: PreRegister, People

### PreLogin

- **Nome**: PreLogin-{Environment}
- **Descripion**: Valida os campos enviados para o login
- **Handler**: prelogin_insert
- **tables**: PreRegister

### PosRegister

- **Nome**: PosRegister-{Environment}
- **Descripion**: Integra os dados referentes ao usuário como convidado
- **Handler**: posregister_insert
- **tables**: PreRegister
- **lambdas**: Integration

### PosLogin

- **Nome**: PosLogin-{Environment}
- **Descripion**: Integra os dados referentes ao usuário como convidado
- **Handler**: poslogin_insert
- **tables**: PreRegister
- **lambdas**: Integration

---

## Newsletter {#newsletter}

---

### NewsletterInsert

- **Descripion**: Cadastrar email na newsletter.
- **Handler**: api_insert
- **endPoint**: `/v1/subscribe`
- **Method**: POST

---

## Registration {#registration}

---

### UserGet

- **Descripion**: Função interna para retornar o usuario no sistema.
- **Handler**: user_get
- **tables**: User
- **endPoint**: `/v1/users/{userId}`
- **Method**: GET

### UserInsert

- **Descripion**: Função interna para cadastramento do usuario no sistema.
- **Handler**: user_insert
- **tables**: People, Contract, Property, User, Process
- **endPoint**: `/v1/users`
- **Method**: POST

### UserStream

- **Descripion**: Função responsável por insentir no ES simulation e simulationReport.
- **Handler**: user_insert_stream
- **tables**: User, SimulationsReport.

### UserUpdate

- **Descripion**: Função interna para atualizacao dos track codes do usuario.
- **Handler**: user_update
- **tables**: User
- **endPoint**: `/v1/users/{userId}`
- **Method**: PUT

### LastSimulationGet

- **Descripion**: Retorna os dados da última simulação do usuário.
- **Handler**: simulation_get
- **tables**: User, Contract, People
- **endPoint**: `/v1/{peopleId}/simulations/latest`
- **Method**: GET

### PeopleGet

- **Descripion**: Retorna os dados da pessoa.
- **Handler**: people_get
- **tables**: User, People
- **endPoint**: `/v1/{peopleId}`
- **Method**: GET

### PeopleInsert

- **Descripion**: Insere dados do usuario.
- **Handler**: people_insert
- **tables**: User, People, Contract
- **endPoint**: `/v1/{peopleId}`
- **Method**: PATCH

### PeoplerRlationshipInsert

- **Descripion**: Insere dados de pessoas que tem algum relacionamento do usuario.
- **Handler**: people_relationship_insert
- **tables**: User, People, Contract
- **endPoint**: `/v1/{peopleId}/{relationship}`
- **Method**: POST

### PeopleDocumentsGet

- **Descripion**: Retorna os documentos do usuario.
- **Handler**: people_documents_get
- **tables**: User, People, Contract
- **endPoint**: `/v1/{peopleId}/documents`
- **Method**: GET

### PeopleDocumentsInsert

- **Name**: {Projeto}-PeopleDocumentsInsert-{Ambiente}
- **Descripion**: Insere os documentos do usuario.
- **Handler**: people_documents_insert
- **tables**: User, People, Contract
- **endPoint**: `/v1/{peopleId}/documents`
- **Method**: PATCH

### PeopleDocumentsDelete

- **Name**: {Projeto}-PeopleDocumentsDelete-{Ambiente}
- **Descripion**: Deleta os documentos do usuario.
- **Handler**: people_documents_delete
- **tables**: User, People, Contract
- **endPoint**: `/v1/{peopleId}/documents/{documentType}`
- **Method**: DELETE

### PeopleAccountsInsert

- **Descripion**: Insere os dados da conta bancaria do usuario.
- **Handler**: people_accounts_insert
- **tables**: User, People
- **endPoint**: `/v1/{peopleId}/account`
- **Method**: POST

### ContractsGet

- **Descripion**: Retorna os dados do contrato.
- **Handler**: contracts_get
- **tables**: User, People, Contract
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}`
- **Method**: GET

### ContractsPeopleGet

- **Descripion**: Retorna as pessoas do contrato.
- **Handler**: contract_people_get
- **tables**: User, Contract
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/contractpeople`
- **Method**: GET

### ContractsInsert

- **Descripion**: Insere dados no contrato..
- **Handler**: contracts_insert
- **tables**: User, Contract
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}`
- **Method**: PATCH

### ContractsMakeupIncomeInsert

- **Descripion**: Insere dados das pessoas que vao compor renda no contrato.
- **Handler**: contracts_makeup_income_insert
- **tables**: User, Contract, Company, People
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/makeupincome`
- **Method**: POST

### ContractsNotAgreedInsert

- **Descripion**: Insere os motivos do nao aceite do contrato
- **Handler**: contracts_not_agreed_insert
- **tables**: User, Contract,
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/notagreed`
- **Method**: PUT

### PendenciesGet

- **Descripion**: Retorna as pendencias do contrato
- **Handler**: pendencies_get
- **tables**: User, Contract,
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/pendencies`
- **Method**: GET

### PendenciesInsert

- **Descripion**: Insere as respostas para as pendencias do contrato
- **Handler**: pendencies_insert
- **tables**: User, Contract,
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/pendencies/{questionId}`
- **Method**: PUT

### ProposalGet

- **Descripion**: Retorna a ultima proposta feita.
- **Handler**: proposal_get
- **tables**: User, Contract, Proposal
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/proposals/{proposalId}`
- **Method**: GET

### ProposalInsert

- **Descripion**: Insere os dados para criação da proposta.
- **Handler**: proposal_insert
- **tables**: User, Contract, Proposal
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/proposals`
- **Method**: POST

### ProposalNotAgreedInsert

- **Descripion**: Insere os motivos do não aceita da proposta.
- **Handler**: proposal_not_agreed_insert
- **tables**: User, Contract, Proposal
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/proposals/{proposalId}/notagreed`
- **Method**: PUT

### ProposalSimulatorGet

- **Descripion**: Retorna a simulação da proposta.
- **Handler**: proposal_simulator_get
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/proposals/{proposalId}/simulator`
- **Method**: GET

### SchedulesGet

- **Descripion**: Retorna os agendamentos do contrato.
- **Handler**: schedules_get
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/schedules`
- **tables**: User, Contract, User
- **Method**: GET

### SchedulesInsert

- **Descripion**: Insere um novo agendamento no contrato.
- **Handler**: schedules_insert
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/schedules`
- **tables**: User, Contract, User
- **Method**: POST

### ProcessGet

- **Descripion**: Retorna os dados do processo de contratacao.
- **Handler**: process_get
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/process`
- **tables**: User, Contract, User
- **Method**: GET

### ProcessInsert

- **Descripion**: Insere dados no processo.
- **Handler**: process_insert
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/process`
- **tables**: Process, Contract, User
- **Method**: PUT

### PropertiesInsert

- **Descripion**: Insere dados do imovel.
- **Handler**: properties_insert
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/property`
- **tables**: Property, Contract, User
- **Method**: PUT

### PropertiesGet

- **Descripion**: Retorna os dados do imovel.
- **Handler**: properties_get
- **tables**: Property, Contract, User
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/property`
- **Method**: GET

### PropertiesOwnersInsert

- **Descripion**: Insere proprietarios para o imovel.
- **Handler**: properties_owners_insert
- **tables**: Property, Contract, User, People
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/property`
- **Method**: POST

### PropertiesPhotosGet

- **Descripion**: Retorna os ids das fotos do imovel.
- **Handler**: properties_photos_get
- **tables**: Property, Contract, User
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/property/photos`
- **Method**: GET

### PropertiesPhotosInsert

- **Name**: {Projeto}-PropertiesPhotosInsert-{Ambiente}
- **Descripion**: Insere os ids das fotos do imovel.
- **Handler**: properties_photos_insert
- **tables**: Property, Contract, User
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/property/photos`
- **Method**: PATCH

### PropertiesDocumentsGet

- **Descripion**: Retorna os ids dos documentos do imovel.
- **Handler**: properties_documents_get
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/property/documents`
- **tables**: Property, Contract, User
- **Method**: GET

### PropertiesDocumentsInsert

- **Name**: {Projeto}-PropertiesDocumentsInsert-{Ambiente}
- **Descripion**: Insere os ids dos documentos do imovel.
- **Handler**: properties_documents_insert
- **tables**: Property, Contract, User
- **endPoint**: `/v1/{peopleId}/contracts/{contractId}/property/documents`
- **Method**: PATCH

---

## Registry {#registry}

---

### RegistryGet

- **Descripion**: Retorna uma lista com os cartorios do banco de dados.
- **Handler**: properties_documents_insert
- **tables**: Registries
- **endPoint**: `/v1`
- **Method**: GET

---

## Simulator {#simulator}

---

### SimulatorSimulate

- **Descripion**: Realiza simulacao de emprestimo.
- **Handler**: api_simulate
- **tables**: Simulations
- **endPoint**: `/v1`
- **Method**: POST

### SimulationStream

- **Descripion**: Receber os dados salvos na tabela do simulador e enviar por email
- **Handler**: stream
- **tables**: Simulations

### SimulationStreamES

- **Descripion**: Handle data saved in simulations table and send to Elasticsearch
- **Handler**: es_stream
- **tables**: SimulationsReport

### SimulatorGet

- **Descripion**: Retorna uma simulacao.
- **Handler**: api_get
- **tables**: Simulations
- **endPoint**: `/v1/{simulationId}`
- **Method**: GET

### SimulatorPost

- **Descripion**: Realiza simulacao de emprestimo.
- **Handler**: api_insert
- **tables**: SimulationsSelection
- **endPoint**: `/v1/parameters`
- **Method**: POST

---

## Tracking {#tracking}

---

### TrackingGet

- **Descripion**: Funcao para recuperar os dados do tracking do usuario
- **Handler**: api_get
- **tables**: Tracking
- **endPoint**: `/v1`
- **Method**: GET

### TrackingUpdate

- **Descripion**: Funcao para atualizar os dados do tracking do usuario
- **Handler**: api_update
- **tables**: Tracking
- **endPoint**: `/v1`
- **Method**: PUT

---

## Upload {#upload-site}

---

## UploadGet

- **Descripion**: Retorna dados para realizar o upload de arquivos no sistema.
- **Handler**: api_get
- **tables**: Upload
- **endPoint**: `/v1`
- **Method**: GET

---

## Dynamo Tables {#tables-site}

### CepCache {#cep-cachedb}

- **Nome**: CepCache.{Environment}
- **Atributos**

| Name |  Type  |
| :--: | :----: |
| cep  | String |

### PreRegister {#preRegisterdb}

- **Nome**: PreRegister.{Environment}
- **Atributos**

|    Name    |  Type  |
| :--------: | :----: |
|  campaing  |  Null  |
| createdAt  | String |
|     id     | String |
| simulation |  Map   |
|   source   |  Null  |
| trackCode  | String |

### User {#Userdb}

- **Nome**: User.{Environment}
- **Atributos**

|     Name      |  Type  |
| :-----------: | :----: |
|   createdAt   | String |
|      id       | String |
|   peopleId    | String |
| trackingCodes |  List  |

### Company {#companydb}

- **Nome**: Company.{Environment}
- **Atributos**

| Name |  Type  |
| :--: | :----: |
| cnpj | String |

### Process {#processdb}

- **Nome**: Process.{Environment}
- **Atributos**

|     Name      |  Type  |
| :-----------: | :----: |
|  contractId   | String |
|   createdAt   | String |
| historyStates |  List  |
|    screen     |  Map   |
|     state     |  Map   |

### Proposal {#proposaldb}

- **Nome**: Proposal.{Environment}
- **Atributos**

|    Name    |  Type  |
| :--------: | :----: |
| contractId | String |
|     id     | String |

### Schedules {#schedulesdb}

- **Nome**: Schedules.{Environment}
- **Atributos**

|    Name    |  Type  |
| :--------: | :----: |
| contractId | String |
|     id     | String |

### Registries {#registriesdb}

- **Nome**: Registries.{Environment}
- **Atributos**

| Name |  Type  |
| :--: | :----: |
|  id  | String |

### SimulationsSelection {#simulationsSelectiondb}

- **Nome**: Registries.{Environment}
- **Atributos**

|     Name     |  Type  |
| :----------: | :----: |
| simulationId | String |

### Tracking {#trackingdb}

- **Nome**: Registries.{Environment}
- **Atributos**

|   Name    |  Type  |
| :-------: | :----: |
| createdAt | String |
|   date    | String |
|    id     | String |
| trackCode | String |
|   type    | String |
|   value   |  Map   |
