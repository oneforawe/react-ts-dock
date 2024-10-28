# Reference:
# https://docs.docker.com/reference/dockerfile/

# BUILD/IMAGE COMMANDS:

# Use a Debian base image and install some utilities.
FROM bitnami/minideb:bullseye
RUN install_packages bash curl ca-certificates vim

# Create a non-root user; Switch to the non-root user and set working directory.
RUN addgroup --system devgroup && adduser --system devuser --ingroup devgroup
USER devuser
ENV HOME="/home/devuser"
WORKDIR /home/devuser/react-ts

# Install nvm and node/npm/npx for the non-root user.
# Create shell profile to allow nvm installation to make `nvm` command available.
# Modify the prompt.
# (See https://www.gnu.org/software/bash/manual/html_node/Controlling-the-Prompt.html)
RUN touch $HOME/.profile
RUN echo "export PS0='\n'" >> $HOME/.profile
RUN echo "export PS1='\n[\u @ \H : \w]\n\$ '" >> $HOME/.profile
ENV NVM_DIR="$HOME/.nvm"
ENV DEFAULT_NODE_VERSION="20.17.0"
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash \
  && . $NVM_DIR/nvm.sh \
  && nvm install $DEFAULT_NODE_VERSION \
  && nvm alias default $DEFAULT_NODE_VERSION \
  && nvm use default;

# Copy the rest of the application.
COPY . .

# CONTAINER-START COMMANDS:

# Expose port 3000 and start the application.
EXPOSE 3000

# Ensure bash starts as a login shell when the container starts.
CMD ["bash", "--login"]

# SETTING UP:
# Executed from within the project folder:
# 1. Build
#    $ docker compose build
# 2. Up/Run
#    A. Using docker-compose.yml and service name 'node-dev-for-app'
#       $ docker compose up -d
#       $ docker compose exec node-dev-for-app bash --login
#    B. Alternative
#       $ docker run --name react-ts --user 100:101 -it react-ts-dock  (Alpine)
#       $ docker run --name react-ts --user 101:101 -it react-ts-dock  (Bitnami/Minideb Debian)

# TEARING DOWN:
# docker container rm --force react-ts && docker image rm react-ts-dock
