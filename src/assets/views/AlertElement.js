import Backbone from 'backbone';
import AlertModel from '../models/AlertModel';
import Modal from './Modal';
import _ from 'underscore';
const logTemplate = require("../templates/log.handlebars");

let AlertElement = Backbone.View.extend({
    model: AlertModel,

    attributes(){
        return {
            "class":"alert alert-custom alert-secondary alert-dismissible fade show",
            "role":"alert",
            "data-toggle":"modal",
            "data-target": "#staticBackdrop"
        }
    },

    events(){
        return {
            "click" : "handleClick",
            "click #close" : "removeAlertView"
        }
    },

    initialize(){
        _.bindAll(this, "handleModelDestroy", "removeAlertView");
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "destroy", this.handleModelDestroy);
        this.render();
    },

    render(){
        this.$el.html(logTemplate(this.model.attributes));
        return this;
    },

    handleClick(e){
        if(e.target.parentNode && e.target.parentNode.className === "close"
            || e.target.className === "close") return;
        Modal.showModal(this.model);
    },

    handleModelDestroy(){
        this.remove();
    },

    removeAlertView(){
        this.model.destroy();
    }
});

export default AlertElement