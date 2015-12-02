var CSR;
! function (e) {
    function t(e, t) {
        function o(e) {
            if (e.ControlMode == SPClientTemplates.ClientControlMode.EditForm || e.ControlMode == SPClientTemplates.ClientControlMode.NewForm)
                for (var t = 0; t < e.ListSchema.Field.length; t++) {
                    var o = e.ListSchema.Field[t];
                    if (!e.FormContextHook) {
                        e.FormContextHook = {};
                        var l = e.FormContext.registerGetValueCallback;
                        e.FormContext.registerGetValueCallback = function (t, o) {
                            e.FormContextHook[t].getValue = o, l(t, o)
                        };
                        var i = e.FormContext.updateControlValue;
                        e.FormContext.updateControlValue = function (t, o) {
                            i(t, o);
                            var l = u(e.FormContextHook, t);
                            l.lastValue = o;
                            for (var n = e.FormContextHook[t].updatedValueCallbacks, r = 0; r < n.length; r++) n[r](o, l.fieldSchema)
                        }
                    }
                    u(e.FormContextHook, o.Name).fieldSchema = o
                }
        }

        function l(e) {
            if (e.ControlMode != SPClientTemplates.ClientControlMode.Invalid && e.ControlMode != SPClientTemplates.ClientControlMode.View && e.ListSchema.Field.length > 1) {
                var t = e.FormUniqueId,
                    o = $get("WebPart" + t),
                    l = o.getElementsByClassName("ms-formtable");
                if (l.length > 0) {
                    for (var i = $get(t + "ClientFormTopContainer"), n = document.createDocumentFragment(), r = 0; r < i.children.length; r++) n.appendChild(i.children.item(r));
                    var a = l.item(0);
                    a.parentNode.replaceChild(n, a)
                }
                var u = e.CurrentItem;
                e.CurrentItem = e.ListData.Items[0];
                for (var d = e.ListSchema.Field, s = 0; s < d.length; s++) {
                    var p = d[s],
                        m = t + e.FormContext.listAttributes.Id + p.Name,
                        c = $get(m);
                    c && (c.outerHTML = e.RenderFieldByName(e, p.Name))
                }
                e.CurrentItem = u
            }
        }
        return new d(e, t).onPreRender(o).onPostRender(l)
    }

    function o(e, t) {
        if (e.ControlMode == SPClientTemplates.ClientControlMode.EditForm || e.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
            var o = e;
            if (o.FormContextHook && o.FormContextHook[t] && o.FormContextHook[t].getValue) return o.FormContextHook[t].getValue()
        }
        return null
    }

    function l(e, t) {
        if (e.ControlMode == SPClientTemplates.ClientControlMode.EditForm || e.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
            var o = e;
            if (o.FormContextHook && o.FormContextHook[t]) return o.FormContextHook[t].fieldSchema
        }
        return null
    }

    function i(e, t, o) {
        if (e.ControlMode == SPClientTemplates.ClientControlMode.EditForm || e.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
            var l = e;
            if (l.FormContextHook) {
                var i = u(l.FormContextHook, t),
                    n = i.updatedValueCallbacks; -1 == n.indexOf(o) && (n.push(o), i.lastValue && o(i.lastValue, i.fieldSchema))
            }
        }
    }

    function n(e, t, o) {
        if (e.ControlMode == SPClientTemplates.ClientControlMode.EditForm || e.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
            var l = e;
            if (l.FormContextHook) {
                var i = u(l.FormContextHook, t).updatedValueCallbacks,
                    n = i.indexOf(o); -1 != n && i.splice(n, 1)
            }
        }
    }

    function r(e) {
        var t = e.Name + "_" + e.Id + "_$" + e.FieldType + "Field";
        return $get(t)
    }

    function a(e, t) {
        var o = {
            ListSchema: {
                Field: [e]
            },
            FieldControlModes: {}
        };
        o.FieldControlModes[e.Name] = t;
        var l = SPClientTemplates.TemplateManager.GetTemplates(o);
        return l.Fields[e.Name]
    }

    function u(e, t) {
        return e[t] = e[t] || {
            updatedValueCallbacks: []
        }
    }
    e.override = t, e.getFieldValue = o, e.getFieldSchema = l, e.addUpdatedValueCallback = i, e.removeUpdatedValueCallback = n, e.getControl = r, e.getFieldTemplate = a;
    var d = function () {
        function t(e, t) {
            this.ListTemplateType = e, this.BaseViewID = t, this.Templates = {
                Fields: {}
            }, this.OnPreRender = [], this.OnPostRender = [], this.IsRegistered = !1
        }
        return t.prototype.view = function (e) {
            return this.Templates.View = e, this
        }, t.prototype.item = function (e) {
            return this.Templates.Item = e, this
        }, t.prototype.header = function (e) {
            return this.Templates.Header = e, this
        }, t.prototype.body = function (e) {
            return this.Templates.Body = e, this
        }, t.prototype.footer = function (e) {
            return this.Templates.Footer = e, this
        }, t.prototype.fieldView = function (e, t) {
            return this.Templates.Fields[e] = this.Templates.Fields[e] || {}, this.Templates.Fields[e].View = t, this
        }, t.prototype.fieldDisplay = function (e, t) {
            return this.Templates.Fields[e] = this.Templates.Fields[e] || {}, this.Templates.Fields[e].DisplayForm = t, this
        }, t.prototype.fieldNew = function (e, t) {
            return this.Templates.Fields[e] = this.Templates.Fields[e] || {}, this.Templates.Fields[e].NewForm = t, this
        }, t.prototype.fieldEdit = function (e, t) {
            return this.Templates.Fields[e] = this.Templates.Fields[e] || {}, this.Templates.Fields[e].EditForm = t, this
        }, t.prototype.template = function (e, t) {
            return this.Templates[e] = t, this
        }, t.prototype.fieldTemplate = function (e, t, o) {
            return this.Templates.Fields[e] = this.Templates.Fields[e] || {}, this.Templates.Fields[e][t] = o, this
        }, t.prototype.onPreRender = function () {
            for (var e = [], t = 0; t < arguments.length; t++) e[t - 0] = arguments[t];
            for (var o = 0; o < e.length; o++) this.OnPreRender.push(e[o]);
            return this
        }, t.prototype.onPostRender = function () {
            for (var e = [], t = 0; t < arguments.length; t++) e[t - 0] = arguments[t];
            for (var o = 0; o < e.length; o++) this.OnPostRender.push(e[o]);
            return this
        }, t.prototype.onPreRenderField = function (e, t) {
            return this.onPreRender(function (o) {
                var l = o,
                    i = l.ListSchema.Field;
                if (i)
                    for (var n = 0; n < i.length; n++) i[n].Name === e && t(i[n], o)
            })
        }, t.prototype.onPostRenderField = function (e, t) {
            return this.onPostRender(function (o) {
                var l = o,
                    i = l.ListSchema.Field;
                if (i)
                    for (var n = 0; n < i.length; n++) i[n].Name === e && t(i[n], o)
            })
        }, t.prototype.makeReadOnly = function (e) {
            return this.onPreRenderField(e, function (t, o) {
                if (o.ControlMode != SPClientTemplates.ClientControlMode.Invalid && o.ControlMode != SPClientTemplates.ClientControlMode.DisplayForm)
                    if (t.ReadOnlyField = !0, t.ReadOnly = "TRUE", o.ControlMode == SPClientTemplates.ClientControlMode.View) {
                        var l = o;
                        l.inGridMode
                    } else {
                        var i = o;
                        if ("User" != t.Type && "UserMulti" != t.Type) {
                            var n = a(t, SPClientTemplates.ClientControlMode.DisplayForm);
                            i.Templates.Fields[e] = n, i.FormContext.registerGetValueCallback(e, function () {
                                return i.ListData.Items[0][e]
                            })
                        }
                    }
            }).onPostRenderField(e, function (e, t) {
                (t.ControlMode == SPClientTemplates.ClientControlMode.EditForm || t.ControlMode == SPClientTemplates.ClientControlMode.NewForm) && ("User" == e.Type || "UserMulti" == e.Type) && SP.SOD.executeFunc("clientpeoplepicker.js", "SPClientPeoplePicker", function () {
                    var t = e.Name + "_" + e.Id + "_$ClientPeoplePicker",
                        o = 10,
                        l = function () {
                            var e = SPClientPeoplePicker.SPClientPeoplePickerDict[t];
                            e ? (e.SetEnabledState(!1), e.DeleteProcessedUser = function () { }) : o-- && setTimeout(l, 1)
                        };
                    l()
                })
            })
        }, t.prototype.makeHidden = function (e) {
            return this.onPreRenderField(e, function (t, o) {
                if (o.ControlMode != SPClientTemplates.ClientControlMode.Invalid)
                    if (t.Hidden = !0, o.ControlMode == SPClientTemplates.ClientControlMode.View) {
                        var l = o;
                        l.inGridMode || l.ListSchema.Field.splice(l.ListSchema.Field.indexOf(t), 1)
                    } else {
                        for (var i = o, n = i.FormUniqueId + i.FormContext.listAttributes.Id + e, r = $get(n), a = r;
                            "TR" !== a.tagName.toUpperCase() ;) a = a.parentElement;
                        var u = a;
                        u.style.display = "none"
                    }
            })
        }, t.prototype.filteredLookup = function (t, o, l, i) {
            function n(t) {
                function n() {
                    F = document.getElementById(y), null != F && AddEvtHandler(F, "onchange", a), SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
                        m(S), c(!0)
                    })
                }

                function r() {
                    var e = '<span dir="' + STSHtmlEncode(h.fieldSchema.Direction) + '">';
                    return e += '<select id="' + STSHtmlEncode(y) + '" title="' + STSHtmlEncode(h.fieldSchema.Title) + '">', e += "</select><br/></span>"
                }

                function a() {
                    I && null != F && (h.updateControlValue(h.fieldName, u()), V = parseInt(F.value, 10))
                }

                function u() {
                    return null == F ? "" : "0" == F.value || "" == F.value ? "" : F.value + ";#" + F.options[F.selectedIndex].text
                }

                function d(e) {
                    return e.substring(1, e.length - 1)
                }

                function s(e, t, o, l, i) {
                    var n = !!o;
                    if (n) {
                        var r = SPClientTemplates.Utility.ParseLookupValue(t);
                        1 == l.length && "Value" == l[0] ? (t = r.LookupValue, l.shift()) : t = r.LookupId.toString()
                    }
                    if (0 == l.length) g[e] = t, i();
                    else {
                        var a = SP.ClientContext.get_current(),
                            u = a.get_web(),
                            d = u.get_lists().getById(o),
                            p = d.getItemById(parseInt(t, 10)),
                            m = d.get_fields().getByInternalNameOrTitle(l.shift());
                        a.load(p), a.load(m), a.executeQueryAsync(function (t, n) {
                            var r = p.get_item(m.get_internalName());
                            if ("Lookup" == m.get_typeAsString()) {
                                m = a.castTo(m, SP.FieldLookup);
                                var u = r;
                                r = u.get_lookupId() + ";#" + u.get_lookupValue(), o = m.get_lookupList()
                            }
                            s(e, r, o, l, i)
                        }, function (e, t) {
                            console.log(t.get_message())
                        })
                    }
                }

                function m(o) {
                    o.forEach(function (o) {
                        var l = o.split("."),
                            i = l.shift();
                        e.addUpdatedValueCallback(t, i, function (e, t) {
                            s(o, e, t.LookupListId, l.slice(0), c)
                        })
                    })
                }

                function c(e) {
                    I = !1, x++;
                    var t = SP.ClientContext.get_current(),
                        n = t.get_web(),
                        r = P.LookupListId,
                        u = l ? n.get_lists().getByTitle(l) : n.get_lists().getById(r),
                        s = new SP.CamlQuery,
                        p = o.replace(C, function (e, t) {
                            var o = d(e);
                            return g[o] ? g[o] : ""
                        });
                    "<View" == p.substr(0, 5) ? s.set_viewXml(p) : s.set_viewXml('<View Scope="RecursiveAll"><Query><Where>' + p + '</Where></Query> <ViewFields><FieldRef Name="ID" /><FieldRef Name="Title"/></ViewFields></View>');
                    var m = u.getItems(s);
                    t.load(m), t.executeQueryAsync(function (t, o) {
                        for (var l = !1; F.options.length;) F.options.remove(0);
                        if (!P.Required) {
                            var n = new Option(Strings.STS.L_LookupFieldNoneOption, "0", l, l);
                            F.options.add(n), l = 0 == V
                        }
                        for (var r = !0, u = m.getEnumerator() ; u.moveNext() ;) {
                            var d, s, p = u.get_current();
                            if (i) {
                                var c = p.get_item(i);
                                d = c.get_lookupId(), s = c.get_lookupValue()
                            } else d = p.get_id(), s = p.get_item("Title");
                            var f = V == d;
                            f && (l = !0);
                            var C = new Option(s, d.toString(), f, f);
                            F.options.add(C), r = !1
                        }
                        x--, I = !0, x || (e ? 0 != V || l || (F.selectedIndex = 0, a()) : (0 == V || l || (F.selectedIndex = 0), a()))
                    }, function (e, t) {
                        console.log(t.get_message())
                    })
                }
                for (var f, C = /\{[^\}]+\}/g, S = []; f = C.exec(o) ;) S.push(d(f[0]));
                var F, h, g = {};
                if (null == t) return "";
                if (h = SPClientTemplates.Utility.GetFormContextForCurrentField(t), null == h || null == h.fieldSchema) return "";
                var P = h.fieldSchema,
                    v = new SPClientForms.ClientValidation.ValidatorSet;
                v.RegisterValidator(new p(function () {
                    return I
                }, "Wait until lookup values loaded and try again")), h.fieldSchema.Required && v.RegisterValidator(new SPClientForms.ClientValidation.RequiredValidator), h.registerClientValidator(h.fieldName, v);
                var y = h.fieldName + "_" + h.fieldSchema.Id + "_$LookupField",
                    T = null != h.fieldValue ? h.fieldValue : "",
                    V = SPClientTemplates.Utility.ParseLookupValue(T).LookupId,
                    k = 0 == V,
                    I = !1,
                    x = 0;
                return k && (T = ""), h.registerInitCallback(h.fieldName, n), h.registerFocusCallback(h.fieldName, function () {
                    null != F && F.focus()
                }), h.registerValidationErrorCallback(h.fieldName, function (e) {
                    SPFormControl_AppendValidationErrorMessage(y, e)
                }), h.registerGetValueCallback(h.fieldName, u), h.updateControlValue(h.fieldName, T), r()
            }
            return this.fieldEdit(t, n).fieldNew(t, n)
        }, t.prototype.koEditField = function (t, o, l, i) {
            function n(n) {
                if (null == n) return "";
                var r = SPClientTemplates.Utility.GetFormContextForCurrentField(n);
                if (null == r || null == r.fieldSchema) return "";
                var a = r.fieldName + "_" + r.fieldSchema.Id + "_$" + r.fieldSchema.Type;
                return l.renderingContext = n, i && i.forEach(function (t) {
                    l[t] || (l[t] = ko.observable(e.getFieldValue(n, t))), e.addUpdatedValueCallback(n, t, function (e) {
                        l[t](e)
                    })
                }), l.value || (l.value = ko.observable()), l.value.subscribe(function (e) {
                    r.updateControlValue(t, e)
                }), r.registerGetValueCallback(t, function () {
                    return l.value()
                }), r.registerInitCallback(t, function () {
                    ko.applyBindings(l, $get(a))
                }), '<div id="' + STSHtmlEncode(a) + '">' + o + "</div>"
            }
            return this.fieldEdit(t, n).fieldNew(t, n)
        }, t.prototype.computedValue = function (t, o) {
            for (var l = this, i = [], n = 2; n < arguments.length; n++) i[n - 2] = arguments[n];
            var r = {};
            return this.onPostRenderField(t, function (t, n) {
                if (n.ControlMode == SPClientTemplates.ClientControlMode.EditForm || n.ControlMode == SPClientTemplates.ClientControlMode.NewForm) {
                    var a = e.getControl(t);
                    i.forEach(function (t) {
                        e.addUpdatedValueCallback(n, t, function (e) {
                            r[t] = e, a.value = o.apply(l, i.map(function (e) {
                                return r[e] || ""
                            }))
                        })
                    })
                }
            })
        }, t.prototype.setInitialValue = function (e, t, o) {
            return t || !o ? this.onPreRenderField(e, function (o, l) {
                l.ListData.Items[0][e] = t
            }) : this
        }, t.prototype.autofill = function (e, t) {
            function o(e) {
                function o() {
                    r = document.getElementById(a), SP.SOD.executeFunc("autofill.js", "SPClientAutoFill", function () {
                        n = new SPClientAutoFill(a, u, function (e) {
                            return o()
                        });
                        var o = t({
                            renderContext: e,
                            fieldContext: i,
                            autofill: n,
                            control: r
                        })
                    })
                }

                function l() {
                    var e = [];
                    return e.push('<div dir="' + STSHtmlEncode(i.fieldSchema.Direction) + '" style="position: relative;">'), e.push('<input type="text" id="' + STSHtmlEncode(a) + '" title="' + STSHtmlEncode(i.fieldSchema.Title) + '"/>'), e.push("<div class='sp-peoplepicker-autoFillContainer' id='" + STSHtmlEncode(u) + "'></div>"), e.push("</div>"), e.join("")
                }
                if (null == e) return "";
                var i = SPClientTemplates.Utility.GetFormContextForCurrentField(e);
                if (null == i || null == i.fieldSchema) return "";
                var n, r, a = i.fieldName + "_" + i.fieldSchema.Id + "_$" + i.fieldSchema.Type + "Field",
                    u = i.fieldName + "_" + i.fieldSchema.Id + "_$AutoFill",
                    d = new SPClientForms.ClientValidation.ValidatorSet;
                return i.fieldSchema.Required && d.RegisterValidator(new SPClientForms.ClientValidation.RequiredValidator), i.registerClientValidator(i.fieldName, d), i.registerInitCallback(i.fieldName, o), i.registerFocusCallback(i.fieldName, function () {
                    null != r && r.focus()
                }), i.registerValidationErrorCallback(i.fieldName, function (e) {
                    SPFormControl_AppendValidationErrorMessage(a, e)
                }), i.registerGetValueCallback(i.fieldName, function () {
                    return i.fieldValue
                }), i.updateControlValue(i.fieldName, i.fieldValue), l()
            }
            return this.fieldNew(e, o).fieldEdit(e, o)
        }, t.prototype.seachLookup = function (e) {
            return this.autofill(e, function (t) {
                function o(e, o) {
                    var i = t.control;
                    i.value = o[SPClientAutoFill.DisplayTextProperty], r.LookupId = o[SPClientAutoFill.KeyProperty], r.LookupValue = o[SPClientAutoFill.DisplayTextProperty], l.fieldValue = o[SPClientAutoFill.KeyProperty] + ";#" + o[SPClientAutoFill.TitleTextProperty], l.updateControlValue(l.fieldSchema.Name, l.fieldValue)
                }
                var l = t.fieldContext,
                    i = l.fieldSchema;
                if ("Lookup" != l.fieldSchema.Type) return null;
                var n = null != l.fieldValue ? l.fieldValue : "",
                    r = SPClientTemplates.Utility.ParseLookupValue(n),
                    a = 0 == r.LookupId;
                t.control.value = r.LookupValue, $addHandler(t.control, "blur", function (o) {
                    "" == t.control.value && (l.fieldValue = "", l.updateControlValue(e, l.fieldValue))
                }), a && (l.fieldValue = "");
                var u = t.autofill;
                return u.AutoFillMinTextLength = 2, u.VisibleItemCount = 15, u.AutoFillTimeout = 500,
                    function () {
                        var e = t.control.value;
                        u.PopulateAutoFill([s.buildLoadingItem("Please wait...")], o), SP.SOD.executeFunc("sp.search.js", "Microsoft.SharePoint.Client.Search.Query", function () {
                            var t = Microsoft.SharePoint.Client.Search.Query,
                                l = SP.ClientContext.get_current(),
                                n = new t.KeywordQuery(l);
                            n.set_rowLimit(u.VisibleItemCount), n.set_queryText("contentclass:STS_ListItem ListID:{" + i.LookupListId + "} " + e);
                            var r = n.get_selectProperties();
                            r.clear(), r.add("Title"), r.add("ListItemId");
                            var a = new t.SearchExecutor(l),
                                d = a.executeQuery(n);
                            l.executeQueryAsync(function () {
                                var e = new t.ResultTableCollection;
                                e.initPropertiesFromJson(d.get_value());
                                for (var l = e.get_item(0), i = l.get_resultRows(), n = [], r = 0; r < i.length; r++) n.push(s.buildOptionItem(parseInt(i[r].ListItemId, 10), i[r].Title));
                                n.push(s.buildSeparatorItem()), 0 == l.get_totalRows() ? n.push(s.buildFooterItem("No results. Please refine your query.")) : n.push(s.buildFooterItem("Showing " + i.length + " of" + l.get_totalRows() + " items!")), u.PopulateAutoFill(n, o)
                            }, function (e, t) {
                                u.PopulateAutoFill([s.buildFooterItem("Error executing query/ See log for details.")], o), console.log(t.get_message())
                            })
                        })
                    }
            })
        }, t.prototype.lookupAddNew = function (t, o, l, i) {
            return this.onPostRenderField(t, function (t, n) {
                if (n.ControlMode == SPClientTemplates.ClientControlMode.EditForm || n.ControlMode == SPClientTemplates.ClientControlMode.NewForm) var r = e.getControl(t);
                if (r) {
                    var a = _spPageContextInfo.webServerRelativeUrl;
                    "/" == a[a.length - 1] && (a = a.substring(0, a.length - 1));
                    var u = a + "/_layouts/listform.aspx/listform.aspx?PageType=8&ListId=" + encodeURIComponent("{" + t.LookupListId + "}");
                    i && (u += "&ContentTypeId=" + i);
                    var d = document.createElement("a");
                    d.href = "javascript:NewItem2(event, '" + u + "&Source=" + encodeURIComponent(document.location.href) + "')", d.textContent = o, r.nextElementSibling ? r.parentElement.insertBefore(d, r.nextElementSibling) : r.parentElement.appendChild(d), l && $addHandler(d, "click", function (e) {
                        SP.SOD.executeFunc("sp.ui.dialog.js", "SP.UI.ModalDialog.ShowPopupDialog", function () {
                            SP.UI.ModalDialog.ShowPopupDialog(u)
                        }), e.stopPropagation(), e.preventDefault()
                    })
                }
            })
        }, t.prototype.register = function () {
            this.IsRegistered || (SPClientTemplates.TemplateManager.RegisterTemplateOverrides(this), this.IsRegistered = !0)
        }, t
    }(),
        s = function () {
            function e() { }
            return e.buildFooterItem = function (e) {
                var t = {};
                return t[SPClientAutoFill.DisplayTextProperty] = e, t[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Footer, t
            }, e.buildOptionItem = function (e, t, o, l) {
                var i = {};
                return i[SPClientAutoFill.KeyProperty] = e, i[SPClientAutoFill.DisplayTextProperty] = o || t, i[SPClientAutoFill.SubDisplayTextProperty] = l, i[SPClientAutoFill.TitleTextProperty] = t, i[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Option, i
            }, e.buildSeparatorItem = function () {
                var e = {};
                return e[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Separator, e
            }, e.buildLoadingItem = function (e) {
                var t = {};
                return t[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Loading, t[SPClientAutoFill.DisplayTextProperty] = e, t
            }, e
        }();
    e.AutoFillOptionBuilder = s;
    var p = function () {
        function e(e, t) {
            this.valueGetter = e, this.validationMessage = t
        }
        return e.prototype.Validate = function (e) {
            return new SPClientForms.ClientValidation.ValidationResult(!this.valueGetter(), this.validationMessage)
        }, e
    }()
}(CSR || (CSR = {})), "object" == typeof SP && SP && "object" == typeof SP.SOD && SP.SOD && SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs("typescripttemplates.ts");