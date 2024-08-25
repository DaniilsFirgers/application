FROM postgres:13

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=supersecret
ENV POSTGRES_DB=main

# maybe add conf file later

EXPOSE 5432