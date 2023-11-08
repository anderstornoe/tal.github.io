
Vue.component('nav-item', {
  props: ['navigation'],
  
})

var navigation = new Vue({
  el: '#navigation',
  data: {
    navigation: [
      { id: 0, text: 'Sig hvad tallet hedder' },
      { id: 1, text: 'Skriv tallet (kommer snart)' }
    ]
  },
  methods: {
    changeNav: function (event, index) {
      $("#content_title").html(this.navigation[index].text);
    }
  }
})


function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(.7) + ')';
}
