export declare type Setting = {
    id: string;
    path: string;
    key: string;
    value: string;
};

export declare type TreeNode = {
    id: string;
    name: string,
    children?: TreeNode[];
    value?: string;
};

export function insertIds(settings: Setting[]): Setting[] {
    return settings.map((s) => ({
        ...s,
        id: s.id ?? `${s.path}#${s.key}`,
    }));
}

export function mapSettingsToTree(settings: Setting[]): TreeNode[] {
  const orderedSettings = settings.sort((a, b) => a.id.localeCompare(b.id));
  const root = createTree(orderedSettings);
  if (!root?.children) {
    return [];
  }

  return root.children;
}

export const createTree = (settings: Setting[]): TreeNode | undefined => {
  const root: TreeNode = { id: '', name: 'root', children: [] };

  const findOrCreateNode = (parentNode: TreeNode, nodeId: string, nodeName: string, value?: string): TreeNode => {
    if (!parentNode.children) {
      parentNode.children = [];
    }
    let node = parentNode.children.find(child => child.id === nodeId);
    if (!node) {
      node = { id: nodeId, name: nodeName, value };
      parentNode.children.push(node);
    } else if (value !== undefined) {
      // Update the value if the node exists and a new value is provided
      node.value = value;
    }

    return node;
  };

  settings.forEach(setting => {
    const parts = setting.path.split('#');
    let currentNode = root;
    let fullPath = '';

    // Create nodes based on the pk
    parts.forEach((part, index) => {
      fullPath += (index ? '#' : '') + part; // Construct full path for unique id
      currentNode = findOrCreateNode(currentNode, fullPath, part);
    });

    // Further split the setting key if it follows the convention and create or update nodes
    const keyParts = setting.key.split(/[:.]/);
    keyParts.forEach((keyPart, index) => {
      fullPath += '#' + keyPart; // Extend the fullPath with the key part
      const isLastPart = index === keyParts.length - 1;
      currentNode = findOrCreateNode(currentNode, fullPath, keyPart, isLastPart ? setting.value : undefined);
    });
  });

  return root;
};

function createSetting(path: string, key: string, value: string): Setting {
    const parts = path.split('#');
    if (parts.length < 2) {
        throw new Error(`Invalid key: ${path}`);
    }

    return {
        id: `${path}#${key}`,
        path,
        key,
        value,
    }
}

