## LogQL: Log Query Language

LogQL是受到PromQL启发的查询语言，使用Label与操作符进行日志过滤。

LogQL 查询有两种类型:

- 直接返回日志行内容
- 基于上述查询结果，重新计算后返回数据

## 日志查询语句

所有的LogQL查询语句包含一个日志流式选择器(log stream selector),包含一下四个部分:

- 解析器表达式(parser expression)
- label过滤表达式(label filter expression)
- 日志行格式表达式(line format expression)
- label格式表达式(labels format expression)

过滤器操作符:

- |=    包含
- !=      不包含
- |~     正则匹配
- !~       正则不匹配

日志流选择器决定了多少日志流(日志内容的唯一源，就像文件)会被查询到，所以颗粒度细的日志流选择器可以减少在操作空间内的搜索次数。这意味着查询器中的label会表现出高效的查询效率。

当然，日志查询流后面可以跟着一个日志处理管道。把一系列的表达式串行起来应用到日志流上。每一个都可以过滤、解析、或者改变各自的日志行和label。

下面展示了一个实践中的完整日志查询案例:

```
{container="query-frontend",namespace="loki-dev"} |= "metrics.go" | logfmt | duration > 10s and throughput_mb < 500
```

这个查询由以下几个部分组成:

- 一个日志流选择器`{container="query-frontend",namespace="loki-dev"}`，标志着筛选两个label的值下的日志，container为`query-frontend`，namespace为`loki-dev`。
- 一个日志处理管道，`|= "metrics.go" | logfmt | duration > 10s and throughput_mb < 500`，过滤出内容包含`metrics.go`的日志，然后解析每个日志行并提取出额外的label以便对其继续过滤

### 日志流选择器(Log Stream Selector)

流选择器决定哪些日志流会被包含到查询结果中。选择器由一个或多个逗号分隔的键值对组成。每一个key是一个日志label，value为其对应的值。并被`{`和`}`包裹。

流选择器示例:

```
{app="mysql",name="mysql-backup"}
```

所有日志流中，label同时满足`app`==`mysql`和`name`==`mysql-backup`的结果将被查询出来。流中可能包含其他的label和值，但只要同时满足前面的条件，就会被包含进查询结果中。

这个规则在 Prometheus Label Selectors 和 Loki log stream selectors 是相同的。

`=`是完全匹配操作符，一共支持以下四种操作符:

- 完全相等  `=`  
- 不相等    `!=`
- 正则匹配   `=~`
- 正则不匹配 `!~`

正则案例:

- `{name =~ "mysql.+"}`
- `{name !~ "mysql.+"}`
- `{name !~ `mysql-\d+`}`

**注意:** 正则操作符`=~` 是贪心的，这意味着正则会匹配整条字符串。 正则符 `.` 默认是不会匹配换行符的，也就新行数据不会匹配到。如果想用正则匹配新的一行，可以使用单行标志，像这样: `(?s)search_term.+` 匹配`search_term\n`。

### 日志处理管道(Log Pipeline)

一个日志处理管道可以跟在流选择器后面，以进一步处理和过滤日志流。通常包含一个或者多个表达式，每个表达式会顺次处理每一个日志行。如果一个表达式过滤掉一行之后，管道会立刻停止，然后开始处理下一行。

一些表达式可以转换日志内容和相关的label，举个例子:

