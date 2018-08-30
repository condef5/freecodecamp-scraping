FROM cheeaun/puppeteer:1.1.1
COPY . /app
RUN npm install pm2 -g
RUN cd /app && yarn --production --pure-lockfile
EXPOSE 3000
WORKDIR /app
CMD [ "pm2-runtime", "npm", "--", "start" ]
