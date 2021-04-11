function setup() {
  var h = this.$createElement;
  var demos = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_7__["ref"])([{
    title: 'Hooks',
    path: '/hooks',
    icon: h(vant_es_icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
      "attrs": {
        "name": "enlarge"
      }
    })
  }, {
    title: 'Component',
    path: '/component',
    icon: h(vant_es_icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
      "attrs": {
        "name": "wap-nav"
      }
    })
  }, {
    title: 'hooks',
    path: '/hooks',
    icon: h(vant_es_icon__WEBPACK_IMPORTED_MODULE_5__["default"], {
      "attrs": {
        "name": "diamond"
      }
    })
  }]);
  return {
    demos: demos
  };
}

function render() {
  var h = arguments[0];
  console.log(this);
  return h("div", {
    "class": _index_module_less__WEBPACK_IMPORTED_MODULE_8___default.a.home
  }, [h(vant_es_row__WEBPACK_IMPORTED_MODULE_1__["default"], [this.demos.map(function (demo, idx) {
    return h(vant_es_col__WEBPACK_IMPORTED_MODULE_3__["default"], {
      "key": idx
    }, [h("span", {
      "class": "icon"
    }, [demo.icon]), h("span", {
      "class": "title"
    }, [demo.title])]);
  })])]);
}