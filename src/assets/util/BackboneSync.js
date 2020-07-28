/* Overriding Backbone's sync function for use with local storage */
import Backbone from 'backbone';
import _ from 'underscore';

const ALERT_ID = "alertElements";

const retrieveAlerts = () => {
    try {
        return JSON.parse(localStorage.getItem(ALERT_ID)) || [];
    } catch(e){
        return [];
    }
};

const persistAlertCollection = (alertCollection) => {
    localStorage.setItem(ALERT_ID, JSON.stringify(alertCollection));
};

const persistAlertModel = (alertModel) => {
    let alerts = retrieveAlerts();
    if(alerts.length > 0){
        alerts.push(alertModel);
        localStorage.setItem(ALERT_ID, JSON.stringify(alerts));
    } else {
        localStorage.setItem(ALERT_ID, JSON.stringify([alertModel]));
    }
};

const createRecord = (model, options) => {
    if(model instanceof Backbone.Model){
        model.set('id', new Date().getTime());
        persistAlertModel(model.toJSON());
    } else if (model instanceof Backbone.Collection){
        let alerts = retrieveAlerts();
        if(alerts.length > 0){
            //take the collection and merge it then set it
            persistAlertCollection(model.toJSON());
        } else {
            persistAlertCollection(model.toJSON());
        }
    }
};

const readRecord = (model, options) => {
    let alertElements = retrieveAlerts();

    if(alertElements.length > 0)
        model.set(alertElements);
};

const updateRecord = (model, options) => {
    let alerts = retrieveAlerts();

    if(model instanceof Backbone.Model){
        if(alerts && alerts.length > 0){
            let id = model.get("id");
            let modelProps = model.toJSON();
            let mergedCollection = _.map(alerts, (storedModel) => {
                if(storedModel.id === id) {
                    return _.extend(storedModel, modelProps);
                } else {
                    return storedModel;
                }
            });
            persistAlertCollection(mergedCollection);
        }
    } else if(model instanceof Backbone.Collection){

    }

};

const deleteRecord = (element, options) => {
    let alerts = retrieveAlerts();
    if(element instanceof Backbone.Model){
        if(alerts.length > 0){
            let updatedCollection = _.filter(alerts, (aModel) => {
                return aModel.id !== element.get("id");
            });
            persistAlertCollection(updatedCollection);
        }
    } else if (element instanceof Backbone.Collection) {
        element.reset();
        localStorage.removeItem(ALERT_ID);
    }

};

Backbone.sync = (method, model, options) => {
    try {
        switch(method){
            case "create":
                createRecord(model, options);
                break;
            case "read":
                readRecord(model, options);
                break;
            case "update":
                updateRecord(model, options);
                break;
            case "delete":
                deleteRecord(model, options);
        }

        if(options && options.success && _.isFunction(options.success))
            options.success.apply(model, options);
    } catch(e){
        if(options && options.error && _.isFunction(options.error))
            options.error.apply(model, options);
    }
};