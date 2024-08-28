
while ! nc -z pgsql 5432; do
  echo "Aguardando o PostgreSQL iniciar..."
  sleep 1
done

echo "PostgreSQL iniciado, iniciando aplicação..."

exec "$@"
