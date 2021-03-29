# ElasticSearch auth

## The Problem

1. Our ElasticSearch endpoint is open to anyone without any [authentication](https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html#authentication), this means that our users data are exposed.

2. Our Kibana instances are open to anyone.


## Solutions

Configure [AccessPolicies](https://docs.aws.amazon.com/pt_br/AWSCloudFormation/latest/UserGuide/aws-resource-elasticsearch-domain.html#cfn-elasticsearch-domain-accesspolicies) of ElasticSearch setting up a condition with [PrincipalOrgID](./simulator_template.yaml).

*Expected Impact*:
  * Kibana will stop work;
  * All lambda will work as they are part of our org;

Configure [CognitoOptions](https://docs.aws.amazon.com/pt_br/AWSCloudFormation/latest/UserGuide/aws-resource-elasticsearch-domain.html#cfn-elasticsearch-domain-cognitooptions) of Kibnan (at ElasticSearch SAM definition) to our Torre Cognito Users.

[Back to the index](..)
