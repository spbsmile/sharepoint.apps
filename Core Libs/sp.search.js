Type.registerNamespace("Microsoft.SharePoint.Client.Search.Query");
Microsoft.SharePoint.Client.Search.Query.QueryPropertyValueType = function () {
};
Microsoft.SharePoint.Client.Search.Query.QueryPropertyValueType.prototype = {
    none: 0,
    stringType: 1,
    int32TYpe: 2,
    booleanType: 3,
    stringArrayType: 4,
    unSupportedType: 5
};
Microsoft.SharePoint.Client.Search.Query.QueryPropertyValueType.registerEnum("Microsoft.SharePoint.Client.Search.Query.QueryPropertyValueType", false);
Microsoft.SharePoint.Client.Search.Query.ReorderingRuleMatchType = function () {
};
Microsoft.SharePoint.Client.Search.Query.ReorderingRuleMatchType.prototype = {
    resultContainsKeyword: 0,
    titleContainsKeyword: 1,
    titleMatchesKeyword: 2,
    urlStartsWith: 3,
    urlExactlyMatches: 4,
    contentTypeIs: 5,
    fileExtensionMatches: 6,
    resultHasTag: 7,
    manualCondition: 8
};
Microsoft.SharePoint.Client.Search.Query.ReorderingRuleMatchType.registerEnum("Microsoft.SharePoint.Client.Search.Query.ReorderingRuleMatchType", false);
Microsoft.SharePoint.Client.Search.Query.SortDirection = function () {
};
Microsoft.SharePoint.Client.Search.Query.SortDirection.prototype = {ascending: 0, descending: 1, fqlFormula: 2};
Microsoft.SharePoint.Client.Search.Query.SortDirection.registerEnum("Microsoft.SharePoint.Client.Search.Query.SortDirection", false);
Microsoft.SharePoint.Client.Search.Query.KeywordQueryProperties = function (b, a) {
    Microsoft.SharePoint.Client.Search.Query.KeywordQueryProperties.initializeBase(this, [b, a])
};
Microsoft.SharePoint.Client.Search.Query.KeywordQueryProperties.prototype = {
    get_item: function () {
        return null
    }, set_item: function (b, a) {
        this.setQueryPropertyValue(b, Microsoft.SharePoint.Client.Search.Query.QueryUtility.create(b, a));
        return a
    }, setQueryPropertyValue: function (c, d) {
        var a = this.get_context(), b = new SP.ClientActionInvokeMethod(this, "SetQueryPropertyValue", [c, d]);
        a.addQuery(b)
    }, getQueryPropertyValue: function (d) {
        var b = this.get_context(), a, c = new SP.ClientActionInvokeMethod(this, "GetQueryPropertyValue", [d]);
        b.addQuery(c);
        a = new Microsoft.SharePoint.Client.Search.Query.QueryPropertyValue;
        b.addQueryIdAndResultObject(c.get_id(), a);
        return a
    }
};
Microsoft.SharePoint.Client.Search.Query.QueryUtility = function () {
};
Microsoft.SharePoint.Client.Search.Query.QueryUtility.create = function (d, b) {
    if (d && d.length > 0) {
        var a = new Microsoft.SharePoint.Client.Search.Query.QueryPropertyValue;
        if (b) {
            var c = Object.getType(b);
            switch (Array.indexOf(Microsoft.SharePoint.Client.Search.Query.QueryUtility.$Q, c)) {
                case 1:
                    a.$4_1 = b;
                    a.$0_1 = 1;
                    break;
                case 2:
                    a.$2_1 = b;
                    a.$0_1 = 2;
                    break;
                case 3:
                    a.$1_1 = b;
                    a.$0_1 = 3;
                    break;
                case 4:
                    a.$3_1 = b;
                    a.$0_1 = 4;
                    break;
                default:
                    var e = "Type " + c.toString() + "is not valid. Only String, Int32, Boolean and String[] are supported.";
                    throw Error.argument(e)
            }
        }
        return a
    } else throw Error.argumentNull("The name a of a property cannot be null or empty!")
};
Microsoft.SharePoint.Client.Search.Query.QueryUtility.queryPropertyValueToObject = function (a) {
    if (a && a.$0_1 !== 0)switch (a.$0_1) {
        case 1:
            return a.$4_1;
        case 2:
            return a.$2_1;
        case 3:
            return a.$1_1;
        case 4:
            return a.$3_1;
        default:
            throw Error.argument("The Payload type is not valid. Only String, Int32, Boolean and String[] are supported.")
    } else return null
};
Microsoft.SharePoint.Client.Search.Query.QueryUtility.getQueryPropertyValueType = function (a) {
    if (a)return a.$0_1; else return 0
};
Microsoft.SharePoint.Client.Search.Query.KeywordQuery = function (a) {
    Microsoft.SharePoint.Client.Search.Query.KeywordQuery.initializeBase(this, [a, SP.ClientUtility.getOrCreateObjectPathForConstructor(a, "{80173281-fffd-47b6-9a49-312e06ff8428}", arguments)])
};
Microsoft.SharePoint.Client.Search.Query.KeywordQuery.newObject = function (a) {
    return new Microsoft.SharePoint.Client.Search.Query.KeywordQuery(a, new SP.ObjectPathConstructor(a, "{80173281-fffd-47b6-9a49-312e06ff8428}", null))
};
Microsoft.SharePoint.Client.Search.Query.KeywordQuery.prototype = {
    get_collapseSpecification: function () {
        this.checkUninitializedProperty("CollapseSpecification");
        return this.get_objectData().get_properties()["CollapseSpecification"]
    }, set_collapseSpecification: function (a) {
        this.get_objectData().get_properties()["CollapseSpecification"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "CollapseSpecification", a));
        return a
    }, get_enableSorting: function () {
        this.checkUninitializedProperty("EnableSorting");
        return this.get_objectData().get_properties()["EnableSorting"]
    }, set_enableSorting: function (a) {
        this.get_objectData().get_properties()["EnableSorting"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "EnableSorting", a));
        return a
    }, get_hiddenConstraints: function () {
        this.checkUninitializedProperty("HiddenConstraints");
        return this.get_objectData().get_properties()["HiddenConstraints"]
    }, set_hiddenConstraints: function (a) {
        this.get_objectData().get_properties()["HiddenConstraints"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "HiddenConstraints", a));
        return a
    }, get_properties: function () {
        var a = this.get_objectData().get_clientObjectProperties()["Properties"];
        if (SP.ScriptUtility.isUndefined(a)) {
            a = new Microsoft.SharePoint.Client.Search.Query.KeywordQueryProperties(this.get_context(), new SP.ObjectPathProperty(this.get_context(), this.get_path(), "Properties"));
            this.get_objectData().get_clientObjectProperties()["Properties"] = a
        }
        return a
    }, get_refinementFilters: function () {
        var a = this.get_objectData().get_clientObjectProperties()["RefinementFilters"];
        if (SP.ScriptUtility.isUndefined(a)) {
            a = new Microsoft.SharePoint.Client.Search.Query.StringCollection(this.get_context(), new SP.ObjectPathProperty(this.get_context(), this.get_path(), "RefinementFilters"));
            this.get_objectData().get_clientObjectProperties()["RefinementFilters"] = a
        }
        return a
    }, set_refinementFilters: function (a) {
        this.get_objectData().get_clientObjectProperties()["RefinementFilters"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "RefinementFilters", a));
        return a
    }, get_refiners: function () {
        this.checkUninitializedProperty("Refiners");
        return this.get_objectData().get_properties()["Refiners"]
    }, set_refiners: function (a) {
        this.get_objectData().get_properties()["Refiners"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "Refiners", a));
        return a
    }, get_reorderingRules: function () {
        var a = this.get_objectData().get_clientObjectProperties()["ReorderingRules"];
        if (SP.ScriptUtility.isUndefined(a)) {
            a = new Microsoft.SharePoint.Client.Search.Query.ReorderingRuleCollection(this.get_context(), new SP.ObjectPathProperty(this.get_context(), this.get_path(), "ReorderingRules"));
            this.get_objectData().get_clientObjectProperties()["ReorderingRules"] = a
        }
        return a
    }, set_reorderingRules: function (a) {
        this.get_objectData().get_clientObjectProperties()["ReorderingRules"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "ReorderingRules", a));
        return a
    }, get_selectProperties: function () {
        var a = this.get_objectData().get_clientObjectProperties()["SelectProperties"];
        if (SP.ScriptUtility.isUndefined(a)) {
            a = new Microsoft.SharePoint.Client.Search.Query.StringCollection(this.get_context(), new SP.ObjectPathProperty(this.get_context(), this.get_path(), "SelectProperties"));
            this.get_objectData().get_clientObjectProperties()["SelectProperties"] = a
        }
        return a
    }, get_sortList: function () {
        var a = this.get_objectData().get_clientObjectProperties()["SortList"];
        if (SP.ScriptUtility.isUndefined(a)) {
            a = new Microsoft.SharePoint.Client.Search.Query.SortCollection(this.get_context(), new SP.ObjectPathProperty(this.get_context(), this.get_path(), "SortList"));
            this.get_objectData().get_clientObjectProperties()["SortList"] = a
        }
        return a
    }, get_timeZoneId: function () {
        this.checkUninitializedProperty("TimeZoneId");
        return this.get_objectData().get_properties()["TimeZoneId"]
    }, set_timeZoneId: function (a) {
        this.get_objectData().get_properties()["TimeZoneId"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "TimeZoneId", a));
        return a
    }, get_trimDuplicatesIncludeId: function () {
        this.checkUninitializedProperty("TrimDuplicatesIncludeId");
        return this.get_objectData().get_properties()["TrimDuplicatesIncludeId"]
    }, set_trimDuplicatesIncludeId: function (a) {
        this.get_objectData().get_properties()["TrimDuplicatesIncludeId"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "TrimDuplicatesIncludeId", a));
        return a
    }, initPropertiesFromJson: function (b) {
        Microsoft.SharePoint.Client.Search.Query.Query.prototype.initPropertiesFromJson.call(this, b);
        var a;
        a = b.CollapseSpecification;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["CollapseSpecification"] = a;
            delete b.CollapseSpecification
        }
        a = b.EnableSorting;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["EnableSorting"] = a;
            delete b.EnableSorting
        }
        a = b.HiddenConstraints;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["HiddenConstraints"] = a;
            delete b.HiddenConstraints
        }
        a = b.Properties;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.updateClientObjectPropertyType("Properties", this.get_properties(), a);
            this.get_properties().fromJson(a);
            delete b.Properties
        }
        a = b.RefinementFilters;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.updateClientObjectPropertyType("RefinementFilters", this.get_refinementFilters(), a);
            this.get_refinementFilters().fromJson(a);
            delete b.RefinementFilters
        }
        a = b.Refiners;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["Refiners"] = a;
            delete b.Refiners
        }
        a = b.ReorderingRules;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.updateClientObjectPropertyType("ReorderingRules", this.get_reorderingRules(), a);
            this.get_reorderingRules().fromJson(a);
            delete b.ReorderingRules
        }
        a = b.SelectProperties;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.updateClientObjectPropertyType("SelectProperties", this.get_selectProperties(), a);
            this.get_selectProperties().fromJson(a);
            delete b.SelectProperties
        }
        a = b.SortList;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.updateClientObjectPropertyType("SortList", this.get_sortList(), a);
            this.get_sortList().fromJson(a);
            delete b.SortList
        }
        a = b.TimeZoneId;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["TimeZoneId"] = a;
            delete b.TimeZoneId
        }
        a = b.TrimDuplicatesIncludeId;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["TrimDuplicatesIncludeId"] = a;
            delete b.TrimDuplicatesIncludeId
        }
    }
};
Microsoft.SharePoint.Client.Search.Query.KeywordQueryPropertyNames = function () {
};
Microsoft.SharePoint.Client.Search.Query.KeywordQueryObjectPropertyNames = function () {
};
Microsoft.SharePoint.Client.Search.Query.PersonalResultSuggestion = function () {
    Microsoft.SharePoint.Client.Search.Query.PersonalResultSuggestion.initializeBase(this)
};
Microsoft.SharePoint.Client.Search.Query.PersonalResultSuggestion.prototype = {
    $D_1: null,
    $E_1: false,
    $O_1: null,
    $P_1: null,
    get_highlightedTitle: function () {
        return this.$D_1
    },
    set_highlightedTitle: function (a) {
        this.$D_1 = a;
        return a
    },
    get_isBestBet: function () {
        return this.$E_1
    },
    set_isBestBet: function (a) {
        this.$E_1 = a;
        return a
    },
    get_title: function () {
        return this.$O_1
    },
    set_title: function (a) {
        this.$O_1 = a;
        return a
    },
    get_url: function () {
        return this.$P_1
    },
    set_url: function (a) {
        this.$P_1 = a;
        return a
    },
    get_typeId: function () {
        return "{aafd94af-525a-4759-8410-f571a26f04bc}"
    },
    writeToXml: function (b, a) {
        if (!b)throw Error.argumentNull("writer");
        if (!a)throw Error.argumentNull("serializationContext");
        var c = ["HighlightedTitle", "IsBestBet", "Title", "Url"];
        SP.DataConvert.writePropertiesToXml(b, this, c, a);
        SP.ClientValueObject.prototype.writeToXml.call(this, b, a)
    },
    initPropertiesFromJson: function (b) {
        SP.ClientValueObject.prototype.initPropertiesFromJson.call(this, b);
        var a;
        a = b.HighlightedTitle;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$D_1 = a;
            delete b.HighlightedTitle
        }
        a = b.IsBestBet;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$E_1 = a;
            delete b.IsBestBet
        }
        a = b.Title;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$O_1 = a;
            delete b.Title
        }
        a = b.Url;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$P_1 = a;
            delete b.Url
        }
    }
};
Microsoft.SharePoint.Client.Search.Query.PopularQuery = function () {
    Microsoft.SharePoint.Client.Search.Query.PopularQuery.initializeBase(this)
};
Microsoft.SharePoint.Client.Search.Query.PopularQuery.prototype = {
    $A_1: 0,
    $G_1: 0,
    $M_1: 0,
    $N_1: null,
    get_clickCount: function () {
        return this.$A_1
    },
    set_clickCount: function (a) {
        this.$A_1 = a;
        return a
    },
    get_LCID: function () {
        return this.$G_1
    },
    set_LCID: function (a) {
        this.$G_1 = a;
        return a
    },
    get_queryCount: function () {
        return this.$M_1
    },
    set_queryCount: function (a) {
        this.$M_1 = a;
        return a
    },
    get_queryText: function () {
        return this.$N_1
    },
    set_queryText: function (a) {
        this.$N_1 = a;
        return a
    },
    get_typeId: function () {
        return "{cea115d6-87ec-4e1c-aa4a-b8d44d6cd10d}"
    },
    writeToXml: function (b, a) {
        if (!b)throw Error.argumentNull("writer");
        if (!a)throw Error.argumentNull("serializationContext");
        var c = ["ClickCount", "LCID", "QueryCount", "QueryText"];
        SP.DataConvert.writePropertiesToXml(b, this, c, a);
        SP.ClientValueObject.prototype.writeToXml.call(this, b, a)
    },
    initPropertiesFromJson: function (b) {
        SP.ClientValueObject.prototype.initPropertiesFromJson.call(this, b);
        var a;
        a = b.ClickCount;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$A_1 = a;
            delete b.ClickCount
        }
        a = b.LCID;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$G_1 = a;
            delete b.LCID
        }
        a = b.QueryCount;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$M_1 = a;
            delete b.QueryCount
        }
        a = b.QueryText;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$N_1 = a;
            delete b.QueryText
        }
    }
};
Microsoft.SharePoint.Client.Search.Query.Query = function (b, a) {
    Microsoft.SharePoint.Client.Search.Query.Query.initializeBase(this, [b, a])
};
Microsoft.SharePoint.Client.Search.Query.Query.prototype = {
    get_blockDedupeMode: function () {
        this.checkUninitializedProperty("BlockDedupeMode");
        return this.get_objectData().get_properties()["BlockDedupeMode"]
    }, set_blockDedupeMode: function (a) {
        this.get_objectData().get_properties()["BlockDedupeMode"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "BlockDedupeMode", a));
        return a
    }, get_bypassResultTypes: function () {
        this.checkUninitializedProperty("BypassResultTypes");
        return this.get_objectData().get_properties()["BypassResultTypes"]
    }, set_bypassResultTypes: function (a) {
        this.get_objectData().get_properties()["BypassResultTypes"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "BypassResultTypes", a));
        return a
    }, get_clientType: function () {
        this.checkUninitializedProperty("ClientType");
        return this.get_objectData().get_properties()["ClientType"]
    }, set_clientType: function (a) {
        this.get_objectData().get_properties()["ClientType"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "ClientType", a));
        return a
    }, get_culture: function () {
        this.checkUninitializedProperty("Culture");
        return this.get_objectData().get_properties()["Culture"]
    }, set_culture: function (a) {
        this.get_objectData().get_properties()["Culture"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "Culture", a));
        return a
    }, get_desiredSnippetLength: function () {
        this.checkUninitializedProperty("DesiredSnippetLength");
        return this.get_objectData().get_properties()["DesiredSnippetLength"]
    }, set_desiredSnippetLength: function (a) {
        this.get_objectData().get_properties()["DesiredSnippetLength"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "DesiredSnippetLength", a));
        return a
    }, get_enableInterleaving: function () {
        this.checkUninitializedProperty("EnableInterleaving");
        return this.get_objectData().get_properties()["EnableInterleaving"]
    }, set_enableInterleaving: function (a) {
        this.get_objectData().get_properties()["EnableInterleaving"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "EnableInterleaving", a));
        return a
    }, get_enableNicknames: function () {
        this.checkUninitializedProperty("EnableNicknames");
        return this.get_objectData().get_properties()["EnableNicknames"]
    }, set_enableNicknames: function (a) {
        this.get_objectData().get_properties()["EnableNicknames"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "EnableNicknames", a));
        return a
    }, get_enableOrderingHitHighlightedProperty: function () {
        this.checkUninitializedProperty("EnableOrderingHitHighlightedProperty");
        return this.get_objectData().get_properties()["EnableOrderingHitHighlightedProperty"]
    }, set_enableOrderingHitHighlightedProperty: function (a) {
        this.get_objectData().get_properties()["EnableOrderingHitHighlightedProperty"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "EnableOrderingHitHighlightedProperty", a));
        return a
    }, get_enablePhonetic: function () {
        this.checkUninitializedProperty("EnablePhonetic");
        return this.get_objectData().get_properties()["EnablePhonetic"]
    }, set_enablePhonetic: function (a) {
        this.get_objectData().get_properties()["EnablePhonetic"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "EnablePhonetic", a));
        return a
    }, get_enableQueryRules: function () {
        this.checkUninitializedProperty("EnableQueryRules");
        return this.get_objectData().get_properties()["EnableQueryRules"]
    }, set_enableQueryRules: function (a) {
        this.get_objectData().get_properties()["EnableQueryRules"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "EnableQueryRules", a));
        return a
    }, get_enableStemming: function () {
        this.checkUninitializedProperty("EnableStemming");
        return this.get_objectData().get_properties()["EnableStemming"]
    }, set_enableStemming: function (a) {
        this.get_objectData().get_properties()["EnableStemming"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "EnableStemming", a));
        return a
    }, get_generateBlockRankLog: function () {
        this.checkUninitializedProperty("GenerateBlockRankLog");
        return this.get_objectData().get_properties()["GenerateBlockRankLog"]
    }, set_generateBlockRankLog: function (a) {
        this.get_objectData().get_properties()["GenerateBlockRankLog"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "GenerateBlockRankLog", a));
        return a
    }, get_hitHighlightedMultivaluePropertyLimit: function () {
        this.checkUninitializedProperty("HitHighlightedMultivaluePropertyLimit");
        return this.get_objectData().get_properties()["HitHighlightedMultivaluePropertyLimit"]
    }, set_hitHighlightedMultivaluePropertyLimit: function (a) {
        this.get_objectData().get_properties()["HitHighlightedMultivaluePropertyLimit"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "HitHighlightedMultivaluePropertyLimit", a));
        return a
    }, get_hitHighlightedProperties: function () {
        var a = this.get_objectData().get_clientObjectProperties()["HitHighlightedProperties"];
        if (SP.ScriptUtility.isUndefined(a)) {
            a = new Microsoft.SharePoint.Client.Search.Query.StringCollection(this.get_context(), new SP.ObjectPathProperty(this.get_context(), this.get_path(), "HitHighlightedProperties"));
            this.get_objectData().get_clientObjectProperties()["HitHighlightedProperties"] = a
        }
        return a
    }, get_ignoreSafeQueryPropertiesTemplateUrl: function () {
        this.checkUninitializedProperty("IgnoreSafeQueryPropertiesTemplateUrl");
        return this.get_objectData().get_properties()["IgnoreSafeQueryPropertiesTemplateUrl"]
    }, set_ignoreSafeQueryPropertiesTemplateUrl: function (a) {
        this.get_objectData().get_properties()["IgnoreSafeQueryPropertiesTemplateUrl"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "IgnoreSafeQueryPropertiesTemplateUrl", a));
        return a
    }, get_impressionID: function () {
        this.checkUninitializedProperty("ImpressionID");
        return this.get_objectData().get_properties()["ImpressionID"]
    }, set_impressionID: function (a) {
        this.get_objectData().get_properties()["ImpressionID"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "ImpressionID", a));
        return a
    }, get_maxSnippetLength: function () {
        this.checkUninitializedProperty("MaxSnippetLength");
        return this.get_objectData().get_properties()["MaxSnippetLength"]
    }, set_maxSnippetLength: function (a) {
        this.get_objectData().get_properties()["MaxSnippetLength"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "MaxSnippetLength", a));
        return a
    }, get_personalizationData: function () {
        var a = this.get_objectData().get_clientObjectProperties()["PersonalizationData"];
        if (SP.ScriptUtility.isUndefined(a)) {
            a = new Microsoft.SharePoint.Client.Search.Query.QueryPersonalizationData(this.get_context(), new SP.ObjectPathProperty(this.get_context(), this.get_path(), "PersonalizationData"));
            this.get_objectData().get_clientObjectProperties()["PersonalizationData"] = a
        }
        return a
    }, set_personalizationData: function (a) {
        this.get_objectData().get_clientObjectProperties()["PersonalizationData"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "PersonalizationData", a));
        return a
    }, get_processBestBets: function () {
        this.checkUninitializedProperty("ProcessBestBets");
        return this.get_objectData().get_properties()["ProcessBestBets"]
    }, set_processBestBets: function (a) {
        this.get_objectData().get_properties()["ProcessBestBets"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "ProcessBestBets", a));
        return a
    }, get_processPersonalFavorites: function () {
        this.checkUninitializedProperty("ProcessPersonalFavorites");
        return this.get_objectData().get_properties()["ProcessPersonalFavorites"]
    }, set_processPersonalFavorites: function (a) {
        this.get_objectData().get_properties()["ProcessPersonalFavorites"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "ProcessPersonalFavorites", a));
        return a
    }, get_queryTag: function () {
        this.checkUninitializedProperty("QueryTag");
        return this.get_objectData().get_properties()["QueryTag"]
    }, set_queryTag: function (a) {
        this.get_objectData().get_properties()["QueryTag"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "QueryTag", a));
        return a
    }, get_queryTemplate: function () {
        this.checkUninitializedProperty("QueryTemplate");
        return this.get_objectData().get_properties()["QueryTemplate"]
    }, set_queryTemplate: function (a) {
        this.get_objectData().get_properties()["QueryTemplate"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "QueryTemplate", a));
        return a
    }, get_queryTemplateParameters: function () {
        this.checkUninitializedProperty("QueryTemplateParameters");
        return this.get_objectData().get_properties()["QueryTemplateParameters"]
    }, get_queryText: function () {
        this.checkUninitializedProperty("QueryText");
        return this.get_objectData().get_properties()["QueryText"]
    }, set_queryText: function (a) {
        this.get_objectData().get_properties()["QueryText"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "QueryText", a));
        return a
    }, get_rankingModelId: function () {
        this.checkUninitializedProperty("RankingModelId");
        return this.get_objectData().get_properties()["RankingModelId"]
    }, set_rankingModelId: function (a) {
        this.get_objectData().get_properties()["RankingModelId"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "RankingModelId", a));
        return a
    }, get_resultsUrl: function () {
        this.checkUninitializedProperty("ResultsUrl");
        return this.get_objectData().get_properties()["ResultsUrl"]
    }, set_resultsUrl: function (a) {
        this.get_objectData().get_properties()["ResultsUrl"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "ResultsUrl", a));
        return a
    }, get_rowLimit: function () {
        this.checkUninitializedProperty("RowLimit");
        return this.get_objectData().get_properties()["RowLimit"]
    }, set_rowLimit: function (a) {
        this.get_objectData().get_properties()["RowLimit"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "RowLimit", a));
        return a
    }, get_rowsPerPage: function () {
        this.checkUninitializedProperty("RowsPerPage");
        return this.get_objectData().get_properties()["RowsPerPage"]
    }, set_rowsPerPage: function (a) {
        this.get_objectData().get_properties()["RowsPerPage"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "RowsPerPage", a));
        return a
    }, get_safeQueryPropertiesTemplateUrl: function () {
        this.checkUninitializedProperty("SafeQueryPropertiesTemplateUrl");
        return this.get_objectData().get_properties()["SafeQueryPropertiesTemplateUrl"]
    }, set_safeQueryPropertiesTemplateUrl: function (a) {
        this.get_objectData().get_properties()["SafeQueryPropertiesTemplateUrl"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "SafeQueryPropertiesTemplateUrl", a));
        return a
    }, get_showPeopleNameSuggestions: function () {
        this.checkUninitializedProperty("ShowPeopleNameSuggestions");
        return this.get_objectData().get_properties()["ShowPeopleNameSuggestions"]
    }, set_showPeopleNameSuggestions: function (a) {
        this.get_objectData().get_properties()["ShowPeopleNameSuggestions"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "ShowPeopleNameSuggestions", a));
        return a
    }, get_sourceId: function () {
        this.checkUninitializedProperty("SourceId");
        return this.get_objectData().get_properties()["SourceId"]
    }, set_sourceId: function (a) {
        this.get_objectData().get_properties()["SourceId"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "SourceId", a));
        return a
    }, get_startRow: function () {
        this.checkUninitializedProperty("StartRow");
        return this.get_objectData().get_properties()["StartRow"]
    }, set_startRow: function (a) {
        this.get_objectData().get_properties()["StartRow"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "StartRow", a));
        return a
    }, get_summaryLength: function () {
        this.checkUninitializedProperty("SummaryLength");
        return this.get_objectData().get_properties()["SummaryLength"]
    }, set_summaryLength: function (a) {
        this.get_objectData().get_properties()["SummaryLength"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "SummaryLength", a));
        return a
    }, get_timeout: function () {
        this.checkUninitializedProperty("Timeout");
        return this.get_objectData().get_properties()["Timeout"]
    }, set_timeout: function (a) {
        this.get_objectData().get_properties()["Timeout"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "Timeout", a));
        return a
    }, get_totalRowsExactMinimum: function () {
        this.checkUninitializedProperty("TotalRowsExactMinimum");
        return this.get_objectData().get_properties()["TotalRowsExactMinimum"]
    }, set_totalRowsExactMinimum: function (a) {
        this.get_objectData().get_properties()["TotalRowsExactMinimum"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "TotalRowsExactMinimum", a));
        return a
    }, get_trimDuplicates: function () {
        this.checkUninitializedProperty("TrimDuplicates");
        return this.get_objectData().get_properties()["TrimDuplicates"]
    }, set_trimDuplicates: function (a) {
        this.get_objectData().get_properties()["TrimDuplicates"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "TrimDuplicates", a));
        return a
    }, get_uiLanguage: function () {
        this.checkUninitializedProperty("UILanguage");
        return this.get_objectData().get_properties()["UILanguage"]
    }, set_uiLanguage: function (a) {
        this.get_objectData().get_properties()["UILanguage"] = a;
        this.get_context() && this.get_context().addQuery(new SP.ClientActionSetProperty(this, "UILanguage", a));
        return a
    }, initPropertiesFromJson: function (b) {
        SP.ClientObject.prototype.initPropertiesFromJson.call(this, b);
        var a;
        a = b.BlockDedupeMode;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["BlockDedupeMode"] = a;
            delete b.BlockDedupeMode
        }
        a = b.BypassResultTypes;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["BypassResultTypes"] = a;
            delete b.BypassResultTypes
        }
        a = b.ClientType;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["ClientType"] = a;
            delete b.ClientType
        }
        a = b.Culture;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["Culture"] = a;
            delete b.Culture
        }
        a = b.DesiredSnippetLength;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["DesiredSnippetLength"] = a;
            delete b.DesiredSnippetLength
        }
        a = b.EnableInterleaving;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["EnableInterleaving"] = a;
            delete b.EnableInterleaving
        }
        a = b.EnableNicknames;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["EnableNicknames"] = a;
            delete b.EnableNicknames
        }
        a = b.EnableOrderingHitHighlightedProperty;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["EnableOrderingHitHighlightedProperty"] = a;
            delete b.EnableOrderingHitHighlightedProperty
        }
        a = b.EnablePhonetic;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["EnablePhonetic"] = a;
            delete b.EnablePhonetic
        }
        a = b.EnableQueryRules;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["EnableQueryRules"] = a;
            delete b.EnableQueryRules
        }
        a = b.EnableStemming;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["EnableStemming"] = a;
            delete b.EnableStemming
        }
        a = b.GenerateBlockRankLog;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["GenerateBlockRankLog"] = a;
            delete b.GenerateBlockRankLog
        }
        a = b.HitHighlightedMultivaluePropertyLimit;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["HitHighlightedMultivaluePropertyLimit"] = a;
            delete b.HitHighlightedMultivaluePropertyLimit
        }
        a = b.HitHighlightedProperties;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.updateClientObjectPropertyType("HitHighlightedProperties", this.get_hitHighlightedProperties(), a);
            this.get_hitHighlightedProperties().fromJson(a);
            delete b.HitHighlightedProperties
        }
        a = b.IgnoreSafeQueryPropertiesTemplateUrl;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["IgnoreSafeQueryPropertiesTemplateUrl"] = a;
            delete b.IgnoreSafeQueryPropertiesTemplateUrl
        }
        a = b.ImpressionID;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["ImpressionID"] = a;
            delete b.ImpressionID
        }
        a = b.MaxSnippetLength;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["MaxSnippetLength"] = a;
            delete b.MaxSnippetLength
        }
        a = b.PersonalizationData;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.updateClientObjectPropertyType("PersonalizationData", this.get_personalizationData(), a);
            this.get_personalizationData().fromJson(a);
            delete b.PersonalizationData
        }
        a = b.ProcessBestBets;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["ProcessBestBets"] = a;
            delete b.ProcessBestBets
        }
        a = b.ProcessPersonalFavorites;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["ProcessPersonalFavorites"] = a;
            delete b.ProcessPersonalFavorites
        }
        a = b.QueryTag;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["QueryTag"] = a;
            delete b.QueryTag
        }
        a = b.QueryTemplate;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["QueryTemplate"] = a;
            delete b.QueryTemplate
        }
        a = b.QueryTemplateParameters;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["QueryTemplateParameters"] = SP.DataConvert.fixupType(this.get_context(), a);
            delete b.QueryTemplateParameters
        }
        a = b.QueryText;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["QueryText"] = a;
            delete b.QueryText
        }
        a = b.RankingModelId;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["RankingModelId"] = a;
            delete b.RankingModelId
        }
        a = b.ResultsUrl;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["ResultsUrl"] = a;
            delete b.ResultsUrl
        }
        a = b.RowLimit;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["RowLimit"] = a;
            delete b.RowLimit
        }
        a = b.RowsPerPage;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["RowsPerPage"] = a;
            delete b.RowsPerPage
        }
        a = b.SafeQueryPropertiesTemplateUrl;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["SafeQueryPropertiesTemplateUrl"] = a;
            delete b.SafeQueryPropertiesTemplateUrl
        }
        a = b.ShowPeopleNameSuggestions;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["ShowPeopleNameSuggestions"] = a;
            delete b.ShowPeopleNameSuggestions
        }
        a = b.SourceId;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["SourceId"] = a;
            delete b.SourceId
        }
        a = b.StartRow;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["StartRow"] = a;
            delete b.StartRow
        }
        a = b.SummaryLength;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["SummaryLength"] = a;
            delete b.SummaryLength
        }
        a = b.Timeout;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["Timeout"] = a;
            delete b.Timeout
        }
        a = b.TotalRowsExactMinimum;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["TotalRowsExactMinimum"] = a;
            delete b.TotalRowsExactMinimum
        }
        a = b.TrimDuplicates;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["TrimDuplicates"] = a;
            delete b.TrimDuplicates
        }
        a = b.UILanguage;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["UILanguage"] = a;
            delete b.UILanguage
        }
    }, getQuerySuggestionsWithResults: function (e, d, h, i, f, g) {
        var b = this.get_context(), a, c = new SP.ClientActionInvokeMethod(this, "GetQuerySuggestionsWithResults", [e, d, h, i, f, g]);
        b.addQuery(c);
        a = new Microsoft.SharePoint.Client.Search.Query.QuerySuggestionResults;
        b.addQueryIdAndResultObject(c.get_id(), a);
        return a
    }
};
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames = function () {
};
Microsoft.SharePoint.Client.Search.Query.QueryObjectPropertyNames = function () {
};
Microsoft.SharePoint.Client.Search.Query.QueryPersonalizationData = function (a) {
    Microsoft.SharePoint.Client.Search.Query.QueryPersonalizationData.initializeBase(this, [a, SP.ClientUtility.getOrCreateObjectPathForConstructor(a, "{28d79f49-820a-4d51-bb2a-3309b3f4c54d}", arguments)])
};
Microsoft.SharePoint.Client.Search.Query.QueryPersonalizationData.newObject = function (a, b) {
    return new Microsoft.SharePoint.Client.Search.Query.QueryPersonalizationData(a, new SP.ObjectPathConstructor(a, "{28d79f49-820a-4d51-bb2a-3309b3f4c54d}", [b]))
};
Microsoft.SharePoint.Client.Search.Query.QueryPropertyValue = function () {
    Microsoft.SharePoint.Client.Search.Query.QueryPropertyValue.initializeBase(this)
};
Microsoft.SharePoint.Client.Search.Query.QueryPropertyValue.prototype = {
    $1_1: false,
    $2_1: 0,
    $0_1: 0,
    $3_1: null,
    $4_1: null,
    get_boolVal: function () {
        return this.$1_1
    },
    set_boolVal: function (a) {
        this.$1_1 = a;
        return a
    },
    get_intVal: function () {
        return this.$2_1
    },
    set_intVal: function (a) {
        this.$2_1 = a;
        return a
    },
    get_queryPropertyValueTypeIndex: function () {
        return this.$0_1
    },
    set_queryPropertyValueTypeIndex: function (a) {
        this.$0_1 = a;
        return a
    },
    get_strArray: function () {
        return this.$3_1
    },
    set_strArray: function (a) {
        this.$3_1 = a;
        return a
    },
    get_strVal: function () {
        return this.$4_1
    },
    set_strVal: function (a) {
        this.$4_1 = a;
        return a
    },
    get_typeId: function () {
        return "{b25ba502-71d7-4ae4-a701-4ca2fb1223be}"
    },
    writeToXml: function (b, a) {
        if (!b)throw Error.argumentNull("writer");
        if (!a)throw Error.argumentNull("serializationContext");
        var c = ["BoolVal", "IntVal", "QueryPropertyValueTypeIndex", "StrArray", "StrVal"];
        SP.DataConvert.writePropertiesToXml(b, this, c, a);
        SP.ClientValueObject.prototype.writeToXml.call(this, b, a)
    },
    initPropertiesFromJson: function (b) {
        SP.ClientValueObject.prototype.initPropertiesFromJson.call(this, b);
        var a;
        a = b.BoolVal;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$1_1 = a;
            delete b.BoolVal
        }
        a = b.IntVal;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$2_1 = a;
            delete b.IntVal
        }
        a = b.QueryPropertyValueTypeIndex;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$0_1 = a;
            delete b.QueryPropertyValueTypeIndex
        }
        a = b.StrArray;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$3_1 = SP.DataConvert.fixupType(null, a);
            delete b.StrArray
        }
        a = b.StrVal;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$4_1 = a;
            delete b.StrVal
        }
    }
};
Microsoft.SharePoint.Client.Search.Query.QuerySuggestionQuery = function () {
    Microsoft.SharePoint.Client.Search.Query.QuerySuggestionQuery.initializeBase(this)
};
Microsoft.SharePoint.Client.Search.Query.QuerySuggestionQuery.prototype = {
    $F_1: false,
    $L_1: null,
    get_isPersonal: function () {
        return this.$F_1
    },
    set_isPersonal: function (a) {
        this.$F_1 = a;
        return a
    },
    get_query: function () {
        return this.$L_1
    },
    set_query: function (a) {
        this.$L_1 = a;
        return a
    },
    get_typeId: function () {
        return "{44908c33-c578-4342-905a-ee284b67b415}"
    },
    writeToXml: function (b, a) {
        if (!b)throw Error.argumentNull("writer");
        if (!a)throw Error.argumentNull("serializationContext");
        var c = ["IsPersonal", "Query"];
        SP.DataConvert.writePropertiesToXml(b, this, c, a);
        SP.ClientValueObject.prototype.writeToXml.call(this, b, a)
    },
    initPropertiesFromJson: function (b) {
        SP.ClientValueObject.prototype.initPropertiesFromJson.call(this, b);
        var a;
        a = b.IsPersonal;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$F_1 = a;
            delete b.IsPersonal
        }
        a = b.Query;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$L_1 = a;
            delete b.Query
        }
    }
};
Microsoft.SharePoint.Client.Search.Query.QuerySuggestionResults = function () {
    Microsoft.SharePoint.Client.Search.Query.QuerySuggestionResults.initializeBase(this)
};
Microsoft.SharePoint.Client.Search.Query.QuerySuggestionResults.prototype = {
    $J_1: null,
    $5_1: null,
    $7_1: null,
    get_peopleNames: function () {
        return this.$J_1
    },
    set_peopleNames: function (a) {
        this.$J_1 = a;
        return a
    },
    get_personalResults: function () {
        return this.$5_1
    },
    set_personalResults: function (a) {
        this.$5_1 = a;
        return a
    },
    get_queries: function () {
        return this.$7_1
    },
    set_queries: function (a) {
        this.$7_1 = a;
        return a
    },
    get_typeId: function () {
        return "{ef071cb4-7fab-4e8d-9480-f15d30dc696d}"
    },
    writeToXml: function (b, a) {
        if (!b)throw Error.argumentNull("writer");
        if (!a)throw Error.argumentNull("serializationContext");
        var c = ["PeopleNames", "PersonalResults", "Queries"];
        SP.DataConvert.writePropertiesToXml(b, this, c, a);
        SP.ClientValueObject.prototype.writeToXml.call(this, b, a)
    },
    initPropertiesFromJson: function (b) {
        SP.ClientValueObject.prototype.initPropertiesFromJson.call(this, b);
        var a;
        a = b.PeopleNames;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$J_1 = SP.DataConvert.fixupType(null, a);
            delete b.PeopleNames
        }
        a = b.PersonalResults;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$5_1 = [];
            SP.DataConvert.populateArray(null, this.$5_1, a);
            delete b.PersonalResults
        }
        a = b.Queries;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$7_1 = [];
            SP.DataConvert.populateArray(null, this.$7_1, a);
            delete b.Queries
        }
    }
};
Microsoft.SharePoint.Client.Search.Query.RankingLabeling = function (a) {
    Microsoft.SharePoint.Client.Search.Query.RankingLabeling.initializeBase(this, [a, SP.ClientUtility.getOrCreateObjectPathForConstructor(a, "{e2533389-4387-4ebe-8df7-11af5568aed5}", arguments)])
};
Microsoft.SharePoint.Client.Search.Query.RankingLabeling.newObject = function (a) {
    return new Microsoft.SharePoint.Client.Search.Query.RankingLabeling(a, new SP.ObjectPathConstructor(a, "{e2533389-4387-4ebe-8df7-11af5568aed5}", null))
};
Microsoft.SharePoint.Client.Search.Query.RankingLabeling.prototype = {
    getJudgementsForQuery: function (d) {
        var b = this.get_context(), a, c = new SP.ClientActionInvokeMethod(this, "GetJudgementsForQuery", [d]);
        b.addQuery(c);
        a = new SP.JsonObjectResult;
        b.addQueryIdAndResultObject(c.get_id(), a);
        return a
    }, addJudgment: function (a, e, b) {
        var c = this.get_context(), d = new SP.ClientActionInvokeMethod(this, "AddJudgment", [a, e, b]);
        c.addQuery(d)
    }, normalizeResultUrl: function (d) {
        var b = this.get_context(), a, c = new SP.ClientActionInvokeMethod(this, "NormalizeResultUrl", [d]);
        b.addQuery(c);
        a = new SP.JsonObjectResult;
        b.addQueryIdAndResultObject(c.get_id(), a);
        return a
    }
};
Microsoft.SharePoint.Client.Search.Query.ReorderingRule = function () {
    Microsoft.SharePoint.Client.Search.Query.ReorderingRule.initializeBase(this)
};
Microsoft.SharePoint.Client.Search.Query.ReorderingRule.prototype = {
    $9_1: 0,
    $H_1: 0,
    $I_1: null,
    get_boost: function () {
        return this.$9_1
    },
    set_boost: function (a) {
        this.$9_1 = a;
        return a
    },
    get_matchType: function () {
        return this.$H_1
    },
    set_matchType: function (a) {
        this.$H_1 = a;
        return a
    },
    get_matchValue: function () {
        return this.$I_1
    },
    set_matchValue: function (a) {
        this.$I_1 = a;
        return a
    },
    get_typeId: function () {
        return "{d8566f46-74b1-4d92-ba88-0efd23b36f71}"
    },
    writeToXml: function (b, a) {
        if (!b)throw Error.argumentNull("writer");
        if (!a)throw Error.argumentNull("serializationContext");
        var c = ["Boost", "MatchType", "MatchValue"];
        SP.DataConvert.writePropertiesToXml(b, this, c, a);
        SP.ClientValueObject.prototype.writeToXml.call(this, b, a)
    },
    initPropertiesFromJson: function (b) {
        SP.ClientValueObject.prototype.initPropertiesFromJson.call(this, b);
        var a;
        a = b.Boost;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$9_1 = a;
            delete b.Boost
        }
        a = b.MatchType;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$H_1 = SP.DataConvert.fixupType(null, a);
            delete b.MatchType
        }
        a = b.MatchValue;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$I_1 = a;
            delete b.MatchValue
        }
    }
};
Microsoft.SharePoint.Client.Search.Query.ReorderingRuleCollection = function (b, a) {
    Microsoft.SharePoint.Client.Search.Query.ReorderingRuleCollection.initializeBase(this, [b, a])
};
Microsoft.SharePoint.Client.Search.Query.ReorderingRuleCollection.prototype = {
    itemAt: function (a) {
        return this.getItemAtIndex(a)
    }, get_item: function (a) {
        return this.getItemAtIndex(a)
    }, get_childItemType: function () {
        return Microsoft.SharePoint.Client.Search.Query.ReorderingRule
    }, add: function (b, a, c) {
        var d = this.get_context(), e = new SP.ClientActionInvokeMethod(this, "Add", [b, a, c]);
        d.addQuery(e)
    }, clear: function () {
        var a = this.get_context(), b = new SP.ClientActionInvokeMethod(this, "Clear", null);
        a.addQuery(b)
    }
};
Microsoft.SharePoint.Client.Search.Query.ResultTable = function () {
    Microsoft.SharePoint.Client.Search.Query.ResultTable.initializeBase(this)
};
Microsoft.SharePoint.Client.Search.Query.ResultTable.prototype = {
    $U_1: null,
    $W_1: null,
    $6_1: null,
    $8_1: null,
    $b_1: null,
    $c_1: null,
    $d_1: null,
    $e_1: null,
    $f_1: 0,
    $l_1: null,
    $m_1: 0,
    $n_1: 0,
    get_groupTemplateId: function () {
        return this.$U_1
    },
    get_itemTemplateId: function () {
        return this.$W_1
    },
    get_properties: function () {
        return this.$6_1
    },
    get_queryId: function () {
        return this.$8_1
    },
    get_queryRuleId: function () {
        return this.$b_1
    },
    get_resultRows: function () {
        return this.$c_1
    },
    get_resultTitle: function () {
        return this.$d_1
    },
    get_resultTitleUrl: function () {
        return this.$e_1
    },
    get_rowCount: function () {
        return this.$f_1
    },
    get_tableType: function () {
        return this.$l_1
    },
    get_totalRows: function () {
        return this.$m_1
    },
    get_totalRowsIncludingDuplicates: function () {
        return this.$n_1
    },
    get_typeId: function () {
        return "{6780df59-1036-4912-829b-432354f22656}"
    },
    writeToXml: function (b, a) {
        if (!b)throw Error.argumentNull("writer");
        if (!a)throw Error.argumentNull("serializationContext");
        var c = ["GroupTemplateId", "ItemTemplateId", "Properties", "QueryId", "QueryRuleId", "ResultRows", "ResultTitle", "ResultTitleUrl", "RowCount", "TableType", "TotalRows", "TotalRowsIncludingDuplicates"];
        SP.DataConvert.writePropertiesToXml(b, this, c, a);
        SP.ClientValueObject.prototype.writeToXml.call(this, b, a)
    },
    initPropertiesFromJson: function (b) {
        SP.ClientValueObject.prototype.initPropertiesFromJson.call(this, b);
        var a;
        a = b.GroupTemplateId;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$U_1 = a;
            delete b.GroupTemplateId
        }
        a = b.ItemTemplateId;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$W_1 = a;
            delete b.ItemTemplateId
        }
        a = b.Properties;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$6_1 = SP.DataConvert.fixupType(null, a);
            delete b.Properties
        }
        a = b.QueryId;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$8_1 = a;
            delete b.QueryId
        }
        a = b.QueryRuleId;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$b_1 = a;
            delete b.QueryRuleId
        }
        a = b.ResultRows;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$c_1 = SP.DataConvert.fixupType(null, a);
            delete b.ResultRows
        }
        a = b.ResultTitle;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$d_1 = a;
            delete b.ResultTitle
        }
        a = b.ResultTitleUrl;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$e_1 = a;
            delete b.ResultTitleUrl
        }
        a = b.RowCount;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$f_1 = a;
            delete b.RowCount
        }
        a = b.TableType;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$l_1 = a;
            delete b.TableType
        }
        a = b.TotalRows;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$m_1 = a;
            delete b.TotalRows
        }
        a = b.TotalRowsIncludingDuplicates;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$n_1 = a;
            delete b.TotalRowsIncludingDuplicates
        }
    }
};
Microsoft.SharePoint.Client.Search.Query.ResultTableCollection = function () {
    Microsoft.SharePoint.Client.Search.Query.ResultTableCollection.initializeBase(this)
};
Microsoft.SharePoint.Client.Search.Query.ResultTableCollection.prototype = {
    $C_2: 0,
    $6_2: null,
    $a_2: null,
    $8_2: null,
    $j_2: null,
    $o_2: null,
    add: function (a) {
        this.addChild(a)
    },
    get_item: function (a) {
        return this.getItemAtIndex(a)
    },
    get_elapsedTime: function () {
        return this.$C_2
    },
    set_elapsedTime: function (a) {
        this.$C_2 = a;
        return a
    },
    get_properties: function () {
        return this.$6_2
    },
    get_queryErrors: function () {
        return this.$a_2
    },
    get_queryId: function () {
        return this.$8_2
    },
    get_spellingSuggestion: function () {
        return this.$j_2
    },
    get_triggeredRules: function () {
        return this.$o_2
    },
    get_typeId: function () {
        return "{11f20d08-7f42-49c1-8c0c-8ee4c32b203e}"
    },
    get_childItemsName: function () {
        return "ResultTables"
    },
    writeToXml: function (b, a) {
        if (!b)throw Error.argumentNull("writer");
        if (!a)throw Error.argumentNull("serializationContext");
        var c = ["ElapsedTime", "Properties", "QueryErrors", "QueryId", "SpellingSuggestion", "TriggeredRules"];
        SP.DataConvert.writePropertiesToXml(b, this, c, a);
        SP.ClientValueObjectCollection.prototype.writeToXml.call(this, b, a)
    },
    initPropertiesFromJson: function (b) {
        SP.ClientValueObjectCollection.prototype.initPropertiesFromJson.call(this, b);
        var a;
        a = b.ElapsedTime;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$C_2 = a;
            delete b.ElapsedTime
        }
        a = b.Properties;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$6_2 = SP.DataConvert.fixupType(null, a);
            delete b.Properties
        }
        a = b.QueryErrors;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$a_2 = SP.DataConvert.fixupType(null, a);
            delete b.QueryErrors
        }
        a = b.QueryId;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$8_2 = a;
            delete b.QueryId
        }
        a = b.SpellingSuggestion;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$j_2 = a;
            delete b.SpellingSuggestion
        }
        a = b.TriggeredRules;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$o_2 = SP.DataConvert.fixupType(null, a);
            delete b.TriggeredRules
        }
    }
};
Microsoft.SharePoint.Client.Search.Query.SearchExecutor = function (a) {
    Microsoft.SharePoint.Client.Search.Query.SearchExecutor.initializeBase(this, [a, SP.ClientUtility.getOrCreateObjectPathForConstructor(a, "{8d2ac302-db2f-46fe-9015-872b35f15098}", arguments)])
};
Microsoft.SharePoint.Client.Search.Query.SearchExecutor.newObject = function (a) {
    return new Microsoft.SharePoint.Client.Search.Query.SearchExecutor(a, new SP.ObjectPathConstructor(a, "{8d2ac302-db2f-46fe-9015-872b35f15098}", null))
};
Microsoft.SharePoint.Client.Search.Query.SearchExecutor.prototype = {
    executeQuery: function (d) {
        var b = this.get_context(), a, c = new SP.ClientActionInvokeMethod(this, "ExecuteQuery", [d]);
        b.addQuery(c);
        a = new SP.JsonObjectResult;
        b.addQueryIdAndResultObject(c.get_id(), a);
        return a
    }, executeQueries: function (e, f, d) {
        var b = this.get_context(), a, c = new SP.ClientActionInvokeMethod(this, "ExecuteQueries", [e, f, d]);
        b.addQuery(c);
        a = new SP.JsonObjectResult;
        b.addQueryIdAndResultObject(c.get_id(), a);
        return a
    }, recordPageClick: function (i, h, g, c, e, b, a, d, f) {
        var j = this.get_context(), k = new SP.ClientActionInvokeMethod(this, "RecordPageClick", [i, h, g, c, e, b, a, d, f]);
        j.addQuery(k)
    }, exportPopularQueries: function (e, d) {
        var b = this.get_context(), a, c = new SP.ClientActionInvokeMethod(this, "ExportPopularQueries", [e, d]);
        b.addQuery(c);
        a = new SP.JsonObjectResult;
        b.addQueryIdAndResultObject(c.get_id(), a);
        return a
    }
};
Microsoft.SharePoint.Client.Search.Query.Sort = function () {
    Microsoft.SharePoint.Client.Search.Query.Sort.initializeBase(this)
};
Microsoft.SharePoint.Client.Search.Query.Sort.prototype = {
    $B_1: 0, $K_1: null, get_direction: function () {
        return this.$B_1
    }, set_direction: function (a) {
        this.$B_1 = a;
        return a
    }, get_property: function () {
        return this.$K_1
    }, set_property: function (a) {
        this.$K_1 = a;
        return a
    }, get_typeId: function () {
        return "{2cd54ef7-c2b3-4405-bce3-ec521d35a7eb}"
    }, writeToXml: function (b, a) {
        if (!b)throw Error.argumentNull("writer");
        if (!a)throw Error.argumentNull("serializationContext");
        var c = ["Direction", "Property"];
        SP.DataConvert.writePropertiesToXml(b, this, c, a);
        SP.ClientValueObject.prototype.writeToXml.call(this, b, a)
    }, initPropertiesFromJson: function (b) {
        SP.ClientValueObject.prototype.initPropertiesFromJson.call(this, b);
        var a;
        a = b.Direction;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$B_1 = SP.DataConvert.fixupType(null, a);
            delete b.Direction
        }
        a = b.Property;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$K_1 = a;
            delete b.Property
        }
    }
};
Microsoft.SharePoint.Client.Search.Query.SortCollection = function (b, a) {
    Microsoft.SharePoint.Client.Search.Query.SortCollection.initializeBase(this, [b, a])
};
Microsoft.SharePoint.Client.Search.Query.SortCollection.prototype = {
    itemAt: function (a) {
        return this.getItemAtIndex(a)
    }, get_item: function (a) {
        return this.getItemAtIndex(a)
    }, get_childItemType: function () {
        return Microsoft.SharePoint.Client.Search.Query.Sort
    }, add: function (a, b) {
        var c = this.get_context(), d = new SP.ClientActionInvokeMethod(this, "Add", [a, b]);
        c.addQuery(d)
    }, clear: function () {
        var a = this.get_context(), b = new SP.ClientActionInvokeMethod(this, "Clear", null);
        a.addQuery(b)
    }
};
Microsoft.SharePoint.Client.Search.Query.StringCollection = function (a) {
    Microsoft.SharePoint.Client.Search.Query.StringCollection.initializeBase(this, [a, SP.ClientUtility.getOrCreateObjectPathForConstructor(a, "{17c6c8ba-c570-4db1-993a-fbacf4e4ef07}", arguments)])
};
Microsoft.SharePoint.Client.Search.Query.StringCollection.newObject = function (a) {
    return new Microsoft.SharePoint.Client.Search.Query.StringCollection(a, new SP.ObjectPathConstructor(a, "{17c6c8ba-c570-4db1-993a-fbacf4e4ef07}", null))
};
Microsoft.SharePoint.Client.Search.Query.StringCollection.prototype = {
    itemAt: function (a) {
        return this.getItemAtIndex(a)
    }, get_item: function (a) {
        return this.getItemAtIndex(a)
    }, get_childItemType: function () {
        return String
    }, add: function (a) {
        var b = this.get_context(), c = new SP.ClientActionInvokeMethod(this, "Add", [a]);
        b.addQuery(c)
    }, clear: function () {
        var a = this.get_context(), b = new SP.ClientActionInvokeMethod(this, "Clear", null);
        a.addQuery(b)
    }
};
Type.registerNamespace("Microsoft.Office.Server.Search.WebControls");
Microsoft.Office.Server.Search.WebControls.MessageLevel = function () {
};
Microsoft.Office.Server.Search.WebControls.MessageLevel.prototype = {information: 0, warning: 1, error: 2};
Microsoft.Office.Server.Search.WebControls.MessageLevel.registerEnum("Microsoft.Office.Server.Search.WebControls.MessageLevel", false);
Microsoft.Office.Server.Search.WebControls.ControlMessage = function () {
    Microsoft.Office.Server.Search.WebControls.ControlMessage.initializeBase(this)
};
Microsoft.Office.Server.Search.WebControls.ControlMessage.prototype = {
    $R_1: 0,
    $S_1: null,
    $T_1: false,
    $V_1: null,
    $X_1: 0,
    $Y_1: null,
    $Z_1: null,
    $g_1: null,
    $h_1: false,
    $i_1: false,
    $k_1: null,
    $p_1: null,
    get_code: function () {
        return this.$R_1
    },
    get_correlationID: function () {
        return this.$S_1
    },
    get_encodeDetails: function () {
        return this.$T_1
    },
    get_header: function () {
        return this.$V_1
    },
    get_level: function () {
        return this.$X_1
    },
    get_messageDetails: function () {
        return this.$Y_1
    },
    get_messageDetailsForViewers: function () {
        return this.$Z_1
    },
    get_serverTypeId: function () {
        return this.$g_1
    },
    get_showForViewerUsers: function () {
        return this.$h_1
    },
    get_showInEditModeOnly: function () {
        return this.$i_1
    },
    get_stackTrace: function () {
        return this.$k_1
    },
    get_type: function () {
        return this.$p_1
    },
    get_typeId: function () {
        return "{d3dfef63-4d44-497d-b936-047135645ad7}"
    },
    writeToXml: function (b, a) {
        if (!b)throw Error.argumentNull("writer");
        if (!a)throw Error.argumentNull("serializationContext");
        var c = ["code", "correlationID", "encodeDetails", "header", "level", "messageDetails", "messageDetailsForViewers", "serverTypeId", "showForViewerUsers", "showInEditModeOnly", "stackTrace", "type"];
        SP.DataConvert.writePropertiesToXml(b, this, c, a);
        SP.ClientValueObject.prototype.writeToXml.call(this, b, a)
    },
    initPropertiesFromJson: function (b) {
        SP.ClientValueObject.prototype.initPropertiesFromJson.call(this, b);
        var a;
        a = b.code;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$R_1 = a;
            delete b.code
        }
        a = b.correlationID;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$S_1 = a;
            delete b.correlationID
        }
        a = b.encodeDetails;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$T_1 = a;
            delete b.encodeDetails
        }
        a = b.header;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$V_1 = a;
            delete b.header
        }
        a = b.level;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$X_1 = SP.DataConvert.fixupType(null, a);
            delete b.level
        }
        a = b.messageDetails;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$Y_1 = a;
            delete b.messageDetails
        }
        a = b.messageDetailsForViewers;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$Z_1 = a;
            delete b.messageDetailsForViewers
        }
        a = b.serverTypeId;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$g_1 = a;
            delete b.serverTypeId
        }
        a = b.showForViewerUsers;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$h_1 = a;
            delete b.showForViewerUsers
        }
        a = b.showInEditModeOnly;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$i_1 = a;
            delete b.showInEditModeOnly
        }
        a = b.stackTrace;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$k_1 = a;
            delete b.stackTrace
        }
        a = b.type;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.$p_1 = a;
            delete b.type
        }
    }
};
Type.registerNamespace("Microsoft.SharePoint.Client.Search.Administration");
Microsoft.SharePoint.Client.Search.Administration.SearchObjectLevel = function () {
};
Microsoft.SharePoint.Client.Search.Administration.SearchObjectLevel.prototype = {
    spWeb: 0,
    spSite: 1,
    spSiteSubscription: 2,
    ssa: 3
};
Microsoft.SharePoint.Client.Search.Administration.SearchObjectLevel.registerEnum("Microsoft.SharePoint.Client.Search.Administration.SearchObjectLevel", false);
Microsoft.SharePoint.Client.Search.Administration.DocumentCrawlLog = function (a) {
    Microsoft.SharePoint.Client.Search.Administration.DocumentCrawlLog.initializeBase(this, [a, SP.ClientUtility.getOrCreateObjectPathForConstructor(a, "{5c5cfd42-0712-4c00-ae49-23b33ba34ecc}", arguments)])
};
Microsoft.SharePoint.Client.Search.Administration.DocumentCrawlLog.newObject = function (a, b) {
    return new Microsoft.SharePoint.Client.Search.Administration.DocumentCrawlLog(a, new SP.ObjectPathConstructor(a, "{5c5cfd42-0712-4c00-ae49-23b33ba34ecc}", [b]))
};
Microsoft.SharePoint.Client.Search.Administration.DocumentCrawlLog.prototype = {
    getCrawledUrls: function (f, k, h, l, d, i, j, e, g) {
        var b = this.get_context(), a, c = new SP.ClientActionInvokeMethod(this, "GetCrawledUrls", [f, k, h, l, d, i, j, e, g]);
        b.addQuery(c);
        a = new SP.ClientResult;
        b.addQueryIdAndResultObject(c.get_id(), a);
        return a
    }
};
Microsoft.SharePoint.Client.Search.Administration.SearchObjectOwner = function (a) {
    Microsoft.SharePoint.Client.Search.Administration.SearchObjectOwner.initializeBase(this, [a, SP.ClientUtility.getOrCreateObjectPathForConstructor(a, "{e6834c69-54c1-4bfc-9805-4b88406c28bb}", arguments)])
};
Microsoft.SharePoint.Client.Search.Administration.SearchObjectOwner.newObject = function (a, b) {
    return new Microsoft.SharePoint.Client.Search.Administration.SearchObjectOwner(a, new SP.ObjectPathConstructor(a, "{e6834c69-54c1-4bfc-9805-4b88406c28bb}", [b]))
};
Type.registerNamespace("Microsoft.SharePoint.Client.Search.ContentPush");
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantManager = function (a) {
    Microsoft.SharePoint.Client.Search.ContentPush.PushTenantManager.initializeBase(this, [a, SP.ClientUtility.getOrCreateObjectPathForConstructor(a, "{098ad99c-6f30-478b-9ea7-f8c3ab3f0083}", arguments)])
};
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantManager.newObject = function (a) {
    return new Microsoft.SharePoint.Client.Search.ContentPush.PushTenantManager(a, new SP.ObjectPathConstructor(a, "{098ad99c-6f30-478b-9ea7-f8c3ab3f0083}", null))
};
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantManager.prototype = {
    preparePushTenant: function () {
        var b = this.get_context(), a, c = new SP.ClientActionInvokeMethod(this, "PreparePushTenant", null);
        b.addQuery(c);
        a = new SP.JsonObjectResult;
        b.addQueryIdAndResultObject(c.get_id(), a);
        return a
    }, getPushServiceInfo: function () {
        var a = this.get_context(), b;
        b = new Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfo(a, new SP.ObjectPathMethod(a, this.get_path(), "GetPushServiceInfo", null));
        return b
    }
};
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfo = function (b, a) {
    Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfo.initializeBase(this, [b, a])
};
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfo.prototype = {
    get_authenticationRealm: function () {
        this.checkUninitializedProperty("AuthenticationRealm");
        return this.get_objectData().get_properties()["AuthenticationRealm"]
    }, get_endpointAddress: function () {
        this.checkUninitializedProperty("EndpointAddress");
        return this.get_objectData().get_properties()["EndpointAddress"]
    }, get_serviceProperties: function () {
        this.checkUninitializedProperty("ServiceProperties");
        return this.get_objectData().get_properties()["ServiceProperties"]
    }, get_tenantId: function () {
        this.checkUninitializedProperty("TenantId");
        return this.get_objectData().get_properties()["TenantId"]
    }, get_validContentEncryptionCertificates: function () {
        this.checkUninitializedProperty("ValidContentEncryptionCertificates");
        return this.get_objectData().get_properties()["ValidContentEncryptionCertificates"]
    }, get_validUntil: function () {
        this.checkUninitializedProperty("ValidUntil");
        return this.get_objectData().get_properties()["ValidUntil"]
    }, initPropertiesFromJson: function (b) {
        SP.ClientObject.prototype.initPropertiesFromJson.call(this, b);
        var a;
        a = b.AuthenticationRealm;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["AuthenticationRealm"] = a;
            delete b.AuthenticationRealm
        }
        a = b.EndpointAddress;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["EndpointAddress"] = a;
            delete b.EndpointAddress
        }
        a = b.ServiceProperties;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["ServiceProperties"] = SP.DataConvert.fixupType(this.get_context(), a);
            delete b.ServiceProperties
        }
        a = b.TenantId;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["TenantId"] = a;
            delete b.TenantId
        }
        a = b.ValidContentEncryptionCertificates;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["ValidContentEncryptionCertificates"] = SP.DataConvert.fixupType(this.get_context(), a);
            delete b.ValidContentEncryptionCertificates
        }
        a = b.ValidUntil;
        if (!SP.ScriptUtility.isUndefined(a)) {
            this.get_objectData().get_properties()["ValidUntil"] = a;
            delete b.ValidUntil
        }
    }
};
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfoPropertyNames = function () {
};
Type.registerNamespace("Microsoft.SharePoint.Client.Search.Portability");
Microsoft.SharePoint.Client.Search.Portability.SearchConfigurationPortability = function (a) {
    Microsoft.SharePoint.Client.Search.Portability.SearchConfigurationPortability.initializeBase(this, [a, SP.ClientUtility.getOrCreateObjectPathForConstructor(a, "{f44b2c90-ddc4-49c8-8d4d-4fb56dcc3247}", arguments)])
};
Microsoft.SharePoint.Client.Search.Portability.SearchConfigurationPortability.newObject = function (a) {
    return new Microsoft.SharePoint.Client.Search.Portability.SearchConfigurationPortability(a, new SP.ObjectPathConstructor(a, "{f44b2c90-ddc4-49c8-8d4d-4fb56dcc3247}", null))
};
Microsoft.SharePoint.Client.Search.Portability.SearchConfigurationPortability.prototype = {
    get_importWarnings: function () {
        this.checkUninitializedProperty("ImportWarnings");
        return this.get_objectData().get_properties()["ImportWarnings"]
    }, initPropertiesFromJson: function (a) {
        SP.ClientObject.prototype.initPropertiesFromJson.call(this, a);
        var b;
        b = a.ImportWarnings;
        if (!SP.ScriptUtility.isUndefined(b)) {
            this.get_objectData().get_properties()["ImportWarnings"] = b;
            delete a.ImportWarnings
        }
    }, exportSearchConfiguration: function (d) {
        var b = this.get_context(), a, c = new SP.ClientActionInvokeMethod(this, "ExportSearchConfiguration", [d]);
        b.addQuery(c);
        a = new SP.StringResult;
        b.addQueryIdAndResultObject(c.get_id(), a);
        return a
    }, importSearchConfiguration: function (b, a) {
        var c = this.get_context(), d = new SP.ClientActionInvokeMethod(this, "ImportSearchConfiguration", [b, a]);
        c.addQuery(d)
    }, deleteSearchConfiguration: function (b, a) {
        var c = this.get_context(), d = new SP.ClientActionInvokeMethod(this, "DeleteSearchConfiguration", [b, a]);
        c.addQuery(d)
    }
};
Microsoft.SharePoint.Client.Search.Portability.SearchConfigurationPortabilityPropertyNames = function () {
};
Microsoft.SharePoint.Client.Search.Query.KeywordQueryProperties.registerClass("Microsoft.SharePoint.Client.Search.Query.KeywordQueryProperties", SP.ClientObject);
Microsoft.SharePoint.Client.Search.Query.QueryUtility.registerClass("Microsoft.SharePoint.Client.Search.Query.QueryUtility");
Microsoft.SharePoint.Client.Search.Query.Query.registerClass("Microsoft.SharePoint.Client.Search.Query.Query", SP.ClientObject);
Microsoft.SharePoint.Client.Search.Query.KeywordQuery.registerClass("Microsoft.SharePoint.Client.Search.Query.KeywordQuery", Microsoft.SharePoint.Client.Search.Query.Query);
Microsoft.SharePoint.Client.Search.Query.KeywordQueryPropertyNames.registerClass("Microsoft.SharePoint.Client.Search.Query.KeywordQueryPropertyNames");
Microsoft.SharePoint.Client.Search.Query.KeywordQueryObjectPropertyNames.registerClass("Microsoft.SharePoint.Client.Search.Query.KeywordQueryObjectPropertyNames");
Microsoft.SharePoint.Client.Search.Query.PersonalResultSuggestion.registerClass("Microsoft.SharePoint.Client.Search.Query.PersonalResultSuggestion", SP.ClientValueObject);
Microsoft.SharePoint.Client.Search.Query.PopularQuery.registerClass("Microsoft.SharePoint.Client.Search.Query.PopularQuery", SP.ClientValueObject);
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.registerClass("Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames");
Microsoft.SharePoint.Client.Search.Query.QueryObjectPropertyNames.registerClass("Microsoft.SharePoint.Client.Search.Query.QueryObjectPropertyNames");
Microsoft.SharePoint.Client.Search.Query.QueryPersonalizationData.registerClass("Microsoft.SharePoint.Client.Search.Query.QueryPersonalizationData", SP.ClientObject);
Microsoft.SharePoint.Client.Search.Query.QueryPropertyValue.registerClass("Microsoft.SharePoint.Client.Search.Query.QueryPropertyValue", SP.ClientValueObject);
Microsoft.SharePoint.Client.Search.Query.QuerySuggestionQuery.registerClass("Microsoft.SharePoint.Client.Search.Query.QuerySuggestionQuery", SP.ClientValueObject);
Microsoft.SharePoint.Client.Search.Query.QuerySuggestionResults.registerClass("Microsoft.SharePoint.Client.Search.Query.QuerySuggestionResults", SP.ClientValueObject);
Microsoft.SharePoint.Client.Search.Query.RankingLabeling.registerClass("Microsoft.SharePoint.Client.Search.Query.RankingLabeling", SP.ClientObject);
Microsoft.SharePoint.Client.Search.Query.ReorderingRule.registerClass("Microsoft.SharePoint.Client.Search.Query.ReorderingRule", SP.ClientValueObject);
Microsoft.SharePoint.Client.Search.Query.ReorderingRuleCollection.registerClass("Microsoft.SharePoint.Client.Search.Query.ReorderingRuleCollection", SP.ClientObjectCollection);
Microsoft.SharePoint.Client.Search.Query.ResultTable.registerClass("Microsoft.SharePoint.Client.Search.Query.ResultTable", SP.ClientValueObject);
Microsoft.SharePoint.Client.Search.Query.ResultTableCollection.registerClass("Microsoft.SharePoint.Client.Search.Query.ResultTableCollection", SP.ClientValueObjectCollection);
Microsoft.SharePoint.Client.Search.Query.SearchExecutor.registerClass("Microsoft.SharePoint.Client.Search.Query.SearchExecutor", SP.ClientObject);
Microsoft.SharePoint.Client.Search.Query.Sort.registerClass("Microsoft.SharePoint.Client.Search.Query.Sort", SP.ClientValueObject);
Microsoft.SharePoint.Client.Search.Query.SortCollection.registerClass("Microsoft.SharePoint.Client.Search.Query.SortCollection", SP.ClientObjectCollection);
Microsoft.SharePoint.Client.Search.Query.StringCollection.registerClass("Microsoft.SharePoint.Client.Search.Query.StringCollection", SP.ClientObjectCollection);
Microsoft.Office.Server.Search.WebControls.ControlMessage.registerClass("Microsoft.Office.Server.Search.WebControls.ControlMessage", SP.ClientValueObject);
Microsoft.SharePoint.Client.Search.Administration.DocumentCrawlLog.registerClass("Microsoft.SharePoint.Client.Search.Administration.DocumentCrawlLog", SP.ClientObject);
Microsoft.SharePoint.Client.Search.Administration.SearchObjectOwner.registerClass("Microsoft.SharePoint.Client.Search.Administration.SearchObjectOwner", SP.ClientObject);
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantManager.registerClass("Microsoft.SharePoint.Client.Search.ContentPush.PushTenantManager", SP.ClientObject);
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfo.registerClass("Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfo", SP.ClientObject);
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfoPropertyNames.registerClass("Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfoPropertyNames");
Microsoft.SharePoint.Client.Search.Portability.SearchConfigurationPortability.registerClass("Microsoft.SharePoint.Client.Search.Portability.SearchConfigurationPortability", SP.ClientObject);
Microsoft.SharePoint.Client.Search.Portability.SearchConfigurationPortabilityPropertyNames.registerClass("Microsoft.SharePoint.Client.Search.Portability.SearchConfigurationPortabilityPropertyNames");
Microsoft.SharePoint.Client.Search.Query.QueryUtility.$Q = [null, String, Number, Boolean, Array];
Microsoft.SharePoint.Client.Search.Query.KeywordQueryPropertyNames.collapseSpecification = "CollapseSpecification";
Microsoft.SharePoint.Client.Search.Query.KeywordQueryPropertyNames.enableSorting = "EnableSorting";
Microsoft.SharePoint.Client.Search.Query.KeywordQueryPropertyNames.hiddenConstraints = "HiddenConstraints";
Microsoft.SharePoint.Client.Search.Query.KeywordQueryPropertyNames.refiners = "Refiners";
Microsoft.SharePoint.Client.Search.Query.KeywordQueryPropertyNames.timeZoneId = "TimeZoneId";
Microsoft.SharePoint.Client.Search.Query.KeywordQueryPropertyNames.trimDuplicatesIncludeId = "TrimDuplicatesIncludeId";
Microsoft.SharePoint.Client.Search.Query.KeywordQueryObjectPropertyNames.properties = "Properties";
Microsoft.SharePoint.Client.Search.Query.KeywordQueryObjectPropertyNames.refinementFilters = "RefinementFilters";
Microsoft.SharePoint.Client.Search.Query.KeywordQueryObjectPropertyNames.reorderingRules = "ReorderingRules";
Microsoft.SharePoint.Client.Search.Query.KeywordQueryObjectPropertyNames.selectProperties = "SelectProperties";
Microsoft.SharePoint.Client.Search.Query.KeywordQueryObjectPropertyNames.sortList = "SortList";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.blockDedupeMode = "BlockDedupeMode";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.bypassResultTypes = "BypassResultTypes";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.clientType = "ClientType";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.culture = "Culture";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.desiredSnippetLength = "DesiredSnippetLength";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.enableInterleaving = "EnableInterleaving";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.enableNicknames = "EnableNicknames";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.enableOrderingHitHighlightedProperty = "EnableOrderingHitHighlightedProperty";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.enablePhonetic = "EnablePhonetic";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.enableQueryRules = "EnableQueryRules";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.enableStemming = "EnableStemming";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.generateBlockRankLog = "GenerateBlockRankLog";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.hitHighlightedMultivaluePropertyLimit = "HitHighlightedMultivaluePropertyLimit";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.ignoreSafeQueryPropertiesTemplateUrl = "IgnoreSafeQueryPropertiesTemplateUrl";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.impressionID = "ImpressionID";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.maxSnippetLength = "MaxSnippetLength";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.processBestBets = "ProcessBestBets";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.processPersonalFavorites = "ProcessPersonalFavorites";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.queryTag = "QueryTag";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.queryTemplate = "QueryTemplate";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.queryTemplateParameters = "QueryTemplateParameters";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.queryText = "QueryText";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.rankingModelId = "RankingModelId";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.resultsUrl = "ResultsUrl";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.rowLimit = "RowLimit";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.rowsPerPage = "RowsPerPage";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.safeQueryPropertiesTemplateUrl = "SafeQueryPropertiesTemplateUrl";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.showPeopleNameSuggestions = "ShowPeopleNameSuggestions";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.sourceId = "SourceId";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.startRow = "StartRow";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.summaryLength = "SummaryLength";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.timeout = "Timeout";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.totalRowsExactMinimum = "TotalRowsExactMinimum";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.trimDuplicates = "TrimDuplicates";
Microsoft.SharePoint.Client.Search.Query.QueryPropertyNames.uiLanguage = "UILanguage";
Microsoft.SharePoint.Client.Search.Query.QueryObjectPropertyNames.hitHighlightedProperties = "HitHighlightedProperties";
Microsoft.SharePoint.Client.Search.Query.QueryObjectPropertyNames.personalizationData = "PersonalizationData";
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfoPropertyNames.authenticationRealm = "AuthenticationRealm";
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfoPropertyNames.endpointAddress = "EndpointAddress";
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfoPropertyNames.serviceProperties = "ServiceProperties";
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfoPropertyNames.tenantId = "TenantId";
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfoPropertyNames.validContentEncryptionCertificates = "ValidContentEncryptionCertificates";
Microsoft.SharePoint.Client.Search.ContentPush.PushTenantServiceInfoPropertyNames.validUntil = "ValidUntil";
Microsoft.SharePoint.Client.Search.Portability.SearchConfigurationPortabilityPropertyNames.importWarnings = "ImportWarnings";
typeof Sys != "undefined" && Sys && Sys.Application && Sys.Application.notifyScriptLoaded();
NotifyScriptLoadedAndExecuteWaitingJobs("sp.search.js")