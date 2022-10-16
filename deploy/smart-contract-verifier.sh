#!/bin/sh

export SMART_CONTRACT_VERIFIER__CONFIG=/github/blockscout/deploy/smart-contract-verifier.toml

/github/blockscout-rs/target/release/smart-contract-verifier-http
