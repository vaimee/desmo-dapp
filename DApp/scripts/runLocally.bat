docker run --rm ^
    -v %CD%/mount/iexec_in:/iexec_in ^
    -v %CD%/mount/iexec_out:/iexec_out ^
    -e IEXEC_IN=/iexec_in ^
    -e IEXEC_OUT=/iexec_out ^
    desmo-dapp arg1 arg2