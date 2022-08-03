docker run --rm ^
    -v %CD%/mount/iexec_in:/iexec_in ^
    -v %CD%/mount/iexec_out:/iexec_out ^
    -e IEXEC_IN=/iexec_in ^
    -e IEXEC_OUT=/iexec_out ^
    desmo-dapp "0x90F35F12027E4103E690DC9279E086EF5B5431A5" "{\"prefixList\":[{\"abbreviation\":\"desmo\",\"completeURI\":\"https://desmo.vaimee.it/\"},{\"abbreviation\":\"qudt\",\"completeURI\":\"http://qudt.org/schema/qudt/\"},{\"abbreviation\":\"xsd\",\"completeURI\":\"http://www.w3.org/2001/XMLSchema/\"},{\"abbreviation\":\"monas\",\"completeURI\":\"https://pod.dasibreaker.vaimee.it/monas/\"}],\"property\":{\"identifier\":\"value\",\"unit\":\"qudt:DEG_C\",\"datatype\":3},\"staticFilter\":\"$[?(@['type']=='Sensor')]\"}"