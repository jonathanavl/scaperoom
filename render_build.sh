#!/usr/bin/env bash
set -o errexit

# Node.js build
npm install
npm run build

# 🚫 Pipenv omitido, ya que Flask no es necesario para producción frontend
# pipenv install
# pipenv run upgrade
