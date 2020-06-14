.DEFAULT_GOAL := help

## Starts the backend and frontend server
.PHONY: dev
dev: 
	@concurrently "nodemon server/server.js" "npm start --prefix frontend"

.PHONY: frontend
frontend: 
	@npm start --prefix frontend

.PHONY: server
server: 
	@nodemon server/server.js