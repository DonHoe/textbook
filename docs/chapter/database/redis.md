# REDIS


#### 数据类型

| String                           | Hash                               | List                                         | Set                | Sorted Set                     |
| -------------------------------- | ---------------------------------- | -------------------------------------------- | ------------------ | ------------------------------ |
| 最常见的类型，缓存、自增、分布锁 | 相当于存储了一个对象，属性不能重复 | 有序集合，可分别在头尾插入弹出，可作队列或栈 | 无序集合，自动去重 | 有序的set，多一个score用于排序 |

#### 过期策略

| 类型 | 特点 |
| ---- | ---- |
| **立即删除** | 一旦key过期，就会删除。CPU压力会比较大 |
| **惰性删除** | key被访问时，如果过期了，才会被删除。<br>很多已过期的数据会存在，内存压力大 |
| **定期删除** | 每隔一段时间随机抽取key，检查并删除。<br>可能会导致有些key已过期但未删除 |

#### 淘汰策略

| 类型 | 含义 |
| -------------- | ------------------------ |
| **noeviction** | 内存不足时，返回错误 |
| **allkeys-lru** | 删除最近最少访问的key，针对**所有**key |
| **volatile-lru** | 删除最近最少访问的key，针对**有过期时间**key |
| **allkeys-lfu** | 删除最近频繁访问的key，针对**所有**key |
| **volatile-lfu** | 删除最近频繁访问的key，针对**有过期时间**key |
| **allkeys-random** | 随机删除的key，针对**所有**key |
| **volatile-random** | 随机删除的key，针对**有过期时间**key |
| **volatile-ttl** | 删除过期的key，并优先选择ttl较小的 |

#### 高级用法

| 名称            | 用途                                                         |
| --------------- | ------------------------------------------------------------ |
| **Bitmap**      | 可设置某一bit位的状态，可用于统计简单的是/非信息，例如签到、在线统计。 |
| **HyperLogLog** | 大数据去重统计，不太准确，可用于统计网站UV等准确度要求不高的数据。 |
| **Geospatial**  | 地理相关，坐标，距离，面积等等。                             |
| **pub/sub**     | 发布、订阅功能，可用作简单的消息队列。                       |
| **Pipeline**    | 批量执行一组命令，统一返回。                                 |
| **Lua**         | 定义脚本，批量执行多个命令。                                 |
| **持久化**      | **RDB**快照 **AOF**追加日志                                  |



#### 知识点

1.  二次set同一个key，而未设置过期时间，则会移除该key的过期时间
2. del在删除String类型的key时，复杂度为O(1)。而在删除集合类型的key时，复杂度为O(m) , m为集合的元素数量