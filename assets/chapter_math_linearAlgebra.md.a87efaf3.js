import{_ as e,o as t,c as i,U as _,k as a}from"./chunks/framework.e57fd21b.js";const f=JSON.parse('{"title":"线性代数","description":"","frontmatter":{},"headers":[],"relativePath":"chapter/math/linearAlgebra.md","filePath":"chapter/math/linearAlgebra.md"}'),r={name:"chapter/math/linearAlgebra.md"},n=_('<h1 id="线性代数" tabindex="-1">线性代数 <a class="header-anchor" href="#线性代数" aria-label="Permalink to &quot;线性代数&quot;">​</a></h1><h2 id="二阶三阶行列式" tabindex="-1">二阶三阶行列式 <a class="header-anchor" href="#二阶三阶行列式" aria-label="Permalink to &quot;二阶三阶行列式&quot;">​</a></h2><h3 id="二阶" tabindex="-1">二阶 <a class="header-anchor" href="#二阶" aria-label="Permalink to &quot;二阶&quot;">​</a></h3><p>$$\\begin{vmatrix} a_{11}&amp;a_{12}\\ a_{21}&amp;a_{22}\\ \\end{vmatrix} = a_{11}a_{22} - a_{12}a_{21}$$</p><h3 id="三阶" tabindex="-1">三阶 <a class="header-anchor" href="#三阶" aria-label="Permalink to &quot;三阶&quot;">​</a></h3>',5),o=a("p",{33:""},"$$\\begin{vmatrix} a_{11}&a_{12}&a_{13}\\ a_{21}&a_{22}&a_{23}\\ a_{31}&a_{32}&a_{33}\\ \\end{vmatrix} = a_{11}a_{22}a_",-1),l=a("ul",null,[a("li",{31:""},"a_{12}a_{23}a_"),a("li",{32:""},"a_{13}a_{21}a_")],-1),h=a("ul",null,[a("li",{31:""},"a_{13}a_{22}a_"),a("li",{33:""},"a_{12}a_{21}a_"),a("li",null,"a_{11}a_{23}a_{32}$$")],-1),d=_('<h3 id="排列" tabindex="-1">排列 <a class="header-anchor" href="#排列" aria-label="Permalink to &quot;排列&quot;">​</a></h3><p>由1,2,3,4····n组成的<strong>有序</strong>数组，叫做n级数组，中间不能缺数，一共n的阶乘个。<br> 逆序：大数排在小数前面；逆序数，逆序的总数，个数分为奇排列和偶排列。 对换：交换两个数，一个对换，奇偶性改变。<br> 定理：n级排列中，奇排列和偶排列各占$\\frac {n!}2$。</p><h2 id="n阶行列式" tabindex="-1">n阶行列式 <a class="header-anchor" href="#n阶行列式" aria-label="Permalink to &quot;n阶行列式&quot;">​</a></h2><p>n阶排列式，行标取标准排列，列标取所有排列可能。列标偶排列为正数，奇排列为负数。 $$ \\begin{vmatrix} a_{11}&amp;a_{12}&amp;\\cdots&amp;a_{1n}\\ a_{21}&amp;a_{22}&amp;\\cdots&amp;a_{2n}\\ \\vdots&amp;\\vdots&amp;\\ddots&amp;\\vdots\\ a_{n1}&amp;a_{n2}&amp;\\cdots&amp;a_{nn}\\ \\end{vmatrix} = \\sum (-1)^{j_n奇偶}a_{1j_1}a_{2j_2} \\cdots a_{nj_n} $$</p><h2 id="行列式性质" tabindex="-1">行列式性质 <a class="header-anchor" href="#行列式性质" aria-label="Permalink to &quot;行列式性质&quot;">​</a></h2><ol><li>$D^t$既行列转置 ，对行和列都成立。</li><li>两行交换，值变号。推论:两行(列)相同，D=0.</li><li>某一行都乘以K，值为K*D。推论:有几行乘以K，值就位D乘以K的几次方。</li><li>两行对应成比例，D=0。</li><li>某行两数相加，等于行列式相加: $\\begin{vmatrix} a_{11}&amp;a_{12}&amp;a_{13}\\ x_1+y_1&amp;x_2+y_2&amp;x_3+y_3\\ a_{31}&amp;a_{32}&amp;a_{33}\\ \\end{vmatrix} = \\begin{vmatrix} a_{11}&amp;a_{12}&amp;a_{13}\\ x_1&amp;x_2&amp;x_3\\ a_{31}&amp;a_{32}&amp;a_{33}\\ \\end{vmatrix} + \\begin{vmatrix} a_{11}&amp;a_{12}&amp;a_{13}\\ y_1&amp;y_2&amp;y_3\\ a_{31}&amp;a_{32}&amp;a_{33}\\ \\end{vmatrix}$</li><li>某一行(列)乘以一个数并加到另外一行(列)时，D的值不变。 (作用:矩阵中转换成上三角)</li></ol><h2 id="行列式按行展开" tabindex="-1">行列式按行展开 <a class="header-anchor" href="#行列式按行展开" aria-label="Permalink to &quot;行列式按行展开&quot;">​</a></h2><h4 id="余子式" tabindex="-1">余子式 <a class="header-anchor" href="#余子式" aria-label="Permalink to &quot;余子式&quot;">​</a></h4><p>矩阵中去掉i行和j列后余下的矩阵,记为$M_{ij}$</p><h4 id="代数余子式" tabindex="-1">代数余子式 <a class="header-anchor" href="#代数余子式" aria-label="Permalink to &quot;代数余子式&quot;">​</a></h4><p>在余子式上加上符号,记为$A_{ij}$=$(-1)^{i+j}M_{ij}$</p><h4 id="定理-按某行某列展开" tabindex="-1">定理(按某行某列展开) <a class="header-anchor" href="#定理-按某行某列展开" aria-label="Permalink to &quot;定理(按某行某列展开)&quot;">​</a></h4><p>$D=a_{i1}A_{i1}+a_{i2}A_{i2}+\\cdots+a_{in}A_{in}$<br> $a_{ij}$为元素 $A_{ij}$为代数余子式<br><strong>作用:可以用来降阶.且优先选择0比价多的行和列展开.</strong></p><h4 id="定理-异乘变零" tabindex="-1">定理(异乘变零) <a class="header-anchor" href="#定理-异乘变零" aria-label="Permalink to &quot;定理(异乘变零)&quot;">​</a></h4><p>某行元素与另一行元素的代数余子式乘积之和为0.</p>',15),m=[n,o,l,h,d];function s(p,c,b,u,$,x){return t(),i("div",null,m)}const P=e(r,[["render",s]]);export{f as __pageData,P as default};