```
| line_format "{{.status_code}}"`)
```

一个日志处理管道包含以下几个表达式:

- [日志行过滤表达式(Line Filter Expression)](#line-filter-expression)
- [解析器表达式(Parser Expression)](#parser-expression)
- [Label过滤表达式(Label Filter Expression)](#label-filter-expression)
- [日志行格式化表达式(Line Format Expression)](#line-format-expression)
- [Label格式化表达式(Labels Format Expression)](#labels-format-expression)

#### <span id='line-filter-expression'>Line Filter Expression</span>

日志行过滤表达式像分布式grep指令一样，从日志流中收集日志。它查询日志行内容，抛弃那些不符合表达式(大小写敏感)的日志行。

每个日志行表达式都有一个过滤操作符且跟随着文本或者一段正则表达式，以下过滤操作是被支持的:

- `|=`: 包含
- `!=`: 不包含
- `|~`: 正则匹配
- `!~`: 正则不匹配

示例：

- 日志行包含"error"子字符串:

  ```
  |= "error"
  ```

  完整的查询示例:

  ```
  {job="mysql"} |= "error"
  ```

- 日志行不包含子字符串 “kafka.server:type=ReplicaManager”:

  ```
  != "kafka.server:type=ReplicaManager"
  ```

  完整的查询示例:

  ```
  {instance=~"kafka-[23]",name="kafka"} != "kafka.server:type=ReplicaManager"
  ```

- 日志行包含子字符串 `tsdb-ops` 并以 `io:2003`.结尾:

  ```
  {name="kafka"} |~ "tsdb-ops.*io:2003"
  ```

- 日志行包含这样的子字符串，以`error=`开头，后面跟随一个或多个字符:

  ```
  {name="cassandra"} |~  `error=\w+` 
  ```

  多个过滤操作可以串在一起，过滤操作会被依次应用。查询结果将满足每一个过滤操作。下面的示例将会返回满足下列条件的结果，包含字符串`error`且不包含`timeout`.

  ```logql
  {job="mysql"} |= "error" != "timeout"
  ```

  当使用 `|~` 和`!~`时，会使用GO语言的正则操作来实现。默认大小写敏感。如果要切换为大小写不敏感，在正则表达式开头加上`(?i)`

  虽然日志行表达式可以放在执行管道的任何地方，但是最好还是把它们放在一开始。放在开头有利于提升查询效率，因为时顺次执行的。举个例子，当查询结果是一样的时候，下面这个查询:

  ```
  {job="mysql"} |= "error" | json | line_format "{{.err}}"
  ```

  会比再下面这个查询快很多

  ```
  {job="mysql"} | json | line_format "{{.message}}" |= "error"
  ```

  流选择器执行完后，日志行过滤表达式就是最快的过滤方式。

#### <span id='parser-expression'>Parser Expression</span>

解析器表达式可以从日志内容中解析和提取label。这些提取出来的额外labels可以在接下来使用label过滤表达是和通用汇总。

提取出来的label的key会自动被所有的解析器处理，只能包含ASCII标准字符和数字，还有下划线和冒号。不能以数字开头。

示例， `| json` 将做下列映射:

```json
{ "a.b": {c: "d"}, e: "f" }
```

映射为

```
{a_b_c="d", e="f"}
```

为了防止出现错误，当日志行不在期望的格式时，日志行不能被过滤，但是会加入一个名为__error__新的label。

当新提取的label的name和原始日志流中的label重复了，提取的label会在key上面加一个_extracted后缀，以保证两个label的唯一性。你可以使用[Label过滤表达式(Label Filter Expression)](#label-filter-expression)强制重写原始label。不过，当提取key出现两次时，只有最后一个key会被保留。

Loki支持[JSON](#json), [logfmt](#logfmt), [pattern](#pattern), [regexp](#regexp) and [unpack](#unpack) 表达式

情况允许时，尽量使用预定义的`json`和`logfmt`解析器。当不满足需求时，`pattern` 和 `regexp` 解析器可以用于不常用结构的日志行。`pattern`解析器可以更简单快速地写入数据；也比`regex`解析器更好。多个解析器可以用在同一个日志处理管道。这对于处理复杂日志非常有用。

##### JSON

`josn`解析器有两种工作模式

1. 无参数:

   将`| json`加入处理管道，会将所有的json属性提取为label，前提时日志行是一个合法的json文档。嵌套的属性会以下划线分隔以作为label。

   **注意：数组会被跳过**

   示例，下面的json文档:

   ```json
   {
       "protocol": "HTTP/2.0",
       "servers": ["129.0.1.1","10.2.1.3"],
       "request": {
           "time": "6.032",
           "method": "GET",
           "host": "foo.grafana.net",
           "size": "55",
           "headers": {
             "Accept": "*/*",
             "User-Agent": "curl/7.68.0"
           }
       },
       "response": {
           "status": 401,
           "size": "228"
       }
   }
   ```

   会被解析成如下labels:

   ```
   "protocol" => "HTTP/2.0"
   "request_time" => "6.032"
   "request_method" => "GET"
   "request_host" => "foo.grafana.net"
   "request_size" => "55"
   "response_status" => "401"
   "response_size" => "228"
   ```
   
2. 带参数： 

    在处理管道中使用`| json label="expression", another="expression"`  则会仅提取指定的labels。

   你可以通过这种方式指定一个或者多个表达式，和[`label_format`](#labels-format-expression)一样，所有的表达式必须被引用到。

   目前，仅支持字段访问 (`my.field`, `my["field"]`) 和数组访问 (`list[0]`)，以及这两种的组合嵌套 (`my.list[0]["field"]`)。

   示例， `| json first_server="servers[0]", ua="request.headers[\"User-Agent\"]` 将会从下列文档中:

   ```json
   {
       "protocol": "HTTP/2.0",
       "servers": ["129.0.1.1","10.2.1.3"],
       "request": {
           "time": "6.032",
           "method": "GET",
           "host": "foo.grafana.net",
           "size": "55",
           "headers": {
             "Accept": "*/*",
             "User-Agent": "curl/7.68.0"
           }
       },
       "response": {
           "status": 401,
           "size": "228",
           "latency_seconds": "6.031"
       }
   }
   ```

   提取出如下labels:

   ```kv
   "first_server" => "129.0.1.1"
   "ua" => "curl/7.68.0"
   ```

