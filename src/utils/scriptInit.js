const scriptInit = (src, id) => {
  if (document.getElementById(id)) {
    return false;
  }
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.setAttribute("id", id);
  document.head.appendChild(script);
}
export default scriptInit
