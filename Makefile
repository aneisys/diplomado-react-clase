.PHONY: up down watch build shell install

up:
	docker compose up -d

down:
	docker compose down

watch:
	docker compose logs -f app

build:
	docker compose build --no-cache

shell:
	docker compose exec app sh

install:
	docker compose exec app npm install
