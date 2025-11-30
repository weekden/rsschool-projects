- node v22.11.0
- команда npm install для установки всех зависимостей
- для корректной работы husky рекомендую прописать следующие команды

для файла `commit-msg`

```
#!/bin/sh
. "$(dirname -- "$0")/../_/husky.sh"

cd decision-making-tool && npx --no -- commitlint --edit "$1"

```

для файла `pre-commit`

```
#!/bin/sh
. "$(dirname -- "$0")/../_/husky.sh"

cd decision-making-tool && npx lint-staged

```

(если честно пока не знаю как это победить, так как git инициализирован на уровень выше и скрипт `prepare` просто перетирает все хуки. )
