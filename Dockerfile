FROM ubuntu:16.04
WORKDIR /clips
COPY . .
RUN bash setup.sh
CMD "bash"
