#!/bin/bash

# Ensure directories exist
mkdir -p src/common/proto

# Path to plugins
PROTOC_GEN_TS_PROTO="./node_modules/.bin/protoc-gen-ts_proto"
GRPC_TOOLS_NODE_PROTOC="./node_modules/.bin/grpc_tools_node_protoc"

echo "🚀 Generating TypeScript definitions from Proto files..."

$GRPC_TOOLS_NODE_PROTOC \
    --plugin=protoc-gen-ts_proto=$PROTOC_GEN_TS_PROTO \
    --ts_proto_out=./src/common/proto \
    --ts_proto_opt=nestJs=true \
    --ts_proto_opt=addGrpcMetadata=true \
    --proto_path=./proto \
    ./proto/*.proto

echo "✅ Done!"
