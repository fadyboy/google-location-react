var React = require('react');
var LocationItem = require('./LocationItem');


class LocationList extends React.Component {

    render() {

        // var self = this;
        var locations = this.props.locations.map((l, index)=>{
            
            var active = this.props.activeLocationAddress === l.address;

            return <LocationItem
                     key={index} 
                     address={l.address}
                     timestamp={l.timestamp}
                     active={active}
                     onClick={this.props.onClick}
                    />
        });

        if(!locations.length){
            return null;
        }

        return (
            <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
                <span className="list-group-item active">Saved Locations</span>
                {locations}
            </div>
        )
    }
}


module.exports = LocationList;