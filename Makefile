##
# MERN Material Demo
#
# @file
# @version 0.1

# Install everything
install:
	@cd server && yarn install
	@cd client && yarn install
	@docker pull mongo

# Server
server-run:
	@cd server && yarn server
server-clean:
	@rm server/yarn.lock server/node_modules -rf

# Client
client-run:
	@cd client && yarn start
client-clean:
	@rm client/yarn.lock client/node_modules -rf

# Database
db-run:
	@docker run -d --name postgresql -p 27017:27017 postgres
db-clean:
	@docker rm postgresql
db-stop:
	@docker stop postgresql
db-reset: db-stop db-clean

# Prisma
prisma-generate-client:
	npx prisma generate

prisma-mirgate-dev:
	npx prisma migrate dev --name=$(name)

prisma-db-pull:
	npx prisma db pull

prisma-db-push:
	npx prisma db push

prisma-deploy:
	npx prisma migrate deploy

# All
up: db-run server-run client-run
clean: server-clean client-clean db-reset

# end