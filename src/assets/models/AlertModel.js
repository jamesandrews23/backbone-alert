/**
 * Created by James on 7/18/2020.
 */
import Backbone from 'backbone';

//category object factory
const CreateCategory = ({category, name, value, selected, icon}) => ({
    [category]: {
        name,
        value,
        selected,
        icon
    }
});

const AlertModel = Backbone.Model.extend({
    defaults: {
        category:"default category",
        content: "Click to begin",
        title: "Alert",
        icon: "fa-bell",
        categories: {
            alert: {
                name: "Alert",
                value: "alert",
                selected: false,
                icon: "fa-bell"
            },
            health: {
                name: "Health",
                value: "health",
                selected: false,
                icon: "fa-walking"
            },
            journal: {
                name: "Journal",
                value: "journal",
                selected: false,
                icon: "fa-book"
            }
        }
    },

    initialize: function(){
        console.log("model init");
    }
});

export default AlertModel;