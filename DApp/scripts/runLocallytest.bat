docker run --rm ^
    -v %CD%/mount/iexec_in:/iexec_in ^
    -v %CD%/mount/iexec_out:/iexec_out ^
    -e IEXEC_IN=/iexec_in ^
    -e IEXEC_OUT=/iexec_out ^
    desmo-dapp_test_param "This is a 'string' with ' ( 3 single quotes)" "this is a \"string\" with \" (double quotes)" ` double " and ' single quote string `