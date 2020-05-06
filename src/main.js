const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hasMap = xObject || [
  { logo: "A", logoType: "text", url: "https://www.acfun.cn" },
  {
    logo: "./images/bilibili.png",
    logoType: "image",
    url: "https://www.bilibili.com/",
  },
];
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hasMap.forEach((node) => {
    const $li = $(`<li>
					<a href="${node.url}">
						<div class="site">
							<div class="logo">${node.logo[0]}</div>
							<div class="link">${node.url}</div>
						</div>
					</a>
				</li>`).insertBefore($lastLi);
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
    logo: url[0],
    logoType: "text",
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hasMap);
  localStorage.setItem("x", string);
};
