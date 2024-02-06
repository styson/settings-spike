export declare type Setting = {
  id: string;
  path: string;
  key: string;
  value: string;
};

export declare type TreeNode<T> = {
  id: string;
  name: string;
  data?: T;
  value?: string;
  type: string;
  children?: TreeNode<T>[];
};

export function insertIds(settings: Setting[]): Setting[] {
  return settings.map((s) => ({
    ...s,
    id: s.id ?? `${s.path}#${s.key}`,
  }));
}

export function createTree(settings: Setting[]): TreeNode<Setting> | undefined {
  const root: TreeNode<Setting> = { id: '', name: 'root', type: 'path', children: [] };
  const findOrCreateNode = (
    parentNode: TreeNode<Setting>,
    nodeId: string,
    nodeName: string,
    type: string,
    value?: string,
  ): TreeNode<Setting> => {
    if (!parentNode.children) {
      parentNode.children = [];
    }
    let node = parentNode.children.find((child) => child.id === nodeId);
    if (!node) {
      node = { id: nodeId, name: nodeName, value, type };
      parentNode.children.push(node);
    } else if (value !== undefined) {
      // Update the value if the node exists and a new value is provided
      node.type = 'setting';
      node.value = value;
    }
    return node;
  };

  settings.forEach((setting) => {
    const parts = setting.path.split('#');
    let currentNode = root;
    let fullPath = '';

    // Create nodes based on the pk
    parts.forEach((part, index) => {
      fullPath += (index ? '#' : '') + part; // Construct full path for unique id
      currentNode = findOrCreateNode(currentNode, fullPath, part, 'path');
    });

    // Further split the setting key if it follows the convention and create or update nodes
    const keyParts = setting.key.split(/[:.]/);
    keyParts.forEach((keyPart, index) => {
      fullPath += '#' + keyPart; // Extend the fullPath with the key part
      const isLastPart = index === keyParts.length - 1;
      currentNode = findOrCreateNode(
        currentNode,
        fullPath,
        keyPart,
        isLastPart ? 'setting' : 'group',
        isLastPart ? setting.value : undefined,
      );
      currentNode.data = setting;
    });
  });

  return root;
}

export function mapSettingsToTree(settings: Setting[]): TreeNode<Setting>[] {
  const root = createTree(settings);
  if (!root?.children) {
    return [];
  }

  return root.children;
}

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
  };
}

