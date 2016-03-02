function $_global_clienttemplates() {
    SPClientRenderer = {GlobalDebugMode: false, AddCallStackInfoToErrors: false, RenderErrors: true};
    SPClientRenderer.IsDebugMode = function (a) {
        return typeof a != "undefined" && null != a && typeof a.DebugMode != "undefined" ? Boolean(a.DebugMode) : Boolean(SPClientRenderer.GlobalDebugMode)
    };
    SPClientRenderer.Render = function (b, a) {
        if (b == null || a == null)return;
        SPClientRenderer._ExecuteRenderCallbacks(a, "OnPreRender");
        var c = SPClientRenderer.RenderCore(a);
        if (a.Errors != null && a.Errors.length > 0) {
            var k = [];
            if (Boolean(SPClientRenderer.RenderErrors))for (var j = 0; j < a.Errors.length; j++)k.push(a.Errors[j]);
            c = k.join("") + " "
        }
        if (c != null && c != "")if (b.tagName == "DIV" || b.tagName == "TD") {
            if (a.fHidden)b.style.display = "none";
            b.innerHTML = c
        } else {
            var g = document.createElement("div");
            g.innerHTML = c;
            var i = g.firstChild;
            if (g.childNodes.length == 1 && i != null && i.nodeType == 3) {
                var n = document.createTextNode(c);
                InsertNodeAfter(b, n)
            } else {
                var h = i.childNodes, f;
                f = b.parentNode;
                for (var d = 0; d < h.length; d++) {
                    var e = h[d];
                    if (e.nodeType == 1)if (f.nodeName == e.nodeName)for (var l = e.childNodes, o = l.length, m = 0; m < o; m++)f.appendChild(l[0]); else {
                        if (a.fHidden)e.style.display = "none";
                        f.appendChild(h[d]);
                        d--
                    }
                }
            }
        }
        SPClientRenderer._ExecuteRenderCallbacks(a, "OnPostRender")
    };
    SPClientRenderer.RenderReplace = function (b, a) {
        if (b == null || a == null)return;
        SPClientRenderer._ExecuteRenderCallbacks(a, "OnPreRender");
        var c = SPClientRenderer.RenderCore(a), d = b.parentNode;
        if (d != null) {
            if (c != null && c != "") {
                var e = document.createElement("div");
                e.innerHTML = c;
                var f = e.childNodes;
                while (f.length > 0)d.insertBefore(f[0], b)
            }
            d.removeChild(b)
        }
        SPClientRenderer._ExecuteRenderCallbacks(a, "OnPostRender")
    };
    SPClientRenderer._ExecuteRenderCallbacks = function (c, b) {
        var a = {Operation: b}, d = function () {
            return SPClientRenderer._ExecuteRenderCallbacksWorker(c, b, a)
        };
        return CallFunctionWithErrorHandling(d, c, null, a)
    };
    SPClientRenderer._ExecuteRenderCallbacksWorker = function (c, d, f) {
        if (!c || d == null || d == "")return;
        var a = c[d];
        if (a == null)return;
        if (typeof a == "function") {
            f.TemplateFunction = a;
            a(c)
        } else if (typeof a == "object") {
            var e = a.length;
            if (e && typeof e == "number")for (var b = 0; b < Number(e); b++)if (typeof a[b] == "function") {
                f.TemplateFunction = a[b];
                a[b](c)
            }
        }
    };
    SPClientRenderer.RenderCore = function (a) {
        if (a == null)return "";
        a.RenderView = g;
        a.RenderHeader = l;
        a.RenderBody = n;
        a.RenderFooter = j;
        a.RenderGroups = k;
        a.RenderItems = m;
        a.RenderFields = i;
        a.RenderFieldByName = h;
        return g(a);
        function g(a) {
            return b(a, "View")
        }

        function l(a) {
            return b(a, "Header")
        }

        function n(a) {
            return b(a, "Body")
        }

        function j(a) {
            return b(a, "Footer")
        }

        function d(a, b, c) {
            return a == null ? "" : a.ResolveTemplate != null && typeof a.ResolveTemplate == "function" ? a.ResolveTemplate(a, b, c) : ""
        }

        function b(b, e) {
            if (b == null)return "";
            var a = d(b, b.ListData, e);
            if (a == null || a == "") {
                var c = b.Templates;
                if (c == null)return "";
                a = c[e]
            }
            return a == null || a == "" ? "" : CoreRender(a, b)
        }

        function k(a) {
            if (a == null || a.ListData == null)return "";
            var b = null;
            if (a.Templates != null)b = a.Templates.Group;
            var k = a.ListData, j = k[f(a)], h = "";
            if (j == null) {
                if (typeof b == "string" || typeof b == "function") {
                    a.CurrentGroupIdx = 0;
                    a.CurrentGroup = k;
                    a.CurrentItems = k[c(a)];
                    h += CoreRender(b, a);
                    a.CurrentItems = null;
                    a.CurrentGroup = null
                }
                return h
            }
            for (var i = 0; i < j.length; i++) {
                var g = j[i], e = d(a, g, "Group");
                if (e == null || e == "") {
                    if (b == null || b == {})return "";
                    if (typeof b == "string" || typeof b == "function")e = b;
                    if (e == null || e == "") {
                        var l = g.GroupType;
                        e = b[l]
                    }
                }
                if (e == null || e == "")continue;
                a.CurrentGroupIdx = i;
                a.CurrentGroup = g;
                a.CurrentItems = g[c(a)];
                h += CoreRender(e, a);
                a.CurrentGroup = null;
                a.CurrentItems = null
            }
            return h
        }

        function m(a) {
            if (a == null || a.ListData == null)return "";
            var g = null;
            if (a.Templates != null)g = a.Templates.Item;
            var p = a.ListData, e = a.CurrentItems;
            if (e == null)e = typeof a.CurrentGroup != "undefined" ? a.CurrentGroup[c(a)] : null;
            if (e == null) {
                var l = p[f(a)];
                e = typeof l != "undefined" ? l[c(a)] : null
            }
            if (e == null)return "";
            for (var j = "", h = 0; h < e.length; h++) {
                var i = e[h], b = d(a, i, "Item");
                if (b == null || b == "") {
                    if (g == null || g == {})return "";
                    if (typeof g == "string" || typeof g == "function")b = g;
                    if (b == null || b == "") {
                        var o = i.ContentType;
                        b = g[o]
                    }
                }
                if (b == null || b == "")continue;
                a.CurrentItemIdx = h;
                a.CurrentItem = i;
                if (typeof a.ItemRenderWrapper == "string")a.ItemRenderWrapper == SPClientRenderer.ParseTemplateString(a.ItemRenderWrapper, a);
                if (typeof a.ItemRenderWrapper == "function") {
                    var k = a.ItemRenderWrapper, m = {
                        TemplateFunction: k,
                        Operation: "ItemRenderWrapper"
                    }, n = function () {
                        return k(CoreRender(b, a), a, b)
                    };
                    j += CallFunctionWithErrorHandling(n, a, "", m)
                } else j += CoreRender(b, a);
                a.CurrentItem = null
            }
            return j
        }

        function i(a) {
            if (a == null || a.Templates == null || a.ListSchema == null || a.ListData == null)return "";
            var f = a.CurrentItem, b = a.ListSchema.Field, d = a.Templates.Fields;
            if (f == null || b == null || d == null)return "";
            var c = "";
            for (var g in b)c += e(a, b[g]);
            return c
        }

        function h(a, c) {
            if (a == null || a.Templates == null || a.ListSchema == null || a.ListData == null || c == null || c == "")return "";
            var d = a.CurrentItem, b = a.ListSchema.Field, g = a.Templates.Fields;
            if (d == null || b == null || g == null)return "";
            if (typeof SPClientTemplates != "undefined" && spMgr != null && a.ControlMode == SPClientTemplates.ClientControlMode.View)return spMgr.RenderFieldByName(a, c, d, a.ListSchema);
            for (var f in b)if (b[f].Name == c)return e(a, b[f]);
            return ""
        }

        function e(a, f) {
            var e = a.CurrentItem, d = a.Templates.Fields, b = f.Name;
            if (typeof e[b] == "undefined")return "";
            var c = "";
            if (d[b] != null)c = d[b];
            if (c == null || c == "")return "";
            a.CurrentFieldValue = e[b];
            a.CurrentFieldSchema = f;
            var g = CoreRender(c, a);
            a.CurrentFieldValue = null;
            a.CurrentFieldSchema = null;
            return g
        }

        function f(b) {
            var a = b.ListDataJSONGroupsKey;
            return typeof a != "string" || a == "" ? "Groups" : a
        }

        function c(b) {
            var a = b.ListDataJSONItemsKey;
            return typeof a != "string" || a == "" ? "Items" : a
        }
    };
    SPClientRenderer.ParseTemplateString = function (a, b) {
        var c = {TemplateFunction: a, Operation: "ParseTemplateString"}, d = function () {
            return SPClientRenderer.ParseTemplateStringWorker(a, b)
        };
        return CallFunctionWithErrorHandling(d, b, null, c)
    };
    SPClientRenderer.ParseTemplateStringWorker = function (a) {
        if (a == null || a.length == 0)return null;
        var c = "var p=[]; p.push('" + a.replace(/[\r\t\n]/g, " ").replace(/'(?=[^#]*#>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<#=(.+?)#>/g, "',$1,'").split("<#").join("');").split("#>").join("p.push('") + "'); return p.join('');", b;
        b = new Function("ctx", c);
        return b
    };
    SPClientRenderer.ReplaceUrlTokens = function (a) {
        var c = window._spPageContextInfo;
        if (a == null || a == "" || c == null)return "";
        var k = "~site/", f = "~sitecollection/", e = "~sitecollectionmasterpagegallery/", b = a.toLowerCase();
        if (b.indexOf(k) == 0) {
            var n = h(c.webServerRelativeUrl);
            a = n + a.substr(k.length);
            b = n + b.substr(k.length)
        } else if (b.indexOf(f) == 0) {
            var m = h(c.siteServerRelativeUrl);
            a = m + a.substr(f.length);
            b = m + b.substr(f.length)
        } else if (b.indexOf(e) == 0) {
            var l = h(c.siteServerRelativeUrl);
            a = l + "_catalogs/masterpage/" + a.substr(e.length);
            b = l + "_catalogs/masterpage/" + b.substr(e.length)
        }
        var j = "{lcid}", i = "{locale}", g = "{siteclienttag}", d = -1;
        while ((d = b.indexOf(j)) != -1) {
            a = a.substring(0, d) + String(c.currentLanguage) + a.substr(d + j.length);
            b = b.replace(j, String(c.currentLanguage))
        }
        while ((d = b.indexOf(i)) != -1) {
            a = a.substring(0, d) + c.currentUICultureName + a.substr(d + i.length);
            b = b.replace(i, c.currentUICultureName)
        }
        while ((d = b.indexOf(g)) != -1) {
            a = a.substring(0, d) + c.siteClientTag + a.substr(d + g.length);
            b = b.replace(g, c.siteClientTag)
        }
        return a;
        function h(a) {
            if (a == null || a == "")return "";
            var b = a.length;
            return a[b - 1] == "/" ? a : a + "/"
        }
    };
    clientHierarchyManagers = [];
    ClientHierarchyManager = function (k, i) {
        clientHierarchyManagers.push(this);
        var j = k, b = {}, d = {}, e = {}, a = {}, c = {};
        this.Matches = function (a) {
            return a == j
        };
        this.RegisterHierarchyNode = function (f, g, i, h) {
            b[f] = true;
            d[f] = i;
            e[h] = f;
            c[f] = h;
            a[f] = [];
            g != null && a[g].push(f)
        };
        this.IsParent = function (b) {
            return b in a && a[b].length > 0
        };
        this.ToggleExpandByImg = function (a) {
            if (!(a.id in e))return;
            var b = e[a.id];
            h(b, a)
        };
        this.ToggleExpandById = function (a) {
            if (a == null)return;
            if (!(a in c))return;
            var d = c[a], b = $get(d);
            if (b == null)return;
            h(a, b)
        };
        this.GetToggleStateById = function (c) {
            return c == null ? 0 : !(c in b) ? 0 : a[c].length == 0 ? 0 : b[c] ? 1 : 2
        };
        function h(a, d) {
            var c = !b[a];
            if (c) {
                d.firstChild.className = "ms-commentcollapse" + (i ? "rtl" : "") + "-icon";
                g(a)
            } else {
                d.firstChild.className = "ms-commentexpand" + (i ? "rtl" : "") + "-icon";
                f(a)
            }
            b[a] = c
        }

        function g(e) {
            for (var c = 0; c < a[e].length; c++) {
                document.getElementById(d[a[e][c]]).style.display = "";
                b[a[e][c]] && g(a[e][c])
            }
        }

        function f(c) {
            for (var b = 0; b < a[c].length; b++) {
                document.getElementById(d[a[c][b]]).style.display = "none";
                f(a[c][b])
            }
        }
    };
    if (typeof window.ClientPivotControl == "undefined") {
        window.ClientPivotControl = function (a) {
            this.AllOptions = [];
            if (a != null) {
                this.PivotParentId = a.PivotParentId;
                this.PivotContainerId = a.PivotContainerId;
                if (typeof a.AllOptions != "undefined")this.AllOptions = a.AllOptions;
                if (typeof a.SurfacedPivotCount == "number")this.SurfacedPivotCount = Number(a.SurfacedPivotCount);
                if (typeof a.ShowMenuIcons != "undefined")this.ShowMenuIcons = Boolean(a.ShowMenuIcons);
                if (typeof a.ShowMenuClose != "undefined")this.ShowMenuClose = a.ShowMenuClose;
                if (typeof a.ShowMenuCheckboxes != "undefined")this.ShowMenuCheckboxes = a.ShowMenuCheckboxes;
                if (typeof a.Width != "undefined")this.Width = a.Width
            } else this.PivotContainerId = "clientPivotControl" + ClientPivotControl.PivotControlCount.toString();
            this.OverflowDotId = this.PivotContainerId + "_overflow";
            this.OverflowMenuId = this.PivotContainerId + "_menu";
            ClientPivotControl.PivotControlCount++;
            ClientPivotControl.PivotControlDict[this.PivotContainerId] = this
        };
        ClientPivotControl.PivotControlDict = [];
        ClientPivotControl.PivotControlCount = 0;
        ClientPivotControl.prototype = {
            PivotParentId: "",
            PivotContainerId: "",
            OverflowDotId: "",
            OverflowMenuId: "",
            AllOptions: [],
            SurfacedPivotCount: 3,
            ShowMenuIcons: false,
            ShowMenuClose: false,
            ShowMenuCheckboxes: false,
            OverflowMenuScript: "",
            Width: "",
            SurfacedOptions: [],
            OverflowOptions: [],
            SelectedOptionIdx: -1,
            AddMenuOption: function (a) {
                (ClientPivotControl.IsMenuOption(a) || ClientPivotControl.IsMenuCheckOption(a)) && this.AllOptions.push(a)
            },
            AddMenuSeparator: function () {
                if (this.AllOptions.length == 0)return;
                var a = this.AllOptions[this.AllOptions.length - 1];
                if (ClientPivotControl.IsMenuSeparator(a))return;
                this.AllOptions.push(new ClientPivotControlMenuSeparator)
            },
            Render: function () {
                if (this.PivotParentId == null || this.PivotParentId == "")return;
                var a = document.getElementById(this.PivotParentId);
                if (a == null)return;
                a.innerHTML = this.RenderAsString();
                if (this.Width != "")a.style.width = this.Width
            },
            RenderAsString: function () {
                this.ProcessAllMenuItems();
                this.EnsureSelectedOption();
                var c = this.SurfacedOptions.length;
                if (c == 0)return "";
                var a = [];
                a.push('<span class="ms-pivotControl-container" id="');
                a.push(STSHtmlEncode(this.PivotContainerId));
                a.push('">');
                for (var b = 0; b < c; b++)a.push(this.RenderSurfacedOption(b));
                this.ShouldShowOverflowMenuLink() && a.push(this.RenderOverflowMenuLink());
                a.push("</span>");
                return a.join("")
            },
            ShouldShowOverflowMenuLink: function () {
                return this.OverflowOptions.length > 0 || this.OverflowMenuScript != null && this.OverflowMenuScript != ""
            },
            ShowOverflowMenu: function () {
                var f = this.OverflowOptions.length, g = document.getElementById(this.OverflowDotId);
                if (g == null || f == 0)return;
                MenuHtc_hide();
                for (var c = CMenu(this.OverflowMenuId), b = 0; b < f; b++) {
                    var a = this.OverflowOptions[b], d = ClientPivotControl.IsMenuCheckOption(a);
                    if (ClientPivotControl.IsMenuOption(a) || d) {
                        var e = CAMOpt(c, a.DisplayText, a.OnClickAction, a.ImageUrl, a.ImageAltText, String(100 * b), a.Description);
                        e.id = "ID_OverflowOption_" + String(b);
                        d && e.setAttribute("checked", a.Checked)
                    } else ClientPivotControl.IsMenuSeparator(a) && CAMSep(c)
                }
                !this.ShowMenuIcons && c.setAttribute("hideicons", "true");
                var h = Boolean(document.body.WZ_ATTRIB_FLIPPED);
                document.body.WZ_ATTRIB_FLIPPED = false;
                OMenu(c, g, null, false, -2, this.ShowMenuClose, this.ShowMenuCheckboxes);
                document.body.WZ_ATTRIB_FLIPPED = h
            },
            RenderSurfacedOption: function (c) {
                if (c < 0 || c >= this.SurfacedOptions.length)return "";
                var b = this.SurfacedOptions[c], d = "ms-pivotControl-surfacedOpt";
                if (b.SelectedOption)d += "-selected";
                var a = [];
                a.push('<a class="');
                a.push(d);
                a.push('" href="#" id="');
                a.push(STSHtmlEncode(this.PivotContainerId + "_surfaceopt" + c.toString()));
                a.push('" onclick="');
                a.push(STSHtmlEncode(b.OnClickAction));
                a.push(' return false;" alt="');
                a.push(STSHtmlEncode(b.DisplayText));
                a.push('" >');
                a.push(STSHtmlEncode(b.DisplayText));
                a.push("</a>");
                return a.join("")
            },
            RenderOverflowMenuLink: function () {
                var b = this.OverflowMenuScript;
                if (b == null || b == "")b = "ClientPivotControlExpandOverflowMenu(event);";
                var a = [];
                a.push('<span class="ms-pivotControl-overflowSpan" data-containerId="');
                a.push(STSHtmlEncode(this.PivotContainerId));
                a.push('" id="');
                a.push(STSHtmlEncode(this.OverflowDotId));
                a.push('" title="');
                a.push(STSHtmlEncode(Strings.STS.L_ClientPivotControlOverflowMenuAlt));
                a.push('" ><a class="ms-pivotControl-overflowDot" href="#" onclick="');
                a.push(STSHtmlEncode(b));
                a.push('" alt="');
                a.push(STSHtmlEncode(Strings.STS.L_ClientPivotControlOverflowMenuAlt));
                a.push('" >');
                a.push('<img class="ms-ellipsis-icon" src="');
                a.push(GetThemedImageUrl("spcommon.png"));
                a.push('" alt="');
                a.push(STSHtmlEncode(Strings.STS.L_OpenMenu));
                a.push('" /></a></span>');
                return a.join("")
            },
            ProcessAllMenuItems: function () {
                if (this.SurfacedPivotCount < 0)this.SurfacedPivotCount = 1;
                this.SurfacedOptions = [];
                this.OverflowOptions = [];
                var b = this.AllOptions.length;
                if (b == 0)return;
                for (var a = 0, c = []; a < b; a++) {
                    var d = this.AllOptions[a];
                    if (ClientPivotControl.IsMenuSeparator(d))continue;
                    if (c.length == this.SurfacedPivotCount)break;
                    c.push(d)
                }
                this.SurfacedOptions = this.SurfacedOptions.concat(c);
                if (a != b) {
                    for (; a < b; a++)this.OverflowOptions.push(this.AllOptions[a]);
                    var e = this.OverflowOptions[this.OverflowOptions.length - 1];
                    ClientPivotControl.IsMenuSeparator(e) && this.OverflowOptions.pop()
                }
            },
            EnsureSelectedOption: function () {
                this.SelectedOptionIdx = -1;
                var i = this.SurfacedOptions.length, h = this.OverflowOptions.length;
                if (i == 0 && h == 0)return;
                for (var a = 0; a < this.SurfacedOptions.length; a++) {
                    var g = this.SurfacedOptions[a];
                    if (Boolean(g.SelectedOption) && this.SelectedOptionIdx == -1)this.SelectedOptionIdx = a; else g.SelectedOption = false
                }
                for (var d = 0; d < this.OverflowOptions.length; d++) {
                    var b = this.OverflowOptions[d];
                    if (Boolean(b.SelectedOption) && this.SelectedOptionIdx == -1)this.SelectedOptionIdx = this.SurfacedOptions.length; else if (ClientPivotControl.IsMenuOption(b))b.SelectedOption = false
                }
                if (this.SelectedOptionIdx == -1) {
                    this.SelectedOptionIdx = 0;
                    this.SurfacedOptions[0].SelectedOption = true
                } else if (this.SelectedOptionIdx == this.SurfacedOptions.length) {
                    var j = this.SurfacedOptions.pop(), f = this.OverflowOptions;
                    this.OverflowOptions = [];
                    this.OverflowOptions.push(j);
                    for (var e = 0; e < f.length; e++) {
                        var c = f[e];
                        if (Boolean(c.SelectedOption))this.SurfacedOptions.push(c); else this.OverflowOptions.push(c)
                    }
                    this.SelectedOptionIdx = this.SurfacedOptions.length - 1
                }
            }
        };
        window.ClientPivotControlExpandOverflowMenu = function (b) {
            if (b == null)b = window.event;
            var a = GetEventSrcElement(b);
            while (a != null && a.getAttribute("data-containerId") == null)a = a.parentNode;
            if (a == null)return;
            var c;
            try {
                c = typeof CMenu
            } catch (d) {
                c = "undefined"
            }
            EnsureScript("core.js", c, function () {
                var b = ClientPivotControl.PivotControlDict[a.getAttribute("data-containerId")];
                b != null && b.ShowOverflowMenu()
            });
            b != null && CancelEvent(b)
        };
        window.ClientPivotControl_InitStandaloneControlWrapper = function (a) {
            if (a == null)return;
            var b = new ClientPivotControl(a);
            b.Render()
        };
        ClientPivotControl.MenuOptionType = {MenuOption: 1, MenuSeparator: 2, MenuCheckOption: 3};
        ClientPivotControl.IsMenuOption = function (a) {
            return a != null && a.MenuOptionType == ClientPivotControl.MenuOptionType.MenuOption
        };
        ClientPivotControl.IsMenuCheckOption = function (a) {
            return a != null && a.MenuOptionType == ClientPivotControl.MenuOptionType.MenuCheckOption
        };
        ClientPivotControl.IsMenuSeparator = function (a) {
            return a != null && a.MenuOptionType == ClientPivotControl.MenuOptionType.MenuSeparator
        };
        window.ClientPivotControlMenuItem = function () {
        };
        ClientPivotControlMenuItem.prototype = {MenuOptionType: 0};
        window.ClientPivotControlMenuOption = function () {
            this.MenuOptionType = ClientPivotControl.MenuOptionType.MenuOption
        };
        ClientPivotControlMenuOption.prototype = new ClientPivotControlMenuItem;
        ClientPivotControlMenuOption.prototype.DisplayText = "";
        ClientPivotControlMenuOption.prototype.Description = "";
        ClientPivotControlMenuOption.prototype.OnClickAction = "";
        ClientPivotControlMenuOption.prototype.ImageUrl = "";
        ClientPivotControlMenuOption.prototype.ImageAltText = "";
        ClientPivotControlMenuOption.prototype.SelectedOption = false;
        window.ClientPivotControlMenuSeparator = function () {
            this.MenuOptionType = ClientPivotControl.MenuOptionType.MenuSeparator
        };
        ClientPivotControlMenuSeparator.prototype = new ClientPivotControlMenuItem;
        window.ClientPivotControlMenuCheckOption = function () {
            this.MenuOptionType = ClientPivotControl.MenuOptionType.MenuCheckOption
        };
        ClientPivotControlMenuCheckOption.prototype = new ClientPivotControlMenuItem;
        ClientPivotControlMenuCheckOption.prototype.Checked = false
    }
    SPClientTemplates = {};
    SPClientTemplates.FileSystemObjectType = {Invalid: -1, File: 0, Folder: 1, Web: 2};
    SPClientTemplates.ChoiceFormatType = {Dropdown: 0, Radio: 1};
    SPClientTemplates.ClientControlMode = {Invalid: 0, DisplayForm: 1, EditForm: 2, NewForm: 3, View: 4};
    SPClientTemplates.RichTextMode = {Compatible: 0, FullHtml: 1, HtmlAsXml: 2, ThemeHtml: 3};
    SPClientTemplates.UrlFormatType = {Hyperlink: 0, Image: 1};
    SPClientTemplates.DateTimeDisplayFormat = {DateOnly: 0, DateTime: 1, TimeOnly: 2};
    SPClientTemplates.DateTimeCalendarType = {
        None: 0,
        Gregorian: 1,
        Japan: 3,
        Taiwan: 4,
        Korea: 5,
        Hijri: 6,
        Thai: 7,
        Hebrew: 8,
        GregorianMEFrench: 9,
        GregorianArabic: 10,
        GregorianXLITEnglish: 11,
        GregorianXLITFrench: 12,
        KoreaJapanLunar: 14,
        ChineseLunar: 15,
        SakaEra: 16,
        UmAlQura: 23
    };
    SPClientTemplates.UserSelectionMode = {PeopleOnly: 0, PeopleAndGroups: 1};
    SPClientTemplates.PresenceIndicatorSize = {Bar_5px: "5", Bar_8px: "8", Square_10px: "10", Square_12px: "12"};
    SPClientTemplates.TemplateManager = {};
    SPClientTemplates.TemplateManager._TemplateOverrides = {};
    SPClientTemplates.TemplateManager._TemplateOverrides.View = {};
    SPClientTemplates.TemplateManager._TemplateOverrides.Header = {};
    SPClientTemplates.TemplateManager._TemplateOverrides.Body = {};
    SPClientTemplates.TemplateManager._TemplateOverrides.Footer = {};
    SPClientTemplates.TemplateManager._TemplateOverrides.Group = {};
    SPClientTemplates.TemplateManager._TemplateOverrides.Item = {};
    SPClientTemplates.TemplateManager._TemplateOverrides.Fields = {};
    SPClientTemplates.TemplateManager._TemplateOverrides.OnPreRender = {};
    SPClientTemplates.TemplateManager._TemplateOverrides.OnPostRender = {};
    SPClientTemplates.TemplateManager._RegisterDefaultTemplates = function (a) {
        if (!a || !a.Templates && !a.OnPreRender && !a.OnPostRender)return;
        var b = SPClientTemplates._defaultTemplates;
        SPClientTemplates.TemplateManager._RegisterTemplatesInternal(a, b)
    };
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides = function (a) {
        if (!a || !a.Templates && !a.OnPreRender && !a.OnPostRender)return;
        var b = SPClientTemplates.TemplateManager._TemplateOverrides;
        SPClientTemplates.TemplateManager._RegisterTemplatesInternal(a, b)
    };
    SPClientTemplates.TemplateManager._RegisterTemplatesInternal = function (c, n) {
        if (!c || !n || !c.Templates && !c.OnPreRender && !c.OnPostRender)return;
        var e = c.Templates != null ? c.Templates : {}, b = SPClientTemplates.Utility.ComputeRegisterTypeInfo(c);
        if (typeof c.OnPreRender != "undefined")e.OnPreRender = c.OnPreRender;
        if (typeof c.OnPostRender != "undefined")e.OnPostRender = c.OnPostRender;
        for (var a in e)switch (a) {
            case"Group":
            case"Item":
                if (typeof e[a] == "function" || typeof e[a] == "string")e[a] = {__DefaultTemplate__: e[a]};
            case"View":
            case"Header":
            case"Body":
            case"Footer":
            case"Fields":
            case"OnPreRender":
            case"OnPostRender":
                var p = a == "OnPreRender" || a == "OnPostRender", i = a == "View" || a == "Header" || a == "Body" || a == "Footer", o = a == "Item" || a == "Group" || a == "Fields", f, d, g = n[a];
                if (b.defaultViewStyle) {
                    if (!g["default"])g["default"] = {};
                    f = g["default"];
                    m()
                } else for (var j = 0; j < b.viewStyle.length; j++) {
                    var h = b.viewStyle[j];
                    if (!g[h])g[h] = {};
                    f = g[h];
                    m()
                }
        }
        function m() {
            if (b.allLists) {
                if (!f.all)f.all = {};
                d = f.all;
                if (i || o)l(); else k()
            } else {
                for (var c = 0; c < b.ltype.length; c++) {
                    var a = b.ltype[c];
                    if (!f[a])f[a] = {};
                    d = f[a]
                }
                if (i || o)l(); else k()
            }
        }

        function l() {
            var c = b.allViews ? d.all : d[b.viewId], f = e[a];
            if (i) {
                if (typeof f == "function" || typeof f == "string")c = f
            } else {
                if (!c)c = {};
                for (var g in f)c[g] = f[g]
            }
            if (b.allViews)d.all = c; else d[b.viewId] = c
        }

        function k() {
            var f = e[a];
            if (!f)return;
            var c = b.allViews ? d.all : d[b.viewId];
            if (!c)c = [];
            if (typeof f == "function")c.push(f); else {
                var h = f.length;
                if (typeof h == "number")for (var g = 0; g < Number(h); g++)typeof f[g] == "function" && c.push(f[g])
            }
            if (b.allViews)d.all = c; else d[b.viewId] = c
        }
    };
    SPClientTemplates.TemplateManager.GetTemplates = function (b) {
        if (!b)b = {};
        if (!b.Templates)b.Templates = {};
        var f = SPClientTemplates.TemplateManager._TemplateOverrides, a = SPClientTemplates.Utility.ComputeResolveTypeInfo(b);
        p();
        var c = {};
        c.View = i("View");
        c.Header = i("Header");
        c.Body = i("Body");
        c.Footer = i("Footer");
        c.Group = s();
        c.Item = t();
        c.Fields = r();
        return c;
        function i(c) {
            var d = f[c], e = SPClientTemplates._defaultTemplates[c], b = null;
            if (!a.defaultViewStyle) {
                b = g(d[a.viewStyle], c);
                if (b == null)b = g(e[a.viewStyle], c)
            }
            if (b == null)b = g(d["default"], c);
            if (b == null)b = g(e["default"], c);
            if (b == null)b = l(c);
            return b
        }

        function g(b) {
            if (typeof b == "undefined")return null;
            var c = j(b[a.ltype], a.viewId);
            if (c == null)c = j(b.all, a.viewId);
            return c
        }

        function s() {
            var d = {}, g = "Group", h = g + "Keys", a = b[h];
            if (a == null || a.length == 0)a = ["__DefaultTemplate__"];
            for (var i in a) {
                var c = a[i];
                if (!d[c]) {
                    var f = e(g, c);
                    if (c == "__DefaultTemplate__")return f;
                    d[c] = f
                }
            }
            return d
        }

        function t() {
            var j = {}, l = u(b);
            if (b.ListData == null || b.ListData[l] == null)return e("Item", "__DefaultTemplate__");
            for (var d = {}, i = 0, k = b.ListData[l], o = k.length, g = 0; g < o; g++) {
                var n = k[g];
                if (n != null) {
                    var f = n.ContentType;
                    if (f != null && typeof d[f] == "undefined") {
                        i++;
                        d[f] = true
                    }
                }
            }
            if (i == 0)return e("Item", "__DefaultTemplate__");
            var h = {}, c = [];
            for (var m in d) {
                var a = e("Item", m);
                j[m] = a;
                if (typeof h[a] == "undefined") {
                    c.push(a);
                    h[a] = true
                }
            }
            return c.length == 1 ? c[0] : j
        }

        function r() {
            var g = {}, c = {}, l = b.FieldControlModes != null ? b.FieldControlModes : {}, p = typeof b.ControlMode != "undefined" ? b.ControlMode : SPClientTemplates.ClientControlMode.View;
            if (b.ListSchema == null || b.ListSchema.Field == null)return g;
            for (var n = b.ListSchema.Field, r = n.length, j = 0; j < r; j++) {
                var i = n[j];
                if (i != null) {
                    var f = i.Name, a = i.FieldType, o = i.Type, s = l[f] != null ? l[f] : p, d = SPClientTemplates.Utility.ControlModeToString(s), m = q("Fields", f, d);
                    if (m != null)g[f] = m; else if (typeof c[a] != "undefined" && typeof c[a][d] != "undefined")g[f] = c[a][d]; else {
                        var h = k("Fields", a, d);
                        if (h == null)h = e("Fields", o, d);
                        g[f] = h;
                        if (!c[a])c[a] = {};
                        c[a][d] = h
                    }
                }
            }
            return g
        }

        function e(c, d, b) {
            var a = k(c, d, b);
            if (a == null)a = l(c, b);
            return a
        }

        function d(b, e, d) {
            if (typeof b == "undefined")return null;
            var c = o(b[a.ltype], a.viewId, e, d);
            if (c == null)c = o(b.all, a.viewId, e, d);
            return c
        }

        function q(h, g, e) {
            var c = f[h], b = null;
            if (!a.defaultViewStyle)b = d(c[a.viewStyle], g, e);
            if (b == null)b = d(c["default"], g, e);
            return b
        }

        function k(i, e, c) {
            var g = f[i], h = SPClientTemplates._defaultTemplates[i], b = null;
            if (!a.defaultViewStyle) {
                b = d(g[a.viewStyle], e, c);
                if (b == null)b = d(h[a.viewStyle], e, c)
            }
            if (b == null)b = d(g["default"], e, c);
            if (b == null)b = d(h["default"], e, c);
            return b
        }

        function o(e, f, d, c) {
            var a = null, b = j(e, f);
            if (b != null) {
                if (typeof b[d] != "undefined")a = b[d];
                if (a == null && typeof b.__DefaultTemplate__ != "undefined")a = b.__DefaultTemplate__
            }
            if (a != null && typeof c != "undefined")a = a[c];
            return a
        }

        function j(a, b) {
            if (typeof a != "undefined") {
                if (typeof a[b] != "undefined")return a[b];
                if (typeof a.all != "undefined" && b != "Callout")return a.all
            }
            return null
        }

        function l(c, b) {
            var a = null;
            switch (c) {
                case"View":
                    a = RenderViewTemplate;
                    break;
                case"Header":
                    a = "";
                    break;
                case"Body":
                    a = RenderGroupTemplateDefault;
                    break;
                case"Footer":
                    a = "";
                    break;
                case"Group":
                    a = RenderItemTemplateDefault;
                    break;
                case"Item":
                    a = RenderFieldTemplateDefault;
                    break;
                case"Fields":
                    a = b == "NewForm" || b == "EditForm" ? SPFieldText_Edit : RenderFieldValueDefault
            }
            return a
        }

        function p() {
            var d = [], c = [], g = f.OnPreRender, e = f.OnPostRender;
            if (!a.defaultViewStyle) {
                h(d, g[a.viewStyle]);
                h(c, e[a.viewStyle])
            }
            h(d, g["default"]);
            h(c, e["default"]);
            b.OnPreRender = d;
            b.OnPostRender = c
        }

        function h(c, b) {
            if (typeof b != "undefined") {
                m(c, b.all, a.viewId);
                m(c, b[a.ltype], a.viewId)
            }
        }

        function m(b, a, c) {
            if (typeof a != "undefined") {
                typeof a.all != "undefined" && n(b, a.all);
                typeof a[c] != "undefined" && n(b, a[c])
            }
        }

        function n(d, a) {
            if (typeof a != "undefined")if (typeof a == "function")d.push(a); else {
                var c = a.length;
                if (typeof c == "number")for (var b = 0; b < Number(c); b++)typeof a[b] == "function" && d.push(a[b])
            }
        }

        function u(b) {
            var a = b.ListDataJSONItemsKey;
            return typeof a != "string" || a == "" ? "Items" : a
        }
    };
    SPClientTemplates.Utility = {};
    SPClientTemplates.Utility.ComputeResolveTypeInfo = function (a) {
        return new SPTemplateManagerResolveTypeInfo(a)
    };
    SPTemplateManagerResolveTypeInfo_InitializePrototype();
    SPClientTemplates.Utility.ComputeRegisterTypeInfo = function (a) {
        return new SPTemplateManagerRegisterTypeInfo(a)
    };
    SPTemplateManagerRegisterTypeInfo_InitializePrototype();
    SPClientTemplates.Utility.ControlModeToString = function (b) {
        var a = SPClientTemplates.ClientControlMode;
        return b == a.DisplayForm ? "DisplayForm" : b == a.EditForm ? "EditForm" : b == a.NewForm ? "NewForm" : b == a.View ? "View" : "Invalid"
    };
    SPClientTemplates.Utility.FileSystemObjectTypeToString = function (b) {
        var a = SPClientTemplates.FileSystemObjectType;
        return b == a.File ? "File" : b == a.Folder ? "Folder" : b == a.Web ? "Web" : "Invalid"
    };
    SPClientTemplates.Utility.ChoiceFormatTypeToString = function (a) {
        var b = SPClientTemplates.ChoiceFormatType;
        return a == b.Radio ? "Radio" : a == b.Dropdown ? "DropDown" : "Invalid"
    };
    SPClientTemplates.Utility.RichTextModeToString = function (b) {
        var a = SPClientTemplates.RichTextMode;
        return b == a.Compatible ? "Compatible" : b == a.FullHtml ? "FullHtml" : b == a.HtmlAsXml ? "HtmlAsXml" : b == a.ThemeHtml ? "ThemeHtml" : "Invalid"
    };
    SPClientTemplates.Utility.IsValidControlMode = function (b) {
        var a = SPClientTemplates.ClientControlMode;
        return b == a.NewForm || b == a.EditForm || b == a.DisplayForm || b == a.View
    };
    SPClientTemplates.Utility.Trim = function (a) {
        return a == null || typeof a != "string" || a.length == 0 ? "" : a.length == 1 && a.charCodeAt(0) == 160 ? "" : a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    };
    SPClientTemplates.Utility.InitContext = function (a) {
        return typeof SP != "undefined" && typeof SP.ClientContext != "undefined" ? new SP.ClientContext(a) : null
    };
    SPClientTemplates.Utility.GetControlOptions = function (ctrlNode) {
        if (ctrlNode == null)return null;
        var result, options = ctrlNode.getAttribute("data-sp-options");
        try {
            var script = "(function () { return " + options + "; })();";
            result = eval(script)
        } catch (e) {
            result = null
        }
        return result
    };
    SPClientTemplates.Utility.UserLookupDelimitString = ";#";
    SPClientTemplates.Utility.UserMultiValueDelimitString = ",#";
    SPClientTemplates.Utility.TryParseInitialUserValue = function (b) {
        var a;
        if (b == null || b == "") {
            a = "";
            return a
        }
        var g = b.indexOf(SPClientTemplates.Utility.UserLookupDelimitString);
        if (g == -1) {
            a = b;
            return a
        }
        var c = b.split(SPClientTemplates.Utility.UserLookupDelimitString);
        if (c.length % 2 != 0) {
            a = "";
            return a
        }
        a = [];
        var e = 0;
        while (e < c.length) {
            var f = new SPClientFormUserValue, d = c[e++];
            d += SPClientTemplates.Utility.UserLookupDelimitString;
            d += c[e++];
            f.initFromUserString(d);
            a.push(f)
        }
        return a
    };
    SPClientTemplates.Utility.TryParseUserControlValue = function (d, g) {
        var a = [];
        if (d == null || d == "")return a;
        var h = g + " ", c = d.split(h);
        if (c.length == 0)return a;
        for (var e = 0; e < c.length; e++) {
            var b = SPClientTemplates.Utility.Trim(c[e]);
            if (b == "")continue;
            if (b.indexOf(SPClientTemplates.Utility.UserLookupDelimitString) != -1) {
                var f = new SPClientFormUserValue;
                f.initFromUserString(b);
                a.push(f)
            } else a.push(b)
        }
        return a
    };
    SPClientTemplates.Utility.GetPropertiesFromPageContextInfo = function (b) {
        if (b == null)return;
        var a = window._spPageContextInfo;
        if (typeof a != "undefined") {
            b.SiteClientTag = a.siteClientTag;
            b.CurrentLanguage = a.currentLanguage;
            b.CurrentCultureName = a.currentCultureName;
            b.CurrentUICultureName = a.currentUICultureName
        }
    };
    SPClientTemplates.Utility.ReplaceUrlTokens = function (a) {
        return SPClientRenderer.ReplaceUrlTokens(a)
    };
    SPClientFormUserValue_InitializePrototype();
    SPClientTemplates.Utility.ParseLookupValue = function (a) {
        var b = {LookupId: "0", LookupValue: ""};
        if (a == null || a == "")return b;
        var c = a.indexOf(";#");
        if (c == -1) {
            b.LookupId = a;
            return b
        }
        b.LookupId = a.substr(0, c);
        b.LookupValue = a.substr(c + 2).replace(/;;/g, ";");
        return b
    };
    SPClientTemplates.Utility.ParseMultiLookupValues = function (b) {
        if (b == null || b == "")return [];
        var d = [], j = b.length, c = 0, a = 0, e = false;
        while (a < j) {
            if (b[a] == ";") {
                if (++a >= j)break;
                if (b[a] == "#") {
                    if (a - 1 > c) {
                        var g = b.substr(c, a - c - 1);
                        if (e)g = g.replace(/;;/g, ";");
                        d.push(g);
                        e = false
                    }
                    c = ++a;
                    continue
                } else if (b[a] == ";") {
                    a++;
                    e = true;
                    continue
                } else return []
            }
            a++
        }
        if (a > c) {
            var h = b.substr(c, a - c);
            if (e)h = h.replace(/;;/g, ";");
            d.push(h)
        }
        for (var i = [], k = d.length, f = 0; f < k; f++)i.push({LookupId: d[f++], LookupValue: d[f]});
        return i
    };
    SPClientTemplates.Utility.BuildLookupValuesAsString = function (b, f, g) {
        if (b == null || b.length == 0)return "";
        for (var a = "", c = true, e = 0; e < b.length; e++) {
            var d = b[e];
            if (!f) {
                if (!c)a += "|";
                c = false;
                a += d.LookupValue.replace(/\x7C/g, "||");
                a += "|";
                a += d.LookupId
            } else {
                if (!c)a += "|t";
                c = false;
                a += d.LookupId;
                a += "|t";
                a += d.LookupValue.replace(/\x7C/g, "||");
                if (g)a += "|t |t "
            }
        }
        return a
    };
    SPClientTemplates.Utility.ParseURLValue = function (a) {
        var c = {URL: "http://", Description: ""};
        if (a == null || a == "")return c;
        var b = 0;
        while (b < a.length) {
            if (a[b] == ",")if (b == a.length - 1) {
                a = a.substr(0, a.length - 1);
                break
            } else if (b + 1 < a.length && a[b + 1] == " ")break; else b++;
            b++
        }
        if (b < a.length) {
            c.URL = a.substr(0, b).replace(/\,\,/g, ",");
            var d = a.length - (b + 2);
            if (d > 0)c.Description = a.substr(b + 2, d)
        } else {
            c.URL = a.replace(/\,\,/g, ",");
            c.Description = a.replace(/\,\,/g, ",")
        }
        return c
    };
    SPClientTemplates.Utility.GetFormContextForCurrentField = function (a) {
        if (a == null || a.FormContext == null)return null;
        var b = new ClientFormContext(a.FormContext);
        b.fieldValue = a.CurrentFieldValue;
        b.fieldSchema = a.CurrentFieldSchema;
        b.fieldName = b.fieldSchema != null ? b.fieldSchema.Name : "";
        b.controlMode = a.ControlMode == null ? SPClientTemplates.ClientControlMode.Invalid : a.ControlMode;
        return b
    };
    SPClientTemplates._defaultTemplates = {};
    SPClientTemplates._defaultTemplates.View = {"default": {all: {Callout: CalloutRenderViewTemplate}}};
    SPClientTemplates._defaultTemplates.Header = {"default": {all: {Callout: CalloutRenderHeaderTemplate}}};
    SPClientTemplates._defaultTemplates.Body = {"default": {all: {Callout: CalloutRenderBodyTemplate}}};
    SPClientTemplates._defaultTemplates.Footer = {"default": {all: {Callout: CalloutRenderFooterTemplate}}};
    SPClientTemplates._defaultTemplates.Group = {};
    SPClientTemplates._defaultTemplates.Item = {"default": {all: {Callout: {__DefaultTemplate__: CalloutRenderItemTemplate}}}};
    SPClientTemplates._defaultTemplates.Fields = {};
    RenderBodyTemplate = function (a) {
        var h = a.Templates.Item;
        if (h == null || h == {})return "";
        var f = a.ListData, c = a.ListSchema, m = a.Templates.Header != "", b = "";
        if (m) {
            if (a.Templates.Header == null)b += RenderTableHeader(a);
            var j = c.Aggregate;
            if (j != null && f.Row.length > 0 && !c.groupRender && !a.inGridMode)b += RenderAggregate(a, null, f.Row[0], c, null, true, j);
            b += '<script id="scriptBody';
            b += a.wpq;
            b += '"><\/script>'
        } else b = '<table onmousedown="return OnTableMouseDown(event);">';
        if (a.inGridMode) {
            if (!a.bInitialRender)b += RenderSPGridBody(a);
            return b
        }
        var o = c.group1, p = c.group2, n = c.Collapse == null || c.Collapse != "TRUE", l = Boolean(ctx.ExternalDataList), d = a.Templates.Item;
        if (d == null || d == RenderFieldTemplateDefault || typeof d != "function" && typeof d != "string")d = RenderItemTemplate; else if (typeof d == "string")d = SPClientRenderer.ParseTemplateString(d, a);
        for (var g = 0; g < f.Row.length; g++) {
            var i = f.Row[g];
            if (g == 0) {
                i.firstRow = true;
                if (o != null) {
                    b += '<input type="hidden" id="GroupByColFlag"/><input type="hidden" id="GroupByWebPartID';
                    b += a.ctxId;
                    b += '" webPartID="';
                    b += c.View;
                    b += '"/><tbody id="GroupByCol';
                    b += c.View;
                    b += '"><tr id="GroupByCol';
                    b += a.ctxId;
                    b += '" queryString ="';
                    b += f.FilterLink;
                    b += '"/></tbody >'
                }
            }
            var k = i.ContentType, e = h[k];
            if (e == null || e == "")e = d; else if (typeof e == "string") {
                e = SPClientRenderer.ParseTemplateString(e, a);
                h[k] = e
            }
            if (c.group1 != null)b += RenderGroup(a, i);
            if (n || l) {
                a.CurrentItem = i;
                a.CurrentItemIdx = g;
                b += CoreRender(e, a);
                a.CurrentItem = null;
                a.CurrentItemIdx = -1
            }
        }
        b += "</table>";
        AddPostRenderCallback(a, OnPostRenderTabularListView);
        return b
    };
    RenderItemTemplate = function (c) {
        var i = c.CurrentItem, d = c.ListSchema, j = c.CurrentItemIdx, g = j % 2 == 1 ? "ms-alternating " : "";
        if (FHasRowHoverBehavior(c))g += " ms-itmHoverEnabled ";
        var a = [];
        a.push('<tr class="');
        a.push(g);
        if (d.TabularView != undefined && d.TabularView == "1") {
            a.push("ms-itmhover");
            a.push('" oncontextmenu="');
            if (DoesListUseCallout(c))a.push("return ShowCallOutOrECBWrapper(this, event, true)"); else a.push("return ShowCallOutOrECBWrapper(this, event, false)")
        }
        a.push('" iid="');
        var h = GenerateIID(c);
        a.push(h);
        a.push('" id="');
        a.push(h);
        a.push('">');
        if (d.TabularView != undefined && d.TabularView == "1") {
            a.push('<td class="ms-cellStyleNonEditable ms-vb-itmcbx ms-vb-imgFirstCell" tabindex=0><div role="checkbox" class="s4-itm-cbx s4-itm-imgCbx" tabindex="-1"><span class="s4-itm-imgCbx-inner"><span class="ms-selectitem-span"><img class="ms-selectitem-icon" alt="" src="');
            a.push(GetThemedImageUrl("spcommon.png"));
            a.push('"/></span></span></div></td>')
        }
        for (var f = d ? d.Field : null, e = 0; e < f.length; e++) {
            var b = f[e];
            if (b.GroupField != null)break;
            a.push('<td class="');
            e == f.length - 1 && b.CalloutMenu != "TRUE" && b.listItemMenu != "TRUE" && a.push("ms-vb-lastCell ");
            if (b.css == null) {
                b.css = GetCSSClassForFieldTd(c, b);
                if (b.CalloutMenu == "TRUE" || b.ClassInfo == "Menu" || b.listItemMenu == "TRUE") {
                    b.css += '" IsECB="TRUE';
                    if (b.CalloutMenu == "TRUE")b.css += '" IsCallOut="TRUE';
                    if (b.ClassInfo == "Menu" || b.listItemMenu == "TRUE")b.css += '" height="100%'
                }
            }
            c.CurrentFieldSchema = b;
            a.push(b.css);
            a.push('">');
            a.push(spMgr.RenderField(c, b, i, d));
            a.push("</td>");
            c.CurrentFieldSchema = null
        }
        a.push("</tr>");
        return a.join("")
    };
    RenderHeaderTemplate = function (b, e) {
        var d = b.ListSchema, i = b.ListData, a = [];
        if (e == null)e = true;
        a.push(RenderTableHeader(b));
        a.push('<thead id="');
        a.push("js-listviewthead-" + b.wpq);
        a.push('"><tr valign="top" class="ms-viewheadertr');
        if (fRightToLeft)a.push(" ms-vhrtl"); else a.push(" ms-vhltr");
        a.push('">');
        if (d.TabularView != undefined && d.TabularView == "1") {
            a.push('<th class="ms-headerCellStyleIcon ms-vh-icon ms-vh-selectAllIcon" scope="col">');
            RenderSelectAllCbx(b, a);
            a.push("</th>")
        }
        if (e) {
            var f = d ? d.Field : null, g = 1;
            for (var h in f) {
                var c = f[h];
                if (c.DisplayName == null)continue;
                if (c.GroupField != null)break;
                c.counter = g++;
                a.push(spMgr.RenderHeader(b, c));
                IsCSRReadOnlyTabularView(b) && (c.CalloutMenu == "TRUE" || c.listItemMenu == "TRUE") && a.push("<th></th>")
            }
        }
        d.TabularView == "1" && b.BasePermissions.ManageLists && b.ListTemplateType != 160 && a.push('<th class="ms-vh-icon" scope="col" title=""><span class="ms-addcolumn-span"> </span></th>');
        a.push("</tr>");
        a.push("</thead>");
        return a.join("")
    };
    RenderFooterTemplate = function (b) {
        var a = [];
        RenderEmptyText(a, b);
        RenderPaging(a, b);
        return a.join("")
    };
    RenderHeroParameters_InitializePrototype();
    DocumentType = {Invalid: 0, Word: 1, Excel: 2, PowerPoint: 3, OneNote: 4, ExcelForm: 5, Folder: 6, Max: 7};
    DocumentInformation.prototype = {
        type: undefined,
        idToken: undefined,
        imgSrc: undefined,
        imgAlt: undefined,
        textLabel: undefined
    };
    c_newdocWOPIID = "js-newdocWOPI-";
    c_newDocDivHtml = ['<a id="{0}" class="ms-newdoc-callout-item ms-displayBlock" onclick="{5}" href="#">', '<img id="{1}" src="{2}" alt="{3}" class="ms-verticalAlignMiddle ms-newdoc-callout-img"/>', '<h3 id="{4}" class="ms-displayInline ms-newdoc-callout-text ms-verticalAlignMiddle ms-soften">{6}</h3></a>'].join("");
    c_onClickCreateDoc = "CalloutManager.closeAll(); OpenPopUpPageWithTitle(&quot;{0}&TemplateType={1}&quot;, OnCloseDialogNavigate); return false;";
    c_newDocCalloutWidth = parseInt(Strings.STS.L_NewDocumentCalloutSize);
    NewDocumentInfo = InitializeNewDocumentInfo();
    ComputedFieldWorker = function () {
        function h(c, d, a) {
            if (c["Created_x0020_Date.ifnew"] == "1") {
                var b = GetThemedImageUrl("spcommon.png");
                a.push('<span class="ms-newdocument-iconouter"><img class="ms-newdocument-icon" src="');
                a.push(b);
                a.push('" alt="');
                a.push(Strings.STS.L_SPClientNew);
                a.push('" title="');
                a.push(Strings.STS.L_SPClientNew);
                a.push('" /></span>')
            }
        }

        function b(i, h, g, c, d, b, e) {
            var a = [];
            a.push('<span style="vertical-align:middle">');
            a.push('<span style="height:16px;width:16px;position:relative;display:inline-block;overflow:hidden;" class="s4-clust"><a href="');
            a.push(i);
            f(a, b, e);
            a.push('" style="height:16px;width:16px;display:inline-block;" ><img src="/_layouts/15/images/fgimg.png?rev=23" alt="');
            a.push(h);
            a.push('" style="left:-0px !important;top:');
            a.push(g);
            a.push('px !important;position:absolute;" title="');
            a.push(c);
            a.push('" class="imglink" longDesc="');
            a.push(d);
            a.push('"></a>');
            a.push("</span>");
            a.push("</span>");
            return a.join("")
        }

        function f(a, b, c) {
            a.push(b.HttpVDir);
            a.push("/Lists/Posts/Post.aspx?ID=");
            a.push(c.ID)
        }

        function i(a) {
            return a["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"] == "" ? "/_layouts/15/images/folder.gif?rev=23" : "/_layouts/15/images/" + a["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"]
        }

        function c(b, c) {
            var a = [], e = b.FileRef;
            if (e != null && typeof e != "undefined" && TrimSpaces(e) != "")if (b.FSObjType == "1")if (c.IsDocLib == "1")RenderDocFolderLink(a, b.FileLeafRef, b, c); else RenderListFolderLink(a, b.FileLeafRef, b, c); else {
                a.push("<a class='ms-listlink' href=\"");
                a.push(b.FileRef);
                a.push('" onmousedown="return VerifyHref(this,event,\'');
                a.push(c.DefaultItemOpen);
                a.push("','");
                a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"]);
                a.push("','");
                a.push(b["serverurl.progid"]);
                a.push('\')" onclick="');
                a.push("return DispEx(this,event,'TRUE','FALSE','");
                a.push(b["File_x0020_Type.url"]);
                a.push("','");
                a.push(b["File_x0020_Type.progid"]);
                a.push("','");
                a.push(c.DefaultItemOpen);
                a.push("','");
                a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"]);
                a.push("','");
                a.push(b.HTML_x0020_File_x0020_Type);
                a.push("','");
                a.push(b["serverurl.progid"]);
                a.push("','");
                a.push(Boolean(b.CheckoutUser) ? b.CheckoutUser[0].id : "");
                a.push("','");
                a.push(c.Userid);
                a.push("','");
                a.push(c.ForceCheckout);
                a.push("','");
                a.push(b.IsCheckedoutToLocal);
                a.push("','");
                a.push(b.PermMask);
                a.push("')\">");
                var d = b.FileLeafRef;
                if (d != null) {
                    var f = d.lastIndexOf(".");
                    d = f >= 0 ? d.substring(0, f) : d
                }
                a.push(d);
                a.push("</a>");
                h(b, c, a)
            } else {
                a.push("<nobr>");
                a.push(b.FileLeafRef);
                a.push("</nobr>")
            }
            return a.join("")
        }

        function g(f, g, b, c) {
            var a = [];
            if (b.FSObjType == "1") {
                a.push('<a href="');
                a.push(c.PagePath);
                a.push("?RootFolder=");
                a.push(escapeProperly(b.FileRef));
                a.push(c.ShowWebPart);
                a.push("&FolderCTID=");
                a.push(b.ContentTypeId);
                a.push("&View=");
                a.push(escapeProperly(c.View));
                a.push('" onmousedown="VerifyFolderHref(this, event, \'');
                a.push(b["File_x0020_Type.url"]);
                a.push("','");
                a.push(b["File_x0020_Type.progid"]);
                a.push("','");
                a.push(c.DefaultItemOpen);
                a.push("', '");
                a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"]);
                a.push("', '");
                a.push(b.HTML_x0020_File_x0020_Type);
                a.push("', '");
                a.push(b["serverurl.progid"]);
                a.push("')\" onclick=\"return HandleFolder(this,event,'");
                a.push(c.PagePath);
                a.push("?RootFolder=");
                a.push(escapeProperly(b.FileRef));
                a.push(c.ShowWebPart);
                a.push("&FolderCTID=");
                a.push(b.ContentTypeId);
                a.push("&View=");
                a.push(escapeProperly(c.View));
                a.push("','TRUE','FALSE','");
                a.push(b["File_x0020_Type.url"]);
                a.push("','");
                a.push(b["File_x0020_Type.progid"]);
                a.push("','");
                a.push(c.DefaultItemOpen);
                a.push("','");
                a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"]);
                a.push("','");
                a.push(b.HTML_x0020_File_x0020_Type);
                a.push("','");
                a.push(b["serverurl.progid"]);
                a.push("','");
                a.push(Boolean(b.CheckoutUser) ? b.CheckoutUser[0].id : "");
                a.push("','");
                a.push(c.Userid);
                a.push("','");
                a.push(c.ForceCheckout);
                a.push("','");
                a.push(b.IsCheckedoutToLocal);
                a.push("','");
                a.push(b.PermMask);
                a.push('\');"><img border="0" alt="');
                a.push(b.FileLeafRef);
                a.push('" title="');
                a.push(b.FileLeafRef);
                a.push('" src="');
                a.push(i(b));
                a.push('" />');
                if (typeof b.IconOverlay != "undefined" && b.IconOverlay != "") {
                    a.push('<img width="16" height="16" src="/_layouts/15/images/');
                    a.push(b["IconOverlay.mapoly"]);
                    a.push('" class="ms-vb-icon-overlay" alt="" title="" />')
                }
                a.push("</a>")
            } else if (c.IsDocLib == "1")if (typeof b.IconOverlay == "undefined" || b.IconOverlay == "")if (typeof b.CheckoutUser == "undefined" || b.CheckoutUser == "") {
                a.push('<img width="16" height="16" border="0" alt="');
                a.push(b.FileLeafRef);
                a.push('" title="');
                a.push(b.FileLeafRef);
                a.push('" src="/_layouts/15/images/');
                a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"]);
                a.push('"');
                Boolean(b["HTML_x0020_File_x0020_Type.File_x0020_Type.isIconDynamic"]) && a.push(" onclick=\"this.style.display='none';\"");
                a.push("/>")
            } else {
                a.push('<img width="16" height="16" border="0" alt="');
                var d = b.FileLeafRef + "&#10;" + Strings.STS.L_SPCheckedoutto + ": " + (Boolean(b.CheckoutUser) ? STSHtmlEncode(b.CheckoutUser[0].title) : "");
                a.push(d);
                a.push('" title="');
                a.push(d);
                a.push('" src="/_layouts/15/images/');
                a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"]);
                a.push('" /><img src="/_layouts/15/images/checkoutoverlay.gif" class="ms-vb-icon-overlay" alt="');
                a.push(d);
                a.push('" title="');
                a.push(d);
                a.push('" />')
            } else {
                e(b["IconOverlay.mapico"]);
                a.push('<img width="16" height="16" src="/_layouts/15/images/');
                a.push(b["IconOverlay.mapoly"]);
                a.push('" class="ms-vb-icon-overlay" alt="" title="" />')
            } else e(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"]);
            function e(c) {
                a.push('<img width="16" height="16" border="0" alt="');
                a.push(b.FileLeafRef);
                a.push('" title="');
                a.push(b.FileLeafRef);
                a.push('" src="/_layouts/15/images/');
                a.push(c);
                a.push('"/>')
            }

            return a.join("")
        }

        function e(c, e, a, b) {
            return d(c, a, b, a.Title)
        }

        function d(e, b, a, d) {
            var c = [];
            if (b.FSObjType == "1")if (a.IsDocLib == "1")RenderDocFolderLink(c, LinkTitleValue(d), b, a); else RenderListFolderLink(c, LinkTitleValue(d), b, a); else RenderTitle(c, e, b, a, LinkTitleValue(d));
            h(b, a, c);
            return c.join("")
        }

        function a(f, e, b) {
            var a = [];
            a.push('<a href="' + EncodeUrl(b.FileRef) + '">');
            a.push('<img galleryimg="false" border="0"');
            a.push(' id="' + b.ID + 'webImgShrinked"');
            e.Name != "PreviewOnForm" && a.push(' class="ms-displayBlock"');
            var d = (e.Name == "PreviewOnForm" ? "256" : "128") + "px";
            a.push(' style="max-width: ' + d + "; max-height: " + d + '; margin:auto; visibility: hidden;"');
            a.push(' onerror="displayGenericDocumentIcon(event.srcElement ? event.srcElement : event.target, ' + b.FSObjType + '); return false;"');
            a.push(" onload=\"(event.srcElement ? event.srcElement : event.target).style.visibility = 'visible';\"");
            a.push(' alt="');
            var c = b._Comments;
            if (c != null && c != "")a.push(STSHtmlEncode(c)); else a.push(Strings.STS.L_ImgAlt_Text);
            a.push('" src="' + EncodeUrl(getDocumentIconAbsoluteUrl(b, 256, f)) + '"/>');
            a.push("</a>");
            return a.join("")
        }

        return {
            URLwMenu: function (f, e, b, c) {
                var d;
                if (b.FSObjType == "1") {
                    var a = [];
                    a.push('<a onfocus="OnLink(this)" href="SubmitFormPost()" onclick="ClearSearchTerm(\'');
                    a.push(c.View);
                    a.push("');ClearSearchTerm('');SubmitFormPost('");
                    a.push(c.PagePath);
                    a.push("?RootFolder=");
                    a.push(escapeProperly(b.FileRef));
                    a.push(c.ShowWebPart);
                    a.push("&FolderCTID=");
                    a.push(b.ContentTypeId);
                    a.push("');return false;\">");
                    a.push(b.FileLeafRef);
                    a.push("</a>");
                    d = a.join("")
                } else d = RenderUrl(b, "URL", c, e, true);
                return d
            }, URLNoMenu: function (d, c, b, a) {
                return RenderUrl(b, "URL", a, c, true)
            }, mswh_Title: function (d, e, b) {
                var a = [];
                a.push('<a onfocus="OnLink(this)" href="');
                a.push(b.FileRef);
                a.push('" onclick="LaunchWebDesigner(');
                a.push("'");
                a.push(b.FileRef);
                a.push("','design'); return false;");
                a.push('">');
                a.push(LinkTitleValue(b.Title));
                a.push("</a>");
                return a.join("")
            }, LinkTitle: e, LinkTitleNoMenu: e, Edit: function (d, f, b, c) {
                if (HasEditPermission(b)) {
                    var e = ResolveId(b, c), a = [];
                    a.push('<a href="');
                    a.push(d.editFormUrl);
                    a.push("&ID=");
                    a.push(e);
                    a.push('" onclick="EditItemWithCheckoutAlert(event, \'');
                    a.push(d.editFormUrl);
                    a.push("&ID=");
                    a.push(e);
                    a.push("', '");
                    a.push(EditRequiresCheckout(b, c));
                    a.push("', '");
                    a.push(b.IsCheckedoutToLocal);
                    a.push("', '");
                    a.push(escape(b.FileRef));
                    a.push("', '");
                    a.push(c.HttpVDir);
                    a.push("', '");
                    a.push(b.CheckedOutUserId);
                    a.push("', '");
                    a.push(c.Userid);
                    a.push('\');return false;" target="_self">');
                    a.push('<img border="0" alt="');
                    a.push(Strings.STS.L_SPClientEdit);
                    a.push('" src="/_layouts/15/images/edititem.gif?rev=23"/></a>');
                    return a.join("")
                } else return "&nbsp;"
            }, DocIcon: g, MasterPageIcon: g, LinkFilename: function (d, e, b, a) {
                return c(b, a)
            }, LinkFilenameNoMenu: function (d, e, b, a) {
                return c(b, a)
            }, NumCommentsWithLink: function (e, g, c, d) {
                var a = [];
                a.push(b("", Strings.STS.L_SPClientNumComments, "-396", Strings.STS.L_SPClientNumComments, Strings.STS.L_SPClientNumComments, d, c));
                a.push('<span><a href="');
                f(a, d, c);
                a.push('">&nbsp;');
                a.push(c.NumComments);
                a.push("&nbsp;");
                a.push("Comment(s)");
                a.push("</a></span>");
                return a.join("")
            }, EmailPostLink: function (d, e, c, a) {
                return b("javascript:navigateMailToLink('", Strings.STS.L_SPEmailPostLink, "-267", Strings.STS.L_SPEmailPostLink, Strings.STS.L_SPEmailPostLink, a, c)
            }, Permalink: function (d, e, c, a) {
                return b("", "Permanent Link to Post", "-412", "Permanent Link to Post", "Permanent Link to Post", a, c)
            }, CategoryWithLink: function (d, e, b, c) {
                var a = [];
                a.push('<a class="static menu-item" href="');
                a.push(c.HttpVDir);
                a.push("/");
                a.push("lists/Categories/Category.aspx?CategoryId=");
                a.push(b.ID);
                a.push('" id="blgcat');
                a.push(b.ID);
                a.push('"><span class="additional-backgroud"><span class="menu-item-text">');
                a.push(b.Title);
                a.push("</span></span></a>");
                return a.join("")
            }, LinkIssueIDNoMenu: function (b, e, c) {
                var a = [];
                a.push('<a href="');
                a.push(b.displayFormUrl);
                a.push("&ID=");
                a.push(c.ID);
                a.push('" onclick="EditLink2(this,');
                a.push(b.ctxId);
                a.push(');return false;" target="_self">');
                a.push(c.ID);
                a.push("</a>");
                return a.join("")
            }, SelectTitle: function (d, e, c, b) {
                if (b.SelectedID == c.ID || b.SelectedID == "-1" && c.firstRow == true)return '<img border="0" align="absmiddle" style="cursor: hand" src="/_layouts/15/images/rbsel.gif" alt="' + Strings.STS.L_SPSelected + '" />'; else {
                    var a = [];
                    a.push("<a href=\"javascript:SelectField('");
                    a.push(b.View);
                    a.push("','");
                    a.push(c.ID);
                    a.push("');return false;\" onclick=\"SelectField('");
                    a.push(b.View);
                    a.push("','");
                    a.push(c.ID);
                    a.push('\');return false;" target="_self">');
                    a.push('<img border="0" align="absmiddle" style="cursor: hand" src="/_layouts/15/images/rbunsel.gif"  alt="');
                    a.push(Strings.STS.L_SPGroupBoardTimeCardSettingsNotFlex);
                    a.push('" /></a>');
                    return a.join("")
                }
            }, DisplayResponse: function (c, e, b) {
                var a = [];
                a.push('<a onfocus="OnLink(this)" href="');
                a.push(c.displayFormUrl);
                a.push("&ID=");
                a.push(b.ID);
                a.push('" onclick="GoToLinkOrDialogNewWindow(this);return false;" target="_self" id="onetidViewResponse">');
                a.push(Strings.STS.L_SPView_Response);
                a.push(" #");
                a.push(b.ID);
                a.push("</a>");
                return a.join("")
            }, Completed: function (c, d, a) {
                return a._Level == "1" ? Strings.STS.L_SPYes : Strings.STS.L_SPNo
            }, RepairDocument: function (c, d, a) {
                return '<input id="chkRepair" type="checkbox" title="' + Strings.STS.L_SPRelink + '" docID="' + a.ID + '" />'
            }, Combine: function (e, f, b, d) {
                if (b.FSObjType == "0") {
                    var a = '<input id="chkCombine" type="checkbox" title="';
                    a += Strings.STS.L_SPMerge;
                    a += '" href="';
                    var c;
                    if (b.FSObjType == "0")c = String(d.HttpVDir) + String(b.FileRef); else c = b.FileRef;
                    a += c + '" />';
                    a += '<input id="chkUrl" type="hidden" href="';
                    a += b.TemplateUrl;
                    a += '" />';
                    a += '<input id="chkProgID" type="hidden" href="';
                    a += b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"];
                    a += '" />';
                    return a
                }
                return ""
            }, HealthReportSeverityIcon: function (f, g, c) {
                var a = new String(c.HealthReportSeverity), d = a.indexOf(" - ");
                a = a.substring(0, d);
                var b;
                if (a == "1")b = "hltherr"; else if (a == "2")b = "hlthwrn"; else if (a == "3")b = "hlthinfo"; else if (a == "4")b = "hlthsucc"; else b = "hlthfail";
                return '<img src="/_layouts/15/images/' + b + '.png" alt="' + a + '" />'
            }, FileSizeDisplay: function (c, d, a) {
                var e = [];
                return a.FSObjType == "0" ? String(Math.ceil(a.File_x0020_Size / 1024)) + " KB" : ""
            }, NameOrTitle: function (c, e, a, b) {
                return d(c, a, b, a.FileLeafRef)
            }, ImageSize: function (d, e, a) {
                var b = [];
                if (a.FSObjType == "0")if (a.ImageWidth != "" && a.ImageWidth != "0") {
                    b.push('<span dir="ltr">');
                    b.push(a.ImageWidth + " x " + a.ImageHeight);
                    b.push("</span>")
                }
                return b.join("")
            }, ThumbnailOnForm: a, PreviewOnForm: a, Thumbnail: a, FileType: function (c, d, a) {
                return a.File_x0020_Type
            }
        }
    }();
    ComputedFieldRenderer_InitializePrototype();
    RenderCalloutAffordance = function (h, d, b, f) {
        var a = [], c = Boolean(f), e = "ms-lstItmLinkAnchor " + (c ? "ms-ellipsis-a-tile" : "ms-ellipsis-a");
        a.push('<a ms-jsgrid-click-passthrough="true" class="' + e + '" title="');
        a.push(STSHtmlEncode(Strings.STS.L_OpenMenu));
        a.push('"');
        if (h)a.push("onclick=\"OpenCalloutAndSelectItem(this, event, this, '" + d + '\'); return false;" href="#" id="' + b + '" >'); else a.push("onclick=\"OpenCallout(this, event, this, '" + d + '\'); return false;" href="#" id="' + b + '" >');
        var g = c ? "ms-ellipsis-icon-tile" : "ms-ellipsis-icon";
        a.push('<img class="' + g + '" src="' + GetThemedImageUrl("spcommon.png") + '" alt="' + STSHtmlEncode(Strings.STS.L_OpenMenu) + '" /></a>');
        return a.join("")
    };
    RenderECB = function (e, c, f, g, b) {
        var a = [], d = e.ListSchema;
        a.push('<div class="ms-vb ' + (b == true ? "" : "ms-tableCell ms-list-TitleLink") + ' ms-vb-menuPadding itx" CTXName="ctx');
        a.push(e.ctxId);
        a.push('" id="');
        a.push(c.ID);
        a.push('" Field="');
        a.push(f.Name);
        a.push('" Perm="');
        a.push(c.PermMask);
        a.push('" EventType="');
        a.push(c.EventType);
        a.push('">');
        a.push(g);
        a.push("</div>");
        if (b == true) {
            a.push('</td><td class="ms-list-itemLink-td ms-cellstyle');
            d.Field[d.Field.length - 1] == f && a.push(" ms-vb-lastCell");
            a.push('" >')
        }
        a.push('<div class="ms-list-itemLink ' + (b == true ? "" : "ms-tableCell ms-alignRight") + '" ');
        a.push('onclick="ShowECBMenuForTr(this, event); return false;">');
        a.push('<a ms-jsgrid-click-passthrough="true" class="ms-lstItmLinkAnchor ms-ellipsis-a" title="');
        a.push(STSHtmlEncode(Strings.STS.L_OpenMenu));
        a.push('"');
        a.push('onclick="ShowECBMenuForTr(this.parentNode, event); return false; " href="#" >');
        a.push('<img class="ms-ellipsis-icon" src="' + GetThemedImageUrl("spcommon.png") + '" alt="' + STSHtmlEncode(Strings.STS.L_OpenMenu) + '" /></a>');
        a.push("</div>");
        return a.join("")
    };
    RenderECBinline = function (c, b, d) {
        var a = [];
        a.push('<span class="js-callout-ecbMenu" CTXName="ctx');
        a.push(c.ctxId);
        a.push('" id="');
        a.push(b.ID);
        a.push('" Field="');
        a.push(d.Name);
        a.push('" Perm="');
        a.push(b.PermMask);
        a.push('" EventType="');
        a.push(b.EventType);
        a.push('">');
        a.push('<a class="js-callout-action ms-calloutLinkEnabled ms-calloutLink js-ellipsis25-a" onclick="calloutCreateAjaxMenu(event); return false;" href="#" title="' + Strings.STS.L_OpenMenu_Text + '">');
        a.push('<img class="js-ellipsis25-icon" src="' + GetThemedImageUrl("spcommon.png") + '" alt="' + STSHtmlEncode(Strings.STS.L_OpenMenu) + '" />');
        a.push("</a>");
        a.push("</span>");
        return a.join("")
    };
    g_lastLaunchPointIIDClicked = null;
    RenderCalloutMenu = function (d, b, h, g, c) {
        var a = [], e = "ctx" + d.ctxId + "_" + b.ID + "_calloutLaunchPoint", f = d.ListSchema;
        a.push('<div class="ms-vb ' + (c == true ? "" : "ms-tableCell ms-list-TitleLink") + ' itx" CTXName="ctx');
        a.push(d.ctxId);
        a.push('" id="');
        a.push(b.ID);
        a.push('" App="');
        a.push(b["File_x0020_Type.mapapp"]);
        a.push('">');
        a.push(g);
        a.push("</div>");
        if (c == true) {
            a.push('</td><td class="ms-list-itemLink-td ms-cellstyle');
            f.Field[f.Field.length - 1] == h && a.push(" ms-vb-lastCell");
            a.push('" >')
        }
        if (typeof b.RenderCalloutWithoutHover != "undefined" && b.RenderCalloutWithoutHover)a.push(RenderCalloutAffordance(false, b.ID, e, true)); else {
            a.push('<div class="ms-list-itemLink ' + (c == true ? "" : "ms-tableCell ms-alignRight") + ' " ');
            a.push(' onclick="ShowMenuForTrOuter(this,event, true); return false;" >');
            a.push(RenderCalloutAffordance(true, b.ID, e, false));
            a.push("</div>")
        }
        return a.join("")
    };
    usedCalloutIDs = {};
    generateUniqueCalloutIDFromBaseID = function (a) {
        if (typeof usedCalloutIDs[a] !== "number") {
            usedCalloutIDs[a] = 0;
            return a
        } else {
            ++usedCalloutIDs[a];
            return a + "_" + String(usedCalloutIDs[a])
        }
    };
    CALLOUT_STR_ELLIPSIS = "...";
    CALLOUT_ELLIPSIS_LENGTH = CALLOUT_STR_ELLIPSIS.length;
    CALLOUT_CHARS_TO_TRUNCATE_PER_ITERATION = 2 + CALLOUT_ELLIPSIS_LENGTH;
    g_ClipboardControl = null;
    g_IsClipboardControlValid = false;
    getDocumentIconAbsoluteUrl = function (a, d, g) {
        var h = a["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"] == "", b;
        if (typeof d === "undefined" || d === 16)b = ""; else if (h)b = String(d); else if (d === 32)b = "lg_"; else b = String(d) + "_";
        EnsureFileLeafRefName(a);
        EnsureFileLeafRefSuffix(a);
        EnsureFileDirRef(a);
        var f = a.AlternateThumbnailUrl, e = isDefinedAndNotNullOrEmpty(f), c = a["FileLeafRef.Suffix"], i = a["PreviewExists.value"] == "1" && isDefinedAndNotNullOrEmpty(a["FileLeafRef.Name"]) && isDefinedAndNotNullOrEmpty(c) || a["PreviewExists.value"] == "" && g != null && g.ListTemplateType == 109, j = isDefinedAndNotNullOrEmpty(c) && (c == "mp3" || c == "wma" || c == "wav" || c == "oga");
        return b != "" && (e || i) ? e ? String(f) : a.FileDirRef + "/_w/" + a["FileLeafRef.Name"] + "_" + a["FileLeafRef.Suffix"] + ".jpg" : j ? ctx.imagesPath + "audiopreview.png" : h ? ctx.imagesPath + "folder" + b + ".gif" : ctx.imagesPath + b + a["HTML_x0020_File_x0020_Type.File_x0020_Type.mapico"]
    };
    displayGenericDocumentIcon = function (a, d) {
        var c = d === 1 ? "256_folder.png" : "256_icgen.png", b = ctx.imagesPath + c;
        if (a.src !== b)a.src = b
    };
    Callout_OnOpeningCallback = function (b, f) {
        var d = b.getLaunchPoint(), h = GetAncestorByTagNames(d, ["TR"]), a = GetEcbTdFromRow(h), c = null;
        if (a != null)c = GetEcbDivFromEcbTd(a); else {
            a = GetAncestorByTagNames(d, ["TD"]);
            c = m$(a).find("div.ms-vb.itx")[0]
        }
        var g = c.getAttribute("CTXName"), e = GenerateCtx(g_ctxDict[g], f);
        e.CurrentCallout = b;
        SPClientRenderer.Render(b.getContentElement(), e)
    };
    GenerateCtx = function (f, i) {
        var g = "ctx" + f.ctxId + "Callout", a = g_ctxDict[g];
        a = {};
        for (var b in f)if (b !== "OnPostRender" && b !== "OnPreRender")a[b] = f[b];
        a.BaseViewID = "Callout";
        a.Templates = SPClientTemplates.TemplateManager.GetTemplates(a);
        g_ctxDict[g] = a;
        for (var h = getItemIdxByID(a.ListData.Row, i), e = a.ListSchema.Field, d = null, c = 0; c < e.length && d === null; ++c)if (e[c].CalloutMenu === "TRUE")d = e[c];
        a.CurrentItemIdx = h;
        a.CurrentItem = a.ListData.Row[h];
        a.CurrentFieldSchema = d;
        return a
    };
    FieldRenderer_InitializePrototype();
    RawFieldRenderer_InitializePrototype();
    AttachmentFieldRenderer_InitializePrototype();
    RecurrenceFieldRenderer_InitializePrototype();
    ProjectLinkFieldRenderer_InitializePrototype();
    AllDayEventFieldRenderer_InitializePrototype();
    NumberFieldRenderer_InitializePrototype();
    BusinessDataFieldRenderer_InitializePrototype();
    DateTimeFieldRenderer_InitializePrototype();
    TextFieldRenderer_InitializePrototype();
    LookupFieldRenderer_InitializePrototype();
    NoteFieldRenderer_InitializePrototype();
    UrlFieldRenderer_InitializePrototype();
    UserFieldRenderer_InitializePrototype();
    s_ImnId = 1;
    SPMgr.prototype = {NewGroup: undefined, RenderField: undefined, RenderFieldByName: undefined};
    spMgr = new SPMgr;
    typeof Sys != "undefined" && Sys != null && Sys.Application != null && Sys.Application.notifyScriptLoaded();
    typeof NotifyScriptLoadedAndExecuteWaitingJobs == "function" && NotifyScriptLoadedAndExecuteWaitingJobs("clienttemplates.js");
    InitializeSingleItemPictureView()
}
var SPClientRenderer;
function CallFunctionWithErrorHandling(c, b, d, a) {
    if (SPClientRenderer.IsDebugMode(b))return c();
    try {
        return c()
    } catch (f) {
        if (b.Errors == null)b.Errors = [];
        try {
            f.ExecutionContext = a;
            if (Boolean(SPClientRenderer.AddCallStackInfoToErrors) && typeof a == "object" && null != a)a.CallStack = ULSGetCallstack(CallFunctionWithErrorHandling.caller)
        } catch (e) {
        }
        b.Errors.push(f);
        return d
    }
}
function CoreRender(b, a) {
    var c = {TemplateFunction: b, Operation: "CoreRender"}, d = function () {
        return CoreRenderWorker(b, a)
    };
    return CallFunctionWithErrorHandling(d, a, "", c)
}
function CoreRenderWorker(b, c) {
    var a;
    if (typeof b == "string")a = SPClientRenderer.ParseTemplateString(b, c); else if (typeof b == "function")a = b;
    return a == null ? "" : a(c)
}
function GetViewHash(a) {
    return ajaxNavigate.getParam("InplviewHash" + a.view.toLowerCase().substring(1, a.view.length - 1))
}
function RenderAsyncDataLoad() {
    return '<div style="padding-top:5px;"><center><img src="/_layouts/15/images/gears_an.gif" style="border-width:0px;" /></center></div>'
}
function RenderCallbackFailures(a, b) {
    if (!Boolean(a) || b == null || b.status != 601)return;
    if (a.Errors == null)a.Errors = [];
    a.Errors.push(b.responseText);
    SPClientRenderer.Render(document.getElementById("script" + a.wpq), a)
}
function AsyncDataLoadPostRender(a) {
    window.asyncCallback = function () {
        ExecuteOrDelayUntilScriptLoaded(function () {
            var b = a.clvp.PagingString();
            a.queryString = "?" + (b != null ? b : "");
            a.onRefreshFailed = RenderCallbackFailures;
            a.loadingAsyncData = true;
            var c = {currentCtx: a, csrAjaxRefresh: true};
            AJAXRefreshView(c, 1)
        }, "inplview.js")
    };
    if (typeof g_mdsReady != "undefined" && Boolean(g_mdsReady) && typeof g_MDSPageLoaded != "undefined" && !Boolean(g_MDSPageLoaded))_spBodyOnLoadFunctionNames.push("asyncCallback"); else asyncCallback()
}
function AddPostRenderCallback(b, a) {
    AddRenderCallback(b, "OnPostRender", a, false)
}
function AddPostRenderCallbackUnique(b, a) {
    AddRenderCallback(b, "OnPostRender", a, true)
}
function AddRenderCallback(d, c, b, g) {
    if (Boolean(d) && typeof b == "function" && c != "") {
        var a = d[c];
        if (a == null)d[c] = b; else if (typeof a == "function") {
            if (!Boolean(g) || String(a) != String(b)) {
                var e = [];
                e.push(a);
                e.push(b);
                d[c] = e
            }
        } else if (typeof a == "object") {
            var h = false;
            if (Boolean(g))for (var f = 0; f < a.length; f++)if (a[f] == b) {
                h = true;
                break
            }
            !h && d[c].push(b)
        }
    }
}
var clientHierarchyManagers;
function OnExpandCollapseButtonClick(b) {
    for (var a = 0; a < clientHierarchyManagers.length; a++)clientHierarchyManagers[a].ToggleExpandByImg(b.target.parentNode);
    b.stopPropagation()
}
function GetClientHierarchyManagerForWebpart(b, c) {
    for (var a = 0; a < clientHierarchyManagers.length; a++)if (clientHierarchyManagers[a].Matches(b))return clientHierarchyManagers[a];
    return new ClientHierarchyManager(b, c)
}
var ClientHierarchyManager;
function EnterIPEAndDoAction(a, d) {
    if (a.AllowGridMode) {
        var c = GetSPGanttFromCtx(a);
        if (c != null)d(c); else {
            var b = g_SPGridInitInfo[a.view];
            b.fnCallback = function (a) {
                d(a);
                b.fnCallback = null
            };
            EnsureScriptParams("inplview.js", "InitGrid", b, a)
        }
    }
}
function IndentItems(a) {
    EnterIPEAndDoAction(a, function (a) {
        a.IndentItems(a.get_SelectedItems())
    })
}
function OutdentItems(a) {
    EnterIPEAndDoAction(a, function (a) {
        a.OutdentItems(a.get_SelectedItems())
    })
}
function InsertProvisionalItem(a) {
    EnterIPEAndDoAction(a, function (a) {
        a.InsertProvisionalItemBeforeFocusedItem()
    })
}
function MoveItemsUp(a) {
    EnterIPEAndDoAction(a, function (a) {
        a.MoveItemsUp(a.get_ContiguousSelectedItemsWithoutEntryItems())
    })
}
function MoveItemsDown(a) {
    EnterIPEAndDoAction(a, function (a) {
        a.MoveItemsDown(a.get_ContiguousSelectedItemsWithoutEntryItems())
    })
}
function CreateSubItem(b, a) {
    EnterIPEAndDoAction(b, function (b) {
        b.CreateSubItem(a)
    })
}
function IsTouchSupported() {
    return window.navigator.msMaxTouchPoints != null && window.navigator.msMaxTouchPoints > 0 || document.documentElement != null && "ontouchstart" in document.documentElement
}
function RenderListView(a, g, b, o, h) {
    if (Boolean(a)) {
        a.ListDataJSONItemsKey = "Row";
        a.ControlMode = SPClientTemplates.ClientControlMode.View;
        SPClientTemplates.Utility.GetPropertiesFromPageContextInfo(a);
        if (!Boolean(a.bIncremental))a.Templates = SPClientTemplates.TemplateManager.GetTemplates(a);
        if (a.Templates.Body == RenderGroupTemplateDefault)a.Templates.Body = RenderBodyTemplate;
        if (a.Templates.Header == "")a.Templates.Header = RenderHeaderTemplate;
        var c = a.Templates.Footer, j = a.Templates.Body, i = a.Templates.Header, k = a.Templates.View, m = function () {
            EnsureScriptParams("DragDrop.js", "SetDocItemDragDrop", a)
        };
        AddPostRenderCallbackUnique(a, m);
        var f = a.OnPostRender, p = a.OnPreRender;
        a.OnPostRender = null;
        Boolean(a.ListSchema) && a.ListSchema.IsDocLib && EnableSharingDialogIfNeeded(a);
        a.Templates.Footer = "";
        if (Boolean(a.bInitialRender) && Boolean(a.AsyncDataLoad)) {
            a.OnPreRender = null;
            a.Templates.View = RenderAsyncDataLoad;
            a.Templates.Header = "";
            a.Templates.Body = "";
            a.Templates.Footer = "";
            a.OnPostRender = null;
            if (!Boolean(ajaxNavigate.getParam("InplviewHash" + a.view.toLowerCase().substring(1, a.view.length - 1))))a.OnPostRender = AsyncDataLoadPostRender
        } else if (Boolean(a.bInitialRender) && Boolean(ajaxNavigate.getParam("InplviewHash" + a.view.toLowerCase().substring(1, a.view.length - 1))))a.Templates.Body = "";
        if (b != null) {
            a.Templates.Header = "";
            if (o) {
                var d = b.nextSibling;
                while (d != null && d.nextSibling != null)b.parentNode.removeChild(d.nextSibling);
                var l = a.fHidden;
                a.fHidden = true;
                SPClientRenderer.Render(b, a);
                a.fHidden = l
            } else {
                while (b.nextSibling != null)b.parentNode.removeChild(b.nextSibling);
                var e = b.lastChild;
                while (e != null) {
                    b.removeChild(e);
                    e = b.lastChild
                }
                SPClientRenderer.Render(b, a)
            }
        } else SPClientRenderer.Render(document.getElementById("script" + g), a);
        if (!Boolean(a.bInitialRender) || !Boolean(a.AsyncDataLoad)) {
            a.Templates.Body = "";
            a.Templates.Header = "";
            if (c == "")a.Templates.Footer = RenderFooterTemplate; else a.Templates.Footer = c;
            a.OnPreRender = null;
            a.OnPostRender = f;
            var n = a.fHidden;
            a.fHidden = Boolean(h);
            SPClientRenderer.Render(document.getElementById("scriptPaging" + g), a);
            a.fHidden = n
        }
        a.Templates.View = k;
        a.Templates.Body = j;
        a.Templates.Header = i;
        a.Templates.Footer = c;
        a.OnPreRender = p;
        a.OnPostRender = f
    }
}
var SPClientTemplates;
function SPTemplateManagerResolveTypeInfo(a) {
    if (a != null) {
        this.defaultViewStyle = typeof a.ViewStyle == "undefined";
        this.viewStyle = this.defaultViewStyle ? "null" : a.ViewStyle.toString();
        this.allLists = typeof a.ListTemplateType == "undefined";
        this.ltype = this.allLists ? "null" : a.ListTemplateType.toString();
        this.allViews = typeof a.BaseViewID == "undefined";
        this.viewId = this.allViews ? "null" : a.BaseViewID.toString()
    }
}
function SPTemplateManagerResolveTypeInfo_InitializePrototype() {
    SPTemplateManagerResolveTypeInfo.prototype = {
        defaultViewStyle: true,
        viewStyle: "",
        allLists: true,
        ltype: "",
        allViews: true,
        viewId: ""
    }
}
function SPTemplateManagerRegisterTypeInfo(a) {
    if (a != null) {
        this.defaultViewStyle = typeof a.ViewStyle == "undefined";
        this.allLists = typeof a.ListTemplateType == "undefined";
        this.allViews = typeof a.BaseViewID == "undefined";
        if (!this.allLists)if (typeof a.ListTemplateType == "string" || typeof a.ListTemplateType == "number")this.ltype = [a.ListTemplateType.toString()]; else this.ltype = a.ListTemplateType;
        if (!this.allViews)if (typeof a.BaseViewID == "string" || typeof a.BaseViewID == "number")this.viewId = [a.BaseViewID.toString()]; else this.viewId = a.BaseViewID;
        if (!this.defaultViewStyle)if (typeof a.ViewStyle == "string" || typeof a.ViewStyle == "number")this.viewStyle = [a.ViewStyle.toString()]; else this.viewStyle = a.ViewStyle
    }
}
function SPTemplateManagerRegisterTypeInfo_InitializePrototype() {
    SPTemplateManagerRegisterTypeInfo.prototype = {
        defaultViewStyle: true,
        viewStyle: [],
        allLists: true,
        ltype: [],
        allViews: true,
        viewId: []
    }
}
function IsCSRReadOnlyTabularView(a) {
    return a != null && a.ListSchema != null && a.ListSchema.TabularView == "1" && a.inGridMode != true
}
function SPClientFormUserValue() {
}
function SPClientFormUserValue_InitializePrototype() {
    SPClientFormUserValue.prototype.lookupId = "-1";
    SPClientFormUserValue.prototype.lookupValue = "";
    SPClientFormUserValue.prototype.displayStr = "";
    SPClientFormUserValue.prototype.email = "";
    SPClientFormUserValue.prototype.sip = "";
    SPClientFormUserValue.prototype.title = "";
    SPClientFormUserValue.prototype.picture = "";
    SPClientFormUserValue.prototype.department = "";
    SPClientFormUserValue.prototype.jobTitle = "";
    SPClientFormUserValue.prototype.initFromUserString = function (d) {
        if (d != null && d != "") {
            var c = d.split(SPClientTemplates.Utility.UserLookupDelimitString);
            if (c.length != 2)return;
            this.lookupId = c[0];
            var e = c[1], a = e.split(SPClientTemplates.Utility.UserMultiValueDelimitString), b = a.length;
            if (b == 1)this.title = this.displayStr = this.lookupValue = a[0]; else if (b >= 5) {
                this.lookupValue = a[0] == null ? "" : a[0];
                this.displayStr = a[1] == null ? "" : a[1];
                this.email = a[2] == null ? "" : a[2];
                this.sip = a[3] == null ? "" : a[3];
                this.title = a[4] == null ? "" : a[4];
                if (b >= 6) {
                    this.picture = a[5] == null ? "" : a[5];
                    if (b >= 7) {
                        this.department = a[6] == null ? "" : a[6];
                        if (b >= 8)this.jobTitle = a[7] == null ? "" : a[7]
                    }
                }
            }
        }
    };
    SPClientFormUserValue.prototype.toString = function () {
        var c = SPClientTemplates.Utility.UserLookupDelimitString, b = SPClientTemplates.Utility.UserMultiValueDelimitString, a = this.lookupId;
        a += c;
        a += this.lookupValue;
        a += b;
        a += this.displayStr;
        a += b;
        a += this.email;
        a += b;
        a += this.sip;
        a += b;
        a += this.title;
        a += b;
        a += this.picture;
        a += b;
        a += this.department;
        a += b;
        a += this.jobTitle;
        return a
    }
}
function RenderViewTemplate(a) {
    var b = a.RenderHeader(a);
    b += a.RenderBody(a);
    b += a.RenderFooter(a);
    return b
}
function RenderFieldValueDefault(a) {
    return a != null && a.CurrentFieldValue != null ? a.CurrentFieldValue.toString() : ""
}
var RenderBodyTemplate;
function RenderGroupTemplateDefault(a) {
    return a != null && typeof a.RenderGroups == "function" ? a.RenderGroups(a) : ""
}
function RenderItemTemplateDefault(a) {
    return a != null && typeof a.RenderItems == "function" ? a.RenderItems(a) : ""
}
function RenderFieldTemplateDefault(a) {
    return a != null && typeof a.RenderFields == "function" ? a.RenderFields(a) : ""
}
function RenderAggregate(g, i, h, l, k, n, m) {
    var a = "";
    if (i == null) {
        a += '<tbody id="aggr';
        a += g.wpq;
        a += '">'
    } else {
        a = '<tbody id="aggr';
        a += i;
        a += '_"';
        if (!n)a += ' style="display:none"';
        a += ">"
    }
    a += '<tr id="agg';
    a += g.wpq;
    a += '"><td/>';
    var c = "";
    if (k == 1)c = ".agg"; else if (k == 2)c = ".agg2";
    var j = l.Field;
    for (var o in j) {
        var b = j[o];
        if (b.GroupField != null)break;
        a += '<td class="ms-vb2">';
        var f = m[b.Name];
        if (f != null && f != "") {
            a += "<nobr><b>";
            var e, d;
            if (f == "COUNT") {
                e = Strings.STS.L_SPCount;
                d = b.Name + ".COUNT" + c
            }
            if (f == "SUM") {
                e = Strings.STS.L_SPSum;
                d = b.Name + ".SUM" + c
            } else if (f == "AVG") {
                e = Strings.STS.L_SPAvg;
                d = b.Name + ".AVG" + c
            } else if (f == "MAX") {
                e = Strings.STS.L_SPMax;
                d = b.Name + ".MAX" + c
            } else if (f == "MIN") {
                e = Strings.STS.L_SPMin;
                d = b.Name + ".MIN" + c
            } else if (f == "STDEV") {
                e = Strings.STS.L_SPStdev;
                d = b.Name + ".STDEV" + c
            } else if (f == "VAR") {
                e = Strings.STS.L_SPVar;
                d = b.Name + ".VAR" + c
            } else {
                e = Strings.STS.L_SPCount;
                d = b.Name + ".COUNT" + c
            }
            a += e;
            a += "=&nbsp;";
            a += Boolean(h) ? h[d] : "0";
            a += "</b></nobr>"
        }
        a += "</td>";
        if (IsCSRReadOnlyTabularView(g) && (b.CalloutMenu == "TRUE" || b.listItemMenu == "TRUE"))a += "<td></td>"
    }
    a += "</tr></tbody>";
    return a
}
function RenderGroupTemplate(c, g, i, b, h, j, e) {
    c.CurrentItem = b;
    var q = c.ctxId, a = '<tbody id="titl';
    a += i;
    a += '" groupString="';
    a += b[g + ".urlencoded"];
    a += '"';
    if (j == 2 && !e)a += ' style="display:none"';
    a += '><tr><td colspan="100" nowrap="nowrap" class="ms-gb';
    if (j == 2)a += "2";
    a += '">';
    if (j == 2)a += '<img src="/_layouts/15/images/blank.gif?rev=23" alt="" height="1" width="10">';
    a += '<a href="javascript:" onclick="javascript:ExpCollGroup(';
    a += "'";
    a += i;
    a += "', 'img_";
    a += i;
    a += "',event, false);return false;";
    a += '">';
    var l = null, m = null;
    if (fRightToLeft) {
        l = e ? "ms-commentcollapsertl-iconouter" : "ms-commentexpandrtl-iconouter";
        m = e ? "ms-commentcollapsertl-icon" : "ms-commentexpandrtl-icon"
    } else {
        l = e ? "ms-commentcollapse-iconouter" : "ms-commentexpand-iconouter";
        m = e ? "ms-commentcollapse-icon" : "ms-commentexpand-icon"
    }
    var p = e ? Strings.STS.L_SPCollapse : Strings.STS.L_SPExpand;
    a += '<span class="';
    a += l;
    a += '"><img class="';
    a += m;
    a += '" src="';
    a += GetThemedImageUrl("spcommon.png");
    a += '" alt="';
    a += p;
    a += '" id="img_';
    a += i;
    a += '" /></span>';
    for (var n = g, d, k = 0; k < h.Field.length; k++) {
        var f = h.Field[k];
        if (f.Name == g) {
            n = f.DisplayName;
            d = f;
            break
        }
    }
    a += STSHtmlEncode(n);
    a += "</a> : ";
    if (d != null)if (d.Type == "Number" || d.Type == "Currency")a += b[f.Name]; else if (d.Type == "DateTime")a += b[f.Name + ".groupdisp"]; else if (d.Type == "User" || d.Type == "UserMulti")a += b[f.Name + ".span"]; else {
        c.CurrentItemIdx = k;
        a += spMgr.RenderFieldByName(c, g, b, h);
        c.CurrentItemIdx = -1
    }
    a += ' <span style="font-weight: lighter; display: inline-block;">(';
    a += j == 2 ? b[g + ".COUNT.group2"] : b[g + ".COUNT.group"];
    a += ")</span></td></tr></tbody>";
    var o = h.Aggregate;
    if (o != null && !c.inGridMode)a += RenderAggregate(c, i, b, h, j, e, o);
    c.CurrentItem = null;
    return a
}
function RenderGroup(a, b) {
    return RenderGroupEx(a, b, false)
}
function RenderGroupEx(d, b, k) {
    var c = d.ListSchema, g = c.group1, f = c.group2, i = c.Collapse == null || c.Collapse != "TRUE", e = d.ctxId, j = Boolean(ctx.ExternalDataList), h = "", a = d.Templates.Group;
    if (a == null || a == RenderItemTemplateDefault || typeof a != "function" && typeof a != "string")a = RenderGroupTemplate; else if (typeof a == "string")a = SPClientRenderer.ParseTemplateString(a, d);
    e += "-";
    e += b[g + ".groupindex"];
    if (b[g + ".newgroup"] == "1")h += a(d, g, e, b, c, 1, i);
    if (b[g + ".newgroup"] == "1" || f != null && b[f + ".newgroup"] == "1") {
        if (f != null && !k) {
            e += b[f + ".groupindex2"];
            h += a(d, f, e, b, c, 2, i)
        }
        h += AddGroupBody(e, i, j)
    }
    return h
}
function AddGroupBody(d, c, b) {
    var a = '<tbody id="tbod';
    a += d;
    a += '_"';
    if (!c && b)a += ' style="display: none;"';
    a += ' isLoaded="';
    if (c || b)a += "true"; else a += "false";
    a += '"/>';
    return a
}
function GenerateIID(a) {
    return GenerateIIDForListItem(a, a.CurrentItem)
}
function GenerateIIDForListItem(b, a) {
    return b.ctxId + "," + a.ID + "," + a.FSObjType
}
function GetCSSClassForFieldTd(b, a) {
    var c = b.ListSchema;
    return a.CalloutMenu == "TRUE" || b.inGridMode && (a.ClassInfo == "Menu" || a.listItemMenu == "TRUE") ? "ms-cellstyle ms-vb-title" : a.ClassInfo == "Menu" || a.listItemMenu == "TRUE" ? "ms-cellstyle ms-vb-title ms-positionRelative" : a.ClassInfo == "Icon" ? "ms-cellstyle ms-vb-icon" : (a.Type == "User" || a.Type == "UserMulti") && c.EffectivePresenceEnabled ? "ms-cellstyle ms-vb-user" : "ms-cellstyle ms-vb2"
}
function DoesListUseCallout(b) {
    for (var a = 0; a < b.ListSchema.Field.length; a++) {
        var c = b.ListSchema.Field[a];
        if (c.CalloutMenu != null && c.CalloutMenu.toLowerCase() == "true")return true
    }
    return false
}
function ShowCallOutOrECBWrapper(b, c, d) {
    var a = true;
    if (d) {
        if (ShowCalloutMenuForTr != null)a = ShowCalloutMenuForTr(b, c, true)
    } else if (ShowECBMenuForTr != null)a = ShowECBMenuForTr(b, c);
    return a
}
var RenderItemTemplate;
function RenderTableHeader(b) {
    var c = b.ListSchema, e = b.ListData, a = [];
    RenderHeroButton(a, b);
    if (Boolean(c.InplaceSearchEnabled)) {
        var g = "CSRListViewControlDiv" + b.wpq;
        a.push('<div class="ms-csrlistview-controldiv" id="');
        a.push(STSHtmlEncode(g));
        a.push('">')
    } else a.push("<div>");
    if (c.RenderViewSelectorPivotMenu == "True")a.push(RenderViewSelectorPivotMenu(b)); else c.RenderViewSelectorPivotMenuAsync == "True" && a.push(RenderViewSelectorPivotMenuAsync(b));
    var f = b.BasePermissions.ManageLists, d = b.BasePermissions.ManagePersonalViews;
    if (c.RenderSaveAsNewViewButton == "True" && (f || d != null && d)) {
        a.push('<div id="CSRSaveAsNewViewDiv');
        a.push(b.wpq);
        a.push('" class="ms-InlineSearch-DivBaseline" style="visibility:hidden;padding-bottom:3px;"');
        a.push('><a class="ms-commandLink" href="#" id="CSRSaveAsNewViewAnchor');
        a.push(b.wpq);
        a.push("\" saveViewButtonDisabled=\"false\" onclick=\"EnsureScriptParams('inplview', 'ShowSaveAsNewViewDialog', '");
        a.push(b.listName + "', '");
        a.push(b.view + "', '");
        a.push(b.wpq + "', '");
        a.push(f + "', '");
        a.push(d);
        a.push("'); return false;\" >");
        a.push(Strings.STS.L_SaveThisViewButton.toUpperCase());
        a.push("</a></div>")
    }
    a.push("</div>");
    a.push('<iframe src="javascript:false;" id="FilterIframe');
    a.push(b.ctxId);
    a.push('" name="FilterIframe');
    a.push(b.ctxId);
    a.push('" style="display:none" height="0" width="0" FilterLink="');
    a.push(e.FilterLink);
    a.push('"></iframe>');
    a.push("<table onmousedown='return OnTableMouseDown(event);' summary=\"");
    a.push(STSHtmlEncode(b.ListTitle));
    a.push('" xmlns:o="urn:schemas-microsoft-com:office:office" o:WebQuerySourceHref="');
    a.push(b.HttPath);
    a.push("&XMLDATA=1&RowLimit=0&View=");
    a.push(escapeProperly(c.View));
    a.push('" border="0" cellspacing="0" dir="');
    a.push(c.Direction);
    a.push('" onmouseover="EnsureSelectionHandler(event,this,');
    a.push(b.ctxId);
    a.push(')" cellpadding="1" id="');
    if (c.IsDocLib || typeof e.Row == "undefined")a.push("onetidDoclibViewTbl0"); else {
        a.push(b.listName);
        a.push("-");
        a.push(c.View)
    }
    a.push('" class="');
    if (typeof e.Row == "undefined")a.push("ms-emptyView"); else a.push("ms-listviewtable");
    a.push('">');
    return a.join("")
}
function RenderSelectAllCbx(b, a) {
    if (a == null)a = [];
    a.push('<span class="ms-selectall-span" tabindex="0" onfocus="EnsureSelectionHandlerOnFocus(event,this,');
    a.push(b.ctxId);
    a.push(');" id="cbxSelectAllItems');
    a.push(b.ctxId);
    a.push('" title="');
    a.push(Strings.STS.L_select_deselect_all);
    a.push('"><span tabindex="-1" class="ms-selectall-iconouter"><img class="ms-selectall-icon" alt="" src="');
    a.push(GetThemedImageUrl("spcommon.png"));
    a.push('" /></span></span></span>');
    AddPostRenderCallback(b, function () {
        var a = document.getElementById("cbxSelectAllItems" + b.ctxId), c = "ontouchstart" in document.documentElement ? "touchstart" : "click";
        $addHandler(a, c, function () {
            a.checked = !a.checked;
            ToggleAllItems(c, a, b.ctxId)
        })
    });
    return a
}
var RenderHeaderTemplate, RenderFooterTemplate;
function RenderViewSelectorMenu(c) {
    var j = STSHtmlEncode(Strings.STS.L_OpenMenu_Text), f = STSHtmlEncode(c.wpq + "_LTViewSelectorMenu"), d = STSHtmlEncode(c.wpq + "_ListTitleViewSelectorMenu"), k = STSHtmlEncode(c.wpq + "_ListTitleViewSelectorMenu_t"), h = STSHtmlEncode(c.wpq + "_ListTitleViewSelectorMenu_Container"), e = c.viewTitle;
    if (e == null || e == "")e = Strings.STS.L_ViewSelectorCurrentView;
    var o = c.ListSchema.ViewSelector_ShowMergeView ? "true" : "false", n = c.ListSchema.ViewSelector_ShowRepairView ? "true" : "false", m = c.ListSchema.ViewSelector_ShowCreateView ? "true" : "false", p = c.ListSchema.ViewSelector_ShowEditView ? "true" : "false", l = c.ListSchema.ViewSelector_ShowApproveView ? "true" : "false", g = c.ListSchema.ViewSelector_ViewParameters;
    if (g == null)g = "";
    var b = [];
    b.push("onclick=\"try { CoreInvoke('showViewSelector', event, document.getElementById('");
    b.push(h);
    b.push("'), { showRepairView : ");
    b.push(n);
    b.push(", showMergeView : ");
    b.push(o);
    b.push(", showEditView : ");
    b.push(p);
    b.push(", showCreateView : ");
    b.push(m);
    b.push(", showApproverView : ");
    b.push(l);
    b.push(", listId: '");
    b.push(c.listName);
    b.push("', viewId: '");
    b.push(c.view);
    b.push("', viewParameters: '");
    b.push(g);
    b.push("' }); } catch (ex) { }; return false;\" ");
    var i = b.join(""), a = [];
    a.push('<span data-sp-cancelWPSelect="true" id="');
    a.push(h);
    a.push('" class="ms-csrlistview-viewselectormenu"><span id="');
    a.push(k);
    a.push('" class="ms-menu-althov ms-viewselector" title="');
    a.push(STSHtmlEncode(Strings.STS.L_ViewSelectorTitle));
    a.push('" hoveractive="ms-menu-althov-active ms-viewselectorhover" hoverinactive="ms-menu-althov ms-viewselector" ');
    a.push("foa=\"MMU_GetMenuFromClientId('");
    a.push(d);
    a.push('\')" onmouseover="MMU_PopMenuIfShowing(this); MMU_EcbTableMouseOverOut(this, true)" ');
    a.push('oncontextmenu="ClkElmt(this); return false;" ');
    a.push(i);
    a.push(">");
    a.push('<a class="ms-menu-a" id="');
    a.push(d);
    a.push('" accesskey="');
    a.push(STSHtmlEncode(Strings.STS.L_SelectBackColorKey_TEXT));
    a.push('" href="#" ');
    a.push(i);
    a.push('oncontextmenu="ClkElmt(this); return false;" onfocus="MMU_EcbLinkOnFocusBlur(byid(\'');
    a.push(f);
    a.push('\'), this, true);" oncontextmenu="ClkElmt(this); return false;" ');
    a.push("onkeydown=\"MMU_EcbLinkOnKeyDown(byid('");
    a.push(f);
    a.push("'), MMU_GetMenuFromClientId('");
    a.push(d);
    a.push('\'), event);" menutokenvalues="MENUCLIENTID=');
    a.push(d);
    a.push(",TEMPLATECLIENTID=");
    a.push(f);
    a.push('" serverclientid="');
    a.push(d);
    a.push('"><span class="ms-viewselector-currentView">');
    a.push(STSHtmlEncode(e));
    a.push("</span></a>");
    a.push('<span style="height:');
    a.push(4);
    a.push("px;width:");
    a.push(7);
    a.push('px;position:relative;display:inline-block;overflow:hidden;" class="s4-clust ms-viewselector-arrow ms-menu-stdarw">');
    a.push('<img src="');
    a.push("/_layouts/15/images/fgimg.png?rev=23");
    a.push('" alt="');
    a.push(j);
    a.push('" style="border-width:0px;position:absolute;left:-');
    a.push(0);
    a.push("px !important;top:-");
    a.push(262);
    a.push('px !important;" /></span>');
    a.push('<span style="height:');
    a.push(4);
    a.push("px;width:");
    a.push(7);
    a.push('px;position:relative;display:inline-block;overflow:hidden;" class="s4-clust ms-viewselector-arrow ms-menu-hovarw">');
    a.push('<img src="');
    a.push("/_layouts/15/images/fgimg.png?rev=23");
    a.push('" alt="');
    a.push(j);
    a.push('" style="border-width:0px;position:absolute;left:-');
    a.push(0);
    a.push("px !important;top:-");
    a.push(266);
    a.push('px !important;" /></span>');
    a.push("</span></span>");
    return a.join("")
}
function RenderViewSelectorPivotMenu(renderCtx) {
    var pivotOpts = {PivotContainerId: renderCtx.wpq + "_ListTitleViewSelectorMenu_Container"}, viewMenu = new ClientPivotControl(pivotOpts), allOpts = renderCtx.ListSchema.ViewSelectorPivotMenuOptions;
    if (allOpts == null || allOpts == "")return "";
    for (var viewData = eval(renderCtx.ListSchema.ViewSelectorPivotMenuOptions), idx = 0; idx < viewData.length; idx++) {
        var viewOpt = viewData[idx];
        if (viewOpt.GroupId >= 500 || viewOpt.MenuOptionType != ClientPivotControl.MenuOptionType.MenuOption)break;
        viewOpt.SelectedOption = renderCtx.viewTitle == viewOpt.DisplayText;
        viewMenu.AddMenuOption(viewOpt)
    }
    if (idx > 0) {
        if (idx < 3)viewMenu.SurfacedPivotCount = idx;
        for (; idx < viewData.length; idx++) {
            var overflowItem = viewData[idx];
            if (overflowItem.MenuOptionType == ClientPivotControl.MenuOptionType.MenuOption) {
                overflowItem.SelectedOption = renderCtx.viewTitle == overflowItem.DisplayText;
                viewMenu.AddMenuOption(overflowItem)
            } else overflowItem.MenuOptionType == ClientPivotControl.MenuOptionType.MenuSeparator && viewMenu.AddMenuSeparator()
        }
    }
    return viewMenu.RenderAsString()
}
function RenderViewSelectorPivotMenuAsync(d) {
    var e = {PivotContainerId: d.wpq + "_ListTitleViewSelectorMenu_Container"}, b = new ClientPivotControl(e);
    b.SurfacedPivotCount = 1;
    var a = d.viewTitle;
    if (a == null || a == "")a = Strings.STS.L_ViewSelectorCurrentView;
    var c = new ClientPivotControlMenuOption;
    c.DisplayText = a;
    c.OnClickAction = "return false;";
    c.SelectedOption = true;
    b.AddMenuOption(c);
    b.OverflowMenuScript = "OpenViewSelectorPivotOptions(event, '" + d.ctxId + "'); return false;";
    return b.RenderAsString()
}
function OpenViewSelectorPivotOptions(d, i) {
    if (d == null)d = window.event;
    var b = g_ctxDict["ctx" + i];
    if (b == null)return;
    var h = b.wpq + "_ListTitleViewSelectorMenu_Container", g = document.getElementById(h), e = ClientPivotControl.PivotControlDict[h];
    if (g == null || e == null)return;
    if (g.getAttribute("data-viewsLoaded") == "true") {
        ClientPivotControlExpandOverflowMenu(d);
        return
    }
    var k = _spPageContextInfo.webServerRelativeUrl, j = "_layouts/" + _spPageContextInfo.webUIVersion.toString() + "/vsmenu.aspx", f = b.ListSchema.ViewSelector_ViewParameters;
    if (f == null)f = "";
    var a = [];
    a.push(GetUrlFromWebUrlAndWebRelativeUrl(k, j));
    a.push("?List=");
    a.push(escapeProperly(b.listName));
    a.push("&View=");
    a.push(escapeProperly(b.view));
    a.push("&Source=");
    a.push(escapeProperly(window.location.href));
    a.push("&RootFolder=");
    a.push(b.rootFolder);
    if (f != "") {
        a.push("&");
        a.push(escapeProperly(f))
    }
    var c = new XMLHttpRequest;
    c.open("POST", a.join(""), true);
    c.setRequestHeader("Content-Type", "application/json");
    c.onreadystatechange = function () {
        if (c.readyState == 4 && c.status != 601) {
            for (var viewData = eval(c.responseText), idx = 0; idx < viewData.length; idx++) {
                var overflowItem = viewData[idx];
                if (overflowItem.Text == b.viewTitle)continue;
                if (overflowItem.ItemType == "MenuItem") {
                    var overflowOpt = new ClientPivotControlMenuOption;
                    overflowOpt.DisplayText = overflowItem.Text;
                    overflowOpt.Description = overflowItem.Description;
                    overflowOpt.OnClickAction = overflowItem.ActionScriptText;
                    overflowOpt.ImageUrl = overflowItem.ImageSourceUrl;
                    overflowOpt.ImageAltText = overflowItem.Text;
                    overflowOpt.SelectedOption = b.viewTitle == overflowItem.Text;
                    e.AddMenuOption(overflowOpt)
                } else overflowItem.ItemType == "MenuSeparator" && e.AddMenuSeparator()
            }
            e.ProcessAllMenuItems();
            e.EnsureSelectedOption();
            ClientPivotControlExpandOverflowMenu(d);
            g.setAttribute("data-viewsLoaded", "true")
        }
    };
    c.send("");
    d != null && CancelEvent(d)
}
function RenderEmptyText(h, b) {
    if (b.inGridMode)return;
    var g = b.ListData;
    if (g.Row.length == 0) {
        var c = b.ListSchema, a = '<table class="', e = typeof b.completedSearchTerm != "undefined" && b.completedSearchTerm != null;
        a += "ms-list-emptyText-compact ms-textLarge";
        a += '" dir="';
        a += c.Direction;
        a += '" border="0">';
        a += '<tr id="empty-';
        a += b.wpq;
        a += '"><td colspan="99">';
        var f = b.ListTemplateType;
        if (e)a += Strings.STS.L_NODOCSEARCH; else if (c.IsDocLib) {
            var d = b.viewTitle;
            if (Boolean(d))a += Strings.STS.L_NODOC.replace("%0", STSHtmlEncode(d)); else a += Strings.STS.L_NODOCView
        } else if (f == 160)a += Strings.STS.L_AccRqEmptyView; else a += STSHtmlEncode(c.NoListItem);
        a += "</td></tr></table>";
        h.push(a)
    }
}
function RenderSearchStatus(a, b) {
    a.push("<tr><td>" + RenderSearchStatusInner(a, b) + "</td></tr>")
}
function RenderSearchStatusInner(b, a) {
    return '<div id="inplaceSearchDiv_' + a.wpq + '_lsstatus"></div>'
}
function RenderPaging(b, d) {
    var c = d.ListData;
    if (c != null && (c.PrevHref != null || c.NextHref != null)) {
        var e = d.wpq, i = d.ListSchema;
        b.push('<table border="0" cellpadding="0" cellspacing="0" class="ms-bottompaging" id="bottomPaging');
        b.push(e);
        b.push('"><tr><td class="ms-vb ms-bottompagingline" id="bottomPagingCell');
        if (!i.groupRender) {
            b.push(e);
            b.push('" align="center">')
        } else b.push('">');
        var a = [], h = window.document.documentElement.getAttribute("dir") == "rtl";
        a.push("<table><tr>");
        if (c.PrevHref != null) {
            a.push('<td id="paging');
            a.push(e + "prev");
            a.push('"><a');
            a.push(" onclick='RefreshPageTo(event, \"");
            a.push(c.PrevHref);
            a.push("\");return false;'");
            a.push(' href="javascript:" class="ms-commandLink ms-promlink-button ms-promlink-button-enabled"><span class="ms-promlink-button-image"><img src="');
            a.push(GetThemedImageUrl("spcommon.png"));
            a.push('" border="0" class="');
            if (h)a.push("ms-promlink-button-right"); else a.push("ms-promlink-button-left");
            a.push('" alt="');
            a.push(Strings.STS.L_SPClientPrevious);
            a.push('"></a></td>')
        }
        a.push('<td class="ms-paging">');
        a.push(c.FirstRow);
        a.push(" - ");
        a.push(c.LastRow);
        a.push("</td>");
        if (c.NextHref != null) {
            a.push('<td id="paging');
            a.push(e + "next");
            a.push('"><a');
            a.push(" onclick='RefreshPageTo(event, \"");
            a.push(c.NextHref);
            a.push("\");return false;'");
            a.push(' href="javascript:" class="ms-commandLink ms-promlink-button ms-promlink-button-enabled"><span class="ms-promlink-button-image"><img src="');
            a.push(GetThemedImageUrl("spcommon.png"));
            a.push('" border="0" class="');
            if (h)a.push("ms-promlink-button-left"); else a.push("ms-promlink-button-right");
            a.push('" alt="');
            a.push(Strings.STS.L_SPClientNext);
            a.push('"></a></td>')
        }
        a.push("</tr></table>");
        var g = a.join(""), f = document.getElementById("topPagingCell" + e);
        if (f != null)f.innerHTML = g;
        b.push(g);
        b.push("</td></tr>");
        RenderSearchStatus(b, d);
        b.push("</table>")
    } else {
        b.push('<table border="0" cellpadding="0" cellspacing="0" class="ms-bottompaging" id="bottomPaging">');
        RenderSearchStatus(b, d);
        b.push("</table>")
    }
}
function RenderPagingControlNew(b, e, h, i, m) {
    var a = e.ListData, l = '<div class="%CLASS_NAME%" id="%ID_NAME%" style="padding:2px;" >', g = '<a onclick=\'RefreshPageTo(event, "%PREV_OR_NEXT_PAGE%");return false;\' href="javascript:" ><img alt="%PREV_OR_NEXT_ALT%" src="%PREV_OR_NEXT_IMG%" alt="" /></a>', j = '<span class="ms-paging">%FIRST_ROW% - %LAST_ROW% </span>';
    b.push(l.replace(/%CLASS_NAME%/, i).replace(/%ID_NAME%/, m));
    if (a != null && (a.PrevHref != null || a.NextHref != null)) {
        var n = e.wpq, k = e.ListSchema, f = "/_layouts/15/" + k.LCID + "/images/";
        if (a.PrevHref != null) {
            var d = g.replace(/%PREV_OR_NEXT_PAGE%/, a.PrevHref);
            d = d.replace(/%PREV_OR_NEXT_IMG%/, f + "prev.gif");
            d = d.replace(/%PREV_OR_NEXT_ALT%/, Strings.STS.L_SlideShowPrevButton_Text);
            b.push(d)
        }
        h && b.push(j.replace(/%FIRST_ROW%/, a.FirstRow).replace(/%LAST_ROW%/, a.FirstRow));
        if (a.NextHref != null) {
            var c = g.replace(/%PREV_OR_NEXT_PAGE%/, a.NextHref);
            c = c.replace(/%PREV_OR_NEXT_IMG%/, f + "next.gif");
            c = c.replace(/%PREV_OR_NEXT_ALT%/, Strings.STS.L_SlideShowNextButton_Text);
            b.push(c)
        }
    }
    b.push(RenderSearchStatusInner(b, e));
    b.push("</div>")
}
function RenderHeroParameters(b, i) {
    if (b == null)throw"Error: Ctx can not be null in RenderHeroParameters";
    var f = b.ListSchema, g = b.wpq;
    this.isDocLib = f.IsDocLib;
    this.listTemplate = b.ListTemplateType;
    this.WOPIEnabled = Boolean(b.NewWOPIDocumentEnabled);
    this.canUpload = CanUploadFile(b);
    this.hasInlineEdit = b.AllowGridMode && !f.IsDocLib && this.listTemplate != 123;
    var h = true;
    if (Boolean(i) || typeof g_uploadType != "undefined" && (g_uploadType == UploadType.ACTIVEXNA || g_uploadType == UploadType.NOT_SUPPORTED))h = false;
    this.canDragUpload = h && !(a == 119 || a == 123);
    var d = "idHomePageNewItem", c = Strings.STS.L_SPAddNewItem, a = this.listTemplate;
    if (a == 104) {
        d = "idHomePageNewAnnouncement";
        c = Strings.STS.L_SPAddNewAnnouncement
    } else if (b.listBaseType == 1) {
        if (this.WOPIEnabled)d = addWPQtoId(c_newdocWOPIID + "Hero", g); else d = "idHomePageNewDocument-" + g;
        c = Strings.STS.L_SPAddNewDocument
    } else if (a == 115) {
        d = "idHomePageNewItem-" + g;
        c = Strings.STS.L_SPAddNewDocument
    } else if (a == 123)c = Strings.STS.L_SPAddNewDocument; else if (a == 103) {
        d = "idHomePageNewLink";
        c = Strings.STS.L_SPAddNewLink
    } else if (a == 106) {
        d = "idHomePageNewEvent";
        c = Strings.STS.L_SPAddNewEvent
    } else if (a == 107 || a == 150 || a == 171)c = Strings.STS.L_SPAddNewTask; else if (a == 109) {
        d = "idHomePageNewPicture";
        c = Strings.STS.L_SPAddNewPicture
    } else if (a == 119) {
        d = "idHomePageNewWikiPage";
        c = Strings.STS.L_SPAddNewWiki
    } else if (a == 1230)c = Strings.STS.L_SPAddNewDevApp; else if (a == 330 || a == 332)c = Strings.STS.L_SPAddNewApp;
    this.heroId = d;
    this.addNewText = c;
    var e;
    if (a == 119)e = b.HttpRoot + "/_layouts/15/CreateWebPage.aspx?List=" + b.listName + "&RootFolder=" + b.rootFolder; else if (b.ListSchema.IsDocLib)if (this.WOPIEnabled)e = "#"; else e = b.HttpRoot + "/_layouts/15/Upload.aspx?List=" + b.listName + "&RootFolder=" + b.rootFolder; else if (a == 1230)e = b.HttpRoot + "/_layouts/15/DeployDeveloperApp.aspx"; else e = b.newFormUrl;
    this.addNewUrl = e;
    this.largeSize = Boolean(f.InplaceSearchEnabled)
}
function RenderHeroParameters_InitializePrototype() {
    RenderHeroParameters.prototype = {
        isDocLib: false,
        listTemplate: -1,
        canDragUpload: true,
        WOPIEnabled: false,
        hasInlineEdit: false,
        heroId: "",
        addNewText: "",
        addNewUrl: "",
        largeSize: false
    }
}
function RenderHeroLink(c, g) {
    if (c.inGridMode) {
        var d = '<a class="ms-heroCommandLink" href="javascript:;" onclick="ExitGrid(\'';
        d += c.view;
        d += "'); return false;\"";
        d += " title=";
        d += StAttrQuote(Strings.STS.L_SPStopEditingTitle);
        d += ">";
        return Strings.STS.L_SPStopEditingList.replace(/{(1)}/, "</a>").replace(/{(0)}/, d)
    }
    var a = new RenderHeroParameters(c, g);
    if (!Boolean(a))return "";
    c.heroId = a.heroId;
    var b, f = RenderHeroAddNewLink(a, c);
    if (a.isDocLib && a.listTemplate != 119 && a.canDragUpload) {
        b = Strings.STS.L_SPAddNewAndDrag;
        b = b.replace(/{(0)}/, f)
    } else if (!a.isDocLib && a.hasInlineEdit) {
        b = Strings.STS.L_SPAddNewAndEdit;
        var e = "<a class=\"ms-heroCommandLink\" href=\"javascript:;\" onclick=\"EnsureScriptParams('inplview', 'InitGridFromView', '";
        e += c.view;
        e += "'); return false;\"";
        e += ' title="';
        e += Strings.STS.L_SPEditListTitle;
        e += '">';
        b = b.replace(/{(0)}/, f).replace(/{(1)}/, e).replace(/{(2)}/, "</a>")
    } else b = f;
    return b
}
function RenderHeroAddNewLink(b, c) {
    var a = [];
    a.push('<a id="');
    a.push(b.heroId);
    a.push('" class="ms-heroCommandLink"');
    a.push(' href="');
    a.push(b.addNewUrl);
    a.push('"');
    if (!b.WOPIEnabled) {
        a.push(' data-viewCtr="');
        a.push(c.ctxId);
        a.push('" onclick="NewItem2(event, &quot;');
        a.push(b.addNewUrl);
        a.push('&quot;); return false;" target="_self"')
    }
    a.push(' title="');
    a.push(Strings.STS.L_SPAddNewItemTitle);
    a.push('">');
    if (b.largeSize)a.push('<span class="ms-list-addnew-imgSpan20">'); else a.push('<span class="ms-list-addnew-imgSpan16">');
    a.push('<img id="');
    a.push(b.heroId + "-img");
    a.push('" src="');
    a.push(GetThemedImageUrl("spcommon.png"));
    if (b.largeSize)a.push('" class="ms-list-addnew-img20"/>'); else a.push('" class="ms-list-addnew-img16"/>');
    a.push("</span><span>");
    a.push(b.addNewText);
    a.push("</span></a>");
    b.WOPIEnabled && AddPostRenderCallback(c, CreateNewDocumentCallout);
    return a.join("")
}
function ShouldRenderHeroButton(a) {
    var b = a.ListSchema;
    return !Boolean(a.DisableHeroButton) && (!b.IsDocLib || CanUploadFile(a) || a.ListTemplateType == 119 || Boolean(a.NewWOPIDocumentEnabled)) && b.FolderRight_AddListItems != null && (b.Toolbar == "Freeform" || typeof window["heroButtonWebPart" + a.wpq] != "undefined" && b.Toolbar == "Standard")
}
function CanUploadFile(b) {
    var a = b.ListSchema;
    return Boolean(a) && a.IsDocLib && !browseris.safariMobile && !browseris.windowsphone7
}
function RenderHeroButton(a, b) {
    function d() {
        var WPQ = b.wpq;
        if (eval("typeof DefaultNewButtonWebPart" + WPQ + " != 'undefined'"))if (Boolean(b.heroId)) {
            var eleLink = document.getElementById(b.heroId);
            if (eleLink != null)eval("DefaultNewButtonWebPart" + WPQ + "(eleLink);")
        }
    }

    var c = b.ListSchema, e = b.wpq;
    if (!ShouldRenderHeroButton(b))return;
    a.push('<table id="Hero-');
    a.push(e);
    a.push('" dir="');
    a.push(c.Direction);
    a.push('" cellpadding="0" cellspacing="0" border="0">');
    a.push('<tr><td class="ms-list-addnew ');
    if (c.InplaceSearchEnabled)a.push("ms-textXLarge ms-list-addnew-aligntop"); else a.push("ms-textLarge");
    a.push(' ms-soften">');
    a.push(RenderHeroLink(b, false));
    a.push("</td></tr>");
    a.push("</table>");
    b.ListTemplateType == 115 && AddPostRenderCallback(b, function () {
        setTimeout(d, 0)
    })
}
var DocumentType;
function DocumentInformation(e, b, d, c, a) {
    this.type = e;
    this.idToken = b;
    this.imgSrc = d;
    this.imgAlt = c;
    this.textLabel = a
}
var c_newdocWOPIID, c_newDocDivHtml, c_onClickCreateDoc, c_newDocCalloutWidth, NewDocumentInfo;
function InitializeNewDocumentInfo() {
    var a = {};
    a[DocumentType.Word] = new DocumentInformation(DocumentType.Word, "Word", "/_layouts/15/images/lg_icdocx.png?rev=23", Strings.STS.L_NewDocumentWordImgAlt, Strings.STS.L_NewDocumentWord);
    a[DocumentType.Excel] = new DocumentInformation(DocumentType.Excel, "Excel", "/_layouts/15/images/lg_icxlsx.png?rev=23", Strings.STS.L_NewDocumentExcelImgAlt, Strings.STS.L_NewDocumentExcel);
    a[DocumentType.PowerPoint] = new DocumentInformation(DocumentType.PowerPoint, "PowerPoint", "/_layouts/15/images/lg_icpptx.png?rev=23", Strings.STS.L_NewDocumentPowerPointImgAlt, Strings.STS.L_NewDocumentPowerPoint);
    a[DocumentType.OneNote] = new DocumentInformation(DocumentType.OneNote, "OneNote", "/_layouts/15/images/lg_icont.png?rev=23", Strings.STS.L_NewDocumentOneNoteImgAlt, Strings.STS.L_NewDocumentOneNote);
    a[DocumentType.ExcelForm] = new DocumentInformation(DocumentType.ExcelForm, "ExcelForm", "/_layouts/15/images/lg_icxlsx.png?rev=23", Strings.STS.L_NewDocumentExcelFormImgAlt, Strings.STS.L_NewDocumentExcelForm);
    a[DocumentType.Folder] = new DocumentInformation(DocumentType.Folder, "Folder", "/_layouts/15/images/mb_folder.png?rev=23", Strings.STS.L_NewDocumentFolderImgAlt, Strings.STS.L_NewDocumentFolder);
    return a
}
function NewDocumentCallout_OnOpenedCallback(d) {
    var c = GetNewDocumentCalloutMainID(d), b = document.getElementById(c);
    if (Boolean(b)) {
        var a = b.parentNode;
        if (Boolean(a) && HasCssClass(a, "js-callout-body")) {
            a.style.marginLeft = "0px";
            a.style.marginRight = "0px";
            b.style.marginLeft = "20px";
            b.style.marginRight = "20px"
        }
    }
}
function CreateNewDocumentCallout(a) {
    EnsureScript("callout.js", typeof CalloutManager, function () {
        var d = a.wpq, c = document.getElementById(addWPQtoId(c_newdocWOPIID + "Hero", d));
        if (Boolean(c)) {
            var b = CalloutManager.getFromLaunchPointIfExists(c);
            if (!Boolean(b) && Boolean(a.NewWOPIDocumentUrl)) {
                var e = a.NewWOPIDocumentUrl + "&Source=" + GetSource(), f = RenderNewDocumentCallout(a, e);
                b = CalloutManager.createNewIfNecessary({
                    launchPoint: c,
                    ID: addWPQtoId(c_newdocWOPIID, d),
                    title: Strings.STS.L_NewDocumentCalloutTitle,
                    content: f,
                    onOpenedCallback: function () {
                        NewDocumentCallout_OnOpenedCallback(a)
                    },
                    beakOrientation: "leftRight",
                    contentWidth: c_newDocCalloutWidth,
                    boundingBox: document.getElementById("s4-workspace")
                });
                if (Boolean(b) && CanUploadFile(a)) {
                    var g = a.HttpRoot + "/_layouts/15/Upload.aspx?List=" + a.listName + "&RootFolder=" + a.rootFolder;
                    b.addAction(new CalloutAction({
                        text: Strings.STS.L_NewDocumentUploadFile,
                        onClickCallback: function (a) {
                            CalloutManager.closeAll();
                            NewItem2(a, g);
                            return false
                        }
                    }))
                }
            }
        }
    })
}
function GetNewDocumentCalloutMainID(a) {
    return addWPQtoId(c_newdocWOPIID + "divMain-", a.wpq)
}
function TryLaunchExcelForm(a) {
    EnsureScriptFunc("SP.js", "SP.ClientContext", function () {
        var b = SP.ClientContext.get_current(), c = b.get_site();
        b.load(c);
        b.executeQueryAsync(function () {
            CalloutManager.closeAll();
            if (c.get_shareByLinkEnabled())OpenPopUpPageWithTitle(a + "&TemplateType=" + String(DocumentType.ExcelForm), OnCloseDialogNavigate, null, null, null); else DisplayErrorDialog(Strings.STS.L_CreateExcelSurveyErrorTitle, Strings.STS.L_CreateExcelSurveyError)
        }, function () {
        })
    })
}
function RenderNewDocumentCallout(c, h) {
    var a = [], g = c.wpq;
    a.push('<div id="');
    a.push(GetNewDocumentCalloutMainID(c));
    a.push('" class="ms-newdoc-callout-main">');
    for (var d in NewDocumentInfo) {
        if (Number(d) == DocumentType.ExcelForm && !Boolean(c.CanShareLinkForNewDocument))continue;
        var b = NewDocumentInfo[d];
        if (typeof b != "undefined" && b != null) {
            var e;
            if (Number(d) != DocumentType.Folder)if (Number(d) == DocumentType.ExcelForm)e = "TryLaunchExcelForm('" + h + "'); return false;"; else e = String.format(c_onClickCreateDoc, h, String(b.type)); else if (Boolean(c.AllowCreateFolder)) {
                a.push("<hr/>");
                e = RenderNewFolderUrl(c)
            } else continue;
            var f = c_newdocWOPIID + "div" + b.idToken + "-", i = String.format(c_newDocDivHtml, addWPQtoId(f, g), addWPQtoId(f + "img-", g), b.imgSrc, b.imgAlt, addWPQtoId(f + "txt-", g), e, b.textLabel);
            a.push(i)
        }
    }
    a.push("</div>");
    return a.join("")
}
function RenderNewFolderUrl(b) {
    var a = [];
    a.push("CalloutManager.closeAll(); NewItem2(event, &quot;");
    a.push(b.HttpRoot);
    a.push("/_layouts/15/listform.aspx?ListId=");
    a.push(unescapeProperly(b.listName));
    a.push("&PageType=8");
    a.push("&RootFolder=");
    if (Boolean(b.rootFolder) && b.rootFolder != "")a.push(escapeProperly(unescapeProperly(b.rootFolder))); else a.push(escapeProperly(unescapeProperly(b.listUrlDir)));
    a.push("&Type=1&quot;);return false;");
    return a.join("")
}
function addWPQtoId(a, b) {
    return Boolean(a) && Boolean(b) ? a.lastIndexOf("-") == a.length - 1 ? a + b : a + "-" + b : a
}
function DisplayErrorDialog(d, e) {
    var c = "<div>" + e + "</div><div class='ms-core-form-bottomButtonBox'><button id='js-dnd-OKBtnDismissDlg' onclick='DismissErrDlg(this)'>" + Strings.STS.L_CloseButtonCaption + "</button></div>", b = document.createElement("DIV");
    b.innerHTML = c;
    var f = {
        html: b,
        title: d
    }, g = new SP.UI.ModalDialog.showModalDialog(f), a = document.getElementById("js-dnd-OKBtnDismissDlg");
    Boolean(a) && a.focus()
}
function RenderTitle(a, c, e, b, d) {
    a.push('<a class="ms-listlink" onfocus="OnLink(this)" href="');
    a.push(CreateItemPropertiesTitleUrl(c, e, b));
    a.push('" onclick="EditLink2(this,');
    a.push(c.ctxId);
    a.push(');return false;" target="_self">');
    a.push(Boolean(b.HasTitle) ? d : STSHtmlEncode(d));
    a.push("</a>")
}
function CreateItemPropertiesTitleUrl(b, c) {
    var a = [];
    if (b.inGridMode)a.push(b.editFormUrl); else a.push(b.displayFormUrl);
    a.push("&ID=");
    a.push(c.ID);
    a.push("&ContentTypeID=");
    a.push(c.ContentTypeId);
    return a.join("")
}
function LinkTitleValue(a) {
    return a == "" ? Strings.STS.L_SPClientNoTitle : a
}
function HasEditPermission(b) {
    var a = b.PermMask;
    return (parseInt("0x" + a.substring(a.length - 1)) & 4) != 0
}
var ComputedFieldWorker;
function ComputedFieldRenderer_InitializePrototype() {
    ComputedFieldRenderer.prototype = {RenderField: ComputedFieldRenderField}
}
function ComputedFieldRenderer(a) {
    this.fldName = a;
    this.fieldRenderer = null
}
function ComputedFieldRenderField(c, d, a, b) {
    if (this.fieldRenderer == null)this.fieldRenderer = ComputedFieldWorker[this.fldName];
    return this.fieldRenderer != null ? this.fieldRenderer(c, d, a, b) : STSHtmlEncode(a[this.fldName])
}
var RenderCalloutAffordance, RenderECB, RenderECBinline;
function calloutCreateAjaxMenu(b) {
    var a = GetParentLinkFromEvent(b);
    if (a === null)return;
    itemTable = a.parentNode;
    currentItemID = GetAttributeFromItemTable(itemTable, "ItemId", "Id");
    setupMenuContextName(itemTable.getAttribute("CTXName"));
    CreateAjaxMenu(b)
}
var g_lastLaunchPointIIDClicked;
function OpenCallout(a, b, c, d) {
    if (typeof CalloutManager != "undefined") {
        var e = GetAncestor(c, "TD");
        if (CalloutManager.containsOneCalloutOpen(e))return;
        if (CalloutManager.containsOneCalloutOpen(a))return
    }
    EnsureScriptFunc("callout.js", "Callout", function () {
        if (c.tagName == "DIV") {
            var f = GetParentLinkFromEvent(b);
            if (isInvalidAjaxMenuElement(f)) {
                f = Boolean(b.srcElement) ? b.srcElement : b.target;
                if (isInvalidAjaxMenuElement(f))return undefined
            }
        }
        CalloutManager.closeAll();
        var e = findIIDInAncestorNode(c);
        if (e === null)return false;
        g_lastLaunchPointIIDClicked = e;
        function g() {
            if (e !== g_lastLaunchPointIIDClicked)return;
            var b = CalloutManager.getFromLaunchPointIfExists(a);
            if (b === null) {
                var c = generateUniqueCalloutIDFromBaseID(e);
                b = CalloutManager.createNew({
                    launchPoint: a,
                    ID: c,
                    openOptions: {event: "none", showCloseButton: true, closeCalloutOnBlur: true},
                    onOpeningCallback: function (a) {
                        Callout_OnOpeningCallback(a, d)
                    },
                    onOpenedCallback: function () {
                        a.focus()
                    },
                    beakOrientation: "leftRight",
                    onClosedCallback: ecbManager.DismissECB,
                    contentWidth: parseInt(Strings.STS.L_DocLibCalloutSize),
                    boundingBox: document.getElementById("s4-workspace")
                })
            }
            b.toggle()
        }

        var h = GetCtxRgiidFromIid(e), i = h.ctx;
        if (i.ListSchema.IsDocLib)EnsureScriptFunc("filePreview.js", "filePreviewManager", g); else g();
        return false
    });
    return
}
var RenderCalloutMenu;
function findIIDInAncestorNode(a) {
    while (a !== null && a.tagName !== "TABLE") {
        var b = a.getAttribute("iid");
        if (b !== null && b !== "")return b; else a = a.parentNode
    }
    return null
}
var usedCalloutIDs, generateUniqueCalloutIDFromBaseID;
function GetCalloutElementIDFromCallout(a) {
    return "co" + a.getID() + "_callout"
}
function GetCalloutElementIDFromRenderCtx(a) {
    return "co" + GetCalloutFromRenderCtx(a).getID() + "_callout"
}
function GetCalloutFromRenderCtx(a) {
    return a.CurrentCallout
}
var CALLOUT_STR_ELLIPSIS, CALLOUT_ELLIPSIS_LENGTH, CALLOUT_CHARS_TO_TRUNCATE_PER_ITERATION;
function displayTruncatedString(a, c, e) {
    var b = a.offsetWidth;
    while (a.offsetWidth > e) {
        var d = a.innerHTML.length - CALLOUT_CHARS_TO_TRUNCATE_PER_ITERATION;
        a.innerHTML = safeTruncateString(a.innerHTML, d) + CALLOUT_STR_ELLIPSIS;
        if (a.offsetWidth === b)return a.innerHTML;
        b = a.offsetWidth
    }
    if (a.innerHTML.length < c.length)a.title = c;
    return a.innerHTML
}
function displayTruncatedLocation(a, d) {
    var b = 1 + CALLOUT_ELLIPSIS_LENGTH;
    while (a.offsetHeight > d) {
        var c = a.innerHTML.length - b;
        a.innerHTML = CALLOUT_STR_ELLIPSIS + safeTruncateStringFromStart(a.innerHTML, c)
    }
    return a.innerHTML
}
function displayTruncatedUrl(d, k, j, i) {
    var f = 4, a = new URI(k.getString());
    d.innerHTML = STSHtmlEncode(a.getDecodedStringForDisplay());
    var h = d.offsetWidth;
    while (d.offsetWidth > j) {
        var c = a.getPath(), e = a.getAuthority(), b = a.getQuery(), g = c.indexOf("/", CALLOUT_ELLIPSIS_LENGTH + 2);
        if (g >= 0) {
            c = "/" + CALLOUT_STR_ELLIPSIS + c.substr(g);
            a.setPath(c)
        } else if (i && b.length > CALLOUT_CHARS_TO_TRUNCATE_PER_ITERATION) {
            b = safeTruncateString(b, b.length - CALLOUT_CHARS_TO_TRUNCATE_PER_ITERATION) + CALLOUT_STR_ELLIPSIS;
            a.setQuery(b)
        } else if (e.length > f + CALLOUT_ELLIPSIS_LENGTH) {
            e = safeTruncateString(e, f) + CALLOUT_STR_ELLIPSIS;
            a.setAuthority(e)
        } else if (c.length > CALLOUT_CHARS_TO_TRUNCATE_PER_ITERATION) {
            c = safeTruncateString(c, c.length - CALLOUT_CHARS_TO_TRUNCATE_PER_ITERATION) + CALLOUT_STR_ELLIPSIS;
            a.setPath(c)
        } else if (b.length > CALLOUT_CHARS_TO_TRUNCATE_PER_ITERATION) {
            b = safeTruncateString(b, b.length - CALLOUT_CHARS_TO_TRUNCATE_PER_ITERATION) + CALLOUT_STR_ELLIPSIS;
            a.setQuery(b)
        }
        d.innerHTML = STSHtmlEncode(a.getDecodedStringForDisplay());
        if (d.offsetWidth === h)return d.innerHTML;
        h = d.offsetWidth
    }
    return d.innerHTML
}
function CalloutRenderViewTemplate(a) {
    var b = "";
    b += a.RenderHeader(a);
    b += a.RenderBody(a);
    b += a.RenderFooter(a);
    return b
}
var g_ClipboardControl, g_IsClipboardControlValid;
function EnsureClipboardControl() {
    if (m$.isUndefinedOrNull(g_ClipboardControl))try {
        if (m$.isDefinedAndNotNull(window.ActiveXObject)) {
            g_ClipboardControl = new window.ActiveXObject("SharePoint.ClipboardCtl.1");
            g_IsClipboardControlValid = true
        } else if (IsSupportedMacBrowser()) {
            g_ClipboardControl = CreateMacPlugin();
            g_IsClipboardControlValid = m$.isDefinedAndNotNull(g_ClipboardControl.CopyToClipboard)
        } else if (IsSupportedNPApiBrowserOnWin()) {
            g_ClipboardControl = CreateNPApiOnWindowsPlugin("application/x-sharepoint");
            g_IsClipboardControlValid = m$.isDefinedAndNotNull(g_ClipboardControl.CopyToClipboard)
        }
    } catch (a) {
        g_ClipboardControl = null;
        g_IsClipboardControlValid = false
    }
    return g_IsClipboardControlValid
}
function GetClientAppNameFromMapApp(b) {
    var a = {
        excel: "Microsoft Excel",
        onenote: "Microsoft OneNote",
        powerpoint: "Microsoft PowerPoint",
        project: "Microsoft Project",
        publisher: "Microsoft Publisher",
        visio: "Microsoft Visio",
        word: "Microsoft Word",
        infopath: "Microsoft InfoPath"
    };
    return b in a ? a[b] : null
}
function CopyToClipboard(b, a) {
    EnsureClipboardControl() && g_ClipboardControl.CopyToClipboard(b, a)
}
function CalloutRenderHeaderTemplate(a) {
    var c = GetCalloutElementIDFromRenderCtx(a), b = "";
    if (a.ListSchema.IsDocLib == "1")b = a.CurrentItem.FileLeafRef; else b = a.CurrentItem.Title;
    return Callout.GenerateDefaultHeader(c, STSHtmlEncode(b), null, true)
}
function CalloutRenderFooterTemplate(a, b, d) {
    if (typeof b === "undefined" || b === null)b = CalloutOnPostRenderTemplate;
    if (typeof d === "undefined" || d === null)d = true;
    var e = GetCalloutElementIDFromRenderCtx(a);
    AddPostRenderCallback(a, function () {
        var c = new CalloutActionMenu(e + "-actions");
        b(a, c);
        c.render()
    });
    var c = [];
    if (d) {
        c.push("<span id=" + StAttrQuote(e + "-ecbMenu") + ' class="js-callout-actions js-callout-ecbActionDownArrow">');
        c.push(RenderECBinline(a, a.CurrentItem, a.CurrentFieldSchema));
        c.push("</span>")
    }
    return Callout.GenerateDefaultFooter(e, c.join(""))
}
function CalloutRenderFooterArea(a) {
    return Callout.GenerateDefaultFooter(a, null)
}
function GetCallOutOpenText(a, c) {
    var b = Boolean(a.CheckoutUser) ? a.CheckoutUser[0].id : "";
    return a != null && HasEditPermission(a) && (!Boolean(b) || b == c.CurrentUserId) && (IsClientAppInstalled(a["File_x0020_Type.progid"], a["File_x0020_Type.mapapp"], null) || isDefinedAndNotNullOrEmpty(a["serverurl.progid"]) && isDefinedAndNotNullOrEmpty(a["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"])) ? Strings.STS.L_CalloutEditAction : Strings.STS.L_CalloutOpenAction
}
function CalloutOnPostRenderTemplate(a, b) {
    var c = a.CurrentItem, d = GetCallOutOpenText(c, a);
    b.addAction(new CalloutAction({
        text: d, onClickCallback: function (b, c) {
            CalloutAction_Open_OnClick(b, c, a)
        }
    }));
    b.addAction(new CalloutAction({
        text: Strings.STS.L_CalloutShareAction, onClickCallback: function (b, c) {
            CalloutAction_Share_OnClick(b, c, a)
        }, isVisibleCallback: function (b) {
            return CalloutAction_Share_IsVisible(b, a)
        }
    }))
}
function CalloutRenderBodyTemplate(a) {
    var e = a.Templates.Item;
    if (e == null || e == {})return "";
    var j = a.ListData, i = a.ListSchema, h = a.Templates.Header != "", c = a.Templates.Group;
    if (c == null || c == RenderItemTemplateDefault || typeof c != "function" && typeof c != "string")c = RenderGroupTemplate; else if (typeof c == "string")c = SPClientRenderer.ParseTemplateString(c, a);
    var b = a.Templates.Item;
    if (b == null || b == RenderFieldTemplateDefault || typeof b != "function" && typeof b != "string")b = RenderItemTemplate; else if (typeof b == "string")b = SPClientRenderer.ParseTemplateString(b, a);
    var g = a.CurrentItem, f = g.ItemType, d = e[f];
    if (d == null || d == "")d = b; else if (typeof d == "string") {
        d = SPClientRenderer.ParseTemplateString(d, a);
        e[f] = d
    }
    return Callout.GenerateDefaultBody(GetCalloutElementIDFromRenderCtx(a), CoreRender(d, a))
}
function isPositiveInteger(b) {
    var a = /^[1-9][0-9]*$/;
    return a.test(b)
}
function createOneTimeCallback(a) {
    return function () {
        var b = false;
        return function () {
            if (b)return;
            b = true;
            return a.apply(this, arguments)
        }
    }()
}
function EnableSharingDialogIfNeeded(b) {
    var a = createOneTimeCallback(function (b) {
        var c = new URI(ajaxNavigate.get_href()), a = c.getQueryParameter("sharingDialogForListItemId");
        if (a)isPositiveInteger(a) && DisplaySharingDialogForListItem(b, a)
    });
    AddPostRenderCallback(b, a)
}
function CalloutRenderFilePreview(b) {
    var f = b.CurrentItem, a = GetCalloutFromRenderCtx(b);
    if (m$.isUndefined(a.listItemPreviewer)) {
        a.listItemPreviewer = filePreviewManager.createPreviewFromListItem(b, f);
        AddPostRenderCallback(b, function () {
            a.listItemPreviewer.onPostRender();
            a.isOpen() && a.listItemPreviewer.onVisible();
            a.addEventCallback("opened", function () {
                a.listItemPreviewer.onVisible()
            });
            a.addEventCallback("closing", function () {
                a.listItemPreviewer.onHidden()
            })
        })
    }
    if (m$.isDefinedAndNotNull(a.listItemPreviewer)) {
        var d = a.getContentWidth(), c = a.listItemPreviewer.getWidth() + 60;
        c !== null && c > d && a.set({contentWidth: c})
    }
    var e = a.listItemPreviewer.getHtml();
    return Callout.GenerateDefaultSection(null, e)
}
function GetCalloutSharingStatusDivId(a) {
    return GetCalloutElementIDFromRenderCtx(a) + "SharedWithInfo"
}
function CalloutRenderSharingStatus(a) {
    AddPostRenderCallback(a, CalloutPostRenderSharingStatus);
    return CalloutRenderSharingStatusDiv(a)
}
function CalloutPostRenderSharingStatus(b) {
    var a = b.CurrentItem;
    if (permMaskContains(a.PermMask, 0, 131072)) {
        var k = GetCalloutFromRenderCtx(b), c = getViewCtxFromCalloutCtx(b), j = GetCalloutSharingStatusDivId(b), i = function (d, n) {
            var m = d.get_isSharedWithMany(), i = d.get_isSharedWithSecurityGroup(), l = d.get_isSharedWithGuest() && (isDefinedAndNotNullOrEmpty(d.get_anonymousEditLink()) || isDefinedAndNotNullOrEmpty(d.get_anonymousViewLink())), f = null;
            if (isDefinedAndNotNullOrEmpty(a.FileLeafRef))f = a.FileLeafRef; else if (isDefinedAndNotNullOrEmpty(a.Title))f = a.Title;
            var g = [], h = n.getEnumerator();
            while (h.moveNext()) {
                var e = h.get_current(), o = {
                    id: e.get_id(),
                    title: e.get_name(),
                    email: e.get_email(),
                    sip: e.get_email()
                };
                g.push(o)
            }
            EnsureScriptFunc("sharing.js", "GetSharingStatusHtml", function () {
                var e = document.getElementById(j), h = GetSharingStatusHtml(g, m, i, l, false, c.ListSchema.UserDispUrl, f, c, k);
                if (h.length > 0) {
                    e.innerHTML = Callout.GenerateDefaultSection(null, h);
                    e.calloutRenderCtx = b;
                    e.objectSharingInformation = d
                }
                window.setTimeout(function () {
                    ApplySharingListStyles(e);
                    m$(e).find(".js-callout-sharedWithLink").click(function () {
                        var d = GetCalloutFromRenderCtx(b);
                        m$.isDefinedAndNotNull(d) && d.close();
                        DisplaySharedWithDialog(c.HttpRoot, c.listName, a.ID);
                        return false
                    })
                }, 0)
            })
        }, d = SP.ClientContext.get_current(), e = SP.ObjectSharingInformation.getListItemSharingInformation(d, c.listName, a.ID, true, false, true, true, false, false), f = e.getSharedWithUsers(d);
        d.load(e, "IsSharedWithMany", "IsSharedWithSecurityGroup", "IsSharedWithGuest", "CanManagePermissions", "AnonymousEditLink", "AnonymousViewLink");
        d.load(f);
        var g = function () {
            i(e, f)
        }, h = function () {
        };
        d.executeQueryAsync(g, h)
    }
}
function CalloutRenderSection(a, b) {
    Callout.GenerateDefaultSection(a, b)
}
function CalloutRenderSharingStatusDiv(c) {
    var b = GetCalloutSharingStatusDivId(c), a = '<div class="js-callout-sharedWithInfo" id=' + StAttrQuote(b) + "></div>";
    return a
}
function CalloutRenderLastModifiedInfo(b) {
    var c = [], a = b.CurrentItem, g = GetCalloutElementIDFromRenderCtx(b), e = g + "Modified";
    c.push("<span id=", StAttrQuote(e), ">");
    var d = function (h, d, f, g, e) {
        var a = "", i = false;
        if (h == b.CurrentUserId) {
            a = Strings.STS.L_CalloutLastEditedYou;
            i = true
        } else if (m$.isUndefinedOrNull(g) || m$.isUndefinedOrNull(f))a = STSHtmlEncode(d); else {
            var l = _spPageContextInfo.webServerRelativeUrl, k = {
                ID: "0",
                Editor: [{id: h, title: d, email: f, sip: g}]
            }, j = {
                Field: [{Name: "Editor", FieldType: "User", DefaultRender: "1", HasUserLink: "1", Type: "User"}],
                EffectivePresenceEnabled: "1",
                PresenceAlt: "No presence information",
                UserDispUrl: GetUrlFromWebUrlAndWebRelativeUrl(l, "_layouts/15/userdisp.aspx")
            }, c = new ContextInfo;
            c.Templates = {};
            c.Templates.Fields = {};
            a = spMgr.RenderFieldByName(c, "Editor", k, j)
        }
        return i && Boolean(Strings.STS.L_CalloutLastEditedNameAndDate2) ? StBuildParam(Strings.STS.L_CalloutLastEditedNameAndDate2, e) : StBuildParam(Strings.STS.L_CalloutLastEditedNameAndDate, a, e)
    };
    if (m$.isDefinedAndNotNull(a.Editor) && m$.isDefinedAndNotNull(a.Editor[0]) && m$.isDefinedAndNotNull(a.Modified))c.push(d(a.Editor[0].id, a.Editor[0].title, a.Editor[0].email, a.Editor[0].sip, a.Modified)); else AddPostRenderCallback(b, function () {
        var c = SP.ClientContext.get_current(), i = c.get_web().get_lists().getById(b.listName), g = i.getItemById(a.ID), h = function () {
            var a = g.get_fieldValues();
            if (m$.isDefinedAndNotNull(a.Editor) && m$.isDefinedAndNotNull(a.Modified)) {
                var b = SP.Utilities.Utility.formatDateTime(c, c.get_web(), a.Modified, SP.Utilities.DateTimeFormat.dateTime), h = function () {
                    var c = document.getElementById(e);
                    c.innerHTML = d(a.Editor.get_lookupId(), a.Editor.get_lookupValue(), null, null, b.get_value())
                };
                c.executeQueryAsync(h, f)
            }
        }, f = function () {
        };
        c.load(g);
        c.executeQueryAsync(h, f)
    });
    c.push("&nbsp;</span>");
    var f = c.join("");
    return Callout.GenerateDefaultSection(null, f)
}
function CalloutRenderSourceUrl(b) {
    var a = [], c = b.CurrentItem, i = GetCalloutElementIDFromRenderCtx(b), h = i + "SourceUrl", j = b.ListSchema.IsDocLib === "1", d = null;
    if (j) {
        var m = getHostUrl(b.HttpRoot), k = c.FileRef;
        d = new URI(b.HttpRoot);
        d.setPath(k)
    } else d = new URI(CreateItemPropertiesTitleUrl(b, c, b.ListSchema));
    var l = d.getDecodedStringForDisplay(), g = d.getString(), f = new URI(GetRedirectedHref(g, b.ListSchema.DefaultItemOpen, c["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"], c.HTML_x0020_File_x0020_Type, c["serverurl.progid"], c.FSObjType == "1", true, null));
    a.push('<input id="');
    a.push(h);
    a.push('" value="');
    a.push(f.getString());
    a.push('" class="js-callout-location" ');
    a.push('onclick="javascript: this.select();" ');
    a.push('onblur="javascript: this.value = this.defaultValue;" ');
    a.push("/>");
    var e = a.join("");
    return Callout.GenerateDefaultSection(null, e)
}
function CalloutRenderItemTemplate(a) {
    var b = [];
    a.ListSchema.IsDocLib && b.push(CalloutRenderFilePreview(a));
    b.push(CalloutRenderLastModifiedInfo(a));
    b.push(CalloutRenderSharingStatus(a));
    b.push(CalloutRenderSourceUrl(a));
    return b.join("")
}
function getItemIDFromIID(b) {
    var a = b.split(",");
    return a[1]
}
function getItemIdxByID(b, c) {
    for (var a = 0; a < b.length; a++)if (b[a].ID == c)return a;
    return -1
}
function permMaskContains(a, d, e) {
    var b = GetPermMaskH(a), c = GetPermMaskL(a);
    return CheckIfHasRights(d, e, b, c)
}
function getCtxFromCtxNum(a) {
    return window["ctx" + a]
}
function getViewCtxFromCalloutCtx(a) {
    return getCtxFromCtxNum(a.ctxId)
}
function smartOpenFileOrFolderFromHref(c, d, a, b) {
    if (a.FSObjType === "1") {
        VerifyFolderHref(d, c, a["File_x0020_Type.url"], ["File_x0020_Type.progid"], b.DefaultItemOpen, a["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"], a.HTML_x0020_File_x0020_Type, a["serverurl.progid"]);
        HandleFolder(d, c, b.PagePath + "?RootFolder=" + escapeProperly(a.FileRef) + b.ShowWebPart + "&FolderCTID=" + a.ContentTypeId + "&View=" + escapeProperly(b.View), "TRUE", "FALSE", a["File_x0020_Type.url"], a["File_x0020_Type.progid"], b.DefaultItemOpen, a["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"], a.HTML_x0020_File_x0020_Type, a["serverurl.progid"], Boolean(a.CheckoutUser) ? a.CheckoutUser[0].id : "", b.Userid, b.ForceCheckout, a.IsCheckedoutToLocal, a.PermMask)
    } else {
        VerifyHref(d, c, b.DefaultItemOpen, a["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"], a["serverurl.progid"]);
        DispEx(d, c, "TRUE", "FALSE", a["File_x0020_Type.url"], a["File_x0020_Type.progid"], b.DefaultItemOpen, a["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"], a.HTML_x0020_File_x0020_Type, a["serverurl.progid"], Boolean(a.CheckoutUser) ? a.CheckoutUser[0].id : "", b.Userid, b.ForceCheckout, a.IsCheckedoutToLocal, a.PermMask)
    }
}
function CalloutAction_Open_OnClick(e, f, c) {
    var b = e.target, d = c.ListSchema, a = c.CurrentItem;
    if (m$.isUndefinedOrNull(a) || m$.isUndefinedOrNull(a.ID))throw"Error: listItem is missing properties";
    if (d.IsDocLib == "1" || a.FSObjType == "1") {
        b.setAttribute("href", getHostUrl(c.HttpRoot) + a.FileRef);
        b.setAttribute("isEdit", "1");
        b.setAttribute("App", a["File_x0020_Type.mapapp"])
    } else b.setAttribute("href", CreateItemPropertiesTitleUrl(c, a, d));
    smartOpenFileOrFolderFromHref(e.originalEvent, b, a, d);
    b.removeAttribute("isEdit");
    b.removeAttribute("App")
}
function CalloutAction_Share_OnClick(c, d, a) {
    var b = GetCalloutFromRenderCtx(a);
    m$.isDefinedAndNotNull(b) && b.close();
    DisplaySharingDialogForListItem(a)
}
function DisplaySharingDialogForListItem(b, a) {
    EnsureScriptFunc("sharing.js", "DisplaySharingDialog", function () {
        if (typeof a === "undefined") {
            var c = b.CurrentItem;
            a = c.ID
        }
        DisplaySharingDialog(b.HttpRoot, b.listName, a)
    })
}
function CalloutAction_Share_IsVisible(c, a) {
    if (!Boolean(_spPageContextInfo.userId))return false;
    var b = a.CurrentItem;
    return m$.isUndefinedOrNull(b) ? false : true
}
function safeTruncateString(b, a) {
    if (a < 0)throw"Error: Negative number of characters is invalid parameter";
    var c = b.charCodeAt(a - 1);
    if ((c & SURROGATE_6_BIT) === HIGH_SURROGATE_BITS)a = a - 1;
    return b.substr(0, a)
}
function safeTruncateStringFromStart(b, a) {
    if (a < 0)throw"Error: Negative number of characters is invalid parameter";
    var c = b.charCodeAt(b.length - a);
    if ((c & SURROGATE_6_BIT) === HIGH_SURROGATE_BITS)a = a - 1;
    return b.substr(b.length - a, b.length - 1)
}
function getHostUrl(b) {
    var a = b;
    if (a.lastIndexOf("/") > a.indexOf("//") + 1)a = a.substring(0, a.indexOf("/", a.indexOf("//") + 2));
    return a
}
function isDefinedAndNotNullOrEmpty(a) {
    return typeof a !== "undefined" && a !== null && a !== ""
}
function EnsureFileLeafRefName(a) {
    if (typeof a["FileLeafRef.Name"] == "undefined") {
        var b = a.FileLeafRef, c = b.lastIndexOf(".");
        if (c >= 0)a["FileLeafRef.Name"] = b.substring(0, c); else a["FileLeafRef.Name"] = b
    }
}
function EnsureFileLeafRefSuffix(a) {
    if (typeof a["FileLeafRef.Suffix"] == "undefined") {
        var b = a.FileLeafRef, c = b.lastIndexOf(".");
        if (c >= 0)a["FileLeafRef.Suffix"] = b.substring(c + 1); else a["FileLeafRef.Suffix"] = ""
    }
}
function EnsureFileDirRef(a) {
    if (typeof a.FileDirRef == "undefined") {
        var b = a.FileRef, c = b.indexOf("/"), d = b.lastIndexOf("/");
        if (d >= 0)a.FileDirRef = b.substring(c, d - c); else a.FileDirRef = ""
    }
}
var getDocumentIconAbsoluteUrl, displayGenericDocumentIcon, Callout_OnOpeningCallback, GenerateCtx;
function EncodeUrl(a) {
    return typeof a != "undefined" && a != null ? a.replace(/"/g, "%22") : ""
}
function RenderUrl(e, f, h, g, d) {
    var a = [], c = e[f], b = e[f + ".desc"];
    if (g.Format == "Image") {
        if (isDefinedAndNotNullOrEmpty(c)) {
            a.push("<img ");
            d && a.push('onfocus="OnLink(this)" ');
            a.push('src="');
            a.push(EncodeUrl(c));
            a.push('" alt="');
            a.push(b);
            a.push('"/>')
        }
    } else if (g.Format == "Hyperlink")if (!isDefinedAndNotNullOrEmpty(c))b != null && a.push(b); else {
        a.push("<a ");
        d && a.push('onfocus="OnLink(this)" ');
        a.push('href="');
        a.push(EncodeUrl(c));
        Boolean(ajaxNavigate.get_search().match(RegExp("[?&]IsDlg=1"))) && a.push('" target="_blank');
        a.push('">');
        if (b == "")a.push(STSHtmlEncode(c)); else a.push(STSHtmlEncode(b));
        a.push("</a>")
    }
    return a.join("")
}
function ResolveId(a) {
    return a.EventType == "4" ? a.ID + ".1." + a.MasterSeriesItemID : a.ID
}
function EditRequiresCheckout(a, b) {
    return b.ForceCheckout == "1" && a.FSObjType != "1" && !(typeof a.CheckoutUser == "undefined" || a.CheckoutUser == "") ? "1" : ""
}
function AppendAdditionalQueryStringToFolderUrl(b, c) {
    var a = b.AdditionalQueryString;
    if (typeof a == "undefined" || a == "")return;
    c.push(a)
}
function FolderUrl(c, b, a) {
    a.push(b.PagePath);
    a.push("?RootFolder=");
    a.push(escapeProperly(c.FileRef));
    a.push(b.ShowWebPart);
    a.push("&FolderCTID=");
    a.push(c.ContentTypeId);
    a.push("&View=");
    a.push(escapeProperly(b.View));
    AppendAdditionalQueryStringToFolderUrl(c, a)
}
function RenderListFolderLink(a, d, c, b) {
    a.push('<a onfocus="OnLink(this)" href="');
    FolderUrl(c, b, a);
    a.push('" onclick="');
    a.push("javascript:EnterFolder('");
    a.push(b.PagePath);
    a.push("?RootFolder=");
    a.push(escapeProperly(c.FileRef));
    a.push(b.ShowWebPart);
    a.push("&FolderCTID=");
    a.push(c.ContentTypeId);
    a.push("&View=");
    a.push(escapeProperly(b.View));
    AppendAdditionalQueryStringToFolderUrl(c, a);
    a.push("');return false;\">");
    a.push(STSHtmlEncode(d));
    a.push("</a>")
}
function RenderDocFolderLink(a, d, b, c) {
    a.push('<a onfocus="OnLink(this)" class="ms-listlink" href="');
    FolderUrl(b, c, a);
    a.push('" onmousedown="');
    a.push("javascript:VerifyFolderHref(this,event,'");
    a.push(b["File_x0020_Type.url"]);
    a.push("','");
    a.push(b["File_x0020_Type.progid"]);
    a.push("','");
    a.push(c.DefaultItemOpen);
    a.push("','");
    a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"]);
    a.push("','");
    a.push(b.HTML_x0020_File_x0020_Type);
    a.push("','");
    a.push(b["serverurl.progid"]);
    a.push('\');return false;" onclick="');
    a.push("return HandleFolder(this,event,'");
    a.push(c.PagePath);
    a.push("?RootFolder=");
    a.push(escapeProperly(b.FileRef));
    a.push(c.ShowWebPart);
    a.push("&FolderCTID=");
    a.push(b.ContentTypeId);
    a.push("&View=");
    a.push(escapeProperly(c.View));
    AppendAdditionalQueryStringToFolderUrl(b, a);
    a.push("','TRUE','FALSE','");
    a.push(b["File_x0020_Type.url"]);
    a.push("','");
    a.push(b["File_x0020_Type.progid"]);
    a.push("','");
    a.push(c.DefaultItemOpen);
    a.push("','");
    a.push(b["HTML_x0020_File_x0020_Type.File_x0020_Type.mapcon"]);
    a.push("','");
    a.push(b.HTML_x0020_File_x0020_Type);
    a.push("','");
    a.push(b["serverurl.progid"]);
    a.push("','");
    a.push(Boolean(b.CheckoutUser) ? b.CheckoutUser[0].id : "");
    a.push("','");
    a.push(c.Userid);
    a.push("','");
    a.push(c.ForceCheckout);
    a.push("','");
    a.push(b.IsCheckedoutToLocal);
    a.push("','");
    a.push(b.PermMask);
    a.push("');\">");
    a.push(STSHtmlEncode(d));
    a.push("</a>")
}
function FieldRenderer_InitializePrototype() {
    FieldRenderer.prototype = {RenderField: FieldRendererRenderField}
}
function FieldRenderer(a) {
    this.fldName = a
}
function FieldRendererRenderField(c, d, a) {
    return STSHtmlEncode(a[this.fldName])
}
function RawFieldRenderer_InitializePrototype() {
    RawFieldRenderer.prototype = {RenderField: RawFieldRendererRenderField}
}
function RawFieldRenderer(a) {
    this.fldName = a
}
function RawFieldRendererRenderField(c, d, a) {
    return a[this.fldName]
}
function AttachmentFieldRenderer_InitializePrototype() {
    AttachmentFieldRenderer.prototype = {RenderField: AttachmentFieldRendererRenderField}
}
function AttachmentFieldRenderer(a) {
    this.fldName = a
}
function AttachmentFieldRendererRenderField(d, e, a) {
    var b = a[this.fldName];
    return b != "0" ? '<img border="0" width="16" height="16" src="' + GetThemedImageUrl("attach16.png") + '"/>' : ""
}
function RecurrenceFieldRenderer_InitializePrototype() {
    RecurrenceFieldRenderer.prototype = {RenderField: RecurrenceFieldRendererRenderField}
}
function RecurrenceFieldRenderer(a) {
    this.fldName = a
}
function RecurrenceFieldRendererRenderField(f, g, c) {
    var d = c[this.fldName], a = '<img border="0" width="16" height="16" src="';
    a += "/_layouts/15/images/";
    if (d == "1") {
        var b = c.EventType;
        if (b == "3" || b == "4")a += "recurEx.gif"; else a += "recur.gif"
    } else a += "blank.gif";
    a += '" alt="';
    a += Strings.STS.L_SPMeetingWorkSpace;
    a += '" title="';
    a += Strings.STS.L_SPMeetingWorkSpace;
    a += '"/>';
    return a
}
function ProjectLinkFieldRenderer_InitializePrototype() {
    ProjectLinkFieldRenderer.prototype = {RenderField: ProjectLinkFieldRendererRenderField}
}
function ProjectLinkFieldRenderer(a) {
    this.fldName = a
}
function ProjectLinkFieldRendererRenderField(d, e, b) {
    if (!(b.WorkspaceLink == "1" || b.WorkspaceLink == "-1"))return '<img border="0" width="16" height="16" src="/_layouts/15/images/blank.gif" />'; else {
        var a = '<a href="';
        a += b.Workspace;
        a += '" target="_self" title="';
        a += Strings.STS.L_SPMeetingWorkSpace;
        a += '"><img border="" src="' + GetThemedImageUrl("mtgicon.gif") + '" alt="';
        a += Strings.STS.L_SPMeetingWorkSpace;
        a += '"/></a>';
        return a
    }
}
function AllDayEventFieldRenderer_InitializePrototype() {
    AllDayEventFieldRenderer.prototype = {RenderField: AllDayEventFieldRendererRenderField}
}
function AllDayEventFieldRenderer(a) {
    this.fldName = a
}
function AllDayEventFieldRendererRenderField(c, d, a) {
    return a[this.fldName] == Strings.STS.L_SPYes ? Strings.STS.L_SPYes : ""
}
function NumberFieldRenderer_InitializePrototype() {
    NumberFieldRenderer.prototype = {RenderField: NumberFieldRendererRenderField}
}
function NumberFieldRenderer(a) {
    this.fldName = a
}
function NumberFieldRendererRenderField(c, d, a) {
    return '<div align="right" class="ms-number">' + a[this.fldName] + "</div>"
}
function BusinessDataFieldRenderer_InitializePrototype() {
    BusinessDataFieldRenderer.prototype = {RenderField: BusinessDataFieldRendererRenderField}
}
function BusinessDataFieldRenderer(a) {
    this.fldName = a
}
function BusinessDataFieldRendererRenderField(c, f, e) {
    var b = c.CurrentFieldSchema, i = e[this.fldName];
    if (i == "")i = Strings.STS.L_BusinessDataField_Blank;
    var a = '<table cellpadding="0" cellspacing="0" style="display=inline">';
    a += "<tr>";
    if (Boolean(b.HasActions)) {
        a += '<td><input type="hidden" name="BusinessDataField_ActionsMenuProxyPageWebUrl" id="BusinessDataField_ActionsMenuProxyPageWebUrl" value="' + c.HttpRoot + '" />';
        a += '<div style="display=inline">';
        a += '<table cellspacing="0">';
        a += "<tr>";
        a += '<td class="ms-vb" valign="top" nowrap="nowrap">';
        a += '<span class="ms-SPLink ms-hovercellinactive" onmouseover="this.className=\'ms-SPLink ms-HoverCellActive\';" onmouseout="this.className=\'ms-SPLink ms-HoverCellInactive\';">';
        var h = "", g = "", d = "";
        if (Boolean(c.ExternalDataList)) {
            d = "'" + Strings.STS.L_BusinessDataField_ActionMenuLoadingMessage + "',null,true,'" + c.LobSystemInstanceName + "','" + c.EntityNamespace + "','" + c.EntityName + "','" + c.SpecificFinderName + "','" + b.AssociationName + "','" + b.SystemInstanceName + "','" + b.EntityNamespace + "','" + b.EntityName + "','" + e.ID + "', event";
            h = "showActionMenuInExternalList(" + d + ")";
            g = "actionMenuOnKeyDownInExternalList(" + d + ")"
        } else if (typeof f.RelatedField != "undefined" && f.RelatedField != "" && typeof e[f.RelatedField] != "undefined" && e[f.RelatedField] != "") {
            d = "'" + Strings.STS.L_BusinessDataField_ActionMenuLoadingMessage + "',null,true,'" + b.SystemInstanceName + "','" + b.EntityNamespace + "','" + b.EntityName + "','" + e[f.RelatedField] + "', event";
            h = "showActionMenu(" + d + ")";
            g = "actionMenuOnKeyDown(" + d + ")"
        }
        a += '<a style="cursor:hand;white-space:nowrap;">';
        a += '<img border="0" align="absmiddle" src=/_layouts/15/images/bizdataactionicon.gif?rev=23 tabindex="0" alt="' + Strings.STS.L_BusinessDataField_ActionMenuAltText + '" title="' + Strings.STS.L_BusinessDataField_ActionMenuAltText + '"';
        a += ' onclick="' + h + '"';
        a += ' onkeydown="' + g + '" />';
        a += "</a>";
        a += "<a>";
        a += '<img align="absmiddle" src=/_layouts/15/images/menudark.gif?rev=23 tabindex="0" alt="' + Strings.STS.L_BusinessDataField_ActionMenuAltText + '"';
        a += ' onclick="' + h + '"';
        a += ' onkeydown="' + g + '" />';
        a += "</a>";
        a += "</span>";
        a += "</td>";
        a += "</tr>";
        a += "</table>";
        a += "</div>";
        a += '<div STYLE="display=inline" />';
        a += "</td>"
    }
    a += '<td class="ms-vb">';
    if (b.Profile != "" && b.ContainsDefaultAction == "True")a += '<a href="' + c.HttpRoot + b.Profile + e[f.RelatedField] + '" >' + i + "</a>"; else a += i;
    a += "</td>";
    a += "</tr>";
    a += "</table>";
    return a
}
function DateTimeFieldRenderer_InitializePrototype() {
    DateTimeFieldRenderer.prototype = {RenderField: DateTimeFieldRendererRenderField}
}
function DateTimeFieldRenderer(a) {
    this.fldName = a
}
function DateTimeFieldRendererRenderField(g, h, e) {
    var b = e[this.fldName];
    if (b == null)return "";
    var c = e[this.fldName + ".FriendlyDisplay"], a = null;
    if (c != null && c != "")a = GetRelativeDateTimeString(c);
    var d = '<span class="ms-noWrap" title="' + b + '">';
    d += a != null && a != "" ? a : b;
    d += "</span>";
    return d
}
function GetRelativeDateTimeString(g) {
    var b = null, c = null, d = g.split("|");
    if (d[0] == "0")return g.substring(2);
    var a = d[1] == "1", h = d[2], e = d.length >= 4 ? d[3] : null, f = d.length >= 5 ? d[4] : null;
    switch (h) {
        case"1":
            b = a ? Strings.STS.L_RelativeDateTime_AFewSecondsFuture : Strings.STS.L_RelativeDateTime_AFewSeconds;
            break;
        case"2":
            b = a ? Strings.STS.L_RelativeDateTime_AboutAMinuteFuture : Strings.STS.L_RelativeDateTime_AboutAMinute;
            break;
        case"3":
            c = GetLocalizedCountValue(a ? Strings.STS.L_RelativeDateTime_XMinutesFuture : Strings.STS.L_RelativeDateTime_XMinutes, a ? Strings.STS.L_RelativeDateTime_XMinutesFutureIntervals : Strings.STS.L_RelativeDateTime_XMinutesIntervals, Number(e));
            break;
        case"4":
            b = a ? Strings.STS.L_RelativeDateTime_AboutAnHourFuture : Strings.STS.L_RelativeDateTime_AboutAnHour;
            break;
        case"5":
            if (e == null)b = a ? Strings.STS.L_RelativeDateTime_Tomorrow : Strings.STS.L_RelativeDateTime_Yesterday; else c = a ? Strings.STS.L_RelativeDateTime_TomorrowAndTime : Strings.STS.L_RelativeDateTime_YesterdayAndTime;
            break;
        case"6":
            c = GetLocalizedCountValue(a ? Strings.STS.L_RelativeDateTime_XHoursFuture : Strings.STS.L_RelativeDateTime_XHours, a ? Strings.STS.L_RelativeDateTime_XHoursFutureIntervals : Strings.STS.L_RelativeDateTime_XHoursIntervals, Number(e));
            break;
        case"7":
            if (f == null)b = e; else c = Strings.STS.L_RelativeDateTime_DayAndTime;
            break;
        case"8":
            c = GetLocalizedCountValue(a ? Strings.STS.L_RelativeDateTime_XDaysFuture : Strings.STS.L_RelativeDateTime_XDays, a ? Strings.STS.L_RelativeDateTime_XDaysFutureIntervals : Strings.STS.L_RelativeDateTime_XDaysIntervals, Number(e));
            break;
        case"9":
            b = Strings.STS.L_RelativeDateTime_Today
    }
    if (c != null) {
        b = c.replace("{0}", e);
        if (f != null)b = b.replace("{1}", f)
    }
    return b
}
function GetLocalizedCountValue(m, l, f) {
    if (m == undefined || l == undefined || f == undefined)return null;
    var o = "", a = -1, h = [];
    Array.addRange(h, l.split("||"));
    for (var c = 0, r = h.length; c < r; c++) {
        var i = h[c];
        if (i == null || i == "")continue;
        var g = [];
        Array.addRange(g, i.split(","));
        for (var k = 0, q = g.length; k < q; k++) {
            var d = g[k];
            if (d == null || d == "")continue;
            if (isNaN(Number.parseInvariant(d))) {
                var b = d.split("-");
                if (b == null || b.length !== 2)continue;
                var j, n;
                if (b[0] === "")j = 0; else if (isNaN(Number.parseInvariant(b[0])))continue; else j = parseInt(b[0]);
                if (f >= j) {
                    if (b[1] === "") {
                        a = c;
                        break
                    } else if (isNaN(Number.parseInvariant(b[1])))continue; else n = parseInt(b[1]);
                    if (f <= n) {
                        a = c;
                        break
                    }
                }
            } else {
                var p = parseInt(d);
                if (f === p) {
                    a = c;
                    break
                }
            }
        }
        if (a !== -1)break
    }
    if (a !== -1) {
        var e = m.split("||");
        if (e != null && e[a] != null && e[a] != "")o = e[a]
    }
    return o
}
function GetDaysAfterToday(d) {
    if (!("currentDateInLocalCalendar" in _spRegionalSettings))return 0;
    var a = _spRegionalSettings.currentDateInLocalCalendar;
    if (a == null)return 0;
    var b = new Date(a.getFullYear(), a.getMonth(), a.getDate()), e = d.getTime(), f = b.getTime(), c = e - f;
    return Math.floor(c / 864e5)
}
function TextFieldRenderer_InitializePrototype() {
    TextFieldRenderer.prototype = {RenderField: TextFieldRendererRenderField}
}
function TextFieldRenderer(a) {
    this.fldName = a
}
function TextFieldRendererRenderField(d, b, a) {
    return b.AutoHyperLink != null ? a[this.fldName] : STSHtmlEncode(a[this.fldName])
}
function LookupFieldRenderer_InitializePrototype() {
    LookupFieldRenderer.prototype = {RenderField: LookupFieldRendererRenderField}
}
function LookupFieldRenderer(a) {
    this.fldName = a
}
function LookupFieldRendererRenderField(j, e, h) {
    function g(c) {
        if (!Boolean(c))return "";
        a = [];
        for (b = 0; b < c.length; b++) {
            b > 0 && a.push("; ");
            a.push(STSHtmlEncode(c[b].lookupValue))
        }
        return a.join("")
    }

    var c = h[this.fldName];
    if (!Boolean(c))return "";
    if (typeof c == "string")return STSHtmlEncode(c);
    if (e.RenderAsText != null)return g(c);
    if (!Boolean(e.DispFormUrl))return "";
    for (var a = [], b = 0; b < c.length; b++) {
        b > 0 && a.push("; ");
        var d = [];
        d.push(e.DispFormUrl);
        d.push("&ID=");
        d.push(c[b].lookupId.toString());
        d.push("&RootFolder=*");
        var f = d.join("");
        a.push("<a ");
        a.push("onclick=\"OpenPopUpPage('");
        a.push(f);
        a.push("', RefreshPage); return false;\" ");
        a.push('href="');
        a.push(f);
        a.push('">');
        a.push(STSHtmlEncode(c[b].lookupValue));
        a.push("</a>")
    }
    return a.join("")
}
function NoteFieldRenderer_InitializePrototype() {
    NoteFieldRenderer.prototype = {RenderField: NoteFieldRendererRenderField}
}
function NoteFieldRenderer(a) {
    this.fldName = a
}
function NoteFieldRendererRenderField(e, c, b) {
    var a = [];
    a.push('<div dir="');
    a.push(c.Direction);
    a.push('" class="ms-rtestate-field">');
    a.push(b[this.fldName]);
    a.push("</div>");
    return a.join("")
}
function UrlFieldRenderer_InitializePrototype() {
    UrlFieldRenderer.prototype = {fldName: null, RenderField: UrlFieldRendererRenderField}
}
function UrlFieldRenderer(a) {
    this.fldName = a
}
function UrlFieldRendererRenderField(d, c, b, a) {
    return RenderUrl(b, this.fldName, a, c, false)
}
function UserFieldRenderer_InitializePrototype() {
    UserFieldRenderer.prototype = {fldName: null, RenderField: UserFieldRendererRenderField}
}
function UserFieldRenderer(a) {
    this.fldName = a
}
var s_ImnId;
function UserFieldRendererRenderField(j, b, m, i) {
    var d = m[this.fldName];
    if (typeof d == "string" && (d == "" || d == "***"))return d;
    var c = [], e = b.DefaultRender && b.AllowMultipleValues, l = e && b.InlineRender;
    if (l) {
        for (var a = [], f = 0; f < d.length; f++)a.push(RenderUserFieldWorker(j, b, d[f], i));
        if (a.length === 1)c.push(a[0]); else if (a.length === 2)c.push(StBuildParam(STSHtmlEncode(Strings.STS.L_UserFieldInlineTwo), a[0], a[1])); else if (a.length === 3)c.push(StBuildParam(STSHtmlEncode(Strings.STS.L_UserFieldInlineThree), a[0], a[1], a[2])); else {
            var h = "", g = "";
            if (Boolean(b.InlineRenderMoreAsLink)) {
                h = '<a href="#" onclick="return false;" class="ms-imnMoreLink ms-link">';
                g = "</a>"
            }
            var o = a.length - 3;
            c.push(StBuildParam(STSHtmlEncode(Strings.STS.L_UserFieldInlineMore), a[0], a[1], a[2], h, String(o), g))
        }
    } else {
        e && c.push("<table style='padding:0px; border-spacing:0px; border:none'><tr><td class='ms-vb'>");
        var k = true;
        for (var p in d) {
            if (k)k = false; else if (b.AllowMultipleValues)if (e)c.push("</td></tr><tr><td class='ms-vb'>"); else!b.WithPicture && !b.WithPictureDetail && !b.PictureOnly && c.push("; ");
            var n = d[p];
            c.push(RenderUserFieldWorker(j, b, n, i))
        }
        e && c.push("</td></tr></table>")
    }
    return c.join("")
}
function RenderUserFieldWorker(renderCtx, field, listItem, listSchema) {
    var g_EmptyImnPawnHtml = "<span class='ms-spimn-presenceLink'><span class='{0}'><img class='{1}' name='imnempty' src='/_layouts/15/images/spimn.png?rev=23' alt='' /></span></span>", g_ImnPawnHtml = "{0}<a href='#' onclick='IMNImageOnClick(event);return false;' class='{1}' {2}>{3}<img name='imnmark' title='' ShowOfflinePawn='1' class='{4}' src='/_layouts/15/images/spimn.png?rev=23' alt='", ret = [];

    function GetImnPawnHtml(j, i, l, e, n) {
        var d = "ms-spimn-img", a = "ms-spimn-presenceWrapper", h = "ms-imnlink", g = "", b = "", c = "";
        if (n) {
            a = d = " ms-hide";
            g = "tabIndex='-1'"
        } else {
            var k = SPClientTemplates.PresenceIndicatorSize.Square_10px, f = SPClientTemplates.PresenceIndicatorSize.Square_10px;
            if (e != null && typeof e != "undefined" && e != "None") {
                k = String(parseInt(e.substring(5)));
                if (e == "Size_72px")f = SPClientTemplates.PresenceIndicatorSize.Bar_8px; else f = SPClientTemplates.PresenceIndicatorSize.Bar_5px
            } else a += " ms-imnImg";
            if (field.InlineRender)a += " ms-imnImgInline";
            var m = String.format(" ms-spimn-imgSize-{0}x{1}", f, k);
            d += String.format(" ms-spimn-presence-disconnected-{0}x{1}x32", f, k);
            a += m;
            h += " ms-spimn-presenceLink";
            b = String.format("<span class='{0}'>", a);
            c = "<span class='ms-imnSpan'>"
        }
        if (j == null || j == "")if (i == null || i == "")ret.push(String.format(g_EmptyImnPawnHtml, a, d)); else {
            ret.push(String.format(g_ImnPawnHtml, c, h, g, b, d));
            ret.push(STSHtmlEncode(l));
            ret.push("' sip='");
            ret.push(STSHtmlEncode(i));
            ret.push("' id='imn_");
            ret.push(s_ImnId);
            ret.push(",type=smtp' />" + (b.length > 0 ? "</span>" : "") + "</a>" + (c.length > 0 ? "</span>" : ""))
        } else {
            ret.push(String.format(g_ImnPawnHtml, c, h, g, b, d));
            ret.push(STSHtmlEncode(l));
            ret.push("' sip='");
            ret.push(STSHtmlEncode(j));
            ret.push("' id='imn_");
            ret.push(s_ImnId);
            ret.push(",type=sip' />" + (b.length > 0 ? "</span>" : "") + "</a>" + (c.length > 0 ? "</span>" : ""))
        }
        s_ImnId++
    }

    function GetPresence(b, a) {
        listSchema.EffectivePresenceEnabled && (field.DefaultRender || field.WithPicture || field.WithPictureDetail || field.PictureOnly || field.PresenceOnly) && GetImnPawnHtml(b, a, listSchema.PresenceAlt, field.PictureSize, false)
    }

    function GetPresenceNoImg(b, a) {
        listSchema.EffectivePresenceEnabled && GetImnPawnHtml(b, a, listSchema.PresenceAlt, null, true)
    }

    function UserLinkWithSize(d) {
        var a = listSchema.UserDispParam;
        if (field.HasUserLink && (Boolean(a) || lookupId != null && lookupId != "" && parseInt(lookupId) > -1)) {
            var c = "";
            if (Boolean(listSchema.UserDispUrl)) {
                var b = new URI(listSchema.UserDispUrl);
                if (Boolean(a))b.setQueryParameter(a, listItem[a]); else b.setQueryParameter("ID", String(lookupId));
                c = b.getString()
            }
            var e = field.InlineRender ? "ms-link" : "ms-subtleLink";
            e += d != null && d.length > 0 ? " ms-peopleux-imgUserLink" : "";
            ret.push('<a class="' + e + '" onclick="GoToLinkOrDialogNewWindow(this);return false;" href=');
            ret.push(StAttrQuote(c));
            ret.push(">")
        }
    }

    function UserLink() {
        UserLinkWithSize(null)
    }

    function RenderUserTitle(a) {
        ret.push('<span class="ms-noWrap ms-imnSpan">');
        GetPresenceNoImg(sip, email);
        UserLink();
        ret.push(STSHtmlEncode(a));
        field.HasUserLink && ret.push("</a>");
        ret.push("</span>")
    }

    var lookupId = listItem.id, lookupValue = listItem.title;
    if (lookupValue == null || lookupValue == "") {
        ret.push('<span class="ms-floatLeft ms-peopleux-vanillaUser" />');
        return ret.join("")
    }
    var sip = listItem.sip, email = listItem.email;

    function RenderVanillaUser() {
        if (!listSchema.UserVanilla) {
            ret.push('<span class="ms-verticalAlignTop ms-noWrap ms-displayInlineBlock">');
            GetPresence(sip, email);
            RenderUserTitle(lookupValue);
            ret.push("</span>")
        } else RenderUserTitle(lookupValue)
    }

    var ProfilePicture_Suffix_Small = "_SThumb", ProfilePicture_Suffix_Medium = "_MThumb", ProfilePicture_Suffix_Large = "_LThumb", SmallThumbnailThreshold = 48;

    function GetPictureThumbnailUrl(a, b) {
        var c = a.substr(0, a.lastIndexOf("."));
        return c.endsWith(ProfilePicture_Suffix_Medium) ? b == ProfilePicture_Suffix_Medium ? a : a.replace(ProfilePicture_Suffix_Medium, b) : a
    }

    function AppendUserPhotoUrl(a, f, b) {
        a.push("/_layouts/15/userphoto.aspx");
        a.push("?size=");
        a.push(encodeURIComponent(f));
        var c = Boolean(listItem.accountname) ? listItem.accountname : listItem.email;
        if (Boolean(c)) {
            a.push("&accountname=");
            a.push(encodeURIComponent(c))
        }
        if (Boolean(b)) {
            a.push("&url=");
            a.push(encodeURIComponent(b));
            try {
                var e = new URI(b), d = e.getQueryParameter("t");
                if (Boolean(d)) {
                    a.push("&t=");
                    a.push(encodeURIComponent(d))
                }
            } catch (g) {
            }
        }
    }

    function RenderPicture(c) {
        var b = listItem.picture, a = c.PictureSize != null ? STSHtmlEncode(c.PictureSize.substring(5)) : null;
        ret.push('<span class="ms-imnSpan">');
        GetPresenceNoImg(sip, email);
        if (field.HasUserLink)UserLinkWithSize(a); else ret.push('<span class="ms-peopleux-imgUserLink">');
        if (a != null) {
            ret.push('<span class="ms-peopleux-userImgWrapper" style="width:' + a + "; height:" + a + '">');
            ret.push('<img class="ms-peopleux-userImg" style="min-width:' + a + "; min-height:" + a + "; ");
            ret.push("clip:rect(0px, " + a + ", " + a + ", 0px); max-width:" + a + '" src="')
        } else {
            a = "62px";
            ret.push('<img style="width:62px; height:62px; border:none" src="')
        }
        var d = pxToNum(a) <= SmallThumbnailThreshold ? "S" : "M";
        if (b == null || b == "") {
            if (_spPageContextInfo.crossDomainPhotosEnabled)AppendUserPhotoUrl(ret, d, ""); else ret.push("/_layouts/15/images/person.gif?rev=23");
            ret.push('" alt="');
            ret.push(STSHtmlEncode(listSchema.picturealt1));
            ret.push(" ");
            ret.push(STSHtmlEncode(lookupValue));
            ret.push('" />')
        } else {
            if (parseInt(a) <= SmallThumbnailThreshold)b = GetPictureThumbnailUrl(b, ProfilePicture_Suffix_Small);
            if (!_spPageContextInfo.crossDomainPhotosEnabled || b.startsWith("/") || b.toLowerCase().startsWith(getHostUrl(window.location.href).toLowerCase()))ret.push(STSHtmlEncode(b)); else AppendUserPhotoUrl(ret, d, b);
            ret.push('" alt="');
            ret.push(STSHtmlEncode(listSchema.picturealt2));
            ret.push(" ");
            ret.push(STSHtmlEncode(lookupValue));
            ret.push('" />')
        }
        a != null && ret.push("</span>");
        if (field.HasUserLink)ret.push("</a>"); else ret.push("</span>");
        ret.push("</span>")
    }

    var picSize = "0px";
    if (field.PictureSize != null && typeof field.PictureSize != "undefined")picSize = STSHtmlEncode(field.PictureSize.substring(5));
    if (field.WithPictureDetail) {
        var jobTitle = listItem.jobTitle, department = listItem.department;
        if (picSize == null || typeof picSize == "undefined")picSize = "36px";
        var detailsMaxWidth = 150;
        if (field.MaxWidth != null && typeof field.MaxWidth != "undefined") {
            detailsMaxWidth = field.MaxWidth - 10 - parseInt(picSize) - 11;
            if (detailsMaxWidth < 0)detailsMaxWidth = 0
        }
        ret.push('<div class="ms-table ms-core-tableNoSpace">');
        ret.push('<div class="ms-tableRow">');
        ret.push('<div class="ms-tableCell">');
        GetPresence(sip, email);
        ret.push('</span></div><div class="ms-tableCell ms-verticalAlignTop"><div class="ms-peopleux-userImgDiv">');
        RenderPicture(field);
        ret.push('</div></div><div class="ms-tableCell ms-peopleux-userdetails ms-noList"><ul style="max-width:' + String(detailsMaxWidth) + 'px"><li>');
        ret.push('<div class="ms-noWrap' + (parseInt(picSize) >= 48 ? " ms-textLarge" : "") + '">');
        RenderUserTitle(lookupValue);
        ret.push("</div>");
        ret.push("</li>");
        var customDetail = listItem.CustomDetail, renderCallback = field.RenderCallback;
        if (renderCallback != null || typeof renderCallback != "undefined") {
            var result = eval(renderCallback + "(renderCtx);");
            ret.push("<li>");
            ret.push(result);
            ret.push("</li>")
        } else if (customDetail != null || typeof customDetail != "undefined") {
            ret.push('<li><div class="ms-metadata ms-textSmall ms-peopleux-detailuserline ms-noWrap" title="' + STSHtmlEncode(customDetail) + '">');
            ret.push(STSHtmlEncode(customDetail));
            ret.push("</div></li>")
        } else if (jobTitle != null && jobTitle != "") {
            var detailLine = jobTitle;
            if (department != null && department != "")detailLine += ", " + department;
            ret.push('<li><div class="ms-metadata ms-textSmall ms-peopleux-detailuserline" title="' + STSHtmlEncode(detailLine) + '">');
            ret.push(STSHtmlEncode(detailLine));
            ret.push("</div></li>")
        }
        ret.push("</ul></div></div></div>")
    } else if (field.PictureOnly) {
        ret.push('<div class="ms-table ms-core-tableNoSpace"><div class="ms-tableRow"><div class="ms-tableCell">');
        GetPresence(sip, email);
        ret.push('</span></div><div class="ms-tableCell ms-verticalAlignTop"><div class="ms-peopleux-userImgDiv">');
        RenderPicture(field);
        ret.push("</div></div></div></div>")
    } else if (field.WithPicture) {
        ret.push("<div><div>");
        RenderPicture(field);
        ret.push('</div><div class="ms-floatLeft ms-descriptiontext">');
        RenderVanillaUser();
        ret.push("</div></div>")
    } else if (field.NameWithContactCard)RenderUserTitle(lookupValue); else if (field.PresenceOnly)GetPresence(sip, email); else RenderVanillaUser();
    return ret.join("")
}
function RenderAndRegisterHierarchyItem(c, m, b, l, h) {
    if (c.inGridMode)return h;
    var k = c.ListData.HierarchyHasIndention ? 22 : 0, f = c.ListData.HierarchyHasIndention ? 13 : 0, a = [], i = c.ctxId + "," + b.ID + "," + b.FSObjType, e = "idExpandCollapse" + i;
    a.push('<span style="');
    b.isParent && a.push("font-weight: bold;");
    a.push("float: ");
    a.push(fRightToLeft ? "right" : "left");
    a.push("; margin-");
    a.push(fRightToLeft ? "right" : "left");
    a.push(":");
    var g = parseInt(b.outlineLevel);
    if (g <= 1)d = b.isParent ? 0 : f; else {
        var d = (g - 1) * k;
        if (!b.isParent)d += f
    }
    a.push(d);
    a.push('px">');
    a.push("<table><tr>");
    if (b.isParent) {
        a.push('<td style="vertical-align: top;"><span id="');
        a.push(e);
        a.push('" class="ms-commentcollapse' + (fRightToLeft ? "rtl" : "") + '-iconouter"><img src="');
        a.push(GetThemedImageUrl("spcommon.png"));
        a.push('" class="ms-commentcollapse' + (fRightToLeft ? "rtl" : "") + '-icon"/></span></td>')
    }
    a.push("<td>");
    a.push(h);
    a.push("</td></tr></table></span>");
    function j() {
        var a = c.hierarchyMgr;
        if (a == null)a = c.hierarchyMgr = GetClientHierarchyManagerForWebpart(c.wpq, fRightToLeft);
        if (b.isParent) {
            var d = document.getElementById(e);
            d != null && $addHandler(d, "click", OnExpandCollapseButtonClick);
            EnsureScriptFunc("core.js", "GetAncestorByTagNames", function () {
                var a = GetAncestorByTagNames(d, ["TR"]);
                if (a != null)a.style.fontWeight = "bold"
            })
        }
        a.RegisterHierarchyNode(parseInt(b.ID), b.parentID == null ? null : parseInt(b.parentID), i, e)
    }

    AddPostRenderCallback(c, function () {
        setTimeout(j, 0)
    });
    return a.join("")
}
function OnPostRenderTabularListView(a) {
    setTimeout(function () {
        OnPostRenderTabularListViewDelayed(a)
    }, 100)
}
function OnPostRenderTabularListViewDelayed(a) {
    if (a != null && a.clvp != null)var e = a.clvp.tab;
    if (e != null) {
        if (IsTouchSupported()) {
            var b = e.rows;
            if (b != null && b.length > 0)for (var i = b[0], d = i.cells, c = 0; c < d.length; c++) {
                var h = d[c];
                CoreInvoke("RegisterTouchOverride", h, ListHeaderTouchHandler);
                var g = h.getElementsByClassName("ms-vh-div")[0];
                if (g != null) {
                    var f = g.getElementsByClassName("ms-headerSortTitleLink")[0];
                    f != null && CoreInvoke("RegisterTouchOverride", f, ListHeaderTouchHandler)
                }
            }
        }
    } else setTimeout(function () {
        OnPostRenderTabularListViewDelayed(a)
    }, 100)
}
function ListHeaderTouchHandler(h) {
    var a = GetEventSrcElement(h), e, b;
    if (a == null)return false;
    e = a.tagName == "TH" ? a : GetSelectedElement(a, "TH");
    for (var f = e.getElementsByTagName("DIV"), c = 0; c < f.length; c++)if (f[c].hasAttribute("CTXNum")) {
        b = f[c];
        break
    }
    if (e != null && b != null) {
        if (bMenuLoadInProgress)return true;
        var g = false;
        if (IsFilterMenuOn()) {
            var d = null;
            if (filterTable != null && filterTable.parentNode != null)d = filterTable.parentNode.getElementsByClassName("ms-core-menu-box")[0];
            if (d != null && IsContained(a, d) || IsContained(a, currentFilterMenu))return false;
            if (filterTable == b)g = true;
            MenuHtc_hide()
        }
        !g && OnMouseOverFilterDeferCall(b) && CreateFilterMenu(h)
    }
    return true
}
function SPMgr() {
    this.NewGroup = function (b, a) {
        return b[a] == "1" ? true : false
    };
    function o(d, a, e, c) {
        if (typeof a.FieldRenderer == "undefined") {
            var b = {
                Computed: new ComputedFieldRenderer(a.Name),
                Attachments: new AttachmentFieldRenderer(a.Name),
                User: new UserFieldRenderer(a.Name),
                UserMulti: new UserFieldRenderer(a.Name),
                URL: new UrlFieldRenderer(a.Name),
                Note: new NoteFieldRenderer(a.Name),
                Recurrence: new RecurrenceFieldRenderer(a.Name),
                CrossProjectLink: new ProjectLinkFieldRenderer(a.Name),
                AllDayEvent: new AllDayEventFieldRenderer(a.Name),
                Number: new NumberFieldRenderer(a.Name),
                BusinessData: new BusinessDataFieldRenderer(a.Name),
                Currency: new NumberFieldRenderer(a.Name),
                DateTime: new DateTimeFieldRenderer(a.Name),
                Text: new TextFieldRenderer(a.Name),
                Lookup: new LookupFieldRenderer(a.Name),
                LookupMulti: new LookupFieldRenderer(a.Name),
                WorkflowStatus: new RawFieldRenderer(a.Name)
            };
            if (a.XSLRender == "1")a.FieldRenderer = new RawFieldRenderer(a.Name); else {
                a.FieldRenderer = b[a.FieldType];
                if (a.FieldRenderer == null)a.FieldRenderer = b[a.Type]
            }
            if (a.FieldRenderer == null)a.FieldRenderer = new FieldRenderer(a.Name)
        }
        return a.FieldRenderer.RenderField(d, a, e, c)
    }

    function c(d, e, c) {
        var a;
        if (c.Sortable != "FALSE") {
            var h = d.ListData;
            a = '<a class="ms-headerSortTitleLink" id="diidSort';
            a += d.ctxId;
            a += c.Name;
            a += '" onfocus="OnFocusFilter(this)"';
            if (!c.IconOnlyHeader)a += " onclick=\"javascript: var pointerType = this.getAttribute('pointerType'); if (pointerType != null && typeof MSPointerEvent != 'undefined' && Number(pointerType) != MSPointerEvent.MSPOINTER_TYPE_MOUSE) { ListHeaderTouchHandler(event); return false; } return OnClickFilter(this, event);\"";
            a += 'href="javascript: " SortingFields="';
            a += f(c, h, e);
            a += ' Title="';
            a += Strings.STS.L_OpenMenuKeyAccessible;
            a += '">';
            a += c.FieldTitle;
            a += "</a>";
            a += g(d, c);
            a += b(d, c)
        } else if (c.Filterable != "FALSE") {
            a = '<span id="diidSort';
            a += d.ctxId;
            a += c.Name;
            a += '">';
            a += c.FieldTitle;
            a += "</span>";
            a += b(d, c)
        } else a = '<span title="' + Strings.STS.L_CSR_NoSortFilter + '">' + c.FieldTitle + "</span>";
        return a
    }

    function g(c, e) {
        var a, d = c.ListData, f = e.Name == d.Sortfield, b = d.SortDir == "ascending", g = b ? "ms-sortarrowup-iconouter" : "ms-sortarrowdown-iconouter", h = b ? "ms-sortarrowup-icon" : "ms-sortarrowdown-icon";
        a = '<span class="' + g + '"';
        a += ' id="diidSortArrowSpan';
        a += c.ctxId;
        a += e.Name;
        a += '"';
        if (!f)a += ' style="display: none;"';
        a += '><img class="' + h + '" src="' + GetThemedImageUrl("spcommon.png") + '" alt="" /></span>';
        return a
    }

    function b(b, d) {
        var a, c = b.ListData, e = c.FilterFields != null && c.FilterFields.indexOf(";" + d.Name + ";") >= 0;
        a = '<span class="ms-filter-iconouter"';
        a += ' id="diidFilterSpan';
        a += b.ctxId;
        a += d.Name;
        a += '"';
        if (!e)a += ' style="display: none;"';
        a += '><img class="ms-filter-icon" src="' + GetThemedImageUrl("spcommon.png") + '" alt="" /></span>';
        return a
    }

    function p(d, b) {
        var e = d.ListSchema, f = d.ListData;
        if (e.Filter == "1")return b.Filter;
        var a;
        if (b.Type == "Number" || b.Type == "Currency") {
            a = '<div align="right" class="ms-numHeader">';
            a += c(d, e, b);
            a += "</div>"
        } else a = c(d, e, b);
        if (b.FieldType == "BusinessData") {
            a += '<a style="padding-left:2px;padding-right:12px" onmouseover="" onclick="GoToLinkOrDialogNewWindow(this);return false;" href="';
            a += e.HttpVDir;
            a += "/_layouts/15/BusinessDataSynchronizer.aspx?ListId=";
            a += d.listName;
            a += "&ColumnName=";
            a += b.Name;
            a += '"><img border="0" src="/_layouts/15/images/bdupdate.gif" alt="';
            a += Strings.STS.L_BusinessDataField_UpdateImageAlt;
            a += '" title="';
            a += Strings.STS.L_BusinessDataField_UpdateImageAlt;
            a += '"/></a>'
        }
        return a
    }

    function f(d, b, c) {
        var a = c.RootFolderParam;
        a += c.FieldSortParam;
        a += "SortField=";
        a += d.Name;
        a += "&SortDir=";
        if (b.SortField == d.Name && (b.SortDir == "ascending" || b.SortDir == "ASC"))a += "Desc"; else a += "Asc";
        return a
    }

    function a(c, b) {
        var d = c.ListSchema, e = c.ListData, a = "";
        a += '<div Sortable="';
        a += b.Sortable == null ? "" : b.Sortable;
        a += '" SortDisable="" FilterDisable="" Filterable="';
        a += b.Filterable == null ? "" : b.Filterable;
        a += '" FilterDisableMessage="';
        a += b.FilterDisableMessage == null ? "" : b.FilterDisableMessage;
        a += '" name="';
        a += b.Name;
        a += '" CTXNum="';
        a += c.ctxId;
        a += '" DisplayName="';
        a += STSHtmlEncode(b.DisplayName);
        a += '" FieldType="';
        a += b.FieldType;
        a += '" ResultType="';
        a += b.ResultType == null ? "" : b.ResultType;
        a += '" SortFields="';
        a += f(b, e, d);
        a += '" class="ms-vh-div">';
        a += p(c, b);
        a += "</div>";
        if (b.Sortable != "FALSE" && b.Type != "MultiChoice" || b.Filterable != "FALSE" && b.Type != "Note" && b.Type != "URL") {
            a += '<div class="ms-positionRelative">';
            a += '<div class="s4-ctx"><span> </span><a onfocus="OnChildColumn(this.parentNode.parentNode.parentNode); return false;" ';
            a += 'class="ms-headerSortArrowLink" onclick="PopMenuFromChevron(event); return false;" href="javascript:;" title="';
            a += Strings.STS.L_OpenMenu;
            a += '"><img style="visibility: hidden;" src="' + GetThemedImageUrl("ecbarw.png") + '" alt="" + STSHtmlEncode(Strings.STS.L_OpenMenu) + "" ms-jsgrid-click-passthrough="true"></a><span> </span></div>';
            a += "</div>"
        }
        return a
    }

    function e(d, b, e) {
        var c = '<th class="ms-vh-icon ms-minWidthHeader" scope="col" onmouseover="OnChildColumn(this)">';
        b.FieldTitle = '<img border="0" width="16" height="16" src="' + e + '"/>';
        b.IconOnlyHeader = true;
        c += a(d, b);
        c += "</th>";
        return c
    }

    function j(a, b) {
        return e(a, b, GetThemedImageUrl("attach16.png"))
    }

    function m(b, a) {
        return a.Name == "DocIcon" && a.RealFieldName == "DocIcon" ? e(b, a, "/_layouts/15/images/icgen.gif") : d(b, a)
    }

    function i() {
        var a = '<th scope="col" class="ms-vh3-nograd">';
        a += '<img id="diidHeaderImageSelectedFlag" alt="';
        a += Strings.STS.L_SPSelection_Checkbox;
        a += '" src="/_layouts/15/images/blank.gif" width="16" height="16" border="0"/>';
        a += "</th>";
        return a
    }

    function l(e, d) {
        var c = [], b = [];
        b.push('<div class="ms-chkmark-container" style="cursor: default;">');
        b.push('<div class="ms-chkmark-container-centerer">');
        b.push('<span class="ms-cui-img-16by16 ms-cui-img-cont-float" unselectable="on">');
        b.push('<img class="ms-chkmark-marktaskcomplete" src="');
        b.push(GetThemedImageUrl("spcommon.png"));
        b.push('"/></span></div></div>');
        d.FieldTitle = b.join("");
        c.push('<th scope="col" class="ms-vh2" style="padding-left: 5px;width: 50px;" onmouseover="OnChildColumn(this)" onmousedown="ListHeaderMenu_OnMouseDown(this);" scope="col">');
        c.push(a(e, d));
        c.push("</th>");
        return c.join("")
    }

    function n(d, b) {
        var c = '<th class="ms-vh2" scope="col" onmouseover="OnChildColumn(this)" onmousedown="ListHeaderMenu_OnMouseDown(this);">';
        b.FieldTitle = STSHtmlEncode(b.DisplayName);
        c += a(d, b);
        c += "</th>";
        return c
    }

    function k(d, c) {
        var b = '<th class="ms-vh-icon" scope="col" onmouseover="OnChildColumn(this)" onmousedown="ListHeaderMenu_OnMouseDown(this);">';
        c.FieldTitle = '<IMG id="diidHeaderImagefRecurrence" src="/_layouts/15/images/recurrence.gif" width="16" height="16" border="0" >';
        b += a(d, c);
        b += "</th>";
        return b
    }

    function d(d, b) {
        var c = '<th scope="col" onmouseover="OnChildColumn(this)" style="max-width: 500px;" class="';
        if ((b.Type == "User" || b.Type == "UserMulti") && d.ListSchema.EffectivePresenceEnabled)c += "ms-vh"; else c += b.Filterable != "FALSE" || b.Sortable != "FALSE" ? "ms-vh2" : "ms-vh2-nofilter";
        if (b.Name == "DocIcon")c += " ms-minWidthHeader";
        c += '" onmousedown="ListHeaderMenu_OnMouseDown(this);">';
        b.FieldTitle = STSHtmlEncode(b.DisplayName);
        c += a(d, b);
        c += "</th>";
        return c
    }

    function h(e, c) {
        var b = '<th class="ms-vh-icon" scope="col" onmouseover="OnChildColumn(this)">', d = GetThemedImageUrl("mtgicnhd.gif");
        c.FieldTitle = '<IMG id="diidHeaderImageWorkspaceLink" src="' + d + '" width="16" height="16" border="0" >';
        b += a(e, c);
        b += "</th>";
        return b
    }

    this.RenderHeader = function (b, a) {
        if (a.Name == "SelectedFlag")return i(b, a); else if (a.Name == "Checkmark")return l(b, a);
        var e = {Attachments: j, Computed: m, CrossProjectLink: h, Recurrence: k, DateTime: n}, c = e[a.Type];
        return c != null ? c(b, a) : d(b, a)
    };
    this.RenderField = function (c, a, e, f) {
        if (typeof a.fieldRenderer == "undefined") {
            var j = c.Templates.Fields, g, k = a.Name;
            if (j[k] != null)g = j[k];
            var h;
            if (g != null && g != "" && g != RenderFieldValueDefault) {
                if (typeof g == "string")h = SPClientRenderer.ParseTemplateString(g, c); else if (typeof g == "function")h = g
            } else h = o;
            a.fieldRenderer = h
        }
        c.CurrentFieldSchema = a;
        var b = a.fieldRenderer(c, a, e, f);
        c.CurrentFieldSchema = null;
        if (a.Direction != null) {
            var d = [];
            d.push('<span dir="');
            d.push(a.Direction);
            d.push('">');
            d.push(b);
            d.push("</span>");
            b = d.join("")
        }
        if (a.linkToItem != null) {
            d = [];
            if (e.FSObjType == "1")if (f.IsDocLib == "1")RenderDocFolderLink(d, b, e, f); else RenderListFolderLink(d, b, e, f); else RenderTitle(d, c, e, f, LinkTitleValue(e[a.Name]));
            b = d.join("")
        }
        if (f.UseParentHierarchy && f.ParentHierarchyDisplayField == a.Name)b = RenderAndRegisterHierarchyItem(c, a, e, f, b);
        var i = e["CustomData."];
        if (i == null || typeof i == "undefined" || Boolean(i) == false)if (a.CalloutMenu != null)b = RenderCalloutMenu(c, e, a, b, IsCSRReadOnlyTabularView(c)); else if (a.listItemMenu != null)b = RenderECB(c, e, a, b, IsCSRReadOnlyTabularView(c));
        return b
    };
    this.RenderFieldByName = function (a, e, f, b) {
        var d = "", g = false;
        for (var i in b.Field) {
            var c = b.Field[i];
            if (c.Name == e) {
                var h = a.CurrentFieldSchema;
                a.CurrentFieldSchema = c;
                d = this.RenderField(a, c, f, b);
                a.CurrentFieldSchema = h;
                g = true;
                break
            }
        }
        if (!g)d = STSHtmlEncode(f[e]);
        return d
    }
}
var spMgr;
function OnTableMouseDown(a) {
    if (a == null)a = window.event;
    if (a.ctrlKey || a.shiftKey) {
        if (browseris.ie8standard) {
            document.onselectstart = function () {
                return false
            };
            window.setTimeout(function () {
                document.onselectstart = null
            }, 0)
        }
        return CancelEvent(a)
    }
    return true
}
function FHasRowHoverBehavior(a) {
    return !browseris.ie8down && !browseris.ipad && a != null && a.ListData != null && a.ListData.Row != null && a.ListData.Row.length < 50
}
function InitializeSingleItemPictureView() {
    var a = {};
    a.Templates = {};
    a.BaseViewID = 2;
    a.ListTemplateType = 109;
    a.Templates.Item = SingleItem_RenderItemTemplate;
    a.Templates.Footer = SingleItem_RenderFooterTemplate;
    a.Templates.Header = SingleItem_RenderHeaderTemplate;
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(a)
}
function SingleItem_RenderHeaderTemplate(b) {
    var c = b.ListSchema, a = [];
    a.push("<div>");
    if (c.RenderViewSelectorPivotMenu == "True")a.push(RenderViewSelectorPivotMenu(b)); else c.RenderViewSelectorPivotMenuAsync == "True" && a.push(RenderViewSelectorPivotMenuAsync(b));
    a.push("</div>");
    return a.join("")
}
function SingleItem_RenderFooterTemplate() {
    return ""
}
function RenderSingleItemTopPagingControl(c) {
    var b = [], a = "<div>";
    RenderPagingControlNew(b, c, false, "", "topPaging");
    a += b.join("");
    a += "</div>";
    return a
}
function SingleItem_RenderItemTemplate(d) {
    var b = "<tr><td colspan='100'>", c = "</td></tr>", a = b;
    a += RenderSingleItemTopPagingControl(d);
    a += c;
    a += b;
    a += SingleItem_RenderItem(d.CurrentItem);
    a += c;
    return a
}
function SingleItem_RenderItem(a) {
    var c = GetPictureUrl(a);
    if (a == null)return null;
    var d = a.ContentType, b = null;
    if (a.FSObjType == "1") {
        b = '<div class="ms-attractMode"><a href="javascript:" onclick=ajaxNavigate.update("';
        b += GetRelativeUrlToSlideShowView(a);
        b += '") >';
        b += '<img src="/_layouts/15/images/256_folder.png" />';
        b += "<div>" + a.FileLeafRef + "</div>";
        b += "</a></div>"
    } else {
        EnsureFileLeafRefSuffix(a);
        if (!IsPictureFile(a["FileLeafRef.Suffix"]))b = '<div class="ms-attractMode">' + String.format(Strings.STS.L_NotAnImageFile, a.FileLeafRef) + "</div>"; else {
            b = "<a href=\"javascript:\" onclick='ToggleMaxWidth(this.childNodes[0])' ><img style='max-width:800px' title=\"" + Strings.STS.L_ClickToZoom + '" src="' + c + '" /></a>';
            b += '<div class="ms-attractMode">' + a.FileLeafRef + "</div>"
        }
    }
    return b
}
function GetRelativeUrlToSlideShowView(b) {
    if (b == null)return null;
    var a = escape(_spPageContextInfo.serverRequestPath);
    a += "?RootFolder=";
    a += escapeProperly(b.FileRef);
    return a
}
function IsPictureFile(c) {
    if (c == null)return false;
    for (var b = ["jpg", "jpeg", "bmp", "png", "gif"], a = 0; a < b.length; a++)if (c.toLowerCase() == b[a])return true;
    return false
}
function GetPictureUrl(a) {
    var b = a.FileDirRef + "/" + a.FileLeafRef;
    return EncodeUrl(b)
}
function ToggleMaxWidth(a) {
    var b = a.style.maxWidth;
    if (b == null || b == "")a.style.maxWidth = "800px"; else a.style.maxWidth = ""
}
$_global_clienttemplates();