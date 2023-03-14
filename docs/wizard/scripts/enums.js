/**
 * Various "enums" and mapping
 */

import config from "../config/config.js";

/**
 * For use in the main.js module. Determines the different 'pages' of the SPA
 * Value is the display name
 */
export const PAGES = {
    'ERROR': 'Error',
    'INDEX_PAGE': 'Home',
    'CUSTOM_SETUP': 'Custom Setup',
    'INSTALL_DETAILS': 'Install Details',
    'DONE': 'Installation Done',
    'UNINSTALL': 'Uninstall',
}

/**
 * Mapping of the provisingKey in each module to the URL to reach the resource
 */
export const GC_OBJECT_BASE_URL_MAP = {
    'app-instance': `/admin/#/integrations/apps/${config.premiumAppIntegrationTypeId}/`,
    'widget-instance': `/admin/#/integrations/apps/${config.premiumWidgetIntegrationTypeId}/`,
    'data-table': '/directory/#/admin/routing/datatables/',
    'group': '/directory/#/admin/directory/groups/',
    'interaction-widget': '/directory/#/admin/integrations/apps/embedded-client-app-interaction-widget/',
    'oauth-client': '/directory/#/admin/integrations/oauth/',
    'role': '/directory/#/admin/directory/rolesV2/',
    'widget-deployment': '/directory/#/admin/integrations/widgets/',
    'ws-data-actions': '/directory/#/admin/integrations/apps/custom-rest-actions/',
    'gc-data-actions': '/directory/#/admin/integrations/apps/purecloud-data-actions/'
}

// Some resources do not allow direct access to the instance using their GUID
export const GC_CATEGORY_URL_MAP = {
    'byoc-cloud-trunk': '/directory/#/engage/telephonyAdmin/trunks/external',
    'open-messaging': '/directory/#/admin/messaging/platforms'
}

export const GC_CATEGORY_LABEL = {
    'app-instance': 'Premium App Instances',
    'widget-instance': 'Premium Widget Instances',
    'data-table': 'Architect Data Tables',
    'group': 'Groups',
    'interaction-widget': 'Interaction Widgets',
    'oauth-client': 'OAuth Clients (Client Credentials Grant)',
    'role': 'Role',
    'widget-deployment': 'Widget Deployments (Chat v2)',
    'ws-data-actions': 'Web Services Data Action Integrations',
    'gc-data-actions': 'Genesys Cloud Data Action Integrations',
    'byoc-cloud-trunk': 'BYOC Cloud Trunks',
    'open-messaging': 'Open Messaging Integrations',
    'post-custom-setup': 'Post Setup'
}

export const PC_TO_ELM_ENVIRONMENT_MAP = {
    'inindca.com': 'cxc-usw1.genhtcc.com',
    'inintca.com': 'cxc-usw1.genhtcc.com',
    'cac1.pure.cloud': 'cxc-cae4.genesyscloud.com',
    'sae1.pure.cloud': '',
    'mypurecloud.com': 'cxc-use4.genesyscloud.com',
    'usw2.pure.cloud': 'cxc-usw4.genesyscloud.com',
    'aps1.pure.cloud': 'cxc-aus4.genesyscloud.com',
    'apne2.pure.cloud': '',
    'mypurecloud.com.au': 'cxc-aus4.genesyscloud.com',
    'mypurecloud.jp': '',
    'mypurecloud.ie': 'cxc-euw4.genesyscloud.com',
    'mypurecloud.de': 'cxc-euc4.genesyscloud.com',
    'euw2.pure.cloud': 'cxc-euw4.genesyscloud.com',
}

export const PC_ENVIRONMENT_CLIENT_ID_MAP = {
    'inindca.com': '73c2e074-0950-480e-a8c3-10a9ab474768',
    'inintca.com': '',
    'cac1.pure.cloud': '',
    'sae1.pure.cloud': '',
    'mypurecloud.com': '',
    'usw2.pure.cloud': '',
    'aps1.pure.cloud': '',
    'apne2.pure.cloud': '',
    'mypurecloud.com.au': '',
    'mypurecloud.jp': '',
    'mypurecloud.ie': '',
    'mypurecloud.de': '',
    'euw2.pure.cloud': '',
}

export const ELM_BASE_URL_MAP = {
    'provision-gc': `/cx-contact/v3/tenants/provision-gc`,
    'app-instance': `/ui/cxcontact/#!/lists/list?gcMode=true`,
}
