# Flask Docker Demo

Flask-бэкенд и веб-фронтенд в одном Docker Compose. Запросы из UI идут на nginx (`/api/...`), а nginx проксирует их к сервису `backend:5000` внутри сети Compose.

## Сервисы

| Сервис | Образ | Порт снаружи | Роль |
|--------|-------|--------------|------|
| `backend` | Flask (`Dockerfile` в корне) | `5000` | API: `/`, `/info`, `/calc/<a>/<b>` |
| `frontend` | nginx + статика (`frontend/`) | `8080` | UI и reverse-proxy `/api` → `backend` |

Схема запросов:

```text
Браузер  →  http://localhost:8080/           (статика)
Браузер  →  http://localhost:8080/api/...    (nginx)
nginx    →  http://backend:5000/...          (сеть Compose)
```

## Запуск через Compose

```bash
docker compose up --build
```

- UI: http://localhost:8080  
- API напрямую: http://localhost:5000  

Остановка:

```bash
docker compose down
```

## Эндпоинты бэкенда

| Метод | Путь | Описание |
|-------|------|----------|
| GET | `/` | Главная, список эндпоинтов |
| GET | `/info` | Информация о приложении |
| GET | `/calc/<a>/<b>` | Сумма, разность, произведение |

Через фронтенд те же пути доступны как `/api/`, `/api/info`, `/api/calc/10/3`.

## Только бэкенд (без Compose)

```bash
docker build -t flask-docker-demo .
docker run --rm -p 5000:5000 flask-docker-demo
```

## Локально без Docker

```bash
pip install -r requirements.txt
python app.py
```
