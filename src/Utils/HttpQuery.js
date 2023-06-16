export const JsonToQueryParameter = (json) => {
    const propertyNames = Object.getOwnPropertyNames(json);
    return propertyNames.reduce((acc, prop, index) => {
        let tmpProp = acc + (prop + "=" + json[prop]);
        if (index != (propertyNames.length - 1)) {
            tmpProp += "&";
        }
        return tmpProp;
    }, "");
}