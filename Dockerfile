FROM node:8.10.0

RUN mkdir -p /usr/src/garie-browsertime
RUN mkdir -p /usr/src/garie-browsertime/reports

WORKDIR /usr/src/garie-browsertime

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

VOLUME ["/usr/src/garie-browsertime/reports", "/usr/src/garie-lighthouse/logs"]

ENTRYPOINT ["/usr/src/garie-browsertime/docker-entrypoint.sh"]

CMD ["npm", "start"]
