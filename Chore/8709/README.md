# Receiv Customer Update

## Current Architecture

![Image](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuGfAJKxDB5EmqRLJ2CZFAob9jGBIHIKbYJaAZW6UoDAEKIL5-NcPoLOAplu-FgxE8M053gbvAK1p0000)

We will keep this achitecture for a while, probably four or five iterations until integration matures.

In current state, Receiv feeds its own data pooling from Porttal and AZtronic [Collect API](https://dev.aztronic.com.br/AZ/APICollect/Help/Api/).


## Integration V1 (DONE)

Receiv, pulls JSON like `[{ entity, contracts }]` from Portal.

### Level 1: System Context

![Image](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuGfAJKxDB5FGjLC8oCyhAKcrKd1t3Od9qoy2Y-kN6Ued0yMB4fDBYf7KEaQL5ENdPIP3LISMPEedvsIcvfMawhkdbZY3TPJa5-jNE_i5UCKx1xZLSZcavgK0BGG0)

### Level 2: Container

![Image](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuKhEoIzDKN0CyEHAIIn9J4eiJbLmpiyhAKfCBYb62BdcbMIML7BbvQUaAWIb9gTcbhcdbhZbSN5n0NKgwEhQeOWYiK5o20FHPM3cSZcavgK0NGC0)



## Integration V2

We will add another end point to our API that makes update of entity data.

### Level 1: System Context

![Image](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuGfAJKxDB5EmqRLJ2CZFAob9jL9mTmrHYCdJBmBBw9SPwYS39OeIaqkAOQgH50SuXZXxe2fFpIl9BAdKhqx9JoxD1NByIdEJKejgkHnIyrA0LW80)


### Level 2: Container

![Image](http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuKhEoIzDKN0CyEHAIIn9J4eiJbLmpiyhAKfCBYb62BdcbMIML7BbvQUaAWIb9gTcbhcdbhZb8Gj0b0GabYHd02MuW2OgwEhQOPN48WPM2n61wqMn2Sw6g4Ku4Y63Pef3QbuAq8S0)


Expected data to update entity:

```json
{
    "entity_type": "PF",
    "email": "email@teste.com",
    "documentNumber": "11111111111",
    "telefone": "(11) 91111-1111",
    "endereço": {
        "cep": "05642011",
        "city": "São Paulo",
        "neighborhood": "Vila Andrade",
        "number": "444",
        "state": "SP",
        "streetAddress": "Rua Charles Spencer Chaplin"
    }
}
```

## Integration V3

Add event stream listener to update user at AZtronic using [Collect API](https://dev.aztronic.com.br/AZ/APICollect/Help/Api/POST-api-cliente-SetCliente) every time Entity.{env} changes.

### Level 1: System Context

![Image](http://www.plantuml.com/plantuml/svg/LO_12e90443lViNyG0rT8q8HgKibkgVeOkCS5dICTLm8wTzRb62xpV3UOvXqrCRfr7T9nSJMms5pX78GLTx3gJ3m47GBGRz32i0rfEFFZkGoC_dvNsTHgs-Ssu6cFYpNgN-o-oHh4iUrgOhi0iKIR6SM7rlPtRX1B8KZjzf0yx98dMLHnferNySaPMd38ry0)

### Level 2: Container

![Image](http://www.plantuml.com/plantuml/svg/RP512i8m44NtESLSe5UG5gdYGYZgghkO31Xe9wMT2bMykp5JQ8IiEhpV_sS-AIVM8yzzfupl1qz831Sqw9xLCC1R0PZEpnQgvXHcyXPN-OXye7zK4pjU6itc4QIFIYBFpbOl7Zqv8xbYZBmL_dClzNLrojBsjbgSKbQplki9OU-9Hsrusf1iLYfS2KMnozwJOV7Vl5Vg9NFKjjMfagR8Dw9ijmoKWBHhYMJ3atm1)

## Integration Vx

Rewriting anything to conform with OpenBanking