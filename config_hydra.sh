#!/bin/bash
# GNU bash, version 4.4.20
echo "Removing existing NodeJS..."
sudo apt purge nodejs
sudo apt purge npm
sudo apt autoremove
sudo apt autoclean
echo "Installing NVM..."
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh
chmod +x install_nvm.sh
bash install_nvm.sh
source ~/.profile
echo "Installing Node v10.16.0..."
nvm install 10.16.0
nvm use 10.16.0
npm i -g @klevoya/hydra
hydra login
