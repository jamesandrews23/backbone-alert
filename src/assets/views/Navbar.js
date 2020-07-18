/**
 * Created by James on 7/17/2020.
 */
import Backbone from 'backbone';
import _ from 'underscore';
const navBarTemplate = require("../templates/navbar.handlebars");

export default class Navbar extends Backbone.View {
    constructor(){
        super();
    }

    events(){
        return {
            "click #addRecord":"handleAddRecord"
        }
    }

    initialize(){
        _.bindAll(this, "handleAddRecord");
        this.render();
    }

    render(){
        this.$el.html(navBarTemplate());
        return this;
    }

    handleAddRecord(){
        console.log("clicked");
    }
}