#!/usr/bin/env bash
rm -rf "${CLIENT_BUILD_DIR}" 
if [ ! -d "${CLIENT_BUILD_DIR}" ]
then mkdir -p "${CLIENT_BUILD_DIR}"
fi

# echo ${CLIENT_BUILD_DIR};
# echo "inside shell";

# sudo ln -s "$(which node)" /usr/bin/node
# sudo ln -s "$(which npm)" /usr/bin/npm
vip dev-env create  --elasticsearch=false --mailhog=false --media-redirect-domain=wp-develop.salesforce.com --mu-plugins=image --multisite=true --php=8.0 --phpmyadmin=false --slug="barfi2" --title="barfi2" --wordpress=6.1.1 --xdebug=false --app-code="/c/vikash/projects/rahul/d1/vip-go-skeleton"
vip dev-env start --slug barfi2

# ln -s /usr/bin/nodejs /usr/bin/node
# C:\Users\gvika\.local\share\vip\dev-environment\rahul
# vip dev-env create  --elasticsearch=false --mailhog=false --media-redirect-domain=wp-develop.salesforce.com --mu-plugins=image --multisite=true --php=8.0 --phpmyadmin=false --slug="rahul" --title="rahul" --wordpress=6.1.1 --xdebug=false --app-code="C:\Users\gvika\Downloads\vip-go-skeleton-production"
# vip dev-env start --slug ${PROJECT_NAME} 
# # vip dev-env import sql $CURRENT_DIR/config/db.sql --slug=${PROJECT_NAME} --search-replace="rahul3.vipdev.lndo.site,${PROJECT_NAME}.vipdev.lndo.site"