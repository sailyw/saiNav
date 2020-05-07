const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hasMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.bilibili.com/" },
];
//去除链接前面的https/http/www.
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace("free.", "")
    .replace(".com", "")
    .replace(".cn", "")
    .replace(".one", "")
    .replace(".io", "")
    .replace(".cc", "")
    .replace(".org", "")
    .replace(/\/.*/, ""); //删除/开头的内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hasMap.forEach((node, index) => {
    const $li = $(`<li>
			<div class="site">
				<div class="logo">${node.logo}</div>
				<div class="link">${simplifyUrl(node.url)}</div>
				<div class="close">
					<svg class="icon">
						<use xlink:href="#icon-close"></use>
					</svg>
				</div>
			</div>
    </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      hasMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥？");
  console.log(url);
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hasMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hasMap);
  localStorage.setItem("x", string);
};
$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
