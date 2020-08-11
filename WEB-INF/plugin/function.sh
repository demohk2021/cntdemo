#!/bin/bash

sub_folder=$1

function _construct(){
  pid=$$
  source_name=$(basename "$(test -L "$0" && readlink "$0" || echo "$0")")
  current_date=$(date +'%Y%m%d')
  log_path="/src/logs/${source_name}.d/${sub_folder}"
  mkdir -p ${log_path}
}

_construct

#The function can not add test 'echo' 
function _debug(){
  while IFS= read -r line;
  do
    echo "CASE[${pid}] $(date +'%H%M%S.%3N') $@ | $line"; 
  done >> ${log_path}/${current_date}.log
}

function _log(){
 echo "CASE[${pid}] $(date +'%Y%m%d %H%M%S.%3N') | ${1}"
}
