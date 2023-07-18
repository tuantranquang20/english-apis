<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive Node.js framework for building efficient and scalable server-side applications.</p>


## Run
### Setup environment
1. `cp .env.example .env`
2. `cp .mongo.env.example .mongo.env`
3. `cp mongo-init.js.example mongo-init.js`

### Run dev
1. `docker-compose up -d` ( run container mongodb )
2. `yarn`
3. `yarn start:dev`