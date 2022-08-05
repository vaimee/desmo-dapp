export default {

    DIRECTORY_CACHE_TIMEOUT: 30*60*1000,
    //data consensum algorithm
    AUTOCORRELATION: 4,
    T:10,
    //data encoding must be in multiples of 4
    MAX_DIRECTORY_LIST_SIZE:256,
    
    /*
        if IGNORE_TD_COLLECTION_ERROR is true: if we can't retrieve a TD from a Directory
        the Directory will not punished if there will other TDs from the same Directory, and 
        these will be used.
        if IGNORE_TD_COLLECTION_ERROR is false: if a single TD of a Directory 
        will not retrieve correctly, all the TD from the same Directory will be ignored and 
        the Directory will be punished.
        (Remember: if a TD will retrieve correctly form the Directory, but the Thing of the TD will 
        no response or will retrieve a not valid value all the Directory will be punished anyway)
    */
    IGNORE_TD_COLLECTION_ERROR:false,

    /*
        PARSER CONFIGURATION
        if "true" it means a MUST HAVE
    */
    PROPERTY_IDENTIFIER_IS_URI: false,
    PROPERTY_UNIT_IS_URI:  true,
    GEOFILTER_UNIT_IS_URI:  true,

    //ms
    DIRECTORY_TIME_OUT:10000,

    LOGGER_URL:"https://desmold-logs.vaimee.it/logs"
}