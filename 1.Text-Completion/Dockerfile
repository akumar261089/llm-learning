FROM python:3.10

WORKDIR /code
COPY api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./api ./api
