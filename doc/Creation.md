# Creation of the Repo

## Strategy

The project template code in this repo is intended to be downloaded/cloned to a
host system but will run from within a container system via Docker in order to
keep the app environment and dependencies isolated and independent of the host
system.  Ideally, this keeps the host system clean and the container system
reproducible and consistent, especially in development.  The code will be
mounted into the container from the host system, so live edits can be made from
within the host system while developing in a live-edit mode, and those edits
will be seen to immediately affect the running container processes in that
case.  Processes within the container may also modify the code, and those
changes will be likewise immediately available in the host code.  So, for
instance, during the process of creating this project, after installing
node/npm/npx in the container, `npx create-react-app` can be executed in the
container to create a React project template that is available in the host
system for further development.

## Prerequisites

This project template has prerequisites or co-requisites, such as:

* Development
  * editors and extensions (especially Visual Studio Code)
* Web-Development
  * shell (bash or zsh, etc)
  * version control (git)
  * secure connections (ssh)
  * browser (for example: Chrome, DevTools, Redux DevTools)
  * containerization (Docker: Docker Desktop, Docker Engine)

## Initialize Git, Docker, React

The following shell (bash/zsh) commands were used to initialize the repository
in a host system.

* Create and enter the project folder/directory.  
  `> mkdir react-ts-dock`  
  `> cd react-ts-dock`
* Create initial project documentation.  
  Create top-level `README.md` file and begin adding content.  
  Create documentation folder: `> mkdir doc`  
  Create `/doc/Creation.md` document and begin adding content.
* Git: initialize and add config files and remote.
  * Initialize the project as a git repository.  
    `> git init`
  * Create a `.config` folder to hold config files, samples, and templates.  
    `> mkdir .config`
  * Create a `user.gitconfig_template` file in that `.config` folder.
  * Create a `user.gitconfig` file in that `.config` folder, based on the
    template, specifying a developer (in my case, me, the repo author) to
    contribute to the repo.  This file is optional, depending on the method of
    connecting to the remote source of the repo.
  * Create a `.gitignore` file, in particular ignoring the optional file
    `> .config/user.gitconfig`.
  * Create a `.gitconfig` file at the project root, referring to that
    `.gitignore` file and the optional `user.gitconfig` file.  (If no
    `user.gitconfig` file exists in the `.config` folder, git should silently
    ignore the error.)
  * Apply the `.gitconfig` file to the repo.  
    `> git config --local include.path ../.gitconfig`
  * Set up git remote (optionally using ssh, where ssh config has already been
    set up with alias and key for github).  
    `> git remote add origin git@github:oneforawe/react-ts-dock.git`  
    `> git push --set-upstream origin main`
* Docker: initialize and enter container.
  * Create the initial Docker infrastructure that will create a container for
    the React app.  
    Create `Dockerfile`, `docker-compose.yml`, and `.dockerignore`.  
    (Discovered that Alpine may not be the best image to use with Node; instead
    use Bitnami/Minideb, a minimal Debian image.)  
    Arrange to use a node manager (nvm) to install node, preparing to use node
    to create the React project.
  * Create the Docker image and build and run the container.  
    `> docker compose build && docker compose up -d`
  * Enter the container.  
    `> docker compose exec node-dev-for-app bash --login`
