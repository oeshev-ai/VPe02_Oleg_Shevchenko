const outRoot = document.getElementById("out-root");
const outInfo = document.getElementById("out-info");
const outCalc = document.getElementById("out-calc");
const btnRefresh = document.getElementById("btn-refresh");
const calcForm = document.getElementById("calc-form");

async function fetchJson(path) {
  const response = await fetch(path);
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  if (!response.ok) {
    throw new Error(
      typeof data === "object" ? JSON.stringify(data, null, 2) : text || response.statusText
    );
  }
  return data;
}

function show(el, data, isError = false) {
  el.textContent =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);
  el.classList.toggle("error", isError);
  el.classList.toggle("ok", !isError);
}

async function loadStatus() {
  btnRefresh.disabled = true;
  try {
    const [root, info] = await Promise.all([
      fetchJson("/api/"),
      fetchJson("/api/info"),
    ]);
    show(outRoot, root);
    show(outInfo, info);
  } catch (err) {
    show(outRoot, err.message, true);
    show(outInfo, err.message, true);
  } finally {
    btnRefresh.disabled = false;
  }
}

async function runCalc(event) {
  event.preventDefault();
  const form = new FormData(calcForm);
  const a = form.get("a");
  const b = form.get("b");
  try {
    const data = await fetchJson(`/api/calc/${a}/${b}`);
    show(outCalc, data);
  } catch (err) {
    show(outCalc, err.message, true);
  }
}

btnRefresh.addEventListener("click", loadStatus);
calcForm.addEventListener("submit", runCalc);
loadStatus();
