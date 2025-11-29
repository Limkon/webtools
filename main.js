// main.js
// 描述: 主页渲染脚本，用于动态加载 tools.js 中的工具列表

document.addEventListener("DOMContentLoaded", () => {
  // 1. 获取挂载点
  const container = document.getElementById("tool-grid-container");

  // 2. 健壮性检查：检查容器是否存在
  if (!container) {
    console.error("错误：未在 index.html 中找到 ID 为 'tool-grid-container' 的元素。");
    return;
  }

  // 3. 健壮性检查：检查 TOOL_LIST 是否已加载
  // (TOOL_LIST 来自 tools.js)
  if (typeof TOOL_LIST === 'undefined' || TOOL_LIST.length === 0) {
    container.innerHTML = "<p>暂无工具。请检查 <code>tools.js</code> 配置文件是否正确加载且包含数据。</p>";
    return;
  }

  // 4. 清空 "加载中" 提示
  container.innerHTML = "";

  // 5. 遍历工具列表并生成 HTML
  TOOL_LIST.forEach(tool => {
    // 创建一个 'a' 标签作为可点击的卡片
    const card = document.createElement("a");
    card.className = "tool-card";
    card.href = tool.path;
    card.setAttribute("aria-label", `打开 ${tool.name}`); // 辅助功能

    // 创建卡片标题
    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = tool.name;

    // 创建卡片描述
    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = tool.description;

    // 组装卡片
    card.appendChild(title);
    card.appendChild(description);

    // 6. 将卡片添加到容器中
    container.appendChild(card);
  });
});
