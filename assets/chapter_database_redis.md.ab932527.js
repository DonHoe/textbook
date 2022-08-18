import{_ as t,c as r,o as d,b as e}from"./app.0a99139c.js";const y=JSON.parse('{"title":"REDIS","description":"","frontmatter":{},"headers":[],"relativePath":"chapter/database/redis.md"}'),a={name:"chapter/database/redis.md"},o=e('<h1 id="redis" tabindex="-1">REDIS <a class="header-anchor" href="#redis" aria-hidden="true">#</a></h1><h4 id="\u6570\u636E\u7C7B\u578B" tabindex="-1">\u6570\u636E\u7C7B\u578B <a class="header-anchor" href="#\u6570\u636E\u7C7B\u578B" aria-hidden="true">#</a></h4><table><thead><tr><th>String</th><th>Hash</th><th>List</th><th>Set</th><th>Sorted Set</th></tr></thead><tbody><tr><td>\u6700\u5E38\u89C1\u7684\u7C7B\u578B\uFF0C\u7F13\u5B58\u3001\u81EA\u589E\u3001\u5206\u5E03\u9501</td><td>\u76F8\u5F53\u4E8E\u5B58\u50A8\u4E86\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u5C5E\u6027\u4E0D\u80FD\u91CD\u590D</td><td>\u6709\u5E8F\u96C6\u5408\uFF0C\u53EF\u5206\u522B\u5728\u5934\u5C3E\u63D2\u5165\u5F39\u51FA\uFF0C\u53EF\u4F5C\u961F\u5217\u6216\u6808</td><td>\u65E0\u5E8F\u96C6\u5408\uFF0C\u81EA\u52A8\u53BB\u91CD</td><td>\u6709\u5E8F\u7684set\uFF0C\u591A\u4E00\u4E2Ascore\u7528\u4E8E\u6392\u5E8F</td></tr></tbody></table><h4 id="\u6DD8\u6C70\u7B56\u7565" tabindex="-1">\u6DD8\u6C70\u7B56\u7565 <a class="header-anchor" href="#\u6DD8\u6C70\u7B56\u7565" aria-hidden="true">#</a></h4><table><thead><tr><th>\u7C7B\u578B</th><th>\u542B\u4E49</th></tr></thead><tbody><tr><td><strong>noeviction</strong></td><td>\u5185\u5B58\u4E0D\u8DB3\u65F6\uFF0C\u8FD4\u56DE\u9519\u8BEF</td></tr><tr><td><strong>allkeys-lru</strong></td><td>\u5220\u9664\u6700\u8FD1\u6700\u5C11\u8BBF\u95EE\u7684key\uFF0C\u9488\u5BF9<strong>\u6240\u6709</strong>key</td></tr><tr><td><strong>volatile-lru</strong></td><td>\u5220\u9664\u6700\u8FD1\u6700\u5C11\u8BBF\u95EE\u7684key\uFF0C\u9488\u5BF9<strong>\u8FC7\u671F</strong>key</td></tr><tr><td><strong>allkeys-random</strong></td><td>\u968F\u673A\u5220\u9664\u7684key\uFF0C\u9488\u5BF9<strong>\u6240\u6709</strong>key</td></tr><tr><td><strong>volatile-random</strong></td><td>\u968F\u673A\u5220\u9664\u7684key\uFF0C\u9488\u5BF9<strong>\u8FC7\u671F</strong>key</td></tr><tr><td><strong>volatile-ttl</strong></td><td>\u5220\u9664\u8FC7\u671F\u7684key\uFF0C\u5E76\u4F18\u5148\u9009\u62E9ttl\u8F83\u5C0F\u7684</td></tr></tbody></table><h4 id="\u9AD8\u7EA7\u7528\u6CD5" tabindex="-1">\u9AD8\u7EA7\u7528\u6CD5 <a class="header-anchor" href="#\u9AD8\u7EA7\u7528\u6CD5" aria-hidden="true">#</a></h4><table><thead><tr><th>\u540D\u79F0</th><th>\u7528\u9014</th></tr></thead><tbody><tr><td><strong>Bitmap</strong></td><td>\u53EF\u8BBE\u7F6E\u67D0\u4E00bit\u4F4D\u7684\u72B6\u6001\uFF0C\u53EF\u7528\u4E8E\u7EDF\u8BA1\u7B80\u5355\u7684\u662F/\u975E\u4FE1\u606F\uFF0C\u4F8B\u5982\u7B7E\u5230\u3001\u5728\u7EBF\u7EDF\u8BA1\u3002</td></tr><tr><td><strong>HyperLogLog</strong></td><td>\u5927\u6570\u636E\u53BB\u91CD\u7EDF\u8BA1\uFF0C\u4E0D\u592A\u51C6\u786E\uFF0C\u53EF\u7528\u4E8E\u7EDF\u8BA1\u7F51\u7AD9UV\u7B49\u51C6\u786E\u5EA6\u8981\u6C42\u4E0D\u9AD8\u7684\u6570\u636E\u3002</td></tr><tr><td><strong>Geospatial</strong></td><td>\u5730\u7406\u76F8\u5173\uFF0C\u5750\u6807\uFF0C\u8DDD\u79BB\uFF0C\u9762\u79EF\u7B49\u7B49\u3002</td></tr><tr><td><strong>pub/sub</strong></td><td>\u53D1\u5E03\u3001\u8BA2\u9605\u529F\u80FD\uFF0C\u53EF\u7528\u4F5C\u7B80\u5355\u7684\u6D88\u606F\u961F\u5217\u3002</td></tr><tr><td><strong>Pipeline</strong></td><td>\u6279\u91CF\u6267\u884C\u4E00\u7EC4\u547D\u4EE4\uFF0C\u7EDF\u4E00\u8FD4\u56DE\u3002</td></tr><tr><td><strong>Lua</strong></td><td>\u5B9A\u4E49\u811A\u672C\uFF0C\u6279\u91CF\u6267\u884C\u591A\u4E2A\u547D\u4EE4\u3002</td></tr><tr><td><strong>\u6301\u4E45\u5316</strong></td><td><strong>RDB</strong>\u5FEB\u7167 <strong>AOF</strong>\u8FFD\u52A0\u65E5\u5FD7</td></tr></tbody></table><h4 id="\u77E5\u8BC6\u70B9" tabindex="-1">\u77E5\u8BC6\u70B9 <a class="header-anchor" href="#\u77E5\u8BC6\u70B9" aria-hidden="true">#</a></h4><ol><li>\u4E8C\u6B21set\u540C\u4E00\u4E2Akey\uFF0C\u800C\u672A\u8BBE\u7F6E\u8FC7\u671F\u65F6\u95F4\uFF0C\u5219\u4F1A\u79FB\u9664\u8BE5key\u7684\u8FC7\u671F\u65F6\u95F4</li><li>del\u5728\u5220\u9664String\u7C7B\u578B\u7684key\u65F6\uFF0C\u590D\u6742\u5EA6\u4E3AO(1)\u3002\u800C\u5728\u5220\u9664\u96C6\u5408\u7C7B\u578B\u7684key\u65F6\uFF0C\u590D\u6742\u5EA6\u4E3AO(m) , m\u4E3A\u96C6\u5408\u7684\u5143\u7D20\u6570\u91CF</li></ol>',9),s=[o];function n(h,i,g,l,c,_){return d(),r("div",null,s)}const p=t(a,[["render",n]]);export{y as __pageData,p as default};
