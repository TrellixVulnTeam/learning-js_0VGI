FROM python:3

WORKDIR /app

COPY . /app

RUN set -ex \
    && pip install --upgrade pip \
    && pip install -r requirements.txt --no-cache-dir

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "3", "wsgi:app"]