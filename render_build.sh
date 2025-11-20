#!/usr/bin/env bash
set -o errexit

# Build frontend React
npm install
npm run build

# Instalar pipenv sin --user
pip install pipenv

# Instalar dependencias Python (Flask, Gunicorn, etc.)
pipenv install --dev
