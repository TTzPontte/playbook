# REPO Naming Conventions:

Folowing **PEP 8**

## Packages _(directories)_

  lowercase

> Python packages should also have short, all-lowercase names,although the use of underscores is discouraged.

## Modules _(filenames)_

lower_case_with_underscores

> Modules should have short, all-lowercase names. Underscores can be used in the module name if it improves readability.

## Classes

CapWords

> Class names should normally use the CapWords convention.

## Function and Variable Names

lower_with_under()
> Function names should be lowercase, with words separated by underscores as necessary to improve readability.

## Convention Naming Reference table

| Type                   | Public                      | Internal                      |
| :--------------------- | :-------------------------- | :---------------------------- |
| Packages               | lowercase                   | --                            |
| Modules                | lower_case_with_underscores | \_lower_with_under            |
| Classes                | CapWords                    | \_CapWords                    |
| Exceptions             | CapWords                    |                               |
| Functions              | lower_with_under()          | \_lower_with_under()          |
| Global/Class Constants | UPPER_CASE_WITH_UNDERSCORES | \_UPPER_CASE_WITH_UNDERSCORES |
| Global/Class Variables | lower_with_under            | \_lower_with_under            |
| Instance Variables     | lower_with_under            | \_lower_with_under            |
| Method Names           | lower_with_under()          | \_lower_with_under()          |
| Function/Method        | Parameters                  | lower_with_under              |
| Local Variables        | lower_with_under            |                               |
