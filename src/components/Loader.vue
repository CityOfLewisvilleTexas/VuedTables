<template>
   <div class="loader">
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="74px" height="80px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
    <rect x="0" y="0" width="4" height="20" fill="#333">
      <animate attributeName="opacity" attributeType="XML"
        values="1; .2; 1" 
        begin="0s" dur="0.6s" repeatCount="indefinite" />
    </rect>
    <rect x="7" y="0" width="4" height="20" fill="#333">
      <animate attributeName="opacity" attributeType="XML"
        values="1; .2; 1" 
        begin="0.2s" dur="0.6s" repeatCount="indefinite" />
    </rect>
    <rect x="14" y="0" width="4" height="20" fill="#333">
      <animate attributeName="opacity" attributeType="XML"
        values="1; .2; 1" 
        begin="0.4s" dur="0.6s" repeatCount="indefinite" />
    </rect>
  </svg>
</div> 
</template>

<style lang="scss" scoped>
 body {
  padding: 1em;
  background: #2B3134;
  color: #777;
  text-align: center;
  font-family: "Gill sans", sans-serif;
  width: 80%;
  margin: 0 auto;
}
h1{
  margin: 1em 0;
  border-bottom: 1px dashed;
  padding-bottom: 1em;
  font-weight: lighter;
}
p{
  font-style: italic;
}
.loader{
  margin: 0 0 2em;
  height: 100px;
  width: 20%;
  text-align: center;
  padding: 1em;
  margin: 0 auto 1em;
  display: inline-block;
  vertical-align: top;
}
svg path,
svg rect{
  fill: #54258a;
}
</style>
