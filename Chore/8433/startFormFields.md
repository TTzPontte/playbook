The start Form is Pipefy's only method of creating cards within a pipe.

Every pipe must have a StartForm
and every `phase`  within a pipe `may` have its own form with addicional fields
so a Finalized carda fields is equal to

Pipe_Form + phases * (Pahse_Form)



| label                                          | Table           | Filed                | nested               | Tpe     |
| ---------------------------------------------- | --------------- | -------------------- | -------------------- | ------- |
| ID Card                                        | none            | none                 |                      |         |
| Origem                                         | ContractsReport | source               |                      | string  |
| ID Torre                                       | ContractsReport | id                   |                      | string  |
| Responsável CX                                 | ContractsReport | attendentId          |                      | string  |
| Nome da empresa parceira                       |                 |                      |                      |         |
| E-mail do parceiro                             |                 |                      |                      |         |
| Nome do parceiro                               |                 |                      |                      |         |
| Operação                                       |                 |                      |                      |         |
| Valor da Operação                              | ContractsReport | Simulation           | parameters.loanValue |         |
| Cliente                                        |                 |                      |                      |         |
| O empréstimo será em nome de:                  | entity          | type                 |                      |         |
| Nome do cliente                                | entity          | name                 |                      | string  |
| É sócio de empresa?                            | entity          |                      |                      |         |
| Qual o CNPJ da empresa (cliente)?              | entity          | documentNumber       |                      | string  |
| CPF do cliente                                 | entity          | documentNumber       |                      | string  |
| E-mail do cliente                              | entity          | email                |                      | string  |
| Renda Cliente                                  | entity          | income               | value                | int     |
| Telefone Cliente                               | entity          | phone                |                      |         |
| Nome Pessoa #2 da Operação                     | contractsReport | secondPayer          |                      |         |
| CPF Pessoa #2                                  | entity          | documentNumber       |                      |         |
| E-mail Pessoa#2                                | entity          | email                |                      |         |
| Grau de Parentesco Pessoa#2                    |                 |                      |                      |         |
| Renda Pessoa#2                                 | entity          | income               | value                | int     |
| Imóvel                                         |                 |                      |                      |         |
| Valor do Imóvel                                | Property        | financedMoney        |                      |         |
| CEP do Imóvel                                  | Property        | address              | cep                  | String, |
| Cidade do Imóvel                               | Property        | address              | city:                | String, |
| Endereço do Imóvel                             | Property        | address              | streetAddress:       | String, |
| Número do Imóvel                               | Property        | address              | number:              | String, |
| Mês sem Pagar                                  | contractsReport | Simulation           | skipMonth            | Number  |
| Contrato                                       |                 |                      |                      |         |
| Tabela Amortização                             | contractsReport | amortizationSchedule |                      |         |
| Número de Parcelas                             | contractsReport | term                 |                      |         |
| Carência                                       | contractsReport | grace period         |                      |         |
| Documentos Pessoais                            |                 |                      |                      |         |
| Documentos Imóvel                              |                 |                      |                      |         |
| Documentos Financeiros                         |                 |                      |                      |         |
| Informações importantes e detalhes da operação | none            | none                 | none                 |