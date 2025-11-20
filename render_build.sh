#!/usr/bin/env bash
set -o errexit

# Build frontend
npm install
npm run build

# Instalar pipenv si no existe
if ! command -v pipenv &> /dev/null
then
    echo "Instalando pipenv..."
    pip install --user pipenv
    export PATH=$HOME/.local/bin:$PATH
fi

# Instalar dependencias Python
pipenv install

# Gunicorn ya estará disponible
