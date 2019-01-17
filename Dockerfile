FROM node:8.10.0

RUN mkdir -p /usr/src/garie-browsertime
RUN mkdir -p /usr/src/garie-browsertime/reports

WORKDIR /usr/src/garie-browsertime

COPY package.json config.json /usr/src/garie-browsertime/

COPY src/ /usr/src/garie-browsertime/src/

RUN ls -ltr /usr/src/garie-browsertime/

RUN npm install --only=production

COPY docker-entrypoint.sh /docker-entrypoint.sh

EXPOSE 3000

VOLUME ["/usr/src/garie-browsertime/reports", "/usr/src/garie-lighthouse/logs"]

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["npm", "start"]