export const settings: Setting[] = [
  createSetting('test#us-west-2#qa1','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#qa1','ServerConfig.AttachmentStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#qa1','ServerConfig.AvatarStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#qa1','ServerConfig.CacheProvider','NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache'),
  createSetting('test#us-west-2#qa1','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#qa1','ServerConfig.DbEngine','MySql'),
  createSetting('test#us-west-2#qa1','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#qa1','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#qa1','ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds','120'),
  createSetting('test#us-west-2#qa1','ServerConfig.EmailParserLambdaMaxMessagesPerRequest','10'),
  createSetting('test#us-west-2#qa1','ServerConfig.EmailParserLambdaSnsTopic',''),
  createSetting('test#us-west-2#qa1','ServerConfig.EmailParserLambdaSqsQueue','https://sqs.us-west-2.amazonaws.com/888985673581/qa1-emailparser-results'),
  createSetting('test#us-west-2#qa1','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#qa1','ServerConfig.NonMultiTenantConnectionString','CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};'),
  createSetting('test#us-west-2#qa1','ServerConfig.NonMultiTenantInstance','{instance}'),
  createSetting('test#us-west-2#qa1','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#qa1','ServerConfig.Provider','NHibernate.Connection.DriverConnectionProvider'),
  createSetting('test#us-west-2#qa1','ServerConfig.ReportInstallationLocation','{dataroot}/report'),
  createSetting('test#us-west-2#qa1','ServerConfig.SearchStrategyOptions','CombAmazonCloudSearch'),
  createSetting('test#us-west-2#qa1','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#qa1','ServerConfig.TempFolder','{dataroot}\temp'),
  createSetting('test#us-west-2#qa1','ServerConfig.UserMessagingSqsQueue','https://sqs.us-west-2.amazonaws.com/888985673581/qa1-user-messaging-us-west-2'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.AttachmentStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.AvatarStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.CacheProvider','NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.DbEngine','MySql'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds','120'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.EmailParserLambdaMaxMessagesPerRequest','10'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.EmailParserLambdaSnsTopic',''),
  createSetting('test#us-west-2#qa3svc','ServerConfig.EmailParserLambdaSqsQueue','https://sqs.us-west-2.amazonaws.com/888985673581/qa3-emailparser-results'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.NonMultiTenantConnectionString','CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.NonMultiTenantInstance','{instance}'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.Provider','NHibernate.Connection.DriverConnectionProvider'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.ReportInstallationLocation','{dataroot}/report'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.SearchStrategyOptions','CombAmazonCloudSearch'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#qa3svc','ServerConfig.TempFolder','{dataroot}\temp'),
  createSetting('test#us-west-2#deployment-813aad7','MemcachedClientConfigSettings.Port','11211'),
  createSetting('test#us-west-2#deployment-813aad7','MemcachedClientConfigSettings.Server','sha-el-f2byqcckxmxm.fect83.cfg.usw2.cache.amazonaws.com'),
  createSetting('test#us-west-2#deployment-813aad7','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#deployment-813aad7','ServerConfig.BatchSize','50'),
  createSetting('test#us-west-2#deployment-813aad7','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#deployment-813aad7','ServerConfig.ConnectionProvider','NHibernate.Connection.UserSuppliedConnectionProvider'),
  createSetting('test#us-west-2#deployment-813aad7','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#deployment-813aad7','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#deployment-813aad7','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#deployment-813aad7','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#deployment-813aad7','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#branch-8528','MemcachedClientConfigSettings.Port','11211'),
  createSetting('test#us-west-2#branch-8528','MemcachedClientConfigSettings.Server','tea-el-k3lih525m2mv.fect83.cfg.usw2.cache.amazonaws.com'),
  createSetting('test#us-west-2#branch-8528','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#branch-8528','ServerConfig.BatchSize','50'),
  createSetting('test#us-west-2#branch-8528','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#branch-8528','ServerConfig.ConnectionProvider','NHibernate.Connection.UserSuppliedConnectionProvider'),
  createSetting('test#us-west-2#branch-8528','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#branch-8528','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#branch-8528','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#branch-8528','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#branch-8528','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.AttachmentStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.AvatarStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.CacheProvider','NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.DbEngine','MySql'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds','120'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.EmailParserLambdaMaxMessagesPerRequest','10'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.EmailParserLambdaSnsTopic',''),
  createSetting('test#us-west-2#qa1svc','ServerConfig.EmailParserLambdaSqsQueue','https://sqs.us-west-2.amazonaws.com/888985673581/qa1-emailparser-results'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.NonMultiTenantConnectionString','CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.NonMultiTenantInstance','{instance}'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.Provider','NHibernate.Connection.DriverConnectionProvider'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.ReportInstallationLocation','{dataroot}/report'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.SearchStrategyOptions','CombAmazonCloudSearch'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#qa1svc','ServerConfig.TempFolder','{dataroot}\temp'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.AttachmentStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.AvatarStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.CacheProvider','NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.DbEngine','MySql'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds','120'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.EmailParserLambdaMaxMessagesPerRequest','10'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.EmailParserLambdaSnsTopic',''),
  createSetting('test#us-west-2#qa2svc','ServerConfig.EmailParserLambdaSqsQueue','https://sqs.us-west-2.amazonaws.com/888985673581/qa2-emailparser-results'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.NonMultiTenantConnectionString','CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.NonMultiTenantInstance','{instance}'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.Provider','NHibernate.Connection.DriverConnectionProvider'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.ReportInstallationLocation','{dataroot}/report'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.SearchStrategyOptions','CombAmazonCloudSearch'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#qa2svc','ServerConfig.TempFolder','{dataroot}\temp'),
  createSetting('test#us-west-2#qa2','MemcachedClientConfigSettings.Server','test-us-west-2.fect83.cfg.usw2.cache.amazonaws.com'),
  createSetting('test#us-west-2#qa2','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#qa2','ServerConfig.AttachmentStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#qa2','ServerConfig.AvatarStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#qa2','ServerConfig.CacheProvider','NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache'),
  createSetting('test#us-west-2#qa2','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#qa2','ServerConfig.DbEngine','MySql'),
  createSetting('test#us-west-2#qa2','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#qa2','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#qa2','ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds','120'),
  createSetting('test#us-west-2#qa2','ServerConfig.EmailParserLambdaMaxMessagesPerRequest','10'),
  createSetting('test#us-west-2#qa2','ServerConfig.EmailParserLambdaSnsTopic',''),
  createSetting('test#us-west-2#qa2','ServerConfig.EmailParserLambdaSqsQueue','https://sqs.us-west-2.amazonaws.com/888985673581/qa2-emailparser-results'),
  createSetting('test#us-west-2#qa2','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#qa2','ServerConfig.NonMultiTenantConnectionString','CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};'),
  createSetting('test#us-west-2#qa2','ServerConfig.NonMultiTenantInstance','{instance}'),
  createSetting('test#us-west-2#qa2','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#qa2','ServerConfig.Provider','NHibernate.Connection.DriverConnectionProvider'),
  createSetting('test#us-west-2#qa2','ServerConfig.ReportInstallationLocation','{dataroot}/report'),
  createSetting('test#us-west-2#qa2','ServerConfig.SearchStrategyOptions','CombAmazonCloudSearch'),
  createSetting('test#us-west-2#qa2','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#qa2','ServerConfig.TempFolder','{dataroot}\temp'),
  createSetting('test#us-west-2#web','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#web','ServerConfig.AttachmentStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#web','ServerConfig.AvatarStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#web','ServerConfig.CacheProvider','NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache'),
  createSetting('test#us-west-2#web','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#web','ServerConfig.DbEngine','MySql'),
  createSetting('test#us-west-2#web','ServerConfig.Dialect','DovetailCRM.Core.NHibernate.DovetailMySql55Dialect, DovetailCRM.Core'),
  createSetting('test#us-west-2#web','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#web','ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds','120'),
  createSetting('test#us-west-2#web','ServerConfig.EmailParserLambdaMaxMessagesPerRequest','10'),
  createSetting('test#us-west-2#web','ServerConfig.EmailParserLambdaSnsTopic',''),
  createSetting('test#us-west-2#web','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#web','ServerConfig.NonMultiTenantConnectionString','CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};'),
  createSetting('test#us-west-2#web','ServerConfig.NonMultiTenantInstance','{instance}'),
  createSetting('test#us-west-2#web','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#web','ServerConfig.Provider','NHibernate.Connection.DriverConnectionProvider'),
  createSetting('test#us-west-2#web','ServerConfig.ReportInstallationLocation','{dataroot}/report'),
  createSetting('test#us-west-2#web','ServerConfig.SearchStrategyOptions','CombAmazonCloudSearch'),
  createSetting('test#us-west-2#web','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#web','ServerConfig.TempFolder','{dataroot}\temp'),
  createSetting('test#us-west-2#deployment-d7d6a10b6df09e271684','MemcachedClientConfigSettings.Port','11211'),
  createSetting('test#us-west-2#deployment-d7d6a10b6df09e271684','MemcachedClientConfigSettings.Server','sha-el-f2byqcckxmxm.fect83.cfg.usw2.cache.amazonaws.com'),
  createSetting('test#us-west-2#deployment-d7d6a10b6df09e271684','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#deployment-d7d6a10b6df09e271684','ServerConfig.BatchSize','50'),
  createSetting('test#us-west-2#deployment-d7d6a10b6df09e271684','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#deployment-d7d6a10b6df09e271684','ServerConfig.ConnectionProvider','NHibernate.Connection.UserSuppliedConnectionProvider'),
  createSetting('test#us-west-2#deployment-d7d6a10b6df09e271684','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#deployment-d7d6a10b6df09e271684','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#deployment-d7d6a10b6df09e271684','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#deployment-d7d6a10b6df09e271684','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#deployment-d7d6a10b6df09e271684','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#build-13139','ServerConfig.AttachmentStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#build-13139','ServerConfig.AvatarStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#build-13139','ServerConfig.BatchSize','50'),
  createSetting('test#us-west-2#build-13139','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#build-13139','ServerConfig.ConnectionProvider','NHibernate.Connection.UserSuppliedConnectionProvider'),
  createSetting('test#us-west-2#build-13139','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#build-13139','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#build-13139','ServerConfig.EmailStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#build-13139','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#build-13139','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#build-13139','ServerConfig.SearchStrategyOptions','CombAmazonCloudSearch'),
  createSetting('test#us-west-2#build-13139','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#build-13139','ServerConfig.TempFolder','{dataroot}\temp'),
  createSetting('test#us-west-2#deployment-23c522f','MemcachedClientConfigSettings.Port','11211'),
  createSetting('test#us-west-2#deployment-23c522f','MemcachedClientConfigSettings.Server','sha-el-f2byqcckxmxm.fect83.cfg.usw2.cache.amazonaws.com'),
  createSetting('test#us-west-2#deployment-23c522f','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#deployment-23c522f','ServerConfig.BatchSize','50'),
  createSetting('test#us-west-2#deployment-23c522f','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#deployment-23c522f','ServerConfig.ConnectionProvider','NHibernate.Connection.UserSuppliedConnectionProvider'),
  createSetting('test#us-west-2#deployment-23c522f','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#deployment-23c522f','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#deployment-23c522f','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#deployment-23c522f','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#deployment-23c522f','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#devsvc','ServerConfig.AttachmentStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#devsvc','ServerConfig.AvatarStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#devsvc','ServerConfig.CacheProvider','NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache'),
  createSetting('test#us-west-2#devsvc','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#devsvc','ServerConfig.DbEngine','MySql'),
  createSetting('test#us-west-2#devsvc','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#devsvc','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#devsvc','ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds','120'),
  createSetting('test#us-west-2#devsvc','ServerConfig.EmailParserLambdaMaxMessagesPerRequest','10'),
  createSetting('test#us-west-2#devsvc','ServerConfig.EmailParserLambdaSnsTopic',''),
  createSetting('test#us-west-2#devsvc','ServerConfig.EmailParserLambdaSqsQueue','https://sqs.us-west-2.amazonaws.com/888985673581/dev-emailparser-results'),
  createSetting('test#us-west-2#devsvc','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#devsvc','ServerConfig.NonMultiTenantConnectionString','CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};'),
  createSetting('test#us-west-2#devsvc','ServerConfig.NonMultiTenantInstance','{instance}'),
  createSetting('test#us-west-2#devsvc','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#devsvc','ServerConfig.Provider','NHibernate.Connection.DriverConnectionProvider'),
  createSetting('test#us-west-2#devsvc','ServerConfig.ReportInstallationLocation','{dataroot}/report'),
  createSetting('test#us-west-2#devsvc','ServerConfig.SearchStrategyOptions','CombAmazonCloudSearch'),
  createSetting('test#us-west-2#devsvc','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#devsvc','ServerConfig.TempFolder','{dataroot}\temp'),
  createSetting('test#us-west-2#deployment-084a6ee','MemcachedClientConfigSettings.Port','11211'),
  createSetting('test#us-west-2#deployment-084a6ee','MemcachedClientConfigSettings.Server','sha-el-f2byqcckxmxm.fect83.cfg.usw2.cache.amazonaws.com'),
  createSetting('test#us-west-2#deployment-084a6ee','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#deployment-084a6ee','ServerConfig.BatchSize','50'),
  createSetting('test#us-west-2#deployment-084a6ee','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#deployment-084a6ee','ServerConfig.ConnectionProvider','NHibernate.Connection.UserSuppliedConnectionProvider'),
  createSetting('test#us-west-2#deployment-084a6ee','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#deployment-084a6ee','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#deployment-084a6ee','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#deployment-084a6ee','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#deployment-084a6ee','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#qa3','MemcachedClientConfigSettings.Server','test-us-west-2.fect83.cfg.usw2.cache.amazonaws.com'),
  createSetting('test#us-west-2#qa3','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#qa3','ServerConfig.AttachmentStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#qa3','ServerConfig.AvatarStorageOptions','AmazonS3'),
  createSetting('test#us-west-2#qa3','ServerConfig.CacheProvider','NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache'),
  createSetting('test#us-west-2#qa3','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#qa3','ServerConfig.DbEngine','MySql'),
  createSetting('test#us-west-2#qa3','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#qa3','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#qa3','ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds','120'),
  createSetting('test#us-west-2#qa3','ServerConfig.EmailParserLambdaMaxMessagesPerRequest','10'),
  createSetting('test#us-west-2#qa3','ServerConfig.EmailParserLambdaSnsTopic',''),
  createSetting('test#us-west-2#qa3','ServerConfig.EmailParserLambdaSqsQueue','https://sqs.us-west-2.amazonaws.com/888985673581/qa3-emailparser-results'),
  createSetting('test#us-west-2#qa3','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#qa3','ServerConfig.NonMultiTenantConnectionString','CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};'),
  createSetting('test#us-west-2#qa3','ServerConfig.NonMultiTenantInstance','{instance}'),
  createSetting('test#us-west-2#qa3','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#qa3','ServerConfig.Provider','NHibernate.Connection.DriverConnectionProvider'),
  createSetting('test#us-west-2#qa3','ServerConfig.ReportInstallationLocation','{dataroot}/report'),
  createSetting('test#us-west-2#qa3','ServerConfig.SearchStrategyOptions','CombAmazonCloudSearch'),
  createSetting('test#us-west-2#qa3','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#qa3','ServerConfig.TempFolder','{dataroot}\temp'),
  createSetting('test#us-west-2#deployment-0442cdb','MemcachedClientConfigSettings.Port','11211'),
  createSetting('test#us-west-2#deployment-0442cdb','MemcachedClientConfigSettings.Server','sha-el-f2byqcckxmxm.fect83.cfg.usw2.cache.amazonaws.com'),
  createSetting('test#us-west-2#deployment-0442cdb','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#deployment-0442cdb','ServerConfig.BatchSize','50'),
  createSetting('test#us-west-2#deployment-0442cdb','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#deployment-0442cdb','ServerConfig.ConnectionProvider','NHibernate.Connection.UserSuppliedConnectionProvider'),
  createSetting('test#us-west-2#deployment-0442cdb','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#deployment-0442cdb','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#deployment-0442cdb','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#deployment-0442cdb','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#deployment-0442cdb','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#deployment-b6eab09','MemcachedClientConfigSettings.Port','11211'),
  createSetting('test#us-west-2#deployment-b6eab09','MemcachedClientConfigSettings.Server','sha-el-f2byqcckxmxm.fect83.cfg.usw2.cache.amazonaws.com'),
  createSetting('test#us-west-2#deployment-b6eab09','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#deployment-b6eab09','ServerConfig.BatchSize','50'),
  createSetting('test#us-west-2#deployment-b6eab09','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#deployment-b6eab09','ServerConfig.ConnectionProvider','NHibernate.Connection.UserSuppliedConnectionProvider'),
  createSetting('test#us-west-2#deployment-b6eab09','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#deployment-b6eab09','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#deployment-b6eab09','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#deployment-b6eab09','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#deployment-b6eab09','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#deployment-e053747','MemcachedClientConfigSettings.Port','11211'),
  createSetting('test#us-west-2#deployment-e053747','MemcachedClientConfigSettings.Server','sha-el-f2byqcckxmxm.fect83.cfg.usw2.cache.amazonaws.com'),
  createSetting('test#us-west-2#deployment-e053747','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#deployment-e053747','ServerConfig.BatchSize','50'),
  createSetting('test#us-west-2#deployment-e053747','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#deployment-e053747','ServerConfig.ConnectionProvider','NHibernate.Connection.UserSuppliedConnectionProvider'),
  createSetting('test#us-west-2#deployment-e053747','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#deployment-e053747','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#deployment-e053747','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#deployment-e053747','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#deployment-e053747','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#branch-master','MemcachedClientConfigSettings.Port','11211'),
  createSetting('test#us-west-2#branch-master','MemcachedClientConfigSettings.Server','rex-el-17iqlg26lea4v.fect83.cfg.usw2.cache.amazonaws.com'),
  createSetting('test#us-west-2#branch-master','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#branch-master','ServerConfig.BatchSize','50'),
  createSetting('test#us-west-2#branch-master','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#branch-master','ServerConfig.ConnectionProvider','NHibernate.Connection.UserSuppliedConnectionProvider'),
  createSetting('test#us-west-2#branch-master','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#branch-master','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#branch-master','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#branch-master','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#branch-master','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#branch-master','Update','true'),
  createSetting('test#us-west-2#deployment-135f5d4','MemcachedClientConfigSettings.Port','11211'),
  createSetting('test#us-west-2#deployment-135f5d4','MemcachedClientConfigSettings.Server','sha-el-f2byqcckxmxm.fect83.cfg.usw2.cache.amazonaws.com'),
  createSetting('test#us-west-2#deployment-135f5d4','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#deployment-135f5d4','ServerConfig.BatchSize','50'),
  createSetting('test#us-west-2#deployment-135f5d4','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#deployment-135f5d4','ServerConfig.ConnectionProvider','NHibernate.Connection.UserSuppliedConnectionProvider'),
  createSetting('test#us-west-2#deployment-135f5d4','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#deployment-135f5d4','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#deployment-135f5d4','ServerConfig.GenerateStatistics','false'),
  createSetting('test#us-west-2#deployment-135f5d4','ServerConfig.PrepareSql','true'),
  createSetting('test#us-west-2#deployment-135f5d4','ServerConfig.ShowSql','false'),
  createSetting('test#us-west-2#branch-current','MemcachedClientConfigSettings.Port','11211'),
  createSetting('test#us-west-2#branch-current','MemcachedClientConfigSettings.Server','rex-el-2rg6v0so86v1.fect83.cfg.usw2.cache.amazonaws.com'),
  createSetting('test#us-west-2#branch-current','MemcachedClientConfigSettings.Strategy','ElastiCache'),
  createSetting('test#us-west-2#branch-current','ServerConfig.BatchSize','50'),
  createSetting('test#us-west-2#branch-current','ServerConfig.CommandTimeout','120'),
  createSetting('test#us-west-2#branch-current','ServerConfig.ConnectionProvider','NHibernate.Connection.UserSuppliedConnectionProvider'),
  createSetting('test#us-west-2#branch-current','ServerConfig.Dialect','DovetailCRM.Domain.Persistence.NHibernate.DovetailMySql55Dialect, DovetailCRM.Domain'),
  createSetting('test#us-west-2#branch-current','ServerConfig.Driver','NHibernate.Driver.MySqlDataDriver, NHibernate'),
  createSetting('test#us-west-2#branch-current','ServerConfig.GenerateStatistics','false'),
];

export const getSettings = () => {
  const nodes = mapSettingsToTree(insertIds(settings));
  // console.log('nodes', nodes);
  return Promise.resolve(nodes);
};

export const addSetting = (newSetting: Setting) => {
  settings.push(newSetting);
  return Promise.resolve(newSetting);
};

export const updateSetting = (updatedSetting: Setting) => {
  const index = settings.findIndex(s => s.path === updatedSetting.path && s.key === updatedSetting.key);
  if (index !== -1) {
    settings[index] = updatedSetting;
  }
  return Promise.resolve(updatedSetting);
};

export const deleteSetting = (path: string, key: string) => {
  const index = settings.findIndex(s => s.path === path && s.key === key);
  if (index !== -1) {
    settings.splice(index, 1);
  }
  return Promise.resolve({ path });
};