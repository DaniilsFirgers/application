FROM node:18

WORKDIR /server

COPY package*.json ./

ENV SERVER_CONFIG_PATH=/etc/server

RUN npm install

COPY . .

EXPOSE 3000
# Install screen and print the version to ensure it's installed correctly
RUN apt-get update && apt-get install -y screen && screen --version && echo "Screen installed successfully"

# Check if screen is in the PATH
RUN which screen

RUN chmod +x /server/start_dev.sh

ENTRYPOINT ["/server/start_dev.sh"]

CMD ["tail", "-f", "/dev/null"]