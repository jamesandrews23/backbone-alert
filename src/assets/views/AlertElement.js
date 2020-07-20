import Backbone from 'backbone';
import AlertModel from '../models/AlertModel';
import Modal from './Modal';
const logTemplate = require("../templates/log.handlebars");

export default class AlertElement extends Backbone.View {
    attributes(){
        return {
            "class":"alert alert-custom alert-secondary alert-dismissible fade show",
            "role":"alert",
            "data-toggle":"modal",
            "data-target": "#staticBackdrop"
        }
    }

    events(){
        return {
            "click" : "handleClick"
        }
    }

    preinitialize({model}){
        this.model = model || new AlertModel({category: "viewCategory", content: "viewContent", title: "viewTitle"});
    }

    initialize(){
        if(this.model){
            this.listenTo(this.model, "change", this.render);
        }
        this.render();
    }

    render(){
        this.$el.html(logTemplate(this.model.attributes));
        return this;
    }

    handleClick(e){
        if(e.target.parentNode && e.target.parentNode.className === "close" || e.target.className === "close") return;
        Modal.showModal(this.model);
    }
}