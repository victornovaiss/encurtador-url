# Desafio BackEnd BR 

Este repositório foi feito para publicar o desafio 'Encurtador de URL' proposto neste [repositório](https://github.com/backend-br/desafios). 

# Como usar?

Você precisa ter o Node.JS instalado na sua máquina e o MySQL. Além disso você precisa criar uma tabela com as seguintes colunas:

```
+--------------+-------------+------+-----+---------+-------+
| Field        | Type        | Null | Key | Default | Extra |
+--------------+-------------+------+-----+---------+-------+
| url_original | varchar(30) | NO   |     | NULL    |       |
| url_curta    | varchar(10) | NO   |     | NULL    |       |
| validade     | date        | YES  |     | NULL    |       |
+--------------+-------------+------+-----+---------+-------+
```
Também será necessário configurar as variáveis de ambiente em um arquiv `.env`. Após fazer tudo isso rode no seu terminal o comando `npm install` e se divirta. 