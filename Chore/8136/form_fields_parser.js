const obj = {
    "data": {
        "pipes": [
            {
                "id": "301582385",
                "name": "Esteira HE  (TESTE DEV)",
                "start_form_fields": [
                    {
                        "id": "id_card",
                        "internal_id": "324006363",
                        "type": "id",
                        "required": false,
                        "editable": false,
                        "description": ""
                    }
            }
        ]
    }
}

const parse = (data) => {
    const start_form_fields = data.pipes[0].start_form_fields //[0]
    for (let field in start_form_fields) {
        const {id, internal_id, type, required, editable, description} = field

    }
    default values
}

