<h1>前言</h1>
<p>不知不觉来百度已有半年之久，这半年是996的半年，是孤军奋战的半年，是跌跌撞撞的半年，一个字：真的是累死人啦！</p>
<p>我所进入的团队相当于公司内部创业团队，人员基本全部是新招的，最初开发时连数据库都没设计，当时评审需求的时候居然有一个产品经理拿了一份他设计的数据库，当时我作为一个前端就惊呆了......</p>
<p>最初的前端只有我1人，这事实上与我想来学习学习的愿望是背道而驰的，但既然来都来了也只能独挑大梁，马上投入开发，当时涉及的项目有：</p>
<p>① H5站点</p>
<p>② PC站点</p>
<p>③ Mis后台管理系统</p>
<p>④ 各种百度渠道接入</p>
<p>第一阶段的重点为H5站点与APP，我们便需要在20天内从无到有的完成第一版的产品，而最初的Native人力严重不足，很多页面依赖于H5这边，所以前端除了本身业务之外还得约定与Native的交互细节。</p>
<p>这个情况下根本无暇思考其它框架，熟悉的就是最好的！便将自己git上的开源框架直接拿来用了起来：<a id="homepage1_HomePageDays_ctl00_DayList_TitleUrl_1" class="postTitle2" href="http://www.cnblogs.com/yexiaochai/p/3837713.html">[置顶]【blade利刃出鞘】一起进入移动端webapp开发吧</a></p>
<p><span style="line-height: 1.5;">因为之前的经验积累，工程化、Hybrid交互、各种兼容、体验问题已经处理了很多了，所以基础架构一层比较完备，又有完善的UI组件可以使用，</span>这个是最初的设计构想：</p>
<p><img src="http://images2015.cnblogs.com/blog/294743/201509/294743-20150926120431100-317807365.png" alt="" width="835" height="588" /></p>
<p>构想总是美好的，而<span style="line-height: 1.5;">在巨大的业务压力面前任何技术愿景都是苍白的，最初我在哪里很傻很天真的用CSS3画图标，然后产品经理天天像一个苍蝇一样在我面前嗡嗡嗡，他们事实上是不关注页面性能是何物的，我也马上意识的到工期不足，于是便直接用图标了！</span></p>
<p>依赖于完善的框架，20天不到的时间，第一版的项目便结束了，业务代码有点不堪入目，页面级的代码也没有太遵循MVC规则，这导致了后续的迭代，全部在那里操作dom。</p>
<p>其实初期这样做问题不大，如果项目比较小（比如什么一次性的活动页面）问题也不大，但是核心项目便最好不要这样玩了，因为新需求、新场景，会让你在原基础上不断的改代码，如果页面没有一个很好的规范，那么他将不再稳定，也不再容易维护，如何编写一个可稳定、扩展性高、可维护性高的项目，是我们今天讨论的重点。</p>
<p>认真阅读此文可能会在以下方面对你有所帮助：</p>
<div class="cnblogs_code">
<pre><span style="color: #800000;">① 网站初期需要统计什么数据？产品需要的业务数据，你该如何设计你的网站才能收集到这些数据，提供给他
② 完整的请求究竟应该如何发出，H5应该如何在前端做缓存，服务器给出的数据应该在哪里做校验，前端错误日志应该关注js错误还是数据错误？
③ 你在写业务代码时犯了什么错误，如何编写高效可维护的业务代码（页面级别），MVC到底是个什么东西？
④ 网站规模大了如何复用一些模块？
⑤ 站在业务角度应该如何做性能优化（这个可能不是本文的重点）</span></pre>
</div>
<p><span style="line-height: 1.5;">文中是我半年以来的一些业务开发经验，希望对各位有用，也希望各位<span style="color: #ff0000;"><strong>多多支持讨论</strong></span>，指出文中<span style="color: #ff0000;"><strong>不足</strong></span>以及提出您的一些<strong><span style="color: #ff0000;">建议</span></strong>。</span></p>
<h1>统计需求</h1>
<h3>通用统计需求</h3>
<p>对于服务器端来说，后期最重要的莫过于监控日志，对于前端来说，统计无疑是初期最重要的，通用的统计需求包括：</p>
<p>① PV/UV统计</p>
<p>② 机型/浏览器/系统统计</p>
<p>③ 各页面载入速度统计</p>
<p>④ 某些按钮的点击统计</p>
<p>⑤ ......</p>
<p>这类统计直接通过百度统计之类的工具即可，算是最基础的统计需求。百度产品的文档、支持团队烂估计是公认的事情了，我便只能挖掘很少一部分用法。但是这类数据也是非常重要了，对于产品甚至是老板判断整个产品的发展有莫大的帮助与引导作用，如果产品死了，任何技术都是没有意义的，所以站点没有这类统计的速度加上吧！</p>
<p>http://tongji.baidu.com/web/welcome/login</p>
<h3>渠道统计</h3>
<p>所谓渠道统计便是这次订单来源是哪里，就我们产品的渠道有：</p>
<p>① 手机百度APP入口（由分为生活+入口、首页banner入口、广告入口......）</p>
<p>② 百度移动站点入口</p>
<p>③ 百度地图入口（包括H5站点）</p>
<p>④ wise卡片入口（包括：唯一答案、白卡片、极速版、点到点卡片......）</p>
<p>⑤ 各种大礼包、活动入口</p>
<p>⑥ SEM入口</p>
<p>⑦ ......</p>
<p>你永远不能预料到你究竟有多少入口，但是这种渠道的统计的重要性直接关乎了产品的存亡，产品需要知道自己的每次的活动，每次的引流是有意义的，比如一次活动便需要得到这次活动每天产生的订单量，如果你告诉产品，爷做不到，那么产品会真叫你爷爷。</p>
<p>当然，渠道的统计前端单方面是完成不了的，需要和服务器端配合，一般而言可以这样做，前端与服务器端约定，每次请求皆会带特定的参数，我一般会与服务器约定以下参数：</p>
<div class="cnblogs_code">
<pre><span style="color: #0000ff;">var</span> param =<span style="color: #000000;"> {
    head: {
        us: '渠道',
        version: </span><span style="color: #800000;">'</span><span style="color: #800000;">1.0.0</span><span style="color: #800000;">'</span><span style="color: #000000;">
    }
};</span></pre>
</div>
<p>这个head参数是每次ajax请求都会带上的，而us参数一般由url而来，他要求每次由其它渠道落地到我们的站点一定要带有us参数，us参数拿到后便是我们自己的事情了，有几种操作方法：</p>
<p>① 直接种到cookie，这个需要服务器端特殊处理</p>
<p>② 存入localstorage，每次请求拿出来，组装请求参数</p>
<p>③ 因为我们H5站点的每一次跳转都会经过框架中转，所以我直接将us数据放到了url上，每次跳转都会带上，一直到跳出网站。</p>
<h3>SEM需求</h3>
<p>SEM其实属于渠道需求的一类，这里会独立出来是因为，他需要统计的数据更多，还会包含一个投放词之类的数据，SEM投放人员需要确切的知道某个投放词每天的订单量，这个时候上面的参数可能就要变化了：</p>
<div class="cnblogs_code">
<pre><span style="color: #0000ff;">var</span> param =<span style="color: #000000;"> {
    head: {
        us: </span>'渠道'<span style="color: #000000;">,
        version: </span>'1.0.0'<span style="color: #000000;">,
        extra: </span>'扩展字段'<span style="color: #000000;">
    }
};</span></pre>
</div>
<p>这个时候可能便需要一个extra的扩展字段记录投放词是什么，当然SEM落地到我们网站的特殊参数也需要一直传下去，这个需要做框架层的处理，这里顺便说下我的处理方案吧</p>
<h3>统一跳转</h3>
<p>首先我们H5站点基本不关注SEO，对于SEO我们有特殊的处理方案，所以在我们的H5站点上基本不会出现a标签，我们站点的每次跳转皆是由js控制，我会在框架封装几个方法处理跳转：</p>
<div class="cnblogs_code">
<pre>forward: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (view) {
     </span><span style="color: #008000;">//</span><span style="color: #008000;">处理频道内跳转</span>
<span style="color: #000000;">}

back: </span><span style="color: #0000ff;">function</span><span style="color: #000000;"> (view) {
}

