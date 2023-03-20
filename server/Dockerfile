FROM python

WORKDIR /app
COPY . .

RUN pip install -r requirements.txt

CMD ["uvicorn", "server:app"]