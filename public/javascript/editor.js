const terminalTab = document.getElementById("terminalTab");
const resultTab = document.getElementById("resultTab");
const editorTab = document.getElementById("editorTab");

editorTab.style.display = "block";
terminalTab.style.display = "none"
resultTab.style.display = "none"

function openTab(tabName) {

  if(tabName == 'terminal') {
    terminalTab.style.display = "block"
    resultTab.style.display = "none";
    editorTab.style.display = "none";
  }
  else if(tabName == "result") {
    resultTab.style.display = "block";
    terminalTab.style.display = "none"
    editorTab.style.display = "none"
  }
  else if(tabName == "editor") {
    editorTab.style.display = "block";
    terminalTab.style.display = "none"
    resultTab.style.display = "none"
  }

}

const editorElement = document.getElementById("editor");
const runButton = document.getElementById("submitButton");
const result = document.getElementById("result");
console.log(result);

var editor = CodeMirror.fromTextArea(editorElement, {
  lineNumbers: true,
  lineWrapping: true
});

runButton.addEventListener("click", submitCode);

function submitCode() {
  var preview = result.contentDocument ||  result.contentWindow.document;
  preview.open();
  preview.write(editor.getValue());
  preview.close();
}
