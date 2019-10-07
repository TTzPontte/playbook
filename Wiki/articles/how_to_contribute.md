# How to contribute to this Wiki?

Clone this repo and create a new branch named with the article you want to add:

```
git clone git@github.com:pontte/playbook.git
git co -b wiki-topic
touch wiki/articles/how_to_xxx.md
```

Use **markdown** and don't forget to add a back link to the wiki's index:

```markdown
<!-- wiki/articles/how_to_xxx.md -->

# How to ...?
<!-- [...] -->
[Back to the index](..)
```

Remain **simple**, **concise**, providing **answers** on how to become a better Pontte developer :) .

Add the article to the wiki's index:

```markdown
<!-- wiki/articles/README.md -->

# Wiki
<!-- [...] -->

[How to ...?](https://github.com/pontte/playbook/tree/master/wiki/articles/how_to_xxx.md)
```

Then go on and create a Pull Request, someone from Pontte's engineering team will review it :ok_hand: :pray:

[Back to the index](..)
