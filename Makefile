run : 
	npm run dev

docker-up:
	docker compose -f docker-compose.yml up --build

docker-down:
	docker compose -f docker-compose.yml down




