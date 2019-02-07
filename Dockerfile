FROM node:8.10.0

RUN mkdir -p /usr/src/garie_plugin
RUN mkdir -p /usr/src/garie_plugin/reports

WORKDIR /usr/src/garie_plugin

COPY package.json .

RUN cd /usr/src/garie_plugin && npm install

COPY . .

EXPOSE 3000

VOLUME ["/usr/src/garie_plugin/reports"]

ENTRYPOINT ["/usr/src/garie_plugin/docker-entrypoint.sh"]

CMD ["npm", "start"]