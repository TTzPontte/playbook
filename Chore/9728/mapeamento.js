var objectMapper = require('object-mapper');

// Payload PipefyApi-GenerateHEContractFileFn-prod
var src = {
  "borrower": {
      "name": "John Doe",
      "email": "johdoe@email.com",
      "birth_date": "11/11/2021",
      "filiation": "",
      "profession": "Motoboy",
      "marriage_status": "Casado(a)",
      "marriage_regime": "Separação de Bens",
      "individual_document_number": "26.419.641-7",
      "issuer_institution": "SSP",
      "document_identification_number": "163.221.720-18",
      "nationality": "Brasileiro",
      "phone_number": "+55 11 99999-9999",
      "address": {
          "street": "Rua Joaquim Thomé",
          "number": "11",
          "complement": "Casa",
          "neighborhood": "Trinta e Um de Março",
          "city": "Boa Vista",
          "state": "",
          "postal_code": "21323122"
      },
      "disbursement_account": {
          "name": "John Doe",
          "document_number": "163.221.720-18",
          "financial_institution": "",
          "number": "",
          "branch": ""
      }
  },
  "related_parties": [],
  "financial": {
      "issue_date": "",
      "amount": "78.150,34",
      "disbursement_date": "08/10/2021",
      "interest_type": "",
      "number_of_installments": "",
      "principal_amortization_month_period": "",
      "contract_number": "",
      "amortization_term": "",
      "end_date_contractual": "03/10/2026",
      "expiration_first_installment": "",
      "expiration_first_installment_full": "",
      "iof": "",
      "monthly_installment_amount": "",
      "permanent_disability": "",
      "damage_property": "",
      "management_rate": "",
      "total_amount_first_charge": "",
      "total_effective_cost": "",
      "registration_opening_rate": "",
      "deadline": "",
      "external_contract_fees": {
          "amount": ""
      },
      "prefixed_interest_rate": {
          "annual_rate": ""
      },
      "effective_prefixed_interest_rate": {
          "annual_rate": ""
      },
      "additional_data": {
          "cci_serial_number": 2021,
          "total_credit_value": {
              "real_estate_analisys_expenses": "",
              "real_estate_registry_expenses": "",
              "net_debt_amount": "",
              "real_estate_due_balance": "",
              "client_available_balance": ""
          },
          "income_composition": []
      }
  },
  "immobile": {
      "registration": "",
      "book_number": "",
      "general_record": "",
      "property_registry": ""
  }
};
    // Mapeamento paylod qitec
  var map = {
    // Array externalContractFees
    "feeType": "externalContractFees[].feeType.", // !! Campo correspodente não encontrado
    "financial.external_contract_fees.amount": "externalContractFees[].amount",
    "absolute": "externalContractFees[].amountType", // !! Campo correspodente não encontrado
    "related_parties": "relatedParties",
    "borrower.name": "borrower.fullName",
    "tradingName": "borrower.tradingName", // !! Campo correspodente não encontrado
    "borrower.email": "borrower.email",
    "roleType": "borrower.roleType", // !! Campo correspodente não encontrado
    "personType": "borrower.personType", // !! Campo correspodente não encontrado
    "borrower.individual_document_number": "borrower.individualDocumentNumber", //Só deveria ter números
    "borrower.issuer_institution": "borrower.issuerInstitution",
    "borrower.document_identification_number": "borrower.documentIdentificationNumber", //Só deveria ter números
    "motherName": "borrower.motherName", // !! Campo correspodente não encontrado
    "borrower.birth_date": "borrower.birthDate", // Formato YYYY-MM-DD
    "borrower.profession": "borrower.profession",
    "propertySystem" : "borrower.propertySystem", // !! Campo correspodente não encontrado
    "spouse": "borrower.spouse", // !! Campo correspodente não encontrado
    "borrower.nationality": "borrower.nationality",
    "borrower.marriage_status": "borrower.maritalStatus",
    "isPep" : "borrower.isPep", // !! Campo correspodente não encontrado
    "borrower.address.street": "borrower.addressStreet",
    "addressCountry" : "borrower.addressCountry", // !! Campo correspodente não encontrado
    "borrower.address.state" : "borrower.addressState", // Espera uma UF
    "borrower.address.city": "borrower.addressCity",
    "borrower.address.neighborhood": "borrower.addressNeighborhood",
    "borrower.address.number": "borrower.addressNumber",
    "borrower.address.postal_code": "borrower.addressPostalCode",
    "borrower.address.complement": "borrower.addressComplement",
    "borrower.phone_number": "borrower.phone", //Só deveria ter números
    "cnaeCode": "borrower.cnaeCode",// !! Campo correspodente não encontrado
    "companyDocumentNumber": "borrower.companyDocumentNumber", // !! Campo correspodente não encontrado
    "companyStatute": "borrower.companyStatute", // !! Campo correspodente não encontrado
    "companyRepresentatives": "borrower.companyRepresentatives", // !! Campo correspodente não encontrado
    "companyType": "borrower.companyType", // !! Campo correspodente não encontrado
    "foundationDate": "borrower.foundationDate", // !! Campo correspodente não encontrado
    "weddingCertificate": "borrower.weddingCertificate", // !! Campo correspodente não encontrado
    "documentIdentification": "borrower.documentIdentification", // !! Campo correspodente não encontrado
    "proofOfResidence":"borrower.proofOfResidence", // !! Campo correspodente não encontrado
    // Array destinationAccounts
    "borrower.disbursement_account.branch" : "destinationAccounts[].accountBranch",
    "accountDigit" : "destinationAccounts[].accountDigit", // !! Campo correspodente não encontrado
    "borrower.disbursement_account.number" : "destinationAccounts[].accountNumber",
    "borrower.disbursement_account.document_number" : "destinationAccounts[].documentNumber",
    "borrower.disbursement_account.financial_institution" : "destinationAccounts[].financialInstitutionsCodeNumber",
    "borrower.disbursement_account.name" : "destinationAccounts[].name", 
    // Array realEstates
    "addressCity" : "realEstates[].addressCity", // !! Campo correspodente não encontrado
    "addressComplement": "realEstates[].addressComplement", // !! Campo correspodente não encontrado
    "addressNeighborhood": "realEstates[].addressNeighborhood", // !! Campo correspodente não encontrado
    "addressNumber": "realEstates[].addressNumber", // !! Campo correspodente não encontrado
    "addressPostalCode": "realEstates[].addressPostalCode", // !! Campo correspodente não encontrado
    "addressState": "realEstates[].addressState", // !! Campo correspodente não encontrado
    "addressStreet": "realEstates[].addressStreet", // !! Campo correspodente não encontrado
    "addressCountry": "realEstates[].addressCountry", // !! Campo correspodente não encontrado
    "enrollmentNumber": "realEstates[].enrollmentNumber", // !! Campo correspodente não encontrado
    "municipalInscription": "realEstates[].municipalInscription", // !! Campo correspodente não encontrado
    "insurancePolicyNumber": "realEstates[].insurancePolicyNumber", // !! Campo correspodente não encontrado
    "warrantyType": "realEstates[].warrantyType", // !! Campo correspodente não encontrado
    "notaryOfficeCode": "realEstates[].notaryOfficeCode", // !! Campo correspodente não encontrado
    "description": "realEstates[].description", // !! Campo correspodente não encontrado
    "incraCode": "realEstates[].incraCode", // !! Campo correspodente não encontrado
    "estimatedValue": "realEstates[].estimatedValue", // !! Campo correspodente não encontrado
    // Array possessionComposition"
    "name": "realEstates[].possessionComposition[].name", // !! Campo correspodente não encontrado
    "percentage": "realEstates[].possessionComposition[].percentage", // !! Campo correspodente não encontrado
    "financial.amount" : "financial.amount", // !! Campo correspodente não encontrado
    "creditOperationType": "financial.creditOperationType", // !! Campo correspodente não encontrado
    "issueDate": "financial.issueDate", // !! Campo correspodente não encontrado
    //
    "financial.disbursement_date": "financial.disbursementDate",
    "fineConfigContractFineRate": "financial.fineConfigContractFineRate", // !! Campo correspodente não encontrado
    "fineConfigInterestBase": "financial.fineConfigInterestBase", // !! Campo correspodente não encontrado
    "fineConfigMonthlyRate": "financial.fineConfigMonthlyRate", // !! Campo correspodente não encontrado
    "earlySettlementConfigurationType": "financial.earlySettlementConfigurationType",
    "earlySettlementConfigurationFixedInterestRate": "financial.earlySettlementConfigurationFixedInterestRate",
    "effectivePrefixedInterestRate": "financial.effectivePrefixedInterestRate", // !! Campo correspodente não encontrado
    "prefixedInterestRateInterestBase": "financial.prefixedInterestRateInterestBase", // !! Campo correspodente não encontrado
    "financial.prefixed_interest_rate.annual_rate": "financial.prefixedInterestRateAnnualRate",
    "financial.principal_amortization_month_period": "financial.principalAmortizationMonthPeriod",
    "interestGracePeriod": "financial.interestGracePeriod", // !! Campo correspodente não encontrado
    "interestType": "financial.interestType", // !! Campo correspodente não encontrado
    "financialIndex": "financial.financialIndex", // !! Campo correspodente não encontrado
    "numberOfInstallments": "financial.numberOfInstallments", // !! Campo correspodente não encontrado
    "financial.total_effective_cost": "financial.totalEffectiveCost", // !! Campo correspodente não encontrado
    "principalGracePeriod": "financial.principalGracePeriod", // !! Campo correspodente não encontrado
    "purchaserDocumentNumber": "purchaserDocumentNumber", // !! Campo correspodente não encontrado
    "custodianDocumentNumber": "custodianDocumentNumber", // !! Campo correspodente não encontrado
    // Array installments
    "principalAmortizationAmount": "installments[].principalAmortizationAmount", // !! Campo correspodente não encontrado
    "dueDate": "installments[].dueDate", // !! Campo correspodente não encontrado
    "prefixedInterestAmount": "installments[].prefixedInterestAmount", // !! Campo correspodente não encontrado
    "costTsa": "installments[].costTsa", // !! Campo correspodente não encontrado
    "costMip": "installments[].costMip", // !! Campo correspodente não encontrado
    "costDfi": "installments[].costDfi", // !! Campo correspodente não encontrado
    //
    "accountBranch": "disbursementAccount.accountBranch", // !! Campo correspodente não encontrado
    "accountDigit": "disbursementAccount.accountDigit", // !! Campo correspodente não encontrado
    "accountNumber": "disbursementAccount.accountNumber", // !! Campo correspodente não encontrado
    "documentNumber": "disbursementAccount.documentNumber", // !! Campo correspodente não encontrado
    "financialInstitutionsCodeNumber": "disbursementAccount.financialInstitutionsCodeNumber", // !! Campo correspodente não encontrado
    "name": "disbursementAccount.name", // !! Campo correspodente não encontrado
    "cciSerialNumber": "cciSerialNumber", // !! Campo correspodente não encontrado
    "realEstateAnalisysExpenses": "realEstateAnalisysExpenses", // !! Campo correspodente não encontrado
    "realEstateRegistryExpenses": "realEstateRegistryExpenses", // !! Campo correspodente não encontrado
    "realEstateDueBalance": "realEstateDueBalance", // !! Campo correspodente não encontrado
    "netDebtAmount": "netDebtAmount", // !! Campo correspodente não encontrado
    "clientAvailableBalance": "clientAvailableBalance", // !! Campo correspodente não encontrado
    "debts": "debts", // !! Campo correspodente não encontrado
    "incomeComposition": "incomeComposition", // !! Campo correspodente não encontrado
    //Array attachments
    "img": "attachments[].img" // !! Campo correspodente não encontrado
  };
   
  var dest = objectMapper(src, map);

  console.log(dest)

