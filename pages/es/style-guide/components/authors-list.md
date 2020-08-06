---
title: Fecha e información del autor
examples:
  - title: Ejemplo simple
    arguments:
      authors:
        - samrichard
      contributors:
        samrichard:
          name:
            given: Sam
            family: Ricardo
          work:
            company: Google
            org: Chrome OS
            title: Defensor del desarrollador
      microcopy:
        author:
          alt: Foto de perfil de ((t))
  - title: Ejemplo con múltiples autores
    arguments:
      authors:
        - samrichard
        - johndoe
      contributors:
        samrichard:
          name:
            given: Sam
            family: Ricardo
          work:
            company: Google
            org: Chrome OS
            title: Defensor del desarrollador
        johndoe:
          name:
            given: Juan
            family: Gama
          work:
            company: Google
            org: Chrome OS
            title: Desarrollador web
      microcopy:
        author:
          alt: Foto de perfil de ((t))
---

Información relacionada con la fecha y la información de los autores del estudio de caso, especialmente utilizado en News and Stories.

Recomendaciones para argumentos: el parámetro de contribuyentes es necesario para extraer la información del autor; debería usar datos de `contributors` globales
