var React = require('react');


class Map extends React.Component {
    
    componentDidMount(){
        {/*
        Only componentDidMount is called when the component is first added to the page.
        This is why the following method is called manually. This makes sure the map 
        initialization code is run the first time.
        */}
        
        this.componentDidUpdate();
    }

    componentDidUpdate(){

        if(this.lastLat === this.props.lat && this.lastLng === this.props.lng){
            {/*
            The map has already been initialized at this address
            Return from this method so we don't cause it to re-initialize and cause it to flicker
            */}

            return;
        }

        this.lastLat = this.props.lat;
        this.lastLng = this.props.lng;

        var map = new GMaps({
            div: '#map',
            lat: this.props.lat,
            lng: this.props.lng
        });

        // Adding a marker to the location being shown
        map.addMarker({
            lat: this.props.lat,
            lng: this.props.lng
        });
    }

    render(){
        return (
            <div className="map-holder">
                <p>Loading...</p>
                <div id="map"></div>
            </div>
        )
    }
}

module.exports = Map;