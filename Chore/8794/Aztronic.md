### event

|        |                        |        |
| ------ | ---------------------- | ------ |
| Repo   | Portal_backend         |        |
| Api    | Aztronic               |        |
| Uri    | AztApi/contract/create |        |
| Method | Post                   |        |
| input  | Event                  | String |
| Output | aztronicId             | String |
|        |                        |        |

> Input Event
>
> |                    |          |
> | ------------------ | -------- |
> | codigo_integracao  | "String" |
> | pep                | "String" |
> | id_projeto         | "String" |
> | id_tipocontrato    | "String" |
> | id_tipovenda       | "String" |
> | valor_contrato     | "String" |
> | data_contrato      | "String" |
> | valor_venda        | "String" |
> | taxa_multa         | "String" |
> | taxa_mora          | "String" |
> | venda_no_estado    | "String" |
> | score_automatico   | "String" |
> | score_manual       | "String" |
> | seguro_mip         | "Float"  |
> | seguro_dfi         | "Float"  |
> | taxa_administracao | Float    |
> | unidade            | Object   |
> | participante       | [{}]     |
> | tabelavenda        | {}       |
> | fluxo              | []       |

- Validations
  - iniput Event fields
  - Aztronic Api Key
