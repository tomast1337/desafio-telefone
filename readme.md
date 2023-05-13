1. Execute o comando a seguir para iniciar os contêineres definidos no arquivo docker-compose.yml:

```sh
docker-compose up
```

2. Esse comando irá construir e iniciar os contêineres especificados no arquivo docker-compose.yml.

3. Aguarde até que os contêineres sejam construídos e iniciados. Você verá as mensagens de log sendo exibidas no terminal.

4. Uma vez que os contêineres estejam em execução, o servidor backend estará disponível em `http://localhost:3000`, e o servidor MongoDB estará acessível em `mongodb://localhost:27017`.

5. Você pode acessar o servidor backend através de um navegador ou qualquer ferramenta de requisições HTTP, como o Postman.

6. Certifique-se de que as portas especificadas no arquivo docker-compose.yml (no exemplo acima, as portas 3000 e 27017) estejam disponíveis em sua máquina e não estejam sendo usadas por outros processos.

Observação: Caso você já tenha executado o comando docker-compose up anteriormente e deseje recriar todos os contêineres, você pode adicionar a flag `--force-recreate` ao comando `docker-compose up`, desta forma: `docker-compose up --force-recreate`. Isso garantirá que os contêineres sejam recriados a partir do zero.
