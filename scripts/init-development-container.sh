#!/usr/bin/env bash

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

development_docker_image="react-native-dev"

local_ip_wifi=$(Ipconfig getifaddr en0)
if [ -z "$local_ip_wifi" ]
then
    local_ip=$(Ipconfig getifaddr en1)
else
    local_ip="$local_ip_wifi"
fi

pushd "${CURRENT_DIR}"/..

docker run \
    --rm \
    -it \
    -p 19000:19000 \
    -p 19001:19001 \
    -p 19002:19002 \
    -p 19006:19006 \
    -v $(pwd):/opt/react_native_app/app \
    --workdir /opt/react_native_app/app \
    -e REACT_NATIVE_PACKAGER_HOSTNAME="$local_ip" \
    $* \
    "$development_docker_image"

popd
