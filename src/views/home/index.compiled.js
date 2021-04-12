function setup() {
  var _useUsers = Object(_hooks_use_users__WEBPACK_IMPORTED_MODULE_21__["default"])(),
    users = _useUsers.users;

  var _withComps = Object(_hooks_with_comps__WEBPACK_IMPORTED_MODULE_22__["default"])(),
    date = _withComps.date,
    visble = _withComps.visble,
    component = _withComps.component;

  var tab = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_20__["ref"])(1);

  var toast = vant_es_toast__WEBPACK_IMPORTED_MODULE_15__["default"].loading({
    message: 'Loading...',
    forbidClick: true
  });

  var unwatch = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_20__["watch"])(function () {
    return users.value;
  }, function (newVal, oldVal) {
    if (newVal.length) {
      unwatch();
      toast.close();
    }
  });
  Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_20__["watch"])(function () {
    return date.value;
  }, function () {
    Object(vant_es_toast__WEBPACK_IMPORTED_MODULE_15__["default"])("\u4F60\u9009\u62E9\u7684\u65E5\u671F:\n".concat(new Array(37).fill('-').join(''), "\n").concat(date.value));
  });
  return {
    tab: tab,
    users: users,
    HCVisble: visble,
    HCComponent: component
  };
}

function render() {
  var _this = this;

  var h = arguments[0];
  var HookComp = h(vant_es_row__WEBPACK_IMPORTED_MODULE_9__["default"], {
    "class": "img-box"
  }, [this.users.map(function (user, idx) {
    return h(vant_es_col__WEBPACK_IMPORTED_MODULE_11__["default"], {
      "class": "img-item",
      "key": idx,
      "attrs": {
        "span": 8
      }
    }, [h(vant_es_image__WEBPACK_IMPORTED_MODULE_13__["default"], {
      "attrs": {
        "src": user.avatar_url
      }
    }), h("div", [user.login])]);
  })]);
  return h("div", {
    "class": _index_module_less__WEBPACK_IMPORTED_MODULE_24___default.a.home
  }, [h(vant_es_nav_bar__WEBPACK_IMPORTED_MODULE_7__["default"], {
    "attrs": {
      "title": "Home"
    }
  }), h("main", [h(vant_es_tabs__WEBPACK_IMPORTED_MODULE_1__["default"], {
    "model": {
      value: _this.tab,
      callback: function callback($$v) {
        _this.tab = $$v;
      }
    }
  }, [h(vant_es_tab__WEBPACK_IMPORTED_MODULE_5__["default"], {
    "attrs": {
      "title": "Hooks",
      "name": 1
    }
  }, [HookComp]), h(vant_es_tab__WEBPACK_IMPORTED_MODULE_5__["default"], {
    "attrs": {
      "title": "H-C",
      "name": 2
    }
  }, [h("h2", ["Hooks with Component"]), h("div", [h(vant_es_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    "attrs": {
      "type": "info"
    },
    "on": {
      "click": function click() {
        return _this.HCVisble = true;
      }
    }
  }, ["\u70B9\u51FB\u5524\u8D77\u65E5\u671F"])]), this.HCComponent()]), h(vant_es_tab__WEBPACK_IMPORTED_MODULE_5__["default"], {
    "attrs": {
      "title": "Component",
      "name": 3
    }
  }, [h(_components_HelloWorld_vue__WEBPACK_IMPORTED_MODULE_23__["default"])])])])]);
}