#####  logfmt

 **logfmt** 解析器可以使用 `| logfmt` 来从 [logfmt](https://brandur.org/logfmt) 格式的日志行中提取labels

例如，下面的日志行内容：

```logfmt
at=info method=GET path=/ host=grafana.net fwd="124.133.124.161" service=8ms status=200
```

将被解析成如下的格式

```kv
"at" => "info"
"method" => "GET"
"path" => "/"
"host" => "grafana.net"
"fwd" => "124.133.124.161"
"service" => "8ms"
"status" => "200"
```

##### Pattern

**此匹配器处于测试阶段**

模式匹配器可以通过定义一个pattern表达式 (`| pattern "<pattern-expression>"`) 以便从日志行中显式提取字段。 表达式需符合日志行的结构。

下面是一个NGINX的日志内容：

```log
0.191.12.2 - - [10/Jun/2021:09:14:29 +0000] "GET /api/plugins/versioncheck HTTP/1.1" 200 2 "-" "Go-http-client/2.0" "13.76.247.102, 34.120.177.193" "TLSv1.2" "US" ""
```

此日志可以被如下的表达式解析：

```
<ip> - - <_> "<method> <uri> <_>" <status> <size> <_> "<agent>" <_>
```

并将提取到如下内容：

```kv
"ip" => "0.191.12.2"
"method" => "GET"
"uri" => "/api/plugins/versioncheck"
"status" => "200"
"size" => "2"
"agent" => "Go-http-client/2.0"
```

一个Pattern包含占位符和常量

占位符是一个被`<` 和 `>`包裹的字段命，`<example>` 就表示字段`example`。无需命名的占位符可以用 `<_>`来表示，并将跳过匹配的内容。

占位符将会在日志行的开头或者常量之前开始匹配，并将在日志行结束或者下一个常量前结束。一旦有一个占位符不匹配，pattern解析器将会停止。

常量是一系列的UTF-8字符，包括空格符。

pattern表达式默认是从日志行的开头开始匹配的。如果表达式以常量开头，那么日志内容的开头必须要有相同的常量。在表达式开头使用e`<_>` 可以是表达式从日志行的开头开始匹配。

以如下日志为例：

```log
level=debug ts=2021-06-10T09:24:13.472094048Z caller=logging.go:66 traceID=0568b66ad2d9294c msg="POST /loki/api/v1/push (204) 16.652862ms"
```

为了匹配 `msg="`，可以使用如下表达式

```pattern
<_> msg="<method> <path> (<status>) <latency>"
```

以下情况下的pattern表达式是不合法的：

- 未包含任何占位符
- 两个相邻的占位符未被空格分开

##### regexp

 logfmt 和json解析器会提取所有值而且没有参数。但是 **regexp** 解析器可以指定一个参数，并使用[Golang](https://golang.org/) [RE2 syntax](https://github.com/google/re2/wiki/Syntax)来执行表达式。

正则表达式必须包含至少一个命名的子匹配 (例如 `(?P<name>re)`)，每个子匹配被提取到不同的label。

正则解析器 `| regexp "(?P<method>\\w+) (?P<path>[\\w|/]+) \\((?P<status>\\d+?)\\) (?P<duration>.*)"` 会从下面的日志中

```log
POST /api/prom/api/v1/query_range (200) 1.5s
```

提取到如下labels：

```kv
"method" => "POST"
"path" => "/api/prom/api/v1/query_range"
"status" => "200"
"duration" => "1.5s"
```

##### unpack

`unpack` 解析器将会解析json格式的日志行， 并拆解所有的属性。 **一个特殊的属性 `_entry` 将会替换掉原始的日志内容**。

示例， 使用 `| unpack`会将如下的日志内容 

```json
{
  "container": "myapp",
  "pod": "pod-3223f",
  "_entry": "original log message"
}
```

提取出 `container` 和 `pod` l两个abels并且 `original log message` 会成为新的日志内容。

#### <span id="label-filter-expression">Label Filter Expression</span>

label过滤器表达式可以用原始的和提取出的label来过滤日志行。它包含多个判断式。

一个判断式包含一个label属性，一个操作符，还有一个用于匹配label的值。

判断式： `cluster="namespace"`中，cluster 是label的名称，操作符 `=` ，“namespace”就是要匹配的值。label名必须要在操作符的左边。

我们支持多种值类型，并且可以根据输入值进行推断：

- **String** 字符类型可以表示成这两种形式 `"200"` 或者 ``us-central1``。
- **Duration** 时间小大，可选择带上单位后缀，例如： “300ms”, “1.5h” or “2h45m”。合法的时间单位有： “ns”, “us” (or “µs”), “ms”, “s”, “m”, “h”
- **Number** 64位浮点数，例如：`250`, `89.923`
- **Bytes** 字节数大小，可选择带上单位后缀，例如： “42MB”, “1.5Kib” or “20b”。合法的字节单位包括： “b”, “kib”, “kb”, “mib”, “mb”, “gib”, “gb”, “tib”, “tb”, “pib”, “pb”, “eib”, “eb”。

跟日志流选择器一样，String类型可以使用这四个操作符 (`=`,`!=`,`=~`,`!~`)。

对于Duration，Number 和 Bytes类型，则会先强制转换label值以便进行比较，并且支持以下比较类型 ：

- `==` 或者 `=` 相等 
- `!=` 不相等
- `>` 和 `>=` 大于和大于等于
- `<` 和 `<=` 小于和小于等于

例如： `logfmt | duration > 1m and bytes_consumed > 20MB`

如果出现label值失效，日志行将不会过来，并且一个名为`__error__` 的label将会被添加进来。

你可以使用`and`和`or`将多个判断式串联起来，其中`and`可以使用空格，逗号，或者竖线来表达。label过滤器可以放在执行管道的任何地方。

这意味着下面四个表达式是完全相同的：

```logql
| duration >= 20ms or size == 20kb and method!~"2.."
| duration >= 20ms or size == 20kb | method!~"2.."
| duration >= 20ms or size == 20kb , method!~"2.."
| duration >= 20ms or size == 20kb  method!~"2.."
```

默认来说，多个判断式的优先级是从右往左。你可以用括号包裹判断式，以改变优先级顺序。

#### <span id="line-format-expression">Line Format Expression</span>

日志行格式表达式可以重写日志行内容，使用的是golang的 [text/template](https://golang.org/pkg/text/template/) 格式。传入一个模板格式作为参数 `| line_format "{{.label_name}}"`。所有的labes会作为参数注入到模板中，并使用`{{.label_name}}` 表现出来。

下面的代码，将会提取和重写日志行使得其只包含query和duration标签。

```logql
{container="frontend"} | logfmt | line_format "{{.query}} {{.duration}}"
```

使用双引号或者反引号 `` `{{.label_name}}` `` 可以用来直接显示字符。

`line_format` 也支持 `math` 函数

如果我们有如下的labels `ip=1.1.1.1`, `status=200` and `duration=3000`(ms)，那么我们可以把duration除以1000以得到秒值。

```logql
{container="frontend"} | logfmt | line_format "{{.ip}} {{.status}} {{div .duration 1000}}"
```

上述查询会得到日志行： `1.1.1.1 200 3`

#### <span id='labels-format-expression'>Labels Format Expression</span>

`| label_format` 表达式可以重命名、修改、添加labels。它的参数是由一系列用逗号分割的等式组成。

如果等号两边都是label标签名，那么则会将后面的重命名为前面的值。 `dst=src`，scr会被重命名为dst。

等号左边的可以是一个模板字符串（用双引号或者反引号）， `dst="{{.status}} {{.query}}"`这样的表达式，dst的值将会知模板执行后的结果。

上面两个案例中，当目标label不存在时，会直接创建。

重命名操作 `dst=src` 将在 `dst` 标签完成映射时，把 `src` 标签删除掉。但是如果使用模板字符串的话， `dst="{{.src}}"` 两个label都会得到保留。

## 注意点：

1. lable的键值对数量不宜过大，否则loki会吃不消。建议选择取值范围小的属性作为lable，例如http的statusCode或者请求类型(POST、GET)。不要将ip地址、方法名作为lable，因为所有的lable键值对会呈指数级增长。

