FROM nikolaik/python-nodejs:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN echo "Installing node dependencies"
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

RUN echo "Building UI"
RUN yarn build

RUN echo "Installing server dependencies"
RUN pip install -r requirements.txt


EXPOSE 8080
CMD ["python", "./src/server/app.py"]