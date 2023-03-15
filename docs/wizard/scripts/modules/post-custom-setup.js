import config from '../../config/config.js';
import { PC_TO_ELM_ENVIRONMENT_MAP, ELM_BASE_URL_MAP } from '../enums.js';

const platformClient = require('platformClient');

/**
 * Post Custom Setup
 * Called after everything has already been installed
 * @param {Function} logFunc logger for messages
 * @param {Object} installedData contains everything that was installed by the wizard
 * @param {Object} current user
 * @returns {Promise.<Object>}
 */
async function configure(logFunc, installedData, user, gcClient) {
    return new Promise(async (resolve, reject) => {
        logFunc('Post Custom Setup...');

        // successful
        // resolve({status: true, cause: ''})
        // failure
        // resolve({status: false, cause: 'detailed reason or empty string'})

        try {
            const genesysCloudEnv = gcClient.config.environment;
            const elmEnv = PC_TO_ELM_ENVIRONMENT_MAP[genesysCloudEnv];
            
            if (!elmEnv) {
                throw new Error(`Not found CXC ELM environment for ${genesysCloudEnv}`);
            }
            
            const provisionBody = {
                ccid: config.contactCenterId,
                genesysCloudEnv,
                genesysCloudOrg: user.organization.id,
                genesysCloudClientId: installedData['oauth-client'][config.provisioningInfo['oauth-client'][0].name].id,
                genesysCloudClientSecret: installedData['oauth-client'][config.provisioningInfo['oauth-client'][0].name].secret,
                genesysCloudCodeGrantClientId: installedData['oauth-client'][config.provisioningInfo['oauth-client'][1].name].id,
                genesysCloudCodeGrantClientSecret: installedData['oauth-client'][config.provisioningInfo['oauth-client'][1].name].secret,
            };

            const headers = new Headers({
                'Content-Type': 'application/json',
            });
            let backendResult = await fetch(new Request(`https://${elmEnv}${ELM_BASE_URL_MAP['provision-gc']}`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ data: provisionBody }),
            }));

            // Receiving the HTTP POST, the backend can:
            // 1) The backend can verify that the request is coming from a legitimate customer
            //   (i.e. customer has a Genesys Cloud environment and has purchased the Premium Application)
            //   - Retrieve apiEnvironment (Genesys Cloud region: mypurecloud.com, mypurecloud.ie, ...), oauthClientId and oauthClientSecret (the wizard must create an OAuth client with Client Credentials grant first - config.provisioningInfo)
            //   - The backend validates the region is valid and attempts to connect to the Genesys Cloud environment (using provided oauthClientId and oauthClientSecret)
            //   - The backend can then verify that the Premium Application product (e.g. examplePremiumApp) has been purchased with [GET /api/v2/authorization/products](https://developer.genesys.cloud/devapps/api-explorer#get-api-v2-authorization-products)
            //     or can verify the Premium Application Integration Type (e.g. premium-app-example) with [GET /api/v2/integrations/types/{typeId}](https://developer.genesys.cloud/devapps/api-explorer#get-api-v2-integrations-types--typeId-)
            // 2) If granted access, the backend can create/modify/update 3rd party resources for this customer
            // 3) If necessary, the backend can perform updates in the customer's Genesys Cloud environment using the Platform API
            // 4) The backend returns the final status in case of Success or in case of Error

            let status = false;
            let error;
            
            if (backendResult.status === 200) {
                status = true;
            } else {
                status = false;
                error = backendResult.statusText;
                
                try {
                    const parsedBody = await backendResult.json();
                    const { status } = parsedBody;
                    
                    error = status ? status.message : 'Unknown error';
                } catch (e) {
                    console.error(e);
                }
            }
            
            const cause = error ? `ERROR - Request to backend failed because of ${error}` : 'SUCCESS';

            resolve({ status, cause });
        } catch (e) {
            console.error(e);
            resolve({ status: false, cause: 'ERROR - Request to backend failed' });
        }

    });
}

export default {
    provisioningInfoKey: 'post-custom-setup',

    configure: configure
}