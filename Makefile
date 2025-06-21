setup:
	@echo "=========== Starting installing dependencies ==========="
	yarn intall
	yarn install-all

	@echo "=========== Start creating DB ==============="
	docker-compose down
	docker-compose up -d
	@echo "=========== Wait for DB Connection Ready ==============="
	sleep 30s

	@echo "=========== Staring migrating DB and seed data ==============="
	yarn db:migrate

	@echo "Environment Ready. Run yarn dev to start local development"

cleanup:
	docker-compose down
	rm -rf .pgdata
