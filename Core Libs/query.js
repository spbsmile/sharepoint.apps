function queryByUniqueTitle(internalNameField, valueSelected){
     var caml = new SP.CamlQuery();
                caml.set_viewXml("<View><Query>" +
                        new CamlBuilder().Where()
                                .LookupField(internalNameField)
                                .ValueAsText().In([valueSelected])
                                .ToString() +
                        "</Query></View>");
     return caml;
}