
# Schema

O `schema` pensado para a model Entity tem como objetivo torná-lo agnóstico à pessoas físicas ou jurídicas, atendendo os dois casos com coerência de dados.

```json
{
  "email": "String",
  "type": "String",
  "accounts": [{}],
  "phone": "String",
  "relations": [
      {
        "type": "String",
        "value": "String",
      }
  ],
  "address": {
    "cep": "String",
    "city": "String",
    "complement": "String",
    "neighborhood": "String",
    "number": "String",
    "state": "String",
    "streetAddress": "String",
  },
  "income": [
    {
      "type": "String",
      "source": "String",
      "activity": "String",
      "value": "Number",
    },
  ],
  "files": [
    {
      "category": "String",
      "type": "String",
      "filename": "String",
      "id": "String",
      "size": "Number",
      "date": "String",
    },
  ],
  "name": "String",
  "nickname": "String",
  "idWallCompanies": [
    {
      "cnpj": "String",
      "name": "String",
      "relationship": "String",
    },
  ],
  "documentNumber": "String",
  "registry": [],
  "about": {
    "educationLevel": "String",
    "maritalStatus": "String",
    "birthDate": "String",
    "hasChild": "Boolean",
    "hasSiblings": "Boolean"
  }
};
```

## Detalhes

**entity.type**
O TIPO de entidade, podendo ser `Pessoa física` ou `Pessoa jurídica`.

**entity.name**
O nome da entidade. Para pessoas jurídicas, será a razão social da empresa.

**entity.nickname**
O apelido da entidade. Para pessoas jurídicas, será o nome fantasia da empresa.

**entity.documentNumber**
O número de documento da entidade. Será utilizado o CNPJ para pessoa jurídica, e CPF para pessoa física

**entity.relations**
Os relacionamentos que a entidade possui. O objeto terá o tipo (`relation.type`) de relação (pais, cônjuge, filhos, irmãos, sócios...), e o valor (`relation.value`) contendo a ID da entidade relacionada.

**idWallCompanies**
As empresas que uma pessoa física tem, de acordo com o retorno do IdWall. Não será criado uma nova `entity` para cada uma dessas empresas.

