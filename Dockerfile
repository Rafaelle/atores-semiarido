FROM node:12-alpine
LABEL maintainer="Samir Silva de Medeiros <samir.silva@insa.gov.br>"
RUN apk add git \
    && git clone http://gitlab+deploy-token-19:m8zwZcM1GN6qBs7Eraxs@gitlab.insa.gov.br/samir.silva/atores-do-semiarido.git 
WORKDIR /atores-do-semiarido
RUN npm i  
ENTRYPOINT ["npm"]
CMD ["start"]
EXPOSE 3000
