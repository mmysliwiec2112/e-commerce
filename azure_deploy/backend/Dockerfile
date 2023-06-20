FROM ubuntu:latest

ENV TZ = "Europe/Warsaw"

RUN apt-get update && \
    apt-get -y install software-properties-common curl unzip zip openjdk-8-jdk build-essential git

RUN curl -s "https://get.sdkman.io" | bash && /bin/bash -c \
    "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install sbt 1.8.2; source $HOME/.sdkman/bin/sdkman-init.sh && sdk install scala 2.13.10"

ENV PATH=$PATH:/root/.sdkman/candidates/sbt/1.8.2/bin
ENV PATH=$PATH:/root/.sdkman/candidates/scala/2.13.10/bin

RUN mkdir backend
WORKDIR backend

COPY . .

EXPOSE 9000

CMD ["sbt", "run"]