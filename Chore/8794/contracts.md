|        |                                |        |        |
| ------ | ------------------------------ | ------ | ------ |
| Repo   | Torre-controle_back-end        |        |        |
| Api    | ContractsApi                   |        |        |
| Uri    | contractApi/\${:ID}/azt/create |        |        |
| Method | Post                           |        |        |
| input  | PathParameter                  | {:ID}  | String |
| Output | new aztronicId                 | String |        |
|        |                                |        |        |

- Validations
  - [ ] PathParameter

* Execution
  - [ ] get Contract with ID
  - [ ] Map contract data
  - [ ] invoke `AZT lambda`
  - [ ] Update Contracts Formalization
