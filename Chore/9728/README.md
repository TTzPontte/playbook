# Integração entre Pipefy e MidQiTec

Enquanto utilizando o Pipefy como ferramenta para geração de contratos é necessario existir uma integração com o MidQiTec com o objetivo
de criar um contato automaticamente na Quitec a partir do card no pipefy

## Artefatos

- success_test_payload.json é um payload valido esperado pelo endpoint MidQiTec POST /debt
- pipefy_payload_transformed.json é um payload criado com os dados do cartão no Pipefy e processado por uma função mapper
- campos_faltantes.json é um json com o resultado da comparação entre os dados que existem no pipefy_payload_transformed.json e o success_test_payload.json 


## Anotações

- É necessario atualizar o formulario utilizado no card do pipefy para adicionar uma a entrada para os campos faltantes
- É necessario atualizar o mapper para transformar os novos dados inseridos no card do pipefy
- É necessario adicionar uma chamada a API do MidQiTec (Na Lambda PipefyApi-GenerateHEContractFileFn ou um botão no card no Pipefy ?)
- É necessario atualizar o MidQiTec para enviar os dados do contrato para o QiTec (payload direto no codigo)