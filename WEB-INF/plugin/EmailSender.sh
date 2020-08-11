#!/bin/bash

CURDIR="`dirname $0`" 
UTIL=$0 
subcmd="${1}" 
params="${2}"

function _construct() { 
  eval "$params" 
  source $CURDIR/function.sh "EmailSender"
  sendemail --help
  rcode=$?
  if [ $rcode -ne 0 ];then 
      apt-get update
      apt-get install -y libio-socket-ssl-perl libnet-ssleay-perl sendemail
  fi
}

_construct

function _send(){
  message="`cat $message_file`"
  sendemail -f "${from}" \
  -s "${smtp}" \
  -o "message-content-type=text/html" \
  -xu $user \
  -o tls=auto \
  -xp $password \
  -u "=?utf-8?B?${subject}?=" \
  -t $to \
  -cc $cc \
  -bcc $bcc \
  -a $attach \
  -m "$message" \
  -o "message-charset=utf-8" > $out_file
  exit $?
}

usage() { cat << EOF
${UTIL}: Params options list -> send.
usage: ${UTIL} COMMAND

Commands: 
    send will send the email.
EOF
}

case $subcmd in
  "send") 
  shift 
  _send 
  exit 0 
  ;;
  -h | --help) 
  usage 
  exit 0 
  ;;
  *)
  echo >&2 "$UTIL: unknown command \"$1\" (use --help for help)"
  exit 1
  ;;
esac