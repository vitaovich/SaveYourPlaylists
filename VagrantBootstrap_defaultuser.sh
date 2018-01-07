#!/usr/bin/env bash
# Used by Vagrant
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
~/.nvm/install.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
nvm install node
cd /vagrant
npm install
