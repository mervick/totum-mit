App.blink = function (e, t, i, n) {
  let a = t || 8;
  n = n || "background-color", a % 2 && a++;
  let l = !0, s = function () {
    e && (l ? e.css(n, i) : i && e.css(n, ""), l = !l, a--, a > 0 && setTimeout(s, 300))
  };
  setTimeout(s, 300)
}, App.mobilePanel = function (e, t, i) {
  return i = i || {}, window.top.BootstrapDialog.show($.extend({
    type: "edit",
    message: t,
    draggable: !0,
    title: e,
    cssClass: "mobile-panel " + (i.buttons ? " with-buttons" : "")
  }, i))
}, App.panelTimer = function (e, t, i) {
  let n, a = t, l = $("<div>");
  l.html(a);
  let s = BootstrapDialog.show({
    type: BootstrapDialog.TYPE_DANGER, title: e, message: l, onhide: function () {
      n && clearTimeout(n)
    }, buttons: [{
      action: function (e) {
        n && clearTimeout(n), e.close()
      }, label: "Отмена"
    }]
  }), o = function () {
    --a <= 0 ? (s.close(), i()) : (l.html(a), n = setTimeout(o, 1e3))
  };
  o()
}, App.panel = function (e, t, i) {
  return i = i || {}, window.top.BootstrapDialog.show($.extend({
    type: "edit",
    message: t,
    draggable: !0,
    title: e,
    cssClass: "web-panel " + (i.buttons ? " with-buttons " : "") + (i.class || "")
  }, i))
}, App.setSessionStorage = function (e, t) {
  sessionStorage.setItem(e, JSON.stringify(t))
}, App.totumCodeEdit = function (e, t, i, n, a) {
  return new Promise((l, s) => {
    let o, r, d, c = $('<div class="HTMLEditor" id="bigOneCodemirror" style="height: 100%;"></div>'),
      f = $('<div class="totum-edit-codes"></div>').append(c), p = e, h = !1;
    n && (r = $('<div class="flex">').appendTo(f), n.forEach(([e, t, i]) => {
      let n = $('<input type="checkbox">').attr("name", e),
        a = $('<div class="">').append(n).append($("<label>").text(t).on("click", () => {
          n.trigger("click")
        }));
      i && n.prop("checked", !0), r.append(a)
    }));
    const u = () => {
      let e = [];
      return n && f.find("input").each((function () {
        e[this.name] = this.checked
      })), e
    }, m = () => {
      h = !0, l({code: o.getValue(), checkboxes: u()}), d.close()
    };
    $("body").on("ctrlS.CodeEdit", () => {
      m()
    });
    let b = [{action: m, cssClass: "btn-warning btn-save", label: "Cохранить"}];
    a && b.unshift({
      action: () => {
        App.confirmation("Отключить код " + t, {
          "Отмена": e => {
            e.close()
          }, "Отключить": e => {
            h = !0, l({code: o.getValue(), checkboxes: u(), switchoff: !0}), e.close(), d.close()
          }
        }, "Отключение кода")
      }, cssClass: "btn-default btn-save", label: "Отключить"
    }), window.top.BootstrapDialog.show({
      message: f,
      type: null,
      title: t,
      buttons: b,
      cssClass: "fieldparams-edit-panel",
      draggable: !0,
      onhidden: () => {
        $("body").off("ctrlS.CodeEdit"), h || s()
      },
      onshow: function (e) {
        d = e, e.$modalHeader.css("cursor", "pointer");
        let t = 100;
        r && (t += r.height()), e.$modalContent.css({width: "90vw", minHeight: "calc(90vh - " + t + "px)"})
      },
      onshown: function (e) {
        o = CodeMirror(c.get(0), {
          mode: "totum",
          value: p,
          theme: "eclipse",
          lineNumbers: !0,
          indentWithTabs: !0,
          autoCloseTags: !0,
          bigOneDialog: m
        }), i && (o.table = i);
        let t = Math.round(e.$modalContent.height() - e.$modalHeader.outerHeight() - 40);
        o.getScrollerElement().style.minHeight = t + "px", c.find(".CodeMirror").css("min-heught", t), o.focus(), e.$modalContent.position({
          my: "center top",
          at: "center top+30px",
          of: window.top
        })
      }
    })
  })
}, BootstrapDialog.BUTTON_SIZES[BootstrapDialog.SIZE_NORMAL] = "btn-m", BootstrapDialog.defaultOptions.animate = !1, BootstrapDialog.defaultOptions.closeByBackdrop = !1, BootstrapDialog.defaultOptions.nl2br = !1, BootstrapDialog.defaultOptions.type = null, BootstrapDialog.TYPE_DANGER = null, BootstrapDialog.BootstrapDialogModal.prototype.resetScrollbar = function () {
  0 === this.getGlobalOpenedDialogs().length && this.$body.css("padding-right", 5)
}, function () {
  let e, t, i = 0, n = -1;
  setTimeout(() => {
    t = App.models.table("/Table/"), t.addPcTable({model: t})
  }, 10), App.checkNotificationManager = function (i) {
    if (i = i || void 0, Object.keys(i).length > 1) {
      if (!e || !e.closest("body").length) {
        let n;
        e = $('<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-warning" role="alert" id="notifies_manager" ><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><button class="timer" id="notification_clock_panel_all_timer"><i class="fa fa-clock-o"></i></button></div>'), e.appendTo("body"), e.find("button.close").on("click", (function () {
          a(), e.remove(), e = null, t.notificationUpdate(Object.keys(i), "deactivate").then((function () {
          })), Object.values(i).forEach(e => {
            e.forEach(e => {
              e.$modal.remove()
            })
          }), i = []
        })).on("remove", () => {
          n && n.popover("destroy")
        }), e.find("button.timer").on("click", (function () {
          if ($(this).is(".active")) return !1;
          $(this).addClass("active"), n = $(this), $div = $('<div><div id="notification_clock_panel_all"><span class="clocks-na">На</span> <input type="number" step="1" value="10" class="form-control"/> <select class="form-control"><option  selected value="1">минут</option><option value="2">часов</option><option value="3">дней</option></select> <button>Отложить все</button></button></div></div>'), $div.on("click", "button", (function () {
            let n = $div.find("input").val(), l = $div.find("select").val();
            a(), t.notificationUpdate(Object.keys(i), "later", n, l).then((function () {
            })), e.remove(), e = null, Object.values(i).forEach(e => {
              e.forEach(e => {
                e.$modal.remove()
              })
            }), i = []
          })), n.popover({
            placement: "bottom",
            content: $div,
            html: !0,
            animation: !1,
            container: $("body")
          }).popover("show"), n.on("remove", a), setTimeout(() => {
            $("body").on("click.notes", e => {
              $(e.originalEvent.path[0]).closest("#notification_clock_panel_all").length || (n.popover("destroy"), a())
            })
          }, 20)
        }));
        const a = function () {
          $("body").off("click.notes"), $("#notification_clock_panel_all_timer").removeClass("active")
        }
      }
    } else e && (e.remove(), e = null)
  }, App.showLInks = function (e, t) {
    e.forEach((function (e) {
      if (-1 !== ["top-iframe", "iframe"].indexOf(e.target) && window.top != window) return void window.top.App.showLInks([e], t);
      let a = function (l) {
        "use strict";
        if (e.postData) {
          let n, s = "_self";
          if ("iframe" === l || "top-iframe" === l) {
            let l = "iframe" + ++i;
            s = l;
            let o, r = BootstrapDialog.show({
              message: o = $('<iframe style="width: 100%; ' + (e.width ? "" : "min-width: 500px;") + ' height: 70vh; border: none" name = "' + l + '"></iframe>'),
              size: BootstrapDialog.SIZE_WIDE,
              title: e.title,
              draggable: !0,
              cssClass: "target-iframe",
              onhidden: function () {
                if (e.refresh) {
                  $("#table").data("pctable");
                  t.refresh(null, e.refresh)
                }
              },
              onshown: function (t) {
                if (e.width) {
                  let i = 500;
                  e.width > i && (i = e.width), t.$modalDialog.width(i)
                }
                let i = o.get(0).contentWindow, n = function () {
                  try {
                    i.App && i.App.setSessionStorage ? i.App.setSessionStorage.call(i, "linkObject", e) : setTimeout(n, 200)
                  } catch (e) {
                  }
                };
                n()
              },
              buttons: [{
                label: "Обновить", cssClass: "btn-m btn-default", action: function () {
                  o.get(0).contentWindow.location.reload(), n.detach()
                }
              }, {
                label: "Открыть", cssClass: "btn-m btn-default", action: function (e) {
                  a("self")
                }
              }, {
                label: "Вкладка", cssClass: "btn-m btn-default", action: function (e) {
                  window.open(o.get(0).contentWindow.location, "_blank"), e.close()
                }
              }, {
                label: null,
                icon: "fa fa-times",
                cssClass: "btn-m btn-default btn-empty-with-icon",
                action: function (e) {
                  e.close()
                }
              }]
            });
            o.on("load", (function () {
              let e = o.get(0).contentWindow;
              try {
                e.closeMe = function () {
                  r.close()
                }
              } catch (e) {
              }
            }))
          } else "blank" === l ? s = "_blank" : "parent" === l ? s = "_parent" : "top" === l ? s = "_top" : window.parent !== window && (sessionStorage.linkObject = JSON.stringify(e));
          n = $("<form>", {method: "post", action: e.uri, target: s});
          const o = function (e, t) {
            "boolean" == typeof t && (t = !0 === t ? "true" : "false"), "string" == typeof t || "number" == typeof t || null === t ? n.append($("<input>", {
              type: "hidden",
              name: e,
              value: t
            })) : $.each(t, (function (t, i) {
              o(e + "[" + t + "]", i)
            }))
          };
          $.each(e.postData, (function (e, t) {
            o(e, t)
          })), n.appendTo("body").submit(), n.detach()
        } else switch (l) {
          case"top":
            window.top.location.href = e.uri;
            break;
          case"parent":
            window.parent.location.href = e.uri;
            break;
          case"blank":
            let i = $('<a href="' + e.uri + '" target="_blank">link</a>');
            i.appendTo("body"), i.get(0).click(), i.remove();
            break;
          case"iframe":
          case"top-iframe":
            let l = e.uri;
            if (e.elseData) {
              let t = [];
              !1 === e.elseData.header && t.push("param"), !1 === e.elseData.footer && t.push("footer"), l += "#" + encodeURIComponent(JSON.stringify({wc: t}))
            }
            let s = $('<iframe src="' + l + '" style="width: 100%; height: 70vh; border: none"></iframe>'),
              o = BootstrapDialog.show({
                message: s,
                draggable: !0,
                size: BootstrapDialog.SIZE_WIDE,
                title: e.title,
                cssClass: "target-iframe",
                onhidden: function () {
                  e.refresh && t.refresh(null, e.refresh), n--
                },
                onshown: function (t) {
                  e.width && t.$modalDialog.width(e.width), ++n && t.$modalDialog.css("margin-top", 30 + 20 * n);
                  let i = s.get(0).contentWindow, a = function () {
                    try {
                      i.App && i.App.setSessionStorage ? i.App.setSessionStorage.call(i, "linkObject", e) : setTimeout(a, 200)
                    } catch (e) {
                    }
                  };
                  a()
                },
                buttons: [{
                  label: "Обновить", cssClass: "btn-m btn-default", action: function () {
                    s.get(0).contentWindow.location.reload()
                  }
                }, {
                  label: "Открыть", cssClass: "btn-m btn-default", action: function (t) {
                    try {
                      s.get(0).contentWindow.sessionStorage.linkObject && (e = JSON.parse(s.get(0).contentWindow.sessionStorage.linkObject))
                    } catch (e) {
                    }
                    a("self")
                  }
                }, {
                  label: "Вкладка", cssClass: "btn-m btn-default", action: function (e) {
                    window.open(s.get(0).contentWindow.location, "_blank"), e.close()
                  }
                }, {
                  label: null,
                  icon: "fa fa-times",
                  cssClass: "btn-m btn-default btn-empty-with-icon",
                  action: function (e) {
                    e.close()
                  }
                }]
              });
            s.on("load", (function () {
              let e = s.get(0).contentWindow;
              try {
                e.closeMe = function () {
                  o.close()
                }
              } catch (e) {
              }
            }));
            break;
          default:
            window.parent != window && (sessionStorage.linkObject = JSON.stringify(e)), window.location.href = e.uri
        }
      };
      a(e.target)
    }))
  }, App.showDatas = function (e, t, i) {
    let n, l = [], s = this;
    return e.forEach((function (e) {
      switch (e[0]) {
        case"fileUpload":
          $('<input type="file" ' + (e[1].limit > 1 ? "multiple" : "") + ' accept="' + e[1].type + '" style="display:none">').appendTo("body").click().on("change", (function () {
            let t = [];
            if (this.files.length > e[1].limit) App.notify("Превышен лимит файлов для закачки"); else {
              for (var i = 0; i < this.files.length; i++) {
                let e = this.files.item(i);
                t.push(new Promise((t, i) => {
                  var n = new FileReader;
                  n.onloadend = function () {
                    t({name: e.name, base64: btoa(n.result)})
                  }, n.readAsBinaryString(e)
                }))
              }
              Promise.all(t).then(t => {
                s.filesUpload(t, e[1].hash).then(() => {
                  e[1].refresh && s.refresh(null, e[1].refresh)
                })
              })
            }
          }));
          break;
        case"files":
          e[1].files.forEach(e => {
            for (var t = atob(e.string), i = [], n = 0; n < t.length; n += 512) {
              for (var a = t.slice(n, n + 512), l = new Array(a.length), s = 0; s < a.length; s++) l[s] = a.charCodeAt(s);
              var o = new Uint8Array(l);
              i.push(o)
            }
            let r = new Blob(i, {type: e.type});
            saveAs(r, e.name)
          });
          break;
        case"input":
          let o, r, d = $("<div>").html(e[1].html);
          d.find("#ttmInput").length ? o = d.find("#ttmInput") : (o = $('<input type="text" class="form-control" id="ttmInput">'), e[1].type && (o.attr("type", e[1].type), "password" === e[1].type && o.attr("autocomplete", "off")), e[1].value && o.val(e[1].value), d.append(o), o.wrap("<div>"), o.on("keydown", e => {
            13 === e.keyCode && c()
          }));
          let c = function () {
            s.inputClick(e[1].hash, o.val()).then((function () {
              e[1].close && i && i.closeMe ? window.closeMe() : e[1].refresh && s.refresh(null, e[1].refresh), r.close()
            }))
          };
          setTimeout(() => {
            o.focus()
          }, 1), n = {
            buttons: [{label: e[1].button || "Сохранить", action: c}, {
              label: "Отмена", action: function (e) {
                e.close()
              }
            }], class: "linkButtons"
          }, screen.width <= window.MOBILE_MAX_WIDTH ? r = App.mobilePanel(e[1].title, d, n) : (!n.width && n.html || (n.onshown = function (e) {
            n.width && e.$modalDialog.width(n.width)
          }), r = App.panel(e[1].title, d, n));
          break;
        case"buttons":
          n = {...e[1], buttons: [], class: "linkButtons"}, e[1].buttons.forEach((function (t, a) {
            n.buttons.push({
              id: "link-btn" + a, label: t.text, action: function (t) {
                s.buttonsClick(e[1].hash, a).then((function () {
                  e[1].close && i && i.closeMe ? window.closeMe() : e[1].buttons[a].refresh && s.refresh(null, e[1].buttons[a].refresh), t.close()
                }))
              }, icon: t.icon ? "fa fa-" + t.icon : null, background: t.background, color: t.color
            })
          })), screen.width <= window.MOBILE_MAX_WIDTH ? App.mobilePanel(e[1].title, $("<div>").html(e[1].html), n) : (!n.width && n.html || (n.onshown = function (e) {
            n.width && e.$modalDialog.width(n.width), n.html || e.$modalBody.remove(), n.buttons.forEach(t => {
              let i = e.getButton(t.id);
              t.background && i.css("background-color", t.background), t.color && i.css("color", t.color)
            })
          }), App.panel(e[1].title, $("<div>").html(e[1].html), n));
          break;
        case"table":
          if (window.top != window) return window.top.App.showDatas.call(s, [e]);
          l.push(function (e, t) {
            let i;
            e.height && (i = e.height, /^\d+$/.test(e.height) && (i += "px"));
            let n = "/Table/0/" + e.table_id + "?sess_hash=" + e.sess_hash + "&iframe=1";
            "/" === window.location.pathname || /^\/Table\//.test(window.location.pathname) || (n = e.table_id + "?sess_hash=" + e.sess_hash + "&iframe=1");
            let l = $('<iframe style="width: 100%; height: ' + (i || "80vh") + '; border: none;" src="' + n + '">');
            $("body").append(l);
            let s = [];
            $("#table").data("pctable") && $("#table").data("pctable").isCreatorView && s.push({
              label: "В новой вкладке",
              cssClass: "btn-m btn-danger",
              action: function (e) {
                window.open(l.get(0).contentWindow.location, "_blank");
                e.close()
              }
            });
            let o = a(e.title, l, e.width, e.refresh, null, t, s);
            l.on("load", (function () {
              l.get(0).contentWindow.closeMe = function () {
                o.close()
              }
            }))
          }(e[1], s));
          break;
        case"text":
          l.push(function (e, t) {
            a(e.title, e.text, e.width, e.refresh, null, t)
          }(e[1], s));
          break;
        case"json":
          l.push(function (e, t) {
            let i = $("<div>");
            new JSONEditor(i.get(0), {mode: "view"}, e.json), a(e.title, i, e.width, e.refresh, null, t)
          }(e[1], s));
          break;
        case"print":
          l.push(function (e, t, i) {
            if (App.fullScreenProcesses.showCog(), i) {
              var n = new Blob([atob(i)], {type: "application/pdf"}), a = URL.createObjectURL(n),
                l = document.createElement("a");
              l.href = a, l.target = "_blank", document.body.appendChild(l), l.click()
            } else {
              let i = $('<iframe style="width: 500px; height: 200px; position: absolute; top: -1000px; background: #fff;">').appendTo(window.top.document.body)[0],
                n = i.contentWindow ? i.contentWindow : i.contentDocument.defaultView;
              n.document.head.innerHTML = "<style>" + t + "</style>", n.document.body.innerHTML = e;
              let a = n.document.body, l = $.Deferred(), s = 0;
              const o = function () {
                a.scrollTop = a.scrollHeight + 100, ++s < 100 && a.scrollTop >= a.scrollHeight ? setTimeout(o, 50) : setTimeout((function () {
                  l.resolve()
                }), 2e3)
              }, r = function () {
                ++s < 100 && a.scrollHeight < 200 ? setTimeout(r, 50) : (s = 0, o())
              };
              r(), l.then((function () {
                App.fullScreenProcesses.hideCog(), setTimeout((function () {
                  n.focus(), n.print()
                }), 250), setTimeout((function () {
                }), 1e4)
              }))
            }
          }(e[1].body, e[1].styles));
          break;
        case"notification":
          let f, p, h = function (e) {
            let t = {x: 20, y: 70};
            return screen.width <= window.MOBILE_MAX_WIDTH && (t.x = .09 * window.innerWidth / 2), e && (t.y += 60), t
          }();
          e[1].text ? p = "<div>" + e[1].text + "</div>" : (p = e[1].title + '<div class="body"></div>', setTimeout(() => {
            f.$ele.find(".body").append(function (e, t) {
              let i;
              e.height && (i = e.height, /^\d+$/.test(e.height) && (i += "px"));
              let n = "/Table/0/" + e.table_id + "?sess_hash=" + e.sess_hash;
              /^\/Table\//.test(window.location.pathname) || window.location.pathname.match(/^\/(\?.*)?$/) || (n = e.table_id + "?sess_hash=" + e.sess_hash);
              let a = $('<iframe style="width: 100%; height: ' + (i || "80vh") + '; border: none;" src="' + n + '">');
              return a.on("load", (function () {
                let e = a.get(0).contentWindow;
                e.closeMe = t, $(e.document.body).css("background-color", "transparent").addClass("notification-table")
              })), a
            }(e[1], () => {
              f.$ele.remove()
            }))
          })), f = $.notify({message: p}, {
            offset: h,
            type: "warning",
            allow_dismiss: !0,
            delay: 0,
            onClose: function () {
              f.$ele.data("deactivated") || s.notificationUpdate(t, "deactivate").then((function () {
                f.$ele.trigger("hide.bs.modal")
              }))
            }
          }), f.$ele.find("button.close").after('<button class="timer"><i class="fa fa-clock-o"></i></button>'), f.$ele.css("transition", "none"), f.$ele.on("click", ".timer:not(.disabled)", (function () {
            let e = $(this);
            e.addClass("disabled"), $div = $('<div><div id="notification_clock_panel"><span class="clocks-na">На</span> <input type="number" step="1" value="10" class="form-control"/> <select class="form-control"><option  selected value="1">минут</option><option value="2">часов</option><option value="3">дней</option></select> <button>Отложить</button></button></div></div>'), $div.on("click", "button", (function () {
              let n = $div.find("input").val(), a = $div.find("select").val();
              i(), s.notificationUpdate(t, "later", n, a).then((function () {
              })), e.popover("destroy"), f.$ele.data("deactivated", !0), f.$ele.find('button[data-notify="dismiss"]').click()
            }));
            const i = function () {
              $("body").off("click.note" + t), e.removeClass("disabled")
            };
            e.popover({
              placement: "bottom",
              content: $div,
              html: !0,
              animation: !1,
              container: $("body")
            }).popover("show"), e.on("remove", i), setTimeout(() => {
              $("body").on("click.note" + t, t => {
                $(t.originalEvent.path[0]).closest("#notification_clock_panel").length || (e.popover("destroy"), i())
              })
            }, 20)
          })), l.push({
            $modal: f.$ele, simpleClose: () => {
              f.$ele.data("deactivated", !0), f.$ele.find('button[data-notify="dismiss"]').click()
            }, notification: f
          })
      }
    })), l
  }, App.getPcTableById = function (e, t, i, n) {
    let a = $.Deferred();
    return new App.models.table("/Table/0/" + e.toString(), {}, {}).getTableData(t ? t.sess_hash : null).then((function (l) {
      if (n && (!1 === n.withHeader || !1 === n.withFooter)) {
        Object.values(l.fields).forEach((function (e, t) {
          ("param" === e.category && !1 === n.withHeader || "footer" === e.category && !1 === n.withFooter) && delete l.fields[e.name]
        })), delete n.withHeader, delete n.withFooter
      }
      l.model = new App.models.table("/Table/0/" + e.toString(), $.extend({updated: l.updated}, t || {})), $.extend(!0, l, n);
      let s = new App.pcTableMain(i, l);
      a.resolve(s)
    })), a.promise()
  }, App.showPanels = function (e, t) {
    if (window.top != window) return window.top.App.showPanels.call(window.top, e);
    let i = {}, n = $.Deferred();
    const a = function () {
      let l = e.shift(), s = {}, o = {};
      l.id ? s.id = l.id : l.field && (s = l.field, o = s);
      const r = function (i) {
        new EditPanel(i, null, s, e.length > 0, o).then((function (i, s) {
          (i || s) && e.length ? a() : (l.refresh && t.model.refresh(null, l.refresh), n.resolve())
        }))
      };
      l.uri !== window.location.pathname ? i[l.uri] ? r(i[l.uri]) : new App.models.table(l.uri, {}, {}).getTableData().then((function (e) {
        e.model = new App.models.table(l.uri, {updated: e.updated}), i[l.uri] = new App.pcTableMain(null, e), r(i[l.uri])
      })) : r($("#table").data("pctable"))
    };
    return a(), n
  };
  let a = function (e, t, i, a, l, s, o) {
    return (o = o || []).push({
      label: null,
      icon: "fa fa-times",
      cssClass: "btn-m btn-default btn-empty-with-icon",
      action: function (e) {
        e.close()
      }
    }), BootstrapDialog.show({
      message: t, title: e, type: l || null, draggable: !0, onhidden: function () {
        a && ("strong" === a ? window.location.reload() : s.refresh(null, a)), n--
      }, onshown: function (e) {
        i && e.$modalDialog.width(i), ++n && e.$modalDialog.css("margin-top", 30 + 20 * n)
      }, buttons: o
    })
  }
}(), Object.equals = function (e, t) {
  let i = [];
  return function e(t, n) {
    if (t === n) return !0;
    if (t instanceof Date && n instanceof Date) return +t == +n;
    if ("object" != typeof t || "object" != typeof n || null === n || null === t) return !1;
    if (function (e, t) {
      for (var n = i.length; n--;) if (!(i[n][0] !== e && i[n][0] !== t || i[n][1] !== t && i[n][1] !== e)) return !0;
      return !1
    }(t, n)) return !0;
    if (i.push([t, n]), Array.isArray(t) !== Array.isArray(n)) return !1;
    if (Array.isArray(t)) {
      if (t.length !== n.length) return !1;
      let i = t.length;
      for (; i--;) if (!e(t[i], n[i])) return !1
    } else {
      let i = Object.keys(t), a = i.length;
      if (Object.keys(n).length !== a) return !1;
      for (; a--;) if (!e(t[i[a]], n[i[a]])) return !1
    }
    return !0
  }(e, t)
}, Object.getPath = function (e, t, i) {
  let n = e;
  for (let e = 0; e < t.length; e++) {
    let a = t[e];
    if ("object" != typeof n || !(a in n)) return i;
    n = n[a]
  }
  return n
}, String.prototype.hashCode = function () {
  var e, t = 0;
  if (0 === this.length) return t;
  for (e = 0; e < this.length; e++) t = (t << 5) - t + this.charCodeAt(e), t |= 0;
  return t
}, App.confirmation = function (e, t, i) {
  let n = [];
  return Object.keys(t).forEach((function (e) {
    n.push({label: e, action: t[e]})
  })), BootstrapDialog.show({
    type: "edit", title: i, message: e, buttons: n, draggable: !0, onshow: function (e) {
      e.$modalContent.css({width: "70vw", maxWidth: "800px"})
    }, onshown: function (e) {
      e.$modalContent.position({of: window})
    }
  })
}, App.copyMe = function (e) {
  let t = document.createElement("textarea");
  t.value = e, document.body.appendChild(t), t.select(), document.execCommand("copy"), document.body.removeChild(t)
}, App.dateFormats = {
  base: "DD.MM.YY", db: "YYYY-MM-DD", covert: function (e, t, i) {
    return moment(e, t).format(i)
  }, covertToDb: function (e, t) {
    return t = t || this.base, moment(e, t).format(this.db)
  }, covertFromDb: function (e, t) {
    return t = t || this.base, moment(e, this.db).format(t)
  }, isValid: function (e, t) {
    return t = t || this.base, moment(e, t).isValid()
  }
}, App.dateTimeFormats = {
  base: "DD.MM.YY HH:mm", db: "YYYY-MM-DD HH:mm", covert: function (e, t, i) {
    return moment(e, t).format(i)
  }, covertToDb: function (e, t) {
    return t = t || this.base, moment(e, t).format(this.db)
  }, covertFromDb: function (e, t) {
    return t = t || this.base, moment(e, this.db).format(t)
  }, isValid: function (e, t) {
    return t = t || this.base, moment(e, t).isValid()
  }
}, function () {
  let e = "fa-cog", t = $("#big_loading i"), i = 0;
  App.fullScreenProcesses = {
    showCog: function () {
      i++, 1 === i && App.fullScreenProcesses.show("fa-cog", !0)
    }, hideCog: function () {
      i--, i < 1 && (i = 0, App.fullScreenProcesses.hide())
    }
  }, App.fullScreenProcesses.show = function (i, n) {
    n = n || !1, $("body").addClass("lock"), n && !t.is(".fa-spin") ? t.addClass("fa-spin") : !n && t.is(".fa-spin") && t.removeClass("fa-spin"), e != i && (t.removeClass(e).addClass(i), e = i), $("#big_loading").show().animate({opacity: 1}, 250)
  }, App.fullScreenProcesses.hide = function (e) {
    $("body").removeClass("lock"), $("#big_loading").animate({opacity: 0}, 250, (function () {
      $("#big_loading").hide()
    }))
  }
}(), App.hexToRGB = function (e, t) {
  var i = parseInt(e.slice(1, 3), 16), n = parseInt(e.slice(3, 5), 16), a = parseInt(e.slice(5, 7), 16);
  return t ? "rgba(" + i + ", " + n + ", " + a + ", " + t + ")" : "rgb(" + i + ", " + n + ", " + a + ")"
}, $.fn.extend({
  isAttached: function () {
    return 1 === $(this).closest("html").length
  }
}), App.isTopWindow = function () {
  let e = !1;
  try {
    e = window != window.top || document != top.document || self.location != top.location
  } catch (t) {
    e = !0
  }
  return !e
}, App.logOutput = function (e) {
  let t = $('<div style="overflow-x: auto">'), i = [{
    label: "Развернуть все", cssClass: "btn-m btn-default", action: function (e) {
      t.jstree("open_all")
    }
  }, {
    label: null, icon: "fa fa-times", cssClass: "btn-m btn-default btn-empty-with-icon", action: function (e) {
      e.close()
    }
  }];
  "string" == typeof e && i.splice(0, 1), window.top.BootstrapDialog.show({
    message: t,
    type: BootstrapDialog.TYPE_DANGER,
    title: "Схема расчета",
    buttons: i,
    draggable: !0,
    cssClass: "log-output",
    onshown: function (i) {
      i.$modalContent.position({of: window.top}), "string" == typeof e ? t.html('<div style="color: white; ">' + e + "</div>") : t.jstree({
        state: {key: "leftTree"},
        core: {check_callback: !0, open_parents: !0, data: e, themes: {name: "default-dark"}},
        types: {
          folder: {},
          code: {icon: "fa fa-cog"},
          cogs: {icon: "fa fa-cogs"},
          error: {icon: "fa fa-exclamation-triangle"},
          list: {icon: "fa fa-code"},
          fixed: {icon: "fa fa-hand-rock-o"},
          param: {icon: "fa fa-hashtag"},
          execcode: {icon: "fa fa-magic"},
          recalcs: {icon: "fa fa-recycle"},
          clocks: {icon: "fa fa-clock-o"},
          mbs: {icon: "fa fa-database"},
          selects: {icon: "fa fa-navicon"},
          "!": {icon: "fa fa-exclamation"},
          table_simple: App.tableTypes.simple,
          table_version: App.tableTypes.version,
          table_calcs: App.tableTypes.calcs,
          table_tmp: App.tableTypes.tmp,
          table_globcalcs: App.tableTypes.globcalcs,
          table_cycles: App.tableTypes.cycles
        },
        plugins: ["types", "themes"]
      }).on("click", "a.jstree-anchor", (function () {
        let e, i, n = t.jstree(!0).get_node(this.id);
        try {
          e = JSON.parse(n.text), i = ""
        } catch (t) {
          try {
            let t = n.text.match(/^([a-zA-Z_0-1]+)\s*:\s*(.*)$/);
            e = JSON.parse(t[2]), i = t[1]
          } catch (t) {
            e = n.text
          }
        }
        if (e) {
          if ("string" == typeof e) {
            element = $('<div class="HTMLEditor" id="bigOneCodemirror">').height(500);
            var a = new CodeMirror(element.get(0), {
              value: e,
              mode: "text/html",
              height: "500px",
              readOnly: !0,
              theme: "eclipse",
              lineNumbers: !0,
              indentWithTabs: !0,
              autoCloseTags: !0
            });
            let t = setInterval(() => {
              element.isAttached() && (a.refresh(), clearInterval(t))
            }, 50)
          } else element = $('<div class="JSONEditor">').height(500), a = new JSONEditor(element.get(0), {mode: "view"}, e);
          window.top.BootstrapDialog.show({
            message: element, title: i, onshown: function (e) {
              e.$modalContent.position({of: window.top})
            }, onshow: function (e) {
              let t = .8 * window.top.innerWidth;
              e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({width: t})
            }
          })
        }
      }))
    },
    onshow: function (e) {
      let t = .8 * window.top.innerWidth;
      e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({width: t}), e.$modalContent.find(".modal-body").css("background-color", "#333")
    }
  })
}, App.modal = function (e, t, i) {
  var n = $('<div class="modal fade" id="appNotify" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"></h4> </div> <div class="modal-body"> </div> <div class="modal-footer"> </div> </div> </div> </div>');
  if ((l = {
    body: n.find(".modal-body"),
    header: n.find(".modal-header"),
    title: n.find(".modal-title"),
    footer: n.find(".modal-footer"),
    block: n
  }).block.on("hidden.bs.modal", (function () {
    $(this).remove()
  })), "object" == typeof e && e instanceof jQuery ? l.body.empty().append(e) : l.body.html(e), t ? l.title.html(t) : l.header.hide(), i) if ("object" == typeof i) {
    var a = $("<div>"), l = l;
    $.each(i, (function (e, t) {
      if ("close" != t) {
        var i = "default";
        "object" == typeof t && (t.class && (i = t.class), t.func && (t = t.func));
        var n = $('<button type="button" class="btn btn-' + i + '">' + e + "</button>");
        a.append(n), t && "function" == typeof t && n.on("click", (function () {
          t(l.block)
        }))
      } else a.append('<button type="button" class="btn btn-default" data-dismiss="modal">' + e + "</button>")
    })), l.footer.html(a.children())
  } else l.footer.html(i); else l.footer.hide();
  return l.block.modal("show").css("z-index", "10000"), l.block
}, $.expr.pseudos.multiincludes = function (e, t, i) {
  let n = $(e).find("a"), a = (n.data("tokens") || n.text()).toString().toUpperCase().replace("ё", "е");
  return !i[3].toUpperCase().replace("ё", "е").split(" ").some((function (e) {
    return -1 === a.indexOf(e)
  }))
}, App.notify = function (e, t, i) {
  let n = $.Deferred();
  return window.top.BootstrapDialog.show({
    message: e,
    type: BootstrapDialog.TYPE_DEFAULT,
    title: t,
    buttons: [{
      label: null,
      icon: "fa fa-times",
      cssClass: "btn-m btn-default btn-empty-with-icon",
      action: function (e) {
        e.close()
      }
    }],
    onshow: function (e) {
      t || e.$modalHeader.remove(), e.$modal.css("z-index", 2e3), n.resolve(e)
    }
  }), n
}, App.topNotify = function (e, t, i) {
  t = t || "", $("#notifies").append('<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>' + t + "</strong>" + e + "</div>")
}, App.popNotify = function (e, t, i, n, a) {
  let l, s = "bottom", o = {}, r = {};
  return e.isParams && (o = e, e.element && (t = e.element), e.timeout && (i = e.timeout), void 0 !== e.container && (n = e.container), e.trigger && (a = e.trigger), e.placement && (s = e.placement), e.class && (l = e.class), e = e.$text), i = i || void 0, n = void 0 === n ? t.closest(".pcTable-scrollwrapper, .InsertPanel") : n, a = a || "manual", r = $.extend(r, {
    html: !0,
    content: e,
    trigger: a,
    container: n,
    placement: s,
    width: "70vw",
    animation: !1
  }), "default" == i && (i = 2e3), t.on("shown.bs.popover", (function () {
    let e = t.data("bs.popover"), i = parseInt(e.$tip.css("left")), a = parseInt(e.$arrow.css("left"));
    if (i < 0 && (e.$tip.css("left", 0), e.$arrow.css("left", a + i + "px")), "bottom" === s) {
      let i = t.offset().top + t.outerHeight(), a = e.$tip.offset().top, l = n ? n.scrollTop() - n.offset().top : 0;
      a - i > 10 && e.$tip.css("top", i + 2 + l + (n.is(".InsertPanel") ? $(".modal-dialog").offset().top : 0))
    }
  })), t.popover(r), "manual" == a && (t.popover("show"), l && $("#" + t.attr("aria-describedby")).addClass(l)), t.on("remove destroy", (function () {
    t && t.attr("aria-describedby") && t.popover("destroy")
  })), e.on && e.on("remove destroy", (function () {
    t.length && t.attr("aria-describedby") && $("#" + t.attr("aria-describedby")).length && t.popover("destroy")
  })), i && setTimeout((function () {
    t && t.attr("aria-describedby") && t.popover("destroy")
  }), i), t.attr("aria-describedby")
}, App.ksort = function (e) {
  var t = Object.keys(e).sort(), i = {};
  for (var n in t) i[t[n]] = e[t[n]];
  return i
}, App.values = function (e) {
  let t = [];
  for (let i in e) t.push(e[i]);
  return t
}, App.keys = function (e) {
  let t = [];
  for (let i in e) t.push(i);
  return t
}, App.isEmpty = function (e) {
  if (null == e) return !0;
  if (e.length > 0) return !1;
  if (0 === e.length) return !0;
  if ("object" != typeof e) return !0;
  for (var t in e) if (hasOwnProperty.call(e, t)) return !1;
  return !0
}, App.filter = function (e, t) {
  let i = {};
  return Object.keys(e).forEach((function (n) {
    t(n, e[n]) && (i[n] = e[n])
  })), i
}, App.openInIframe = function (e, t, i) {
  i = i || "newIframe";
  let n = $('<iframe style="min-width: 500px; width: 100%; height: 70vh; border: none" name = "' + i + '"></iframe>');
  BootstrapDialog.show({
    message: n.attr("src", t),
    size: BootstrapDialog.SIZE_WIDE,
    title: e,
    buttons: [{
      label: "Обновить", cssClass: "btn-m btn-default", action: function (e) {
        let a;
        a = $('<iframe style="min-width: 500px; width: 100%; height: 70vh; border: none" name = "' + i + '"></iframe>').attr("src", t), n.replaceWith(a), n = a
      }
    }, {
      label: "Открыть", cssClass: "btn-m btn-default", action: function (e) {
        $("<a>").attr("href", t).hide().appendTo("body").get(0).click(), e.close()
      }
    }, {
      label: "Вкладка", cssClass: "btn-m btn-default", action: function (e) {
        let i = $("<a>").attr("href", t).attr("target", "_blank").hide().appendTo("body");
        i.get(0).click(), i.remove(), e.close()
      }
    }, {
      label: null, icon: "fa fa-times", cssClass: "btn-m btn-default btn-empty-with-icon", action: function (e) {
        e.close()
      }
    }]
  })
}, App.aInIframe = function (e) {
  return e = $(e), App.openInIframe(e.text(), e.attr("href")), !1
}, App.reUserInterface = function (e, t, i, n) {
  let a = $("#UserFio");
  a.css("cursor", "pointer");
  let l = App.models.table("/Table/", {}, {isCreatorView: n}), s = $("#table").data("pctable") || {model: l};
  l.addPcTable(s), i && App.blink(a, 10, "#ffe486"), a.on("click", (function (i) {
    if (a.attr("aria-describedby")) return !0;
    let s, o = $('<div class="tech-table" style="width: 200px;"></div>');
    if (t.length) {
      o.height(125);
      let e = $('<div class="panel-buttons">');
      o.prepend(e), t.forEach(t => {
        let i = $('<button class="btn btn-default btn-xxs"></button>').text(t.title).on("click", () => {
          window.location.href = "/Table/0/" + t.name
        });
        e.append(i)
      })
    } else if (!n) {
      o.height(60);
      let e = $("<div>");
      o.prepend(e), l.loadUserButtons().then(t => {
        t.panelFormats && t.panelFormats.rows.forEach(i => {
          switch (i.type) {
            case"text":
              e.append($('<div class="panel-text">').text(i.value));
              break;
            case"html":
              e.append($('<div class="panel-html">').html(i.value));
              break;
            case"img":
              e.append($('<div class="panel-img">').append($("<img>").attr("src", "/fls/" + i.value + "_thumb.jpg?rand=" + Math.random())));
              break;
            case"buttons":
              if (i.value && i.value.forEach) {
                let n = [];
                i.value.forEach(e => {
                  let i = $('<button class="btn btn-default btn-xxs">').text(e.text);
                  n.push(i), e.color && i.css("color", e.color), e.background && i.css("background-color", e.background), i.on("click", (function () {
                    l.userButtonsClick(t.panelFormats.hash, e.ind).then((function (t) {
                      e.refresh && l.refresh(null, e.refresh)
                    }))
                  }))
                }), e.append($('<div class="panel-buttons">').append(n))
              }
          }
        })
      })
    }
    if (Object.keys(e).length) {
      let i = $('<div class="select-btn"></div>').appendTo(o);
      s = $('<select data-size="' + (t.length ? 13 - t.length - 1 : n ? 13 : 11) + '" class="open" title="Выберите пользователя" data-style="btn-sm btn-default" data-live-search="true" data-width="100%">'), Object.keys(e).forEach((function (t) {
        s.append($("<option>").text(t).data("content", e[t]))
      })), i.append(s)
    }
    a.popover({
      html: !0,
      content: o,
      trigger: "manual",
      container: "body",
      placement: "auto bottom",
      template: '<div class="popover" role="tooltip" style=""><div class="arrow" style="left: 50%;"></div><div class="popover-content" style=" padding: 3px 5px;"></div></div>'
    }), s && (o.height(350), s.selectpicker("render").selectpicker("toggle"), s.data("container", o), s.on("hide.bs.select", (function () {
      return s.val() && l.reUser(s.val()), !1
    })), setTimeout((function () {
      a.popover("show"), s.selectpicker("render"), $("#" + a.attr("aria-describedby")).css("top", "45px"), s.data("selectpicker").$searchbox.focus()
    }), 300)), setTimeout(() => {
      a.popover("show"), $("body").one("click.FioPopover", (function (e) {
        void 0 !== e.altKey && a.popover("destroy")
      }))
    }, 300)
  }))
}, App.rgb2hex = function (e) {
  return (e = e.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === e.length ? "#" + ("0" + parseInt(e[1], 10).toString(16)).slice(-2) + ("0" + parseInt(e[2], 10).toString(16)).slice(-2) + ("0" + parseInt(e[3], 10).toString(16)).slice(-2) : ""
}, App.tableTypes = {
  simple: {icon: "fa fa-table", title: "Простая"},
  version: {icon: "fa fa-calendar", title: "Версионная"},
  calcs: {icon: "fa fa-calculator", title: "Расчетная в цикле"},
  globcalcs: {icon: "fa fa-calculator", title: "Расчетная"},
  tmp: {icon: "fa fa-clock-o", title: "Временная"},
  cycles: {icon: "fa fa-circle-o", title: "Циклы"}
}, App.textWithLinks = function (e) {
  return $("<div>").text(e).html().replace(/(https?:\/\/[^\s]+)/g, (function (e) {
    return '<a href="' + e + '" target="_blank">' + e + "</a>"
  }))
}, function () {
  var e = 0;
  App.getUn = function () {
    return e++
  }
}(), $.fn.datetimepicker.defaults.icons.close = "glyphicon glyphicon-ok", $.fn.datetimepicker.defaults.tooltips.close = "Применить и закрыть", function () {
  window.Hlps || (window.Hlps = {});
  var e = window.Hlps;
  e.selectpicker = {}, e.selectpicker.open = function (e) {
    var t = $(e).data("selectpicker").$newElement.children()[0];
    (t = $(t)).attr("aria-expanded") && "false" !== t.attr("aria-expanded") || t.click()
  }, e.selectpicker.focus = function (e) {
    var t = function () {
      var i = e.data("this");
      if (i && e.is(".selectpicker")) {
        var n = i.$newElement.children()[0];
        (n = $(n)).focus()
      } else {
        var a = 0;
        setTimeout((function () {
          if (!(++a < 4)) return !1;
          t()
        }), 1 + 100 * a)
      }
    };
    t()
  }, e.selectpicker.getButton = function (e) {
    var t = $(e).data("selectpicker").$newElement.children()[0];
    return t = $(t)
  }
}(), LOGINJS = function () {
  let e = $('<div><div class="form-group"><label>Email:</label><input id="elseEmail"  type="text"\n                                                                      name="login"\n                                                                      value=""\n                                                                      class="form-control"\n                /></div></div>');
  if ($("body").on("click", "#recover", (function () {
    let t = [{
      action: function (e) {
        if ("" == $("#elseEmail").val().trim()) return void $("#elseEmail").addClass("error");
        let t = $('<form method="post"><input type="hidden" name="login" value=""><input type="hidden" name="recover" value="true"></form>');
        t.find('[name="login"]').val($("#elseEmail").val()), t.appendTo("body"), t.submit(), e.close()
      }, label: "Отправить пароль на email"
    }, {
      action: function (e) {
        e.close()
      }, label: "Отмена"
    }];
    BootstrapDialog.show({message: e, title: "Новый пароль", buttons: t, draggable: !0})
  })), $("body").on("click", "#register", (function () {
    let t = [{
      action: function (e) {
        if ("" == $("#elseEmail").val().trim()) return void $("#elseEmail").addClass("error");
        let t = $('<form method="post"><input type="hidden" name="login" value=""><input type="hidden" name="register" value="true"></form>');
        t.find('[name="login"]').val($("#elseEmail").val()), t.appendTo("body"), t.submit(), e.close()
      }, label: "Зарегистрировать и отправить пароль на email"
    }, {
      action: function (e) {
        e.close()
      }, label: "Отмена"
    }];
    BootstrapDialog.show({message: e, title: "Регистрация", buttons: t, draggable: !0})
  })), sessionStorage.getItem("browserConfirm") || navigator.userAgent.match(/(chrome|safari|firefox|yandex(?=\/))\/?\s*(\d+)/i) && !navigator.userAgent.match(/BlackBerry|iPod|Opera Mini|IEMobile/i)) $("#auth_form").show(); else {
    let e = $("#auth_form");
    $("body").html('<div style="width: 600px; margin: auto; padding-top: 50px; font-size: 16px; text-align: center;" id="comeinBlock"><img src="/imgs/start.png" alt=""><div style="padding-bottom: 10px;">Сервис оптимизирован под броузеры Chrome, Safari, Yandex, FireFox последних версий.</div><div><a href="#" id="comein" class="btn-default btn">Все равно хочу посмотреть</a></div></div>'), $("#comein").on("click", (function () {
      sessionStorage.setItem("browserConfirm", !0), $("#comeinBlock").remove(), $("body").html(e), e.show()
    }))
  }
}, $((function () {
  if (screen.width > window.MOBILE_MAX_WIDTH) {
    let e = $("#main-page");
    if (e.length) {
      let t, i = $(".page_content"), n = !1;
      const a = function () {
        t = window.innerHeight;
        let i = $("#tables_tabls").length ? 200 : 100;
        e.height(window.innerHeight - i).niceScroll({
          cursorwidth: 7,
          mousescrollstep: 190,
          mousescroll: 190,
          autohidemode: !1,
          enablekeyboard: !0,
          cursoropacitymin: 1,
          railoffset: {left: 4},
          cursorcolor: "#e1e0df"
        }), n = !0, e.getNiceScroll().resize()
      }, l = function () {
        e.height("").getNiceScroll().remove(), n = !1
      }, s = function () {
        i.is(".tree-minifyed") && n || !e.is(":visible") ? l() : i.is(".tree-minifyed") || n && window.innerHeight == t || a()
      };
      $("#tables_tabls").on("hidden.bs.tab", e => {
        s()
      });
      const o = document.getElementsByClassName("page_content")[0], r = {attributes: !0, childList: !1, subtree: !1};
      new MutationObserver(s).observe(o, r), s()
    }
  }
})), restModel = function (e) {
  return {
    url: e, create: function () {
      return $.ajax({url: this.url, method: "post", data: data})
    }, get: function (e) {
      return $.ajax({url: this.url, method: "get", data: {id: e}})
    }, save: function (e, t) {
      return $.ajax({url: this.url, method: "PUT", data: $.extend(t, {id: e})})
    }
  }
}, $((function () {
  if (App.notifications = function (e) {
    let t = App.models.table("/Table/");
    t.addPcTable({model: t}), e.data("withClick") || (e.data("withClick", !0), e.on("click", (function (e) {
      t.getNotificationsTable()
    })));
    let i = {}, n = {}, a = e.data("periodicity") || 0;
    const l = function () {
      switch (document.visibilityState) {
        case"hidden":
          i.jqXHR && i.jqXHR.abort && i.jqXHR.abort(), i = {};
          break;
        case"visible":
          t.checkForNotifications(a, Object.keys(n), i).then((function (e) {
            e.notifications && e.notifications.length && (n[e.notification_id] = App.showDatas.call(t, e.notifications, e.notification_id), n[e.notification_id].forEach((function (t) {
              t && t.$modal && t.$modal.length && t.$modal.on("hide.bs.modal", (function () {
                delete n[e.notification_id]
              }))
            }))), e.deactivated && e.deactivated.forEach && e.deactivated.forEach((function (e) {
              n[e] && (n[e].forEach((function (e) {
                e.simpleClose()
              })), delete n[e])
            })), App.checkNotificationManager(n), a > 0 && l()
          })).fail((function (e) {
            e && e.error && document.removeEventListener("visibilitychange", l)
          }))
      }
    };
    return a > 0 && (document.addEventListener("visibilitychange", l), l()), l
  }, App.isTopWindow()) {
    let e = $("#bell-notifications");
    e.length && App.notifications(e)
  }
})), $((function () {
  let e = $("#docs-link");
  const t = function () {
    let i = $(this).data("type"),
      n = $('<div class="tech-table" id="DocsPopover" data-type="' + i + '" style="min-height: 250px"></div>');
    $.post("https://docs.totum.online/index_" + i + ".json", (function (e) {
      e && e.length && e.forEach((function (e) {
        n.append('<div style="' + (e[2] || "") + '"><i class="fa fa-external-link"></i> <a href="http://docs.totum.online' + e[1] + '" target="totum-docs">' + e[0] + "</a></div>")
      }))
    })), e.popover({
      html: !0,
      content: n,
      trigger: "manual",
      container: "body",
      placement: "auto bottom",
      template: '<div class="popover" role="tooltip" style=""><div class="arrow" style="left: 50%;"></div><div class="popover-content" style=" padding: 3px 5px;"></div></div>'
    }), setTimeout((function () {
      e.popover("show"), $("#" + e.attr("aria-describedby")).css("top", "45px"), $("body").one("click.DocsPopover", (function (i) {
        void 0 !== i.altKey && (e.popover("destroy"), e.one("click", t))
      }))
    }), 50)
  };
  e.one("click", t)
})), function (e, t) {
  const i = e.MOBILE_MAX_WIDTH = 1199, n = {
    type: {isOn: !0, Val: "string"},
    width: {isOn: !0, Val: 100},
    default: {isOn: !1, Val: ""},
    regexp: {isOn: !1, Val: ""},
    regexpErrorText: {isOn: !1, Val: ""},
    required: {isOn: !0, Val: !1},
    showInWeb: {isOn: !0, Val: !0},
    insertable: {isOn: !0, Val: !0},
    dropdownView: {isOn: !0, Val: !0},
    addRoles: {isOn: !1, Val: ["1"]},
    editable: {isOn: !0, Val: !0},
    editRoles: {isOn: !1, Val: ["1"]},
    hidden: {isOn: !0, Val: !1},
    warningEditPanel: {isOn: !0, Val: !1},
    warningEditText: {isOn: !1, Val: "Точно изменить?"},
    warningEditRegExp: {isOn: !1, Val: "/^someValue$/"},
    url: {isOn: !0, Val: !1},
    openIn: {isOn: !1, Val: "iframe"},
    tableBreakBefore: {isOn: !0, Val: !1},
    sectionTitle: {isOn: !1, Val: ""},
    panelColor: {isOn: !1, Val: ""},
    webRoles: {isOn: !1, Val: ["1"]},
    logRoles: {isOn: !1, Val: ["1"]},
    showInWebOtherPlace: {isOn: !0, Val: !1},
    showInWebOtherPlacement: {isOn: !1, Val: "param"},
    showInWebOtherOrd: {isOn: !1, Val: null},
    showInXml: {isOn: !0, Val: !1},
    apiEditable: {isOn: !1, Val: !1},
    xmlEditRoles: {isOn: !1, Val: ["1"]},
    xmlRoles: {isOn: !1, Val: ["1"]},
    logging: {isOn: !0, Val: !0},
    code: {isOn: !1, Val: "= : "},
    codeOnlyInAdd: {isOn: !1, Val: !1},
    errorText: {isOn: !1, Val: ""},
    codeAction: {isOn: !1, Val: "= :"},
    CodeActionOnAdd: {isOn: !1, Val: !1},
    CodeActionOnChange: {isOn: !1, Val: !1},
    format: {isOn: !1, Val: "f1=:"},
    help: {isOn: !1, Val: ""}
  }, a = "#ee0c1f", l = "#3fbf46", s = "pcTableInsertRowPanel";
  var o = 0;
  CodeMirror.defineMode("sections", (function () {
    return {
      startState: function () {
        return {}
      }, token: function (e, t) {
        if (0 === e.lineOracle.line) return e.skipToEnd(), t.isStart = !1, "sec-title";
        if (0 === e.pos) return e.skipTo(":"), e.next(), t.isParamsPart = !0, "sec-param";
        {
          let i = e.string.substring(e.pos);
          if (t.isParamsPart && i.match(":")) {
            let n = "sec-parts", a = ":";
            return -1 !== i.indexOf(",") ? a = "," : t.isParamsPart = !1, /^\s*\d+\s*$/.test(i.substring(0, i.indexOf(a))) && (n = "sec-num-parts"), e.skipTo(a), e.next(), n
          }
          return /^\s*(true|false)\s*$/.test(i) ? (e.skipToEnd(), "boolean") : (e.skipToEnd(), "sec-value")
        }
      }
    }
  })), CodeMirror.sectionsAutoCloses = function (t) {
    t.on("keyup", (function (t, i) {
      t.options.bigOneDialog && e.top.wasCtrl(i) && "83" === (i.keyCode || i.which).toString() ? (i.stopPropagation(), "function" == typeof t.options.bigOneDialog ? t.options.bigOneDialog() : t.options.bigOneDialog.close()) : e.top.wasCtrl(i) && "191" === (i.keyCode || i.which).toString() && CodeMirror.commentMe(t), "27" === (i.keyCode || i.which).toString() ? (t.state.completionActive && t.state.completionActive.close(), i.stopPropagation()) : {
        9: "tab",
        13: "enter",
        27: "escape",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        38: "up",
        40: "down",
        57: "("
      }[(i.keyCode || i.which).toString()] || CodeMirror.showHint(t, CodeMirror.hint.totumVars, {})
    }))
  }, function () {
    let i = App.functions || [], n = [];
    i.forEach((function (e) {
      e.d || n.push(e.name)
    }));
    let a = {};
    i.forEach((function (e) {
      a[e.name.toLowerCase()] = [e.t, 0, e.p, e.n, e.m, e.name]
    }));
    let l = ["where", "order", "field", "sfield", "bfield", "tfield", "preview", "parent", "section", "table", "filter", "fieldtitle", "fieldhide"];
    CodeMirror.defaults.scrollbarStyle = "overlay", CodeMirror.defineInitHook((function (i) {
      try {
        if (!i.options.bigOneDialog && screen.width > e.MOBILE_MAX_WIDTH) {
          let n,
            a = t('<i class="fa fa-expand codemirror-expander" style="position: absolute;\n    right: 10px;\n    bottom: 10px;\n    z-index: 10000;\n    font-family: FontAwesome; cursor: pointer"></i>');
          t(i.display.wrapper).append(a), a.on("click", (function () {
            n = t('<div class="HTMLEditor" id="bigOneCodemirror" style="height: 100%;"></div>');
            let a, l = i.getValue();
            e.top.BootstrapDialog.show({
              message: n,
              type: null,
              title: "Правка текстового поля",
              cssClass: "fieldparams-edit-panel",
              draggable: !0,
              onhide: function (e) {
                i.setValue(a.getValue())
              },
              onshow: function (e) {
                e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({
                  width: "90vw",
                  minHeight: "90vh"
                }), e.$modalHeader.find("button.close").css("font-size", "16px").html('<i class="fa fa-compress"></i>')
              },
              onshown: function (t) {
                a = CodeMirror(n.get(0), {
                  mode: i.options.mode,
                  value: l,
                  theme: "eclipse",
                  lineNumbers: !0,
                  indentWithTabs: !0,
                  autoCloseTags: !0,
                  bigOneDialog: t
                }), i.table && (a.table = i.table);
                let s = Math.round(t.$modalContent.height() - t.$modalHeader.outerHeight() - 40);
                a.getScrollerElement().style.minHeight = s + "px", n.find(".CodeMirror").css("min-heught", s), a.focus(), t.$modalContent.position({
                  my: "center top",
                  at: "center top+30px",
                  of: e.top
                })
              }
            })
          }))
        }
      } catch (e) {
        i.setValue(e.message)
      }
    }));
    CodeMirror.defineInitHook((function (e) {
      try {
        t(e.display.wrapper).on("contextmenu", ".cm-function", (function () {
          let e = t(this).text();
          return e = e.substring(0, e.length - 1), async function (e, i) {
            let n = e.toLowerCase(), s = t('<div style="width:200px" class="function-help">');
            t('<div class="func-template">').text(e + a[n][0]).appendTo(s).on("click", () => !1);
            let o = t('<div class="func-params">').appendTo(s).on("click", () => !1);
            a[n][2].forEach(e => {
              let i = t("<span>").text(e);
              -1 !== a[n][3].indexOf(e) && i.addClass("req"), -1 !== a[n][4].indexOf(e) && i.addClass("multi"), -1 !== l.indexOf(e) && i.addClass("db"), o.append(i), o.append(" ")
            });
            let r = t("<a>").attr("href", "https://docs.totum.online/functions#fn-" + a[n][5]).attr("target", "_blank").html('<button class="btn btn-default btn-sm">Документация</button>');
            s.append(r.wrap('<div class="button">').parent()), App.popNotify({
              isParams: !0,
              $text: s,
              element: i,
              trigger: "manual",
              container: t("body")
            }), setTimeout(() => {
              t("#table").data("pctable").closeCallbacks.push((function () {
                i && i.length && i.popover("destroy")
              }))
            }, 200), t("body").click()
          }(e, t(this)), !1
        }))
      } catch (e) {
        console.log(e.message)
      }
    }));

    function s(e) {
      if (e.getOption("disableInput") || "totum" !== e.getOption("mode")) return CodeMirror.Pass;
      var t = e.listSelections(), i = [];
      let n = !1;
      for (let r = 0; r < t.length; r++) {
        if (!t[r].empty()) return CodeMirror.Pass;
        var l = t[r].head, s = e.getTokenAt(l, !0);
        if (s.state && s.state.inFuncName || "function" == s.type || "error" == s.type) {
          let d, c, f = s.string.toLowerCase(), p = "";
          if (-1 !== f.indexOf("/") ? (d = f.substring(0, f.indexOf("/")), p = f.substring(f.indexOf("/")), c = "/") : -1 !== f.indexOf(";") ? (d = f.substring(0, f.indexOf(";")), p = f.substring(f.indexOf(";")), c = ";") : d = f.trimRight(), d = a[d]) {
            let e = "", t = 0;
            if (p.length) {
              e = "(";
              let i = 1, a = !0;
              p.split(c).forEach((function (t) {
                if (0 === t.length) ; else {
                  a || (e += "; "), a = !1;
                  let n = -1 !== t.indexOf(":") && "" !== t.slice(t.indexOf(":") + 1).trim();
                  e += t + (-1 === t.indexOf(":") ? ": " : ""), 1 !== i || n || (i = e.length)
                }
              })), 1 === i ? i = e.length : n = !0, t += i, e += ")"
            } else if (e = d[0], /:/.test(e)) {
              let i = e.indexOf(":"), a = e.substring(i), l = a.substring(0, a.indexOf(";") || a.indexOf(")"));
              t += i, -1 !== l.indexOf("'") ? t += l.indexOf("'") + 1 : t += 2, n = !0
            } else t += e.length;
            i[r] = {
              text: e,
              newPos: CodeMirror.Pos(l.line, l.ch - p.length + t),
              replace: CodeMirror.Pos(l.line, l.ch - p.length)
            }
          } else i[r] = {text: "()", newPos: CodeMirror.Pos(l.line, l.ch + 1), replace: CodeMirror.Pos(l.line, l.ch)};
          let h = i[r];
          if (h) {
            e.replaceRange(h.text, h.replace, t[r].anchor, "+insert");
            var o = e.listSelections().slice(0);
            o[r] = {
              head: h.newPos,
              anchor: h.newPos
            }, e.setSelections(o), n && CodeMirror.showHint(e, CodeMirror.hint.totumVars, {})
          }
        } else e.replaceRange("()", CodeMirror.Pos(l.line, l.ch), t[r].anchor), e.setSelections([{
          head: CodeMirror.Pos(l.line, l.ch + 1),
          anchor: CodeMirror.Pos(l.line, l.ch + 1)
        }])
      }
    }

    CodeMirror.defineMode("totum", (function () {
      return {
        startState: function () {
          return {inString: !1, isStart: !0, inFunction: !1, lineName: ""}
        }, token: function (e, i) {
          function n() {
            return e.string.substring(e.start, e.pos)
          }

          function s() {
            "use strict";
            return i.inFunction = !1, e.skipToEnd(), "error"
          }

          function o() {
            let t = !1;
            for (; "[" === e.peek() && e.next();) {
              if ("[" === e.peek() && (t = !0, e.next()), '"' === e.peek() || "'" === e.peek()) {
                let t = e.peek();
                for (e.next(); e.peek() !== t && e.next();) ;
                e.next()
              } else for (; /[a-z0-9_A-Z$#@.]/.test(e.peek()) && e.next();) ;
              if ("]" !== e.peek()) return !1;
              e.next()
            }
            if (t) {
              if ("]" !== e.peek()) return !1;
              e.next()
            }
            return !0
          }

          i.lineNames = [];
          try {
            e.lineOracle.doc.cm.getValue().split("\n").forEach((function (e) {
              return 0 === e.trim().length || 0 === e.indexOf("//") ? "" : e.match(/\s*[a-zA-Z_0-9]+\s*=\s*[a-zA-Z0-9_]*:/) ? i.lineNames.push(e.replace(/^\s*~?\s*([a-zA-Z_0-9=]+).*/, "$1")) : ""
            }))
          } catch (e) {
          }
          if (0 === e.pos || !0 === i.isStart) {
            if (e.string.match("^[\ts]*//")) return e.skipToEnd(), i.isStart = !1, "comment";
            let a = "start";
            if (i.isStart = !0, /[\t\n]/.test(e.peek()) && e.next()) {
              for (; /[\t\n]/.test(e.peek()) && e.next();) ;
              return "start-tabs"
            }
            if (!e.skipTo(":")) return s();
            if (i.lineName = n().trim(), "~" === i.lineName.substring(0, 1) && (a += " fixed", i.lineName = i.lineName.substring(1)), i.lineName = i.lineName.replace(/=\s*[a-z0-9_]*\s*$/, "="), /^\s*=\s*$|^\s*[a-z]{1,2}\d+=$/i.test(i.lineName)) a += " exec"; else if (!/^[a-z0-9_]+$/i.test(i.lineName)) return s();
            return e.next(), t(e.lineOracle.doc.cm.getWrapperElement()).find(".cm-var-not-in").each((function () {
              let e = t(this).text();
              e = e.replace(/\[.*/, ""), e !== "$" + i.lineName && e !== "#$" + i.lineName && e !== "$$" + i.lineName || t(this).removeClass("cm-var-not-in")
            })), i.lineNames.filter((function (e) {
              return e === i.lineName
            })).length > 1 && (a += " dubbled"), i.isStart = !1, a
          }
          if (i.isStart = !1, e.match(/(math|json|str|cond)`[^`]*`/)) return "spec";
          switch (e.peek()) {
            case" ":
              return e.next(), null;
            case"{":
              return e.next(), e.skipTo("}") ? (e.next(), "inVars") : s();
            case'"':
              let t = e.peek();
              return e.next(), e.skipTo(t) ? (e.next(), "string") : s();
            case"#":
              e.next();
              let n, a = "db_name";
              if ("$" === e.peek()) return a;
              for (e.next(); (n = e.string.substring(e.start + 1, e.pos + 1)) && /^[a-z0.-9_а-яА-Я]*$/.test(n) && e.next();) ;
              if (!o()) return s();
              let l = e.string.substring(e.start + 1, e.pos).replace(/^([shcl]\.)?([a-z0-9_]+)$/, "$2");
              return "n" === l || /^[0-9a-z_]{2,}/.test(l.replace(/\[.*/g, "")) || (a += " tmp-error"), "" === l ? s() : a;
            case"@":
              if (e.next(), "$" === e.peek()) {
                for (e.next(); /[a-zA-Z0-9_]/.test(e.peek()) && e.next();) ;
                return o() ? "global-var" : s()
              }
            {
              let t;
              for (; /[a-z0-9_.]/.test(t = e.peek()) && e.next();) ;
              if (!o()) return s();
              let i = e.string.substring(e.start + 1, e.pos);
              if (/^[a-z0-9_]{3,}\.[a-z0-9_]{2,}(\[\[?([a-zA-Z0-9_\$\#]+|"[^"]+"|'[^']+')\]?\])*$/i.test(i)) return "db_name"
            }
              return s();
            case"$":
              if (e.next(), "@" === e.peek()) {
                for (e.next(); /[a-zA-Z0-9_]/.test(e.peek()) && e.next();) ;
                return o() ? "process-var" : s()
              }
              if ("$" === e.peek() && e.next(), "#" === e.peek()) {
                for (e.next(); /[a-zA-Z0-9_]/.test(e.peek()) && e.next();) ;
                return o() ? "code-var" : s()
              }
            {
              for (; /[a-zA-Z0-9_"]/i.test(e.peek()) && e.next();) ;
              if (!o()) return s();
              let t = e.string.substring(e.start, e.pos);
              t = t.replace(/\[.*/g, "");
              let n = "variable", a = t.substring(1);
              return "$" === a[0] && (n += " dollar-dollar", a = a.substring(1)), -1 === i.lineNames.indexOf(a) && (n += " var-not-in"), n
            }
            case"t":
              if ("true" === e.string.substring(e.start, e.start + 4)) return e.skipTo("e"), e.next(), "boolean";
              break;
            case"f":
              if ("false" === e.string.substring(e.start, e.start + 5)) return e.skipTo("e"), e.next(), "boolean"
          }
          if (i.inFuncName = !1, !i.inFunction && /[a-zA-Z]/.test(e.peek())) {
            if (i.inFuncName = !0, e.skipTo("(") ? i.inFunction = !0 : e.skipToEnd(), !/^[a-zA-Z]+[0-9]*\s*$/.test(n())) return s();
            let t = a[n().trim().toLowerCase()];
            return t ? (i.func = t, e.next(), "function") : s()
          }
          if (i.inFunction) {
            if (")" === e.peek()) return e.next(), i.inFunction = !1, i.functionParam = "", "function";
            if (!i.functionParam && /[a-z_]/.test(e.peek())) {
              if (e.skipTo(":")) {
                let t = e.string.substring(e.start, e.pos);
                if (/^[a-z_]+\s*$/.test(t)) {
                  if (i.functionParam = t, e.next(), -1 === i.func[2].indexOf(t)) return s();
                  let n = "functionParam";
                  return -1 !== l.indexOf(t) && (n += " fieldParam"), -1 !== i.func[3].indexOf(t) && (n += " reqParam"), i.func[4] && -1 !== i.func[4].indexOf(t) && (n += " multiParam"), n
                }
                return s()
              }
              return e.skipTo(")") ? "error fieldParam" : s()
            }
            if (!i.functionParam) return s();
            if (";" === e.peek()) return e.next(), i.functionParam = "", "";
            if ("order" === i.functionParam && /[ad]/.test(e.peek())) {
              if ("asc" === e.string.substring(e.start, e.start + 3)) return e.next(), e.next(), e.next(), "";
              if ("desc" === e.string.substring(e.start, e.start + 4)) return e.next(), e.next(), e.next(), e.next(), ""
            }
            if ("'" === e.peek()) {
              let t = e.peek();
              return e.next(), e.skipTo(t) ? (e.next(), "string-name") : s()
            }
          }
          if ("'" === e.peek()) {
            let t = e.peek();
            return e.next(), e.skipTo(t) ? (e.next(), "string") : s()
          }
          if (/\d|%/.test(e.peek())) {
            for (e.next(); /[0-9.%]/.test(e.peek()) && e.next();) ;
            return /^\d+(\.\d+)?%?$/.test(e.string.substring(e.start, e.pos)) ? "number" : s()
          }
          return /[\^+-\/*!<>=]/.test(e.peek()) ? (e.next(), "operator") : s()
        }
      }
    })), CodeMirror.registerHelper("hint", "totumVars", (function (e, i) {
      return function (e, i, s, r) {
        var d, p = e.getCursor(), u = s(e, p), m = e.getLine(p.line);
        if ("string-name" !== u.type && /\b(?:string|comment)\b/.test(u.type)) return;
        var b = CodeMirror.innerMode(e.getMode(), u.state);
        if ("json" === b.mode.helperType) return;
        u.state = b.state, u.inString = u.string, u.state.isDb_name = !1, u.state.showAll = !0, r.inStart = !0;
        let g, w = function (e, t, i) {
          null != i && (e.replaceRange(i.text || i, t.from, t.to), i.curPos && e.setCursor({
            line: t.from.line,
            ch: i.curPos
          }), i.showHint && CodeMirror.showHint(e, CodeMirror.hint.totumVars, {}))
        }, v = {
          text: "math``",
          textVis: "math``",
          title: "",
          render: f,
          type: "",
          curPos: u.start + 5,
          hint: w,
          tab: !0
        }, _ = {
          text: "json``",
          textVis: "json``",
          title: "",
          render: f,
          type: "",
          curPos: u.start + 5,
          hint: w,
          tab: !0
        }, y = {
          text: "cond``",
          textVis: "cond``",
          title: "",
          render: f,
          type: "",
          curPos: u.start + 5,
          hint: w,
          tab: !0
        }, x = {text: "str``", textVis: "str``", title: "", render: f, type: "", curPos: u.start + 4, hint: w, tab: !0};
        if (i = i.slice(), u.state.isStart || 0 === p.ch) {
          i = [], u.string = u.string.replace(/^[\t]+/, "");
          let n = "";
          /^~/.test(u.string) && (u.string.replace(/^~/, ""), n = "~"), t(e.getWrapperElement()).find(".cm-var-not-in").each((function () {
            let e = t(this).text().replace(/^(\#|\$)?\$/, "").replace(/\[.*/, "");
            i.push({text: n + e + ": ", displayText: e})
          }))
        } else if ("error" === u.type && u.state.func && u.state.func[2].length && -1 !== [";", "/"].indexOf(m[u.start])) {
          i = [], d = u.string.substr(0, p.ch - u.start).replace(/^[;\/]+([a-z_]*).*/, "$1");
          let e = u.string.substr(p.ch - u.start).replace(/^[;\/]+[a-z_]*(.*)/, "$1");
          u.state.func[2].forEach((function (t) {
            let n = "", a = "";
            -1 !== [";", ")"].indexOf(e.trim()[0]) ? a = e : e.match(/[)]/) && (a = ";" + e), -1 !== u.state.func[3].indexOf(t) && (n += " item-reqParam"), -1 !== u.state.func[4].indexOf(t) && (n += " item-multiParam"), -1 !== l.indexOf(t) && (n += " item-fieldParam");
            let s = "";
            -1 === ["(", " "].indexOf(m[u.start - 1]) && (s = " "), i.push({
              text: s + t + ": " + a,
              textVis: t,
              title: "",
              render: f,
              type: n,
              hint: w,
              curPos: u.start + s.length + (t + ": " + a).length - a.length
            })
          }))
        } else if (/^'.*?'?$/.test(u.string) && -1 !== l.indexOf(u.state.functionParam)) if (u.state.showAll = !0, "''" === u.string ? (u.end = u.end, u.start += 1, u.string = "") : /'[a-z_0-9]+'/.test(u.string) ? (u.start += 1, u.string = u.string.slice(1, p.ch - u.start)) : (u.string = u.string.slice(1, p.ch - u.start), u.start += 1, u.end = p.ch, "'" === e.getLine(p.line)[p.ch] && u.end++), "table" === u.state.functionParam) {
          let e = c();
          i = [], Object.keys(e).forEach((function (t) {
            i.push({text: t + "'", textVis: t, title: e[t].t, render: f, type: "item-string-name", hint: w, tab: !0})
          }))
        } else {
          let t, n = e.getLine(p.line), a = n.substring(0, p.ch), l = n.substring(p.ch),
            s = l.substring(0, l.indexOf(")"));
          if (a = a.substring(a.lastIndexOf("(")) + s, t = a.match(/table:\s*((\$#ntn)|'([a-z_0-9]*)')/)) {
            let n = t[2] ? e.table : t[3];
            i = [], Object.keys(o[n].f).forEach((function (e) {
              i.push({
                text: e + "'",
                textVis: e,
                title: o[n].f[e],
                render: f,
                type: "item-string-name",
                curPos: p.ch + e.length + 1,
                tab: !0
              })
            })), i.push({
              text: "id'",
              textVis: "id",
              title: "",
              render: f,
              type: "item-string-name",
              curPos: p.ch + 3,
              tab: !0
            })
          }
        } else if (u.end > p.ch && (u.end = p.ch, u.string = u.string.slice(0, p.ch - u.start)), 0 === u.string.indexOf("@")) {
          r.inStart = !1, i = [];
          let e, t = c();
          if (u.string = u.string.slice(1, p.ch - u.start), u.start = u.start + 1, u.end = p.ch, e = u.string.match(/^([a-z_0-9]+)\./)) {
            let n = e[1];
            u.start += (n + ".").length, u.string = u.string.slice((n + ".").length), t[n] && t[n]["@"].length && t[n]["@"].forEach((function (e) {
              i.push({text: e, title: t[n].f[e], render: f, type: "item-db_name"})
            }))
          } else Object.keys(t).forEach((function (e) {
            t[e]["@"].length && i.push({
              text: e + ".",
              textVis: e,
              title: t[e].t,
              render: f,
              type: "item-db_name",
              showHint: !0,
              hint: w
            })
          }))
        } else if ("$#" === u.string.slice(0, 2)) {
          i = [{text: "$#lc", title: "Пустой лист", render: f, type: "item-code-var"}, {
            text: "$#nd",
            title: "дата - Y-m-d",
            render: f,
            type: "item-code-var"
          }, {text: "$#ndt", title: "дата-время - Y-m-d H:i", render: f, type: "item-code-var"}, {
            text: "$#ndts",
            title: "дата-время с секундами - Y-m-d H:i:s",
            render: f,
            type: "item-code-var"
          }, {text: "$#nu", title: "id пользователя", render: f, type: "item-code-var"}, {
            text: "$#nr",
            title: "ids ролей пользователя",
            render: f,
            type: "item-code-var"
          }, {text: "$#nti", title: "id таблицы", render: f, type: "item-code-var"}, {
            text: "$#ntn",
            title: "NAME таблицы",
            render: f,
            type: "item-code-var"
          }, {text: "$#nth", title: "HASH врем. таблицы", render: f, type: "item-code-var"}, {
            text: "$#ih",
            title: "HASH строки добавления",
            render: f,
            type: "item-code-var"
          }, {text: "$#nci", title: "Cycle расчетной таблицы", render: f, type: "item-code-var"}, {
            text: "$#nf",
            title: "NAME поля",
            render: f,
            type: "item-code-var"
          }, {text: "$#nl", title: "Новая строка", render: f, type: "item-code-var"}, {
            text: "$#tb",
            title: "Табуляция",
            render: f,
            type: "item-code-var"
          }, {text: "$#tpa", title: "Тип экшена код действия", render: f, type: "item-code-var"}, {
            text: "$#ids",
            title: "id отмеченных галочками полей",
            render: f,
            type: "item-code-var"
          }, {
            text: "$#nfv",
            title: "Значение текущего поля (для селектов/действий/форматов)",
            render: f,
            type: "item-code-var"
          }, {text: "$#onfv", title: "Прошлое значение текущего поля", render: f, type: "item-code-var"}, {
            text: "$#nh",
            title: "Текущий хост-name",
            render: f,
            type: "item-code-var"
          }, {text: "$#duplicatedId", title: "Ид дублированной строки", render: f, type: "item-code-var"}];
          const e = function (e) {
            let t = i.slice(), n = [];
            return t = t.filter((function (t) {
              if (-1 === e.indexOf(t.text)) return !0;
              n.push(t)
            })), n.concat(t)
          };
          switch (u.state.functionParam) {
            case"table":
              i = e(["$#ntn"]);
              break;
            case"cycle":
              i = e(["$#nci"]);
              break;
            case"field":
              i = e(["$#nf", "$#nfv"])
          }
        } else if (g = u.string.match(/^(#?\$)/)) i = [], u.string = u.string.slice(g[1].length, p.ch - u.start), u.start = u.start + g[1].length, u.end = p.ch, u.state.lineNames.forEach((function (e) {
          -1 === e.indexOf("=") && i.push(e)
        })); else if (g = u.string.match(/^\#/)) i = [], u.string = u.string.slice(1, p.ch - u.start), u.start = u.start + 1, u.end = p.ch, (g = u.string.match(/^([a-z]{1,3}\.)/)) && (u.string = u.string.slice(g[1].length), u.start += g[1].length), e.table && o[e.table] && (Object.keys(o[e.table].f).forEach((function (t) {
          i.push({text: t, title: o[e.table].f[t], render: f, type: "item-db-name"})
        })), i.push({text: "id", title: "", render: f, type: "item-db-name"})); else if (u.state.inFuncName) {
          if (!u.state.inFunction) if (g = u.string.match(/^([a-zA-Z]+)([\/;])/)) {
            let e;
            if (u.state.showAll = !0, e = a[g[1].toLowerCase()]) {
              let t = u.start;
              u.start = u.start + u.string.lastIndexOf(g[2]) + 1, u.string = u.string.slice(u.string.lastIndexOf(g[2]) + 1, p.ch - t), u.end = p.ch, i = [], e[2].forEach((function (t) {
                let n = "";
                -1 !== e[3].indexOf(t) && (n += " item-reqParam"), -1 !== e[4].indexOf(t) && (n += " item-multiParam"), -1 !== l.indexOf(t) && (n += " item-fieldParam"), i.push({
                  text: t + ": ",
                  textVis: t,
                  title: "",
                  render: f,
                  type: n
                })
              }))
            }
          } else (i = n.slice()).push("true"), i.push("false"), i.unshift(v), i.unshift(_), i.unshift(y), i.unshift(x)
        } else u.state.func && ("error fieldParam" === u.type || /(\(|;\s*)$/.test(e.getLine(p.line).slice(0, u.start))) ? (i = [], u.state.func[2].forEach((function (t) {
          let n = "", a = "";
          ")" !== e.getLine(p.line).slice(p.ch).trim() && (a = "; "), -1 !== u.state.func[3].indexOf(t) && (n += " item-reqParam"), -1 !== u.state.func[4].indexOf(t) && (n += " item-multiParam"), -1 !== l.indexOf(t) && (n += " item-fieldParam"), i.push({
            text: t + ": " + a,
            textVis: t,
            title: "",
            render: f,
            type: n,
            hint: w,
            curPos: u.start + (t + ": " + a).length - a.length
          })
        }))) : (i = ["true", "false"], "order" === u.state.functionParam && (i = i.concat(["asc", "desc"])));
        return {list: h(u, i, r, d), from: CodeMirror.Pos(p.line, u.start), to: CodeMirror.Pos(p.line, u.end)}
      }(e, p, (function (e, t) {
        return e.getTokenAt(t)
      }), i)
    }));
    let o = [], r = !1, d = null;
    const c = function () {
      if ((!d || d < Math.floor(Date.now() / 1e3) - 40) && (d = Math.floor(Date.now() / 1e3), o = []), 0 === o.length && !r) {
        r = !0;
        let e = t("#table").data("pctable");
        e && e.isCreatorView && e.model.getAllTables().then((function (e) {
          o = e.tables, r = !1
        }))
      }
      return o
    }, f = function (e, i, n) {
      t(e).append('<span class="' + n.type + '">' + (n.textVis || n.text) + ("" === n.title ? "" : ' <span class="descr">' + n.title + "</span>") + "</span>")
    };
    let p = [];

    function h(e, t, i, n) {
      var a = [], l = [];
      n = void 0 === n ? e.string.toLowerCase() : n, i && i.globalScope;
      if (!e.state.showAll && "" === n) return found;
      return t.forEach((function (e) {
        let t, s = "";
        if ("string" == typeof e ? t = e.toLowerCase() : (t = e.text.toLowerCase(), e.title && (s = e.title.toLowerCase())), !u(a, t) && !u(l, t)) {
          0 === t.lastIndexOf(n, 0) || 0 === s.lastIndexOf(n, 0) ? a.push(e) : -1 !== s.indexOf(n, 0) ? l.push(e) : i.inStart || -1 === t.indexOf(n) || l.push(e)
        }
      })), 1 === a.length && a[0] === n || 1 === a.length && a[0].text === n || 1 === l.length && l[0] === n || 1 === l.length && l[0].text === n ? [] : a.concat(l)
    }

    function u(e, t) {
      return -1 !== e.indexOf(t)
    }

    CodeMirror.defineOption("autoCloseFunctions", !1, (function (i) {
      "totum" === i.getOption("mode") && function (i) {
        c();
        var n = {name: "autoCloseFunctions"};
        n["'('"] = s, n["')'"] = s, i.addKeyMap(n), i.on("keydown", (function (e, t) {
          "9" === (t.keyCode || t.which).toString() && function (e, t, i) {
            var n = e.getCursor();
            if (e.getTokenAt(n).state.inFunction) {
              let a, l, s = e.getLine(n.line);
              if (i || t) {
                a = n.ch;
                let e = a;
                for (; " " === s[e];) e++;
                if (";" === s[e]) for (a = e, l = a + 1; ";" !== s[l] && ")" !== s[l];) l++; else {
                  for (l = a; ";" !== s[l] && ")" !== s[l];) l++;
                  for (";" === s[l] && l++; "(" !== s[a] && ";" !== s[a];) a--;
                  a++
                }
              } else {
                for (a = n.ch; s[a] && -1 === [":", ")"].indexOf(s[a]);) a++;
                for (":" === s[a] && (a++, " " === s[a] && a++), " " === s[a] && a++, l = a; s[l] && -1 === [";", ")"].indexOf(s[l]);) l++
              }
              return e.setSelection({line: n.line, ch: a}, {line: n.line, ch: l}), !0
            }
          }(e, t.altKey, t.shiftKey) && t.preventDefault()
        })), i.on("keyup", (function (t, i) {
          t.options.bigOneDialog && e.top.wasCtrl(i) && "83" === (i.keyCode || i.which).toString() ? (i.stopPropagation(), "function" == typeof t.options.bigOneDialog ? t.options.bigOneDialog() : t.options.bigOneDialog.close()) : e.top.wasCtrl(i) && "191" === (i.keyCode || i.which).toString() && CodeMirror.commentMe(t), "27" === (i.keyCode || i.which).toString() ? (t.state.completionActive && t.state.completionActive.close(), i.stopPropagation()) : {
            9: "tab",
            13: "enter",
            27: "escape",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            38: "up",
            40: "down",
            57: "("
          }[(i.keyCode || i.which).toString()] || CodeMirror.showHint(t, CodeMirror.hint.totumVars, {})
        })), i.on("dblclick", (function (e) {
          var n = i.getCursor(), a = i.getTokenAt(n).state;
          let l, s = t(i.getWrapperElement()), o = i.getLine(n.line), r = o.substring(0, n.ch);
          if (/^\s*~?\s*?[a-zA-Z0-9_]+$/.test(r)) l = a.lineName; else {
            let e = n.ch - 1;
            if (/[a-zA-Z0-9_]/.test(o[e])) {
              for (; --e && e >= 0 && /[a-zA-Z0-9_]/.test(o[e]);) ;
              if ("$" === o[e]) {
                let t = e + 1;
                for (e = n.ch - 1; ++e && o.length > e && /[a-zA-Z0-9_]/.test(o[e]);) ;
                l = o.substring(t, e)
              }
            }
          }
          if (l) {
            if (new RegExp("^s*~?s*" + l + "s*:").test(s.find(".cm-start.light").text())) s.find(".light").removeClass("light"); else {
              s.find(".light").removeClass("light");
              let e = new RegExp("\\$" + l + "\\b");
              s.find(".cm-variable,.cm-inVars,.cm-spec,.cm-db_name").each((function () {
                let i = t(this);
                i.text().match(e) && i.addClass("light")
              })), s.find(".cm-start").each((function () {
                let e = t(this);
                e.text().trim().replace("~", "").replace(":", "") === l && e.addClass("light")
              }))
            }
          }
        }))
      }(i), "sections" === i.getOption("mode") && CodeMirror.sectionsAutoCloses(i)
    })), function () {
      "use strict";

      function t(e, t, i) {
        this.cm = e, this.getHints = t, this.options = i, this.widget = this.onClose = null
      }

      function i(e) {
        return "string" == typeof e ? e : e.text
      }

      function n(t, n) {
        this.completion = t, this.data = n;
        var a = this, l = t.cm, s = t.options, o = this.hints = e.top.document.createElement("ul");
        o.className = "CodeMirror-hints", this.selectedHint = 0;
        for (var r = n.list, d = 0; d < r.length; ++d) {
          var c = o.appendChild(e.top.document.createElement("li")), f = r[d],
            p = "CodeMirror-hint" + (d ? "" : " CodeMirror-hint-active");
          null != f.className && (p = f.className + " " + p), c.className = p, f.render ? f.render(c, n, f) : c.appendChild(e.top.document.createTextNode(f.displayText || i(f))), c.hintId = d
        }
        var h = l.cursorCoords(!1 !== s.alignWithWord ? n.from : null), u = h.left, m = h.bottom + 3, b = !0;
        o.style.left = u + "px", o.style.top = m + "px";
        var g,
          w = e.innerWidth || Math.max(e.top.document.body.offsetWidth, e.top.document.documentElement.offsetWidth),
          v = e.innerHeight || Math.max(e.top.document.body.offsetHeight, e.top.document.documentElement.offsetHeight),
          _ = o.getBoundingClientRect(), y = _.right - w, x = _.bottom - v;
        if (y > 0 && (_.right - _.left > w && (o.style.width = w - 5 + "px", y -= _.right - _.left - w), o.style.left = (u = h.left - y) + "px"), x > 0) {
          var k = _.bottom - _.top;
          _.top - (h.bottom - h.top) - k > 0 ? (x = k + (h.bottom - h.top), b = !1) : k > v && (o.style.height = v - 5 + "px", x -= k - v), o.style.top = (m = h.bottom - x) + "px"
        }
        ((s.container || e.top.document.body).appendChild(o), l.addKeyMap(this.keyMap = function (e, t) {
          var i = {
            Up: function () {
              t.moveFocus(-1)
            }, Down: function () {
              t.moveFocus(1)
            }, PageUp: function () {
              t.moveFocus(-t.menuSize())
            }, PageDown: function () {
              t.moveFocus(t.menuSize())
            }, Home: function () {
              t.setFocus(0)
            }, End: function () {
              t.setFocus(t.length)
            }, Enter: t.pick, Esc: t.close
          }, n = e.customKeys ? {} : i;

          function a(e, a) {
            var l;
            l = "string" != typeof a ? function (e) {
              return a(e, t)
            } : i.hasOwnProperty(a) ? i[a] : a, n[e] = l
          }

          if (e.customKeys) for (var l in e.customKeys) e.customKeys.hasOwnProperty(l) && a(l, e.customKeys[l]);
          if (e.extraKeys) for (var l in e.extraKeys) e.extraKeys.hasOwnProperty(l) && a(l, e.extraKeys[l]);
          return n
        }(s, {
          moveFocus: function (e) {
            a.changeActive(a.selectedHint + e)
          }, setFocus: function (e) {
            a.changeActive(e)
          }, menuSize: function () {
            return a.screenAmount()
          }, length: r.length, close: function () {
            t.close()
          }, pick: function () {
            a.pick()
          }
        })), !1 !== s.closeOnUnfocus) && (l.on("blur", this.onBlur = function () {
          g = setTimeout((function () {
            t.close()
          }), 100)
        }), l.on("focus", this.onFocus = function () {
          clearTimeout(g)
        }));
        var C = l.getScrollInfo();
        return l.on("scroll", this.onScroll = function () {
          var i = l.getScrollInfo(), n = l.getWrapperElement().getBoundingClientRect(), a = m + C.top - i.top,
            s = a - (e.pageYOffset || (e.top.document.documentElement || e.top.document.body).scrollTop);
          if (b || (s += o.offsetHeight), s <= n.top || s >= n.bottom) return t.close();
          o.style.top = a + "px", o.style.left = u + C.left - i.left + "px"
        }), CodeMirror.on(o, "click", (function (e) {
          for (var t = e.target || e.srcElement; "SPAN" === t.nodeName;) t = t.parentNode;
          null != t.hintId && (a.changeActive(t.hintId), a.pick())
        })), CodeMirror.on(o, "mousedown", (function () {
          setTimeout((function () {
            l.focus()
          }), 20)
        })), CodeMirror.signal(n, "select", r[0], o.firstChild), !0
      }

      CodeMirror.showHint = function (e, i, n) {
        if (!e.somethingSelected() && (null == i && (i = e.getHelper(e.getCursor(), "hint")), null != i)) {
          e.state.completionActive && e.state.completionActive.close();
          var a = e.state.completionActive = new t(e, i, n || {});
          if (CodeMirror.signal(e, "startCompletion", e), !a.options.async) return a.showHints(i(e, a.options));
          i(e, (function (e) {
            a.showHints(e)
          }), a.options)
        }
      }, CodeMirror.commentMe = function (e) {
        var t = e.getCursor(), i = (e.getTokenAt(t).state, e.lineInfo(t.line));
        let n;
        (n = i.text.match(/^([\t\s]*)\/\//)) ? e.replaceRange("", {line: t.line, ch: n[1].length}, {
          line: t.line,
          ch: n[0].length
        }) : (n = i.text.match(/^[\t\s]*/), e.replaceRange("//", {line: t.line, ch: n[0].length}, {
          line: t.line,
          ch: n[0].length
        }))
      }, t.prototype = {
        close: function () {
          this.active() && (this.widget && this.widget.close(), this.onClose && this.onClose(), this.cm.state.completionActive = null, CodeMirror.signal(this.cm, "endCompletion", this.cm))
        }, active: function () {
          return this.cm.state.completionActive == this
        }, pick: function (e, t) {
          var n = e.list[t];
          n.hint ? n.hint(this.cm, e, n) : this.cm.replaceRange(i(n), e.from, e.to), this.close();
          this.cm
        }, showHints: function (e) {
          if (!e || !e.list.length || !this.active()) return this.close();
          this.showWidget(e)
        }, showWidget: function (e) {
          this.widget = new n(this, e), CodeMirror.signal(e, "shown");
          var t, i = null, a = this, l = this.options.closeCharacters || /[\s()\[\]{};:>,]/, s = this.cm.getCursor(),
            o = this.cm.getLine(s.line).length;

          function r() {
            t || (t = !0, a.close(), a.cm.off("cursorActivity", p), CodeMirror.signal(e, "close"))
          }

          function d() {
            return !!t || (a.widget ? void 0 : (r(), !0))
          }

          function c() {
            d() || (a.options.async ? a.getHints(a.cm, f, a.options) : f(a.getHints(a.cm, a.options)))
          }

          function f(e) {
            if (!d()) {
              if (!e || !e.list.length) return r();
              a.widget.close(), a.widget = new n(a, e)
            }
          }

          function p() {
            clearTimeout(i);
            var e = a.cm.getCursor(), t = a.cm.getLine(e.line);
            e.line != s.line || t.length - e.ch != o - s.ch || e.ch < s.ch || a.cm.somethingSelected() || e.ch && l.test(t.charAt(e.ch - 1)) ? a.close() : i = setTimeout(c, 170)
          }

          this.cm.on("cursorActivity", p), this.onClose = r
        }
      }, n.prototype = {
        close: function () {
          if (this.completion.widget == this) {
            this.completion.widget = null, this.hints.parentNode.removeChild(this.hints), this.completion.cm.removeKeyMap(this.keyMap);
            var e = this.completion.cm;
            !1 !== this.completion.options.closeOnUnfocus && (e.off("blur", this.onBlur), e.off("focus", this.onFocus)), e.off("scroll", this.onScroll)
          }
        }, pick: function () {
          this.completion.pick(this.data, this.selectedHint)
        }, changeActive: function (e) {
          if (e = Math.max(0, Math.min(e, this.data.list.length - 1)), this.selectedHint != e) {
            var t = this.hints.childNodes[this.selectedHint];
            t.className = t.className.replace(" CodeMirror-hint-active", ""), (t = this.hints.childNodes[this.selectedHint = e]).className += " CodeMirror-hint-active", t.offsetTop < this.hints.scrollTop ? this.hints.scrollTop = t.offsetTop - 3 : t.offsetTop + t.offsetHeight > this.hints.scrollTop + this.hints.clientHeight && (this.hints.scrollTop = t.offsetTop + t.offsetHeight - this.hints.clientHeight + 3), CodeMirror.signal(this.data, "select", this.data.list[this.selectedHint], t)
          }
        }, screenAmount: function () {
          return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1
        }
      }
    }()
  }(), function () {
    const e = function (e) {
      return {doc: e.doc}
    };
    CodeMirror.extendMode("css", {
      commentStart: "/*", commentEnd: "*/", newlineAfterToken: function (e, t) {
        return /^[;{}]$/.test(t)
      }
    }), CodeMirror.extendMode("javascript", {
      commentStart: "/*",
      commentEnd: "*/",
      newlineAfterToken: function (e, t, i, n) {
        return this.jsonMode ? /^[\[,{]$/.test(t) || /^}/.test(i) : (";" != t || !n.lexical || ")" != n.lexical.type) && (/^[;{}]$/.test(t) && !/^;/.test(i))
      }
    }), CodeMirror.extendMode("xml", {
      commentStart: "\x3c!--",
      commentEnd: "--\x3e",
      newlineAfterToken: function (e, t, i) {
        return "tag" == e && />$/.test(t) || /^</.test(i)
      }
    }), CodeMirror.defineExtension("commentRange", (function (e, t, i) {
      var n = this, a = CodeMirror.innerMode(n.getMode(), n.getTokenAt(t).state).mode;
      n.operation((function () {
        if (e) n.replaceRange(a.commentEnd, i), n.replaceRange(a.commentStart, t), t.line == i.line && t.ch == i.ch && n.setCursor(t.line, t.ch + a.commentStart.length); else {
          var l = n.getRange(t, i), s = l.indexOf(a.commentStart), o = l.lastIndexOf(a.commentEnd);
          s > -1 && o > -1 && o > s && (l = l.substr(0, s) + l.substring(s + a.commentStart.length, o) + l.substr(o + a.commentEnd.length)), n.replaceRange(l, t, i)
        }
      }))
    })), CodeMirror.defineExtension("autoIndentRange", (function (e, t) {
      var i = this;
      this.operation((function () {
        for (var n = e.line; n <= t.line; n++) i.indentLine(n, "smart")
      }))
    })), CodeMirror.defineExtension("autoFormatRange", (function (t, i) {
      var n = this, a = n.getMode(), l = n.getRange(t, i).split("\n"),
        s = CodeMirror.copyState(a, n.getTokenAt(t).state), o = n.getOption("tabSize"), r = "", d = 0, c = 0 == t.ch;

      function f() {
        r += "\n", c = !0, ++d
      }

      for (var p = 0; p < l.length; ++p) {
        for (var h = new CodeMirror.StringStream(l[p], o, e(n)); !h.eol();) {
          var u = CodeMirror.innerMode(a, s), m = a.token(h, s), b = h.current();
          h.start = h.pos, c && !/\S/.test(b) || (r += b, c = !1), !c && u.mode.newlineAfterToken && u.mode.newlineAfterToken(m, b, h.string.slice(h.pos) || l[p + 1] || "", u.state) && f()
        }
        !h.pos && a.blankLine && a.blankLine(s), c || f()
      }
      n.operation((function () {
        n.replaceRange(r, t, i);
        for (var e = t.line + 1, a = t.line + d; e <= a; ++e) n.indentLine(e, "smart");
        n.setSelection(t, n.getCursor(!1))
      }))
    })), t((function () {
    }))
  }();
  let r = {};
  var d = {
    sortable: !1,
    width: 50,
    icon: "fa-font",
    editable: !1,
    required: !0,
    insertable: !1,
    type: "string",
    getPanelVal: e => e,
    getEditVal: function (e) {
      var t, i = e.val().trim(), n = !1;
      (!this.required || void 0 !== i && "" !== i && null !== i || (t = "Поле " + this.title + " должно быть заполнено", n = !0), this.regexp && "" !== i) && (new RegExp(this.regexp).test(i) || (t = this.regexpErrorText || 'regexp не проходит - "' + this.regexp + '"', t = 'Ошибка заполнения поля "' + this.title + '": ' + t, n = !0));
      if (n) throw t;
      return i
    },
    getEditElement: function (e, i, n, a, l, s, o) {
      var r = t('<input type="text" class="form-control" name="cell_edit" autocomplete="off" autocorrect="off" />');
      void 0 !== o && r.attr("tabindex", o);
      var d = this;
      return i = i.v, r.val(i).on("keydown", (function (e) {
        switch (e.keyCode) {
          case 13:
          case 9:
            try {
              r.data("enterClicked", !0), a(t(this), e)
            } catch (e) {
              r.data("enterClicked", !1), App.popNotify(e, r, "default"), d.focusElement(r)
            }
            break;
          case 27:
            l(t(this), e)
        }
      })), r.on("blur", (function (e) {
        s(r, e)
      })), r.select()
    },
    checkEditRegExp: function (e) {
      if (!this.warningEditRegExp) return !0;
      try {
        let t = this.warningEditRegExp.match(/^\/(.*?)\/([a-z]*)$/);
        return new RegExp(t[1], t[2]).test(e)
      } catch (e) {
        return !0
      }
    },
    getCellText: function (e) {
      if (!0 === this.url && e) {
        let i = this.openIn || "window";
        switch (i) {
          case"window":
            i = "_self";
            break;
          case"newWindow":
            i = "_blank"
        }
        let n = t('<a class="uri" target="' + i + '">').attr("href", e).text(e);
        return "iframe" === i && n.attr("onclick", "return App.aInIframe(this);"), n
      }
      return e
    },
    getPanelText: function (e, t, i) {
      return this.getCellText(e, t, i)
    },
    getCopyText: function (e, i) {
      let n = this.getPanelText(e.v, null, i);
      if ("string" == typeof n) return n;
      const a = function (e) {
        if (e && e.each && "[object Function]" === {}.toString.call(e.each)) {
          let i = "";
          return e.each((function () {
            "" !== i && (i += "; "), i += t(this).text().replace(/\n/g, "; ")
          })), i
        }
        return e
      };
      if (null === n) return "";
      if ("object" == typeof n && !(n instanceof jQuery)) {
        let e = t.Deferred();
        return n.done((function (t) {
          e.resolve(a(t))
        })).fail((function () {
          e.resolve("Не удалось загрузить данные")
        })), e
      }
      return a(n)
    },
    focusElement: function (e) {
      e.focus(), e.closest("tr").is(".InsertRow") && (this.pcTable._insertRow.find(".active").removeClass("active"), e.closest("td").addClass("active"))
    },
    isDataModified: function (e, t) {
      return "null" === (e += "") && (e = ""), "null" === (t += "") && (t = ""), t === (this.errorText || "ОШБК!") && (t = ""), "undefined" === t && (t = ""), e !== t
    },
    getFilterDataByValue: function (e) {
      let t = [];
      return this.addDataToFilter(t, e), Object.keys(t)
    },
    addDataToFilter: function (e, t) {
      let i, n = "Пустое";
      null === t.v || "" === t.v ? i = "".hashCode() : (i = t.v.toString().hashCode(), n = "string" == typeof t.v ? t.v.replace(/"/g, "&quot;") : t.v + " "), e[i] = n
    },
    checkIsFiltered: function (e, t) {
      let i = {};
      return this.addDataToFilter(i, e), t.some((function (e) {
        return e in i
      }))
    },
    getCellTextInPanel: function (e, t, i) {
      return this.getCellText(e, t, i)
    },
    getPanelColumnIndex: function (e) {
      return e.f && e.f.hide && e.f.hide.panel ? 0 : -1 !== ["text", "comments", "file", "listRow"].indexOf(this.type) || this.multiple ? 1.5 : 1
    },
    getHighCelltext: function (e, t, i) {
      return this.getPanelText ? this.getPanelText(e, t, i) : this.getCellText(e, t, i)
    }
  };
  r.text = {
    width: 50, icon: "fa-align-left", type: "Text", isPanelField: !0, getEditVal: function (e) {
      return e.data("val").trim()
    }, getCellText: function (e) {
      if (null === e) return "";
      let i = (e = e.toString()).length;
      return t("<div>").text(e.substring(0, this.viewTextMaxLength) + (i > this.viewTextMaxLength ? "..." : "")).text()
    }, getValue: function (e, i, n) {
      "use strict";
      if (n || "string" == typeof e && e.length < this.viewTextMaxLength && !this.notLoaded) {
        let i = t.Deferred();
        return setTimeout((function () {
          e || (e = ""), i.resolve({value: e})
        }), 20), i
      }
      let a = {fieldName: this.name};
      return i.id && (a.rowId = i.id), this.pcTable.model.getValue(a, this.table_id)
    }, getPanelTextWithLinks: function (e, i = !0) {
      let n;
      if ("text" === this.textType) n = t("<div>"), n.html(App.textWithLinks(e)); else if (n = t('<div class="codeEditor">'), e && e.trim()) {
        let t = {
          value: e,
          mode: this.getMode(),
          readOnly: !0,
          theme: "eclipse",
          lineNumbers: !0,
          lineWrapping: !0,
          bigOneDialog: !0,
          height: 200
        };
        i ? setTimeout((function () {
          CodeMirror(n.get(0), t)
        }), 10) : n.html(App.textWithLinks(e)), n.on("panel-resize", (function () {
          n.empty(), CodeMirror(n.get(0), t)
        }))
      }
      return n
    }, getHighCelltext: function (e, i, n) {
      return "string" != typeof e ? "" : t("<div>").text(e.trim())
    }, getPanelText: function (e, i, n) {
      if (null === e) return "";
      e = e.toString();
      let a = this;
      if (e.length <= this.viewTextMaxLength && !this.notLoaded) return a.getPanelTextWithLinks(e, !1).data("text", e);
      let l = t.Deferred();
      return this.getValue(e, n, !1).then((function (e) {
        l.resolve(t("<div>").append(a.getPanelTextWithLinks(e.value, !1)).data("text", e.value))
      })).fail((function () {
        l.reject()
      })), l.promise()
    }, getMode() {
      let e = "text";
      switch (this.textType) {
        case"html":
          e = "text/html";
          break;
        case"totum":
          e = "totum";
          break;
        case"markdown":
          e = "text/x-markdown";
          break;
        case"xml":
          e = "application/xml";
          break;
        case"css":
          e = "text/css";
          break;
        case"javascript":
          e = "text/javascript"
      }
      return e
    }, getEditElement: function (i, n, a, l, s, o, r, d) {
      let c, f = this, p = t("<div>"), h = t("<div>"), u = t('<div class="HTMLEditor">');
      n = n.v || "";
      let m = function () {
        f.getValue(n, a, !d).then((function (i) {
          let n;
          if (p.append(u), u.empty().appendTo(h), "json" === f.textType) {
            n = new JSONEditor(u.get(0), {});
            try {
              "" !== i.value && n.setText(i.value)
            } catch (t) {
              e.top.App.modal("Ошибка формата JSON ")
            }
            let a = t('<a href="#" style="padding-top: 5px; display: inline-block; padding-left: 20px;">Вручную</a>').on("click", (function () {
              let i = t("<div>"),
                a = t('<textarea class="form-control">').val(JSON.stringify(n.get(), null, 2)).appendTo(i);
              e.innerHeight > 460 && (a.css("height", 350), u.css("min-height", 200));
              let l = [{
                label: "Сохранить", cssClass: "btn-m btn-warning", action: function (t) {
                  try {
                    n.setText(a.val()), t.close()
                  } catch (t) {
                    e.top.App.modal("Ошибка формата JSON")
                  }
                }
              }, {
                label: null,
                icon: "fa fa-times",
                cssClass: "btn-m btn-default btn-empty-with-icon",
                action: function (e) {
                  e.close()
                }
              }];
              return f.pcTable.isMobile ? App.mobilePanel("Ручное изменение json-поля", i, {buttons: l}) : BootstrapDialog.show({
                message: i,
                type: null,
                title: "Ручное изменение json-поля",
                buttons: l,
                cssClass: "fieldparams-edit-panel",
                draggable: !0,
                onshown: function (t) {
                  t.$modalContent.position({of: e})
                },
                onshow: function (e) {
                  e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({width: 500})
                }
              }), !1
            }));
            u.find(".jsoneditor-menu").append(a)
          } else {
            let l = f.getMode(), s = t("<div>").appendTo(u), o = {
              value: (i.value || "").toString(),
              mode: l,
              minHeight: "150px",
              readOnly: !1,
              theme: "eclipse",
              lineNumbers: !0,
              indentWithTabs: !0,
              autoCloseTags: !0
            };
            "text" === l && (o.lineNumbers = !1, o.lineWrapping = !0), n = CodeMirror(s.get(0), o), n.on("paste", (function (e, t) {
              setTimeout((function () {
                n.refresh()
              }), 1)
            })), f.pcTable && "tables" === f.pcTable.tableRow.name && (n.table = a.name.v || a.name), e.innerHeight > 585 && (n.getScrollerElement().style.minHeight = "350px", h.css("min-height", 200)), n.focus()
          }
          u.data("editor", n), p.data("editor", n)
        }))
      };
      const b = function (e, t, i) {
        "json" === f.textType ? p.data("val", JSON.stringify(u.data("editor").get())) : p.data("val", u.data("editor").getValue()), i || (l(p, {}), e.close())
      };
      c = [];
      let g = {label: "Сохранить", cssClass: "btn-m btn-warning", action: b}, w = {
        label: null, icon: "fa fa-times", cssClass: "btn-m btn-default btn-empty-with-icon", action: function (e) {
          s(p, {}), e.close()
        }
      };
      -1 !== ["xml", "html"].indexOf(f.textType) && c.unshift({
        label: "Форматировать", action: function () {
          let e = u.data("editor"), t = e.lineCount(), i = e.getValue().length;
          e.autoFormatRange({line: 0, ch: 0}, {line: t, ch: i})
        }
      });
      let v = "Текст поля <b>" + this.title + ", " + f.textType + "</b>", _ = "ctrlS.textedit";
      if (d) {
        let e = !1;
        setTimeout((function () {
          let i = p.closest("td").find(".cdiv");
          i.length > 0 ? (i.data("bs.popover").options.content.find(".btn").each((function () {
            let i = t(this), n = {};
            n.label = i.data("name"), n.cssClass = i.attr("class").replace("btn-sm", "btn-m"), n.icon = i.find("i").attr("class"), n.save = i.data("save"), n.click = i.data("click"), n.action = function (t) {
              n.save && b(t, 0, !0), n.click({}), e = !0, t.close()
            }, c.push(n)
          })), i.popover("destroy")) : (c.push(g), c.push(w)), f.pcTable.isMobile ? App.mobilePanel(v, h, {
            buttons: c,
            onhide: function (i) {
              t("body").off(_), e || o(p, {})
            },
            onshown: function (e) {
              m()
            },
            onshow: function (e) {
              t("body").on(_, (function (t) {
                return b(e), !1
              }))
            }
          }) : BootstrapDialog.show({
            message: h,
            type: null,
            title: v,
            cssClass: "fieldparams-edit-panel",
            draggable: !0,
            buttons: c,
            onhide: function (i) {
              t("body").off(_), e || s(p, {})
            },
            onshown: function (e) {
              e.$modalContent.position({of: t("body"), my: "top+50px", at: "top"}), m()
            },
            onshow: function (e) {
              e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({width: "100%"}), t("body").on(_, (function (t) {
                return b(e), !1
              }))
            }
          })
        }), 1), p.text("Редактирование в форме").addClass("edit-in-form")
      } else {
        p.on("keydown click", (function (e) {
          if ("Tab" === e.key) return void o(h, e, null, !0);
          let i = c.splice();
          i.push(g), i.push(w);
          var n = t(this).closest("div");
          f.pcTable.isMobile ? App.mobilePanel(v, h, {
            buttons: i, onhide: function (e) {
              t("body").off(_), s(n, e)
            }, onshown: function (e) {
              m(), t("body").on(_, (function (t) {
                return b(e), !1
              }))
            }
          }) : BootstrapDialog.show({
            message: h,
            type: null,
            cssClass: "fieldparams-edit-panel",
            title: v,
            buttons: i,
            draggable: !0,
            onhide: function (e) {
              t("body").off(_), s(n, e)
            },
            onshown: function (e) {
              e.$modalHeader.css("cursor", "pointer"), m(), e.$modalContent.css({width: 900}), t("body").on(_, (function (t) {
                return b(e), !1
              }))
            }
          })
        }));
        let e = t('<button class="btn btn-default btn-sm text-edit-button">').text("Редактировать текст");
        r && e.attr("tabindex", r), p.append(e)
      }
      return p.data("val", n)
    }, getEditPanelText(e) {
      return this.getPanelTextWithLinks(e.v)
    }, getCellTextInPanel: function (e, t, i) {
      return this.getPanelTextWithLinks(e)
    }, addPlaceholder(e, t) {
      setTimeout((function () {
        e.data("editor").setOption("placeholder", t), e.data("editor").refresh()
      }), 100)
    }
  }, r.checkbox = {
    icon: "fa-check-square", getEditVal: function (e) {
      return !!e.is(":checked")
    }, getCellText: function (e) {
      return !0 === e ? "✓" : !1 === e ? "-" : ""
    }, getEditElement: function (e, i, n, a, l, s, o) {
      var r = t('<input type="checkbox" name="cell_edit"/>');
      o && r.attr("tabindex", o);
      let d = !1;
      r.on("keydown", (function (e) {
        switch (e.keyCode) {
          case 13:
          case 9:
            d = !0, setTimeout((function () {
              a(r, e)
            }), 20)
        }
      })), r.on("blur", (function (e) {
        d || setTimeout((function () {
          r.length && r.closest("body").length && l(r, e)
        }), 220)
      }));
      return !0 === i.v && r.prop("checked", !0), r.on("click", (function (e) {
        d = !0, a(r, e)
      })), r
    }
  }, r.string = {
    addPlaceholder: function (e, t) {
      e.attr("placeholder", t)
    }
  }, r.number = {
    icon: "fa-hashtag", getEditVal: function (e) {
      let t = e.val().trim();
      if (void 0 === t || "" === t || null === t) {
        if (this.required) throw"Поле " + this.title + " должно быть заполнено";
        return ""
      }
      if (this.regexp && !new RegExp(this.regexp).test(t)) {
        let e = this.regexpErrorText || 'regexp не проходит - "' + this.regexp + '"';
        throw e = 'Ошибка заполнения поля "' + (this.title || this.name) + '": ' + e, e
      }
      let i = t.replace(/[^\-()\d/*+.,%:\/]/g, "");
      if (!/^(\+|\*|\%|\/|\:)?(\-?[\d]+((\.|\,)[\d]+)?)%?$/.test(i)) throw"Здесь должно быть число";
      return t = t.replace(/,/, "."), t
    }, getCopyText: function (e, t, i) {
      return null == e || "" === e || null === e.v ? "" : e.v.toString().replace(/\./g, ",")
    }, numberFormat: function (e, t, i, n) {
      var a = isFinite(+e) ? +e : 0, l = isFinite(+t) ? Math.abs(t) : 0, s = void 0 === n ? " " : n,
        o = void 0 === i ? "," : i, r = (l ? function (e, t) {
          var i = Math.pow(10, t);
          return Math.round(e * i) / i
        }(a, l) : Math.round(a)).toString().split(".");
      return r[0].length > 3 && (r[0] = r[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, s)), (r[1] || "").length < l && (r[1] = r[1] || "", r[1] += new Array(l - r[1].length + 1).join("0")), r.join(o)
    }, getCellText: function (e, t, i) {
      if (null == e || "" === e) return "";
      if (this.currency) {
        let t, i, n;
        "dectimalSeparator" in this && (t = this.dectimalSeparator, t.match(/\*\*/) && (t = t.split("**")[e >= 0 ? 0 : 1])), "thousandthSeparator" in this && (i = this.thousandthSeparator, i.match(/\*\*/) && (i = i.split("**")[e >= 0 ? 0 : 1])), n = this.postfix, n = n && n.match(/\*\*/) ? n.split("**")[e >= 0 ? 0 : 1] : "";
        let a = this.prefix || "";
        a.match(/\*\*/) && (a = a.split("**")[e >= 0 ? 0 : 1], e = Math.abs(e));
        let l = this.dectimalPlaces || 0;
        return a + this.numberFormat(parseFloat(e), l, t, i) + n
      }
      return e
    }, addPlaceholder: function (e, t) {
      e.attr("placeholder", t)
    }
  }, r.date = {
    icon: "fa-calendar-o", getEditVal: function (e) {
      if (this.required && "" == e.val().trim()) throw"Поле должно быть заполнено";
      if (!e.val().trim()) return "";
      let t = e.data("calendar").data("DateTimePicker").date();
      return this.getDbString(t)
    }, getEditElement: function (e, i, n, a, l, s, o) {
      var r = t('<input type="text" name="cell_edit" class="form-control" autocomplete="off" autocorrect="off" />');
      o && r.attr("tabindex", o);
      var d = this;
      let c = this.getFormat();
      r.data("AppUin", App.getUn()), i = i.v, r.val(this.getViewString(i));
      let f, p = t("<div>");
      this.dateTime && /d/i.test(c) && (f = "date-popover");
      var h = t("<div></div>").appendTo(p);
      let u, m, b;
      h.on("dp.change", (function (e) {
        if (null !== e.oldDate || !d.dateTime || r.val() && "" !== r.val()) r.val(e.date.format(c)); else {
          let t = e.date, i = moment();
          t.format("HH:mm") === i.format("HH:mm") && (t = t.hours(0).minutes(0)), r.val(t.format(c)), g()
        }
      })), r.on("keydown", (function (e) {
        u && clearTimeout(u), 13 === e.keyCode || 9 === e.keyCode ? (g(), b && b.is(":visible") && b.hide(), a(t(this), e)) : 27 === e.keyCode && l(t(this), e)
      })), r.on("keyup", (function (e) {
        e.keyCode >= 48 && (u = setTimeout((function () {
          g()
        }), 2e3))
      }));
      const g = function () {
        "use strict";
        let e = r.val(), t = c;
        e ? (!c.match(/Y{4}/) && c.match(/Y{2}/) && e.length - moment().format(c).length == 2 && (t = t.replace("YY", "YYYY")), e = moment(e, t)) : e = "";
        try {
          h.data("DateTimePicker").date(e)
        } catch (e) {
        }
      };
      if (setTimeout((function () {
        let e = r.closest("td").find(".cdiv");
        if (e.length > 0) {
          let i = e.data("bs.popover");
          i && (p.append(i.options.content), e.popover("destroy")), b = t("#" + App.popNotify({
            $text: p,
            element: e,
            container: d.pcTable._container,
            isParams: !0,
            placement: "bottom",
            class: f
          })), r.on("focus click", (function () {
            b.show()
          }))
        } else {
          const e = function () {
            b && r.popover("destroy"), m = App.popNotify(p, r, null), b = t(r.get(0).ownerDocument.getElementById(m)), h.data("DateTimePicker").show(), b.show(), g()
          };
          r.on("focus mouskeydown", e)
        }
      }), 20), r.on("blur", (function (e) {
        setTimeout((function () {
          b && b.is(":visible") && (b.hide(), g(), s(r, e))
        }), 200)
      })), h.datetimepicker({
        inline: !0,
        format: c,
        useCurrent: !1,
        showClose: !1,
        locale: "ru",
        sideBySide: !0,
        collapse: !1
      }), i) try {
        h.data("DateTimePicker").date(d.getMoment(i))
      } catch (e) {
      } else r.val("");
      return r.data("calendar", h), r
    }, getCellText: function (e) {
      return e && null !== e ? this.getViewString(e) : ""
    }, getViewString: function (e) {
      return e ? this.dateTime ? App.dateTimeFormats.covertFromDb(e, this.getFormat()) : App.dateFormats.covertFromDb(e, this.getFormat()) : ""
    }, getDbString: function (e) {
      return e ? this.dateTime ? App.dateTimeFormats.covertToDb(e, this.getFormat()) : App.dateFormats.covertToDb(e, this.getFormat()) : ""
    }, getMoment: function (e) {
      return this.dateTime ? moment(e, App.dateTimeFormats.db) : moment(e, App.dateFormats.db)
    }, addDataToFilter: function (e, t) {
      let i, n = "Пустое";
      null === t.v || "" === t.v ? i = "".hashCode() : (i = t.v.toString().hashCode(), n = "string" == typeof t.v ? this.getCellText(t.v) : t.v), e[i] = n
    }, getFormat: function () {
      let e = this.dateFormat;
      e || (e = this.dateTime ? "d.m.y H:i" : "d.m.y");
      let t = {
        d: "DD",
        D: "ddd",
        j: "M",
        z: "DDD",
        W: "W",
        F: "MMMM",
        m: "MM",
        M: "MMM",
        n: "M",
        y: "YY",
        Y: "YYYY",
        H: "HH",
        i: "mm",
        s: "ss"
      }, i = "";
      for (let n = 0; n < e.length; n++) {
        let a = e[n];
        i += t[a] || a
      }
      return i
    }
  }, r.unic = {icon: "fa-fire"}, function () {
    const i = function (e, t) {
      e.attr("data-fileviewpreview", JSON.stringify({name: t.name, file: t.file}))
    };
    r.file = {
      icon: "fa-file-image-o", getSize: function (e) {
        return e > 102400 ? " " + (Math.round(e / 1048576 * 10) / 10).toLocaleString() + "Mb" : " " + Math.round(e / 1024).toLocaleString() + "Kb"
      }, getCellText: function (e) {
        if (!e || null === e || 0 == e.length) return "";
        let n = t('<span style=""></span>');
        const a = function (e) {
          let a;
          -1 !== ["png", "jpg"].indexOf(e.ext) ? (a = t('<img src="/fls/' + e.file + '_thumb.jpg" style="z-index: 200; max-height: 24px; padding-right: 4px;" class="file-image-preview" data-filename="' + e.file + '"/>'), i(a, e)) : a = "pdf" === e.ext ? '<img src="/imgs/file_ico_pdf.png" style="max-height: 24px;  padding-right: 4px;" class="file-pdf-preview" data-filename="/fls/' + e.file + '"/>' : '<img src="/imgs/file_ico.png" style="max-height: 24px;  padding-right: 4px;"/>';
          let l = t('<a href="/fls/' + e.file + '"  class="file-sell-text" download="' + t("<div>").text(e.name).html() + '" style="padding-right: 5px"></a>');
          n.append(a), l.append(e.name), n.append(l)
        };
        return e.length && e.forEach && e.forEach(a), n.children()
      }, getCopyText: function (t, i) {
        if (!(t = t.v) || null === t || 0 == t.length) return "";
        let n = this, a = "";
        return t.forEach((function (t) {
          "" !== a && (a += "\n"), a += t.name + " " + e.location.protocol + "//" + e.location.host + "/fls/" + t.file + " " + n.getSize(t.size)
        })), a
      }, getPanelText: function (n) {
        if (!n || null === n || 0 == n.length) return "";
        let a = t('<div class="file-mini-panel">'), l = this, s = "", o = Math.random();
        return n.forEach((function (n) {
          let r = "", d = "";
          -1 !== ["jpg", "png"].indexOf(n.ext) && (r = t('<img src="/fls/' + n.file + "_thumb.jpg?rand=" + o + '"/>'), d = "with-img", i(r, n)), t("<div>").addClass(d).appendTo(a).append(r).append(t('<br/><a href="/fls/' + n.file + '" download="' + t("<div>").text(n.name).html() + '">').text(n.name)).append(l.getSize(n.size)), "" !== s && (s += "\n"), s += e.location.protocol + "//" + e.location.host + "/fls/" + n.file
        })), a.data("text", s)
      }, getEditVal: function (e) {
        if (this.required && "" == e.data("val")) throw"Поле должно быть заполнено";
        return e.data("val")
      }, getEditElement: function (e, i, n, a, l, s, o, r) {
        let d, c, f = this, p = this.pcTable, h = t("<div>"), u = t("<div>").css("min-height", 200), m = i.v || [],
          b = !1;
        const g = function (e) {
          let i = t('<div class="filePart"><div><span class="name"></span><span class="size"></span><button class="btn btn-danger btn-xs remove"><i class="fa fa-remove"></i></button></div></div>'),
            a = {name: e.name, type: e.type, tmpfile: e.tmpfile, size: e.size, file: e.file, ext: e.ext};
          new RegExp("^" + f.pcTable.tableRow.id + "_" + (n.id ? n.id : ""));
          if (i.data("file", a), i.find(".name").text(e.name), i.find(".size").text(f.getSize(e.size)), e.file) {
            let n = t("<a>").attr("href", "/fls/" + e.file).attr("download", e.name);
            i.find(".name").wrap(n), -1 !== ["jpg", "png"].indexOf(e.ext) && (t("<img>").attr("src", "/fls/" + e.file + "_thumb.jpg?rand=" + Math.random()).insertBefore(i.find(".name")), i.addClass("with-img"))
          } else i.append('<div class="progressbar">&nbsp;</div>');
          if (e.tmpfile) {
            i.addClass("addFile"), i.find(".progressbar").text("Требуется сохранение элемента для привязки файла")
          }
          return i
        }, w = function (e) {
          c.$modalFooter.find("button:first").prop("disabled", e)
        }, v = function () {
          u.empty();
          let e = t('<input type="file" name = "file" ' + (f.multiple ? "multiple" : "") + ' accept="' + f.accept + '" style="display: block; position: absolute; top: -3000px"/>'),
            i = t("<div>").appendTo(u),
            n = t('<button class="btn btn-default btn-sm">Добавить файл' + (f.multiple ? "ы" : "") + "</button>");
          i.append(n), n.wrap('<div class="addFilesButton">'), n.wrap("<div>");
          let a = t('<div class="ttm-dropzone" id="ttmDropzone">Перетащите сюда файл</div>').insertAfter(n.parent());
          a.on("dragenter", () => a.addClass("highlight")), a.on("dragleave", () => a.removeClass("highlight")), a.on("drop", e => {
            if (e.preventDefault(), a.removeClass("highlight"), !a.is(".disabled")) {
              if (!this.multiple && e.originalEvent.dataTransfer.files.length > 1) return App.notify("Поле принимает только один файл", "Ошибка"), !1;
              s(e.originalEvent.dataTransfer.files)
            }
            return !1
          });
          const l = function () {
            f.multiple || (u.find(".filePart").length > 0 ? (n.prop("disabled", !0), a.addClass("disabled")) : (n.prop("disabled", !1), a.removeClass("disabled")))
          }, s = function (e) {
            if (e) {
              let i = [];
              w(!0);
              for (let n = 0, a = e.length; n < a; n++) {
                let a = e[n], s = g(a).addClass("addFile").appendTo(u);
                l();
                let o = s.find(".progressbar"), r = new XMLHttpRequest, d = t.Deferred();
                s.on("click", ".remove", (function () {
                  s.remove(), r.abort(), d.resolve(), l()
                })), r.upload.onprogress = function (e) {
                  o.css("box-shadow", "inset " + Math.round(parseInt(o.width()) * e.loaded / e.total).toString() + "px 0px 0 0 #85FF82"), e.loaded === e.total && o.text("Проверка файла сервером")
                }, r.onload = r.onerror = function (e) {
                  if (d.resolve(), 200 === this.status) try {
                    let e = JSON.parse(this.responseText);
                    if (e.fname) return o.text("Готово"), void (s.data("file").tmpfile = e.fname)
                  } catch (e) {
                  }
                  s.data("file", null), o.text("Ошибка").css({"box-shadow": "none", "background-color": "#ffe486"})
                }, r.open("POST", p.model.getUri(), !0);
                let c = new FormData;
                c.append("file", a), c.append("method", "tmpFileUpload"), c.append("ajax", !0), r.send(c), i.push(d.promise())
              }
              t.when(...i).then((function () {
                w(!1)
              }))
            }
          };
          m.forEach((function (e) {
            let t = g(e).appendTo(u);
            t.on("click", ".remove", (function () {
              t.remove(), l()
            }))
          })), l(), n.on("click", (function () {
            t("body").append(e), e.click(), e.on("change", (function () {
              s(this.files)
            }))
          }))
        }, _ = function (e) {
          let i = [];
          e.$modalContent.find(".filePart").each((function () {
            let e = t(this).data("file");
            e && i.push(e)
          })), h.data("val", i), m = i, b = !0, a(h, {}), e.close()
        };
        d = [{label: "Сохранить", cssClass: "btn-m btn-warning", action: _}, {
          label: null,
          icon: "fa fa-times",
          cssClass: "btn-m btn-default btn-empty-with-icon",
          action: function (e) {
            a(h, {}), e.close()
          }
        }];
        let y = "Форма файлов <b>" + this.title + "</b>", x = "ctrlS.textdialog", k = function (e) {
          c = f.pcTable.isMobile ? App.mobilePanel(y, u, {
            buttons: d, onhide: function (i) {
              t("body").off(x), b || l(e, i)
            }, onshown: function (e) {
              v(), t("body").on(x, (function (t) {
                _(e)
              }))
            }
          }) : BootstrapDialog.show({
            message: u,
            type: null,
            cssClass: "fieldparams-edit-panel",
            title: y,
            draggable: !0,
            buttons: d,
            onhide: function (i) {
              t("body").off(x), b || l(e, i)
            },
            onshown: function (e) {
              e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({width: 600}), v(), t("body").on(x, (function (t) {
                _(e)
              }))
            }
          })
        };
        if (r) k(h), h.text("Редактирование в форме").addClass("edit-in-form"); else {
          h.on("keydown", (function (e) {
            "Tab" !== e.key ? k(t(this).closest("div")) : s(c, e, null, !0)
          })), h.on("focus click keydown", "button", (function () {
            k(t(this).closest("div"))
          }));
          let e = t('<button class="btn btn-default btn-sm text-edit-button">').text("Редактировать поле");
          o && e.attr("tabindex", o), h.append(e)
        }
        return h.data("val", m)
      }, getEditPanelText: function (e) {
        return this.getCellTextInPanel(e.v).children()
      }, getCellTextInPanel: function (e) {
        let n = t('<div class="panel-preview"></div>');
        return e && e.length && e.forEach && e.forEach((function (e) {
          let a;
          -1 !== ["png", "jpg"].indexOf(e.ext) ? (a = t('<img src="/fls/' + e.file + '_thumb.jpg" />'), i(a, e)) : a = '<img src="/imgs/file_ico.png" />';
          let l = t('<div><a href="/fls/' + e.file + '" download="' + t("<div>").text(e.name).html() + '"></a></div>');
          l.prepend(a), l.find("a").append(e.name), n.append(l)
        })), n
      }, isDataModified: function (e, t) {
        return (-1 === [null, ""].indexOf(e) || -1 === [null, ""].indexOf(t)) && (-1 !== [null, ""].indexOf(e) || -1 !== [null, ""].indexOf(t) || !Object.equals(t, e))
      }
    }
  }(), r.n = t.extend({}, r.default, {
    name: "n",
    width: 52,
    title: "Порядок",
    category: "column",
    hidden: !0,
    showInWeb: !0,
    getCellText: function (e, i, n) {
      let a = n.f || {};
      return i.addClass("n"), !n.id || a.block || a.blockorder || n.__inserted ? "" : t('<span class="btns"><button class="btn btn-xxs btn-default"><i class="fa fa-angle-up"></i></button> <button class="btn btn-xxs btn-default"><i class="fa fa-angle-down"></i></button></span>')
    }
  }), r.listRow = t.extend({}, r.default, {
    icon: "fa-code", isPanelField: !0, getPanelTextAsTable: function (e) {
      if ("object" == typeof e && null !== e && e.settings && e.data && e.settings.columns && e.settings.columns.length) {
        const i = t('<table class="json-table">');
        let n = e.settings, a = n.columns;
        try {
          if (n.headRow) {
            const e = t("<tr>").appendTo(i);
            "boolean" == typeof n.headRow ? a.forEach((function (i) {
              t("<td>").text(i).appendTo(e).addClass("head")
            })) : a.forEach((function (i) {
              t("<td>").text(n.headRow[i]).appendTo(e).addClass("head")
            }))
          }
          return e.data.forEach((function (e) {
            const l = t("<tr>").appendTo(i);
            a.forEach((function (i) {
              let n = e[i];
              "string" == typeof n && "" !== n || (n = JSON.stringify(n));
              t("<td>").text(n).appendTo(l)
            })), n.headColumn && l.find("td:first").addClass("head")
          })), i
        } catch (e) {
          console.log(e)
        }
      }
    }, getPanelText: function (e, i, n) {
      let a = t.Deferred(), l = this;
      const s = function (e) {
        let i = l.getPanelTextAsTable.call(l, e);
        if (i) return i.copyText = JSON.stringify(e), void a.resolve(i);
        a.resolve(t("<div>").text(JSON.stringify(e, null, 2)))
      };
      return "string" != typeof e ? s(e) : this.getValue(e, n, !1).then((function (e) {
        s(e.value)
      })).fail((function () {
        a.reject()
      })), a.promise()
    }, getValue: function (e, i, n) {
      "use strict";
      let a = t.Deferred();
      if (n || "filter" === this.category || "object" == typeof e || !e) return a.resolve({value: e}), a;
      {
        let e = {fieldName: this.name};
        i.id && (e.rowId = i.id), this.pcTable.model.getValue(e, this.table_id).then((function (e) {
          a.resolve(e)
        }))
      }
      return a
    }, getEditElement: function (i, n, a, l, s, o, r, d) {
      let c, f = this, p = t("<div>"), h = t("<div>"), u = t('<div class="HTMLEditor">');
      n = n.v || "";
      let m = function () {
        f.getValue(n, a, !d).then((function (i) {
          let n;
          p.append(u), u.empty().appendTo(h), n = new JSONEditor(u.get(0), {});
          try {
            "" !== i.value && n.setText(JSON.stringify(i.value))
          } catch (t) {
            e.top.App.modal("Ошибка формата JSON ")
          }
          let a = t('<a href="#" style="padding-top: 5px; display: inline-block; padding-left: 20px;">Вручную</a>').on("click", (function () {
            let i = t("<div>"),
              a = t('<textarea class="form-control">').val(JSON.stringify(n.get(), null, 2)).appendTo(i);
            e.top.innerHeight > 460 && (h.css("min-height", 200), u.css("min-height", 200), a.height(350));
            let l = "Ручное изменение json-поля", s = [{
              label: "Сохранить", cssClass: "btn-m btn-warning", action: function (t) {
                try {
                  n.setText(a.val()), t.close()
                } catch (t) {
                  e.top.App.modal("Ошибка формата JSON")
                }
              }
            }, {
              label: null,
              icon: "fa fa-times",
              cssClass: "btn-m btn-default btn-empty-with-icon",
              action: function (e) {
                e.close()
              }
            }];
            return f.pcTable.isMobile ? App.mobilePanel(l, i, {buttons: s}) : e.top.BootstrapDialog.show({
              message: i,
              type: null,
              title: l,
              draggable: !0,
              cssClass: "fieldparams-edit-panel",
              buttons: s,
              onhide: function (e) {
              },
              onshown: function (t) {
                t.$modalContent.position({of: e.top})
              },
              onshow: function (e) {
                e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({width: 500})
              }
            }), !1
          }));
          u.find(".jsoneditor-menu").append(a), u.data("editor", n)
        }))
      };
      const b = function (e, t, i) {
        p.data("val", u.data("editor").get()), i || (l(p, {}), e.close())
      };
      c = [];
      let g = {label: "Сохранить", cssClass: "btn-m btn-warning", action: b}, w = {
        label: null, icon: "fa fa-times", cssClass: "btn-m btn-default btn-empty-with-icon", action: function (e) {
          s(p, {}), e.close()
        }
      }, v = "Текст поля <b>" + this.title + "</b>", _ = "ctrlS.textedit";
      if (d) {
        let i = !1;
        setTimeout((function () {
          let n = p.closest("td").find(".cdiv");
          n.length > 0 ? (n.data("bs.popover").options.content.find(".btn").each((function () {
            let e = t(this), n = {};
            n.label = e.data("name"), n.cssClass = e.attr("class").replace("btn-sm", "btn-m"), n.icon = e.find("i").attr("class"), n.save = e.data("save"), n.click = e.data("click"), n.action = function (e) {
              n.save && b(e, 0, !0), n.click({}), i = !0, e.close()
            }, c.push(n)
          })), n.popover("destroy")) : (c.push(g), c.push(w)), f.pcTable.isMobile ? App.mobilePanel(v, h, {
            buttons: c,
            onhide: function (e) {
              t("body").off(_), i || o(p, {})
            },
            onshown: function (e) {
              m()
            },
            onshow: function (e) {
              t("body").on(_, (function (t) {
                b(e)
              }))
            }
          }) : e.top.BootstrapDialog.show({
            message: h,
            type: null,
            title: v,
            cssClass: "fieldparams-edit-panel",
            draggable: !0,
            buttons: c,
            onhide: function (e) {
              t("body").off(_), i || o(p, {})
            },
            onshown: function (i) {
              i.$modalContent.position({of: t(e.top.document.body), my: "top+50px", at: "top"}), m()
            },
            onshow: function (e) {
              e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({
                width: 900,
                maxWidth: "99vw"
              }), t("body").on(_, (function (t) {
                b(e)
              }))
            }
          })
        }), 1), p.text("Редактирование в форме").addClass("edit-in-form")
      } else {
        p.on("focus click", "button", (function () {
          let i = c.splice();
          i.push(g), i.push(w);
          var n = t(this).closest("div");
          f.pcTable.isMobile ? App.mobilePanel(v, h, {
            buttons: i, onhide: function (e) {
              t("body").off(_), s(n, e)
            }, onshown: function (e) {
              m(), t("body").on(_, (function (t) {
                b(e)
              }))
            }
          }) : e.top.BootstrapDialog.show({
            message: h,
            type: null,
            cssClass: "fieldparams-edit-panel",
            title: v,
            draggable: !0,
            buttons: i,
            onhide: function (i) {
              t(e.top.document.body).off(_), s(n, i)
            },
            onshown: function (i) {
              i.$modalHeader.css("cursor", "pointer"), m(), i.$modalContent.css({
                width: 900,
                maxWidth: "99vw"
              }), t(e.top.document.body).on(_, (function (e) {
                b(i)
              }))
            }
          })
        }));
        let i = t('<button class="btn btn-default btn-sm text-edit-button">').text("Редактировать список/json");
        r && i.attr("tabindex", r), p.append(i)
      }
      return p.data("val", n)
    }, isDataModified: function (e, t) {
      return "" === e && (e = null), "" === t && (t = null), t !== e && !Object.equals(e, t)
    }, getEditVal: function (e) {
      return e.data("val")
    }, getCellText: function (e) {
      return "string" != typeof e ? JSON.stringify(e) : e
    }, getHighCelltext(e, t, i) {
      return this.getCellText(e)
    }, getEditPanelText(e) {
      return this.getCellText(e.v)
    }
  }), r.password = {
    icon: "fa-lock", getEditVal: function (e) {
      var t = e.val().trim(), i = !1;
      if (void 0 !== t && "" !== t && null !== t || (notify = "Поле " + this.title + " должно быть заполнено", i = !0), i) throw notify;
      return t
    }, getCellText: function (e) {
      return "**PASSWORD**"
    }, getEditElement: function (e, i, n, a, l, s, o) {
      var r = t('<input type="password" name="cell_edit" class="form-control"  autocomplete="new-password" autocorrect="off" placeholder="' + (i && i.v ? "Поменять пароль" : "Новый пароль") + '"/>');
      r.on("save-me", (function (e) {
        a(t(this), e)
      })), o && r.attr("tabindex", o);
      var d = this;
      i = i.v, r.on("keyup", (function (e) {
        switch (e.keyCode) {
          case 13:
            try {
              r.data("enterClicked", !0), a(t(this), e)
            } catch (e) {
              r.data("enterClicked", !1), App.popNotify(e, r, "default"), d.focusElement(r)
            }
            break;
          case 27:
            l(t(this), e)
        }
      }));
      return r.one("blur", (function (e) {
        setTimeout((function () {
          !function (e) {
            s(r, e)
          }(e)
        }), 50)
      })), r.select()
    }
  }, r.select = {
    icon: "fa-th-list", getEditVal: function (e) {
      if (e.data("input")) {
        var t = e.data("input").selectpicker("val");
        return null === t && this.multiple && (t = []), t
      }
    }, loadPreviewPanel(i, n, a, l) {
      let s = t.Deferred();
      return i.html('<div class="center"><i class="fa fa-spinner fa-spin"></i></div>'), this.pcTable.model.loadPreviewHtml(n, a, l).then((function (n) {
        if (i) {
          let a = t("<div>");
          n.previews.forEach((function (i) {
            let n = t('<div class="preview">');
            switch (i[2]) {
              case"file":
                e.imgRand = e.imgRand || Math.random(), Array.isArray(i[1]) && i[1].forEach((function (i) {
                  -1 !== ["jpg", "png"].indexOf(i.ext) && n.append(t('<a href="/fls/' + i.file + '" target="_blank">').html('<img src="/fls/' + i.file + "_thumb.jpg?rand=" + e.imgRand + '"/><br/>')), n.append(t('<a href="/fls/' + i.file + '" target="_blank">').text(i.name + " " + Math.round(i.size / 1024).toLocaleString("ru-RU") + " Kb"))
                }));
                break;
              case"html":
                n.text(i[0]);
                break;
              case"text":
                n.text(App.textWithLinks(i[1]));
                break;
              case"currency":
              case"number":
                if ("currency" === i[2]) try {
                  n.text(parseFloat(i[1]).toLocaleString("ru-RU"))
                } catch (e) {
                  n.text(i[1])
                } else n.text(i[1]);
                i[3].unitType && n.append(" " + i[3].unitType);
                break;
              case"url":
                n = t("<div>").append(t('<a target="_blank">').text(i[1]).attr("href", i[1]));
                break;
              default:
                n = t("<div>").text(i[1])
            }
            a.append(t('<div class="title">').text(i[0])), a.append(n)
          })), i.empty().append(a)
        }
        s.resolve()
      })).fail((function () {
        s.reject()
      })), s
    }, previewPanel: function (e, i) {
      let n = t('<div id="selectPanel" class="text preview" style="white-space: pre-wrap; height: 200px;">'), a = {};
      a = "column" === this.category ? e.data("id") ? this.pcTable._getItemById(e.data("id")) : this.pcTable._insertItem : this.pcTable.data_params, i.popover({
        html: !0,
        content: n,
        trigger: "manual",
        container: "body",
        placement: "auto right",
        animation: !1
      }).popover("show");
      let l = t("#" + i.attr("aria-describedby")).css("z-index", 1e4);
      const s = function () {
        i.attr("aria-describedby") && l.length && (i.off(".preview"), l.off(".preview"), l.remove())
      };
      i.on("mouseout.preview", (function () {
        setTimeout((function () {
          l && !l.is(":hover") && s()
        }), 300)
      })), l.on("mouseout.preview", (function () {
        l.is(":hover") || !i || i.is(":hover") || s()
      })), i.one("remove destroy", (function () {
        i.attr("aria-describedby") && i.popover("destroy")
      })), this.loadPreviewPanel(n, e.data("field"), a, e.data("val")).then((function () {
        const e = function () {
          i && !i.height() ? s() : setTimeout(e, 500)
        };
        e()
      }))
    }, getEditElement: function (i, n, a, l, s, o, r, d, c) {
      "use strict";
      n || (n = {}), n = t.extend(!0, {}, n);
      let f, p, h, u = this, m = n.v || null;
      if (u.multiple && "string" == typeof m) try {
        m = JSON.parse(m)
      } catch (e) {
        m = []
      }
      i && i.data("input") ? (p = i, f = p.data("input"), f.data("is-rendered", !0), h = f.data("LISTs")) : (p = t("<div>"), h = {
        isListForLoad: !0,
        innerList: [],
        innerIndexed: [],
        isSliced: !0,
        isPreview: !1
      }, u.list && (h = u.list));
      let b = [];
      p.on("remove", () => {
        b.forEach(e => {
          e.jqXHR && e.jqXHR.abort ? e.jqXHR.abort() : e.abort = !0
        })
      });
      let g = function (e) {
        let i = t.Deferred(), n = {};
        Object.keys(a).forEach((function (e) {
          /^\$/.test(e) || ("id" === e ? n[e] = a[e] : e === u.name ? n[e] = m : null !== a[e] && "object" == typeof a[e] && -1 !== Object.keys(a[e]).indexOf("v") ? n[e] = a[e].v : n[e] = a[e])
        })), p.isAttached() && p.append('<i class="fa fa-cog fa-spin fa-3x loading" style="position: absolute; z-index: 1    right: 1px;    top: 1px;    font-size: 8px;"/>');
        let l = {};
        return b.push(l), u.pcTable.model.getEditSelect(n, u.name, e, null, null, l).then((function (t) {
          p.find(".loading").remove(), h.innerList = t.list ? t.list : [], h.innerIndexed = t.indexed ? t.indexed : {}, h.isSliced = t.sliced, h.isPreview = t.previewdata, u.codeSelectIndividual || null !== e && "" !== e && void 0 !== e || h.isSliced || (u.list = h, h.isListForLoad = !1), i.resolve()
        }), (function () {
          i.reject()
        })), i.promise()
      };
      setTimeout((function () {
        p.length && p.isAttached() && p.find(".mark-loading").length && p.find(".mark-loading").html('<i class="fa fa-spinner"></i>')
      }), 200);
      let w = 0;
      const v = function () {
        a[u.name] && a[u.name].replaceViewValue && h.innerIndexed[a[u.name].v] && (a[u.name].replaceViewValue(h.innerIndexed[a[u.name].v]), delete a[u.name].replaceViewValue);
        let t = p.closest("body");
        if (t && t.length) {
          let n = t.get(0).ownerDocument == document ? e.$ : e.top.$;
          const d = function (e, t) {
            let i = {"Выбранное": n('<optgroup label="Выбранное">'), "": n('<optgroup label="">')}, l = i["Выбранное"];
            const s = function (e, t, i, l) {
              l = l ? n('<small class="text-muted">').text(l) : "";
              let s = n("<option>").attr("value", e), o = n("<div>").text(null === t || "" === t ? "[" + e + "]" : t);
              if (l && o.append(l), o = o.html(), i) s.attr("data-content", '<span class="text" style="text-decoration: line-through">' + o + "</span>"); else {
                let t = n('<span class="text" >' + o + "</span>");
                h.isPreview && (t.addClass("select-with-preview"), t.attr("data-id", a.id), t.attr("data-field", u.name), t.attr("data-val", e)), s.data("content", t.get(0).outerHTML)
              }
              return s
            };
            let o = function () {
              return !0
            };
            if (t && "" !== t) {
              let e = t.toLowerCase().replace("ё", "е").split(" ");
              o = function (t) {
                let i = null !== t ? t.toString().toLowerCase().replace("ё", "е") : "";
                return !e.some((function (e) {
                  return -1 === i.indexOf(e)
                }))
              }
            }
            let r, d = {};
            if (e || "filter" === u.category) {
              const t = function (e) {
                null === e && (e = "");
                let t, i = h.innerIndexed[e];
                return t = i ? s(e, i[0], !1, i[1]) : s(e, e, !0, null), l.append(t), d[e] = 1, !!i && (o(i[0]) || t.addClass("hidden"), !0)
              };
              u.multiple ? Array.isArray(e) ? (e.forEach(t), r = Object.keys(d)) : void 0 !== e && (t(e), r = [e]) : (t(e), r = e)
            }
            if ("onlyVals" !== t) {
              u.multiple || u.withEmptyVal && "" !== u.withEmptyVal.trim() && "filter" !== u.category && i[""].append(n("<option>").data("content", u.withEmptyVal).text(""));
              for (let e in h.innerList) {
                let t = h.innerList[e];
                if (1 === d[t]) continue;
                let a = h.innerIndexed[t];
                if (!h.isSliced && !o(a[0])) continue;
                let l = s(t, a[0]), r = a[1] ? a[1] : "";
                i[r] || (i[r] = n('<optgroup label="' + r + '">')), i[r].append(l)
              }
            }
            if (f.empty(), Object.keys(i).forEach((function (e) {
              f.append(i[e])
            })), !0 === h.isSliced) {
              let e = s(0, "Данные не полны. Воспользуйтесь поиском!");
              e.prop("disabled", !0), e.css("text-align", "center"), f.append(e)
            }
            return f.selectpicker("refresh"), f.selectpicker("val", r), r
          };
          if (!i || !i.data("input")) {
            let e = !1;
            const t = function () {
              let t = "-----";
              return "filter" === u.category ? (t = "Пустое", u.selectFilterWithEmptyText && (t = u.selectFilterWithEmptyText)) : u.withEmptyVal && "" !== u.withEmptyVal.trim() ? t = u.withEmptyVal : u.multiple && c && c.closest(".InsertPanel").length && (t = "Выберите", e = !0), t
            };
            f = n('<select class="form-control" ' + (1 == u.multiple ? "multiple " : "") + ' data-size="auto" style="display: none;" name="cell_insert" data-style="btn-sm btn-default" data-width="css-width" data-live-search="true" data-title="' + t() + '">').width(u.width), e && f.attr("data-selected-text-format", "static"), p.append(f), p.append('<div class="text-center mark-loading"></div>'), r && f.attr("tabindex", r), f.data("AppUin", App.getUn()), p.data("input", f), f.data("LISTs", h)
          }
          p.find(".mark-loading").remove();
          let b = 0 === f.closest(".modal-body").length ? u.pcTable._container : f.closest(".modal-body");
          if (f.data("container", b), d(m), !f.data("is-rendered")) {
            let t;
            f.data("selectpicker").$searchbox.off().on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", (function (e) {
              e.stopPropagation()
            }));
            let i = "";
            f.data("selectpicker").$searchbox.on("keyup", (function (e) {
              if ("Escape" === e.key) return f.data("selectpicker").$button.click(), !0;
              let a = n(this).val();
              i !== a && (i = a, t && clearTimeout(t), t = setTimeout((function () {
                h.isListForLoad || h.isSliced ? g.call(u, a).then((function () {
                  d.call(u, m, a)
                })) : d.call(u, m, a)
              }), 750))
            }));
            let a = n(u).closest("td, .cell");
            if (0 === f.closest(".InsertRow, .InsertPanel").length) {
              let e = f.data("container");
              f.on("remove", (function () {
                e.off("click.selectContainer." + f.data("AppUin")), e.off("keydown.selectContainer." + f.data("AppUin"))
              })), e.on("click.selectContainer." + f.data("AppUin"), (function (e) {
                let t = n(e.target);
                t.closest("td").is(".editing") || t.closest(".bootstrap-select").length || o(p, e)
              })), e.on("keydown.selectContainer." + f.data("AppUin"), (function (e) {
                if ("Tab" === e.key) return l(p, e), !1;
                if (27 === e.keyCode) return f.data("keyPressed", "Esc"), s(p, e), !1;
                if (13 === e.keyCode && f.data("enterPressed", !0), 9 !== e.keyCode && 16 !== e.keyCode && a.data("edited"), e.altKey || e.shiftKey) {
                  let t = e.altKey ? "altKey" : !!e.shiftKey && "shiftKey";
                  f.data("keyPressed", t)
                }
              })).on("keyup", (function (e) {
                f.removeData("keyPressed"), f.removeData("enterPressed")
              })), setTimeout((function () {
                if (f.data("selectpicker").$bsContainer.offset().top > p.find("button").offset().top) {
                  let e = f.closest("td").find(".cdiv").data("bs.popover");
                  e.applyPlacement(e.getCalculatedOffset("top", e.getPosition(), e.$tip.width() + 8, e.$tip.height() + 33), "top"), e.$tip.removeClass("bottom").addClass("top")
                }
              }), 10)
            } else if (1 === f.closest(".InsertRow").length) {
              f.data("container").on("keydown.selectContainer." + f.data("AppUin"), (function (e) {
                if ("Tab" === e.key) return (f.data("selectpicker").$newElement.get(0).contains(e.originalEvent.target) || f.data("selectpicker").$menu.get(0).contains(e.originalEvent.target)) && (f.data("selectpicker").$menu.is(".open") && f.selectpicker("toggle"), l(p, e)), !1
              })), f.data("selectpicker").$newElement.on("keydown", e => {
                "Tab" === e.code && (l(p, event), e.stopPropagation())
              })
            }
            f.on("hidden.bs.select", (function () {
              let e = f.data("changed"), t = {}, i = f.data("keyPressed");
              i && (t[i] = !0), u.multiple ? e && 0 === f.closest("td.edt").length && l(p, t) : setTimeout((function () {
                l(p, t)
              }), 200), f.data("changed", !1)
            })), f.on("show.bs.select", (function () {
              d(m)
            })), f.on("shown.bs.select", (function () {
              let t = f.data("selectpicker");
              t.$bsContainer.addClass("pcTable-selectpicker"), h.isPreview && t.$bsContainer.addClass("select-with-preview"), t.$menuInner.height() < 100 && t.$menuInner.find("li").length > 6 && t.$menuInner.height(300);
              let i = t.$menu.get(0).getBoundingClientRect();
              if (i.right > e.innerWidth - 20) {
                let n = i.right - e.innerWidth + 20, a = t.$menuInner.width();
                t.$menuInner.width(a - n).css("overflow-x", "scroll")
              } else t.$menuInner.width("auto");
              t.cropped || (t.cropped = !0, f.data("container").is(".pcTable-container") && t.$menuInner.height(t.$menuInner.height() - 4))
            })), f.on("changed.bs.select", (function () {
              f.data("changed", !0);
              let e = [];
              if (m && m.forEach && m.forEach((function (t) {
                e.push(t)
              })), m = f.val(), "filter" === u.category && u.multiple) {
                let t = m.length;
                if (e.length > m.length) 0 === m.length && m.push("*NONE*"); else {
                  let t;
                  m.some((function (i) {
                    if (-1 === e.indexOf(i)) return t = i, !0
                  })), -1 !== ["*NONE*", "*ALL*"].indexOf(t) ? m = [t] : ["*NONE*", "*ALL*"].some((function (e) {
                    let t;
                    if (-1 !== (t = m.indexOf(e))) return m.splice(t, 1), !0
                  }))
                }
                m.length !== t && f.selectpicker("val", m)
              }
            })), f.on("remove", (function () {
              f.data("selectpicker").$bsContainer.remove(), f.data("container").off("keydown.selectContainer." + f.data("AppUin")).off("click.selectContainer." + f.data("AppUin"))
            })), 0 === f.closest(".InsertRow, .InsertPanel").length && p.find("button").click()
          }
        } else w < 50 && (setTimeout((function () {
          v(f, m)
        }), 10 * w + 1), w++)
      };
      return !h || h.isListForLoad ? g().then((function () {
        v.call(u)
      })) : v(), p
    }, getEditPanelText: function (e, t) {
      if (this.multiple) return this.getPanelText(e.v, null, t)
    }, getPanelText: function (e, i, n) {
      let a = this, l = t("<div>"), s = n[a.name].v_;
      if (!a.multiple && n[a.name].v_ && (s = [n[a.name].v_]), s) t.each(s, (function (e, i) {
        "use strict";
        let n = t("<div>").text(i[0] + (a.multiple && a.unitType ? " " + a.unitType : ""));
        i[1] ? n.addClass("deleted_value") : 1 !== s.length && n.add("select-item"), l.append(n)
      })); else {
        if (null === e || "" === e) return a.withEmptyVal ? a.withEmptyVal : "";
        let i = e;
        if (a.multiple || (i = [i]), i || (i = []), a.list) {
          let e = [];
          for (let t = 0; t < i.length; t++) e[t] = i[t].toString();
          for (let i = 0; i < a.list.length; i++) {
            let n = a.list[i];
            if (-1 !== e.indexOf(n[2].toString())) {
              let i = t("<span>").text(n[0]);
              n[1] ? i.addClass("deleted_value") : 1 !== e.length && i.add("select-item"), l.append(i)
            }
          }
        }
      }
      return l.children()
    }, getCellText: function (e, i, n) {
      let a = this, l = t("<div>"), s = n[a.name].v_;
      if (!a.multiple && n[a.name].v_ && (s = [n[a.name].v_]), s) a.multiple && s.length > 1 && 0 == a.multySelectView ? l.append('<span class="select-item">' + s.length + " элементов<span>") : 0 === s.length ? l.append('<span class="select-item">' + this.getElementString(null) + "</span>") : t.each(s, (function (i, n) {
        "use strict";
        let o = t("<span>"), r = null;
        e && (r = "object" == typeof e ? e[i] : e), o.text(a.getElementString(r, n)), n[1] ? o.addClass("deleted_value") : 1 !== s.length && o.add("select-item"), l.append(o)
      })); else {
        if (null === e || "" === e) return a.withEmptyVal ? a.withEmptyVal : "";
        let i = e;
        if (a.multiple || (i = [i]), i || (i = []), a.list) {
          let e = [];
          for (let t = 0; t < i.length; t++) e[t] = i[t].toString();
          for (let i = 0; i < a.list.length; i++) {
            let n = a.list[i];
            if (-1 !== e.indexOf(n[2].toString())) {
              let i = t("<span>").text(a.getElementString(n[2], n));
              n[1] ? i.addClass("deleted_value") : 1 !== e.length && i.add("select-item"), l.append(i)
            }
          }
        }
      }
      return l.children()
    }, focusElement: function (e) {
      let t = e.find("button"), i = this;
      0 == t.length ? setTimeout((function () {
        i.focusElement(e)
      }), 50) : t.focus(), e.closest("tr").is(".InsertRow") && (this.pcTable._insertRow.find(".active").removeClass("active"), e.closest("td").addClass("active"))
    }, isDataModified: function (e, t) {
      return (-1 === [null, ""].indexOf(e) || -1 === [null, ""].indexOf(t)) && (-1 !== [null, ""].indexOf(e) || -1 !== [null, ""].indexOf(t) || !Object.equals(t, e))
    }, checkEditRegExp: function (e) {
      if (!this.warningEditRegExp) return !0;
      try {
        return this.multiple && Array.isArray(e) ? e.some(t => new RegExp(this.warningEditRegExp).test(e)) : new RegExp(this.warningEditRegExp).test(e)
      } catch (e) {
        return !0
      }
    }, addDataToFilter: function (e, t) {
      const i = function (t) {
        let i, n = t[0], a = "Пустое";
        null === n || "" === n ? i = "".hashCode() : (i = n.toString().hashCode(), a = n.replace(/"/g, "&quot;")), e[i] = a
      };
      this.multiple ? t && t.v_.length ? t.v_.forEach((function (e) {
        i(e)
      })) : i({0: ""}) : i(t.v_)
    }, getElementString: function (e, t) {
      "use strict";
      let i;
      return null == e && (t && t[0] || (i = this.withEmptyVal || "")), void 0 !== i || null !== t[0] && "" !== t[0] || (i = "[" + (this.withEmptyVal || "") + "]"), void 0 === i && (i = t[0]), this.multiple && this.unitType && (i += " " + this.unitType), i
    }, sourceButtonClick: function (i, n) {
      let a = t.Deferred(), l = {}, s = this, o = this.pcTable;
      t.each(i, (function (e, t) {
        "$" !== e.substring(0, 1) && (l[e] = t)
      })), n && (l[s.name] = null);
      let r, d = 0;
      return t(e.top.document.body).on("pctable-opened.select-" + s.name, (function () {
        d++
      })).on("pctable-closed.select-" + s.name, (function (e, i) {
        d--, i && i.json && (r = i);
        let n = i && "insert" === i.method && i.json && i.json.chdata && i.json.chdata.rows;
        setTimeout((function () {
          (0 === d || n) && (t("body").off(".select-" + s.name), a.resolve(r))
        }), 100)
      })), o.model.selectSourceTableAction(s.name, l), a
    }
  }, function () {
    t.jstree;
    r.tree = {
      icon: "fa-tree", FullView: !1, getEditVal: function (e) {
        return e.data("val")
      }, getEditElement: function (e, i, n, a, l, s, o, r) {

        let d, c, f = this, p = e || t("<div>"), h = p.data("dialog") || t("<div>").css("min-height", 200);
        p.data("dialog", h), i = i.v || "";
        const u = function (e, t, i) {
          let n = [];

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Start patching
          const $jstree = h.data("jstree");
          const dat = $jstree.jstree(true);
          $jstree.jstree("get_selected", !0).forEach((function (e) {
            if (f.multiple) {
              let node = dat.get_node(e.id, true);
              if (node[0]) {
                for (let i = parseInt(node.find(".tree-number-input").val()) || 0; i > 0; i--) {
                  n.push(e.id)
                }
              }
            } else {
              n.push(e.id)
            }

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

          })), f.multiple || (n = n[0] || ""), p.data("val", n), i || (a(p, {}), e.close())
        };
        let m = function (e) {
          f.treePanel.call(f, h, n, i)
        };
        d = [];
        let b = {label: "Сохранить", cssClass: "btn-m btn-warning", action: u}, g = {
          label: null,
          icon: "fa fa-times",
          cssClass: "btn-m btn-default btn-empty-with-icon",
          action: function (e) {
            l(p, {}), e.close()
          }
        }, w = "<b>" + this.title + "</b>", v = "ctrlS.commentdialog";
        const _ = function (e) {
          f.pcTable.isMobile || (e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({width: .8 * t("body").width() > 800 ? 800 : .8 * t("body").width()})), 0 === e.$modalBody.find("textarea").length && m(), t("body").on(v, (function (t) {
            u(e, 0, !1)
          }))
        };
        if (r) {
          let e = !1;
          setTimeout((function () {
            let i = p.closest("td").find(".cdiv");
            i.length > 0 ? (i.data("bs.popover").options.content.find(".btn").each((function () {
              c = t(this);
              let i = {};
              i.label = c.data("name"), i.cssClass = c.attr("class").replace("btn-sm", "btn-m"), i.icon = c.find("i").attr("class"), i.save = c.data("save"), i.click = c.data("click"), i.action = function (t) {
                i.save && u(t, 0, !0), i.click({}), e = !0, t.close()
              }, d.push(i)
            })), i.popover("destroy")) : (d.push(b), d.push(g)), f.pcTable.isMobile ? App.mobilePanel(w, h, {
              buttons: d,
              onhide: function (i) {
                t("body").off(v), e || s(p, {})
              },
              onshow: _
            }) : BootstrapDialog.show({
              message: h,
              type: null,
              title: w,
              cssClass: "fieldparams-edit-panel",
              draggable: !0,
              buttons: d,
              onhide: function (i) {
                t("body").off(v), e || s(p, {})
              },
              onshown: function (e) {
                e.$modalContent.position({of: t("body"), my: "top+50px", at: "top"})
              },
              onshow: _
            })
          }), 1), p.text("Редактирование в форме").addClass("edit-in-form")
        } else {
          let e = !1;
          p.off().on("click keydown", (function (i) {
            if (e) return !1;
            if ("Tab" === i.key) return void s(h, i, null, !0);
            e = !0;
            let n = d.slice(0);
            n.push(b), n.push(g);
            var a = t(this).closest("div");
            f.pcTable.isMobile ? App.mobilePanel(w, h, {
              buttons: n, onhide: function (i) {
                e = !1, t("body").off(v), l(a, i)
              }, onshow: _
            }) : BootstrapDialog.show({
              message: h,
              type: null,
              cssClass: "fieldparams-edit-panel",
              title: w,
              draggable: !0,
              size: BootstrapDialog.SIZE_WIDE,
              buttons: n,
              onhide: function (i) {
                e = !1, t("body").off(v), l(a, i)
              },
              onshow: _
            })
          })), 0 === p.find("button").length && (c = t('<button class="btn btn-default btn-sm text-edit-button">').text("Редактирование в форме"), o && c.attr("tabindex", o), p.append(c))
        }
        console.log('data', p, i)
        return p.data("val", i).attr('data-category', '1')
      }, treePanel: function (e, i) {

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Start patching
      $.jstree.defaults.numberinput = {};
      $.jstree.plugins.numberinput = function (options, parent) {
        this.redraw_node = function(obj, deep, callback, force_draw) {
          obj = parent.redraw_node.call(this, obj, deep, callback, force_draw);
          let i, j, tmp = null, node = this.get_node(obj);
          if (obj) {
            for(i = 0, j = obj.childNodes.length; i < j; i++) {
              if(obj.childNodes[i] && obj.childNodes[i].className && obj.childNodes[i].className.indexOf("jstree-anchor") !== -1) {
                tmp = obj.childNodes[i];
                break;
              }
            }
            if(tmp) {
              if (!node.state.disabled/* && node.state.selected*/) {
                let input = $('<input/>', {"class": "tree-number-input"});
                $(tmp).after(input);
                input.wrap("<div class='tree-number-input-wrapper'></div>");
                input.val(a.parts.v.filter(z => z == node.id).length || 1).TouchSpin({
                  buttondown_class: 'btn btn-xs btn-default',
                  buttonup_class: 'btn btn-xs btn-default',
                  min: 1,
                  max: 10000
                });
                // input.on('touchspin.on.stopspin', function() {
                //   console.log($(this).val())
                // })
                // input.parent().data(input);
                // tmp.insertBefore(, tmp.childNodes[tmp.childNodes.length - 1]);
              }
            }
          }
          return obj;
        };
      };


        let n = this, a = t.extend(!0, {}, i), l = ["themes", "json_data", "search"];

        n.multiple && l.push("checkbox") && l.push("numberinput");
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

        let s = t('<div class="tree-search"><input class="form-control" type="text"></div>'), o = s.find("input");
        setTimeout(() => {
          o.focus()
        }, 200);
        let r = t("<div></div>"), d = 0, c = !1, f = "";
        o.keyup((function () {
          c && clearTimeout(c), c = setTimeout((function () {
            if (r.closest("body").length) {
              let e = o.val();
              f !== e && (f = e, r.jstree(!0).search(e, 0 === d))
            }
          }), 750)
        })), e.html(s).append(r), e.data("jstree", r), !this.multiple && this.withEmptyVal && r.on("click", 'li.jstree-node[aria-selected="true"]', (function (e) {
          return r.jstree(!0).deselect_node(t(this)), !1
        }));
        let p = null;
        r.on("init.jstree", (function (e, i) {
          if (i.instance.settings.checkbox.cascade = "", n.changeSelectTable || n.multiple) {
            let e = r.jstree(!0).redraw_node, i = r.jstree(!0);
            const l = (e, t) => {
              let n = i.get_node(e);
              t > 0 ? (i.select_node(n), 2 === t && (!1 === n.state.loaded ? i.load_node(n, e => {
                e.children.forEach(e => {
                  l(e, t)
                })
              }) : n.children.forEach(e => {
                l(e, t)
              }))) : (i.deselect_node(n), !1 === n.state.loaded ? i.load_node(n, e => {
                e.children.forEach(e => {
                  l(e, t)
                })
              }) : n.children.forEach(e => {
                l(e, t)
              }))
            };
            r.jstree(!0).redraw_node = function (i, s, o, d) {
              let c, f = e.apply(this, arguments), h = this.get_node(i), u = n.changeSelectTable,
                m = 2 === n.changeSelectTable && n.parentName;
              n.treeAutoTree || (h.original.id.toString().match(/^\d+$/) ? m = !1 : u = !1);
              const b = function () {
                r.jstree(!0).refresh(!1, !0)
              };
              let g = t(f).find(">a i:first");
              if (n.multiple && (!1 === h.state.loaded || h.children && h.children.length) && (c = t('<i class="fa fa-hand-lizard-o jstree-children-manage-lizard"></i>'), g.after(c), g = c.on("click", () => (h.state.cascadeStep = h.state.cascadeStep > 1 ? 0 : (h.state.cascadeStep || 0) + 1, !1 === h.state.loaded ? this.load_node(h, e => {
                e.children.forEach(t => {
                  l(t, e.state.cascadeStep)
                })
              }) : h.children.forEach(e => {
                l(e, h.state.cascadeStep)
              }), !1))), u && (c = t('<i class="fa fa-edit edit-tree-icon"></i>'), g.after(c), c.on("click", () => (new EditPanel(n.selectTable, null, {id: h.id}).then(() => {
                p = {}, Object.values(r.jstree(!0)._model.data).forEach(e => {
                  p[e.id] = !!e.state.opened
                }), b()
              }), !1)), g = c), m) {
                let e = t('<i class="fa fa-plus edit-tree-icon"></i>');
                g.after(e), e.on("click", () => (new EditPanel(n.selectTable, null, {[n.parentName]: {v: h.id.replace("PP/", "")}}).then(e => {
                  if (p = {}, Object.values(r.jstree(!0)._model.data).forEach(e => {
                    p[e.id] = !!e.state.opened
                  }), p[h.id] = !0, e.chdata.rows && Object.keys(e.chdata.rows).length) {
                    let t = Object.keys(e.chdata.rows)[0];
                    n.multiply ? a[n.name].v.push(t) : a[n.name].v = t
                  }
                  b()
                }), !1))
              }
              return f
            }
          }
        })).jstree({
          search: {
            show_only_matches: !0,
            case_insensitive: !0,
            show_only_matches_children: !0,
            search_callback: function (e, t) {
              if (!t) return !1;
              let i = e.toLowerCase().replace("ё", "е").split(" "), n = t.text.toLowerCase().replace("ё", "е");
              return !i.some((function (e) {
                return -1 === n.indexOf(e)
              }))
            },
            ajax: function (e, t) {
              var i = this;
              n.getEditSelect(a, e, null).then((function (e) {
                t.call(i, e[0])
              }))
            }
          }, massload: function (e, t) {
            var i = this;
            d -= 1, n.getEditSelect(a, "", e).then((function (e) {
              Object.values(e[0]).forEach((function (e) {
                e.forEach((function (e) {
                  !0 === e.children && (d += 1)
                }))
              })), t.call(i, e[0])
            }))
          }, core: {
            check_callback: !0, open_parents: !0, data: function (e, t) {
              var i = this;
              d -= 1, n.getEditSelect(a, "", "#" == e.id ? null : e.id).then((function (e) {
                e[0].forEach((function (e) {
                  p && p[e.id] && (e.state = {opened: !0,
                    ...e.state || {}}, !0 === e.children && (d += 1))
                })), t.call(i, e[0])
              }));
            }, themes: {icons: !1, name: "default"}
          }, plugins: l
        }), n.multiple && "filter" === n.category && r.on("select_node.jstree", (function (e, t) {
          -1 !== ["*ALL*", "*NONE*"].indexOf(t.node.id) ? t.selected.length > 1 && t.selected.forEach((function (e) {
            e !== t.node.id && t.instance.deselect_node(r.jstree(!0).get_node(e))
          })) : ["*ALL*", "*NONE*"].forEach((function (e) {
            -1 !== t.selected.indexOf(e) && t.instance.deselect_node(r.jstree(!0).get_node(e))
          }))
        }))
      }, getEditPanelText(e, t) {
        return this.getCellText(e.v, null, t)
      }, getEditSelect: function (e, i, n) {
        let a = this, l = t.Deferred(), s = {};
        return Object.keys(e).forEach((function (t) {
          /^\$/.test(t) || ("id" === t || null === e[t] || "object" != typeof e[t] || -1 === Object.keys(e[t]).indexOf("v") ? s[t] = e[t] : s[t] = e[t].v)
        })), this.pcTable.model.getEditSelect(s, this.name, i, n, !0).then((function (e) {
          let t = [e.list, e.indexed];
          a.codeSelectIndividual || (a.list = t), a.parentName = e.parent, l.resolve(t)
        })), l
      }, getPanelText: function (e, t, i) {
        this.FullView = !0;
        let n = this.getCellText(e, t, i);
        return delete this.FullView, n
      }, getCellText: function (e, i, n) {
        let a = this;
        if ("tree" === a.name && n.__tree && ("self" === a.treeViewType || n.tree_category && n.tree_category.v)) {
          let e = n.__tree, i = n.tree.f || {}, a = i.icon || (e.opened ? "folder-open" : "folder"),
            l = t('<i class="fa fa-' + a + '"></i>').data("treeRow", e.v),
            s = t('<span class="tree-view">').css("padding-left", 22 * e.level).append(l);
          return !1 !== i.expand ? (l.addClass("treeRow"), s.append(t('<button class="btn btn-default btn-xxs treeRow dbl"><i class="fa fa-arrows-v"></i></button>').data("treeRow", e.v))) : l.css("margin-right", 8), "self" === this.treeViewType && this.pcTable.isInsertable() && s.append(t('<button class="btn btn-default btn-xxs treeRow ins"><i class="fa fa-plus"></i></button>')), s.append(i.text || e.t), s
        }
        {
          let i = n[a.name].v_;
          if (e) {
            if (a.multiple) {
              if (Array.isArray(e)) {
                if (0 === e.length) return a.getElementSpan(null);
                if (1 === e.length) return a.getElementSpan(e[0], i[0]);
                if ("0" !== a.multySelectView || a.FullView) {
                  let n = t('<span class="select-item">');
                  return e.forEach((e, t) => n.append(a.getElementSpan(e, i[t]))), n
                }
                return t('<span class="select-item">' + e.length + " эл.<span>")
              }
              return a.getElementSpan(e, [e, 0])
            }
            return a.getElementSpan(e, i)
          }
          return a.getElementString(null)
        }
      }, checkIsFiltered: function (e, t) {
        let i, n;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Start patching
         this.multiple ? (i = [], e && e.v_ && e.v_.length && e.v_.forEach((function (e) {
          i.push(e[0].hashCode().toString())
        })), n = function (e) {
          if (-1 !== i.indexOf(e)) return !0
        }) : (i = null === e.v_[0] ? "null" : e.v_[0].toString(), i = i.hashCode().toString(), n = function (e) {
          if (e === i) return !0
        });
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

        return t.some(n)
      }, addDataToFilter: function (e, t) {
        const i = function (t) {
          let i;
          i = null === t[0] ? "null".hashCode() : t[0].toString().hashCode(), e[i] = t[0].replace(/"/g, "&quot;")
        };
        this.multiple ? t && t.v_.length && t.v_.forEach((function (e) {
          i(e)
        })) : i(t.v_)
      }, getElementSpan: function (e, i) {
        let n = t("<span>");
        return null !== e && (n.text(this.getElementString(e, i)), 1 === i[1] && n.addClass("deleted_value")), n
      }, getElementString: function (e, t) {
        "use strict";
        return null != e || t && t[0] ? null === t[0] || "" === t[0] ? "[" + (this.withEmptyVal || "") + "]" : this.FullView && t[2] || t[0] : this.withEmptyVal || ""
      }
    }
  }(), r.json = {
    __addInput: function (e, i, n) {
      var a = (i = i || {}).type || typeof n[e], l = 12;
      "checkbox" == a && (l = 3), i.width && (l = i.width);
      var s, o = t('<div class="field form-group">').attr("data-name", e).addClass("col-sm-" + l);
      switch (a) {
        case"string":
          s = t("<input>").val(n[e] ? n[e] : i.default ? i.default : "");
          break;
        case"json":
          s = t('<div class="JSONEditor">').height(300);
          var r = new JSONEditor(s.get(0), {}), d = t('<a href="#">editText</a>').on("click", (function () {
            var e = t("<div>"),
              i = t('<textarea class="form-control" style="height: 250px;">').val(JSON.stringify(r.get(), null, 2)).appendTo(e);
            return e.dialog({
              title: "Содержимое JSON-поля",
              width: 500,
              height: 600,
              buttons: {
                "Сохранить": function () {
                  r.setText(i.val()), e.dialog("close")
                }, "Закрыть": function () {
                  e.dialog("close")
                }
              }
            }), !1
          }));
          s.find(".jsoneditor-menu").append(d), s.data("editor", r), r.set(n[e] ? n[e] : i.default ? JSON.parse(i.default) : {});
          break;
        case"html":
          s = t('<div class="HTMLEditor">').height(300);
          var c = t("<div>").appendTo(s);
          r = CodeMirror(c.get(0), {
            value: n[e] ? n[e] : i.default ? i.default : "",
            mode: "text/html",
            height: "250px",
            readOnly: !1,
            theme: "eclipse",
            lineNumbers: !0,
            gutter: !0,
            indentWithTabs: !0,
            autoCloseTags: !0
          });
          setTimeout((function () {
            r.refresh()
          }), 20), s.data("editor", r);
          break;
        case"integer":
          s = t("<input>").val(n[e] ? n[e] : i.default ? i.default : "").attr("type", "number"), void 0 !== i.min && s.attr("min", i.min), void 0 !== i.max && s.attr("max", i.max), void 0 !== i.step && s.attr("step", i.step);
          break;
        case"checkbox":
          s = t("<input>").attr("type", "checkbox"), (n[e] || void 0 === n[e]) && s.prop("checked", !0);
          break;
        case"select":
          s = t("<select>"), i.values && t.each(i.values, (function (e, i) {
            s.append(t("<option>").attr("value", e).text(i))
          })), n[e] ? s.val(n[e]) : void 0 === n[e] && i.default && s.val(i.default)
      }
      "checkbox" == a ? (o.prepend(t("<label>").text(i.title ? i.title : e).addClass("form-check-label")), s && (s.data("type", a), o.find("label").prepend(s))) : (o.prepend(t("<label>").text(i.title ? i.title : e)), s && s.data("type", a).addClass("form-control"), o.append(s)), o.data("type", a);
      var f = t(" <span>*</span>");
      return i.required ? f.addClass("text-danger") : (f.text(""), f.addClass("glyphicon glyphicon-remove remove"), f.on("click", (function () {
        var e = t(this).closest(".field");
        e.data("name");
        e.remove()
      }))), o.find("label").after(f), o
    }, getEditElement: function (e, i, n, a, l, s) {
      var o, r = this, d = t("<div>"), c = t("<div>").css("min-height", 200),
        f = t('<div class="jsonForm row">').appendTo(c);
      d.data("form", f), d.data("field", this);
      var p = this.jsonFields, h = i || {};
      "string" == typeof h && (h = JSON.parse(h));
      var u = function (e) {
        var t = r.__addInput(e, p[e], h);
        f.append(t)
      }, m = t.extend({}, h), b = 0, g = {"": []};
      if (t.each(p, (function (e, t) {
        if (1 == t.required || 1 == t.showInForm) u(e), void 0 !== m[e] && delete m[e]; else if (void 0 === m[e]) {
          var i = "";
          t.fGroup && (i = t.fGroup, g[t.fGroup] || (g[t.fGroup] = [])), g[i].push(e), b++
        }
      })), t.each(m, (function (e, t) {
        u(e)
      })), b) {
        var w = t('<div class="row elseFields">');
        let e = t('<select class="selectpicker form-control dropup" data-size="5" data-title="--Выбрать поле--">');
        1 == App.keys(g).length ? t.each(g[App.keys(g)[0]], (function (i, n) {
          e.append(t("<option>").attr("value", n).text(p[n].title ? p[n].title : n))
        })) : t.each(g, (function (i, n) {
          i = t('<optgroup label="' + i + '">');
          t.each(n, (function (e, n) {
            i.append(t("<option>").attr("value", n).text(p[n].title ? p[n].title : n))
          })), e.append(i)
        })), w.prepend(t("<label>").text("Добавить поле")), e.addClass("form-control"), w.append(e), e.selectpicker("render"), e.on("change", (function () {
          var i = t(this).val();
          e.find('option[value="' + i + '"]').remove(), u(i)
        })), c.append(w.wrap('<div style="padding:10px">').parent())
      }
      return o = {
        "Сохранить": function () {console.log('save')
          var e = {}, i = f.find(".fullJSONEditor");
          1 == i.length ? e = i.data("editor").get() : f.find("input, select, textarea, .JSONEditor, .HTMLEditor").not(".JSONEditor *").not(".HTMLEditor *").each((function () {
            var i = t(this), n = i.closest(".field").data("name");
            switch (i.closest(".field").data("type")) {
              case"array":
                try {
                  if (e[n] = i.data("editor").get(), !t.isArray(e[n])) throw"Ошибка структуры поля"
                } catch (e) {
                  throw App.notify("Ошибка структуры поля " + n), "Ошибка структуры поля"
                }
                break;
              case"object":
              case"json":
                try {
                  if (e[n] = i.data("editor").get(), "object" != typeof e[n]) throw"Ошибка структуры поля"
                } catch (e) {
                  throw App.notify("Ошибка структуры поля " + n), "Ошибка структуры поля"
                }
                break;
              case"html":
                e[n] = i.data("editor").getValue();
                break;
              case"checkbox":
              case"boolean":
                e[n] = !!i.is(":checked");
                break;
              case"integer":
                e[n] = parseInt(i.val());
                break;
              default:
                e[n] = i.val()
            }
          })), d.data("val", JSON.stringify(e)), a(d, event), c.remove()
        }, "Закрыть": function () {
          c.dialog("close")
        }, "Редактор": function () {
          var e = f.height(), i = t('<div class="fullJSONEditor">').height(e + 100), n = new JSONEditor(i.get(0), {});
          n.set(h);
          var a = t('<a href="#">editText</a>').on("click", (function () {
            var i = t("<div>"),
              a = t('<textarea class="form-control" style="height: 250px;">').val(JSON.stringify(n.get(), null, 2)).appendTo(i);
            return i.dialog({
              title: "Содержимое JSON-поля",
              width: 500,
              height: e + 100,
              buttons: {
                "Сохранить": function () {
                  n.setText(a.val()), i.dialog("close")
                }, "Закрыть": function () {
                  i.dialog("close")
                }
              }
            }), !1
          }));
          f.empty().append(i), f.next().empty(), i.data("editor", n), i.find(".jsoneditor-menu").append(a)
        }
      }, n.id ? (c.dialog({
        title: (n && n.id ? n.id : "") + " " + this.title,
        width: 700,
        modal: !0,
        close: function (e) {
          l(d, e), c.remove()
        },
        buttons: o
      }), d.text("Редактирование в форме").addClass("edit-in-form")) : (d.on("focus click", "button", (function () {
        var e = t(this).closest("div");
        c.dialog({
          title: r.title || r.name, width: 700, modal: !0, close: function (t) {
            l(e, t), c.remove()
          }, buttons: o
        })
      })), d.append(t('<button class="btn btn-default">').text(i || "Редактирование"))), d.data("val", i)
    }, getEditVal: function (e) {
      return e.data("val")
    }, getCellText: function (e) {
      return JSON.stringify(e)
    }, focusElement: function (e) {
      var t = e.find("button"), i = this;
      0 === t.length ? setTimeout((function () {
        i.focusElement(e)
      }), 50) : t.focus()
    }
  }, r.fieldParams = t.extend({}, r.json, {
    icon: "fa-code", isPanelField: !0, isDataModified: function (e, t) {
      return !Object.equals(t, e)
    }, getEditVal: function (e) {
      return e.data("checkVal") && e.data("checkVal")(), e.data("val")
    }, getEditElement: function (i, n, a, l, s, o, r, d, c) {
      let f, p = this, h = t("<div>"), u = t("<div>").css("min-height", 200),
        m = t('<div class="jsonForm">').appendTo(u);
      i && (h = i, m = h.find(".jsonForm")), h.data("form", m), h.data("field", this);
      let b, g = !1, w = function () {
        m.trigger("change")
      };
      try {
        b = c.data("firstLoad").data_src.v
      } catch (e) {
      }
      let v = function (e) {
        let i, n, l = p.jsonFields;
        p.getValue(e, a, !d).then((function (e) {
          let s = e.value;
          "string" == typeof s && (s = JSON.parse(s));
          let o = t.extend({}, s), r = function (e, s, r) {
            let d = l.fieldSettings[e];
            if (!d) return !1;
            if (d.categories && -1 === d.categories.indexOf(a.category.v)) return !1;
            if (d.names && -1 === d.names.indexOf(a.name.v)) return !1;
            let c = {};
            switch (void 0 === o[e] || void 0 === o[e].isOn ? (c.isOn = void 0 !== o[e], c.Val = o[e], void 0 === c.Val && (c.Val = d.default), d.parent || "checkbox" !== d.type || !0 !== c.Val || (c.isOn = !0), o[e] = c) : c = o[e], e) {
              case"codeSelect":
                let e = "=: selectRowListForTree(table: ''; field: ''; order: '' asc; where:  '' = ; parent: ''; disabled:)";
                "tree" === m.find('div[data-name="type"] select').val() ? c.Val === d.default && (c.Val = e) : c.Val === e && (c.Val = d.default)
            }
            let f = !1, h = (l.fieldSettings[d.parent], o[d.parent]);
            d.parent && -1 !== s.indexOf(d.parent) && (h && !0 === h.isOnCheck || (f = !0)), c.changed = function () {
              "use strict";
              !0 === this.isOnCheck ? m.find('[data-parent="' + e.toLowerCase() + '"]').show() : m.find('[data-parent="' + e.toLowerCase() + '"]').hide().find('input[type="checkbox"]').prop("checked", !1).trigger("change")
            };
            let u = p.__addInput.call(p, e, d, c, a, w);
            if ("center" !== (d.align || "center")) {
              if (!i) {
                let e = t('<div class="fParams-grid">');
                i = t("<div>").appendTo(e), n = t("<div>").appendTo(e), m.append(e)
              }
              "left" === d.align ? i.append(u) : n.append(u)
            } else m.append(u), i = n = null;
            d.parent && (u.attr("data-parent", d.parent.toLowerCase()), f && u.hide());
            let b = r[e]();
            return u.css("padding-left", 19 * b), u
          }, d = "string";
          o.type && (d = o.type.Val || o.type);
          !async function e(i) {
            let n;
            m.empty(), ("2" !== a.table_id.v || "data_src" !== a.name.v && "data" !== a.name.v) && (!a.table_name || "tables_vidgets" !== a.table_name.v || "data_src" !== a.name.v && "data" !== a.name.v) ? n = l.fieldListParams[i] : (n = "data" === a.name.v ? ["width", "showInWeb"] : ["width", "jsonFields", "showInWeb", "editable", "insertable", "required", "logging", "default", "copyOnDuplicate"], i = "fieldParams"), "chart" === i && (p.pcTable.chartTypes || (p.pcTable.chartTypes = (await p.pcTable.model.getChartTypes()).chartTypes), l.fieldSettings.chartType.values = {}, p.pcTable.chartTypes.map(e => {
              l.fieldSettings.chartType.values[e.type] = e.title
            }));
            let s = {
              type: function () {
                return 0
              }
            };
            n.forEach((function (e) {
              let t = l.fieldSettings[e];
              t.parent && -1 !== n.indexOf(t.parent) ? s[e] = function () {
                return s[t.parent]() + 1
              } : s[e] = function () {
                return 0
              }
            })), o.type = {isOn: !0, Val: i}, r("type", n, s).find("select").on("change", (function () {
              e(t(this).val())
            })), n.forEach((function (e) {
              r(e, n, s)
            })), u.find(".codeEditor, .HTMLEditor").each((function () {
              t(this).data("editor") && t(this).data("editor").refresh()
            }))
          }(d)
        }))
      };
      const _ = function (e) {console.log('save1')
        if (e && e.close || !d) {
          var i = {}, n = m.find(".fullJSONEditor");
          1 === n.length ? i = n.data("editor").get() : m.find("input, select, textarea, .JSONEditor, .HTMLEditor, .codeEditor").not(".JSONEditor *").not(".HTMLEditor *").not(".codeEditor *").not('input[data-type="switcher"]').each((function () {
            var e = t(this);
            let n, a = e.closest(".field");
            var l = a.data("name");
            switch (e.closest(".field").data("type")) {
              case"code":
                n = e.data("editor").getValue();
                break;
              case"json":
                try {
                  if (n = e.data("editor").get(), "object" != typeof n) throw"Ошибка структуры поля"
                } catch (e) {
                  throw App.notify("Ошибка структуры поля " + l), "Ошибка структуры поля"
                }
                break;
              case"html":
                n = e.data("editor").getValue();
                break;
              case"checkbox":
                n = !!e.is(":checked");
                break;
              case"integer":
                n = parseInt(e.val());
                break;
              default:
                n = e.val()
            }
            let s;
            isOnCheckbox = a.find('input[data-type="switcher"]'), s = 0 === isOnCheckbox.length ? e.is(":visible") : isOnCheckbox.is(":checked"), i[l] = {
              isOn: s,
              Val: n
            }
          })), h.data("val", i), g = !0, e && e.close && (l(h, event), e.close())
        }
      };
      d || h.data("checkVal", _), f = [{label: "Сохранить", cssClass: "btn-m btn-warning", action: _}, {
        label: null,
        icon: "fa fa-times",
        cssClass: "btn-m btn-default btn-empty-with-icon",
        action: function (e) {
          e.close()
        }
      }];
      return d ? (e.top.BootstrapDialog.show({
        message: u,
        type: BootstrapDialog.TYPE_DANGER,
        title: "Параметры поля <b>" + a.title.v + "</b>",
        buttons: f,
        cssClass: "fieldparams-edit-panel",
        draggable: !0,
        onhide: function (e) {
          g || s(h, e), t("body").off("ctrlS.FieldParams")
        },
        onshown: function (e) {
          v(n.v), e.$modalContent.position({of: t("body"), my: "top+50px", at: "top"})
        },
        onshow: function (e) {
          e.$modalHeader.css("cursor", "pointer"), t("body").on("ctrlS.FieldParams", (function (t) {
            return setTimeout(() => {
              _(e)
            }, 10), !1
          }))
        }
      }), h.text("Редактирование в форме").addClass("edit-in-form")) : (v(n.v), h.append(m), h.addClass("fieldparams-edit-panel")), h.data("val", n.v).data("input", m)
    }, __addInput: function (i, n, a, l, s) {
      let o = this;
      var d = (n = n || {}).type;
      let c, f;
      c = a.Val, f = a.isOn;
      var p, h = t('<div class="field form-group">').attr("data-name", i);
      let u, m = t("<span>").text(n.title ? n.title : i);
      switch (d) {
        case"code":
          (p = t('<div class="codeEditor">')).data("editor", !0), setTimeout(() => {
            var e = t("<div>").appendTo(p), i = CodeMirror(e.get(0), {
              value: c || (n.default ? n.default : ""),
              mode: "totum",
              height: "150px",
              readOnly: !1,
              theme: "eclipse",
              lineNumbers: !0,
              gutter: !1,
              indentWithTabs: !0
            });
            i.on("blur", () => {
              s()
            }), p.data("editor", i), i.getScrollerElement().style.minHeight = "150px", i.table = l.table_name && l.table_name.v ? l.table_name.v : null
          });
          break;
        case"string":
          p = t("<input>").val(void 0 !== c ? c : n.default ? n.default : "");
          break;
        case"json":
          p = t('<div class="JSONEditor">').height(500).on("blur", s);
          var b = new JSONEditor(p.get(0), {}),
            g = t('<a href="#" style="padding-top: 5px; display: inline-block; padding-left: 20px;">Вручную</a>').on("click", (function () {
              var i = t("<div>"),
                n = t('<textarea class="form-control" style="height: 250px;">').val(JSON.stringify(b.get(), null, 2)).appendTo(i);
              return BootstrapDialog.show({
                message: i,
                type: null,
                title: "Ручное изменение json-поля",
                buttons: [{
                  label: "Сохранить", cssClass: "btn-m btn-warning", action: function (t) {
                    try {
                      b.setText(n.val()), t.close()
                    } catch (t) {
                      e.top.App.modal("Ошибка формата JSON")
                    }
                  }
                }, {
                  label: null,
                  icon: "fa fa-times",
                  cssClass: "btn-m btn-default btn-empty-with-icon",
                  action: function (e) {
                    e.close()
                  }
                }],
                cssClass: "fieldparams-edit-panel",
                draggable: !0,
                onhide: function (e) {
                },
                onshown: function (t) {
                  t.$modalContent.position({of: e})
                },
                onshow: function (e) {
                  e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({width: 500})
                }
              }), !1
            }));
          if (p.find(".jsoneditor-menu").append(g), "chartOptions" === i) {
            let e = t('<a href="#" style="padding-top: 5px; display: inline-block; padding-left: 20px;">Заполнить настройками по умолчанию</a>');
            e.on("click", () => {
              let e = t('div[data-name="chartType"] select').val();
              return o.pcTable.chartTypes.some(t => {
                if (t.type == e) return b.setText(JSON.stringify(t.default_options)), !0
              }), !1
            }), p.find(".jsoneditor-menu").append(e)
          }
          p.data("editor", b);
          let a = "string" == typeof c ? JSON.parse(c) : c;
          b.set(a);
          break;
        case"html":
          (p = t('<div class="HTMLEditor">')).data("editor", !0), setTimeout(() => {
            var e = t("<div>").appendTo(p), i = CodeMirror(e.get(0), {
              value: c || (n.default ? n.default : ""),
              mode: "text/html",
              height: "150px",
              readOnly: !1,
              theme: "eclipse",
              lineNumbers: !0,
              indentWithTabs: !0,
              autoCloseTags: !0
            });
            i.on("blur", s), i.getScrollerElement().style.minHeight = "150px", p.data("editor", i)
          });
          break;
        case"integer":
          p = t("<input>").val(void 0 !== c ? c : n.default ? n.default : "").attr("type", "number"), void 0 !== n.min && p.attr("min", n.min), void 0 !== n.max && p.attr("max", n.max), void 0 !== n.step && p.attr("step", n.step);
          break;
        case"checkbox":
          p = t("<input>").attr("type", "checkbox").data("type", d), c && p.prop("checked", !0);
          break;
        case"select":
          if (p = t("<select>"), n.values) {
            let e, a = n.valIcons || {};
            n.valuesOrder && (e = n.valuesOrder.slice(0)), "type" === i && (l.table_name && l.name && "tables_fields" === l.table_name.v && "data_src" === l.name.v && (e = ["fieldParams"]), t.each(e, (function (e, t) {
              r[t] && (a[t] = "fa " + r[t].icon)
            })));
            const s = function (e, i) {
              let n = t("<option>").attr("value", e).text(i);
              a[e] && n.data("icon", a[e]), p.append(n)
            };
            e ? e.forEach((function (e) {
              s(e, n.values[e])
            })) : t.each(n.values, s)
          }
          n.multiple && (p.attr("multiple", "multiple"), p.attr("size", "2")), p.css("visibility", "hidden"), p.outerHeight(34);
          let f = void 0 === c && n.default ? n.default : c;
          setTimeout((function () {
            p.selectpicker(), p.css("visibility", "visible")
          }), 10), p.val(f)
      }
      return a.isOnCheck = !0, "checkbox" === d ? (h.prepend(t('<label class="field-param-lable">').html(m).addClass("form-check-label").prepend(p).append('<a href="http://docs.totum.online/fields#fields-settings-' + i + '" target="_blank"><i class="fa fa-question-circle-o"></i></a>')), h.addClass("checkbox"), u = p, p.is(":checked") || (a.isOnCheck = !1, h.addClass("disabled"))) : (h.prepend(t('<label class="field-param-lable">').html(m).append('<a href="http://docs.totum.online/fields#fields-settings-' + i + '" target="_blank"><i class="fa fa-question-circle-o"></i></a>')), p && (p.data("type", d), p.data("editor") || (p.addClass("form-control"), p.on("change", s)), h.append(p)), !0 !== n.required && (u = t('<input type="checkbox" data-type="switcher"/>'), f ? (a.isOnCheck = !0, u.prop("checked", !0)) : (a.isOnCheck = !1, h.addClass("disabled")), h.find("label").prepend(u).addClass("switcheble"), h.addClass("checkbox"))), u && u.on("change", (function () {
        t(this).is(":checked") ? !0 !== a.isOnCheck && (a.isOnCheck = !0, h.removeClass("disabled"), a.changed()) : !1 !== a.isOnCheck && (a.isOnCheck = !1, h.addClass("disabled"), a.changed()), s()
      })), h.data("type", d), h
    }, getValue: function (e, i, n) {
      "use strict";
      if (n) {
        let i = t.Deferred();
        return i.resolve({value: e || {}}), i
      }
      let a = {fieldName: this.name};
      return i.id && (a.rowId = i.id), this.pcTable.model.getValue(a, this.table_id)
    }, getPanelText: function (e) {
      return JSON.stringify(e, null, 2)
    }, getCellText: function (e) {
      return "Настройки поля"
    }
  }), r.button = {
    icon: "fa-hand-pointer-o", required: !1, getPanelText: function (e, t, i) {
      let n = this.getCellText(e, t, i);
      return n.on("click", () => (this.pcTable.selectedCells.empty(), this.pcTable.selectedCells.selectPanelDestroy(), this.pcTable._buttonClick(t, this, i), !1)), n.wrap("<div>"), n.parent()
    }, getCellText: function (e, i, n) {
      let a = this, l = {};
      "column" === this.category ? n.id ? l = t.extend({}, a.pcTable.f || {}, n.f || {}, n[a.name].f || {}) : this.buttonActiveOnInsert ? l = t.extend({}, n[a.name].f || {}) : (l.block = !0, n[a.name] && n[a.name].f && n[a.name].f.icon && (l.icon = n[a.name].f.icon)) : l = t.extend({}, a.pcTable.f || {}, n[a.name].f || {}), i && i.addClass("cell-button");
      const s = e => {
        if (a.td_style && "function" == typeof a.td_style) {
          let t = a.td_style(l).Button;
          t && e.css(t)
        } else if (n.__td_style && "function" == typeof n.__td_style) {
          let t = n.__td_style(l);
          t.Button && e.css(t.Button), t.td && i.css(t.td)
        } else if (i && i.is(".button-wrapper")) {
          let n, a = {};
          l.background && (a.backgroundColor = l.background), l.color && (a.color = l.color), e.css(a), this.pcTable.isMobile ? (n = this.width > t("#table").width() - 30 ? t("#table").width() - 30 : this.width, i.width(n), e.width(n)) : (this.pcTable.rowButtonsCalcWidth(), n = this.width > this.pcTable.__$rowsButtons.width() - 10 ? this.pcTable.__$rowsButtons.width() - 10 : this.width, i.width(n), e.width(n), 20 === n && setTimeout(() => {
            this.pcTable.rowButtonsCalcWidth(), n = this.width > this.pcTable.__$rowsButtons.width() - 20 ? this.pcTable.__$rowsButtons.width() - 20 : this.width, i.width(n), e.width(n - 16)
          }, 40))
        } else if (a.pcTable.isMobile && "column" !== a.category) {
          let t = {};
          l.background && (t.backgroundColor = l.background), l.color && (t.color = l.color), e.css(t)
        }
      };
      if (l.block || !this.pcTable.control.editing && !this.pressableOnOnlyRead) {
        let e = t('<button class="btn btn-default btn-xxs button-field" tabindex="-1" disabled>').text(this.buttonText || "");
        if (s(e), l.text && e.text(l.text), l.comment) {
          let i;
          i = t('<i class="cell-icon fa fa-info"></i>'), e.prepend(i), i.attr("title", l.comment)
        } else if (l.icon) {
          let i = t('<i class="cell-icon fa fa-' + l.icon + '"></i>');
          e.prepend(i), "" === e.text() && (e.css("text-align", "center"), i.css("float", "none"))
        }
        return e
      }
      let o = t('<button class="btn btn-default btn-xxs button-field" tabindex="-1">').text(this.buttonText || "");
      if (s(o), l.text && o.text(l.text), l.comment) {
        let e;
        e = t('<i class="cell-icon fa fa-info"></i>'), o.prepend(e), e.attr("title", l.comment)
      } else if (l.icon) {
        let e = t('<i class="cell-icon fa fa-' + l.icon + '"></i>');
        o.prepend(e), "" === o.text() && (o.css("text-align", "center"), e.css("float", "none"))
      }
      return o
    }, getEditElement: function (e, t, i, n, a, l, s) {
      var o = this.getCellText(void 0, void 0, i);
      void 0 !== s && o.attr("tabindex", s);
      let r = !1;
      const d = e => {
        if (r) return;
        r = !0;
        let t = o.html();
        o.html('<i class="fa fa-spinner"></i>'), this.pcTable.model.doAfterProcesses(() => {
          this.pcTable.model.click({item: this.pcTable._insertRowHash, fieldName: this.name}).then(() => {
            o.html(t), r = !1, n(o, e, !0)
          })
        })
      };
      return o.on("click", d).removeClass("btn-xxs").addClass("btn-sm text-edit-button").on("keydown", e => {
        switch (e.key) {
          case"Tab":
            n(o, e);
            break;
          case"Enter":
            n(o, d)
        }
      }), o
    }, btnOK: function (e, t) {
      let i = e.find("button.button-field"), n = this;
      i.text("Выполнено"), e.data("clicked", !0), setTimeout((function () {
        e.length && e.removeData("clicked"), t && i.replaceWith(n.getCellText.call(n, t[n.name], e, t))
      }), 2e3)
    }
  }, r.link = {icon: "fa-link"}, r.comments = {
    icon: "far fa-comments-o", getEditVal: function (e) {
      return e.data("val")
    }, getCellText: function (e) {
      let i = this;
      if (0 === e.n || !e.n) return "";
      let n = t("<span>"), a = t('<span class="comments">').text(e.c[0] + " " + e.c[1] + ": " + e.c[2]).appendTo(n);
      return e.notViewed && (a.addClass("notViewed"), i.decorationColor && a.css("border-bottom-color", i.decorationColor)), n
    }, getValue: function (e, i, n) {
      "use strict";
      let a = this, l = t.Deferred();
      if (n) e || (e = []), l.resolve({value: e}); else if (0 === e.n || 1 === e.n && !e.cuted && !e.notViewed) e || (e = []), l.resolve({value: [e.c]}); else if (e.n > 1 && !e.notViewed && e.all) l.resolve({value: e.c}); else {
        let e = {fieldName: this.name};
        i.id && (e.rowId = i.id), l = this.pcTable.model.getValue(e, this.table_id)
      }
      return l.then((function (e) {
        if (i[a.name].v.notViewed || i[a.name].notViewed) {
          let e = t.Deferred();
          e.then((function () {
            let e;
            delete i[a.name].v.notViewed, delete i[a.name].notViewed, i.id ? e = a.pcTable._getTdByFieldName(a.name, a.pcTable.data[i.id].$tr) : (e = a.pcTable._paramsBlock.find('td[data-field="' + a.name + '"]'), e.length || (e = a.pcTable._footersBlock.find('td[data-field="' + a.name + '"]'))), e && e.length && (e.find(".notViewed-num").remove(), e.find(".notViewed").removeClass("notViewed"))
          })), i[a.name].notViewed ? a.pcTable.model.setCommentsViewed(i[a.name].v.length, a.name, i.id).then((function () {
            e.resolve()
          })) : e.resolve()
        }
      })), l
    }, getPanelText: function (e, i, n) {
      let a = this, l = t.Deferred(), s = e || n[a.name];
      const o = function (e) {
        let i = t('<div class="comments">');
        return t.each(e, (function (e, t) {
          i.append(a.getCommentLine(t))
        })), setTimeout((function () {
          i.closest("td").scrollTop(i.height())
        }), 100), i
      };
      return s.all ? o(s.c) : (this.getValue(s, n, !1).then((function (e) {
        l.resolve(o(e.value))
      })).fail((function () {
        l.reject()
      })), l.promise())
    }, getCommentLine: function (e) {
      let i = t('<div class="comments-line">');
      return i.append(t('<span class="com_dt">').text(e[0])), i.append(" "), i.append(t('<span class="com_author">').text(e[1])), i.append(" "), i.append(t('<span class="com_text">').html(App.textWithLinks(e[2]))), i
    }, getPanelVal: (e, t) => e, getEditElement: function (e, i, n, a, l, s, o, r) {
      let d, c = this, f = e || t("<div>"), p = f.data("dialog") || t("<div>").css("min-height", 200);
      f.data("dialog", p), i = i.v || "";
      let h = function (e) {
        c.getValue.call(c, i, n, !r).then((function (e) {
          let i = t('<textarea type="text" style="height:90px;resize: vertical" class="form-control"/>');
          "object" == typeof e.value ? t.each(e.value, (function (e, t) {
            p.append(c.getCommentLine(t))
          })) : e.value ? i.val(e.value) : f.data("val") && i.val(f.data("val")), p.append(t('<div class="comments-input">').append(i)), p.data("input", i), i.focus()
        }))
      };
      const u = function (e, t, i) {
        let n = p.find("textarea").val().trim();
        f.data("val", n), i || (a(f, {}), e.close())
      };
      d = [];
      let m = {label: "Сохранить", cssClass: "btn-m btn-warning", action: u}, b = {
        label: null, icon: "fa fa-times", cssClass: "btn-m btn-default btn-empty-with-icon", action: function (e) {
          l(f, {}), e.close()
        }
      }, g = "Комментарии поля <b>" + this.title + "</b>", w = "ctrlS.commentdialog", v = !1;
      if (r) setTimeout((function () {
        let e = f.closest("td").find(".cdiv");
        e.length > 0 ? (e.data("bs.popover").options.content.find(".btn").each((function () {
          let e = t(this), i = {};
          i.label = e.data("name"), i.cssClass = e.attr("class").replace("btn-sm", "btn-m"), i.icon = e.find("i").attr("class"), i.save = e.data("save"), i.click = e.data("click"), i.action = function (e) {
            i.save && u(e, 0, !0), i.click({}), v = !0, e.close()
          }, d.push(i)
        })), e.popover("destroy")) : (d.push(m), d.push(b)), c.pcTable.isMobile ? App.mobilePanel(g, p, {
          buttons: d,
          onhide: function (e) {
            t("body").off(w), v || s(f, {})
          },
          onshown: function (e) {
            h()
          },
          onshow: function (e) {
            t("body").on(w, (function (t) {
              u(e, 0, !1)
            }))
          }
        }) : BootstrapDialog.show({
          message: p,
          type: null,
          title: g,
          cssClass: "fieldparams-edit-panel",
          draggable: !0,
          buttons: d,
          onhide: function (e) {
            t("body").off(w), v || s(f, {})
          },
          onshown: function (e) {
            e.$modalContent.position({of: t("body"), my: "top+50px", at: "top"}), h()
          },
          onshow: function (e) {
            e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({width: 900}), t("body").on(w, (function (t) {
              u(e, 0, !1)
            }))
          }
        })
      }), 1), f.text("Редактирование в форме").addClass("edit-in-form"); else {
        let e = !1;
        if (f.off().on("click keydown", (function (i) {
          if (e) return !1;
          if ("Tab" === i.key) return void s(p, i, null, !0);
          e = !0;
          let n = d.slice(0);
          n.push(m), n.push(b);
          var a = t(this).closest("div");
          c.pcTable.isMobile ? App.mobilePanel(g, p, {
            buttons: n, onhide: function (i) {
              e = !1, t("body").off(w), l(a, i)
            }, onshown: function (e) {
              0 === e.$modalBody.find("textarea").length && h(), t("body").on(w, (function (t) {
                u(e, 0, !1)
              }))
            }
          }) : BootstrapDialog.show({
            message: p,
            type: null,
            cssClass: "fieldparams-edit-panel",
            title: g,
            draggable: !0,
            size: BootstrapDialog.SIZE_WIDE,
            buttons: n,
            onhide: function (i) {
              e = !1, t("body").off(w), l(a, i)
            },
            onshown: function (e) {
              e.$modalHeader.css("cursor", "pointer"), 0 === e.$modalBody.find("textarea").length && h(), e.$modalContent.css({width: 900}), t("body").on(w, (function (t) {
                u(e, 0, !1)
              }))
            }
          })
        })), 0 === f.find("button").length) {
          let e = t('<button class="btn btn-default btn-sm text-edit-button">').text("Добавить комментарий");
          o && e.attr("tabindex", o), f.append(e)
        }
      }
      return f.data("val", null)
    }, getCellTextInPanel: function (e, t, i, n) {
      return this.getEditPanelText({v: e}, i, n)
    }, getEditPanelText: function (e, i, n) {
      if (e) {
        if (e.v.forEach) {
          let i = t("<div>");
          return e.v.forEach((function (e) {
            i.append(t("<div>").append(t('<span class="date">').text(e[0])).append(t('<span class="user">').text(e[1])).append(t('<span class="text">').text(e[2])))
          })), i.children()
        }
        {
          let i = t("<div>");
          return n[this.name] && n[this.name].v && n[this.name].v.forEach && n[this.name].v.forEach((function (e) {
            i.append(t("<div>").append(t('<span class="date">').text(e[0])).append(t('<span class="user">').text(e[1])).append(t('<span class="text">').text(e[2])))
          })), i.append(t('<div class="new-comment">').text(e.v)), i.children()
        }
      }
    }, getValPreview(e) {
      return this.getCellText({c: e[e.length - 1], n: e.length})
    }
  }, r.chart = {
    icon: "fa-bar-chart", getCellText: function (e, i, n) {
      let a = t("<div>");
      return n[this.name].ch && this.loadChart(() => {
        this.chartSimple(a, n[this.name].ch)
      }), a
    }, async loadChart(i) {
      if (e.ChartLoaded) e.ChartLoaded.then(i); else {
        let n, a;
        e.ChartLoaded = new Promise((e, t) => {
          n = e, a = t
        }), e.ChartLoaded.then(i), t.getScript("/js/lib/chart.js").then(() => {
          n()
        })
      }
    }, chartSimple: function (i, n) {
      let a = t('<canvas class="ttm-chart"></canvas>');
      i.html(a);
      let l = {}, s = {...this.chartOptions};
      "column" === this.category || this.column ? (a.attr("height", "23"), l.layout = {
        padding: {
          left: 5,
          right: 5,
          top: 2,
          bottom: 2
        }
      }, l.scales = {
        yAxes: [{display: !1}],
        xAxes: [{display: !1}]
      }) : this.f && this.f.height && a.attr("height", this.f.height), e.innerWidth < ("false" !== (localStorage.getItem("TreeMinimizer") || "false") ? 600 : 800) && (l.layout = {
        ...s.layout,
        padding: {left: 5, right: 5, top: 2, bottom: 2}
      }, l.scales = {}, s.scales && s.scales.yAxes ? l.scales.yAxes = s.scales.yAxes.map(e => ({
        ...e,
        display: !1
      })) : l.scales.yAxes = [{display: !1}], s.scales && s.scales.xAxes ? l.scales.xAxes = s.scales.xAxes.map(e => ({
        ...e,
        display: !1
      })) : l.scales.xAxes = [{display: !1}], l.aspectRatio = s.aspectRatioMobile || (s.aspectRatio || 2) / 1.6);
      let o = a.get(0).getContext("2d"), r = s.type || "line";
      delete s.type;
      let d = n.values.map(() => new Object);
      s.data && s.data.datasets && (d = s.data.datasets), n.datasets && (d = n.datasets);
      let c = s.data || {};
      c.datasets = d, n.labels && (c.labels = n.labels), delete s.data, d.forEach((e, t) => {
        e.data = n.values[t]
      }), new Chart(o, {
        type: r,
        data: c,
        options: {...s, ...l}
      }), this.pcTable._container.getNiceScroll && this.pcTable._container.getNiceScroll().resize(), a.on("contextmenu", () => !1), a.on("dblclick", () => {
        e.top.BootstrapDialog.show({
          message: "<canvas></canvas>",
          draggable: !0,
          title: this.pcTable.__getCellTitle(this),
          cssClass: "dialog-chart-topper",
          onshown: e => {
            new Chart(e.$modalBody.find("canvas").get(0).getContext("2d"), {type: r, data: c, options: s})
          }
        })
      })
    }
  }, t.each(r, (function (e, i) {
    r[e] = t.extend({}, d, i)
  })), App.pcTableMain = function (n, a) {
    if (this.data_params = a.params || null, a = t.extend({}, {
      tableRow: {},
      nSorted: !0,
      isCreatorView: !1,
      withCsvButtons: !1,
      withCsvEditButtons: !1,
      noDataRowClass: "pcTable-noDataRow",
      contanerClass: "pcTable-container",
      tableClass: "pcTable-table",
      width: null,
      isTreeView: !1,
      treeReloadRows: [],
      tree: [],
      treeIndex: {},
      treeSort: [],
      checkIsUpdated: 0,
      _containerId: "",
      scrollWrapper: null,
      tableWidth: 0,
      control: {adding: !1, sorting: !1, deleting: !1, duplicating: !1},
      dataSorted: [],
      data: [],
      dataSortedVisible: [],
      mainFieldName: "id",
      insertRow: null,
      _container: null,
      _content: null,
      openedPanels: {},
      extraClastersBottom: null,
      extraClastersTop: null,
      dataSortedClasters: {t: [], m: [], b: []},
      ScrollClasterized: null,
      _innerContainer: null,
      _header: null,
      _table: null,
      LogButton: null,
      model: null,
      fields: {},
      hidedFields: [],
      fieldCategories: {column: [], params: [], footer: []},
      sorted: {field: "", direction: "asc"},
      _sorting: {},
      _filterable: !1,
      filtersClearButton: null,
      _indexes: {fieldByName: {}},
      beforeSpaceHide: !0
    }, a), t.extend(this, a, !0), screen.width <= i && (this.isCreatorView = !1, this.isMobile = !0), this.isCreatorView) {
      if (0 === t("#isCreator").length) {
        let i = t('<span id="isCreator" class="btn btn-sm"><i class="fa-user-circle fa"></i></span>'), n = i;
        this.isMobile || localStorage.getItem("notCreator") ? (n.addClass("btn-warning"), t(".plus-top-branch").hide()) : n.addClass("btn-danger"), n.on("click", () => {
          localStorage.getItem("notCreator") ? localStorage.removeItem("notCreator") : localStorage.setItem("notCreator", !0), e.location.reload(!0)
        }), t("#docs-link").before(i)
      }
      (this.isMobile || localStorage.getItem("notCreator")) && (this.isCreatorView = !1)
    }
    if (this.isCreatorView || Object.keys(this.fields).forEach(e => {
      this.fields[e].webRoles && 1 === this.fields[e].webRoles.length && 1 === parseInt(this.fields[e].webRoles[0]) && delete this.fields[e]
    }), this.hidden_fields = this.hidden_fields || {}, 0 === this.hidden_fields.length && (this.hidden_fields = {}), App.isTopWindow() && (this.beforeSpaceHide = !1), n) {
      this.refreshArraysFieldCategories(!0);
      let e = t(n);
      e.data("pctable", this), this._container = e, this.isCreatorView || this._container.addClass("worker-view"), this._containerId = this._container.attr("id"), this._containerId || (this._containerId = "pcTable" + o++, this._container.attr("id", this._containerId)), this._init(), this.render(a.addVars), this.applyHideRows(this.f.hideRows)
    } else this.initForPanel(a);
    return this.model.addPcTable(this), this
  };
  let c = 0;
  e.EditPanel = function (i, n, a, l, s = {}) {
    if (e.top !== e) return e.top.EditPanel.call(e.top, i, n, a, l, s);
    let o = t.extend(!0, {}, a), r = this;
    r.pcTable = i, r.panelId = "panel" + c++;
    let d = 2 === i || "object" == typeof i && 2 === i.tableRow.id, f = {}, p = !1;
    this.closed = !1;
    let h = t.Deferred();
    this.$panel = t('<div class="InsertPanel">'), this.isNewPanel = !0, this.blockedFields = {}, this.bootstrapPanel = null;
    let u = o.id ? "checkEditRow" : "checkInsertRow", m = o.id ? "saveEditRow" : "add";
    this.panelType = o.id ? "edit" : "insert", this.editItem = o || {}, t("body").trigger("pctable-opened", {type: "panel"}), r.resolved = !1, r.error = {};
    let b, g = {};
    this.checkRow = async function (e, i) {
      let n = this;
      const a = () => new Promise((function (a, l) {
        r.pcTable.model[u](n.getDataForPost(e), b).then((function (e) {
          "edit" == r.panelType && i && (g = t.extend(!0, {}, e.row)), b = b || e.hash, r.editRow.call(r, e), a(r), p = !1
        })).fail(l)
      }));
      return r.beforeSave && !i && (e = await r.beforeSave(e)), a()
    }, this.saveRow = function (i, n) {
      let a = this.getDataForPost();
      const l = () => {
        r.pcTable.model[m]("insert" === this.panelType ? b : a).then((function (i) {
          if (d) {
            let e = t("#table").data("pctable");
            e && e.tableRow.id == r.editItem.table_id.v && a.data_src && a.data_src.v && a.data_src.v.width && e.setColumnWidth(r.editItem.name.v, a.data_src.v.width.Val)
          }
          h.resolve(i), r.resolved = !0, t(e.top.document.body).trigger("pctable-closed", {
            type: "panel",
            json: i,
            method: r.panelType,
            tableId: r.pcTable.tableRow.id
          }), r.bootstrapPanel.close()
        })).fail((function () {
          if (n.length && n.isAttached()) {
            i.$modal.find(".btn-save").prop("disabled", !1)
          }
        }))
      };
      d && "insert" === this.panelType && p ? this.checkRow({}).then(l) : l()
    }, this.refresh = () => {
      this.closed || ("edit" === r.panelType ? r.pcTable.model[u]({id: o.id}).then(e => {
        Object.keys(e.row).forEach(t => {
          g[t] = e.row[t]
        }), r.pcTable.model[u](this.getDataForPost("manual")).then((function (e) {
          r.editRow.call(r, e)
        }))
      }) : r.pcTable.model[u](this.getDataForPost("manual"), b).then((function (e) {
        Object.keys(e.row).forEach(t => {
          g[t] = e.row[t]
        }), r.editRow.call(r, e)
      })))
    }, this.editRow = function (e) {
      "use strict";
      let i = !1;
      r.pcTable.f = e.f || {}, r.editItem.f = e.row.f || {};
      let a = this.$panel.find(">div:first"), l = this.$panel.find(">div:eq(2)"), o = this.$panel.find(">div:eq(3)"),
        c = [], p = 0, h = 0, u = 0;
      const m = function (e) {
        return -1 !== ["text", "comments", "file", "listRow"].indexOf(e.type) || e.multiple ? 1.5 : 1
      };
      if (a.length || (r.pcTable.fieldCategories.panel_fields.forEach((function (i, n) {
        if ("n" === i.name) return;
        let a = t.extend({}, r.pcTable.f || {}, r.editItem.f || {}, e.row[i.name].f || {});
        a.hide && a.hide.extpanel || (p += m(i), u++)
      })), p /= 2, a = t("<div>").appendTo(this.$panel), c.column1 = a, d ? (l = t("<div>").appendTo(this.$panel), o = t("<div>").appendTo(this.$panel), c.column2 = l, c.column3 = o) : u > 6 ? (l = t("<div>").appendTo(this.$panel), c.column2 = l) : this.$panel.css("grid-template-columns", "minmax(0, 1fr)")), r.pcTable.fieldCategories.panel_fields.forEach((function (n, o) {
        let u = r.$panel.find('div.cell[data-field-name="' + n.name + '"]'), b = r.editItem[n.name];
        r.editItem[n.name] = e.row[n.name], r.isEditable(n) && (i = !0);
        let w = t.extend({}, r.pcTable.f || {}, r.editItem.f || {}, r.editItem[n.name].f || {});
        if (!w.hide || !w.hide.extpanel) {
          if (u.length) u.data("input") && !w.block ? (!b || n.isDataModified(r.editItem[n.name].v, b.v) || n.codeSelectIndividual || "insert" == r.panelType && n.code && !n.codeOnlyInAdd || "fieldParams" === n.type) && r.createCell.call(r, u, n, o, w) : r.createCell.call(r, u, n, o, w); else {
            let e = t('<div class="cell-wrapper" style="position: relative">'),
              i = t("<label>").text(n.title || n.name).prependTo(e);
            n.unitType && i.text(i.text() + ", " + n.unitType);
            let s = t('<div class="btns pull-right">').prependTo(e), f = m(n);
            if (e.attr("data-koeff", f), "fieldParams" === n.type) this.$panel.append(e), e.width("100%"), e.attr("data-name", n.name), e.css({
              "grid-column-start": 1,
              "grid-column-end": 4
            }), u = r.createCell.call(r, u, n, o, w, e); else {
              let t;
              if (d) if (0 === o) this.$panel.prepend(e.css({"grid-column-start": 1, "grid-column-end": 4})); else {
                let e = Math.floor((o + 1) / 2);
                7 === o && (e = 3), t = c["column" + e]
              } else t = h < p && h + f > p || h + f <= p ? a : l.length ? l : a;
              t && t.append(e), h += f, u = r.createCell.call(r, u, n, o, w, e)
            }
            if (setTimeout(() => {
              let t = e.find(".btns").width();
              t > 0 && (t += 3), i.css("max-width", "calc(100% -  " + t + "px)")
            }, 2), n.linkToSelectTable && e.append('<div class="source-link"><a href="' + n.linkToSelectTable.link + '" style="font-size: 12px" target="_blank">' + n.linkToSelectTable.title + "</a></div>"), n.help) {
              let e = t('<button class="btn btn-sm btn-default"><i class="fa fa-info"></i></button>').on("click", () => {
                App.notify(n.help, n.title)
              });
              s.prepend(e)
            }
          }
          if (w.hide && w.hide.panel ? u.parent().css("display", "none") : u.parent().css("display", ""), u.attr("data-field-name", n.name), u.attr("data-field-type", n.type), "edit" === r.panelType) {
            let e, i = r.editItem[n.name].v;
            if (e = "fieldParams" === n.type || Object.equals(g[n.name].v, i), e && g[n.name].h == r.editItem[n.name].h ? u.parent().removeClass("edited") : "comments" === n.type ? "string" == typeof r.editItem[n.name].v && r.editItem[n.name].v.length ? u.parent().addClass("edited") : u.parent().removeClass("edited") : u.parent().addClass("edited"), n.code && !n.codeOnlyInAdd) {
              let e = u.parent().find(".btns button.handled");
              e.length || (e = t('<button class="btn btn-sm btn-default handled" tabindex="' + (2 * o + 2) + '"></button>'), u.parent().find(".btns").prepend(e), r.isEditable(n) ? (e.on("click", (function () {
                !0 === r.editItem[n.name].h ? r.editItem[n.name].h = !1 : r.editItem[n.name].h = !0, f[n.name] = !0, r.checkRow()
              })), e.prop("disabled", !1)) : (e.prop("disabled", "disabled"), r.editItem[n.name].h || e.remove())), e.removeClass("btn-warning").addClass("btn-default"), e.html('<i class="fa fa-hand-grab-o"></i>'), r.editItem[n.name].h && (e.addClass("btn-warning").removeClass("btn-default"), -1 !== Object.keys(r.editItem[n.name]).indexOf("c") && r.editItem[n.name].c !== r.editItem[n.name].v && e.html('<i class="fa fa-hand-paper-o"></i>'))
            }
          } else if (n.code && !n.codeOnlyInAdd) {
            let e = u.parent().find(".btns"), i = e.find(".handled");
            s[n.name] && r.editItem[n.name].h ? 0 === i.length && (i = t('<button class="btn btn-sm btn-warning handled" tabindex="' + (2 * o + 2) + '"><i class="fa fa-hand-paper-o pull-right"></button>').on("click", () => {
              delete s[n.name], r.checkRow()
            }), e.prepend(i)) : 1 === i.length && i.remove()
          }
        }
      }), r), r.isNewPanel) {
        let t = "";
        if ("edit" === this.panelType) {
          let n;
          switch (r.pcTable.tableRow.id) {
            case 1:
              if (r.pcTable.tableRow.main_field && r.pcTable.fields[r.pcTable.tableRow.main_field]) {
                let t = r.pcTable.tableRow.main_field;
                n = r.editItem[t] || e.row[t], n && (n = n.v), n = ' "' + n + '"'
              }
              n = n ? "id " + (r.editItem.id || e.row.id) + " " + n : "id " + (r.editItem.id || e.row.id), t = !r.pcTable.control.editing || e.row.f.block && !i ? "Просмотр настроек таблицы <b> " + n + "</b>" : "Редактирование настроек таблицы <b> " + n + "</b>";
              break;
            case 2:
              if (r.pcTable.tableRow.main_field && r.pcTable.fields[r.pcTable.tableRow.main_field]) {
                let t = r.pcTable.tableRow.main_field;
                n = r.editItem[t] || e.row[t], n && (n = n.v), n = ' "' + n + '"'
              }
              n = n ? "id " + (r.editItem.id || e.row.id) + " " + n : "id " + (r.editItem.id || e.row.id), t = !r.pcTable.control.editing || e.row.f.block && !i ? "Просмотр поля таблицы " + r.editItem.table_name.v + "<b> " + n + "</b>" : "Редактирование поля таблицы " + r.editItem.table_name.v + " <b> " + n + "</b>";
              break;
            default:
              if (r.pcTable.tableRow.main_field && r.pcTable.fields[r.pcTable.tableRow.main_field]) {
                let t = r.pcTable.tableRow.main_field;
                n = r.editItem[t] || e.row[t], n && (n = n.v), n = ' "' + n + '"'
              }
              n = n ? "id " + (r.editItem.id || e.row.id) + " " + n : "id " + (r.editItem.id || e.row.id), t = !r.pcTable.control.editing || e.row.f.block && !i ? "Просмотр <b> " + n + "</b> таблицы <b>" + r.pcTable.tableRow.title + "</b>" : "Редактирование <b> " + n + "</b> таблицы <b>" + r.pcTable.tableRow.title + "</b>"
          }
        } else switch (r.pcTable.tableRow.id) {
          case 1:
            t = "Добавление таблицы";
            break;
          case 2:
            t = "Добавление поля";
            break;
          default:
            t = "Добавление строки в таблицу <b>" + r.pcTable.tableRow.title + "</b>"
        }
        r.cleateBootstrapPanel.call(r, t, n, "insert" === r.type || i, u < 7 ? "one-column-panel" : ""), r.isNewPanel = !1
      }
    }, this.cleateBootstrapPanel = function (n, a, s, o) {
      let c, f = this, p = [];
      s && (c = function (e, i) {
        "use strict";
        if (Object.keys(r.error).length) {
          let e = Object.keys(r.error)[0], i = r.error[e];
          return App.notify(i, t("<div>Ошибка в поле </div>").append(" в поле ").append(t("<span>").text(r.pcTable.fields[e].title))), !1
        }
        let n = e.$modal.find(".btn-save").prop("disabled", "disabled");
        r.beforeSave && r.beforeSave(), setTimeout((function () {
          r.pcTable.model.doAfterProcesses((function () {
            f.saveRow.call(f, e, n)
          }))
        }), 250)
      }, p.push({action: c, cssClass: "btn-warning btn-save", label: "Cохранить"}));
      const u = () => {
        this.closed = !0, void 0 !== this.mainPanelId && i.editPanels && i.editPanels.splice(this.mainPanelId, 1)
      };
      l ? (f.close = function () {
        h.resolve(void 0, !0), t(e.top.document.body).trigger("pctable-closed", {type: "panel"}), r.resolved = !0, f.bootstrapPanel.close()
      }, p.push({
        action: f.close,
        label: null,
        icon: "fa fa-" + (!0 === l ? "arrow-right" : "times"),
        cssClass: "btn-m btn-default btn-empty-with-icon"
      })) : (f.close = function () {
        f.bootstrapPanel.close()
      }, p.push({
        action: f.close,
        label: null,
        icon: "fa fa-times",
        cssClass: "btn-m btn-default btn-empty-with-icon"
      }));
      let m = "scroll." + r.panelId;
      f.bootstrapPanel = BootstrapDialog.show({
        type: a || null,
        size: BootstrapDialog.SIZE_WIDE,
        message: f.$panel,
        cssClass: "edit-row-panel " + (d ? "edit-field-panel" : o || ""),
        title: n,
        buttons: p,
        draggable: !0,
        onhidden: function () {
          t("body").off("ctrlS.EditPanel"), h.resolve(), r.resolved || t(e.top.document.body).trigger("pctable-closed", {type: "panel"}), t(e.top.document.body).off("." + r.panelId), u()
        },
        onshown: function (i) {
          "use strict";
          let n;
          c && t("body").on("ctrlS.EditPanel", (function (e) {
            t(".bootstrap-dialog").length > 0 && (t(document.activeElement).blur(), c(i))
          })), i.indexedButtons[Object.keys(i.indexedButtons)[0]].attr("tabindex", 500), 2 === Object.keys(i.indexedButtons).length && i.indexedButtons[Object.keys(i.indexedButtons)[1]].attr("tabindex", 501);
          let a = i.$modalFooter.find("button");
          const l = () => {
            n = t('<div style="position: fixed; right: ' + (i.$modal.width() - i.$modalBody.width() - i.$modalBody.offset().left - 10) + 'px; bottom: 20px; z-index: 1100">').appendTo(i.$modal).append(a)
          };
          setTimeout(() => {
            i.$modalFooter.get(0).getBoundingClientRect().top > e.innerHeight - 20 && l()
          }, 200), i.$modal.on(m, () => {
            i.$modalFooter.get(0).getBoundingClientRect().top > e.innerHeight - 20 ? n || l() : n && (i.$modalFooter.append(a), n.remove(), n = null)
          })
        }
      }), f.bootstrapPanel.$modalFooter.find(".btn-save").length && (f.saveButton = f.bootstrapPanel.$modalFooter.find(".btn-save"))
    }, this.createCell = function (i, n, a, l, o) {
      let c = r.editItem || {};
      c[n.name] = c[n.name] || {}, i.removeClass("error"), 0 === i.length ? (i = t("<div data-name='" + n.name + "' class='cell'>").appendTo(o), n.code && i.addClass("with-code")) : o = i.parent();
      let h = o.find(".btns");
      if (h.find(".select-btns").remove(), !this.isEditable(n) || "button" === n.type) {
        r.blockedFields[n.name] = !0;
        let e = t('<div class="' + ("button" === n.type ? "link" : "") + ' ttm--panel-data">');
        if ("button" !== n.type && l.text ? e.text(l.text) : (r.editItem[n.name].v || "button" === n.type) && e.append(n.getCellTextInPanel(r.editItem[n.name].v, i, r.editItem, g)), "button" !== n.type) if (l.comment) {
          let i;
          i = t('<i class="cell-icon fa fa-info"></i>'), e.prepend(i), i.attr("title", l.comment)
        } else l.icon && e.prepend('<i class="cell-icon fa fa-' + l.icon + '"></i>'); else e.find("button").is(":disabled") || i.data("input", e.find("button"));
        if (n.unitType && e.append(" " + n.unitType), "button" === n.type && r.pcTable) {
          let t = !1, a = e.find("button");
          i.off().on("click", () => {
            if (t) return;
            t = !0;
            let e = a.html();
            a.html('<i class="fa fa-spinner"></i>'), "insert" === this.panelType ? this.pcTable.model.doAfterProcesses(() => {
              this.pcTable.model.click({item: b, fieldName: n.name}).then(() => {
                a.html(e), t = !1, this.refresh()
              })
            }) : r.pcTable._buttonClick(i, n, c).then(() => {
              n.closeIframeAfterClick ? r.close() : (a.html(e), t = !1, this.refresh())
            })
          })
        } else n.CodeActionOnClick && !o.find(".edit-btn").length && o.append(t('<button class="btn btn-sm btn-default edit-btn" style="width: 100%"><i class="fa fa-hand-pointer-o"></i></button>').on("click", () => {
          r.pcTable.model.dblClick(c.id, n.name).then(e => {
          })
        }));
        return l.comment && e.append(t('<div class="comment">').text(l.comment)), i.html(e).data("input", null), i
      }
      r.blockedFields[n.name] = !1;
      let u = async function (e) {
        let t;
        try {
          t = n.getEditVal(e), i.removeClass("error"), delete r.error[n.name]
        } catch (t) {
          if ("name" === n.name && d) {
            return delete s.name, (await r.checkRow()).editItem.name.v
          }
          return r.error[n.name] = t, i.addClass("error"), App.popNotify(t, e, "default"), null
        }
        return t
      }, m = !1, w = (i.find("input,button").is(":focus"), async function (e, t, i) {
        m = !0;
        let l = await u(e);
        if (null === l) Object.keys(r.error).length || r.FocusIt.call(r, a); else if (i || r.FocusIt.call(r, a + 1), n.isDataModified(l, r.editItem[n.name].v)) {
          let e = {};
          if (e[n.name] = {v: l}, n.code && !n.codeOnlyInAdd && (e[n.name].h = !0), n.code && "insert" === r.panelType && (s[n.name] = !0), d) switch (n.name) {
            case"table_id":
              delete s.version
          }
          r.checkRow(e), f[n.name] = !0
        }
        m = !1
      }), v = function (e, t) {
        return setTimeout((function () {
          e && e.length && e.isAttached() && (m ? m = !1 : w(e, 0, !0))
        }), 40), !1
      }, _ = function (e, t) {
        w(e)
      };
      i.data("firstLoad", g);
      let y, x = n.getEditElement(i.data("input"), r.editItem[n.name], r.editItem, w, _, v, 50 + a, !1, i);
      if (d && "fieldParams" === n.type && ("insert" === this.panelType && x.find(".jsonForm").on("change", () => p = !0), r.beforeSave = async function (e) {
        let t = await u(x);
        if (r.editItem[n.name] = {v: t}, e) return e[n.name] = {v: t}, e
      }), x.isAttached() || i.html(x), i.data("input", x), "select" === n.type && n.changeSelectTable) {
        let a = function () {
            let a = r.getDataForPost(), l = t(this).is(".source-add");
            l && (a[n.name] = null);
            let s = 0;
            t(e.top.document.body).on("pctable-opened.select-" + r.panelId, (function () {
              s++
            })).on("pctable-closed.select-" + r.panelId, (function (e, a) {
              s--;
              let o = a && "insert" === a.method && a.json && a.json.chdata && a.json.chdata.rows;
              setTimeout((function () {
                if (0 === s || o) {
                  let e = x;
                  delete n.list, e.data("input").data("LISTs") && (e.data("input").data("LISTs").isListForLoad = !0), o && (n.multiple ? r.editItem[n.name].v.push(Object.keys(a.json.chdata.rows)[0]) : r.editItem[n.name].v = Object.keys(a.json.chdata.rows)[0]), e.replaceWith(x = n.getEditElement(null, r.editItem[n.name], r.editItem, w, _, v)), i.data("input", x), r.checkRow(), !l && r.pcTable.isMain && r.pcTable.model.refresh((function (e) {
                    r.pcTable.table_modify.call(r.pcTable, e)
                  })), t("body").off(".select-" + r.panelId)
                }
              }), 100)
            })), r.pcTable.model.selectSourceTableAction(n.name, a)
          }, l = t('<span class="select-btns">').appendTo(h),
          s = t('<button class="btn btn-default-primary btn-sm"><i class="fa fa-edit"></i></button>');
        if (l.append(s), s.on("click", a), 2 === n.changeSelectTable) {
          let e = t('<button class="btn btn-default-primary btn-sm source-add"><i class="fa fa-plus"></i></button>');
          l.append(e), e.on("click", a)
        }
      }
      if (n.getEditPanelText && (y = n.getEditPanelText(r.editItem[n.name], r.editItem, g))) {
        let e = i.find(".ttm--panel-data");
        e.length || (e = t('<div class="ttm--panel-data"/>').prependTo(i)), e.html(y), "comments" === n.type && setTimeout(() => {
          e.scrollTop(2e4)
        })
      }
      return l.text && i.append(t('<div class="format-text">').text(l.text)), l.comment && i.append(t('<div class="format-comment">').text(l.comment).prepend('<i class="fa fa-info"></i>')), i
    }, this.getDataForPost = function (e = {}) {
      if (this.readOnly) return r.editItem.id;
      let t = {};
      return r.editItem.id && (t.id = r.editItem.id), r.pcTable.fieldCategories.panel_fields.forEach((function (i) {
        let n;
        "insert" === r.panelType ? "manual" !== e && i.name in e && (n = e[i.name] || r.editItem[i.name]) : "manual" === e ? i.name in f && (n = r.editItem[i.name]) : n = e[i.name] || r.editItem[i.name], n ? ("comments" == i.type && "string" != typeof n.v && (n.v = null), r.isEditable(i) && (t[i.name] = {}, "edit" === r.panelType ? (t[i.name].v = n.v, i.code && !i.codeOnlyInAdd && (t[i.name].h = n.h || !1), t[i.name].v = i.getPanelVal.call(i, t[i.name].v, r.$panel.find('div.cell[data-field-name="' + i.name + '"]').data("input"))) : (t[i.name] = n.v, t[i.name] = i.getPanelVal.call(i, t[i.name], r.$panel.find('div.cell[data-field-name="' + i.name + '"]').data("input"))))) : "insert" === r.panelType && !b && a[i.name] && (t[i.name] = a[i.name].v)
      })), t
    }, this.isEditable = function (e) {
      if (!r.pcTable.control.editing) return !1;
      return !0 !== t.extend({}, r.pcTable.f || {}, r.editItem.f || {}, r.editItem[e.name].f || {}).block && ("insert" === this.panelType ? e.insertable : e.editable)
    }, this.FocusIt = function (e) {
      return !1
    };
    const w = () => {
      r.refresh()
    }, v = e => {
      let i = t("#table").data("pctable");
      if (i.tableRow.id === e.tableRow.id && i.tableRow.cycle_id === e.tableRow.cycle_id && (i.editPanels || (i.editPanels = []), i.editPanels.push(this), this.mainPanelId = i.editPanels.length - 1), i !== e && (e.isPanel = !0, r.pcTable.model.refresh = () => {
        r.refresh()
      }), !e.control.editing && o.id) r.readOnly = !0, u = "viewRow"; else if (!e.control.adding && !o.id) return App.notify("Добавление в таблицу запрещено"), !1;
      return !0
    };
    return "object" != typeof r.pcTable ? App.getPcTableById(r.pcTable).then((function (e) {
      r.pcTable = e, e._refreshContentTable = w, r.checkRow({}, !0), r.editItem.id && e.model.setLoadedTableData({[r.editItem.id]: {}}), v(e)
    })) : r.pcTable[0] ? App.getPcTableById(r.pcTable[0], {sess_hash: r.pcTable[1]}).then((function (e) {
      r.pcTable[2] && e.model.setLoadedTableData(r.pcTable[2]), r.pcTable = e, e._refreshContentTable = w, v(e) && r.checkRow({}, !0)
    })) : v(i) && r.checkRow({}, !0), h.promise()
  }, function () {
    let i, n = !1;
    t.extend(App.pcTableMain.prototype, {
      switchContainerNideScroll: function (e) {
        let t = this;
        t.isAnonim || (i && clearTimeout(i), i = setTimeout(() => {
          e !== n && (e ? t._container.niceScroll({
            cursorwidth: 7,
            mousescrollstep: 90,
            scrollspeed: 50,
            autohidemode: !1,
            enablekeyboard: !1,
            cursoropacitymin: 1,
            railoffset: {left: -3},
            cursorcolor: "#e1e0df"
          }) : t._container.getNiceScroll().remove(), n = e)
        }, 100))
      }, addScrollsRules: function () {
        let e = this;
        this._innerContainer.append(this._table), e.isMobile || (this._innerContainer.on("scroll", (function () {
          "use strict";
          e._removeEditCell()
        })), e.withoutScrolls || t((function () {
          e.switchContainerNideScroll(!0)
        })))
      }, Scroll: function () {
        let i, n = this, a = {};
        a.table = void 0, a.topButton = void 0;
        let l = !1, s = 0, o = function () {
          let e = r();
          l != (l = a.getClusterNum(e)) && a.insertToDOM(l);
          let i = t("table.pcTable-table");
          i.find("thead").height() + i.offset().top - t("#table").offset().top <= 0 ? a.table ? a.table.css({top: parseInt(t("#table").offset().top) - parseInt(t(".innerContainer").offset().top)}) : function () {
            if (!a.table) {
              a.table = t('<table class="scroll-head-row">').appendTo(n._innerContainer), a.table.width(n.tableWidth), a.table.append(t("table.pcTable-table thead").clone(!0)).attr("class", t("table.pcTable-table").attr("class")), a.table.find("th:not(.id) div, th:not(.id) .btn").remove(), a.table.find('th.id .pcTable-filters button[data-action="checkbox"]').remove(), a.table.find("th").removeClass("with-filter");
              let e = t('<div class="btn btn-default btn-xxs "><i class="fa fa-arrow-up"></i></div>').on("click", (function () {
                n._container.scrollTop(n._container.find(".pcTable-rowsWrapper").offset().top - n.scrollWrapper.offset().top)
              }));
              if (a.table.find("th.id .pcTable-filters:first").append(e), a.table.find("th.n").length) {
                let e = n._innerContainer.find("th.n").find("i.fa-save").parent().clone(!0);
                a.table.find("th.n").append(t('<div class="pcTable-filters">').append(e))
              }
              n.isMobile || a.topButton || (a.topButton = t('<button class="scroll-top-button"><i class="fa fa-arrow-up"></i></button>').appendTo(n._innerContainer).on("click", (function () {
                n._container.scrollTop(n._container.find(".pcTable-rowsWrapper").offset().top - n.scrollWrapper.offset().top)
              })))
            }
            a.table.css({
              position: "absolute",
              top: parseInt(t("#table").offset().top) - parseInt(t(".innerContainer").offset().top)
            })
          }() : a.table && (a.table.remove(), a.table = void 0, a.topButton && (a.topButton.remove(), a.topButton = void 0), n._content.off("scroll"))
        }, r = function () {
          try {
            if (n.isAnonim) {
              let e = t(document).scrollTop() - n._content.offset().top;
              return e < 0 ? 0 : -e
            }
            return n._content.offset().top
          } catch (e) {
            return 0
          }
        };
        i = n.isAnonim ? t(document) : n._container, i.on("scroll", (function () {
          clearTimeout(s), s = setTimeout((function () {
            o.call(n)
          }), 50)
        }));
        let d = {top_offset: 0, bottom_offset: 0, rows: t()};
        return t.extend(a, {
          rows_in_block: 4, item_height: 35, emptyCache: function () {
            d = {}
          }, getClusterNum: function (e) {
            let t;
            return t = e >= 0 ? 0 : Math.floor(-e / this.block_height), Math.max(t, 0)
          }, reloadScrollHead: function () {
            a.table && (a.table.remove(), a.table = void 0), o.call(n)
          }, generate: function (e) {
            let t, i, a, l, s, o = n.dataSortedVisible, r = o.length;
            if (r < this.rows_in_block) return {top_offset: 0, bottom_offset: 0, rows: o};
            do {
              t = Math.max(this.rows_in_block * e, 0), i = t + this.rows_in_cluster + 3 * this.rows_in_block, a = Math.max(t * this.item_height, 0), l = Math.max((r - i) * this.item_height, 0), s = [];
              for (let e = t; e < i; e++) o[e] && s.push(o[e])
            } while (e > 0 && 0 === s.length && --e > -1);
            return {
              top_offset: a,
              conteinerHeight: n._content.height(),
              i_start: t,
              bottom_offset: l,
              cluster_num: e,
              rows: s
            }
          }, getRowsHeight: function () {
            0 !== n.dataSortedVisible.length && (this.block_height = this.item_height * this.rows_in_block, this.rows_in_cluster = Math.floor((e.innerHeight - n._container.offset().top) / this.item_height))
          }, insertToDOM: function (e, t, i) {
            if (n.isMobile) this.setHtml(n.dataSortedVisible, 0, 0, i); else {
              this.rows_in_cluster || this.getRowsHeight(), e || (e = this.getClusterNum(r()));
              let a = this.generate(e),
                l = a.rows.map(e => "object" == typeof e ? e.row ? e.row.id : e.id || e.v : e).join(",");
              (i || this.checkChanges("data", l, d)) && this.setHtml(a.rows, a.top_offset, a.bottom_offset, i), t && n._container.getNiceScroll && n._container.getNiceScroll().resize(), n._content.trigger("scrolled")
            }
          }, setHtml: function (e, i, a, l) {
            n._content.find(".editing").each((function (e) {
              n._removeEditing.call(n, e)
            }));
            let s = n._content.empty().get(0);
            if (i && s.appendChild(t('<tr style="height: ' + i + 'px;" class="loading-row"><td colspan="' + (n.fieldCategories.column.length + 1) + '"></td></tr>').get(0)), 0 === n.dataSorted.length) s.appendChild(n._createNoDataRow().get(0)); else if (0 === n.dataSortedVisible.length) s.appendChild(n._createNoDataRow("По условиям фильтрации не выбрана ни одна строка").get(0)); else for (let t in e) {
              let i = e[t];
              if ("object" != typeof i) {
                let e = n.data[i];
                e.$tr && !l || n._createRow.call(n, e), e.$tr.data("item", e), s.appendChild(e.$tr.get(0))
              } else s.appendChild(n._createTreeFolderRow.call(n, i).get(0))
            }
            a && s.appendChild(t('<tr style="height: ' + a + 'px;" class="loading-row"><td colspan="' + (n.fieldCategories.column.length + 1) + '"></td></tr>').get(0))
          }, checkChanges: function (e, t, i) {
            let n = t != i[e];
            return i[e] = t, n
          }
        }), a
      }
    })
  }(), t.extend(App.pcTableMain.prototype, {
    sort: function (e, t) {
      let i, n = this, a = e.name, l = "number" === e.type, s = n.data;
      if ((n.nSorted = "n" === e.name) || this._table.addClass("no-correct-n-filtered"), i = l ? function (e, i) {
        let n, l, o = s[e][a].v, r = s[i][a].v, d = 0;
        if (null === o) d = null === r ? 0 : -t; else if (null === r) d = t; else {
          try {
            n = Big(o)
          } catch (e) {
            n = Big(0)
          }
          try {
            l = Big(r)
          } catch (e) {
            l = Big(0)
          }
          d = n.gt(l) ? t : n.eq(l) ? 0 : -t
        }
        return d
      } : "select" === e.type ? function (i, n) {
        let l, o;
        const r = function (t) {
          let i;
          return s[t][a].v_ ? e.multiple ? (i = "", s[t][a].v_.forEach((function (e) {
            i += e[0]
          }))) : i = s[t][a].v_[0] : i = s[t][a].v, null === i && (i = ""), i
        };
        return l = r(i), o = r(n), l === o ? 0 : l > o ? t : -t
      } : function (e, i) {
        let n, l;
        return n = s[e][a].v + "", l = s[i][a].v + "", n > l ? t : n == l ? 0 : -t
      }, n.isTreeView) if ("tree" !== a && "self" !== n.fields.tree.treeViewType) {
        let e = [], t = [...n.dataSorted];
        n.dataSorted = [];
        const a = () => {
          e.length && (e = e.sort(i), n.dataSorted.push(...e), e = [])
        };
        t.forEach(t => {
          "object" == typeof t ? (a(), n.dataSorted.push(t)) : e.push(t)
        }), a()
      } else {
        let e = (e, i) => (a_ = n.treeIndex[e].t || "", b_ = n.treeIndex[i].t || "", a_ === b_ ? 0 : a_ > b_ ? t : -t);
        "tree" !== a && (e = (e, t) => i(n.treeIndex[e].row.id, n.treeIndex[t].row.id));
        const l = t => {
          let i = n.treeIndex[t];
          i.trees = i.trees.sort(e), i.trees.forEach(l)
        };
        n.treeSort = n.treeSort.sort(e), n.treeSort.forEach(l), n.treeApply()
      } else n.dataSorted = n.dataSorted.sort(i);
      n.dataSortedVisible = [];
      for (let e = 0; e < this.dataSorted.length; e++) {
        let t = this.dataSorted[e];
        if ("object" == typeof t) n.dataSortedVisible.push(t); else {
          let e = this.data[t];
          this.__applyFiltersToItem(e), e.$visible && n.dataSortedVisible.push(t)
        }
      }
      n._refreshContentTable()
    }
  }), App.pcTableMain.prototype.isSelected = function (e, t) {
    return !(!this.selectedCells || !this.selectedCells.ids[e] || -1 === this.selectedCells.ids[e].indexOf(t))
  }, App.pcTableMain.prototype.getSelectPanel = function (i, n, a) {
    let l = this, s = l.selectedCells;
    s.selectPanelDestroy();
    let o = t('<div id="selectPanel" class="text">'), r = t('<div class="column-name"></div>').text(i.title);
    i.unitType && r.append(", " + i.unitType), o.append(r), "text" === i.type && r.append(", " + i.textType), o.append(r);
    let d = "";
    if ("column" === i.category) {
      if (d = '<span class="id-val">[' + n.id + "]</span>", l.tableRow.main_field) {
        let e = l.mainFieldName;
        void 0 !== n[e].v_ ? "array" == typeof n[e].v_ ? n[e].v_.forEach((function (i, a) {
          let s = t("<span>").text(l.fields[e].getElementString(n[e].v ? n[e].v[a] : null, i));
          i[1] && s.addClass("deleted_value"), d += " " + s.html()
        })) : d += " " + t("<div>").text(l.fields[e].getElementString(n[e].v, n[e].v_)).html() : d += " " + t("<div>").text(n[e].v).html()
      }
      let e = t('<div class="row-name"></div>').html(d);
      o.append(e)
    }
    let c = n[i.name], f = t('<div id="selectPanelBig">'),
      p = t('<div class="field-value"><div class="copytext-wrapper"><div class="copytext"></div></div></div>').css("white-space", "pre-wrap");
    l.isMobile ? p.height("auto").css("min-height", 40) : p.height(200), f.append(p).appendTo(o);
    let h = p.find(".copytext");
    if (!i.unitType || null === c.v || "select" === i.type && i.multiple || h.attr("data-unit", i.unitType), c.f && (c.f.text && p.prepend(t('<div class="sp-element"><i class="fa fa-font"></i> </div>').append(c.f.text)), c.f.comment && p.prepend(t('<div class="sp-element"><i class="fa fa-info"></i> </div>').append(c.f.comment))), c.h && c.f && !1 !== c.f.showhand) if (void 0 !== c.c) {
      let e = c.c;
      c.c_ && (e = c.c_[0], c.c_[1] && (e = t('<span class="deleted_value">').text(e))), p.append(t('<div><i class="fa fa-hand-paper-o"></i> Расчетное значение: </div>').append(e))
    } else p.append('<div><i class="fa fa-hand-grab-o pull-left"></i> Cовпадает с расчетным</div>');
    let u, m = t('<div><div class="center"><i class="fa fa-spinner fa-spin"></i></div></div>');
    if (i.formatInPanel && (p.append(m), m.data("loadFormats", (function () {
      i.pcTable.model.getPanelFormats(i.name, n.id).then(e => {
        if (m.empty(), e.panelFormats) {
          let n;
          e.panelFormats.rows.forEach(n => {
            switch (n.type) {
              case"text":
                m.append(t('<div class="panel-text">').text(n.value));
                break;
              case"html":
                m.append(t('<div class="panel-html">').html(n.value));
                break;
              case"img":
                m.append(t('<div class="panel-img">').append(t("<img>").attr("src", "/fls/" + n.value + "_thumb.jpg?rand=" + Math.random())));
                break;
              case"buttons":
                if (n.value && n.value.forEach) {
                  let a = [];
                  n.value.forEach(n => {
                    let l = t('<button class="btn btn-default btn-xxs">').text(n.text);
                    a.push(l), n.color && l.css("color", n.color), n.background && l.css("background-color", n.background), l.on("click", (function () {
                      i.pcTable.selectedCells.empty(), i.pcTable.selectedCells.selectPanelDestroy(), i.pcTable.model.panelButtonsClick(e.panelFormats.hash, n.ind).then((function (e) {
                        n.refresh && i.pcTable.model.refresh(null, n.refresh)
                      }))
                    }))
                  }), m.append(t('<div class="panel-buttons">').append(a))
                }
            }
          }), e.panelFormats.hash && (n = setInterval(() => {
            o.closest("body").length || (clearInterval(n), i.pcTable.model.panelButtonsClear(e.panelFormats.hash))
          }, 1e3))
        }
      })
    }))), i.selectTable) if (i.changeSelectTable) {
      let e = t('<div><div class="center"></div></div>');
      if (i.multi) {
        if (c.v && c.v.length) {
          let a = t('<button class="btn btn-default btn-xxs"></button>').text("Редактировать").on("click", () => {
            i.sourceButtonClick(n)
          });
          e.append(t('<div class="panel-buttons">').append(a)).appendTo(p)
        }
      } else if (c.v && !c.v_[1]) {
        let a = t('<button class="btn btn-default btn-xxs"></button>').text("Редактировать").on("click", () => {
          i.sourceButtonClick(n).then(e => {
            e && e.json && e.json.updated && l.model.refresh()
          })
        });
        e.append(t('<div class="panel-buttons">').append(a)).appendTo(p)
      }
    } else if (i.viewSelectTable) {
      let e = t('<div><div class="center"></div></div>');
      if (i.multi) {
        if (c.v && c.v.length) {
          let a = t('<button class="btn btn-default btn-xxs"></button>').text("Просмотреть").on("click", () => {
            i.sourceButtonClick(n)
          });
          e.append(t('<div class="panel-buttons">').append(a)).appendTo(p)
        }
      } else if (c.v && !c.v_[1]) {
        let a = t('<button class="btn btn-default btn-xxs"></button>').text("Просмотреть").on("click", () => {
          i.sourceButtonClick(n).then(e => {
            e && e.json && e.json.updated && l.model.refresh()
          })
        });
        e.append(t('<div class="panel-buttons">').append(a)).appendTo(p)
      }
    }
    let b = t('<div class="buttons"></div>'), g = [];
    if (u = t('<button class="btn btn-sm btn-default copy_me" disabled data-copied-text="Скопировано" title="Копировать "><i class="fa fa-copy"></i></button>'), u.on("click", (function () {
      h.data("text") ? App.copyMe(h.data("text")) : App.copyMe(h.text());
      let e = t(this);
      return e.width(e.width()), e.button("copied"), setTimeout((function () {
        e.button("reset")
      }), 1e3), e.blur(), !1
    })), b.append(u), a.is(".edt") && (g.push({
      label: '<i class="fa fa-pencil-square-o"></i>', action: function (e) {
        e.close(), a.dblclick()
      }
    }), t('<button class="btn btn-sm btn-default"><i class="fa fa-pencil-square-o"></i></button>').on("click", (function () {
      return a.dblclick(), !1
    })).appendTo(b)), "column" === i.category && i.filterable && (l.isValInFilters.call(l, i.name, c) ? (g.push({
      label: '<i class="fa fa-filter" style="color: #ffe486"></i>',
      action: function (e) {
        s.selectPanelDestroy(), l.removeValueFromFilters.call(l, i.name, c), e.close()
      }
    }), t('<button class="btn btn-sm btn-warning" title="Удалить из фильтра"><i class="fa fa-filter"></i></button>').on("click", (function () {
      return s.selectPanelDestroy(), l.removeValueFromFilters.call(l, i.name, c), !1
    })).appendTo(b)) : (g.push({
      label: '<i class="fa fa-filter"></i>', action: function (e) {
        s.selectPanelDestroy(), l.addValueToFilters.call(l, i.name, c), l._container.scrollTop(l._filtersBlock.offset().top - l.scrollWrapper.offset().top), l.ScrollClasterized.insertToDOM.call(l.ScrollClasterized, 0), e.close()
      }
    }), t('<button class="btn btn-sm btn-default" title="Добавить в фильтр"><i class="fa fa-filter"></i></button>').on("click", (function () {
      return s.selectPanelDestroy(), l.addValueToFilters.call(l, i.name, c), l._container.scrollTop(l._filtersBlock.offset().top - l.scrollWrapper.offset().top), l.ScrollClasterized.insertToDOM.call(l.ScrollClasterized, 0), !1
    })).appendTo(b))), !l.isMobile) {
      let a = t('<button class="btn btn-sm btn-default"><i class="fa fa-expand" style="padding-top: 3px;" aria-hidden="true"></i></button>');
      a.on("click", (function () {
        f.find(".field-value").height(""), f.find(".panel-img img").each((e, i) => {
          (i = t(i)).attr("src", i.attr("src").replace("_thumb.jpg?", "?"))
        }), e.top.BootstrapDialog.show({
          message: f,
          type: null,
          title: r.text() + (d ? " / " + d : ""),
          cssClass: "fieldparams-edit-panel",
          draggable: !0,
          onshow: function (e) {
            e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({
              width: "90vw",
              minHeight: "90vh"
            }), s.selectPanelDestroy()
          },
          onshown: function (t) {
            t.$modalContent.position({
              my: "center top",
              at: "center top+30px",
              of: e.top
            }), f.find(".field-value div.codeEditor").trigger("panel-resize")
          }
        })
      })), b.append(a), "tmp" !== l.tableRow.type && i.logButton && (g.push({
        label: "Лог", action: function (e) {
          let t;
          l.mainFieldName && n.id && (t = n[l.mainFieldName].v), l.model.getFieldLog(i.name, n.id, t), e.close()
        }
      }), t('<button class="btn btn-sm btn-default" title="Лог ручных изменений по полю">Лог</button>').on("click", (function () {
        let e;
        l.mainFieldName && n.id && (e = n[l.mainFieldName].v), l.model.getFieldLog(i.name, n.id, e);
        let a = t(this).addClass("disabled");
        return setTimeout((function () {
          a.removeClass("disabled")
        }), 1e3), !1
      })).appendTo(b)), t('<button class="btn btn-sm btn-default" title="Закрыть панель"><i class="fa fa-times"></i></button>').on("click", (function () {
        return s.selectPanelDestroy(), !1
      })).appendTo(b)
    }
    let w = i.getPanelText(c.v, o, n);
    if ("select" === i.type) {
      let e = t('<div class="previews">').appendTo(p);
      i.loadPreviewPanel(e, i.name, n, c.v).then((function () {
        m.data("loadFormats") && m.data("loadFormats")()
      }))
    } else m.data("loadFormats") && m.data("loadFormats")();
    l.isCreatorView && -1 !== ["select", "tree", "date"].indexOf(i.type) && p.append(t('<div class="creator-select-val">' + JSON.stringify(c.v) + "</div>"));
    const v = function (e) {
      h.text(e), u.prop("disabled", !1)
    }, _ = function (e, t) {
      h.html(e), e.data("text") ? h.data("text", e.data("text")) : h.data("text", t), u.prop("disabled", !1)
    }, y = function (e) {
      if ("object" == typeof e && null !== e) if (e instanceof jQuery) {
        let i = "";
        e.copyText ? _(e, e.copyText) : (e.each((function () {
          "" !== i && (i += "\n"), i += t(this).text()
        })), "" === i && (i = e.text()), _(e, i))
      } else e.then ? e.then(y) : v(JSON.stringify(e)); else v(e)
    };
    if (y(w), l.isCreatorView) {
      let e;
      l.LOGS && (e = l.LOGS, n && n.id && (e = l.LOGS[n.id]), e && (e = e[i.name]));
      let a = t('<div style="padding-top: 10px">');
      if (e && e.c) {
        let i = t('<button class="btn btn-sm btn-danger"><i class="fa fa-info" style="padding-top: 3px;" aria-hidden="true"> c</i></button>');
        i.on("click", (function () {
          App.logOutput(e.c)
        })), a.append(i)
      }
      if (e && e.s) {
        let i = t('<button class="btn btn-sm btn-danger"><i class="fa fa-info" style="padding-top: 3px;" aria-hidden="true"> s</i></button>');
        i.on("click", (function () {
          App.logOutput(e.s)
        })), a.append(i)
      }
      if (e && e.a) {
        let i = t('<button class="btn btn-sm btn-danger"><i class="fa fa-info" style="padding-top: 3px;" aria-hidden="true"> a</i></button>');
        i.on("click", (function () {
          App.logOutput(e.a)
        })), a.append(i)
      }
      if (e && e.f) {
        let i = t('<button class="btn btn-sm btn-danger"><i class="fa fa-info" style="padding-top: 3px;" aria-hidden="true"> f</i></button>');
        i.on("click", (function () {
          App.logOutput(e.f)
        })), a.append(i)
      }
      a.children().length && b.append(a)
    }
    if (l.isMobile || o.append(b), c.e && p.append(t('<div style="padding-top: 5px;">').html(t("<span>").text(c.e).text().replace(/\[\[(.*?)\]\]/g, "<b>$1</b>"))), l.isMobile) App.mobilePanel(r, o, {buttons: g}); else {
      let e = "right", t = a.offset().left, i = l._container.offset().left, n = l._container.width(), s = a.width(),
        r = o.is(".text") ? 340 : 240;
      n - (t - i) - s < r && (e = "left", a.offset().left - i < r && (e = "bottom"));
      let d = {isParams: !0, $text: o, element: a, container: l._container, placement: e, trigger: "manual"};
      App.popNotify(d)
    }
    return t("body").on("click.selectPanelDestroy", (function (e) {
      0 === t(e.target).closest("#selectPanel").length && s.selectPanelDestroy()
    })).on("keyup.selectPanelDestroy", (function (e) {
      27 == e.which && s.selectPanelDestroy()
    })), a
  }, App.pcTableMain.prototype._addSelectable = function () {
    var i = this;
    i.selectedCells = {
      fieldName: null, ids: {}, notRowCell: null, times: null, lastSelected: null, notRowCellEmpty: function () {
        if (this.notRowCell) {
          this.notRowCell.removeClass("selected");
          let e = this.notRowCell.closest(".DataRow");
          1 === e.length && e.removeClass("selected"), this.notRowCell = null
        }
      }, empty: function () {
        this.notRowCellEmpty();
        let e = this;
        Object.keys(this.ids).forEach((function (t) {
          e.ids[t].forEach((function (e) {
            let t = i._getItemById(e);
            t && t.$tr && (t.$tr.find(".selected").removeClass("selected"), t.$tr.removeClass("selected"))
          }))
        })), this.ids = {}, this.lastSelected = null
      }, selectColumn: function (e) {
        i.dataSortedVisible.forEach(t => {
          "object" != typeof t ? this.add(t, e, !0) : t.row && this.add(t.row.id, e, !0)
        }), this.summarizer.check(), this.multiCheck()
      }, getEditedData: function (e, t) {
        let n = {}, a = !1;
        return Object.keys(i.selectedCells.ids).length > 1 && (a = !0), Object.keys(i.selectedCells.ids).forEach((function (l) {
          i.selectedCells.ids[l].forEach((function (s) {
            let o = i.data[s], r = o[l].f ? o[l].f.block : void 0;
            o.f.block && !1 !== r || r || !i.fields[l].editable || !i.fields[l].editGroup || a && !i.fields[l].editGroupMultiColumns || (n[s] || (n[s] = {}), n[s][l] = t ? o[l].v : e)
          }))
        })), n
      }, remove: function (e, t) {
        let n = this;
        if (!this.ids[t]) return;
        let a = {};
        this.ids[t].some((function (i, l) {
          if (i == e) return n.ids[t].splice(l, 1), 0 === n.ids[t].length && delete n.ids[t], a[e] = !0, !0
        })), Object.keys(a).forEach((function (e) {
          let t = !1;
          Object.keys(n.ids).some((function (i) {
            if (-1 !== n.ids[i].indexOf(parseInt(e))) return t = !0, !0
          })), t || i.data[e].$tr && i.data[e].$tr.removeClass("selected")
        }))
      }, add: function (e, t, n) {
        this.ids[t] || (this.ids[t] = []), this.ids[t].push(e), i.data[e].$tr && (i.data[e].$tr.addClass("selected"), n && i._getTdByFieldName(t, i.data[e].$tr).addClass("selected"))
      }, selectPanelDestroy: function () {
        let e = this;
        e.selectPanel && (e.selectPanel.attr("aria-describedby") && e.selectPanel.popover("destroy"), e.selectPanel = null), t("body").off(".selectPanelDestroy")
      }, checkIfShowPanel: function (e) {
        "use strict";
        if (this.selectPanelDestroy(), e) {
          let t, n = i._getFieldBytd(e);
          t = "column" === n.category ? i._getItemBytd(e) : i.data_params, this.selectPanel = i.getSelectPanel.call(i, n, t, e)
        }
        return !1
      }, copySepected: function (e, i) {
        let n = this, a = "", l = [], s = [], o = {}, r = [];
        Object.keys(n.selectedCells.ids).forEach((function (e) {
          let t = n.selectedCells.ids[e];
          l = l.concat(t), s.push(e), t.forEach((function (t) {
            o[t] || (o[t] = {});
            let i = n.fields[e].getCopyText.call(n.fields[e], n.data[t][e], n.data[t]);
            "object" == typeof i ? (r.push(i), i.done((function (i) {
              o[t][e] = i
            }))) : o[t][e] = i
          }))
        })), l = Array.from(new Set(l)), l = n.dataSortedVisible.filter(e => -1 !== l.findIndex(t => t == e)), s = Array.from(new Set(s));
        let d = [];
        n.fieldCategories.visibleColumns.forEach((function (e) {
          -1 !== s.indexOf(e.name) && d.push(e.name)
        })), s = d, e && (a += "id", s.forEach((function (e) {
          a += "\t", a += n.fields[e].title
        })));
        let c = i;
        t.when(...r).done((function () {
          l.forEach((function (t) {
            "" !== a && (a += "\n");
            let i = !0;
            e && (a += t, i = !1), s.forEach((function (e) {
              !0 === i ? i = !1 : a += "\t";
              let n = o[t][e];
              void 0 === n && (n = ""), "string" == typeof n && n.replace(/\t/g, "").match(/[\s"]/) && 1 !== s.length && (n = '"' + n.replace(/"/g, '""') + '"'), a += n
            }))
          })), App.copyMe(a), setTimeout(c, 400)
        }))
      }, click: function (e, n) {
        let a = i._table;
        return !e.closest("table").is(".pcTable-filtersTable") && (!0 === a.data("moved") ? (a.data("moved", !1), !1) : n.originalEvent && n.originalEvent.path && n.originalEvent.path[0] && t(n.originalEvent.path[0]).is(".asUrl") ? (i.actionOnClick(e), !1) : ((() => {
          if (e.is(".val")) {
            if (this.notRowCell && -1 !== this.notRowCell.index(e)) i.selectedCells.empty(); else {
              i.selectedCells.empty(), this.notRowCell = e, this.notRowCell.addClass("selected");
              let t = this.notRowCell.closest(".DataRow");
              1 === t.length && t.addClass("selected")
            }
            return void t("table.pcTable-table").removeClass("selected-multi").removeClass("selected-column")
          }
          this.notRowCellEmpty();
          let a = e.closest("tr"), l = i._getItemByTr(a), s = i._fieldByTd(e, a), o = s.name;
          if (n.altKey) e.is(".selected") ? (i.selectedCells.remove(l.id, o), e.removeClass("selected")) : (i.selectedCells.add(l.id, o), e.addClass("selected"), this.lastSelected = [o, l.id]); else if (n.shiftKey && Object.keys(i.selectedCells.ids).length) {
            let e = this, t = [], n = "before";
            i.dataSortedVisible.some((function (i) {
              if (i = "object" == typeof i && i.row ? i.row.id : parseInt(i), "before" === n) {
                if ((i === l.id || i === e.lastSelected[1]) && (n = "doIt", t.push(i), l.id === e.lastSelected[1])) return !0
              } else if ("doIt" === n && (t.push(i), i === l.id || i === e.lastSelected[1])) return !0
            })), n = "before";
            let a = function (n) {
              t.forEach((function (t) {
                let a = i.data[t];
                i.isSelected(n.name, t) || (e.add(t, n.name), a.$tr && i._getTdByFieldName(n.name, a.$tr).addClass("selected"))
              }))
            };
            i.fieldCategories.column.some((function (t) {
              if (t.showMeWidth > 0) if ("before" === n) {
                if ((t.name === o || t.name === e.lastSelected[0]) && (n = "doIt", a(t), o === e.lastSelected[0])) return !0
              } else if ("doIt" === n && (a(t), t.name === o || t.name === e.lastSelected[0])) return !0
            })), this.lastSelected = [o, l.id]
          } else {
            let t = i.isSelected(s.name, l.id);
            i.selectedCells.empty(), t || (i.selectedCells.add(l.id, o), e.addClass("selected"), this.lastSelected = [o, l.id])
          }
          i.selectedCells.multiCheck()
        })(), void this.summarizer.check()))
      }, multiCheck: () => {
        let e = Object.keys(i.selectedCells.ids);
        e.length > 1 ? t("table.pcTable-table").addClass("selected-multi") : 1 === e.length && Object.values(i.selectedCells.ids)[0].length > 1 ? t("table.pcTable-table").removeClass("selected-multi").addClass("selected-column") : t("table.pcTable-table").removeClass("selected-multi").removeClass("selected-column")
      }, summarizer: {
        timeout: null,
        element: t('<div class="summarizer"><span></span> : <span></span></div>'),
        status: 0,
        check: () => {
          if (i.isMobile) return;
          let e, t = Object.keys(i.selectedCells.ids);
          if (t.length) {
            let n = t.every(t => (e ? i.fields[t].dectimalPlaces && i.fields[t].dectimalPlaces > e.dectimalPlaces && (e = i.fields[t]) : e = i.fields[t], "number" === i.fields[t].type)),
              a = 0, l = 0;
            t.forEach(e => {
              i.selectedCells.ids[e].forEach(t => {
                a++, n && null !== i.data[t][e].v && (l += parseFloat(i.data[t][e].v))
              })
            });
            let s = i.selectedCells.summarizer.element.find("span");
            s[1].innerHTML = n ? e.numberFormat(l, e.dectimalPlaces || 0, ".") : "-", s[0].innerHTML = a, i.selectedCells.summarizer.status || (i.selectedCells.summarizer.status = 1, i.selectedCells.summarizer.timeout = setTimeout(() => {
              i.selectedCells.summarizer.element.appendTo(i._innerContainer)
            }, 1e3))
          } else i.selectedCells.summarizer.empty()
        },
        empty: () => {
          i.selectedCells.summarizer.status && (i.selectedCells.summarizer.status = 0, i.selectedCells.summarizer.timeout && clearTimeout(i.selectedCells.summarizer.timeout), i.selectedCells.summarizer.element.detach())
        }
      }
    }, this._container.on("contextmenu", ".DataRow td:not(.editing,.n,.id), td.val:not(.editing)", (function (e) {
      let n = t(this);
      return i.selectedCells.selectPanel && i.selectedCells.selectPanel.closest("td")[0] == n[0] ? i.selectedCells.selectPanelDestroy() : (i.selectedCells.selectPanelDestroy(), i.selectedCells.empty(), i.selectedCells.checkIfShowPanel(n), i.selectedCells.click(n, {})), !1
    })), this._container.on("click", ".DataRow td:not(.editing,.id,.n), td.val:not(.editing), .pcTable-buttons .cell-button", (function (n) {
      if ("file-image-preview" === n.target.className) {
        let t = JSON.parse(n.target.getAttribute("data-fileviewpreview"));
        e.top.BootstrapDialog.show({
          title: t.name,
          message: '<div class="file-image-big"><img src="/fls/' + t.file + '" style="max-width: 100%; max-height: 100%"/></div>',
          type: null,
          draggable: !0
        })
      } else {
        if ("file-pdf-preview" === n.target.className) return e.open(n.target.getAttribute("data-filename")), !1;
        {
          let e = t(this);
          if (e.is(".edt.val:not(.editing)") && "filter" === i._getFieldBytd(e).category) return void i._createEditCell.call(i, e, !0);
          if (e.is(".cell-button") && !e.find("button.button-field").is(":disabled")) {
            let t = i._getFieldBytd(e);
            return i._buttonClick.call(i, e, t), !1
          }
          e.data("clicked") ? e.removeData("clicked") : (e.data("clicked", 1), setTimeout((function () {
            e.data("clicked") && (e.removeData("clicked"), i.selectedCells.click(e, n))
          }), 200))
        }
      }
    })), this._container.on("click", "th.id .for-selected button", (function () {
      let e = t(this), n = e.html();
      e.text("Скопировано"), i.selectedCells.copySepected.call(i, e.data("names"), (function () {
        e.html(n)
      }))
    }))
  }, App.pcTableMain.prototype.filters = {}, App.pcTableMain.prototype.__getFilterButton = function (e) {
    var i = "btn-default";
    (this.filters[e] && this.filters[e].length || this.filters[e + "/h"]) && (i = "btn-warning");
    var n = t('<button class="btn btn-xxs btn-filter"><span class="fa fa-filter"></span></button>').addClass(i);
    return t('<span class="filter-in-head">').append(n)
  }, App.pcTableMain.prototype.filtersEmpty = function () {
    this.filters = {}, this._refreshHead(), this.__applyFilters()
  }, App.pcTableMain.prototype.sessionStorageFilters = {
    url: location.protocol + "//" + location.host + location.pathname,
    setFilters: function (e) {
      let t = {};
      e = e || {};
      try {
        t = JSON.parse(sessionStorage.getItem("pcTableFilters")) || {}
      } catch (e) {
      }
      t[this.url] = e, sessionStorage.setItem("pcTableFilters", JSON.stringify(t))
    },
    getFilters: function () {
      let e = {};
      try {
        e = JSON.parse(sessionStorage.getItem("pcTableFilters")), e = e[this.url] || {}
      } catch (e) {
      }
      return e
    }
  };
  let f = !0;
  App.pcTableMain.prototype.__applyFilters = function (e = !1) {
    let t = this;
    App.fullScreenProcesses.show(), this.filtersClearButton && ("tmp" !== t.tableRow.type && this.sessionStorageFilters.setFilters(this.filters), this.selectedCells && this.selectedCells.empty(), Object.equals(this.filters, {}) ? this.filtersClearButton.addClass("btn-default").removeClass("btn-warning").attr("disabled", !0) : (this.filtersClearButton.removeClass("btn-default").addClass("btn-warning").removeAttr("disabled"), f && (App.blink(t.filtersClearButton, 8, "#fff"), f = !1)));
    let i = [];
    this.isTreeView || (i = this.dataSortedVisible.slice());
    let n = [], a = [];
    if (this.isTreeView) if (this.filters && Object.keys(this.filters).length) {
      let e = [];
      this.dataSorted.forEach(t => {
        "object" != typeof t || t.opened || e.push(t)
      }), e.forEach(e => {
        this._expandTreeFolderRow(e, !0)
      });
      for (let e = 0; e < this.dataSorted.length; e++) {
        let t = this.dataSorted[e], i = t.row;
        if ("object" != typeof t && (i = this.data[t]), i && this.__applyFiltersToItem(i)) {
          let i, a = [], l = e - 1;
          for (; "object" != typeof this.dataSorted[l];) l--;
          for ("object" == typeof t ? i = t.p : (a.push(this.dataSorted[l]), i = this.dataSorted[l].p); i && l;) {
            for (; "object" != typeof this.dataSorted[l];) l--;
            this.dataSorted[l] === this.getElementInTree(i) && (a.push(this.dataSorted[l]), i = this.dataSorted[l].p), l--
          }
          for (; a.length;) n.push(a.pop());
          n.push(t)
        }
      }
    } else this.dataSorted.forEach(e => {
      n.push(e)
    }); else for (let e = 0; e < this.dataSorted.length; e++) {
      let t = this.dataSorted[e], i = this.data[t];
      this.__applyFiltersToItem(i), i.$visible && (n.push(t), a.push(t))
    }
    (this.isTreeView || e || JSON.stringify(i) !== JSON.stringify(a)) && (this.dataSortedVisible = n, this._refreshContentTable(!1, !0), this._headCellIdButtonsState()), this.selectedCells && this.selectedCells.summarizer.check(), App.fullScreenProcesses.hide()
  }, App.pcTableMain.prototype.__applyFiltersToItem = function (e) {
    let t = this, i = !0;
    for (let n in t.filters) {
      if (!t.filters[n] || 0 === t.filters[n].length) continue;
      let a = t.filters[n];
      if ("id" === n) -1 === a.indexOf(e.id.toString()) && (i = !1); else {
        let l = n.toString().split("/");
        if (n = l[0], !t.fields[n]) continue;
        switch (l[1] || "v") {
          case"v":
            let l = t._getFieldbyName(n);
            l.checkIsFiltered(e[n], a) ? l.checkIsFiltered(e[n], a) : i = !1;
            break;
          case"h":
            switch (a) {
              case"h":
                !0 !== e[n].h && (i = !1);
                break;
              case"n":
                !0 === e[n].h && (i = !1);
                break;
              case"hf":
                (!0 !== e[n].h || e[n].hasOwnProperty("c")) && (i = !1);
                break;
              case"hc":
                !0 === e[n].h && e[n].hasOwnProperty("c") || (i = !1)
            }
        }
      }
      if (!i) break
    }
    return (e.$visible = i) || this.row_actions_uncheck(e), e.$visible
  }, App.pcTableMain.prototype.addValueToFilters = function (e, t) {
    const i = this;
    i.filters[e] || (i.filters[e] = []);
    let n = i.fields[e];
    i.filters[e].push(...n.getFilterDataByValue.call(n, t)), n.$th && n.$th.find(".btn-filter").parent().replaceWith(i.__getFilterButton.call(i, e)), i.__applyFilters.call(i)
  }, App.pcTableMain.prototype.isValInFilters = function (e, t) {
    if (!this.filters[e]) return !1;
    let i = this.fields[e], n = i.getFilterDataByValue.call(i, t);
    return this.filters[e].some(e => -1 !== n.indexOf(e))
  }, App.pcTableMain.prototype.removeValueFromFilters = function (e, t) {
    const i = this;
    i.filters[e] || (i.filters[e] = []);
    let n = i.fields[e], a = n.getFilterDataByValue.call(n, t), l = 0, s = [...i.filters[e]];
    i.filters[e].forEach((e, t) => {
      -1 !== a.indexOf(e) && (s.splice(t - l, 1), l++)
    }), i.filters[e] = s, 0 === i.filters[e].length && delete i.filters[e], n.$th && n.$th.find(".btn-filter").parent().replaceWith(i.__getFilterButton.call(i, e)), i.__applyFilters.call(i)
  }, App.pcTableMain.prototype.loadFilters = function () {
    var e = {};
    "tmp" != this.tableRow.type && (e = this.sessionStorageFilters.getFilters()), this.filters = e || {}
  }, App.pcTableMain.prototype.__addFilterable = function () {
    const e = this;
    this.loadFilters(),
      /*!panelView*/
    this.viewType || this._header.on("click", ".pcTable-filters > span button.btn-filter:not(#checkS)", (function (i) {
      let n = t(this);
      if (n.attr("aria-describedby")) return !0;
      let a = n.closest("th"), l = a.is(".id") ? "id" : a.data("field"), s = t('<div class="filter-div-button">'),
        o = t('<select class="selectpicker" data-size="6" multiple title="Выберите значения" data-style="btn-sm btn-default" data-width="css-width" data-live-search="true" data-selected-text-format="count">').appendTo(s);
      const r = function () {
        try {
          n.popover("destroy")
        } catch (e) {
        }
      };
      let d, c = !1;
      const f = function (i) {
        if (d && clearTimeout(d), !c) {
          if ("filterRemove" === i) return c = !0, r(), delete e.filters[l], n.removeClass("btn-warning").addClass("btn-default"), void e.__applyFilters.call(e);
          if ("setInvertFilters" === i) {
            let e = Object.values(o.selectpicker("val")), i = [];
            t.each(o.data("options"), (function (t, n) {
              -1 === e.indexOf(n) && i.push(n)
            })), o.data("add-options", i)
          }
          d = setTimeout((function () {
            r(), o.data("add-options") ? (p = o.data("add-options"), o.data("add-options", null)) : p = o.selectpicker("val"), JSON.stringify(e.filters[l] || []) !== JSON.stringify(p) && (e.filters[l] = p, 0 === e.filters[l].length && delete e.filters[l], "id" !== l || n.closest(".pcTable-table").is(".pcTable-table:first") || e._header.find("th.id .btn-filter").parent().replaceWith(e.__getFilterButton.call(e, l)), n.parent().replaceWith(e.__getFilterButton.call(e, l)), e.__applyFilters.call(e))
          }), 10)
        }
      };
      s = t('<div class="pcTable-filter-select" style="height: 220px;">').append(s), o.data("container", s);
      var p = {};
      e.isTreeView ? Object.values(e.data).forEach((function (t) {
        "id" === l ? p[t.id.toString()] = t.id.toString() : e.fields[l].addDataToFilter(p, t[l])
      })) : Object.values(e.dataSorted).forEach((function (t) {
        "id" === l ? p[t.toString()] = t.toString() : e.fields[l].addDataToFilter(p, e.data[t][l])
      }));
      var h = {};
      t.each(p, (function (e, t) {
        h[t] = e
      })), h = App.ksort(h);
      let u = {}, m = e.filters[l] ? [...e.filters[l]] : [], b = 0;
      const g = function (e) {
        u = {"Выбранное": t('<optgroup label="Выбранное">'), "": t('<optgroup label="">')};
        let i = function () {
          return !0
        };
        if (e && "" !== e) {
          let t = e.toLowerCase().replace("ё", "е").split(" ");
          i = function (e) {
            let i = null !== e ? e.toString().toLowerCase().replace("ё", "е") : "";
            return !t.some((function (e) {
              return -1 === i.indexOf(e)
            }))
          }
        }
        let n = !1, a = 0;
        t.each(h, (function (e, t) {
          if ("null" === e && (e = "null "), -1 !== m.indexOf(t.toString())) {
            let n = i(e);
            u["Выбранное"].append('<option data-content="' + e + '" ' + (n ? "" : 'style="display: none"') + ">" + t + "</option>"), b += n ? 1 : 0
          } else {
            if (!i(e)) return !0;
            a >= 100 ? n = !0 : (u[""].append('<option data-content="' + e + ' ">' + t + "</option>"), a++)
          }
        })), o.empty(), b || u["Выбранное"].attr("label", ""), o.append(u["Выбранное"]), o.append(u[""]), n && o.append('<option data-content="Данные не полны. Пользуйтесь поиском" disabled = disabled style="text-align: center; cursor: pointer">0</option>'), o.data("options", h), o.selectpicker("val", m), o.selectpicker("refresh")
      };
      o.on("change.bs.select", (function () {
        m = o.val()
      })), g();
      let w = n.popover({
        html: !0,
        content: s,
        trigger: "manual",
        container: e._container,
        placement: "auto bottom",
        template: '<div class="popover" role="tooltip" style=""><div class="arrow" style="left: 50%;"></div><div class="popover-content" style=" padding: 3px 5px;"></div></div>'
      });
      o.selectpicker("render").selectpicker("toggle"), n.one("remove", () => {
        setTimeout(() => {
          let e;
          w && w.length && w.attr("aria-describedby") && (e = t("#" + w.attr("aria-describedby"))) && e.remove()
        }, 10)
      });
      let v = t('<div class="buttons" style="position: absolute; bottom: -10px; width: 100%; text-align: center">');
      if (t('<span class="btn btn-default btn-xxs button-ok" style="margin-right: 4px; margin-top: 3px;">Прим.</span></span>').appendTo(v).on("click", (function () {
        f("setSelectedFilters")
      })), t('<span class="btn btn-default btn-xxs button-ok" style="margin-right: 4px; margin-top: 3px;">Инверт.</span></span>').appendTo(v).on("click", (function () {
        f("setInvertFilters")
      })), t('<span class="btn btn-default btn-xxs button-ok" style="margin-right: 4px; margin-top: 3px">Отмен.</span>').appendTo(v).on("click", (function () {
        f("filterRemove")
      })), e.fields[l] && e.fields[l].code && !e.fields[l].codeOnlyInAdd) {
        let i = t('<select data-title="Все" data-dropup-auto="false" class="dropup" data-container=".popover" data-style="btn btn-xxs filter-by-hand ' + (e.filters[l + "/h"] ? "btn-warning" : "btn-default") + ' "><option value="">Все</option><option value="n">Без руки</option><option value="h">С рукой все</option><option value="hf">С рукой как в расчете</option><option value="hc">С рукой отличающиеся</option></select>').appendTo(v).on("change", (function () {
          return e.filters[l + "/h"] = i.selectpicker("val"), "" === e.filters[l + "/h"] && delete e.filters[l + "/h"], r(), n.parent().replaceWith(e.__getFilterButton.call(e, l)), e.__applyFilters.call(e), !1
        })).wrap('<span id="filterHand">');
        setTimeout((function () {
          i.selectpicker("render").selectpicker("val", e.filters[l + "/h"] || "");
          try {
            i.data("selectpicker").$menu.offset({bottom: 15, left: -90}).css("border", "1px solid grey")
          } catch (e) {
          }
        }), 100)
      }
      e.PageData && e.PageData.onPage && e.PageData.allCount > e.PageData.onPage ? (b ? s.height(260) : s.height(220), v.append('<div class="text-center ttm-paging-danges">Фильтрация по текущей странице</div>')) : b ? s.height(220) : s.height(200), v.appendTo(s), o.on("hidden.bs.select", (function () {
        f("setSelectedFilters")
      })), e.filters[l] && o.selectpicker("val", e.filters[l]), setTimeout((function () {
        if (w && w.length) {
          let i;
          w.popover("show"), s.on("mouseenter", "li", (function () {
            let e = t(this);
            e.attr("title") || e.attr("title", e.text())
          })), "id" === l && t("#" + n.attr("aria-describedby")).position({
            my: "left top",
            at: "left-3px bottom+10px",
            of: n
          }).find(".arrow").css("left", "12px"), o.data("selectpicker")._searchStyle = function () {
            return "multiincludes"
          }, o.data("selectpicker").$searchbox.focus(), o.data("selectpicker").$searchbox.off().on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", (function (e) {
            e.stopPropagation()
          })), o.data("selectpicker").$searchbox.on("keydown", (function (e) {
            if ("Escape" === e.key) return o.data("selectpicker").$button.click(), !0
          }));
          let a = "";
          o.data("selectpicker").$searchbox.on("keyup", (function (e) {
            let n = t(this).val();
            a !== n && (a = n, i && clearTimeout(i), i = setTimeout((function () {
              g(a)
            }), 750))
          })), e._container.on("click.filter filterPressed.filter", (function (i) {
            0 !== t(i.target).closest("#filterHand").length || "filterPressed" !== i.type && void 0 === i.altKey || !t("#" + n.attr("aria-describedby")).is(":visible") || (e._container.off(".filter"), f("setSelectedFilters"))
          })), e._innerContainer.one("scroll.filter", (function (i) {
            t("#" + n.attr("aria-describedby")).is(":visible") && (e._container.off(".filter"), f("setSelectedFilters"))
          }))
        }
      }), 50), e._container.trigger("filterPressed")
    }))
  }, t.extend(App.pcTableMain.prototype, {
    _addEditable: function () {
      var e = this;
      let i = this._container;
      e.actionOnClick = function (e, t) {
        let i = e.clone(!0).insertAfter(e);
        e.hide(), t = t || this._getFieldBytd(e), i.html('<span class="cell-value blocked" style="height: ' + i.height() + '">Выполняется</span>');
        let n = e.closest(".DataRow").length ? this._getItemBytd(e) : {};
        return this.model.dblClick(n.id, t.name).always(t => {
          i.remove(), e.show(), this.table_modify(t)
        }), !1
      };
      const n = (e, t) => {
        let i = e.clone(!0).insertAfter(e);
        e.hide(), i.html('<span class="cell-value blocked" style="height: ' + i.height() + '">' + t + "</span>"), setTimeout((function () {
          i.remove(), e.show()
        }), 500)
      };
      i.on("dblclick", "td.val:not(.editing), td.edt:not(.editing), .dataRows tr:not(.treeRow) td:not(.editing,.id,.n)", (function (i) {
        let a = t(this), l = a.closest("tr");
        if (l.length && l.is(".InsertRow")) return !1;
        if (a.is(".footer-name, .id, .footer-empty")) return !1;
        if (l.is(".DataRow") && e.isRestoreView) n(a, "Удалено"); else if (a.is(".edt")) e._createEditCell.call(e, a, !0); else {
          let t = e._getFieldBytd.call(e, a);
          if (t.CodeActionOnClick) e.actionOnClick(a, t); else {
            if (l.is(".DataRow") && "cycles" === e.tableRow.type) return e.model.dblClick(e._getItemBytd(a).id, e._getFieldBytd(a).name), !1;
            n(a, "Заблокировано")
          }
        }
      })).on("click", ".editCellsBlock .btn, td.edt .ttm-edit, td .ttm-panel", (function (e) {
        return t(this).is(".ttm-edit") ? (t(this).closest("td").trigger("dblclick"), !1) : t(this).is(".ttm-panel") ? (t(this).closest("td").trigger("contextmenu"), !1) : void t(this).data("click")(e)
      }))
    }, goToEditNextCell: function (e) {
      return next
    }, _buttonClick: function (i, n, a) {
      return i.data("clicked") ? Promise.resolve() : new Promise((l, s) => {
        const o = function () {
          "use strict";
          let s, o = {};
          i.parent();
          i.data("clicked", !0), "column" === n.category ? (a = a || r._getItemBytd(i), s = a.id, o.item = s, o.fieldName = n.name) : (a = a || r.data_params, o.item = "params", o.fieldName = n.name), o.checked_ids = r.row_actions_get_checkedIds(), i.height(i.height()), i.find(".cell-value, .ttm--panel-data").hide();
          let d = t('<div class="text-center"><i class="fa fa-spinner" style="color: #000"></i></div>');
          i.append(d), r._saving = !0, r.model.click(o).then((function (t) {
            r.table_modify.call(r, t), i.length && i.isAttached() ? (d.remove(), i.find(".cell-value, .ttm--panel-data").show()) : a = "column" === n.category ? r._getItemById(s) : r.data_params, n.uncheckAfterClick && r.row_actions_uncheck_all(), n.closeIframeAfterClick && e.closeMe ? e.closeMe() : n.openContextPanel && i.trigger("contextmenu"), n.btnOK.call(n, i, a), l(t)
          })).fail((function () {
            i.length && i.isAttached() && (d.remove(), i.find(".cell-value, .ttm--panel-data").show(), i.removeData("clicked"))
          })).always((function () {
            r._saving = !1
          }))
        };
        let r = this;
        if (n.warningEditPanel) {
          let e = {
            "Ок": function (e) {
              e.close(), o()
            }, "Отмена": function (e) {
              e.close()
            }
          };
          App.confirmation(n.warningEditText || "Точно изменить?", e, "Подтверждение")
        } else o()
      })
    }, _saveEdited: function (e, i, n) {
      let a = this;
      !0 !== a._saving && (a._saving = !0, this.model.save(i).then(t => {
        a.table_modify.call(a, t, void 0, e), n && n()
      }).always(() => {
        a._saving = !1, e.is("tr.DataRow") && 1 === e.closest("table").length && e.find(".editing").length ? e.each(() => {
          a.refreshRow(t(this))
        }) : e.is("td") && e.find(".fa-spinner").length && e.closest("body").length > 0 && e.each((function () {
          let e = t(this), i = a._getItemBytd(e), n = a._getFieldBytd(e), l = a._createCell(i, n);
          "button" === n.type && n.btnOK.call(n, l, i), e.replaceWith(l)
        }))
      }))
    }, _editFocusIndex: 0, _editItem: null, _editPanel: null, _row_edit: function (e) {
      let t = this;
      if (0 === e.length) return !1;
      let i = e.shift();
      new EditPanel(t, null, {id: i}, e.length > 0).then((function (i, n) {
        (i || n) && (i && t.table_modify.call(t, i), t._row_edit.call(t, e))
      })).then((function () {
        0 === e.length && t.row_actions_uncheck_all()
      }))
    }, _currentEditCellIndex: 0, _removeEditing: function (e) {
      e || (e = this._content.find("td.editing"));
      var t = this._createCell(this._getItemBytd(e), this._getFieldBytd(e));
      let i;
      return (i = e.attr("rowspan")) && t.attr("rowspan", i), (i = e.data("field")) && t.data("field", i), e.is(".val") && t.addClass("val"), e.replaceWith(t), t
    }, _saveEditCell: function () {
      this._editCell && this._editCell.isAttached() && this._editCell.is(".editCell") && this._editCell.data("SaveMe") && this._editCell.data("SaveMe")()
    }, _removeEditCell: function () {
      this._editCell && this._editCell.isAttached() && this._editCell.is(".editCell") && this._removeEditing(this._editCell), this._editCell = null
    }, _setEditCell: function (e) {
      this._saveEditCell(), this._editCell = e, e.addClass("editCell")
    }, _setTdSaving: function (e) {
      e.html('<div class="text-center"><i class="fa fa-spinner"></i></div>')
    }, _createEditCell: function (e, i, n) {
      let l = this, s = this._getFieldBytd(e);
      this._setEditCell(e);
      e.parent();
      let o = e.closest("tr"), r = l._getColumnIndexByTd(e, o), d = function (e) {
        if (!e) return !1;
        let t;
        switch (e) {
          case"right":
            for (t = l._getTdByColumnIndex.call(l, o, ++r); t.length;) {
              if (!0 === l._getFieldBytd.call(l, t).editable) {
                t.trigger("dblclick");
                break
              }
              t = t.next("td")
            }
            break;
          case"down":
            for (t = o.next("tr"); t.length && t.is(".Blocked");) t = t.next("tr");
            l._getTdByColumnIndex.call(l, t, r).trigger("dblclick")
        }
      };
      if (!s.editable) return !1;
      let c = (n = n || this._getItemBytd(e)).id, f = t('<div class="editCellsBlock">');
      e.addClass("editing");
      let p, h, u = n[s.name], m = !1, b = function (e, t, i, n) {
        let s = i || e.closest("td"), o = t || {};
        if (!s.length || !s.closest("body").length) return !1;
        var r = l._removeEditing.call(l, s);
        n || (l._colorizeElement(r, a), d(o && o.altKey ? "right" : !(!o || !o.shiftKey) && "down"))
      }, g = function (t) {
        l._removeEditing.call(l, e), d(t)
      };
      l.isSelected(s.name, n.id) ? Object.keys(l.selectedCells.ids).length > 1 ? (h = !0, p = !0) : l.selectedCells.ids[s.name].length > 1 && (p = !0) : l.selectedCells.empty();
      let w = function (t, i, a) {
        if (!a && s.warningEditPanel && s.checkEditRegExp.call(s, t)) return void App.confirmation(s.warningEditText || "Точно изменить?", {
          "ОК": function (e) {
            w(t, i, !0), e.close()
          }, "Отменить": function (e) {
            g(), e.close()
          }
        }, "Предупреждение при изменении");
        e.html('<div class="text-center"><i class="fa fa-spinner"></i></div>');
        let o = {};
        o[s.name] = t;
        let r = {};
        n.id ? r[n.id] = o : r.params = o, l._saveEdited.call(l, e, r, (function () {
          d(i && i.altKey ? "right" : !(!i || !i.shiftKey) && "down")
        }))
      }, v = function (e, t) {
        setTimeout((function () {
          if (m) return m = !1, !1;
          _(e, t)
        }), 150)
      }, _ = function (e, i, a) {
        if (m && !a) return !1;
        if (m = !0, !(a = a || !1) && p) return ("select" !== s.type || s.multiple) && l._removeEditCell(), !1;
        let o, r = e.closest("td");
        try {
          o = s.getEditVal(y)
        } catch (e) {
          return t("#" + App.popNotify(e, r, "default")).css("z-index", 1e3), void (m = !1)
        }
        let d = i && i.altKey ? "right" : !(!i || !i.shiftKey) && "down";
        !s.name in n || !s.isDataModified(o, n[s.name].v) ? g(d) : w(o, i)
      };
      var y = s.getEditElement(void 0, u, n, _, b, v, null, i);
      u.f && u.f.placeholder && s.addPlaceholder && s.addPlaceholder(y, u.f.placeholder), e.html(y), e.attr("data-fieldtype", s.type), e.data("SaveMe", (function (e) {
        _(y, e = e || {})
      })), e.data("input", y);
      var x = t('<div class="cdiv">').css({height: 0, width: "100%", position: "absolute", bottom: "0px"});
      e.append(x);
      var k = t('<button class="btn btn-sm btn-default" data-save="true" data-name="Сохранить"><i class="fa fa-save"></i></button>').data("click", (function (e) {
        m = !0, _(y, e, !0)
      }));
      f.append(k);
      k = t('<button class="btn btn-sm btn-default btn-empty-with-icon"><i class="fa fa-times"></i></button>').data("click", (function (e) {
        m = !0;
        let t = e.altKey ? "right" : !!e.shiftKey && "down";
        g(t)
      }));
      if (f.append(k), p && (h ? s.editGroupMultiColumns : s.editGroup)) {
        k = t('<button class="btn btn-sm btn-warning" data-save="true" data-name="Применить к выделенным"><i class="fa fa-database" title="Применить к выделенным"></i></button>');
        let i = function () {
          let t;
          m = !0;
          try {
            t = s.getEditVal(y)
          } catch (t) {
            return void App.popNotify(t, e, "default")
          }
          let i = l._container.find("td.selected");
          l._setTdSaving(i);
          let n = l.selectedCells.getEditedData(t);
          l._saveEdited.call(l, i, n, !1)
        };
        k.data("click", (function () {
          s.warningEditPanel ? App.confirmation(s.warningEditText, {
            "ОК": function (e) {
              i(), e.close()
            }, "Отменить": function (e) {
              g(), e.close()
            }
          }, "Предупреждение при изменении") : i()
        })), f.append(k), s.code && !s.codeOnlyInAdd && (Object.keys(l.selectedCells.ids).some(e => l.selectedCells.ids[e].some(t => !l.data[t][e].h)) && ((k = t('<button class="btn btn-sm btn-warning" data-name="Фиксировать выделенные"><i class="fa fa-hand-rock-o" title="Фиксировать"></i></button>')).data("click", (function () {
          m = !0;
          let e = l._container.find("td.selected");
          l._setTdSaving(e);
          let t = l.selectedCells.getEditedData(null, !0);
          l._saveEdited.call(l, e.closest("tr"), t, !1)
        })), f.append(k)), Object.keys(l.selectedCells.ids).some(e => l.selectedCells.ids[e].some(t => l.data[t][e].h)) && ((k = t('<button class="btn btn-sm btn-danger" data-name="Сбросить ручные"><i class="fa fa-eraser" title="Сбросить ручные"></i></button>')).data("click", (function () {
          m = !0;
          let e = l._container.find("td.selected");
          l._setTdSaving(e);
          let t = l.selectedCells.getEditedData("NULL");
          t.setValuesToDefaults = !0, l._saveEdited.call(l, e.closest("tr"), t, !1)
        })), f.append(k)))
      } else n[s.name] && 1 == n[s.name].h ? ((k = t('<button class="btn btn-sm btn-danger" data-name="Сбросить ручное"><i class="fa fa-eraser" title="Сбросить ручное"></i></button>')).data("click", (function () {
        m = !0, e.html('<div class="text-center"><i class="fa fa-spinner"></i></div>');
        let t = {};
        parseInt(c) || (c = "params"), t[c] = {}, t[c][s.name] = "NULL", t.setValuesToDefaults = !0, l._saveEdited.call(l, e, t, !1)
      })), f.append(k)) : s.code && !s.codeOnlyInAdd && "filter" !== s.category && ((k = t('<button class="btn btn-sm btn-default" data-name="Фиксировать"><i class="fa fa-hand-rock-o" title="Фиксировать"></i></button>')).data("click", (function () {
        m = !0, e.html('<div class="text-center"><i class="fa fa-spinner"></i></div>');
        let t = {};
        parseInt(c) || (c = "params"), t[c] = {}, t[c][s.name] = "params" === c ? l.data_params[s.name].v : l.data[c][s.name].v, l._saveEdited.call(l, e, t, !1)
      })), f.append(k));
      if (s.changeSelectTable && "select" === s.type) {
        let e = function () {
          m = !0, sourcePanelOpened = !0, setTimeout(() => {
            y.click()
          }, 3);
          let e = t(this).data("add-button");
          return s.sourceButtonClick(n, e).then(e => {
            let i = e && "insert" === e.method && e.json && e.json.chdata && e.json.chdata.rows, a = y;
            if (delete s.list, a.data("input").data("LISTs") && (a.data("input").data("LISTs").isListForLoad = !0), n = t.extend(!0, {}, n), i) {
              let t;
              t = s.selectTableBaseField ? e.json.chdata.rows[Object.keys(e.json.chdata.rows)[0]][s.selectTableBaseField].v : Object.keys(e.json.chdata.rows)[0], s.multiple ? (n[s.name].v = s.getEditVal(y), n[s.name].v.push(t)) : n[s.name].v = t
            } else s.selectTableBaseField && (s.multiple || (n[s.name].v = e.json.chdata.rows[Object.keys(e.json.chdata.rows)[0]][s.selectTableBaseField].v));
            i || "column" !== s.category || l.model.refresh((function (e) {
              l.table_modify.call(l, e)
            })), n[s.name].replaceViewValue = function (e) {
              "column" != s.category && (l.data_params[s.name].v_ = e)
            }, a.replaceWith(y = s.getEditElement(a, n[s.name], n, _, b, v)), m = !1
          }), !1
        };
        (k = t('<button class="btn btn-sm btn-primary"><i class="fa fa-edit" title="Изменить в таблице-источнике"></i></button>')).on("click", e), f.append(k), 2 === s.changeSelectTable && (k = t('<button class="btn btn-sm btn-primary" data-add-button="true"><i class="fa fa-plus" title="Добавить в таблицу-источник"></i></button>'), f.append(k), k.on("click", e))
      }
      let C = f.find("button").length;
      f.width(31 * C);
      let T = t("#" + App.popNotify({
        $text: f,
        element: x,
        container: this._container,
        isParams: !0,
        placement: "bottom"
      })), S = parseInt(T.css("top")) - 4;
      T.css("top", -1e7), setTimeout((function () {
        T.length && T.isAttached() && T.css("top", S)
      }), 3), s.focusElement(y)
    }
  }), function (e, t) {
    t.extend(App.pcTableMain.prototype, {
      _orderSaveBtn: void 0,
      row_actions_add: function () {
        let e = this;
        e._table.on("click", ".DataRow .id", (function () {
          e.isMobile && e.row_actions_panel_show.call(e, t(this))
        })), e._table.on("click", ".DataRow .id button.dropdown", (function () {
          e.row_dropdown.call(e, t(this))
        })), e._table.on("click", ".DataRow .id .btn.chbox", (function (i) {
          return e._row_actions_checkbox_click.call(e, t(this).closest("tr"), i.shiftKey), !1
        })), e._table.on("mouseleave", (function () {
          return t(this).blur(), !1
        })), e._table.on("click", ".DataRow .id button.edit", (function () {
          e.rows_edit(t(this).closest("tr"))
        })), e._container.on("click", ".row_delete, .row_restore, .row_duplicate, .row_refresh, .cycle_refresh", (function () {
          let i = t(this);
          i.is(".row_delete") ? e.rows_delete.call(e, t(this).data("tr")) : i.is(".row_restore") ? e.rows_restore.call(e, t(this).data("tr")) : i.is(".row_duplicate") ? e.row_duplicate.call(e, t(this).data("tr")) : i.is(".row_refresh") ? e.row_refresh.call(e, t(this).data("tr")) : i.is(".cycle_refresh") && e.isCreatorView && "cycles" === e.tableRow.type && e.cycle_refresh.call(e, t(this).data("tr"))
        }))
      },
      _idCheckButton: t('<button class="btn btn-xxs chbox btn-default" data-action="checkbox"><span class="fa fa-square-o"></span></button>'),
      _checkStatusBar: t('<div class="check-status-bar"><span class="check-mark">✓ </span><span data-name="count_checked_rows">0</span><span class="from-mark"> из </span><span data-name="count_visible_rows">0</span></div>'),
      _headCellIdButtonsState: function () {
        "use strict";
        let e = this;
        this.row_actions_get_checkedIds().length > 0 ? t("table.pcTable-table").addClass("with-checks") : t("table.pcTable-table").removeClass("with-checks"), this.dataSortedVisible.filter(e => "object" != typeof e || e.row).length !== this.__checkedRows.length ? e._idCheckButton.html('<span class="fa fa-square-o"></span>') : e._idCheckButton.html('<span class="fa fa-check"></span>'), this._refreshCheckedStatus(), e.ScrollClasterized.reloadScrollHead.call(e.ScrollClasterized)
      },
      _addCellId: function (e, i) {
        let n = t('<td class="id"><span class="nm">' + e.id + "</span></td>");
        return n.appendTo(i), this.row_actions_icons_add(n), !0 === e.$checked && this.row_actions_check(e, !0), n
      },
      _addCellNo: function (e, i) {
        let n = t('<td class="No">--</td>');
        return n.appendTo(i), n
      },
      row_actions_uncheck_all: function () {
        "use strict";
        let e = this, t = this.row_actions_get_checkedIds();
        for (let i = 0; i < t.length; i++) {
          let n = e._getItemById(t[i]);
          e.row_actions_uncheck.call(e, n, !0)
        }
        this.__checkedRows = [], this._headCellIdButtonsState()
      },
      _refreshCheckedStatus: function () {
        this._checkStatusBar.find('[data-name="count_checked_rows"]:first').text(this.__checkedRows.length), this._checkStatusBar.find('[data-name="count_visible_rows"]:first').text(this.dataSortedVisible.filter(e => "object" != typeof e || e.row).length)
      },
      _row_actions_checkbox_click: function (e, i) {
        let n = this, a = e.closest("tr"), l = this._getItemByTr(a), s = t.extend({}, n._lastcheckAction || {});
        if (n._lastcheckAction = {id: l.id, isCheck: !l.$checked}, i) {
          const e = e => t => {
            if ("object" != typeof t) return t.toString() === e.toString()
          };
          let t, i = [];
          if (s.id && !l.$checked === s.isCheck && -1 !== (t = n.dataSortedVisible.findIndex(e(s.id)))) {
            let a = n.dataSortedVisible.findIndex(e(l.id));
            i = t < a ? n.dataSortedVisible.slice(t + 1, a + 1) : n.dataSortedVisible.slice(a, t)
          } else n.dataSortedVisible.some((function (e) {
            if ("object" != typeof e && (n.data[e].$checked ? i = [] : i.push(e), e == l.id)) return !0
          }));
          l.$checked ? i.forEach((function (e) {
            "object" != typeof e && (n.__checkedRows.splice(n.__checkedRows.indexOf(e), 1), n.row_actions_uncheck(n.data[e], !0))
          })) : i.forEach((function (e) {
            "object" != typeof e && (n.__checkedRows.push(e), n.row_actions_check(n.data[e], !0))
          })), this._headCellIdButtonsState()
        } else l.$checked ? this.row_actions_uncheck(l) : this.row_actions_check(l)
      },
      row_actions_get_checkedIds: function () {
        return this.__checkedRows
      },
      row_actions_check: function (e, t, i) {
        if (e.$checked = !0, e.$tr) {
          e.$tr.find(".id:first").addClass("checked")
        }
        t || (i ? this.__checkedRows.unshift(e.id) : this.__checkedRows.push(e.id), this._headCellIdButtonsState())
      },
      row_actions_uncheck: function (e, t) {
        e.$checked && (e.$checked = !1, e.$tr && ($tdId = e.$tr.find(".id"), $tdId.removeClass("checked"), $tdId.find(".chbox i").attr("class", "fa fa-square-o")), t || (this.__checkedRows.splice(this.__checkedRows.indexOf(e.id), 1), this._headCellIdButtonsState()))
      },
      row_actions_icons_add: function (e) {
        "use strict";
        let i, n;
        i = this.tableRow.panel ? t('<button class="btn btn-default edit"><i class="fa fa-th-large"></i></button>').on("mouseleave", (function () {
          return t(this).blur(), !1
        })).css("margin-left", 2) : t(), this.control.editing && (n = t('<button class="btn btn-default btn-xxs dropdown"  tabindex="-1" style=" margin-left: 2px;"><i class="fa fa-caret-down" style="font-size: 10px; width: 7px;"></i></button>'));
        let a = t('<button class="btn btn-default btn-xxs chbox"><i class="fa fa-square-o"></i></button>'),
          l = t('<span class="btn-group-xxs">');
        e.append(l).append(" ").append(a), n && l.append(n), i && l.append(i)
      },
      getRemoveTitle: function (e) {
        switch (e) {
          case"forTimer":
            return "hide" === this.tableRow.deleting ? "Скрытие" : "Удаление";
          case"lower":
            return "hide" === this.tableRow.deleting ? "скрыть" : "удалить";
          default:
            return "hide" === this.tableRow.deleting ? "Скрыть" : "Удалить"
        }
      },
      row_actions_panel_show: function (e) {
        let i = e.closest("tr"), n = this._getItemByTr(i), a = n.id;
        const l = this;
        let s = t('<div id="row-mobile-panel"></div>');
        !0 !== this.tableRow.panel ? s.append(t('<div class="menu-item"><i class="fa fa-th-large"></i> Открыть панель</div>').css("color", "gray")) : s.append(t('<div class="menu-item row_panel"><i class="fa fa-th-large"></i> Открыть панель</div>').attr("data-tr", a)), !0 !== this.control.duplicating || this.f.blockduplicate || n.f.blockduplicate ? s.append(t('<div class="menu-item"><i class="fa fa-clone"></i> Дублировать</div>').css("color", "gray")) : s.append(t('<div class="menu-item row_duplicate"><i class="fa fa-clone"></i> Дублировать</div>').attr("data-tr", a)), -1 !== ["calcs", "globcalcs"].indexOf(this.tableRow.type) ? s.append(t('<div class="menu-item"><i class="fa fa-refresh"></i> Пересчитать</div>').css("color", "gray")) : s.append(t('<div class="menu-item row_refresh"><i class="fa fa-refresh"></i> Пересчитать</div>').attr("data-tr", a)), !this.control.deleting || this.f.blockdelete || n.f && (n.f.block || n.f.blockdelete) ? s.append(t('<div class="menu-item"><i class="fa fa-times"></i> ' + this.getRemoveTitle() + "</div>").css("color", "gray")) : s.append(t('<div class="menu-item row_delete"><i class="fa fa-times"></i> ' + this.getRemoveTitle() + "</div>").attr("data-tr", a));
        let o = App.mobilePanel(n[this.mainFieldName].v || "id: " + a, s);
        s.on("click", ".row_delete, .row_duplicate, .row_refresh, .row_panel", (function () {
          let e = t(this);
          e.is(".row_delete") ? l.rows_delete.call(l, a) : e.is(".row_duplicate") ? l.row_duplicate.call(l, a) : e.is(".row_refresh") ? l.row_refresh.call(l, a) : e.is(".row_panel") && l.rows_edit.call(l, i), o.close()
        }))
      },
      table_modify: function (e, i, n) {
        "use strict";
        let a = this, l = 0, s = 0, o = n ? n.data("field") : void 0;
        if (a.isPanel && e.chdata && delete e.chdata.params, i && (l = a.dataSorted.indexOf(i) + 1, s = a.dataSortedVisible.indexOf(i) + 1), e.chdata) {
          let n = e.chdata.deleted || [], r = [];
          if (e.chdata.rows) {
            if (e.refresh && e.chdata.rows && Object.keys(a.data).forEach((function (t) {
              void 0 === e.chdata.rows[t] && n.push(parseInt(t))
            })), e.chdata.tree) {
              let t = {};
              e.chdata.tree.forEach((e, i) => {
                this.getTreeBranch(e, i), t[e.v] = !0
              }), e.refresh && Object.keys(this.treeIndex).forEach(e => {
                e && !t[e] && (this.removeTreeBranch(e), this.treeRefresh = !0)
              })
            }
            if (t.each(e.chdata.rows, (function (e, t) {
              let i = a._getItemById(t.id);
              void 0 === i ? r.push(t) : a.refreshRow(i.$tr, i, t)
            })), r.length) {
              App.isEmpty(a.data) && a._content && a._content.find(".pcTable-noDataRow").remove();
              let n = [];
              t.each(r, (function (t, o) {
                if (o.$visible = !0, o.$checked = !1, l || !a.tableRow.with_order_field || a.tableRow.new_row_in_sort || (o.__inserted = !0), a.data[o.id] = o, a.isTreeView) a.placeInTree(o, null, !0), this.treeRefresh = !0; else {
                  let t = l, r = s;
                  !o.__after || i && i.id === o.__after ? "order" in e.chdata && n.push(o.id) : (t = a.dataSorted.indexOf(o.__after) + 1, r = a.dataSortedVisible.indexOf(o.__after) + 1), a.dataSorted.splice(t, 0, o.id), a.dataSortedVisible.splice(r, 0, o.id), l++, s++
                }
              })), i && !a.isMobile && setTimeout((function () {
                t.each(r, (function (e, t) {
                  a.row_actions_check(a.data[t.id])
                }))
              }), 50)
            }
            a.selectedCells && a.selectedCells.summarizer.check()
          }
          if (n.length && (t.each(n, (function (e, t) {
            a._deleteItemById.call(a, t)
          })), App.isEmpty(a.data) && a._content && 0 === a._content.find("." + this.noDataRowClass).length && a._content.append(a._createNoDataRow())), n.length || r.length || e.chdata.nsorted_ids && a.nSorted && !Object.equals(e.chdata.nsorted_ids, a.dataSorted)) {
            if (e.chdata.nsorted_ids && a.nSorted) {
              let t = a.dataSortedVisible;
              a.dataSorted = e.chdata.nsorted_ids, t.length === a.dataSorted.length ? a.dataSortedVisible = a.dataSorted : (a.dataSortedVisible = [], a.dataSorted.forEach((function (e) {
                -1 !== t.indexOf(e) && a.dataSortedVisible.push(e)
              })))
            }
            this._refreshContentTable(0, !1, !0), this._container.getNiceScroll().resize()
          }
          e.chdata.order && (this.dataSorted = e.chdata.order, a.dataSortedVisible = [], a.dataSorted.forEach(e => {
            this.data[e].$visible && a.dataSortedVisible.push(e)
          }), this._refreshContentTable(0, !1, !0));
          let d = {};
          if (e.chdata.params && t.each(e.chdata.params, (function (e, t) {
            ["v", "v_", "f", "e", "h", "c", "ch"].forEach((function (i) {
              a.data_params[e] && (void 0 !== t[i] || a.data_params[e][i]) && (Object.equals(a.data_params[e][i], t[i]) && e !== o || (d[e] = i, a.data_params[e][i] = t[i]))
            }))
          })), e.chdata.fields && t.each(e.chdata.fields, (function (e, i) {
            i.list && !Object.equals(a.fields[e].list, i.list) && (d[e] = !0, t.extend(a.fields[e], i))
          })), (e.chdata.params || e.chdata.fields) && (a._refreshParamsBlock(d, !0), a._refreshFootersBlock(d, !0), a.f && a.f.buttons && a.f.buttons.some && a.f.buttons.some(e => (a._rowsButtons(), !0))), e.chdata.f) {
            let t = e.chdata.f;
            ["blockadd", "buttons", "blockdelete", "blockorder", "background", "blockduplicate", "block", "tabletitle", "rowstitle", "fieldtitle", "tablecomment"].forEach((function (e) {
              if (e in t || e in a.f) if ("object" == typeof t[e]) {
                if (!Object.equals(t[e], a.f[e])) {
                  let i = Object.assign({}, a.f[e]);
                  a.f[e] = t[e], a.__formatFunctions[e] && a.__formatFunctions[e].call(a, t[e], i)
                }
              } else t[e] !== a.f[e] && (a.f[e] = t[e], a.__formatFunctions[e] && a.__formatFunctions[e].call(a, t[e]))
            })), a.applyOrder(e.chdata.f.order), a.applyHideRows(e.chdata.f.hideRows)
          }
          App.isEmpty(a.data) && a._content && a._content.empty().append(this._createNoDataRow()), this.treeRefresh && this.treeApply()
        }
        e.updated && (a.model.tableData.updated = JSON.parse(e.updated), a._refreshTitle()), a.isPanel || (e.filtersString && a._refreshFiltersBlock.call(a, e), a._headCellIdButtonsState(), a.ScrollClasterized.insertToDOM(null, !0))
      },
      applyOrder: function (e) {
        if (e && e.length) {
          let t = {}, i = [];
          this.dataSorted.forEach(n => {
            let a = e.indexOf(n);
            -1 !== a ? t[a] = n : i.push(n)
          }), this.dataSorted = [...Object.values(t), ...i], this.__applyFilters(!0)
        }
      },
      applyHideRows: function (e) {
        if (e && e.length) {
          let t = this.filters.id || [];
          t.length || (t = [...this.dataSorted]);
          let i = [];
          t.forEach(t => {
            -1 === e.indexOf(t) && i.push(t.toString())
          }), this.filters.id = i, this.__applyFilters(!0)
        }
      },
      rows_edit: function (e) {
        "use strict";
        let t = this, i = this.row_actions_get_checkedIds();
        if (e) {
          let n = t._getItemByTr(e).id, a = i.indexOf(n);
          -1 === a ? (this.row_actions_check(t._getItemByTr(e), !1, !0), i = this.row_actions_get_checkedIds()) : (i.splice(a, 1), i.unshift(n))
        }
        return t._row_edit.call(t, i.slice()), !1
      },
      row_dropdown: function (e) {
        "use strict";
        let i = t("<div>"), n = this._getItemByTr(e.closest("tr")), a = n.id;
        !0 !== this.control.duplicating || this.f.blockduplicate || n.f.blockduplicate ? i.append(t('<div class="menu-item"><i class="fa fa-clone"></i> Дублировать</div>').css("color", "gray")) : i.append(t('<div class="menu-item row_duplicate"><i class="fa fa-clone"></i> Дублировать</div>').attr("data-tr", a)), -1 !== ["calcs", "globcalcs"].indexOf(this.tableRow.type) ? i.append(t('<div class="menu-item"><i class="fa fa-refresh"></i> Пересчитать</div>').css("color", "gray")) : i.append(t('<div class="menu-item row_refresh"><i class="fa fa-refresh"></i> Пересчитать</div>').attr("data-tr", a)), this.isCreatorView && "cycles" === this.tableRow.type && i.append(t('<div class="menu-item cycle_refresh color-danger"><i class="fa fa-refresh"></i> Пересчитать цикл</div>').attr("data-tr", a)), this.isRestoreView ? i.append(t('<div class="menu-item row_restore"><i class="fa fa-recycle"></i> Восстановить</div>').attr("data-tr", a)) : !this.control.deleting || this.f.blockdelete || n.f && (n.f.block || n.f.blockdelete) ? i.append(t('<div class="menu-item"><i class="fa fa-times"></i> ' + this.getRemoveTitle() + "</div>").css("color", "gray")) : i.append(t('<div class="menu-item row_delete"><i class="fa fa-times"></i> ' + this.getRemoveTitle() + "</div>").attr("data-tr", a));
        let l = App.popNotify({
          isParams: !0,
          $text: i,
          element: e,
          container: this._container,
          trigger: "manual",
          placement: "bottom"
        });
        return t("#" + l).position({
          my: "left top",
          at: "left-3px bottom+10px",
          of: e
        }).off().on("mouseleave", (function () {
          i.remove()
        })).find(".arrow").css("left", "11px").end().find(".popover-content").css("padding", "5px"), !1
      },
      __getCheckedRowsIds: function (e, i, n) {
        "use strict";
        let a = this, l = this.row_actions_get_checkedIds();
        if (e && -1 === l.indexOf(e)) {
          let t = a.data[e];
          this.row_actions_check(t), l = this.row_actions_get_checkedIds()
        }
        if (i) {
          let e = !1;
          if (l.some((function (t) {
            if (a.data[t].f && (a.data[t].f.block || a.data[t].f[n])) return e = a.data[t], !0
          })), e) {
            let i = "";
            "id" !== a.mainFieldName && (i = e[a.mainFieldName]._v ? e[a.mainFieldName]._v : e[a.mainFieldName].v, i = ' "' + i + '"');
            let n = t("<span>").html("Строка <b>id " + e.id + "</b>");
            if ("" !== i) {
              let e = n.find("b");
              e.text(e.text() + i)
            }
            return n.append(" заблокирована"), App.notify(n, "Действие не выполнено"), !1
          }
        }
        return l
      },
      getRowTitle(e) {
        return "id" !== this.mainFieldName ? e[this.mainFieldName]._v ? e[this.mainFieldName]._v : e[this.mainFieldName].v : e.id
      },
      row_refresh: function (e) {
        "use strict";
        let t = this, i = this.__getCheckedRowsIds(e, !1), n = 1 === i.length ? i[0] : null;
        if (i && i.length) {
          let e = [{
            label: "Пересчитать", action: function (e) {
              t.model.refresh_rows(i).then((function (i) {
                t.table_modify.call(t, i), e.close(), t.row_actions_uncheck_all()
              }))
            }
          }, {
            label: "Отмена", action: function (e) {
              e.close()
            }
          }];
          BootstrapDialog.show({
            message: "Точно пересчитать " + i.length + " строк?",
            title: "Пересчет",
            buttons: e,
            onhidden: function () {
              1 === i.length && i[0] == n && t.row_actions_uncheck_all()
            },
            draggable: !0
          })
        }
      },
      cycle_refresh: function (e) {
        "use strict";
        let t = this, i = this.__getCheckedRowsIds(e, !1);
        if (i && i.length) {
          let e = [{
            label: "Пересчитать", action: function (e) {
              t.model.refresh_cycles(i).then((function (i) {
                t.table_modify.call(t, i), e.close(), t.row_actions_uncheck_all()
              }))
            }
          }, {
            label: "Отмена", action: function (e) {
              e.close()
            }
          }];
          BootstrapDialog.show({
            message: "Точно пересчитать " + i.length + " циклов?",
            title: "Пересчет",
            buttons: e,
            draggable: !0
          })
        }
      },
      row_duplicate: function (e) {
        "use strict";
        let i = this, n = this.__getCheckedRowsIds(e, !1);
        if (n && n.length) {
          let a = [{
            label: "Дублировать", cssClass: "btn-danger", action: function (a) {
              let l = {}, s = [], o = [];
              i.dataSortedVisible.forEach((function (e) {
                let t = parseInt(e);
                "object" == typeof e && e.row && (t = parseInt(e.row.id)), -1 !== n.indexOf(t) && o.push(t)
              }));
              const r = function (t) {
                i.model.duplicate(o, l, e).then((function (n) {
                  i.table_modify.call(i, n, e), t && t.close(), a.close(), i.row_actions_uncheck_all()
                }))
              };
              for (let e in i.fieldCategories.column) {
                let t = i.fieldCategories.column[e];
                "unic" === t.type && s.push(t.name)
              }
              if (s.length) {
                let e,
                  n = t('<table class="simpleTable"><thead><tr><td class="id">id</td></tr></thead><tbody></tbody></table>'),
                  d = n.find("thead tr"), c = n.find("tbody");
                "id" !== i.mainFieldName && (e = i.fields[i.mainFieldName], "unic" !== e.type ? d.append(t("<td></td>").text(e.title)) : e = null);
                for (let e in s) {
                  let n = i.fields[s[e]];
                  d.append(t("<td></td>").text(n.title))
                }
                for (let n in o) {
                  let a = o[n], r = i.data[a], d = t("<tr>");
                  l[a] = {}, d.append(t('<td class="id"></td>').text(a)), e && d.append(t("<td></td>").text(r[e.name].v));
                  for (let e in s) {
                    let n, o = i.fields[s[e]], c = t('<td class="input"></td>'), f = t("<input>").val(r[o.name].v);
                    l[a][o.name] = r[o.name].v, f.on("keyup", (function () {
                      let e = t(this).val();
                      l[a][o.name] = e, n && (clearTimeout(n), n = null), "" !== e ? n = setTimeout((function () {
                        i.model.checkUnic(o.name, e).then((function (e) {
                          e.ok ? c.addClass("ok") : c.removeClass("ok")
                        }))
                      }), 300) : o.required ? c.removeClass("ok") : c.addClass("ok")
                    })), c.html(f), d.append(c)
                  }
                  c.append(d)
                }
                let f = [{
                  label: "Дублировать", cssClass: "btn-m btn-warning", action: function (e) {
                    r(e)
                  }
                }, {
                  label: "Отмена", action: function (e) {
                    e.close(), a.close()
                  }
                }];
                BootstrapDialog.show({
                  message: n,
                  title: "Заполните значения для уникальных полей",
                  buttons: f,
                  draggable: !0
                })
              } else r()
            }
          }, {
            label: "Отмена", action: function (e) {
              e.close()
            }
          }];
          BootstrapDialog.show({
            message: "Точно дублировать " + n.length + " строк?",
            title: "Дублирование",
            buttons: a,
            draggable: !0
          })
        }
      },
      rows_delete: function (e) {
        let t = this, i = this.__getCheckedRowsIds(e, !0, "blockdelete"), n = 1 === i.length ? i[0] : null;
        if (i && i.length) {
          let e = "Точно " + this.getRemoveTitle("lower") + " " + i.length + " строк?",
            a = this.getRemoveTitle("forTimer") + " " + i.length + " строк?";
          if (1 == i.length) {
            let n = "id-" + i[0];
            "id" != t.mainFieldName && (n = t.data[i[0]][t.mainFieldName], n = "id-" + i[0] + ' "' + (n.v_ && n.v_[0] ? n.v_[0] : n.v) + '"'), e = "Точно " + this.getRemoveTitle("lower") + " строку " + n + "?", a = this.getRemoveTitle("forTimer") + " строки " + n + "?"
          }
          let l = [{
            label: this.getRemoveTitle(), cssClass: "btn-danger", action: function (e) {
              e.close();
              const n = function () {
                t.model.delete(i).then((function (e) {
                  t.table_modify.call(t, e)
                }))
              };
              t.tableRow.delete_timer > 0 ? App.panelTimer(a, t.tableRow.delete_timer, n) : n()
            }
          }, {
            label: "Отмена", action: function (e) {
              e.close()
            }
          }];
          BootstrapDialog.show({
            message: e, title: this.getRemoveTitle("forTimer"), buttons: l, onhidden: function () {
              1 === i.length && i[0] == n && t.row_actions_uncheck_all()
            }, draggable: !0
          })
        }
      },
      rows_restore: function (e) {
        let t = this, i = this.__getCheckedRowsIds(e), n = 1 === i.length ? i[0] : null;
        if (i && i.length) {
          let e = "Точно восстановить " + i.length + " строк?";
          if (1 == i.length) {
            let n = "id-" + i[0];
            "id" != t.mainFieldName && (n = t.data[i[0]][t.mainFieldName], n = "id-" + i[0] + ' "' + (n.v_ && n.v_[0] ? n.v_[0] : n.v) + '"'), e = "Точно восстановить строку " + n + "?"
          }
          let a = [{
            label: "Восстановить", cssClass: "btn-danger", action: function (e) {
              e.close(), t.model.restore(i).then((function (e) {
                t.table_modify.call(t, e)
              }))
            }
          }, {
            label: "Отмена", action: function (e) {
              e.close()
            }
          }];
          BootstrapDialog.show({
            message: e, title: "Восстановление", buttons: a, onhidden: function () {
              1 === i.length && i[0] == n && t.row_actions_uncheck_all()
            }, draggable: !0
          })
        }
      }
    })
  }(0, jQuery), t.extend(App.pcTableMain.prototype, {
    _insertItem: null,
    _insertRow: null,
    _insertRowActive: !1,
    _insertButtons: null,
    _insertRowHash: null,
    _addButtons: null,
    _insertError: {},
    _currentInsertCellIndex: 0,
    isInsertable: function () {
      return this.control.adding && !this.f.blockadd && !this.isRestoreView
    },
    _addInsert: function (e) {
      this.control.adding && (this._insertRow && this._insertRow.length || (this._insertRow = this._createInsertRow(null, 0, e), this._insertRowActive = !0, this._insertButtonsChangeStatuses(), this._beforebody.prepend(this._insertRow), this._table.addClass("with-adding-row")))
    },
    _insertButtonsChangeStatuses: function () {
      this._insertRow ? (this._insertButtons && this._insertButtons.find('[data-action="add"]').removeClass("btn-warning").addClass("btn-default").attr("disabled", "disabled"), 0 === this.dataSortedVisible.length && this._table.find(".pcTable-noDataRow button").removeClass("btn-warning").addClass("btn-default").attr("disabled", "disabled")) : (this._insertButtons && this._insertButtons.find('[data-action="add"]').addClass("btn-warning").removeClass("btn-default").removeAttr("disabled"), 0 === this.dataSortedVisible.length && this._table.find(".pcTable-noDataRow button").addClass("btn-warning").removeClass("btn-default").removeAttr("disabled"))
    },
    _InsertAddInsertBtnsPanel: function (e) {
      let i, n = this, a = {
        '<span id="saveInsertRow">Сохранить</span>': function () {
          i.is(".onSaving") || (i.addClass("onSaving"), n.__insertRowActions("saveInsertRow", (function () {
            n._saveInsertRow("close").always((function () {
              i.removeClass("onSaving")
            }))
          })))
        }, '<i class="fa fa-save"></i>': function () {
          i.is(".onSaving") || (i.addClass("onSaving"), n.__insertRowActions("saveInsertRow", (function () {
            n._saveInsertRow.call(n).always((function () {
              i.removeClass("onSaving")
            }))
          })))
        }, '<i class="fa fa-paste"></i>': function () {
          i.is(".onSaving") || (i.addClass("onSaving"), n.__insertRowActions("saveInsertRow", (function () {
            n._saveInsertRow.call(n, "notClean").always((function () {
              i.removeClass("onSaving")
            }))
          })))
        }, '<i class="fa fa-times"></i>': function () {
          n._closeInsertRow.call(n, t(this).closest("#" + s))
        }
      };
      i = this._addRowPanel(s, e, a), this._addButtons = i.find("button:not(:last)")
    },
    __insertRowActionsStack: [],
    __insertRowActions: function (e, t) {
      "use strict";
      let i = this;
      -1 !== ["saveInsertRow", "clickSourceButton"].indexOf(e) && setTimeout((function () {
        i.model.getDefferedProcess().then(t)
      }), 450)
    },
    _saveInsertRow: function (e) {
      let i = this, n = t.Deferred();
      if (Object.keys(i._insertError).length) {
        let e = Object.keys(i._insertError)[0], a = i._insertError[e];
        App.notify(a, t("<div>Ошибка в поле </div>").append(t("<span>").text(i.fields[e].title || i.fields[e].name))), i._currentInsertCellIndex = i.fieldCategories.visibleColumns.findIndex((function (t) {
          if (t.name === e) return !0
        })), i._insertFocusIt(), n.reject()
      } else {
        let t = function () {
          i._insertRowActive = !1, i.model.add(i._insertRowHash).then((function (t) {
            switch (i.table_modify.call(i, t), i._insertRowHash = null, i._insertRowActive = !0, i._currentInsertCellIndex = 0, e) {
              case"notClean":
                let e = {};
                Object.keys(i._insertItem).forEach(t => {
                  "object" == typeof i._insertItem[t] && "v" in i._insertItem[t] && (e[t] = i._insertItem[t].v)
                }), i._createInsertRow(i._insertRow, !0, e);
                break;
              case"close":
                i._closeInsertRow();
                break;
              default:
                i._insertItem = null, i._insertRow.html('<td class="id"></td>'), i._createInsertRow(i._insertRow, 0)
            }
          })).always((function () {
            n.resolve()
          })).fail(() => {
            i._insertRowActive = !0
          })
        };
        i.model.doAfterProcesses(t)
      }
      return n.promise()
    },
    _addInsertRow: function () {
      let t = this;
      "cycles" === this.tableRow.type ? t.model.add({}).then((function (i) {
        i.firstTableId ? e.location.href = e.location.pathname + "/" + i.chdata.rows[0].id + "/" + i.firstTableId : t.table_modify(i)
      })) : t.isMobile ? t._addInsertWithPanel() : t._addInsert()
    },
    _getInsertButtons: function () {
      let i, n, a = this;
      return "cycles" === this.tableRow.type ? n = i = function () {
        a.model.add({}).then((function (t) {
          t.firstTableId ? e.location.href = e.location.pathname + "/" + t.chdata.rows[0].id + "/" + t.firstTableId : a.table_modify(t)
        }))
      } : (i = function () {
        a.isMobile ? a._addInsertWithPanel() : a._addInsert()
      }, n = function () {
        a._addInsertWithPanel()
      }), this._insertButtons = t("<span>"), "panels" === this.viewType || this.isRotatedView || this.isTreeView ? t('<button data-action="add" class="btn btn-sm btn-warning">Добавить</button>').width(80).on("click", n).appendTo(this._insertButtons) : (2 !== this.tableRow.id && t('<button data-action="add" class="btn btn-sm btn-warning">Добавить</button>').width(80).on("click", i).appendTo(this._insertButtons), !a.isMobile && this.tableRow.panel && t('<button class="btn btn-warning btn-sm"><i class="fa fa-th-large"></i></button>').on("click", n).appendTo(this._insertButtons).css("margin-left", 5)), this._insertButtons
    },
    _addInsertWithPanel: function (e) {
      let t = this;
      new EditPanel(t, null, e || {}).then((function (e) {
        e && t.table_modify.call(t, e)
      }))
    },
    _closeInsertRow: function () {
      this._insertPanel ? this._insertPanel = null : this._insertRow && (this._insertRow.find("td").each((function () {
        t(this).remove()
      })), this._insertRow.remove(), this._insertRow = null, this._insertRowHash = null, this._insertRowActive = !1), this._insertItem = null, this._insertButtonsChangeStatuses(), this._currentInsertCellIndex = 0, this._table.removeClass("with-adding-row")
    },
    _createInsertRow: function (e, i, n) {
      var a = this, s = a._insertItem || (a._insertItem = {});
      e || (this.insertRow = e = t('<tr class="InsertRow" style="height: 35px;"><td class="id"></td></tr>').on("click focus", "input,button,select", (function (e) {
        let i = t(this), n = a._insertRow.find(".active");
        n.length && ("click" !== e.type || i.is('[type="checkbox"]') || n === t(this).closest("td")) || (n.removeClass("active"), a._currentInsertCellIndex = t(this).closest("td").data("index"), t(this).closest("td").addClass("active"))
      })), this._InsertAddInsertBtnsPanel(e), this.insertRow.editedFields = {}), a._currentInsertCellIndex || (a._currentInsertCellIndex = 0);
      let o = {};
      n && (o = "object" == typeof n ? n : {[n]: a._insertItem[n].v});
      let r = [];
      return a.fieldCategories.visibleColumns.forEach((function (e) {
        r.push(e.name)
      })), a.model.checkInsertRow(o, a._insertRowHash, this.insertRow.clearField).then((function (i) {
        a.insertRow.clearField = null, a._insertRowHash = a._insertRowHash || i.hash, s = i.row;
        let o = 2;
        t.each(a.fieldCategories.column, (function (i, d) {
          if (!d.showMeWidth) return void (a._insertItem[d.name] = s[d.name]);
          let c = r.indexOf(d.name);
          var f = e.find("td:eq(" + (c + 1) + ")");
          let p = t.extend(!0, {}, a._insertItem[d.name]), h = a._insertItem[d.name] && a._insertItem[d.name].force;
          if (a._insertItem[d.name] = s[d.name], f.length) {
            let t = "n" === d.name || a._insertItem[d.name].f && !0 === a._insertItem[d.name].f.block;
            if (f.data("input") && !t) {
              d.name;
              let t = !1;
              t = !h && (null === s[d.name].v && "" == p.v || Object.equals(s[d.name].v, p.v) && !d.codeSelectIndividual), (void 0 === p || !t || "data_src" == d.name || "comments" == d.type || d.code && !d.codeOnlyInAdd) && (a._createInsertCell.call(a, f, d, e, c, "td", a._createInsertRow), n === d.name && a._colorizeElement(f, l))
            } else f.replaceWith(a._createInsertCell.call(a, null, d, e, c, "td", a._createInsertRow))
          } else e.append(f = a._createInsertCell.call(a, null, d, e, c, "td", a._createInsertRow));
          f.data("input") && f.data("input").attr("tabindex", o++)
        })), a._addButtons.each((function (e, i) {
          t(i).attr("tabindex", o++)
        })), a._insertFocusIt.call(a)
      })), e
    },
    _createInsertCell: function (i, n, l, s, o, r) {
      o = o || "td", (i = i || t("<" + o + ">")).data("index", s);
      var d = this;
      n.code && i.addClass("with-code"), void 0 === d._insertItem[n.name] && (d._insertItem[n.name] = null);
      let c = d._insertItem[n.name] && d._insertItem[n.name].f || {};
      if (!n.insertable || !0 === c.block) {
        let e = d._insertItem[n.name];
        if (e && (e = e.v), i.empty().append(t('<span class="cell-value">').html(c.text ? c.text : n.getCellText(e, i, d._insertItem))), c.comment) {
          let e = t('<i class="fa fa-info pull-right" style="padding: 3px;">');
          e.attr("title", c.comment), i.prepend(e)
        } else if (c.icon && "button" !== n.type) {
          let e = t('<i class="fa fa-' + c.icon + ' pull-right" style="padding: 3px;">');
          i.prepend(e)
        }
        return (c.icon || c.text || c.comment) && i.on("click", () => {
          let a = t("<div>"), l = t("<div>").text(e).appendTo(a);
          if (c.icon) {
            let e = t('<i class="fa fa-' + c.icon + '" style="padding: 3px;">');
            l.prepend(e)
          }
          if (c.text) {
            let e = t('<div><i class="fa fa-font" style="padding: 3px;"> </div>');
            e.append(c.text), a.append(e)
          }
          if (c.comment) {
            let e = t('<div><i class="fa fa-info" style="padding: 3px;"> </div>');
            e.append(c.comment), a.append(e)
          }
          if (!d.isMobile) {
            let e = "right", n = a.offset().left, l = d._container.offset().left;
            d._container.width() - (n - l) - a.width() < (a.is(".text") ? 340 : 240) && (e = "left");
            let s = {isParams: !0, $text: a, element: i, container: d._container, placement: e, trigger: "manual"};
            App.popNotify(s);
            let o = "keyup.insertPanelDestroy", r = "click.insertPanelDestroy";
            const c = function () {
              t("body").off(".selectPanelDestroy"), i.popover("destroy")
            };
            return t("body").on(r, (function (e) {
              0 === t(e.target).closest("#selectPanel").length && c()
            })).on(o, (function (e) {
              27 == e.which && c()
            })), !1
          }
          App.mobilePanel(n.title, a)
        }), i
      }
      n.help && i.on("focus", "input,button,select", (function (e) {
        let i = d._table.find("thead th #field-help-" + n.name), a = t(e.target);
        setTimeout((function () {
          i.trigger("open"), a.one("blur remove", (function () {
            i.trigger("close")
          }))
        }), 120)
      }));
      var f = function (e) {
        var t;
        try {
          t = n.getEditVal(e), delete d._insertError[n.name], m.removeClass("error")
        } catch (e) {
          return m.addClass("error"), d._insertError[n.name] = e, null
        }
        return t
      }, p = function (e, t, a) {
        var c = f(e);
        d._currentInsertCellIndex = s + 1, null === c || a ? (r.call(d, l, d._currentInsertCellIndex, n.name), d._insertFocusIt.call(d)) : n.isDataModified(c, d._insertItem[n.name].v) ? (d.insertRow.editedFields[n.name] = !0, d._insertItem[n.name].v = c, !0 === n.isPanelField && d._createInsertCell.call(d, i, n, l, s, o, r), r.call(d, l, d._currentInsertCellIndex, n.name)) : d._insertFocusIt.call(d)
      }, h = function (e, t, i, a) {
        a && (d._currentInsertCellIndex = s + (-1 === a ? -1 : 1), d._insertFocusIt.call(d)), setTimeout((function () {
          if (!e) return;
          let t = e.closest("td");
          if (!t.length || !t.closest("tr").length) return !1;
          let i = f(e);
          n.isDataModified(i, d._insertItem[n.name].v) && (d._currentInsertCellIndex = s + 1, d.insertRow.editedFields[n.name] = !0, d._insertItem[n.name].v = i, !0 === n.isPanelField && d._createInsertCell.call(d, t, n, l, s, o, r), r.call(d, l, d._currentInsertCellIndex, n.name))
        }), 150)
      }, u = function (e, t) {
        let i = e.closest("td");
        if (!i.length || !i.closest("tr").length) return !1;
        let c = f(e), p = d._insertItem[n.name].v + "";
        n.isDataModified(c, p) && (d._createInsertCell(i, n, l, s, o, r), d._colorizeElement(i, a)), d._currentInsertCellIndex = s + 1, d._insertFocusIt.call(d)
      };
      let m = n.getEditElement(i.data("input"), d._insertItem[n.name], d._insertItem, p, u, h);
      if (c && c.placeholder && n.addPlaceholder && n.addPlaceholder(m, c.placeholder), m.isAttached() || i.html(m).data("input", m), n.code && !n.codeOnlyInAdd) {
        let e = i.find(".fa-hand-paper-o");
        d._insertItem && d._insertItem[n.name].h ? 0 === e.length && (e = t('<i class="fa fa-hand-paper-o pull-right">').on("click", () => {
          this.insertRow.clearField = n.name, r.call(d, l, d._currentInsertCellIndex + 1)
        }), i.prepend(e).addClass("ins-handed")) : (1 === e.length && e.remove(), i.removeClass("ins-handed"))
      }
      if ("select" === n.type && 2 === n.changeSelectTable) {
        i.addClass("with-source-add-button");
        let a = t('<button class="btn btn-default btn-sm source-add" tabindex="-1"><i class="fa fa-plus"></i></button>');
        i.prepend(a);
        let s = function () {
          let a = {}, s = d._insertItem;
          t.each(s, (function (e, t) {
            "$" !== e.substring(0, 1) && (a[e] = t)
          }));
          a[n.name] = null;
          let o = 0;
          return t(e.top.document.body).on("pctable-opened.select-add-" + n.name, (function () {
            o++
          })).on("pctable-closed.select-add-" + n.name, (function (e, a) {
            o--;
            let c = a && "insert" === a.method && a.json && a.json.chdata && a.json.chdata.rows;
            if (0 === o || c) {
              let e = m;
              delete n.list, e.data("input").data("LISTs") && (e.data("input").data("LISTs").isListForLoad = !0), c && (n.multiple ? s[n.name].v.push(Object.keys(a.json.chdata.rows)[0]) : s[n.name].v = Object.keys(a.json.chdata.rows)[0]), e.replaceWith(m = n.getEditElement(e, s[n.name], s, p, u, h)), t("body").off(".select-add-" + n.name), i.data("input", m), r.call(d, l, d._currentInsertCellIndex, n.name)
            }
          })), d.model.selectSourceTableAction(n.name, a), !1
        };
        a.on("click", (function () {
          d.__insertRowActions("clickSourceButton", s)
        }))
      }
      return i
    },
    _insertFocusIt: function (e) {
      let i = this;
      if (!e) return setTimeout((function () {
        i._insertFocusIt.call(i, 1)
      }), 10), !1;
      let n = !0, a = !!this._insertPanel, l = this.insertRow;
      if (a) {
        if (!i._insertPanel) return !1;
        l = i._insertPanel.$modalBody
      }
      if (!l || !l.length) return !1;
      if (t.each(i.fieldCategories.visibleColumns, (function (e, t) {
        if (i._currentInsertCellIndex == e) return !t.insertable || i._insertItem && i._insertItem[t.name] && i._insertItem[t.name].f && !0 === i._insertItem[t.name].f.block ? void i._currentInsertCellIndex++ : (a ? t.focusElement(l.find(".cell:eq(" + e + ")").data("input")) : t.focusElement(i._getTdByColumnIndex(l, e + 1).data("input")), n = !1, !1)
      })), n) if (this.insertRow.find("td.active").removeClass("active"), a) {
        i._insertPanel.indexedButtons[Object.keys(i._insertPanel.indexedButtons)[0]].focus()
      } else t("#saveInsertRow").parent().focus()
    }
  }), t.extend(App.pcTableMain.prototype, {
    _rerenderColumnsFooter: function () {
      let e = this._createFootersTableBlock();
      this._footersBlock.replaceWith(e), this._footersBlock = e
    }, _rerendParamsblock: function () {
      this._createParamsBlock(), this.isMobile && this._refreshParamsBlock()
    }, _rerendFiltersBlock: function () {
      this._filtersBlock.replaceWith($block = this._createFiltersBlock()), this._filtersBlock = $block, this._refreshFiltersBlock(this.data_params)
    }, _rerendBottomFoolers: function () {
      this._createFootersSubtable(), this.isMobile && this._refreshFootersBlock()
    }, _renderTable: function () {
      let e = this;
      this._table = t("<table>").addClass(this.tableClass), this.notCorrectOrder && this._table.addClass("no-correct-n-filtered"), this.isRotatedView ? (this._innerContainer.addClass("rotatedPcTable"), this._table.append(this._createHead()).append(this._createBody())) : this._table.append(this._createHead()).append(this._createFirstBody()).append(this._createBody()).append(this._createAfterBody()), this._footersBlock = this._createFootersTableBlock(), this._table.append(this._footersBlock), this._popovers = t('<div class="popovers">'), e.isTreeView ? e._connectTreeView.call(e) : this.addReOrderRowBind(), 1 === this.fieldCategories.column.length && e._container.addClass("no-fields");
      let i = this.scrollWrapper = this._container.append('<div class="pcTable-scrollwrapper">').find(".pcTable-scrollwrapper");
      i.append(this._createBeforeSpace()).append(this._createTableText()), this.isCreatorView && i.append(this._refreshHiddenFieldsBlock()), this._paramsBlock = this._createParamsBlock(i);
      let n = t('<div class="pcTable-rowsWrapper">').appendTo(i);
      n.append(this._createRowsTitle(n)).append(this._createFiltersBlock()).append(() => {
        if (!this.isTreeView && this.tableRow.pagination && "0/0" !== this.tableRow.pagination) return this._pagination()
      }).append(this._rowsButtons()).append(this._innerContainer), this._footersSubTable = this._createFootersSubtable(i), i.append(this._footersSubTable).append(this._popovers), this.addScrollsRules(), this._seeCalcucatedValData(), this._seeSelectPreview(), this._clickstoCopyMe(), this.isCreatorView && this._hideHell_storage.checkIssetFields.call(this)
    }, _refreshHiddenFieldsBlock: function () {
      let e = this._hiddenFieldsBlock();
      return this.HiddenFieldsBlock && this.HiddenFieldsBlock.replaceWith(e), this.HiddenFieldsBlock = e, this.HiddenFieldsBlock
    }, _hiddenFieldsBlock: function () {
      let e, i, n = this, a = 0, l = t('<div class="pcTable-hiddenFieldsTables">'), s = 0;
      if (this.beforeSpaceHide || !this._hideHell_storage.getOpened.call(this)) return l;
      let o = this._container.width() - 100;
      return t.each(n.hidden_fields || [], (function (r, d) {
        a++;
        let c = d.width > 0 ? d.width : 100;
        (0 === s || o < s + c) && (e && e.width(s), e = t("<table class='pcTable-hiddenFieldsTable'><thead><tr></tr></thead></table>\""), l.append(e), s = 0, i = e.find("thead tr")), i.append(n._createHeadCell(r, d)), s += d.width
      })), n.isCreatorView && Object.keys(n.fields).forEach((function (r, d) {
        let c = n.fields[r];
        if (c.showInWeb && c.showMeWidth < 1 && "n" !== c.name) {
          a++;
          let r = c.width > 0 ? c.width : 100;
          (0 === s || o < s + r) && (e && e.width(s), e = t("<table class='pcTable-hiddenFieldsTable'><thead><tr></tr></thead></table>\""), l.append(e), s = 0, i = e.find("thead tr")), i.append(n._createHeadCell(d, c)), s += c.width
        }
      })), e && e.width(s), a ? l : t('<div class="pcTable-hiddenFieldsTables">')
    }, _clickstoCopyMe: function () {
      this._container.on("click", ".copy_me", (function () {
        let e = t(this);
        return e.data("clicked") || (e.data("clicked", !0), e.width(e.width()), e.data("text") ? App.copyMe(e.data("text")) : App.copyMe(e.text()), e.button("copied"), setTimeout((function () {
          e.button("reset"), e.removeData("clicked")
        }), 2e3), e.blur(), t("body").click()), !1
      }))
    }, _clicksToCodeView: function () {
      let i = this;
      this._container.on("click", "th .roles", (function () {
        let n = t(this);
        if (n.hasClass(".fa-sun-o") || n.hasClass("fa-certificate")) {
          let a, l = i._getFieldBytd(n.closest("th")),
            s = t('<div class="HTMLEditor" id="bigOneCodemirror" style="height: 100%;"></div>');
          BootstrapDialog.show({
            message: s,
            type: null,
            title: "Просмотр кода поля " + l.title,
            cssClass: "fieldparams-edit-panel",
            draggable: !0,
            onhide: function (e) {
              mirror.setValue(a.getValue())
            },
            onshow: function (e) {
              e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({width: "90vw", minHeight: "90vh"})
            },
            onshown: function (t) {
              a = CodeMirror(s.get(0), {
                mode: "totum",
                value: l.code[0],
                theme: "eclipse",
                lineNumbers: !0,
                indentWithTabs: !0,
                autoCloseTags: !0,
                bigOneDialog: t,
                readOnly: !0
              }), mirror.table && (a.table = mirror.table);
              let i = Math.round(t.$modalContent.height() - t.$modalHeader.outerHeight() - 40);
              a.getScrollerElement().style.minHeight = i + "px", s.find(".CodeMirror").css("min-heught", i), a.focus(), t.$modalContent.position({
                my: "center top",
                at: "center top+30px",
                of: e
              })
            }
          })
        }
      }))
    }, _seeCalcucatedValData: function () {
      var e = this;
      this._container.on("mouseover", "td .fa-hand-paper-o", (function () {
        if (!e.isMobile) {
          var i = t(this), n = i.closest("td");
          if (n.closest("tr").is(".InsertRow")) return !1;
          var a = e._getItemBytd(n), l = e._getFieldBytd(n), s = t("<div>");
          let o = "";
          null === a[l.name].c || "" === a[l.name].c || void 0 === a[l.name].c ? o = "" : "select" === l.type ? l.multiple ? t.each(a[l.name].c, (function (e, t) {
            "" !== o && (o += ", "), o += l.getElementString(a[l.name].c[e], a[l.name].c_[e])
          })) : o = l.getElementString(a[l.name].c, a[l.name].c_) : (o = l.getCellText(a[l.name].c, null, a, e), "object" == typeof o && (o = o.text())), s.append(t("<div>Расчетное значение: </div>").append(t("<code>").text(o))), i.one("mouseout", (function () {
            s.length && (s.remove(), s = null)
          })), setTimeout((function () {
            s && s.length && App.popNotify(s, i)
          }), 500)
        }
      }))
    }, _seeSelectPreview: function () {
      var e = this;
      t("body").on("mouseover", ".select-with-preview li", (function (i) {
        let n = t(this), a = setTimeout((function () {
          if (n.is(":hover")) {
            let t = n.find("span.select-with-preview");
            e.fields[t.data("field")] && e.fields[t.data("field")].previewPanel.call(e.fields[t.data("field")], t, n)
          }
        }), 300);
        n.one("mouseout", (function () {
          a && clearTimeout(a)
        }))
      }))
    }, _getFavoriteStar: function () {
      let e = this.tableRow.__is_in_favorites = this.tableRow.__is_in_favorites || !1, i = t("#favorite-start"),
        n = this;
      return null === e ? t() : (0 === i.length && (i = t('<button class="btn btn-default btn-sm" id="favorite-start"></button>').on("click", (function () {
        n.model.setTableFavorite(!i.is(".stared")).then((function (e) {
          n.tableRow.__is_in_favorites = e.status, n._getFavoriteStar.call(n)
        }))
      }))), e ? i.addClass("stared").text("★") : i.removeClass("stared").text("☆"), i)
    }, _createBeforeSpace: function () {
      let i, a = this;
      if (this._beforeSpace = t('<div class="pcTable-beforeSpace">'), !a.beforeSpaceHide) {
        a.LogButton = t(), i = t('<div class="pcTable-topButtons">');
        let e = t("#TOTUM_FOOTER");
        if (e.length && i.append(e), a.isCreatorView) {
          let n = t('<div class="creator-log-buttons">'), l = t.cookie("pcTableLogs") || "[]";
          l = JSON.parse(l), l.length && (n.addClass("with-logs"), setTimeout(() => {
            App.blink(n.find("button"), 6, "#fff")
          }, 100));
          let s = t('<button class="btn btn-danger btn-sm"><i class="fa" style="width: 12px"></i> Показать логи</button>').appendTo(n).on("click", (function () {
            let e;
            const i = function () {
              let i = [];
              e.find("input:checked").each((function (e, n) {
                i.push(t(n).attr("name"))
              })), i.length > 0 ? s.find("i").attr("class", "fa fa-check-square-o") : s.find("i").attr("class", "fa fa-square-o"), t.cookie("pcTableLogs", JSON.stringify(i), {path: "/"}), a.FullLOGS = [], a.LOGS = {}, s.popover("destroy"), i.length ? n.addClass("with-logs") : n.removeClass("with-logs"), l = i
            };
            if (s.is("[aria-describedby]")) e = t("#" + s.attr("aria-describedby")), i(); else {
              e = t("<div>"), e.append('<div><input type="checkbox" name="c"/> Код</div>'), e.append('<div><input type="checkbox" name="a"/> Код-действия</div>'), e.append('<div><input type="checkbox" name="s"/> Селекты</div>'), e.append('<div><input type="checkbox" name="f"/> Форматирование</div>');
              let n = t('<div><input type="checkbox" name="flds"/> Время расчета полей </div>');
              e.append(n), a.FieldLOGS && a.FieldLOGS.length && a.FieldLOGS.forEach(e => {
                let i = t('<div style="cursor: pointer"><button class="btn btn-xs"><i class="fa fa-table"></i></button> ' + e.name + "</div>").on("click", (function () {
                  a.model.calcFieldsLog(JSON.stringify(e.data), e.name)
                }));
                n.append(i)
              }), e.append('<div style="padding-top: 10px;"><button class="btn btn-sm btn-default">Применить</button></div>'), e.find("input").each((function (e, i) {
                i = t(i), -1 !== l.indexOf(i.attr("name")) && i.prop("checked", "checked"), -1 !== l.indexOf("flds") && "flds" !== i.attr("name") && i.prop("disabled", !0)
              })), e.on("change", 'input[name="flds"]', (function () {
                let i = t(this).is(":checked");
                e.find("input").each((e, n) => {
                  "flds" !== (n = t(n)).attr("name") && (i ? (n.prop("disabled", !0), n.prop("checked", !1)) : n.prop("disabled", !1))
                })
              })), e.on("click", "button", (function () {
                i()
              })), s.popover({
                trigger: "manual",
                placement: "bottom",
                content: e,
                html: !0,
                animation: !1,
                container: a._container,
                onhide: function () {
                }
              }).popover("show")
            }
          })), o = s.find("i");
          l.length > 0 ? o.addClass("fa-check-square-o") : o.addClass("fa-square-o");
          let r = t('<button class="btn btn-danger btn-sm">Лог</button>').appendTo(n);
          a.LogButton = r, r.on("click", (function () {
            a.FullLOGS && 0 !== a.FullLOGS.length ? App.logOutput(a.FullLOGS) : App.logOutput("Лог пуст. Включите логирование и перегрузите страницу")
          })), e.length ? e.append(n) : n.appendTo(i), t('<button class="btn btn-danger btn-sm"><i class="fa fa-eraser" style="width: 13px"></i></button>').on("click", (function () {
            a.FullLOGS = [], a.FieldLOGS = [], a.LOGS = {}
          })).appendTo(n)
        }
      }
      let l = t('<span class="common-table-title">');
      if (l.append(this.fieldsHiddingGetButton(!0)), !a.isMobile) {
        if (t('<button class="btn btn-default btn-sm"><i class="fa fa-print"></i></button>').on("click", (function () {
          a._print.call(a)
        })).appendTo(l), a.withCsvButtons) {
          let e = t('<button class="btn btn-default btn-sm">CSV-экспорт</button>').on("click", (function () {
            let i = t('<div><div class="menu-item" data-type="full">Полный</div><div class="menu-item"  data-type="rows">Только строки</div></div>');
            i.on("click", ".menu-item", (function () {
              let e = t(this).is('[data-type="full"]') ? "full" : "rows";
              i.remove(), a._csvExport(e)
            }));
            let n = App.popNotify({
              isParams: !0,
              $text: i,
              element: e,
              container: this._container,
              trigger: "manual",
              placement: "bottom"
            });
            t("#" + n).position({
              my: "left top",
              at: "left-3px bottom+10px",
              of: e
            }).off().on("mouseleave", (function () {
              i.remove()
            })).find(".arrow").css("left", "11px").end().find(".popover-content").css("padding", "5px")
          }));
          l.append(e)
        }
        if (a.withCsvEditButtons && this.control.editing) {
          let e = t('<button class="btn btn-default btn-sm">CSV-импорт</button>').on("click", (function () {
            let i = t('<div><div class="menu-item" data-type="full">Полный</div><div class="menu-item"  data-type="rows">Только строки</div></div>');
            i.on("click", ".menu-item", (function () {
              let e = t(this).is('[data-type="full"]') ? "full" : "rows";
              i.remove(), a._csvImportClick(e)
            }));
            let n = App.popNotify({
              isParams: !0,
              $text: i,
              element: e,
              container: this._container,
              trigger: "manual",
              placement: "bottom"
            });
            t("#" + n).position({
              my: "left top",
              at: "left-3px bottom+10px",
              of: e
            }).off().on("mouseleave", (function () {
              i.remove()
            })).find(".arrow").css("left", "11px").end().find(".popover-content").css("padding", "5px")
          }));
          l.append(e)
        }
      }
      if (this.isAnonim || a.beforeSpaceHide || l.append(this._getFavoriteStar()), this.tableRow.panels_view && "both" === this.tableRow.panels_view.state && !a.isMobile && e === e.top && "off" !== a.panels) {
        let i;
        i = "panels" !== this.viewType ? t('<button class="btn btn-default btn-sm"><i class="fa fa-address-card-o"></i></button>').on("click", () => {
          this.model.panelsView(!0).then(() => {
            e.location.reload()
          })
        }) : t('<button class="btn btn-default btn-sm"><i class="fa fa-table"></i></button>').on("click", () => {
          this.model.panelsView(!1).then(() => {
            e.location.reload()
          })
        }), l.append(i)
      }
      if (this.isCreatorView && this.isMain) {
        let l = t('<div class="creator-buttons">');
        t('<button class="btn btn-default btn-xxs field_name copy_me" data-copied-text="Скопировано"/>').text(this.tableRow.name).appendTo(l), t('<button class="btn btn-danger btn-xxs" title="Редактировать настройки таблицы"/>').html('<i class="fa fa-pencil-square-o"></i>').on("click", (function () {
          new EditPanel(1, BootstrapDialog.TYPE_DANGER, {id: a.tableRow.id}).then((function (t) {
            t && e.location.reload(!0)
          }))
        })).appendTo(l);
        let s = {fl_name: [this.tableRow.id]};
        if (t('<a href="/Table/' + this.Tables.branchId + "/" + this.Tables.id + "/?" + t.param({f: s}) + '" target="_blank" class="btn btn-danger btn-xxs" title="Открыть список таблиц"/>').html('<i class="fa fa-external-link"></i>').appendTo(l), s = {
          f_table_categories: this.tableRow.category,
          f_table: this.tableRow.id
        }, this.tableRow.__version && (s.fl_version = this.tableRow.__version), t('<a href="/Table/' + this.Tables.branchId + "/" + this.TableFields.id + "/?" + t.param({f: s}) + '" target="_blank" class="btn btn-danger btn-xxs" title="Открыть состав таблиц"/>').html('<i class="fa fa-external-link-square"></i>').appendTo(l), "calcs" === this.tableRow.type) {
          l.append(" ");
          let e = t('<a href="/Table/' + this.TablesVersions.branchId + "/" + this.TablesVersions.id + "?" + t.param({f: this.calcstable_cycle_version_filters}) + '" target="_blank" class="btn btn-danger btn-xxs" title="Создание версий таблиц"><i class="fa fa-code-fork"></i></a>');
          l.append(e), l.append(" "), e = t('<a href="/Table/' + this.TablesCyclesVersions.branchId + "/" + this.TablesCyclesVersions.id + "?" + t.param({f: this.calcstable_versions_filters}) + '" target="_blank" class="btn btn-danger btn-xxs" title="Изменение версий таблиц цикла"><i class="fa fa-random"></i></a>'), l.append(e)
        }
        let o = t('<div class="color-danger creator-table-title">' + +this.tableRow.sort + ' <i class="' + App.tableTypes[this.tableRow.type].icon + '"></i> ' + App.tableTypes[this.tableRow.type].title + " [" + this.tableRow.actual + "]</div>");
        l.append(o), "calcs" === this.tableRow.type && o.append(" / Версия " + this.tableRow.__version + " / Цикл " + this.tableRow.cycle_id), t('<button class="btn btn-danger btn-sm" id="hide-hell" disabled><i class="fa fa-times"></i></span></button>').on("click", (function () {
          a._hideHell_storage.switchOpened.call(a)
        })).appendTo(l), l.appendTo(i), t('<button class="btn btn-danger btn-sm">Добавить поле</span></button>').width(113).on("click", (function () {
          let t = {table_id: {v: a.tableRow.id}, data_src: {v: n}};
          a.tableRow.__version && (t.version = {v: a.tableRow.__version}), new EditPanel(2, BootstrapDialog.TYPE_DANGER, t).then((function (t) {
            t && e.location.reload(!0)
          }))
        })).appendTo(l), l.appendTo(i)
      }
      if (a.beforeSpaceHide) this._beforeSpace_title = t('<div class="pcTable-title"><span class="bttns"/></div>').prependTo(this._beforeSpace); else if (this._beforeSpace.append(i), this._beforeSpace_title = t('<div class="pcTable-title"><span class="title"/><span class="bttns"/><div class="updated"/></div>').prependTo(this._beforeSpace), "calcs" === this.tableRow.type && e.TREE_DATA) {
        let i, n, a = t('<div class="pcTable-tabls"><ul class="nav nav-tabs"></div>'), l = a.find("ul");
        if (e.location.pathname.match(/^\/[^\/]+\/\d+\/\d+\/\d+\/\d+$/)) {
          i = e.location.pathname.replace(/^\/[^\/]+\/([^\/]+).*?$/, "$1"), n = e.location.pathname.replace(/^\/[^\/]+\/([^\/]+\/[^\/]+).*?$/, "$1") + "/";
          let t = sessionStorage.getItem("cycles_filter");
          t && (t = JSON.parse(t), t.id == this.tableRow.tree_node_id && (n += "?", t.filter && (n += "f=" + encodeURIComponent(t.filter)), t.onPage && (t.filter && (n += "&"), n += "onPage=" + encodeURIComponent(t.onPage), n += "&offset=" + encodeURIComponent(t.offset))));
          let a = !1;
          e.TREE_DATA.forEach(e => {
            e.isCycleTable && (a || (e.isOneUserCycle || l.append('<li><a href="/Table/' + n + '"><i class="fa fa-arrow-left"></a></li>'), a = !0), e.id === "table" + this.tableRow.id ? l.append('<li class="active"><a class="tab-title">' + e.text + "</a></li>") : l.append('<li><a href="/Table/' + i + "/" + e.href + '">' + e.text + "</a></li>"))
          })
        } else {
          n = e.location.pathname.replace(/^\/[^\/]+\/([^\/]+).*?$/, "$1");
          let t = !1;
          e.TREE_DATA.forEach(e => {
            e.isCycleTable && (t || (l.append('<li><a href="/Table/' + n + '/"><i class="fa fa-arrow-left"></a></li>'), t = !0), e.id === "table" + this.tableRow.id ? l.append('<li class="active"><a class="tab-title">' + e.text + "</a></li>") : l.append('<li><a href="' + e.link + '">' + e.text + "</a></li>"))
          })
        }
        this._beforeSpace.append(a)
      }
      if (this._beforeSpace_title.append(l), this.tableRow.description) {
        let e = t('<a class="btn btn-default btn-sm"><i class="fa fa-info"></i></a>'),
          i = t('<div class="table-description"/>').html(this.tableRow.description),
          n = t('<button class="btn btn-default btn-sm close-table-description"><i class="fa fa-times"></i></button>');
        i.append(n), e.appendTo(l);
        let a = "table_description_switcher" + this.tableRow.id,
          s = this.tableRow.description.match("<hide(/?)>") ? "0" : localStorage.getItem(a) || localStorage.setItem(a, "1") || localStorage.getItem(a);
        const o = t => {
          switch (t && (s = "1" === s ? "0" : "1"), s) {
            case"1":
              i.show(), e.removeClass("btn-warning").addClass("btn-default");
              break;
            default:
              i.hide(), e.addClass("btn-warning").removeClass("btn-default")
          }
          localStorage.setItem(a, s), t && this.ScrollClasterized.insertToDOM(0, !0)
        };
        o(), e.on("click", o), n.on("click", o), this._beforeSpace.append(i)
      }
      return this._beforeSpace
    }, __$rowsButtons: null, _paginationCreateBlock: function () {
      let {offset: e, onPage: i, allCount: n} = this.PageData;
      if ("0" == i) return "";
      let a, l, s, o, r = t("<span></span>"), d = 0 === e ? 0 : Math.ceil(e / i), c = Math.ceil(n / i);
      a = e > 0 ? t('<button class="btn btn-default btn-sm"><i class="fa fa-hand-o-left"></i></button>').on("click", () => (this.model.loadPage(this, null, this.PageData.onPage, this.PageData.firstId), !1)) : t('<button class="btn btn-default btn-sm" disabled><i class="fa fa-hand-o-left"></i></button>'), e + i < n ? (l = t('<button class="btn btn-default btn-sm"><i class="fa fa-hand-o-right"></i></button>').on("click", () => (Object.keys(this.data), this.model.loadPage(this, this.PageData.lastId, this.PageData.onPage), !1)), o = t('<button class="btn btn-default btn-sm"><i class="fa fa-long-arrow-right"></i></button>').on("click", () => (this.model.loadPage(this, null, this.PageData.onPage, -1), !1))) : (l = t('<button class="btn btn-default btn-sm" disabled><i class="fa fa-hand-o-right"></i></button>'), o = t('<button class="btn btn-default btn-sm" disabled><i class="fa fa-long-arrow-right"></i></button>')), s = d > 0 ? t('<button class="btn btn-default btn-sm"><i class="fa fa-long-arrow-left"></i></button>').on("click", () => (this.model.loadPage(this, 0, this.PageData.onPage), !1)) : t('<button class="btn btn-default btn-sm" disabled><i class="fa fa-long-arrow-left"></i></button>');
      let f = t('<span id="ttm-onpage-input"></span>'),
        p = t('<input class="form-control" type="number">').appendTo(f).wrap("<span>");
      return p.val(i), p.on("change", () => {
        let e = null;
        this.PageData.allCount <= this.PageData.onPage || d >= Math.floor(this.PageData.allCount / this.PageData.onPage) && (e = -1), this.PageData.onPage = parseInt(p.val()), this.model.loadPage(this, 0, p.val(), e)
      }), r.append(s), r.append(a), r.append('<span class="ttm-pages">' + (d + 1) + " из " + c + "</span>"), r.append(l), r.append(o), r.append(f), f.append(" из " + n), c > 1 && (r.addClass("ttm-pagination-warning"), f.append(' <i class="fa fa-square"></i>')), this.saveFilterAndPage(), r
    }, _pagination() {
      if (void 0 === this.PageData || this.PageData.loading) {
        let e;
        this.PageData || (this.PageData = {$block: t('<div class="ttm-pagination"></div>')});
        let i = this.tableRow.pagination.split("/"),
          n = parseInt(new URL(document.location).searchParams.get("onPage") || (this.isMobile ? i[1] : i[0]));
        return e = i[2] || null, this.PageData.onPage = n, this.model.loadPage(this, e, n, null, new URL(document.location).searchParams.get("offset")), this.PageData.$block.empty().append('<i class="fa fa-spinner"></i>')
      }
      return this.PageData.$block.empty().append(this._paginationCreateBlock())
    }, rowButtonsCalcWidth: function () {
      this.tableWidth < this._innerContainer.width() ? this.isMobile ? this.__$rowsButtons.width(this._table.width()) : this.__$rowsButtons.width(this._table.width() - 70) : this.isMobile || this.__$rowsButtons.width(this._innerContainer.width() - 5)
    }, _rowsButtons: function () {
      let e, i = this;
      if (this.__$rowsButtons ? e = this.__$rowsButtons.empty() : (e = t('<div class="pcTable-buttons">'), this.__$rowsButtons = e), this.fieldCategories.column.length) {
        if (this.isInsertable()) {
          let t = i._getInsertButtons();
          e.append(t)
        }
        if (this.control.restoring && t('<button data-action="restore" class="btn btn-sm btn-default">' + (this.isRestoreView ? "Норм режим" : "Восстановить") + "</button>").width(80).css("margin-left", "5px").on("click", this.switchRestoreView.bind(this)).appendTo(e), !i.isCreatorView && i.f && i.f.buttons && i.f.buttons && i.f.buttons.length && i.f.buttons.forEach(n => {
          if (i.isReplacedToRowsButtonsField(n)) {
            let a = t('<span class="button-wrapper">').data("field", n),
              l = i.fields[n].getCellText(null, a, i.data_params);
            a.append(l).appendTo(e), l.wrap('<span class="cell-value">')
          }
        }), !this.isTreeView || this.fields.tree.treeViewLoad) {
          let n = t('<button class="btn btn-sm" style="margin-left: 5px;">Сбросить <span class="fa fa-filter"></span></button>').width(82).on("click", (function () {
            setTimeout((function () {
              i.filtersEmpty.call(i)
            }), 50)
          }));
          this.filters && Object.keys(this.filters).length ? n.addClass("btn-warning") : n.attr("disabled", !0).addClass("btn-default"), e.append(n), this.filtersClearButton = n
        }
      }
      if (this.f.tablecomment) {
        let n = t('<div class="pcTable-tableComment">').on("click", (function () {
          App.panel("Комментарий строчной части таблицы", i.f.tablecomment)
        }));
        e.prepend(n.text(this.f.tablecomment)), setTimeout((function () {
          let e = 0;
          n.parent().find(">span,>button").each((function () {
            e += t(this).width() || 0
          })), e += 90, n.css("width", "calc(100% - " + e + "px)")
        }), 1)
      }
      return e
    }, _refreshContentTable: function (e, t) {
      let i = this._content;
      t = t || !1, i.data("state", "refreshing"), App.fullScreenProcesses.showCog(), this.ScrollClasterized.insertToDOM(0, t, e), App.fullScreenProcesses.hideCog(), i.data("state", "ready"), i.trigger("refreshed"), this._popovers.empty()
    }, _refreshTitle: function () {
      if (!this.beforeSpaceHide && (this._beforeSpace_title.find(".title").text(this.f.tabletitle || this.tableRow.title), this.model.tableData && this.model.tableData.updated)) {
        let e;
        this.isAnonim || (e = moment(this.model.tableData.updated.dt, "YYY-MM-DD HH:mm").format("DD.MM HH:mm") + " (code: " + this.model.tableData.updated.code + ")");
        let i = t('<div class="small">').text(e);
        this.tableRow.__blocked ? i.append('<div class="">Блокирована' + (this.tableRow.license_error ? ": " + this.tableRow.license_error : "") + "</div>") : !1 === this.control.editing && i.append('<div class="">Только чтение</div>'), this._beforeSpace_title.find(".updated").html(i)
      }
    }, _createTableText: function () {
      return this.tableText = t('<div class="pcTable-tableText"></div>').html(this.f.tabletext), this.f.tablehtml && this.tableText.append(this.f.tablehtml), this.tableText
    }, _refreshTableText: function () {
      this.tableText.text(this.f.tabletext)
    }, _createRowsTitle: function (e = null) {
      let i = this;
      i.__sectionsCloses = i.__sectionsCloses || JSON.parse(localStorage.getItem("sectionCloses") || "{}");
      let n = i.tableRow.id + "/" + (i.tableRow.__version || 0) + "/rows",
        a = t('<div class="pcTable-rowsTitle"></div>').on("click", "i, span", (function () {
          let e = t(this).closest(".pcTable-rowsWrapper");
          e.is(".pcTable-rowsClose") ? (e.removeClass("pcTable-rowsClose"), delete i.__sectionsCloses[n], i.ScrollClasterized.reloadScrollHead()) : (e.addClass("pcTable-rowsClose"), i.__sectionsCloses[n] = 1), i.ScrollClasterized.insertToDOM(0, !0), localStorage.setItem("sectionCloses", JSON.stringify(i.__sectionsCloses))
        }));
      return e && e.is(".pcTable-rowsClose") && !i.__sectionsCloses[n] ? e.removeClass("pcTable-rowsClose") : e && !e.is(".pcTable-rowsClose") && i.__sectionsCloses[n] && e.addClass("pcTable-rowsClose"), this.f.rowstitle ? a.html(t("<span>").text(this.f.rowstitle)).prepend('<i class="fa">') : a.text(), a
    }, _createFiltersBlock: function () {
      let i = this;
      if (t("<div>"), this._filtersBlock = t("<div>"), this._filtersBlock.addClass("pcTable-filtersTables pcTable-section"), i.fieldCategories.filter.length) {
        let n, a, l;
        this.___createClosedSection(this._filtersBlock, t('<div class="pcTable-sectionTitle"><span>Фильтры</span></div>').appendTo(this._filtersBlock), "flt"), this._filtersBlock.addClass("pcTable-filtersTables");
        let s, o = 0, r = this._container.width() - 140;
        const d = function () {
          if (n) {
            const s = function () {
              let n = t(this);
              const a = function () {
                let a;
                a = n.is(".eraser") ? "?" : "?" + t.param({f: i._filtersBlock.data("cryptoFilters") || i.filtersString}), i.isMobile && (a += "#go-buttons"), e.location.href = a
              };
              return setTimeout((function () {
                i.model.doAfterProcesses(() => {
                  setTimeout(a, 100)
                })
              }), 500), !0
            };
            if (i.isMobile) n.after(t('<table class="pcTable-filtersTable" id="go-buttons"><tr><td><button class="btn btn-default btn-xs button-go">GO</button> <button class="btn btn-default btn-xs eraser button-go "><i class="fa fa-eraser"></i></button></td></tr></td></table>').on("click", ".button-go", s)); else {
              a.append('<th style="width: 69px;"></th>');
              let e = t('<td class="buttons-go">').html('<button class="btn btn-default btn-xs button-go">GO</button> <button class="btn btn-default btn-xs eraser button-go"><i class="fa fa-eraser"></i></button>').appendTo(l);
              n.width(o + 69), e.on("click", ".button-go", s)
            }
          }
        }, c = (e, c) => {
          c.hidden || ((i.isMobile || 0 === o || r < o + c.width || c.tableBreakBefore) && (i.isMobile || d(), n = t("<table class='pcTable-filtersTable'><thead><tr></tr></thead><tbody><tr></tr></tbody></table>").appendTo(this._filtersBlock), o = 0, a = n.find("thead tr"), l = n.find("tbody tr")), void 0 !== c.panelColor && (s = c.panelColor), a.append(i._createHeadCell(e, c, s)), t("<td>").attr("data-field", c.name).appendTo(l), o += c.width)
        };
        t.each(i.fieldCategories.filter, c), d()
      }
      return this._filtersBlock
    }, _refreshFiltersBlock: function (e) {
      let i = this;
      (e = e || {}).params ? (t.each(i.fieldCategories.filter, (function (t, n) {
        i.data_params[n.name] = e.params[n.name]
      })), i._filtersBlock.data("cryptoFilters", e.filtersString)) : i.filterData || (i.filterData = {}, t.each(i.fieldCategories.filter, (function (e, n) {
        i.filterData[n.name] = t.extend(!0, {}, i.data_params[n.name])
      })), i.model.addExtraData({filters: i.filtersString}));
      let n = [], a = [];
      return t.each(i.fieldCategories.filter, (function (e, t) {
        if (t.hidden) return;
        let l = i._createCell(i.data_params, t);
        i._filtersBlock.find('td[data-field="' + t.name + '"]').replaceWith(l), Object.equals(i.data_params[t.name].v, i.filterData[t.name].v) || n.push(l), "select" !== t.type || !i.data_params[t.name].v || "*NONE*" !== i.data_params[t.name].v && "*NONE*" !== i.data_params[t.name].v[0] || a.push(l)
      })), n.length > 0 ? (n.forEach((function (e) {
        e.addClass("warning-backg")
      })), i._filtersBlock.removeClass("with_danger").addClass("with_changed")) : a.length > 0 ? (a.forEach((function (e) {
        e.addClass("danger-backg")
      })), i._filtersBlock.removeClass("with_changed").addClass("with_danger")) : (i._filtersBlock.removeClass("with_danger, with_changed"), i._filtersBlock.find(".danger-backg, .warning-backg").removeClass("danger-backg, warning-backg")), this._filtersBlock
    }, _createParamsBlock: function (e) {
      let i = t("<div>");
      if (e) return i.appendTo(e), i;
      this._paramsBlock && (this._paramsBlock.replaceWith(i), this._paramsBlock = i);
      let n = this;
      if (n.fieldCategories.param) if (i.addClass("pcTable-paramsTables"), n.isMobile) {
        let e, a, l, s, o = "", r = !1;
        t.each(n.fieldCategories.param, (function (d, c) {
          if (n.isReplacedToRowsButtonsField(c.name)) return;
          let f;
          void 0 !== c.panelColor && (f = c.panelColor), void 0 !== c.sectionTitle && (r = !1, o = c.sectionTitle, o.match(/\*\*(.*)/) && (o.match(/\*\*(.*)/)[1].trim().split(/\s*;\s*/).forEach(e => {
            let t = e.trim().split(/\s*:\s*/);
            "nolable" === t[0] && (t[1] && "true" !== t[1].trim() || (o = ""))
          }), o = o.replace(/(\*\*.*)/, ""))), !c.showMeWidth || n.data_params[c.name].f && n.data_params[c.name].f.hide && n.data_params[c.name].f.hide.mobile || (e = t("<table class='pcTable-paramsTable'>" + (r ? "" : "<thead><tr></tr></thead>") + "<tbody><tr style='background-color: " + f + "'></tr></tbody></table>"), n.isMobile && "button" === c.type && (e = t("<table class='pcTable-paramsTable'><tbody><tr></tr></tbody></table>")), s && !o || (s = t('<div class="pcTable-section">').appendTo(i), o && n.___createClosedSection(s, t('<div class="pcTable-sectionTitle"></div>').html(t("<span>").text(o)).appendTo(s), "p")), o = "", s.append(e), r || (a = e.find("thead tr"), a.append(n._createHeadCell(d, c, f))), l = e.find("tbody tr"), l.append('<td data-field="' + c.name + '">'))
        }))
      } else this.__fillFloatBlock(i, n.fieldCategories.param);
      return i
    }, _refreshParamsBlock: function (e, i) {
      var n = this;
      return n.fieldCategories.param && t.each(n.fieldCategories.param, (function (t, a) {
        if (!a.showMeWidth || e && !e[a.name]) return !0;
        let s = n._createCell(n.data_params, a), o = n._paramsBlock.find('td[data-field="' + a.name + '"]');
        o.css("minHeight") && s.css("minHeight", o.css("minHeight")), o.replaceWith(s), i && "f" !== e[a.name] && n._colorizeElement(s, l)
      })), this._paramsBlock
    }, _createFootersSubtable: function (e) {
      let i, n = this;
      if (i = t("<div class='pcTable-footersTables'>"), e) return i.appendTo(e), i;
      if (this._footersSubTable && (this._footersSubTable.replaceWith(i), this._footersSubTable = i), n.isMobile) {
        let e, a, l, s, o, r = 0, d = this._container.width() - 100, c = "";
        t.each(n.notTableFooterFields, (function (f, p) {
          let h;
          void 0 !== p.panelColor && (h = p.panelColor), void 0 !== p.sectionTitle && (o = !1, c = p.sectionTitle, c.match(/\*\*(.*)/) && (c.match(/\*\*(.*)/)[1].trim().split(/\s*;\s*/).forEach(e => {
            let t = e.trim().split(/\s*:\s*/);
            "nolable" === t[0] && (t[1] && "true" !== t[1].trim() || (c = ""))
          }), c = c.replace(/(\*\*.*)/, ""))), !p.showMeWidth || n.data_params[p.name].f && n.data_params[p.name].f.hide && n.data_params[p.name].f.hide.mobile || ((n.isMobile || 0 === r || d < r + p.showMeWidth || p.tableBreakBefore) && (e && !n.isMobile && e.width(r), e = t("<table class='pcTable-footersTable'><thead><tr></tr></thead><tbody><tr style='background-color: " + h + "'></tr></tbody></table>"), ("button" === p.type || o) && (e = t("<table class='pcTable-paramsTable'><tbody><tr></tr></tbody></table>")), s && !c || (s = t('<div class="pcTable-section">').appendTo(i), c && n.___createClosedSection(s, t('<div class="pcTable-sectionTitle"></div>').html(t("<span>").text(c)).appendTo(s), "f")), c = "", s.append(e), r = 0, a = e.find("thead tr"), l = e.find("tbody tr")), a.append(n._createHeadCell(f, p, h)), l.append('<td data-field="' + p.name + '">'), r += p.showMeWidth)
        }))
      } else this.__fillFloatBlock(i, n.notTableFooterFields);
      return i
    }, _createFootersTableBlock: function () {
      let e, i = this;
      if (e = t("<tbody class='pcTable-footers'></tbody>"), i.fieldCategories.footer) {
        let n = {}, a = 0;
        t.each(i.fieldCategories.footer, (function (e, t) {
          !t.showMeWidth || i.data_params[t.name].f && i.data_params[t.name].f.hide && i.data_params[t.name].f.hide.mobile || (t.column || (t.column = ""), n[t.column] || (n[t.column] = []), n[t.column].push(t), t.column && a < n[t.column].length && (a = n[t.column].length))
        }));
        let l = t(), s = 0, o = 0;
        for (; s < a;) {
          let e = t('<tr><td class="id"></td></tr>'),
            a = t('<tr><td class="id"></td></tr>').data("pctableitemid", "footers").data("pctablettemtndex", "footers" + o++);
          t.each(i.fieldCategories.column, (function (l, o) {
            if (o.showMeWidth) {
              let r = t("<td>");
              if (!n[o.name] || !n[o.name][s]) return r.attr("rowspan", 2), e.append(r), void r.addClass("footer-empty");
              if (r = i._createHeadCell(l, n[o.name][s], n[o.name][s].panelColor).addClass("footer-name"), i.isRotatedView && r.width("auto"), e.append(r), n[o.name] && n[o.name][s]) {
                let e = n[o.name][s], t = i._createCell(i.data_params, e);
                t.attr("data-field", e.name), a.append(t)
              }
            }
          }));
          let r = this.tableRow.rotated_view + 50;
          e.width(r / 2), a.width(r / 2), l = l.add(e), l = l.add(a), s++
        }
        e.html(l)
      }
      return e
    }, ___createClosedSection(e, i, n) {
      const a = this;
      let l = e.parent().find(">div").index(e) + 2,
        s = a.tableRow.id + "/" + (a.tableRow.__version || 0) + "/" + n + "/" + l;
      a.__sectionsCloses = a.__sectionsCloses || JSON.parse(localStorage.getItem("sectionCloses") || "{}"), a.__sectionsCloses[s] && e.addClass("closed"), t('<span class="btn-i"><i class="fa"></i></span>').prependTo(i), i.on("click", "i, span", (function () {
        let e = t(this).closest(".pcTable-section");
        if (e.is(".closed")) if (e.removeClass("closed"), delete a.__sectionsCloses[s], e.data("closedrender")) {
          let e = a.scrollWrapper.parent().scrollTop();
          switch (n) {
            case"p":
              a._rerendParamsblock();
              break;
            case"f":
              a._rerendBottomFoolers()
          }
          a.scrollWrapper.parent().scrollTop(e)
        } else e.find("td").each((function () {
          let e = t(this);
          e.data("addProgress") && e.data("addProgress")()
        })); else e.addClass("closed"), a.__sectionsCloses[s] = 1;
        return localStorage.setItem("sectionCloses", JSON.stringify(a.__sectionsCloses)), a.ScrollClasterized.insertToDOM(null, !0), !1
      }))
    }, _refreshFootersBlock: function (e, i) {
      let n = this, a = n._footersBlock.add(n._footersSubTable);
      return n.fieldCategories.footer && t.each(n.fieldCategories.footer, (function (t, s) {
        if (!s.showMeWidth || e && !e[s.name]) return !0;
        let o = n._createCell(n.data_params, s);
        o.attr("data-field", s.name), a.find('td[data-field="' + s.name + '"]').replaceWith(o), i && "f" !== e[s.name] && n._colorizeElement(o, l)
      })), this._paramsBlock
    }, _createHead: function () {
      return this._header = t("<thead>").append(this._createHeadRow()), this._header
    }, _refreshHead: function () {
      return this._header.empty().append(this._createHeadRow()), this._header
    }, _createFirstBody: function () {
      return this._beforebody = t("<tbody class='beforeRows'>").append('<tr class="extra-clasters">'), this.extraClastersTop = this._beforebody.find(".extra-clasters"), this._beforebody
    }, _createAfterBody: function () {
      return this._afterbody = t("<tbody class='afterRows'>").append('<tr class="extra-clasters">'), this.extraClastersBottom = this._afterbody.find(".extra-clasters"), this._afterbody
    }, _createBody: function () {
      return this._content = t("<tbody class='dataRows'>"), this._content
    }, _createHeadRow: function () {
      let e = this, i = t("<tr>");
      this.fieldCategories.visibleColumns.length ? e._container.removeClass("withNoColumns") : e._container.addClass("withNoColumns"), e._createHeadCellId().appendTo(i);
      let n = i.find(".id").width();
      return e._table.removeClass("n-filtered"), t.each(this.fieldCategories.visibleColumns, (function (t, a) {
        let l, s;
        void 0 !== a.panelColor && (l = a.panelColor), "n" === a.name ? (e._table.addClass("n-filtered"), s = e._createHeadCellNo()) : s = e._createHeadCell(t, a, l), s.appendTo(i), n += parseInt(a.showMeWidth)
      })), this.tableWidth = n, this.isRotatedView || this._table.width(this.tableWidth), i
    }, _createHeadCellId: function () {
      let e = this, i = t('<th class="id"><span>id</span></th>');
      if (null === e.tableRow.order_field || "id" === e.tableRow.order_field) {
        let t = i.find("span").css("font-weight", "bold");
        e.isCreatorView && (!0 === e.tableRow.order_desc ? t.append(' <i class="fa fa-sort-amount-desc roles"></i>') : t.append(' <i class="fa fa-sort-amount-asc roles"></i>'))
      }
      let n = t('<div class="pcTable-filters"></div>'),
        a = t('<button class="btn btn-default btn-xxs" id="n-expander"><i class="fa fa-sort"></i></button>');
      if (this.isTreeView ? a.prop("disabled", !0) : a.on("click", (function () {
        e.fieldCategories.visibleColumns.some((function (e) {
          return "n" === e.name
        })) ? (e.fieldsHiddingHide.call(e, "n"), a.removeClass("btn-warning")) : (e.fieldsHiddingHide.call(e, "n", !0), a.addClass("btn-warning")), e.ScrollClasterized.reloadScrollHead()
      })), e.fieldCategories.visibleColumns.some((function (e) {
        return "n" === e.name
      })) && a.addClass("btn-warning"), e.isMobile) ; else {
        let t = this._getIdFilterButton();
        n.append(a).append(" ").append(t).append(" ").append(e._idCheckButton)
      }
      return i.append(this._checkStatusBar), i.append(n), e._idCheckButton.off().on("click", (function () {
        if (e._idCheckButton.find("span").is(".fa-check")) e.row_actions_uncheck_all.call(e), e.__checkedRows = []; else for (let t = 0; t < e.dataSortedVisible.length; t++) {
          let i = e.dataSortedVisible[t], n = "object" != typeof i ? e._getItemById(i) : i.row;
          n && !n.$checked && (e.row_actions_check.call(e, n, !0), e.__checkedRows.push(n.id))
        }
        e._headCellIdButtonsState()
      })), n = t('<div class="pcTable-filters for-selected"><button class="btn btn-default btn-xxs"><i class="fa fa-copy"></i></button> <button class="btn btn-default btn-xxs" data-names="true"><i class="fa fa-clone"></i></button></div>'), i.append(n), this._refreshCheckedStatus(), i
    }, _getIdFilterButton: function () {
      let e, i = this, n = t("<span>");
      return e = t('<button class="btn btn-xxs btn-filter" id="checkS"><span class="fa fa-circle-o"></span></button>').on("click", (function () {
        e.is(".btn-warning") ? (e.addClass("btn-default").removeClass("btn-warning").find("span").removeClass("fa-circle").addClass("fa-circle-o"), delete i.filters.id, n.find(".btn-filter:not(#checkS)").parent().replaceWith(i.__getFilterButton("id"))) : (e.removeClass("btn-default").addClass("btn-warning").find("span").removeClass("fa-circle-o").addClass("fa-circle"), i.filters.id = i.__checkedRows.slice().map((function (e) {
          return e.toString()
        }))), i.__applyFilters(), i._headCellIdButtonsState()
      })), i.filters.id && i.filters.id.length ? e.addClass("btn-warning").removeClass("btn-default") : e.addClass("btn-default").removeClass("btn-warning"), n.append(e), n.append(i.__getFilterButton("id")), n
    }, _createHeadCellNo: function () {
      let e = this, i = e.fields.n,
        n = t('<span class="cell-title">').text(i.title ? i.title : i.name).attr("title", i.title),
        a = t('<button class="btn btn-default btn-xxs" style="width: 45px"><i class="fa fa-save"></i></button>'),
        l = t('<th class="n">').width(i.userWidth || i.width).append(n);
      return e.isCreatorView && ("n" === e.tableRow.order_field && (!0 === e.tableRow.order_desc ? n.before('<i class="fa fa-sort-amount-desc roles"></i>') : n.before('<i class="fa fa-sort-amount-asc roles"></i>')), n.before("<br/>")), e._orderSaveBtn = a, !e.tableRow.with_order_field || e.f.blockorder || e.tableRow.__blocked ? (a.prop("disabled", !0), this._table.addClass("no-correct-n-filtered")) : a.on("click", (function () {
        e.reOrderRowsSave.call(e)
      })), l.append(t('<div class="pcTable-filters">').append(a))
    }, __getCellTitle: function (e) {
      return Object.getPath(this.f, ["fieldtitle", e.name], e.title)
    }, isReplacedToRowsButtonsField(e) {
      return this.fields[e] && this.f && this.f.buttons && this.f.buttons && this.f.buttons.length && -1 !== this.f.buttons.indexOf(e)
    }, _createHeadCell: function (i, a, l) {
      let s = this, o = t("<th>").data("field", a.name);
      a.$th = o;
      let r = a.showMeWidth || a.width || 100;
      this.isRotatedView && "column" === a.category || ("column" !== a.category && r && s.isMobile && (r = 100), s.isMobile && ("column" === a.category && a.editable && (r += 20), r += 20), r && o.width(r)), s.fields[a.name] && (s.fields[a.name].$th = o), a.panelColor ? o.css("background-color", a.panelColor) : void 0 !== l && "" !== l && (o.css("background-color", l), a.panelColor = l), a.webRoles && 1 === a.webRoles.length && "1" === a.webRoles[0].toString() && o.addClass("admin-see"), "footer" === a.type && a.column && (o = t("<td>"));
      let d = this.__getCellTitle(a), c = t('<span class="cell-title">').text(d).attr("title", d).appendTo(o);
      if (s.isCreatorView && !this.isRotatedView) {
        let e = t('<span class="creator-icons">').prependTo(c);
        const i = function (e) {
          let t = "";
          switch (e) {
            case"param":
              t = "fa-hand-o-up";
              break;
            case"column":
              t = "fa-hand-o-right";
              break;
            case"filter":
              t = "fa-hand-o-left";
              break;
            case"footer":
              t = "fa-hand-o-down"
          }
          return t
        };
        !a.isHiddenField && a.showMeWidth || e.append('<i class="fa ' + i(a.category) + ' roles"></i>'), !a.showInWeb || a.isHiddenField || a.showMeWidth || o.addClass("eye-hidden"), a.linkTableName && e.append('<i class="fa fa-chain roles"></i>'), e.append('<i class="fa ' + a.icon + ' roles"></i>');
        let n = t('<i class="roles">' + (a._ord || a.ord) + "</i>");
        if (e.append(n), a._ord && (n.addClass("reordered"), n.before('<i class="roles">' + a.ord + "</i>")), a._category && n.before('<i class="fa ' + i(a._category) + ' roles reordered fa-bold"></i>'), "column" === a.category && s.tableRow.order_field === a.name && (n.css("font-weight", "bold"), !0 === s.tableRow.order_desc ? e.append('<i class="fa fa-sort-amount-desc roles"></i>') : e.append('<i class="fa fa-sort-amount-asc roles"></i>')), a.codeAction) {
          let i = t('<i class="fa fa-star roles"></i>');
          e.append(i);
          let n = "";
          a.CodeActionOnAdd && ("" !== n && (n += "\n"), n += "При добавлении"), a.CodeActionOnChange && ("" !== n && (n += "\n"), n += "При изменении"), a.CodeActionOnDelete && ("" !== n && (n += "\n"), n += "При удалении"), ("button" === a.type || a.CodeActionOnClick) && ("" !== n && (n += "\n"), n += "При клике"), "" === n && i.removeClass("fa-star").addClass("fa-star-o"), i.attr("title", n)
        }
        a.code && !a.linkFieldName && (a.codeOnlyInAdd ? e.append('<i class="fa fa-cog-o roles"></i>') : e.append('<i class="fa fa-cogs roles"></i>'));
        const l = function (e) {
          let t = "";
          return e.forEach((function (e) {
            "" !== t && (t += "\n"), t += s.ROLESLIST[e.toString()]
          })), t
        };
        if (a.webRoles && e.append(t('<i class="fa fa-eye roles"></i>').attr("title", l(a.webRoles))), "button" !== a.type) {
          let i = !1;
          a.addRoles ? e.append(t('<i class="fa fa-plus roles h"></i>').attr("title", l(a.addRoles))) : a.insertable || ("column" === a.category ? a.editable ? e.append(t('<i class="fa fa-plus roles h"></i>').attr("title", "Добавление запрещено")) : (e.append(t('<i class="fa fa-lock roles h"></i>').attr("title", "Добавление и редактирование запрещено")), i = !0) : a.editable || (e.append(t('<i class="fa fa-lock roles h"></i>').attr("title", "Редактирование запрещено")), i = !0)), a.editRoles ? e.append(t('<i class="fa fa-pencil roles h"></i>').attr("title", l(a.editRoles))) : a.editable || i || e.append(t('<i class="fa fa-pencil roles h"></i>').attr("title", "Редактирование запрещено")), a.logRoles && e.append(t('<i class="fa fa-archive roles h"></i>').attr("title", l(a.logRoles)))
        }
        if (a.showInXml) {
          let i = "";
          a.xmlRoles && (i = l(a.xmlRoles)), e.append(t('<i class="fa fa-exchange roles"></i>').attr("title", i))
        }
      }
      a.unitType && c.append(", " + a.unitType);
      let f, p = t('<div class="pcTable-filters">');
      if (a.help && a.help.length) {
        s.isCreatorView || "column" === a.category || o.addClass("worker-with-i"), f = t('<span class="btn btn-xxs btn-default cell-help" tabindex="-1" id="field-help-' + a.name + '"><i class="fa fa-info"></i></span>'), o.addClass("with-help"), s.isCreatorView && /^\s*<admin>.*?<\/admin>\s*$/s.test(a.help) && f.addClass("danger-backg"), f.appendTo(p);
        let e, i = t('<div class="i-inner-div">').html(a.help).width(230);
        s.isMobile ? f.on("click", (function () {
          App.mobilePanel("Поле " + a.title, a.help)
        })) : f.on("click open close", (function (n) {
          let l = t(this);
          return l.data("bs.popover") ? "open" !== n.type && (e && clearTimeout(e), e = setTimeout(() => {
            l.attr("aria-describedby") && t("#" + l.attr("aria-describedby").length) && l.popover("destroy")
          }, 120)) : "close" !== n.type && (f.popover({
            trigger: "manual", content: i, html: !0, placement: () => {
              let e = "bottom", t = 300, n = s._container, o = l.offset().top - n.offset().top;
              return "column" === a.category && s.insertRow || o > n.height() / 2 ? (e = "top", t = o - 40) : t = n.height() - o - 70, i.css("max-height", t), e
            }, container: s.scrollWrapper
          }), l.popover("show")), t("body").trigger("click"), !1
        })), s.addThHelpCloser()
      }
      if ("column" === a.category && (!s.isTreeView || s.fields.tree.treeViewLoad) && a.filterable && a.showMeWidth > 0 && (o.addClass("with-filter2"), this.__getFilterButton(a.name).appendTo(p)), s.isCreatorView || !1 !== a.dropdownView && "column" === a.category) {
        o.addClass("with-filter");
        let i = s.isCreatorView && !(!1 !== a.dropdownView && "column" === a.category);
        (() => {
          let l = t('<div class="cell-header-dropdown">'),
            o = t('<button class="btn btn-default btn-xxs"  tabindex="-1"><i class="fa fa-caret-down"></i></button>');
          s.fixedColumn === a.name && o.addClass("btn-warning").removeClass("btn-default"), a.pcTable ? i && o.addClass("field_name") : o.addClass("field_name");
          const r = function (t) {
            t && e.location.reload()
          };
          if (s.isCreatorView) {
            let i = t('<div class="menu-item color-danger">');
            i.append('<i class="fa fa-pencil-square-o"></i> Изменить'), l.append(i);
            const d = function () {
              return new EditPanel(2, BootstrapDialog.TYPE_DANGER, {id: a.id}).then(r), !1
            };
            i.on("click", d), o.on("contextmenu", d), i = t('<div class="menu-item color-danger">'), i.append('<i class="fa fa-clone"></i> Дублировать'), l.append(i), i.on("click", (function () {
              App.getPcTableById(2).then((function (e) {
                e.model.checkEditRow({id: a.id}).then((function (e) {
                  let i = {}, n = {};
                  t.each(e.row, (function (e, t) {
                    "object" == typeof t && (i[e] = t, n[e] = !0)
                  })), new EditPanel(2, BootstrapDialog.TYPE_DANGER, i, !1, n).then(r)
                }))
              }))
            })), i = t('<div class="menu-item color-danger">'), i.append('<i class="fa fa-plus"></i> Вставить после'), l.append(i), i.on("click", (function () {
              App.getPcTableById(2, {afterField: a.ord}).then((function (e) {
                let t = {};
                t.ord = {v: a.ord + 10}, t.category = {v: a.category}, t.table_id = {v: s.tableRow.id}, s.tableRow.__version && (t.version = {v: s.tableRow.__version}), t.data_src = {v: n}, new EditPanel(e, BootstrapDialog.TYPE_DANGER, t, !1, t).then(r)
              }))
            })), ("param" === a.category || "footer" === a.category && "" == a.column) && (i = t('<div class="menu-item color-danger">'), i.append('<i class="fa fa-hand-scissors-o"></i> Секция'), l.append(i), i.on("click", () => {
              this.__editSectionTitle(a)
            })), i = t('<div class="menu-item color-danger">'), i.append('<i class="fa fa-refresh"></i> Изменить NAME'), l.append(i), i.on("click", (function () {
              s.model.renameField(a.name)
            })), i = t('<div class="menu-item color-danger">'), i.append('<i class="fa fa-times"></i> Удалить'), l.append(i), i.on("click", (function () {
              let t = a.title;
              BootstrapDialog.show({
                type: BootstrapDialog.TYPE_DANGER,
                title: "Удалить поле " + t + " из таблицы " + s.tableRow.title + "?",
                buttons: [{
                  action: function (i, n) {
                    "use strict";
                    i.close(), App.getPcTableById(2).then((function (i) {
                      App.panelTimer("Удаление поля " + t + " из таблицы " + s.tableRow.title, i.tableRow.delete_timer, (function () {
                        i.model.delete(a.id).then((function () {
                          e.location.reload(!0)
                        }))
                      }))
                    }))
                  }, cssClass: "btn-warning", label: "Удалить"
                }, {
                  action: function (e) {
                    e.close()
                  }, label: "Отмена"
                }],
                draggable: !0
              })
            }))
          }
          if ("filter" !== a.category && a.pcTable && !s.isMobile) {
            let e = t('<div class="menu-item">');
            a.showMeWidth ? (e.append('<i class="fa fa-eye-slash"></i> Скрыть'), e.on("click", (function () {
              o.popover("hide"), s.fieldsHiddingHide.call(s, a.name)
            }))) : (e.append('<i class="fa fa-eye-slash"></i> Показать'), e.on("click", (function () {
              o.popover("hide"), s.setColumnWidth.call(s, a.name, a.width, a.id)
            }))), e.appendTo(l), "column" === a.category && s.isRotatedView || (e = t('<div class="menu-item">'), e.append('<i class="fa fa-arrows-h"></i> Ширина поля'), e.on("click", (function () {
              o.popover("hide");
              let e = t('<div><input type="number" class="form-control" value="' + a.showMeWidth + '" style="padding-left: 2px;"/></div>'),
                i = [{
                  label: "Применить", action: function (t) {
                    let i = parseInt(e.find("input").val());
                    t.close(), a.pcTable.setColumnWidth.call(a.pcTable, a.name, i)
                  }
                }, {
                  label: "Отмена", action: function (e) {
                    e.close()
                  }
                }];
              s.isCreatorView && i.splice(0, 0, {
                label: "По умолчанию",
                cssClass: "btn-m btn-danger",
                action: function (t) {
                  let i = parseInt(e.find("input").val());
                  t.close(), a.pcTable.setColumnWidth.call(a.pcTable, a.name, i, a.id)
                }
              }), BootstrapDialog.show({
                message: e, title: "Ширина поля " + a.title, onshown: function (t) {
                  let i = e.find("input");
                  i.focus(), i.on("keydown", (function (i) {
                    13 === i.keyCode && (a.pcTable.setColumnWidth.call(a.pcTable, a.name, parseInt(e.find("input").val())), t.close())
                  })), t.$modalDialog.width(500)
                }, buttons: i, draggable: !0
              })
            })), e.appendTo(l))
          }
          if (a.showMeWidth > 0 && "column" === a.category) {
            if (s.fixedColumn === a.name ? t('<div class="menu-item">').append('<i class="fa fa-thumb-tack"></i> Открепить').addClass("color-warning").appendTo(l).on("click", (function () {
              o.popover("hide"), s.fixColumn()
            })) : "button" === a.type || s.isRotatedView || t('<div class="menu-item">').append('<i class="fa fa-thumb-tack"></i> Закрепить').appendTo(l).on("click", (function () {
              o.popover("hide"), s.fixColumn(a.name)
            })), !s.isTreeView) {
              {
                let e = t('<div class="menu-item">');
                e.append('<i class="fa fa-sort-alpha-asc"></i> Сортировать А-Я'), l.append(e), e.on("click", (function () {
                  s.sort(a, 1)
                }))
              }
              {
                let e = t('<div class="menu-item">');
                e.append('<i class="fa fa-sort-alpha-desc"></i> Сортировать Я-А'), l.append(e), e.on("click", (function () {
                  s.sort(a, -1)
                }))
              }
            }
            {
              let e = t('<div class="menu-item">');
              e.append('<i class="fa fa-hand-pointer-o"></i> Выделить'), l.append(e), e.on("click", (function () {
                s.selectedCells.empty(), s.selectedCells.selectColumn(a.name)
              }))
            }
            if ("column" === a.category && "number" === a.type) {
              let e = t('<div class="menu-item">');
              e.append('<i class="fa fa-diamond"></i> Математические операции'), l.append(e), e.on("click", (function () {
                let e = t("<div>"), i = 0, n = 0, l = null, o = null, r = 0;
                s.dataSortedVisible.some((function (e) {
                  let t;
                  try {
                    if ("object" != typeof e) t = Big(s.data[e][a.name].v); else {
                      if (!e.row) return;
                      t = Big(e.row[a.name].v)
                    }
                    i = Big(i).plus(t), ++n, (null === l || t.gt(l)) && (l = t), (null === o || t.lt(o)) && (o = t)
                  } catch (e) {
                    ++r
                  }
                }));
                let d = t('<table class="totum-math-operations"><thead><tr><th>Операция</th><th>Значение</th></tr></thead>').appendTo(e),
                  c = t("<tbody>").appendTo(d), f = function (e, t) {
                    let i = "";
                    if (t = t || !1, a.unitType && !t && (i = " " + a.unitType), a.currency) {
                      let t = {};
                      return a.dectimalPlaces && (t.minimumFractionDigits = a.dectimalPlaces), parseFloat(e).toLocaleString("ru-RU", t) + i
                    }
                    return e + i
                  };
                t("<tr><td>Сумма</td><td>" + f(i) + "</td></tr>").appendTo(c), t("<tr><td>Кол-во чисел</td><td>" + f(n, !0) + "</td></tr>").appendTo(c), t("<tr><td>Среднее</td><td>" + (0 !== n ? f(Big(i).div(n).round(a.dectimalPlaces || 0)) : "null") + "</td></tr>").appendTo(c), t("<tr><td>Максимальное</td><td>" + f(l) + "</td></tr>").appendTo(c), t("<tr><td>Минимальное</td><td>" + f(o) + "</td></tr>").appendTo(c), t("<tr><td>Нечисл. элементов</td><td>" + f(r, !0) + "</td></tr>").appendTo(c), s.isTreeView && e.append("<div>Посчитано только по видимым строкам</div>");
                let p = a.title + (a.unitType ? ", " + a.unitType : "");
                s.isMobile ? App.mobilePanel(p, e) : BootstrapDialog.show({
                  title: p,
                  type: "edit",
                  message: e,
                  draggable: !0,
                  onshown: function (e) {
                    e.$modalDialog.width(400)
                  },
                  buttons: [{
                    action: function (e) {
                      e.close()
                    }, label: null, icon: "fa fa-times", cssClass: "btn-m btn-default btn-empty-with-icon"
                  }]
                })
              }))
            }
          }
          if (a.linkToSelectTable) {
            let i = a.linkToSelectTable, n = t('<div class="menu-item color-primary">');
            n.append('<i class="fa fa-external-link"></i> ' + i.title), l.append(n), n.on("click", (function () {
              return e.open(i.link, "_blank").focus(), !1
            }))
          }
          return o.popover({
            html: !0,
            content: l,
            trigger: "manual",
            container: s._container,
            placement: "auto bottom"
          }), o.on("click", () => {
            "column" === a.category && s.PageData && s.PageData.onPage && s.PageData.allCount > s.PageData.onPage ? 0 === l.find(".column-dropdown").length && l.append('<div class="column-dropdown">По текущей странице </div>') : l.find(".column-dropdown").remove(), o.data("bs.popover").tip().hasClass("in") || (o.popover("show"), setTimeout((function () {
              s.closeCallbacks.push(() => {
                o.popover("hide")
              })
            }), 20))
          }), o
        })().appendTo(p)
      }
      p.appendTo(o);
      let h = 20 * p.find(".btn").length + 5;
      if (this.isCreatorView && !this.isRotatedView && (!a.showMeWidth || a.showMeWidth > 50)) {
        let e = t('<div class="th-left-bottom-buttons">').appendTo(o);
        "footer" === a.category && a.column && this.fields[a.column] && !s.hidden_fields[a.name] && (r = this.fields[a.column].width), t('<div class="btn  btn-xxs field_name copy_me"  tabindex="-1" data-copied-text="Скопировано">').text(a.name).appendTo(e).css("max-width", r - h)
      }
      return !s.isRotatedView && s.isMobile && c.css("max-width", r - h - 5), o
    }, _createNoDataRow: function (e) {
      let i = 0;
      t.each(this.fields, (function (e, t) {
        i++
      }));
      let n = t();
      return !e && this.PageData && this.PageData.loading ? e = "Подождите, таблица загружается" : this.isInsertable() && (n = t('<button class="btn btn-warning btn-xxs">Добавить строку</button>').width(120).on("click", () => {
        this.__$rowsButtons.find('[data-action="add"]:first').click()
      })), void 0 === e && (this.PageData && this.PageData.allCount ? this.model.loadPage(this, null, this.PageData.onPage, null, this.PageData.offset) : e = "Таблица пуста "), t("<tr>").addClass(this.noDataRowClass).append('<td class="id">').append(t("<td>").attr("colspan", i).append(e).append(n))
    }, _createRow: function (e, i) {
      i = i || [];
      let n = this;
      e.$tr || (e.$tr = t("<tr>"), n.isRotatedView ? e.$tr.width(n.tableRow.rotated_view) : e.$tr.height(35), e.$tr.data("item", e));
      let a = e.$tr.empty();
      a.attr("class", "DataRow"), a.attr("data-pctableitemid", e.id), e.e_data && 1 == e.e_data.b && a.addClass("BlockedRow"), e.InsDel && a.addClass("insDeleted"), this._addCellId(e, a);
      let s = 0, o = this.fieldCategories.visibleColumns.length;
      if (this.fieldCategories.visibleColumns[s] && "n" === this.fieldCategories.visibleColumns[s].name) {
        let i = this.fieldCategories.visibleColumns[s], n = t("<td>");
        a.append(n.append('<span class="cell-value">').append(i.getCellText(null, n, e))), ++s
      }
      for (; s < o; ++s) {
        let t, o = this.fieldCategories.visibleColumns[s];
        a.append(t = n._createCell(e, o)), i.indexOf(o.name) > -1 && n._colorizeElement(t, l)
      }
      return e.$tr
    }, addThHelpCloser: function () {
      if (!this.pcTableContainerFieldHelpEvent) {
        let e = this;
        this.pcTableContainerFieldHelpEvent = !0, this._container.on("click escPressed", (function (i) {
          e._container.find('[id^="field-help"][aria-describedby^="popover"]').each((function () {
            t(this).attr("id") === i.target.id || t(i.target).closest("#" + t(this).attr("id")).length || t(this).trigger("close")
          }))
        }))
      }
    }, refreshRow: function (e, i, n) {
      if (e && e.is(".DataRow") || i) {
        i || (i = this._getItemByTr(e));
        let l = [];
        if (n) {
          let e, s = !1;
          for (var a in this.isTreeView && (e = {
            id: i.id,
            tree: {v: i.tree.v},
            tree_category: {v: i.tree_category ? i.tree_category.v : null}
          }, this.fields.tree.treeBfield && e[this.fields.tree.treeBfield] && (e[this.fields.tree.treeBfield] = {...i[this.fields.tree.treeBfield]})), n) null !== n[a] && "object" == typeof n[a] ? n[a].changed ? (l.push(a), delete n[a].changed, s = !0) : !Object.equals(n[a], i[a]) && a in this.fields && "listRow" !== this.fields[a].type && (l.push(a), s = !0) : n[a] != i[a] && (l.push(a), s = !0), i[a] = n[a];
          s && (t.extend(i, n), this.isTreeView && this.placeInTree(i, e, !1))
        }
        e && this._createRow(i, l)
      } else this._isParamsArea(e) ? this._refreshParamsBlock() : this._isFootersArea(e) && this._refreshFootersBlock()
    }, _createCell: function (e, i) {
      let n = this;
      var a = t("<td>");
      let l, s = "";
      e[i.name] || (console.log("Не найдено поле " + i.name), console.log(e));
      try {
        l = t.extend({}, n.f || {}, e.f || {}, e[i.name].f || {})
      } catch (t) {
        console.log(t, e, i.name), l = {}
      }
      let o = l.height > 33 || l.maxheight > 33;
      !i.editable || !this.control.editing && "filter" !== i.category || l.block || (a.addClass("edt"), i.editGroup && (i.editGroupMultiColumns ? a.addClass("e-gm").addClass("e-g") : a.addClass("e-g")), -1 === ["button", "fieldParams"].indexOf(i.type) && (n.isMobile || l.editbutton) && (s = '<button class="fa fa-edit pull-right ttm-edit ibtn"></button>')), n.isMobile && "chart" !== i.type && (s = '<button class="fa fa-ellipsis-h ttm-panel pull-right ibtn"></button>' + s), l.block && a.addClass("blocked"), "column" !== i.category && a.attr("data-field", i.name);
      var r = t('<span class="cell-value">'), d = e[i.name];
      let c, f, p;
      if (i.linkFieldName || !i.code || i.codeOnlyInAdd || a.addClass("with-code"), "column" !== i.category && "chart" !== i.type && a.data("field", i.name).addClass("val"), d) {
        if (c = d.e, !d.h || "showhand" in l && !0 !== l.showhand || (f = void 0 !== d.c && d.v != d.c ? t('<i class="fa fa-hand-paper-o pull-right cell-icon" aria-hidden="true"></i>') : t('<i class="fa fa-hand-rock-o pull-right cell-icon" aria-hidden="true"></i>'), n.isMobile && f.addClass("ttm-panel")), d.d && a.addClass("deleted_value"), d.e && (i.errorText ? r.text(i.errorText) : (p = t('<i class="fa fa-exclamation-triangle pull-right" aria-hidden="true"></i>'), n.isMobile ? p.addClass("ttm-panel") : p.attr("title", d.e), a.append(p))), !l.text || "button" == i.type || n.isTreeView && "tree" === i.name && e.__tree && ("self" === i.treeViewType || e.tree_category && e.tree_category.v)) {
          if (!d.e || !i.errorText) {
            var h = o ? i.getHighCelltext(d.v, a, e) : i.getCellText(d.v, a, e);
            "object" == typeof h ? r.html(h) : r.text(h)
          }
        } else r.text(l.text);
        i.CodeActionOnClickAsUrl && r.addClass("asUrl")
      }
      if (l.comment && "button" != i.type && a.append(t('<i class="cell-icon fa fa-info pull-right"></i>').attr("title", l.comment)), f && a.append(f), s && a.append(s), r.appendTo(a), l.text || !i.unitType || c || null === d.v || "postfix" in i || "select" === i.type && i.multiple || r.attr("data-unit-type", " " + i.unitType), i.css && a.addClass(i.css), this.isSelected(i.name, e.id) && a.addClass("selected"), "button" === i.type && i.pcTable.isMobile && "column" !== i.category || (l.background ? a.css("background-color", l.background) : i.panelColor && a.css("background-color", i.panelColor), l.color && a.css("color", l.color)), l.bold && a.css("font-weight", "bold"), l.align ? a.css("text-align", l.align) : l.tab && a.css("padding-left", l.tab + "px"), l.decoration && a.css("text-decoration", l.decoration), l.italic && a.css("font-style", "italic"), "tree" === i.type && h && "object" == typeof h && h.is(".tree-view") ? p && p.remove() : l.icon && "button" !== i.type && a.prepend('<i class="cell-icon fa fa-' + l.icon + '"></i>'), l.progress && l.progresscolor) {
        let e = function () {
          if (r.isAttached()) {
            let e = Math.round(r.width() * parseInt(l.progress) / 100);
            r.css("box-shadow", "inset " + e.toString() + "px 0px 0 0 " + l.progresscolor)
          } else setTimeout(e, 50)
        };
        n.isMobile && a.data("addProgress", (function () {
          let e = a.find(".cell-value");
          e.css("box-shadow", "inset " + Math.round(e.width() * parseInt(l.progress) / 100).toString() + "px 0px 0 0 " + l.progresscolor)
        })), e()
      }
      return i.format = l, i.td_style && "function" == typeof i.td_style && a.css(i.td_style(l)), a
    }, _getLoadingSpinner: function () {
      return t('<div class="text-center"><i class="fa fa-spinner"></i></div>')
    }, _colorizeElement: function (e, t, i) {
      let n = 10, a = function () {
        0 === n ? e.css("box-shadow", "") : (e.css("box-shadow", "inset 0 0 100px 100px " + App.hexToRGB(t, n / 10)), n--, setTimeout(a, 50))
      };
      a()
    }, _TmpColorize: function (e, t, i) {
      var n, a = this;
      t = t || "#ff0000", "#" != (i = i || "#ffffff").substr(0, 1) && (i = App.rgb2hex(i)), (n = function (e, t, i) {
        var n = parseInt(e.slice(1), 16), a = (i = parseInt(i.slice(1), 16), t < 0 ? 0 : i >> 16),
          l = t < 0 ? 0 : i >> 8 & 255, s = t < 0 ? 0 : 255 & i, o = t < 0 ? -1 * t : t, r = n >> 16, d = n >> 8 & 255,
          c = 255 & n;
        return "#" + (16777216 + 65536 * (Math.round((a - r) * o) + r) + 256 * (Math.round((l - d) * o) + d) + (Math.round((s - c) * o) + c)).toString(16).slice(1)
      }(t, .1, i)) == t && (n = i), e.css("background-color", n), n != i ? setTimeout((function () {
        a._TmpColorize(e, n, i)
      }), 50) : e.data("backgroundcolor") || e.attr("style", e.attr("style").replace(/(background\-color:[^;"]+;?)/, ""))
    }, __deleteSection(e) {
      App.panelTimer("Удаление секции", 5, () => {
        App.getPcTableById(2).then((function (t) {
          t.model.checkEditRow({id: e.id}).then(i => {
            let n = i.row.data_src.v;
            t.model.saveEditRow({
              data_src: {
                v: {
                  ...n,
                  tableBreakBefore: {isOn: !1},
                  sectionTitle: {isOn: !1, Val: n.sectionTitle.Val}
                }
              }, id: e.id
            }).then(t => {
              e.tableBreakBefore = !1, delete e.sectionTitle, "param" === e.category ? e.pcTable._rerendParamsblock() : e.pcTable._rerendBottomFoolers()
            })
          })
        }))
      })
    }, __editSectionTitle(i) {
      App.getPcTableById(2).then((function (n) {
        n.model.checkEditRow({id: i.id}).then(a => {
          let l, s = a.row.data_src.v, o = "";
          s.sectionTitle && "Val" in s.sectionTitle && (o = s.sectionTitle.Val || "");
          let r = o.replace(/^(.*?)\*\*.*$/, "$1");
          /\*\*/.test(o) && o.replace(/^.*?\*\*/, "").split(/\s*;\s*/).forEach(e => {
            "" !== e.trim() && (r += "\n", r += e.split(":").join(" : "))
          });
          let d = t('<div class="HTMLEditor">');
          e.top.BootstrapDialog.show({
            message: d,
            type: BootstrapDialog.TYPE_DANGER,
            title: "Редактирование секции",
            cssClass: "sectionTitle-edit-panel",
            draggable: !0,
            buttons: [{
              label: "Сохранить", action: e => {
                (e => {
                  let t = "";
                  if ("" !== e.trim()) {
                    let i = e.split(/\s*[\n\r]+\s*/), n = i[0];
                    i.splice(0, 1), t = n, i.length && (t += "**" + i.join(";").replace(/\s*:\s*/g, ":"))
                  }
                  let a = t;
                  n.model.saveEditRow({
                    data_src: {
                      v: {
                        ...s,
                        tableBreakBefore: {isOn: !0, Val: !0},
                        sectionTitle: {isOn: !0, Val: a}
                      }
                    }, id: i.id
                  }).then(e => {
                    i.sectionTitle = a, i.tableBreakBefore = !0, "param" === i.category ? i.pcTable._rerendParamsblock() : i.pcTable._rerendBottomFoolers()
                  })
                })(l.getValue()), e.close()
              }
            }],
            onhide: function (e) {
            },
            onshown: function (i) {
              i.$modalContent.position({
                of: t(e.top.document.body),
                my: "top+50px",
                at: "center top"
              }), l = CodeMirror(d.get(0), {
                value: r,
                mode: "sections",
                minHeight: "150px",
                readOnly: !1,
                theme: "eclipse",
                lineNumbers: !0,
                indentWithTabs: !1,
                autoCloseTags: !1
              }), l.on("paste", (function (e, t) {
                setTimeout((function () {
                  l.refresh()
                }), 1)
              }))
            },
            onshow: function (e) {
              e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({width: "100%"})
            }
          })
        })
      }))
    }
  }), App.pcTableMain.prototype.fixColumn = function (e) {
    this.fixedColumn && (this._innerContainer.off("scroll.fixed-column"), this._container.off("scrolled.fixed-column"), this._innerContainer.find(".fixed-column").remove()), e && setTimeout(() => {
      let i, n, a = this, l = t('<tbody class="fixed-column"></tbody>');
      const s = () => {
        let i = a.fields[e].$th, s = i.index(), o = i.outerWidth(), r = i.offset().left;
        l.width(o), l.css("max-height", a._innerContainer.height());
        let d = !1;
        if ((d = r - a._innerContainer.offset().left + 5 < -1 * o) || r - a._innerContainer.offset().left + 5 > a._innerContainer.width()) {
          n || (n = !0, l.appendTo(this._innerContainer.find(".pcTable-table:first"))), d ? l.css("left", a._innerContainer.scrollLeft()) : l.css("left", a._innerContainer.scrollLeft() + a._innerContainer.width() - o + 70);
          let e = t("<div>");
          a._innerContainer.find(".pcTable-table:first tbody.dataRows tr").each((function () {
            let i = t(this);
            if (i.is(".loading-row")) {
              let t = i.clone();
              e.append(t)
            } else {
              let n = t(i.find("td")[s]);
              n.length ? e.append(n.clone(!0)) : e.append("<td></td>")
            }
          }));
          let r = t('<th class="top-head"></th>').text(i.find(".cell-title").clone().children().remove().end().text()).height(i.outerHeight());
          l.css({"padding-top": i.outerHeight() + 1}), r.css("top", a._innerContainer.offset().top > 0 ? 0 : -1 * (a._innerContainer.offset().top - 70)), l.empty().append(r).append(e)
        } else l.detach(), n = !1
      };
      a._innerContainer.on("scroll.fixed-column", () => {
        i && clearTimeout(i), i = setTimeout(s, 200)
      }), a._container.on("scrolled.fixed-column", () => {
        i && clearTimeout(i), i = setTimeout(s, 200)
      })
    }, 50), this.fixedColumn = e, this._refreshHead(), this._refreshContentTable()
  }, function () {
    const e = function (e) {
      e.forEach(e => {
        let t = e.th.outerHeight();
        e.th.remove(), e.tdWrapper.data("height") && e.tdWrapper.css("height", e.tdWrapper.data("height") + parseInt(t))
      })
    }, i = (e, t, i, n) => {
      e || (e = {});
      const a = e => {
        if (n) {
          let t = e.split(/\s*\/\s*/);
          return t.length > 1 ? {_big: l(t[0]), _small: l(t[1])} : {_big: l(e), _small: l(e)}
        }
        return l(e)
      }, l = e => {
        switch (e) {
          case"false":
          case"FALSE":
            e = !1;
            break;
          case"true":
          case"TRUE":
            e = !0
        }
        return e = i(e)
      };
      return 3 === t.length && /^([a-z_0-9]+\s*,?\s*)+$/.test(t[1]) ? ("object" != typeof e && (e = {_ALL: e}), t[1].split(/\s*,\s*/).forEach(i => {
        e[i] = a(t[2])
      })) : "object" == typeof e && Object.keys(e).length ? e._ALL = a(t[1]) : e = a(t[1]), e
    };
    App.pcTableMain.prototype.__fillFloatBlock = function (n, a) {
      let l, s, o = this, r = "", d = {_ALL: !0}, c = 0, f = !1, p = !1, h = !1, u = !1, m = !1, b = {}, g = [], w = {};
      t.each(a, (function (e, n) {
        if (!o.isCreatorView && o.isReplacedToRowsButtonsField(n.name)) return;
        let a = !1;
        if (void 0 !== n.sectionTitle) {
          d = {_ALL: !0}, r = n.sectionTitle.trim(), c = 0, f = !1, p = !1, h = !1, u = !1, s = n, w = {}, b = {};
          let e = {}, l = r.match(/\*\*(.*)/);
          l && (l[1].trim().split(/\s*;\s*/).forEach(t => {
            let n = t.trim().split(/\s*:\s*/);
            if (n[0] = n[0].toLowerCase(), n.length > 1) switch (n[0]) {
              case"maxheight":
              case"height":
              case"maxwidth":
              case"nextline":
              case"blocknum":
              case"glue":
              case"fill":
              case"breakwidth":
              case"titleleft":
              case"titleright":
                let t;
                t = -1 !== ["titleleft", "titleright"].indexOf(n[0]) ? e => e.toString().trim().match(/^\d+$/) ? e.toString().trim() + "px" : e : e => e, b[n[0]] = i(b[n[0]], n, t, !1);
                break;
              case"outline":
                p = i(p, n, e => !0 === e ? "#e4e4e4" : e, !0);
                break;
              case"blocktitle":
                w = i(w, n, e => !1 === e ? "" : e, !1);
                break;
              case"title":
                e.title = e.title || {_ALL: !0};
                let a = i({}, n, e => e);
                "boolean" == typeof a ? e.title._ALL = a : e.title = {...e.title, ...a};
                break;
              case"border":
                h = i(h, n, e => !1 === e ? "transparent" : e, !0);
                break;
              case"plate":
                f = i(f, n, e => !1 === e ? "transparent" : e, !0);
                break;
              case"platemh":
                u = i(u, n, e => "string" == typeof e && /^\d+$/.test(e) ? e + "px" : e, !0);
                break;
              case"plateh":
                m = i(m, n, e => "string" == typeof e && /^\d+$/.test(e) ? e + "px" : e, !0);
                break;
              case"gap":
                e.gap = i(e.gap, n, e => e);
                break;
              default:
                switch (n[1]) {
                  case"true":
                  case"TRUE":
                    e[n[0]] = !0;
                    break;
                  case"false":
                  case"FALSE":
                    e[n[0]] = !1
                }
            }
          }), c = e.gap || c), d = "title" in e ? e.title : d, o.isCreatorView ? (r = r.replace(/(\*\*.*)/, ""), a = !1 === e.label || "" === r) : !1 === e.label ? r = "" : (r = r.replace(/(\*\*.*)/, ""), r = t("<div>").text(r.trim()).html())
        }
        (!l || n.tableBreakBefore && n.sectionTitle) && (l = [], g.push({
          title: r,
          lableLowOpacity: a,
          formatsFromSection: b,
          fields: l,
          withTitles: d,
          sectionGap: c,
          plate: f,
          sectionField: s,
          outline: p,
          blocktitle: w,
          border: h,
          plateh: m,
          platemh: u
        }), r = ""), n.showMeWidth && l.push({field: n, panelColor: void 0})
      }));
      const v = (e, t) => {
        let i = -1, n = e.fieldCell;
        t && (n.prev().is("br") || n.is(":first-child") || n.prev().is('[data-type="blocknum"]') || ("object" != typeof t ? i = t : e.format.blocknum in t ? i = t[e.format.blocknum] : e.field.name in t && (i = t[e.field.name]), i && /^\d+$/.test(i) && (i = parseInt(i) - 1, i += "px"))), n.css("marginLeft", i)
      };
      g.forEach(i => {
        if (!i.fields || !i.fields.length) return;
        let l = t('<div class="pcTable-section ">').appendTo(n), s = i.sectionGap;
        if (i.title || o.isCreatorView && i.sectionField) {
          let e = t("<span>").html(i.title);
          o.isCreatorView && (t('<span class="danger"> <i class="fa fa-edit" style="font-size: 14px; padding-left: 10px;"></i></span>').on("click", () => (this.__editSectionTitle(i.sectionField), !1)).appendTo(e), t('<span class="danger"> <i class="fa fa-times" style="font-size: 14px; padding-left: 5px;"></i></span>').on("click", () => (this.__deleteSection(i.sectionField), !1)).appendTo(e)), o.___createClosedSection(l, t('<div class="pcTable-sectionTitle"></div>').html(e).appendTo(l), "param" === a[0].category ? "p" : "f"), i.lableLowOpacity && l.find(".pcTable-sectionTitle").addClass("lowOpacity")
        }
        let r = t('<div class="pcTable-floatBlock">').appendTo(l);
        if (!r.is(":visible")) return void l.data("closedrender", !0);
        let d, c = 0, f = [], p = [f], h = [p];
        i.fields.forEach((e, n) => {
          e.field.tableBreakBefore && 0 !== n && (r = t('<div class="pcTable-floatBlock">').appendTo(l), f = [], p = [f], h.push(p)), o.data_params[e.field.name] = o.data_params[e.field.name] || {}, e.format = o.data_params[e.field.name].f || {}, Object.keys(i.formatsFromSection).forEach(t => {
            let n = (a = t, l = e.field.name, s = i.formatsFromSection, o = e.format, a in o ? o[a] : a in s && s[a] ? "object" == typeof s[a] ? l in s[a] ? s[a][l] : s[a]._ALL : s[a] : null);
            var a, l, s, o;
            null !== n && (e.format[t] = n)
          });
          let a = e.format.blocknum || 0;
          if (void 0 !== e.format.blocknum && l.addClass("sectionWithPannels"), 0 === f.length || f[f.length - 1].num != a || e.field.tableBreakBefore && 0 !== n) {
            if (d = t('<div class="pcTable-floatInner">').appendTo(r), a && o.isCreatorView && d.append('<div data-type="blocknum" style="position:absolute;z-index: 100; color: #ff8585; background-color: #fff; padding: 3px; font-size: 10px; right: 4px; top: 4px;">' + a + "</div>"), i.outline && (a in i.outline ? d.data("border-color", i.outline[a]) : d.data("border-color", i.outline)), i.plate && (a in i.plate ? d.data("plate", i.plate[a]) : d.data("plate", i.plate)), a && i.blocktitle[a]) {
              let e = t('<div class="blocktitle"></div>').append(t("<span>").text(i.blocktitle[a]));
              d.prepend(e)
            }
            i.plateh && (a in i.plateh ? d.data("plateh", i.plateh[a]) : d.data("plateh", i.plateh)), i.platehm && (a in i.platehm ? d.data("platehm", i.platehm[a]) : d.data("platehm", i.platehm)), f.push({
              div: d,
              num: a,
              isWrappable: !1,
              sec: i,
              fields: []
            })
          }
          let s = f[f.length - 1];
          s.fields.length > 0 && !e.format.nextline && (s.isWrappable = !0), s.fields.push(e), e._showMeWidth = e.field.showMeWidth, e.format.breakwidth && (e.field.showMeWidth = parseInt(e.format.breakwidth)), e.format.nextline && n > 0 && d.append("<br/>");
          let u = t("<div>").appendTo(d);
          u.width(e.field.showMeWidth + 1), u.attr("data-field-type", e.field.type), e.field.isNoTitles = !1, "withTitles" in i && (e.field.name in i.withTitles ? e.field.isNoTitles = !i.withTitles[e.field.name] : a && a in i.withTitles ? e.field.isNoTitles = !i.withTitles[a] : "_ALL" in i.withTitles && (e.field.isNoTitles = !i.withTitles._ALL));
          let m = o._createHeadCell(null, e.field, e.panelColor).appendTo(u),
            b = t('<div class="td-wrapper">').appendTo(u);
          (e.format.titleleft || e.format.titleright) && (u.css("display", "grid"), o.isCreatorView && b.css("margin-top", "18px"), e.format.titleleft ? u.css("grid-template-columns", e.format.titleleft + " 1fr") : (b.prependTo(u), u.css("grid-template-columns", "1fr " + e.format.titleright)));
          let g = o._createCell(o.data_params, e.field).appendTo(b);
          if (o.isCreatorView) {
            let t = 33;
            e.field.isNoTitles || (t = 68), e.format.maxheight && (e.format.maxheight = parseInt(e.format.maxheight) + t), e.format.height && (e.format.height = parseInt(e.format.height) + t)
          } else if (!e.field.isNoTitles) {
            let t = 35;
            e.format.maxheight && (e.format.maxheight = parseInt(e.format.maxheight) + t), e.format.height && (e.format.height = parseInt(e.format.height) + t)
          }
          if (e.format.maxheight) {
            let t = {maxHeight: e.format.maxheight};
            e.format.height && (t.minHeight = e.format.height, b.css("minHeight", e.format.height)), g.height(""), u.css(t), u.addClass("nonowrap")
          } else e.format.height && (g.height(""), u.addClass("nonowrap"), u.height(e.format.height));
          e.field.isNoTitles ? o.isCreatorView ? m.addClass("no-titled") : m.empty() : (m.css("display", "table-cell"), e.th = m, m.height() > c && (c = m.height())), e.td = g, e.th = m.width(""), e.tdWrapper = b, e.fieldCell = u, o.isCreatorView && (e.format.glue && u.addClass("f-glue"), e.format.fill && u.addClass("f-fill"))
        }), i.fields.forEach(e => {
          let t = 0;
          if (e.th) {
            e.th.css("display", "");
            let i = 21;
            o.isCreatorView && (i = 40), e.th.height(i), t = e.th.outerHeight()
          }
          e.format.maxheight ? e.tdWrapper.css("maxHeight", e.format.maxheight - t - 10) : e.format.height && !e.format.maxheight && (e.tdWrapper.css("height", e.format.height - t), e.tdWrapper.data("height", e.format.height - t)), v(e, s)
        });
        const u = function (e) {
          if (!e.length) return 0;
          let t, i, n = e[0].div.parent(), a = n.position().left + parseInt(n.css("paddingLeft")) + n.width();
          for (let n in e) {
            let n = e[e.length - 1].div;
            n.w = !1;
            let a = n.position().left + n.outerWidth();
            (!t || a > t) && (t = a, i = e[e.length - 1])
          }
          return i.w = !0, a - t
        }, m = function (e) {
          let t = !0;
          return e.some((e, i) => {
            if (u(e) < 0) return t = !1, !0
          }), t
        };
        let b = !1;
        h.forEach((function (i, n) {
          let a = 0;
          for (; ++a < 400 && !m(i);) i.forEach((function (e, t) {
            if (u(e) < 0) {
              b = !0;
              for (let t = e.length - 1; t >= 0; t--) {
                let i = e[t];
                if (i.isWrappable && i.w) {
                  let e, t, n;
                  for (let a = i.fields.length - 1; a >= 1; a--) {
                    let l = i.fields[a];
                    l.i = a, (!n || l.fieldCell.position().left > n) && (n = l.fieldCell.position().left, e = l, t = a)
                  }
                  if (e && !e.format.nextline && !e.fieldCell.prev().is("br")) {
                    if (e.format.glue) for (; ;) {
                      if (!e.i) {
                        e = null;
                        break
                      }
                      if (e = i.fields[e.i - 1], t = e.i, e.format.nextline || e.fieldCell.is(":first-child") || e.fieldCell.prev().is("br")) {
                        e = null;
                        break
                      }
                      if (!e.format.glue) break
                    }
                    if (e) {
                      e.fieldCell.before('<br class="wrapped"/>'), e.fieldCell.nextAll("br.wrapped").remove();
                      for (let e = t; e <= i.fields.length - 1; e++) v(i.fields[e], s);
                      return
                    }
                  }
                }
              }
              let t = i[0].length - 1;
              if (t > 0) {
                let e = i[0][t];
                e.div.before("<br/>"), i.push([e]), i[0].splice(t, 1), i.forEach((function (e) {
                  e.forEach((function (e) {
                    e.div.find("br.wrapped").remove(), e.fields.forEach(e => v(e, s))
                  }))
                }))
              }
            }
          }));
          i.forEach((function (i, n) {
            i.forEach(({div: e, fields: t}) => {
              t.forEach(e => {
                e.format.breakwidth && (e.fieldCell.css("width", e._showMeWidth), e.field.showMeWidth = e._showMeWidth)
              })
            }), function (e, i) {
              if (!e.length) return;
              /Safari/.test(navigator.userAgent) && e.forEach((function (e) {
                e.div.width(100), e.div.width("")
              }));
              let n = u(e), a = 0 + parseInt(e[0].div.css("paddingTop")), l = [], s = [], o = 0;
              e.forEach((function (e) {
                let t, n = null, r = {width: 0, fields: []};
                e.fields.forEach((function (e) {
                  (e.format.maxwidth && e.field.width < e.format.maxwidth || e.format.fill && (i || e.fieldCell.position().top !== a || null === a)) && (n != e.fieldCell.position().top && (n = e.fieldCell.position().top, r = {
                    width: 0,
                    fields: []
                  }, n !== a ? s.push(r) : l.push(r)), r.fields.push(e), r.width += e.field.width, n === a && (o += e.field.width)), t = e.fieldCell
                }))
              }));
              const r = function (e) {
                let i, n, a = e.fields[0].fieldCell.parent(), l = e.fields[0].fieldCell.position().top;
                a.find(">div").each((function (e, a) {
                  let s = t(a), o = s.position();
                  o.top === l && (!i || o.left > i) && (i = o.left, n = s)
                }));
                let s = a.width() + parseInt(a.css("paddingLeft")) - i - n.outerWidth(!0), o = 0, r = 0;
                for (; r++ < 100 && e.fields.length && s > 1;) e.fields.forEach((function (t, i) {
                  if (s > o) {
                    let n = Math.round(s / e.width * t.field.width);
                    t.format.fill || t.format.maxwidth <= t.fieldCell.width() + n && (n = t.format.maxwidth - t.fieldCell.width(), e.fields.splice(i, 1), e.width -= t.field.width), o += n, t.fieldCell.width(t.fieldCell.width() + n)
                  }
                })), s -= o, o = 0
              };
              l.forEach(r);
              let d = n, c = 0, f = 0;
              for (; d > 1 && f++ < 6 && l.length;) l.forEach((function (e, t) {
                e.fields.forEach((function (t, n) {
                  if (d > c) {
                    let a = Math.round(d / o * t.field.width);
                    a > d - c && (a = d - c), i && t.format.fill || !(t.format.maxwidth <= t.fieldCell.width() + a) || (a = t.format.maxwidth - t.fieldCell.width(), e.fields.splice(n, 1), o -= t.field.width), c += a, t.fieldCell.width(t.fieldCell.width() + a)
                  }
                })), 0 === e.fields.length && l.splice(t, 1)
              })), d -= c, c = 0;
              s.forEach(r)
            }(i, b), i.forEach(({div: t, fields: i, sec: n, blocknum: a}) => {
              let l = [], s = !0;
              i.forEach(t => {
                if (t.fieldCell.prev().is("br") && (!o.isCreatorView && l.length && e(l), l = [], s = !0), t.field.isNoTitles ? s && l.push(t) : (l = [], s = !1), n.border) {
                  let e;
                  if (e = t.field.name in n.border ? n.border[t.field.name] : a in n.border ? n.border[a] : n.border, e) {
                    let i = i => {
                      let n = b ? e._small : e._big, a = {borderColor: n};
                      return "transparent" === n ? (i.background || t.panelColor || (a.backgroundColor = "transparent"), "button" === t.field.type && (t.fieldCell.addClass("no-border"), a.Button = {}, i.background && (a.Button.backgroundColor = i.background), i.color && (a.Button.color = i.color), t.td.find("button").css(a.Button), a.backgroundColor = "transparent")) : !0 === n && (a.borderColor = "", a.backgroundColor = "", "button" === t.field.type && (t.fieldCell.removeClass("no-border"), a.Button = {}, a.Button.backgroundColor = "", a.Button.color = i.color, t.td.find("button").css(a.Button))), a
                    };
                    t.td.css(i(t.format)), t.field.td_style = i
                  } else t.td.css(func_format(t.format)), t.field.td_style = func_format
                }
              }), !o.isCreatorView && l.length && e(l);
              let r = {};
              if (t.data("plateh")) {
                let e = t.data("plateh"), i = b ? e._small : e._big;
                !1 !== i && (r.height = i, r.overflow = "auto")
              }
              if (t.data("platemh")) {
                let e = t.data("platemh"), i = b ? e._small : e._big;
                !1 !== i && (r.maxHeight = i, r.overflow = "auto")
              }
              t.data("border-color") && (r.borderColor = b ? t.data("border-color")._small : t.data("border-color")._big), t.data("plate") && (r.backgroundColor = b ? t.data("plate")._small : t.data("plate")._big), t.css(r)
            })
          }))
        }))
      })
    }
  }(), t.extend(App.pcTableMain.prototype, {
    _addHorizontalDraggable: function () {
      this._innerContainer.off("mousedown.HorizontalDraggable mouseout").on("mousedown.HorizontalDraggable", (function (e) {
        for (var i = e; i;) {
          if (t(e.target).is("input")) return !0;
          if (i == e.originalEvent) break;
          i = e.originalEvent
        }
        return t(this).data("x", e.clientX).data("scrollLeft", this.scrollLeft), !1
      })).on("mousemove", (function (e) {
        if (0 === t(e.target).closest(".InsertRow").length && "INPUT" !== e.target.tagName && 1 === e.buttons && 0 === e.button && Math.abs(t(this).data("x") - e.clientX) > 20) {
          let i;
          t(this).data("moved", !0), i && clearTimeout(i), i = setTimeout((function () {
            t(this).data("moved", !1)
          }), 200), this.scrollLeft = t(this).data("scrollLeft") + t(this).data("x") - e.clientX
        }
      }))
    }
  }), App.pcTableMain.prototype._addRowPanel = function (e, i, n) {
    var a = t('<div style="width: 165px;"><div class="buttons insert-row-buttons"></div></div>');
    if (void 0 !== n) {
      var l = a.find(".buttons").empty();
      t.each(n, (function (e, i) {
        if ("function" == typeof i) var n = t('<button class="btn btn-sm btn-default">').html(e).on("click", i); else "object" == typeof i && "checkbox" == i.type && (n = t('<input type="checkbox">'), i.id && n.attr("id", i.id), i.func && n.on("change", i.func), n = n.wrap('<span style="font-size: 10px; padding-left: 8px;" >').parent().append(' <span style="padding-top: 2px;">' + e + "</span>"));
        l.append(" "), l.append(n)
      }))
    }
    i.on("remove", (function () {
      a.remove()
    }));
    let s = this;
    return setTimeout((function () {
      let e = {isParams: !0, $text: a, element: i, container: s._container, placement: "bottom", trigger: "manual"};
      App.popNotify(e);
      let n = i.attr("aria-describedby"), l = t("#" + n).addClass("warning-bg");
      l.find(".arrow").css("left", "80%"), s._positionPanel.call(s, l, i), a.show()
    }), 50), a
  }, App.pcTableMain.prototype._positionPanel = function (e, t) {
    t.position();
    let i = this.tableWidth - 120;
    this._innerContainer.width() > this.tableWidth ? e.css({left: i}) : e.css({left: this._innerContainer.width() - 120})
  }, t.extend(App.pcTableMain.prototype, {
    _csvExport: function (e) {
      "use strict";
      let t = this;
      this.model.csvExport(t.dataSortedVisible, e, Object.keys(App.filter(t.fields, (e, t) => !!t.showMeWidth))).then((function (e) {
        if (e.csv) {
          let i = new Blob([e.csv], {type: "text/csv;charset=utf-8"});
          saveAs(i, t.tableRow.title + "." + t.model.tableData.updated.dt + ".csv")
        }
      }))
    }, _csvImportClick: function (e) {
      let i = this;
      t('<input type="file" accept="text/csv">').on("change", (function () {
        if (this.files && this.files[0]) {
          let t = new FileReader;
          t.onload = function (t) {
            let n = t.target.result;
            i._csvImportUpload.call(i, n, e)
          }, t.onerror = function (e) {
            console.log(e.target.error)
          }, t.readAsDataURL(this.files[0])
        }
      })).click()
    }, _csvImportUpload: function (e, i) {
      let n = this, a = {}, l = Object.keys(App.filter(n.fields, (e, t) => !!t.showMeWidth && "column" === t.category)),
        s = function () {
          n.model.csvImport(e, i, a, "full" == i ? [] : l).then((function (e) {
            e.question ? App.modal(e.question[1], "Вопрос про csv-загрузку", {
              "Отменить": "close",
              "Загружаем": function (t) {
                "use strict";
                t.modal("hide"), a[e.question[0]] = 1, s()
              }
            }) : e.ok && n.table_modify.call(n, e)
          }))
        };
      if ("rows" === i) {
        let e = t("<div></div>");
        l.forEach(i => {
          e.append(t("<div>").text(n.fields[i].title || n.fields[i].name))
        });
        App.confirmation(e, {
          "Отменить": function (e) {
            e.close()
          }, "Загрузить": e => {
            s(), e.close()
          }
        }, "Проверьте соответствие структуры загружаемого файла последовательности полей")
      } else s()
    }
  }), function () {
    t.extend(App.pcTableMain.prototype, {
      ___fieldsHiddingShowAllButton: null, _hideHell_storage: {
        isset_fields: !1, opened: null, blinkIt: !1, getOpened: function () {
          return null === this._hideHell_storage.opened && (this._hideHell_storage.opened = a.getSavedOpenedVal(this.tableRow), !1 === this._hideHell_storage.opened && (this._hideHell_storage.blinkIt = !0)), this._hideHell_storage.opened
        }, checkIssetFields: function (e) {
          if (this.isCreatorView && this._beforeSpace) {
            let t = this._hideHell_storage.isset_fields;
            if (this._hideHell_storage.isset_fields = Object.keys(this.hidden_fields).length || Object.keys(this.fields).some(e => "n" !== e && (!this.fields[e].showMeWidth || this.fields[e].showMeWidth < 1)), e || t !== this._hideHell_storage.isset_fields) {
              let e = this._beforeSpace.find("#hide-hell").removeClass("btn-contour");
              this._hideHell_storage.isset_fields ? (e.removeAttr("disabled"), this._hideHell_storage.opened ? (e.find("i").addClass("fa-arrow-up").removeClass("fa-arrow-down").removeClass("fa-times"), e.addClass("btn-contour")) : (e.find("i").removeClass("fa-arrow-up").addClass("fa-arrow-down").removeClass("fa-times"), this._hideHell_storage.blinkIt && (App.blink(e, 8, "#fff"), this._hideHell_storage.blinkIt = !1))) : (e.attr("disabled", "disabled"), e.find("i").addClass("fa-times").removeClass("fa-arrow-up").removeClass("fa-arrow-down"))
            }
          }
        }, switchOpened: function () {
          this._hideHell_storage.opened = !this._hideHell_storage.opened, this._hideHell_storage.checkIssetFields.call(this, !0), a.saveOpenedVal(this.tableRow, this._hideHell_storage.opened), this._refreshHiddenFieldsBlock()
        }
      }, fieldsHiddingHide: function (e, t) {
        let i = l.get(this.tableRow) || {};
        t ? i[e] = this.fields[e].width : delete i[e], this.setVisibleFields(i)
      }, setVisibleColumns: function () {
        let e = this;
        this.fieldCategories.visibleColumns = [], this.fieldCategories.column.forEach((function (t) {
          t.showMeWidth && e.fieldCategories.visibleColumns.push(t)
        }))
      }, setColumnWidth: function (e, t, i) {
        let n = l.get(this.tableRow) || {};
        n[e] = t;
        let a = this;
        i ? App.getPcTableById(2).then((function (e) {
          e.model.checkEditRow({id: i}).then((function (l) {
            l.row && (l.row.data_src.v.width.Val = parseInt(t), e.model.save({[i]: l.row}).then((function () {
              a.setVisibleFields(n)
            })))
          }))
        })) : this.setVisibleFields(n)
      }, loadVisibleFields: function (e) {
        let t = {}, i = l.getDate(this.tableRow);
        e = e || {}, !i || "" != this.tableRow.fields_actuality && this.tableRow.fields_actuality > i ? this.setVisibleFields(t, !0, moment().format(App.dateTimeFormats.db), e) : (t = l.get(this.tableRow) || {}, this.setVisibleFields(t, !0, void 0, e))
      }, setVisibleFields: function (e, t, i, n) {
        let a = this, s = !1, o = !1;
        n = n || {}, e && 0 === Object.keys(e).length ? (e = {}, Object.values(a.fields).forEach((function (t) {
          let i = t.hidden && !1 !== n[t.name] || !0 === n[t.name] ? 0 : t.width;
          i != a.fields[t.name].showMeWidth && ("column" === t.category || "footer" === t.category && t.column ? s = !0 : o = !0), a.fields[t.name].showMeWidth = i, e[t.name] = a.fields[t.name].showMeWidth
        }))) : Object.values(a.fields).forEach((function (i) {
          let l;
          l = "filter" === i.category ? i.width : void 0 !== e[i.name] ? parseInt(e[i.name]) : t && !i.hidden ? i.width : 0, i.name in n && (l = !0 === n[i.name] ? 0 : i.width), l != a.fields[i.name].showMeWidth && ("column" === i.category || "footer" === i.category && i.column ? s = !0 : o = !0), a.fields[i.name].showMeWidth = l, e[i.name] = a.fields[i.name].showMeWidth
        })), l.set(e, this.tableRow, i), this.setVisibleColumns(), this._header && (o && this.setWidthes(), s && (this._refreshHead(), this.rowButtonsCalcWidth(), this._refreshContentTable(!0), this._rowsButtons(), this._rerenderColumnsFooter(), Object.keys(this.data).forEach(e => {
          delete this.data[e].$tr
        }), this.ScrollClasterized.insertToDOM(null, !0, !0)), this.isCreatorView && (this._hideHell_storage.checkIssetFields.call(a), this._refreshHiddenFieldsBlock())), this.fieldsHiddingGetButton(), this._insertRow && this._closeInsertRow()
      }, hideAdminViewFields: function () {
        let e = this, t = l.get(this.tableRow) || {};
        Object.keys(t).forEach((function (i) {
          if (t[i] > 0) {
            let n = e.fields[i];
            (!n || n.webRoles && 1 === n.webRoles.length && "1" == n.webRoles[0]) && delete t[i]
          }
        })), this.setVisibleFields(t)
      }, setDefaultVisibleFields: function () {
        let e = {};
        Object.values(this.fields).forEach((function (t) {
          t.hidden ? e[t.name] = 0 : e[t.name] = t.width
        })), this.setVisibleFields.call(this, e)
      }, fieldsHiddingShowPanel: function () {
        let i, n, a = this, l = t('<div class="hidding-form">');
        const o = function (e) {
          e = e || t("#defaultEyeGroups"), r = a.tableRow.fields_sets || [], e.empty().append("<b>Наборы по умолчанию:</b> "), r.forEach((function (i, n) {
            let l = t('<a href="#">').text(i.name).data("index", n);
            e.append(l.wrap("<span>").parent()), a.isCreatorView && (n > 0 && l.parent().append(t('<button class="btn btn-xxs field_name"><i class="fa fa-arrow-left"></i></button>').data("index", n)), l.parent().append(t('<button class="btn btn-xxs field_name"><i class="fa fa-remove"></i></button>').data("index", n)))
          })), e.off(), a.isCreatorView && e.on("click", ".btn", (function () {
            if (t(this).find("i").is(".fa-remove")) {
              let e = t(this);
              a.model.removeEyeGroupSet(e.data("index")).then((function (e) {
                a.tableRow.fields_sets = e.sets, o()
              }))
            } else {
              let e = t(this);
              a.model.leftEyeGroupSet(e.data("index")).then((function (e) {
                a.tableRow.fields_sets = e.sets, o()
              }))
            }
          })), e.on("click", "a", (function () {
            let e = t(this).data("index"), i = r[e].fields;
            if (Array.isArray(i)) {
              let e = {};
              i.forEach((function (t) {
                a.fields[t] && (e[t] = a.fields[t].width)
              })), i = e
            }
            a.setVisibleFields.call(a, i), n.close()
          }))
        };
        let r = s.getNames(a.tableRow);
        if (r && r.length) {
          let e = t('<div class="fieldsHiddenSets">').appendTo(l);
          e.append("<b>Наборы:</b> "), r.forEach((function (i) {
            let n = t('<a href="#">').text(i).data("name", i);
            e.append(n.wrap("<span>").parent());
            let l = n.parent();
            l.append(t('<button class="btn btn-xxs" data-action="remove"><i class="fa fa-remove"></i></button>').data("name", i)), a.isCreatorView && l.append(t('<button class="btn btn-xxs field_name" data-action="addDefaultSet" title="Сохранить как набор по умолчанию"><i class="fa fa-save"></i></button>').data("name", i))
          })), e.on("click", ".btn", (function () {
            let e = t(this), i = e.data("name");
            if (a.isCreatorView && "addDefaultSet" === t(this).data("action")) {
              let t = s.get(a.tableRow, i) || [];
              a.model.AddEyeGroupSet(i, t).then((function (t) {
                a.tableRow.fields_sets = t.sets, o(), s.remove(a.tableRow, i), e.parent().remove()
              }))
            } else s.remove(a.tableRow, i), e.parent().remove()
          })), e.on("click", "a", (function () {
            let e = t(this).data("name"), i = s.get(a.tableRow, e) || [];
            a.setVisibleFields.call(a, i), n.close()
          }))
        }
        r = a.tableRow.fields_sets || [];
        let d = t('<div class="fieldsHiddenSets" id="defaultEyeGroups">').appendTo(l);
        r && r.length && o(d), l.on("click", 'input[type="checkbox"]', (function (e) {
          let n = t(this), a = n.closest(".hidding-form");
          if (e.shiftKey) {
            a.find("input").index(n);
            let e = a.find("input").index(t(this));
            a.find("input").each((function (a) {
              (e <= a && a < i || e >= a && a > i) && t(this).prop("checked", !!n.is(":checked") && "checked").trigger("change")
            }))
          } else i = a.find("input").index(t(this))
        }));
        let c = [{
          label: "Применить", action: function (e) {
            let i = {};
            l.find("input:checked").each((function () {
              let e = t(this);
              i[e.attr("name")] = parseInt(e.closest("div").find('input[type="number"]').val()) || null
            })), a.setVisibleFields.call(a, i), e.close()
          }
        }, {
          label: "По умолчанию", action: function (e) {
            e.close(), a.setDefaultVisibleFields.call(a)
          }
        }, {
          label: "Показать все", action: function (e) {
            e.close();
            let t = {};
            Object.values(a.fields).forEach((function (e) {
              t[e.name] = e.width
            })), a.setVisibleFields.call(a, t)
          }
        }, {
          label: "Создать набор", action: function (i) {
            let n = {};
            l.find("input:checked").each((function () {
              let e = t(this);
              n[e.attr("name")] = parseInt(e.closest("div").find('input[type="number"]').val()) || null
            })), a.setVisibleFields.call(a, n), i.close();
            let o = t("<div></div>");
            o.append('<div style="padding-top: 10px;"><label>Название набора</label><input type="text" id="fieldsSetName" class="form-control"/></div>'), e.top.BootstrapDialog.show({
              message: o,
              title: "Сохранить набор полей",
              type: null,
              buttons: [{
                label: "Сохранить", action: function (e) {
                  let t = o.find("#fieldsSetName");
                  "" === t.val().trim() ? t.addClass("error") : (s.set(a.tableRow, n, t.val().trim()), e.close())
                }
              }, {
                label: null,
                icon: "fa fa-times",
                cssClass: "btn-m btn-default btn-empty-with-icon",
                action: function (e) {
                  e.close()
                }
              }],
              draggable: !0
            })
          }
        }, {
          label: "Отмена", action: function (e) {
            e.close()
          }
        }];
        a.isCreatorView && c.splice(2, 0, {
          label: "Скрыть адм.поля", action: function (e) {
            e.close(), a.hideAdminViewFields.call(a)
          }
        });
        let f = {param: "Хэдер", column: "Колонки", footer: "Футер"};
        Object.keys(f).forEach((function (e) {
          a.fieldCategories[e] && a.fieldCategories[e].length && (l.append('<div class="category-name">' + f[e] + "</div>"), t.each(a.fieldCategories[e], (function (e, i) {
            let n = "";
            i.hidden && (n = " (Скрыто по умолчанию)");
            let a = t('<div class="form-check no-bold"><label class="form-check-label"><input type="checkbox" name="' + i.name + '" class="form-check-input"> ' + i.title + n + '</label> <input type="number" placeholder="' + i.width + '" value="' + (i.showMeWidth && i.showMeWidth !== i.width ? i.showMeWidth : i.width) + '"/></div>');
            i.showMeWidth && (a.find("input").prop("checked", !0), a.attr("data-checked", !0)), a.appendTo(l)
          })))
        })), l.on("change", 'input[type="checkbox"]', (function () {
          let e = t(this).closest("div");
          t(this).is(":checked") ? e.attr("data-checked", !0) : e.removeAttr("data-checked")
        })), n = e.top.BootstrapDialog.show({
          message: l,
          title: "Видимость полей",
          buttons: c,
          type: null,
          draggable: !0,
          onshow: function (e) {
            a.isCreatorView && e.$modalContent.css({width: "800px"})
          }
        })
      }, fieldsHiddingShowPanelMobile: function () {
        let i, n, a = this, l = t('<div class="hidding-form">');
        let s = a.tableRow.fields_sets || [], o = t('<div class="fieldsHiddenSets" id="defaultEyeGroups">').appendTo(l);
        s && s.length && function (e) {
          e = e || t("#defaultEyeGroups"), s = a.tableRow.fields_sets || [], e.empty().append("<b>Наборы по умолчанию:</b> "), s.forEach((function (i, n) {
            let a = t('<a href="#">').text(i.name).data("index", n);
            e.append(a.wrap("<span>").parent())
          })), e.off(), e.on("click", "a", (function () {
            let e = t(this).data("index"), i = s[e].fields;
            if (Array.isArray(i)) {
              let e = {};
              i.forEach((function (t) {
                a.fields[t] && (e[t] = a.fields[t].width)
              })), i = e
            }
            a.setVisibleFields.call(a, i), n.close()
          }))
        }(o), l.on("click", 'input[type="checkbox"]', (function (e) {
          let n = t(this), a = n.closest(".hidding-form");
          if (e.shiftKey) {
            a.find("input").index(n);
            let e = a.find("input").index(t(this));
            a.find("input").each((function (a) {
              (e <= a && a < i || e >= a && a > i) && t(this).prop("checked", !!n.is(":checked") && "checked").trigger("change")
            }))
          } else i = a.find("input").index(t(this))
        }));
        let r = [{
          label: "Применить", action: function (e) {
            let i = {};
            l.find("input:checked").each((function () {
              let e = t(this);
              i[e.attr("name")] = a.fields[e.attr("name")].width
            })), a.setVisibleFields.call(a, i), e.close()
          }
        }, {
          label: "По умолчанию", action: function (e) {
            e.close(), a.setDefaultVisibleFields.call(a)
          }
        }, {
          label: "Показать все", action: function (e) {
            e.close();
            let t = {};
            Object.values(a.fields).forEach((function (e) {
              t[e.name] = e.width
            })), a.setVisibleFields.call(a, t)
          }
        }, {
          label: "Отмена", action: function (e) {
            e.close()
          }
        }], d = {param: "Хэдер", column: "Колонки", footer: "Футер"};
        Object.keys(d).forEach((function (e) {
          a.fieldCategories[e] && a.fieldCategories[e].length && (l.append('<div class="category-name">' + d[e] + "</div>"), t.each(a.fieldCategories[e], (function (e, i) {
            let n = "";
            i.hidden && (n = " (Скрыто по умолчанию)");
            let a = t('<div class="form-check no-bold"><label class="form-check-label"><input type="checkbox" name="' + i.name + '" class="form-check-input"> ' + i.title + n + "</label></div>");
            i.showMeWidth && (a.find("input").prop("checked", !0), a.attr("data-checked", !0)), a.appendTo(l)
          })))
        })), l.on("change", 'input[type="checkbox"]', (function () {
          let e = t(this).closest("div");
          t(this).is(":checked") ? e.attr("data-checked", !0) : e.removeAttr("data-checked")
        })), n = e.top.BootstrapDialog.show({
          message: l,
          title: "Видимость полей",
          buttons: r,
          type: null,
          draggable: !0,
          onshow: function (e) {
            a.isCreatorView && e.$modalContent.css({width: "800px"})
          }
        })
      }, fieldsHiddingGetButton: function (e) {
        "use strict";
        let i = this;
        if (!this.___fieldsHiddingShowAllButton) if (this.___fieldsHiddingShowAllButton = t('<button class="btn btn-sm"><span class="fa fa-eye-slash"></span></button>'), this.isMobile) this.___fieldsHiddingShowAllButton.on("click", (function () {
          i.fieldsHiddingShowPanelMobile.call(i)
        })); else {
          let e;
          this.___fieldsHiddingShowAllButton.on("click", (function () {
            i.fieldsHiddingShowPanel.call(i)
          })).on("contextmenu", (function () {
            return i.isCreatorView ? e ? (clearTimeout(e), e = null, i.hideAdminViewFields.call(i, !0)) : e = setTimeout((function () {
              i.setDefaultVisibleFields.call(i), e = null
            }), 500) : i.setDefaultVisibleFields.call(i), !1
          }))
        }
        return Object.values(i.fields).some((function (e) {
          if (e.showInWeb && !e.hidden && !e.showMeWidth) return !0
        })) ? (this.___fieldsHiddingShowAllButton.addClass("btn-warning"), this.___fieldsHiddingShowAllButton.removeClass("btn-default"), e && App.blink(this.___fieldsHiddingShowAllButton, 8, "#fff")) : (this.___fieldsHiddingShowAllButton.addClass("btn-default"), this.___fieldsHiddingShowAllButton.removeClass("btn-warning")), this.___fieldsHiddingShowAllButton
      }
    });
    let i = "pcTableShowFieldsWithDates", n = function (e) {
      let t = e.id;
      return "calcs" === e.type && (t += "$" + e.__version), t
    }, a = {
      saveOpenedVal: function (e, t) {
        localStorage.setItem(this.getKeyString(e), t.toString())
      }, getKeyString: function (e) {
        return e.id + "/" + e.__version
      }, getSavedOpenedVal: function (e) {
        let t = localStorage.getItem(this.getKeyString(e));
        return !t || JSON.parse(t)
      }
    }, l = {
      set: function (e, t, a) {
        let l = n(t), s = {}, o = e || {};
        try {
          s = JSON.parse(localStorage.getItem(i)) || {}
        } catch (e) {
        }
        a || !s[l] ? s[l] = [o, a] : s[l][0] = o, localStorage.setItem(i, JSON.stringify(s))
      }, get: function (e) {
        let t = n(e);
        return l.getInner(t)[0]
      }, getDate: function (e) {
        let t = n(e);
        return l.getInner(t)[1]
      }, getInner: function (e) {
        let t;
        try {
          t = JSON.parse(localStorage.getItem(i)) || {}
        } catch (e) {
          t = {}
        }
        return t[e] || []
      }
    }, s = {
      set: function (e, t, i) {
        let a = [], l = "pcTableShowFieldsSets" + n(e), s = t || [];
        try {
          a = JSON.parse(localStorage.getItem(l)) || {}
        } catch (e) {
        }
        a[i] = s, localStorage.setItem(l, JSON.stringify(a))
      }, get: function (e, t) {
        let i, a = "pcTableShowFieldsSets" + n(e);
        try {
          i = JSON.parse(localStorage.getItem(a)), i = i[t]
        } catch (e) {
        }
        return null == i && (i = void 0), i
      }, getNames: function (e) {
        let t, i = "pcTableShowFieldsSets" + n(e);
        try {
          return t = JSON.parse(localStorage.getItem(i)), Object.keys(t)
        } catch (e) {
        }
        return null == t && (t = void 0), t
      }, remove: function (e, t) {
        let i, a = "pcTableShowFieldsSets" + n(e);
        try {
          i = JSON.parse(localStorage.getItem(a)), delete i[t], localStorage.setItem(a, JSON.stringify(i))
        } catch (e) {
        }
      }
    }
  }(), App.pcTableMain.prototype._print = function () {
    "use strict";
    let i = t('<div class="hidding-form">');
    const n = function (e) {
      if (e.showMeWidth) return !0
    };
    this.fieldCategories.param.length && this.fieldCategories.param.some(n) && i.append('<div class="form-check no-bold"><label class="form-check-label"><input type="checkbox" name="params" class="form-check-input" checked="checked"> Параметры</label></div>'), this.fieldCategories.filter.length && i.append('<div class="form-check no-bold"><label class="form-check-label"><input type="checkbox" name="filters" class="form-check-input" checked="checked"> Фильтры</label></div>'), this.fieldCategories.column.length && this.fieldCategories.column.some(n) && this.dataSortedVisible.length && (i.append('<div class="form-check no-bold"><label class="form-check-label"><input type="checkbox" name="rows" class="form-check-input" checked="checked"> Строчную часть</label></div>'), i.append('<div class="form-check no-bold" style="padding-left: 20px;"><label class="form-check-label"><input type="checkbox" name="with-id" class="form-check-input"> с id</label></div>')), this._footersBlock.find(".val").length && i.append('<div class="form-check no-bold"><label class="form-check-label"><input type="checkbox" name="column-footers" class="form-check-input" checked="checked"> Футеры колонок</label></div>'), this._footersSubTable.find(".val").length && i.append('<div class="form-check no-bold"><label class="form-check-label"><input type="checkbox" name="other-footers" class="form-check-input" checked="checked"> Футеры вне колонок</label></div>');
    let a = this, l = [{
      label: "Печать", action: function (e) {
        let n = [];
        i.find("input:checked").each((function () {
          n.push(t(this).attr("name"))
        })), e.close(), a._printTable.call(a, n)
      }
    }, {
      label: "Отмена", action: function (e) {
        e.close()
      }
    }];
    e.top.BootstrapDialog.show({message: i, type: null, title: "Печать", buttons: l, draggable: !0})
  }, App.pcTableMain.prototype._printTable = function (e) {
    let t = this, i = {fields: {}};
    -1 !== e.indexOf("with-id") && (i.fields.id = 50);
    let n = {
      params: t.fieldCategories.param,
      filters: t.fieldCategories.filter,
      rows: t.fieldCategories.column,
      "column-footers": t.fieldCategories.footer.filter((function (e) {
        return "" !== e.column
      })),
      "other-footers": t.fieldCategories.footer.filter((function (e) {
        return "" === e.column
      }))
    };
    Object.keys(n).forEach((function (t) {
      -1 !== e.indexOf(t) && n[t].forEach((function (e) {
        "button" === e.type || e.showMeWidth < 1 || !e.showMeWidth || (i.fields[e.name] = e.showMeWidth)
      }))
    })), -1 !== e.indexOf("rows") && (i.ids = t.dataSortedVisible), i.sosiskaMaxWidth = 1100, t.model.printTable(i)
  }, App.pcTableMain.prototype.reOrderRows = function (e, i) {
    let n, a = this;
    if (a.tableRow.with_order_field && !a.nSorted) return App.notify("Для работы поля порядок перезагрузите таблицу"), !1;
    if (a.isRestoreView) return App.notify("Режим восстановления строк. Сортировка отключена"), !1;
    let l = [];
    if (0 === this.row_actions_get_checkedIds().length) {
      l.push(e);
      let t = this.dataSortedVisible.indexOf(e) + ("after" === i ? 1 : -1);
      if (t < 0 || !(t in this.dataSortedVisible)) return;
      if (this.data[this.dataSortedVisible[t]].f && this.data[this.dataSortedVisible[t]].f.blockorder) return void App.notify("Нельзя перемещать строку " + this.getRowTitle(this.data[this.dataSortedVisible[t]]));
      n = this.dataSorted.indexOf(this.dataSortedVisible[t]), l.forEach((function (e) {
        a.dataSorted.splice(a.dataSorted.indexOf(e), 1)
      }))
    } else {
      if (-1 !== a.row_actions_get_checkedIds().indexOf(e)) return App.notify("В качестве якоря для перемещения нужно выбрать не отмеченную строку"), !1;
      let t = this.row_actions_get_checkedIds().length;
      this.dataSorted.some((function (e, i) {
        if (0 === t) return !0;
        a.data[e].$checked && (l.push(e), --t)
      })), l.forEach((function (e) {
        a.dataSorted.splice(a.dataSorted.indexOf(e), 1)
      })), n = this.dataSorted.indexOf(e) + ("after" === i ? 1 : 0)
    }
    a.dataSorted.splice(n, 0, ...l), this.dataSortedVisible = [], a.dataSorted.forEach((function (e) {
      a.data[e].$visible && a.dataSortedVisible.push(e)
    })), a._refreshContentTable(), a.tableRow.with_order_field && t("table.pcTable-table").addClass("reordered"), a.row_actions_uncheck_all()
  }, App.pcTableMain.prototype.reOrderRowsSave = function () {
    let e = this;
    e._orderSaveBtn.prop("disabled", !0).find("i").attr("class", "fa fa-cog"), this.model.saveOrder(this.dataSorted).then((function (i) {
      e.table_modify(i), e._orderSaveBtn.prop("disabled", !1).find("i").attr("class", "fa fa-save"), t("table.pcTable-table").removeClass("reordered")
    }))
  }, App.pcTableMain.prototype.addReOrderRowBind = function () {
    let e = this;
    e._innerContainer.on("click", "td.n button", (function (i) {
      let n = t(this);
      e.tableRow.with_order_field && !e.__getCheckedRowsIds(void 0, !0, "blockorder") || e.reOrderRows.call(e, e._getItemByTr.call(e, n.closest("tr")).id, 1 === n.find(".fa-angle-up").length ? "before" : "after")
    }))
  }, App.pcTableMain.prototype.__formatFunctions = {
    blockadd: function () {
      this._closeInsertRow(), this._rowsButtons()
    }, tablecomment: function () {
      this._rowsButtons()
    }, buttons: function () {
      this._rerendParamsblock(), this._rowsButtons()
    }, blockorder: function () {
      this._refreshHead()
    }, block: function () {
      this._refreshParamsBlock(), this._refreshContentTable(!0), this._refreshFootersBlock()
    }, tabletitle: function () {
      this._refreshTitle()
    }, text: function () {
      this._refreshTableText()
    }, rowstitle: function () {
      this._container.find(".pcTable-rowsTitle:first").replaceWith(this._createRowsTitle())
    }, fieldtitle: function (e, t) {
      let i = {};
      const n = function (e) {
        return "footer" == e.category && e.column ? "tableFooter" : e.category
      };
      for (const a in e) this.fields[a] && e[a] !== t[a] && (i[n(this.fields[a])] = !0);
      for (const a in t) this.fields[a] && e[a] !== t[a] && (i[n(this.fields[a])] = !0);
      for (const e in i) switch (e) {
        case"param":
          this._rerendParamsblock();
          break;
        case"filter":
          this._rerendFiltersBlock();
          break;
        case"column":
          this._refreshHead();
          break;
        case"footer":
          this._rerendBottomFoolers();
          break;
        case"tableFooter":
          this._rerenderColumnsFooter()
      }
    }
  }, App.pcTableMain.prototype._connectTreeView = function () {
    let e = this;
    this._content.on("click", ".treeRow", (function () {
      let i = t(this);
      i.is(".dbl") ? e._actionTreeFolderRow(i, !0) : i.is(".ins") ? e._actionAddTreeFolderRow(i) : e._actionTreeFolderRow(i)
    })), this.model.loadTreeBranches = function (e, t, i) {
      return this.__ajax("post", {
        method: "loadTreeBranches",
        branchIds: e,
        withParents: t,
        recurcive: i
      }, null, null, this.filtersString || {})
    }, setTimeout(() => {
      if (this.fields.tree.treeViewLoad && !Object.values(this.filters || {}).length) {
        let i = !1;
        t("#table").data("pctable").fieldCategories.filter.forEach(t => {
          t.column && "tree" !== t.column && this.data_params[t.name].v && ("object" != typeof this.data_params[t.name].v ? this.data_params[t.name].v.match(/\*(ALL|NONE)\*/) : -1 === this.data_params[t.name].v.indexOf("*ALL*") && -1 === this.data_params[t.name].v.indexOf("**NONE**") && (this.filters[t.column] = this.data_params[t.name].v, i = !0)), i && e.__applyFilters(!0)
        })
      }
    }, 10)
  }, App.pcTableMain.prototype._createTreeFolderRow = function (e, i) {
    if (e.row && this.data[e.row.id]) {
      let t = {...e};
      delete t.row, e.row.__tree = t;
      let n = i || this._createRow(e.row);
      return this.data[e.row.id].__tree = t, e.tr = this.data[e.row.id].$tr = n
    }
    {
      let n = i || t('<tr><td class="id"></td></tr>'),
        a = t('<i class="fa fa-folder' + (e.opened ? "-open" : "") + ' treeRow"></i>').data("treeRow", e.v),
        l = t('<span class="tree-view">').append(a),
        s = t('<td colspan="' + (this.fieldCategories.column.length - 1) + '" class="tree-view-td" style="padding-left: ' + (7 + 22 * e.level) + 'px"></td>');
      s.append(l);
      let o, r = t("<div>"),
        d = t('<button class="btn btn-default btn-xxs treeRow"><i class="fa fa-caret-down"></i></button>').popover({
          html: !0,
          content: r,
          trigger: "manual",
          container: this._container,
          placement: "auto bottom"
        }).on("click", () => (t("body").trigger("click"), d.popover("show"), o = t("#" + d.attr("aria-describedby")), setTimeout(() => {
          this.closeCallbacks.push(() => {
            d && d.length && d.popover("hide")
          })
        }, 200), !1)).on("remove", () => {
          o.remove()
        });
      l.append(d);
      let c = t('<div class="menu-item"><i class="fa fa-arrows-v"></i> ' + (e.opened ? "Закрыть" : "Открыть") + " все</div>").data("treeRow", e.v).on("click", () => {
        this._actionTreeFolderRow(c, !0)
      }).appendTo(r);
      return this.fields.tree.selectTable && e.v && !this.fields.tree.treeBfield && (t('<div class="menu-item"><i class="fa fa-edit"></i> Редактировать</div>').on("click", () => {
        let t = {id: e.v};
        new EditPanel(this.fields.tree.selectTable, null, t).then(() => {
          this.model.refresh()
        })
      }).appendTo(r), t('<div class="menu-item"><i class="fa fa-plus"></i> Добавить ветку</div>').on("click", () => {
        let t = {[this.fields.tree.treeViewParentField || "tree"]: {v: e.v}};
        new EditPanel(this.fields.tree.selectTable, null, t, null, {tree: !0}).then(e => {
          this.treeReloadRows.push(Object.keys(e.chdata.rows)[0]), this.treeApply()
        })
      }).appendTo(r), this.isInsertable() && t('<div class="menu-item"><i class="fa fa-th-large"></i> Добавить строку</div>').on("click", () => {
        let t = {tree: {v: e.v}};
        new EditPanel(this, null, t, null, {tree: !0}).then(() => {
          this.model.refresh()
        })
      }).appendTo(r)), s.append(t('<span class="treeRow">').text(e.t).data("treeRow", e.v)), n.append(s), e.tr = n
    }
  }, App.pcTableMain.prototype.treeApply = function () {
    this.treeReloadRows.length ? this.model.loadTreeBranches(this.treeReloadRows, !0).then(e => {
      e.tree && (e.tree.forEach((e, t) => {
        this.treeIndex[e.v] && (this.treeIndex[e.v].trees = [])
      }), e.tree.forEach((e, t) => {
        this.getTreeBranch(e, t)
      })), e.rows && this._treeApplyRows(e.rows), this.treeReloadRows = [], this._treeRefresh(), this.__applyFilters(!0), this.ScrollClasterized.insertToDOM(null, !0, !0)
    }) : (this._treeRefresh(), this.__applyFilters(!0), this.ScrollClasterized.insertToDOM(null, !0, !0))
  }, App.pcTableMain.prototype._closeTreeFolderRow = function (e, t, i) {
    e.opened = !1, i = i || 0, t ? (this.treeIndex[e.v].trees.forEach(e => {
      this._closeTreeFolderRow(this.treeIndex[e], !0, i + 1)
    }), i || this.treeApply()) : this.treeApply()
  }, App.pcTableMain.prototype._actionTreeFolderRow = function (e, i) {
    let n = this.treeIndex[t(e).data("treeRow")];
    e && t(e).closest("td").html("Загрузка"), n.opened ? this._closeTreeFolderRow(n, i) : this._expandTreeFolderRow(n, i)
  }, App.pcTableMain.prototype._actionAddTreeFolderRow = function (e, t) {
    if ("self" === this.fields.tree.treeViewType) {
      let t = {tree: {v: this._getItemBytd(e.closest("td")).id}};
      new EditPanel(this, null, t, null, {tree: !0}).then(e => {
        this.table_modify(e), this.reloaded()
      })
    }
  }, App.pcTableMain.prototype._expandTreeFolderRow = function (e, t, i) {
    let n = !1;
    i || (n = !0, i = {counter: 0});
    const a = () => {
      this.treeIndex[e.v].trees.forEach(e => {
        i.counter++, this._expandTreeFolderRow(this.treeIndex[e], !0, i)
      })
    };
    e.l ? (e.opened = !0, t ? (a(), i.counter < 1 ? this.treeApply() : i.counter--) : this.treeApply()) : this.model.loadTreeBranches([e.v], null, !!t).then(n => {
      e.opened = !0, e.l = !0, n.tree && n.tree.forEach((e, t) => {
        this.getTreeBranch(e, t)
      }), n.rows && this._treeApplyRows(n.rows), (!t || i.counter-- < 1) && this.treeApply()
    })
  }, App.pcTableMain.prototype._treeRefresh = function () {
    const e = (t, i) => {
      i = i || 0, t.forEach(t => {
        this.treeIndex[t].level = i, 0 !== i || "opened" in this.treeIndex[t] || (this.treeIndex[t].opened = !0), this.dataSorted.push(this.treeIndex[t]), this.treeIndex[t].opened && (this.dataSorted.push(...this.treeIndex[t].sorted), e(this.treeIndex[t].trees, i + 1))
      })
    };
    this.dataSorted = [];
    let t = [...this.treeSort];
    "" == t[0] && 0 === this.treeIndex[""].sorted.length && delete t[0], e(t)
  }, App.pcTableMain.prototype._treeApplyRows = function (e) {
    e.map(e => {
      this.placeInTree(e), e.id in this.data || (this.data[e.id] = e, this.data[e.id].$checked = -1 !== this.__checkedRows.indexOf(e.id))
    }, this)
  }, App.pcTableMain.prototype.removeTreeBranch = function (e) {
    if (e in this.treeIndex) if (this.treeIndex[e].p) {
      let t = this.treeIndex[this.treeIndex[e].p];
      this.treeReloadRows.push(t.v)
    } else delete this.treeIndex[e], this.treeRefresh()
  }, App.pcTableMain.prototype.getElementInTree = function (e) {
    return this.treeIndex[e]
  }, App.pcTableMain.prototype.placeInTree = function (e, t, i) {
    let n = "sorted";
    const a = e => {
      let t = e.id;
      return this.fields.tree.treeBfield && e[this.fields.tree.treeBfield] && (t = e[this.fields.tree.treeBfield].v), t
    };
    if ("self" === this.fields.tree.treeViewType && (n = "trees"), t) {
      let i = t ? t.tree.v : void 0;
      if (null === i && (i = ""), "other" === this.fields.tree.treeViewType && t.tree_category && t.tree_category.v && this.treeIndex[t.tree_category.v] && this.treeIndex[t.tree_category.v].row && this.treeIndex[t.tree_category.v].row.id === t.id && delete this.treeIndex[t.tree_category.v].row, i in this.treeIndex) {
        let l = a(t);
        if (!e || a(e) != l) {
          let e = this.treeIndex[i][n].indexOf(l.toString());
          -1 !== e && this.treeIndex[i][n].splice(e, 1)
        }
      } else if ("self" === this.fields.tree.treeViewType && (!e || this.treeIndex[a(e)].p != this.treeIndex[a(t)].p)) {
        let e = this.treeSort.indexOf(a(t).toString());
        -1 !== e && this.treeSort.splice(e, 1)
      }
      this.treeRefresh = !0
    }
    if (e) {
      if ("other" === this.fields.tree.treeViewType && e.tree_category && e.tree_category.v && this.treeIndex[e.tree_category.v]) this.treeIndex[e.tree_category.v].row = e; else {
        let t = e.tree.v || "", l = a(e);
        "self" === this.fields.tree.treeViewType && (l in this.treeIndex ? this.treeIndex[l].row = e : n = "sorted"), t in this.treeIndex && this.treeIndex[t].l ? (-1 === this.treeIndex[t][n].indexOf(l.toString()) && this.treeIndex[t][n].push(l.toString()), i && this.openTreeWithParent(this.treeIndex[t])) : t && this.treeReloadRows.push(t)
      }
      this.treeRefresh = !0
    }
  }, App.pcTableMain.prototype.openTreeWithParent = function (e) {
    e.opened = !0, e.p && this.treeIndex[e.p] && this.openTreeWithParent(this.treeIndex[e.p])
  }, App.pcTableMain.prototype.treeDeletingRow = function (e) {
    let t = this.data[e];
    t && this.placeInTree(null, t)
  }, App.pcTableMain.prototype.getTreeBranch = function (e) {
    if (null === e.v ? e.v = "" : e.v = e.v.toString(), this.treeIndex[e.v] || (this.treeIndex[e.v] = {...e}, this.treeIndex[e.v].sorted = this.treeIndex[e.v].sorted || [], this.treeIndex[e.v].trees = this.treeIndex[e.v].trees || []), this.treeIndex[e.v].l = "l" in e ? e.l : "l" in this.treeIndex[e.v] ? this.treeIndex[e.v].l : "" === e.v, this.treeIndex[e.v].opened = "opened" in e ? e.opened : "opened" in this.treeIndex[e.v] ? this.treeIndex[e.v].opened : "" === e.v, void 0 !== e.p && this.treeIndex[e.v].p != e.p && void 0 !== this.treeIndex[e.v].p && this.treeIndex[e.v].p in this.treeIndex) {
      let t = this.treeIndex[this.treeIndex[e.v].p].trees.indexOf(this.treeIndex[e.v].v);
      -1 !== t && this.treeIndex[this.treeIndex[e.v].p].trees.splice(t, 1)
    }
    if (e.p) {
      let t = this.getTreeBranch({v: e.p});
      -1 === t.trees.indexOf(e.v) && t.trees.push(e.v);
      let i = this.treeSort.indexOf(e.v);
      -1 !== i && this.treeSort.splice(i, 1)
    } else e.t && -1 === this.treeSort.indexOf(e.v) && this.treeSort.push(e.v);
    return Object.keys(e).forEach(t => {
      this.treeIndex[e.v][t] = e[t]
    }), this.treeIndex[e.v]
  }, function () {
    const e = function (e) {
      let i = this.data[e], n = i.$tr || t('<div class="panelsView-card pcTable-floatInner">').css({
        "min-height": this.tableRow.panels_view.height + "px",
        height: this.tableRow.panels_view.height,
        width: this.tableRow.panels_view.width
      });
      if (i.$tr = n.empty(), n.data("id", e), this.tableRow.panels_view.fields.forEach(a => {
        let l = t("<td>"), s = {};
        s.height = a.height, l.data("name", a.field), a.border || (s["border-color"] = "transparent", s["background-color"] = "transparent");
        let o, r = this.fields[a.field];
        try {
          o = t.extend({}, this.f || {}, i.f || {}, i[a.field].f && i[a.field].f || {})
        } catch (e) {
          console.log(e, i, a.field), o = {}
        }
        if ("button" != r.type) {
          if (o.color && (s["font-color"] = o.color), o.background && (s["background-color"] = o.background), o.text) l.text(o.text); else {
            let e = r.getHighCelltext(i[a.field].v, l, i);
            null !== e && "object" == typeof e ? e.then && "function" == typeof e.then ? (l.html('<div class="text-center"><i class="fa fa-spinner"></i></div>'), e.then(e => {
              "object" == typeof e ? l.html(e) : l.text(e)
            })) : l.html(e) : l.text(e), r.unitType && "" !== e && l.append(" " + r.unitType)
          }
          if (o.comment ? l.prepend(t('<i class="fa fa-help">').attr("title", o.comment)) : o.icon && l.prepend(t('<i class="fa">').addClass("fa-" + o.icon)), l.attr("data-field-type", r.type).addClass("nonowrap"), !1 !== o.showhand && i[a.field].h) {
            let e, n = i[a.field];
            e = void 0 !== n.c && n.v != n.c ? t('<i class="fa fa-hand-paper-o pull-right cell-icon" aria-hidden="true"></i>') : t('<i class="fa fa-hand-rock-o pull-right cell-icon" aria-hidden="true"></i>'), l.append(e)
          }
        } else {
          i.__td_style = function () {
            let e = {td: {}, Button: {}};
            return o.background && (e.Button.backgroundColor = o.background), o.color && (e.Button.color = o.color), e.td.backgroundColor = "transparent", e
          }, l.html(r.getCellText(i[a.field].v, l, i)), l.find("button").on("click", () => {
            this._buttonClick(l, r, i)
          })
        }
        if (o.bold && (s["font-weight"] = "bold"), o.italic && (s["font-style"] = "italic"), o.decoration && (s["text-decoration"] = o.decoration), o.align && (s["text-align"] = o.align), o.color && (s.color = o.color), o.tab && (s["padding-left"] = o.tab), o.progress && o.progresscolor) {
          let e = function () {
            if (l.isAttached()) {
              let e = Math.round(l.outerWidth() * parseInt(o.progress) / 100);
              l.css("box-shadow", "inset " + e.toString() + "px 0px 0 0 " + o.progresscolor)
            } else setTimeout(e, 50)
          };
          e()
        }
        l.css(s);
        let d = t("<div>").append(l), c = this;
        if (a.title) {
          let i = t("<th>").text(this.fields[a.field].title);
          r.help && (r.helpFunc || (c.addThHelpCloser(), r.helpFunc = function (e) {
            let i, n = t(this);
            return n.data("bs.popover") ? "open" !== e.type && (i && clearTimeout(i), i = setTimeout(() => {
              n.attr("aria-describedby") && t("#" + n.attr("aria-describedby").length) && n.popover("destroy")
            }, 120)) : "close" !== e.type && (c._container.trigger("click"), setTimeout(() => {
              let e = t('<div class="i-inner-div">').html(r.help).width(230);
              n.popover({
                trigger: "manual", content: e, html: !0, placement: () => {
                  let t = c._container;
                  n.offset().top, t.offset().top;
                  return e.css("max-height", 300), "bottom"
                }, container: c.scrollWrapper
              }), n.popover("show")
            }, 150)), !1
          }), i.prepend(t('<button class="btn btn-default btn-xxs cell-help" id="field-help-' + r.name + "-" + e + '"><i class="fa fa-info"></i></button>').on("click open close", r.helpFunc))), d.prepend(i)
        }
        n.append(d)
      }), this.tableRow.panels_view.controls) {
        if (!this.pcTableControllsEvents) {
          this.pcTableControllsEvents = !0;
          let e = this;
          this._innerContainer.on("click", ".panel-controls button", (function () {
            let i = t(this), n = i.closest(".panelsView-card").data("id");
            switch (i.data("action")) {
              case"duplicate":
                e.row_duplicate(n);
                break;
              case"delete":
                e.rows_delete(n);
                break;
              case"recalculate":
                e.row_refresh(n);
                break;
              case"panel":
                e._row_edit([n])
            }
            return !1
          }))
        }
        let a = t('<div class="panel-controls">');
        a.append('<span class="panle-id">id ' + e + "</span>"), this.tableRow.panel && a.append('<button class="btn btn-default btn-xxs" data-action="panel"><i class="fa fa-th-large"></i></span>'), !this.control.duplicating || this.f.blockduplicate || i.f.blockduplicate || a.append('<button class="btn btn-default btn-xxs" data-action="duplicate"><i class="fa fa-clone"></i></span>'), !this.control.deleting || this.f.blockdelete || i.f.blockdelete || a.append('<button class="btn btn-default btn-xxs" data-action="delete"><i class="fa fa-times"></i></span>'), a.append('<button class="btn btn-default btn-xs" data-action="recalculate"><i class="fa fa-refresh"></i></span>'), n.append(a)
      }
      return n
    }, i = function (e) {
      if (this.kanban) {
        const i = e => {
          let i = t.Deferred(), n = [];
          return e.parent().find(".panelsView-card").each((e, i) => {
            n.push(t(i).data("id"))
          }), n.length > 1 ? (n.forEach(e => {
            this.dataSorted.splice(this.dataSorted.indexOf(e), 1)
          }), this.dataSorted.push(...n), this.model.saveOrder(n).then(e => {
            this.table_modify(e)
          })) : (i.resolve(), i.promise())
        };
        t(e).find(".kanban").sortable({
          items: ".panelsView-card",
          connectWith: this.fields[this.tableRow.panels_view.kanban].editable ? ".kanban" : "",
          stop: (e, n) => {
            let a = t(n.item), l = a.data("id");
            a.prev().data("id");
            App.fullScreenProcesses.show("sorting");
            let s = this.data[l][this.tableRow.panels_view.kanban];
            this.data[l][this.tableRow.panels_view.kanban] != a.parent().data("value") ? (s = a.closest(".kanban").data("value"), this.model.save({[l]: {[this.tableRow.panels_view.kanban]: s}}).then(e => {
              this.tableRow.with_order_field ? i(a).always(() => {
                this._container.getNiceScroll().resize(), App.fullScreenProcesses.hide("sorting")
              }) : (this.table_modify(e), this._container.getNiceScroll().resize(), App.fullScreenProcesses.hide("sorting"))
            })) : this.tableRow.with_order_field && i(a).always(() => {
              App.fullScreenProcesses.hide("sorting")
            })
          }
        })
      } else t(e).data("sortableAdded") || (t(e).data("sortableAdded", 1), t(e).sortable({
        stop: (e, i) => {
          let n = t(i.item), a = n.data("id"), l = n.prev().data("id"), s = [...this.dataSorted];
          this.dataSorted.splice(this.dataSorted.indexOf(a), 1), l ? this.dataSorted.splice(this.dataSorted.indexOf(l) + 1, 0, a) : this.dataSorted.splice(0, 0, a), this.dataSortedVisible = [], this.dataSorted.forEach(e => {
            this.data[e].$visible && this.dataSortedVisible.push(e)
          }), Object.equals(s, this.dataSorted) || (App.fullScreenProcesses.show("sorting"), this.model.saveOrder(this.dataSorted).then(e => {
            this.table_modify(e)
          }).always(() => {
            App.fullScreenProcesses.hide("sorting")
          }))
        }
      }))
    }, n = function () {
      let e = this._content || t('<div class="pcTable-floatBlock">');
      if (e.each((e, t) => {
        !this.tableRow.with_order_field && !this.kanban || !this.control.editing || this.f.blockorder || this.f.blockedit || setTimeout(() => {
          i.call(this, t)
        }, 1)
      }), e.empty(), this.__applyFilters(), this.dataSortedVisible.length || this.kanban) if (this.kanban) {
        this._innerContainer.addClass("kanbanInnerContainer"), e.addClass("kanbanWrapper").empty(), e.css("grid-template-columns", "1fr ".repeat(this.kanban.length));
        let i = 0;
        this.kanban.forEach(n => {
          let a = (this.tableRow.panels_view.panels_in_kanban || 1) * (parseInt(this.tableRow.panels_view.width) + 10) - 10;
          n.$div = t('<div class="kanban"></div>').data("value", n[0]).width(a), i && (i += 20), i += a, n.$div.append(t('<div class="kanban-title">').text(n[1]).attr("data-value", n[0]));
          let l = t('<div class="kanban-cards">');
          n.$div.append(l);
          let s = n[0];
          e.append(n.$div), this.dataSortedVisible.length ? this.dataSortedVisible.forEach(e => {
            (this.data[e][this.tableRow.panels_view.kanban].v || "") == s && l.append(this._getRowCard(e))
          }) : l.append('<div class="empty-kanban">Нет данных</div>')
        }), e.width(i), this.tableWidth = i
      } else this.dataSortedVisible.forEach(t => {
        let i = this._getRowCard(t);
        e.append(i)
      }); else e.append('<div class="no-panels">Нет данных</div>');
      return setTimeout(() => {
        this._container.getNiceScroll().resize()
      }), e
    }, a = function () {
      let e = this;
      this._sorting = {}, this._table = t("<table>").addClass(this.tableClass), this.notCorrectOrder && this._table.addClass("no-correct-n-filtered"), this._popovers = t('<div class="popovers">'), 1 === this.fieldCategories.column.length && e._container.addClass("no-fields");
      let i = this.scrollWrapper = this._container.append('<div class="pcTable-scrollwrapper">').find(".pcTable-scrollwrapper");
      i.append(this._createBeforeSpace()).append(this._createTableText()), this.isCreatorView && i.append(this._refreshHiddenFieldsBlock()), this._paramsBlock = this._createParamsBlock(i);
      let n, a, l = t('<div class="pcTable-rowsWrapper">').appendTo(i);
      l.append(this._createRowsTitle(l)).append(this._createFiltersBlock()).append(this._rowsButtons()).append(this._innerContainer), this._footersBlock = t(), this._content = this._refreshContentTable().appendTo(this._innerContainer), this.tableRow.panels_view.css && this._container.prepend(t("<style>").text(this.tableRow.panels_view.css)), this._innerContainer.addClass("panelsView"), this._footersSubTable = this._createFootersSubtable(i), i.append(this._footersSubTable).append(this._popovers), this._seeCalcucatedValData(), this._seeSelectPreview(), this._clickstoCopyMe(), "cycles" == e.tableRow.type && this._content.on("dblclick", ".panelsView-card", (function () {
        let i = t(this).data("id");
        e.model.dblClick(i)
      })), this._content.on("contextmenu", ".panelsView-card td", (function () {
        n && n.removeClass("selected");
        let i = t(this), a = e.data[i.closest(".panelsView-card").data("id")], l = i.data("name");
        i.data("panel") && i.data("panel").isAttached() && e.selectedCells.selectPanel === i.data("panel") ? (e.selectedCells.selectPanelDestroy(), i.data("panel", null)) : (i.data("panel", e.selectedCells.selectPanel = e.getSelectPanel.call(e, e.fields[l], a, i)), n = i.addClass("selected"))
      })), this._content.on("click", ".panelsView-card", (function (e) {
        if (e.originalEvent && e.originalEvent.path && !t(e.originalEvent.path[0]).is("button, .fa")) {
          let e = t(this);
          a && a.get(0) === e.get(0) ? (e.removeClass("selected"), a = null) : (a && a.removeClass("selected"), a = e.addClass("selected"))
        }
      })), this.isCreatorView && this._hideHell_storage.checkIssetFields.call(this)
    }, l = function (e, i, n) {
      e.is(".panelsView-card") && (t.extend(i, n), this._getRowCard(i.id))
    };
    App.pcTableMain.prototype._renderTablePanelView = function () {
      if (this.loadFilters(), this.model.addExtraData({panelsView: !0}), this._renderTable = a.bind(this), this._getRowCard = e.bind(this), this._refreshHead = () => {
      }, this.Scroll = () => ({
        reloadScrollHead: () => {
        }, insertToDOM: () => {
          this._refreshContentTable()
        }
      }), this.kanban) {
        let e, i, n, a, l = this._container, s = !1;
        const o = () => {
          i = i || this._container.find(".kanbanWrapper.pcTable-floatBlock");
          let e = i.offset();
          if (e.top < 0) {
            if (!n) {
              let l = {left: e.left, "grid-template-columns": i.css("grid-template-columns"), width: i.width()};
              n = t('<div class="kanbanWrapper pcTable-floatBlock cln">').css(l), t(".kanban").each((function () {
                let e = t(this), i = t("<div class='kanban'>").width(e.width()).append(e.find(".kanban-title").clone());
                n.append(i)
              }));
              let s = this;
              a = t('<button class="scroll-top-button"><i class="fa fa-arrow-up"></i></button>').on("click", (function () {
                s._container.scrollTop(s._container.find(".pcTable-rowsWrapper").offset().top - s.scrollWrapper.offset().top)
              }))
            }
            s || (s = !0, this._innerContainer.append(n), this._innerContainer.append(a))
          } else s && (s = !1, n.detach(), a.detach())
        };
        l.on("scroll", () => {
          clearTimeout(e), e = setTimeout(() => {
            o()
          }, 50)
        }), this.rowButtonsCalcWidth = function () {
          this.tableWidth < this.tableRow.panels_view.width ? this.__$rowsButtons.width(this.tableRow.panels_view.width) : this.tableWidth < this._innerContainer.width() ? this.__$rowsButtons.width(this.tableWidth) : this.isMobile || this.__$rowsButtons.width(this._innerContainer.width())
        }
      } else this.rowButtonsCalcWidth = function () {
        this.__$rowsButtons.css("minWidth", this.tableRow.panels_view.width), this.tableWidth = 0, this._innerContainer.find(".panelsView-card").toArray().some(e => {
          let i = t(e), n = i.offset().left + i.width();
          if (!(n > this.tableWidth)) return !0;
          this.tableWidth = n
        }), this.tableWidth -= this._innerContainer.offset().left + 50, this.isMobile || (this.tableWidth < this.tableRow.panels_view.width ? this.__$rowsButtons.width(this.tableRow.panels_view.width) : this.__$rowsButtons.width(this.tableWidth))
      };
      this.refreshRow = l.bind(this), this._refreshContentTable = n.bind(this), this._getItemBytd = function (e) {
        return this.data[e.closest(".panelsView-card").data("id")] || this.data_params
      }, this._getFieldBytd = function (e) {
        return 0 === e.closest(".panelsView-card").length ? this.fields[e.data("field")] : this.fields[e.data("name")]
      }
    }
  }(), t.extend(App.pcTableMain.prototype, {
    _renderRotatedView: function () {
      let e = this;
      t.extend(this, {
        isRotatedView: !0, rowButtonsCalcWidth: function () {
          if (!this.isMobile) {
            let e = this._table.offset().left + this._table.width() - 80;
            e < this._innerContainer.width() ? this.__$rowsButtons.width(e) : this._innerContainer.width()
          }
        }, _addCellId: function (e, i) {
          let n = t('<td class="id"></td>'), a = t('<span class="rowName"></span>').appendTo(n);
          return this.mainFieldName && "id" !== this.mainFieldName && e[this.mainFieldName] && e[this.mainFieldName].v ? a.text(e[this.mainFieldName].v) : (a.text(e.id), n.addClass("small-rotated-id")), n.appendTo(i), this.row_actions_icons_add(n), !0 === e.$checked && this.row_actions_check(e, !0), n
        }, _createHeadCellId: function () {
          let e = this, i = t('<th class="id"></th>'), n = t('<div class="pcTable-filters"></div>'),
            a = t('<button class="btn btn-default btn-xxs" id="n-expander"><i class="fa fa-sort"></i></button>');
          if (a.prop("disabled", !0), !e.isMobile) {
            let t = this._getIdFilterButton();
            n.append(a).append(" ").append(t).append(" ").append(e._idCheckButton)
          }
          return i.append(this._checkStatusBar), i.append(n), e._idCheckButton.off().on("click", (function () {
            if (e._idCheckButton.find("span").is(".fa-check")) e.row_actions_uncheck_all.call(e), e.__checkedRows = []; else for (let t = 0; t < e.dataSortedVisible.length; t++) {
              let i = e.dataSortedVisible[t], n = "object" != typeof i ? e._getItemById(i) : i.row;
              n && !n.$checked && (e.row_actions_check.call(e, n, !0), e.__checkedRows.push(n.id))
            }
            e._headCellIdButtonsState()
          })), n = t('<div class="pcTable-filters for-selected"><button class="btn btn-default btn-xxs"><i class="fa fa-copy"></i></button> <button class="btn btn-default btn-xxs" data-names="true"><i class="fa fa-clone"></i></button></div>'), i.append(n), this._refreshCheckedStatus(), i
        }, Scroll: () => ({
          reloadScrollHead: () => {
          }, insertToDOM: function (t, i, n) {
            this.setHtml(e.dataSortedVisible, 0, 0, n)
          }, emptyCache: () => {
          }, setHtml: function (t, i, n, a) {
            e._content.find(".editing").each((function (t) {
              e._removeEditing.call(e, t)
            }));
            let l = e._content.empty().get(0);
            if (0 === e.dataSorted.length) l.appendChild(e._createNoDataRow().get(0)); else if (0 === e.dataSortedVisible.length) l.appendChild(e._createNoDataRow("По условиям фильтрации не выбрана ни одна строка").get(0)); else for (let i in t) {
              let n = t[i];
              if ("object" != typeof n) {
                let t = e.data[n];
                t.$tr && !a || e._createRow.call(e, t), t.$tr.data("item", t), l.appendChild(t.$tr.get(0))
              } else l.appendChild(e._createTreeFolderRow.call(e, n).get(0))
            }
          }
        })
      })
    }
  }), App.pcTableMain.prototype.switchRestoreView = function () {
    this.isRestoreView = !this.isRestoreView, this._rowsButtons(), this.model.refresh(void 0, void 0, !0)
  }, t.extend(App.pcTableMain.prototype, {
    setWidthes: function () {
      "use strict";
      let i;
      this.isMobile ? (i = 5, this.switchContainerNideScroll(!1)) : (i = t("body>.page_content:first").is(".tree-minifyed") ? 5 : 300, this.switchContainerNideScroll(!0)), this.width = t("body").width() - i, this._container.width(this.width), this.isMobile ? this._innerContainer.width("auto") : (this._innerContainer.width(this.width - 80), this.addInnerContainerScroll()), this._rerendParamsblock(), this.isCreatorView && this._refreshHiddenFieldsBlock(), this._rerendFiltersBlock(), this._refreshHead(), this._rerendBottomFoolers(), this.rowButtonsCalcWidth(), this._container.width() < this._table.width() && this._addHorizontalDraggable(), this._container.height(e.innerHeight - this._container.offset().top - 10)
    }, addInnerContainerScroll: function () {
      if (this._innerContainer.width() < this._innerContainer.find(">table:first, >div:first").width()) {
        const e = () => {
          let e = this._innerContainer.offset().top - this._container.offset().top - 3,
            i = this._innerContainer.innerHeight() + parseInt(t("#table").data("pctable")._innerContainer.css("paddingBottom")),
            n = this._container.innerHeight();
          if (this._innerContainerPS) {
            let t = this._innerContainerPS.scrollbarXBottom;
            if (this._innerContainerPS.scrollbarXBottom = 0, e < n && e + i > n) {
              let t = e + this._innerContainer.innerHeight();
              t > n && (this._innerContainerPS.scrollbarXBottom = t - n)
            }
            t != this._innerContainerPS.scrollbarXBottom && this._innerContainerPS.update()
          }
        };
        if (!this._innerContainerPS) {
          let t;
          this._innerContainerPS = new PerfectScrollbar(this._innerContainer.get(0), {
            useBothWheelAxes: !1,
            scrollbarYActive: !1,
            scrollbarXActive: !0
          }), this._container.on("scroll.scroller", () => {
            t && clearTimeout(t), t = setTimeout(e, 30)
          }), new ResizeObserver(e).observe(this.scrollWrapper.get(0))
        }
        setTimeout(e, 500)
      } else this._innerContainerPS && (this._container.off("scroll.scroller"), this._innerContainerPS.destroy(), this._innerContainerPS = null)
    }, initForPanel: function (e) {
      t.extend(!0, this, e), this.refreshArraysFieldCategories(!1);
      let i = {};
      this.__checkedRows = [], this.rows.map((function (e) {
        this.dataSorted.push(e.id), this.dataSortedVisible.push(e.id), i[e.id] = e, i[e.id].$checked = -1 !== this.__checkedRows.indexOf(e.id)
      }), this), this.data = i, this.model.setLoadedTableData(this.data)
    }, closeCallbacks: [], _init: function () {
      let i = this;
      t(document).on({
        dragover: function () {
          return !1
        }, drop: function () {
          return !1
        }
      }), this._container.addClass(this.contanerClass).addClass("pcTable-type-" + this.tableRow.type);
      let n = t("#nav-top-line");
      n.addClass("pcTable-type-" + this.tableRow.type), "tmp" === this.tableRow.type && n.text("Будьте внимательны - это временная таблица"), this._innerContainer = t('<div class="innerContainer">');
      let a = !1;
      const l = function () {
        if (!a) {
          a = !0;
          let e = i.closeCallbacks.length;
          i.closeCallbacks.forEach((function (e) {
            e()
          })), i.closeCallbacks.splice(0, e), a = !1
        }
      };
      if (t("body").on("keyup", (function (e) {
        27 === e.which && (i._container.trigger("escPressed"), l())
      })), t("body").on("click", l), e.top.lastCtrl = 0, t("body").on("keydown", t => {
        t.ctrlKey && (e.top.lastCtrl = Date.now())
      }), e.top.wasCtrl = t => t.ctrlKey || e.top && e.top.lastCtrl > 0 && Date.now() - e.top.lastCtrl < 500, i._container.on("scroll", l), i._innerContainer.on("scroll", l), this.isCreatorView ? this._container.on("click contextmenu", "th", (function (e) {
        if (e.originalEvent && "BUTTON" === e.originalEvent.target.nodeName || "BUTTON" === e.originalEvent.target.parentElement.nodeName) ; else {
          let e = t(this);
          i.creatorIconsPopover(e)
        }
      })) : this._container.on("click contextmenu", "th", (function (e) {
        if (e.originalEvent && "BUTTON" === e.originalEvent.target.nodeName || "BUTTON" === e.originalEvent.target.parentElement.nodeName) ; else {
          let e = t(this);
          i.workerIconsPopover(e)
        }
      })), i._container.on("contextmenu", (function (e) {
        let i = t(e.target);
        if (l(), !i.closest(".popover").length && !i.closest(".edit-row-panel").length) return !1
      })), this._container.append(this._innerContainer), this.saveFilterAndPage(), this.initRowsData(), !this.isMobile) {
        let n;
        t(e).resize((function () {
          n && clearTimeout(n), n = setTimeout((function () {
            i.setWidthes()
          }), 500)
        }))
      }
    }, saveFilterAndPage: function () {
      "cycles" === this.tableRow.type && (this.filtersString || this.PageData ? sessionStorage.setItem("cycles_filter", JSON.stringify({
        id: this.tableRow.id,
        filter: this.filtersString,
        offset: this.PageData ? this.PageData.offset : null,
        onPage: this.PageData ? this.PageData.onPage : null
      })) : sessionStorage.removeItem("cycles_filter"))
    }, refreshArraysFieldCategories: function () {
      "use strict";
      let i = this;
      i.hidden_fields = i.hidden_fields || {}, t.each(i.hidden_fields, (function (e, n) {
        i.hidden_fields[e] = t.extend({}, n, r[n.type], n), i.hidden_fields[e].isHiddenField = !0
      })), i.mainFieldName = "id", i.fieldCategories = {}, ["param", "column", "filter", "footer", "panel_fields"].forEach((function (e) {
        i.fieldCategories[e] = []
      }));
      let n = [];
      try {
        n = JSON.parse(decodeURIComponent(e.location.hash.substring(1)) || "[]"), n = n && n.wc ? n.wc : []
      } catch (e) {
      }
      let a = !1;
      const l = function (e, l) {
        l.pcTable = i, "button" == (l = r[l.type] ? t.extend({}, d, r[l.type], l) : t.extend({}, d, l)).type && l.buttonActiveOnInsert && (l.insertable = !0), l.showInWebOtherOrd && (l._ord = l.ord, l.ord = l.showInWebOtherOrd, a = !0), l.showInWebOtherPlacement && (l._category = l.category, l.category = l.showInWebOtherPlacement, a = !0), i.fields[e] = l, -1 === n.indexOf(l.category) && (l.showInWeb ? "column" === l.category ? ("n" !== l.name && i.fieldCategories.panel_fields.push(l), "tree" === l.name && "column" === l.category && l.treeViewType ? (i.isTreeView = !0, i.fieldCategories[l.category].unshift(l)) : i.fieldCategories[l.category].push(l)) : i.fieldCategories[l.category].push(l) : l.name && (i.hidden_fields[l.name] = l))
      };
      l("n", {type: "n"});
      let s = t.extend({}, this.fields);
      delete s.n, t.each(s, l), a && ["param", "column", "filter", "footer"].forEach((function (e) {
        i.fieldCategories[e].sort((function (e, t) {
          return e.ord - t.ord
        }))
      })), i.notTableFooterFields = [], i.fieldCategories.footer.forEach((function (e) {
        e.column || i.notTableFooterFields.push(e)
      })), this.tableRow.main_field && this.fields[this.tableRow.main_field] && (i.mainFieldName = this.tableRow.main_field)
    }, workerIconsPopover: async function (e) {
      if (0 === e.closest(".popover").length) {
        let i = t('<div style="width:200px" class="creator-icons">');
        i.append(t('<div class="full-title">').text(this.fields[e.data("field")].title));
        let n = "top";
        e.get(0).getBoundingClientRect().top < 100 && (n = "bottom"), App.popNotify({
          isParams: !0,
          $text: i,
          element: e,
          trigger: "manual",
          placement: n,
          container: t("body")
        }), setTimeout(() => {
          this.closeCallbacks.push((function () {
            e && e.length && e.popover("destroy")
          }))
        }, 200)
      }
    }, creatorIconsPopover: async function (e) {
      if (0 === e.closest(".popover").length) {
        let i = t('<div style="width:200px" class="creator-icons">');
        i.append(t('<div class="full-title">').text(this.fields[e.data("field")].title)), e.find("i:not(.fa-caret-down):not(.fa-info)").each((n, a) => {
          if (["fa-star", "fa-star-o", "fa-cogs"].some(e => t(a).hasClass(e))) return;
          let l = t("<div>").append(a.outerHTML);
          if (0 === n) {
            l.append(" " + e.closest("th").find(".field_name").text()), t('<button class="btn btn-sm btn-default copy-me" title="Копировать "><i class="fa fa-copy"></i></button>').on("click", (function () {
              App.copyMe(e.data("field"));
              let i = t(this);
              return i.width(i.width()), i.html('<i class="fa fa-cog"></i>'), setTimeout((function () {
                i.html('<i class="fa fa-copy"></i>')
              }), 1e3), !1
            })).appendTo(l)
          }
          a.title && l.append(" " + a.title), i.append(l)
        });
        let n, a = [], l = this.fields[e.closest("th").data("field")];
        const s = async function () {
          return new Promise((e, t) => {
            App.getPcTableById(2).then((function (t) {
              e(t.fields.data_src.jsonFields)
            }))
          })
        };
        let o = {code: "Код", codeAction: "Действ", codeSelect: "Селект", format: "Формат"}, r = Object.keys(o);
        for (let e = 0; e < r.length; e++) {
          let i = r[e], d = "format" === i ? "formatCode" : "";
          (d ? l[d] : l[i]) ? a.push(t('<button class="btn btn-default btn-xxs" data-action="' + i + '">' + o[i] + "</button>")) : (n || (n = await s()), -1 !== n.fieldListParams[l.type].indexOf(i) && a.push(t('<button class="btn btn-default btn-xxs offed" data-action="' + i + '">' + o[i] + "</button>")))
        }
        if (a.length) {
          let o = t('<div class="buttons">');
          a.forEach(e => {
            o.append(e)
          }), o.appendTo(i);
          let r = this;
          o.on("click", "button", (async function () {
            let i = t(this);
            n || (n = await s()), r.editFieldCode(l.name, i.data("action"), n).then(t => {
              if (t) {
                switch (l.category) {
                  case"param":
                    r._rerendParamsblock();
                    break;
                  case"footer":
                    l.column ? r._rerenderColumnsFooter() : r._rerendBottomFoolers();
                    break;
                  case"filter":
                    r._rerendFiltersBlock();
                    break;
                  case"column":
                    r._refreshHead()
                }
                setTimeout(() => {
                  App.blink(l.$th.find(".creator-icons i"), 3, "green", "color")
                }, 100)
              } else App.blink(e.find("i"), 3, "green", "color")
            }, () => {
            })
          }))
        }
        let d = "top";
        e.get(0).getBoundingClientRect().top < 100 && (d = "bottom"), App.popNotify({
          isParams: !0,
          $text: i,
          element: e,
          trigger: "manual",
          placement: d,
          container: t("body")
        }), setTimeout(() => {
          this.closeCallbacks.push((function () {
            e && e.length && e.popover("destroy")
          }))
        }, 200)
      }
    }, editFieldCode: function (t, i, n) {
      return new Promise((a, l) => {
        let s = this.fields[t], o = n.fieldListParams[s.type], r = this;
        App.getPcTableById(2).then((function (t) {
          t.model.checkEditRow({id: s.id}).then((function (d) {
            let c = [], f = [];
            switch (i) {
              case"code":
                f = ["codeOnlyInAdd"];
                break;
              case"codeAction":
                f = ["CodeActionOnAdd", "CodeActionOnChange", "CodeActionOnDelete", "CodeActionOnClick"];
                break;
              case"codeSelect":
                f = ["codeSelectIndividual", "multiple"]
            }
            f && f.forEach(e => {
              if (-1 !== o.indexOf(e)) {
                let t = n.fieldSettings[e];
                if (t.categories && -1 === t.categories.indexOf(s.category)) return !1;
                c.push([e, t.title, !!d.row.data_src.v[e] && d.row.data_src.v[e].Val])
              }
            });
            let p = '<span style="">' + n.fieldSettings[i].title + "</span> " + s.name;
            App.totumCodeEdit(d.row.data_src.v[i].Val, p, s.pcTable.tableRow.name, c, "codeSelect" !== i && d.row.data_src.v[i] && d.row.data_src.v[i].isOn).then(n => {
              t.model.checkEditRow({id: s.id}).then((function (o) {
                let d = o.row.data_src.v;
                d[i].Val = n.code;
                let c = !1;
                d[i].isOn ? n.switchoff && (d[i].isOn = !1, c = !0) : (d[i].isOn = !0, c = !0), Object.keys(n.checkboxes).forEach(e => {
                  d[e] && d[e].Val === n.checkboxes[e] || (d[e] = d[e] || {}, d[e].Val = n.checkboxes[e], d[e].isOn = n.checkboxes[e], c = !0)
                }), t.model.save({[s.id]: {data_src: d}}).then(() => {
                  Object.keys(n.checkboxes).forEach(e => {
                    r.fields[s.name][e] = n.checkboxes[e]
                  }), "format" === i ? (n.switchoff ? r.fields[s.name].formatCode = !1 : r.fields[s.name].formatCode = !0, r.model.refresh()) : "codeSelect" === i ? e.location.reload() : (n.switchoff ? r.fields[s.name][i] = !1 : r.fields[s.name][i] = !0, r.model.refresh(null, "recalculate")), a(c)
                }).fail(l)
              })).fail(l)
            }, (function (e) {
              console.log(e), l()
            }))
          }))
        }))
      })
    }, render: function (e) {
      let t = this;
      if (this.loadVisibleFields(this.f && this.f.fieldhide ? this.f.fieldhide : void 0), "panels" !== this.viewType || this.isMobile ? !this.isTreeView && this.tableRow.rotated_view && this._renderRotatedView() : this._renderTablePanelView(), this.ScrollClasterized = this.Scroll(), this._renderTable(), this._sorting.addSortable && this._sorting.addSortable(this), this._addSelectable(), this._addEditable(), this._addSave(), this.row_actions_add(), this.__addFilterable(), this._refreshHead(), t.checkIsUpdated > 0) {
        let e = 2e3 * parseInt(t.checkIsUpdated);
        setTimeout((function () {
          t.checkTableIsChanged.call(t, e)
        }), e)
      }
      this.refresh(), this.setWidthes(), this.__applyFilters(), e && (this.isMobile ? t._addInsertWithPanel(e) : t._addInsert(e))
    }, _addSave: function () {
      t("body").on("keyup", (function (i) {
        (e.top.wasCtrl(i) || i.metaKey) && "s" === String.fromCharCode(i.which).toLowerCase() && 0 === t("#bigOneCodemirror").length && t("body").trigger("ctrlS")
      }))
    }, reloaded: function () {
      let e = t("#refresh-notify");
      e.length && (e.closest(".alert").remove(), this.checkTableIsChanged(2e3 * parseInt(this.checkIsUpdated)))
    }, checkTableIsChanged: function (e) {
      let i = this;
      document.hidden ? setTimeout((function () {
        i.checkTableIsChanged.call(i, e)
      }), 1e3) : i.model.checkTableIsChanged.call(i.model).then((function (n) {
        if (n.no || i.model.tableData.updated.code === n.code) i.checkTableIsChanged.call(i, e); else {
          let a = function () {
            i.model.tableData.updated.code === n.code ? i.checkTableIsChanged.call(i, e) : (t.notify({message: '<div id="refresh-notify"><span>Таблица была изменена пользователем <b>' + n.username + "</b> в <b>" + App.dateFormats.covert(n.dt, "YY-MM-DD HH:mm", "HH:mm DD.MM") + '</b> </span><button class="btn btn-warning btn-sm" style="margin-right: 20px;">Обновить</button></div>'}, {
              type: "warning",
              allow_dismiss: !1,
              delay: 0
            }), t("#refresh-notify button").on("click", (function () {
              i.model.refresh()
            })))
          };
          i.model.doAfterProcesses((function () {
            setTimeout(a, 200)
          }))
        }
      }))
    }, _getTableMainFieldName: function (e, t) {
      let i;
      return Object.keys(e).some((function (n) {
        let a = e[n];
        if (a.id == t) return i = a.name, !0
      })), i
    }, _getFieldbyName: function (e) {
      return this.fields[e]
    }, _getColumnIndexByTd: function (e, t) {
      return (t = t || e.closest("tr")).find("td").index(e)
    }, _fieldByTd: function (e, t) {
      let i = this._getColumnIndexByTd(e, t);
      return this.fieldCategories.visibleColumns[i - 1]
    }, _getRowIndexById: function (e) {
      let t = this;
      for (let i in t.data) if (t.data[i].id == e) return i;
      return null
    }, _getFieldBytd: function (e) {
      return e.closest("tr").is(".DataRow") ? this.fieldCategories.visibleColumns[e.closest("tr").find(e.prop("tagName")).index(e) - 1] : this.fields[e.data("field")]
    }, _isParamsArea: function (e) {
      return e.closest("table").is(".pcTable-paramsTable")
    }, _isFootersArea: function (e) {
      return e.closest("tbody").is(".pcTable-footers")
    }, _getItemBytd: function (e) {
      let t = e.closest("tr");
      return this._getItemByTr(t)
    }, _getItemByTr: function (e) {
      return e.is(".DataRow") ? this.data[e.data("pctableitemid")] : this.data_params
    }, _getItemById: function (e) {
      return this.data[e]
    }, _deleteItemById: function (e) {
      let t = this._getItemById(e);
      t && t.$tr && t.$tr.remove(), this.openedPanels[e] && this.openedPanels[e].close(), ["dataSorted", "dataSortedVisible", "__checkedRows"].forEach((function (t) {
        let i;
        this[t].forEach((t, n) => {
          (t.toString() === e.toString() || "object" == typeof t && t.row && t.row.id.toString() === e.toString()) && (i = n)
        }), void 0 !== i && this[t].splice(i, 1)
      }), this), this.isTreeView && this.treeDeletingRow(e), delete this.data[e]
    }, _getTdByFieldName: function (e, t) {
      let i = 0;
      return this.fieldCategories.visibleColumns.every((function (t, n) {
        return e != t.name || (i = n, !1)
      })), this._getTdByColumnIndex(t, i + 1)
    }, _getTdByColumnIndex: function (e, t) {
      return e.find("td:eq(" + t + ")")
    }, refresh: function () {
      this._refreshTitle(), this._refreshParamsBlock(), this._refreshFiltersBlock(this.data_params), this._refreshFootersBlock(), this._refreshContentTable()
    }, initRowsData: function () {
      if (this.__checkedRows = [], this.dataSorted = [], this.dataSortedVisible = [], this.ScrollClasterized && this.ScrollClasterized.emptyCache(), this.isTreeView) this.tree.forEach((e, t) => {
        this.getTreeBranch(e, t)
      }), this.rows && this._treeApplyRows(this.rows), setTimeout(() => {
        this.treeApply()
      }), this.model.setLoadedTableData(this.data); else {
        let e = {};
        this.rows && this.rows.map((function (t) {
          this.dataSorted.push(t.id), this.dataSortedVisible.push(t.id), e[t.id] = t, e[t.id].$checked = -1 !== this.__checkedRows.indexOf(t.id)
        }), this), this.data = e, this.model.setLoadedTableData(this.data, this.PageData ? this.PageData.offset : void 0, this.PageData ? this.PageData.onPage : void 0)
      }
    }
  })
}(window, jQuery), App.models || (App.models = {}), App.models.table = function (e, t, i) {
  let n, a, l, s, o = {}, r = 0, d = null;
  const c = function (e) {
    let t = {};
    return Object.keys(e).forEach((function (i) {
      /^\$/.test(i) || ("id" === i ? t[i] = e[i] : null !== e[i] && "object" == typeof e[i] && -1 !== Object.keys(e[i]).indexOf("v") ? t[i] = e[i].v : t[i] = e[i])
    })), t
  };
  return i = i || {}, {
    getUri: function () {
      return this.url
    }, setLoadedTableData: function (e, t, i) {
      n = e, a = t, l = i
    }, addExtraData: function (e) {
      "use strict";
      i = $.extend(!0, {}, i, e)
    }, tableData: t, url: e, doAfterProcesses: function (e) {
      let t = this;
      setTimeout((function () {
        t.getDefferedProcess().then(e)
      }), 170)
    }, getDefferedProcess: function () {
      return new Promise((e, t) => {
        Promise.all(Object.values(o)).then(() => {
          e()
        })
      })
    }, showLinks: function (e) {
      App.showLInks(e.links, s.model), delete e.links
    }, shoInterfaceDatas: function (e) {
      App.showDatas.call(s.model, e.interfaceDatas, null, window), delete e.interfaceDatas
    }, showPanels: function (e) {
      App.showPanels(e.panels, s), delete e.panels
    }, addPcTable: function (e) {
      s = e
    }, __ajax: function (e, c, f, p, h) {
      "use strict";
      let u = this.url, m = !1, b = $.Deferred();
      h = h || {};
      let g = !1, w = !1, v = $.extend(!0, {}, c, {tableData: t, ajax: !0}, i, h);
      "checkTableIsChanged" === c.method || "checkForNotifications" === c.method ? "checkForNotifications" !== c.method && (v = $.extend({}, c, {
        code: t.updated.code,
        ajax: !0
      }, i), t.sess_hash && (v.tableData = {sess_hash: t.sess_hash})) : (m = !0, p || setTimeout((function () {
        g || (App.fullScreenProcesses.showCog(), w = !0)
      }), 1e3)), void 0 !== v.data && "object" == typeof v.data && (v.data = JSON.stringify(v.data)), n && (v.ids = JSON.stringify(Object.keys(n))), "offset" in c || void 0 === a || (v.offset = a, v.onPage = l), s && s.isRestoreView && (v.restoreView = !0);
      let _ = this, y = function (e) {
        let t = {
          edit: "Изменение",
          checkInsertRow: "Предварительное добавление",
          duplicate: "Дублирование",
          refresh_rows: "Пересчет строк",
          loadPage: "Загрузка страницы",
          getTableData: "Загрузка информации о таблице",
          refresh: "Обновление данных таблицы",
          checkEditRow: "Предварительный расчет панели",
          saveEditRow: "Сохранение панели",
          save: "Изменение поля",
          click: "Нажатие кнопки",
          selectSourceTableAction: "Вызов панели",
          add: "Добавление строки",
          getEditSelect: "Загрузка селекта",
          delete: "Удаление"
        }, i = $("#table").data("pctable");
        if (i) {
          if (e.LOGS && (i.LOGS || (i.LOGS = {}), i.LOGS = $.extend(i.LOGS, e.LOGS)), e.FullLOGS) {
            i.FullLOGS || (i.FullLOGS = []);
            let n = {text: t[v.method] || v.method};
            n.children = e.FullLOGS, e.FullLOGS.length && (i.FullLOGS.push(n), App.blink(i.LogButton, 8, "#fff"))
          }
          if (e.FieldLOGS && Object.keys(e.FieldLOGS).length && (i.FieldLOGS = i.FieldLOGS || [], i.FieldLOGS.push({
            data: e.FieldLOGS,
            name: t[v.method] || v.method
          })), "loadPage" !== v.method && i.PageData && void 0 !== e.allCount) {
            let t = !1;
            "offset" in e && null !== e.offset && i.PageData.offset !== e.offset && (t = !0, i.PageData.offset = e.offset), "allCount" in e && null !== e.allCount && i.PageData.allCount !== e.allCount && (t = !0, i.PageData.allCount = e.allCount), t && i.PageData.$block.empty().append(i._paginationCreateBlock.call(i))
          }
        }
        if (e.error) {
          var n = $("<div>").html(e.error.replace(/\[\[(.*?)\]\]/g, "<b>$1</b>"));
          if (e.log) {
            let t = $('<button class="btn btn-xxs btn-danger"><i class="fa fa-info" style="padding-top: 3px;" aria-hidden="true"> c</i></button>');
            t.on("click", (function () {
              BootstrapDialog.show({
                message: $('<pre style="max-height: ' + ($("body").height() - 200) + 'px; overflow: scroll">').css("font-size", "11px").text(JSON.stringify(e.log, null, 1)),
                type: BootstrapDialog.TYPE_DANGER,
                title: "Лог расчета",
                buttons: [{
                  label: null,
                  icon: "fa fa-times",
                  cssClass: "btn-m btn-default btn-empty-with-icon",
                  action: function (e) {
                    e.close()
                  }
                }],
                draggable: !0,
                onshown: function (e) {
                  e.$modalContent.position({of: window})
                },
                onshow: function (e) {
                  e.$modalHeader.css("cursor", "pointer"), e.$modalContent.css({width: 1200})
                }
              })
            })), n.append(" "), n.append(t)
          }
          App.notify(n), b.reject(e)
        } else e.reload ? window.location.href = window.location.href : (e.links && e.links.length > 0 && _.showLinks(e), e.interfaceDatas && e.interfaceDatas.length > 0 && _.shoInterfaceDatas(e), e.panels && e.panels.length > 0 && _.showPanels(e)), b.resolve(e), setTimeout(() => {
          e.chdata && e.updated && s.editPanels && s.editPanels.forEach(e => {
            e.refresh()
          })
        }, 10)
      }, x = function (e) {
        let t, i;
        e && 200 === e.status ? e.responseJSON && e.responseJSON.error ? t = e.responseJSON.error : (t = $("<div>Ошибка выполнения операции  </div>"), s && s.isCreatorView && (t.append('<button class="btn danger-backg btn-xs" data-toggle="collapse" data-target="#notify-texh"><i class="fa fa-angle-down"></i><i class="fa fa-angle-up"></i></button>'), t.append($('<div id="notify-texh" class="collapse">').append($("<code>").text(e.responseText))))) : !f && e && "abort" != e.statusText && "error" != e.statusText ? (t = e.statusText, i = 200) : f && f.jqXHR && "abort" !== f.jqXHR.statusText && (t = "Нет соединения с сервером", i = 200), t && -1 === ["checkTableIsChanged", "checkForNotifications"].indexOf(c.method) && (i ? setTimeout((function () {
          App.notify(t)
        }), i) : App.notify(t), e.responseText), b.reject(e)
      }, k = function () {
        (new Date).getTime() - d < 150 ? setTimeout(k, 50) : (d = (new Date).getTime(), /\?/.test(u) ? u += "&" : u += "?", u += "rn=" + Math.round(1e5 * Math.random()) + (v.method || ""), f && f.abort ? x({statusText: "abort"}) : $.ajax({
          url: u,
          method: e,
          data: v,
          dataType: "json",
          beforeSend: function (e, t) {
            f && (f.jqXHR = e)
          }
        }).then(y).fail(x))
      };
      k();
      let C, T = ++r;
      o[T] = new Promise(e => {
        C = e
      });
      let S = function () {
        setTimeout(() => {
          delete o[T]
        }, 1e3), g = !0, w && App.fullScreenProcesses.hideCog()
      };
      return m || (C(), C = () => {
      }), b.always((function () {
        setTimeout(S, 100), setTimeout(C, 50)
      })), b.promise()
    }, delete: function (e) {
      return 0 !== e.length && this.__ajax("post", {delete_ids: JSON.stringify(e), method: "delete"})
    }, restore: function (e) {
      return 0 !== e.length && this.__ajax("post", {restore_ids: JSON.stringify(e), method: "restore"})
    }, duplicate: function (e, t, i) {
      return 0 !== e.length && this.__ajax("post", {
        duplicate_ids: JSON.stringify(e),
        data: t,
        insertAfter: i,
        method: "duplicate"
      })
    }, dblClick: function (e, t) {
      return this.__ajax("post", {field: t, id: e, method: "dblClick"})
    }, getFieldLog: function (e, t, i) {
      return this.__ajax("post", {field: e, id: t, method: "getFieldLog", rowName: i})
    }, refresh_rows: function (e) {
      return 0 !== e.length && this.__ajax("post", {refreash_ids: JSON.stringify(e), method: "refresh_rows"})
    }, refresh_cycles: function (e) {
      return 0 !== e.length && this.__ajax("post", {refreash_ids: JSON.stringify(e), method: "refresh_cycles"})
    }, checkUnic: function (e, t) {
      "use strict";
      return this.__ajax("post", {fieldName: e, fieldVal: t, method: "checkUnic"})
    }, add: function (e) {
      return this.__ajax("post", {hash: e, method: "add"})
    }, getValue: function (e, t) {
      return this.__ajax("post", {data: e, method: "getValue", table_id: t})
    }, getNotificationsTable: function () {
      return this.__ajax("post", {method: "getNotificationsTable"})
    }, get: function (e) {
      return this.__ajax("get", {id: e})
    }, setTableFavorite: function (e) {
      return this.__ajax("post", {status: e, method: "setTableFavorite"})
    }, checkInsertRow: function (e, t, i) {
      var n = {};
      return $.each(e, (function (e, t) {
        null != t && (n[e] = t)
      })), this.__ajax("post", {data: n, hash: t, clearField: i, method: "checkInsertRow"})
    }, checkEditRow: function (e) {
      var t = {};
      return $.each(e, (function (e, i) {
        null != i && (t[e] = i)
      })), this.__ajax("post", {data: t, method: "checkEditRow"})
    }, viewRow: function (e) {
      return this.__ajax("post", {id: e, method: "viewRow"})
    }, checkTableIsChanged: function () {
      return this.__ajax("post", {
        method: "checkTableIsChanged",
        table_id: s.tableRow.id,
        cycle_id: s.tableRow.cycle_id
      })
    }, checkForNotifications: function (e, t, i) {
      return this.__ajax("post", {method: "checkForNotifications", periodicity: e, activeIds: t}, i)
    }, notificationUpdate: function (e, t, i, n) {
      return this.__ajax("post", {method: "notificationUpdate", id: e, num: i, item: n, type: t})
    }, selectSourceTableAction: function (e, t) {
      return this.__ajax("post", {field_name: e, data: t, method: "selectSourceTableAction"})
    }, saveEditRow: function (e) {
      var t = {};
      return $.each(e, (function (e, i) {
        void 0 !== i && (t[e] = i)
      })), this.__ajax("post", {data: t, method: "saveEditRow"})
    }, getEditSelect: function (e, t, i, n, a, l) {
      return this.__ajax("post", {data: {item: e, field: t}, q: i, parentId: n, method: "getEditSelect"}, l, !a)
    }, loadPreviewHtml: function (e, t, i) {
      return this.__ajax("post", {data: {item: c(t), field: e, val: i}, method: "loadPreviewHtml"}, null, !0)
    }, save: function (e) {
      let t = {};
      return e.params && Object.keys(e.params).some((function (e) {
        if ("filter" === s.fields[e].category) return s._filtersBlock.data("cryptoFilters") && (t.filters = s._filtersBlock.data("cryptoFilters")), !0
      })), this.__ajax("post", {data: e, method: "edit"}, null, null, t)
    }, click: function (e) {
      return this.__ajax("post", {data: e, method: "click"})
    }, csvExport: function (e, t, i) {
      return this.__ajax("post", {
        method: "csvExport",
        type: t,
        sorted_ids: JSON.stringify(e),
        visibleFields: JSON.stringify(i)
      })
    }, csvImport: function (e, t, i, n) {
      return this.__ajax("post", {csv: e, type: t, answers: i, method: "csvImport", visibleFields: JSON.stringify(n)})
    }, getTableData: function (e) {
      return this.__ajax("post", {method: "getTableData", tableData: {sess_hash: e}})
    }, panelsView: function (e) {
      return this.__ajax("post", {method: "panelsViewCookie", switcher: e ? 1 : 0})
    }, refresh: function (e, t, i) {
      let n;
      e = e || function (e) {
        s.table_modify.call(s, e), s.reloaded.call(s)
      }, s.treeIndex && (n = {}, Object.keys(s.treeIndex).forEach(e => {
        n[e] = s.treeIndex[e].l ? 1 : 0
      }), n = JSON.stringify(n)), this.__ajax("post", {
        method: "refresh",
        tree: n,
        recalculate: "recalculate" === t || null,
        withoutIds: !!i || null
      }).then((function (t) {
        try {
          e(t)
        } catch (e) {
          window.location.reload()
        }
      }))
    }, saveOrder: function (e) {
      return this.__ajax("post", {method: "saveOrder", orderedIds: JSON.stringify(e)})
    }, setCommentsViewed: function (e, t, i) {
      return this.__ajax("post", {method: "setCommentsViewed", nums: e, field_name: t, id: i})
    }, AddEyeGroupSet: function (e, t) {
      return this.__ajax("post", {method: "addEyeGroupSet", name: e, fields: t})
    }, removeEyeGroupSet: function (e) {
      return this.__ajax("post", {method: "removeEyeGroupSet", index: e})
    }, leftEyeGroupSet: function (e) {
      return this.__ajax("post", {method: "leftEyeGroupSet", index: e})
    }, reUser: function (e) {
      return this.__ajax("post", {method: "reuser", userId: e, location: window.location.pathname})
    }, printTable: function (e) {
      return this.__ajax("post", {method: "printTable", settings: JSON.stringify(e)})
    }, getAllTables: function () {
      return this.__ajax("post", {method: "getAllTables"})
    }, calcFieldsLog: function (e, t) {
      return this.__ajax("post", {method: "calcFieldsLog", calc_fields_data: e, name: t})
    }, renameField: function (e) {
      return this.__ajax("post", {method: "renameField", name: e})
    }, panelButtonsClick: function (e, t) {
      return this.__ajax("post", {method: "panelButtonsClick", hash: e, index: t})
    }, panelButtonsClear: function (e) {
      return this.__ajax("post", {method: "panelButtonsClear", hash: e})
    }, buttonsClick: function (e, t) {
      return this.__ajax("post", {method: "linkButtonsClick", hash: e, index: t})
    }, inputClick: function (e, t) {
      return this.__ajax("post", {method: "linkInputClick", hash: e, val: t})
    }, getChartTypes: function () {
      return this.__ajax("post", {method: "getChartTypes"})
    }, getPanelFormats: function (e, t) {
      return this.__ajax("post", {method: "getPanelFormats", field: e, id: t})
    }, loadUserButtons: function () {
      return this.__ajax("post", {method: "loadUserButtons"})
    }, userButtonsClick: function (e, t) {
      return this.__ajax("post", {method: "userButtonsClick", hash: e, index: t})
    }, filesUpload: function (e, t) {
      return this.__ajax("post", {method: "filesUpload", files: JSON.stringify(e), hash: t})
    }, loadPage: function (e, t, i, n, a) {
      let l = {};
      return e && e.filtersString && (l.filters = e.filtersString), e.PageData.loading = !0, this.__ajax("post", {
        method: "loadPage",
        lastId: t,
        offset: a,
        pageCount: i,
        prevLastId: n
      }, null, null, l).then((function (t) {
        let i;
        e.loadedPage = t.page, e.rows = t.rows, i = t.rows.length ? {
          firstId: t.rows[0].id,
          lastId: t.rows[t.rows.length - 1].id
        } : {firstId: 0, lastId: 0}, e.PageData = {
          ...e.PageData,
          offset: t.offset,
          allCount: t.allCount,
          loading: !1, ...i
        }, e.initRowsData.call(e), e._refreshContentTable.call(e, !1, !0), e.__applyFilters.call(e, !0), e.PageData.$block.empty().append(e._paginationCreateBlock.call(e)), e.applyOrder(t.f.order), e.applyHideRows(t.f.hideRows), e.selectedCells.summarizer.check()
      }))
    }
  }
}, function () {
  $((function () {
    let e = localStorage.getItem("topNavScroll"), t = $(".totbar-default.navbar-default");
    e > 0 && t.scrollLeft(e), t.on("scroll", () => {
      localStorage.setItem("topNavScroll", t.scrollLeft())
    })
  }));
  const e = function (e) {
    if (e) {
      let t = e.chdata.rows[Object.keys(e.chdata.rows)[0]];
      const i = function (e, t) {
        App.getPcTableById("tree").then((function (i) {
          i.model.checkEditRow({id: e}).then((function (e) {
            window.location.href = "/Table/" + e.row.top.v + "/" + t
          }))
        }))
      };
      "calcs" === t.type.v ? App.getPcTableById(1).then((function (e) {
        e.model.checkEditRow({id: t.tree_node_id.v}).then((function (e) {
          i(e.row.tree_node_id.v, t.tree_node_id.v)
        }))
      })) : i(t.tree_node_id.v, t.id)
    }
  };
  addTree = function (t, i, n) {
    let a = $("div.page_content");
    if (!App.isTopWindow()) return a.addClass("tree-minifyed iframed"), !1;
    window.TREE_DATA = i;
    let l = screen.width <= window.MOBILE_MAX_WIDTH;
    l ? n = !1 : ($(window).on("resize", (function () {
      window.innerWidth <= 660 && !a.is(".tree-minifyed") && u(!0)
    })), localStorage.getItem("notCreator") && (n = !1)), $.jstree.defaults.core.dblclick_toggle = !1, $.jstree.defaults.core.expand_selected_onload = !0, $.jstree.defaults.core.force_text = !0;
    let s, o = localStorage.getItem("tree") || "{}";
    o = JSON.parse(o), $.each(i, (function (e, a) {
      if (i[e].data = {type: a.type}, a.id.match(/^table/) && a.icon && (i[e].icon = "fa fa-" + a.icon), a.state && a.state.selected && (i[e].li_attr = {class: "jstree-selected"}), o[a.id] && (i[e].state || (i[e].state = {}), i[e].state.opened = !0), a.href ? i[e].a_attr = {href: (a.href.toString().match(/\/Table\//) ? "" : t) + a.href} : a.link && (i[e].a_attr = {href: a.link}), n) switch (-1 !== ["link", "anchor", "folder"].indexOf(a.type) && (a.a_attr = a.a_attr || {}, a.a_attr = {
        ...a.a_attr,
        class: "edit-folder",
        "data-id": a.id.substr(4)
      }), a.type) {
        case"folder":
          i.push({
            type: "plus",
            id: "plus-table" + a.id.substring(4),
            text: "Таблицу",
            parent: a.id,
            li_attr: {class: "jstree-creatorView"}
          }), i.push({
            type: "plus",
            id: "plus-folder" + a.id.substring(4),
            text: "Папку/Ссылку",
            parent: a.id,
            li_attr: {class: "jstree-creatorView"}
          });
          break;
        case"cycle_name":
          i.push({
            type: "plus",
            id: "plus-calcs" + a.parent.substring(4),
            text: "Таблицу",
            parent: a.id,
            li_attr: {class: "jstree-creatorView"}
          });
          break;
        case"table_cycles":
          a.a_attr = {...a.a_attr, class: "add_calcs_table", "data-id": a.id.substr(5)}
      }
    })), n && (s = t.match(/^.*?(\d+)/)) && (i.push({
      type: "plus",
      id: "plus-table" + s[1],
      text: "Таблицу",
      parent: "#",
      li_attr: {class: "jstree-creatorView"}
    }), i.push({
      type: "plus",
      id: "plus-folder" + s[1],
      text: "Папку/Ссылку",
      parent: "#",
      li_attr: {class: "jstree-creatorView"}
    }));
    let r = $("#leftTree");
    n ? r.on("init.jstree", (function (t, i) {
      let n = $.jstree.core.prototype.redraw_node;
      r.jstree(!0).redraw_node = function (t, i, a, l) {
        let s = n.bind(this)(t, i, a, l);
        if (t.match(/^tree/)) {
          "folder" == r.jstree(!0).get_node(t).data.type && $(s).addClass("tree-folder")
        }
        let o = $(s).find(">a.edit-folder");
        if (o.length) {
          let t = $('<i class="fa fa-edit edit-folder-icon"></i>');
          t.on("click", () => (new EditPanel("tree", BootstrapDialog.TYPE_DANGER, {id: o.data("id")}).then(e), !1)), o.find(">i").after(t)
        } else {
          let t = $(s).find(">a.add_calcs_table");
          if (t.length) {
            let i = $('<i class="fa fa-plus edit-folder-icon"></i>');
            i.on("click", () => (
              new EditPanel(1, BootstrapDialog.TYPE_DANGER, {
              type: {v: "calcs"},
              tree_node_id: {v: t.data("id")}
            }, {}, {type: !0, tree_node_id: !0}).then(e), !1)), t.find(">i").after(i)
          }
        }
        return s
      }
    })) : r.on("init.jstree", (function (e, t) {
      let i = $.jstree.core.prototype.redraw_node;
      r.jstree(!0).redraw_node = function (e, t, n, a) {
        let l = i.bind(this)(e, t, n, a);
        if (e.match(/^tree/)) {
          "folder" == r.jstree(!0).get_node(e).data.type && $(l).addClass("tree-folder")
        }
        return l
      }
    }));
    let d = $("#LeftTree"),
      c = () => "tree_scroll_part_" + (window.top_branch || (window.location.pathname.match(/\/Table\/(\d+)/) || {1: 0})[1]);
    const f = function () {
      r.jstree({
        state: {key: "leftTree"},
        core: {check_callback: !0, expand_selected_onload: !0, open_parents: !0, data: i, themes: {name: "default"}},
        types: {
          folder: {},
          plus: {icon: "fa fa-plus"},
          cycle_name: {icon: "fa fa-dot-circle-o"},
          text: {icon: "jstree-file"},
          table: {icon: "jstree-file"},
          table_simple: App.tableTypes.simple,
          table_version: App.tableTypes.version,
          table_calcs: App.tableTypes.calcs,
          table_tmp: App.tableTypes.tmp,
          table_globcalcs: App.tableTypes.globcalcs,
          table_cycles: App.tableTypes.cycles,
          table_data: {icon: "jstree-file"}
        },
        plugins: ["types", "themes"]
      }), p()
    };
    r.on("loaded.jstree after_open.jstree", (function (e) {
      let t = r.width();
      if (r.find("a.jstree-anchor").each((function () {
        let e = $(this), i = e.offset().left;
        e.width(t - i)
      })), "loaded" === e.type) {
        let e = localStorage.getItem(c());
        e && d.scrollTop(e), p()
      }
    })), r.on("select_node.jstree", (function (i, n) {

      switch (localStorage.setItem(c(), d.scrollTop()), (n.node.data ? n.node.data.type : null) || n.node.type) {
        case"plus":
          let i = n.node.id.substring(5, 10);
          if ("calcs" === i) {
            let e = n.node.id.substring(11);
            n.node.parent.substring(5);
            new EditPanel(1, BootstrapDialog.TYPE_DANGER, {
              tree_node_id: {v: e},
              type: {v: "calcs"}
            }).then((function (e) {
              e && window.location.reload(!0)
            }))
          } else if ("table" === i) {
            let t = n.node.id.length > 10 ? n.node.id.substring(10) : window.location.pathname.match(/^\/.*\/(\d+)\//)[1];
            new EditPanel(1, BootstrapDialog.TYPE_DANGER, {tree_node_id: {v: t}}).then(e)
          } else {
            let e = n.node.id.length > 11 ? n.node.id.substring(11) : window.location.pathname.match(/^\/.*\/(\d+)\//)[1];
            new EditPanel("tree", BootstrapDialog.TYPE_DANGER, {parent_id: {v: e}}).then((function (e) {
              e && window.location.reload(!0)
            }))
          }
          return !1;
        case"link":
          window.location.href = n.node.a_attr.href;
          break;
        case"folder":
        case"project":
          return n.node.state.opened ? ($("#leftTree").jstree("close_node", n.node), o[n.node.id] && (delete o[n.node.id], localStorage.setItem("tree", JSON.stringify(o)))) : ($("#leftTree").jstree("open_node", n.node), o[n.node.id] = !0, localStorage.setItem("tree", JSON.stringify(o))), !1;
        default:
          window.location.pathname.match(/^\/Table\//) ? window.location.href = n.node.original.link ? n.node.original.link : "/" !== n.node.original.href[0] ? t + n.node.original.href : n.node.original.href : window.location.href = n.node.original.href
      }
      return !1
    }));
    const p = function () {
      setTimeout((function () {
        d.getNiceScroll().resize()
      }), 250)
    };
    r.on("open_node.jstree", (function (e, t) {

      o[t.node.id] = !0, localStorage.setItem("tree", JSON.stringify(o)), p()
    })), r.on("close_node.jstree", (function (e, t) {

      o[t.node.id] && (delete o[t.node.id], localStorage.setItem("tree", JSON.stringify(o))), p()
    }));
    let h = localStorage.getItem("TreeMinimizer") || "false";
    h = JSON.parse(h);
    let u = function (e) {
      h = e;
      const t = $("#page-tree");
      let i = $("#page-tree").length && !($("#main-page").length || $("#tables_tabls").length);
      e ? ($("body>.page_content").addClass("tree-minifyed"), $("#LeftTree").getNiceScroll().resize(), i && (t.append(r), r.trigger("after_open"))) : ($("body>.page_content").removeClass("tree-minifyed"), i && ($(".TreeContainer").append(r), r.trigger("after_open"))), $("#table").data("pctable") && $("#table").data("pctable").setWidthes(), f(), localStorage.setItem("TreeMinimizer", JSON.stringify(h)), p()
    };
    l || d.niceScroll({
      cursorwidth: 7,
      mousescrollstep: 190,
      mousescroll: 190,
      autohidemode: !1,
      enablekeyboard: !1,
      cursoropacitymin: 1,
      railoffset: {left: 4},
      cursorcolor: "#e1e0df"
    }), $("#TreeMaximizer").on("click", (function () {
      if (l || window.innerWidth <= 660) {
        let e = $("<div>");
        e.append($("#branch-title")), e.append($("#leftTree")), App.mobilePanel('<a class="totum-brand" href="/"><span>' + $(".totum-brand span:first").text() + "</span></a>", e, {
          onhide: function () {
            const e = $("#page-tree");
            1 === e.length ? (r.appendTo(e), f()) : (r.appendTo(".TreeContainer"), f())
          }, cssClass: "mobile-panel mobile-menu"
        }), r.trigger("after_open")
      } else u(!1)
    })), $("#TreeMinimizer").on("click", (function () {
      u(!0)
    })), !0 === h ? setTimeout((function () {
      u(h)
    }), 1) : l ? setTimeout((function () {
      1 === $("#page-tree").length && r.appendTo($("#page-tree")), f()
    }), 10) : f()
  }
}();