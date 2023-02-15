import{_ as t,c as d,o as a,b as e}from"./app.80aae63d.js";const m=JSON.parse('{"title":"MYSQL","description":"","frontmatter":{},"headers":[],"relativePath":"chapter/database/mysql.md"}'),r={name:"chapter/database/mysql.md"},h=e('<h1 id="mysql" tabindex="-1">MYSQL <a class="header-anchor" href="#mysql" aria-hidden="true">#</a></h1><h4 id="引擎" tabindex="-1">引擎 <a class="header-anchor" href="#引擎" aria-hidden="true">#</a></h4><table><thead><tr><th>名称</th><th>特点</th><th>事务外键</th><th>锁粒度</th><th>并发性</th><th>用途</th></tr></thead><tbody><tr><td>InnoDB</td><td>5.1之前</td><td>不支持</td><td>表级锁<br>加锁比较快，锁冲突比较少，不太容易发生死锁的情况</td><td>差</td><td>查询多，改动少。数据完整性要求不高</td></tr><tr><td>MyISAM</td><td>5.1之后</td><td>支持</td><td>行级锁<br>会发生死锁的情况</td><td>好</td><td>用到主外键，要求并发，完整性要求高</td></tr></tbody></table><h4 id="索引" tabindex="-1">索引 <a class="header-anchor" href="#索引" aria-hidden="true">#</a></h4><table><thead><tr><th>类型</th><th>特点</th></tr></thead><tbody><tr><td>全局索引FULLTEXT</td><td>只有 MyISAM 引擎支持全局索引，它的出现是为了解决针对文本的模糊查询效率较低的问题，并且只限于 CHAR、VARCHAR 和 TEXT 列</td></tr><tr><td>HASH索引</td><td>适用于单个键快速查找，但是对于范围查询，性能会较低</td></tr><tr><td>B-Tree索引</td><td>相对高效查询，单个以及范围，B表示平衡</td></tr><tr><td>R-Tree索引</td><td>比较少使用，特别适合返回查询</td></tr></tbody></table><h4 id="聚簇索引" tabindex="-1">聚簇索引 <a class="header-anchor" href="#聚簇索引" aria-hidden="true">#</a></h4><ol><li>是一种数据存储方式，而不是类型。</li><li>“聚簇”标识数据行和相邻的键值储存在一起。</li><li>一个表只能有一个聚簇索引。InnoDb通常是主键，无主键则用非空唯一索引，无索引则隐式定义一个主键。</li><li>二级索引查找主键值，在用主键值在聚簇索引中查找实际的行数据。</li></ol><h4 id="多版本并发控制mvcc" tabindex="-1">多版本并发控制MVCC <a class="header-anchor" href="#多版本并发控制mvcc" aria-hidden="true">#</a></h4><p>保存每条记录的两个隐藏列：创建标志、过期标志，或者说是系统版本号。每开始一个事务，版本号递增。事务开始时的版本号作为当前事务版本号。</p><p>插入数据时，当前版本号保存至开始标志。</p><p>更新数据时，相当于插入一条新纪录，并将当前版本号保存至开始标志，将原纪录标记为删除，并将新纪录的开始标志保存至过期标志。</p><p>删除数据时，当前版本号保存至过期标志。</p><p>在REPEATABLE READ隔离级别下，所有查询的数据必须满足两条件:</p><ol><li>创建标志小于等于当前版本号，即事务开始前已存在的数据或本事务创建的数据</li><li>过期标志大于当前版本号或未定义，保证当前事务开始时，数据未被删除</li></ol><p><strong>MVCC只适用于读已提交（Read committed）和可重复读（Repeatable Read），读未提交只取最新数据，串行化会对所有读取的行加锁。</strong></p><h4 id="知识点" tabindex="-1">知识点 <a class="header-anchor" href="#知识点" aria-hidden="true">#</a></h4><ol><li>or和in在性能上并不等价，in会先将列表内的数据进行排序，如果字段命中索引，则进行二分查找来确定是否满足条件，复杂度为O(log n)。而单纯的or则是挨个比较，复杂度为O(n)。所以，如果大量比较的时候，用in比较合适。</li><li>coalesce(a,b,c);a,b,c以此判断null，返回第一个不为null的值。</li><li>GROUP BY xx WITH ROLLUP，分组后再次汇总，类似于excel底部求和。</li><li>InnoDB目前处理死锁的方法是，将持有最少行级排他锁的事务进行回滚</li><li>预写式日志(Write-Ahead Logging)，先修改数据的内存拷贝，再把修改行为记录到事务日志中，后台再慢慢刷回到磁盘。</li></ol>',17),i=[h];function l(n,o,c,s,_,p){return a(),d("div",null,i)}const T=t(r,[["render",l]]);export{m as __pageData,T as default};
