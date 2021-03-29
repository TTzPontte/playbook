# Isolate user base from orchestration

## The problem

Our deployment system runs automatically by AWS Code Pipeline (CI) and all our system are orchestrated by AWS CloudFormation.

The main problem are that when CloudFormation deployment process freezes for any reason the only solution would be remove stack and all our resources should be removed too, including Databases and Cognito (user auth service). This means we should loose any data that has no backup as cognito.

## Solutions


### 1. Backup

We have backup for almost anything except cognito.

Cognito has options where we could backup data but not passwords, leading to an unwanted mass password reset for ours clients.

Source: https://forums.aws.amazon.com/thread.jspa?messageID=947637

### 2. Create another stack

We already has this implemented, our cognito pool is in `portal-infra` stack while our application stack is `portal-backend`.

Source: https://github.com/pontte/portal-infra/blob/staging/portal/cfn-cognito.yaml

### 3. Deletion Policy

Any CloudFormation resource could be marked with `DeletionPolicy: Retain` attribute, this would keep a resource when they are removed from stack or stack is removed.

We should mark any important resource like cognito, s3, dynamodb tables with `DeletionPolicy: Retain`.

Source: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html

#### Testing DeletionPolicy

Here are two CloudFormation templates to test DeletionPolicy:
* `cfn-deletion-policy-default.yml`: to check what happens without DeletionPolicy
* `cfn-deletion-policy-retain.yml`: to check what happens with DeletionPolicy

[Back to the index](..)
