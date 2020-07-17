import Backbone from 'backbone';

export default class AlertElement extends Backbone.View {
    constructor(){
        super();
    }

    attributes(){
        return {
            "class": "row"
        }
    }

    events(){
        return {

        }
    }

    initialize(){
        this.render();
    }

    render(){
        this.$el.html("Alert Element");
        return this;
    }
}