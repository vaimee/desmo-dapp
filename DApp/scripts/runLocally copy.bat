docker run --rm ^
    -v %CD%/mount/iexec_in:/iexec_in ^
    -v %CD%/mount/iexec_out:/iexec_out ^
    -e IEXEC_IN=/iexec_in ^
    -e IEXEC_OUT=/iexec_out ^
    desmo-dapp "0x827522033877435958774700293682298356914512474533" "{\"prefixList\":[{\"abbreviation\":\"desmo\",\"completeURI\":\"https://desmo.vaimee.it/\"},{\"abbreviation\":\"qudt\",\"completeURI\":\"http://qudt.org/schema/qudt/\"},{\"abbreviation\":\"xsd\",\"completeURI\":\"http://www.w3.org/2001/XMLSchema/\"},{\"abbreviation\":\"monas\",\"completeURI\":\"https://pod.dasibreaker.vaimee.it/monas/\"}],\"property\":{\"identifier\":\"value\",\"unit\":\"qudt:DEG_C\",\"datatype\":3},\"staticFilter\":\"$[?(@['type']=='Sensor')]\"}"