// MockAPI.js
export const settings: Setting[] = [
  createSetting(
    'test#us-west-2#qa1',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting('test#us-west-2#qa1', 'MemcachedClientConfigSettings.Strategy', 'ElastiCache'),
  createSetting('test#us-west-2#qa1', 'ServerConfig.AttachmentStorageOptions', 'AmazonS3'),
  createSetting('test#us-west-2#qa1', 'ServerConfig.AvatarStorageOptions', 'AmazonS3'),
  createSetting(
    'test#us-west-2#qa1',
    'ServerConfig.CacheProvider',
    'NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache',
  ),
  createSetting('test#us-west-2#qa1', 'ServerConfig.CommandTimeout', '120'),
  createSetting('test#us-west-2#qa1', 'ServerConfig.DbEngine', 'MySql'),
  createSetting(
    'test#us-west-2#qa1',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting(
    'test#us-west-2#qa1',
    'ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds',
    '120',
  ),
  createSetting('test#us-west-2#qa1', 'ServerConfig.EmailParserLambdaMaxMessagesPerRequest', '10'),
  createSetting('test#us-west-2#qa1', 'ServerConfig.EmailParserLambdaSnsTopic', ''),
  createSetting(
    'test#us-west-2#qa1',
    'ServerConfig.EmailParserLambdaSqsQueue',
    'xxx',
  ),
  createSetting('test#us-west-2#qa1', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting(
    'test#us-west-2#qa1',
    'ServerConfig.NonMultiTenantConnectionString',
    'CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};',
  ),
  createSetting('test#us-west-2#qa1', 'ServerConfig.NonMultiTenantInstance', '{instance}'),
  createSetting('test#us-west-2#qa1', 'ServerConfig.PrepareSql', 'true'),
  createSetting(
    'test#us-west-2#qa1',
    'ServerConfig.Provider',
    'NHibernate.Connection.DriverConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#qa1',
    'ServerConfig.ReportInstallationLocation',
    '{dataroot}/report',
  ),
  createSetting(
    'test#us-west-2#qa1',
    'ServerConfig.SearchStrategyOptions',
    'CombAmazonCloudSearch',
  ),
  createSetting('test#us-west-2#qa1', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#qa1', 'ServerConfig.TempFolder', '{dataroot}\temp'),
  createSetting(
    'test#us-west-2#qa1',
    'ServerConfig.UserMessagingSqsQueue',
    'xxx',
  ),
  createSetting('test#us-west-2#qa3svc', 'ServerConfig.AttachmentStorageOptions', 'AmazonS3'),
  createSetting('test#us-west-2#qa3svc', 'ServerConfig.AvatarStorageOptions', 'AmazonS3'),
  createSetting(
    'test#us-west-2#qa3svc',
    'ServerConfig.CacheProvider',
    'NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache',
  ),
  createSetting('test#us-west-2#qa3svc', 'ServerConfig.CommandTimeout', '120'),
  createSetting('test#us-west-2#qa3svc', 'ServerConfig.DbEngine', 'MySql'),
  createSetting(
    'test#us-west-2#qa3svc',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting(
    'test#us-west-2#qa3svc',
    'ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds',
    '120',
  ),
  createSetting(
    'test#us-west-2#qa3svc',
    'ServerConfig.EmailParserLambdaMaxMessagesPerRequest',
    '10',
  ),
  createSetting('test#us-west-2#qa3svc', 'ServerConfig.EmailParserLambdaSnsTopic', ''),
  createSetting(
    'test#us-west-2#qa3svc',
    'ServerConfig.EmailParserLambdaSqsQueue',
    'xxx',
  ),
  createSetting('test#us-west-2#qa3svc', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting(
    'test#us-west-2#qa3svc',
    'ServerConfig.NonMultiTenantConnectionString',
    'CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};',
  ),
  createSetting('test#us-west-2#qa3svc', 'ServerConfig.NonMultiTenantInstance', '{instance}'),
  createSetting('test#us-west-2#qa3svc', 'ServerConfig.PrepareSql', 'true'),
  createSetting(
    'test#us-west-2#qa3svc',
    'ServerConfig.Provider',
    'NHibernate.Connection.DriverConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#qa3svc',
    'ServerConfig.ReportInstallationLocation',
    '{dataroot}/report',
  ),
  createSetting(
    'test#us-west-2#qa3svc',
    'ServerConfig.SearchStrategyOptions',
    'CombAmazonCloudSearch',
  ),
  createSetting('test#us-west-2#qa3svc', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#qa3svc', 'ServerConfig.TempFolder', '{dataroot}\temp'),
  createSetting('test#us-west-2#deployment-813aad7', 'MemcachedClientConfigSettings.Port', '11211'),
  createSetting(
    'test#us-west-2#deployment-813aad7',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting(
    'test#us-west-2#deployment-813aad7',
    'MemcachedClientConfigSettings.Strategy',
    'ElastiCache',
  ),
  createSetting('test#us-west-2#deployment-813aad7', 'ServerConfig.BatchSize', '50'),
  createSetting('test#us-west-2#deployment-813aad7', 'ServerConfig.CommandTimeout', '120'),
  createSetting(
    'test#us-west-2#deployment-813aad7',
    'ServerConfig.ConnectionProvider',
    'NHibernate.Connection.UserSuppliedConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#deployment-813aad7',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting('test#us-west-2#deployment-813aad7', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting('test#us-west-2#deployment-813aad7', 'ServerConfig.PrepareSql', 'true'),
  createSetting('test#us-west-2#deployment-813aad7', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#branch-8528', 'MemcachedClientConfigSettings.Port', '11211'),
  createSetting(
    'test#us-west-2#branch-8528',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting(
    'test#us-west-2#branch-8528',
    'MemcachedClientConfigSettings.Strategy',
    'ElastiCache',
  ),
  createSetting('test#us-west-2#branch-8528', 'ServerConfig.BatchSize', '50'),
  createSetting('test#us-west-2#branch-8528', 'ServerConfig.CommandTimeout', '120'),
  createSetting(
    'test#us-west-2#branch-8528',
    'ServerConfig.ConnectionProvider',
    'NHibernate.Connection.UserSuppliedConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#branch-8528',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting('test#us-west-2#branch-8528', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting('test#us-west-2#branch-8528', 'ServerConfig.PrepareSql', 'true'),
  createSetting('test#us-west-2#branch-8528', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#qa1svc', 'ServerConfig.AttachmentStorageOptions', 'AmazonS3'),
  createSetting('test#us-west-2#qa1svc', 'ServerConfig.AvatarStorageOptions', 'AmazonS3'),
  createSetting(
    'test#us-west-2#qa1svc',
    'ServerConfig.CacheProvider',
    'NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache',
  ),
  createSetting('test#us-west-2#qa1svc', 'ServerConfig.CommandTimeout', '120'),
  createSetting('test#us-west-2#qa1svc', 'ServerConfig.DbEngine', 'MySql'),
  createSetting(
    'test#us-west-2#qa1svc',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting(
    'test#us-west-2#qa1svc',
    'ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds',
    '120',
  ),
  createSetting(
    'test#us-west-2#qa1svc',
    'ServerConfig.EmailParserLambdaMaxMessagesPerRequest',
    '10',
  ),
  createSetting('test#us-west-2#qa1svc', 'ServerConfig.EmailParserLambdaSnsTopic', ''),
  createSetting(
    'test#us-west-2#qa1svc',
    'ServerConfig.EmailParserLambdaSqsQueue',
    'xxx',
  ),
  createSetting('test#us-west-2#qa1svc', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting(
    'test#us-west-2#qa1svc',
    'ServerConfig.NonMultiTenantConnectionString',
    'CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};',
  ),
  createSetting('test#us-west-2#qa1svc', 'ServerConfig.NonMultiTenantInstance', '{instance}'),
  createSetting('test#us-west-2#qa1svc', 'ServerConfig.PrepareSql', 'true'),
  createSetting(
    'test#us-west-2#qa1svc',
    'ServerConfig.Provider',
    'NHibernate.Connection.DriverConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#qa1svc',
    'ServerConfig.ReportInstallationLocation',
    '{dataroot}/report',
  ),
  createSetting(
    'test#us-west-2#qa1svc',
    'ServerConfig.SearchStrategyOptions',
    'CombAmazonCloudSearch',
  ),
  createSetting('test#us-west-2#qa1svc', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#qa1svc', 'ServerConfig.TempFolder', '{dataroot}\temp'),
  createSetting('test#us-west-2#qa2svc', 'ServerConfig.AttachmentStorageOptions', 'AmazonS3'),
  createSetting('test#us-west-2#qa2svc', 'ServerConfig.AvatarStorageOptions', 'AmazonS3'),
  createSetting(
    'test#us-west-2#qa2svc',
    'ServerConfig.CacheProvider',
    'NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache',
  ),
  createSetting('test#us-west-2#qa2svc', 'ServerConfig.CommandTimeout', '120'),
  createSetting('test#us-west-2#qa2svc', 'ServerConfig.DbEngine', 'MySql'),
  createSetting(
    'test#us-west-2#qa2svc',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting(
    'test#us-west-2#qa2svc',
    'ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds',
    '120',
  ),
  createSetting(
    'test#us-west-2#qa2svc',
    'ServerConfig.EmailParserLambdaMaxMessagesPerRequest',
    '10',
  ),
  createSetting('test#us-west-2#qa2svc', 'ServerConfig.EmailParserLambdaSnsTopic', ''),
  createSetting(
    'test#us-west-2#qa2svc',
    'ServerConfig.EmailParserLambdaSqsQueue',
    'xxx',
  ),
  createSetting('test#us-west-2#qa2svc', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting(
    'test#us-west-2#qa2svc',
    'ServerConfig.NonMultiTenantConnectionString',
    'CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};',
  ),
  createSetting('test#us-west-2#qa2svc', 'ServerConfig.NonMultiTenantInstance', '{instance}'),
  createSetting('test#us-west-2#qa2svc', 'ServerConfig.PrepareSql', 'true'),
  createSetting(
    'test#us-west-2#qa2svc',
    'ServerConfig.Provider',
    'NHibernate.Connection.DriverConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#qa2svc',
    'ServerConfig.ReportInstallationLocation',
    '{dataroot}/report',
  ),
  createSetting(
    'test#us-west-2#qa2svc',
    'ServerConfig.SearchStrategyOptions',
    'CombAmazonCloudSearch',
  ),
  createSetting('test#us-west-2#qa2svc', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#qa2svc', 'ServerConfig.TempFolder', '{dataroot}\temp'),
  createSetting(
    'test#us-west-2#qa2',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting('test#us-west-2#qa2', 'MemcachedClientConfigSettings.Strategy', 'ElastiCache'),
  createSetting('test#us-west-2#qa2', 'ServerConfig.AttachmentStorageOptions', 'AmazonS3'),
  createSetting('test#us-west-2#qa2', 'ServerConfig.AvatarStorageOptions', 'AmazonS3'),
  createSetting(
    'test#us-west-2#qa2',
    'ServerConfig.CacheProvider',
    'NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache',
  ),
  createSetting('test#us-west-2#qa2', 'ServerConfig.CommandTimeout', '120'),
  createSetting('test#us-west-2#qa2', 'ServerConfig.DbEngine', 'MySql'),
  createSetting(
    'test#us-west-2#qa2',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting(
    'test#us-west-2#qa2',
    'ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds',
    '120',
  ),
  createSetting('test#us-west-2#qa2', 'ServerConfig.EmailParserLambdaMaxMessagesPerRequest', '10'),
  createSetting('test#us-west-2#qa2', 'ServerConfig.EmailParserLambdaSnsTopic', ''),
  createSetting(
    'test#us-west-2#qa2',
    'ServerConfig.EmailParserLambdaSqsQueue',
    'xxx',
  ),
  createSetting('test#us-west-2#qa2', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting(
    'test#us-west-2#qa2',
    'ServerConfig.NonMultiTenantConnectionString',
    'CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};',
  ),
  createSetting('test#us-west-2#qa2', 'ServerConfig.NonMultiTenantInstance', '{instance}'),
  createSetting('test#us-west-2#qa2', 'ServerConfig.PrepareSql', 'true'),
  createSetting(
    'test#us-west-2#qa2',
    'ServerConfig.Provider',
    'NHibernate.Connection.DriverConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#qa2',
    'ServerConfig.ReportInstallationLocation',
    '{dataroot}/report',
  ),
  createSetting(
    'test#us-west-2#qa2',
    'ServerConfig.SearchStrategyOptions',
    'CombAmazonCloudSearch',
  ),
  createSetting('test#us-west-2#qa2', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#qa2', 'ServerConfig.TempFolder', '{dataroot}\temp'),
  createSetting('test#us-west-2#web', 'MemcachedClientConfigSettings.Strategy', 'ElastiCache'),
  createSetting('test#us-west-2#web', 'ServerConfig.AttachmentStorageOptions', 'AmazonS3'),
  createSetting('test#us-west-2#web', 'ServerConfig.AvatarStorageOptions', 'AmazonS3'),
  createSetting(
    'test#us-west-2#web',
    'ServerConfig.CacheProvider',
    'NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache',
  ),
  createSetting('test#us-west-2#web', 'ServerConfig.CommandTimeout', '120'),
  createSetting('test#us-west-2#web', 'ServerConfig.DbEngine', 'MySql'),
  createSetting(
    'test#us-west-2#web',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting(
    'test#us-west-2#web',
    'ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds',
    '120',
  ),
  createSetting('test#us-west-2#web', 'ServerConfig.EmailParserLambdaMaxMessagesPerRequest', '10'),
  createSetting('test#us-west-2#web', 'ServerConfig.EmailParserLambdaSnsTopic', ''),
  createSetting('test#us-west-2#web', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting(
    'test#us-west-2#web',
    'ServerConfig.NonMultiTenantConnectionString',
    'CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};',
  ),
  createSetting('test#us-west-2#web', 'ServerConfig.NonMultiTenantInstance', '{instance}'),
  createSetting('test#us-west-2#web', 'ServerConfig.PrepareSql', 'true'),
  createSetting(
    'test#us-west-2#web',
    'ServerConfig.Provider',
    'NHibernate.Connection.DriverConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#web',
    'ServerConfig.ReportInstallationLocation',
    '{dataroot}/report',
  ),
  createSetting(
    'test#us-west-2#web',
    'ServerConfig.SearchStrategyOptions',
    'CombAmazonCloudSearch',
  ),
  createSetting('test#us-west-2#web', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#web', 'ServerConfig.TempFolder', '{dataroot}\temp'),
  createSetting(
    'test#us-west-2#deployment-d7d6a10b6df09e2716840e2ced173f2e0b23ca5c',
    'MemcachedClientConfigSettings.Port',
    '11211',
  ),
  createSetting(
    'test#us-west-2#deployment-d7d6a10b6df09e2716840e2ced173f2e0b23ca5c',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting(
    'test#us-west-2#deployment-d7d6a10b6df09e2716840e2ced173f2e0b23ca5c',
    'MemcachedClientConfigSettings.Strategy',
    'ElastiCache',
  ),
  createSetting(
    'test#us-west-2#deployment-d7d6a10b6df09e2716840e2ced173f2e0b23ca5c',
    'ServerConfig.BatchSize',
    '50',
  ),
  createSetting(
    'test#us-west-2#deployment-d7d6a10b6df09e2716840e2ced173f2e0b23ca5c',
    'ServerConfig.CommandTimeout',
    '120',
  ),
  createSetting(
    'test#us-west-2#deployment-d7d6a10b6df09e2716840e2ced173f2e0b23ca5c',
    'ServerConfig.ConnectionProvider',
    'NHibernate.Connection.UserSuppliedConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#deployment-d7d6a10b6df09e2716840e2ced173f2e0b23ca5c',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting(
    'test#us-west-2#deployment-d7d6a10b6df09e2716840e2ced173f2e0b23ca5c',
    'ServerConfig.GenerateStatistics',
    'false',
  ),
  createSetting(
    'test#us-west-2#deployment-d7d6a10b6df09e2716840e2ced173f2e0b23ca5c',
    'ServerConfig.PrepareSql',
    'true',
  ),
  createSetting(
    'test#us-west-2#deployment-d7d6a10b6df09e2716840e2ced173f2e0b23ca5c',
    'ServerConfig.ShowSql',
    'false',
  ),
  createSetting('test#us-west-2#build-13139', 'ServerConfig.AttachmentStorageOptions', 'AmazonS3'),
  createSetting('test#us-west-2#build-13139', 'ServerConfig.AvatarStorageOptions', 'AmazonS3'),
  createSetting('test#us-west-2#build-13139', 'ServerConfig.BatchSize', '50'),
  createSetting('test#us-west-2#build-13139', 'ServerConfig.CommandTimeout', '120'),
  createSetting(
    'test#us-west-2#build-13139',
    'ServerConfig.ConnectionProvider',
    'NHibernate.Connection.UserSuppliedConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#build-13139',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting('test#us-west-2#build-13139', 'ServerConfig.EmailStorageOptions', 'AmazonS3'),
  createSetting('test#us-west-2#build-13139', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting('test#us-west-2#build-13139', 'ServerConfig.PrepareSql', 'true'),
  createSetting(
    'test#us-west-2#build-13139',
    'ServerConfig.SearchStrategyOptions',
    'CombAmazonCloudSearch',
  ),
  createSetting('test#us-west-2#build-13139', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#build-13139', 'ServerConfig.TempFolder', '{dataroot}\temp'),
  createSetting('test#us-west-2#deployment-23c522f', 'MemcachedClientConfigSettings.Port', '11211'),
  createSetting(
    'test#us-west-2#deployment-23c522f',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting(
    'test#us-west-2#deployment-23c522f',
    'MemcachedClientConfigSettings.Strategy',
    'ElastiCache',
  ),
  createSetting('test#us-west-2#deployment-23c522f', 'ServerConfig.BatchSize', '50'),
  createSetting('test#us-west-2#deployment-23c522f', 'ServerConfig.CommandTimeout', '120'),
  createSetting(
    'test#us-west-2#deployment-23c522f',
    'ServerConfig.ConnectionProvider',
    'NHibernate.Connection.UserSuppliedConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#deployment-23c522f',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting('test#us-west-2#deployment-23c522f', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting('test#us-west-2#deployment-23c522f', 'ServerConfig.PrepareSql', 'true'),
  createSetting('test#us-west-2#deployment-23c522f', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#devsvc', 'ServerConfig.AttachmentStorageOptions', 'AmazonS3'),
  createSetting('test#us-west-2#devsvc', 'ServerConfig.AvatarStorageOptions', 'AmazonS3'),
  createSetting(
    'test#us-west-2#devsvc',
    'ServerConfig.CacheProvider',
    'NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache',
  ),
  createSetting('test#us-west-2#devsvc', 'ServerConfig.CommandTimeout', '120'),
  createSetting('test#us-west-2#devsvc', 'ServerConfig.DbEngine', 'MySql'),
  createSetting(
    'test#us-west-2#devsvc',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting(
    'test#us-west-2#devsvc',
    'ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds',
    '120',
  ),
  createSetting(
    'test#us-west-2#devsvc',
    'ServerConfig.EmailParserLambdaMaxMessagesPerRequest',
    '10',
  ),
  createSetting('test#us-west-2#devsvc', 'ServerConfig.EmailParserLambdaSnsTopic', ''),
  createSetting(
    'test#us-west-2#devsvc',
    'ServerConfig.EmailParserLambdaSqsQueue',
    'xxx',
  ),
  createSetting('test#us-west-2#devsvc', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting(
    'test#us-west-2#devsvc',
    'ServerConfig.NonMultiTenantConnectionString',
    'CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};',
  ),
  createSetting('test#us-west-2#devsvc', 'ServerConfig.NonMultiTenantInstance', '{instance}'),
  createSetting('test#us-west-2#devsvc', 'ServerConfig.PrepareSql', 'true'),
  createSetting(
    'test#us-west-2#devsvc',
    'ServerConfig.Provider',
    'NHibernate.Connection.DriverConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#devsvc',
    'ServerConfig.ReportInstallationLocation',
    '{dataroot}/report',
  ),
  createSetting(
    'test#us-west-2#devsvc',
    'ServerConfig.SearchStrategyOptions',
    'CombAmazonCloudSearch',
  ),
  createSetting('test#us-west-2#devsvc', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#devsvc', 'ServerConfig.TempFolder', '{dataroot}\temp'),
  createSetting('test#us-west-2#deployment-084a6ee', 'MemcachedClientConfigSettings.Port', '11211'),
  createSetting(
    'test#us-west-2#deployment-084a6ee',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting(
    'test#us-west-2#deployment-084a6ee',
    'MemcachedClientConfigSettings.Strategy',
    'ElastiCache',
  ),
  createSetting('test#us-west-2#deployment-084a6ee', 'ServerConfig.BatchSize', '50'),
  createSetting('test#us-west-2#deployment-084a6ee', 'ServerConfig.CommandTimeout', '120'),
  createSetting(
    'test#us-west-2#deployment-084a6ee',
    'ServerConfig.ConnectionProvider',
    'NHibernate.Connection.UserSuppliedConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#deployment-084a6ee',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting('test#us-west-2#deployment-084a6ee', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting('test#us-west-2#deployment-084a6ee', 'ServerConfig.PrepareSql', 'true'),
  createSetting('test#us-west-2#deployment-084a6ee', 'ServerConfig.ShowSql', 'false'),
  createSetting(
    'test#us-west-2#qa3',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting('test#us-west-2#qa3', 'MemcachedClientConfigSettings.Strategy', 'ElastiCache'),
  createSetting('test#us-west-2#qa3', 'ServerConfig.AttachmentStorageOptions', 'AmazonS3'),
  createSetting('test#us-west-2#qa3', 'ServerConfig.AvatarStorageOptions', 'AmazonS3'),
  createSetting(
    'test#us-west-2#qa3',
    'ServerConfig.CacheProvider',
    'NHibernate.Caches.SysCache.SysCacheProvider, NHibernate.Caches.SysCache',
  ),
  createSetting('test#us-west-2#qa3', 'ServerConfig.CommandTimeout', '120'),
  createSetting('test#us-west-2#qa3', 'ServerConfig.DbEngine', 'MySql'),
  createSetting(
    'test#us-west-2#qa3',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting(
    'test#us-west-2#qa3',
    'ServerConfig.EmailParserLambdaContainerCacheDurationInSeconds',
    '120',
  ),
  createSetting('test#us-west-2#qa3', 'ServerConfig.EmailParserLambdaMaxMessagesPerRequest', '10'),
  createSetting('test#us-west-2#qa3', 'ServerConfig.EmailParserLambdaSnsTopic', ''),
  createSetting(
    'test#us-west-2#qa3',
    'ServerConfig.EmailParserLambdaSqsQueue',
    'xxx',
  ),
  createSetting('test#us-west-2#qa3', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting(
    'test#us-west-2#qa3',
    'ServerConfig.NonMultiTenantConnectionString',
    'CharSet=utf8mb4;SslMode=Required;Server={dbserver};Database={dbname};Uid={dbuser};Pwd={dbpassword};',
  ),
  createSetting('test#us-west-2#qa3', 'ServerConfig.NonMultiTenantInstance', '{instance}'),
  createSetting('test#us-west-2#qa3', 'ServerConfig.PrepareSql', 'true'),
  createSetting(
    'test#us-west-2#qa3',
    'ServerConfig.Provider',
    'NHibernate.Connection.DriverConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#qa3',
    'ServerConfig.ReportInstallationLocation',
    '{dataroot}/report',
  ),
  createSetting(
    'test#us-west-2#qa3',
    'ServerConfig.SearchStrategyOptions',
    'CombAmazonCloudSearch',
  ),
  createSetting('test#us-west-2#qa3', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#qa3', 'ServerConfig.TempFolder', '{dataroot}\temp'),
  createSetting('test#us-west-2#deployment-0442cdb', 'MemcachedClientConfigSettings.Port', '11211'),
  createSetting(
    'test#us-west-2#deployment-0442cdb',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting(
    'test#us-west-2#deployment-0442cdb',
    'MemcachedClientConfigSettings.Strategy',
    'ElastiCache',
  ),
  createSetting('test#us-west-2#deployment-0442cdb', 'ServerConfig.BatchSize', '50'),
  createSetting('test#us-west-2#deployment-0442cdb', 'ServerConfig.CommandTimeout', '120'),
  createSetting(
    'test#us-west-2#deployment-0442cdb',
    'ServerConfig.ConnectionProvider',
    'NHibernate.Connection.UserSuppliedConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#deployment-0442cdb',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting('test#us-west-2#deployment-0442cdb', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting('test#us-west-2#deployment-0442cdb', 'ServerConfig.PrepareSql', 'true'),
  createSetting('test#us-west-2#deployment-0442cdb', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#deployment-b6eab09', 'MemcachedClientConfigSettings.Port', '11211'),
  createSetting(
    'test#us-west-2#deployment-b6eab09',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting(
    'test#us-west-2#deployment-b6eab09',
    'MemcachedClientConfigSettings.Strategy',
    'ElastiCache',
  ),
  createSetting('test#us-west-2#deployment-b6eab09', 'ServerConfig.BatchSize', '50'),
  createSetting('test#us-west-2#deployment-b6eab09', 'ServerConfig.CommandTimeout', '120'),
  createSetting(
    'test#us-west-2#deployment-b6eab09',
    'ServerConfig.ConnectionProvider',
    'NHibernate.Connection.UserSuppliedConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#deployment-b6eab09',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting('test#us-west-2#deployment-b6eab09', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting('test#us-west-2#deployment-b6eab09', 'ServerConfig.PrepareSql', 'true'),
  createSetting('test#us-west-2#deployment-b6eab09', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#deployment-e053747', 'MemcachedClientConfigSettings.Port', '11211'),
  createSetting(
    'test#us-west-2#deployment-e053747',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting(
    'test#us-west-2#deployment-e053747',
    'MemcachedClientConfigSettings.Strategy',
    'ElastiCache',
  ),
  createSetting('test#us-west-2#deployment-e053747', 'ServerConfig.BatchSize', '50'),
  createSetting('test#us-west-2#deployment-e053747', 'ServerConfig.CommandTimeout', '120'),
  createSetting(
    'test#us-west-2#deployment-e053747',
    'ServerConfig.ConnectionProvider',
    'NHibernate.Connection.UserSuppliedConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#deployment-e053747',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting('test#us-west-2#deployment-e053747', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting('test#us-west-2#deployment-e053747', 'ServerConfig.PrepareSql', 'true'),
  createSetting('test#us-west-2#deployment-e053747', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#branch-master', 'MemcachedClientConfigSettings.Port', '11211'),
  createSetting(
    'test#us-west-2#branch-master',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting(
    'test#us-west-2#branch-master',
    'MemcachedClientConfigSettings.Strategy',
    'ElastiCache',
  ),
  createSetting('test#us-west-2#branch-master', 'ServerConfig.BatchSize', '50'),
  createSetting('test#us-west-2#branch-master', 'ServerConfig.CommandTimeout', '120'),
  createSetting(
    'test#us-west-2#branch-master',
    'ServerConfig.ConnectionProvider',
    'NHibernate.Connection.UserSuppliedConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#branch-master',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting('test#us-west-2#branch-master', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting('test#us-west-2#branch-master', 'ServerConfig.PrepareSql', 'true'),
  createSetting('test#us-west-2#branch-master', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#branch-master', 'Update', 'true'),
  createSetting('test#us-west-2#deployment-135f5d4', 'MemcachedClientConfigSettings.Port', '11211'),
  createSetting(
    'test#us-west-2#deployment-135f5d4',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting(
    'test#us-west-2#deployment-135f5d4',
    'MemcachedClientConfigSettings.Strategy',
    'ElastiCache',
  ),
  createSetting('test#us-west-2#deployment-135f5d4', 'ServerConfig.BatchSize', '50'),
  createSetting('test#us-west-2#deployment-135f5d4', 'ServerConfig.CommandTimeout', '120'),
  createSetting(
    'test#us-west-2#deployment-135f5d4',
    'ServerConfig.ConnectionProvider',
    'NHibernate.Connection.UserSuppliedConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#deployment-135f5d4',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting('test#us-west-2#deployment-135f5d4', 'ServerConfig.GenerateStatistics', 'false'),
  createSetting('test#us-west-2#deployment-135f5d4', 'ServerConfig.PrepareSql', 'true'),
  createSetting('test#us-west-2#deployment-135f5d4', 'ServerConfig.ShowSql', 'false'),
  createSetting('test#us-west-2#branch-current', 'MemcachedClientConfigSettings.Port', '11211'),
  createSetting(
    'test#us-west-2#branch-current',
    'MemcachedClientConfigSettings.Server',
    'xxx',
  ),
  createSetting(
    'test#us-west-2#branch-current',
    'MemcachedClientConfigSettings.Strategy',
    'ElastiCache',
  ),
  createSetting('test#us-west-2#branch-current', 'ServerConfig.BatchSize', '50'),
  createSetting('test#us-west-2#branch-current', 'ServerConfig.CommandTimeout', '120'),
  createSetting(
    'test#us-west-2#branch-current',
    'ServerConfig.ConnectionProvider',
    'NHibernate.Connection.UserSuppliedConnectionProvider',
  ),
  createSetting(
    'test#us-west-2#branch-current',
    'ServerConfig.Driver',
    'NHibernate.Driver.MySqlDataDriver, NHibernate',
  ),
  createSetting('test#us-west-2#branch-current', 'ServerConfig.GenerateStatistics', 'false'),
];

export const getSettings = () => {
  const nodes = mapSettingsToTree(insertIds(settings));
  return Promise.resolve(nodes);
};

export const addSetting = (newSetting: Setting) => {
  settings.push(newSetting);
  return Promise.resolve(newSetting);
};

export const updateSetting = (updatedSetting: Setting) => {
  const index = settings.findIndex(
    (s) => s.path === updatedSetting.path && s.key === updatedSetting.key,
  );
  if (index !== -1) {
    settings[index] = updatedSetting;
  }
  return Promise.resolve(updatedSetting);
};

export const deleteSetting = (path: string, key: string) => {
  const index = settings.findIndex((s) => s.path === path && s.key === key);
  if (index !== -1) {
    settings.splice(index, 1);
  }
  return Promise.resolve({ path });
};
