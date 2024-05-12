## Git Commit Message Convention

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) to use Emoji for type.

#### TL;DR:

Messages must be matched by the following regex:

<!-- prettier-ignore -->
```js
/^(🐛|🆕|📝|♻️|💎|🐎|📌){1}(\((site|cms|repo|ci|tests|config|lib|types|components|layouts|pages|js|desk|schema|scripts)\))? {1}([A-Z]\w(\w|\s|\d|.|,|\-)*[^(\.|\s)])$/
```

#### Examples

```
🐛(component) Fix menu rendering if style queries not available
🐎(ci) Cache build output
📌(site) Update to latest minor versions
♻️(test) Update to new major lint version
```

### Emoji

| Emoji | Use                      |
| :---: | :----------------------- |
|  🐛   | Bug fix                  |
|  🆕   | New feature              |
|  📝   | Documentation update     |
|  ♻️   | Pure refactor            |
|  💎   | Styling update           |
|  🐎   | Performance improvements |
|  📌   | Dependency update        |

### Scope

The scope that updates are being made to. General scopes should be used only if there isn't a more specific scope, or if multiple scopes are included in one PR. Our recgonized scopes are:

|    Scope     | Usage                               |
| :----------: | :---------------------------------- |
|    `site`    | General updates to the site         |
|    `cms`     | General updates to the CMS          |
|    `repo`    | General updates to the repo         |
|     `ci`     | Continuous integration system       |
|   `tests`    | Code test or linting updates        |
|   `config`   | Meta config updates                 |
|    `lib`     | Site or CMS library (`lib`) updates |
|   `types`    | TypeScript types                    |
| `components` | Site or CMS components              |
|  `layouts`   | Site layouts                        |
|   `pages`    | Site page templates                 |
|     `js`     | Site browser JS                     |
|    `desk`    | CMS desk updates                    |
|   `schema`   | CMS schemas                         |
|  `scripts`   | CMS automation scripts              |

### Subject

The subject contains a succinct description of the change, written in English, that:

- starts with a capital letter
- uses the imperative, present tense: "change" not "changed" nor "changes"
- does not end with a period (.) or extra whitespace at the end
