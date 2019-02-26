#!/bin/bash

set -eu

echo ">>> Setup Rustup"
curl https://sh.rustup.rs -sSf | sh -s -- -y
export PATH=$PATH:$HOME/.cargo/bin

echo ">>> Add patch"
cat << EOF > ./node_modules/workbox-webpack-plugin/build/lib/get-asset-hash.js
const crypto = require('crypto');
module.exports = function(asset) {
  return crypto
    .createHash('md5')
    .update(Buffer.from(asset.source()), 'utf8')
    .digest('hex');
};
EOF

echo ">>> Build"
yarn build
