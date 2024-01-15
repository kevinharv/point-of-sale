# Standard Dockerfile Template
# Built from Debian 12 for performance and stability.

ARG OS_VERSION=latest
ARG VERSION="0.1.0"

FROM --platform=amd64 debian:${OS_VERSION}
LABEL application="Example Application"
LABEL description="Example Dockerfile for template."
LABEL customer="None"
LABEL maintainer="K. Harvey"
LABEL version=${VERSION}

RUN apt-get update && apt-get install wget tar -y

WORKDIR /tmp
RUN wget https://go.dev/dl/go1.21.6.linux-amd64.tar.gz
RUN tar -C /usr/local -xzf /tmp/go1.21.6.linux-amd64.tar.gz

WORKDIR /app
COPY . .

EXPOSE 80/tcp
EXPOSE 80/udp
EXPOSE 443/tcp
EXPOSE 443/udp

CMD ["/usr/local/go/bin/go", "version"]