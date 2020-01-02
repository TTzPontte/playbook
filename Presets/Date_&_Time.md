## Representation of date- and time-related data

* * *

>**Date** **Format** should follow `ISO8601 : 1998 (E)` \ learn more at
[iso.org](https://www.iso.org/iso-8601-date-and-time-format.html)

## How Its Done
 Use `datetime` Lybrary to instantiate a new date Obj
```python
# New Date

from datetime import datetime
date = datetime.utcnow() # new datetime in UTC
```

Use strftime() to Correctly parse datetime to string

```python
# Sample Date Format

output = date.strftime('%Y-%m-%dT%H:%M:%SZ') # Parse UTC datetime

# '2019-12-31T18: 30: 201Z'

```

-   parsing with  `strftime`( %Y-%m-%d`T`%H:%M:%S`Z`')
    -   `T` :  literal to separate the date from the time
    -   `Z` : zero hour offset ( `Zulu time` `(UTC)`)
    -   `caution` lowercase `z` : is deprecated
---
## How We Do It
snippet

```python

from datetime import datetime

def db_now() -> str:
    return datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

```
---
