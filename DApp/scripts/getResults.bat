echo "Download result of transaction: %1"
iexec task show %1 --download my-app-result --chain viviani ^
    && unzip my-app-result.zip -d my-app-result