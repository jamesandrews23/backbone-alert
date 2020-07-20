/**
 * Created by James on 7/20/2020.
 */
import Backbone from 'backbone';
import _ from 'underscore';


class AlertSystemCollection extends Backbone.Collection {
    initialize(){
        _.bindAll(this, "fetch", "sync");
    }

    fetch(){
        let alertElements = localStorage.getItem("alertElements") || "";

        try {
            alertElements = JSON.parse(alertElements);
        } catch(e){

        }

        this.set(alertElements);
        return this;
    }

    sync(){
        localStorage.setItem("alertElements", JSON.stringify(this.toJSON()));
        return this;
    }
}

export default new AlertSystemCollection();