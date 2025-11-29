// main.js
// 描述: 主页渲染脚本，用于动态加载 tools.json 中的工具列表

document.addEventListener("DOMContentLoaded", () => {
  // 1. 获取挂载点
  const container = document.getElementById("tool-grid-container");

  // 2. 健壮性检查：检查容器是否存在
  if (!container) {
    console.error("错误：未在 index.html 中找到 ID 为 'tool-grid-container' 的元素。");
    return;
  }

  // 动态获取工具列表的URL。假设 tools.json 部署在同一前端路径下。
  const TOOLS_JSON_URL = 'https://raw.githubusercontent.com/Limkon/webtools/refs/heads/master/tools.json'; 

  // 3. 异步获取工具列表数据
  fetch(TOOLS_JSON_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP 错误: ${response.status}`);
      }
      return response.json();
    })
    .then(TOOL_LIST => {
      // 4. 健壮性检查：检查数据是否有效
      if (!Array.isArray(TOOL_LIST) || TOOL_LIST.length === 0) {
        container.innerHTML = "<p>暂无工具。请检查 <code>tools.json</code> 文件是否存在且格式正确。</p>";
        return;
      }

      // 5. 清空 "加载中" 提示
      container.innerHTML = "";

      // 6. 遍历工具列表并生成 HTML
      TOOL_LIST.forEach(tool => {
        // 创建一个 'a' 标签作为可点击的卡片
        const card = document.createElement("a");
        card.className = "tool-card";
        // 确保 path 存在
        card.href = tool.path || '#'; 
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

        // 7. 将卡片添加到容器中
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('加载工具列表失败:', error);
      // 向用户显示错误信息
      container.innerHTML = `<p style="color: red; text-align: center;">加载工具列表失败。错误: ${error.message} (请检查 ${TOOLS_JSON_URL} 是否可访问)</p>`;
    });
});
