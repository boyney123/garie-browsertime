FROM node:8.10.0

RUN mkdir -p /usr/src/garie-plugin
RUN mkdir -p /usr/src/garie-plugin/reports

WORKDIR /usr/src/garie-plugin

COPY package.json .

RUN cd /usr/src/garie-plugin && npm install

RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64.deb && \
    dpkg -i dumb-init_*.deb

COPY . .

EXPOSE 3000

VOLUME ["/usr/src/garie-plugin/reports"]

ENTRYPOINT ["/usr/src/garie-plugin/docker-entrypoint.sh"]

CMD ["/usr/bin/dumb-init", "npm", "start"]
