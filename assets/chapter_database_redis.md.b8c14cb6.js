import{_ as t,o as r,c as d,U as e}from"./chunks/framework.e57fd21b.js";const k=JSON.parse('{"title":"REDIS","description":"","frontmatter":{},"headers":[],"relativePath":"chapter/database/redis.md","filePath":"chapter/database/redis.md"}'),a={name:"chapter/database/redis.md"},o=e('<h1 id="redis" tabindex="-1">REDIS <a class="header-anchor" href="#redis" aria-label="Permalink to &quot;REDIS&quot;">​</a></h1><h4 id="数据类型" tabindex="-1">数据类型 <a class="header-anchor" href="#数据类型" aria-label="Permalink to &quot;数据类型&quot;">​</a></h4><table><thead><tr><th>String</th><th>Hash</th><th>List</th><th>Set</th><th>Sorted Set</th></tr></thead><tbody><tr><td>最常见的类型，缓存、自增、分布锁</td><td>相当于存储了一个对象，属性不能重复</td><td>有序集合，可分别在头尾插入弹出，可作队列或栈</td><td>无序集合，自动去重</td><td>有序的set，多一个score用于排序</td></tr></tbody></table><h4 id="过期策略" tabindex="-1">过期策略 <a class="header-anchor" href="#过期策略" aria-label="Permalink to &quot;过期策略&quot;">​</a></h4><table><thead><tr><th>类型</th><th>特点</th></tr></thead><tbody><tr><td><strong>立即删除</strong></td><td>一旦key过期，就会删除。CPU压力会比较大</td></tr><tr><td><strong>惰性删除</strong></td><td>key被访问时，如果过期了，才会被删除。<br>很多已过期的数据会存在，内存压力大</td></tr><tr><td><strong>定期删除</strong></td><td>每隔一段时间随机抽取key，检查并删除。<br>可能会导致有些key已过期但未删除</td></tr></tbody></table><h4 id="淘汰策略" tabindex="-1">淘汰策略 <a class="header-anchor" href="#淘汰策略" aria-label="Permalink to &quot;淘汰策略&quot;">​</a></h4><table><thead><tr><th>类型</th><th>含义</th></tr></thead><tbody><tr><td><strong>noeviction</strong></td><td>内存不足时，返回错误</td></tr><tr><td><strong>allkeys-lru</strong></td><td>删除最近最少访问的key，针对<strong>所有</strong>key</td></tr><tr><td><strong>volatile-lru</strong></td><td>删除最近最少访问的key，针对<strong>有过期时间</strong>key</td></tr><tr><td><strong>allkeys-lfu</strong></td><td>删除最近频繁访问的key，针对<strong>所有</strong>key</td></tr><tr><td><strong>volatile-lfu</strong></td><td>删除最近频繁访问的key，针对<strong>有过期时间</strong>key</td></tr><tr><td><strong>allkeys-random</strong></td><td>随机删除的key，针对<strong>所有</strong>key</td></tr><tr><td><strong>volatile-random</strong></td><td>随机删除的key，针对<strong>有过期时间</strong>key</td></tr><tr><td><strong>volatile-ttl</strong></td><td>删除过期的key，并优先选择ttl较小的</td></tr></tbody></table><h4 id="高级用法" tabindex="-1">高级用法 <a class="header-anchor" href="#高级用法" aria-label="Permalink to &quot;高级用法&quot;">​</a></h4><table><thead><tr><th>名称</th><th>用途</th></tr></thead><tbody><tr><td><strong>Bitmap</strong></td><td>可设置某一bit位的状态，可用于统计简单的是/非信息，例如签到、在线统计。</td></tr><tr><td><strong>HyperLogLog</strong></td><td>大数据去重统计，不太准确，可用于统计网站UV等准确度要求不高的数据。</td></tr><tr><td><strong>Geospatial</strong></td><td>地理相关，坐标，距离，面积等等。</td></tr><tr><td><strong>pub/sub</strong></td><td>发布、订阅功能，可用作简单的消息队列。</td></tr><tr><td><strong>Pipeline</strong></td><td>批量执行一组命令，统一返回。</td></tr><tr><td><strong>Lua</strong></td><td>定义脚本，批量执行多个命令。</td></tr><tr><td><strong>持久化</strong></td><td><strong>RDB</strong>快照 <strong>AOF</strong>追加日志</td></tr></tbody></table><h4 id="知识点" tabindex="-1">知识点 <a class="header-anchor" href="#知识点" aria-label="Permalink to &quot;知识点&quot;">​</a></h4><ol><li>二次set同一个key，而未设置过期时间，则会移除该key的过期时间</li><li>del在删除String类型的key时，复杂度为O(1)。而在删除集合类型的key时，复杂度为O(m) , m为集合的元素数量</li></ol>',11),s=[o];function n(h,l,i,g,b,c){return r(),d("div",null,s)}const _=t(a,[["render",n]]);export{k as __pageData,_ as default};