jump: </span><span style="color: #0000ff;">function</span><span style="color: #000000;"> (project, view) {
     </span><span style="color: #008000;">//</span><span style="color: #008000;">处理跨频道跳转</span>
}</pre>
</div>
<p>这样做的好处是：</p>
<p>① 统一封装跳转会让前端控制力增加，比如forward可以是location变化，也可以是pushState/hash的方式做单页跳转，甚至可以做Hybrid中多Webview的跳转</p>
<p>② 诚如上述，forward时可以由url获取渠道参数带到下一个页面</p>
<p>③ 统一跳转也可以统一为站点做一些打点的操作，比如单页应用时候的统一加统计代码</p>
<p>最简单的理解就是：封装一个全局方法做跳转控制，所有的跳转由他发出。</p>
<h1>请求模块</h1>
<p>ajax是前端到服务器端的基石，但是前端和服务器端的交互：</p>
<div class="cnblogs_code">
<pre><span style="color: #800000;">每个接口必须要写文档！
每个接口必须要写文档！
每个接口必须要写文档！
重要的事情说三遍！！！</span></pre>
</div>
<p>如果不写文档的话，你就等着吧，因为端上是入口，一旦出问题，老板会直观认为是前端的问题，如果发现是服务器的字段不统一导致，而服务器端打死不承认，你就等着吧！</p>
<p>无论什么时候，前端请求模块的设计是非常关键的，因为前端只是数据的搬运工，负责展现数据而已：)</p>
<h3>封装请求模块</h3>
<p>与封装统一跳转一致，所有的请求必须收口，最烂的做法也是封装一个全局的方法处理全站请求，这样做的好处是：</p>
<p>① 处理公共参数</p>
<p>比如每次请求必须带上上面所述head业务参数，便必须在此做处理</p>
<p>② 处理统一错误码</p>
<p>服务器与前端一般会有一个格式约定，一般而言是这样的：</p>
<div class="cnblogs_code">
<pre><span style="color: #000000;">{
  data: {},
  errno: </span>0<span style="color: #000000;">,
  msg: </span>"success"<span style="color: #000000;">
}</span></pre>
</div>
<p>比如错误码为1的情况就代表需要登录，系统会引导用户进入登录页，比如非0的情况下，需要弹出一个提示框告诉用户出了什么问题，你不可能在每个地方都做这种错误码处理吧</p>
<p>③ 统一缓存处理</p>
<p>有些请求数据不会经常改变，比如城市列表，比如常用联系人，这个时候便需要将之存到localstorage中做缓存</p>
<p>④ 数据处理、日志处理</p>
<div class="cnblogs_code">
<pre><span style="color: #800000;">这里插一句监控的问题，因为前端代码压缩后，js错误监控变得不太靠谱，而前端的错误有很大可能是搬运数据过程中出了问题，所以在请求model层做对应的数据校验是十分有意义的
如果发现数据不对便发错误日志，好过被用户抓住投诉，而这里做数据校验也为模板中使用数据做了基础检查</span></pre>
</div>
<p><span style="line-height: 1.5;">服务器端给前端的数据可能是松散的，前端真实使用时候会对数据做处理，同一请求模块如果在不同地方使用，就需要多次处理，这个是不需要的，比如：</span></p>
<div class="cnblogs_code">
<pre><span style="color: #008000;">//</span><span style="color: #008000;">这个判断应该放在数据模块中</span>
<span style="color: #0000ff;">if</span><span style="color: #000000;">(data.a) ...
</span><span style="color: #0000ff;">if</span>(data.a.b) ...</pre>
</div>
<p><span style="line-height: 1.5;">这里我说下blade框架中请求模块的处理：</span></p>
<h3>blade的请求模块</h3>
<p>我们现在站点主要还是源于blade框架，实际使用时候做了点改变，后续会回归到blade框架，项目目录结构为：</p>
<p><img src="http://images2015.cnblogs.com/blog/294743/201509/294743-20150926141413647-1428091333.jpg" alt="" /></p>
<p>其中store依赖于storage模块，是处理localstorage缓存的，他与model是独立的，以下为核心代码：</p>
<div class="cnblogs_code" onclick="cnblogs_code_show('138c922f-240b-40ee-bb98-80bc76caacb9')"><img id="code_img_closed_138c922f-240b-40ee-bb98-80bc76caacb9" class="code_img_closed" src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" alt="" /><img id="code_img_opened_138c922f-240b-40ee-bb98-80bc76caacb9" class="code_img_opened" style="display: none;" onclick="cnblogs_code_hide('138c922f-240b-40ee-bb98-80bc76caacb9',event)" src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="" />
<div id="cnblogs_code_open_138c922f-240b-40ee-bb98-80bc76caacb9" class="cnblogs_code_hide">
<pre><span style="color: #008080;">  1</span> define([], <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">  2</span> 
<span style="color: #008080;">  3</span>   <span style="color: #0000ff;">var</span> Model =<span style="color: #000000;"> _.inherit({
</span><span style="color: #008080;">  4</span>     <span style="color: #008000;">//</span><span style="color: #008000;">默认属性</span>
<span style="color: #008080;">  5</span>     propertys: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">  6</span>       <span style="color: #0000ff;">this</span>.protocol = 'http'<span style="color: #000000;">;
</span><span style="color: #008080;">  7</span>       <span style="color: #0000ff;">this</span>.domain = ''<span style="color: #000000;">;
</span><span style="color: #008080;">  8</span>       <span style="color: #0000ff;">this</span>.path = ''<span style="color: #000000;">;
</span><span style="color: #008080;">  9</span>       <span style="color: #0000ff;">this</span>.url = <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 10</span>       <span style="color: #0000ff;">this</span>.param =<span style="color: #000000;"> {};
</span><span style="color: #008080;"> 11</span>       <span style="color: #0000ff;">this</span>.validates =<span style="color: #000000;"> [];
</span><span style="color: #008080;"> 12</span>       <span style="color: #008000;">//</span><span style="color: #008000;">      this.contentType = 'application/json';</span>
<span style="color: #008080;"> 13</span> 
<span style="color: #008080;"> 14</span>       <span style="color: #0000ff;">this</span>.ajaxOnly = <span style="color: #0000ff;">true</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 15</span> 
<span style="color: #008080;"> 16</span>       <span style="color: #0000ff;">this</span>.contentType = 'application/x-www-form-urlencoded'<span style="color: #000000;">;
</span><span style="color: #008080;"> 17</span>       <span style="color: #0000ff;">this</span>.type = 'GET'<span style="color: #000000;">;
</span><span style="color: #008080;"> 18</span>       <span style="color: #0000ff;">this</span>.dataType = 'json'<span style="color: #000000;">;
</span><span style="color: #008080;"> 19</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 20</span> 
<span style="color: #008080;"> 21</span>     setOption: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (options) {
</span><span style="color: #008080;"> 22</span>       _.extend(<span style="color: #0000ff;">this</span><span style="color: #000000;">, options);
</span><span style="color: #008080;"> 23</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 24</span> 
<span style="color: #008080;"> 25</span>     assert: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 26</span>       <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.url === <span style="color: #0000ff;">null</span><span style="color: #000000;">) {
</span><span style="color: #008080;"> 27</span>         <span style="color: #0000ff;">throw</span> 'not override url property'<span style="color: #000000;">;
</span><span style="color: #008080;"> 28</span> <span style="color: #000000;">      }
</span><span style="color: #008080;"> 29</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 30</span> 
<span style="color: #008080;"> 31</span>     initialize: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (opts) {
</span><span style="color: #008080;"> 32</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">.propertys();
</span><span style="color: #008080;"> 33</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">.setOption(opts);
</span><span style="color: #008080;"> 34</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">.assert();
</span><span style="color: #008080;"> 35</span> 
<span style="color: #008080;"> 36</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 37</span> 
<span style="color: #008080;"> 38</span>     pushValidates: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (handler) {
</span><span style="color: #008080;"> 39</span>       <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">typeof</span> handler === 'function'<span style="color: #000000;">) {
</span><span style="color: #008080;"> 40</span>         <span style="color: #0000ff;">this</span>.validates.push($.proxy(handler, <span style="color: #0000ff;">this</span><span style="color: #000000;">));
</span><span style="color: #008080;"> 41</span> <span style="color: #000000;">      }
</span><span style="color: #008080;"> 42</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 43</span> 
<span style="color: #008080;"> 44</span>     setParam: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (key, val) {
</span><span style="color: #008080;"> 45</span>       <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">typeof</span> key === 'object'<span style="color: #000000;">) {
</span><span style="color: #008080;"> 46</span>         _.extend(<span style="color: #0000ff;">this</span><span style="color: #000000;">.param, key);
</span><span style="color: #008080;"> 47</span>       } <span style="color: #0000ff;">else</span><span style="color: #000000;"> {
</span><span style="color: #008080;"> 48</span>         <span style="color: #0000ff;">this</span>.param[key] =<span style="color: #000000;"> val;
</span><span style="color: #008080;"> 49</span> <span style="color: #000000;">      }
</span><span style="color: #008080;"> 50</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 51</span> 
<span style="color: #008080;"> 52</span>     removeParam: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (key) {
</span><span style="color: #008080;"> 53</span>       <span style="color: #0000ff;">delete</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">.param[key];
</span><span style="color: #008080;"> 54</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 55</span> 
<span style="color: #008080;"> 56</span>     getParam: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 57</span>       <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">.param;
</span><span style="color: #008080;"> 58</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 59</span> 
<span style="color: #008080;"> 60</span>     <span style="color: #008000;">//</span><span style="color: #008000;">构建url请求方式，子类可复写，我们的model如果localstorage设置了值便直接读取，但是得是非正式环境</span>
<span style="color: #008080;"> 61</span>     buildurl: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 62</span>       <span style="color: #008000;">//</span><span style="color: #008000;">      var baseurl = AbstractModel.baseurl(this.protocol);</span>
<span style="color: #008080;"> 63</span>       <span style="color: #008000;">//</span><span style="color: #008000;">      return this.protocol + '://' + baseurl.domain + '/' + baseurl.path + (typeof this.url === 'function' ? this.url() : this.url);</span>
<span style="color: #008080;"> 64</span>       <span style="color: #0000ff;">throw</span> "[ERROR]abstract method:buildurl, must be override"<span style="color: #000000;">;
</span><span style="color: #008080;"> 65</span> 
<span style="color: #008080;"> 66</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 67</span> 
<span style="color: #008080;"> 68</span>     onDataSuccess: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 69</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 70</span> 
<span style="color: #008080;"> 71</span>     <span style="color: #008000;">/*</span><span style="color: #008000;">*
</span><span style="color: #008080;"> 72</span> <span style="color: #008000;">    *    取model数据
</span><span style="color: #008080;"> 73</span> <span style="color: #008000;">    *    @param {Function} onComplete 取完的回调函
</span><span style="color: #008080;"> 74</span> <span style="color: #008000;">    *    传入的第一个参数为model的数第二个数据为元数据，元数据为ajax下发时的ServerCode,Message等数
</span><span style="color: #008080;"> 75</span> <span style="color: #008000;">    *    @param {Function} onError 发生错误时的回调
</span><span style="color: #008080;"> 76</span> <span style="color: #008000;">    *    @param {Boolean} ajaxOnly 可选，默认为false当为true时只使用ajax调取数据
</span><span style="color: #008080;"> 77</span> <span style="color: #008000;">    * @param {Boolean} scope 可选，设定回调函数this指向的对象
</span><span style="color: #008080;"> 78</span> <span style="color: #008000;">    * @param {Function} onAbort 可选，但取消时会调用的函数
</span><span style="color: #008080;"> 79</span>     <span style="color: #008000;">*/</span>
<span style="color: #008080;"> 80</span>     execute: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (onComplete, onError, ajaxOnly, scope) {
</span><span style="color: #008080;"> 81</span>       <span style="color: #0000ff;">var</span> __onComplete = $.proxy(<span style="color: #0000ff;">function</span><span style="color: #000000;"> (data) {
</span><span style="color: #008080;"> 82</span>         <span style="color: #0000ff;">var</span> _data =<span style="color: #000000;"> data;
</span><span style="color: #008080;"> 83</span>         <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">typeof</span> data == 'string') _data =<span style="color: #000000;"> JSON.parse(data);
</span><span style="color: #008080;"> 84</span> 
<span style="color: #008080;"> 85</span>         <span style="color: #008000;">//</span><span style="color: #008000;"> @description 开发者可以传入一组验证方法进行验证</span>
<span style="color: #008080;"> 86</span>         <span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> i = 0, len = <span style="color: #0000ff;">this</span>.validates.length; i &lt; len; i++<span style="color: #000000;">) {
</span><span style="color: #008080;"> 87</span>           <span style="color: #0000ff;">if</span> (!<span style="color: #0000ff;">this</span><span style="color: #000000;">.validates[i](data)) {
</span><span style="color: #008080;"> 88</span>             <span style="color: #008000;">//</span><span style="color: #008000;"> @description 如果一个验证不通过就返回</span>
<span style="color: #008080;"> 89</span>             <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">typeof</span> onError === 'function'<span style="color: #000000;">) {
</span><span style="color: #008080;"> 90</span>               <span style="color: #0000ff;">return</span> onError.call(scope || <span style="color: #0000ff;">this</span><span style="color: #000000;">, _data, data);
</span><span style="color: #008080;"> 91</span>             } <span style="color: #0000ff;">else</span><span style="color: #000000;"> {
</span><span style="color: #008080;"> 92</span>               <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">false</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 93</span> <span style="color: #000000;">            }
</span><span style="color: #008080;"> 94</span> <span style="color: #000000;">          }
</span><span style="color: #008080;"> 95</span> <span style="color: #000000;">        }
</span><span style="color: #008080;"> 96</span> 
<span style="color: #008080;"> 97</span>         <span style="color: #008000;">//</span><span style="color: #008000;"> @description 对获取的数据做字段映射</span>
<span style="color: #008080;"> 98</span>         <span style="color: #0000ff;">var</span> datamodel = <span style="color: #0000ff;">typeof</span> <span style="color: #0000ff;">this</span>.dataformat === 'function' ? <span style="color: #0000ff;">this</span><span style="color: #000000;">.dataformat(_data) : _data;
</span><span style="color: #008080;"> 99</span> 
<span style="color: #008080;">100</span>         <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.onDataSuccess) <span style="color: #0000ff;">this</span>.onDataSuccess.call(<span style="color: #0000ff;">this</span><span style="color: #000000;">, datamodel, data);
</span><span style="color: #008080;">101</span>         <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">typeof</span> onComplete === 'function'<span style="color: #000000;">) {
</span><span style="color: #008080;">102</span>           onComplete.call(scope || <span style="color: #0000ff;">this</span><span style="color: #000000;">, datamodel, data);
</span><span style="color: #008080;">103</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">104</span> 
<span style="color: #008080;">105</span>       }, <span style="color: #0000ff;">this</span><span style="color: #000000;">);
</span><span style="color: #008080;">106</span> 
<span style="color: #008080;">107</span>       <span style="color: #0000ff;">var</span> __onError = $.proxy(<span style="color: #0000ff;">function</span><span style="color: #000000;"> (e) {
</span><span style="color: #008080;">108</span>         <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">typeof</span> onError === 'function'<span style="color: #000000;">) {
</span><span style="color: #008080;">109</span>           onError.call(scope || <span style="color: #0000ff;">this</span><span style="color: #000000;">, e);
</span><span style="color: #008080;">110</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">111</span>       }, <span style="color: #0000ff;">this</span><span style="color: #000000;">);
</span><span style="color: #008080;">112</span> 
<span style="color: #008080;">113</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">.sendRequest(__onComplete, __onError);
</span><span style="color: #008080;">114</span> 
<span style="color: #008080;">115</span> <span style="color: #000000;">    },
</span><span style="color: #008080;">116</span> 
<span style="color: #008080;">117</span>     sendRequest: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (success, error) {
</span><span style="color: #008080;">118</span>       <span style="color: #0000ff;">var</span> url = <span style="color: #0000ff;">this</span><span style="color: #000000;">.buildurl();
</span><span style="color: #008080;">119</span>       <span style="color: #0000ff;">var</span> params = _.clone(<span style="color: #0000ff;">this</span>.getParam() ||<span style="color: #000000;"> {});
</span><span style="color: #008080;">120</span>       <span style="color: #0000ff;">var</span> crossDomain =<span style="color: #000000;"> {
</span><span style="color: #008080;">121</span>         'json': <span style="color: #0000ff;">true</span><span style="color: #000000;">,
</span><span style="color: #008080;">122</span>         'jsonp': <span style="color: #0000ff;">true</span>
<span style="color: #008080;">123</span> <span style="color: #000000;">      };
</span><span style="color: #008080;">124</span> 
<span style="color: #008080;">125</span>       <span style="color: #008000;">//</span><span style="color: #008000;">      if (this.type == 'json')</span>
<span style="color: #008080;">126</span>       <span style="color: #008000;">//</span><span style="color: #008000;">      if (this.type == 'POST') {</span>
<span style="color: #008080;">127</span>       <span style="color: #008000;">//</span><span style="color: #008000;">        this.dataType = 'json';</span>
<span style="color: #008080;">128</span>       <span style="color: #008000;">//</span><span style="color: #008000;">      } else {</span>
<span style="color: #008080;">129</span>       <span style="color: #008000;">//</span><span style="color: #008000;">        this.dataType = 'jsonp';</span>
<span style="color: #008080;">130</span>       <span style="color: #008000;">//</span><span style="color: #008000;">      }</span>
<span style="color: #008080;">131</span> 
<span style="color: #008080;">132</span>       <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.type == 'POST'<span style="color: #000000;">) {
</span><span style="color: #008080;">133</span>         <span style="color: #0000ff;">this</span>.dataType = 'json'<span style="color: #000000;">;
</span><span style="color: #008080;">134</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">135</span> 
<span style="color: #008080;">136</span>       <span style="color: #008000;">//</span><span style="color: #008000;">jsonp与post互斥</span>
<span style="color: #008080;">137</span> <span style="color: #000000;">      $.ajax({
</span><span style="color: #008080;">138</span> <span style="color: #000000;">        url: url,
</span><span style="color: #008080;">139</span>         type: <span style="color: #0000ff;">this</span><span style="color: #000000;">.type,
</span><span style="color: #008080;">140</span> <span style="color: #000000;">        data: params,
</span><span style="color: #008080;">141</span>         dataType: <span style="color: #0000ff;">this</span><span style="color: #000000;">.dataType,
</span><span style="color: #008080;">142</span>         contentType: <span style="color: #0000ff;">this</span><span style="color: #000000;">.contentType,
</span><span style="color: #008080;">143</span>         crossDomain: crossDomain[<span style="color: #0000ff;">this</span><span style="color: #000000;">.dataType],
</span><span style="color: #008080;">144</span>         timeout: 50000<span style="color: #000000;">,
</span><span style="color: #008080;">145</span> <span style="color: #000000;">        xhrFields: {
</span><span style="color: #008080;">146</span>           withCredentials: <span style="color: #0000ff;">true</span>
<span style="color: #008080;">147</span> <span style="color: #000000;">        },
</span><span style="color: #008080;">148</span>         success: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (res) {
</span><span style="color: #008080;">149</span>           success &amp;&amp;<span style="color: #000000;"> success(res);
</span><span style="color: #008080;">150</span> <span style="color: #000000;">        },
</span><span style="color: #008080;">151</span>         error: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (err) {
</span><span style="color: #008080;">152</span>           error &amp;&amp;<span style="color: #000000;"> error(err);
</span><span style="color: #008080;">153</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">154</span> <span style="color: #000000;">      });
</span><span style="color: #008080;">155</span> 
<span style="color: #008080;">156</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">157</span> 
<span style="color: #008080;">158</span> <span style="color: #000000;">  });
</span><span style="color: #008080;">159</span> 
<span style="color: #008080;">160</span>   Model.getInstance = <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">161</span>     <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span><span style="color: #000000;">.instance) {
</span><span style="color: #008080;">162</span>       <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">.instance;
</span><span style="color: #008080;">163</span>     } <span style="color: #0000ff;">else</span><span style="color: #000000;"> {
</span><span style="color: #008080;">164</span>       <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span>.instance = <span style="color: #0000ff;">new</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">();
</span><span style="color: #008080;">165</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">166</span> <span style="color: #000000;">  };
</span><span style="color: #008080;">167</span> 
<span style="color: #008080;">168</span>   <span style="color: #0000ff;">return</span><span style="color: #000000;"> Model;
</span><span style="color: #008080;">169</span> });</pre>
</div>
<span class="cnblogs_code_collapse">model</span></div>
<div class="cnblogs_code" onclick="cnblogs_code_show('e88bfda8-ca30-47da-92ae-93ee148778c9')"><img id="code_img_closed_e88bfda8-ca30-47da-92ae-93ee148778c9" class="code_img_closed" src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" alt="" /><img id="code_img_opened_e88bfda8-ca30-47da-92ae-93ee148778c9" class="code_img_opened" style="display: none;" onclick="cnblogs_code_hide('e88bfda8-ca30-47da-92ae-93ee148778c9',event)" src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="" />
<div id="cnblogs_code_open_e88bfda8-ca30-47da-92ae-93ee148778c9" class="cnblogs_code_hide">
<pre><span style="color: #008080;">  1</span> define(['AbstractStorage'], <span style="color: #0000ff;">function</span><span style="color: #000000;"> (AbstractStorage) {
</span><span style="color: #008080;">  2</span> 
<span style="color: #008080;">  3</span>   <span style="color: #0000ff;">var</span> Store =<span style="color: #000000;"> _.inherit({
</span><span style="color: #008080;">  4</span>     <span style="color: #008000;">//</span><span style="color: #008000;">默认属性</span>
<span style="color: #008080;">  5</span>     propertys: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">  6</span> 
<span style="color: #008080;">  7</span>       <span style="color: #008000;">//</span><span style="color: #008000;">每个对象一定要具有存储键，并且不能重复</span>
<span style="color: #008080;">  8</span>       <span style="color: #0000ff;">this</span>.key = <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;">  9</span> 
<span style="color: #008080;"> 10</span>       <span style="color: #008000;">//</span><span style="color: #008000;">默认一条数据的生命周期，S为秒，M为分，D为天</span>
<span style="color: #008080;"> 11</span>       <span style="color: #0000ff;">this</span>.lifeTime = '30M'<span style="color: #000000;">;
</span><span style="color: #008080;"> 12</span> 
<span style="color: #008080;"> 13</span>       <span style="color: #008000;">//</span><span style="color: #008000;">默认返回数据</span>
<span style="color: #008080;"> 14</span>       <span style="color: #008000;">//</span><span style="color: #008000;">      this.defaultData = null;</span>
<span style="color: #008080;"> 15</span> 
<span style="color: #008080;"> 16</span>       <span style="color: #008000;">//</span><span style="color: #008000;">代理对象，localstorage对象</span>
<span style="color: #008080;"> 17</span>       <span style="color: #0000ff;">this</span>.sProxy = <span style="color: #0000ff;">new</span><span style="color: #000000;"> AbstractStorage();
</span><span style="color: #008080;"> 18</span> 
<span style="color: #008080;"> 19</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 20</span> 
<span style="color: #008080;"> 21</span>     setOption: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (options) {
</span><span style="color: #008080;"> 22</span>       _.extend(<span style="color: #0000ff;">this</span><span style="color: #000000;">, options);
</span><span style="color: #008080;"> 23</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 24</span> 
<span style="color: #008080;"> 25</span>     assert: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 26</span>       <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.key === <span style="color: #0000ff;">null</span><span style="color: #000000;">) {
</span><span style="color: #008080;"> 27</span>         <span style="color: #0000ff;">throw</span> 'not override key property'<span style="color: #000000;">;
</span><span style="color: #008080;"> 28</span> <span style="color: #000000;">      }
</span><span style="color: #008080;"> 29</span>       <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.sProxy === <span style="color: #0000ff;">null</span><span style="color: #000000;">) {
</span><span style="color: #008080;"> 30</span>         <span style="color: #0000ff;">throw</span> 'not override sProxy property'<span style="color: #000000;">;
</span><span style="color: #008080;"> 31</span> <span style="color: #000000;">      }
</span><span style="color: #008080;"> 32</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 33</span> 
<span style="color: #008080;"> 34</span>     initialize: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (opts) {
</span><span style="color: #008080;"> 35</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">.propertys();
</span><span style="color: #008080;"> 36</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">.setOption(opts);
</span><span style="color: #008080;"> 37</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">.assert();
</span><span style="color: #008080;"> 38</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 39</span> 
<span style="color: #008080;"> 40</span>     _getLifeTime: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 41</span>       <span style="color: #0000ff;">var</span> timeout = 0<span style="color: #000000;">;
</span><span style="color: #008080;"> 42</span>       <span style="color: #0000ff;">var</span> str = <span style="color: #0000ff;">this</span><span style="color: #000000;">.lifeTime;
</span><span style="color: #008080;"> 43</span>       <span style="color: #0000ff;">var</span> unit = str.charAt(str.length - 1<span style="color: #000000;">);
</span><span style="color: #008080;"> 44</span>       <span style="color: #0000ff;">var</span> num = str.substring(0, str.length - 1<span style="color: #000000;">);
</span><span style="color: #008080;"> 45</span>       <span style="color: #0000ff;">var</span> Map =<span style="color: #000000;"> {
</span><span style="color: #008080;"> 46</span>         D: 86400<span style="color: #000000;">,
</span><span style="color: #008080;"> 47</span>         H: 3600<span style="color: #000000;">,
</span><span style="color: #008080;"> 48</span>         M: 60<span style="color: #000000;">,
</span><span style="color: #008080;"> 49</span>         S: 1
<span style="color: #008080;"> 50</span> <span style="color: #000000;">      };
</span><span style="color: #008080;"> 51</span>       <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">typeof</span> unit == 'string'<span style="color: #000000;">) {
</span><span style="color: #008080;"> 52</span>         unit =<span style="color: #000000;"> unit.toUpperCase();
</span><span style="color: #008080;"> 53</span> <span style="color: #000000;">      }
</span><span style="color: #008080;"> 54</span>       timeout =<span style="color: #000000;"> num;
</span><span style="color: #008080;"> 55</span>       <span style="color: #0000ff;">if</span> (unit) timeout =<span style="color: #000000;"> Map[unit];
</span><span style="color: #008080;"> 56</span> 
<span style="color: #008080;"> 57</span>       <span style="color: #008000;">//</span><span style="color: #008000;">单位为毫秒</span>
<span style="color: #008080;"> 58</span>       <span style="color: #0000ff;">return</span> num * timeout * 1000<span style="color: #000000;"> ;
</span><span style="color: #008080;"> 59</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 60</span> 
<span style="color: #008080;"> 61</span>     <span style="color: #008000;">//</span><span style="color: #008000;">缓存数据</span>
<span style="color: #008080;"> 62</span>     set: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (value, sign) {
</span><span style="color: #008080;"> 63</span>       <span style="color: #008000;">//</span><span style="color: #008000;">获取过期时间</span>
<span style="color: #008080;"> 64</span>       <span style="color: #0000ff;">var</span> timeout = <span style="color: #0000ff;">new</span><span style="color: #000000;"> Date();
</span><span style="color: #008080;"> 65</span>       timeout.setTime(timeout.getTime() + <span style="color: #0000ff;">this</span><span style="color: #000000;">._getLifeTime());
</span><span style="color: #008080;"> 66</span>       <span style="color: #0000ff;">this</span>.sProxy.set(<span style="color: #0000ff;">this</span><span style="color: #000000;">.key, value, timeout.getTime(), sign);
</span><span style="color: #008080;"> 67</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 68</span> 
<span style="color: #008080;"> 69</span>     <span style="color: #008000;">//</span><span style="color: #008000;">设置单个属性</span>
<span style="color: #008080;"> 70</span>     setAttr: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (name, value, sign) {
</span><span style="color: #008080;"> 71</span>       <span style="color: #0000ff;">var</span><span style="color: #000000;"> key, obj;
</span><span style="color: #008080;"> 72</span>       <span style="color: #0000ff;">if</span><span style="color: #000000;"> (_.isObject(name)) {
</span><span style="color: #008080;"> 73</span>         <span style="color: #0000ff;">for</span> (key <span style="color: #0000ff;">in</span><span style="color: #000000;"> name) {
</span><span style="color: #008080;"> 74</span>           <span style="color: #0000ff;">if</span> (name.hasOwnProperty(key)) <span style="color: #0000ff;">this</span><span style="color: #000000;">.setAttr(k, name[k], value);
</span><span style="color: #008080;"> 75</span> <span style="color: #000000;">        }
</span><span style="color: #008080;"> 76</span>         <span style="color: #0000ff;">return</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 77</span> <span style="color: #000000;">      }
</span><span style="color: #008080;"> 78</span> 
<span style="color: #008080;"> 79</span>       <span style="color: #0000ff;">if</span> (!sign) sign = <span style="color: #0000ff;">this</span><span style="color: #000000;">.getSign();
</span><span style="color: #008080;"> 80</span> 
<span style="color: #008080;"> 81</span>       <span style="color: #008000;">//</span><span style="color: #008000;">获取当前对象</span>
<span style="color: #008080;"> 82</span>       obj = <span style="color: #0000ff;">this</span>.get(sign) ||<span style="color: #000000;"> {};
</span><span style="color: #008080;"> 83</span>       <span style="color: #0000ff;">if</span> (!obj) <span style="color: #0000ff;">return</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 84</span>       obj[name] =<span style="color: #000000;"> value;
</span><span style="color: #008080;"> 85</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">.set(obj, sign);
</span><span style="color: #008080;"> 86</span> 
<span style="color: #008080;"> 87</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 88</span> 
<span style="color: #008080;"> 89</span>     getSign: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 90</span>       <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span>.sProxy.getSign(<span style="color: #0000ff;">this</span><span style="color: #000000;">.key);
</span><span style="color: #008080;"> 91</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 92</span> 
<span style="color: #008080;"> 93</span>     remove: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 94</span>       <span style="color: #0000ff;">this</span>.sProxy.remove(<span style="color: #0000ff;">this</span><span style="color: #000000;">.key);
</span><span style="color: #008080;"> 95</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 96</span> 
<span style="color: #008080;"> 97</span>     removeAttr: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (attrName) {
</span><span style="color: #008080;"> 98</span>       <span style="color: #0000ff;">var</span> obj = <span style="color: #0000ff;">this</span>.get() ||<span style="color: #000000;"> {};
</span><span style="color: #008080;"> 99</span>       <span style="color: #0000ff;">if</span><span style="color: #000000;"> (obj[attrName]) {
</span><span style="color: #008080;">100</span>         <span style="color: #0000ff;">delete</span><span style="color: #000000;"> obj[attrName];
</span><span style="color: #008080;">101</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">102</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">.set(obj);
</span><span style="color: #008080;">103</span> <span style="color: #000000;">    },
</span><span style="color: #008080;">104</span> 
<span style="color: #008080;">105</span>     get: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (sign) {
</span><span style="color: #008080;">106</span>       <span style="color: #0000ff;">var</span> result = [], isEmpty = <span style="color: #0000ff;">true</span><span style="color: #000000;">, a;
</span><span style="color: #008080;">107</span>       <span style="color: #0000ff;">var</span> obj = <span style="color: #0000ff;">this</span>.sProxy.get(<span style="color: #0000ff;">this</span><span style="color: #000000;">.key, sign);
</span><span style="color: #008080;">108</span>       <span style="color: #0000ff;">var</span> type = <span style="color: #0000ff;">typeof</span><span style="color: #000000;"> obj;
</span><span style="color: #008080;">109</span>       <span style="color: #0000ff;">var</span> o = { 'string': <span style="color: #0000ff;">true</span>, 'number': <span style="color: #0000ff;">true</span>, 'boolean': <span style="color: #0000ff;">true</span><span style="color: #000000;"> };
</span><span style="color: #008080;">110</span>       <span style="color: #0000ff;">if</span> (o[type]) <span style="color: #0000ff;">return</span><span style="color: #000000;"> obj;
</span><span style="color: #008080;">111</span> 
<span style="color: #008080;">112</span>       <span style="color: #0000ff;">if</span><span style="color: #000000;"> (_.isArray(obj)) {
</span><span style="color: #008080;">113</span>         <span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> i = 0, len = obj.length; i &lt; len; i++<span style="color: #000000;">) {
</span><span style="color: #008080;">114</span>           result[i] =<span style="color: #000000;"> obj[i];
</span><span style="color: #008080;">115</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">116</span>       } <span style="color: #0000ff;">else</span> <span style="color: #0000ff;">if</span><span style="color: #000000;"> (_.isObject(obj)) {
</span><span style="color: #008080;">117</span>         result =<span style="color: #000000;"> obj;
</span><span style="color: #008080;">118</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">119</span> 
<span style="color: #008080;">120</span>       <span style="color: #0000ff;">for</span> (a <span style="color: #0000ff;">in</span><span style="color: #000000;"> result) {
</span><span style="color: #008080;">121</span>         isEmpty = <span style="color: #0000ff;">false</span><span style="color: #000000;">;
</span><span style="color: #008080;">122</span>         <span style="color: #0000ff;">break</span><span style="color: #000000;">;
</span><span style="color: #008080;">123</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">124</span>       <span style="color: #0000ff;">return</span> !isEmpty ? result : <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;">125</span> <span style="color: #000000;">    },
</span><span style="color: #008080;">126</span> 
<span style="color: #008080;">127</span>     getAttr: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (attrName, tag) {
</span><span style="color: #008080;">128</span>       <span style="color: #0000ff;">var</span> obj = <span style="color: #0000ff;">this</span><span style="color: #000000;">.get(tag);
</span><span style="color: #008080;">129</span>       <span style="color: #0000ff;">var</span> attrVal = <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;">130</span>       <span style="color: #0000ff;">if</span><span style="color: #000000;"> (obj) {
</span><span style="color: #008080;">131</span>         attrVal =<span style="color: #000000;"> obj[attrName];
</span><span style="color: #008080;">132</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">133</span>       <span style="color: #0000ff;">return</span><span style="color: #000000;"> attrVal;
</span><span style="color: #008080;">134</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">135</span> 
<span style="color: #008080;">136</span> <span style="color: #000000;">  });
</span><span style="color: #008080;">137</span> 
<span style="color: #008080;">138</span>   Store.getInstance = <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">139</span>     <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span><span style="color: #000000;">.instance) {
</span><span style="color: #008080;">140</span>       <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">.instance;
</span><span style="color: #008080;">141</span>     } <span style="color: #0000ff;">else</span><span style="color: #000000;"> {
</span><span style="color: #008080;">142</span>       <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span>.instance = <span style="color: #0000ff;">new</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">();
</span><span style="color: #008080;">143</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">144</span> <span style="color: #000000;">  };
</span><span style="color: #008080;">145</span> 
<span style="color: #008080;">146</span>   <span style="color: #0000ff;">return</span><span style="color: #000000;"> Store;
</span><span style="color: #008080;">147</span> });</pre>
</div>
<span class="cnblogs_code_collapse">store</span></div>
<div class="cnblogs_code" onclick="cnblogs_code_show('272ab33a-9eaa-4779-bae2-43bee68a1708')"><img id="code_img_closed_272ab33a-9eaa-4779-bae2-43bee68a1708" class="code_img_closed" src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" alt="" /><img id="code_img_opened_272ab33a-9eaa-4779-bae2-43bee68a1708" class="code_img_opened" style="display: none;" onclick="cnblogs_code_hide('272ab33a-9eaa-4779-bae2-43bee68a1708',event)" src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="" />
<div id="cnblogs_code_open_272ab33a-9eaa-4779-bae2-43bee68a1708" class="cnblogs_code_hide">
<pre><span style="color: #008080;">  1</span> define([], <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">  2</span> 
<span style="color: #008080;">  3</span>   <span style="color: #0000ff;">var</span> Storage =<span style="color: #000000;"> _.inherit({
</span><span style="color: #008080;">  4</span>     <span style="color: #008000;">//</span><span style="color: #008000;">默认属性</span>
<span style="color: #008080;">  5</span>     propertys: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">  6</span> 
<span style="color: #008080;">  7</span>       <span style="color: #008000;">//</span><span style="color: #008000;">代理对象，默认为localstorage</span>
<span style="color: #008080;">  8</span>       <span style="color: #0000ff;">this</span>.sProxy =<span style="color: #000000;"> window.localStorage;
</span><span style="color: #008080;">  9</span> 
<span style="color: #008080;"> 10</span>       <span style="color: #008000;">//</span><span style="color: #008000;">60 * 60 * 24 * 30 * 1000 ms ==30天</span>
<span style="color: #008080;"> 11</span>       <span style="color: #0000ff;">this</span>.defaultLifeTime = 2592000000<span style="color: #000000;">;
</span><span style="color: #008080;"> 12</span> 
<span style="color: #008080;"> 13</span>       <span style="color: #008000;">//</span><span style="color: #008000;">本地缓存用以存放所有localstorage键值与过期日期的映射</span>
<span style="color: #008080;"> 14</span>       <span style="color: #0000ff;">this</span>.keyCache = 'SYSTEM_KEY_TIMEOUT_MAP'<span style="color: #000000;">;
</span><span style="color: #008080;"> 15</span> 
<span style="color: #008080;"> 16</span>       <span style="color: #008000;">//</span><span style="color: #008000;">当缓存容量已满，每次删除的缓存数</span>
<span style="color: #008080;"> 17</span>       <span style="color: #0000ff;">this</span>.removeNum = 5<span style="color: #000000;">;
</span><span style="color: #008080;"> 18</span> 
<span style="color: #008080;"> 19</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 20</span> 
<span style="color: #008080;"> 21</span>     assert: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 22</span>       <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.sProxy === <span style="color: #0000ff;">null</span><span style="color: #000000;">) {
</span><span style="color: #008080;"> 23</span>         <span style="color: #0000ff;">throw</span> 'not override sProxy property'<span style="color: #000000;">;
</span><span style="color: #008080;"> 24</span> <span style="color: #000000;">      }
</span><span style="color: #008080;"> 25</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 26</span> 
<span style="color: #008080;"> 27</span>     initialize: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (opts) {
</span><span style="color: #008080;"> 28</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">.propertys();
</span><span style="color: #008080;"> 29</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">.assert();
</span><span style="color: #008080;"> 30</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 31</span> 
<span style="color: #008080;"> 32</span>     <span style="color: #008000;">/*</span>
<span style="color: #008080;"> 33</span> <span style="color: #008000;">    新增localstorage
</span><span style="color: #008080;"> 34</span> <span style="color: #008000;">    数据格式包括唯一键值，json字符串，过期日期，存入日期
</span><span style="color: #008080;"> 35</span> <span style="color: #008000;">    sign 为格式化后的请求参数，用于同一请求不同参数时候返回新数据，比如列表为北京的城市，后切换为上海，会判断tag不同而更新缓存数据，tag相当于签名
</span><span style="color: #008080;"> 36</span> <span style="color: #008000;">    每一键值只会缓存一条信息
</span><span style="color: #008080;"> 37</span>     <span style="color: #008000;">*/</span>
<span style="color: #008080;"> 38</span>     set: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (key, value, timeout, sign) {
</span><span style="color: #008080;"> 39</span>       <span style="color: #0000ff;">var</span> _d = <span style="color: #0000ff;">new</span><span style="color: #000000;"> Date();
</span><span style="color: #008080;"> 40</span>       <span style="color: #008000;">//</span><span style="color: #008000;">存入日期</span>
<span style="color: #008080;"> 41</span>       <span style="color: #0000ff;">var</span> indate =<span style="color: #000000;"> _d.getTime();
</span><span style="color: #008080;"> 42</span> 
<span style="color: #008080;"> 43</span>       <span style="color: #008000;">//</span><span style="color: #008000;">最终保存的数据</span>
<span style="color: #008080;"> 44</span>       <span style="color: #0000ff;">var</span> entity = <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 45</span> 
<span style="color: #008080;"> 46</span>       <span style="color: #0000ff;">if</span> (!<span style="color: #000000;">timeout) {
</span><span style="color: #008080;"> 47</span>         _d.setTime(_d.getTime() + <span style="color: #0000ff;">this</span><span style="color: #000000;">.defaultLifeTime);
</span><span style="color: #008080;"> 48</span>         timeout =<span style="color: #000000;"> _d.getTime();
</span><span style="color: #008080;"> 49</span> <span style="color: #000000;">      }
</span><span style="color: #008080;"> 50</span> 
<span style="color: #008080;"> 51</span>       <span style="color: #008000;">//
</span><span style="color: #008080;"> 52</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">.setKeyCache(key, timeout);
</span><span style="color: #008080;"> 53</span>       entity = <span style="color: #0000ff;">this</span><span style="color: #000000;">.buildStorageObj(value, indate, timeout, sign);
</span><span style="color: #008080;"> 54</span> 
<span style="color: #008080;"> 55</span>       <span style="color: #0000ff;">try</span><span style="color: #000000;"> {
</span><span style="color: #008080;"> 56</span>         <span style="color: #0000ff;">this</span><span style="color: #000000;">.sProxy.setItem(key, JSON.stringify(entity));
</span><span style="color: #008080;"> 57</span>         <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">true</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 58</span>       } <span style="color: #0000ff;">catch</span><span style="color: #000000;"> (e) {
</span><span style="color: #008080;"> 59</span>         <span style="color: #008000;">//</span><span style="color: #008000;">localstorage写满时,全清掉</span>
<span style="color: #008080;"> 60</span>         <span style="color: #0000ff;">if</span> (e.name == 'QuotaExceededError'<span style="color: #000000;">) {
</span><span style="color: #008080;"> 61</span>           <span style="color: #008000;">//</span><span style="color: #008000;">            this.sProxy.clear();</span>
<span style="color: #008080;"> 62</span>           <span style="color: #008000;">//</span><span style="color: #008000;">localstorage写满时，选择离过期时间最近的数据删除，这样也会有些影响，但是感觉比全清除好些，如果缓存过多，此过程比较耗时，100ms以内</span>
<span style="color: #008080;"> 63</span>           <span style="color: #0000ff;">if</span> (!<span style="color: #0000ff;">this</span>.removeLastCache()) <span style="color: #0000ff;">throw</span> '本次数据存储量过大'<span style="color: #000000;">;
</span><span style="color: #008080;"> 64</span>           <span style="color: #0000ff;">this</span><span style="color: #000000;">.set(key, value, timeout, sign);
</span><span style="color: #008080;"> 65</span> <span style="color: #000000;">        }
</span><span style="color: #008080;"> 66</span>         console &amp;&amp;<span style="color: #000000;"> console.log(e);
</span><span style="color: #008080;"> 67</span> <span style="color: #000000;">      }
</span><span style="color: #008080;"> 68</span>       <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">false</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 69</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 70</span> 
<span style="color: #008080;"> 71</span>     <span style="color: #008000;">//</span><span style="color: #008000;">删除过期缓存</span>
<span style="color: #008080;"> 72</span>     removeOverdueCache: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 73</span>       <span style="color: #0000ff;">var</span> tmpObj = <span style="color: #0000ff;">null</span><span style="color: #000000;">, i, len;
</span><span style="color: #008080;"> 74</span> 
<span style="color: #008080;"> 75</span>       <span style="color: #0000ff;">var</span> now = <span style="color: #0000ff;">new</span><span style="color: #000000;"> Date().getTime();
</span><span style="color: #008080;"> 76</span>       <span style="color: #008000;">//</span><span style="color: #008000;">取出键值对</span>
<span style="color: #008080;"> 77</span>       <span style="color: #0000ff;">var</span> cacheStr = <span style="color: #0000ff;">this</span>.sProxy.getItem(<span style="color: #0000ff;">this</span><span style="color: #000000;">.keyCache);
</span><span style="color: #008080;"> 78</span>       <span style="color: #0000ff;">var</span> cacheMap =<span style="color: #000000;"> [];
</span><span style="color: #008080;"> 79</span>       <span style="color: #0000ff;">var</span> newMap =<span style="color: #000000;"> [];
</span><span style="color: #008080;"> 80</span>       <span style="color: #0000ff;">if</span> (!<span style="color: #000000;">cacheStr) {
</span><span style="color: #008080;"> 81</span>         <span style="color: #0000ff;">return</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 82</span> <span style="color: #000000;">      }
</span><span style="color: #008080;"> 83</span> 
<span style="color: #008080;"> 84</span>       cacheMap =<span style="color: #000000;"> JSON.parse(cacheStr);
</span><span style="color: #008080;"> 85</span> 
<span style="color: #008080;"> 86</span>       <span style="color: #0000ff;">for</span> (i = 0, len = cacheMap.length; i &lt; len; i++<span style="color: #000000;">) {
</span><span style="color: #008080;"> 87</span>         tmpObj =<span style="color: #000000;"> cacheMap[i];
</span><span style="color: #008080;"> 88</span>         <span style="color: #0000ff;">if</span> (tmpObj.timeout &lt;<span style="color: #000000;"> now) {
</span><span style="color: #008080;"> 89</span>           <span style="color: #0000ff;">this</span><span style="color: #000000;">.sProxy.removeItem(tmpObj.key);
</span><span style="color: #008080;"> 90</span>         } <span style="color: #0000ff;">else</span><span style="color: #000000;"> {
</span><span style="color: #008080;"> 91</span> <span style="color: #000000;">          newMap.push(tmpObj);
</span><span style="color: #008080;"> 92</span> <span style="color: #000000;">        }
</span><span style="color: #008080;"> 93</span> <span style="color: #000000;">      }
</span><span style="color: #008080;"> 94</span>       <span style="color: #0000ff;">this</span>.sProxy.setItem(<span style="color: #0000ff;">this</span><span style="color: #000000;">.keyCache, JSON.stringify(newMap));
</span><span style="color: #008080;"> 95</span> 
<span style="color: #008080;"> 96</span> <span style="color: #000000;">    },
</span><span style="color: #008080;"> 97</span> 
<span style="color: #008080;"> 98</span>     removeLastCache: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 99</span>       <span style="color: #0000ff;">var</span><span style="color: #000000;"> i, len;
</span><span style="color: #008080;">100</span>       <span style="color: #0000ff;">var</span> num = <span style="color: #0000ff;">this</span>.removeNum || 5<span style="color: #000000;">;
</span><span style="color: #008080;">101</span> 
<span style="color: #008080;">102</span>       <span style="color: #008000;">//</span><span style="color: #008000;">取出键值对</span>
<span style="color: #008080;">103</span>       <span style="color: #0000ff;">var</span> cacheStr = <span style="color: #0000ff;">this</span>.sProxy.getItem(<span style="color: #0000ff;">this</span><span style="color: #000000;">.keyCache);
</span><span style="color: #008080;">104</span>       <span style="color: #0000ff;">var</span> cacheMap =<span style="color: #000000;"> [];
</span><span style="color: #008080;">105</span>       <span style="color: #0000ff;">var</span> delMap =<span style="color: #000000;"> [];
</span><span style="color: #008080;">106</span> 
<span style="color: #008080;">107</span>       <span style="color: #008000;">//</span><span style="color: #008000;">说明本次存储过大</span>
<span style="color: #008080;">108</span>       <span style="color: #0000ff;">if</span> (!cacheStr) <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">false</span><span style="color: #000000;">;
</span><span style="color: #008080;">109</span> 
<span style="color: #008080;">110</span>       cacheMap.sort(<span style="color: #0000ff;">function</span><span style="color: #000000;"> (a, b) {
</span><span style="color: #008080;">111</span>         <span style="color: #0000ff;">return</span> a.timeout -<span style="color: #000000;"> b.timeout;
</span><span style="color: #008080;">112</span> <span style="color: #000000;">      });
</span><span style="color: #008080;">113</span> 
<span style="color: #008080;">114</span>       <span style="color: #008000;">//</span><span style="color: #008000;">删除了哪些数据</span>
<span style="color: #008080;">115</span>       delMap = cacheMap.splice(0<span style="color: #000000;">, num);
</span><span style="color: #008080;">116</span>       <span style="color: #0000ff;">for</span> (i = 0, len = delMap.length; i &lt; len; i++<span style="color: #000000;">) {
</span><span style="color: #008080;">117</span>         <span style="color: #0000ff;">this</span><span style="color: #000000;">.sProxy.removeItem(delMap[i].key);
</span><span style="color: #008080;">118</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">119</span> 
<span style="color: #008080;">120</span>       <span style="color: #0000ff;">this</span>.sProxy.setItem(<span style="color: #0000ff;">this</span><span style="color: #000000;">.keyCache, JSON.stringify(cacheMap));
</span><span style="color: #008080;">121</span>       <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">true</span><span style="color: #000000;">;
</span><span style="color: #008080;">122</span> <span style="color: #000000;">    },
</span><span style="color: #008080;">123</span> 
<span style="color: #008080;">124</span>     setKeyCache: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (key, timeout) {
</span><span style="color: #008080;">125</span>       <span style="color: #0000ff;">if</span> (!key || !timeout || timeout &lt; <span style="color: #0000ff;">new</span> Date().getTime()) <span style="color: #0000ff;">return</span><span style="color: #000000;">;
</span><span style="color: #008080;">126</span>       <span style="color: #0000ff;">var</span><span style="color: #000000;"> i, len, tmpObj;
</span><span style="color: #008080;">127</span> 
<span style="color: #008080;">128</span>       <span style="color: #008000;">//</span><span style="color: #008000;">获取当前已经缓存的键值字符串</span>
<span style="color: #008080;">129</span>       <span style="color: #0000ff;">var</span> oldstr = <span style="color: #0000ff;">this</span>.sProxy.getItem(<span style="color: #0000ff;">this</span><span style="color: #000000;">.keyCache);
</span><span style="color: #008080;">130</span>       <span style="color: #0000ff;">var</span> oldMap =<span style="color: #000000;"> [];
</span><span style="color: #008080;">131</span>       <span style="color: #008000;">//</span><span style="color: #008000;">当前key是否已经存在</span>
<span style="color: #008080;">132</span>       <span style="color: #0000ff;">var</span> flag = <span style="color: #0000ff;">false</span><span style="color: #000000;">;
</span><span style="color: #008080;">133</span>       <span style="color: #0000ff;">var</span> obj =<span style="color: #000000;"> {};
</span><span style="color: #008080;">134</span>       obj.key =<span style="color: #000000;"> key;
</span><span style="color: #008080;">135</span>       obj.timeout =<span style="color: #000000;"> timeout;
</span><span style="color: #008080;">136</span> 
<span style="color: #008080;">137</span>       <span style="color: #0000ff;">if</span><span style="color: #000000;"> (oldstr) {
</span><span style="color: #008080;">138</span>         oldMap =<span style="color: #000000;"> JSON.parse(oldstr);
</span><span style="color: #008080;">139</span>         <span style="color: #0000ff;">if</span> (!_.isArray(oldMap)) oldMap =<span style="color: #000000;"> [];
</span><span style="color: #008080;">140</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">141</span> 
<span style="color: #008080;">142</span>       <span style="color: #0000ff;">for</span> (i = 0, len = oldMap.length; i &lt; len; i++<span style="color: #000000;">) {
</span><span style="color: #008080;">143</span>         tmpObj =<span style="color: #000000;"> oldMap[i];
</span><span style="color: #008080;">144</span>         <span style="color: #0000ff;">if</span> (tmpObj.key ==<span style="color: #000000;"> key) {
</span><span style="color: #008080;">145</span>           oldMap[i] =<span style="color: #000000;"> obj;
</span><span style="color: #008080;">146</span>           flag = <span style="color: #0000ff;">true</span><span style="color: #000000;">;
</span><span style="color: #008080;">147</span>           <span style="color: #0000ff;">break</span><span style="color: #000000;">;
</span><span style="color: #008080;">148</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">149</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">150</span>       <span style="color: #0000ff;">if</span> (!<span style="color: #000000;">flag) oldMap.push(obj);
</span><span style="color: #008080;">151</span>       <span style="color: #008000;">//</span><span style="color: #008000;">最后将新数组放到缓存中</span>
<span style="color: #008080;">152</span>       <span style="color: #0000ff;">this</span>.sProxy.setItem(<span style="color: #0000ff;">this</span><span style="color: #000000;">.keyCache, JSON.stringify(oldMap));
</span><span style="color: #008080;">153</span> 
<span style="color: #008080;">154</span> <span style="color: #000000;">    },
</span><span style="color: #008080;">155</span> 
<span style="color: #008080;">156</span>     buildStorageObj: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (value, indate, timeout, sign) {
</span><span style="color: #008080;">157</span>       <span style="color: #0000ff;">var</span> obj =<span style="color: #000000;"> {
</span><span style="color: #008080;">158</span> <span style="color: #000000;">        value: value,
</span><span style="color: #008080;">159</span> <span style="color: #000000;">        timeout: timeout,
</span><span style="color: #008080;">160</span> <span style="color: #000000;">        sign: sign,
</span><span style="color: #008080;">161</span> <span style="color: #000000;">        indate: indate
</span><span style="color: #008080;">162</span> <span style="color: #000000;">      };
</span><span style="color: #008080;">163</span>       <span style="color: #0000ff;">return</span><span style="color: #000000;"> obj;
</span><span style="color: #008080;">164</span> <span style="color: #000000;">    },
</span><span style="color: #008080;">165</span> 
<span style="color: #008080;">166</span>     get: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (key, sign) {
</span><span style="color: #008080;">167</span>       <span style="color: #0000ff;">var</span> result, now = <span style="color: #0000ff;">new</span><span style="color: #000000;"> Date().getTime();
</span><span style="color: #008080;">168</span>       <span style="color: #0000ff;">try</span><span style="color: #000000;"> {
</span><span style="color: #008080;">169</span>         result = <span style="color: #0000ff;">this</span><span style="color: #000000;">.sProxy.getItem(key);
</span><span style="color: #008080;">170</span>         <span style="color: #0000ff;">if</span> (!result) <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;">171</span>         result =<span style="color: #000000;"> JSON.parse(result);
</span><span style="color: #008080;">172</span> 
<span style="color: #008080;">173</span>         <span style="color: #008000;">//</span><span style="color: #008000;">数据过期</span>
<span style="color: #008080;">174</span>         <span style="color: #0000ff;">if</span> (result.timeout &lt; now) <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;">175</span> 
<span style="color: #008080;">176</span>         <span style="color: #008000;">//</span><span style="color: #008000;">需要验证签名</span>
<span style="color: #008080;">177</span>         <span style="color: #0000ff;">if</span><span style="color: #000000;"> (sign) {
</span><span style="color: #008080;">178</span>           <span style="color: #0000ff;">if</span> (sign ===<span style="color: #000000;"> result.sign)
</span><span style="color: #008080;">179</span>             <span style="color: #0000ff;">return</span><span style="color: #000000;"> result.value;
</span><span style="color: #008080;">180</span>           <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;">181</span>         } <span style="color: #0000ff;">else</span><span style="color: #000000;"> {
</span><span style="color: #008080;">182</span>           <span style="color: #0000ff;">return</span><span style="color: #000000;"> result.value;
</span><span style="color: #008080;">183</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">184</span> 
<span style="color: #008080;">185</span>       } <span style="color: #0000ff;">catch</span><span style="color: #000000;"> (e) {
</span><span style="color: #008080;">186</span>         console &amp;&amp;<span style="color: #000000;"> console.log(e);
</span><span style="color: #008080;">187</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">188</span>       <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;">189</span> <span style="color: #000000;">    },
</span><span style="color: #008080;">190</span> 
<span style="color: #008080;">191</span>     <span style="color: #008000;">//</span><span style="color: #008000;">获取签名</span>
<span style="color: #008080;">192</span>     getSign: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (key) {
</span><span style="color: #008080;">193</span>       <span style="color: #0000ff;">var</span> result, sign = <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;">194</span>       <span style="color: #0000ff;">try</span><span style="color: #000000;"> {
</span><span style="color: #008080;">195</span>         result = <span style="color: #0000ff;">this</span><span style="color: #000000;">.sProxy.getItem(key);
</span><span style="color: #008080;">196</span>         <span style="color: #0000ff;">if</span><span style="color: #000000;"> (result) {
</span><span style="color: #008080;">197</span>           result =<span style="color: #000000;"> JSON.parse(result);
</span><span style="color: #008080;">198</span>           sign = result &amp;&amp;<span style="color: #000000;"> result.sign
</span><span style="color: #008080;">199</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">200</span>       } <span style="color: #0000ff;">catch</span><span style="color: #000000;"> (e) {
</span><span style="color: #008080;">201</span>         console &amp;&amp;<span style="color: #000000;"> console.log(e);
</span><span style="color: #008080;">202</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">203</span>       <span style="color: #0000ff;">return</span><span style="color: #000000;"> sign;
</span><span style="color: #008080;">204</span> <span style="color: #000000;">    },
</span><span style="color: #008080;">205</span> 
<span style="color: #008080;">206</span>     remove: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (key) {
</span><span style="color: #008080;">207</span>       <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">.sProxy.removeItem(key);
</span><span style="color: #008080;">208</span> <span style="color: #000000;">    },
</span><span style="color: #008080;">209</span> 
<span style="color: #008080;">210</span>     clear: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">211</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">.sProxy.clear();
</span><span style="color: #008080;">212</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">213</span> <span style="color: #000000;">  });
</span><span style="color: #008080;">214</span> 
<span style="color: #008080;">215</span>   Storage.getInstance = <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">216</span>     <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span><span style="color: #000000;">.instance) {
</span><span style="color: #008080;">217</span>       <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">.instance;
</span><span style="color: #008080;">218</span>     } <span style="color: #0000ff;">else</span><span style="color: #000000;"> {
</span><span style="color: #008080;">219</span>       <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span>.instance = <span style="color: #0000ff;">new</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">();
</span><span style="color: #008080;">220</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">221</span> <span style="color: #000000;">  };
</span><span style="color: #008080;">222</span> 
<span style="color: #008080;">223</span>   <span style="color: #0000ff;">return</span><span style="color: #000000;"> Storage;
</span><span style="color: #008080;">224</span> 
<span style="color: #008080;">225</span> });</pre>
</div>
<span class="cnblogs_code_collapse">storage</span></div>
<p><span style="line-height: 1.5;">真实的使用场景业务model首先得做一层业务封装，然后才是真正的使用：</span></p>
<div class="cnblogs_code" onclick="cnblogs_code_show('f28767a5-3422-4702-9900-cab1f4f7e1d2')"><img id="code_img_closed_f28767a5-3422-4702-9900-cab1f4f7e1d2" class="code_img_closed" src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" alt="" /><img id="code_img_opened_f28767a5-3422-4702-9900-cab1f4f7e1d2" class="code_img_opened" style="display: none;" onclick="cnblogs_code_hide('f28767a5-3422-4702-9900-cab1f4f7e1d2',event)" src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="" />
<div id="cnblogs_code_open_f28767a5-3422-4702-9900-cab1f4f7e1d2" class="cnblogs_code_hide">
<pre><span style="color: #008080;">  1</span> define(['AbstractModel', 'AbstractStore', 'cUser'], <span style="color: #0000ff;">function</span><span style="color: #000000;"> (AbstractModel, AbstractStore, cUser) {
</span><span style="color: #008080;">  2</span> 
<span style="color: #008080;">  3</span>     <span style="color: #0000ff;">var</span> ERROR_CODE =<span style="color: #000000;"> {
</span><span style="color: #008080;">  4</span>         'NOT_LOGIN': '00001'
<span style="color: #008080;">  5</span> <span style="color: #000000;">    };
</span><span style="color: #008080;">  6</span> 
<span style="color: #008080;">  7</span>     <span style="color: #008000;">//</span><span style="color: #008000;">获取产品来源</span>
<span style="color: #008080;">  8</span>     <span style="color: #0000ff;">var</span> getUs = <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">  9</span>         <span style="color: #0000ff;">var</span> us = 'webapp'<span style="color: #000000;">;
</span><span style="color: #008080;"> 10</span>         <span style="color: #008000;">//</span><span style="color: #008000;">其它操作......</span>
<span style="color: #008080;"> 11</span> 
<span style="color: #008080;"> 12</span>         <span style="color: #008000;">//</span><span style="color: #008000;">如果url具有us标志，则首先读取</span>
<span style="color: #008080;"> 13</span>         <span style="color: #0000ff;">if</span><span style="color: #000000;"> (_.getUrlParam().us) {
</span><span style="color: #008080;"> 14</span>             us =<span style="color: #000000;"> _.getUrlParam().us;
</span><span style="color: #008080;"> 15</span> <span style="color: #000000;">        }
</span><span style="color: #008080;"> 16</span>         <span style="color: #0000ff;">return</span><span style="color: #000000;"> us;
</span><span style="color: #008080;"> 17</span> <span style="color: #000000;">    };
</span><span style="color: #008080;"> 18</span> 
<span style="color: #008080;"> 19</span>     <span style="color: #0000ff;">var</span> BaseModel =<span style="color: #000000;"> _.inherit(AbstractModel, {
</span><span style="color: #008080;"> 20</span> 
<span style="color: #008080;"> 21</span>         initDomain: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 22</span>             <span style="color: #0000ff;">var</span> host =<span style="color: #000000;"> window.location.host;
</span><span style="color: #008080;"> 23</span> 
<span style="color: #008080;"> 24</span>             <span style="color: #0000ff;">this</span>.domain =<span style="color: #000000;"> host;
</span><span style="color: #008080;"> 25</span> 
<span style="color: #008080;"> 26</span>             <span style="color: #008000;">//</span><span style="color: #008000;">开发环境</span>
<span style="color: #008080;"> 27</span>             <span style="color: #0000ff;">if</span> (host.indexOf('yexiaochai.baidu.com') != -1<span style="color: #000000;">) {
</span><span style="color: #008080;"> 28</span>                 <span style="color: #0000ff;">this</span>.domain = 'xxx'<span style="color: #000000;">;
</span><span style="color: #008080;"> 29</span> <span style="color: #000000;">            }
</span><span style="color: #008080;"> 30</span> 
<span style="color: #008080;"> 31</span>             <span style="color: #008000;">//</span><span style="color: #008000;">qa环境</span>
<span style="color: #008080;"> 32</span>             <span style="color: #0000ff;">if</span> (host.indexOf('baidu.com') == -1<span style="color: #000000;">) {
</span><span style="color: #008080;"> 33</span>                 <span style="color: #0000ff;">this</span>.domain = 'xxx'<span style="color: #000000;">;
</span><span style="color: #008080;"> 34</span> <span style="color: #000000;">            }
</span><span style="color: #008080;"> 35</span> 
<span style="color: #008080;"> 36</span>             <span style="color: #008000;">//</span><span style="color: #008000;">正式环境</span>
<span style="color: #008080;"> 37</span>             <span style="color: #0000ff;">if</span> (host.indexOf('xxx.baidu.com') != -1 || host.indexOf('xxx.baidu.com') != -1<span style="color: #000000;">) {
</span><span style="color: #008080;"> 38</span>                 <span style="color: #0000ff;">this</span>.domain = 'api.xxx.baidu.com'<span style="color: #000000;">;
</span><span style="color: #008080;"> 39</span> <span style="color: #000000;">            }
</span><span style="color: #008080;"> 40</span> 
<span style="color: #008080;"> 41</span> <span style="color: #000000;">        },
</span><span style="color: #008080;"> 42</span> 
<span style="color: #008080;"> 43</span>         propertys: <span style="color: #0000ff;">function</span><span style="color: #000000;"> ($super) {
</span><span style="color: #008080;"> 44</span> <span style="color: #000000;">            $super();
</span><span style="color: #008080;"> 45</span> 
<span style="color: #008080;"> 46</span>             <span style="color: #0000ff;">this</span><span style="color: #000000;">.initDomain();
</span><span style="color: #008080;"> 47</span> 
<span style="color: #008080;"> 48</span>             <span style="color: #0000ff;">this</span>.path = ''<span style="color: #000000;">;
</span><span style="color: #008080;"> 49</span> 
<span style="color: #008080;"> 50</span>             <span style="color: #0000ff;">this</span>.cacheData = <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 51</span>             <span style="color: #0000ff;">this</span>.param =<span style="color: #000000;"> {
</span><span style="color: #008080;"> 52</span> <span style="color: #000000;">                head: {
</span><span style="color: #008080;"> 53</span> <span style="color: #000000;">                    us: getUs(),
</span><span style="color: #008080;"> 54</span>                     version: '1.0.0'
<span style="color: #008080;"> 55</span> <span style="color: #000000;">                }
</span><span style="color: #008080;"> 56</span> <span style="color: #000000;">            };
</span><span style="color: #008080;"> 57</span>             <span style="color: #0000ff;">this</span>.dataType = 'jsonp'<span style="color: #000000;">;
</span><span style="color: #008080;"> 58</span> 
<span style="color: #008080;"> 59</span>             <span style="color: #0000ff;">this</span>.errorCallback = <span style="color: #0000ff;">function</span><span style="color: #000000;"> () { };
</span><span style="color: #008080;"> 60</span> 
<span style="color: #008080;"> 61</span>             <span style="color: #008000;">//</span><span style="color: #008000;">统一处理分返回验证</span>
<span style="color: #008080;"> 62</span>             <span style="color: #0000ff;">this</span>.pushValidates(<span style="color: #0000ff;">function</span><span style="color: #000000;"> (data) {
</span><span style="color: #008080;"> 63</span>                 <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">.baseDataValidate(data);
</span><span style="color: #008080;"> 64</span> <span style="color: #000000;">            });
</span><span style="color: #008080;"> 65</span> 
<span style="color: #008080;"> 66</span> <span style="color: #000000;">        },
</span><span style="color: #008080;"> 67</span> 
<span style="color: #008080;"> 68</span>         <span style="color: #008000;">//</span><span style="color: #008000;">首轮处理返回数据，检查错误码做统一验证处理</span>
<span style="color: #008080;"> 69</span>         baseDataValidate: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (data) {
</span><span style="color: #008080;"> 70</span>             <span style="color: #0000ff;">if</span> (!<span style="color: #000000;">data) {
</span><span style="color: #008080;"> 71</span>                 window.APP.showToast('服务器出错，请稍候再试', <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 72</span>                     window.location.href = 'xxx'<span style="color: #000000;">;
</span><span style="color: #008080;"> 73</span> <span style="color: #000000;">                });
</span><span style="color: #008080;"> 74</span>                 <span style="color: #0000ff;">return</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 75</span> <span style="color: #000000;">            }
</span><span style="color: #008080;"> 76</span> 
<span style="color: #008080;"> 77</span>             <span style="color: #0000ff;">if</span> (_.isString(data)) data =<span style="color: #000000;"> JSON.parse(data);
</span><span style="color: #008080;"> 78</span>             <span style="color: #0000ff;">if</span> (data.errno === 0) <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">true</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 79</span> 
<span style="color: #008080;"> 80</span>             <span style="color: #008000;">//</span><span style="color: #008000;">处理统一登录逻辑</span>
<span style="color: #008080;"> 81</span>             <span style="color: #0000ff;">if</span> (data.errno == ERROR_CODE['NOT_LOGIN'<span style="color: #000000;">]) {
</span><span style="color: #008080;"> 82</span> <span style="color: #000000;">                cUser.login();
</span><span style="color: #008080;"> 83</span> <span style="color: #000000;">            }
</span><span style="color: #008080;"> 84</span> 
<span style="color: #008080;"> 85</span>             <span style="color: #008000;">//</span><span style="color: #008000;">其它通用错误码的处理逻辑</span>
<span style="color: #008080;"> 86</span>             <span style="color: #0000ff;">if</span> (data.errno ==<span style="color: #000000;"> xxxx) {
</span><span style="color: #008080;"> 87</span>                 <span style="color: #0000ff;">this</span><span style="color: #000000;">.errorCallback();
</span><span style="color: #008080;"> 88</span>                 <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">false</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 89</span> <span style="color: #000000;">            }
</span><span style="color: #008080;"> 90</span> 
<span style="color: #008080;"> 91</span>             <span style="color: #008000;">//</span><span style="color: #008000;">如果出问题则打印错误</span>
<span style="color: #008080;"> 92</span>             <span style="color: #0000ff;">if</span> (window.APP &amp;&amp; data &amp;&amp; data.msg) window.APP.showToast(data.msg, <span style="color: #0000ff;">this</span><span style="color: #000000;">.errorCallback);
</span><span style="color: #008080;"> 93</span> 
<span style="color: #008080;"> 94</span>             <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">false</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 95</span> <span style="color: #000000;">        },
</span><span style="color: #008080;"> 96</span> 
<span style="color: #008080;"> 97</span>         dataformat: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (data) {
</span><span style="color: #008080;"> 98</span>             <span style="color: #0000ff;">if</span> (_.isString(data)) data =<span style="color: #000000;"> JSON.parse(data);
</span><span style="color: #008080;"> 99</span>             <span style="color: #0000ff;">if</span> (data.data) <span style="color: #0000ff;">return</span><span style="color: #000000;"> data.data;
</span><span style="color: #008080;">100</span>             <span style="color: #0000ff;">return</span><span style="color: #000000;"> data;
</span><span style="color: #008080;">101</span> <span style="color: #000000;">        },
</span><span style="color: #008080;">102</span> 
<span style="color: #008080;">103</span>         buildurl: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">104</span>             <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span>.protocol + '://' + <span style="color: #0000ff;">this</span>.domain + <span style="color: #0000ff;">this</span>.path + (<span style="color: #0000ff;">typeof</span> <span style="color: #0000ff;">this</span>.url === 'function' ? <span style="color: #0000ff;">this</span>.url() : <span style="color: #0000ff;">this</span><span style="color: #000000;">.url);
</span><span style="color: #008080;">105</span> <span style="color: #000000;">        },
</span><span style="color: #008080;">106</span> 
<span style="color: #008080;">107</span>         getSign: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">108</span>             <span style="color: #0000ff;">var</span> param = <span style="color: #0000ff;">this</span>.getParam() ||<span style="color: #000000;"> {};
</span><span style="color: #008080;">109</span>             <span style="color: #0000ff;">return</span><span style="color: #000000;"> JSON.stringify(param);
</span><span style="color: #008080;">110</span> <span style="color: #000000;">        },
</span><span style="color: #008080;">111</span> 
<span style="color: #008080;">112</span>         onDataSuccess: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (fdata, data) {
</span><span style="color: #008080;">113</span>             <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.cacheData &amp;&amp; <span style="color: #0000ff;">this</span><span style="color: #000000;">.cacheData.set)
</span><span style="color: #008080;">114</span>                 <span style="color: #0000ff;">this</span>.cacheData.set(fdata, <span style="color: #0000ff;">this</span><span style="color: #000000;">.getSign());
</span><span style="color: #008080;">115</span> <span style="color: #000000;">        },
</span><span style="color: #008080;">116</span> 
<span style="color: #008080;">117</span>         <span style="color: #008000;">//</span><span style="color: #008000;">重写父类getParam方法，加入方法签名</span>
<span style="color: #008080;">118</span>         getParam: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">119</span>             <span style="color: #0000ff;">var</span> param = _.clone(<span style="color: #0000ff;">this</span>.param ||<span style="color: #000000;"> {});
</span><span style="color: #008080;">120</span> 
<span style="color: #008080;">121</span>             <span style="color: #008000;">//</span><span style="color: #008000;">此处对参数进行特殊处理</span>
<span style="color: #008080;">122</span>             <span style="color: #008000;">//</span><span style="color: #008000;">......</span>
<span style="color: #008080;">123</span> 
<span style="color: #008080;">124</span>             <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">.param;
</span><span style="color: #008080;">125</span> <span style="color: #000000;">        },
</span><span style="color: #008080;">126</span> 
<span style="color: #008080;">127</span>         execute: <span style="color: #0000ff;">function</span><span style="color: #000000;"> ($super, onComplete, onError, ajaxOnly, scope) {
</span><span style="color: #008080;">128</span>             <span style="color: #0000ff;">var</span> data = <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;">129</span>             <span style="color: #0000ff;">if</span> (!ajaxOnly &amp;&amp; !<span style="color: #0000ff;">this</span>.ajaxOnly &amp;&amp; <span style="color: #0000ff;">this</span>.cacheData &amp;&amp; <span style="color: #0000ff;">this</span><span style="color: #000000;">.cacheData.get) {
</span><span style="color: #008080;">130</span>                 data = <span style="color: #0000ff;">this</span>.cacheData.get(<span style="color: #0000ff;">this</span><span style="color: #000000;">.getSign());
</span><span style="color: #008080;">131</span>                 <span style="color: #0000ff;">if</span><span style="color: #000000;"> (data) {
</span><span style="color: #008080;">132</span> <span style="color: #000000;">                    onComplete(data);
</span><span style="color: #008080;">133</span>                     <span style="color: #0000ff;">return</span><span style="color: #000000;">;
</span><span style="color: #008080;">134</span> <span style="color: #000000;">                }
</span><span style="color: #008080;">135</span> <span style="color: #000000;">            }
</span><span style="color: #008080;">136</span> 
<span style="color: #008080;">137</span>             <span style="color: #008000;">//</span><span style="color: #008000;">记录请求发出</span>
<span style="color: #008080;">138</span> <span style="color: #000000;">            $super(onComplete, onError, ajaxOnly, scope);
</span><span style="color: #008080;">139</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">140</span> 
<span style="color: #008080;">141</span> <span style="color: #000000;">    });
</span><span style="color: #008080;">142</span> 
<span style="color: #008080;">143</span>     <span style="color: #008000;">//</span><span style="color: #008000;">localstorage存储类</span>
<span style="color: #008080;">144</span>     <span style="color: #0000ff;">var</span> Store =<span style="color: #000000;"> {
</span><span style="color: #008080;">145</span> <span style="color: #000000;">        RequestStore: _.inherit(AbstractStore, {
</span><span style="color: #008080;">146</span>             <span style="color: #008000;">//</span><span style="color: #008000;">默认属性</span>
<span style="color: #008080;">147</span>             propertys: <span style="color: #0000ff;">function</span><span style="color: #000000;"> ($super) {
</span><span style="color: #008080;">148</span> <span style="color: #000000;">                $super();
</span><span style="color: #008080;">149</span>                 <span style="color: #0000ff;">this</span>.key = 'BUS_RequestStore'<span style="color: #000000;">;
</span><span style="color: #008080;">150</span>                 <span style="color: #0000ff;">this</span>.lifeTime = '1D'; <span style="color: #008000;">//</span><span style="color: #008000;">缓存时间</span>
<span style="color: #008080;">151</span> <span style="color: #000000;">            }
</span><span style="color: #008080;">152</span> <span style="color: #000000;">        })
</span><span style="color: #008080;">153</span> <span style="color: #000000;">    };
</span><span style="color: #008080;">154</span> 
<span style="color: #008080;">155</span>     <span style="color: #008000;">//</span><span style="color: #008000;">返回真实的业务类</span>
<span style="color: #008080;">156</span>     <span style="color: #0000ff;">return</span><span style="color: #000000;"> {
</span><span style="color: #008080;">157</span>         <span style="color: #008000;">//</span><span style="color: #008000;">真实的业务请求</span>
<span style="color: #008080;">158</span> <span style="color: #000000;">        requestModel: _.inherit(BaseModel, {
</span><span style="color: #008080;">159</span>             <span style="color: #008000;">//</span><span style="color: #008000;">默认属性</span>
<span style="color: #008080;">160</span>             propertys: <span style="color: #0000ff;">function</span><span style="color: #000000;"> ($super) {
</span><span style="color: #008080;">161</span> <span style="color: #000000;">                $super();
</span><span style="color: #008080;">162</span>                 <span style="color: #0000ff;">this</span>.url = '/url'<span style="color: #000000;">;
</span><span style="color: #008080;">163</span>                 <span style="color: #0000ff;">this</span>.ajaxOnly = <span style="color: #0000ff;">false</span><span style="color: #000000;">;
</span><span style="color: #008080;">164</span>                 <span style="color: #0000ff;">this</span>.cacheData =<span style="color: #000000;"> Store.RequestStore.getInstance();
</span><span style="color: #008080;">165</span> <span style="color: #000000;">            }
</span><span style="color: #008080;">166</span> <span style="color: #000000;">        })
</span><span style="color: #008080;">167</span> <span style="color: #000000;">    };
</span><span style="color: #008080;">168</span> });</pre>
</div>
<span class="cnblogs_code_collapse">业务封装</span></div>
<div class="cnblogs_code">
<pre><span style="color: #008080;"> 1</span> define(['BusinessModel'], <span style="color: #0000ff;">function</span><span style="color: #000000;"> (Model) {
</span><span style="color: #008080;"> 2</span>     <span style="color: #0000ff;">var</span> model =<span style="color: #000000;"> Model.requestModel.getInstance();
</span><span style="color: #008080;"> 3</span> 
<span style="color: #008080;"> 4</span>     <span style="color: #008000;">//</span><span style="color: #008000;">设置请求参数</span>
<span style="color: #008080;"> 5</span> <span style="color: #000000;">    model.setParam();
</span><span style="color: #008080;"> 6</span>     model.execute(<span style="color: #0000ff;">function</span><span style="color: #000000;"> (data) {
</span><span style="color: #008080;"> 7</span>         <span style="color: #008000;">//</span><span style="color: #008000;">这里的data，如果model设置的完善，则前端使用可完全信任其可用性不用做判断了</span>
<span style="color: #008080;"> 8</span> 
<span style="color: #008080;"> 9</span>         <span style="color: #008000;">//</span><span style="color: #008000;">这个是不需要的</span>
<span style="color: #008080;">10</span>         <span style="color: #0000ff;">if</span> (data.person &amp;&amp;<span style="color: #000000;"> data.person.name) {
</span><span style="color: #008080;">11</span>             <span style="color: #008000;">//</span><span style="color: #008000;">...</span>
<span style="color: #008080;">12</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">13</span> 
<span style="color: #008080;">14</span>         <span style="color: #008000;">//</span><span style="color: #008000;">根据数据渲染页面</span>
<span style="color: #008080;">15</span>         <span style="color: #008000;">//</span><span style="color: #008000;">......</span>
<span style="color: #008080;">16</span> <span style="color: #000000;">    });
</span><span style="color: #008080;">17</span> })</pre>
</div>
<h1>复杂的前端页面</h1>
<p>我觉得三端的开发中，前端的业务是最复杂的，因为IOS与Andriod的落地页往往都是首页，而前端的落地页可能是任何页面（产品列表页，订单填写页，订单详情页等），<span style="line-height: 1.5;">因为用户完全可能把这个url告诉朋友，让朋友直接进入这个产品填写页。</span></p>
<p>而随着业务发展、需求迭代，前端的页面可能更加复杂，最初稳定的页面承受了来自多方的挑战。这个情况在我们团队大概是这样的：</p>
<p>在第一轮产品做完后，产品马上安排了第二轮迭代，这次迭代的重点是订单填写页，对订单填写有以下需求：</p>
<p>① 新增优惠券功能</p>
<p>② 优惠券在H5站点下默认不使用，在IOS、andriod下默认使用（刚好这个时候IOS还在用H5的页面囧囧囧）</p>
<p>③ 默认自动填入用户上一次的信息（站点常用功能）</p>
<p>这里1、3是正常功能迭代，但是需求2可以说是IOS APP 暂时使用H5站点的页面，因为当时IOS已经招到了足够的人，也正在进行订单填写的开发，事实上一个月以后他们APP便换掉了H5的订单填写，那么这个时候将对应IOS的逻辑写到自己的主逻辑中是非常愚蠢的，而且后续的发展更是超出了所料，因为H5站点的容器变成了：</p>
<p>① IOS APP装载部分H5页面</p>
<p>② Andriod APP装载部分H5页面</p>
<p>PS：这里之所以把andriod和ios分开，因为andriod都开发了20多天了，ios才招到一个人，他们对H5页面的需求完全是两回事囧！</p>
<p>③ 手机百度装载H5页面（基本与H5站点逻辑一致，有一些特殊需求，比如登录、支付需要使用clouda调用apk）</p>
<p>④ 百度地图webview容器</p>
<p>于是整个人就一下傻逼了，因为主逻辑基本相似，总有容器会希望一点特殊需求，从重构角度来说，我们不会希望我们的业务中出现上述代码太多的if else；</p>
<p>从性能优化角度来说，就普通浏览器根本不需要理睬Hybrid交互相关，这个时候我们完善的框架便派上了用场，抽离公共部分了：</p>
<p><img src="http://images2015.cnblogs.com/blog/294743/201509/294743-20150926160302381-1790762979.png" alt="" width="670" height="441" /></p>
<p>H5仍然只关注主逻辑，并且将内部的每部操作尽可能的细化，比如初始化操作，对某一个按钮的点击行为等都应该尽可能的分解到一个个独立的方法中，真实项目大概是这个样子的：</p>
<p><img src="http://images2015.cnblogs.com/blog/294743/201509/294743-20150926160547319-197243914.jpg" alt="" /></p>
<p>依赖框架自带的继承抽象，以及控制器路由层的按环境加载的机制，可以有效解决此类问题，也有效降低了页面的复杂度，但是他改变不了页面越来越复杂的事实，并且这个时候迎来了第三轮迭代：</p>
<p>① 加入保险功能</p>
<p>② H5站点在<span style="color: #ff0000;">某些渠道下</span>默认开启使用优惠券功能（囧囧囧！！！）</p>
<p>③ 限制优惠券必须达到某些条件才能使用</p>
<p>④ 订单填写页作为某一合作方的落地页，请求参数和url有所变化，但是返回的字段一致，交互一致......</p>
<p>因为最初20天的慌乱处理，加之随后两轮的迭代，我已经在订单填写页中买下了太多坑，而且网页中随处可见的dom操作让代码可维护程度大大降低，而点击某一按钮而导致的连锁变化经常发生，比如，用户增减购买商品数量时：</p>
<p>① 会改变本身商品数量的展示</p>
<p>② 会根据当前条件去刷新优惠卷使用数据</p>
<p>③ 改变支付条上的最终总额</p>
<p>④ ......</p>
<p>于是这次迭代后，你会发现订单填写页尼玛经常出BUG，每次改了又会有地方出BUG，一段时间不在，同事帮助修复了一个BUG，又引起了其它三个BUG，这个时候迎来了第四轮迭代，而这种种迹象表明：</p>
<div class="cnblogs_code">
<pre><span style="color: #800000;">如果一个页面开始频繁的出BUG，如果一个页面逻辑越来越复杂，如果一个页面的代码你觉得不好维护了，那么意味着，他应该得到应有的重构了！</span></pre>
</div>
<h1>前端的MVC</h1>
<h2>不太MVC的做法</h2>
<p>如果在你的页面（会长久维护的项目）中有以下情况的话，也许你应该重构你的页面或者换掉你框架了：</p>
<p>① 在js中大规模的拼接HTML，比如这样：</p>
<div class="cnblogs_code">
<pre><span style="color: #008080;"> 1</span> <span style="color: #0000ff;">for</span> (i = 0; i &lt; len; i++<span style="color: #000000;">) {
</span><span style="color: #008080;"> 2</span>     <span style="color: #0000ff;">for</span> (key <span style="color: #0000ff;">in</span><span style="color: #000000;"> data[i]) {
</span><span style="color: #008080;"> 3</span>         item =<span style="color: #000000;"> data[i][key];
</span><span style="color: #008080;"> 4</span>         len2 =<span style="color: #000000;"> item.length;
</span><span style="color: #008080;"> 5</span>         <span style="color: #0000ff;">if</span> (len2 === 0) <span style="color: #0000ff;">continue</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 6</span>         str += '&lt;h2 class="wa-xxx-groupname"&gt;' + key + '&lt;/h2&gt;'<span style="color: #000000;">;
</span><span style="color: #008080;"> 7</span>         str += '&lt;ul class=" wa-xxx-city-list-item "&gt;'<span style="color: #000000;">;
</span><span style="color: #008080;"> 8</span>         <span style="color: #0000ff;">for</span> (j = 0; j &lt; len2; j++<span style="color: #000000;">) {
</span><span style="color: #008080;"> 9</span>             str += '&lt;li data-type="' + item[j].type + '" data-city="' + item[j].regionid + '"&gt;' + item[j].cnname + '&lt;/li&gt;'<span style="color: #000000;">;
</span><span style="color: #008080;">10</span> <span style="color: #000000;">        }
</span><span style="color: #008080;">11</span>         str += '&lt;/ul&gt;'<span style="color: #000000;">;
</span><span style="color: #008080;">12</span>         <span style="color: #0000ff;">break</span><span style="color: #000000;">;
</span><span style="color: #008080;">13</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">14</span>     <span style="color: #0000ff;">if</span> (str !== ''<span style="color: #000000;">)
</span><span style="color: #008080;">15</span>         html.push('&lt;div class="wa-xxx-city-list"&gt;' + str + '&lt;/div&gt;'<span style="color: #000000;">);
</span><span style="color: #008080;">16</span>     str = ''<span style="color: #000000;">;
</span><span style="color: #008080;">17</span> }</pre>
</div>
<p>对于这个情况，你应该使用前端模板引擎</p>
<p>② 在js中出现大规模的获取非文本框元素的值</p>
<p>③ 在html页面中看到了大规模的数据钩子，比如这个样子：</p>
<p><img src="http://images2015.cnblogs.com/blog/294743/201509/294743-20150926163443740-1759168965.jpg" alt="" width="553" height="163" /></p>
<p>④ 你在js中发现，一个数据由js变量可获取，也可以由dom获取，并你对从哪获取数据犹豫不决</p>
<p>⑤ 在你的页面中，click事件分散到一个页面的各个地方</p>
<p>⑥ 当你的js文件超过1000行，并且你觉得没法拆分</p>
<p>以上种种迹象表明，哟！这个页面好像要被玩坏了，好像可以用MVC的思想重构一下啦！</p>
<h2>什么是MVC</h2>
<p>其实MVC这个东西有点悬，一般人压根都不知道他是干嘛的，就知道一个model-view-controller；</p>
<p>知道一点的又说不清楚；</p>
<p>真正懂的人要么喜欢东扯西扯，要么不愿意写博客或者博客一来便很难，曲高和寡。</p>
<p>所以前端MVC这个东西一直是一个玄之又玄的东西，很多开发了很久的朋友都不能了解什么是MVC。</p>
<p>今天我作为一个自认为懂得一点的人，便来说一说我对MVC在前端的认识，希望对大家有帮助。</p>
<p>前端给大家的认识便是页面，页面由HTML+CSS实现，如果有交互便需要JS的介入，其中：</p>
<div class="cnblogs_code">
<pre><span style="color: #800000;">对于真实的业务来说，HTML&amp;CSS是零件，JS是搬运工，数据是设计图与指令。
JS要根据数据指令将零件组装为玩具，用户操作了玩具导致了数据变化，于是JS又根据数据指令重新组装玩具
我们事实上不写代码，我们只是数据的搬运工</span></pre>
</div>
<p>上述例子可能不一定准确，但他可以表达一些中心思想，那就是：</p>
<div class="cnblogs_code">
<pre><span style="color: #800000;">对于页面来说，要展示的只是数据</span></pre>
</div>
<p>所以，数据才是我们应该关注的核心，这里回到我们MVC的基本概念：</p>
<p>MVC即Model-View-Controller三个词的缩写</p>
<h3>Model</h3>
<p>是数据模型，是客观事物的一种抽象，比如机票订单填写的常用联系人模块便可以抽象为一个Model类，他会有一次航班最多可选择多少联系人这种被当前业务限制的属性，并且会有增减联系人、获取联系人、获取最大可设置联系人等业务数据。</p>
<p>Model应该是一个比较稳定的模块，不会经常变化并且可被重用的模块；当然最重要的是，每一次数据变化便会有一个通知机制，通知所有的controller对数据变化做出响应</p>
<h3>View</h3>
<p>View就是视图，在前端中甚至可简单理解为html模板，Controller会根据数据组装为最终的html字符串，然后展示给我们，至于怎么展示是CSS的事情，我们这里不太关注。</p>
<p>PS：一般来说，过于复杂的if else流程判断，不应该出现在view中，那是controller该做的事情</p>
<p>当然并不是每次model变化controller都需要完整的渲染页面，也有可能一次model改变，其响应的controller只是操作了一次dom，只要model的controller足够细分，每个controller就算是在操作dom也是无所谓的</p>
<h3>Controller</h3>
<p>控制器其实就是负责与View以及Model打交道的，因为View与Model应该没有任何交互，model中不会出现html标签，html标签也不应该出现完整的model对应数据，更不会有model数据的增删</p>
<p>PS：html标签当然需要一些关键model值用于controller获取model相关标志了</p>
<p>这里拷贝一个图示来帮助我们解析：</p>
<p><img src="http://images.cnitblog.com/i/294743/201405/241345585123980.png" alt="" /></p>
<p>这个图基本可以表达清楚MVC是干嘛的，但是却不能帮助新手很好的了解什么是MVC，因为真实的场景可能是这样的：</p>
<p>一个model实例化完毕，通知controller1去更新了view</p>
<p>view发生了click交互通过controller2改变了model的值</p>
<p>model马上通知了controller3、controller4、controller5响应数据变化</p>
<p>所以这里controller影响的model可能不止一个，而model通知的controller也不止一个，会引起的界面连锁反应，上图可能会误导初学者只有一个controller在做这些事情。</p>
<p>这里举一个简单的例子说明情况：</p>
<p>① 大家看到新浪微博首页，你发了一条微博，这个时候你关注的好友转发了该微博</p>
<p>② 服务器响应这次微博，并且将这次新增微博推送给了你（也有可能是页面有一个js不断轮询去拉取数据），总之最后数据变了，你的微博Model马上将这次数据变化通知了至少以下响应程序：</p>
<p>1）消息通知控制器，他引起了右上角消息变化，用户看见了有人转发我的weib</p>
<p>2）微博主页面显示多了一条微博，让我们点击查看</p>
<p>3）......</p>
<p>这是一条微博新增产生的变化，如果页面想再多一个模块响应变化，只需要在微博Model的控制器集合中新增一个控制器即可</p>
<h2>MVC的实现</h2>
<p>千言不如一码，我这里临时设计一个例子并书写代码来说明自己对MVC的认识，，考虑到简单，便不使用模块化了，我们设计了一个博客页面，大概是这个样子的：</p>
<p><img src="http://images2015.cnblogs.com/blog/294743/201509/294743-20150926182247319-314660730.jpg" alt="" /></p>
<p>无论什么功能，都需要第三方库，我们这里选择了：</p>
<p>① zepto</p>
<p>② underscore</p>
<p>这里依旧用到了我们的继承机制，如果对这个不熟悉的朋友烦请看看我之前的博客：<a id="cb_post_title_url" class="postTitle2" href="http://www.cnblogs.com/yexiaochai/p/3530269.html">【一次面试】再谈javascript中的继承</a></p>
<h3>Model的实现</h3>
<p>我们只是数据的搬运工，所以要以数据为先，这里先设计了Model的基类：</p>
<div class="cnblogs_code" onclick="cnblogs_code_show('3248510c-e4d2-4362-a3a3-8e8c1a5c7efc')"><img id="code_img_closed_3248510c-e4d2-4362-a3a3-8e8c1a5c7efc" class="code_img_closed" src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" alt="" /><img id="code_img_opened_3248510c-e4d2-4362-a3a3-8e8c1a5c7efc" class="code_img_opened" style="display: none;" onclick="cnblogs_code_hide('3248510c-e4d2-4362-a3a3-8e8c1a5c7efc',event)" src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="" />
<div id="cnblogs_code_open_3248510c-e4d2-4362-a3a3-8e8c1a5c7efc" class="cnblogs_code_hide">
<pre><span style="color: #008080;">  1</span> <span style="color: #0000ff;">var</span> AbstractModel =<span style="color: #000000;"> _.inherit({
</span><span style="color: #008080;">  2</span>   initialize: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (opts) {
</span><span style="color: #008080;">  3</span>     <span style="color: #0000ff;">this</span><span style="color: #000000;">.propertys();
</span><span style="color: #008080;">  4</span>     <span style="color: #0000ff;">this</span><span style="color: #000000;">.setOption(opts);
</span><span style="color: #008080;">  5</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">  6</span> 
<span style="color: #008080;">  7</span>   propertys: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">  8</span>     <span style="color: #008000;">//</span><span style="color: #008000;">只取页面展示需要数据</span>
<span style="color: #008080;">  9</span>     <span style="color: #0000ff;">this</span>.data =<span style="color: #000000;"> {};
</span><span style="color: #008080;"> 10</span> 
<span style="color: #008080;"> 11</span>     <span style="color: #008000;">//</span><span style="color: #008000;">局部数据改变对应的响应程序，暂定为一个方法</span>
<span style="color: #008080;"> 12</span>     <span style="color: #008000;">//</span><span style="color: #008000;">可以是一个类的实例，如果是实例必须有render方法</span>
<span style="color: #008080;"> 13</span>     <span style="color: #0000ff;">this</span>.controllers =<span style="color: #000000;"> {};
</span><span style="color: #008080;"> 14</span> 
<span style="color: #008080;"> 15</span>     <span style="color: #008000;">//</span><span style="color: #008000;">全局初始化数据时候调用的控制器</span>
<span style="color: #008080;"> 16</span>     <span style="color: #0000ff;">this</span>.initController = <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 17</span> 
<span style="color: #008080;"> 18</span>     <span style="color: #0000ff;">this</span>.scope = <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 19</span> 
<span style="color: #008080;"> 20</span> <span style="color: #000000;">  },
</span><span style="color: #008080;"> 21</span> 
<span style="color: #008080;"> 22</span>   addController: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (k, v) {
</span><span style="color: #008080;"> 23</span>     <span style="color: #0000ff;">if</span> (!k || !v) <span style="color: #0000ff;">return</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 24</span>     <span style="color: #0000ff;">this</span>.controllers[k] =<span style="color: #000000;"> v;
</span><span style="color: #008080;"> 25</span> <span style="color: #000000;">  },
</span><span style="color: #008080;"> 26</span> 
<span style="color: #008080;"> 27</span>   removeController: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (k) {
</span><span style="color: #008080;"> 28</span>     <span style="color: #0000ff;">if</span> (!k) <span style="color: #0000ff;">return</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 29</span>     <span style="color: #0000ff;">delete</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">.controllers[k];
</span><span style="color: #008080;"> 30</span> <span style="color: #000000;">  },
</span><span style="color: #008080;"> 31</span> 
<span style="color: #008080;"> 32</span>   setOption: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (opts) {
</span><span style="color: #008080;"> 33</span>     <span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> k <span style="color: #0000ff;">in</span><span style="color: #000000;"> opts) {
</span><span style="color: #008080;"> 34</span>       <span style="color: #0000ff;">this</span>[k] =<span style="color: #000000;"> opts[k];
</span><span style="color: #008080;"> 35</span> <span style="color: #000000;">    }
</span><span style="color: #008080;"> 36</span> <span style="color: #000000;">  },
</span><span style="color: #008080;"> 37</span> 
<span style="color: #008080;"> 38</span>   <span style="color: #008000;">//</span><span style="color: #008000;">首次初始化时，需要矫正数据，比如做服务器适配</span>
<span style="color: #008080;"> 39</span>   <span style="color: #008000;">//</span><span style="color: #008000;">@override</span>
<span style="color: #008080;"> 40</span>   handleData: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () { },
</span><span style="color: #008080;"> 41</span> 
<span style="color: #008080;"> 42</span>   <span style="color: #008000;">//</span><span style="color: #008000;">一般用于首次根据服务器数据源填充数据</span>
<span style="color: #008080;"> 43</span>   initData: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (data) {
</span><span style="color: #008080;"> 44</span>     <span style="color: #0000ff;">var</span><span style="color: #000000;"> k;
</span><span style="color: #008080;"> 45</span>     <span style="color: #0000ff;">if</span> (!data) <span style="color: #0000ff;">return</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 46</span> 
<span style="color: #008080;"> 47</span>     <span style="color: #008000;">//</span><span style="color: #008000;">如果默认数据没有被覆盖可能有误</span>
<span style="color: #008080;"> 48</span>     <span style="color: #0000ff;">for</span> (k <span style="color: #0000ff;">in</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">.data) {
</span><span style="color: #008080;"> 49</span>       <span style="color: #0000ff;">if</span> (data[k]) <span style="color: #0000ff;">this</span>.data[k] =<span style="color: #000000;"> data[k];
</span><span style="color: #008080;"> 50</span> <span style="color: #000000;">    }
</span><span style="color: #008080;"> 51</span> 
<span style="color: #008080;"> 52</span>     <span style="color: #0000ff;">this</span><span style="color: #000000;">.handleData();
</span><span style="color: #008080;"> 53</span> 
<span style="color: #008080;"> 54</span>     <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.initController &amp;&amp; <span style="color: #0000ff;">this</span><span style="color: #000000;">.get()) {
</span><span style="color: #008080;"> 55</span>       <span style="color: #0000ff;">this</span>.initController.call(<span style="color: #0000ff;">this</span>.scope, <span style="color: #0000ff;">this</span><span style="color: #000000;">.get());
</span><span style="color: #008080;"> 56</span> <span style="color: #000000;">    }
</span><span style="color: #008080;"> 57</span> 
<span style="color: #008080;"> 58</span> <span style="color: #000000;">  },
</span><span style="color: #008080;"> 59</span> 
<span style="color: #008080;"> 60</span>   <span style="color: #008000;">//</span><span style="color: #008000;">验证data的有效性，如果无效的话，不应该进行以下逻辑，并且应该报警</span>
<span style="color: #008080;"> 61</span>   <span style="color: #008000;">//</span><span style="color: #008000;">@override</span>
<span style="color: #008080;"> 62</span>   validateData: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 63</span>     <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">true</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 64</span> <span style="color: #000000;">  },
</span><span style="color: #008080;"> 65</span> 
<span style="color: #008080;"> 66</span>   <span style="color: #008000;">//</span><span style="color: #008000;">获取数据前，可以进行格式化</span>
<span style="color: #008080;"> 67</span>   <span style="color: #008000;">//</span><span style="color: #008000;">@override</span>
<span style="color: #008080;"> 68</span>   formatData: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (data) {
</span><span style="color: #008080;"> 69</span>     <span style="color: #0000ff;">return</span><span style="color: #000000;"> data;
</span><span style="color: #008080;"> 70</span> <span style="color: #000000;">  },
</span><span style="color: #008080;"> 71</span> 
<span style="color: #008080;"> 72</span>   <span style="color: #008000;">//</span><span style="color: #008000;">获取数据</span>
<span style="color: #008080;"> 73</span>   get: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 74</span>     <span style="color: #0000ff;">if</span> (!<span style="color: #0000ff;">this</span><span style="color: #000000;">.validateData()) {
</span><span style="color: #008080;"> 75</span>       <span style="color: #008000;">//</span><span style="color: #008000;">需要log</span>
<span style="color: #008080;"> 76</span>       <span style="color: #0000ff;">return</span><span style="color: #000000;"> {};
</span><span style="color: #008080;"> 77</span> <span style="color: #000000;">    }
</span><span style="color: #008080;"> 78</span>     <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span>.formatData(<span style="color: #0000ff;">this</span><span style="color: #000000;">.data);
</span><span style="color: #008080;"> 79</span> <span style="color: #000000;">  },
</span><span style="color: #008080;"> 80</span> 
<span style="color: #008080;"> 81</span>   _update: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (key, data) {
</span><span style="color: #008080;"> 82</span>     <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">typeof</span> <span style="color: #0000ff;">this</span>.controllers[key] === 'function'<span style="color: #000000;">)
</span><span style="color: #008080;"> 83</span>       <span style="color: #0000ff;">this</span>.controllers[key].call(<span style="color: #0000ff;">this</span><span style="color: #000000;">.scope, data);
</span><span style="color: #008080;"> 84</span>     <span style="color: #0000ff;">else</span> <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">typeof</span> <span style="color: #0000ff;">this</span>.controllers[key].render === 'function'<span style="color: #000000;">)
</span><span style="color: #008080;"> 85</span>       <span style="color: #0000ff;">this</span>.controllers[key].render.call(<span style="color: #0000ff;">this</span><span style="color: #000000;">.scope, data);
</span><span style="color: #008080;"> 86</span> <span style="color: #000000;">  },
</span><span style="color: #008080;"> 87</span> 
<span style="color: #008080;"> 88</span>   <span style="color: #008000;">//</span><span style="color: #008000;">数据跟新后需要做的动作，执行对应的controller改变dom</span>
<span style="color: #008080;"> 89</span>   <span style="color: #008000;">//</span><span style="color: #008000;">@override</span>
<span style="color: #008080;"> 90</span>   update: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (key) {
</span><span style="color: #008080;"> 91</span>     <span style="color: #0000ff;">var</span> data = <span style="color: #0000ff;">this</span><span style="color: #000000;">.get();
</span><span style="color: #008080;"> 92</span>     <span style="color: #0000ff;">var</span><span style="color: #000000;"> k;
</span><span style="color: #008080;"> 93</span>     <span style="color: #0000ff;">if</span> (!data) <span style="color: #0000ff;">return</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 94</span> 
<span style="color: #008080;"> 95</span>     <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span><span style="color: #000000;">.controllers[key]) {
</span><span style="color: #008080;"> 96</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">._update(key, data);
</span><span style="color: #008080;"> 97</span>       <span style="color: #0000ff;">return</span><span style="color: #000000;">;
</span><span style="color: #008080;"> 98</span> <span style="color: #000000;">    }
</span><span style="color: #008080;"> 99</span> 
<span style="color: #008080;">100</span>     <span style="color: #0000ff;">for</span> (k <span style="color: #0000ff;">in</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">.controllers) {
</span><span style="color: #008080;">101</span>       <span style="color: #0000ff;">this</span><span style="color: #000000;">._update(k, data);
</span><span style="color: #008080;">102</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">103</span> <span style="color: #000000;">  }
</span><span style="color: #008080;">104</span> });</pre>
</div>
<span class="cnblogs_code_collapse">View Code</span></div>
<p><span style="line-height: 1.5;">然后我们开始设计真正的博客相关model：</span></p>
<div class="cnblogs_code">
<pre><span style="color: #008080;"> 1</span> <span style="color: #008000;">//</span><span style="color: #008000;">博客的model模块应该是完全独立与页面的主流层的，并且可复用</span>
<span style="color: #008080;"> 2</span> <span style="color: #0000ff;">var</span> Model =<span style="color: #000000;"> _.inherit(AbstractModel, {
</span><span style="color: #008080;"> 3</span>   propertys: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 4</span>     <span style="color: #0000ff;">this</span>.data =<span style="color: #000000;"> {
</span><span style="color: #008080;"> 5</span> <span style="color: #000000;">      blogs: []
</span><span style="color: #008080;"> 6</span> <span style="color: #000000;">    };
</span><span style="color: #008080;"> 7</span> <span style="color: #000000;">  },
</span><span style="color: #008080;"> 8</span>   <span style="color: #008000;">//</span><span style="color: #008000;">新增博客</span>
<span style="color: #008080;"> 9</span>   add: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (title, type, label) {
</span><span style="color: #008080;">10</span>     <span style="color: #008000;">//</span><span style="color: #008000;">做数据校验，具体要多严格由业务决定</span>
<span style="color: #008080;">11</span>     <span style="color: #0000ff;">if</span> (!title || !type) <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;">12</span> 
<span style="color: #008080;">13</span>     <span style="color: #0000ff;">var</span> blog =<span style="color: #000000;"> {};
</span><span style="color: #008080;">14</span>     blog.id = 'blog_' +<span style="color: #000000;"> _.uniqueId();
</span><span style="color: #008080;">15</span>     blog.title =<span style="color: #000000;"> title;
</span><span style="color: #008080;">16</span>     blog.type =<span style="color: #000000;"> type;
</span><span style="color: #008080;">17</span>     <span style="color: #0000ff;">if</span> (label) blog.label = label.split(','<span style="color: #000000;">);
</span><span style="color: #008080;">18</span>     <span style="color: #0000ff;">else</span> blog.label =<span style="color: #000000;"> [];
</span><span style="color: #008080;">19</span> 
<span style="color: #008080;">20</span>     <span style="color: #0000ff;">this</span><span style="color: #000000;">.data.blogs.push(blog);
</span><span style="color: #008080;">21</span> 
<span style="color: #008080;">22</span>     <span style="color: #008000;">//</span><span style="color: #008000;">通知各个控制器变化</span>
<span style="color: #008080;">23</span>     <span style="color: #0000ff;">this</span><span style="color: #000000;">.update();
</span><span style="color: #008080;">24</span> 
<span style="color: #008080;">25</span>     <span style="color: #0000ff;">return</span><span style="color: #000000;"> blog;
</span><span style="color: #008080;">26</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">27</span>   <span style="color: #008000;">//</span><span style="color: #008000;">删除某一博客</span>
<span style="color: #008080;">28</span>   remove: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (id) {
</span><span style="color: #008080;">29</span>     <span style="color: #0000ff;">if</span> (!id) <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;">30</span>     <span style="color: #0000ff;">var</span><span style="color: #000000;"> i, len, data;
</span><span style="color: #008080;">31</span>     <span style="color: #0000ff;">for</span> (i = 0, len = <span style="color: #0000ff;">this</span>.data.blogs.length; i &lt; len; i++<span style="color: #000000;">) {
</span><span style="color: #008080;">32</span>       <span style="color: #0000ff;">if</span> (<span style="color: #0000ff;">this</span>.data.blogs[i].id ===<span style="color: #000000;"> id) {
</span><span style="color: #008080;">33</span>         data = <span style="color: #0000ff;">this</span>.data.blogs.splice(i, 1<span style="color: #000000;">)
</span><span style="color: #008080;">34</span>         <span style="color: #0000ff;">this</span><span style="color: #000000;">.update();
</span><span style="color: #008080;">35</span>         <span style="color: #0000ff;">return</span><span style="color: #000000;"> data;
</span><span style="color: #008080;">36</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">37</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">38</span>     <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">null</span><span style="color: #000000;">;
</span><span style="color: #008080;">39</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">40</span>   <span style="color: #008000;">//</span><span style="color: #008000;">获取所有类型映射表</span>
<span style="color: #008080;">41</span>   getTypeInfo: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">42</span>     <span style="color: #0000ff;">var</span> obj =<span style="color: #000000;"> {};
</span><span style="color: #008080;">43</span>     <span style="color: #0000ff;">var</span><span style="color: #000000;"> i, len, type;
</span><span style="color: #008080;">44</span>     <span style="color: #0000ff;">for</span> (i = 0, len = <span style="color: #0000ff;">this</span>.data.blogs.length; i &lt; len; i++<span style="color: #000000;">) {
</span><span style="color: #008080;">45</span>       type = <span style="color: #0000ff;">this</span><span style="color: #000000;">.data.blogs[i].type;
</span><span style="color: #008080;">46</span>       <span style="color: #0000ff;">if</span> (!obj[type]) obj[type] = 1<span style="color: #000000;">;
</span><span style="color: #008080;">47</span>       <span style="color: #0000ff;">else</span> obj[type] = obj[type] + 1<span style="color: #000000;">;
</span><span style="color: #008080;">48</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">49</span>     <span style="color: #0000ff;">return</span><span style="color: #000000;"> obj;
</span><span style="color: #008080;">50</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">51</span>   <span style="color: #008000;">//</span><span style="color: #008000;">获取标签映射表</span>
<span style="color: #008080;">52</span>   getLabelInfo: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">53</span>     <span style="color: #0000ff;">var</span> obj =<span style="color: #000000;"> {}, label;
</span><span style="color: #008080;">54</span>     <span style="color: #0000ff;">var</span><span style="color: #000000;"> i, len, j, len1, blog, label;
</span><span style="color: #008080;">55</span>     <span style="color: #0000ff;">for</span> (i = 0, len = <span style="color: #0000ff;">this</span>.data.blogs.length; i &lt; len; i++<span style="color: #000000;">) {
</span><span style="color: #008080;">56</span>       blog = <span style="color: #0000ff;">this</span><span style="color: #000000;">.data.blogs[i];
</span><span style="color: #008080;">57</span>       <span style="color: #0000ff;">for</span> (j = 0, len1 = blog.label.length; j &lt; len1; j++<span style="color: #000000;">) {
</span><span style="color: #008080;">58</span>         label =<span style="color: #000000;"> blog.label[j];
</span><span style="color: #008080;">59</span>         <span style="color: #0000ff;">if</span> (!obj[label]) obj[label] = 1<span style="color: #000000;">;
</span><span style="color: #008080;">60</span>         <span style="color: #0000ff;">else</span> obj[label] = obj[label] + 1<span style="color: #000000;">;
</span><span style="color: #008080;">61</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">62</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">63</span>     <span style="color: #0000ff;">return</span><span style="color: #000000;"> obj;
</span><span style="color: #008080;">64</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">65</span>   <span style="color: #008000;">//</span><span style="color: #008000;">获取总数</span>
<span style="color: #008080;">66</span>   getNum: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">67</span>     <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">.data.blogs.length;
</span><span style="color: #008080;">68</span> <span style="color: #000000;">  }
</span><span style="color: #008080;">69</span> 
<span style="color: #008080;">70</span> });</pre>
</div>
<p><span style="line-height: 1.5;">这个时候再附上业务代码：</span></p>
<div class="cnblogs_code" onclick="cnblogs_code_show('b65da6d9-f051-42ff-b05d-e0c09b44dafa')"><img id="code_img_closed_b65da6d9-f051-42ff-b05d-e0c09b44dafa" class="code_img_closed" src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" alt="" /><img id="code_img_opened_b65da6d9-f051-42ff-b05d-e0c09b44dafa" class="code_img_opened" style="display: none;" onclick="cnblogs_code_hide('b65da6d9-f051-42ff-b05d-e0c09b44dafa',event)" src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="" />
<div id="cnblogs_code_open_b65da6d9-f051-42ff-b05d-e0c09b44dafa" class="cnblogs_code_hide">
<pre><span style="color: #008080;"> 1</span> <span style="color: #0000ff;">var</span> AbstractView =<span style="color: #000000;"> _.inherit({
</span><span style="color: #008080;"> 2</span>   propertys: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;"> 3</span>     <span style="color: #0000ff;">this</span>.$el = $('#main'<span style="color: #000000;">);
</span><span style="color: #008080;"> 4</span>     <span style="color: #008000;">//</span><span style="color: #008000;">事件机制</span>
<span style="color: #008080;"> 5</span>     <span style="color: #0000ff;">this</span>.events =<span style="color: #000000;"> {};
</span><span style="color: #008080;"> 6</span> <span style="color: #000000;">  },
</span><span style="color: #008080;"> 7</span>   initialize: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (opts) {
</span><span style="color: #008080;"> 8</span>     <span style="color: #008000;">//</span><span style="color: #008000;">这种默认属性</span>
<span style="color: #008080;"> 9</span>     <span style="color: #0000ff;">this</span><span style="color: #000000;">.propertys();
</span><span style="color: #008080;">10</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">11</span>   $: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (selector) {
</span><span style="color: #008080;">12</span>     <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">.$el.find(selector);
</span><span style="color: #008080;">13</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">14</span>   show: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">15</span>     <span style="color: #0000ff;">this</span><span style="color: #000000;">.$el.show();
</span><span style="color: #008080;">16</span>     <span style="color: #0000ff;">this</span><span style="color: #000000;">.bindEvents();
</span><span style="color: #008080;">17</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">18</span>   bindEvents: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">19</span>     <span style="color: #0000ff;">var</span> events = <span style="color: #0000ff;">this</span><span style="color: #000000;">.events;
</span><span style="color: #008080;">20</span> 
<span style="color: #008080;">21</span>     <span style="color: #0000ff;">if</span> (!(events || (events = _.result(<span style="color: #0000ff;">this</span>, 'events')))) <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">;
</span><span style="color: #008080;">22</span>     <span style="color: #0000ff;">this</span><span style="color: #000000;">.unBindEvents();
</span><span style="color: #008080;">23</span> 
<span style="color: #008080;">24</span>     <span style="color: #008000;">//</span><span style="color: #008000;"> 解析event参数的正则</span>
<span style="color: #008080;">25</span>     <span style="color: #0000ff;">var</span> delegateEventSplitter = /^(\S+)\s*(.*)$/<span style="color: #000000;">;
</span><span style="color: #008080;">26</span>     <span style="color: #0000ff;">var</span><span style="color: #000000;"> key, method, match, eventName, selector;
</span><span style="color: #008080;">27</span> 
<span style="color: #008080;">28</span>     <span style="color: #008000;">//</span><span style="color: #008000;"> 做简单的字符串数据解析</span>
<span style="color: #008080;">29</span>     <span style="color: #0000ff;">for</span> (key <span style="color: #0000ff;">in</span><span style="color: #000000;"> events) {
</span><span style="color: #008080;">30</span>       method =<span style="color: #000000;"> events[key];
</span><span style="color: #008080;">31</span>       <span style="color: #0000ff;">if</span> (!_.isFunction(method)) method = <span style="color: #0000ff;">this</span><span style="color: #000000;">[events[key]];
</span><span style="color: #008080;">32</span>       <span style="color: #0000ff;">if</span> (!method) <span style="color: #0000ff;">continue</span><span style="color: #000000;">;
</span><span style="color: #008080;">33</span> 
<span style="color: #008080;">34</span>       match =<span style="color: #000000;"> key.match(delegateEventSplitter);
</span><span style="color: #008080;">35</span>       eventName = match[1], selector = match[2<span style="color: #000000;">];
</span><span style="color: #008080;">36</span>       method = _.bind(method, <span style="color: #0000ff;">this</span><span style="color: #000000;">);
</span><span style="color: #008080;">37</span>       eventName += '.delegateUIEvents' + <span style="color: #0000ff;">this</span><span style="color: #000000;">.id;
</span><span style="color: #008080;">38</span> 
<span style="color: #008080;">39</span>       <span style="color: #0000ff;">if</span> (selector === ''<span style="color: #000000;">) {
</span><span style="color: #008080;">40</span>         <span style="color: #0000ff;">this</span><span style="color: #000000;">.$el.on(eventName, method);
</span><span style="color: #008080;">41</span>       } <span style="color: #0000ff;">else</span><span style="color: #000000;"> {
</span><span style="color: #008080;">42</span>         <span style="color: #0000ff;">this</span><span style="color: #000000;">.$el.on(eventName, selector, method);
</span><span style="color: #008080;">43</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">44</span> <span style="color: #000000;">    }
</span><span style="color: #008080;">45</span>     <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">;
</span><span style="color: #008080;">46</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">47</span> 
<span style="color: #008080;">48</span>   unBindEvents: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">49</span>     <span style="color: #0000ff;">this</span>.$el.off('.delegateUIEvents' + <span style="color: #0000ff;">this</span><span style="color: #000000;">.id);
</span><span style="color: #008080;">50</span>     <span style="color: #0000ff;">return</span> <span style="color: #0000ff;">this</span><span style="color: #000000;">;
</span><span style="color: #008080;">51</span> <span style="color: #000000;">  }
</span><span style="color: #008080;">52</span> 
<span style="color: #008080;">53</span> });</pre>
</div>
<span class="cnblogs_code_collapse">View的基类</span></div>
<div class="cnblogs_code">
<pre><span style="color: #008080;"> 1</span> <span style="color: #008000;">//</span><span style="color: #008000;">页面主流程</span>
<span style="color: #008080;"> 2</span> <span style="color: #0000ff;">var</span> View =<span style="color: #000000;"> _.inherit(AbstractView, {
</span><span style="color: #008080;"> 3</span>   propertys: <span style="color: #0000ff;">function</span><span style="color: #000000;"> ($super) {
</span><span style="color: #008080;"> 4</span> <span style="color: #000000;">    $super();
</span><span style="color: #008080;"> 5</span>     <span style="color: #0000ff;">this</span>.$el = $('#main'<span style="color: #000000;">);
</span><span style="color: #008080;"> 6</span> 
<span style="color: #008080;"> 7</span>     <span style="color: #008000;">//</span><span style="color: #008000;">统合页面所有点击事件</span>
<span style="color: #008080;"> 8</span>     <span style="color: #0000ff;">this</span>.events =<span style="color: #000000;"> {
</span><span style="color: #008080;"> 9</span>       'click .js_add': 'blogAddAction'<span style="color: #000000;">,
</span><span style="color: #008080;">10</span>       'click .js_blog_del': 'blogDeleteAction'
<span style="color: #008080;">11</span> <span style="color: #000000;">    };
</span><span style="color: #008080;">12</span> 
<span style="color: #008080;">13</span>     <span style="color: #008000;">//</span><span style="color: #008000;">实例化model并且注册需要通知的控制器</span>
<span style="color: #008080;">14</span>     <span style="color: #008000;">//</span><span style="color: #008000;">控制器务必做到职责单一</span>
<span style="color: #008080;">15</span>     <span style="color: #0000ff;">this</span>.model = <span style="color: #0000ff;">new</span><span style="color: #000000;"> Model({
</span><span style="color: #008080;">16</span>       scope: <span style="color: #0000ff;">this</span><span style="color: #000000;">,
</span><span style="color: #008080;">17</span> <span style="color: #000000;">      controllers: {
</span><span style="color: #008080;">18</span>         numController: <span style="color: #0000ff;">this</span><span style="color: #000000;">.numController,
</span><span style="color: #008080;">19</span>         typeController: <span style="color: #0000ff;">this</span><span style="color: #000000;">.typeController,
</span><span style="color: #008080;">20</span>         labelController: <span style="color: #0000ff;">this</span><span style="color: #000000;">.labelController,
</span><span style="color: #008080;">21</span>         blogsController: <span style="color: #0000ff;">this</span><span style="color: #000000;">.blogsController
</span><span style="color: #008080;">22</span> <span style="color: #000000;">      }
</span><span style="color: #008080;">23</span> <span style="color: #000000;">    });
</span><span style="color: #008080;">24</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">25</span>   <span style="color: #008000;">//</span><span style="color: #008000;">总博客数</span>
<span style="color: #008080;">26</span>   numController: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">27</span>     <span style="color: #0000ff;">this</span>.$('.js_num').html(<span style="color: #0000ff;">this</span><span style="color: #000000;">.model.getNum());
</span><span style="color: #008080;">28</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">29</span>   <span style="color: #008000;">//</span><span style="color: #008000;">分类数</span>
<span style="color: #008080;">30</span>   typeController: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">31</span>     <span style="color: #0000ff;">var</span> html = ''<span style="color: #000000;">;
</span><span style="color: #008080;">32</span>     <span style="color: #0000ff;">var</span> tpl = document.getElementById('js_tpl_kv'<span style="color: #000000;">).innerHTML;
</span><span style="color: #008080;">33</span>     <span style="color: #0000ff;">var</span> data = <span style="color: #0000ff;">this</span><span style="color: #000000;">.model.getTypeInfo();
</span><span style="color: #008080;">34</span>     html =<span style="color: #000000;"> _.template(tpl)({ objs: data });
</span><span style="color: #008080;">35</span>     <span style="color: #0000ff;">this</span>.$('.js_type_wrapper'<span style="color: #000000;">).html(html);
</span><span style="color: #008080;">36</span> 
<span style="color: #008080;">37</span> 
<span style="color: #008080;">38</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">39</span>   <span style="color: #008000;">//</span><span style="color: #008000;">label分类</span>
<span style="color: #008080;">40</span>   labelController: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">41</span>     <span style="color: #008000;">//</span><span style="color: #008000;">这里的逻辑与type基本一致，但是真实情况不会这样</span>
<span style="color: #008080;">42</span>     <span style="color: #0000ff;">var</span> html = ''<span style="color: #000000;">;
</span><span style="color: #008080;">43</span>     <span style="color: #0000ff;">var</span> tpl = document.getElementById('js_tpl_kv'<span style="color: #000000;">).innerHTML;
</span><span style="color: #008080;">44</span>     <span style="color: #0000ff;">var</span> data = <span style="color: #0000ff;">this</span><span style="color: #000000;">.model.getLabelInfo();
</span><span style="color: #008080;">45</span>     html =<span style="color: #000000;"> _.template(tpl)({ objs: data });
</span><span style="color: #008080;">46</span>     <span style="color: #0000ff;">this</span>.$('.js_label_wrapper'<span style="color: #000000;">).html(html);
</span><span style="color: #008080;">47</span> 
<span style="color: #008080;">48</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">49</span>   <span style="color: #008000;">//</span><span style="color: #008000;">列表变化</span>
<span style="color: #008080;">50</span>   blogsController: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">51</span>     console.log(<span style="color: #0000ff;">this</span><span style="color: #000000;">.model.get());
</span><span style="color: #008080;">52</span>     <span style="color: #0000ff;">var</span> html = ''<span style="color: #000000;">;
</span><span style="color: #008080;">53</span>     <span style="color: #0000ff;">var</span> tpl = document.getElementById('js_tpl_blogs'<span style="color: #000000;">).innerHTML;
</span><span style="color: #008080;">54</span>     <span style="color: #0000ff;">var</span> data = <span style="color: #0000ff;">this</span><span style="color: #000000;">.model.get();
</span><span style="color: #008080;">55</span>     html =<span style="color: #000000;"> _.template(tpl)(data);
</span><span style="color: #008080;">56</span>     <span style="color: #0000ff;">this</span>.$('.js_blogs_wrapper'<span style="color: #000000;">).html(html);
</span><span style="color: #008080;">57</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">58</span>   <span style="color: #008000;">//</span><span style="color: #008000;">添加博客点击事件</span>
<span style="color: #008080;">59</span>   blogAddAction: <span style="color: #0000ff;">function</span><span style="color: #000000;"> () {
</span><span style="color: #008080;">60</span>     <span style="color: #008000;">//</span><span style="color: #008000;">此处未做基本数据校验，因为校验的工作应该model做，比如字数限制，标签过滤什么的</span>
<span style="color: #008080;">61</span>     <span style="color: #008000;">//</span><span style="color: #008000;">这里只是往model中增加一条数据，事实上这里还应该写if预计判断是否添加成功，略去</span>
<span style="color: #008080;">62</span>     <span style="color: #0000ff;">this</span><span style="color: #000000;">.model.add(
</span><span style="color: #008080;">63</span>       <span style="color: #0000ff;">this</span>.$('.js_title'<span style="color: #000000;">).val(),
</span><span style="color: #008080;">64</span>       <span style="color: #0000ff;">this</span>.$('.js_type'<span style="color: #000000;">).val(),
</span><span style="color: #008080;">65</span>       <span style="color: #0000ff;">this</span>.$('.js_label'<span style="color: #000000;">).val()
</span><span style="color: #008080;">66</span> <span style="color: #000000;">    );
</span><span style="color: #008080;">67</span> 
<span style="color: #008080;">68</span> <span style="color: #000000;">  },
</span><span style="color: #008080;">69</span>   blogDeleteAction: <span style="color: #0000ff;">function</span><span style="color: #000000;"> (e) {
</span><span style="color: #008080;">70</span>     <span style="color: #0000ff;">var</span> el =<span style="color: #000000;"> $(e.currentTarget);
</span><span style="color: #008080;">71</span>     <span style="color: #0000ff;">this</span>.model.remove(el.attr('data-id'<span style="color: #000000;">));
</span><span style="color: #008080;">72</span> <span style="color: #000000;">  }
</span><span style="color: #008080;">73</span> <span style="color: #000000;">});
</span><span style="color: #008080;">74</span> 
<span style="color: #008080;">75</span> <span style="color: #0000ff;">var</span> view = <span style="color: #0000ff;">new</span><span style="color: #000000;"> View();
</span><span style="color: #008080;">76</span> view.show();</pre>
</div>
<h3>完整代码&amp;示例</h3>
<div class="cnblogs_code" onclick="cnblogs_code_show('c68d0d4d-a065-4e55-84be-f6ea7b49d3e7')"><img id="code_img_closed_c68d0d4d-a065-4e55-84be-f6ea7b49d3e7" class="code_img_closed" src="http://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif" alt="" /><img id="code_img_opened_c68d0d4d-a065-4e55-84be-f6ea7b49d3e7" class="code_img_opened" style="display: none;" onclick="cnblogs_code_hide('c68d0d4d-a065-4e55-84be-f6ea7b49d3e7',event)" src="http://images.cnblogs.com/OutliningIndicators/ExpandedBlockStart.gif" alt="" />
<div id="cnblogs_code_open_c68d0d4d-a065-4e55-84be-f6ea7b49d3e7" class="cnblogs_code_hide">
<pre><span style="color: #008080;">  1</span> <span style="color: #0000ff;">&lt;!</span><span style="color: #ff00ff;">doctype html</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">  2</span> <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">html</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">  3</span> <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">head</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">  4</span>   <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">meta </span><span style="color: #ff0000;">charset</span><span style="color: #0000ff;">="UTF-8"</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">  5</span>   <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">title</span><span style="color: #0000ff;">&gt;</span>前端MVC<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">title</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">  6</span>   <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">script </span><span style="color: #ff0000;">src</span><span style="color: #0000ff;">="zepto.js"</span><span style="color: #ff0000;"> type</span><span style="color: #0000ff;">="text/javascript"</span><span style="color: #0000ff;">&gt;&lt;/</span><span style="color: #800000;">script</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">  7</span>   <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">script </span><span style="color: #ff0000;">src</span><span style="color: #0000ff;">="underscore.js"</span><span style="color: #ff0000;"> type</span><span style="color: #0000ff;">="text/javascript"</span><span style="color: #0000ff;">&gt;&lt;/</span><span style="color: #800000;">script</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">  8</span>   <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">style</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">  9</span> <span style="background-color: #f5f5f5; color: #800000;">    li </span><span style="background-color: #f5f5f5; color: #000000;">{</span>
<span style="color: #008080;"> 10</span> <span style="background-color: #f5f5f5; color: #ff0000;">      list-style</span><span style="background-color: #f5f5f5; color: #000000;">:</span><span style="background-color: #f5f5f5; color: #0000ff;"> none</span><span style="background-color: #f5f5f5; color: #000000;">;</span>
<span style="color: #008080;"> 11</span> <span style="background-color: #f5f5f5; color: #ff0000;">      margin</span><span style="background-color: #f5f5f5; color: #000000;">:</span><span style="background-color: #f5f5f5; color: #0000ff;"> 5px 0</span><span style="background-color: #f5f5f5; color: #000000;">;</span>
<span style="color: #008080;"> 12</span>     <span style="background-color: #f5f5f5; color: #000000;">}</span>
<span style="color: #008080;"> 13</span> <span style="background-color: #f5f5f5; color: #800000;">    fieldset </span><span style="background-color: #f5f5f5; color: #000000;">{</span>
<span style="color: #008080;"> 14</span> <span style="background-color: #f5f5f5; color: #ff0000;">      margin</span><span style="background-color: #f5f5f5; color: #000000;">:</span><span style="background-color: #f5f5f5; color: #0000ff;"> 5px 0</span><span style="background-color: #f5f5f5; color: #000000;">;</span>
<span style="color: #008080;"> 15</span>     <span style="background-color: #f5f5f5; color: #000000;">}</span>
<span style="color: #008080;"> 16</span>   <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">style</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 17</span> <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">head</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 18</span> <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">body</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 19</span>   <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">div </span><span style="color: #ff0000;">id</span><span style="color: #0000ff;">="main"</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 20</span>     <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">fieldset</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 21</span>       <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">legend</span><span style="color: #0000ff;">&gt;</span>文章总数<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">legend</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 22</span>       <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">div </span><span style="color: #ff0000;">class</span><span style="color: #0000ff;">="js_num"</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 23</span> <span style="color: #000000;">        0
</span><span style="color: #008080;"> 24</span>       <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">div</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 25</span>     <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">fieldset</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 26</span>     <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">fieldset</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 27</span>       <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">legend</span><span style="color: #0000ff;">&gt;</span>分类<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">legend</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 28</span>       <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">div </span><span style="color: #ff0000;">class</span><span style="color: #0000ff;">="js_type_wrapper"</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 29</span>       <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">div</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 30</span>     <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">fieldset</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 31</span>     <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">fieldset</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 32</span>       <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">legend</span><span style="color: #0000ff;">&gt;</span>标签<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">legend</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 33</span>       <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">div </span><span style="color: #ff0000;">class</span><span style="color: #0000ff;">="js_label_wrapper"</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 34</span>       <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">div</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 35</span>     <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">fieldset</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 36</span>     <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">fieldset</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 37</span>       <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">legend</span><span style="color: #0000ff;">&gt;</span>博客列表<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">legend</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 38</span>       <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">div </span><span style="color: #ff0000;">class</span><span style="color: #0000ff;">="js_blogs_wrapper"</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 39</span>       <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">div</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 40</span>     <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">fieldset</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 41</span>     <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">fieldset</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 42</span>       <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">legend</span><span style="color: #0000ff;">&gt;</span>新增博客<span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">legend</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 43</span>       <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">ul</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 44</span>         <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>标题 <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 45</span>         <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 46</span>           <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">input </span><span style="color: #ff0000;">type</span><span style="color: #0000ff;">="text"</span><span style="color: #ff0000;"> class</span><span style="color: #0000ff;">="js_title"</span> <span style="color: #0000ff;">/&gt;</span>
<span style="color: #008080;"> 47</span>         <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 48</span>         <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>类型 <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 49</span>         <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 50</span>           <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">input </span><span style="color: #ff0000;">type</span><span style="color: #0000ff;">="text"</span><span style="color: #ff0000;"> class</span><span style="color: #0000ff;">="js_type"</span> <span style="color: #0000ff;">/&gt;</span>
<span style="color: #008080;"> 51</span>         <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 52</span>         <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>标签（逗号隔开） <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 53</span>         <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 54</span>           <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">input </span><span style="color: #ff0000;">type</span><span style="color: #0000ff;">="text"</span><span style="color: #ff0000;"> class</span><span style="color: #0000ff;">="js_label"</span> <span style="color: #0000ff;">/&gt;</span>
<span style="color: #008080;"> 55</span>         <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 56</span>         <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 57</span>           <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">input </span><span style="color: #ff0000;">type</span><span style="color: #0000ff;">="button"</span><span style="color: #ff0000;"> class</span><span style="color: #0000ff;">="js_add"</span><span style="color: #ff0000;"> value</span><span style="color: #0000ff;">="新增博客"</span> <span style="color: #0000ff;">/&gt;</span>
<span style="color: #008080;"> 58</span>         <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">li</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 59</span>       <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">ul</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 60</span>     <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">fieldset</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 61</span>   <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">div</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 62</span>   <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">script </span><span style="color: #ff0000;">type</span><span style="color: #0000ff;">="text/template"</span><span style="color: #ff0000;"> id</span><span style="color: #0000ff;">="js_tpl_kv"</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 63</span>     <span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;">ul</span><span style="background-color: #f5f5f5; color: #000000;">&gt;</span>
<span style="color: #008080;"> 64</span>       <span style="background-color: #f5f5f5; color: #000000;">&lt;%</span><span style="background-color: #f5f5f5; color: #0000ff;">for</span><span style="background-color: #f5f5f5; color: #000000;">(</span><span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> k </span><span style="background-color: #f5f5f5; color: #0000ff;">in</span><span style="background-color: #f5f5f5; color: #000000;"> objs){ </span><span style="background-color: #f5f5f5; color: #000000;">%&gt;</span>
<span style="color: #008080;"> 65</span>         <span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;">li</span><span style="background-color: #f5f5f5; color: #000000;">&gt;&lt;%=</span><span style="background-color: #f5f5f5; color: #000000;">k </span><span style="background-color: #f5f5f5; color: #000000;">%&gt;</span><span style="background-color: #f5f5f5; color: #000000;">(</span><span style="background-color: #f5f5f5; color: #000000;">&lt;%=</span><span style="background-color: #f5f5f5; color: #000000;">objs[k] </span><span style="background-color: #f5f5f5; color: #000000;">%&gt;</span><span style="background-color: #f5f5f5; color: #000000;">)</span><span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;">/</span><span style="background-color: #f5f5f5; color: #000000;">li&gt;</span>
<span style="color: #008080;"> 66</span>       <span style="background-color: #f5f5f5; color: #000000;">&lt;%</span><span style="background-color: #f5f5f5; color: #000000;">} </span><span style="background-color: #f5f5f5; color: #000000;">%&gt;</span>
<span style="color: #008080;"> 67</span>     <span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;">/</span><span style="background-color: #f5f5f5; color: #000000;">ul&gt;</span>
<span style="color: #008080;"> 68</span>   <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">script</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 69</span>   <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">script </span><span style="color: #ff0000;">type</span><span style="color: #0000ff;">="text/template"</span><span style="color: #ff0000;"> id</span><span style="color: #0000ff;">="js_tpl_blogs"</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 70</span>     <span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;">ul</span><span style="background-color: #f5f5f5; color: #000000;">&gt;</span>
<span style="color: #008080;"> 71</span>       <span style="background-color: #f5f5f5; color: #000000;">&lt;%</span><span style="background-color: #f5f5f5; color: #0000ff;">for</span><span style="background-color: #f5f5f5; color: #000000;">(</span><span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> i </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #000000;">0</span><span style="background-color: #f5f5f5; color: #000000;">, len </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> blogs.length; i </span><span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;"> len; i</span><span style="background-color: #f5f5f5; color: #000000;">++</span><span style="background-color: #f5f5f5; color: #000000;"> ){ </span><span style="background-color: #f5f5f5; color: #000000;">%&gt;</span>
<span style="color: #008080;"> 72</span>         <span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;">li</span><span style="background-color: #f5f5f5; color: #000000;">&gt;&lt;%=</span><span style="background-color: #f5f5f5; color: #000000;">blogs[i].title </span><span style="background-color: #f5f5f5; color: #000000;">%&gt;</span> <span style="background-color: #f5f5f5; color: #000000;">-</span> <span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;">span class</span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;">"</span><span style="background-color: #f5f5f5; color: #000000;">js_blog_del</span><span style="background-color: #f5f5f5; color: #000000;">"</span><span style="background-color: #f5f5f5; color: #000000;"> data</span><span style="background-color: #f5f5f5; color: #000000;">-</span><span style="background-color: #f5f5f5; color: #000000;">id</span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;">"</span><span style="background-color: #f5f5f5; color: #000000;">&lt;%=blogs[i].id %&gt;</span><span style="background-color: #f5f5f5; color: #000000;">"</span><span style="background-color: #f5f5f5; color: #000000;">&gt;</span><span style="background-color: #f5f5f5; color: #000000;">删除</span><span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;">/</span><span style="background-color: #f5f5f5; color: #000000;">span&gt;&lt;</span><span style="background-color: #f5f5f5; color: #000000;">/</span><span style="background-color: #f5f5f5; color: #000000;">li</span><span style="background-color: #f5f5f5; color: #000000;">&gt;</span>
<span style="color: #008080;"> 73</span>       <span style="background-color: #f5f5f5; color: #000000;">&lt;%</span><span style="background-color: #f5f5f5; color: #000000;">} </span><span style="background-color: #f5f5f5; color: #000000;">%&gt;</span>
<span style="color: #008080;"> 74</span>     <span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;">/</span><span style="background-color: #f5f5f5; color: #000000;">ul&gt;</span>
<span style="color: #008080;"> 75</span>   <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">script</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 76</span>   <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">script </span><span style="color: #ff0000;">type</span><span style="color: #0000ff;">="text/javascript"</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;"> 77</span> 
<span style="color: #008080;"> 78</span>     <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">继承相关逻辑</span>
<span style="color: #008080;"> 79</span> <span style="background-color: #f5f5f5; color: #000000;">    (</span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;"> 80</span> 
<span style="color: #008080;"> 81</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;"> 全局可能用到的变量</span>
<span style="color: #008080;"> 82</span>       <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> arr </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> [];
</span><span style="color: #008080;"> 83</span>       <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> slice </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> arr.slice;
</span><span style="color: #008080;"> 84</span>       <span style="background-color: #f5f5f5; color: #008000;">/*</span><span style="background-color: #f5f5f5; color: #008000;">*
</span><span style="color: #008080;"> 85</span> <span style="background-color: #f5f5f5; color: #008000;">      * inherit方法，js的继承，默认为两个参数
</span><span style="color: #008080;"> 86</span> <span style="background-color: #f5f5f5; color: #008000;">      *
</span><span style="color: #008080;"> 87</span> <span style="background-color: #f5f5f5; color: #008000;">      * @param  {function} origin  可选，要继承的类
</span><span style="color: #008080;"> 88</span> <span style="background-color: #f5f5f5; color: #008000;">      * @param  {object}   methods 被创建类的成员，扩展的方法和属性
</span><span style="color: #008080;"> 89</span> <span style="background-color: #f5f5f5; color: #008000;">      * @return {function}         继承之后的子类
</span><span style="color: #008080;"> 90</span>       <span style="background-color: #f5f5f5; color: #008000;">*/</span>
<span style="color: #008080;"> 91</span> <span style="background-color: #f5f5f5; color: #000000;">      _.inherit </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (origin, methods) {
</span><span style="color: #008080;"> 92</span> 
<span style="color: #008080;"> 93</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;"> 参数检测，该继承方法，只支持一个参数创建类，或者两个参数继承类</span>
<span style="color: #008080;"> 94</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (arguments.length </span><span style="background-color: #f5f5f5; color: #000000;">===</span> <span style="background-color: #f5f5f5; color: #000000;">0</span> <span style="background-color: #f5f5f5; color: #000000;">||</span><span style="background-color: #f5f5f5; color: #000000;"> arguments.length </span><span style="background-color: #f5f5f5; color: #000000;">&gt;</span> <span style="background-color: #f5f5f5; color: #000000;">2</span><span style="background-color: #f5f5f5; color: #000000;">) </span><span style="background-color: #f5f5f5; color: #0000ff;">throw</span> <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">参数错误</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;"> 95</span> 
<span style="color: #008080;"> 96</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> parent </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">null</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;"> 97</span> 
<span style="color: #008080;"> 98</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;"> 将参数转换为数组</span>
<span style="color: #008080;"> 99</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> properties </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> slice.call(arguments);
</span><span style="color: #008080;">100</span> 
<span style="color: #008080;">101</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;"> 如果第一个参数为类（function），那么就将之取出</span>
<span style="color: #008080;">102</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #0000ff;">typeof</span><span style="background-color: #f5f5f5; color: #000000;"> properties[</span><span style="background-color: #f5f5f5; color: #000000;">0</span><span style="background-color: #f5f5f5; color: #000000;">] </span><span style="background-color: #f5f5f5; color: #000000;">===</span> <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">function</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">)
</span><span style="color: #008080;">103</span> <span style="background-color: #f5f5f5; color: #000000;">          parent </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> properties.shift();
</span><span style="color: #008080;">104</span> <span style="background-color: #f5f5f5; color: #000000;">        properties </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> properties[</span><span style="background-color: #f5f5f5; color: #000000;">0</span><span style="background-color: #f5f5f5; color: #000000;">];
</span><span style="color: #008080;">105</span> 
<span style="color: #008080;">106</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;"> 创建新类用于返回</span>
<span style="color: #008080;">107</span>         <span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> klass() {
</span><span style="color: #008080;">108</span>           <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (_.isFunction(</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.initialize))
</span><span style="color: #008080;">109</span>             <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.initialize.apply(</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">, arguments);
</span><span style="color: #008080;">110</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">111</span> 
<span style="color: #008080;">112</span> <span style="background-color: #f5f5f5; color: #000000;">        klass.superclass </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> parent;
</span><span style="color: #008080;">113</span> 
<span style="color: #008080;">114</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;"> 父类的方法不做保留，直接赋给子类</span>
<span style="color: #008080;">115</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;"> parent.subclasses = [];</span>
<span style="color: #008080;">116</span> 
<span style="color: #008080;">117</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (parent) {
</span><span style="color: #008080;">118</span>           <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;"> 中间过渡类，防止parent的构造函数被执行</span>
<span style="color: #008080;">119</span>           <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> subclass </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () { };
</span><span style="color: #008080;">120</span> <span style="background-color: #f5f5f5; color: #000000;">          subclass.prototype </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> parent.prototype;
</span><span style="color: #008080;">121</span> <span style="background-color: #f5f5f5; color: #000000;">          klass.prototype </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">new</span><span style="background-color: #f5f5f5; color: #000000;"> subclass();
</span><span style="color: #008080;">122</span> 
<span style="color: #008080;">123</span>           <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;"> 父类的方法不做保留，直接赋给子类</span>
<span style="color: #008080;">124</span>           <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;"> parent.subclasses.push(klass);</span>
<span style="color: #008080;">125</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">126</span> 
<span style="color: #008080;">127</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> ancestor </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> klass.superclass </span><span style="background-color: #f5f5f5; color: #000000;">&amp;&amp;</span><span style="background-color: #f5f5f5; color: #000000;"> klass.superclass.prototype;
</span><span style="color: #008080;">128</span>         <span style="background-color: #f5f5f5; color: #0000ff;">for</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> k </span><span style="background-color: #f5f5f5; color: #0000ff;">in</span><span style="background-color: #f5f5f5; color: #000000;"> properties) {
</span><span style="color: #008080;">129</span>           <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> value </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> properties[k];
</span><span style="color: #008080;">130</span> 
<span style="color: #008080;">131</span>           <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">满足条件就重写</span>
<span style="color: #008080;">132</span>           <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (ancestor </span><span style="background-color: #f5f5f5; color: #000000;">&amp;&amp;</span> <span style="background-color: #f5f5f5; color: #0000ff;">typeof</span><span style="background-color: #f5f5f5; color: #000000;"> value </span><span style="background-color: #f5f5f5; color: #000000;">==</span> <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">function</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">) {
</span><span style="color: #008080;">133</span>             <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> argslist </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #000000;">/</span><span style="background-color: #f5f5f5; color: #000000;">^\s*function\s*\(([^\(\)]*?)\)\s*?\{</span><span style="background-color: #f5f5f5; color: #000000;">/</span><span style="background-color: #f5f5f5; color: #000000;">i.exec(value.toString())[</span><span style="background-color: #f5f5f5; color: #000000;">1</span><span style="background-color: #f5f5f5; color: #000000;">].replace(</span><span style="background-color: #f5f5f5; color: #000000;">/</span><span style="background-color: #f5f5f5; color: #000000;">\s</span><span style="background-color: #f5f5f5; color: #000000;">/</span><span style="background-color: #f5f5f5; color: #000000;">g, </span><span style="background-color: #f5f5f5; color: #000000;">''</span><span style="background-color: #f5f5f5; color: #000000;">).split(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">,</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">);
</span><span style="color: #008080;">134</span>             <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">只有在第一个参数为$super情况下才需要处理（是否具有重复方法需要用户自己决定）</span>
<span style="color: #008080;">135</span>             <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (argslist[</span><span style="background-color: #f5f5f5; color: #000000;">0</span><span style="background-color: #f5f5f5; color: #000000;">] </span><span style="background-color: #f5f5f5; color: #000000;">===</span> <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">$super</span><span style="background-color: #f5f5f5; color: #000000;">'</span> <span style="background-color: #f5f5f5; color: #000000;">&amp;&amp;</span><span style="background-color: #f5f5f5; color: #000000;"> ancestor[k]) {
</span><span style="color: #008080;">136</span> <span style="background-color: #f5f5f5; color: #000000;">              value </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (methodName, fn) {
</span><span style="color: #008080;">137</span>                 <span style="background-color: #f5f5f5; color: #0000ff;">return</span> <span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">138</span>                   <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> scope </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">139</span>                   <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> args </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> [
</span><span style="color: #008080;">140</span>                 <span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">141</span>                   <span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;"> ancestor[methodName].apply(scope, arguments);
</span><span style="color: #008080;">142</span> <span style="background-color: #f5f5f5; color: #000000;">                }
</span><span style="color: #008080;">143</span> <span style="background-color: #f5f5f5; color: #000000;">              ];
</span><span style="color: #008080;">144</span>                   <span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;"> fn.apply(</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">, args.concat(slice.call(arguments)));
</span><span style="color: #008080;">145</span> <span style="background-color: #f5f5f5; color: #000000;">                };
</span><span style="color: #008080;">146</span> <span style="background-color: #f5f5f5; color: #000000;">              })(k, value);
</span><span style="color: #008080;">147</span> <span style="background-color: #f5f5f5; color: #000000;">            }
</span><span style="color: #008080;">148</span> <span style="background-color: #f5f5f5; color: #000000;">          }
</span><span style="color: #008080;">149</span> 
<span style="color: #008080;">150</span>           <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">此处对对象进行扩展，当前原型链已经存在该对象，便进行扩展</span>
<span style="color: #008080;">151</span>           <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (_.isObject(klass.prototype[k]) </span><span style="background-color: #f5f5f5; color: #000000;">&amp;&amp;</span><span style="background-color: #f5f5f5; color: #000000;"> _.isObject(value) </span><span style="background-color: #f5f5f5; color: #000000;">&amp;&amp;</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #0000ff;">typeof</span><span style="background-color: #f5f5f5; color: #000000;"> klass.prototype[k] </span><span style="background-color: #f5f5f5; color: #000000;">!=</span> <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">function</span><span style="background-color: #f5f5f5; color: #000000;">'</span> <span style="background-color: #f5f5f5; color: #000000;">&amp;&amp;</span> <span style="background-color: #f5f5f5; color: #0000ff;">typeof</span><span style="background-color: #f5f5f5; color: #000000;"> value </span><span style="background-color: #f5f5f5; color: #000000;">!=</span> <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">fuction</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">)) {
</span><span style="color: #008080;">152</span>             <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">原型链是共享的，这里处理逻辑要改</span>
<span style="color: #008080;">153</span>             <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> temp </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> {};
</span><span style="color: #008080;">154</span> <span style="background-color: #f5f5f5; color: #000000;">            _.extend(temp, klass.prototype[k]);
</span><span style="color: #008080;">155</span> <span style="background-color: #f5f5f5; color: #000000;">            _.extend(temp, value);
</span><span style="color: #008080;">156</span> <span style="background-color: #f5f5f5; color: #000000;">            klass.prototype[k] </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> temp;
</span><span style="color: #008080;">157</span> <span style="background-color: #f5f5f5; color: #000000;">          } </span><span style="background-color: #f5f5f5; color: #0000ff;">else</span><span style="background-color: #f5f5f5; color: #000000;"> {
</span><span style="color: #008080;">158</span> <span style="background-color: #f5f5f5; color: #000000;">            klass.prototype[k] </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> value;
</span><span style="color: #008080;">159</span> <span style="background-color: #f5f5f5; color: #000000;">          }
</span><span style="color: #008080;">160</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">161</span> 
<span style="color: #008080;">162</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">静态属性继承</span>
<span style="color: #008080;">163</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">兼容代码，非原型属性也需要进行继承</span>
<span style="color: #008080;">164</span>         <span style="background-color: #f5f5f5; color: #0000ff;">for</span><span style="background-color: #f5f5f5; color: #000000;"> (key </span><span style="background-color: #f5f5f5; color: #0000ff;">in</span><span style="background-color: #f5f5f5; color: #000000;"> parent) {
</span><span style="color: #008080;">165</span>           <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (parent.hasOwnProperty(key) </span><span style="background-color: #f5f5f5; color: #000000;">&amp;&amp;</span><span style="background-color: #f5f5f5; color: #000000;"> key </span><span style="background-color: #f5f5f5; color: #000000;">!==</span> <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">prototype</span><span style="background-color: #f5f5f5; color: #000000;">'</span> <span style="background-color: #f5f5f5; color: #000000;">&amp;&amp;</span><span style="background-color: #f5f5f5; color: #000000;"> key </span><span style="background-color: #f5f5f5; color: #000000;">!==</span> <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">superclass</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">)
</span><span style="color: #008080;">166</span> <span style="background-color: #f5f5f5; color: #000000;">            klass[key] </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> parent[key];
</span><span style="color: #008080;">167</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">168</span> 
<span style="color: #008080;">169</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">klass.prototype.initialize)
</span><span style="color: #008080;">170</span> <span style="background-color: #f5f5f5; color: #000000;">          klass.prototype.initialize </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () { };
</span><span style="color: #008080;">171</span> 
<span style="color: #008080;">172</span> <span style="background-color: #f5f5f5; color: #000000;">        klass.prototype.constructor </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> klass;
</span><span style="color: #008080;">173</span> 
<span style="color: #008080;">174</span>         <span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;"> klass;
</span><span style="color: #008080;">175</span> <span style="background-color: #f5f5f5; color: #000000;">      };
</span><span style="color: #008080;">176</span> 
<span style="color: #008080;">177</span> <span style="background-color: #f5f5f5; color: #000000;">    })();
</span><span style="color: #008080;">178</span>   <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">script</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">179</span>   <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">script </span><span style="color: #ff0000;">type</span><span style="color: #0000ff;">="text/javascript"</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">180</span>     <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">基类view设计</span>
<span style="color: #008080;">181</span>     <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> AbstractView </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> _.inherit({
</span><span style="color: #008080;">182</span> <span style="background-color: #f5f5f5; color: #000000;">      propertys: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">183</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$el </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> $(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">#main</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">);
</span><span style="color: #008080;">184</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">事件机制</span>
<span style="color: #008080;">185</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.events </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> {};
</span><span style="color: #008080;">186</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">187</span> <span style="background-color: #f5f5f5; color: #000000;">      initialize: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (opts) {
</span><span style="color: #008080;">188</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">这种默认属性</span>
<span style="color: #008080;">189</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.propertys();
</span><span style="color: #008080;">190</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">191</span> <span style="background-color: #f5f5f5; color: #000000;">      $: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (selector) {
</span><span style="color: #008080;">192</span>         <span style="background-color: #f5f5f5; color: #0000ff;">return</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$el.find(selector);
</span><span style="color: #008080;">193</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">194</span> <span style="background-color: #f5f5f5; color: #000000;">      show: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">195</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$el.show();
</span><span style="color: #008080;">196</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.bindEvents();
</span><span style="color: #008080;">197</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">198</span> <span style="background-color: #f5f5f5; color: #000000;">      bindEvents: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">199</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> events </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.events;
</span><span style="color: #008080;">200</span> 
<span style="color: #008080;">201</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">(events </span><span style="background-color: #f5f5f5; color: #000000;">||</span><span style="background-color: #f5f5f5; color: #000000;"> (events </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> _.result(</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">, </span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">events</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">)))) </span><span style="background-color: #f5f5f5; color: #0000ff;">return</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">202</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.unBindEvents();
</span><span style="color: #008080;">203</span> 
<span style="color: #008080;">204</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;"> 解析event参数的正则</span>
<span style="color: #008080;">205</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> delegateEventSplitter </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #000000;">/</span><span style="background-color: #f5f5f5; color: #000000;">^(\S+)\s*(.*)$</span><span style="background-color: #f5f5f5; color: #000000;">/</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">206</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> key, method, match, eventName, selector;
</span><span style="color: #008080;">207</span> 
<span style="color: #008080;">208</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;"> 做简单的字符串数据解析</span>
<span style="color: #008080;">209</span>         <span style="background-color: #f5f5f5; color: #0000ff;">for</span><span style="background-color: #f5f5f5; color: #000000;"> (key </span><span style="background-color: #f5f5f5; color: #0000ff;">in</span><span style="background-color: #f5f5f5; color: #000000;"> events) {
</span><span style="color: #008080;">210</span> <span style="background-color: #f5f5f5; color: #000000;">          method </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> events[key];
</span><span style="color: #008080;">211</span>           <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">_.isFunction(method)) method </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">[events[key]];
</span><span style="color: #008080;">212</span>           <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">method) </span><span style="background-color: #f5f5f5; color: #0000ff;">continue</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">213</span> 
<span style="color: #008080;">214</span> <span style="background-color: #f5f5f5; color: #000000;">          match </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> key.match(delegateEventSplitter);
</span><span style="color: #008080;">215</span> <span style="background-color: #f5f5f5; color: #000000;">          eventName </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> match[</span><span style="background-color: #f5f5f5; color: #000000;">1</span><span style="background-color: #f5f5f5; color: #000000;">], selector </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> match[</span><span style="background-color: #f5f5f5; color: #000000;">2</span><span style="background-color: #f5f5f5; color: #000000;">];
</span><span style="color: #008080;">216</span> <span style="background-color: #f5f5f5; color: #000000;">          method </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> _.bind(method, </span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">);
</span><span style="color: #008080;">217</span> <span style="background-color: #f5f5f5; color: #000000;">          eventName </span><span style="background-color: #f5f5f5; color: #000000;">+=</span> <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">.delegateUIEvents</span><span style="background-color: #f5f5f5; color: #000000;">'</span> <span style="background-color: #f5f5f5; color: #000000;">+</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.id;
</span><span style="color: #008080;">218</span> 
<span style="color: #008080;">219</span>           <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (selector </span><span style="background-color: #f5f5f5; color: #000000;">===</span> <span style="background-color: #f5f5f5; color: #000000;">''</span><span style="background-color: #f5f5f5; color: #000000;">) {
</span><span style="color: #008080;">220</span>             <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$el.on(eventName, method);
</span><span style="color: #008080;">221</span> <span style="background-color: #f5f5f5; color: #000000;">          } </span><span style="background-color: #f5f5f5; color: #0000ff;">else</span><span style="background-color: #f5f5f5; color: #000000;"> {
</span><span style="color: #008080;">222</span>             <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$el.on(eventName, selector, method);
</span><span style="color: #008080;">223</span> <span style="background-color: #f5f5f5; color: #000000;">          }
</span><span style="color: #008080;">224</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">225</span>         <span style="background-color: #f5f5f5; color: #0000ff;">return</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">226</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">227</span> 
<span style="color: #008080;">228</span> <span style="background-color: #f5f5f5; color: #000000;">      unBindEvents: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">229</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$el.off(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">.delegateUIEvents</span><span style="background-color: #f5f5f5; color: #000000;">'</span> <span style="background-color: #f5f5f5; color: #000000;">+</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.id);
</span><span style="color: #008080;">230</span>         <span style="background-color: #f5f5f5; color: #0000ff;">return</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">231</span> <span style="background-color: #f5f5f5; color: #000000;">      }
</span><span style="color: #008080;">232</span> 
<span style="color: #008080;">233</span> <span style="background-color: #f5f5f5; color: #000000;">    });
</span><span style="color: #008080;">234</span> 
<span style="color: #008080;">235</span>     <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">基类Model设计</span>
<span style="color: #008080;">236</span>     <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> AbstractModel </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> _.inherit({
</span><span style="color: #008080;">237</span> <span style="background-color: #f5f5f5; color: #000000;">      initialize: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (opts) {
</span><span style="color: #008080;">238</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.propertys();
</span><span style="color: #008080;">239</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.setOption(opts);
</span><span style="color: #008080;">240</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">241</span> 
<span style="color: #008080;">242</span> <span style="background-color: #f5f5f5; color: #000000;">      propertys: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">243</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">只取页面展示需要数据</span>
<span style="color: #008080;">244</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> {};
</span><span style="color: #008080;">245</span> 
<span style="color: #008080;">246</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">局部数据改变对应的响应程序，暂定为一个方法</span>
<span style="color: #008080;">247</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">可以是一个类的实例，如果是实例必须有render方法</span>
<span style="color: #008080;">248</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.controllers </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> {};
</span><span style="color: #008080;">249</span> 
<span style="color: #008080;">250</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">全局初始化数据时候调用的控制器</span>
<span style="color: #008080;">251</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.initController </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">null</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">252</span> 
<span style="color: #008080;">253</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.scope </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">null</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">254</span> 
<span style="color: #008080;">255</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">256</span> 
<span style="color: #008080;">257</span> <span style="background-color: #f5f5f5; color: #000000;">      addController: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (k, v) {
</span><span style="color: #008080;">258</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">k </span><span style="background-color: #f5f5f5; color: #000000;">||</span> <span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">v) </span><span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">259</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.controllers[k] </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> v;
</span><span style="color: #008080;">260</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">261</span> 
<span style="color: #008080;">262</span> <span style="background-color: #f5f5f5; color: #000000;">      removeController: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (k) {
</span><span style="color: #008080;">263</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">k) </span><span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">264</span>         <span style="background-color: #f5f5f5; color: #0000ff;">delete</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.controllers[k];
</span><span style="color: #008080;">265</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">266</span> 
<span style="color: #008080;">267</span> <span style="background-color: #f5f5f5; color: #000000;">      setOption: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (opts) {
</span><span style="color: #008080;">268</span>         <span style="background-color: #f5f5f5; color: #0000ff;">for</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> k </span><span style="background-color: #f5f5f5; color: #0000ff;">in</span><span style="background-color: #f5f5f5; color: #000000;"> opts) {
</span><span style="color: #008080;">269</span>           <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">[k] </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> opts[k];
</span><span style="color: #008080;">270</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">271</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">272</span> 
<span style="color: #008080;">273</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">首次初始化时，需要矫正数据，比如做服务器适配</span>
<span style="color: #008080;">274</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">@override</span>
<span style="color: #008080;">275</span> <span style="background-color: #f5f5f5; color: #000000;">      handleData: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () { },
</span><span style="color: #008080;">276</span> 
<span style="color: #008080;">277</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">一般用于首次根据服务器数据源填充数据</span>
<span style="color: #008080;">278</span> <span style="background-color: #f5f5f5; color: #000000;">      initData: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (data) {
</span><span style="color: #008080;">279</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> k;
</span><span style="color: #008080;">280</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">data) </span><span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">281</span> 
<span style="color: #008080;">282</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">如果默认数据没有被覆盖可能有误</span>
<span style="color: #008080;">283</span>         <span style="background-color: #f5f5f5; color: #0000ff;">for</span><span style="background-color: #f5f5f5; color: #000000;"> (k </span><span style="background-color: #f5f5f5; color: #0000ff;">in</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data) {
</span><span style="color: #008080;">284</span>           <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (data[k]) </span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data[k] </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> data[k];
</span><span style="color: #008080;">285</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">286</span> 
<span style="color: #008080;">287</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.handleData();
</span><span style="color: #008080;">288</span> 
<span style="color: #008080;">289</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.initController </span><span style="background-color: #f5f5f5; color: #000000;">&amp;&amp;</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.get()) {
</span><span style="color: #008080;">290</span>           <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.initController.call(</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.scope, </span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.get());
</span><span style="color: #008080;">291</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">292</span> 
<span style="color: #008080;">293</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">294</span> 
<span style="color: #008080;">295</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">验证data的有效性，如果无效的话，不应该进行以下逻辑，并且应该报警</span>
<span style="color: #008080;">296</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">@override</span>
<span style="color: #008080;">297</span> <span style="background-color: #f5f5f5; color: #000000;">      validateData: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">298</span>         <span style="background-color: #f5f5f5; color: #0000ff;">return</span> <span style="background-color: #f5f5f5; color: #0000ff;">true</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">299</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">300</span> 
<span style="color: #008080;">301</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">获取数据前，可以进行格式化</span>
<span style="color: #008080;">302</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">@override</span>
<span style="color: #008080;">303</span> <span style="background-color: #f5f5f5; color: #000000;">      formatData: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (data) {
</span><span style="color: #008080;">304</span>         <span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;"> data;
</span><span style="color: #008080;">305</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">306</span> 
<span style="color: #008080;">307</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">获取数据</span>
<span style="color: #008080;">308</span> <span style="background-color: #f5f5f5; color: #000000;">      get: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">309</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.validateData()) {
</span><span style="color: #008080;">310</span>           <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">需要log</span>
<span style="color: #008080;">311</span>           <span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;"> {};
</span><span style="color: #008080;">312</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">313</span>         <span style="background-color: #f5f5f5; color: #0000ff;">return</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.formatData(</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data);
</span><span style="color: #008080;">314</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">315</span> 
<span style="color: #008080;">316</span> <span style="background-color: #f5f5f5; color: #000000;">      _update: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (key, data) {
</span><span style="color: #008080;">317</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #0000ff;">typeof</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.controllers[key] </span><span style="background-color: #f5f5f5; color: #000000;">===</span> <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">function</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">)
</span><span style="color: #008080;">318</span>           <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.controllers[key].call(</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.scope, data);
</span><span style="color: #008080;">319</span>         <span style="background-color: #f5f5f5; color: #0000ff;">else</span> <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #0000ff;">typeof</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.controllers[key].render </span><span style="background-color: #f5f5f5; color: #000000;">===</span> <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">function</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">)
</span><span style="color: #008080;">320</span>           <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.controllers[key].render.call(</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.scope, data);
</span><span style="color: #008080;">321</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">322</span> 
<span style="color: #008080;">323</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">数据跟新后需要做的动作，执行对应的controller改变dom</span>
<span style="color: #008080;">324</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">@override</span>
<span style="color: #008080;">325</span> <span style="background-color: #f5f5f5; color: #000000;">      update: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (key) {
</span><span style="color: #008080;">326</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> data </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.get();
</span><span style="color: #008080;">327</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> k;
</span><span style="color: #008080;">328</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">data) </span><span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">329</span> 
<span style="color: #008080;">330</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.controllers[key]) {
</span><span style="color: #008080;">331</span>           <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">._update(key, data);
</span><span style="color: #008080;">332</span>           <span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">333</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">334</span> 
<span style="color: #008080;">335</span>         <span style="background-color: #f5f5f5; color: #0000ff;">for</span><span style="background-color: #f5f5f5; color: #000000;"> (k </span><span style="background-color: #f5f5f5; color: #0000ff;">in</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.controllers) {
</span><span style="color: #008080;">336</span>           <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">._update(k, data);
</span><span style="color: #008080;">337</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">338</span> <span style="background-color: #f5f5f5; color: #000000;">      }
</span><span style="color: #008080;">339</span> <span style="background-color: #f5f5f5; color: #000000;">    });
</span><span style="color: #008080;">340</span> 
<span style="color: #008080;">341</span>   <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">script</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">342</span>   <span style="color: #0000ff;">&lt;</span><span style="color: #800000;">script </span><span style="color: #ff0000;">type</span><span style="color: #0000ff;">="text/javascript"</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">343</span> 
<span style="color: #008080;">344</span>     <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">博客的model模块应该是完全独立与页面的主流层的，并且可复用</span>
<span style="color: #008080;">345</span>     <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> Model </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> _.inherit(AbstractModel, {
</span><span style="color: #008080;">346</span> <span style="background-color: #f5f5f5; color: #000000;">      propertys: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">347</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> {
</span><span style="color: #008080;">348</span> <span style="background-color: #f5f5f5; color: #000000;">          blogs: []
</span><span style="color: #008080;">349</span> <span style="background-color: #f5f5f5; color: #000000;">        };
</span><span style="color: #008080;">350</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">351</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">新增博客</span>
<span style="color: #008080;">352</span> <span style="background-color: #f5f5f5; color: #000000;">      add: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (title, type, label) {
</span><span style="color: #008080;">353</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">做数据校验，具体要多严格由业务决定</span>
<span style="color: #008080;">354</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">title </span><span style="background-color: #f5f5f5; color: #000000;">||</span> <span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">type) </span><span style="background-color: #f5f5f5; color: #0000ff;">return</span> <span style="background-color: #f5f5f5; color: #0000ff;">null</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">355</span> 
<span style="color: #008080;">356</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> blog </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> {};
</span><span style="color: #008080;">357</span> <span style="background-color: #f5f5f5; color: #000000;">        blog.id </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">blog_</span><span style="background-color: #f5f5f5; color: #000000;">'</span> <span style="background-color: #f5f5f5; color: #000000;">+</span><span style="background-color: #f5f5f5; color: #000000;"> _.uniqueId();
</span><span style="color: #008080;">358</span> <span style="background-color: #f5f5f5; color: #000000;">        blog.title </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> title;
</span><span style="color: #008080;">359</span> <span style="background-color: #f5f5f5; color: #000000;">        blog.type </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> type;
</span><span style="color: #008080;">360</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (label) blog.label </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> label.split(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">,</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">);
</span><span style="color: #008080;">361</span>         <span style="background-color: #f5f5f5; color: #0000ff;">else</span><span style="background-color: #f5f5f5; color: #000000;"> blog.label </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> [];
</span><span style="color: #008080;">362</span> 
<span style="color: #008080;">363</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data.blogs.push(blog);
</span><span style="color: #008080;">364</span> 
<span style="color: #008080;">365</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">通知各个控制器变化</span>
<span style="color: #008080;">366</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.update();
</span><span style="color: #008080;">367</span> 
<span style="color: #008080;">368</span>         <span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;"> blog;
</span><span style="color: #008080;">369</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">370</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">删除某一博客</span>
<span style="color: #008080;">371</span> <span style="background-color: #f5f5f5; color: #000000;">      remove: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (id) {
</span><span style="color: #008080;">372</span>         <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">id) </span><span style="background-color: #f5f5f5; color: #0000ff;">return</span> <span style="background-color: #f5f5f5; color: #0000ff;">null</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">373</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> i, len, data;
</span><span style="color: #008080;">374</span>         <span style="background-color: #f5f5f5; color: #0000ff;">for</span><span style="background-color: #f5f5f5; color: #000000;"> (i </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #000000;">0</span><span style="background-color: #f5f5f5; color: #000000;">, len </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data.blogs.length; i </span><span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;"> len; i</span><span style="background-color: #f5f5f5; color: #000000;">++</span><span style="background-color: #f5f5f5; color: #000000;">) {
</span><span style="color: #008080;">375</span>           <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data.blogs[i].id </span><span style="background-color: #f5f5f5; color: #000000;">===</span><span style="background-color: #f5f5f5; color: #000000;"> id) {
</span><span style="color: #008080;">376</span> <span style="background-color: #f5f5f5; color: #000000;">            data </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data.blogs.splice(i, </span><span style="background-color: #f5f5f5; color: #000000;">1</span><span style="background-color: #f5f5f5; color: #000000;">)
</span><span style="color: #008080;">377</span>             <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.update();
</span><span style="color: #008080;">378</span>             <span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;"> data;
</span><span style="color: #008080;">379</span> <span style="background-color: #f5f5f5; color: #000000;">          }
</span><span style="color: #008080;">380</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">381</span>         <span style="background-color: #f5f5f5; color: #0000ff;">return</span> <span style="background-color: #f5f5f5; color: #0000ff;">null</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">382</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">383</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">获取所有类型映射表</span>
<span style="color: #008080;">384</span> <span style="background-color: #f5f5f5; color: #000000;">      getTypeInfo: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">385</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> obj </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> {};
</span><span style="color: #008080;">386</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> i, len, type;
</span><span style="color: #008080;">387</span>         <span style="background-color: #f5f5f5; color: #0000ff;">for</span><span style="background-color: #f5f5f5; color: #000000;"> (i </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #000000;">0</span><span style="background-color: #f5f5f5; color: #000000;">, len </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data.blogs.length; i </span><span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;"> len; i</span><span style="background-color: #f5f5f5; color: #000000;">++</span><span style="background-color: #f5f5f5; color: #000000;">) {
</span><span style="color: #008080;">388</span> <span style="background-color: #f5f5f5; color: #000000;">          type </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data.blogs[i].type;
</span><span style="color: #008080;">389</span>           <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">obj[type]) obj[type] </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #000000;">1</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">390</span>           <span style="background-color: #f5f5f5; color: #0000ff;">else</span><span style="background-color: #f5f5f5; color: #000000;"> obj[type] </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> obj[type] </span><span style="background-color: #f5f5f5; color: #000000;">+</span> <span style="background-color: #f5f5f5; color: #000000;">1</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">391</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">392</span>         <span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;"> obj;
</span><span style="color: #008080;">393</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">394</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">获取标签映射表</span>
<span style="color: #008080;">395</span> <span style="background-color: #f5f5f5; color: #000000;">      getLabelInfo: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">396</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> obj </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> {}, label;
</span><span style="color: #008080;">397</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> i, len, j, len1, blog, label;
</span><span style="color: #008080;">398</span>         <span style="background-color: #f5f5f5; color: #0000ff;">for</span><span style="background-color: #f5f5f5; color: #000000;"> (i </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #000000;">0</span><span style="background-color: #f5f5f5; color: #000000;">, len </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data.blogs.length; i </span><span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;"> len; i</span><span style="background-color: #f5f5f5; color: #000000;">++</span><span style="background-color: #f5f5f5; color: #000000;">) {
</span><span style="color: #008080;">399</span> <span style="background-color: #f5f5f5; color: #000000;">          blog </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data.blogs[i];
</span><span style="color: #008080;">400</span>           <span style="background-color: #f5f5f5; color: #0000ff;">for</span><span style="background-color: #f5f5f5; color: #000000;"> (j </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #000000;">0</span><span style="background-color: #f5f5f5; color: #000000;">, len1 </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> blog.label.length; j </span><span style="background-color: #f5f5f5; color: #000000;">&lt;</span><span style="background-color: #f5f5f5; color: #000000;"> len1; j</span><span style="background-color: #f5f5f5; color: #000000;">++</span><span style="background-color: #f5f5f5; color: #000000;">) {
</span><span style="color: #008080;">401</span> <span style="background-color: #f5f5f5; color: #000000;">            label </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> blog.label[j];
</span><span style="color: #008080;">402</span>             <span style="background-color: #f5f5f5; color: #0000ff;">if</span><span style="background-color: #f5f5f5; color: #000000;"> (</span><span style="background-color: #f5f5f5; color: #000000;">!</span><span style="background-color: #f5f5f5; color: #000000;">obj[label]) obj[label] </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #000000;">1</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">403</span>             <span style="background-color: #f5f5f5; color: #0000ff;">else</span><span style="background-color: #f5f5f5; color: #000000;"> obj[label] </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> obj[label] </span><span style="background-color: #f5f5f5; color: #000000;">+</span> <span style="background-color: #f5f5f5; color: #000000;">1</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">404</span> <span style="background-color: #f5f5f5; color: #000000;">          }
</span><span style="color: #008080;">405</span> <span style="background-color: #f5f5f5; color: #000000;">        }
</span><span style="color: #008080;">406</span>         <span style="background-color: #f5f5f5; color: #0000ff;">return</span><span style="background-color: #f5f5f5; color: #000000;"> obj;
</span><span style="color: #008080;">407</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">408</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">获取总数</span>
<span style="color: #008080;">409</span> <span style="background-color: #f5f5f5; color: #000000;">      getNum: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">410</span>         <span style="background-color: #f5f5f5; color: #0000ff;">return</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.data.blogs.length;
</span><span style="color: #008080;">411</span> <span style="background-color: #f5f5f5; color: #000000;">      }
</span><span style="color: #008080;">412</span> 
<span style="color: #008080;">413</span> <span style="background-color: #f5f5f5; color: #000000;">    });
</span><span style="color: #008080;">414</span> 
<span style="color: #008080;">415</span>     <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">页面主流程</span>
<span style="color: #008080;">416</span>     <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> View </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> _.inherit(AbstractView, {
</span><span style="color: #008080;">417</span> <span style="background-color: #f5f5f5; color: #000000;">      propertys: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> ($super) {
</span><span style="color: #008080;">418</span> <span style="background-color: #f5f5f5; color: #000000;">        $super();
</span><span style="color: #008080;">419</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$el </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> $(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">#main</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">);
</span><span style="color: #008080;">420</span> 
<span style="color: #008080;">421</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">统合页面所有点击事件</span>
<span style="color: #008080;">422</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.events </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> {
</span><span style="color: #008080;">423</span>           <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">click .js_add</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">: </span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">blogAddAction</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">,
</span><span style="color: #008080;">424</span>           <span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">click .js_blog_del</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">: </span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">blogDeleteAction</span><span style="background-color: #f5f5f5; color: #000000;">'</span>
<span style="color: #008080;">425</span> <span style="background-color: #f5f5f5; color: #000000;">        };
</span><span style="color: #008080;">426</span> 
<span style="color: #008080;">427</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">实例化model并且注册需要通知的控制器</span>
<span style="color: #008080;">428</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">控制器务必做到职责单一</span>
<span style="color: #008080;">429</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.model </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">new</span><span style="background-color: #f5f5f5; color: #000000;"> Model({
</span><span style="color: #008080;">430</span> <span style="background-color: #f5f5f5; color: #000000;">          scope: </span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">,
</span><span style="color: #008080;">431</span> <span style="background-color: #f5f5f5; color: #000000;">          controllers: {
</span><span style="color: #008080;">432</span> <span style="background-color: #f5f5f5; color: #000000;">            numController: </span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.numController,
</span><span style="color: #008080;">433</span> <span style="background-color: #f5f5f5; color: #000000;">            typeController: </span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.typeController,
</span><span style="color: #008080;">434</span> <span style="background-color: #f5f5f5; color: #000000;">            labelController: </span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.labelController,
</span><span style="color: #008080;">435</span> <span style="background-color: #f5f5f5; color: #000000;">            blogsController: </span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.blogsController
</span><span style="color: #008080;">436</span> <span style="background-color: #f5f5f5; color: #000000;">          }
</span><span style="color: #008080;">437</span> <span style="background-color: #f5f5f5; color: #000000;">        });
</span><span style="color: #008080;">438</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">439</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">总博客数</span>
<span style="color: #008080;">440</span> <span style="background-color: #f5f5f5; color: #000000;">      numController: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">441</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">.js_num</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">).html(</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.model.getNum());
</span><span style="color: #008080;">442</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">443</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">分类数</span>
<span style="color: #008080;">444</span> <span style="background-color: #f5f5f5; color: #000000;">      typeController: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">445</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> html </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #000000;">''</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">446</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> tpl </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> document.getElementById(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">js_tpl_kv</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">).innerHTML;
</span><span style="color: #008080;">447</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> data </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.model.getTypeInfo();
</span><span style="color: #008080;">448</span> <span style="background-color: #f5f5f5; color: #000000;">        html </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> _.template(tpl)({ objs: data });
</span><span style="color: #008080;">449</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">.js_type_wrapper</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">).html(html);
</span><span style="color: #008080;">450</span> 
<span style="color: #008080;">451</span> 
<span style="color: #008080;">452</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">453</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">label分类</span>
<span style="color: #008080;">454</span> <span style="background-color: #f5f5f5; color: #000000;">      labelController: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">455</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">这里的逻辑与type基本一致，但是真实情况不会这样</span>
<span style="color: #008080;">456</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> html </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #000000;">''</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">457</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> tpl </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> document.getElementById(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">js_tpl_kv</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">).innerHTML;
</span><span style="color: #008080;">458</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> data </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.model.getLabelInfo();
</span><span style="color: #008080;">459</span> <span style="background-color: #f5f5f5; color: #000000;">        html </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> _.template(tpl)({ objs: data });
</span><span style="color: #008080;">460</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">.js_label_wrapper</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">).html(html);
</span><span style="color: #008080;">461</span> 
<span style="color: #008080;">462</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">463</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">列表变化</span>
<span style="color: #008080;">464</span> <span style="background-color: #f5f5f5; color: #000000;">      blogsController: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">465</span> <span style="background-color: #f5f5f5; color: #000000;">        console.log(</span><span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.model.get());
</span><span style="color: #008080;">466</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> html </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #000000;">''</span><span style="background-color: #f5f5f5; color: #000000;">;
</span><span style="color: #008080;">467</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> tpl </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> document.getElementById(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">js_tpl_blogs</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">).innerHTML;
</span><span style="color: #008080;">468</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> data </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.model.get();
</span><span style="color: #008080;">469</span> <span style="background-color: #f5f5f5; color: #000000;">        html </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> _.template(tpl)(data);
</span><span style="color: #008080;">470</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">.js_blogs_wrapper</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">).html(html);
</span><span style="color: #008080;">471</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">472</span>       <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">添加博客点击事件</span>
<span style="color: #008080;">473</span> <span style="background-color: #f5f5f5; color: #000000;">      blogAddAction: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> () {
</span><span style="color: #008080;">474</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">此处未做基本数据校验，因为校验的工作应该model做，比如字数限制，标签过滤什么的</span>
<span style="color: #008080;">475</span>         <span style="background-color: #f5f5f5; color: #008000;">//</span><span style="background-color: #f5f5f5; color: #008000;">这里只是往model中增加一条数据，事实上这里还应该写if预计判断是否添加成功，略去</span>
<span style="color: #008080;">476</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.model.add(
</span><span style="color: #008080;">477</span>       <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">.js_title</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">).val(),
</span><span style="color: #008080;">478</span>       <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">.js_type</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">).val(),
</span><span style="color: #008080;">479</span>       <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.$(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">.js_label</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">).val()
</span><span style="color: #008080;">480</span> <span style="background-color: #f5f5f5; color: #000000;">    );
</span><span style="color: #008080;">481</span> 
<span style="color: #008080;">482</span> <span style="background-color: #f5f5f5; color: #000000;">      },
</span><span style="color: #008080;">483</span> <span style="background-color: #f5f5f5; color: #000000;">      blogDeleteAction: </span><span style="background-color: #f5f5f5; color: #0000ff;">function</span><span style="background-color: #f5f5f5; color: #000000;"> (e) {
</span><span style="color: #008080;">484</span>         <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> el </span><span style="background-color: #f5f5f5; color: #000000;">=</span><span style="background-color: #f5f5f5; color: #000000;"> $(e.currentTarget);
</span><span style="color: #008080;">485</span>         <span style="background-color: #f5f5f5; color: #0000ff;">this</span><span style="background-color: #f5f5f5; color: #000000;">.model.remove(el.attr(</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">data-id</span><span style="background-color: #f5f5f5; color: #000000;">'</span><span style="background-color: #f5f5f5; color: #000000;">));
</span><span style="color: #008080;">486</span> <span style="background-color: #f5f5f5; color: #000000;">      }
</span><span style="color: #008080;">487</span> <span style="background-color: #f5f5f5; color: #000000;">    });
</span><span style="color: #008080;">488</span> 
<span style="color: #008080;">489</span>     <span style="background-color: #f5f5f5; color: #0000ff;">var</span><span style="background-color: #f5f5f5; color: #000000;"> view </span><span style="background-color: #f5f5f5; color: #000000;">=</span> <span style="background-color: #f5f5f5; color: #0000ff;">new</span><span style="background-color: #f5f5f5; color: #000000;"> View();
</span><span style="color: #008080;">490</span> <span style="background-color: #f5f5f5; color: #000000;">    view.show();
</span><span style="color: #008080;">491</span> 
<span style="color: #008080;">492</span>   <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">script</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">493</span> <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">body</span><span style="color: #0000ff;">&gt;</span>
<span style="color: #008080;">494</span> <span style="color: #0000ff;">&lt;/</span><span style="color: #800000;">html</span><span style="color: #0000ff;">&gt;</span></pre>
</div>
<span class="cnblogs_code_collapse">View Code</span></div>
<p><a href="http://sandbox.runjs.cn/show/bvux03nx" target="_blank">http://sandbox.runjs.cn/show/bvux03nx</a></p>
<p><iframe style="line-height: 1.5;" src="http://sandbox.runjs.cn/show/bvux03nx" width="400" height="600"></iframe></p>
<h3>分析</h3>
<p>这里注释写的很详细，例子也很简单很完整，其实并不需要太多的分析，对MVC还不太理解的朋友可以换自己方式实现以上代码，然后再加入评论模块，或者其它模块后，体会下开发难度，然后再用这种方式开发试试，体会不同才能体会真理，道不证不明嘛，这里的代码组成为：</p>
<p>① 公共的继承方法</p>
<p>② 公共的View抽象类，主要来说完成了view的事件绑定功能，可以将所有click事件全部写在events中</p>
<p>PS：这个view是我阉割便于各位理解的view，真实情况会比较复杂</p>
<p>③ 公共的Model抽象类，主要完成model的骨架相关，其中比较关键的是update后的通知机制</p>
<p>④ 业务model，这个是关于博客model的功能体现，单纯的数据操作</p>
<p>⑤ 业务View，这个为类实例化后执行了show方法，便绑定了各个事件</p>
<p>这里以一次博客新增为例说明一下程序流程：</p>
<p>① 用户填好数据后，点击增加博客，会触发相应js函数</p>
<p>② js获取文本框数据，为model新增数据</p>
<p>③ model数据变化后，分发事件通知各个控制器响应变化</p>
<p>④ 各个controller执行，并根据model产生view的变化</p>
<p>好了，这个例子就到此为止，希望对帮助各位了解MVC有所帮助</p>
<h3>优势与不足</h3>
<p><span style="line-height: 1.5;">对于移动端的页面来说，一个页面对应着一个View.js，即上面的业务View，其中model可以完全的分离出来，如果以AMD模块化的做法的话，View.js的体积会非常小，</span><span style="line-height: 1.5;">而主要逻辑又基本拆分到了Model业务中，controller做的工作由于前端模板的介入反而变得简单</span></p>
<p><span style="line-height: 1.5;">不足之处，便是所有的controller全部绑定到了view上，交互的触发点也全部在view身上，而更好的做法，可能是组件化，但是这类模块包含太多业务数据，做成组件化似乎重用性不高，于是就有了业务组件的诞生。</span></p>
<h1><span style="line-height: 1.5;">业务组件&amp;公共频道</span></h1>
<p><span style="line-height: 1.5;">所谓业务组件或者公共频道都是网站上了一定规模会实际遇到的问题，我这里举一个例子：</span></p>
<p><span style="line-height: 1.5;">最初我们是做机票项目于是目录结构为：</span></p>
<p><span style="line-height: 1.5;">blade 框架目录</span></p>
<p><span style="line-height: 1.5;">flight 机票业务频道</span></p>
<p><span style="line-height: 1.5;">static 公共样式文件</span></p>
<p><span style="line-height: 1.5;">然后逐渐我们多了酒店项目以及用车项目目录结构变成了：</span></p>
<p>blade 框架目录</p>
<p>car 用车频道</p>
<p>hotel 酒店频道</p>
<p>flight 机票业务频道</p>
<p>static 公共样式文件</p>
<p>于是一个比较实际的问题出现了，最初机票频道的城市列表模块以及登录模块与常用联系人模块好像其他两个频道也能用，但是问题也出现了：</p>
<p>① 将他们抽离为UI组件，但他们又带有业务数据</p>
<p>② 其它两个频道并不想引入机票频道的模块配置，而且也不信任机票频道</p>
<p>这个时候便会出现一个叫公共频道的东西，他完成的工作与框架类似，但是他会涉及到业务数据，并且除了该公司，也许便不能重用：</p>
<p>blade 框架目录</p>
<p><span style="color: #ff0000;">common 公共频道</span></p>
<p>car 用车频道</p>
<p>hotel 酒店频道</p>
<p>flight 机票业务频道</p>
<p>static 公共样式文件</p>
<p><span style="line-height: 1.5;">各个业务频道引入公共频道的产品便可解决重用问题，但这样也同时发生了耦合，如果公共频道的页面做的不够灵活可配置，业务团队使用起来会是一个噩梦！</span></p>
<p><span style="line-height: 1.5;">于是更好的方案似乎是页面模块化，尽可能的将页面分为一个个可重用的小模块，有兴趣的朋友请到这里看看：</span></p>
<p id="autoid-0-0-0" class="postTitle"><a id="cb_post_title_url" class="postTitle2" href="http://www.cnblogs.com/yexiaochai/p/4165386.html">【前端优化之拆分CSS】前端三剑客的分分合合</a></p>
<p id="autoid-0-0-0" class="postTitle"><a id="cb_post_title_url" class="postTitle2" href="http://www.cnblogs.com/yexiaochai/p/4167554.html">【shadow dom入UI】web components思想如何应用于实际项目</a></p>
<h1 class="postTitle">网站慢了</h1>
<p class="postTitle">关于系统优化的建议我之前写了很多文章，有兴趣的朋友可以移驾至这里看看：</p>
<p id="autoid-0-0-0" class="postTitle"><a id="cb_post_title_url" class="postTitle2" href="http://www.cnblogs.com/yexiaochai/p/4219523.html">浅谈移动前端的最佳实践</a></p>
<p class="postTitle">我这里补充一点业务优化点：</p>
<p class="postTitle">① ajax请求剥离无意义的请求，命名使用短拼</p>
<p class="postTitle">这条比较适用于新团队，服务器端的同事并不会关注网络请求的耗时，所以请求往往又臭又长，一个真实的例子就是，上周我推动服务器端同事将城市列表的无意义字段删除后容量由90k降到了50k，并且还有优化空间！！！</p>
<p class="postTitle">② 工程化打包时候最好采用MD5的方式，这样可做到比较舒服的application cache效果，十分推崇！</p>
<p class="postTitle">③ ......</p>
<h1>结语&amp;核心点</h1>
<p>半年了，项目由最初的无趣到现在可以在上面玩MVC、玩ABTesting等高端东西了，而看着产品订单破一，破百，破千，破万，虽然很累，但是这个时候还是觉得是值得的。</p>
<p>只可惜我厂的一些制度有点过于恶心，跨团队交流跟吃屎一样，工作量过大，工资又低，这些点滴还是让人感到失望的。</p>
<p>好了，抱怨结束，文章浅谈了一些自己对移动端从0到1做业务开发的一些经验及建议，没有什么高深的知识，也许还有很多错误的地方，请各位不吝赐教，多多指点，接下来时间学习的重点应该还是IOS，偶尔会穿插MVVM框架（angularJS等）的相关学习，有兴趣的朋友可以一起关注，也希望自己尽快打通端到端吧，突破自身瓶颈。</p>
<p>最后，我的微博粉丝及其少，如果您觉得这篇博客对您哪怕有一丝丝的帮助，微博求粉博客求赞！！！</p>
<p><a href="http://weibo.com/u/2013900244?s=6uyXnP" target="_blank"><img id="view_img" src="http://service.t.sina.com.cn/widget/qmd/2013900244/b48b0477/1.png?rnd=1406031295210" alt="" border="0" /></a></p>
